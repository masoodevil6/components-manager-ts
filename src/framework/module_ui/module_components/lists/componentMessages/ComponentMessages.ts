import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreEvent from "@/core_event";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
// --------------------------------
import { ComponentMessagesBase } from "./ComponentMessagesBase";
import { createMessagesStep } from "./Step";
import { createMessageEventScope, MessageEventScope } from "./MessageEventScope";
import { Schemas } from "./Schemas";
import {
    MethodsType,
    MethodsConfigType
} from "./Methods";
import {PropsType, MessageTypes, MessageItem, Props} from "./Props";
import { PartAttrDefault } from "@/core_components";
import { ComponentStructureTrait } from "../../traits/componentStructureTrait";
import { PropsType as StructurePropsType } from "../componentStructure/Props";
// --------------------------------
import * as UiCategory from "@/ui_categories";
import * as UiIcons from "@/ui_icons";


/**
 * ComponentMessages — کلاس نهایی
 *
 * معماری Composition:
 *   ComponentMessages HAS-A ComponentStructure (نه IS-A)
 *   ComponentStructure در renderContentComponent ساخته می‌شود
 *   و content آن = renderMessages (محتوای اختصاصی ComponentMessages)
 *
 * Constructor امضا: (config, methods, identity?)
 *   config  — شامل propهای پایه (classList, prop_show, ...) + propهای اختصاصی (prop_type, prop_messages, ...)
 *   methods — methodهای اختصاصی (CLOSE_MESSAGE) با type-safe callback
 *   identity — { unique?, emit?, events? }
 *
 * Plan 8.2.8 — Per-Message Event Scope:
 *   هر MessageItem یک Event Scope مستقل دارد (MessageEventScope).
 *   Registry (_MESSAGE_EVENT_SCOPES) نگاشت messageId → Scope را نگه می‌دارد.
 *   syncMessageEventScopes مسئول reconciliation است (create/reuse/dispose).
 *   renderMessages فقط مصرف‌کننده Registry است — Step نمی‌سازد.
 *
 *   قانون طلایی: State changes ≠ Event identity changes
 */
class ComponentMessages extends ComponentMessagesBase {

    /**
     * Registry — نگاشت Message ID → Event Scope (Plan 8.2.8)
     *
     * این Registry بین render cycleهای مختلف حفظ می‌شود.
     * renderMessages فقط از این Registry می‌خواند — Step نمی‌سازد.
     */
    private _MESSAGE_EVENT_SCOPES = new Map<string, MessageEventScope>();


    constructor(
        config?: Partial<StructurePropsType & PropsType>,
        methods?: MethodsConfigType<ComponentMessages>,
        identity?: {
            unique?: any;
            emit?: any;
            events?: Record<string, any> | null;
        },
    ) {
        // Plan 8.2.7 — Step داخلی در constructor ساخته می‌شود (نه در render cycle)
        // هر Instance Step خودش را دارد — identity یکتا، تداخل در registerEmit رفع شد
        // Base در constructor از طریق CoreEvent.SubEvent آن را به Parent Step متصل می‌کند
        const step = createMessagesStep();

        super("messages", null, identity, step);

        // Plan 8.2.8 — نرمال‌سازی prop_messages: string[] → MessageItem[] (یک‌بار، قبل از render)
        // این‌طور idها یک‌بار تولید می‌شوند و در re-render تغییر نمی‌کنند
        // Message Identity باید قبل از Render تثبیت شود (Plan 8.2.8 بخش ۶)
        if (config?.prop_messages && Array.isArray(config.prop_messages)) {
            config = {
                ...config,
                prop_messages: config.prop_messages.map((msg: string | MessageItem) =>
                    typeof msg === "string"
                        ? { id: Math.random().toString(36).slice(2, 11), text: msg }
                        : msg
                ),
            };
        }

        this.renderComponent(
            config as any,
            methods as any,
            identity?.events ?? null,
        );
    }

    /**
     * Plan 8.2.8 — Component Disposal
     *
     * پاک‌سازی کل Event Tree این Component:
     *   ۱. disposeStep (Base) — CoreEvent.dispose بازگشتی — کل subtree از رجیستری پاک می‌شود
     *      این شامل همه Message Scopes هم می‌شود (چون children از messages هستند)
     *   ۲. پاک‌سازی Registry محلی — _MESSAGE_EVENT_SCOPES
     *
     * این متد باید وقتی Component از DOM حذف می‌شود صدا زده شود.
     */
    dispose(): void {
        // ۱. Disposal بازگشتی کل Event Tree (شامل همه Message Scopes)
        this.disposeStep();
        // ۲. پاک‌سازی Registry محلی
        this._MESSAGE_EVENT_SCOPES.clear();
    }


    /* ---------------------------------------------
       Plan 8.2.8 — Message Event Scope Registry
       reconciliation و lifecycle management

       syncMessageEventScopes:
         current IDs
              │
              ├── existing → reuse
              ├── new      → create + SubEvent attach
              └── removed  → dispose

       getMessageEventScope:
         lookup Scope by messageId — برای استفاده در renderMessages
    --------------------------------------------- */

    /**
     * Reconciliation — هماهنگی Registry با state فعلی (Plan 8.2.8)
     *
     * این متد باید قبل از render صدا زده شود — نه داخل render.
     * مسئولیت: create / reuse / dispose Event Scopeها بر اساس diff.
     *
     * قانون طلایی: State changes ≠ Event identity changes
     *   - Message موجود → Scope reuse (identity حفظ می‌شود)
     *   - Message جدید → Scope create
     *   - Message حذف‌شده → Scope dispose
     */
    private syncMessageEventScopes(messages: MessageItem[]): void {

        if (!this._COMPONENT_STEP) return;

        const containerStep = this._COMPONENT_STEP.messages;
        const currentIds = new Set(messages.map(m => m.id));

        // ۱. Disposal: Scopeهایی که دیگر در current IDs نیستن
        for (const [messageId, scope] of this._MESSAGE_EVENT_SCOPES) {
            if (!currentIds.has(messageId)) {
                CoreEvent.dispose(scope.root);
                this._MESSAGE_EVENT_SCOPES.delete(messageId);
            }
        }

        // ۲. Create: Messageهای جدید که Scope ندارن
        for (const msg of messages) {
            if (!this._MESSAGE_EVENT_SCOPES.has(msg.id)) {
                const scope = createMessageEventScope();
                const stepKey = `message_${msg.id}`;

                // SubEvent — اتصال رسمی به container
                CoreEvent.SubEvent(containerStep, stepKey, scope.root);

                this._MESSAGE_EVENT_SCOPES.set(msg.id, scope);
            }
        }
        // Reuse: Messageهای موجود — هیچ کاری نیاز نیست، Scope قبلی حفظ شده
    }

    /**
     * Lookup — گرفتن Scope برای یک Message (Plan 8.2.8)
     *
     * renderMessages از این متد استفاده می‌کند — Step نمی‌سازد.
     */
    private getMessageEventScope(messageId: string): MessageEventScope | undefined {
        return this._MESSAGE_EVENT_SCOPES.get(messageId);
    }


    /* ---------------------------------------------
       Plan 11.2 — renderContentComponent
       لایه ساختار از طریق Schema پایه رندر می‌شود.
       renderContentComponent فقط محتوای اختصاصی را رندر می‌کند.
    --------------------------------------------- */
    override renderContentComponent(): CoreReactive.App {
        return this.renderMessages();
    }


    /* ---------------------------------------------
       renderManagerComponent — Routing
       Plan 11.2 — COMPONENT + STRUCTURE از Trait، بقیه اختصاصی
    --------------------------------------------- */
    override renderManagerComponent(
        partName: string,
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
        extra: any,
    ): CoreReactive.App {

        switch (partName) {
            // --- Plan 11.2: Schema پایه ---
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            // --- Schema اختصاصی ---
            case Schemas.MESSAGE.part:
                return this.renderMessages();
            case Schemas.ICON.part:
                return this.renderCloseIcon(attrsDefault , data , extra );
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderMessages — رندر لیست پیام‌ها (Plan 8.2.8)
       هر پیام: <section role="alert"> + <b>{msg}</b> + ICON (بستن)
       رنگ‌ها بر اساس prop_type (success/warning/error/custom)

       Plan 8.2.8 — renderMessages فقط مصرف‌کننده Registry است:
         ۱. syncMessageEventScopes قبل از render صدا زده می‌شود
         ۲. for loop فقط از getMessageEventScope می‌خواند — Step نمی‌سازد
         ۳. unique روی section از scope.body — نه از container
         ۴. emit روی section — فقط برای این پیام (بدون مقایسه id)
    --------------------------------------------- */
    protected renderMessages(
        attrsDefault?: PartAttrDefault,
        data?: Record<string, CoreObservable.App<any>>,
        extra?: any,
    ): CoreReactive.App {

        const prop_messages        = data?.["prop_messages"] ?? this._COMPONENT_PROPS_BIND.prop_messages;
        const prop_type            = data?.["prop_type"] ?? this._COMPONENT_PROPS_BIND.prop_type;
        const prop_borderWidth     = data?.["prop_borderWidth"] ?? this._COMPONENT_PROPS_BIND.prop_borderWidth;
        const prop_backgroundColor = data?.["prop_backgroundColor"] ?? this._COMPONENT_PROPS_BIND.prop_backgroundColor;
        const prop_textColor       = data?.["prop_textColor"] ?? this._COMPONENT_PROPS_BIND.prop_textColor;
        const prop_borderColor     = data?.["prop_borderColor"] ?? this._COMPONENT_PROPS_BIND.prop_borderColor;

        // Plan 8.2.8 — Reconciliation قبل از render
        // syncMessageEventScopes فقط با MessageItem[] کار می‌کند — stringها در constructor نرمال‌سازی شده‌اند
        const rawMessages = prop_messages.get() as (string | MessageItem)[];
        const messageItems: MessageItem[] = (rawMessages ?? []).map(msg =>
            typeof msg === "string"
                ? { id: Math.random().toString(36).slice(2, 11), text: msg }
                : msg
        );
        this.syncMessageEventScopes(messageItems);

        // Container — فقط UI container، بدون unique/emit (Plan 8.2.8 بخش ۱۳)
        return CoreReactive.App.div({
            attrs: {
                ...attrsDefault,
            },
            className: ["d-flex", "flex-column", "gap-2"],
            children: CoreObservable.App.for(
                prop_messages ,
                (item , index , context , consts) => {

                    // prop_messages در constructor نرمال‌سازی شده — item همیشه MessageItem است
                    const messageItem = item as MessageItem;

                    // Plan 8.2.8 — Scope از Registry — Step نمی‌سازیم
                    const scope = this.getMessageEventScope(messageItem.id);
                    if (!scope) {
                        // fallback — نباید رخ دهد چون syncMessageEventScopes قبلاً اجرا شده
                        return CoreReactive.App.section({ children: [] });
                    }

                    return  CoreReactive.App.section({
                        attrs: {
                            role: "alert",
                            "data-id" : messageItem.id
                        },
                        // Plan 8.2.8 — unique از scope.body — identity یکتا برای این پیام
                        unique: scope.body ?? undefined,
                        // Plan 8.2.8 — emit فقط برای این پیام — نیازی به مقایسه id نیست
                        // Routing قبلاً توسط Event Tree انجام شده
                        emit: (request) => {

                            const payload = request.payload;

                            if (payload?.action === "close") {

                                // حذف پیام از prop_messages — منبع حقیقت: data model
                                const currentMessages = this.get("prop_messages") as (string | MessageItem)[];
                                if (Array.isArray(currentMessages)) {
                                    const newMessages = currentMessages.filter(msg => {
                                        if (typeof msg === "object" && msg !== null && "id" in msg) {
                                            return msg.id !== messageItem.id;
                                        }
                                        return true;
                                    });
                                    this.set("prop_messages", newMessages);
                                }

                                // Note: disposal در syncMessageEventScopes بعد از reactive update انجام می‌شود
                                // (Plan 8.2.8 بخش ۲۴ — disposal هنگام dispatch خطرناک است)
                                return { value: { closed: true, id: messageItem.id } };
                            }

                            return { value: null };
                        },
                        className: ["d-flex", "align-items-center", "gap-2", "p-2", "rounded", "position-relative"],

                        styles: {
                            "border-style" : "solid"
                        },
                        stylesBind: {
                            "background-color": CoreObservable.App.computed(
                                (type, backgroundColor) => {
                                    switch (type) {
                                        case MessageTypes.SUCCESS: return UtilStyle.Css_Color(UtilConst.ColorMain.SUCCESS  , UtilConst.ColorGrad.GRADE_4);
                                        case MessageTypes.WARNING: return UtilStyle.Css_Color(UtilConst.ColorMain.WARNING  , UtilConst.ColorGrad.GRADE_4);
                                        case MessageTypes.ERROR:   return UtilStyle.Css_Color(UtilConst.ColorMain.ERROR    , UtilConst.ColorGrad.GRADE_4);
                                        default: return backgroundColor
                                    }
                                },
                                [
                                    prop_type, prop_backgroundColor
                                ],
                                this.getScope()
                            ) ,

                            "color": CoreObservable.App.computed(
                                (type, textColor) => {
                                    switch (type) {
                                        case MessageTypes.SUCCESS: return UtilStyle.Css_Color(UtilConst.ColorMain.SUCCESS  , UtilConst.ColorGrad.GRADE_1);
                                        case MessageTypes.WARNING: return UtilStyle.Css_Color(UtilConst.ColorMain.WARNING  , UtilConst.ColorGrad.GRADE_1);
                                        case MessageTypes.ERROR:   return UtilStyle.Css_Color(UtilConst.ColorMain.ERROR    , UtilConst.ColorGrad.GRADE_1);
                                        default: return textColor
                                    }
                                },
                                [
                                    prop_type, prop_textColor
                                ],
                                this.getScope()
                            ),

                            "border-color": CoreObservable.App.computed(
                                (type, borderColor) => {
                                    switch (type) {
                                        case MessageTypes.SUCCESS: return UtilStyle.Css_Color(UtilConst.ColorMain.SUCCESS  , UtilConst.ColorGrad.GRADE_1);
                                        case MessageTypes.WARNING: return UtilStyle.Css_Color(UtilConst.ColorMain.WARNING  , UtilConst.ColorGrad.GRADE_1);
                                        case MessageTypes.ERROR:   return UtilStyle.Css_Color(UtilConst.ColorMain.ERROR    , UtilConst.ColorGrad.GRADE_1);
                                        default: return borderColor
                                    }
                                },
                                [
                                    prop_type, prop_borderColor
                                ],
                                this.getScope()
                            ),

                            "border-width": CoreObservable.App.computed(
                                (borderWidth) => {
                                    return UtilStyle.Css_BorderWidth(borderWidth)
                                },
                                [
                                    prop_borderWidth
                                ],
                                this.getScope()
                            ),

                        },
                        children: [
                            CoreReactive.App.b({
                                className: ["flex-grow-1"],
                                children: [messageItem.text],
                            }),
                            this.renderManagerComponent( Schemas.ICON.part , attrsDefault , data , {
                                id:          messageItem.id,
                                index,
                                messageText: messageItem.text,
                                scope,       // ← Plan 8.2.8 — pass scope to icon
                            }),
                        ],
                    });
                },
                {},
                {} ,
                this.getScope()
            ),
        });
    }


    /* ---------------------------------------------
       renderCloseIcon — رندر ComponentIcon برای بستن پیام (Plan 8.2.8)
       on click → this.executeMethod("CLOSE_MESSAGE", ...)
       then → CoreEvent.App.request to scope.body (per-message routing)

       Plan 8.2.8 — Request به scope.body همین پیام می‌رود:
         source: scope.icon.close
         target: scope.body
         نه به یک handler مرکزی — routing توسط Event Tree انجام می‌شود
    --------------------------------------------- */
    protected renderCloseIcon(
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra:        any,
    ): CoreReactive.App {

        const prop_iconColor = data?.["prop_iconColor"] ?? this._COMPONENT_PROPS_BIND.prop_iconColor;
        const prop_type = data?.["prop_type"] ?? this._COMPONENT_PROPS_BIND.prop_type;

        // Plan 8.2.8 — scope از extra (از renderMessages پاس داده شده)
        const scope = extra?.scope as MessageEventScope | undefined;

        const iconElement = UiCategory.UI.Simples.Icon(
            {
                prop_icon: UiIcons.CreateIcon(UiIcons.Src.FileWindowClose.Definition, {
                    primaryColor:  CoreObservable.App.computed(
                        (type, iconColor) => {
                            switch (type) {
                                case MessageTypes.SUCCESS: return UtilStyle.Css_Color(UtilConst.ColorMain.SUCCESS  , UtilConst.ColorGrad.GRADE_1);
                                case MessageTypes.WARNING: return UtilStyle.Css_Color(UtilConst.ColorMain.WARNING  , UtilConst.ColorGrad.GRADE_1);
                                case MessageTypes.ERROR:   return UtilStyle.Css_Color(UtilConst.ColorMain.ERROR    , UtilConst.ColorGrad.GRADE_1);
                                default: return iconColor
                            }
                        },
                        [
                            prop_type, prop_iconColor
                        ],
                        this.getScope()
                    )
                }),
                prop_iconClass:  ["cursor-pointer"],
                prop_iconStyles: { "inset-inline-end": "5px", "top": "5px", "position": "absolute" },
            },
            {
                CLICK: (event: Event) => {

                    event.preventDefault();

                    // ۱. اول: اطلاع‌رسانی به مصرف‌کننده با id صحیح
                    //    (قبل از حذف پیام — index و text هنوز معتبر هستند)
                    this.executeMethod("CLOSE_MESSAGE", event, {
                        MESSAGE_ID:    extra?.id,
                        MESSAGE_INDEX: extra?.index,
                        MESSAGE_TEXT:  extra?.messageText,
                        MESSAGE_TYPE:  prop_type.get(),
                    });

                    // ۲. بعد: ارسال Request به scope.body همین پیام (Plan 8.2.8)
                    //    source: scope.icon.close — target: scope.body
                    //    Routing توسط Event Tree — نه handler مرکزی
                    if (scope) {
                        CoreEvent.App.request(
                            CoreEvent.requestMap([
                                [scope.body, {
                                    action:  "close",
                                    id:      extra?.id,
                                    index:   extra?.index,
                                    text:    extra?.messageText,
                                    type:    prop_type.get(),
                                }],
                            ]),
                            scope.icon.close,
                        );
                    }
                },
            },
            {
                // Plan 8.2.8/9.1 — unique از scope.root.icon — actual icon Step
                // (scope.icon is a wrapper { close }, not a Step — Plan 9.1 fix)
                unique: scope?.root?.icon ?? undefined,
            },
        ).getElement();

        return CoreReactive.App.span({
            children: [iconElement],
        });
    }


}

export default ComponentMessages

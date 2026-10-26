import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig     from "@/core_configs";
import * as UtilStyle      from "@/util_styles";
import * as UtilConst      from "@/util_consts";
import * as UiIcons        from "@/ui_icons";
// --------------------------------
import {ComponentWindowConfirmBase}    from "./ComponentWindowConfirmBase";
import {createWindowConfirmStep}       from "./Step";
import {Schemas}                       from "./Schemas";
import {MethodsConfigType}            from "./Methods";
import {PropsType}                    from "./Props";
import {PartAttrDefault}              from "@/core_components";
import {ComponentStructureTrait}   from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {PropsConfigType as WindowConfirmPropsConfigType} from "./Props";
// --------------------------------
import * as ComponentWindow  from "../componentWindow";
import * as ComponentIcon    from "../componentIcon";


/**
 * ComponentWindowConfirm â€” Ú©Ù„Ø§Ø³ Ù†Ù‡Ø§ÛŒÛŒ
 *
 * Ù…Ø¹Ù…Ø§Ø±ÛŒ Composition:
 *   ComponentWindowConfirm HAS-A ComponentWindow (Ù†Ù‡ IS-A)
 *   ComponentWindow Ø¯Ø± renderConfirmStructure Ø³Ø§Ø®ØªÙ‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯
 *   Ùˆ content Ø¢Ù† = icon + message (Ù…Ø­ØªÙˆØ§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ ComponentWindowConfirm)
 *
 * Constructor Ø§Ù…Ø¶Ø§: (config, methods, identity?)
 *   config  â€” Ø´Ø§Ù…Ù„ propÙ‡Ø§ÛŒ Ù¾Ø§ÛŒÙ‡ + propÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ
 *   methods â€” methodÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ (CONFIRM, CANCEL)
 *   identity â€” { unique?, emit?, events? }
 *
 * Plan 9.1 â€” Step Ø¯Ø§Ø®Ù„ÛŒ Ø¯Ø± constructor Ø³Ø§Ø®ØªÙ‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯ (factory function).
 * Plan 11.2 â€” Ù„Ø§ÛŒÙ‡ <component-window-confirm> + <section> Ø§Ø² Schema Ù¾Ø§ÛŒÙ‡ Ø±Ù†Ø¯Ø± Ù…ÛŒâ€ŒØ´ÙˆØ¯.
 */
export class ComponentWindowConfirm extends ComponentWindowConfirmBase<ReturnType<typeof createWindowConfirmStep>>{

    private _WINDOW: ComponentWindow.Component | null = null;


    /* ---------------------------------------------
       SETUP
    --------------------------------------------- */
    constructor(
        config?:  Partial<StructurePropsType & WindowConfirmPropsConfigType>,
        methods?: MethodsConfigType<ComponentWindowConfirm>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createWindowConfirmStep();

        super("window-confirm", null, identity, step);

        this.renderComponent(
            config as any,
            methods as any,
            identity?.events ?? null,
        );
    }


    /* ---------------------------------------------
       Plan 9.1 â€” Component Disposal
    --------------------------------------------- */
    dispose(): void {
        this.disposeStep();
    }


    /* ---------------------------------------------
       Plan 11.2 â€” renderContentComponent
       Ù„Ø§ÛŒÙ‡ Ø³Ø§Ø®ØªØ§Ø± Ø§Ø² Ø·Ø±ÛŒÙ‚ Schema Ù¾Ø§ÛŒÙ‡ (COMPONENT + STRUCTURE) Ø±Ù†Ø¯Ø± Ù…ÛŒâ€ŒØ´ÙˆØ¯.
       renderContentComponent ÙÙ‚Ø· Ù…Ø­ØªÙˆØ§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ Ø±Ø§ Ø±Ù†Ø¯Ø± Ù…ÛŒâ€ŒÚ©Ù†Ø¯.
    --------------------------------------------- */
    override renderContentComponent(
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {
        return this.executeSchemaPart(Schemas.CONFIRM_STRUCTURE.part, {});
    }


    /* ---------------------------------------------
       renderManagerComponent â€” Routing
       Plan 11.2 â€” COMPONENT + STRUCTURE Ø§Ø² TraitØŒ Ø¨Ù‚ÛŒÙ‡ Ø§Ø®ØªØµØ§ØµÛŒ
    --------------------------------------------- */
    override renderManagerComponent(
        partName:     string,
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {

        switch (partName) {
            // --- Plan 11.2: Schema Ù¾Ø§ÛŒÙ‡ ---
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            // --- Schema Ø§Ø®ØªØµØ§ØµÛŒ ---
            case Schemas.CONFIRM_STRUCTURE.part:
                return this.renderConfirmStructure(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderConfirmStructure â€” Ø±Ù†Ø¯Ø± Part CONFIRM_STRUCTURE Ø§ØµÙ„ÛŒ
       ÛŒÚ© ComponentWindow Ø¨Ø§ icon + message Ø¨Ù‡â€ŒØ¹Ù†ÙˆØ§Ù† body Ù…ÛŒâ€ŒØ³Ø§Ø²Ø¯
       Ùˆ ACCEPT/CANCEL Ø±Ø§ Ø¨Ù‡ methodÙ‡Ø§ÛŒ Ø§ÛŒÙ† component Ù…ØªØµÙ„ Ù…ÛŒâ€ŒÚ©Ù†Ø¯.
    --------------------------------------------- */
    private renderConfirmStructure(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_icon          = data?.["prop_icon"]          ?? bind.prop_icon;
        const prop_message       = data?.["prop_message"]       ?? bind.prop_message;
        const prop_title         = data?.["prop_title"]         ?? bind.prop_title;
        const prop_acceptText    = data?.["prop_acceptText"]    ?? bind.prop_acceptText;
        const prop_cancelText    = data?.["prop_cancelText"]    ?? bind.prop_cancelText;
        const prop_showCancel    = data?.["prop_showCancel"]    ?? bind.prop_showCancel;
        const prop_showAccept    = data?.["prop_showAccept"]    ?? bind.prop_showAccept;
        const prop_closeOnOverlay = data?.["prop_closeOnOverlay"] ?? bind.prop_closeOnOverlay;
        const prop_windowWidth   = data?.["prop_windowWidth"]   ?? bind.prop_windowWidth;
        const prop_windowHeight  = data?.["prop_windowHeight"]  ?? bind.prop_windowHeight;

        const messageElement = CoreReactive.App.section({
            attrs: {},
            className: ["d-flex", "align-items-center", "flex-grow-1"],
            styles: {
                fontSize: "14px",
            },
            children: [prop_message ?? ""],
        });

        const iconValue = prop_icon instanceof CoreObservable.App ? prop_icon.get() : prop_icon;

        const bodyChildren: any[] = [];

        if (iconValue != null) {
            const iconComp = new ComponentIcon.Component(
                {
                    prop_icon: UiIcons.CreateIcon(prop_icon, {
                        size: UtilConst.Sizes.L,
                        primaryColor: UtilStyle.Css_Color(UtilConst.ColorMain.WARNING, UtilConst.ColorGrad.GRADE_1),
                    }),
                } as any,
                {},
            );
            bodyChildren.push(
                CoreReactive.App.section({
                    attrs: {},
                    className: ["d-flex", "align-items-center", "justify-content-center", "flex-shrink-0"],
                    styles: {
                        width: "64px",
                        height: "64px",
                    },
                    children: [
                        CoreReactive.App.section({
                            attrs: {},
                            className: ["d-flex", "align-items-center", "justify-content-center"],
                            styles: {
                                transform: "scale(2.5)",
                                transformOrigin: "center",
                            },
                            children: [iconComp.getReactiveElement()],
                        })
                    ],
                })
            );
        }

        bodyChildren.push(messageElement);

        const bodyElement = CoreReactive.App.section({
            attrs: {},
            className: ["d-flex", "align-items-center", "gap-3", "p-3"],
            styles: {},
            children: bodyChildren,
        });

        this._WINDOW = new ComponentWindow.Component(
            {
                prop_title: prop_title ?? "",
                prop_body: bodyElement,
                prop_acceptText: prop_acceptText ?? "Confirm",
                prop_cancelText: prop_cancelText ?? "Cancel",
                prop_showCancel: prop_showCancel ?? true,
                prop_showAccept: prop_showAccept ?? true,
                prop_closeOnOverlay: prop_closeOnOverlay ?? true,
                prop_showBtnResize: false,
                prop_isVisible: true,
                prop_windowWidth: prop_windowWidth ?? 400,
                prop_windowHeight: prop_windowHeight ?? 200,
            } as any,
            {
                ACCEPT: (event: Event) => {
                    this.executeMethod("CONFIRM", event, {});
                },
                CANCEL: (event: Event) => {
                    this.executeMethod("CANCEL", event, {});
                },
            } as any,
        );

        return this._WINDOW.getReactiveElement();
    }


    /* ---------------------------------------------
       PUBLIC API
    --------------------------------------------- */
    call_open(event?: Event): void {
        if (this._WINDOW) this._WINDOW.call_open(event);
    }

    call_close(event?: Event): void {
        if (this._WINDOW) this._WINDOW.call_close(event);
    }


    /* ---------------------------------------------
       STATIC METHODS
    --------------------------------------------- */
    static confirm(
        message: string,
        onConfirm?: (event?: Event) => void,
        onCancel?: (event?: Event) => void,
        options?: Partial<WindowConfirmPropsConfigType>,
    ): ComponentWindowConfirm {
        const popup = new ComponentWindowConfirm(
            {
                prop_message: message,
                prop_icon: UiIcons.Src.SymbolExclumationWarning.Definition,
                ...options,
            } as any,
            {
                CONFIRM: (event: Event) => {
                    if (typeof onConfirm === "function") onConfirm(event);
                },
                CANCEL: (event: Event) => {
                    if (typeof onCancel === "function") onCancel(event);
                },
            } as any,
        );

        document.body.appendChild(popup.getElement() as HTMLElement);
        popup.call_open();
        return popup;
    }
}

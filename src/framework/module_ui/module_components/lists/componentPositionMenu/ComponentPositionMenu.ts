import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig     from "@/core_configs";
import * as UtilStyle      from "@/util_styles";
import * as UtilConst      from "@/util_consts";
// --------------------------------
import {ComponentPositionMenuBase}    from "./ComponentPositionMenuBase";
import {createPositionMenuStep}       from "./Step";
import {Schemas}                      from "./Schemas";
import {MethodsConfigType}            from "./Methods";
import {PropsType}                    from "./Props";
import {ComponentStructureTrait}      from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
// --------------------------------
import * as UiCategory  from "@/ui_categories";
import * as UiIcons     from "@/ui_icons";
import {ShowTypes, DirectionTypes} from "../componentFloatMenu";
import {ButtonAction} from "../componentButton/Props";


/**
 * ComponentPositionMenu — کلاس نهایی (Plan 12.1 — مهاجرت از Legacy)
 *
 * معماری Composition:
 *   ComponentPositionMenu HAS-A ComponentFloatMenu (نه IS-A)
 *   ComponentFloatMenu در renderFormFloatMenu ساخته می‌شود
 *   و content آن = selector + body + buttons (محتوای اختصاصی)
 *
 * Constructor امضا: (config, methods, identity?)
 *   config  — شامل propهای پایه + propهای اختصاصی (prop_menuSelector, ...)
 *   methods — methodهای اختصاصی (CLICK_OPEN, CLICK_ACCEPT, CLICK_REJECT)
 *   identity — { unique?, emit?, events? }
 *
 * Behavior بازیابی‌شده از Legacy:
 *   ۱. Composition با ComponentFloatMenu — منوی شناور با positioning
 *   ۲. Composition با ComponentButton — دکمه‌های Accept/Reject
 *   ۳. Outside-click detection — document click listener برای بستن منو
 *   ۴. Conditional rendering نوار دکمه‌ها — conditionWhen روی Accept/Reject has
 *   ۵. Style getters مستقل — هر style منطق جداگانه دارد
 */
export class ComponentPositionMenu extends ComponentPositionMenuBase {

    /* ---------------------------------------------
       Internal State — document click listener برای outside-click detection
    --------------------------------------------- */
    private _ON_MENU_OPEN: ((event: MouseEvent) => void) | null = null;


    constructor(
        config?:  Partial<StructurePropsType & PropsType>,
        methods?: MethodsConfigType<ComponentPositionMenu>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createPositionMenuStep();

        super("position-menu", null, identity, step);

        this.renderComponent(
            config as any,
            methods as any,
            identity?.events ?? null,
        );
    }


    /* ---------------------------------------------
       Plan 8.2.7 — Component Disposal
    --------------------------------------------- */
    dispose(): void {
        this.pr_cleanupDocumentListener();
        this.disposeStep();
    }


    /* ---------------------------------------------
       Plan 11.2 — renderContentComponent
       لایه ساختار از طریق Schema پایه رندر می‌شود.
       renderContentComponent فقط محتوای اختصاصی را رندر می‌کند.
    --------------------------------------------- */
    override renderContentComponent(
        attrsDefault?: any,
        data?:         any,
        extra?:        any,
    ): CoreReactive.App {
        return this.executeSchemaPart(Schemas.FORM_FLOAT_MENU.part, {});
    }


    /* ---------------------------------------------
       renderManagerComponent — Routing
       Plan 11.2 — COMPONENT + STRUCTURE از Trait، بقیه اختصاصی
    --------------------------------------------- */
    override renderManagerComponent(
        partName:     string,
        attrsDefault: any,
        data:         any,
        extra?:       any,
    ): CoreReactive.App {

        switch (partName) {
            // --- Plan 11.2: Schema پایه ---
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            // --- Schema اختصاصی ---
            case Schemas.FORM_FLOAT_MENU.part:
                return this.renderFormFloatMenu(attrsDefault, data, extra);
            case Schemas.FORM_FLOAT_MENU_SELECTOR.part:
                return this.renderFormFloatMenuSelector(attrsDefault, data, extra);
            case Schemas.FORM_FLOAT_MENU_BODY.part:
                return this.renderFormFloatMenuBody(attrsDefault, data, extra);
            case Schemas.FORM_FLOAT_MENU_BODY_CONTENT.part:
                return this.renderFormFloatMenuBodyContent(attrsDefault, data, extra);
            case Schemas.FORM_FLOAT_MENU_BODY_BUTTONS.part:
                return this.renderFormFloatMenuBodyButtons(attrsDefault, data, extra);
            case Schemas.FORM_FLOAT_MENU_BODY_BUTTONS_ACCEPT.part:
                return this.renderFormFloatMenuBodyButtonsAccept(attrsDefault, data, extra);
            case Schemas.FORM_FLOAT_MENU_BODY_BUTTONS_REJECT.part:
                return this.renderFormFloatMenuBodyButtonsReject(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderFormFloatMenu — رندر Part اصلی
       از ComponentFloatMenu (Category callable) استفاده می‌کند
    --------------------------------------------- */
    protected renderFormFloatMenu(
        attrsDefault?: any,
        data?:         any,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_menuIsOpen           = data?.["prop_menuIsOpen"]           ?? bind.prop_menuIsOpen;
        const prop_menuBackgroundColor  = data?.["prop_menuBackgroundColor"]  ?? bind.prop_menuBackgroundColor;
        const prop_menuBorderColor      = data?.["prop_menuBorderColor"]      ?? bind.prop_menuBorderColor;
        const prop_menuBorderWidth      = data?.["prop_menuBorderWidth"]      ?? bind.prop_menuBorderWidth;
        const prop_menuBodyWidth        = data?.["prop_menuBodyWidth"]        ?? bind.prop_menuBodyWidth;

        const floatMenu = UiCategory.UI.Positions.FloatMenu(
            {
                classList: ["position-relative", "d-block", "w-100", "h-100"],
                prop_selectorClass: [],
                prop_selectorContent: this.executeSchemaPart(Schemas.FORM_FLOAT_MENU_SELECTOR.part, {}),
                prop_floatContent:    this.executeSchemaPart(Schemas.FORM_FLOAT_MENU_BODY.part, {}),
                prop_selectorShowType:         ShowTypes.CLICK,
                prop_floatDirectionType:       DirectionTypes.BOTTOM,
                prop_floatMinWidth:            UtilStyle.Css_SizeUnit(230, UtilConst.Units.PEXEL),
                prop_floatArrowWidth:          0,
                prop_floatShowControlWithSelf: true,
                prop_floatIsShow:              prop_menuIsOpen,
                prop_floatStyles: {
                    display: "block",
                },
                prop_floatWidth:               prop_menuBodyWidth,
                prop_floatBackground:          prop_menuBackgroundColor,
                prop_floatBorderColor:         prop_menuBorderColor,
                prop_floatBorderWidth:         prop_menuBorderWidth,
            },
            {},
        );

        return floatMenu.getReactiveElement();
    }


    /* ---------------------------------------------
       renderFormFloatMenuSelector — رندر selector (trigger)
    --------------------------------------------- */
    protected renderFormFloatMenuSelector(
        attrsDefault?: any,
        data?:         any,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;
        const prop_menuSelector = data?.["prop_menuSelector"] ?? bind.prop_menuSelector;

        return CoreReactive.App.section({
            attrs: {
                ...attrsDefault,
            },
            className: [
                "d-block", "w-100", "h-100",
            ],
            children: [
                prop_menuSelector,
            ],
            on: {
                click: (event: Event) => {
                    const prop_menuIsOpen = this.get("prop_menuIsOpen");
                    if (prop_menuIsOpen) {
                        this.executeMethod("CLICK_OPEN", event, {});
                    }
                    this.set("prop_menuIsOpen", !prop_menuIsOpen);

                    this._ON_MENU_OPEN = this.pr_handleMenuClose.bind(this, true);
                    document.addEventListener("click", this._ON_MENU_OPEN);
                },
            },
        });
    }


    /* ---------------------------------------------
       renderFormFloatMenuBody — رندر body container
    --------------------------------------------- */
    protected renderFormFloatMenuBody(
        attrsDefault?: any,
        data?:         any,
        extra?:        any,
    ): CoreReactive.App {

        return CoreReactive.App.section({
            attrs: {
                ...attrsDefault,
            },
            className: [
                "bg-white", "rounded",
            ],
            children: [
                this.executeSchemaPart(Schemas.FORM_FLOAT_MENU_BODY_CONTENT.part, {}),
                this.executeSchemaPart(Schemas.FORM_FLOAT_MENU_BODY_BUTTONS.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderFormFloatMenuBodyContent — رندر body content با scroll
    --------------------------------------------- */
    protected renderFormFloatMenuBodyContent(
        attrsDefault?: any,
        data?:         any,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_menuBtnAcceptHas  = data?.["prop_menuBtnAcceptHas"]  ?? bind.prop_menuBtnAcceptHas;
        const prop_menuBtnRejectHas  = data?.["prop_menuBtnRejectHas"]  ?? bind.prop_menuBtnRejectHas;
        const prop_menuBody          = data?.["prop_menuBody"]          ?? bind.prop_menuBody;
        const prop_menuBodyHeight    = data?.["prop_menuBodyHeight"]    ?? bind.prop_menuBodyHeight;

        return CoreReactive.App.section({
            attrs: {
                ...attrsDefault,
            },
            className: [
                "overflow-y-auto",
            ],
            stylesBind: {
                height: this.getStyleBodyContentHeight(prop_menuBodyHeight),
                borderBottomColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
                borderBottomStyle: this.getStyleBorderBottomStyle(prop_menuBtnAcceptHas, prop_menuBtnRejectHas),
                borderBottomWidth: this.getStyleBorderBottomWidth(),
            },
            children: [
                prop_menuBody,
            ],
        });
    }


    /* ---------------------------------------------
       renderFormFloatMenuBodyButtons — رندر نوار دکمه‌ها
       Conditional: فقط اگر هم Accept و هم Reject نمایش داده شوند
    --------------------------------------------- */
    protected renderFormFloatMenuBodyButtons(
        attrsDefault?: any,
        data?:         any,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_menuBtnAcceptHas = data?.["prop_menuBtnAcceptHas"] ?? bind.prop_menuBtnAcceptHas;
        const prop_menuBtnRejectHas = data?.["prop_menuBtnRejectHas"] ?? bind.prop_menuBtnRejectHas;

        return CoreObservable.App.conditionWhen(
            [prop_menuBtnAcceptHas, prop_menuBtnRejectHas],
            (acceptHas, rejectHas) => acceptHas && rejectHas,
            () => {
                return CoreReactive.App.section({
                    attrs: {
                        ...attrsDefault,
                    },
                    className: [
                        "row", "p-0", "mx-1",
                    ],
                    stylesBind: {
                        height:      this.getStyleButtonsHeight(),
                        marginTop:   this.getStyleButtonsMargin(),
                        marginBottom: this.getStyleButtonsMargin(),
                    },
                    children: [
                        this.executeSchemaPart(Schemas.FORM_FLOAT_MENU_BODY_BUTTONS_ACCEPT.part, {}),
                        this.executeSchemaPart(Schemas.FORM_FLOAT_MENU_BODY_BUTTONS_REJECT.part, {}),
                    ],
                });
            },
            () => {
                return CoreReactive.App.section({
                    attrs: { ...attrsDefault },
                    children: [],
                });
            },
            this.getScope(),
        ) as unknown as CoreReactive.App;
    }


    /* ---------------------------------------------
       renderFormFloatMenuBodyButtonsAccept — رندر دکمه Accept
       از ComponentButton (Category callable) استفاده می‌کند
    --------------------------------------------- */
    protected renderFormFloatMenuBodyButtonsAccept(
        attrsDefault?: any,
        data?:         any,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_menuBtnAcceptHas   = data?.["prop_menuBtnAcceptHas"]   ?? bind.prop_menuBtnAcceptHas;
        const prop_menuBtnAcceptIcon  = data?.["prop_menuBtnAcceptIcon"]  ?? bind.prop_menuBtnAcceptIcon;
        const prop_menuBtnAcceptTitle = data?.["prop_menuBtnAcceptTitle"] ?? bind.prop_menuBtnAcceptTitle;

        const acceptBtn = UiCategory.UI.Simples.Button(
            {
                classList: ["col-md-6"],
                prop_btnTitle: prop_menuBtnAcceptTitle,
                prop_btnType:  ButtonAction.SUBMIT,
                prop_btnIcon:  prop_menuBtnAcceptIcon,
                prop_show:     prop_menuBtnAcceptHas,
            },
            {
                CLICK: function(event, dataArgs, componentArgs) {
                    const close = this.executeMethod("CLICK_ACCEPT", event, {});
                    if (close) {
                        this.pr_handleMenuClose(false, event);
                    }
                }.bind(this),
            },
        );

        return acceptBtn.getReactiveElement();
    }


    /* ---------------------------------------------
       renderFormFloatMenuBodyButtonsReject — رندر دکمه Reject
       از ComponentButton (Category callable) استفاده می‌کند
    --------------------------------------------- */
    protected renderFormFloatMenuBodyButtonsReject(
        attrsDefault?: any,
        data?:         any,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_menuBtnRejectHas   = data?.["prop_menuBtnRejectHas"]   ?? bind.prop_menuBtnRejectHas;
        const prop_menuBtnRejectIcon  = data?.["prop_menuBtnRejectIcon"]  ?? bind.prop_menuBtnRejectIcon;
        const prop_menuBtnRejectTitle = data?.["prop_menuBtnRejectTitle"] ?? bind.prop_menuBtnRejectTitle;

        const rejectBtn = UiCategory.UI.Simples.Button(
            {
                classList: ["col-md-6"],
                prop_btnTitle: prop_menuBtnRejectTitle,
                prop_btnType:  ButtonAction.BUTTON,
                prop_btnIcon:  prop_menuBtnRejectIcon,
                prop_show:     prop_menuBtnRejectHas,
            },
            {
                CLICK: function(event, dataArgs, componentArgs) {
                    this.pr_handleMenuClose(false, event);
                    this.pr_executeMethodReject(event);
                }.bind(this),
            },
        );

        return rejectBtn.getReactiveElement();
    }


    /// ---------------------
    ///  Private Style Getters
    ///  هر متد یک CoreObservable.App.computed برمی‌گرداند
    ///  توسعه‌پذیر: هر style منطق مستقل دارد
    /// ---------------------

    private getStyleBodyContentHeight(prop_menuBodyHeight: any) {
        return CoreObservable.App.computed(
            (menuBodyHeight: any, sizeName: any) => {
                return UtilStyle.Css_SizeCalc(
                    menuBodyHeight,
                    UtilConst.Operation.MINUS,
                    UtilStyle.Css_BorderWidth(sizeName) as any,
                );
            },
            [prop_menuBodyHeight, CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
    }

    private getStyleBorderBottomStyle(prop_menuBtnAcceptHas: any, prop_menuBtnRejectHas: any) {
        return CoreObservable.App.computed(
            (acceptHas: any, rejectHas: any) => (acceptHas && rejectHas) ? "solid" : "none",
            [prop_menuBtnAcceptHas, prop_menuBtnRejectHas],
            this.getScope(),
        );
    }

    private getStyleBorderBottomWidth() {
        return CoreObservable.App.computed(
            (sizeName: any) => UtilStyle.Css_BorderWidth(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
    }

    private getStyleButtonsHeight() {
        return CoreObservable.App.computed(
            (sizeName: any) => {
                return UtilStyle.Css_SizeCalc(
                    UtilStyle.Css_BorderRadius(sizeName) as any,
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Height(sizeName) as any,
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_BorderRadius(sizeName) as any,
                );
            },
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
    }

    private getStyleButtonsMargin() {
        return CoreObservable.App.computed(
            (sizeName: any) => UtilStyle.Css_Margin(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
    }


    /// ---------------------
    ///  Private Logic Methods
    /// ---------------------

    private pr_handleMenuClose(checkChild: boolean, event: Event) {
        const target = event.target as HTMLElement;
        const menuId = this.getPartId("part-formFloatMenu");
        if (checkChild && target.closest(`#${menuId}`)) {
            return;
        }

        this.set("prop_menuIsOpen", false);
        this.pr_cleanupDocumentListener();

        if (checkChild) {
            this.pr_executeMethodReject(event);
        }
    }

    private pr_executeMethodReject(event: Event) {
        this.executeMethod("CLICK_REJECT", event, {});
    }

    private pr_cleanupDocumentListener() {
        if (this._ON_MENU_OPEN) {
            document.removeEventListener("click", this._ON_MENU_OPEN);
            this._ON_MENU_OPEN = null;
        }
    }
}

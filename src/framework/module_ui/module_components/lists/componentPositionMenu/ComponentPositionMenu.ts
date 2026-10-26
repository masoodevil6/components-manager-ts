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
import * as CoreLanguage from "@/core_languages";
import {ShowTypes, DirectionTypes} from "../componentFloatMenu";
import {ButtonAction, ButtonSemantic} from "../componentButton/Props";
import {Keys} from "../../../module_categories/languages";


/**
 * ComponentPositionMenu â€” Ú©Ù„Ø§Ø³ Ù†Ù‡Ø§ÛŒÛŒ (Plan 12.1 â€” Ù…Ù‡Ø§Ø¬Ø±Øª Ø§Ø² Legacy)
 *
 * Ù…Ø¹Ù…Ø§Ø±ÛŒ Composition:
 *   ComponentPositionMenu HAS-A ComponentFloatMenu (Ù†Ù‡ IS-A)
 *   ComponentFloatMenu Ø¯Ø± renderFormFloatMenu Ø³Ø§Ø®ØªÙ‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯
 *   Ùˆ content Ø¢Ù† = selector + body + buttons (Ù…Ø­ØªÙˆØ§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ)
 *
 * Constructor Ø§Ù…Ø¶Ø§: (config, methods, identity?)
 *   config  â€” Ø´Ø§Ù…Ù„ propÙ‡Ø§ÛŒ Ù¾Ø§ÛŒÙ‡ + propÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ (prop_menuSelector, ...)
 *   methods â€” methodÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ (CLICK_OPEN, CLICK_ACCEPT, CLICK_REJECT)
 *   identity â€” { unique?, emit?, events? }
 *
 * Behavior Ø¨Ø§Ø²ÛŒØ§Ø¨ÛŒâ€ŒØ´Ø¯Ù‡ Ø§Ø² Legacy:
 *   Û±. Composition Ø¨Ø§ ComponentFloatMenu â€” Ù…Ù†ÙˆÛŒ Ø´Ù†Ø§ÙˆØ± Ø¨Ø§ positioning
 *   Û². Composition Ø¨Ø§ ComponentButton â€” Ø¯Ú©Ù…Ù‡â€ŒÙ‡Ø§ÛŒ Accept/Reject
 *   Û³. Outside-click detection â€” document click listener Ø¨Ø±Ø§ÛŒ Ø¨Ø³ØªÙ† Ù…Ù†Ùˆ
 *   Û´. Conditional rendering Ù†ÙˆØ§Ø± Ø¯Ú©Ù…Ù‡â€ŒÙ‡Ø§ â€” conditionWhen Ø±ÙˆÛŒ Accept/Reject has
 *   Ûµ. Style getters Ù…Ø³ØªÙ‚Ù„ â€” Ù‡Ø± style Ù…Ù†Ø·Ù‚ Ø¬Ø¯Ø§Ú¯Ø§Ù†Ù‡ Ø¯Ø§Ø±Ø¯
 */
export class ComponentPositionMenu extends ComponentPositionMenuBase<ReturnType<typeof createPositionMenuStep>>{

    /* ---------------------------------------------
       Internal State â€” document click listener Ø¨Ø±Ø§ÛŒ outside-click detection
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
       Plan 8.2.7 â€” Component Disposal
    --------------------------------------------- */
    dispose(): void {
        this.pr_cleanupDocumentListener();
        this.disposeStep();
    }


    /* ---------------------------------------------
       Plan 11.2 â€” renderContentComponent
       Ù„Ø§ÛŒÙ‡ Ø³Ø§Ø®ØªØ§Ø± Ø§Ø² Ø·Ø±ÛŒÙ‚ Schema Ù¾Ø§ÛŒÙ‡ Ø±Ù†Ø¯Ø± Ù…ÛŒâ€ŒØ´ÙˆØ¯.
       renderContentComponent ÙÙ‚Ø· Ù…Ø­ØªÙˆØ§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ Ø±Ø§ Ø±Ù†Ø¯Ø± Ù…ÛŒâ€ŒÚ©Ù†Ø¯.
    --------------------------------------------- */
    override renderContentComponent(
        attrsDefault?: any,
        data?:         any,
        extra?:        any,
    ): CoreReactive.App {
        return this.executeSchemaPart(Schemas.FORM_FLOAT_MENU.part, {});
    }


    /* ---------------------------------------------
       renderManagerComponent â€” Routing
       Plan 11.2 â€” COMPONENT + STRUCTURE Ø§Ø² TraitØŒ Ø¨Ù‚ÛŒÙ‡ Ø§Ø®ØªØµØ§ØµÛŒ
    --------------------------------------------- */
    override renderManagerComponent(
        partName:     string,
        attrsDefault: any,
        data:         any,
        extra?:       any,
    ): CoreReactive.App {

        switch (partName) {
            // --- Plan 11.2: Schema Ù¾Ø§ÛŒÙ‡ ---
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            // --- Schema Ø§Ø®ØªØµØ§ØµÛŒ ---
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
       renderFormFloatMenu â€” Ø±Ù†Ø¯Ø± Part Ø§ØµÙ„ÛŒ
       Ø§Ø² ComponentFloatMenu (Category callable) Ø§Ø³ØªÙØ§Ø¯Ù‡ Ù…ÛŒâ€ŒÚ©Ù†Ø¯
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
                    marginTop: UtilStyle.Css_SizeUnit(10, UtilConst.Units.PEXEL),
                },
                prop_floatWidth:               prop_menuBodyWidth,
                prop_floatBackground:          prop_menuBackgroundColor,
                prop_floatBorderColor:         prop_menuBorderColor,
                prop_floatBorderWidth:         prop_menuBorderWidth,
            },
            {},
        );

        // Preserve attrsDefault (id/class/...) on a wrapper so outside-click can detect by part id
        return CoreReactive.App.part("section", {
            attrs: { ...attrsDefault },
            className: ["position-relative", "d-block", "w-100", "h-100"],
            children: [
                floatMenu.getReactiveElement(),
            ],
        });
    }


    /* ---------------------------------------------
       renderFormFloatMenuSelector â€” Ø±Ù†Ø¯Ø± selector (trigger)
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
                    const wasOpen = this.get("prop_menuIsOpen");
                    const willOpen = !wasOpen;

                    // Notify only when opening
                    if (willOpen) {
                        this.executeMethod("CLICK_OPEN", event, {});
                    }

                    this.set("prop_menuIsOpen", willOpen);

                    // Manage outside-click listener correctly
                    if (willOpen) {
                        this._ON_MENU_OPEN = this._ON_MENU_OPEN ?? this.pr_handleMenuClose.bind(this, true);
                        document.addEventListener("click", this._ON_MENU_OPEN as any);
                        requestAnimationFrame(() => this.pr_adjustFloatPosition());
                    } else {
                        this.pr_cleanupDocumentListener();
                    }
                },
            },
        });
    }


    /* ---------------------------------------------
       renderFormFloatMenuBody â€” Ø±Ù†Ø¯Ø± body container
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
       renderFormFloatMenuBodyContent â€” Ø±Ù†Ø¯Ø± body content Ø¨Ø§ scroll
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
            className: [],
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
       renderFormFloatMenuBodyButtons â€” Ø±Ù†Ø¯Ø± Ù†ÙˆØ§Ø± Ø¯Ú©Ù…Ù‡â€ŒÙ‡Ø§
       Conditional: ÙÙ‚Ø· Ø§Ú¯Ø± Ù‡Ù… Accept Ùˆ Ù‡Ù… Reject Ù†Ù…Ø§ÛŒØ´ Ø¯Ø§Ø¯Ù‡ Ø´ÙˆÙ†Ø¯
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
                        "p-0", "mx-1",
                    ],
                    styles: {
                        display:        "flex",
                        flexDirection:  "row",
                        justifyContent: "center",
                        gap:            "0.5rem",
                    },
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
       renderFormFloatMenuBodyButtonsAccept â€” Ø±Ù†Ø¯Ø± Ø¯Ú©Ù…Ù‡ Accept
       Ø§Ø² ComponentButton (Category callable) Ø§Ø³ØªÙØ§Ø¯Ù‡ Ù…ÛŒâ€ŒÚ©Ù†Ø¯
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

        const defaultAcceptTitle = CoreLanguage.App.translate(
            Keys.category.components.positionMenu.texts.btnAcceptTitle,
        );
        const resolvedAcceptTitle = CoreObservable.App.computed(
            (title, defaultTitle) => title ?? defaultTitle,
            [prop_menuBtnAcceptTitle, defaultAcceptTitle],
            this.getScope(),
        );
        const resolvedAcceptIcon = CoreObservable.App.computed(
            (icon) => icon ?? UiIcons.Src.StatusIsTrue.Definition,
            [prop_menuBtnAcceptIcon],
            this.getScope(),
        );

        const acceptBtn = UiCategory.UI.Simples.Button(
            {
                styles: { flex: "0 1 auto", width: "auto" },
                prop_btnTitle: resolvedAcceptTitle as any,
                prop_btnType:  ButtonAction.SUBMIT,
                prop_btnSemantic: ButtonSemantic.SUBMIT,
                prop_btnIcon:  resolvedAcceptIcon as any,
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
       renderFormFloatMenuBodyButtonsReject â€” Ø±Ù†Ø¯Ø± Ø¯Ú©Ù…Ù‡ Reject
       Ø§Ø² ComponentButton (Category callable) Ø§Ø³ØªÙØ§Ø¯Ù‡ Ù…ÛŒâ€ŒÚ©Ù†Ø¯
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

        const defaultRejectTitle = CoreLanguage.App.translate(
            Keys.category.components.positionMenu.texts.btnRejectTitle,
        );
        const resolvedRejectTitle = CoreObservable.App.computed(
            (title, defaultTitle) => title ?? defaultTitle,
            [prop_menuBtnRejectTitle, defaultRejectTitle],
            this.getScope(),
        );
        const resolvedRejectIcon = CoreObservable.App.computed(
            (icon) => icon ?? UiIcons.Src.FileWindowClose.Definition,
            [prop_menuBtnRejectIcon],
            this.getScope(),
        );

        const rejectBtn = UiCategory.UI.Simples.Button(
            {
                styles: { flex: "0 1 auto", width: "auto" },
                prop_btnTitle: resolvedRejectTitle as any,
                prop_btnType:  ButtonAction.BUTTON,
                prop_btnSemantic: ButtonSemantic.CANCEL,
                prop_btnIcon:  resolvedRejectIcon as any,
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
    ///  Ù‡Ø± Ù…ØªØ¯ ÛŒÚ© CoreObservable.App.computed Ø¨Ø±Ù…ÛŒâ€ŒÚ¯Ø±Ø¯Ø§Ù†Ø¯
    ///  ØªÙˆØ³Ø¹Ù‡â€ŒÙ¾Ø°ÛŒØ±: Ù‡Ø± style Ù…Ù†Ø·Ù‚ Ù…Ø³ØªÙ‚Ù„ Ø¯Ø§Ø±Ø¯
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

    private pr_adjustFloatPosition() {
        const rootEl = this.getElement() as HTMLElement | null;
        if (!rootEl) return;

        const popup = rootEl.querySelector('[data-part-name="part-selector-position"]') as HTMLElement | null;
        if (!popup) return;

        const popupRect  = popup.getBoundingClientRect();
        const viewportW  = window.innerWidth || document.documentElement.clientWidth;

        const isRtl = CoreConfig.Settings.DirectionRtl.get();

        if (isRtl) {
            // RTL: default is left:0 (extends right). If overflows right edge, flip to right:0
            if (popupRect.right > viewportW) {
                popup.style.left   = "auto";
                popup.style.right   = "0px";
            }
        } else {
            // LTR: default is right:0 (extends left). If overflows left edge, flip to left:0
            if (popupRect.left < 0) {
                popup.style.right   = "auto";
                popup.style.left     = "0px";
            }
        }
    }
}

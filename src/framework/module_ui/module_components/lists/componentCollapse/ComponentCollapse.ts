import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig     from "@/core_configs";
import * as UtilStyle      from "@/util_styles";
import * as UtilConst      from "@/util_consts";
import * as UiIcons        from "@/ui_icons";
// --------------------------------
import {ComponentCollapseBase}  from "./ComponentCollapseBase";
import {createCollapseStep}    from "./Step";
import {Schemas}               from "./Schemas";
import {MethodsConfigType}     from "./Methods";
import {PropsType}             from "./Props";
import {PartAttrDefault}       from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
// --------------------------------
import * as ComponentBorder from "../componentBorder";
import * as ComponentIcon   from "../componentIcon";


/**
 * ComponentCollapse — کلاس نهایی (Plan 15.1.0 — بازیابی کامل Behavior Legacy)
 *
 * معماری Composition:
 *   ComponentCollapse HAS-A ComponentBorder (نه IS-A)
 *   ComponentBorder در renderFormBorder از طریق مستقیم
 *   new ComponentBorder.Component ساخته می‌شود — نه new مستقیم.
 *   ComponentIcon در renderFormBorderContentIcon و renderFormBorderContentArrow
 *   از طریق مستقیم new ComponentIcon.Component ساخته می‌شود.
 *
 * Constructor امضا: (config, methods, identity?)
 *   config  — شامل propهای پایه + propهای اختصاصی
 *   methods — methodهای اختصاصی (CLICK)
 *   identity — { unique?, emit?, events? }
 *
 * Plan 9.1 — Step داخلی در constructor ساخته می‌شود (factory function).
 * Plan 11.2 — لایه <component-collapse> + <section> از Schema پایه (COMPONENT + STRUCTURE) رندر می‌شود.
 *
 * بازیابی Behavior از Legacy:
 *   - title قابل‌کلیک → CLICK method روی Border composition
 *   - arrow toggle → prop_collapseBodyIsOpen mapList (arrow_up / arrow_down)
 *   - body show/hide → prop_collapseBodyIsOpen mapBoolean ("show" / "d-none")
 *   - fontSize واکنش‌گرا → computed روی CoreConfig.Settings.SizeName
 */
export class ComponentCollapse extends ComponentCollapseBase {


    constructor(
        config?:  Partial<StructurePropsType & PropsType>,
        methods?: MethodsConfigType<ComponentCollapse>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createCollapseStep();

        super("collapse", null, identity, step);

        this.renderComponent(
            config as any,
            methods as any,
            identity?.events ?? null,
        );
    }


    /* ---------------------------------------------
       Plan 9.1 — Component Disposal
    --------------------------------------------- */
    dispose(): void {
        this.disposeStep();
    }


    /* ---------------------------------------------
       Plan 11.2 — renderContentComponent
       لایه ساختار از طریق Schema پایه (COMPONENT + STRUCTURE) رندر می‌شود.
       renderContentComponent فقط محتوای اختصاصی را رندر می‌کند.
    --------------------------------------------- */
    override renderContentComponent(
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {
        return this.executeSchemaPart(Schemas.FORM.part, {});
    }


    /* ---------------------------------------------
       renderManagerComponent — Routing
       Plan 11.2 — COMPONENT + STRUCTURE از Trait، بقیه اختصاصی
    --------------------------------------------- */
    override renderManagerComponent(
        partName:     string,
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {

        switch (partName) {
            // --- Plan 11.2: Schema پایه ---
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            // --- Schema اختصاصی ---
            case Schemas.FORM.part:
                return this.renderForm(attrsDefault, data, extra);
            case Schemas.FORM_BORDER.part:
                return this.renderFormBorder(attrsDefault, data, extra);
            case Schemas.FORM_BORDER_CONTENT.part:
                return this.renderFormBorderContent(attrsDefault, data, extra);
            case Schemas.FORM_BORDER_CONTENT_ICON.part:
                return this.renderFormBorderContentIcon(attrsDefault, data, extra);
            case Schemas.FORM_BORDER_CONTENT_TITLE.part:
                return this.renderFormBorderContentTitle(attrsDefault, data, extra);
            case Schemas.FORM_BORDER_CONTENT_ARROW.part:
                return this.renderFormBorderContentArrow(attrsDefault, data, extra);
            case Schemas.FORM_BODY.part:
                return this.renderFormBody(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderForm — رندر Part FORM اصلی
       ظرف اصلی شامل FORM_BORDER + FORM_BODY
    --------------------------------------------- */
    protected renderForm(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            children: [
                this.executeSchemaPart(Schemas.FORM_BORDER.part, {}),
                this.executeSchemaPart(Schemas.FORM_BODY.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderFormBorder — رندر Part FORM_BORDER
       Composition: new ComponentBorder.Component (مستقیم)
       + click → toggle prop_collapseBodyIsOpen + executeMethod("CLICK")
    --------------------------------------------- */
    protected renderFormBorder(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_collapseBorderBackground  = data?.["prop_collapseBorderBackground"]  ?? bind.prop_collapseBorderBackground;
        const prop_collapseBorderClass        = data?.["prop_collapseBorderClass"]      ?? bind.prop_collapseBorderClass;
        const prop_collapseBorderStyles       = data?.["prop_collapseBorderStyles"]     ?? bind.prop_collapseBorderStyles;
        const prop_collapseBorderColor        = data?.["prop_collapseBorderColor"]      ?? bind.prop_collapseBorderColor;
        const prop_collapseBorderWidth        = data?.["prop_collapseBorderWidth"]      ?? bind.prop_collapseBorderWidth;
        const prop_collapseBorderRadius       = data?.["prop_collapseBorderRadius"]     ?? bind.prop_collapseBorderRadius;
        const prop_collapseBorderMinWidth     = data?.["prop_collapseBorderMinWidth"]   ?? bind.prop_collapseBorderMinWidth;

        return new ComponentBorder.Component(
            {
                prop_borderClass:            prop_collapseBorderClass,
                prop_borderStyles:           prop_collapseBorderStyles,
                prop_content:                this.executeSchemaPart(Schemas.FORM_BORDER_CONTENT.part),
                prop_contentBackgroundColor:  prop_collapseBorderBackground,
                prop_borderColor:            prop_collapseBorderColor,
                prop_borderWidth:            prop_collapseBorderWidth as any,
                prop_borderRadius:           prop_collapseBorderRadius as any,
                prop_minWidth:               prop_collapseBorderMinWidth,
            } as any,
            {
                CLICK_BORDER: (event: Event) => {
                    const isOpen = this.get("prop_collapseBodyIsOpen") as boolean;
                    this.set("prop_collapseBodyIsOpen", !isOpen);
                    this.executeMethod("CLICK", event, {});
                },
            },
            {
                unique: (this as any)._COMPONENT_STEP?.click ?? undefined,
            },
        ).getReactiveElement() as CoreReactive.App;
    }


    /* ---------------------------------------------
       renderFormBorderContent — رندر Part FORM_BORDER_CONTENT
       section.row + children [ICON, TITLE, ARROW]
    --------------------------------------------- */
    protected renderFormBorderContent(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            styles: { position: "relative", display: "flex", alignItems: "center", flexWrap: "nowrap" },
            className: ["p-0", "m-0"],
            children: [
                this.executeSchemaPart(Schemas.FORM_BORDER_CONTENT_ICON.part, {}),
                this.executeSchemaPart(Schemas.FORM_BORDER_CONTENT_TITLE.part, {}),
                this.executeSchemaPart(Schemas.FORM_BORDER_CONTENT_ARROW.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderFormBorderContentIcon — رندر Part FORM_BORDER_CONTENT_ICON
       Composition: new ComponentIcon.Component (مستقیم)
       رندر شرطی آیکون با conditionWhen
    --------------------------------------------- */
    protected renderFormBorderContentIcon(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_collapseIcon       = data?.["prop_collapseIcon"]       ?? bind.prop_collapseIcon;
        const prop_collapseIconClass  = data?.["prop_collapseIconClass"]  ?? bind.prop_collapseIconClass;
        const prop_collapseIconStyles = data?.["prop_collapseIconStyles"] ?? bind.prop_collapseIconStyles;

        // عرض آیکون = iconSize(SizeName)
        // فضای آیکون = iconSize + 2*margin (برای padding دو طرف)
        const iconWidth = CoreObservable.App.computed(
            (sizeName) => UtilStyle.Css_IconSize(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
        const iconSpace = CoreObservable.App.computed(
            (sizeName) => {
                const iconSize = UtilStyle.Css_IconSize(sizeName) as any;
                const margin  = UtilStyle.Css_Margin(sizeName as any) as any;
                return UtilStyle.Css_SizeCalc(iconSize, UtilConst.Operation.ADD, margin, UtilConst.Operation.ADD, margin);
            },
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );

        const iconStylesMerged = CoreObservable.App.computed(
            (styleMap, w, marginVal) => ({
                width:      w,
                minWidth:   w,
                flexShrink: "0",
                marginLeft: marginVal,
                marginRight: marginVal,
                ...(styleMap ?? {}),
            }),
            [prop_collapseIconStyles, iconWidth, CoreObservable.App.computed(
                (sizeName) => UtilStyle.Css_Margin(sizeName as any),
                [CoreConfig.Settings.SizeName.observable()],
                this.getScope(),
            )],
            this.getScope(),
        );

        return CoreObservable.App.computed(
            (iconSource, styles) => {
                if (iconSource == null) return this.renderEmptyContent(attrsDefault);
                return new ComponentIcon.Component({
                    prop_icon:       UiIcons.CreateIcon(iconSource as any, {
                        primaryColor:   UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
                        secondaryColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                    }),
                    prop_iconClass:  prop_collapseIconClass as any,
                    prop_iconStyles: styles,
                }, {}).getReactiveElement() as CoreReactive.App;
            },
            [prop_collapseIcon, iconStylesMerged],
            this.getScope(),
        ) as any;
    }


    /* ---------------------------------------------
       renderFormBorderContentTitle — رندر Part FORM_BORDER_CONTENT_TITLE
       section.col + <b> + computed styles (fontSize, lineHeight, color)
    --------------------------------------------- */
    protected renderFormBorderContentTitle(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_collapseTitle       = data?.["prop_collapseTitle"]       ?? bind.prop_collapseTitle;
        const prop_collapseTitleStyles = data?.["prop_collapseTitleStyles"] ?? bind.prop_collapseTitleStyles;
        const prop_collapseTitleClass  = data?.["prop_collapseTitleClass"]  ?? bind.prop_collapseTitleClass;
        const prop_collapseTitleColor  = data?.["prop_collapseTitleColor"]  ?? bind.prop_collapseTitleColor;

        const contentHeight   = CoreObservable.App.computed(
            (sizeName) => UtilStyle.Css_Height(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
        const contentFontSize = CoreObservable.App.computed(
            (sizeName) => UtilStyle.Css_FontSize(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );

        // عرض title = calc(100% - (iconSize + 2*margin))
        const titleWidth = CoreObservable.App.computed(
            (sizeName) => {
                const iconSize = UtilStyle.Css_IconSize(sizeName) as any;
                const margin  = UtilStyle.Css_Margin(sizeName as any) as any;
                const iconSpace = UtilStyle.Css_SizeCalc(iconSize, UtilConst.Operation.ADD, margin, UtilConst.Operation.ADD, margin);
                return UtilStyle.Css_SizeCalc("100%" as any, UtilConst.Operation.MINUS, iconSpace);
            },
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );

        const stylesMerged = CoreObservable.App.computed(
            (styleMap, color, h, fs, w) => ({
                lineHeight: h,
                fontSize:   fs,
                width:      w,
                ...(styleMap ?? {}),
                ...(color != null ? { color } : {}),
            }),
            [prop_collapseTitleStyles, prop_collapseTitleColor, contentHeight, contentFontSize, titleWidth],
            this.getScope(),
        );

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            stylesBind: stylesMerged,
            classBind: [prop_collapseTitleClass as any],
            className: ["flex-grow-1"],
            children: [
                CoreReactive.App.b({
                    children: [prop_collapseTitle as any],
                }),
            ],
        });
    }


    /* ---------------------------------------------
       renderFormBorderContentArrow — رندر Part FORM_BORDER_CONTENT_ARROW
       Composition: new ComponentIcon.Component (مستقیم)
       arrow up/down بر اساس prop_collapseBodyIsOpen (mapList)
    --------------------------------------------- */
    protected renderFormBorderContentArrow(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_collapseArrowClass  = data?.["prop_collapseArrowClass"]  ?? bind.prop_collapseArrowClass;
        const prop_collapseArrowStyles = data?.["prop_collapseArrowStyles"] ?? bind.prop_collapseArrowStyles;
        const prop_collapseBodyIsOpen  = data?.["prop_collapseBodyIsOpen"]  ?? bind.prop_collapseBodyIsOpen;

        const directionRtl = CoreConfig.Settings.DirectionRtl.observable();

        const arrowIcon = CoreObservable.App.computed(
            (isOpen: boolean) => {
                const src = isOpen
                    ? UiIcons.Src.ArrowChevronUp.Definition
                    : UiIcons.Src.ArrowChevronDown.Definition;
                return UiIcons.CreateIcon(src, {
                    size: UtilConst.Sizes.L,
                    primaryColor: UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
                    secondaryColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                });
            },
            [prop_collapseBodyIsOpen],
            this.getScope(),
        );

        // فلش در خلاف جهت collapse قرار می‌گیرد:
        // RTL → سمت چپ، LTR → سمت راست
        const arrowPositionStyles = CoreObservable.App.computed(
            (rtl: boolean, styleMap: Record<string, string> | null) => ({
                position: "absolute",
                top:      "50%",
                transform: "translateY(-50%)",
                ...(rtl ? { left: "0.5rem" } : { right: "0.5rem" }),
                ...(styleMap ?? {}),
            }),
            [directionRtl, prop_collapseArrowStyles],
            this.getScope(),
        );

        return CoreObservable.App.computed(
            (icon: any, styles: any) => new ComponentIcon.Component({
                prop_icon:       icon,
                prop_iconClass:  prop_collapseArrowClass as any,
                prop_iconStyles: styles,
            }, {}).getReactiveElement() as CoreReactive.App,
            [arrowIcon, arrowPositionStyles],
            this.getScope(),
        ) as any;
    }


    /* ---------------------------------------------
       renderFormBody — رندر Part FORM_BODY
       section.col + computed styles (fontSize, lineHeight, border)
       + show/hide با mapBoolean(prop_collapseBodyIsOpen)
    --------------------------------------------- */
    protected renderFormBody(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_collapseBody            = data?.["prop_collapseBody"]            ?? bind.prop_collapseBody;
        const prop_collapseBodyStyles      = data?.["prop_collapseBodyStyles"]      ?? bind.prop_collapseBodyStyles;
        const prop_collapseBodyClass       = data?.["prop_collapseBodyClass"]       ?? bind.prop_collapseBodyClass;
        const prop_collapseBodyIsOpen      = data?.["prop_collapseBodyIsOpen"]      ?? bind.prop_collapseBodyIsOpen;
        const prop_collapseBodyBorderColor = data?.["prop_collapseBodyBorderColor"] ?? bind.prop_collapseBodyBorderColor;
        const prop_collapseBodyBorderWidth = data?.["prop_collapseBodyBorderWidth"] ?? bind.prop_collapseBodyBorderWidth;
        const prop_collapseBodyBorderRadius = data?.["prop_collapseBodyBorderRadius"] ?? bind.prop_collapseBodyBorderRadius;

        const contentHeight   = CoreObservable.App.computed(
            (sizeName) => UtilStyle.Css_Height(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
        const contentFontSize = CoreObservable.App.computed(
            (sizeName) => UtilStyle.Css_FontSize(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );

        const borderWidthComputed = CoreObservable.App.computed(
            (width: any) => {
                if (typeof width === "string") {
                    return UtilStyle.Css_BorderWidth(width as UtilConst.Sizes);
                } else if (typeof width === "number") {
                    return `${width}px`;
                }
                return null;
            },
            [prop_collapseBodyBorderWidth],
            this.getScope(),
        );

        const borderRadiusComputed = CoreObservable.App.computed(
            (radius: any) => {
                if (typeof radius === "string") {
                    return UtilStyle.Css_BorderRadius(radius as UtilConst.Sizes);
                } else if (typeof radius === "number") {
                    return `${radius}px`;
                }
                return null;
            },
            [prop_collapseBodyBorderRadius],
            this.getScope(),
        );

        const borderStyleComputed = CoreObservable.App.computed(
            (width: any) => {
                if (width != null) return "solid";
                return null;
            },
            [prop_collapseBodyBorderWidth],
            this.getScope(),
        );

        const bodyDisplay = CoreObservable.App.computed(
            (isOpen: boolean) => isOpen ? "show" : "d-none",
            [prop_collapseBodyIsOpen],
            this.getScope(),
        );

        const bodyStylesMerged = CoreObservable.App.computed(
            (styleMap, borderColor, borderStyle, borderWidth, borderRadius, h, fs) => ({
                lineHeight:   h,
                fontSize:     fs,
                ...(styleMap ?? {}),
                borderColor,
                borderStyle,
                borderWidth,
                borderRadius,
            }),
            [prop_collapseBodyStyles, prop_collapseBodyBorderColor, borderStyleComputed, borderWidthComputed, borderRadiusComputed, contentHeight, contentFontSize],
            this.getScope(),
        );

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            stylesBind: bodyStylesMerged,
            classBind: [bodyDisplay, prop_collapseBodyClass as any],
            className: ["col-12", "p-2"],
            children: [prop_collapseBody as any],
        });
    }


    /* ---------------------------------------------
       renderEmptyContent — fallback خالی
    --------------------------------------------- */
    public renderEmptyContent(
        attrsDefault?: PartAttrDefault,
    ): CoreReactive.App {
        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
        });
    }

}

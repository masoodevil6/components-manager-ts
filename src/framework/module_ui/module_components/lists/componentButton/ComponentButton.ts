import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig     from "@/core_configs";
import * as UtilStyle      from "@/util_styles";
import * as UtilConst      from "@/util_consts";
import * as UiIcons        from "@/ui_icons";
// --------------------------------
import {ComponentButtonBase}    from "./ComponentButtonBase";
import {Schemas}                from "./Schemas";
import {MethodsType,
        MethodsConfigType}      from "./Methods";
import {
    ButtonSemantic,
    IconDescriptor, Props
} from "./Props";
import {PartAttrDefault}        from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {PropsConfigType as ButtonPropsConfigType} from "./Props";
import {createButtonStep}                from "./Step";
// --------------------------------
import * as ComponentIcon from "../componentIcon";


/**
 * ComponentButton — کلاس نهایی (Plan 9.1.1 — بازیابی کامل Behavior Legacy)
 *
 * معماری Composition:
 *   ComponentButton HAS-A ComponentStructure (نه IS-A)
 *   ComponentStructure در renderContentComponent ساخته می‌شود
 *   و content آن = renderButton (محتوای اختصاصی ComponentButton)
 *
 * Constructor امضا: (config, methods, identity?)
 *   config  — شامل propهای پایه + propهای اختصاصی (prop_btnTitle, ...)
 *   methods — methodهای اختصاصی (CLICK, HOVER, BLUR)
 *   identity — { unique?, emit?, events? }
 *
 * Plan 9.1.1 — Behavior بازیابی‌شده از Legacy:
 *   ۱. رنگ‌های semantic چهارگانه (SUBMIT→primary، BACK→secondary، CANCEL→error، CUSTOM→prop)
 *   ۲. hover engine — با CoreObservable.App<boolean> داخلی (معادل el.hover قدیمی)
 *   ۳. borderRadius با منطق DEFAULT + RTL-awareness (CSS logical properties)
 *   ۴. رندر شرطی آیکون (conditionWhen) — با آیکون: title+icon، بدون آیکون: فقط title
 *   ۵. رنگ title بر اساس semantic + hover
 *   ۶. height بر اساس prop + سایز سراسری
 *   ۷. CUSTOM semantic → رنگ‌ها از propهای سفارشی
 */
export class ComponentButton extends ComponentButtonBase {

    /* ---------------------------------------------
       Hover State — معادل el.hover قدیمی (Plan 9.1.1)
       Observable داخلی کلاس — توسط on: {mouseenter/mouseleave} تغذیه می‌شود
    --------------------------------------------- */
    private readonly _HOVER_STATE = new CoreObservable.App<boolean>(false);


    constructor(
       config?:  Partial<StructurePropsType & ButtonPropsConfigType>,
        methods?: MethodsConfigType<ComponentButton>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        // Plan 8.2.7 / 9.1 — Step داخلی در constructor ساخته می‌شود
        const step = createButtonStep();

        super("button", null, identity, step);

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
        return this.executeSchemaPart(Schemas.BUTTON.part, {});
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
            case Schemas.BUTTON.part:
                return this.renderButton( attrsDefault, data, extra);
            case Schemas.BUTTON_TITLE.part:
                return this.renderButtonTitle( attrsDefault, data, extra);
            case Schemas.BUTTON_ICON.part:
                return this.renderButtonIcon( attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }




    private static readonly _semanticBackground: Record<ButtonSemantic, string | null> = {
        [ButtonSemantic.SUBMIT]: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY,    UtilConst.ColorGrad.GRADE_1),
        [ButtonSemantic.BACK]:   UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY,  UtilConst.ColorGrad.GRADE_1),
        [ButtonSemantic.CANCEL]: UtilStyle.Css_Color(UtilConst.ColorMain.ERROR,      UtilConst.ColorGrad.GRADE_1),
        [ButtonSemantic.CUSTOM]: null,
    };

    private static readonly _semanticBackgroundHover: Record<ButtonSemantic, string | null> = {
        [ButtonSemantic.SUBMIT]: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY,    UtilConst.ColorGrad.GRADE_3),
        [ButtonSemantic.BACK]:   UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY,  UtilConst.ColorGrad.GRADE_3),
        [ButtonSemantic.CANCEL]: UtilStyle.Css_Color(UtilConst.ColorMain.ERROR,      UtilConst.ColorGrad.GRADE_3),
        [ButtonSemantic.CUSTOM]: null,
    };

    private static readonly _semanticBorder: Record<ButtonSemantic, string | null> = {
        [ButtonSemantic.SUBMIT]: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY,    UtilConst.ColorGrad.GRADE_1),
        [ButtonSemantic.BACK]:   UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY,  UtilConst.ColorGrad.GRADE_1),
        [ButtonSemantic.CANCEL]: UtilStyle.Css_Color(UtilConst.ColorMain.ERROR,      UtilConst.ColorGrad.GRADE_1),
        [ButtonSemantic.CUSTOM]: null,
    };

    private static readonly _semanticTitleColor: Record<ButtonSemantic, string | null> = {
        [ButtonSemantic.SUBMIT]: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY,    UtilConst.ColorGrad.GRADE_5),
        [ButtonSemantic.BACK]:   UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY,  UtilConst.ColorGrad.GRADE_5),
        [ButtonSemantic.CANCEL]: UtilStyle.Css_Color(UtilConst.ColorMain.ERROR,      UtilConst.ColorGrad.GRADE_5),
        [ButtonSemantic.CUSTOM]: null,
    };

    private static readonly _semanticTitleColorHover: Record<ButtonSemantic, string | null> = {
        [ButtonSemantic.SUBMIT]: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY,    UtilConst.ColorGrad.GRADE_1),
        [ButtonSemantic.BACK]:   UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY,  UtilConst.ColorGrad.GRADE_1),
        [ButtonSemantic.CANCEL]: UtilStyle.Css_Color(UtilConst.ColorMain.ERROR,      UtilConst.ColorGrad.GRADE_1),
        [ButtonSemantic.CUSTOM]: null,
    };


    private static resolveSemantic(
        semantic:    ButtonSemantic,
        map:         Record<ButtonSemantic, string | null>,
        customValue: string | null,
    ): string | null {
        return semantic === ButtonSemantic.CUSTOM ? customValue : map[semantic];
    }



    /* ---------------------------------------------
       renderButton
    --------------------------------------------- */
    protected renderButton(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_btnTitle                   = data?.["prop_btnTitle"]                   ?? bind.prop_btnTitle;
        const prop_btnSemantic                = data?.["prop_btnSemantic"]                ?? bind.prop_btnSemantic;
        const prop_btnVariant                 = data?.["prop_btnVariant"]                 ?? bind.prop_btnVariant;
        const prop_btnClass                   = data?.["prop_btnClass"]                   ?? bind.prop_btnClass;
        const prop_btnStyles                  = data?.["prop_btnStyles"]                  ?? bind.prop_btnStyles;
        const prop_btnDisabled                = data?.["prop_btnDisabled"]                ?? bind.prop_btnDisabled;
        const prop_btnWidth                   = data?.["prop_btnWidth"]                   ?? bind.prop_btnWidth;
        const prop_btnHeight                  = data?.["prop_btnHeight"]                  ?? bind.prop_btnHeight;
        const prop_btnBorderColor             = data?.["prop_btnBorderColor"]             ?? bind.prop_btnBorderColor;
        const prop_btnBorderWidth             = data?.["prop_btnBorderWidth"]             ?? bind.prop_btnBorderWidth;
        const prop_btnBackgroundColor         = data?.["prop_btnBackgroundColor"]         ?? bind.prop_btnBackgroundColor;
        const prop_btnBackgroundColor_hover   = data?.["prop_btnBackgroundColor_hover"]   ?? bind.prop_btnBackgroundColor_hover;
        const prop_btnBorderRadius            = data?.["prop_btnBorderRadius"]            ?? bind.prop_btnBorderRadius;
        const prop_btnBorderRadiusStartTop    = data?.["prop_btnBorderRadiusStartTop"]    ?? bind.prop_btnBorderRadiusStartTop;
        const prop_btnBorderRadiusStartBottom = data?.["prop_btnBorderRadiusStartBottom"] ?? bind.prop_btnBorderRadiusStartBottom;
        const prop_btnBorderRadiusEndTop      = data?.["prop_btnBorderRadiusEndTop"]      ?? bind.prop_btnBorderRadiusEndTop;
        const prop_btnBorderRadiusEndBottom   = data?.["prop_btnBorderRadiusEndBottom"]   ?? bind.prop_btnBorderRadiusEndBottom;


        // const prop_btnType                    = data?.["prop_btnType"]                    ?? bind.prop_btnType;
        // const prop_btnTitleColor              = data?.["prop_btnTitleColor"]              ?? bind.prop_btnTitleColor;
        // const prop_btnTitleColor_hover        = data?.["prop_btnTitleColor_hover"]        ?? bind.prop_btnTitleColor_hover;
        // const prop_btnIcon                    = data?.["prop_btnIcon"]                    ?? bind.prop_btnIcon;

        /* --- رندر شرطی آیکون (Plan 9.1.1 — معادل conditionWhen قدیمی) ---
           با آیکون: [title, icon] — بدون آیکون: [title]
           onTrue/onFalse در زمان تغییر prop_btnIcon اجرا می‌شوند              */
        // const iconChildren = CoreObservable.App.conditionWhen(
        //     prop_btnIcon,
        //     (icon) => icon != null,
        //     () => {
        //         const descriptor = prop_btnIcon.get() as IconDescriptor;
        //         const iconEl = this.renderIconContent(descriptor, titleColor);
        //         return iconEl ? [iconEl] : [];
        //     },
        //     () => [],
        //     scope,
        // );


        return CoreReactive.App.button({
            attrs: {
                ...attrsDefault,
            },
            attrsBind: {
                title:    prop_btnTitle,
                disabled: prop_btnDisabled,
            },
            className: [
                "btn"
            ] ,
            styles: {
                "transition":                      "background-color 200ms ease, color 200ms ease, border-color 200ms ease",
                "display":                         "inline-flex",
                "align-items":                     "center",
                "justify-content":                 "center",
                "gap":                             "0.5rem",
                "cursor":                          "pointer",
                "border-style":                    "solid"
            },
            stylesBind: {
                "width":                            prop_btnWidth,
                "height":                           this.getStyleBtnHeight(prop_btnHeight),
                "background-color":                 this.getStyleBtnBackgroundColor(prop_btnSemantic , prop_btnBackgroundColor , prop_btnBackgroundColor_hover),
                "border":                           this.getStyleBtnBorderColor(prop_btnSemantic , prop_btnBorderColor , prop_btnBorderWidth),
                "border-radius":                    this.getStyleBtnBorderRadius(prop_btnBorderRadius),
                "border-start-start-radius":        this.getStyleBtnBorderRadiusStartTop(prop_btnBorderRadiusStartTop , prop_btnBorderRadius),
                "border-end-start-radius":          this.getStyleBtnBorderRadiusStartBottom(prop_btnBorderRadiusStartBottom , prop_btnBorderRadius),
                "border-start-end-radius":          this.getStyleBtnBorderRadiusEndTop(prop_btnBorderRadiusEndTop , prop_btnBorderRadius),
                "border-end-end-radius":            this.getStyleBtnBorderRadiusEndBottom(prop_btnBorderRadiusEndBottom , prop_btnBorderRadius),
                prop_btnStyles,
            },
            classBind: [
                prop_btnVariant,
                prop_btnClass,
            ],
            unique: this._COMPONENT_STEP?.click,
            emit: (request) => {
                return { value: prop_btnTitle.get(), valid: true };
            },
            on: {
                click: (event: Event) => {
                    event.preventDefault();
                    this.executeMethod("CLICK", event, {});
                },
                mouseenter: (event: Event) => {
                    this._HOVER_STATE.set(true);
                    this.executeMethod("HOVER", event, {});
                },
                mouseleave: (event: Event) => {
                    this._HOVER_STATE.set(false);
                    this.executeMethod("BLUR", event, {});
                },
            },
            children: [
                this.executeSchemaPart( Schemas.BUTTON_TITLE.part ,  { }),
                this.executeSchemaPart( Schemas.BUTTON_ICON.part ,  { }),
                /*CoreReactive.App.b({
                    className: ["flex-grow-1"],
                    stylesBind: {
                        color:  this.getStyleBtnTitleColor(prop_btnSemantic , prop_btnTitleColor , prop_btnTitleColor_hover),
                    },
                    children: [prop_btnTitle],
                }),*/
                //...iconChildren.get(),

            ],
        });
    }


    /* ---------------------------------------------
       renderButton
    --------------------------------------------- */
    protected renderButtonTitle(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_btnTitle                   = data?.["prop_btnTitle"]                   ?? bind.prop_btnTitle;
        const prop_btnSemantic                = data?.["prop_btnSemantic"]                ?? bind.prop_btnSemantic;
        const prop_btnTitleColor              = data?.["prop_btnTitleColor"]              ?? bind.prop_btnTitleColor;
        const prop_btnTitleColor_hover        = data?.["prop_btnTitleColor_hover"]        ?? bind.prop_btnTitleColor_hover;
        const prop_btnTitleStyles             = data?.["prop_btnTitleStyles"]             ?? bind.prop_btnTitleStyles;
        const prop_btnTitleClass              = data?.["prop_btnTitleClass"]              ?? bind.prop_btnTitleClass;

        return CoreReactive.App.part(
            "b" ,
            {
            attrs: {
                ...attrsDefault,
            },
            attrsBind: {
                prop_btnTitleStyles
            },
            styles: {
                "transition":            "color 200ms ease",
            },
            stylesBind: {
                "color":                 this.getStyleBtnTitleColor(prop_btnSemantic , prop_btnTitleColor , prop_btnTitleColor_hover),
            },
            classBind: [
                prop_btnTitleClass
            ],
            children: [
                prop_btnTitle
            ],
        });
    }

    /* ---------------------------------------------
       renderButton
    --------------------------------------------- */
    protected renderButtonIcon(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_btnHeight              = data?.["prop_btnHeight"]             ?? bind.prop_btnHeight;
        const prop_btnIcon              = data?.["prop_btnIcon"]             ?? bind.prop_btnIcon;
        const prop_btnSemantic          = data?.["prop_btnSemantic"]         ?? bind.prop_btnSemantic;
        const prop_btnIconStyles        = data?.["prop_btnIconStyles"]       ?? bind.prop_btnIconStyles;
        const prop_btnIconClass         = data?.["prop_btnIconClass"]        ?? bind.prop_btnIconClass;
        const prop_btnTitleColor        = data?.["prop_btnTitleColor"]       ?? bind.prop_btnTitleColor;
        const prop_btnTitleColor_hover  = data?.["prop_btnTitleColor_hover"] ?? bind.prop_btnTitleColor_hover;

        return CoreObservable.App.conditionWhen(
            [prop_btnIcon] ,
            (iconSource) => iconSource != null ,
            () => {
               // console.log(prop_btnIcon)
                return new ComponentIcon.Component(
                    {
                        prop_icon:        UiIcons.CreateIcon(
                            prop_btnIcon ,
                            {
                                primaryColor:  this.getStyleBtnTitleColor(prop_btnSemantic , prop_btnTitleColor , prop_btnTitleColor_hover),
                                size:          this.getStyleBtnIconSize(prop_btnHeight),
                            }
                        ),
                        prop_iconStyles: prop_btnIconStyles ,
                        prop_iconClass:  prop_btnIconClass ,
                        //prop_icon:      UiIcons.CreateIcon(UiIcons.Src.ArrowUp.Definition, { size: 24 }),
                        prop_iconTitle: "Arrow Up",
                    },
                    {},
                ).getReactiveElement()
            } ,
            () => {
                return this.renderEmptyContent(attrsDefault)
            } ,
            this.getScope()
        )
    }



    /// ---------------------

    private getStyleBtnHeight(prop_btnHeight){
        return  CoreObservable.App.computed(
            (heightProp, sizeName) => heightProp ?? UtilStyle.Css_Height(sizeName),
            [prop_btnHeight, CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
    }

    private getStyleBtnBackgroundColor(prop_btnSemantic , prop_btnBackgroundColor , prop_btnBackgroundColor_hover){
        return CoreObservable.App.computed(
            (semantic, bg, bgHover, hovered) => {
                const normal = ComponentButton.resolveSemantic(semantic as ButtonSemantic, ComponentButton._semanticBackground, bg);
                if (!hovered) return normal;
                const hover = ComponentButton.resolveSemantic(semantic as ButtonSemantic, ComponentButton._semanticBackgroundHover, bgHover);
                return hover ?? normal;
            },
            [prop_btnSemantic, prop_btnBackgroundColor, prop_btnBackgroundColor_hover, this._HOVER_STATE],
            this.getScope(),
        );
    }

    private getStyleBtnBorderColor(prop_btnSemantic , prop_btnBorderColor , prop_btnBorderWidth){
        return  CoreObservable.App.computed(
            (semantic, borderColorProp, borderWidthProp) => {
                // CUSTOM بدون border prop → بدون border (null)
                const color = ComponentButton.resolveSemantic(semantic as ButtonSemantic, ComponentButton._semanticBorder, borderColorProp);
                if (color == null) return null;
                return `${UtilStyle.Css_BorderWidth(borderWidthProp)} solid ${color}`;
            },
            [prop_btnSemantic, prop_btnBorderColor, prop_btnBorderWidth],
            this.getScope(),
        );
    }


    private getStyleBtnBorderRadius(prop_btnBorderRadius){
        return CoreObservable.App.computed(
            (radiusProp, sizeName) => radiusProp ?? UtilStyle.Css_BorderRadius(sizeName),
            [prop_btnBorderRadius, CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
    }

    private getStyleBtnBorderRadiusStartTop(prop_btnBorderRadiusStartTop , prop_btnBorderRadius){
        return CoreObservable.App.computed(
            (corner, radius, sizeName) => corner ?? radius ?? UtilStyle.Css_BorderRadius(sizeName),
            [prop_btnBorderRadiusStartTop, prop_btnBorderRadius, CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
    }

    private getStyleBtnBorderRadiusStartBottom(prop_btnBorderRadiusStartBottom , prop_btnBorderRadius){
        return CoreObservable.App.computed(
            (corner, radius, sizeName) => corner ?? radius ?? UtilStyle.Css_BorderRadius(sizeName),
            [prop_btnBorderRadiusStartBottom, prop_btnBorderRadius, CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
    }

    private getStyleBtnBorderRadiusEndTop(prop_btnBorderRadiusEndTop , prop_btnBorderRadius){
        return CoreObservable.App.computed(
            (corner, radius, sizeName) => corner ?? radius ?? UtilStyle.Css_BorderRadius(sizeName),
            [prop_btnBorderRadiusEndTop, prop_btnBorderRadius, CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
    }

    private getStyleBtnBorderRadiusEndBottom(prop_btnBorderRadiusEndBottom , prop_btnBorderRadius){
        return CoreObservable.App.computed(
            (corner, radius, sizeName) => corner ?? radius ?? UtilStyle.Css_BorderRadius(sizeName),
            [prop_btnBorderRadiusEndBottom, prop_btnBorderRadius, CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
    }





    private getStyleBtnTitleColor(prop_btnSemantic , prop_btnTitleColor , prop_btnTitleColor_hover){
        return CoreObservable.App.computed(
            (semantic, color, colorHover, hovered) => {
                const normal = ComponentButton.resolveSemantic(semantic as ButtonSemantic, ComponentButton._semanticTitleColor, color);
                if (!hovered) return normal;
                const hover = ComponentButton.resolveSemantic(semantic as ButtonSemantic, ComponentButton._semanticTitleColorHover, colorHover);
                return hover ?? normal;
            },
            [prop_btnSemantic, prop_btnTitleColor, prop_btnTitleColor_hover, this._HOVER_STATE],
            this.getScope(),
        );
    }



    private getStyleBtnIconSize(prop_btnHeight){
        return  CoreObservable.App.computed(
            (heightProp, sizeName) => heightProp ?? UtilStyle.Css_IconSize(sizeName),
            [prop_btnHeight, CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
    }


}
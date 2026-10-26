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
 * ComponentButton â€” Ú©Ù„Ø§Ø³ Ù†Ù‡Ø§ÛŒÛŒ (Plan 9.1.1 â€” Ø¨Ø§Ø²ÛŒØ§Ø¨ÛŒ Ú©Ø§Ù…Ù„ Behavior Legacy)
 *
 * Ù…Ø¹Ù…Ø§Ø±ÛŒ Composition:
 *   ComponentButton HAS-A ComponentStructure (Ù†Ù‡ IS-A)
 *   ComponentStructure Ø¯Ø± renderContentComponent Ø³Ø§Ø®ØªÙ‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯
 *   Ùˆ content Ø¢Ù† = renderButton (Ù…Ø­ØªÙˆØ§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ ComponentButton)
 *
 * Constructor Ø§Ù…Ø¶Ø§: (config, methods, identity?)
 *   config  â€” Ø´Ø§Ù…Ù„ propÙ‡Ø§ÛŒ Ù¾Ø§ÛŒÙ‡ + propÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ (prop_btnTitle, ...)
 *   methods â€” methodÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ (CLICK, HOVER, BLUR)
 *   identity â€” { unique?, emit?, events? }
 *
 * Plan 9.1.1 â€” Behavior Ø¨Ø§Ø²ÛŒØ§Ø¨ÛŒâ€ŒØ´Ø¯Ù‡ Ø§Ø² Legacy:
 *   Û±. Ø±Ù†Ú¯â€ŒÙ‡Ø§ÛŒ semantic Ú†Ù‡Ø§Ø±Ú¯Ø§Ù†Ù‡ (SUBMITâ†’primaryØŒ BACKâ†’secondaryØŒ CANCELâ†’errorØŒ CUSTOMâ†’prop)
 *   Û². hover engine â€” Ø¨Ø§ CoreObservable.App<boolean> Ø¯Ø§Ø®Ù„ÛŒ (Ù…Ø¹Ø§Ø¯Ù„ el.hover Ù‚Ø¯ÛŒÙ…ÛŒ)
 *   Û³. borderRadius Ø¨Ø§ Ù…Ù†Ø·Ù‚ DEFAULT + RTL-awareness (CSS logical properties)
 *   Û´. Ø±Ù†Ø¯Ø± Ø´Ø±Ø·ÛŒ Ø¢ÛŒÚ©ÙˆÙ† (conditionWhen) â€” Ø¨Ø§ Ø¢ÛŒÚ©ÙˆÙ†: title+iconØŒ Ø¨Ø¯ÙˆÙ† Ø¢ÛŒÚ©ÙˆÙ†: ÙÙ‚Ø· title
 *   Ûµ. Ø±Ù†Ú¯ title Ø¨Ø± Ø§Ø³Ø§Ø³ semantic + hover
 *   Û¶. height Ø¨Ø± Ø§Ø³Ø§Ø³ prop + Ø³Ø§ÛŒØ² Ø³Ø±Ø§Ø³Ø±ÛŒ
 *   Û·. CUSTOM semantic â†’ Ø±Ù†Ú¯â€ŒÙ‡Ø§ Ø§Ø² propÙ‡Ø§ÛŒ Ø³ÙØ§Ø±Ø´ÛŒ
 */
export class ComponentButton extends ComponentButtonBase<ReturnType<typeof createButtonStep>>{

    /* ---------------------------------------------
       Hover State â€” Ù…Ø¹Ø§Ø¯Ù„ el.hover Ù‚Ø¯ÛŒÙ…ÛŒ (Plan 9.1.1)
       Observable Ø¯Ø§Ø®Ù„ÛŒ Ú©Ù„Ø§Ø³ â€” ØªÙˆØ³Ø· on: {mouseenter/mouseleave} ØªØºØ°ÛŒÙ‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯
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
        // Plan 8.2.7 / 9.1 â€” Step Ø¯Ø§Ø®Ù„ÛŒ Ø¯Ø± constructor Ø³Ø§Ø®ØªÙ‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯
        const step = createButtonStep();

        super("button", null, identity, step);

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
        return this.executeSchemaPart(Schemas.BUTTON.part, {});
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

        const prop_btnType                    = data?.["prop_btnType"]                    ?? bind.prop_btnType;
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
        const buttonSizeName = CoreConfig.Settings.SizeName.observable();
        const resolvedButtonBorderRadius = CoreObservable.App.computed(
            (radius, sizeName) => radius ?? UtilStyle.Css_BorderRadius(sizeName),
            [prop_btnBorderRadius, buttonSizeName],
            this.getScope(),
        );


        // const prop_btnTitleColor              = data?.["prop_btnTitleColor"]              ?? bind.prop_btnTitleColor;
        // const prop_btnTitleColor_hover        = data?.["prop_btnTitleColor_hover"]        ?? bind.prop_btnTitleColor_hover;
        // const prop_btnIcon                    = data?.["prop_btnIcon"]                    ?? bind.prop_btnIcon;

        /* --- Ø±Ù†Ø¯Ø± Ø´Ø±Ø·ÛŒ Ø¢ÛŒÚ©ÙˆÙ† (Plan 9.1.1 â€” Ù…Ø¹Ø§Ø¯Ù„ conditionWhen Ù‚Ø¯ÛŒÙ…ÛŒ) ---
           Ø¨Ø§ Ø¢ÛŒÚ©ÙˆÙ†: [title, icon] â€” Ø¨Ø¯ÙˆÙ† Ø¢ÛŒÚ©ÙˆÙ†: [title]
           onTrue/onFalse Ø¯Ø± Ø²Ù…Ø§Ù† ØªØºÛŒÛŒØ± prop_btnIcon Ø§Ø¬Ø±Ø§ Ù…ÛŒâ€ŒØ´ÙˆÙ†Ø¯              */
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
                type:     prop_btnType,
            },
            className: [
                "btn"
            ] ,
            styles: {
                "transition":                      "background-color 200ms, color 200ms, border-color 200ms",
                "display":                         "inline-flex",
                "align-items":                     "center",
                "justify-content":                 "center",
                "vertical-align":                  "middle",
                "max-width":                        "100%",
                "padding":                         "0px",
                "cursor":                          "pointer",
            },
            stylesBind: {
                "width":                            prop_btnWidth,
                "background-color":                 this.getStyleBtnBackgroundColor(prop_btnSemantic , prop_btnBackgroundColor , prop_btnBackgroundColor_hover),
                "border-radius":                    resolvedButtonBorderRadius,
                "border-start-start-radius":        this.getStyleBtnBorderRadiusStartTop(prop_btnBorderRadiusStartTop , resolvedButtonBorderRadius),
                "border-end-start-radius":          this.getStyleBtnBorderRadiusStartBottom(prop_btnBorderRadiusStartBottom , resolvedButtonBorderRadius),
                "border-start-end-radius":          this.getStyleBtnBorderRadiusEndTop(prop_btnBorderRadiusEndTop , resolvedButtonBorderRadius),
                "border-end-end-radius":            this.getStyleBtnBorderRadiusEndBottom(prop_btnBorderRadiusEndBottom , resolvedButtonBorderRadius),
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
        const titleStyles = CoreObservable.App.computed((customStyles) => ({
            display: "block",
            flex: "0 1 auto",
            minWidth: "0",
            maxWidth: "100%",
            lineHeight: `calc(${UtilStyle.Css_Height(UtilConst.Sizes.M)})`,
            fontSize: UtilStyle.Css_FontSize(UtilConst.Sizes.M),
            padding: UtilStyle.Css_Padding(UtilConst.Sizes.M),
            ...(customStyles ?? {}),
        }), [prop_btnTitleStyles], this.getScope());
        const titleRenderStyles = CoreObservable.App.computed(
            (styles, color) => ({...styles, color}),
            [titleStyles, this.getStyleBtnTitleColor(prop_btnSemantic, prop_btnTitleColor, prop_btnTitleColor_hover)],
            this.getScope(),
        );

        return CoreObservable.App.conditionWhen(
            [prop_btnTitle],
            (title) => title != null && title !== "",
            () => CoreReactive.App.part(
                "b" ,
                {
                attrs: {
                    ...attrsDefault,
                },
                styles: {
                    "transition":            "color 200ms",
                },
                stylesBind: titleRenderStyles,
                classBind: [
                    prop_btnTitleClass
                ],
                children: [
                    prop_btnTitle
                ],
            }),
            () => this.renderEmptyContent(attrsDefault),
            this.getScope()
        );
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
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const iconSize = this.getStyleBtnIconSize(prop_btnHeight);
        const iconStrokeWidth = CoreObservable.App.computed((size: any, definition: UiIcons.IIconDefinition | null) =>
            UtilStyle.Css_IconStrokeWidth(size, definition?.viewBoxX ?? 24, definition?.viewBoxY ?? 24),
        [sizeName, prop_btnIcon], this.getScope());
        const iconWrapperStyles = CoreObservable.App.computed((height, size, customStyles) => ({
            display: "block",
            width: height ?? UtilStyle.Css_IconSize(size),
            height: height ?? UtilStyle.Css_IconSize(size),
            flex: `0 0 ${height ?? UtilStyle.Css_IconSize(size)}`,
            ...(customStyles ?? {}),
        }), [prop_btnHeight, sizeName, prop_btnIconStyles], this.getScope());
        const iconStructureStyles = {
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
        };
        const iconStyles = {
            display: "flex",
            width: "100%",
            height: "100%",
            flex: "0 0 auto",
            alignItems: "center",
            justifyContent: "center",
            verticalAlign: "middle",
        };
        const iconClass = CoreObservable.App.computed((classes) => [
            "d-flex",
            "align-items-center",
            "justify-content-center",
            "flex-shrink-0",
            ...(classes ?? []),
        ], [prop_btnIconClass], this.getScope());

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
                                size:          iconSize,
                                strokeWidth:   iconStrokeWidth as any,
                            }
                        ),
                        styles: iconWrapperStyles,
                        prop_structureStyles: iconStructureStyles,
                        prop_iconStyles: iconStyles,
                        prop_iconClass:  iconClass,
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
            (semantic, borderColorProp, borderWidthProp, sizeName) => {
                // CUSTOM Ø¨Ø¯ÙˆÙ† border prop â†’ Ø¨Ø¯ÙˆÙ† border (null)
                const color = ComponentButton.resolveSemantic(semantic as ButtonSemantic, ComponentButton._semanticBorder, borderColorProp);
                if (color == null) return null;
                return `${UtilStyle.Css_BorderWidth(borderWidthProp ?? sizeName)} solid ${color}`;
            },
            [prop_btnSemantic, prop_btnBorderColor, prop_btnBorderWidth, CoreConfig.Settings.SizeName.observable()],
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

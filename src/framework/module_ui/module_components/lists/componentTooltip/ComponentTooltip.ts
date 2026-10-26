import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig     from "@/core_configs";
import * as UtilStyle      from "@/util_styles";
import * as UtilConst      from "@/util_consts";
// --------------------------------
import {ComponentTooltipBase}     from "./ComponentTooltipBase";
import {createTooltipStep}        from "./Step";
import {Schemas}                  from "./Schemas";
import {TooltipDirectionTypes}    from "./Props";
import {PropsType}                from "./Props";
import {PartAttrDefault}          from "@/core_components";
import {ComponentStructureTrait}  from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {MethodsConfigType}        from "./Methods";
// --------------------------------
import * as UiIcons       from "@/ui_icons";
import * as ComponentIcon from "../componentIcon";
import * as ComponentFloatMenu from "../componentFloatMenu";
import {DirectionTypes as FloatMenuDirectionTypes, ShowTypes as FloatMenuShowTypes} from "../componentFloatMenu";


/**
 * ComponentTooltip â€” Ú©Ù„Ø§Ø³ Ù†Ù‡Ø§ÛŒÛŒ (Plan 14.1.0)
 *
 * Ù…Ø¹Ù…Ø§Ø±ÛŒ Composition:
 *   ComponentTooltip HAS-A ComponentFloatMenu (Ù†Ù‡ IS-A)
 *   ComponentFloatMenu Ø¯Ø± renderTooltipFloatMenu Ø³Ø§Ø®ØªÙ‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯
 *   Ùˆ selector Ø¢Ù† = Ø¢ÛŒÚ©ÙˆÙ† trigger (ComponentIcon)
 *
 * Constructor Ø§Ù…Ø¶Ø§: (config, methods, identity?)
 *   config  â€” Ø´Ø§Ù…Ù„ propÙ‡Ø§ÛŒ Ù¾Ø§ÛŒÙ‡ + propÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ (prop_tooltipIcon, ...)
 *   methods â€” methodÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ (Ø®Ø§Ù„ÛŒ)
 *   identity â€” { unique?, emit?, events? }
 *
 * Plan 9.1 â€” Step Ø¯Ø§Ø®Ù„ÛŒ Ø¯Ø± constructor Ø³Ø§Ø®ØªÙ‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯ (factory function).
 * Plan 11.2 â€” Ù„Ø§ÛŒÙ‡ <component-tooltip> + <section> Ø§Ø² Schema Ù¾Ø§ÛŒÙ‡ (COMPONENT + STRUCTURE) Ø±Ù†Ø¯Ø± Ù…ÛŒâ€ŒØ´ÙˆØ¯.
 */
export class ComponentTooltip extends ComponentTooltipBase<ReturnType<typeof createTooltipStep>>{


    constructor(
        config?:  Partial<StructurePropsType & PropsType>,
        methods?: MethodsConfigType<ComponentTooltip>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createTooltipStep();

        super("tooltip", null, identity, step);

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
        return this.executeSchemaPart(Schemas.FLOAT_MENU.part, {});
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
            case Schemas.FLOAT_MENU.part:
                return this.renderTooltipFloatMenu(attrsDefault, data, extra);
            case Schemas.ICON.part:
                return this.renderTooltipIcon(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderTooltipFloatMenu â€” Ø±Ù†Ø¯Ø± Part FLOAT_MENU
       Composition Ø¨Ø§ ComponentFloatMenu â€” popup Ú©Ø§Ù…Ù„ Ø¨Ø§ ComponentBorder
       (arrowØŒ shadowØŒ border-colorØŒ backgroundØŒ position Ù…Ø­Ø§Ø³Ø¨Ù‡â€ŒØ´Ø¯Ù‡)

       mapping propÙ‡Ø§ (Ù…Ø·Ø§Ø¨Ù‚ legacy ComponentTooltipDescription):
         prop_tooltipIconClass      â†’ prop_selectorClass
         prop_tooltipIconStyles     â†’ prop_selectorStyles
         prop_tooltipDescription    â†’ prop_floatContent (Ù…ØªÙ† popup)
         prop_tooltipDirection      â†’ prop_floatDirectionType (Ø¬Ù‡Øª)
         prop_tooltipBackground     â†’ prop_floatBackground (bg popup)
         prop_tooltipColor          â†’ prop_floatBorderColor (border Ø¯ÙˆØ± popup)
         prop_tooltipIconPosition   â†’ prop_floatArrowPosition (Ù…Ø­Ø§Ø³Ø¨Ù‡ arrow)
         (Ø«Ø§Ø¨Øª)                     â†’ prop_selectorShowType: HOVER
         (Ø«Ø§Ø¨Øª)                     â†’ prop_floatMinWidth: 100% (Ø¹Ø±Ø¶ Ú©Ø§Ù…Ù„ Ù†Ø³Ø¨Øª Ø¨Ù‡ ÙˆØ§Ù„Ø¯)
    --------------------------------------------- */
    protected renderTooltipFloatMenu(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_tooltipIconPosition = data?.["prop_tooltipIconPosition"] ?? bind.prop_tooltipIconPosition;
        const prop_tooltipIconClass    = data?.["prop_tooltipIconClass"]    ?? bind.prop_tooltipIconClass;
        const prop_tooltipIconStyles   = data?.["prop_tooltipIconStyles"]   ?? bind.prop_tooltipIconStyles;
        const prop_tooltipDirection    = data?.["prop_tooltipDirection"]    ?? bind.prop_tooltipDirection;
        const prop_tooltipDescription   = data?.["prop_tooltipDescription"] ?? bind.prop_tooltipDescription;
        const prop_tooltipBackground    = data?.["prop_tooltipBackground"]  ?? bind.prop_tooltipBackground;
        const prop_tooltipColor         = data?.["prop_tooltipColor"]       ?? bind.prop_tooltipColor;

        // mapping direction: Tooltip â†’ FloatMenu (reactive â€” prop is Observable)
        const floatDir = CoreObservable.App.computed(
            (dir: TooltipDirectionTypes) =>
                dir === TooltipDirectionTypes.TOP
                    ? FloatMenuDirectionTypes.TOP
                    : FloatMenuDirectionTypes.BOTTOM,
            [prop_tooltipDirection],
            this.getScope(),
        );

        // Ù…Ø­Ø§Ø³Ø¨Ù‡ prop_floatArrowPosition (Ù…Ø·Ø§Ø¨Ù‚ legacy ComponentTooltipDescription):
        //   arrowPosition = 100% - iconPosition - iconSize/2
        //   iconSize Ø§Ø² SizeName Ø³Ø±Ø§Ø³Ø±ÛŒ Ù…Ø­Ø§Ø³Ø¨Ù‡ Ù…ÛŒâ€ŒØ´Ù‡
        // ÙÙ„Ø´ Ø¨Ù‡ Ø¢ÛŒÚ©ÙˆÙ† Ø§Ø´Ø§Ø±Ù‡ Ù…ÛŒâ€ŒÚ©Ù†Ù‡ (Ù†Ù‡ Ø¨Ù‡ Ø§Ù†ØªÙ‡Ø§ÛŒ popup)
        const arrowPosition = this.getStyleArrowPosition(prop_tooltipIconPosition);

        // Composition Ø¨Ø§ ComponentFloatMenu â€” popup Ú©Ø§Ù…Ù„ Ø¨Ø§ ComponentBorder
        const floatMenu = new ComponentFloatMenu.Component(
            {
                // height chain â€” propagate 100% through custom elements
                styles:                    { height: "100%" },
                prop_structureStyles:      { height: "100%" },

                // selector (trigger = Ø¢ÛŒÚ©ÙˆÙ†)
                prop_selectorContent:      this.executeSchemaPart(Schemas.ICON.part),
                prop_selectorClass:         ["w-100", "h-100", "position-relative"],
                prop_selectorStyles:        prop_tooltipIconStyles,
                prop_selectorShowType:      FloatMenuShowTypes.HOVER,

                // float (popup)
                prop_floatContent:          prop_tooltipDescription,
                prop_floatDirectionType:   floatDir,
                prop_floatBackground:       prop_tooltipBackground,
                prop_floatBorderColor:      prop_tooltipColor,
                prop_floatArrowPosition:    arrowPosition as any,
                prop_floatClass:            ["mt-2", "w-100", "position-relative"],
                prop_floatMinWidth:         UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
                prop_floatShowControlWithSelf: false,
                prop_floatIsShow:           false,
            } as any,
            {},
        );

        return floatMenu.getReactiveElement();
    }


    /* ---------------------------------------------
       renderTooltipIcon â€” Ø±Ù†Ø¯Ø± Part ICON
       Ø¢ÛŒÚ©ÙˆÙ† trigger Ø¨Ø§ position absolute Ùˆ RTL/LTR aware positioning
       selector ÙˆØ§Ù„Ø¯ w-100 Ø§Ø³Øª Ù¾Ø³ right/left Ù†Ø³Ø¨Øª Ø¨Ù‡ Ø¹Ø±Ø¶ Ú©Ø§Ù…Ù„ parent Ù…Ø­Ø§Ø³Ø¨Ù‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯
    --------------------------------------------- */
    protected renderTooltipIcon(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_tooltipIcon          = data?.["prop_tooltipIcon"]          ?? bind.prop_tooltipIcon;
        const prop_tooltipIconTitle     = data?.["prop_tooltipIconTitle"]     ?? bind.prop_tooltipIconTitle;

        const styles = CoreObservable.App.computed(
            (size: UtilConst.Sizes) => {
                const iconSize = UtilStyle.Css_IconSize(size) as string;
                return {
                    outline:   "none",
                    top:       "50%",
                    transform: "translate(0px, -50%)",
                    right:     iconSize,
                    height:    iconSize,
                };
            },
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );

        return new ComponentIcon.Component(
            {
                prop_icon:       UiIcons.CreateIcon(prop_tooltipIcon ?? UiIcons.Src.SymbolExclumationSquare.Definition),
                prop_iconClass:  ["position-absolute"],
                prop_iconStyles:  styles,
                prop_iconTitle:   prop_tooltipIconTitle,
            },
            {},
        ).getReactiveElement() as CoreReactive.App;
    }


    /// ---------------------
    ///  Private Style Getters
    ///  Ø§Ù„Ú¯ÙˆÛŒ Plan 12.1 Â§Û°.Û³ â€” Ù‡Ø± Ù…ØªØ¯ ÛŒÚ© CoreObservable.App.computed Ø¨Ø±Ù…ÛŒâ€ŒÚ¯Ø±Ø¯Ø§Ù†Ø¯
    /// ---------------------

    private getStyleArrowPosition(prop_tooltipIconPosition: any) {
        return CoreObservable.App.computed(
            (sizeName: UtilConst.Sizes, position: ReturnType<typeof UtilStyle.Css_SizeUnit>) => {
                const iconHalfSize = UtilStyle.Css_SizeUnit(
                    this.getIconSizeValue(sizeName) / 2,
                    UtilConst.Units.PEXEL,
                );

                return UtilStyle.Css_SizeCalc(
                    UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
                    UtilConst.Operation.MINUS,
                    position,
                    UtilConst.Operation.MINUS,
                    iconHalfSize,
                );
            },
            [CoreConfig.Settings.SizeName.observable(), prop_tooltipIconPosition],
            this.getScope(),
        );
    }


    private getIconSizeValue(sizeName: UtilConst.Sizes): number {
        switch (sizeName) {
            case UtilConst.Sizes.XS:
                return 16;
            case UtilConst.Sizes.S:
                return 20;
            case UtilConst.Sizes.L:
                return 32;
            case UtilConst.Sizes.XL:
                return 46;
            case UtilConst.Sizes.XXL:
                return 60;
            case UtilConst.Sizes.M:
            default:
                return 24;
        }
    }
}

export default ComponentTooltip;

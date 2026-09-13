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
 * ComponentTooltip — کلاس نهایی (Plan 14.1.0)
 *
 * معماری Composition:
 *   ComponentTooltip HAS-A ComponentFloatMenu (نه IS-A)
 *   ComponentFloatMenu در renderTooltipFloatMenu ساخته می‌شود
 *   و selector آن = آیکون trigger (ComponentIcon)
 *
 * Constructor امضا: (config, methods, identity?)
 *   config  — شامل propهای پایه + propهای اختصاصی (prop_tooltipIcon, ...)
 *   methods — methodهای اختصاصی (خالی)
 *   identity — { unique?, emit?, events? }
 *
 * Plan 9.1 — Step داخلی در constructor ساخته می‌شود (factory function).
 * Plan 11.2 — لایه <component-tooltip> + <section> از Schema پایه (COMPONENT + STRUCTURE) رندر می‌شود.
 */
export class ComponentTooltip extends ComponentTooltipBase {


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
       Plan 8.2.7 — Component Disposal
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
        return this.executeSchemaPart(Schemas.FLOAT_MENU.part, {});
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
            case Schemas.FLOAT_MENU.part:
                return this.renderTooltipFloatMenu(attrsDefault, data, extra);
            case Schemas.ICON.part:
                return this.renderTooltipIcon(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderTooltipFloatMenu — رندر Part FLOAT_MENU
       Composition با ComponentFloatMenu — popup کامل با ComponentBorder
       (arrow، shadow، border-color، background، position محاسبه‌شده)

       mapping propها (مطابق legacy ComponentTooltipDescription):
         prop_tooltipIconClass      → prop_selectorClass
         prop_tooltipIconStyles     → prop_selectorStyles
         prop_tooltipDescription    → prop_floatContent (متن popup)
         prop_tooltipDirection      → prop_floatDirectionType (جهت)
         prop_tooltipBackground     → prop_floatBackground (bg popup)
         prop_tooltipColor          → prop_floatBorderColor (border دور popup)
         prop_tooltipIconPosition   → prop_floatArrowPosition (محاسبه arrow)
         (ثابت)                     → prop_selectorShowType: HOVER
         (ثابت)                     → prop_floatMinWidth: 100% (عرض کامل نسبت به والد)
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

        // mapping direction: Tooltip → FloatMenu (reactive — prop is Observable)
        const floatDir = CoreObservable.App.computed(
            (dir: TooltipDirectionTypes) =>
                dir === TooltipDirectionTypes.TOP
                    ? FloatMenuDirectionTypes.TOP
                    : FloatMenuDirectionTypes.BOTTOM,
            [prop_tooltipDirection],
            this.getScope(),
        );

        // محاسبه prop_floatArrowPosition (مطابق legacy ComponentTooltipDescription):
        //   arrowPosition = 100% - iconPosition - iconSize/2
        //   iconSize از SizeName سراسری محاسبه می‌شه
        // فلش به آیکون اشاره می‌کنه (نه به انتهای popup)
        const arrowPosition = this.getStyleArrowPosition(prop_tooltipIconPosition);

        // Composition با ComponentFloatMenu — popup کامل با ComponentBorder
        const floatMenu = new ComponentFloatMenu.Component(
            {
                // height chain — propagate 100% through custom elements
                styles:                    { height: "100%" },
                prop_structureStyles:      { height: "100%" },

                // selector (trigger = آیکون)
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
       renderTooltipIcon — رندر Part ICON
       آیکون trigger با position absolute و RTL/LTR aware positioning
       selector والد w-100 است پس right/left نسبت به عرض کامل parent محاسبه می‌شود
    --------------------------------------------- */
    protected renderTooltipIcon(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_tooltipIcon          = data?.["prop_tooltipIcon"]          ?? bind.prop_tooltipIcon;
        const prop_tooltipIconTitle     = data?.["prop_tooltipIconTitle"]     ?? bind.prop_tooltipIconTitle;
        const prop_tooltipIconPosition  = data?.["prop_tooltipIconPosition"]  ?? bind.prop_tooltipIconPosition;

        const directionRtl = CoreConfig.Settings.DirectionRtl.observable();
        const styles = CoreObservable.App.computed(
            (pos: string, rtl: boolean) => {
                const s: Record<string, string> = {
                    top:       "50%",
                    transform: "translateY(-50%)",
                };
                if (rtl) s["left"] = pos;
                else s["right"] = pos;
                return s;
            },
            [prop_tooltipIconPosition, directionRtl],
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
    ///  الگوی Plan 12.1 §۰.۳ — هر متد یک CoreObservable.App.computed برمی‌گرداند
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

import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys}                from "../../../module_categories/languages";
import * as UtilStyle        from "@/util_styles";
import * as UtilConst        from "@/util_consts";
import * as UiIcons          from "@/ui_icons";
import type {
    ExtractPropsType,
    ExtractPropsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * TooltipDirectionTypes — جهت نمایش popup توضیحات tooltip نسبت به آیکون
 *
 * Legacy: ComponentTooltipDescription_PositionTypes
 * Plan 14.1.0 — مهاجرت به معماری جدید
 */
export enum TooltipDirectionTypes {
    TOP    = "top",
    BOTTOM = "bottom",
}


/**
 * Props اختصاصی ComponentTooltip (۹ prop — بازیابی کامل Legacy)
 *
 * این Props به propهای پایه ComponentStructure اضافه می‌شوند.
 *
 * تغییرات نسبت به Legacy:
 *   - رنگ‌ها به string (خروجی Css_Color — سازگار با CSS vars)
 *   - IconsType (widget instance) → UiIcons.IIconDefinition (data-only descriptor)
 *   - prop_description default از "" به null (رندر شرطی)
 *   - نام‌گذاری prop_icon → prop_tooltipIcon و ... (پیشوند tooltip)
 */
export const Props = {

    /// --- Icon ---

    prop_tooltipIcon: Define_ComponentProp<UiIcons.IIconDefinition | null>({
        prop:         "prop_tooltipIcon",
        default:      UiIcons.Src.SymbolExclumationSquare.Definition,
        name:         Keys.category.components.tooltip.props.tooltipIcon.name,
        description:  Keys.category.components.tooltip.props.tooltipIcon.description,
    }),

    prop_tooltipIconClass: Define_ComponentProp<string[]>({
        prop:         "prop_tooltipIconClass",
        default:      ["position-relative"],
        name:         Keys.category.components.tooltip.props.tooltipIconClass.name,
        description:  Keys.category.components.tooltip.props.tooltipIconClass.description,
    }),

    prop_tooltipIconStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_tooltipIconStyles",
        default:      {},
        name:         Keys.category.components.tooltip.props.tooltipIconStyles.name,
        description:  Keys.category.components.tooltip.props.tooltipIconStyles.description,
    }),

    prop_tooltipIconTitle: Define_ComponentProp<string>({
        prop:         "prop_tooltipIconTitle",
        default:      "",
        name:         Keys.category.components.tooltip.props.tooltipIconTitle.name,
        description:  Keys.category.components.tooltip.props.tooltipIconTitle.description,
    }),

    prop_tooltipIconPosition: Define_ComponentProp<ReturnType<typeof UtilStyle.Css_SizeUnit>>({
        prop:         "prop_tooltipIconPosition",
        default:      UtilStyle.Css_SizeUnit(2.5, UtilConst.Units.PERCENT),
        name:         Keys.category.components.tooltip.props.tooltipIconPosition.name,
        description:  Keys.category.components.tooltip.props.tooltipIconPosition.description,
    }),

    /// --- Float ---

    prop_tooltipDescription: Define_ComponentProp<string | null>({
        prop:         "prop_tooltipDescription",
        default:      null,
        name:         Keys.category.components.tooltip.props.tooltipDescription.name,
        description:  Keys.category.components.tooltip.props.tooltipDescription.description,
    }),

    prop_tooltipDirection: Define_ComponentProp<TooltipDirectionTypes>({
        prop:         "prop_tooltipDirection",
        default:      TooltipDirectionTypes.TOP,
        name:         Keys.category.components.tooltip.props.tooltipDirection.name,
        description:  Keys.category.components.tooltip.props.tooltipDirection.description,
    }),

    /// --- Colors ---

    prop_tooltipBackground: Define_ComponentProp<string | null>({
        prop:         "prop_tooltipBackground",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.tooltip.props.tooltipBackground.name,
        description:  Keys.category.components.tooltip.props.tooltipBackground.description,
    }),

    prop_tooltipColor: Define_ComponentProp<string | null>({
        prop:         "prop_tooltipColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.tooltip.props.tooltipColor.name,
        description:  Keys.category.components.tooltip.props.tooltipColor.description,
    }),

} satisfies CoreComponents.ComponentProps;


/**
 * نوع propهای ComponentTooltip — برای استفاده در TProp
 */
export type PropsType = ExtractPropsType<typeof Props>;


/**
 * نوع config قابل‌قبول constructor — هر prop می‌تواند:
 *   - مقدار خام (مطابق default)
 *   - یا Observable همان مقدار (ClObservable<T>)
 */
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;

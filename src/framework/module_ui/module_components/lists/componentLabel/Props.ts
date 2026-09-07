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
 * Legacy: ComponentLabel_TooltipPositionTypes (نام مضرس — در واقع direction بود)
 * Plan 13.1.0 — اصلاح نام‌گذاری
 */
export enum TooltipDirectionTypes {
    TOP    = "top",
    BOTTOM = "bottom",
}


/**
 * Props اختصاصی ComponentLabel (۱۵ prop — بازیابی کامل Legacy)
 *
 * این Props به propهای پایه ComponentStructure اضافه می‌شوند.
 *
 * تغییرات نسبت به Legacy (جدول ۱.۲ پلن):
 *   - رنگ‌ها به string (خروجی Css_Color — سازگار با CSS vars)
 *   - IconsType (widget instance) → UiIcons.IIconDefinition (data-only descriptor)
 *   - prop_labelStyle نام singular حفظ شد (شکستن نام = breaking change بی‌دلیل)
 */
export const Props = {

    /// --- Show ---

    prop_labelShow: Define_ComponentProp<boolean>({
        prop:         "prop_labelShow",
        default:      true,
        name:         Keys.category.components.label.props.labelShow.name,
        description:  Keys.category.components.label.props.labelShow.description,
    }),

    /// --- Border ---

    prop_labelBackground: Define_ComponentProp<string | null>({
        prop:         "prop_labelBackground",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.label.props.labelBackground.name,
        description:  Keys.category.components.label.props.labelBackground.description,
    }),

    prop_labelRadius: Define_ComponentProp<UtilConst.Sizes>({
        prop:         "prop_labelRadius",
        default:      UtilConst.Sizes.M,
        name:         Keys.category.components.label.props.labelRadius.name,
        description:  Keys.category.components.label.props.labelRadius.description,
    }),

    prop_labelMinWidth: Define_ComponentProp<string | null>({
        prop:         "prop_labelMinWidth",
        default:      null,
        name:         Keys.category.components.label.props.labelMinWidth.name,
        description:  Keys.category.components.label.props.labelMinWidth.description,
    }),

    /// --- Title ---

    prop_labelTitle: Define_ComponentProp<string | null>({
        prop:         "prop_labelTitle",
        default:      null,
        name:         Keys.category.components.label.props.labelTitle.name,
        description:  Keys.category.components.label.props.labelTitle.description,
    }),

    prop_labelFor: Define_ComponentProp<string | null>({
        prop:         "prop_labelFor",
        default:      null,
        name:         Keys.category.components.label.props.labelFor.name,
        description:  Keys.category.components.label.props.labelFor.description,
    }),

    prop_labelStyle: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_labelStyle",
        default:      {},
        name:         Keys.category.components.label.props.labelStyle.name,
        description:  Keys.category.components.label.props.labelStyle.description,
    }),

    prop_labelClass: Define_ComponentProp<string[]>({
        prop:         "prop_labelClass",
        default:      [],
        name:         Keys.category.components.label.props.labelClass.name,
        description:  Keys.category.components.label.props.labelClass.description,
    }),

    prop_labelColor: Define_ComponentProp<string | null>({
        prop:         "prop_labelColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.label.props.labelColor.name,
        description:  Keys.category.components.label.props.labelColor.description,
    }),

    /// --- Tooltip ---

    prop_labelTooltipIcon: Define_ComponentProp<UiIcons.IIconDefinition | null>({
        prop:         "prop_labelTooltipIcon",
        default:      UiIcons.Src.SymbolExclumationSquare.Definition,
        name:         Keys.category.components.label.props.labelTooltipIcon.name,
        description:  Keys.category.components.label.props.labelTooltipIcon.description,
    }),

    prop_labelTooltipDescription: Define_ComponentProp<string | null>({
        prop:         "prop_labelTooltipDescription",
        default:      null,
        name:         Keys.category.components.label.props.labelTooltipDescription.name,
        description:  Keys.category.components.label.props.labelTooltipDescription.description,
    }),

    prop_labelTooltipBackground: Define_ComponentProp<string | null>({
        prop:         "prop_labelTooltipBackground",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.label.props.labelTooltipBackground.name,
        description:  Keys.category.components.label.props.labelTooltipBackground.description,
    }),

    prop_labelTooltipColor: Define_ComponentProp<string | null>({
        prop:         "prop_labelTooltipColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.label.props.labelTooltipColor.name,
        description:  Keys.category.components.label.props.labelTooltipColor.description,
    }),

    prop_labelTooltipPosition: Define_ComponentProp<string>({
        prop:         "prop_labelTooltipPosition",
        default:      UtilStyle.Css_SizeUnit(2.5, UtilConst.Units.PERCENT),
        name:         Keys.category.components.label.props.labelTooltipPosition.name,
        description:  Keys.category.components.label.props.labelTooltipPosition.description,
    }),

    prop_labelTooltipDirection: Define_ComponentProp<TooltipDirectionTypes>({
        prop:         "prop_labelTooltipDirection",
        default:      TooltipDirectionTypes.BOTTOM,
        name:         Keys.category.components.label.props.labelTooltipDirection.name,
        description:  Keys.category.components.label.props.labelTooltipDirection.description,
    }),

} satisfies CoreComponents.ComponentProps;


/**
 * نوع propهای ComponentLabel — برای استفاده در TProp
 */
export type PropsType = ExtractPropsType<typeof Props>;


/**
 * نوع config قابل‌قبول constructor — هر prop می‌تواند:
 *   - مقدار خام (مطابق default)
 *   - یا Observable همان مقدار (ClObservable<T>)
 */
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
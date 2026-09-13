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
 * Props اختصاصی ComponentCollapse (Plan 15.1.0 — بازیابی کامل ۲۰ prop Legacy)
 *
 * این Props به propهای پایه ComponentStructure اضافه می‌شوند.
 *
 * تغییرات نسبت به Legacy:
 *   - رنگ‌ها به string (خروجی Css_Color — سازگار با CSS vars)
 *   - IconsType (widget instance) → UiIcons.IIconDefinition (data-only descriptor)
 *   - prop_body نوع: string | CoreReactive.App | null (ReactiveElement → CoreReactive.App)
 */
export const Props = {

    /// --- Border ---

    prop_collapseBorderBackground: Define_ComponentProp<string | null>({
        prop:         "prop_collapseBorderBackground",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.collapse.props.collapseBorderBackground.name,
        description:  Keys.category.components.collapse.props.collapseBorderBackground.description,
    }),

    prop_collapseBorderClass: Define_ComponentProp<string[]>({
        prop:         "prop_collapseBorderClass",
        default:      [],
        name:         Keys.category.components.collapse.props.collapseBorderClass.name,
        description:  Keys.category.components.collapse.props.collapseBorderClass.description,
    }),

    prop_collapseBorderStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_collapseBorderStyles",
        default:      {},
        name:         Keys.category.components.collapse.props.collapseBorderStyles.name,
        description:  Keys.category.components.collapse.props.collapseBorderStyles.description,
    }),

    prop_collapseBorderColor: Define_ComponentProp<string | null>({
        prop:         "prop_collapseBorderColor",
        default:      null,
        name:         Keys.category.components.collapse.props.collapseBorderColor.name,
        description:  Keys.category.components.collapse.props.collapseBorderColor.description,
    }),

    prop_collapseBorderWidth: Define_ComponentProp<UtilConst.Sizes | number>({
        prop:         "prop_collapseBorderWidth",
        default:      UtilConst.Sizes.M,
        name:         Keys.category.components.collapse.props.collapseBorderWidth.name,
        description:  Keys.category.components.collapse.props.collapseBorderWidth.description,
    }),

    prop_collapseBorderRadius: Define_ComponentProp<UtilConst.Sizes | number>({
        prop:         "prop_collapseBorderRadius",
        default:      UtilConst.Sizes.M,
        name:         Keys.category.components.collapse.props.collapseBorderRadius.name,
        description:  Keys.category.components.collapse.props.collapseBorderRadius.description,
    }),

    prop_collapseBorderMinWidth: Define_ComponentProp<string | null>({
        prop:         "prop_collapseBorderMinWidth",
        default:      null,
        name:         Keys.category.components.collapse.props.collapseBorderMinWidth.name,
        description:  Keys.category.components.collapse.props.collapseBorderMinWidth.description,
    }),

    /// --- Icon ---

    prop_collapseIcon: Define_ComponentProp<UiIcons.IIconDefinition | null>({
        prop:         "prop_collapseIcon",
        default:      null,
        name:         Keys.category.components.collapse.props.collapseIcon.name,
        description:  Keys.category.components.collapse.props.collapseIcon.description,
    }),

    prop_collapseIconClass: Define_ComponentProp<string[]>({
        prop:         "prop_collapseIconClass",
        default:      [],
        name:         Keys.category.components.collapse.props.collapseIconClass.name,
        description:  Keys.category.components.collapse.props.collapseIconClass.description,
    }),

    prop_collapseIconStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_collapseIconStyles",
        default:      {},
        name:         Keys.category.components.collapse.props.collapseIconStyles.name,
        description:  Keys.category.components.collapse.props.collapseIconStyles.description,
    }),

    /// --- Title ---

    prop_collapseTitle: Define_ComponentProp<string | null>({
        prop:         "prop_collapseTitle",
        default:      null,
        name:         Keys.category.components.collapse.props.collapseTitle.name,
        description:  Keys.category.components.collapse.props.collapseTitle.description,
    }),

    prop_collapseTitleStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_collapseTitleStyles",
        default:      {},
        name:         Keys.category.components.collapse.props.collapseTitleStyles.name,
        description:  Keys.category.components.collapse.props.collapseTitleStyles.description,
    }),

    prop_collapseTitleClass: Define_ComponentProp<string[]>({
        prop:         "prop_collapseTitleClass",
        default:      [],
        name:         Keys.category.components.collapse.props.collapseTitleClass.name,
        description:  Keys.category.components.collapse.props.collapseTitleClass.description,
    }),

    prop_collapseTitleColor: Define_ComponentProp<string | null>({
        prop:         "prop_collapseTitleColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.collapse.props.collapseTitleColor.name,
        description:  Keys.category.components.collapse.props.collapseTitleColor.description,
    }),

    /// --- Arrow ---

    prop_collapseArrowStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_collapseArrowStyles",
        default:      {},
        name:         Keys.category.components.collapse.props.collapseArrowStyles.name,
        description:  Keys.category.components.collapse.props.collapseArrowStyles.description,
    }),

    prop_collapseArrowClass: Define_ComponentProp<string[]>({
        prop:         "prop_collapseArrowClass",
        default:      [],
        name:         Keys.category.components.collapse.props.collapseArrowClass.name,
        description:  Keys.category.components.collapse.props.collapseArrowClass.description,
    }),

    /// --- Body ---

    prop_collapseBody: Define_ComponentProp<any>({
        prop:         "prop_collapseBody",
        default:      null,
        name:         Keys.category.components.collapse.props.collapseBody.name,
        description:  Keys.category.components.collapse.props.collapseBody.description,
    }),

    prop_collapseBodyStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_collapseBodyStyles",
        default:      {},
        name:         Keys.category.components.collapse.props.collapseBodyStyles.name,
        description:  Keys.category.components.collapse.props.collapseBodyStyles.description,
    }),

    prop_collapseBodyClass: Define_ComponentProp<string[]>({
        prop:         "prop_collapseBodyClass",
        default:      [],
        name:         Keys.category.components.collapse.props.collapseBodyClass.name,
        description:  Keys.category.components.collapse.props.collapseBodyClass.description,
    }),

    prop_collapseBodyIsOpen: Define_ComponentProp<boolean>({
        prop:         "prop_collapseBodyIsOpen",
        default:      false,
        name:         Keys.category.components.collapse.props.collapseBodyIsOpen.name,
        description:  Keys.category.components.collapse.props.collapseBodyIsOpen.description,
    }),

    prop_collapseBodyBorderColor: Define_ComponentProp<string | null>({
        prop:         "prop_collapseBodyBorderColor",
        default:      null,
        name:         Keys.category.components.collapse.props.collapseBodyBorderColor.name,
        description:  Keys.category.components.collapse.props.collapseBodyBorderColor.description,
    }),

    prop_collapseBodyBorderWidth: Define_ComponentProp<UtilConst.Sizes | number>({
        prop:         "prop_collapseBodyBorderWidth",
        default:      UtilConst.Sizes.S,
        name:         Keys.category.components.collapse.props.collapseBodyBorderWidth.name,
        description:  Keys.category.components.collapse.props.collapseBodyBorderWidth.description,
    }),

    prop_collapseBodyBorderRadius: Define_ComponentProp<UtilConst.Sizes | number>({
        prop:         "prop_collapseBodyBorderRadius",
        default:      UtilConst.Sizes.S,
        name:         Keys.category.components.collapse.props.collapseBodyBorderRadius.name,
        description:  Keys.category.components.collapse.props.collapseBodyBorderRadius.description,
    }),

} satisfies CoreComponents.ComponentProps;


/**
 * نوع propهای ComponentCollapse — برای استفاده در TProp
 */
export type PropsType = ExtractPropsType<typeof Props>;


/**
 * نوع config قابل‌قبول constructor — هر prop می‌تواند:
 *   - مقدار خام (مطابق default)
 *   - یا Observable همان مقدار (ClObservable<T>)
 */
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;

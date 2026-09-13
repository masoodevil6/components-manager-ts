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
 * Props اختصاصی ComponentWebCode
 *
 * این Props به propهای پایه ComponentStructure اضافه می‌شوند.
 *
 * تغییرات نسبت به Legacy:
 *   - رنگ‌ها به string (خروجی Css_Color — سازگار با CSS vars)
 *   - IconsType (widget instance) → UiIcons.IIconDefinition (data-only descriptor)
 */
export const Props = {

    /// --- Icon ---

    prop_icon: Define_ComponentProp<UiIcons.IIconDefinition | null>({
        prop:         "prop_icon",
        default:      UiIcons.Src.WebCode404.Definition,
        name:         Keys.category.components.webCode.props.icon.name,
        description:  Keys.category.components.webCode.props.icon.description,
    }),

    prop_iconClass: Define_ComponentProp<string[]>({
        prop:         "prop_iconClass",
        default:      [],
        name:         Keys.category.components.webCode.props.iconClass.name,
        description:  Keys.category.components.webCode.props.iconClass.description,
    }),

    prop_iconStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_iconStyles",
        default:      {},
        name:         Keys.category.components.webCode.props.iconStyles.name,
        description:  Keys.category.components.webCode.props.iconStyles.description,
    }),

    /// --- Background ---

    prop_background: Define_ComponentProp<string | null>({
        prop:         "prop_background",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_4),
        name:         Keys.category.components.webCode.props.background.name,
        description:  Keys.category.components.webCode.props.background.description,
    }),

    /// --- Retry Button ---

    prop_btnRetryHas: Define_ComponentProp<boolean>({
        prop:         "prop_btnRetryHas",
        default:      true,
        name:         Keys.category.components.webCode.props.btnRetryHas.name,
        description:  Keys.category.components.webCode.props.btnRetryHas.description,
    }),

    prop_btnRetryTitle: Define_ComponentProp<string | null>({
        prop:         "prop_btnRetryTitle",
        default:      null,
        name:         Keys.category.components.webCode.props.btnRetryTitle.name,
        description:  Keys.category.components.webCode.props.btnRetryTitle.description,
    }),

    prop_btnRetryClass: Define_ComponentProp<string[]>({
        prop:         "prop_btnRetryClass",
        default:      [],
        name:         Keys.category.components.webCode.props.btnRetryClass.name,
        description:  Keys.category.components.webCode.props.btnRetryClass.description,
    }),

    prop_btnRetryIcon: Define_ComponentProp<UiIcons.IIconDefinition | null>({
        prop:         "prop_btnRetryIcon",
        default:      UiIcons.Src.FileReload.Definition,
        name:         Keys.category.components.webCode.props.btnRetryIcon.name,
        description:  Keys.category.components.webCode.props.btnRetryIcon.description,
    }),

} satisfies CoreComponents.ComponentProps;


/**
 * نوع propهای ComponentWebCode — برای استفاده در TProp
 */
export type PropsType = ExtractPropsType<typeof Props>;


/**
 * نوع config قابل‌قبول constructor — هر prop می‌تواند:
 *   - مقدار خام (مطابق default)
 *   - یا Observable همان مقدار (ClObservable<T>)
 */
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;

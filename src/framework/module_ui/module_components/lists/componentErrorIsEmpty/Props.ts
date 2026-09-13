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
 * Props اختصاصی ComponentErrorIsEmpty
 *
 * این Props به propهای پایه ComponentStructure اضافه می‌شوند.
 *
 * تغییرات نسبت به Legacy:
 *   - رنگ‌ها به string (خروجی Css_Color — سازگار با CSS vars)
 *   - IconsType (widget instance) → UiIcons.IIconDefinition (data-only descriptor)
 */
export const Props = {

    /// --- Border ---

    prop_borderClass: Define_ComponentProp<string[]>({
        prop:         "prop_borderClass",
        default:      ["p-2"],
        name:         Keys.category.components.errorIsEmpty.props.borderClass.name,
        description:  Keys.category.components.errorIsEmpty.props.borderClass.description,
    }),

    prop_borderStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_borderStyles",
        default:      {},
        name:         Keys.category.components.errorIsEmpty.props.borderStyles.name,
        description:  Keys.category.components.errorIsEmpty.props.borderStyles.description,
    }),

    prop_borderColor: Define_ComponentProp<string | null>({
        prop:         "prop_borderColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.WARNING, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.errorIsEmpty.props.borderColor.name,
        description:  Keys.category.components.errorIsEmpty.props.borderColor.description,
    }),

    /// --- Icon ---

    prop_icon: Define_ComponentProp<UiIcons.IIconDefinition | null>({
        prop:         "prop_icon",
        default:      UiIcons.Src.SymbolExclumationWarning.Definition,
        name:         Keys.category.components.errorIsEmpty.props.icon.name,
        description:  Keys.category.components.errorIsEmpty.props.icon.description,
    }),

    prop_iconClass: Define_ComponentProp<string[]>({
        prop:         "prop_iconClass",
        default:      ["font-30pt", "text-danger"],
        name:         Keys.category.components.errorIsEmpty.props.iconClass.name,
        description:  Keys.category.components.errorIsEmpty.props.iconClass.description,
    }),

    prop_iconStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_iconStyles",
        default:      { display: "block", "text-align": "center" },
        name:         Keys.category.components.errorIsEmpty.props.iconStyles.name,
        description:  Keys.category.components.errorIsEmpty.props.iconStyles.description,
    }),

    /// --- Title ---

    prop_title: Define_ComponentProp<string>({
        prop:         "prop_title",
        default:      "",
        name:         Keys.category.components.errorIsEmpty.props.title.name,
        description:  Keys.category.components.errorIsEmpty.props.title.description,
    }),

    prop_titleColor: Define_ComponentProp<string | null>({
        prop:         "prop_titleColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.errorIsEmpty.props.titleColor.name,
        description:  Keys.category.components.errorIsEmpty.props.titleColor.description,
    }),

    prop_titleClass: Define_ComponentProp<string[]>({
        prop:         "prop_titleClass",
        default:      ["text-center"],
        name:         Keys.category.components.errorIsEmpty.props.titleClass.name,
        description:  Keys.category.components.errorIsEmpty.props.titleClass.description,
    }),

    prop_titleStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_titleStyles",
        default:      {},
        name:         Keys.category.components.errorIsEmpty.props.titleStyles.name,
        description:  Keys.category.components.errorIsEmpty.props.titleStyles.description,
    }),

    /// --- Button ---

    prop_btnHas: Define_ComponentProp<boolean>({
        prop:         "prop_btnHas",
        default:      false,
        name:         Keys.category.components.errorIsEmpty.props.btnHas.name,
        description:  Keys.category.components.errorIsEmpty.props.btnHas.description,
    }),

    prop_btnClass: Define_ComponentProp<string[]>({
        prop:         "prop_btnClass",
        default:      ["mx-auto"],
        name:         Keys.category.components.errorIsEmpty.props.btnClass.name,
        description:  Keys.category.components.errorIsEmpty.props.btnClass.description,
    }),

    prop_btnStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_btnStyles",
        default:      { cursor: "pointer" },
        name:         Keys.category.components.errorIsEmpty.props.btnStyles.name,
        description:  Keys.category.components.errorIsEmpty.props.btnStyles.description,
    }),

    prop_btnTitle: Define_ComponentProp<string | null>({
        prop:         "prop_btnTitle",
        default:      null,
        name:         Keys.category.components.errorIsEmpty.props.btnTitle.name,
        description:  Keys.category.components.errorIsEmpty.props.btnTitle.description,
    }),

    prop_btnIcon: Define_ComponentProp<UiIcons.IIconDefinition | null>({
        prop:         "prop_btnIcon",
        default:      UiIcons.Src.FileReload.Definition,
        name:         Keys.category.components.errorIsEmpty.props.btnIcon.name,
        description:  Keys.category.components.errorIsEmpty.props.btnIcon.description,
    }),

} satisfies CoreComponents.ComponentProps;


/**
 * نوع propهای ComponentErrorIsEmpty — برای استفاده در TProp
 */
export type PropsType = ExtractPropsType<typeof Props>;


/**
 * نوع config قابل‌قبول constructor — هر prop می‌تواند:
 *   - مقدار خام (مطابق default)
 *   - یا Observable همان مقدار (ClObservable<T>)
 */
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;

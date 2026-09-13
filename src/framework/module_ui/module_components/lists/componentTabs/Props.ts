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
 * Props اختصاصی ComponentTabs (Plan 15.1.0 — بازیابی ۲۲ prop Legacy)
 */
export type TabsViewType = "full_width" | "float";

export type TabType = {
    id:    string | number;
    title?: string | null;
    icon?:  UiIcons.IIconDefinition | null;
    body?:  any;
};


export const Props = {

    /// --- Border ---

    prop_borderBackgroundSelected: Define_ComponentProp<string | null>({
        prop:         "prop_borderBackgroundSelected",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.tabs.props.borderBackgroundSelected.name,
        description:  Keys.category.components.tabs.props.borderBackgroundSelected.description,
    }),

    prop_borderBackgroundUnselected: Define_ComponentProp<string | null>({
        prop:         "prop_borderBackgroundUnselected",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_3),
        name:         Keys.category.components.tabs.props.borderBackgroundUnselected.name,
        description:  Keys.category.components.tabs.props.borderBackgroundUnselected.description,
    }),

    prop_borderBackgroundBefore: Define_ComponentProp<string | null>({
        prop:         "prop_borderBackgroundBefore",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SHADOW, UtilConst.ColorGrad.GRADE_2),
        name:         Keys.category.components.tabs.props.borderBackgroundBefore.name,
        description:  Keys.category.components.tabs.props.borderBackgroundBefore.description,
    }),

    prop_borderBackgroundAfter: Define_ComponentProp<string | null>({
        prop:         "prop_borderBackgroundAfter",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_4),
        name:         Keys.category.components.tabs.props.borderBackgroundAfter.name,
        description:  Keys.category.components.tabs.props.borderBackgroundAfter.description,
    }),

    prop_borderClass: Define_ComponentProp<string[]>({
        prop:         "prop_borderClass",
        default:      [],
        name:         Keys.category.components.tabs.props.borderClass.name,
        description:  Keys.category.components.tabs.props.borderClass.description,
    }),

    prop_borderStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_borderStyles",
        default:      { overflow: "hidden" },
        name:         Keys.category.components.tabs.props.borderStyles.name,
        description:  Keys.category.components.tabs.props.borderStyles.description,
    }),

    prop_borderColor: Define_ComponentProp<string | null>({
        prop:         "prop_borderColor",
        default:      null,
        name:         Keys.category.components.tabs.props.borderColor.name,
        description:  Keys.category.components.tabs.props.borderColor.description,
    }),

    prop_borderWidth: Define_ComponentProp<UtilConst.Sizes | number | null>({
        prop:         "prop_borderWidth",
        default:      null,
        name:         Keys.category.components.tabs.props.borderWidth.name,
        description:  Keys.category.components.tabs.props.borderWidth.description,
    }),

    prop_borderRadius: Define_ComponentProp<UtilConst.Sizes | number>({
        prop:         "prop_borderRadius",
        default:      UtilConst.Sizes.M,
        name:         Keys.category.components.tabs.props.borderRadius.name,
        description:  Keys.category.components.tabs.props.borderRadius.description,
    }),

    prop_borderMinWidth: Define_ComponentProp<string | null>({
        prop:         "prop_borderMinWidth",
        default:      "120px",
        name:         Keys.category.components.tabs.props.borderMinWidth.name,
        description:  Keys.category.components.tabs.props.borderMinWidth.description,
    }),

    /// --- Icon ---

    prop_iconClass: Define_ComponentProp<string[]>({
        prop:         "prop_iconClass",
        default:      [],
        name:         Keys.category.components.tabs.props.iconClass.name,
        description:  Keys.category.components.tabs.props.iconClass.description,
    }),

    prop_iconStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_iconStyles",
        default:      {},
        name:         Keys.category.components.tabs.props.iconStyles.name,
        description:  Keys.category.components.tabs.props.iconStyles.description,
    }),

    /// --- Title ---

    prop_titleStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_titleStyles",
        default:      {},
        name:         Keys.category.components.tabs.props.titleStyles.name,
        description:  Keys.category.components.tabs.props.titleStyles.description,
    }),

    prop_titleClass: Define_ComponentProp<string[]>({
        prop:         "prop_titleClass",
        default:      [],
        name:         Keys.category.components.tabs.props.titleClass.name,
        description:  Keys.category.components.tabs.props.titleClass.description,
    }),

    prop_titleColorSelected: Define_ComponentProp<string | null>({
        prop:         "prop_titleColorSelected",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.tabs.props.titleColorSelected.name,
        description:  Keys.category.components.tabs.props.titleColorSelected.description,
    }),

    prop_titleColorUnselected: Define_ComponentProp<string | null>({
        prop:         "prop_titleColorUnselected",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.tabs.props.titleColorUnselected.name,
        description:  Keys.category.components.tabs.props.titleColorUnselected.description,
    }),

    /// --- Body ---

    prop_bodyStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_bodyStyles",
        default:      {},
        name:         Keys.category.components.tabs.props.bodyStyles.name,
        description:  Keys.category.components.tabs.props.bodyStyles.description,
    }),

    prop_bodyClass: Define_ComponentProp<string[]>({
        prop:         "prop_bodyClass",
        default:      [],
        name:         Keys.category.components.tabs.props.bodyClass.name,
        description:  Keys.category.components.tabs.props.bodyClass.description,
    }),

    prop_bodyBackgroundColor: Define_ComponentProp<string | null>({
        prop:         "prop_bodyBackgroundColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.tabs.props.bodyBackgroundColor.name,
        description:  Keys.category.components.tabs.props.bodyBackgroundColor.description,
    }),

    prop_bodyBorderColor: Define_ComponentProp<string | null>({
        prop:         "prop_bodyBorderColor",
        default:      null,
        name:         Keys.category.components.tabs.props.bodyBorderColor.name,
        description:  Keys.category.components.tabs.props.bodyBorderColor.description,
    }),

    prop_bodyBorderWidth: Define_ComponentProp<UtilConst.Sizes | number>({
        prop:         "prop_bodyBorderWidth",
        default:      UtilConst.Sizes.S,
        name:         Keys.category.components.tabs.props.bodyBorderWidth.name,
        description:  Keys.category.components.tabs.props.bodyBorderWidth.description,
    }),

    prop_bodyBorderRadius: Define_ComponentProp<UtilConst.Sizes | number>({
        prop:         "prop_bodyBorderRadius",
        default:      UtilConst.Sizes.S,
        name:         Keys.category.components.tabs.props.bodyBorderRadius.name,
        description:  Keys.category.components.tabs.props.bodyBorderRadius.description,
    }),

    /// --- Tabs ---

    prop_tabs: Define_ComponentProp<TabType[]>({
        prop:         "prop_tabs",
        default:      [],
        name:         Keys.category.components.tabs.props.tabs.name,
        description:  Keys.category.components.tabs.props.tabs.description,
    }),

    prop_tabsView: Define_ComponentProp<TabsViewType>({
        prop:         "prop_tabsView",
        default:      "full_width",
        name:         Keys.category.components.tabs.props.tabsView.name,
        description:  Keys.category.components.tabs.props.tabsView.description,
    }),

    prop_tabSelected: Define_ComponentProp<string | number | null>({
        prop:         "prop_tabSelected",
        default:      null,
        name:         Keys.category.components.tabs.props.tabSelected.name,
        description:  Keys.category.components.tabs.props.tabSelected.description,
    }),

} satisfies CoreComponents.ComponentProps;


export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;

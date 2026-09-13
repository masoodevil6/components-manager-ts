import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys}                from "../../../module_categories/languages";
import * as UiIcons          from "@/ui_icons";
import * as UtilConst        from "@/util_consts";
import * as UtilStyle        from "@/util_styles";
import type {
    ExtractPropsType,
    ExtractPropsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * ColumnItem — آیتم ستون قابل انتخاب
 */
export type ColumnItem = {
    id:       string | number;
    title:    string | null;
    selected: boolean;
};


/**
 * Props اختصاصی ComponentInputListSelector
 *
 * این Props به ۷ prop پایه ComponentStructure اضافه می‌شوند.
 */
export const Props = {

    /// --- Colors ---

    prop_inputBackgroundColor: Define_ComponentProp<string | null>({
        prop:         "prop_inputBackgroundColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.inputListSelector.props.inputBackgroundColor.name,
        description:  Keys.category.components.inputListSelector.props.inputBackgroundColor.description,
    }),

    prop_menuBackgroundColor: Define_ComponentProp<string | null>({
        prop:         "prop_menuBackgroundColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.inputListSelector.props.menuBackgroundColor.name,
        description:  Keys.category.components.inputListSelector.props.menuBackgroundColor.description,
    }),

    prop_menuBorderColor: Define_ComponentProp<string | null>({
        prop:         "prop_menuBorderColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.inputListSelector.props.menuBorderColor.name,
        description:  Keys.category.components.inputListSelector.props.menuBorderColor.description,
    }),

    /// --- Content ---

    prop_columns: Define_ComponentProp<ColumnItem[]>({
        prop:         "prop_columns",
        default:      [],
        name:         Keys.category.components.inputListSelector.props.columns.name,
        description:  Keys.category.components.inputListSelector.props.columns.description,
    }),

    prop_icon: Define_ComponentProp<UiIcons.IIconDefinition | null>({
        prop:         "prop_icon",
        default:      null,
        name:         Keys.category.components.inputListSelector.props.icon.name,
        description:  Keys.category.components.inputListSelector.props.icon.description,
    }),

    prop_showListSelected: Define_ComponentProp<boolean>({
        prop:         "prop_showListSelected",
        default:      true,
        name:         Keys.category.components.inputListSelector.props.showListSelected.name,
        description:  Keys.category.components.inputListSelector.props.showListSelected.description,
    }),

    prop_labelShow: Define_ComponentProp<boolean>({
        prop:         "prop_labelShow",
        default:      true,
        name:         Keys.category.components.inputListSelector.props.labelShow.name,
        description:  Keys.category.components.inputListSelector.props.labelShow.description,
    }),

    prop_labelTitle: Define_ComponentProp<string | null>({
        prop:         "prop_labelTitle",
        default:      null,
        name:         Keys.category.components.label.props.labelTitle.name,
        description:  Keys.category.components.label.props.labelTitle.description,
    }),

    prop_labelTooltipDescription: Define_ComponentProp<string | null>({
        prop:         "prop_labelTooltipDescription",
        default:      null,
        name:         Keys.category.components.label.props.labelTooltipDescription.name,
        description:  Keys.category.components.label.props.labelTooltipDescription.description,
    }),

    /// --- Size ---

    prop_widthBody: Define_ComponentProp<string | null>({
        prop:         "prop_widthBody",
        default:      "300px",
        name:         Keys.category.components.inputListSelector.props.widthBody.name,
        description:  Keys.category.components.inputListSelector.props.widthBody.description,
    }),

    prop_heightBody: Define_ComponentProp<string | null>({
        prop:         "prop_heightBody",
        default:      "300px",
        name:         Keys.category.components.inputListSelector.props.heightBody.name,
        description:  Keys.category.components.inputListSelector.props.heightBody.description,
    }),

    prop_heightItems: Define_ComponentProp<number>({
        prop:         "prop_heightItems",
        default:      45,
        name:         Keys.category.components.inputListSelector.props.heightItems.name,
        description:  Keys.category.components.inputListSelector.props.heightItems.description,
    }),

    /// --- Behavior ---

    prop_titleAll: Define_ComponentProp<string>({
        prop:         "prop_titleAll",
        default:      "Select All",
        name:         Keys.category.components.inputListSelector.props.titleAll.name,
        description:  Keys.category.components.inputListSelector.props.titleAll.description,
    }),

    prop_draggable: Define_ComponentProp<boolean>({
        prop:         "prop_draggable",
        default:      true,
        name:         Keys.category.components.inputListSelector.props.draggable.name,
        description:  Keys.category.components.inputListSelector.props.draggable.description,
    }),

    prop_backgroundColorIcon: Define_ComponentProp<string | null>({
        prop:         "prop_backgroundColorIcon",
        default:      null,
        name:         Keys.category.components.inputListSelector.props.backgroundColorIcon.name,
        description:  Keys.category.components.inputListSelector.props.backgroundColorIcon.description,
    }),

    prop_colorIcon: Define_ComponentProp<string | null>({
        prop:         "prop_colorIcon",
        default:      null,
        name:         Keys.category.components.inputListSelector.props.colorIcon.name,
        description:  Keys.category.components.inputListSelector.props.colorIcon.description,
    }),

} satisfies CoreComponents.ComponentProps;


/**
 * نوع propهای ComponentInputListSelector — برای استفاده در TProp
 */
export type PropsType = ExtractPropsType<typeof Props>;


/**
 * نوع config قابل‌قبول constructor
 */
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;

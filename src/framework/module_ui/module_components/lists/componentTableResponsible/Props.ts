import * as CoreComponents from "@/core_components";
import * as UiIcons from "@/ui_icons";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys} from "../../../module_categories/languages/keys/components/tableResponsible";
import type {TableHeaderItem, TableDataRow, TableActionOption} from "../componentTable/Props";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export enum TableResponsibleViewMode {
    AUTO = "auto",
    TABLE = "table",
    CARDS = "cards",
}

export type TableResponsibleHeaderItem = Omit<TableHeaderItem, "icon"> & {
    icon?: UiIcons.IIconDefinition | null;
    inCards?: boolean;
};

export type TableResponsibleRowOption = TableActionOption;

export const Props = {
    prop_viewMode: Define_ComponentProp<TableResponsibleViewMode>({
        prop: "prop_viewMode",
        default: TableResponsibleViewMode.AUTO,
        name: Keys.category.components.tableResponsible.props.viewMode.name,
        description: Keys.category.components.tableResponsible.props.viewMode.description,
    }),
    prop_mobileBreakpoint: Define_ComponentProp<number | null>({
        prop: "prop_mobileBreakpoint",
        default: null,
        name: Keys.category.components.tableResponsible.props.mobileBreakpoint.name,
        description: Keys.category.components.tableResponsible.props.mobileBreakpoint.description,
    }),
    prop_formClass: Define_ComponentProp<string[]>({
        prop: "prop_formClass",
        default: [],
        name: Keys.category.components.tableResponsible.props.formClass.name,
        description: Keys.category.components.tableResponsible.props.formClass.description,
    }),
    prop_formStyles: Define_ComponentProp<Record<string, string>>({
        prop: "prop_formStyles",
        default: {},
        name: Keys.category.components.tableResponsible.props.formStyles.name,
        description: Keys.category.components.tableResponsible.props.formStyles.description,
    }),
    prop_size: Define_ComponentProp<UtilConst.Sizes>({
        prop: "prop_size",
        default: UtilConst.Sizes.M,
        name: Keys.category.components.tableResponsible.props.size.name,
        description: Keys.category.components.tableResponsible.props.size.description,
    }),
    prop_order: Define_ComponentProp<string[]>({
        prop: "prop_order",
        default: [],
        name: Keys.category.components.tableResponsible.props.order.name,
        description: Keys.category.components.tableResponsible.props.order.description,
    }),
    prop_header: Define_ComponentProp<TableResponsibleHeaderItem[]>({
        prop: "prop_header",
        default: [],
        name: Keys.category.components.tableResponsible.props.header.name,
        description: Keys.category.components.tableResponsible.props.header.description,
    }),
    prop_data: Define_ComponentProp<TableDataRow[]>({
        prop: "prop_data",
        default: [],
        name: Keys.category.components.tableResponsible.props.data.name,
        description: Keys.category.components.tableResponsible.props.data.description,
    }),
    prop_rowKey: Define_ComponentProp<string | null>({
        prop: "prop_rowKey",
        default: null,
        name: Keys.category.components.tableResponsible.props.rowKey.name,
        description: Keys.category.components.tableResponsible.props.rowKey.description,
    }),
    prop_rowOptions: Define_ComponentProp<TableResponsibleRowOption[]>({
        prop: "prop_rowOptions",
        default: [],
        name: Keys.category.components.tableResponsible.props.rowOptions.name,
        description: Keys.category.components.tableResponsible.props.rowOptions.description,
    }),
    prop_doColSelector: Define_ComponentProp<boolean>({
        prop: "prop_doColSelector",
        default: true,
        name: Keys.category.components.tableResponsible.props.doColSelector.name,
        description: Keys.category.components.tableResponsible.props.doColSelector.description,
    }),
    prop_headerBackgroundColor: Define_ComponentProp<string>({
        prop: "prop_headerBackgroundColor",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name: Keys.category.components.tableResponsible.props.headerBackgroundColor.name,
        description: Keys.category.components.tableResponsible.props.headerBackgroundColor.description,
    }),
    prop_headerColor: Define_ComponentProp<string>({
        prop: "prop_headerColor",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_4),
        name: Keys.category.components.tableResponsible.props.headerColor.name,
        description: Keys.category.components.tableResponsible.props.headerColor.description,
    }),
    prop_bodyBackgroundColor: Define_ComponentProp<string>({
        prop: "prop_bodyBackgroundColor",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_2),
        name: Keys.category.components.tableResponsible.props.bodyBackgroundColor.name,
        description: Keys.category.components.tableResponsible.props.bodyBackgroundColor.description,
    }),
    prop_bodyColor: Define_ComponentProp<string>({
        prop: "prop_bodyColor",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_1),
        name: Keys.category.components.tableResponsible.props.bodyColor.name,
        description: Keys.category.components.tableResponsible.props.bodyColor.description,
    }),
    prop_bodyHoverBackgroundColor: Define_ComponentProp<string>({
        prop: "prop_bodyHoverBackgroundColor",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_4),
        name: Keys.category.components.tableResponsible.props.bodyHoverBackgroundColor.name,
        description: Keys.category.components.tableResponsible.props.bodyHoverBackgroundColor.description,
    }),
    prop_bodyHoverColor: Define_ComponentProp<string>({
        prop: "prop_bodyHoverColor",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name: Keys.category.components.tableResponsible.props.bodyHoverColor.name,
        description: Keys.category.components.tableResponsible.props.bodyHoverColor.description,
    }),
    prop_columnSelectorBackgroundColor: Define_ComponentProp<string | null>({
        prop: "prop_columnSelectorBackgroundColor",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
        name: Keys.category.components.tableResponsible.props.columnSelectorBackgroundColor.name,
        description: Keys.category.components.tableResponsible.props.columnSelectorBackgroundColor.description,
    }),
    prop_columnSelectorColor: Define_ComponentProp<string | null>({
        prop: "prop_columnSelectorColor",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name: Keys.category.components.tableResponsible.props.columnSelectorColor.name,
        description: Keys.category.components.tableResponsible.props.columnSelectorColor.description,
    }),
    prop_cardIconColor: Define_ComponentProp<string>({
        prop: "prop_cardIconColor",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name: Keys.category.components.tableResponsible.props.cardIconColor.name,
        description: Keys.category.components.tableResponsible.props.cardIconColor.description,
    }),
    prop_headerIconSize: Define_ComponentProp<number>({
        prop: "prop_headerIconSize",
        default: 20,
        name: Keys.category.components.tableResponsible.props.headerIconSize.name,
        description: Keys.category.components.tableResponsible.props.headerIconSize.description,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;

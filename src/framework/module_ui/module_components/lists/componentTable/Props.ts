import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys}                from "../../../module_categories/languages";
import * as UtilConst        from "@/util_consts";
import type {
    ExtractPropsType,
    ExtractPropsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Types اختصاصی ComponentTable
 */
export type TableHeaderItem = {
    id:      string;
    content?: string;
    icon?:   string | ((size: number, color?: string) => string);
    width?:  number;
};

export type TableDataRow = Record<string, string | { content: string }>;

export type TableRowOption = {
    html:  string | ((size: string, color?: string) => string);
    attrs: { id: string; name?: string; title?: string };
};


/**
 * Enums اختصاصی ComponentTable
 */
export enum TableSelectedType {
    NONE = 0,
    ROW  = 1,
    COL  = 2,
    BOTH = 3,
}


/**
 * Props اختصاصی ComponentTable
 *
 * این Props به ۷ prop پایه ComponentStructure اضافه می‌شوند.
 */
export const Props = {

    prop_size: Define_ComponentProp<UtilConst.Sizes>({
        prop:         "prop_size",
        default:      UtilConst.Sizes.M,
        name:         Keys.category.components.table.props.size.name,
        description:  Keys.category.components.table.props.size.description,
    }),

    prop_hasColNumber: Define_ComponentProp<boolean>({
        prop:         "prop_hasColNumber",
        default:      true,
        name:         Keys.category.components.table.props.hasColNumber.name,
        description:  Keys.category.components.table.props.hasColNumber.description,
    }),

    prop_tableClass: Define_ComponentProp<string[]>({
        prop:         "prop_tableClass",
        default:      ["table"],
        name:         Keys.category.components.table.props.tableClass.name,
        description:  Keys.category.components.table.props.tableClass.description,
    }),

    prop_tableStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_tableStyles",
        default:      {},
        name:         Keys.category.components.table.props.tableStyles.name,
        description:  Keys.category.components.table.props.tableStyles.description,
    }),

    prop_tableBordered: Define_ComponentProp<boolean>({
        prop:         "prop_tableBordered",
        default:      false,
        name:         Keys.category.components.table.props.tableBordered.name,
        description:  Keys.category.components.table.props.tableBordered.description,
    }),

    prop_tableStriped: Define_ComponentProp<boolean>({
        prop:         "prop_tableStriped",
        default:      false,
        name:         Keys.category.components.table.props.tableStriped.name,
        description:  Keys.category.components.table.props.tableStriped.description,
    }),

    prop_tableHover: Define_ComponentProp<boolean>({
        prop:         "prop_tableHover",
        default:      false,
        name:         Keys.category.components.table.props.tableHover.name,
        description:  Keys.category.components.table.props.tableHover.description,
    }),

    prop_tableBorderless: Define_ComponentProp<boolean>({
        prop:         "prop_tableBorderless",
        default:      false,
        name:         Keys.category.components.table.props.tableBorderless.name,
        description:  Keys.category.components.table.props.tableBorderless.description,
    }),

    prop_tableHeadClass: Define_ComponentProp<string[]>({
        prop:         "prop_tableHeadClass",
        default:      [],
        name:         Keys.category.components.table.props.tableHeadClass.name,
        description:  Keys.category.components.table.props.tableHeadClass.description,
    }),

    prop_tableHeadStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_tableHeadStyles",
        default:      {},
        name:         Keys.category.components.table.props.tableHeadStyles.name,
        description:  Keys.category.components.table.props.tableHeadStyles.description,
    }),

    prop_tableItemHeadClass: Define_ComponentProp<string[]>({
        prop:         "prop_tableItemHeadClass",
        default:      [],
        name:         Keys.category.components.table.props.tableItemHeadClass.name,
        description:  Keys.category.components.table.props.tableItemHeadClass.description,
    }),

    prop_tableItemHeadStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_tableItemHeadStyles",
        default:      {},
        name:         Keys.category.components.table.props.tableItemHeadStyles.name,
        description:  Keys.category.components.table.props.tableItemHeadStyles.description,
    }),

    prop_order: Define_ComponentProp<string[]>({
        prop:         "prop_order",
        default:      [],
        name:         Keys.category.components.table.props.order.name,
        description:  Keys.category.components.table.props.order.description,
    }),

    prop_header: Define_ComponentProp<TableHeaderItem[]>({
        prop:         "prop_header",
        default:      [],
        name:         Keys.category.components.table.props.header.name,
        description:  Keys.category.components.table.props.header.description,
    }),

    prop_headerIconSize: Define_ComponentProp<number>({
        prop:         "prop_headerIconSize",
        default:      20,
        name:         Keys.category.components.table.props.headerIconSize.name,
        description:  Keys.category.components.table.props.headerIconSize.description,
    }),

    prop_headerIconColor: Define_ComponentProp<string>({
        prop:         "prop_headerIconColor",
        default:      "",
        name:         Keys.category.components.table.props.headerIconColor.name,
        description:  Keys.category.components.table.props.headerIconColor.description,
    }),

    prop_tableBodyClass: Define_ComponentProp<string[]>({
        prop:         "prop_tableBodyClass",
        default:      [],
        name:         Keys.category.components.table.props.tableBodyClass.name,
        description:  Keys.category.components.table.props.tableBodyClass.description,
    }),

    prop_tableBodyStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_tableBodyStyles",
        default:      {},
        name:         Keys.category.components.table.props.tableBodyStyles.name,
        description:  Keys.category.components.table.props.tableBodyStyles.description,
    }),

    prop_tableItemBodyClass: Define_ComponentProp<string[]>({
        prop:         "prop_tableItemBodyClass",
        default:      [],
        name:         Keys.category.components.table.props.tableItemBodyClass.name,
        description:  Keys.category.components.table.props.tableItemBodyClass.description,
    }),

    prop_tableItemBodyStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_tableItemBodyStyles",
        default:      {},
        name:         Keys.category.components.table.props.tableItemBodyStyles.name,
        description:  Keys.category.components.table.props.tableItemBodyStyles.description,
    }),

    prop_data: Define_ComponentProp<TableDataRow[]>({
        prop:         "prop_data",
        default:      [],
        name:         Keys.category.components.table.props.data.name,
        description:  Keys.category.components.table.props.data.description,
    }),

    prop_valueType: Define_ComponentProp<TableSelectedType>({
        prop:         "prop_valueType",
        default:      TableSelectedType.NONE,
        name:         Keys.category.components.table.props.valueType.name,
        description:  Keys.category.components.table.props.valueType.description,
    }),

    prop_valueRow: Define_ComponentProp<number | null>({
        prop:         "prop_valueRow",
        default:      null,
        name:         Keys.category.components.table.props.valueRow.name,
        description:  Keys.category.components.table.props.valueRow.description,
    }),

    prop_valueCol: Define_ComponentProp<number | null>({
        prop:         "prop_valueCol",
        default:      null,
        name:         Keys.category.components.table.props.valueCol.name,
        description:  Keys.category.components.table.props.valueCol.description,
    }),

    prop_valueRow_backgroundColor: Define_ComponentProp<string>({
        prop:         "prop_valueRow_backgroundColor",
        default:      "",
        name:         Keys.category.components.table.props.valueRowBackgroundColor.name,
        description:  Keys.category.components.table.props.valueRowBackgroundColor.description,
    }),

    prop_valueCol_backgroundColor: Define_ComponentProp<string>({
        prop:         "prop_valueCol_backgroundColor",
        default:      "",
        name:         Keys.category.components.table.props.valueColBackgroundColor.name,
        description:  Keys.category.components.table.props.valueColBackgroundColor.description,
    }),

    prop_valueCol_textColor: Define_ComponentProp<string>({
        prop:         "prop_valueCol_textColor",
        default:      "",
        name:         Keys.category.components.table.props.valueColTextColor.name,
        description:  Keys.category.components.table.props.valueColTextColor.description,
    }),

    prop_rowOptions: Define_ComponentProp<TableRowOption[]>({
        prop:         "prop_rowOptions",
        default:      [],
        name:         Keys.category.components.table.props.rowOptions.name,
        description:  Keys.category.components.table.props.rowOptions.description,
    }),

    prop_rowOptionsColor: Define_ComponentProp<string>({
        prop:         "prop_rowOptionsColor",
        default:      "",
        name:         Keys.category.components.table.props.rowOptionsColor.name,
        description:  Keys.category.components.table.props.rowOptionsColor.description,
    }),

    prop_rowOptionsItemColor: Define_ComponentProp<string>({
        prop:         "prop_rowOptionsItemColor",
        default:      "",
        name:         Keys.category.components.table.props.rowOptionsItemColor.name,
        description:  Keys.category.components.table.props.rowOptionsItemColor.description,
    }),

    prop_hasColSelector: Define_ComponentProp<boolean>({
        prop:         "prop_hasColSelector",
        default:      true,
        name:         Keys.category.components.table.props.hasColSelector.name,
        description:  Keys.category.components.table.props.hasColSelector.description,
    }),

    prop_doColSelector: Define_ComponentProp<boolean>({
        prop:         "prop_doColSelector",
        default:      true,
        name:         Keys.category.components.table.props.doColSelector.name,
        description:  Keys.category.components.table.props.doColSelector.description,
    }),

} satisfies CoreComponents.ComponentProps;


/**
 * نوع propهای ComponentTable — برای استفاده در TProp
 */
export type PropsType = ExtractPropsType<typeof Props>;


/**
 * نوع config قابل‌قبول constructor
 */
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;

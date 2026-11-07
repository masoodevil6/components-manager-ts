import {Keys} from "../../../module_categories/languages/keys/components/tableResponsible";
import type {TableDataRow} from "../componentTable/Props";
import type {TableResponsibleRowOption, TableResponsibleViewMode} from "./Props";
import type {ExtractMethodsType, ExtractMethodsDataArgs, ExtractMethodsConfigType} from "../../tools/type/TypeHelpers";

export const Methods = {
    CLICK_ROW_OPTION: {
        name: "fn_onClickRowOption",
        description: Keys.category.components.tableResponsible.methods.clickRowOption.description,
        args: {},
        dataArgs: {} as {
            rowIndex: number;
            row: TableDataRow;
            option: TableResponsibleRowOption;
            value: unknown;
        },
    },
    CALLBACK_COL_SELECTOR: {
        name: "fn_onCallbackColSelector",
        description: Keys.category.components.tableResponsible.methods.callbackColSelector.description,
        args: {},
        dataArgs: {order: [] as string[], isComplete: false as boolean},
    },
    CHANGE_VIEW_MODE: {
        name: "fn_onChangeViewMode",
        description: Keys.category.components.tableResponsible.methods.changeViewMode.description,
        args: {},
        dataArgs: {viewMode: "table" as TableResponsibleViewMode.TABLE | TableResponsibleViewMode.CARDS},
    },
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

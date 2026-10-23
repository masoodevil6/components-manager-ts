import {Keys} from "../../../module_categories/languages";
import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";

export const Methods = {
    DELETE_LAYOUT: {
        name: "fn_onDeleteLayout",
        description: Keys.category.components.basic.layoutCreator.methods.deleteLayout.description,
        args: {},
        dataArgs: {} as const,
    },
    DELETE_COLUMN: {
        name: "fn_onDeleteColumn",
        description: Keys.category.components.basic.layoutCreator.methods.deleteColumn.description,
        args: {},
        dataArgs: {COLUMN_INDEX: 0 as number},
    },
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

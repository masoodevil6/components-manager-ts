import {Keys}                from "../../../module_categories/languages";
import {Props}                   from "./Props";
// --------------------------------
import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Methods اختصاصی ComponentListSelectedScroller
 *
 * Legacy: DELETE_ITEM
 */
export const Methods = {

    DELETE_ITEM: {
        name:         "fn_onDeleteItem",
        description:  Keys.category.components.listSelectedScroller.methods.deleteItem.description,

        args: {
            LIST:  Props.prop_list,
            VALUE: Props.prop_value,
        },

        dataArgs: {
            ID: { name: "ID" },
        } as const,
    },

} as const;


export type MethodsType = ExtractMethodsType<typeof Methods>;

export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;

export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;

export type MethodsConfigType<
    TThis = any,
> = ExtractMethodsConfigType<typeof Methods, TThis>;

import {Keys}                from "../../../module_categories/languages";
import {Props}               from "./Props";
// --------------------------------
import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Methods اختصاصی ComponentInputCheckBox
 */
export const Methods = {

    CLICK: {
        name:        "fn_onClickCheckbox",
        description: Keys.category.components.inputCheckBox.methods.click.description,

        args: {
            IS_DISABLE: Props.prop_isDisable,
            VALUE:      Props.prop_value,
        },

        dataArgs: {} as const,
    },

} as const;


export type MethodsType = ExtractMethodsType<typeof Methods>;


export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;


export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;


export type MethodsConfigType<
    TThis = any,
> = ExtractMethodsConfigType<typeof Methods, TThis>;

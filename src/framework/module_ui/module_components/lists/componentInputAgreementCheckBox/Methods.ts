import {Props} from "./Props";
import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Methods اختصاصی ComponentInputAgreementCheckBox
 *
 * Methods قرارداد API قابل فراخوانی توسط مصرف‌کننده است.
 * Component داخلی از this.executeMethod("CLICK_ALL", event, params) استفاده می‌کند.
 */
export const Methods = {

    CLICK_ALL: {
        name:        "fn_onClickAll",
        description: "Callback when the 'select all' checkbox is clicked",

        args: {
            IS_DISABLE: Props.prop_isDisable,
            LIST:       Props.prop_checkBoxList,
            VALUE:       Props.prop_value,
        },

        dataArgs: {} as const,
    },

    CLICK_ITEM: {
        name:        "fn_onClickItem",
        description: "Callback when an individual checkbox item is clicked",

        args: {
            IS_DISABLE: Props.prop_isDisable,
            LIST:       Props.prop_checkBoxList,
            VALUE:       Props.prop_value,
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

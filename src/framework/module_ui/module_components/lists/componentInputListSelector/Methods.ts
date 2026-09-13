import {Props as InputListSelectorProps} from "./Props";
import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Methods اختصاصی ComponentInputListSelector
 *
 * Methods قرارداد API قابل فراخوانی توسط مصرف‌کننده است.
 * Component داخلی از this.executeMethod("CLICK_ICON", event, params) استفاده می‌کند.
 */
export const Methods = {

    CLICK_ICON: {
        name:        "fn_onClickIcon",
        description: "Callback when the selector icon is clicked",

        args: {},
        dataArgs: {} as const,
    },

    CLICK_ACCEPT: {
        name:        "fn_onClickAccept",
        description: "Callback when the accept button is clicked in the float menu",

        args: {
            COLUMNS: InputListSelectorProps.prop_columns,
        },
        dataArgs: {} as const,
    },

    CLICK_REJECT: {
        name:        "fn_onClickReject",
        description: "Callback when the reject button is clicked in the float menu",

        args: {},
        dataArgs: {} as const,
    },

    CALLBACK_COL_SELECTOR: {
        name:        "fn_onCallbackColSelector",
        description: "Callback after column selection order is finalized",

        args: {
            ORDER:       InputListSelectorProps.prop_columns,
            IS_COMPLETE: InputListSelectorProps.prop_columns,
        },
        dataArgs: {} as const,
    },

    DELETE_SELECTED_ITEM: {
        name:        "fn_onDeleteSelectedItem",
        description: "Callback when a selected item is deleted from the scroller",

        args: {
            LIST:  InputListSelectorProps.prop_columns,
            VALUE: InputListSelectorProps.prop_columns,
        },
        dataArgs: {} as const,
    },

} as const;


/**
 * نوع methodهای ComponentInputListSelector
 */
export type MethodsType = ExtractMethodsType<typeof Methods>;


/**
 * Component Args type برای هر method
 */
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;


/**
 * Data Args type برای هر method
 */
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;


/**
 * نوع config methods برای مصرف‌کننده (Category callable)
 *
 * استفاده:
 *   UiCategory.UI.Inputs.InputListSelector(
 *       { prop_columns: [...] },
 *       {
 *           CLICK_ICON: function(event, dataArgs, componentArgs) { ... },
 *           CLICK_ACCEPT: function(event, dataArgs, componentArgs) { ... },
 *           CLICK_REJECT: function(event, dataArgs, componentArgs) { ... },
 *           CALLBACK_COL_SELECTOR: function(event, dataArgs, componentArgs) { ... },
 *           DELETE_SELECTED_ITEM: function(event, dataArgs, componentArgs) { ... },
 *       },
 *   );
 */
export type MethodsConfigType<
    TThis = any,
> = ExtractMethodsConfigType<typeof Methods, TThis>;

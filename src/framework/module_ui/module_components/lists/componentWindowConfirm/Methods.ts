import {Keys}                from "../../../module_categories/languages";
// --------------------------------
import {Props}                   from "./Props";
import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Methods اختصاصی ComponentWindowConfirm
 *
 * Methods قرارداد API قابل فراخوانی توسط مصرف‌کننده است.
 * Component داخلی از this.executeMethod("CONFIRM", event, params) استفاده می‌کند.
 */
export const Methods = {

    CONFIRM: {
        name:        "fn_onConfirm",
        description: Keys.category.components.windowConfirm.methods.confirm.description,

        args: {},

        dataArgs: {} as const,
    },

    CANCEL: {
        name:        "fn_onCancel",
        description: Keys.category.components.windowConfirm.methods.cancel.description,

        args: {},

        dataArgs: {} as const,
    },

} as const;


/**
 * نوع methodهای ComponentWindowConfirm — برای استفاده در TMethods (داخلی Component)
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
 *   UiCategory.UI.Contents.WindowConfirm(
 *       { prop_message: "Are you sure?" },
 *       {
 *           CONFIRM: function(event, dataArgs, componentArgs) { ... },
 *           CANCEL:  function(event, dataArgs, componentArgs) { ... },
 *       },
 *   );
 */
export type MethodsConfigType<
    TThis = any,
> = ExtractMethodsConfigType<typeof Methods, TThis>;

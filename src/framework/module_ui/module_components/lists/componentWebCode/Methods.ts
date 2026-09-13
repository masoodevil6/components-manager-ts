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
 * Methods اختصاصی ComponentWebCode
 *
 * Methods قرارداد API قابل فراخوانی توسط مصرف‌کننده است.
 * Component داخلی از this.executeMethod("RETRY_CLICK", event, params) استفاده می‌کند.
 *
 * Legacy: fn_onRetryClick
 */
export const Methods = {

    RETRY_CLICK: {
        name:        "fn_onRetryClick",
        description: Keys.category.components.webCode.methods.retryClick.description,

        args: {
            TITLE: Props.prop_btnRetryTitle,
        },

        dataArgs: {} as const,
    },

} as const;


/**
 * نوع methodهای ComponentWebCode — برای استفاده در TMethods (داخلی Component)
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
 *   UiCategory.UI.Contents.WebCode(
 *       { prop_btnRetryHas: true },
 *       {
 *           RETRY_CLICK: function(event, dataArgs, componentArgs) {
 *               // componentArgs?.TITLE  ← string
 *           },
 *       },
 *   );
 */
export type MethodsConfigType<
    TThis = any,
> = ExtractMethodsConfigType<typeof Methods, TThis>;

import {Props as LoadingProps} from "./Props";
import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Methods اختصاصی ComponentLoading
 *
 * Methods قرارداد API قابل فراخوانی توسط مصرف‌کننده است.
 * Component داخلی از this.executeMethod("CANCEL", event, params) استفاده می‌کند.
 */
export const Methods = {

    CANCEL: {
        name:        "fn_onCancelLoading",
        description: "Callback when loading cancel button is clicked",

        args: {
            SHOW_CANCEL:  LoadingProps.prop_showCancel,
            CANCEL_DELAY: LoadingProps.prop_cancelDelay,
        },

        dataArgs: {} as const,
    },

} as const;


/**
 * نوع methodهای ComponentLoading — برای استفاده در TMethods (داخلی Component)
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
 *   UiCategory.UI.Contents.Loading(
 *       { prop_showCancel: true },
 *       {
 *           CANCEL: function(event, dataArgs, componentArgs) {
 *               // componentArgs?.SHOW_CANCEL  ← boolean
 *               // componentArgs?.CANCEL_DELAY ← number
 *           },
 *       },
 *   );
 */
export type MethodsConfigType<
    TThis = any,
> = ExtractMethodsConfigType<typeof Methods, TThis>;

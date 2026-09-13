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
 * Methods اختصاصی ComponentErrorIsEmpty
 *
 * Methods قرارداد API قابل فراخوانی توسط مصرف‌کننده است.
 * Component داخلی از this.executeMethod("BTN_CLICK", event, params) استفاده می‌کند.
 *
 * Legacy: fn_onBtnClick
 */
export const Methods = {

    BTN_CLICK: {
        name:        "fn_onBtnClick",
        description: Keys.category.components.errorIsEmpty.methods.btnClick.description,

        args: {
            TITLE: Props.prop_btnTitle,
        },

        dataArgs: {} as const,
    },

} as const;


/**
 * نوع methodهای ComponentErrorIsEmpty — برای استفاده در TMethods (داخلی Component)
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
 *   UiCategory.UI.Contents.ErrorIsEmpty(
 *       { prop_title: "No data", prop_btnHas: true },
 *       {
 *           BTN_CLICK: function(event, dataArgs, componentArgs) {
 *               // componentArgs?.TITLE  ← string
 *           },
 *       },
 *   );
 */
export type MethodsConfigType<
    TThis = any,
> = ExtractMethodsConfigType<typeof Methods, TThis>;

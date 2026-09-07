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
 * Methods اختصاصی ComponentLabel (Plan 13.1.0)
 *
 * Methods قرارداد API قابل فراخوانی توسط مصرف‌کننده است.
 * Component داخلی از this.executeMethod("CLICK", event, params) استفاده می‌کند.
 *
 * Legacy: fn_onClickLabel — dataArgs: {IS_DISABLE: false}، componentArgs: {FOR}
 */
export const Methods = {

    CLICK: {
        name:        "fn_onClickLabel",
        description: Keys.category.components.label.methods.click.description,

        // componentArgs — مثل legacy (FOR از prop_labelFor)
        args: {
            FOR: Props.prop_labelFor,
        },

        // dataArgs — مثل legacy: GOG_SetValue<boolean>(false)
        dataArgs: {
            IS_DISABLE: false as boolean,
        },
    },

} as const;


/**
 * نوع methodهای ComponentLabel — برای استفاده در TMethods (داخلی Component)
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
 *   UiCategory.UI.Simples.Label(
 *       { prop_labelTitle: "Email" },
 *       {
 *           CLICK: function(event, dataArgs, componentArgs) {
 *               // dataArgs?.IS_DISABLE       ← boolean
 *               // componentArgs?.FOR         ← string | null
 *           },
 *       },
 *   );
 */
export type MethodsConfigType<
    TThis = any,
> = ExtractMethodsConfigType<typeof Methods, TThis>;
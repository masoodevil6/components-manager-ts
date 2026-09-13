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
 * Methods اختصاصی ComponentValidate (Plan 15.1.0)
 *
 * Methods قرارداد API قابل فراخوانی توسط مصرف‌کننده است.
 * Component داخلی از this.executeMethod("CHANGE", event, params) استفاده می‌کند.
 *
 * Legacy: fn_onChangeValidate — dataArgs: {IS_VALID, MESSAGES, VALUE}
 */
export const Methods = {

    CHANGE: {
        name:        "fn_onChangeValidate",
        description: Keys.category.components.validate.methods.change.description,

        args: {},

        dataArgs: {
            IS_VALID: {
                name:  "IS_VALID",
                value: false as boolean,
            },
            MESSAGES: {
                name:  "MESSAGES",
                value: [] as string[],
            },
            VALUE: {
                name:  "VALUE",
                value: "" as string,
            },
        } as const,
    },

} as const;


/**
 * نوع methodهای ComponentValidate — برای استفاده در TMethods (داخلی Component)
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
 *   UiCategory.UI.Inputs.Validate(
 *       { prop_listRules: [...] },
 *       {
 *           CHANGE: function(event, dataArgs, componentArgs) {
 *               // dataArgs?.IS_VALID  ← boolean
 *               // dataArgs?.MESSAGES  ← string[]
 *               // dataArgs?.VALUE     ← string
 *           },
 *       },
 *   );
 */
export type MethodsConfigType<
    TThis = any,
> = ExtractMethodsConfigType<typeof Methods, TThis>;

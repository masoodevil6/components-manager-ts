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
 * Methods اختصاصی ComponentCollapse (Plan 15.1.0)
 *
 * Methods قرارداد API قابل فراخوانی توسط مصرف‌کننده است.
 * Component داخلی از this.executeMethod("CLICK", event, params) استفاده می‌کند.
 *
 * Legacy: fn_onClickCollapse — componentArgs: {IS_OPEN}
 */
export const Methods = {

    CLICK: {
        name:        "fn_onClickCollapse",
        description: Keys.category.components.collapse.methods.click.description,

        // componentArgs — مثل legacy (IS_OPEN از prop_collapseBodyIsOpen)
        args: {
            IS_OPEN: Props.prop_collapseBodyIsOpen,
        },

        // dataArgs — مثل legacy: خالی
        dataArgs: {} as const,
    },

} as const;


/**
 * نوع methodهای ComponentCollapse — برای استفاده در TMethods (داخلی Component)
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
 *   UiCategory.UI.Contents.Collapse(
 *       { prop_collapseTitle: "Section 1" },
 *       {
 *           CLICK: function(event, dataArgs, componentArgs) {
 *               // componentArgs?.IS_OPEN  ← boolean
 *           },
 *       },
 *   );
 */
export type MethodsConfigType<
    TThis = any,
> = ExtractMethodsConfigType<typeof Methods, TThis>;

import {Keys}                from "../../../module_categories/languages";
import {Props}                   from "./Props";
// --------------------------------
import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Methods اختصاصی ComponentTabs (Plan 15.1.0)
 *
 * Legacy: CLICK_TAB, CLICK_BODY
 */
export const Methods = {

    CLICK_TAB: {
        name:         "fn_onClickTab",
        description:  Keys.category.components.tabs.methods.clickTab.description,
        args: {
            TAB_SELECTED: Props.prop_tabSelected,
        },
        dataArgs: {} as const,
    },

    CLICK_BODY: {
        name:         "fn_onClickBody",
        description:  Keys.category.components.tabs.methods.clickBody.description,
        args: {
            TAB_SELECTED: Props.prop_tabSelected,
        },
        dataArgs: {} as const,
    },

} as const;


/**
 * نوع methodهای ComponentTabs
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
 */
export type MethodsConfigType<
    TThis = any,
> = ExtractMethodsConfigType<typeof Methods, TThis>;

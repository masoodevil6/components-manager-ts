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
 * Methods اختصاصی ComponentTable
 *
 * Methods قرارداد API قابل فراخوانی توسط مصرف‌کننده است.
 * Component داخلی از this.executeMethod("SELECT_COL", event, params) استفاده می‌کند.
 */
export const Methods = {

    SELECT_COL: {
        name:        "fn_onSelectCol",
        description: Keys.category.components.table.methods.selectCol.description,

        args: {},

        dataArgs: {
            key:      "" as string,
            colIndex: 0  as number,
            rowIndex: 0  as number,
            value:    "" as string,
        } as const,
    },

    CLICK_OPTION_CARD: {
        name:        "fn_onClickOptionCard",
        description: Keys.category.components.table.methods.clickOptionCard.description,

        args: {},

        dataArgs: {
            optionName: "" as string,
            optionId:   "" as string,
        } as const,
    },

    CALLBACK_COL_SELECTOR: {
        name:        "fn_onCallbackColSelector",
        description: Keys.category.components.table.methods.callbackColSelector.description,

        args: {},

        dataArgs: {
            order:      [] as string[],
            isComplete: false as boolean,
        } as const,
    },

} as const;


/**
 * نوع methodهای ComponentTable — برای استفاده در TMethods (داخلی Component)
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
 *   UiCategory.UI.Contents.Table(
 *       { prop_header: [...], prop_data: [...] },
 *       {
 *           SELECT_COL: function(event, dataArgs, componentArgs) { ... },
 *           CLICK_OPTION_CARD: function(event, dataArgs, componentArgs) { ... },
 *       },
 *   );
 */
export type MethodsConfigType<
    TThis = any,
> = ExtractMethodsConfigType<typeof Methods, TThis>;

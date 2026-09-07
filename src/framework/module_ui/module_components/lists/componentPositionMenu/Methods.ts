import {Props as PositionMenuProps} from "./Props";
import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Methods اختصاصی ComponentPositionMenu
 *
 * Methods قرارداد API قابل فراخوانی توسط مصرف‌کننده است.
 * Component داخلی از this.executeMethod("CLICK_OPEN", event, params) استفاده می‌کند.
 */
export const Methods = {

    CLICK_OPEN: {
        name:        "fn_onClickOpen",
        description: "Callback when menu selector is clicked to open",
        args: {
            IS_OPEN: PositionMenuProps.prop_menuIsOpen,
        },
        dataArgs: {} as const,
    },

    CLICK_ACCEPT: {
        name:        "fn_onClickAccept",
        description: "Callback when accept button is clicked — return true to close menu",
        args: {
            BODY: PositionMenuProps.prop_menuBody,
        },
        dataArgs: {} as const,
    },

    CLICK_REJECT: {
        name:        "fn_onClickReject",
        description: "Callback when reject button is clicked",
        args: {
            BODY: PositionMenuProps.prop_menuBody,
        },
        dataArgs: {} as const,
    },

} as const;


/**
 * نوع methodهای ComponentPositionMenu — برای استفاده در TMethods (داخلی Component)
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
 *   UiCategory.UI.Positions.PositionMenu(
 *       { prop_menuSelector: "Click me", prop_menuBody: "Content" },
 *       {
 *           CLICK_OPEN: function(event, dataArgs, componentArgs) {
 *               // componentArgs?.IS_OPEN ← boolean
 *           },
 *           CLICK_ACCEPT: function(event, dataArgs, componentArgs) {
 *               // return true → close menu
 *           },
 *       },
 *   );
 */
export type MethodsConfigType<
    TThis = any,
> = ExtractMethodsConfigType<typeof Methods, TThis>;

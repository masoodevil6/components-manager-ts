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
 * Methods اختصاصی ComponentWindow
 *
 * Methods قرارداد API قابل فراخوانی توسط مصرف‌کننده است.
 * Component داخلی از this.executeMethod("CLOSE", event, params) استفاده می‌کند.
 */
export const Methods = {

    CLOSE: {
        name:        "fn_onClickClose",
        description: Keys.category.components.window.methods.close.description,

        args: {},

        dataArgs: {} as const,
    },

    OPEN: {
        name:        "fn_onClickOpen",
        description: Keys.category.components.window.methods.open.description,

        args: {},

        dataArgs: {} as const,
    },

    RESIZE: {
        name:        "fn_onClickResize",
        description: Keys.category.components.window.methods.resize.description,

        args: {},

        dataArgs: {} as const,
    },

    MINIMIZE: {
        name:        "fn_onClickMinimize",
        description: Keys.category.components.window.methods.minimize.description,

        args: {},

        dataArgs: {} as const,
    },

    CLICK_WINDOW: {
        name:        "fn_onClickWindow",
        description: Keys.category.components.window.methods.clickWindow.description,

        args: {},

        dataArgs: {} as const,
    },

    CLICK_OVERLAY: {
        name:        "fn_onClickOverlay",
        description: Keys.category.components.window.methods.clickOverlay.description,

        args: {},

        dataArgs: {} as const,
    },

    ACCEPT: {
        name:        "fn_onAccept",
        description: Keys.category.components.window.methods.accept.description,

        args: {},

        dataArgs: {} as const,
    },

    CANCEL: {
        name:        "fn_onCancel",
        description: Keys.category.components.window.methods.cancel.description,

        args: {},

        dataArgs: {} as const,
    },

} as const;


/**
 * نوع methodهای ComponentWindow — برای استفاده در TMethods (داخلی Component)
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
 *   UiCategory.UI.Simples.Window(
 *       { prop_title: "My Window", prop_windowWidth: 500 },
 *       {
 *           CLOSE: function(event, dataArgs, componentArgs) { ... },
 *           OPEN:  function(event, dataArgs, componentArgs) { ... },
 *       },
 *   );
 */
export type MethodsConfigType<
    TThis = any,
> = ExtractMethodsConfigType<typeof Methods, TThis>;

import {Props as BorderProps} from "./Props";
import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Methods اختصاصی ComponentBorder
 *
 * Methods قرارداد API قابل فراخوانی توسط مصرف‌کننده است.
 * Component داخلی از this.executeMethod("CLICK_BORDER", event, params) استفاده می‌کند.
 */
export const Methods = {

    CLICK_BORDER: {
        name:        "fn_onClickBorder",
        description: "Callback when border is clicked",

        args: {
            CONTENT:    BorderProps.prop_content,
            BORDER_TYPE: BorderProps.prop_borderType,
        },

        dataArgs: {} as const,
    },

    MOUSE_UP_BORDER: {
        name:        "fn_onMouseUpBorder",
        description: "Callback when mouse is released on border",

        args: {
            CONTENT:    BorderProps.prop_content,
        },

        dataArgs: {} as const,
    },

    MOUSE_DOWN_BORDER: {
        name:        "fn_onMouseDownBorder",
        description: "Callback when mouse is pressed on border",

        args: {
            CONTENT:    BorderProps.prop_content,
        },

        dataArgs: {} as const,
    },

    MOUSE_MOVE_BORDER: {
        name:        "fn_onMouseMoveBorder",
        description: "Callback when mouse moves over border",

        args: {
            CONTENT:    BorderProps.prop_content,
        },

        dataArgs: {} as const,
    },

} as const;


/**
 * نوع methodهای ComponentBorder — برای استفاده در TMethods (داخلی Component)
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
 *   UiCategory.UI.Contents.Border(
 *       { prop_content: "Hello" },
 *       {
 *           CLICK_BORDER: function(event, dataArgs, componentArgs) {
 *               // componentArgs?.CONTENT ← string
 *           },
 *       },
 *   );
 */
export type MethodsConfigType<
    TThis = any,
> = ExtractMethodsConfigType<typeof Methods, TThis>;

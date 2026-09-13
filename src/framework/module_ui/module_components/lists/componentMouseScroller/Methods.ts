import {Props} from "./Props";
import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * ComponentMouseScroller — Methods
 *
 * تعریف متدهای کامپوننت MouseScroller
 */
export const Methods = {

    ZOOM_IN: {
        name:        "fn_onZoomIn",
        description: "Callback when zoom in button is clicked",

        args: {
            ZOOM:        Props.prop_zoom,
            SCROLL_LEFT: Props.prop_scrollLeft,
            SCROLL_TOP:  Props.prop_scrollTop,
        },

        dataArgs: {} as const,
    },

    ZOOM_OUT: {
        name:        "fn_onZoomOut",
        description: "Callback when zoom out button is clicked",

        args: {
            ZOOM:        Props.prop_zoom,
            SCROLL_LEFT: Props.prop_scrollLeft,
            SCROLL_TOP:  Props.prop_scrollTop,
        },

        dataArgs: {} as const,
    },

    ZOOM_REFRESH: {
        name:        "fn_onZoomRefresh",
        description: "Callback when zoom refresh button is clicked",

        args: {
            ZOOM:        Props.prop_zoom,
            SCROLL_LEFT: Props.prop_scrollLeft,
            SCROLL_TOP:  Props.prop_scrollTop,
        },

        dataArgs: {} as const,
    },

    COLOR_MODE_LIGHT: {
        name:        "fn_onColorModeLight",
        description: "Callback when light mode button is clicked",

        args: {
            COLOR_MODE: Props.prop_colorMode,
        },

        dataArgs: {} as const,
    },

    COLOR_MODE_DARK: {
        name:        "fn_onColorModeDark",
        description: "Callback when dark mode button is clicked",

        args: {
            COLOR_MODE: Props.prop_colorMode,
        },

        dataArgs: {} as const,
    },

} as const;


export type MethodsType          = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs      = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

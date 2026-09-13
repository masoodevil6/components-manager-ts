import {Props} from "./Props";
import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Methods اختصاصی ComponentSidebar
 *
 * Methods قرارداد API قابل فراخوانی توسط مصرف‌کننده است.
 * Component داخلی از this.executeMethod("TOGGLE", event, params) استفاده می‌کند.
 */
export const Methods = {

    TOGGLE: {
        name:        "fn_onToggleSidebar",
        description: "Callback when sidebar toggle button is clicked",

        args: {
            IS_OPEN:    Props.prop_sidebarIsOpen,
            DIRECTION:  Props.prop_sidebarDirection,
        },

        dataArgs: {} as const,
    },

} as const;


/**
 * نوع methodهای ComponentSidebar — برای استفاده در TMethods (داخلی Component)
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

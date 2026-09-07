import {Props as ButtonProps} from "./Props";
import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Methods اختصاصی ComponentButton
 *
 * Methods قرارداد API قابل فراخوانی توسط مصرف‌کننده است.
 * Component داخلی از this.executeMethod("CLICK", event, params) استفاده می‌کند.
 */
export const Methods = {

    CLICK: {
        name:        "fn_onClickButton",
        description: "Callback when button is clicked",

        args: {
            TITLE:     ButtonProps.prop_btnTitle,
            VARIANT:   ButtonProps.prop_btnVariant,
            SEMANTIC:  ButtonProps.prop_btnSemantic,
        },

        dataArgs: {} as const,
    },

    HOVER: {
        name:        "fn_onHoverButton",
        description: "Callback when mouse enters button",

        args: {
            TITLE:     ButtonProps.prop_btnTitle,
            VARIANT:   ButtonProps.prop_btnVariant,
            SEMANTIC:  ButtonProps.prop_btnSemantic,
        },

        dataArgs: {} as const,
    },

    BLUR: {
        name:        "fn_onBlurButton",
        description: "Callback when mouse leaves button",

        args: {
            TITLE:     ButtonProps.prop_btnTitle,
            VARIANT:   ButtonProps.prop_btnVariant,
            SEMANTIC:  ButtonProps.prop_btnSemantic,
        },

        dataArgs: {} as const,
    },

} as const;


/**
 * نوع methodهای ComponentButton — برای استفاده در TMethods (داخلی Component)
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
 *   UiCategory.UI.Simples.Button(
 *       { prop_btnTitle: "Save" },
 *       {
 *           CLICK: function(event, dataArgs, componentArgs) {
 *               // componentArgs?.TITLE   ← string
 *               // componentArgs?.VARIANT ← "primary" | "secondary" | "ghost"
 *           },
 *       },
 *   );
 */
export type MethodsConfigType<
    TThis = any,
> = ExtractMethodsConfigType<typeof Methods, TThis>;

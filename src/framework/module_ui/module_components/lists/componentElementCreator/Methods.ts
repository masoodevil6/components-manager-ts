import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";

export const Methods = {
    CLICK_SETTINGS: {
        name: "fn_clickSettings",
        description: "Callback when the settings option is clicked",
        args: {},
        dataArgs: {} as const,
    },
    CLICK_DELETE: {
        name: "fn_clickDelete",
        description: "Callback after the delete action is confirmed",
        args: {},
        dataArgs: {} as const,
    },
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

import type {ExtractMethodsType, ExtractMethodsComponentArgs, ExtractMethodsDataArgs, ExtractMethodsConfigType} from "../../tools/type/TypeHelpers";

export const Methods = {
    CLICK: {
        name: "fn_onClick",
        description: "Callback when the positioned element is clicked",
        args: {} as const,
        dataArgs: {} as const,
    },
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

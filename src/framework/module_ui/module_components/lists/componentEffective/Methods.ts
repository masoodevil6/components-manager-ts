import type {ExtractMethodsConfigType, ExtractMethodsDataArgs, ExtractMethodsType} from "../../tools/type/TypeHelpers";

export const Methods = {} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

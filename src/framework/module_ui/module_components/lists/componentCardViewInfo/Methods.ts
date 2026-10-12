import type {ExtractMethodsType, ExtractMethodsConfigType} from "../../tools/type/TypeHelpers";

export const Methods = {} as const;
export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

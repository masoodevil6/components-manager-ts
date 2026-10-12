import {Keys} from "../../../module_categories/languages";
import type {ExtractMethodsType, ExtractMethodsConfigType, ExtractMethodsDataArgs} from "../../tools/type/TypeHelpers";

export const Methods = {
    CLICK: {
        name: "fn_onClickPageCardInfo",
        description: Keys.category.components.pageCardInfo.methods.click.description,
        args: {},
        dataArgs: {} as Record<string, never>,
    },
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

import {Keys} from "../../../module_categories/languages";
import type {MenuMoreItem} from "../componentMenuMore/Props";
import type {ExtractMethodsType, ExtractMethodsDataArgs, ExtractMethodsConfigType} from "../../tools/type/TypeHelpers";

export const Methods = {
    SELECT_OPTION: {
        name: "fn_onSelectOption",
        description: Keys.category.components.cardRowInfo.methods.selectOption.description,
        args: {},
        dataArgs: {} as {ITEM: MenuMoreItem},
    },
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

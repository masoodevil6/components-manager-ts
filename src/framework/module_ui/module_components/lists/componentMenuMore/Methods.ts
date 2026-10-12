import {Keys} from "../../../module_categories/languages";
import type {MenuMoreItem} from "./Props";
import type {ExtractMethodsType, ExtractMethodsDataArgs, ExtractMethodsConfigType} from "../../tools/type/TypeHelpers";

export const Methods = {
    SELECT_ITEM: {
        name: "fn_onSelectMenuMoreItem",
        description: Keys.category.components.menuMore.methods.selectItem.description,
        args: {},
        dataArgs: {} as {ITEM: MenuMoreItem},
    },
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

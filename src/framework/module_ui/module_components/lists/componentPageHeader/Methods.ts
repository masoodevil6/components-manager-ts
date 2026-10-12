import {Keys} from "../../../module_categories/languages";
import type {BreadcrumbShadowItem} from "../componentBreadcrumbShadow/Props";
import type {MenuMoreItem} from "../componentMenuMore/Props";
import type {ExtractMethodsType, ExtractMethodsDataArgs, ExtractMethodsConfigType} from "../../tools/type/TypeHelpers";

export const Methods = {
    BACK: {name: "fn_onBackClick", description: Keys.category.components.pageHeader.methods.back.description, args: {}, dataArgs: {} as Record<string, never>},
    SELECT_NAV_ITEM: {name: "fn_onclickItemNav", description: Keys.category.components.pageHeader.methods.selectNavItem.description, args: {}, dataArgs: {} as {NAME: string; ITEM: BreadcrumbShadowItem}},
    SELECT_OPTION: {name: "fn_onOptionClick", description: Keys.category.components.pageHeader.methods.selectOption.description, args: {}, dataArgs: {} as {NAME: string; ITEM: MenuMoreItem}},
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

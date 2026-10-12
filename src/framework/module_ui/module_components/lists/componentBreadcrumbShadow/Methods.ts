import {Keys} from "../../../module_categories/languages";
import type {BreadcrumbShadowItem} from "./Props";
import type {ExtractMethodsType, ExtractMethodsDataArgs, ExtractMethodsConfigType} from "../../tools/type/TypeHelpers";

export const Methods = {
    BACK: {
        name: "fn_onBack",
        description: "Callback when the breadcrumb back button is clicked",
        args: {},
        dataArgs: {} as Record<string, never>,
    },
    SELECT_ITEM: {
        name: "fn_onSelectItem",
        description: Keys.category.components.breadcrumbShadow.methods.selectItem.description,
        args: {},
        dataArgs: {} as {NAME: string; ITEM: BreadcrumbShadowItem},
    },
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

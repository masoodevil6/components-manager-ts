import {Keys} from "../../../module_categories/languages";
import type {BreadcrumbArrowItem} from "./Props";
import type {ExtractMethodsType, ExtractMethodsDataArgs, ExtractMethodsConfigType} from "../../tools/type/TypeHelpers";

export const Methods = {
    SELECT_BREADCRUMB: {
        name: "fn_onSelectBreadcrumbWithArrow",
        description: Keys.category.components.breadcrumbWithArrow.methods.selectBreadcrumb.description,
        args: {},
        dataArgs: {} as {ITEM: BreadcrumbArrowItem | null},
    },
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

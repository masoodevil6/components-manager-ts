import {Keys} from "../../../module_categories/languages";
import type {BreadcrumbItem} from "./Props";
import type {
    ExtractMethodsType,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";

export const Methods = {
    SELECT_BREADCRUMB: {
        name: "fn_onSelectBreadcrumb",
        description: Keys.category.components.breadcrumb.methods.selectBreadcrumb.description,
        args: {},
        dataArgs: {} as {ITEM: BreadcrumbItem | null},
    },
    BACK: {
        name: "fn_onBackClick",
        description: Keys.category.components.breadcrumb.methods.back.description,
        args: {},
        dataArgs: {} as {STEP_SELECTED: string | number | null},
    },
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

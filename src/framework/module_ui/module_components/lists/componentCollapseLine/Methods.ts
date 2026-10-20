import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";

export const Methods = {
    CLICK: {
        name: "fn_onClickCollapseLine",
        description: Keys.category.components.collapseLine.methods.click.description,
        args: {
            IS_OPEN: Props.prop_collapseLineBodyIsOpen,
        },
        dataArgs: {} as const,
    },
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

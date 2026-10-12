import {Keys} from "../../../module_categories/languages";
import {CodeMirrorLanguage, Props} from "./Props";
import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";

export const Methods = {
    CHANGE: {
        name: "fn_onChange",
        description: Keys.category.components.codeMirror.methods.change.description,
        args: {
            VALUE: Props.prop_value,
            LANGUAGE: Props.prop_language,
        },
        dataArgs: {
            VALUE: "" as string,
            LANGUAGE: CodeMirrorLanguage.HTML,
        },
    },
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

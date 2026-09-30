import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractMethodsType, ExtractMethodsComponentArgs, ExtractMethodsDataArgs, ExtractMethodsConfigType} from "../../tools/type/TypeHelpers";

export const Methods = {
    INPUT_CHANGE: {name: "fn_onInput", description: Keys.category.components.input.methods.inputChange.description, args: {VALUE: Props.prop_value}, dataArgs: {} as const},
    INPUT_FOCUS: {name: "fn_onFocus", description: Keys.category.components.input.methods.inputFocus.description, args: {VALUE: Props.prop_value}, dataArgs: {} as const},
    INPUT_BLUR: {name: "fn_onBlur", description: Keys.category.components.input.methods.inputBlur.description, args: {VALUE: Props.prop_value}, dataArgs: {} as const},
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

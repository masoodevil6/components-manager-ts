import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractMethodsType, ExtractMethodsComponentArgs, ExtractMethodsDataArgs, ExtractMethodsConfigType} from "../../tools/type/TypeHelpers";

const translation = Keys.category.components.inputDescription;

export const Methods = {
    INPUT_CHANGE: {name: "fn_onInputChange", description: translation.methods.inputChange.description, args: {VALUE: Props.prop_value}, dataArgs: {} as const},
    INPUT_FOCUS: {name: "fn_onInputFocus", description: translation.methods.inputFocus.description, args: {VALUE: Props.prop_value}, dataArgs: {} as const},
    INPUT_BLUR: {name: "fn_onInputBlur", description: translation.methods.inputBlur.description, args: {VALUE: Props.prop_value}, dataArgs: {} as const},
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

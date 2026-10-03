import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractMethodsType, ExtractMethodsComponentArgs, ExtractMethodsDataArgs, ExtractMethodsConfigType} from "../../tools/type/TypeHelpers";

export const Methods = {
    INPUT_CHANGE: {name: "fn_onInputChange", description: Keys.category.components.inputSize.methods.inputChange.description, args: {VALUE: Props.prop_value, MIN: Props.prop_min, MAX: Props.prop_max}, dataArgs: {} as const},
    INPUT_FOCUS: {name: "fn_onInputFocus", description: Keys.category.components.inputSize.methods.inputFocus.description, args: {VALUE: Props.prop_value, MIN: Props.prop_min, MAX: Props.prop_max}, dataArgs: {} as const},
    INPUT_BLUR: {name: "fn_onInputBlur", description: Keys.category.components.inputSize.methods.inputBlur.description, args: {VALUE: Props.prop_value, MIN: Props.prop_min, MAX: Props.prop_max}, dataArgs: {} as const},
} as const;
export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractMethodsType, ExtractMethodsComponentArgs, ExtractMethodsDataArgs, ExtractMethodsConfigType} from "../../tools/type/TypeHelpers";

const inputTexts = Keys.category.components.input.methods;
export const Methods = {
    SELECT_COUNTRY_CHANGE: {name: "fn_onSelectCountryChange", description: Keys.category.components.inputPhone.methods.selectCountryChange.description, args: {COUNTRY: Props.prop_countryValue, CITY: Props.prop_cityValue, VALUE: Props.prop_value}, dataArgs: {} as const},
    SELECT_CITY_CHANGE: {name: "fn_onSelectCityChange", description: Keys.category.components.inputPhone.methods.selectCityChange.description, args: {COUNTRY: Props.prop_countryValue, CITY: Props.prop_cityValue, VALUE: Props.prop_value}, dataArgs: {} as const},
    INPUT_CHANGE: {name: "fn_onInputChange", description: inputTexts.inputChange.description, args: {COUNTRY: Props.prop_countryValue, CITY: Props.prop_cityValue, VALUE: Props.prop_value}, dataArgs: {} as const},
    INPUT_FOCUS: {name: "fn_onInputFocus", description: inputTexts.inputFocus.description, args: {COUNTRY: Props.prop_countryValue, CITY: Props.prop_cityValue, VALUE: Props.prop_value}, dataArgs: {} as const},
    INPUT_BLUR: {name: "fn_onInputBlur", description: inputTexts.inputBlur.description, args: {COUNTRY: Props.prop_countryValue, CITY: Props.prop_cityValue, VALUE: Props.prop_value}, dataArgs: {} as const},
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

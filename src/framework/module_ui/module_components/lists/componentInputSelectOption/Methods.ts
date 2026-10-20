import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractMethodsType, ExtractMethodsComponentArgs, ExtractMethodsDataArgs, ExtractMethodsConfigType} from "../../tools/type/TypeHelpers";

export const Methods = {
    SELECT_CHANGE: {name: "fn_onSelectChange", description: Keys.category.components.inputSelectOption.methods.selectChange.description, args: {VALUE: Props.prop_itemSelected}, dataArgs: {} as const},
    CLICK_BUTTON: {name: "fn_onClickButton", description: Keys.category.components.input.methods.clickButton.description, args: {VALUE: Props.prop_itemSelected}, dataArgs: {} as const},
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

import {Props} from "./Props";
import {Keys} from "../../../module_categories/languages";
import type {ExtractMethodsType, ExtractMethodsComponentArgs, ExtractMethodsDataArgs, ExtractMethodsConfigType} from "../../tools/type/TypeHelpers";

export const Methods = {
    SELECT_CHANGE: {name: "fn_onSelectChange", description: Keys.category.components.selectCustomSimple.methods.selectChange.description, args: {VALUE: Props.prop_selectValue}, dataArgs: {} as const},
    SELECT_SEARCH: {name: "fn_onSelectSearch", description: Keys.category.components.selectCustomSimple.methods.selectSearch.description, args: {VALUE: {name: "value", default: ""}}, dataArgs: {} as const},
    SELECT_OPEN: {name: "fn_onSelectOpen", description: Keys.category.components.selectCustomSimple.methods.selectOpen.description, args: {VALUE: Props.prop_selectValue}, dataArgs: {} as const},
    SELECT_CLOSE: {name: "fn_onSelectClose", description: Keys.category.components.selectCustomSimple.methods.selectClose.description, args: {VALUE: Props.prop_selectValue}, dataArgs: {} as const},
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

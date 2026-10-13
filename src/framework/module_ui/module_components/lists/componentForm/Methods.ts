import {Props} from "./Props";
import {Keys} from "../../../module_categories/languages";
import type {ExtractMethodsType, ExtractMethodsComponentArgs, ExtractMethodsDataArgs, ExtractMethodsConfigType} from "../../tools/type/TypeHelpers";

export const Methods = {
    SUBMIT: {name: "fn_onClickSubmit", description: Keys.category.components.fetch.form.methods.submit.description, args: {URL: Props.prop_url}, dataArgs: {} as {FORM: HTMLFormElement | null; EXTRA_DATA: unknown}},
    GET_RESPONSE: {name: "fn_onGetResponse", description: Keys.category.components.fetch.form.methods.getResponse.description, args: {}, dataArgs: {} as {PROMISE: Promise<unknown>}},
    RESPONSE: {name: "fn_onClickResponse", description: Keys.category.components.fetch.form.methods.response.description, args: {}, dataArgs: {} as {RESULT_EXP: unknown; RESPONSE: unknown}},
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

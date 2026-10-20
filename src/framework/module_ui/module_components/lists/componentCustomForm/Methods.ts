import {Keys} from "../../../module_categories/languages";
import type {CustomFormGroup} from "./Props";
import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";

const translation = Keys.category.components.fetch.form.customForm.methods;

export const Methods = {
    TEMPLATE_CHANGE: {
        name: "fn_onTemplateChange",
        description: translation.templateChange.description,
        args: {},
        dataArgs: {} as {GROUPS: CustomFormGroup[]},
    },
    VALUE_CHANGE: {
        name: "fn_onValueChange",
        description: translation.valueChange.description,
        args: {},
        dataArgs: {} as {FIELD_ID: string; NAME: string; VALUE: unknown},
    },
    SUBMIT: {
        name: "fn_onSubmit",
        description: translation.submit.description,
        args: {},
        dataArgs: {} as {URL: string; FORM: HTMLFormElement | null; EXTRA_DATA: unknown},
    },
    GET_RESPONSE: {
        name: "fn_onGetResponse",
        description: translation.getResponse.description,
        args: {},
        dataArgs: {} as {PROMISE: Promise<unknown>},
    },
    RESPONSE: {
        name: "fn_onResponse",
        description: translation.response.description,
        args: {},
        dataArgs: {} as {RESULT_EXP: unknown; RESPONSE: unknown},
    },
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

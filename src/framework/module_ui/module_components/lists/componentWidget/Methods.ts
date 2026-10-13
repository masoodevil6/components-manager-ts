import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {WidgetFetchConfig} from "./Props";
import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";

const methodKeys = Keys.category.components.fetch.widget.methods;

export const Methods = {
    BEFORE_FETCH: {
        name: "fn_onBeforeFetch",
        description: methodKeys.beforeFetch.description,
        args: {FETCH: Props.prop_fetch},
        dataArgs: {} as {REQUEST_DATA: unknown},
    },
    GET_RESPONSE: {
        name: "fn_onGetResponse",
        description: methodKeys.getResponse.description,
        args: {},
        dataArgs: {} as {PROMISE: Promise<unknown>},
    },
    RESPONSE: {
        name: "fn_onResponse",
        description: methodKeys.response.description,
        args: {},
        dataArgs: {} as {RESULT_EXP: unknown; RESPONSE: unknown; REQUEST_DATA: unknown},
    },
    RETRY_CLICK: {
        name: "fn_onRetryClick",
        description: methodKeys.retryClick.description,
        args: {},
        dataArgs: {} as {FETCH: WidgetFetchConfig},
    },
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

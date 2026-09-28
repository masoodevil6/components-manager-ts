import {Keys} from "../../../module_categories/languages";
import type {ExtractMethodsType, ExtractMethodsComponentArgs, ExtractMethodsDataArgs, ExtractMethodsConfigType} from "../../tools/type/TypeHelpers";

export const Methods = {
    CLICK_RETRY: { name: "fn_onClickRetry", description: Keys.category.components.timerDown.methods.clickRetry.description, args: {}, dataArgs: {} as const },
    FINISH_TIMER: { name: "fn_onFinishTimer", description: Keys.category.components.timerDown.methods.finishTimer.description, args: {}, dataArgs: {} as const },
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

import {Keys} from "../../../module_categories/languages";
import type {ExtractMethodsType, ExtractMethodsComponentArgs, ExtractMethodsDataArgs, ExtractMethodsConfigType} from "../../tools/type/TypeHelpers";

export const Methods = {
    GET_NEW_TOKEN: { name: "fn_onGetNewToken", description: Keys.category.components.inputOtp.methods.getNewToken.description, args: {}, dataArgs: {} as const },
    FINISH_TOKEN: { name: "fn_onFinishToken", description: Keys.category.components.inputOtp.methods.finishToken.description, args: {}, dataArgs: {} as const },
    CHANGE: { name: "fn_onChange", description: Keys.category.components.inputOtp.methods.change.description, args: {}, dataArgs: {} as const },
    COMPLETE: { name: "fn_onCompleteInputOtp", description: Keys.category.components.inputOtp.methods.completeInputOtp.description, args: {}, dataArgs: {} as const },
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

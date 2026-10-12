import type {ExtractMethodsType, ExtractMethodsConfigType} from "../../tools/type/TypeHelpers";
import {Props} from "./Props";

export const Methods = {
    CLICK: {
        name: "fn_onClickCardViewClicable",
        description: "Callback when the card is clicked",
        args: {TITLE: Props.prop_title},
        dataArgs: {} as const,
    },
} as const;
export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

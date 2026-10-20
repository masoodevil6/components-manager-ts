import {EffectChangeDirection} from "./Props";
import type {ExtractMethodsConfigType, ExtractMethodsDataArgs, ExtractMethodsType} from "../../tools/type/TypeHelpers";

type TransitionData = {
    PREVIOUS_CONTENT: unknown;
    CONTENT: unknown;
    DIRECTION: EffectChangeDirection;
};

export const Methods = {
    TRANSITION_START: {
        name: "fn_onTransitionStart",
        description: "Called when an animated content transition starts.",
        dataArgs: {} as TransitionData,
    },
    TRANSITION_END: {
        name: "fn_onTransitionEnd",
        description: "Called when the latest content transition ends.",
        dataArgs: {} as TransitionData,
    },
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

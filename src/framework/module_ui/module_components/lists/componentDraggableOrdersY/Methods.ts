import {Props as DraggableProps} from "./Props";
import {Keys} from "../../../module_categories/languages";
import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";

export const Methods = {
    UPDATE: {
        name:        "fn_onUpdateOrder",
        description: Keys.category.components.draggableOrdersY.methods.update.description,
        args: {
            ORDER: DraggableProps.prop_draggableOrders,
            LIST:  DraggableProps.prop_draggableItems,
        },
        dataArgs: {} as const,
    },
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

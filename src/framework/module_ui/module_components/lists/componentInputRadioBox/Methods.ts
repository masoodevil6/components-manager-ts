import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import type {ExtractMethodsType, ExtractMethodsComponentArgs, ExtractMethodsDataArgs, ExtractMethodsConfigType} from "../../tools/type/TypeHelpers";

const ItemIndex = Define_ComponentProp<number>({prop: "ITEM_INDEX", default: 0, name: Keys.category.components.inputRadioBox.methods.itemIndex.name, description: Keys.category.components.inputRadioBox.methods.itemIndex.description});

export const Methods = {
    SELECT_ITEM: {
        name: "fn_onSelectItem",
        description: Keys.category.components.inputRadioBox.methods.selectItem.description,
        args: {IS_DISABLE: Props.prop_isDisable, VALUE: Props.prop_itemSelected},
        dataArgs: {ITEM_ID: Props.prop_itemSelected, ITEM_INDEX: ItemIndex},
    },
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

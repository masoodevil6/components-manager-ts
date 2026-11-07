import {Keys as KeysInput} from "../../../module_categories/languages/keys/components/input";
import {Keys as KeysInputPrice} from "../../../module_categories/languages/keys/components/inputPrice";
import type {PriceValue} from "./Props";
import {DefineProp as Define_ComponentProp} from "@/core_components";

const priceValueArg = Define_ComponentProp<PriceValue>({
    prop: "VALUE",
    default: {value: null, calcs: {}},
    name: KeysInput.category.components.input.props.value.name,
    description: KeysInputPrice.category.components.inputPrice.description,
});

export const Methods = {
    INPUT: {name: "fn_onInput", description: KeysInputPrice.category.components.inputPrice.methods.input.description, args: {VALUE: priceValueArg}, dataArgs: {} as const},
    FOCUS: {name: "fn_onFocus", description: KeysInputPrice.category.components.inputPrice.methods.focus.description, args: {VALUE: priceValueArg}, dataArgs: {} as const},
    BLUR: {name: "fn_onBlur", description: KeysInputPrice.category.components.inputPrice.methods.blur.description, args: {VALUE: priceValueArg}, dataArgs: {} as const},
    CLICK_BUTTON: {name: "fn_onClickButton", description: KeysInputPrice.category.components.inputPrice.methods.clickButton.description, args: {VALUE: priceValueArg}, dataArgs: {} as const},
} as const;

export type MethodsType = any;
export type MethodsConfigType<TThis = any> = Partial<Record<"fn_onInput" | "fn_onFocus" | "fn_onBlur" | "fn_onClickButton", (event: Event, dataArgs: {VALUE: PriceValue}, componentArgs: TThis) => void>>;

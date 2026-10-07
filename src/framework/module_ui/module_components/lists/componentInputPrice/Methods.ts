import {Keys} from "../../../module_categories/languages";
import type {PriceValue} from "./Props";
import {DefineProp as Define_ComponentProp} from "@/core_components";

const priceValueArg = Define_ComponentProp<PriceValue>({
    prop: "VALUE",
    default: {value: null, calcs: {}},
    name: Keys.category.components.input.props.value.name,
    description: Keys.category.components.inputPrice.description,
});

export const Methods = {
    INPUT: {name: "fn_onInput", description: Keys.category.components.inputPrice.methods.input.description, args: {VALUE: priceValueArg}, dataArgs: {} as const},
    FOCUS: {name: "fn_onFocus", description: Keys.category.components.inputPrice.methods.focus.description, args: {VALUE: priceValueArg}, dataArgs: {} as const},
    BLUR: {name: "fn_onBlur", description: Keys.category.components.inputPrice.methods.blur.description, args: {VALUE: priceValueArg}, dataArgs: {} as const},
    CLICK_BUTTON: {name: "fn_onClickButton", description: Keys.category.components.inputPrice.methods.clickButton.description, args: {VALUE: priceValueArg}, dataArgs: {} as const},
} as const;

export type MethodsType = any;
export type MethodsConfigType<TThis = any> = Partial<Record<"fn_onInput" | "fn_onFocus" | "fn_onBlur" | "fn_onClickButton", (event: Event, dataArgs: {VALUE: PriceValue}, componentArgs: TThis) => void>>;

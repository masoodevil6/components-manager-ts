import * as CoreComponents from "@/core_components";
import {DefaultExample} from "./Default";
import {CalculatorExample} from "./Calculator";
import {AddButtonExample} from "./AddButton";

export const Examples = {
    Default: DefaultExample,
    Calculator: CalculatorExample,
    AddButton: AddButtonExample,
} satisfies Record<string, CoreComponents.ComponentExample>;

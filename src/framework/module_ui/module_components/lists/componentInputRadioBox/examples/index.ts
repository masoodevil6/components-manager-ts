import {ComponentExample} from "@/core_components";
import {DefaultExample} from "./Default";
import {HorizontalExample} from "./Horizontal";
import {ValidationExample} from "./Validation";

export const Examples = {DEFAULT: DefaultExample, HORIZONTAL: HorizontalExample, VALIDATION: ValidationExample} satisfies Record<string, ComponentExample>;
export type ComponentInputRadioBoxExamplesType = typeof Examples;

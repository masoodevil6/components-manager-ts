import {ComponentExample} from "@/core_components";
import {DefaultExample} from "./Default";
import {DisabledExample} from "./Disabled";
import {CustomRowsExample} from "./CustomRows";

export const Examples = {
    DEFAULT: DefaultExample,
    DISABLED: DisabledExample,
    CUSTOM_ROWS: CustomRowsExample,
} satisfies Record<string, ComponentExample>;

export type ComponentInputDescriptionSimpleExamplesType = typeof Examples;

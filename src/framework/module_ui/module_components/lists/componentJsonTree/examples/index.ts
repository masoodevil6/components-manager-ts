import {ComponentExample} from "@/core_components";
import {DefaultExample} from "./Default";
import {NestedExample} from "./Nested";
import {SearchAndControlsExample} from "./SearchAndControls";

export const Examples = {
    DEFAULT: DefaultExample,
    NESTED: NestedExample,
    SEARCH_AND_CONTROLS: SearchAndControlsExample,
} satisfies Record<string, ComponentExample>;

export type ComponentJsonTreeExamplesType = typeof Examples;

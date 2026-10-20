import * as CoreComponents from "@/core_components";
import {DefaultExample} from "./Default";
import {NestedExample} from "./Nested";
import {InvalidJsonExample} from "./InvalidJson";

export const Examples = {
    Default: DefaultExample,
    Nested: NestedExample,
    InvalidJson: InvalidJsonExample,
} satisfies Record<string, CoreComponents.ComponentExample>;

export type ComponentInputJsonExamplesType = typeof Examples;

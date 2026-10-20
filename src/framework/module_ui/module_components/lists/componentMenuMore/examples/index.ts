import type {ComponentExample} from "@/core_components";
import {DefaultExample} from "./Default";
import {VerticalExample} from "./Vertical";
import {OppositeDirectionExample} from "./OppositeDirection";

export const Examples = {
    DEFAULT: DefaultExample,
    VERTICAL: VerticalExample,
    OPPOSITE_DIRECTION: OppositeDirectionExample,
} satisfies Record<string, ComponentExample>;

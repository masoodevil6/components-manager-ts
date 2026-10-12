import type {ComponentExample} from "@/core_components";
import {DefaultExample} from "./Default";
import {VerticalExample} from "./Vertical";

export const Examples = {DEFAULT: DefaultExample, VERTICAL: VerticalExample} satisfies Record<string, ComponentExample>;

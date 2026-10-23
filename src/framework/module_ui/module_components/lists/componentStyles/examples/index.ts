import type {ComponentExample} from "@/core_components";
import {Default} from "./Default";

export const Examples = {
    DEFAULT: Default,
} satisfies Record<string, ComponentExample>;

export type ComponentStylesExamplesType = typeof Examples;

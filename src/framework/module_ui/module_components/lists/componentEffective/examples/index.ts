import type {ComponentExample} from "@/core_components";
import {DefaultExample} from "./Default";
import {SeparateShowHideModesExample} from "./SeparateShowHideModes";

export const Examples = {
    DEFAULT: DefaultExample,
    SEPARATE_SHOW_HIDE_MODES: SeparateShowHideModesExample,
} satisfies Record<string, ComponentExample>;

export type ComponentEffectiveExamplesType = typeof Examples;

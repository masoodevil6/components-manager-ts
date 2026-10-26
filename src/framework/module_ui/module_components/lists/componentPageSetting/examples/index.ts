import type {ComponentExample} from "@/core_components";
import {DefaultExample} from "./Default";

export const Examples = {
    DEFAULT: DefaultExample,
} satisfies Record<string, ComponentExample>;

export type ComponentPageSettingExamplesType = typeof Examples;

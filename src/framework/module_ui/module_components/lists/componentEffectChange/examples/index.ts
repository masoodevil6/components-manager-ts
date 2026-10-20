import type {ComponentExample} from "@/core_components";
import {DefaultExample} from "./Default";
import {PageChangeExample} from "./PageChange";
import {SliderExample} from "./Slider";
import {LoadingExample} from "./Loading";

export const Examples = {
    DEFAULT: DefaultExample,
    PAGE_CHANGE: PageChangeExample,
    SLIDER: SliderExample,
    LOADING: LoadingExample,
} satisfies Record<string, ComponentExample>;

export type ComponentEffectChangeExamplesType = typeof Examples;

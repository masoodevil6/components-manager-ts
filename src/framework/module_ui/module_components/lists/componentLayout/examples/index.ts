import {ComponentExample} from "@/core_components";
import {Default} from "./Default";
import {SlottedContent} from "./SlottedContent";
import {ReactiveContent} from "./ReactiveContent";

export const Examples = {
    DEFAULT: Default,
    SLOTTED_CONTENT: SlottedContent,
    REACTIVE_CONTENT: ReactiveContent,
} satisfies Record<string, ComponentExample>;

export type ComponentLayoutExamplesType = typeof Examples;

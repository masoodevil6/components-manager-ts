import type {ComponentExample} from "@/core_components";
import {DefaultExample} from "./Default";
import {WithoutButtonExample} from "./WithoutButton";

export const Examples = {
    DEFAULT: DefaultExample,
    WITHOUT_BUTTON: WithoutButtonExample,
} satisfies Record<string, ComponentExample>;

export type ComponentPageCardInfoExamplesType = typeof Examples;

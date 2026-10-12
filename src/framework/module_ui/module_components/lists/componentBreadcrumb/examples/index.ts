import type {ComponentExample} from "@/core_components";
import {DefaultExample} from "./Default";
import {WithBackButtonExample} from "./WithBackButton";

export const Examples = {
    DEFAULT: DefaultExample,
    WITH_BACK_BUTTON: WithBackButtonExample,
} satisfies Record<string, ComponentExample>;

export type ComponentBreadcrumbExamplesType = typeof Examples;

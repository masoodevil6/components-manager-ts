import type {ComponentExample} from "@/core_components";
import {DefaultExample} from "./Default";
import {ResponsiveExample} from "./Responsive";

export const Examples = {
    DEFAULT: DefaultExample,
    RESPONSIVE: ResponsiveExample,
} satisfies Record<string, ComponentExample>;

export type ComponentBreadcrumbWithArrowExamplesType = typeof Examples;

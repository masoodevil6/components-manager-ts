import type {ComponentExample} from "@/core_components";
import {DefaultExample} from "./Default";
import {NavigationExample} from "./Navigation";
import {WithoutBackButtonExample} from "./WithoutBackButton";

export const Examples = {DEFAULT: DefaultExample, NAVIGATION: NavigationExample, WITHOUT_BACK_BUTTON: WithoutBackButtonExample} satisfies Record<string, ComponentExample>;
export type ComponentBreadcrumbShadowExamplesType = typeof Examples;

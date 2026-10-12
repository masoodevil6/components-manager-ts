import type {ComponentExample} from "@/core_components";
import {DefaultExample} from "./Default";
import {NavigationExample} from "./Navigation";
import {OptionsExample} from "./Options";
import {WithoutBackExample} from "./WithoutBack";

export const Examples = {DEFAULT: DefaultExample, NAVIGATION: NavigationExample, OPTIONS: OptionsExample, WITHOUT_BACK: WithoutBackExample} satisfies Record<string, ComponentExample>;

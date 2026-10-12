import type {ComponentExample} from "@/core_components";
import {DefaultExample} from "./Default";
import {WithNavigationAndAsideExample} from "./WithNavigationAndAside";
import {ContentOnlyExample} from "./ContentOnly";

export const Examples = {
    DEFAULT: DefaultExample,
    WITH_NAVIGATION_AND_ASIDE: WithNavigationAndAsideExample,
    CONTENT_ONLY: ContentOnlyExample,
} satisfies Record<string, ComponentExample>;

export type ComponentPageExamplesType = typeof Examples;

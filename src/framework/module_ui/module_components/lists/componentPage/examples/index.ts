import type {ComponentExample} from "@/core_components";
import {DefaultExample} from "./Default";
import {WithNavigationAndAsideExample} from "./WithNavigationAndAside";
import {ContentOnlyExample} from "./ContentOnly";
import {CoreEventSettingExample} from "./CoreEventSetting";
import {WorkflowCompositionExample} from "./WorkflowComposition";

export const Examples = {
    DEFAULT: DefaultExample,
    WITH_NAVIGATION_AND_ASIDE: WithNavigationAndAsideExample,
    CONTENT_ONLY: ContentOnlyExample,
    CORE_EVENT_SETTING: CoreEventSettingExample,
    WORKFLOW_COMPOSITION: WorkflowCompositionExample,
} satisfies Record<string, ComponentExample>;

export type ComponentPageExamplesType = typeof Examples;

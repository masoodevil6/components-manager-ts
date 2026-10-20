import type {ComponentExample} from "@/core_components";
import {Render} from "./Render";
import {Edit} from "./Edit";
import {Setting} from "./Setting";

export const Examples = {
    RENDER: Render,
    EDIT: Edit,
    SETTING: Setting,
} satisfies Record<string, ComponentExample>;

export type ComponentElementCreatorExamplesType = typeof Examples;

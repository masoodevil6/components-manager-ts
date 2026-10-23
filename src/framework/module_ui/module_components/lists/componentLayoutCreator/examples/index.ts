import {ComponentExample} from "@/core_components";
import {Render} from "./Render";
import {Edit} from "./Edit";

export const Examples = {
    RENDER: Render,
    EDIT: Edit,
} satisfies Record<string, ComponentExample>;

export type ComponentLayoutCreatorExamplesType = typeof Examples;

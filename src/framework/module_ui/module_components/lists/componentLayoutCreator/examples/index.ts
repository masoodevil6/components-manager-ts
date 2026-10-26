import {ComponentExample} from "@/core_components";
import {Render} from "./Render";
import {Edit} from "./Edit";
import {AllowedComponents} from "./AllowedComponents";

export const Examples = {
    RENDER: Render,
    EDIT: Edit,
    ALLOWED_COMPONENTS: AllowedComponents,
} satisfies Record<string, ComponentExample>;

export type ComponentLayoutCreatorExamplesType = typeof Examples;

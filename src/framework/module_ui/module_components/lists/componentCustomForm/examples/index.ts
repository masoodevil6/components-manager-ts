import {ComponentExample} from "@/core_components";
import {EditMode} from "./EditMode";
import {RunMode} from "./RunMode";

export const Examples = {
    EDIT_MODE: EditMode,
    RUN_MODE: RunMode,
} satisfies Record<string, ComponentExample>;

export type ComponentCustomFormExamplesType = typeof Examples;

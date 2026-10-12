import {ComponentExample} from "@/core_components";
import {DefaultExample} from "./Default";
import {JavaScriptExample} from "./JavaScript";
import {ReadOnlyExample} from "./ReadOnly";

export const Examples = {
    DEFAULT: DefaultExample,
    JAVASCRIPT: JavaScriptExample,
    READ_ONLY: ReadOnlyExample,
} satisfies Record<string, ComponentExample>;

export type ComponentCodeMirrorExamplesType = typeof Examples;

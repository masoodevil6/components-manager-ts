import {ComponentExample} from "@/core_components";
import {DefaultExample} from "./Default";
import {LevelsExample} from "./Levels";
import {ObjectsExample} from "./Objects";

export const Examples = {
    DEFAULT: DefaultExample,
    LEVELS: LevelsExample,
    OBJECTS: ObjectsExample,
} satisfies Record<string, ComponentExample>;

export type ComponentConsoleExamplesType = typeof Examples;

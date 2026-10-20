import {ComponentExample} from "@/core_components";
import {Default} from "./Default";
import {Labeled} from "./Labeled";
import {BodyAlwaysVisible} from "./BodyAlwaysVisible";
import {Collapsible} from "./Collapsible";
import {DirectionAligned} from "./DirectionAligned";

export const Examples = {
    DEFAULT: Default,
    LABELED: Labeled,
    BODY_ALWAYS_VISIBLE: BodyAlwaysVisible,
    COLLAPSIBLE: Collapsible,
    DIRECTION_ALIGNED: DirectionAligned,
} satisfies Record<string, ComponentExample>;

export type ComponentCollapseLineExamplesType = typeof Examples;

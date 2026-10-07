import {ComponentExample} from "@/core_components";
import {DefaultExample} from "./Default";
import {LogicalPositionExample} from "./LogicalPosition";
import {FixedOverlayExample} from "./FixedOverlay";

export const Examples = {
    DEFAULT: DefaultExample,
    LOGICAL_POSITION: LogicalPositionExample,
    FIXED_OVERLAY: FixedOverlayExample,
} satisfies Record<string, ComponentExample>;

export type ComponentElementPositionExamplesType = typeof Examples;

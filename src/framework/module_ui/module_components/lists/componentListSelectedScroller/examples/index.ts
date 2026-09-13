import {ComponentExample} from "@/core_components";
// --------------------------------
import {DefaultExample} from "./Default";


/**
 * Examples Registry برای ComponentListSelectedScroller
 */
export const Examples = {

    DEFAULT: DefaultExample,

} satisfies Record<string, ComponentExample>;


export type ComponentListSelectedScrollerExamplesType = typeof Examples;

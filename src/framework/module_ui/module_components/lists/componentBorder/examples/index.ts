import {ComponentExample} from "@/core_components";
// --------------------------------
import {DefaultExample} from "./Default";
import {ArrowExample}   from "./Arrow";


/**
 * Examples Registry برای ComponentBorder
 *
 * @example
 *   Examples.DEFAULT.render()   // → HTMLElement
 *   Examples.ARROW.render()     // → HTMLElement
 */
export const Examples = {

    DEFAULT: DefaultExample,
    ARROW:   ArrowExample,

} satisfies Record<string, ComponentExample>;


/**
 * Type تمام Exampleهای ComponentBorder
 */
export type ComponentBorderExamplesType = typeof Examples;

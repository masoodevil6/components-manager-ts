import {ComponentExample} from "@/core_components";
// --------------------------------
import {DefaultExample}    from "./Default";


/**
 * Examples Registry برای ComponentWindow
 *
 * @example
 *   Examples.DEFAULT.render()    // → HTMLElement
 */
export const Examples = {

    DEFAULT:   DefaultExample,

} satisfies Record<string, ComponentExample>;


/**
 * Type تمام Exampleهای ComponentWindow
 */
export type ComponentWindowExamplesType = typeof Examples;

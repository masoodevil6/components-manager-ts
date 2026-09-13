import {ComponentExample} from "@/core_components";
// --------------------------------
import {DefaultExample}    from "./Default";


/**
 * Examples Registry برای ComponentErrorIsEmpty
 *
 * @example
 *   Examples.DEFAULT.render()    // → HTMLElement
 */
export const Examples = {

    DEFAULT:   DefaultExample,

} satisfies Record<string, ComponentExample>;


/**
 * Type تمام Exampleهای ComponentErrorIsEmpty
 */
export type ComponentErrorIsEmptyExamplesType = typeof Examples;

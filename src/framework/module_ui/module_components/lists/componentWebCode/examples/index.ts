import {ComponentExample} from "@/core_components";
// --------------------------------
import {DefaultExample}    from "./Default";


/**
 * Examples Registry برای ComponentWebCode
 *
 * @example
 *   Examples.DEFAULT.render()    // → HTMLElement
 */
export const Examples = {

    DEFAULT:   DefaultExample,

} satisfies Record<string, ComponentExample>;


/**
 * Type تمام Exampleهای ComponentWebCode
 */
export type ComponentWebCodeExamplesType = typeof Examples;

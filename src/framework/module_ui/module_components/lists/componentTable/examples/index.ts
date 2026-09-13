import {ComponentExample} from "@/core_components";
// --------------------------------
import {DefaultExample}   from "./Default";


/**
 * Examples Registry برای ComponentTable
 *
 * @example
 *   Examples.DEFAULT.render()                    // → HTMLElement
 */
export const Examples = {

    DEFAULT:   DefaultExample,

} satisfies Record<string, ComponentExample>;


export type ComponentTableExamplesType = typeof Examples;

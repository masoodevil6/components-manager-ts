import {ComponentExample} from "@/core_components";
// --------------------------------
import {DefaultExample}    from "./Default";


/**
 * Examples Registry برای ComponentWindowConfirm
 *
 * @example
 *   Examples.DEFAULT.render()    // → HTMLElement
 */
export const Examples = {

    DEFAULT:   DefaultExample,

} satisfies Record<string, ComponentExample>;


/**
 * Type تمام Exampleهای ComponentWindowConfirm
 */
export type ComponentWindowConfirmExamplesType = typeof Examples;

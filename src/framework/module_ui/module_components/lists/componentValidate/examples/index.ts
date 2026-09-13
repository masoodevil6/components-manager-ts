import {ComponentExample} from "@/core_components";
// --------------------------------
import {DefaultExample}    from "./Default";


/**
 * Examples Registry برای ComponentValidate
 *
 * @example
 *   Examples.DEFAULT.render()    // → HTMLElement
 */
export const Examples = {

    DEFAULT:   DefaultExample,

} satisfies Record<string, ComponentExample>;


/**
 * Type تمام Exampleهای ComponentValidate
 */
export type ComponentValidateExamplesType = typeof Examples;

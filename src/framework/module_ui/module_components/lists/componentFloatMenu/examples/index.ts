import {ComponentExample} from "@/core_components";
// --------------------------------
import {DefaultExample} from "./Default";


/**
 * Examples Registry برای ComponentFloatMenu
 *
 * @example
 *   Examples.DEFAULT.render()   // → HTMLElement
 */
export const Examples = {

    DEFAULT: DefaultExample,

} satisfies Record<string, ComponentExample>;


/**
 * Type تمام Exampleهای ComponentFloatMenu
 */
export type ComponentFloatMenuExamplesType = typeof Examples;

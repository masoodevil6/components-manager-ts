import {ComponentExample} from "@/core_components";
// --------------------------------
import {DefaultExample} from "./Default";


/**
 * Examples Registry برای ComponentPositionMenu
 *
 * @example
 *   Examples.DEFAULT.render()   // → HTMLElement
 */
export const Examples = {

    DEFAULT: DefaultExample,

} satisfies Record<string, ComponentExample>;


/**
 * Type تمام Exampleهای ComponentPositionMenu
 */
export type ComponentPositionMenuExamplesType = typeof Examples;

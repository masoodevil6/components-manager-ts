import {ComponentExample} from "@/core_components";
// --------------------------------
import {DefaultExample}   from "./Default";


/**
 * Examples Registry برای ComponentSidebar
 *
 * @example
 *   Examples.DEFAULT.render()  // → HTMLElement
 */
export const Examples = {

    DEFAULT:   DefaultExample,

} satisfies Record<string, ComponentExample>;


/**
 * Type تمام Exampleهای ComponentSidebar
 */
export type ComponentSidebarExamplesType = typeof Examples;

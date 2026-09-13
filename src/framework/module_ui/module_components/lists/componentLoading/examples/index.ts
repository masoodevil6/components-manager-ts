import {ComponentExample} from "@/core_components";
import {Default}           from "./Default";
// --------------------------------


/**
 * Examples Registry برای ComponentLoading
 *
 * @example
 *   Examples.DEFAULT.render()    // → HTMLElement
 */
export const Examples: Record<string, ComponentExample> = {
    DEFAULT: Default,
};


/**
 * Type تمام Exampleهای ComponentLoading
 */
export type ComponentLoadingExamplesType = typeof Examples;

import {ComponentExample} from "@/core_components";
// --------------------------------
import {HorizontalExample} from "./Horizontal";
import {VerticalExample}   from "./Vertical";


/**
 * Examples Registry برای ComponentRecyclerView
 *
 * @example
 *   Examples.HORIZONTAL.render()    // → HTMLElement
 *   Examples.VERTICAL.render()     // → HTMLElement
 */
export const Examples = {

    HORIZONTAL:  HorizontalExample,
    VERTICAL:    VerticalExample,

} satisfies Record<string, ComponentExample>;


/**
 * Type تمام Exampleهای ComponentRecyclerView
 */
export type ComponentRecyclerViewExamplesType = typeof Examples;

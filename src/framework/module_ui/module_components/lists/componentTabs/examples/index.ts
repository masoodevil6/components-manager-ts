import {ComponentExample} from "@/core_components";
// --------------------------------
import {FullWidthExample} from "./FullWidth";
import {FloatExample}     from "./Float";


/**
 * Examples Registry برای ComponentTabs
 *
 * @example
 *   Examples.FULL_WIDTH.render()    // → HTMLElement
 *   Examples.FLOAT.render()         // → HTMLElement
 */
export const Examples = {

    FULL_WIDTH:  FullWidthExample,
    FLOAT:       FloatExample,

} satisfies Record<string, ComponentExample>;


/**
 * Type تمام Exampleهای ComponentTabs
 */
export type ComponentTabsExamplesType = typeof Examples;

import {ComponentExample} from "@/core_components";
// --------------------------------
import {DefaultExample}    from "./Default";
import {ClickableExample}  from "./Clickable";


/**
 * Examples Registry برای ComponentLabel
 *
 * @example
 *   Examples.DEFAULT.render()    // → HTMLElement
 *   Examples.CLICKABLE.render()  // → HTMLElement
 */
export const Examples = {

    DEFAULT:   DefaultExample,
    CLICKABLE: ClickableExample,

} satisfies Record<string, ComponentExample>;


/**
 * Type تمام Exampleهای ComponentLabel
 */
export type ComponentLabelExamplesType = typeof Examples;
import {ComponentExample} from "@/core_components";
// --------------------------------
import {DefaultExample}   from "./Default";
import {ClickableExample} from "./Clickable";
import {VariantsExample}  from "./Variants";


/**
 * Examples Registry برای ComponentButton
 *
 * @example
 *   Examples.DEFAULT.render()                    // → HTMLElement
 *   Examples.CLICKABLE.render()                  // → HTMLElement
 *   Examples.VARIANTS.render()                   // → HTMLElement
 */
export const Examples = {

    DEFAULT:   DefaultExample,
    CLICKABLE: ClickableExample,
    VARIANTS:  VariantsExample,

} satisfies Record<string, ComponentExample>;


/**
 * Type تمام Exampleهای ComponentButton
 */
export type ComponentButtonExamplesType = typeof Examples;

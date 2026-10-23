import {ComponentExample} from "@/core_components";
// --------------------------------
import {DefaultExample}    from "./Default";
import {ClickableExample}  from "./Clickable";
import {WithMenuMoreExample} from "./WithMenuMore";


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
    WITH_MENU_MORE: WithMenuMoreExample,

} satisfies Record<string, ComponentExample>;


/**
 * Type تمام Exampleهای ComponentLabel
 */
export type ComponentLabelExamplesType = typeof Examples;

import {ComponentExample} from "@/core_components";
// --------------------------------
import {DefaultExample}       from "./Default";
import {ClickableExample}     from "./Clickable";
import {InitiallyOpenExample} from "./InitiallyOpen";
import {TitleOnlyExample}     from "./TitleOnly";
import {StyledExample}        from "./Styled";


/**
 * Examples Registry برای ComponentCollapse
 *
 * @example
 *   Examples.DEFAULT.render()    // → HTMLElement
 */
export const Examples = {

    DEFAULT:         DefaultExample,
    CLICKABLE:       ClickableExample,
    INITIALLY_OPEN:  InitiallyOpenExample,
    TITLE_ONLY:      TitleOnlyExample,
    STYLED:          StyledExample,

} satisfies Record<string, ComponentExample>;


/**
 * Type تمام Exampleهای ComponentCollapse
 */
export type ComponentCollapseExamplesType = typeof Examples;

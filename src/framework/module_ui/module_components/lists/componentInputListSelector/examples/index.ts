import {ComponentExample} from "@/core_components";
// --------------------------------
import {DefaultExample, IconOnlyExample} from "./Default";


/**
 * Examples Registry برای ComponentInputListSelector
 *
 * @example
 *   Examples.DEFAULT.render()  // → HTMLElement
 */
export const Examples = {

    DEFAULT:   DefaultExample,
    ICON_ONLY: IconOnlyExample,

} satisfies Record<string, ComponentExample>;


export type ComponentInputListSelectorExamplesType = typeof Examples;

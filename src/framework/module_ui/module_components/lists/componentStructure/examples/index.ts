import {ComponentExample} from "@/core_components";
// --------------------------------
import {DefaultExample}     from "./Default";
import {WithContentExample} from "./WithContent";
import {HiddenExample}      from "./Hidden";


/**
 * Examples Registry برای ComponentStructure
 *
 * تمام Exampleهای ComponentStructure از این نقطه قابل دسترسی هستند.
 * ComponentManager می‌تواند این Registry را بخواند و
 * Exampleها را با example.render() نمایش دهد.
 *
 * @example
 *   Examples.DEFAULT.render()           // → HTMLElement
 *   Examples.WITH_CONTENT.render()      // → HTMLElement
 *   Examples.HIDDEN.render()            // → HTMLElement
 */
export const Examples = {

    DEFAULT:      DefaultExample,
    WITH_CONTENT: WithContentExample,
    HIDDEN:       HiddenExample,

} satisfies Record<string, ComponentExample>;


/**
 * Type تمام Exampleهای ComponentStructure
 * برای type-safety در ComponentManager
 */
export type ComponentStructureExamplesType = typeof Examples;

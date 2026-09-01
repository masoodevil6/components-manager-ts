import {ComponentExample} from "@/core_components";
// --------------------------------
import {DefaultExample}   from "./Default";
import {ClickableExample} from "./Clickable";


/**
 * Examples Registry برای ComponentIcon
 *
 * تمام Exampleهای ComponentIcon از این نقطه قابل دسترسی هستند.
 * ComponentManager می‌تواند این Registry را بخواند و
 * Exampleها را با example.render() نمایش دهد.
 *
 * @example
 *   Examples.DEFAULT.render()                    // → HTMLElement
 *   Examples.CLICKABLE.render()                  // → HTMLElement
 */
export const Examples = {

    DEFAULT:   DefaultExample,
    CLICKABLE: ClickableExample,

} satisfies Record<string, ComponentExample>;


/**
 * Type تمام Exampleهای ComponentIcon
 * برای type-safety در ComponentManager
 */
export type ComponentIconExamplesType = typeof Examples;

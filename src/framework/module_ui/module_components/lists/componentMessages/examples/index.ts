import {ComponentExample} from "@/core_components";
// --------------------------------
import {SuccessExample}  from "./Success";
import {WarningExample}  from "./Warning";
import {ErrorExample}    from "./Error";


/**
 * Examples Registry برای ComponentMessages
 *
 * تمام Exampleهای ComponentMessages از این نقطه قابل دسترسی هستند.
 * ComponentManager می‌تواند این Registry را بخواند و
 * Exampleها را با example.render() نمایش دهد.
 *
 * @example
 *   Examples.SUCCESS.render()   // → HTMLElement
 *   Examples.WARNING.render()   // → HTMLElement
 *   Examples.ERROR.render()     // → HTMLElement
 */
export const Examples = {

    SUCCESS: SuccessExample,
    WARNING: WarningExample,
    ERROR:   ErrorExample,

} satisfies Record<string, ComponentExample>;


export type ComponentMessagesExamplesType = typeof Examples;

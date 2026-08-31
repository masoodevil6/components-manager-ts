import {ComponentExampleDefinition} from "@/core_components";
// --------------------------------
import {DefaultExample}              from "./Default";


/**
 * Examples Registry برای ComponentStructure
 *
 * تمام Exampleهای ComponentStructure از این نقطه قابل دسترسی هستند.
 * ComponentManager آینده می‌تواند این Registry را بخواند و
 * Exampleها را بدون instantiate کردن Component نمایش دهد.
 *
 * @example
 *   Examples.DEFAULT                    // → Example Definition
 *   ExampleRenderer.render(Component, Examples.DEFAULT)  // → HTMLElement
 */
export const Examples = {

    DEFAULT: DefaultExample,

} satisfies Record<string, ComponentExampleDefinition>;


/**
 * Type تمام Exampleهای ComponentStructure
 * برای type-safety در ComponentManager آینده
 */
export type ComponentStructureExamplesType = typeof Examples;

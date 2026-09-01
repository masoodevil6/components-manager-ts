import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import {Props}             from "./Props";
// --------------------------------


/**
 * کلیدهای schemaهای پایه ComponentStructure (Declarative)
 *
 * هر schema (part) شامل:
 *   part         — نام part (کلید scope)
 *   props        — لیست prop entryهایی که این part نیاز دارد (اشاره مستقیم به Props)
 *   name         — کلید ترجمه برای نام نمایشی
 *   description  — کلید ترجمه برای توضیحات
 *
 * دو لایه پایه‌ای:
 *   لایه ۱ (COMPONENT):  <component-{name}> با RTL + classList + styles
 *   لایه ۲ (STRUCTURE):  <section> با show/hide + structureClass + structureStyles
 *
 * این فایل فقط تعریف می‌کند هر Part چیست — نه چگونه رندر می‌شود.
 * رندر در SchemaHandlers.ts انجام می‌شود (behavioral).
 */
export const Schemas = {
    COMPONENT: {
        part:         "part-component",
        props:        [Props.classList, Props.styles],
        name:         Keys.category.components.basic.schemas.component.name,
        description:  Keys.category.components.basic.schemas.component.description,
    },
    STRUCTURE: {
        part:         "part-component-structure",
        props:        [Props.prop_show, Props.prop_structureClass, Props.prop_structureStyles],
        name:         Keys.category.components.basic.schemas.structure.name,
        description:  Keys.category.components.basic.schemas.structure.description,
    },
} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای پایه — برای استفاده در TSchemas کامپوننت‌های فرزند
 *
 * @example
 *   import {SchemasType} from "@/ui_components/lists/componentStructure/Schemas"
 *   class ComponentButton extends ComponentStructure<..., SchemasType, ...>
 */
export type SchemasType = {
    [K in keyof typeof Schemas]: typeof Schemas[K]["part"]
};

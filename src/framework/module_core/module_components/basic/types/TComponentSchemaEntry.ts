import * as UtilBrands     from "@/util_brands";
// --------------------------------
import {TComponentPropEntry} from "./TComponentPropEntry";


/**
 * نوع هر entry در الگوی Schemas کامپوننت (Declarative)
 *
 * هر schema (part) شامل:
 *   part         — نام part (string) — کلید scope
 *   props        — لیست prop entryهایی که این part نیاز دارد (scope)
 *   name         — کلید ترجمه برای نام نمایشی part
 *   description  — کلید ترجمه برای توضیحات part
 *
 * Schema فقط تعریف می‌کند یک Part چیست — نه چگونه رندر می‌شود.
 * رندر در SchemaHandlers.ts انجام می‌شود (behavioral).
 *
 * توسعه‌پذیر: فرزند می‌تواند schemaهای اختصاصی خود را اضافه کند
 *
 * @example
 *   import {Props} from "./Props";
 *   const Schemas = {
 *       COMPONENT: {
 *           part:    "part-component",
 *           props:   [Props.classList, Props.styles],
 *           name:        Keys.category.components.basic.schemas.component.name,
 *           description: Keys.category.components.basic.schemas.component.description,
 *       } satisfies TComponentSchemaEntry,
 *   }
 */
export type TComponentSchemaEntry = {
    part:              string;
    props?:            TComponentPropEntry<any>[];
    name?:             UtilBrands.TranslationKey;
    description?:      UtilBrands.TranslationKey;
};

import {TComponentSchemaEntry} from "./TComponentSchemaEntry";
// --------------------------------


/**
 * نوع الگوی Schemas کامپوننت — یک Record از schema entryها
 *
 * این type برای تعریف Schemas.ts هر کامپوننت استفاده می‌شود.
 * کلیدها نام schemaها هستند و مقدارها TComponentSchemaEntry است.
 *
 * @example
 *   const Schemas: TComponentSchemas = {
 *       COMPONENT: { part: "part-component", props: ["classList", "styles"] },
 *       STRUCTURE: { part: "part-component-structure", props: ["prop_show", ...] },
 *   }
 */
export type TComponentSchemas = Record<string, TComponentSchemaEntry>;

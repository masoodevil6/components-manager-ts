import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import {Props}             from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Schemas اختصاصی ComponentTable
 *
 * Plan 11.2 — Schema پایه (COMPONENT + STRUCTURE) از ComponentStructureTrait
 * به‌عنوان اولین ورودی‌ها اضافه شده‌اند تا لایه <component-table> + <section>
 * به‌صورت خودکار رندر شوند.
 *
 * Schema فقط تعریف می‌کند Part چیست — نه چگونه رندر شود.
 * Rendering در خود ComponentTable قرار دارد.
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی — اولین ورودی) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---
    TABLE: {
        part:         "part-table",
        props:        [
            Props.prop_tableClass,
            Props.prop_tableStyles,
            Props.prop_tableBordered,
            Props.prop_tableStriped,
            Props.prop_tableHover,
            Props.prop_tableBorderless,
            Props.prop_size,
        ],
        name:         Keys.category.components.table.schemas.table.name,
        description:  Keys.category.components.table.schemas.table.description,
    },

    TABLE_HEADER: {
        part:         "part-table-header",
        props:        [
            Props.prop_tableHeadClass,
            Props.prop_tableHeadStyles,
            Props.prop_tableItemHeadClass,
            Props.prop_tableItemHeadStyles,
            Props.prop_order,
            Props.prop_header,
            Props.prop_headerIconSize,
            Props.prop_headerIconColor,
            Props.prop_hasColNumber,
            Props.prop_hasColSelector,
            Props.prop_size,
            Props.prop_rowOptions,
        ],
        name:         Keys.category.components.table.schemas.header.name,
        description:  Keys.category.components.table.schemas.header.description,
    },

    TABLE_BODY: {
        part:         "part-table-body",
        props:        [
            Props.prop_tableBodyClass,
            Props.prop_tableBodyStyles,
            Props.prop_tableItemBodyClass,
            Props.prop_tableItemBodyStyles,
            Props.prop_order,
            Props.prop_header,
            Props.prop_data,
            Props.prop_valueType,
            Props.prop_valueRow,
            Props.prop_valueCol,
            Props.prop_hasColNumber,
            Props.prop_size,
            Props.prop_rowOptions,
            Props.prop_rowOptionsColor,
            Props.prop_rowOptionsItemColor,
        ],
        name:         Keys.category.components.table.schemas.body.name,
        description:  Keys.category.components.table.schemas.body.description,
    },

    TABLE_HEADER_COL_SELECTOR: {
        part:         "part-table-header-col-selector",
        props:        [
            Props.prop_hasColSelector,
            Props.prop_doColSelector,
            Props.prop_header,
            Props.prop_order,
        ],
        name:         Keys.category.components.table.schemas.header.name,
        description:  Keys.category.components.table.schemas.header.description,
    },

} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای ComponentTable — برای استفاده در TSchemas
 */
export type SchemasType = ExtractSchemasType<typeof Schemas>;

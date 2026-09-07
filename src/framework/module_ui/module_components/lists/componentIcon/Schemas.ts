import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import {Props}             from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Schemas اختصاصی ComponentIcon
 *
 * Plan 11.2 — Schema پایه (COMPONENT + STRUCTURE) از ComponentStructureTrait
 * به‌عنوان اولین ورودی‌ها اضافه شده‌اند.
 *
 * Schema فقط تعریف می‌کند Part چیست — نه چگونه رندر شود.
 * Rendering در خود ComponentIcon قرار دارد.
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی — اولین ورودی) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---
    ICON: {
        part:         "part-icon",
        props:        [
            Props.prop_icon,
            Props.prop_iconTitle,
            Props.prop_iconClass,
            Props.prop_iconStyles,
        ],
        name:         Keys.category.components.icon.schemas.icon.name,
        description:  Keys.category.components.icon.schemas.icon.description,
    },

} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای ComponentIcon — برای استفاده در TSchemas
 */
export type SchemasType = ExtractSchemasType<typeof Schemas>;

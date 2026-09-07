import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import {Props}             from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Schemas اختصاصی ComponentMessages
 *
 * Plan 11.2 — Schema پایه (COMPONENT + STRUCTURE) از ComponentStructureTrait
 * به‌عنوان اولین ورودی‌ها اضافه شده‌اند.
 *
 * Schema فقط تعریف می‌کند Part چیست — نه چگونه رندر شود.
 * Rendering در خود ComponentMessages قرار دارد.
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی — اولین ورودی) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---
    MESSAGE: {
        part:         "part-messages-message",
        props:        [
            Props.prop_type,
            Props.prop_messages,
            Props.prop_borderWidth,
            Props.prop_backgroundColor,
            Props.prop_textColor,
            Props.prop_borderColor,
        ],
        name:         Keys.category.components.messages.schemas.message.name,
        description:  Keys.category.components.messages.schemas.message.description,
    },

    ICON: {
        part:         "part-messages-icon",
        props:        [
            Props.prop_iconColor,
            Props.prop_type,
        ],
        name:         Keys.category.components.messages.schemas.icon.name,
        description:  Keys.category.components.messages.schemas.icon.description,
    },

} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای ComponentMessages — برای استفاده در TSchemas
 */
export type SchemasType = ExtractSchemasType<typeof Schemas>;

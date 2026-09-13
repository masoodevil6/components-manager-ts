import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import {Props}             from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Schemas اختصاصی ComponentWindowConfirm
 *
 * Plan 11.2 — Schema پایه (COMPONENT + STRUCTURE) از ComponentStructureTrait
 * به‌عنوان اولین ورودی‌ها اضافه شده‌اند تا لایه <component-window-confirm> + <section>
 * به‌صورت خودکار رندر شوند.
 *
 * Schema فقط تعریف می‌کند Part چیست — نه چگونه رندر شود.
 * Rendering در خود ComponentWindowConfirm قرار دارد.
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی — اولین ورودی) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---
    CONFIRM_STRUCTURE: {
        part:         "part-confirm-structure",
        props:        [
            Props.prop_icon,
            Props.prop_message,
            Props.prop_title,
            Props.prop_acceptText,
            Props.prop_cancelText,
            Props.prop_showCancel,
            Props.prop_showAccept,
            Props.prop_closeOnOverlay,
            Props.prop_windowWidth,
            Props.prop_windowHeight,
        ],
        name:         Keys.category.components.windowConfirm.schemas.structure.name,
        description:  Keys.category.components.windowConfirm.schemas.structure.description,
    },

} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای ComponentWindowConfirm — برای استفاده در TSchemas
 */
export type SchemasType = ExtractSchemasType<typeof Schemas>;

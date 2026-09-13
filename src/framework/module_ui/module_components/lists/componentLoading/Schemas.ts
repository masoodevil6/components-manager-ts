import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import {Props}             from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Schemas اختصاصی ComponentLoading
 *
 * Plan 11.2 — Schema پایه (COMPONENT + STRUCTURE) از ComponentStructureTrait
 * به‌عنوان اولین ورودی‌ها اضافه شده‌اند تا لایه <component-loading> + <section>
 * به‌صورت خودکار رندر شوند.
 *
 * Schema فقط تعریف می‌کند Part چیست — نه چگونه رندر شود.
 * Rendering در خود ComponentLoading قرار دارد.
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی — اولین ورودی) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---
    LOADING: {
        part:         "part-loading",
        props:        [
            Props.prop_type,
            Props.prop_icon,
            Props.prop_backgroundLoading,
            Props.prop_backgroundShadow,
            Props.prop_loadingWidth,
            Props.prop_loadingHeight,
            Props.prop_showCancel,
            Props.prop_cancelDelay,
        ],
        name:         Keys.category.components.loading.schemas.loading.name,
        description:  Keys.category.components.loading.schemas.loading.description,
    },

    CANCEL_BTN: {
        part:         "part-cancel-btn",
        props:        [
            Props.prop_showCancel,
            Props.prop_cancelDelay,
        ],
        name:         Keys.category.components.loading.schemas.cancelBtn.name,
        description:  Keys.category.components.loading.schemas.cancelBtn.description,
    },

} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای ComponentLoading — برای استفاده در TSchemas
 */
export type SchemasType = ExtractSchemasType<typeof Schemas>;

import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import {Props}             from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Schemas اختصاصی ComponentValidate (Plan 15.1.0 — بازیابی ۴ schema Legacy)
 *
 * Plan 11.2 — Schema پایه (COMPONENT + STRUCTURE) از ComponentStructureTrait
 * به‌عنوان اولین ورودی‌ها اضافه شده‌اند تا لایه <component-validate> + <section>
 * به‌صورت خودکار رندر شوند.
 *
 * Schema فقط تعریف می‌کند Part چیست — نه چگونه رندر شود.
 * Rendering در خود ComponentValidate قرار دارد.
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی — اولین ورودی) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---
    FORM: {
        part:         "part-form",
        props:        [
            Props.prop_listRules,
            Props.prop_isAbsolute,
            Props.prop_title,
        ],
        name:         Keys.category.components.validate.schemas.form.name,
        description:  Keys.category.components.validate.schemas.form.description,
    },

    RULES_HTML: {
        part:         "part-rules-html",
        props:        [
            Props.prop_reference,
            Props.prop_listRules,
            Props.prop_msgRules,
        ],
        name:         Keys.category.components.validate.schemas.rulesHtml.name,
        description:  Keys.category.components.validate.schemas.rulesHtml.description,
    },

    VALIDATES_DATA: {
        part:         "part-validates-data",
        props:        [
            Props.prop_title,
            Props.prop_reference,
            Props.prop_referenceComponent,
        ],
        name:         Keys.category.components.validate.schemas.validatesData.name,
        description:  Keys.category.components.validate.schemas.validatesData.description,
    },

    STATUS_ICON: {
        part:         "part-status-icon",
        props:        [
            Props.prop_iconSuccess,
            Props.prop_iconError,
        ],
        name:         Keys.category.components.validate.schemas.statusIcon.name,
        description:  Keys.category.components.validate.schemas.statusIcon.description,
    },

} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای ComponentValidate — برای استفاده در TSchema
 */
export type SchemasType = ExtractSchemasType<typeof Schemas>;

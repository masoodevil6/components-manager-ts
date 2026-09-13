import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import {Props}             from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Schemas اختصاصی ComponentErrorIsEmpty
 *
 * Plan 11.2 — Schema پایه (COMPONENT + STRUCTURE) از ComponentStructureTrait
 * به‌عنوان اولین ورودی‌ها اضافه شده‌اند تا لایه <component-error-is-empty> + <section>
 * به‌صورت خودکار رندر شوند.
 *
 * Schema فقط تعریف می‌کند Part چیست — نه چگونه رندر شود.
 * Rendering در خود ComponentErrorIsEmpty قرار دارد.
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی — اولین ورودی) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---
    FORM: {
        part:         "part-form",
        props:        [],
        name:         Keys.category.components.errorIsEmpty.schemas.form.name,
        description:  Keys.category.components.errorIsEmpty.schemas.form.description,
    },

    BORDER: {
        part:         "part-border",
        props:        [
            Props.prop_borderClass,
            Props.prop_borderStyles,
            Props.prop_borderColor,
        ],
        name:         Keys.category.components.errorIsEmpty.schemas.border.name,
        description:  Keys.category.components.errorIsEmpty.schemas.border.description,
    },

    BORDER_CONTENT: {
        part:         "part-border-content",
        props:        [],
        name:         Keys.category.components.errorIsEmpty.schemas.borderContent.name,
        description:  Keys.category.components.errorIsEmpty.schemas.borderContent.description,
    },

    BORDER_CONTENT_ICON: {
        part:         "part-border-content-icon",
        props:        [
            Props.prop_icon,
            Props.prop_iconClass,
            Props.prop_iconStyles,
        ],
        name:         Keys.category.components.errorIsEmpty.schemas.borderContentIcon.name,
        description:  Keys.category.components.errorIsEmpty.schemas.borderContentIcon.description,
    },

    BORDER_CONTENT_TITLE: {
        part:         "part-border-content-title",
        props:        [
            Props.prop_title,
            Props.prop_titleColor,
            Props.prop_titleClass,
            Props.prop_titleStyles,
        ],
        name:         Keys.category.components.errorIsEmpty.schemas.borderContentTitle.name,
        description:  Keys.category.components.errorIsEmpty.schemas.borderContentTitle.description,
    },

    BORDER_CONTENT_BTN: {
        part:         "part-border-content-btn",
        props:        [
            Props.prop_btnHas,
            Props.prop_btnClass,
            Props.prop_btnStyles,
            Props.prop_btnTitle,
            Props.prop_btnIcon,
        ],
        name:         Keys.category.components.errorIsEmpty.schemas.borderContentBtn.name,
        description:  Keys.category.components.errorIsEmpty.schemas.borderContentBtn.description,
    },

} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای ComponentErrorIsEmpty — برای استفاده در TSchemas
 */
export type SchemasType = ExtractSchemasType<typeof Schemas>;

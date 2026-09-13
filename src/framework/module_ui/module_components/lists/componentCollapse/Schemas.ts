import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import {Props}             from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Schemas اختصاصی ComponentCollapse (Plan 15.1.0 — بازیابی ۷ schema Legacy)
 *
 * Plan 11.2 — Schema پایه (COMPONENT + STRUCTURE) از ComponentStructureTrait
 * به‌عنوان اولین ورودی‌ها اضافه شده‌اند تا لایه <component-collapse> + <section>
 * به‌صورت خودکار رندر شوند.
 *
 * Schema فقط تعریف می‌کند Part چیست — نه چگونه رندر شود.
 * Rendering در خود ComponentCollapse قرار دارد.
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی — اولین ورودی) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---
    FORM: {
        part:         "part-form",
        props:        [],
        name:         Keys.category.components.collapse.schemas.form.name,
        description:  Keys.category.components.collapse.schemas.form.description,
    },

    FORM_BORDER: {
        part:         "part-form-border",
        props:        [
            Props.prop_collapseBorderBackground,
            Props.prop_collapseBorderClass,
            Props.prop_collapseBorderStyles,
            Props.prop_collapseBorderColor,
            Props.prop_collapseBorderWidth,
            Props.prop_collapseBorderRadius,
            Props.prop_collapseBorderMinWidth,
        ],
        name:         Keys.category.components.collapse.schemas.formBorder.name,
        description:  Keys.category.components.collapse.schemas.formBorder.description,
    },

    FORM_BORDER_CONTENT: {
        part:         "part-form-border-content",
        props:        [],
        name:         Keys.category.components.collapse.schemas.formBorderContent.name,
        description:  Keys.category.components.collapse.schemas.formBorderContent.description,
    },

    FORM_BORDER_CONTENT_ICON: {
        part:         "part-form-border-content-icon",
        props:        [
            Props.prop_collapseIcon,
            Props.prop_collapseIconClass,
            Props.prop_collapseIconStyles,
        ],
        name:         Keys.category.components.collapse.schemas.formBorderContentIcon.name,
        description:  Keys.category.components.collapse.schemas.formBorderContentIcon.description,
    },

    FORM_BORDER_CONTENT_TITLE: {
        part:         "part-form-border-content-title",
        props:        [
            Props.prop_collapseTitle,
            Props.prop_collapseTitleStyles,
            Props.prop_collapseTitleClass,
            Props.prop_collapseTitleColor,
        ],
        name:         Keys.category.components.collapse.schemas.formBorderContentTitle.name,
        description:  Keys.category.components.collapse.schemas.formBorderContentTitle.description,
    },

    FORM_BORDER_CONTENT_ARROW: {
        part:         "part-form-border-content-arrow",
        props:        [
            Props.prop_collapseArrowClass,
            Props.prop_collapseArrowStyles,
            Props.prop_collapseBodyIsOpen,
        ],
        name:         Keys.category.components.collapse.schemas.formBorderContentArrow.name,
        description:  Keys.category.components.collapse.schemas.formBorderContentArrow.description,
    },

    FORM_BODY: {
        part:         "part-form-body",
        props:        [
            Props.prop_collapseBody,
            Props.prop_collapseBodyStyles,
            Props.prop_collapseBodyClass,
            Props.prop_collapseBodyIsOpen,
            Props.prop_collapseBodyBorderColor,
            Props.prop_collapseBodyBorderWidth,
            Props.prop_collapseBodyBorderRadius,
        ],
        name:         Keys.category.components.collapse.schemas.formBody.name,
        description:  Keys.category.components.collapse.schemas.formBody.description,
    },

} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای ComponentCollapse — برای استفاده در TSchema
 */
export type SchemasType = ExtractSchemasType<typeof Schemas>;

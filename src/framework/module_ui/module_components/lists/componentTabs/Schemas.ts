import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import {Props}             from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Schemas اختصاصی ComponentTabs (Plan 15.1.0)
 *
 * Plan 11.2 — Schema پایه (COMPONENT + STRUCTURE) از ComponentStructureTrait
 *
 * Legacy Schemas:
 *   FORM, FORM_TABS, FORM_TABS_BORDER, FORM_TABS_BORDER_CONTENT,
 *   FORM_TABS_BORDER_CONTENT_ICON, FORM_TABS_BORDER_CONTENT_TITLE,
 *   FORM_BODYS, FORM_BODYS_BORDER
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی — اولین ورودی) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---
    FORM: {
        part:         "part-form",
        props:        [],
        name:         Keys.category.components.tabs.schemas.form.name,
        description:  Keys.category.components.tabs.schemas.form.description,
    },

    FORM_TABS: {
        part:         "part-form-tabs",
        props:        [
            Props.prop_tabs,
            Props.prop_tabsView,
        ],
        name:         Keys.category.components.tabs.schemas.formTabs.name,
        description:  Keys.category.components.tabs.schemas.formTabs.description,
    },

    FORM_TABS_BORDER: {
        part:         "part-form-tabs-border",
        props:        [
            Props.prop_tabSelected,
            Props.prop_borderBackgroundSelected,
            Props.prop_borderBackgroundUnselected,
            Props.prop_borderClass,
            Props.prop_borderStyles,
            Props.prop_borderColor,
            Props.prop_borderWidth,
            Props.prop_borderRadius,
            Props.prop_borderMinWidth,
        ],
        name:         Keys.category.components.tabs.schemas.formTabsBorder.name,
        description:  Keys.category.components.tabs.schemas.formTabsBorder.description,
    },

    FORM_TABS_BORDER_CONTENT: {
        part:         "part-form-tabs-border-content",
        props:        [
            Props.prop_tabsView,
            Props.prop_borderBackgroundBefore,
            Props.prop_borderBackgroundAfter,
        ],
        name:         Keys.category.components.tabs.schemas.formTabsBorderContent.name,
        description:  Keys.category.components.tabs.schemas.formTabsBorderContent.description,
    },

    FORM_TABS_BORDER_CONTENT_ICON: {
        part:         "part-form-tabs-border-content-icon",
        props:        [
            Props.prop_iconClass,
            Props.prop_iconStyles,
        ],
        name:         Keys.category.components.tabs.schemas.formTabsBorderContentIcon.name,
        description:  Keys.category.components.tabs.schemas.formTabsBorderContentIcon.description,
    },

    FORM_TABS_BORDER_CONTENT_TITLE: {
        part:         "part-form-tabs-border-content-title",
        props:        [
            Props.prop_tabSelected,
            Props.prop_titleStyles,
            Props.prop_titleClass,
            Props.prop_titleColorSelected,
            Props.prop_titleColorUnselected,
        ],
        name:         Keys.category.components.tabs.schemas.formTabsBorderContentTitle.name,
        description:  Keys.category.components.tabs.schemas.formTabsBorderContentTitle.description,
    },

    FORM_BODYS: {
        part:         "part-form-bodys",
        props:        [
            Props.prop_tabs,
            Props.prop_tabsView,
        ],
        name:         Keys.category.components.tabs.schemas.formBodys.name,
        description:  Keys.category.components.tabs.schemas.formBodys.description,
    },

    FORM_BODYS_BORDER: {
        part:         "part-form-bodys-border",
        props:        [
            Props.prop_tabSelected,
            Props.prop_bodyStyles,
            Props.prop_bodyClass,
            Props.prop_bodyBorderColor,
            Props.prop_bodyBorderWidth,
            Props.prop_bodyBorderRadius,
        ],
        name:         Keys.category.components.tabs.schemas.formBodysBorder.name,
        description:  Keys.category.components.tabs.schemas.formBodysBorder.description,
    },

} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای ComponentTabs
 */
export type SchemasType = ExtractSchemasType<typeof Schemas>;

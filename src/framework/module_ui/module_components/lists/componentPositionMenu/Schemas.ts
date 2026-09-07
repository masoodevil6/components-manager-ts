import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import {Props}             from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Schemas اختصاصی ComponentPositionMenu
 *
 * Plan 11.2 — Schema پایه (COMPONENT + STRUCTURE) از ComponentStructureTrait
 * به‌عنوان اولین ورودی‌ها اضافه شده‌اند تا لایه <component-position-menu> + <section>
 * به‌صورت خودکار رندر شوند.
 *
 * Schema فقط تعریف می‌کند Part چیست — نه چگونه رندر شود.
 * Rendering در خود ComponentPositionMenu قرار دارد.
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی — اولین ورودی) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---
    FORM_FLOAT_MENU: {
        part:         "part-formFloatMenu",
        props:        [
            Props.prop_menuBackgroundColor,
            Props.prop_menuBorderColor,
            Props.prop_menuBorderWidth,
            Props.prop_menuIsOpen,
            Props.prop_menuBodyWidth,
        ],
        name:         Keys.category.components.positionMenu.schemas.formFloatMenu.name,
        description:  Keys.category.components.positionMenu.schemas.formFloatMenu.description,
    },

    FORM_FLOAT_MENU_SELECTOR: {
        part:         "part-formFloatMenu-selector",
        props:        [
            Props.prop_menuSelector,
        ],
        name:         Keys.category.components.positionMenu.schemas.formFloatMenuSelector.name,
        description:  Keys.category.components.positionMenu.schemas.formFloatMenuSelector.description,
    },

    FORM_FLOAT_MENU_BODY: {
        part:         "part-formFloatMenu-body",
        props:        [],
        name:         Keys.category.components.positionMenu.schemas.formFloatMenuBody.name,
        description:  Keys.category.components.positionMenu.schemas.formFloatMenuBody.description,
    },

    FORM_FLOAT_MENU_BODY_CONTENT: {
        part:         "part-formFloatMenu-body-content",
        props:        [
            Props.prop_menuBtnAcceptHas,
            Props.prop_menuBtnRejectHas,
            Props.prop_menuBody,
            Props.prop_menuBodyHeight,
        ],
        name:         Keys.category.components.positionMenu.schemas.formFloatMenuBodyContent.name,
        description:  Keys.category.components.positionMenu.schemas.formFloatMenuBodyContent.description,
    },

    FORM_FLOAT_MENU_BODY_BUTTONS: {
        part:         "part-formFloatMenu-body-buttons",
        props:        [
            Props.prop_menuBtnAcceptHas,
            Props.prop_menuBtnRejectHas,
            Props.prop_menuBorderColor,
            Props.prop_menuBorderWidth,
        ],
        name:         Keys.category.components.positionMenu.schemas.formFloatMenuBodyButtons.name,
        description:  Keys.category.components.positionMenu.schemas.formFloatMenuBodyButtons.description,
    },

    FORM_FLOAT_MENU_BODY_BUTTONS_ACCEPT: {
        part:         "part-formFloatMenu-body-buttons-accept",
        props:        [
            Props.prop_menuBtnAcceptHas,
            Props.prop_menuBtnAcceptIcon,
            Props.prop_menuBtnAcceptTitle,
        ],
        name:         Keys.category.components.positionMenu.schemas.formFloatMenuBodyButtonsAccept.name,
        description:  Keys.category.components.positionMenu.schemas.formFloatMenuBodyButtonsAccept.description,
    },

    FORM_FLOAT_MENU_BODY_BUTTONS_REJECT: {
        part:         "part-formFloatMenu-body-buttons-reject",
        props:        [
            Props.prop_menuBtnRejectHas,
            Props.prop_menuBtnRejectIcon,
            Props.prop_menuBtnRejectTitle,
        ],
        name:         Keys.category.components.positionMenu.schemas.formFloatMenuBodyButtonsReject.name,
        description:  Keys.category.components.positionMenu.schemas.formFloatMenuBodyButtonsReject.description,
    },

} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای ComponentPositionMenu — برای استفاده در TSchemas
 */
export type SchemasType = ExtractSchemasType<typeof Schemas>;

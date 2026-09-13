import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import {Props}             from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Schemas اختصاصی ComponentInputListSelector
 *
 * Plan 11.2 — Schema پایه (COMPONENT + STRUCTURE) از ComponentStructureTrait
 * به‌عنوان اولین ورودی‌ها اضافه شده‌اند.
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی — اولین ورودی) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---

    MAIN: {
        part:         "part-main",
        props:        [
            Props.prop_columns,
            Props.prop_icon,
            Props.prop_showListSelected,
            Props.prop_labelShow,
            Props.prop_labelTitle,
            Props.prop_labelTooltipDescription,
            Props.prop_draggable,
            Props.prop_backgroundColorIcon,
            Props.prop_colorIcon,
            Props.prop_inputBackgroundColor,
        ],
        name:         Keys.category.components.inputListSelector.schemas.main.name,
        description:  Keys.category.components.inputListSelector.schemas.main.description,
    },

    MAIN_LABEL: {
        part:         "part-main-label",
        props:        [
            Props.prop_labelShow,
            Props.prop_labelTitle,
            Props.prop_labelTooltipDescription,
        ],
        name:         Keys.category.components.label.schemas.border.name,
        description:  Keys.category.components.label.schemas.border.description,
    },

    MAIN_FORM_FLOAT_MENU: {
        part:         "part-main-form-float-menu",
        props:        [
            Props.prop_menuBackgroundColor,
            Props.prop_menuBorderColor,
            Props.prop_widthBody,
            Props.prop_heightBody,
        ],
        name:         Keys.category.components.inputListSelector.schemas.mainFormFloatMenu.name,
        description:  Keys.category.components.inputListSelector.schemas.mainFormFloatMenu.description,
    },

    MAIN_FORM_FLOAT_MENU_ICON_LIST: {
        part:         "part-main-form-float-menu-icon-list",
        props:        [
            Props.prop_icon,
            Props.prop_backgroundColorIcon,
            Props.prop_colorIcon,
        ],
        name:         Keys.category.components.inputListSelector.schemas.mainFormFloatMenuIconList.name,
        description:  Keys.category.components.inputListSelector.schemas.mainFormFloatMenuIconList.description,
    },

    MAIN_FORM_FLOAT_MENU_CHECK_BOXES: {
        part:         "part-main-form-float-menu-check-boxes",
        props:        [
            Props.prop_columns,
            Props.prop_titleAll,
            Props.prop_heightItems,
            Props.prop_heightBody,
            Props.prop_draggable,
        ],
        name:         Keys.category.components.inputListSelector.schemas.mainFormFloatMenuCheckBoxes.name,
        description:  Keys.category.components.inputListSelector.schemas.mainFormFloatMenuCheckBoxes.description,
    },

    MAIN_FORM_LIST_SELECTED: {
        part:         "part-main-form-list-selected",
        props:        [
            Props.prop_columns,
            Props.prop_showListSelected,
        ],
        name:         Keys.category.components.inputListSelector.schemas.mainFormListSelected.name,
        description:  Keys.category.components.inputListSelector.schemas.mainFormListSelected.description,
    },

} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای ComponentInputListSelector
 */
export type SchemasType = ExtractSchemasType<typeof Schemas>;

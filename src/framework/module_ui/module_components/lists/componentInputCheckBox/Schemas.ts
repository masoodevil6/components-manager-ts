import * as CoreComponents   from "@/core_components";
import {Keys}                from "../../../module_categories/languages";
import {Props}               from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Schemas اختصاصی ComponentInputCheckBox
 *
 * Plan 11.2 — Schema پایه (COMPONENT + STRUCTURE) از ComponentStructureTrait
 * به‌عنوان اولین ورودی‌ها اضافه شده‌اند.
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---
    MAIN: {
        part:         "part-main",
        props:        [],
        name:         Keys.category.components.inputCheckBox.schemas.main.name,
        description:  Keys.category.components.inputCheckBox.schemas.main.description,
    },

    LABEL: {
        part:         "part-label",
        props:        [
            Props.prop_labelShow,
            Props.prop_labelBackground,
            Props.prop_labelRadius,
            Props.prop_labelMinWidth,
            Props.prop_labelTitle,
            Props.prop_labelFor,
            Props.prop_labelStyle,
            Props.prop_labelClass,
            Props.prop_labelColor,
            Props.prop_labelTooltipIcon,
            Props.prop_labelTooltipDescription,
            Props.prop_labelTooltipBackground,
            Props.prop_labelTooltipColor,
            Props.prop_labelTooltipPosition,
            Props.prop_labelTooltipDirection,
        ],
        name:         Keys.category.components.inputCheckBox.schemas.label.name,
        description:  Keys.category.components.inputCheckBox.schemas.label.description,
    },

    MAIN_ICON: {
        part:         "part-main-icon",
        props:        [
            Props.prop_value,
            Props.prop_isDisable,
            Props.prop_borderIconClass,
            Props.prop_borderIconStyles,
            Props.prop_borderIconColor_selected,
            Props.prop_borderIconColor_unSelected,
            Props.prop_borderIconColor_disable,
            Props.prop_borderIconWidth,
            Props.prop_borderIconOpacity,
            Props.prop_borderIconRadius,
            Props.prop_borderIconBackground_selected,
            Props.prop_borderIconBackground_unSelected,
            Props.prop_borderIconBackground_disable,
        ],
        name:         Keys.category.components.inputCheckBox.schemas.mainIcon.name,
        description:  Keys.category.components.inputCheckBox.schemas.mainIcon.description,
    },

    MAIN_ICON_POSITION: {
        part:         "part-main-icon-position",
        props:        [],
        name:         Keys.category.components.inputCheckBox.schemas.mainIcon.name,
        description:  Keys.category.components.inputCheckBox.schemas.mainIcon.description,
    },

    MAIN_ICON_CHECKBOX: {
        part:         "part-main-icon-checkbox",
        props:        [
            Props.prop_value,
            Props.prop_icon,
            Props.prop_iconClass,
            Props.prop_iconStyles,
        ],
        name:         Keys.category.components.inputCheckBox.schemas.mainIconCheckbox.name,
        description:  Keys.category.components.inputCheckBox.schemas.mainIconCheckbox.description,
    },

    MAIN_TITLE: {
        part:         "part-main-title",
        props:        [
            Props.prop_value,
            Props.prop_isDisable,
            Props.prop_title,
            Props.prop_titleShow,
            Props.prop_titleClass,
            Props.prop_titleStyles,
            Props.prop_titleColor_selected,
            Props.prop_titleColor_unSelected,
            Props.prop_titleColor_disable,
        ],
        name:         Keys.category.components.inputCheckBox.schemas.mainTitle.name,
        description:  Keys.category.components.inputCheckBox.schemas.mainTitle.description,
    },

    VALIDATE: {
        part:         "part-validate",
        props:        [
            Props.prop_listRules,
            Props.prop_msgRules,
            Props.prop_validateSize,
            Props.prop_iconSuccess,
            Props.prop_iconError,
        ],
        name:         Keys.category.components.inputCheckBox.schemas.mainTitle.name,
        description:  Keys.category.components.inputCheckBox.schemas.mainTitle.description,
    },

} satisfies CoreComponents.ComponentSchemas;


export type SchemasType = ExtractSchemasType<typeof Schemas>;

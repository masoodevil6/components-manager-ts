import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import {Props}             from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Schemas اختصاصی ComponentButton (Plan 9.1.1 — بازیابی ۴ schema Legacy)
 *
 * Plan 11.2 — Schema پایه (COMPONENT + STRUCTURE) از ComponentStructureTrait
 * به‌عنوان اولین ورودی‌ها اضافه شده‌اند تا لایه <component-button> + <section>
 * به‌صورت خودکار رندر شوند.
 *
 * Schema فقط تعریف می‌کند Part چیست — نه چگونه رندر شود.
 * Rendering در خود ComponentButton قرار دارد.
 *
 * معادل Legacy:
 *   FORM           → WRAPPER       (part-button-wrapper)
 *   FORM_BUTTON    → BUTTON        (part-button)
 *   FORM_BUTTON_TITLE → BUTTON_TITLE (part-button-title)
 *   FORM_BUTTON_ICON  → BUTTON_ICON  (part-button-icon)
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی — اولین ورودی) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---
    BUTTON: {
        part:         "part-button",
        props:        [
            Props.prop_btnTitle,
            Props.prop_btnType,
            Props.prop_btnSemantic,
            Props.prop_btnVariant,
            Props.prop_btnClass,
            Props.prop_btnStyles,
            Props.prop_btnDisabled,
            Props.prop_btnWidth,
            Props.prop_btnHeight,
            Props.prop_btnBorderColor,
            Props.prop_btnBorderWidth,
            Props.prop_btnBackgroundColor,
            Props.prop_btnBackgroundColor_hover,
            Props.prop_btnBorderRadius,
            Props.prop_btnBorderRadiusStartTop,
            Props.prop_btnBorderRadiusStartBottom,
            Props.prop_btnBorderRadiusEndTop,
            Props.prop_btnBorderRadiusEndBottom,
        ],
        name:         Keys.category.components.button.schemas.button.name,
        description:  Keys.category.components.button.schemas.button.description,
    },

    BUTTON_TITLE: {
        part:         "part-button-title",
        props:        [
            Props.prop_btnTitle,
            Props.prop_btnSemantic,
            Props.prop_btnTitleStyles,
            Props.prop_btnTitleClass,
            Props.prop_btnTitleColor,
            Props.prop_btnTitleColor_hover,
        ],
        name:         Keys.category.components.button.schemas.buttonTitle.name,
        description:  Keys.category.components.button.schemas.buttonTitle.description,
    },

    BUTTON_ICON: {
        part:         "part-button-icon",
        props:        [
            Props.prop_btnIcon,
            Props.prop_btnIconStyles,
            Props.prop_btnIconClass,
            Props.prop_btnSemantic,
            Props.prop_btnHeight,
            Props.prop_btnTitleColor,
            Props.prop_btnTitleColor_hover,
        ],
        name:         Keys.category.components.button.schemas.buttonIcon.name,
        description:  Keys.category.components.button.schemas.buttonIcon.description,
    },

    WRAPPER: {
        part:         "part-button-wrapper",
        props:        [
            Props.prop_btnWidth,
            Props.prop_btnHeight,
        ],
        name:         Keys.category.components.button.schemas.wrapper.name,
        description:  Keys.category.components.button.schemas.wrapper.description,
    },

} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای ComponentButton — برای استفاده در TSchemas
 */
export type SchemasType = ExtractSchemasType<typeof Schemas>;
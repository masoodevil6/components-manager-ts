import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import {Props}             from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Schemas اختصاصی ComponentFloatMenu
 *
 * Plan 11.2 — Schema پایه (COMPONENT + STRUCTURE) از ComponentStructureTrait
 * به‌عنوان اولین ورودی‌ها اضافه شده‌اند.
 *
 * Schema فقط تعریف می‌کند Part چیست — نه چگونه رندر شود.
 * Rendering در ComponentFloatMenu.ts قرار دارد.
 *
 * معادل Legacy:
 *   SELECTOR                  → بخش selector (trigger)
 *   SELECTOR_POSITION         → بخش positioning (inline absolute)
 *   SELECTOR_POSITION_BORDER  → بخش border (Composition با ComponentBorder)
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی — اولین ورودی) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---
    SELECTOR: {
        part:         "part-selector",
        props:        [
            Props.prop_selectorContent,
            Props.prop_selectorClass,
            Props.prop_selectorStyles,
            Props.prop_selectorShowType,
            Props.prop_floatShowControlWithSelf,
        ],
        name:         Keys.category.components.floatMenu.schemas.selector.name,
        description:  Keys.category.components.floatMenu.schemas.selector.description,
    },

    SELECTOR_POSITION: {
        part:         "part-selector-position",
        props:        [
            Props.prop_floatDirectionType,
            Props.prop_floatArrowWidth,
            Props.prop_floatPosition,
            Props.prop_floatShowControlWithSelf,
            Props.prop_floatIsShow,
        ],
        name:         Keys.category.components.floatMenu.schemas.selectorPosition.name,
        description:  Keys.category.components.floatMenu.schemas.selectorPosition.description,
    },

    SELECTOR_POSITION_BORDER: {
        part:         "part-selector-position-border",
        props:        [
            Props.prop_floatClass,
            Props.prop_floatStyles,
            Props.prop_floatContent,
            Props.prop_floatDirectionType,
            Props.prop_floatArrowWidth,
            Props.prop_floatDistance,
            Props.prop_floatBorderWidth,
            Props.prop_floatBorderColor,
            Props.prop_floatBorderRadius,
            Props.prop_floatWidth,
            Props.prop_floatMinWidth,
            Props.prop_floatArrowPosition,
            Props.prop_floatBackground,
            Props.prop_floatColor,
        ],
        name:         Keys.category.components.floatMenu.schemas.selectorPositionBorder.name,
        description:  Keys.category.components.floatMenu.schemas.selectorPositionBorder.description,
    },

} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای ComponentFloatMenu — برای استفاده در TSchemas
 */
export type SchemasType = ExtractSchemasType<typeof Schemas>;

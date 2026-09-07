import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import {Props}             from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Schemas اختصاصی ComponentBorder
 *
 * Plan 11.2 — Schema پایه (COMPONENT + STRUCTURE) از ComponentStructureTrait
 * به‌عنوان اولین ورودی‌ها اضافه شده‌اند.
 *
 * Schema فقط تعریف می‌کند Part چیست — نه چگونه رندر شود.
 * Rendering در ComponentBorder.ts قرار دارد.
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی — اولین ورودی) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---
    BORDER: {
        part:         "part-border",
        props:        [
            Props.prop_content,
            Props.prop_contentSize,
            Props.prop_contentColor,
            Props.prop_contentColor_hover,
            Props.prop_contentBackgroundColor,
            Props.prop_contentBackgroundColor_hover,
            Props.prop_borderColor,
            Props.prop_borderColor_hover,
            Props.prop_borderClass,
            Props.prop_borderStyles,
            Props.prop_borderType,
            Props.prop_borderOpacity,
            Props.prop_borderArrowType,
            Props.prop_borderArrowWidth,
            Props.prop_borderArrowPosition,
            Props.prop_minWidth,
            Props.prop_width,
            Props.prop_borderTopLeftRadiusHas,
            Props.prop_borderTopRightRadiusHas,
            Props.prop_borderBottomLeftRadiusHas,
            Props.prop_borderBottomRightRadiusHas,
            Props.prop_borderTopHas,
            Props.prop_borderRightHas,
            Props.prop_borderBottomHas,
            Props.prop_borderLeftHas,
        ],
        name:         Keys.category.components.border.schemas.border.name,
        description:  Keys.category.components.border.schemas.border.description,
    },

} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای ComponentBorder — برای استفاده در TSchemas
 */
export type SchemasType = ExtractSchemasType<typeof Schemas>;

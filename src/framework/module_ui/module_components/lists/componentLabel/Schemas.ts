import * as CoreComponents from "@/core_components";
import {Keys}                from "../../../module_categories/languages";
// --------------------------------
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Props}                   from "./Props";
import type {
    ExtractSchemasType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Schemas — Plan 13.1.0 (Structure-First — Plan 11.2)
 *
 * قانون: Schema فقط Metadata — بدون handler/render (MUST)
 *
 * نقشه‌ی part-label پایه Legacy: به لایه‌های COMPONENT + STRUCTURE (Trait) منتقل شده —
 * رندر ریشه‌ی خود کامپوننت (renderContentComponent) جایگزین آن است.
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی — اولین ورودی‌ها) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---

    /** معادل Legacy: part-border */
    BORDER: {
        part:        "part-label-border",
        name:        Keys.category.components.label.schemas.border.name,
        description: Keys.category.components.label.schemas.border.description,
        props: [
            Props.prop_labelShow,
            Props.prop_labelBackground,
            Props.prop_labelRadius,
            Props.prop_labelMinWidth,
        ],
    },

    /** معادل Legacy: part-content — فقط container */
    BORDER_CONTENT: {
        part:        "part-label-content",
        name:        Keys.category.components.label.schemas.borderContent.name,
        description: Keys.category.components.label.schemas.borderContent.description,
        props: [],
    },

    /** معادل Legacy: part-content-label — نام BORDER_CONTENT_TITLE (وضوح بهتر) */
    BORDER_CONTENT_TITLE: {
        part:        "part-label-content-title",
        name:        Keys.category.components.label.schemas.borderContentTitle.name,
        description: Keys.category.components.label.schemas.borderContentTitle.description,
        props: [
            Props.prop_labelTitle,
            Props.prop_labelFor,
            Props.prop_labelStyle,
            Props.prop_labelClass,
            Props.prop_labelColor,
        ],
    },

    /** معادل Legacy: part-content-tooltip — هر ۶ prop tooltip */
    BORDER_CONTENT_TOOLTIP: {
        part:        "part-label-content-tooltip",
        name:        Keys.category.components.label.schemas.borderContentTooltip.name,
        description: Keys.category.components.label.schemas.borderContentTooltip.description,
        props: [
            Props.prop_labelTooltipIcon,
            Props.prop_labelTooltipDescription,
            Props.prop_labelTooltipBackground,
            Props.prop_labelTooltipColor,
            Props.prop_labelTooltipPosition,
            Props.prop_labelTooltipDirection,
        ],
    },

} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای ComponentLabel — برای استفاده در TSchema
 */
export type SchemasType = ExtractSchemasType<typeof Schemas>;
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
 * Schemas — Plan 14.1.0 (Structure-First — Plan 11.2)
 *
 * قانون: Schema فقط Metadata — بدون handler/render (MUST)
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی — اولین ورودی‌ها) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---

    /** معادل Legacy: part_float_menu */
    FLOAT_MENU: {
        part:        "part-tooltip-float-menu",
        name:        Keys.category.components.tooltip.schemas.floatMenu.name,
        description: Keys.category.components.tooltip.schemas.floatMenu.description,
        props: [
            Props.prop_tooltipIconPosition,
            Props.prop_tooltipIconClass,
            Props.prop_tooltipIconStyles,
            Props.prop_tooltipDirection,
            Props.prop_tooltipDescription,
            Props.prop_tooltipBackground,
            Props.prop_tooltipColor,
        ],
    },

    /** معادل Legacy: part_float_menu_icon */
    ICON: {
        part:        "part-tooltip-float-menu-icon",
        name:        Keys.category.components.tooltip.schemas.icon.name,
        description: Keys.category.components.tooltip.schemas.icon.description,
        props: [
            Props.prop_tooltipIcon,
            Props.prop_tooltipIconTitle,
            Props.prop_tooltipIconPosition,
        ],
    },

} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای ComponentTooltip — برای استفاده در TSchema
 */
export type SchemasType = ExtractSchemasType<typeof Schemas>;

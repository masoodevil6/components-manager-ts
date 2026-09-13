import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import {Props}             from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Schemas اختصاصی ComponentRecyclerView (Plan 15.1.0)
 *
 * Plan 11.2 — Schema پایه (COMPONENT + STRUCTURE) از ComponentStructureTrait
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی — اولین ورودی) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---
    COMPONENTS: {
        part:         "part-components",
        props:        [
            Props.prop_formClass,
            Props.prop_formStyles,
            Props.prop_formDirection,
            Props.prop_formComponents,
        ],
        name:         Keys.category.components.recyclerView.schemas.components.name,
        description:  Keys.category.components.recyclerView.schemas.components.description,
    },

} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای ComponentRecyclerView
 */
export type SchemasType = ExtractSchemasType<typeof Schemas>;

import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    ROOT: {
        part: "part-breadcrumb-with-arrow",
        props: [Props.prop_breadcrumbs],
        name: Keys.category.components.breadcrumbWithArrow.schemas.root.name,
        description: Keys.category.components.breadcrumbWithArrow.schemas.root.description,
    },
    SVG: {
        part: "part-breadcrumb-with-arrow-svg",
        props: [
            Props.prop_breadcrumbs, Props.prop_stepSelected, Props.prop_side, Props.prop_length,
            Props.prop_gap, Props.prop_height, Props.prop_marginMinPerent, Props.prop_unactiveBreadcrumb,
            Props.prop_colorUnactive, Props.prop_activeBreadcrumb, Props.prop_colorActive, Props.prop_colorShadow,
        ],
        name: Keys.category.components.breadcrumbWithArrow.schemas.svg.name,
        description: Keys.category.components.breadcrumbWithArrow.schemas.svg.description,
    },
    STEP: {
        part: "part-breadcrumb-with-arrow-step",
        props: [
            Props.prop_stepSelected, Props.prop_side, Props.prop_length, Props.prop_gap, Props.prop_height,
            Props.prop_unactiveBreadcrumb, Props.prop_colorUnactive, Props.prop_activeBreadcrumb,
            Props.prop_colorActive, Props.prop_colorShadow,
        ],
        name: Keys.category.components.breadcrumbWithArrow.schemas.step.name,
        description: Keys.category.components.breadcrumbWithArrow.schemas.step.description,
    },
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

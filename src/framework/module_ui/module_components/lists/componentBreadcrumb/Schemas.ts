import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    SCROLLER: {
        part: "part-breadcrumb-scroller",
        props: [],
        name: Keys.category.components.breadcrumb.schemas.scroller.name,
        description: Keys.category.components.breadcrumb.schemas.scroller.description,
    },
    BACK_BUTTON: {
        part: "part-breadcrumb-back-button",
        props: [Props.prop_showBtn],
        name: Keys.category.components.breadcrumb.schemas.backButton.name,
        description: Keys.category.components.breadcrumb.schemas.backButton.description,
    },
    BREADCRUMBS: {
        part: "part-breadcrumb-items",
        props: [
            Props.prop_breadcrumbs,
            Props.prop_stepSelected,
            Props.prop_unactiveBreadcrumb,
            Props.prop_colorUnactive,
            Props.prop_activeBreadcrumb,
            Props.prop_colorActive,
        ],
        name: Keys.category.components.breadcrumb.schemas.breadcrumbs.name,
        description: Keys.category.components.breadcrumb.schemas.breadcrumbs.description,
    },
    BREADCRUMB_ITEM: {
        part: "part-breadcrumb-item",
        props: [
            Props.prop_stepSelected,
            Props.prop_unactiveBreadcrumb,
            Props.prop_colorUnactive,
            Props.prop_activeBreadcrumb,
            Props.prop_colorActive,
        ],
        name: Keys.category.components.breadcrumb.schemas.breadcrumbItem.name,
        description: Keys.category.components.breadcrumb.schemas.breadcrumbItem.description,
    },
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

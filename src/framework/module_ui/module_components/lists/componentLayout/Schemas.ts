import * as CoreComponents from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

const translation = Keys.category.components.layout;

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    LAYOUT: {
        part: "part-layout",
        props: [Props.prop_col, Props.prop_layoutClass, Props.prop_layoutStyles, Props.prop_layoutContent],
        name: translation.schemas.layout.name,
        description: translation.schemas.layout.description,
    },
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

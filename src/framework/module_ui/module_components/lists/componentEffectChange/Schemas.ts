import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

const labels = Keys.category.components.effectChange.schemas;

export const Schemas = {
    ...ComponentStructureTrait.schemas,
    ROOT: {
        part: "part-effect-change",
        props: [
            Props.prop_content,
            Props.prop_mode,
            Props.prop_changeDirection,
            Props.prop_duration,
            Props.prop_easing,
            Props.prop_respectReducedMotion,
        ],
        name: labels.root.name,
        description: labels.root.description,
    },
    CONTENT: {
        part: "part-effect-change-content",
        props: [Props.prop_content],
        name: labels.content.name,
        description: labels.content.description,
    },
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

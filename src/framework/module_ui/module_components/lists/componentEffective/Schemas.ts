import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import * as ComponentBorder from "../componentBorder";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

const labels = Keys.category.components.effective.schemas;

export const Schemas = {
    ...ComponentStructureTrait.schemas,
    ROOT: {
        part: "part-effective",
        props: [
            Props.prop_isVisible,
            Props.prop_showMode,
            Props.prop_hideMode,
            Props.prop_showDuration,
            Props.prop_hideDuration,
            Props.prop_easing,
            Props.prop_collapseSpaceWhenHidden,
        ],
        name: labels.root.name,
        description: labels.root.description,
    },
    BORDER: {
        part: "part-effective-border",
        props: Object.values(ComponentBorder.Props),
        name: labels.border.name,
        description: labels.border.description,
    },
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

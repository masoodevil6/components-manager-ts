import * as CoreComponents from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    ROOT: {
        part: "part-custom-form-root",
        props: [
            Props.prop_customFormMode,
            Props.prop_customFormGroups,
            Props.prop_customFormValues,
            Props.prop_customFormFormOptions,
            Props.prop_customFormLayoutClass,
            Props.prop_customFormLayoutStyles,
        ],
        name: Keys.category.components.fetch.form.customForm.schemas.root.name,
        description: Keys.category.components.fetch.form.customForm.schemas.root.description,
    },
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

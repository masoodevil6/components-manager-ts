import * as CoreComponents from "@/core_components";
import { ComponentStructureTrait } from "../../traits/componentStructureTrait";
import { ComponentLabelTrait } from "../../traits/componentLabelTrait";
import { Keys } from "../../../module_categories/languages";
import { Props } from "./Props";
import type { ExtractSchemasType } from "../../tools/type/TypeHelpers";

const translation = Keys.category.components.inputGroup.schemas;

export const Schemas = {
  COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
  STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
  ...ComponentLabelTrait.schemas,
  FORM: {
    part: "part-input-group-form",
    props: [Props.prop_backgroundColorForm, Props.prop_formBorderRadius, Props.prop_inputs, Props.prop_groupSelected],
    name: translation.form.name,
    description: translation.form.description,
  },
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

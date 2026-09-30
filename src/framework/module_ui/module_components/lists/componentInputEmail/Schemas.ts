import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

const schemaText = Keys.category.components.input.schemas;
export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    ...ComponentLabelTrait.schemas,
    FORM: {part: "part-input-email-form", props: [Props.prop_backgroundColorForm, Props.prop_formBorderRadius, Props.prop_isDisable], name: schemaText.form.name, description: schemaText.form.description},
    ICON: {part: "part-input-email-icon", props: [Props.prop_icon, Props.prop_iconEmail, Props.prop_colorIcon, Props.prop_isDisable], name: schemaText.icon.name, description: schemaText.icon.description},
    INPUT: {part: "part-input-email-input", props: [Props.prop_name, Props.prop_value, Props.prop_isDisable, Props.prop_inputClass, Props.prop_inputStyles, Props.prop_placeholder], name: schemaText.input.name, description: schemaText.input.description},
    VALIDATE: {part: "part-input-email-validate", props: [Props.prop_title, Props.prop_hasRules, Props.prop_isAbsoluteRule, Props.prop_listRules, Props.prop_msgRules, Props.prop_value, Props.prop_isDisable], name: schemaText.validate.name, description: schemaText.validate.description},
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

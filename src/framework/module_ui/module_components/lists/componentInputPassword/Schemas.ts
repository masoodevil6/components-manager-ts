import * as CoreComponents from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

const schemaText = Keys.category.components.input.schemas;
export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    ...ComponentLabelTrait.schemas,
    FORM: {part: "part-input-password-form", props: [Props.prop_backgroundColorForm, Props.prop_formBorderRadius, Props.prop_isDisable], name: schemaText.form.name, description: schemaText.form.description},
    ICON: {part: "part-input-password-icon", props: [Props.prop_icon, Props.prop_colorIcon, Props.prop_isDisable], name: schemaText.icon.name, description: schemaText.icon.description},
    INPUT: {part: "part-input-password-input", props: [Props.prop_name, Props.prop_value, Props.prop_isDisable, Props.prop_inputClass, Props.prop_inputStyles, Props.prop_placeholder], name: schemaText.input.name, description: schemaText.input.description},
    VISIBILITY: {part: "part-input-password-icon-visibility", props: [Props.prop_isDisable], name: schemaText.icon.name, description: schemaText.icon.description},
    VALIDATE: {part: "part-input-password-validate", props: [Props.prop_title, Props.prop_hasRules, Props.prop_isAbsoluteRule, Props.prop_listRules, Props.prop_msgRules, Props.prop_value], name: Keys.category.components.input.schemas.validate.name, description: Keys.category.components.input.schemas.validate.description},
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

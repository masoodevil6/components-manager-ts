import * as CoreComponents from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

const translation = Keys.category.components.inputDescription;

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    ...ComponentLabelTrait.schemas,
    FORM: {part: "part-input-description-form", props: [Props.prop_backgroundColorForm, Props.prop_formBorderRadius], name: translation.schemas.form.name, description: translation.schemas.form.description},
    DESCRIPTION: {part: "part-input-description-input", props: [Props.prop_name, Props.prop_value, Props.prop_isDisable, Props.prop_placeholder, Props.prop_rows, Props.prop_resize, Props.prop_inputClass, Props.prop_inputStyles, Props.prop_inputBorderColor, Props.prop_inputBorderColorFocus, Props.prop_inputBorderWidth, Props.prop_inputBorderRadius], name: translation.schemas.description.name, description: translation.schemas.description.description},
    VALIDATE: {part: "part-input-description-validate", props: [Props.prop_title, Props.prop_hasRules, Props.prop_isAbsoluteRule, Props.prop_listRules, Props.prop_msgRules, Props.prop_value], name: translation.schemas.validate.name, description: translation.schemas.validate.description},
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

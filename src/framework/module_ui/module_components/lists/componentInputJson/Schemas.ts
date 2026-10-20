import * as CoreComponents from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

const translation = Keys.category.components.inputJson.schemas;

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    ...ComponentLabelTrait.schemas,
    FORM: {part: "part-input-json-form", props: [Props.prop_backgroundColorForm, Props.prop_formBorderRadius], name: translation.form.name, description: translation.form.description},
    HEADER: {part: "part-input-json-form-header", props: [Props.prop_headerTitle], name: translation.header.name, description: translation.header.description},
    EDITOR: {part: "part-input-json-form-editor", props: [Props.prop_editorHeight], name: translation.editor.name, description: translation.editor.description},
    CODE: {part: "part-input-json-code", props: [Props.prop_name, Props.prop_value, Props.prop_isDisable, Props.prop_placeholder, Props.prop_editorHeight, Props.prop_numbersBackgroundColor, Props.prop_numbersColor, Props.prop_numberActiveBackgroundColor, Props.prop_lineActiveBackgroundColor, Props.prop_themeLightBackgroundColor, Props.prop_themeDarkBackgroundColor, Props.prop_isDarkTheme], name: translation.code.name, description: translation.code.description},
    ERROR: {part: "part-input-json-error", props: [], name: translation.error.name, description: translation.error.description},
    PREVIEW: {part: "part-input-json-preview", props: [], name: translation.preview.name, description: translation.preview.description},
    VALIDATE: {part: "part-input-json-validate", props: [Props.prop_title, Props.prop_hasRules, Props.prop_isAbsoluteRule, Props.prop_listRules, Props.prop_msgRules, Props.prop_value], name: translation.validate.name, description: translation.validate.description},
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

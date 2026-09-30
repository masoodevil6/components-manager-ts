import * as CoreComponents from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    ...ComponentLabelTrait.schemas,
    FORM: {part: "part-input-form", props: [Props.prop_backgroundColorForm, Props.prop_formBorderRadius], name: Keys.category.components.input.schemas.form.name, description: Keys.category.components.input.schemas.form.description},
    INPUT: {part: "part-input-input", props: [Props.prop_name, Props.prop_value, Props.prop_isDisable, Props.prop_inputClass, Props.prop_inputStyles, Props.prop_type, Props.prop_placeholder], name: Keys.category.components.input.schemas.input.name, description: Keys.category.components.input.schemas.input.description},
    ICON: {part: "part-input-icon", props: [Props.prop_icon, Props.prop_colorIcon], name: Keys.category.components.input.schemas.icon.name, description: Keys.category.components.input.schemas.icon.description},
    BUTTON: {part: "part-input-button", props: [Props.prop_btnAddStatus, Props.prop_btnAddWidth, Props.prop_btnAddTitle, Props.prop_btnAddClass, Props.prop_btnColor, Props.prop_isDisable], name: Keys.category.components.input.schemas.button.name, description: Keys.category.components.input.schemas.button.description},
    VALIDATE: {part: "part-input-validate", props: [Props.prop_title, Props.prop_hasRules, Props.prop_isAbsoluteRule, Props.prop_listRules, Props.prop_msgRules, Props.prop_value], name: Keys.category.components.input.schemas.validate.name, description: Keys.category.components.input.schemas.validate.description},
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

const translation = Keys.category.components.inputSelectOption.schemas;

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    ...ComponentLabelTrait.schemas,
    FORM: {part: "part-input-select-option-form", props: [Props.prop_backgroundColorForm, Props.prop_formBorderRadius], name: translation.form.name, description: translation.form.description},
    SELECT: {part: "part-input-select-option-select", props: [Props.prop_name, Props.prop_itemSelected, Props.prop_options, Props.prop_placeholder, Props.prop_isDisable, Props.prop_inputClass, Props.prop_inputStyles], name: translation.select.name, description: translation.select.description},
    ICON: {part: "part-input-select-option-icon", props: [Props.prop_icon, Props.prop_colorIcon], name: Keys.category.components.input.schemas.icon.name, description: Keys.category.components.input.schemas.icon.description},
    BUTTON: {part: "part-input-select-option-button", props: [Props.prop_btnAddStatus, Props.prop_btnAddWidth, Props.prop_btnAddTitle, Props.prop_btnAddClass, Props.prop_btnColor, Props.prop_isDisable], name: Keys.category.components.input.schemas.button.name, description: Keys.category.components.input.schemas.button.description},
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

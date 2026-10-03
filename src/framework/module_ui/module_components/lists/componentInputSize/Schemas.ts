import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    ...ComponentLabelTrait.schemas,
    FORM: {part: "part-input-size-form", props: [Props.prop_backgroundColorForm, Props.prop_formBorderRadius], name: Keys.category.components.inputSize.schemas.form.name, description: Keys.category.components.inputSize.schemas.form.description},
    ICON: {part: "part-input-size-icon", props: [Props.prop_icon, Props.prop_colorIcon, Props.prop_isDisable], name: Keys.category.components.inputSize.schemas.icon.name, description: Keys.category.components.inputSize.schemas.icon.description},
    INPUT: {part: "part-input-size-input", props: [Props.prop_name, Props.prop_value, Props.prop_isDisable, Props.prop_inputClass, Props.prop_inputStyles, Props.prop_placeholder, Props.prop_min, Props.prop_max], name: Keys.category.components.inputSize.schemas.input.name, description: Keys.category.components.inputSize.schemas.input.description},
    BUTTON_DECREMENT: {part: "part-input-size-button-decrement", props: [Props.prop_isDisable, Props.prop_buttonsWidth, Props.prop_iconDecrement, Props.prop_min], name: Keys.category.components.inputSize.schemas.decrement.name, description: Keys.category.components.inputSize.schemas.decrement.description},
    BUTTON_INCREMENT: {part: "part-input-size-button-increment", props: [Props.prop_isDisable, Props.prop_buttonsWidth, Props.prop_iconIncrement, Props.prop_max], name: Keys.category.components.inputSize.schemas.increment.name, description: Keys.category.components.inputSize.schemas.increment.description},
    VALIDATE: {part: "part-input-size-validate", props: [Props.prop_hasRules, Props.prop_isAbsoluteRule, Props.prop_listRules, Props.prop_msgRules, Props.prop_title, Props.prop_value, ComponentLabelTrait.props.prop_labelTitle, Props.prop_isDisable], name: Keys.category.components.inputSize.schemas.validate.name, description: Keys.category.components.inputSize.schemas.validate.description},
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

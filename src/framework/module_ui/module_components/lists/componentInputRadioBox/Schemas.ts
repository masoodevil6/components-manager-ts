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
    FORM: {part: "part-input-radio-box-form", props: [Props.prop_direction, Props.prop_options, Props.prop_isDisable], name: Keys.category.components.inputRadioBox.schemas.form.name, description: Keys.category.components.inputRadioBox.schemas.form.description},
    OPTIONS: {part: "part-input-radio-box-options", props: [Props.prop_options, Props.prop_itemSelected, Props.prop_direction, Props.prop_isDisable], name: Keys.category.components.inputRadioBox.schemas.options.name, description: Keys.category.components.inputRadioBox.schemas.options.description},
    OPTION: {part: "part-input-radio-box-option", props: [Props.prop_options, Props.prop_itemSelected, Props.prop_isDisable], name: Keys.category.components.inputRadioBox.schemas.option.name, description: Keys.category.components.inputRadioBox.schemas.option.description},
    OPTION_CONTROL: {part: "part-input-radio-box-option-control", props: [Props.prop_itemSelected, Props.prop_isDisable, Props.prop_borderIconClass, Props.prop_borderIconStyles, Props.prop_borderIconColor_selected, Props.prop_borderIconColor_unSelected, Props.prop_borderIconColor_disable, Props.prop_borderIconWidth, Props.prop_borderIconRadius, Props.prop_borderIconOpacity, Props.prop_borderIconBackground_selected, Props.prop_borderIconBackground_unSelected, Props.prop_borderIconBackground_disable], name: Keys.category.components.inputRadioBox.schemas.optionControl.name, description: Keys.category.components.inputRadioBox.schemas.optionControl.description},
    OPTION_ICON: {part: "part-input-radio-box-option-icon", props: [Props.prop_itemSelected, Props.prop_icon, Props.prop_iconClass, Props.prop_iconStyles], name: Keys.category.components.inputRadioBox.schemas.optionIcon.name, description: Keys.category.components.inputRadioBox.schemas.optionIcon.description},
    OPTION_TITLE: {part: "part-input-radio-box-option-title", props: [Props.prop_itemSelected, Props.prop_isDisable, Props.prop_titleShow, Props.prop_titleClass, Props.prop_titleStyles, Props.prop_titleColor_selected, Props.prop_titleColor_unSelected, Props.prop_titleColor_disable], name: Keys.category.components.inputRadioBox.schemas.optionTitle.name, description: Keys.category.components.inputRadioBox.schemas.optionTitle.description},
    OPTION_BODY: {part: "part-input-radio-box-option-body", props: [Props.prop_options, Props.prop_itemSelected, Props.prop_direction], name: Keys.category.components.inputRadioBox.schemas.optionBody.name, description: Keys.category.components.inputRadioBox.schemas.optionBody.description},
    SHARED_BODY: {part: "part-input-radio-box-shared-body", props: [Props.prop_options, Props.prop_itemSelected, Props.prop_direction], name: Keys.category.components.inputRadioBox.schemas.sharedBody.name, description: Keys.category.components.inputRadioBox.schemas.sharedBody.description},
    VALIDATE: {part: "part-input-radio-box-validate", props: [Props.prop_title, Props.prop_itemSelected, Props.prop_isAbsoluteRule, Props.prop_listRules, Props.prop_msgRules, Props.prop_isDisable], name: Keys.category.components.inputRadioBox.schemas.validate.name, description: Keys.category.components.inputRadioBox.schemas.validate.description},
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

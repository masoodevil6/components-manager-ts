import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

const texts = Keys.category.components.input;
export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    ...ComponentLabelTrait.schemas,
    FORM: {part: "part-input-phone-form", props: [Props.prop_backgroundColorForm, Props.prop_formBorderRadius], name: texts.schemas.form.name, description: texts.schemas.form.description},
    ICON: {part: "part-input-phone-icon", props: [Props.prop_icon, Props.prop_colorIcon, Props.prop_isDisable], name: texts.schemas.icon.name, description: texts.schemas.icon.description},
    COUNTRY_SELECT: {part: "part-input-phone-country-select", props: [Props.prop_countryHas, Props.prop_countryWidth, Props.prop_countryOptions, Props.prop_countryValue, Props.prop_isDisable, Props.prop_name], name: Keys.category.components.inputPhone.schemas.countrySelect.name, description: Keys.category.components.inputPhone.schemas.countrySelect.description},
    CITY_SELECT: {part: "part-input-phone-city-select", props: [Props.prop_cityHas, Props.prop_cityWidth, Props.prop_cityOptions, Props.prop_cityValue, Props.prop_countryValue, Props.prop_countryHas, Props.prop_isDisable, Props.prop_name], name: Keys.category.components.inputPhone.schemas.citySelect.name, description: Keys.category.components.inputPhone.schemas.citySelect.description},
    INPUT: {part: "part-input-phone-input", props: [Props.prop_name, Props.prop_value, Props.prop_isDisable, Props.prop_inputClass, Props.prop_inputStyles, Props.prop_placeholder], name: texts.schemas.input.name, description: texts.schemas.input.description},
    VALIDATE: {part: "part-input-phone-validate", props: [Props.prop_hasRules, Props.prop_isAbsoluteRule, Props.prop_listRules, Props.prop_msgRules, Props.prop_title, Props.prop_value, ComponentLabelTrait.props.prop_labelTitle, Props.prop_isDisable], name: texts.schemas.validate.name, description: texts.schemas.validate.description},
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

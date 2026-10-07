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
    FORM: {part: "part-input-price-form", props: [Props.prop_value], name: Keys.category.components.inputPrice.schemas.form.name, description: Keys.category.components.inputPrice.schemas.form.description},
    VALIDATE: {part: "part-input-price-validate", props: [Props.prop_value, Props.prop_title, Props.prop_hasRules, Props.prop_isAbsoluteRule, Props.prop_listRules, Props.prop_msgRules], name: Keys.category.components.input.schemas.validate.name, description: Keys.category.components.input.schemas.validate.description},
    CALCULATOR: {part: "part-input-price-calculator", props: [Props.prop_value, Props.prop_calculator, Props.prop_calculatorColor], name: Keys.category.components.inputPrice.schemas.calculator.name, description: Keys.category.components.inputPrice.schemas.calculator.description},
    INFORMATION: {part: "part-input-price-information", props: [Props.prop_information], name: Keys.category.components.inputPrice.schemas.information.name, description: Keys.category.components.inputPrice.schemas.information.description},
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

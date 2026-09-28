import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    FORM: {part: "part-input-simple-form", props: [Props.prop_inputDisable, Props.prop_inputBorderTopLeftRadiusHas, Props.prop_inputBorderTopRightRadiusHas, Props.prop_inputBorderBottomLeftRadiusHas, Props.prop_inputBorderBottomRightRadiusHas, Props.prop_inputBorderTopHas, Props.prop_inputBorderRightHas, Props.prop_inputBorderBottomHas, Props.prop_inputBorderLeftHas], name: Keys.category.components.inputSimple.schemas.form.name, description: Keys.category.components.inputSimple.schemas.form.description},
    INPUT: {part: "part-input-simple-input", props: [Props.prop_inputName, Props.prop_inputDisable, Props.prop_inputValue, Props.prop_inputClass, Props.prop_inputStyles, Props.prop_inputType, Props.prop_inputPlaceholder, Props.prop_inputFor], name: Keys.category.components.inputSimple.schemas.input.name, description: Keys.category.components.inputSimple.schemas.input.description},
    CLEAR_ICON: {part: "part-input-simple-clear-icon", props: [Props.prop_inputDisable], name: Keys.category.components.inputSimple.schemas.clearIcon.name, description: Keys.category.components.inputSimple.schemas.clearIcon.description},
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

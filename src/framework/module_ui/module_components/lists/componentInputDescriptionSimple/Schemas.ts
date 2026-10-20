import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

const translation = Keys.category.components.simpleComponent.inputDescriptionSimple;

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    FORM: {part: "part-input-description-simple-form", props: [Props.prop_inputDisable, Props.prop_inputBorderColor, Props.prop_inputBorderColorFocus, Props.prop_inputBorderWidth, Props.prop_inputBorderRadius, Props.prop_inputBorderTopLeftRadiusHas, Props.prop_inputBorderTopRightRadiusHas, Props.prop_inputBorderBottomLeftRadiusHas, Props.prop_inputBorderBottomRightRadiusHas, Props.prop_inputBorderTopHas, Props.prop_inputBorderRightHas, Props.prop_inputBorderBottomHas, Props.prop_inputBorderLeftHas], name: translation.schemas.form.name, description: translation.schemas.form.description},
    TEXTAREA: {part: "part-input-description-simple-textarea", props: [Props.prop_inputName, Props.prop_inputDisable, Props.prop_inputValue, Props.prop_inputClass, Props.prop_inputStyles, Props.prop_inputPlaceholder, Props.prop_inputRows, Props.prop_inputResize], name: translation.schemas.textarea.name, description: translation.schemas.textarea.description},
    CLEAR_ICON: {part: "part-input-description-simple-clear-icon", props: [Props.prop_inputDisable, Props.prop_inputValue], name: translation.schemas.clearIcon.name, description: translation.schemas.clearIcon.description},
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

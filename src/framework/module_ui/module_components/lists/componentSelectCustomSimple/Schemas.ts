import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    FORM: {part: "part-select-custom-simple-form", props: [Props.prop_selectDisable], name: Keys.category.components.selectCustomSimple.schemas.form.name, description: Keys.category.components.selectCustomSimple.schemas.form.description},
    FORM_VALUE: {part: "part-select-custom-simple-value", props: [Props.prop_selectName, Props.prop_selectValue, Props.prop_selectDisable], name: Keys.category.components.selectCustomSimple.schemas.formValue.name, description: Keys.category.components.selectCustomSimple.schemas.formValue.description},
    SELECT: {part: "part-select-custom-simple-select", props: [Props.prop_selectDisable], name: Keys.category.components.selectCustomSimple.schemas.select.name, description: Keys.category.components.selectCustomSimple.schemas.select.description},
    SELECT_HEADER: {part: "part-select-custom-simple-header", props: [Props.prop_selectDisable, Props.prop_selectClass, Props.prop_selectStyles, Props.prop_selectBorderTopLeftRadiusHas, Props.prop_selectBorderTopRightRadiusHas, Props.prop_selectBorderBottomLeftRadiusHas, Props.prop_selectBorderBottomRightRadiusHas, Props.prop_selectBorderTopHas, Props.prop_selectBorderRightHas, Props.prop_selectBorderBottomHas, Props.prop_selectBorderLeftHas], name: Keys.category.components.selectCustomSimple.schemas.selectHeader.name, description: Keys.category.components.selectCustomSimple.schemas.selectHeader.description},
    SELECT_HEADER_TEXT: {part: "part-select-custom-simple-header-text", props: [Props.prop_selectValue, Props.prop_selectPlaceholder, Props.prop_selectOptions, Props.prop_selectTypeShow], name: Keys.category.components.selectCustomSimple.schemas.selectHeaderText.name, description: Keys.category.components.selectCustomSimple.schemas.selectHeaderText.description},
    SELECT_HEADER_ICON: {part: "part-select-custom-simple-header-icon", props: [], name: Keys.category.components.selectCustomSimple.schemas.selectHeaderIcon.name, description: Keys.category.components.selectCustomSimple.schemas.selectHeaderIcon.description},
    SELECT_BODY: {part: "part-select-custom-simple-body", props: [Props.prop_selectOptions, Props.prop_selectValue, Props.prop_selectDisable], name: Keys.category.components.selectCustomSimple.schemas.selectBody.name, description: Keys.category.components.selectCustomSimple.schemas.selectBody.description},
    SELECT_SEARCH: {part: "part-select-custom-simple-search", props: [Props.prop_selectDisable], name: Keys.category.components.selectCustomSimple.schemas.selectSearch.name, description: Keys.category.components.selectCustomSimple.schemas.selectSearch.description},
    SELECT_OPTIONS: {part: "part-select-custom-simple-options", props: [Props.prop_selectOptions, Props.prop_selectValue, Props.prop_selectDisable], name: Keys.category.components.selectCustomSimple.schemas.selectOptions.name, description: Keys.category.components.selectCustomSimple.schemas.selectOptions.description},
    SELECT_OPTION: {part: "part-select-custom-simple-option", props: [Props.prop_selectValue], name: Keys.category.components.selectCustomSimple.schemas.selectOption.name, description: Keys.category.components.selectCustomSimple.schemas.selectOption.description},
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

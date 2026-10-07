import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

const text = Keys.category.components.inputColor.schemas;
export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    ...ComponentLabelTrait.schemas,
    FORM: {part: "part-input-color-form", props: [Props.prop_isDisable, Props.prop_colorSelector], name: text.form.name, description: text.form.description},
    FORM_COLOR_BOX: {part: "part-input-color-form-color-box", props: [Props.prop_value, Props.prop_colorSelected, Props.prop_isDisable, Props.prop_borderColor, Props.prop_formClass, Props.prop_formStyles, Props.prop_colorSelector], name: text.formColorBox.name, description: text.formColorBox.description},
    FORM_COLOR_TEXT: {part: "part-input-color-form-color-text", props: [Props.prop_value, Props.prop_colorSelected, Props.prop_showTitleFront, Props.prop_colorSelector], name: text.formColorText.name, description: text.formColorText.description},
    FORM_ICON: {part: "part-input-color-form-icon", props: [Props.prop_isDisable, Props.prop_colorIconClear], name: text.formIcon.name, description: text.formIcon.description},
    // Backward-compatible part aliases.
    SWATCH: {part: "part-input-color-swatch", props: [Props.prop_value, Props.prop_colorSelected, Props.prop_isDisable, Props.prop_borderColor, Props.prop_formClass, Props.prop_formStyles], name: text.swatch.name, description: text.swatch.description},
    TITLE: {part: "part-input-color-title", props: [Props.prop_value, Props.prop_colorSelected, Props.prop_showTitleFront], name: text.title.name, description: text.title.description},
    ICON_EMPTY: {part: "part-input-color-icon-empty", props: [Props.prop_isDisable, Props.prop_colorIconEmpty], name: text.iconEmpty.name, description: text.iconEmpty.description},
    ICON_CLEAR: {part: "part-input-color-icon-clear", props: [Props.prop_isDisable, Props.prop_colorIconClear], name: text.iconClear.name, description: text.iconClear.description},
    PICKER: {part: "part-input-color-picker", props: [Props.prop_optionWidth, Props.prop_optionHeight, Props.prop_optionStyles, Props.prop_backgroundColorBody, Props.prop_colorBody], name: text.picker.name, description: text.picker.description},
    SL_AREA: {part: "part-input-color-sl-area", props: [Props.prop_optionWidth], name: text.slArea.name, description: text.slArea.description},
    HUE: {part: "part-input-color-hue", props: [Props.prop_optionWidth], name: text.hue.name, description: text.hue.description},
    OPACITY: {part: "part-input-color-opacity", props: [Props.prop_optionWidth], name: text.opacity.name, description: text.opacity.description},
    INFO_HEX: {part: "part-input-color-info-hex", props: [Props.prop_colorBody], name: text.infoHex.name, description: text.infoHex.description},
    INFO_OPACITY: {part: "part-input-color-info-opacity", props: [Props.prop_colorBody], name: text.infoOpacity.name, description: text.infoOpacity.description},
    INFO_FORMATS: {part: "part-input-color-info-formats", props: [Props.prop_colorBody], name: text.infoFormats.name, description: text.infoFormats.description},
    VALIDATE: {part: "part-input-color-validate", props: [Props.prop_hasRules, Props.prop_isAbsoluteRule, Props.prop_listRules, Props.prop_msgRules, Props.prop_title, Props.prop_value, ComponentLabelTrait.props.prop_labelTitle, Props.prop_isDisable], name: text.validate.name, description: text.validate.description},
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

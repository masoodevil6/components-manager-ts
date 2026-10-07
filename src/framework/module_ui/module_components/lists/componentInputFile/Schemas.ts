import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

const text = Keys.category.components.inputFile.schemas;
export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    ...ComponentLabelTrait.schemas,
    FORM: {part: "part-input-file-form", props: [Props.prop_isDisable], name: text.form.name, description: text.form.description},
    VALUE: {part: "part-input-file-value", props: [Props.prop_name, Props.prop_accept, Props.prop_maxCount, Props.prop_isDisable], name: text.value.name, description: text.value.description},
    DROP_ZONE: {part: "part-input-file-drop-zone", props: [Props.prop_isDisable, Props.prop_borderColor, Props.prop_borderColorHover, Props.prop_borderHeight], name: text.dropZone.name, description: text.dropZone.description},
    DROP_ZONE_TEXT: {part: "part-input-file-drop-zone-text", props: [Props.prop_text, Props.prop_textColor], name: text.dropZoneText.name, description: text.dropZoneText.description},
    FILES: {part: "part-input-file-list", props: [Props.prop_showListFiles], name: text.files.name, description: text.files.description},
    FILE_ITEM: {part: "part-input-file-file-item", props: [], name: text.fileItem.name, description: text.fileItem.description},
    FILE_ITEM_INVALID: {part: "part-input-file-file-item-invalid", props: [], name: text.fileItemInvalid.name, description: text.fileItemInvalid.description},
    DELETE_CONFIRM: {part: "part-input-file-delete-confirm", props: [Props.prop_deleteBody, Props.prop_deleteBtnCancel, Props.prop_deleteBtnAccept], name: text.deleteConfirm.name, description: text.deleteConfirm.description},
    VALIDATE: {part: "part-input-file-validate", props: [Props.prop_hasRules, Props.prop_isAbsoluteRule, Props.prop_listRules, Props.prop_msgRules, Props.prop_title, Props.prop_isDisable], name: text.validate.name, description: text.validate.description},
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

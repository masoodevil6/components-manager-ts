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
    MAIN: {part:"part-input-acl-main", props:[Props.prop_name,Props.prop_value,Props.prop_title,Props.prop_isDisable], name:Keys.category.components.inputAcl.schemas.main.name, description:Keys.category.components.inputAcl.schemas.main.description},
    MENU: {part:"part-input-acl-menu", props:[Props.prop_requestUrl,Props.prop_bodyHeight,Props.prop_bodyTop,Props.prop_isDisable], name:Keys.category.components.inputAcl.schemas.menu.name, description:Keys.category.components.inputAcl.schemas.menu.description},
    SEARCH: {part:"part-input-acl-search", props:[Props.prop_requestTimout], name:Keys.category.components.inputAcl.schemas.search.name, description:Keys.category.components.inputAcl.schemas.search.description},
    AVAILABLE_LIST: {part:"part-input-acl-available-list", props:[Props.prop_requestCount], name:Keys.category.components.inputAcl.schemas.availableList.name, description:Keys.category.components.inputAcl.schemas.availableList.description},
    SELECTED_LIST: {part:"part-input-acl-selected-list", props:[Props.prop_value], name:Keys.category.components.inputAcl.schemas.selectedList.name, description:Keys.category.components.inputAcl.schemas.selectedList.description},
    VALIDATE: {part:"part-input-acl-validate", props:[Props.prop_title,Props.prop_value,Props.prop_hasRules,Props.prop_isAbsoluteRule,Props.prop_listRules,Props.prop_msgRules], name:Keys.category.components.inputAcl.schemas.validate.name, description:Keys.category.components.inputAcl.schemas.validate.description},
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

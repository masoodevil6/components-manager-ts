import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    ROOT: {part: "part-page-header", props: [], name: Keys.category.components.pageHeader.schemas.root.name, description: Keys.category.components.pageHeader.schemas.root.description},
    FORM: {part: "part-page-header-form", props: [Props.prop_backgroundForm, Props.prop_formClass, Props.prop_formStyles], name: Keys.category.components.pageHeader.schemas.form.name, description: Keys.category.components.pageHeader.schemas.form.description},
    MAIN: {part: "part-page-header-main", props: [Props.prop_size], name: Keys.category.components.pageHeader.schemas.main.name, description: Keys.category.components.pageHeader.schemas.main.description},
    OPTIONS: {part: "part-page-header-options", props: [], name: Keys.category.components.pageHeader.schemas.options.name, description: Keys.category.components.pageHeader.schemas.options.description},
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

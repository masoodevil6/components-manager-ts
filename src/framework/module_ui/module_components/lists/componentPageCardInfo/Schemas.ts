import * as CoreComponents from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

const schemaKeys = Keys.category.components.pageCardInfo.schemas;

export const Schemas = {
    ...ComponentStructureTrait.schemas,
    ROOT: {
        part: "part-page-card-info",
        props: [Props.prop_formClass, Props.prop_formStyles],
        name: schemaKeys.root.name,
        description: schemaKeys.root.description,
    },
    LAYOUT: {
        part: "part-page-card-info-layout",
        props: [],
        name: schemaKeys.layout.name,
        description: schemaKeys.layout.description,
    },
    ICON: {
        part: "part-page-card-info-icon",
        props: [Props.prop_icon, Props.prop_iconColor, Props.prop_iconSize],
        name: schemaKeys.icon.name,
        description: schemaKeys.icon.description,
    },
    DESCRIPTION: {
        part: "part-page-card-info-description",
        props: [Props.prop_description],
        name: schemaKeys.description.name,
        description: schemaKeys.description.description,
    },
    BUTTON: {
        part: "part-page-card-info-button",
        props: [Props.prop_hasBtn, Props.prop_titleBtn, Props.prop_iconBtn, Props.prop_colorIconBtn],
        name: schemaKeys.button.name,
        description: schemaKeys.button.description,
    },
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

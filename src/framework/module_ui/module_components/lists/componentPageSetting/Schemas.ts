import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

export const Schemas = {
    PAGE_SETTING: {
        part: "part-page-setting",
        props: [Props.prop_content, Props.prop_contentScrollY, Props.prop_sidebarWidth, Props.prop_sidebarIsOpen, Props.prop_sidebarHasOpenIcon],
        name: Keys.category.components.basic.pageSetting.schemas.root.name,
        description: Keys.category.components.basic.pageSetting.schemas.root.description,
    },
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

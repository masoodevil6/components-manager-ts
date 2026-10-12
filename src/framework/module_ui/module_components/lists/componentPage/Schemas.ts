import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: {
        ...ComponentStructureTrait.schemas.STRUCTURE,
        props: [
            ...ComponentStructureTrait.schemas.STRUCTURE.props,
            Props.prop_contentBackgroundColor,
        ],
    },
    ROOT: {
        part: "part-page",
        props: [Props.prop_isFullHeight],
        name: Keys.category.components.page.schemas.root.name,
        description: Keys.category.components.page.schemas.root.description,
    },
    HEADER: {
        part: "part-page-header",
        props: [Props.prop_header],
        name: Keys.category.components.page.schemas.header.name,
        description: Keys.category.components.page.schemas.header.description,
    },
    NAVIGATION: {
        part: "part-page-navigation",
        props: [Props.prop_navigation],
        name: Keys.category.components.page.schemas.navigation.name,
        description: Keys.category.components.page.schemas.navigation.description,
    },
    BODY: {
        part: "part-page-body",
        props: [],
        name: Keys.category.components.page.schemas.body.name,
        description: Keys.category.components.page.schemas.body.description,
    },
    CONTENT: {
        part: "part-page-content",
        props: [Props.prop_content],
        name: Keys.category.components.page.schemas.content.name,
        description: Keys.category.components.page.schemas.content.description,
    },
    ASIDE: {
        part: "part-page-aside",
        props: [Props.prop_aside, Props.prop_asideWidth],
        name: Keys.category.components.page.schemas.aside.name,
        description: Keys.category.components.page.schemas.aside.description,
    },
    FOOTER: {
        part: "part-page-footer",
        props: [Props.prop_footer],
        name: Keys.category.components.page.schemas.footer.name,
        description: Keys.category.components.page.schemas.footer.description,
    },
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

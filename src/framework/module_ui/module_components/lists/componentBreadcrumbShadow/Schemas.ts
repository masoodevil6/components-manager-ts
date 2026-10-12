import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    BREADCRUMB: {
        part: "part-breadcrumb",
        props: [Props.prop_size, Props.prop_hasBtnBack, Props.prop_backIconPrimaryColor, Props.prop_backIconSecondaryColor],
    },
    ROOT: {
        part: "part-breadcrumb-shadow",
        props: [Props.prop_backgroundColorRoot],
        name: Keys.category.components.breadcrumbShadow.schemas.root.name,
        description: Keys.category.components.breadcrumbShadow.schemas.root.description,
    },
    TITLE: {
        part: "part-breadcrumb-shadow-title",
        props: [Props.prop_pageTitle, Props.prop_colorHeader, Props.prop_pageNav, Props.prop_size, Props.prop_widthTitle],
        name: Keys.category.components.breadcrumbShadow.schemas.title.name,
        description: Keys.category.components.breadcrumbShadow.schemas.title.description,
    },
    NAVIGATION: {
        part: "part-breadcrumb-shadow-navigation",
        props: [Props.prop_pageNav, Props.prop_colorNav, Props.prop_backgroundColorNav, Props.prop_hideNavigationBelow, Props.prop_size],
        name: Keys.category.components.breadcrumbShadow.schemas.navigation.name,
        description: Keys.category.components.breadcrumbShadow.schemas.navigation.description,
    },
    NAVIGATION_ITEM: {
        part: "part-breadcrumb-shadow-navigation-item",
        props: [Props.prop_colorNav, Props.prop_backgroundColorNav, Props.prop_size],
        name: Keys.category.components.breadcrumbShadow.schemas.navigationItem.name,
        description: Keys.category.components.breadcrumbShadow.schemas.navigationItem.description,
    },
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

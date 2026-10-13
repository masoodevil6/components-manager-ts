import * as CoreComponents from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

export const Schemas = {
    ...ComponentStructureTrait.schemas,
    ROOT: {
        part: "part-menu-more",
        props: [
            Props.prop_orientation,
            Props.prop_isFullWidth,
            Props.prop_direction,
            Props.prop_items,
            Props.prop_menuBackgroundColor,
            Props.prop_itemBackgroundColorHover,
            Props.prop_menuIconColor,
            Props.prop_menuIconSecondaryColor,
            Props.prop_menuBorderRadius,
            Props.prop_menuBorderWidth,
            Props.prop_menuBorder,
        ],
        name: Keys.category.components.menuMore.schemas.root.name,
        description: Keys.category.components.menuMore.schemas.root.description,
    },
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

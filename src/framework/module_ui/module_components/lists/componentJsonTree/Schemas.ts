import * as CoreComponents from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    ROOT: {
        part: "part-json-tree",
        props: [
            Props.prop_data, Props.prop_initialExpandDepth, Props.prop_maxDepth, Props.prop_maxNodes,
            Props.prop_showSearch, Props.prop_showExpandControls, Props.prop_showCopyButton,
            Props.prop_searchPlaceholder, Props.prop_emptyText, Props.prop_headerBackgroundColor,
            Props.prop_componentBorderSelector, Props.prop_componentBorderAppend, Props.prop_componentBorderClassList,
            Props.prop_componentBorderElementStyles, Props.prop_componentBorderShow, Props.prop_componentBorderStructureClass,
            Props.prop_componentBorderStructureStyles, Props.prop_componentBorderContentSize, Props.prop_componentBorderContentColor,
            Props.prop_componentBorderContentColorHover, Props.prop_componentBorderContentBackgroundColor,
            Props.prop_componentBorderContentBackgroundColorHover, Props.prop_componentBorderColor, Props.prop_componentBorderColorHover,
            Props.prop_componentBorderClass, Props.prop_componentBorderStyles, Props.prop_componentBorderType,
            Props.prop_componentBorderOpacity, Props.prop_componentBorderArrowType, Props.prop_componentBorderArrowWidth,
            Props.prop_componentBorderArrowPosition, Props.prop_componentBorderMinWidth, Props.prop_componentBorderWidth,
            Props.prop_componentBorderTopLeftRadiusHas, Props.prop_componentBorderTopRightRadiusHas,
            Props.prop_componentBorderBottomLeftRadiusHas, Props.prop_componentBorderBottomRightRadiusHas,
            Props.prop_componentBorderTopHas, Props.prop_componentBorderRightHas, Props.prop_componentBorderBottomHas,
            Props.prop_componentBorderLeftHas,
        ],
        name: Keys.category.components.jsonTree.schemas.root.name,
        description: Keys.category.components.jsonTree.schemas.root.description,
    },
    TOOLBAR: {
        part: "part-json-tree-toolbar",
        props: [Props.prop_showSearch, Props.prop_showExpandControls, Props.prop_showCopyButton, Props.prop_searchPlaceholder, Props.prop_headerBackgroundColor],
        name: Keys.category.components.jsonTree.schemas.toolbar.name,
        description: Keys.category.components.jsonTree.schemas.toolbar.description,
    },
    TREE: {
        part: "part-json-tree-tree",
        props: [Props.prop_data, Props.prop_initialExpandDepth, Props.prop_maxDepth, Props.prop_maxNodes, Props.prop_emptyText],
        name: Keys.category.components.jsonTree.schemas.tree.name,
        description: Keys.category.components.jsonTree.schemas.tree.description,
    },
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

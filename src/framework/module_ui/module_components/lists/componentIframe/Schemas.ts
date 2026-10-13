import * as CoreComponents from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

const schemaKeys = Keys.category.components.fetch.iframe.schemas;

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    ROOT: {
        part: "part-iframe",
        props: [Props.prop_widgetWidth, Props.prop_widgetHeight],
        name: schemaKeys.root.name,
        description: schemaKeys.root.description,
    },
    BORDER: {
        part: "part-iframe-border",
        props: [
            Props.prop_widgetWidth,
            Props.prop_widgetHeight,
            Props.prop_componentBorderSelector,
            Props.prop_componentBorderAppend,
            Props.prop_componentBorderClassList,
            Props.prop_componentBorderElementStyles,
            Props.prop_componentBorderShow,
            Props.prop_componentBorderStructureClass,
            Props.prop_componentBorderStructureStyles,
            Props.prop_componentBorderContentSize,
            Props.prop_componentBorderContentColor,
            Props.prop_componentBorderContentColorHover,
            Props.prop_componentBorderContentBackgroundColor,
            Props.prop_componentBorderContentBackgroundColorHover,
            Props.prop_componentBorderColor,
            Props.prop_componentBorderColorHover,
            Props.prop_componentBorderClass,
            Props.prop_componentBorderStyles,
            Props.prop_componentBorderType,
            Props.prop_componentBorderOpacity,
            Props.prop_componentBorderArrowType,
            Props.prop_componentBorderArrowWidth,
            Props.prop_componentBorderArrowPosition,
            Props.prop_componentBorderMinWidth,
            Props.prop_componentBorderWidth,
            Props.prop_componentBorderTopLeftRadiusHas,
            Props.prop_componentBorderTopRightRadiusHas,
            Props.prop_componentBorderBottomLeftRadiusHas,
            Props.prop_componentBorderBottomRightRadiusHas,
            Props.prop_componentBorderTopHas,
            Props.prop_componentBorderRightHas,
            Props.prop_componentBorderBottomHas,
            Props.prop_componentBorderLeftHas,
        ],
        name: schemaKeys.border.name,
        description: schemaKeys.border.description,
    },
    BODY: {
        part: "part-iframe-body",
        props: [Props.prop_url, Props.prop_width, Props.prop_height, Props.prop_heightAuto, Props.prop_widgetHeight],
        name: schemaKeys.body.name,
        description: schemaKeys.body.description,
    },
    FRAME: {
        part: "part-iframe-frame",
        props: [Props.prop_iframeClass, Props.prop_iframeStyles],
        name: schemaKeys.frame.name,
        description: schemaKeys.frame.description,
    },
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

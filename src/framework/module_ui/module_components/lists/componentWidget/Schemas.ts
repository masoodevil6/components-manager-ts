import * as CoreComponents from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

const widgetKeys = Keys.category.components.fetch.widget.schemas;

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    WIDGET: {
        part: "part-widget",
        props: [
            Props.prop_widgetWidth,
            Props.prop_widgetHeight,
        ],
        name: widgetKeys.widget.name,
        description: widgetKeys.widget.description,
    },
    BORDER: {
        part: "part-widget-border",
        props: [
            Props.prop_widgetClass,
            Props.prop_widgetStyles,
            Props.prop_widgetMinHeight,
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
        name: widgetKeys.border.name,
        description: widgetKeys.border.description,
    },
    BODY: {
        part: "part-widget-body",
        props: [
            Props.prop_layoutContent,
            Props.prop_fetch,
            Props.prop_btnMore_icon,
            Props.prop_btnMore_show,
            Props.prop_btnMore_link,
        ],
        name: widgetKeys.body.name,
        description: widgetKeys.body.description,
    },
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;

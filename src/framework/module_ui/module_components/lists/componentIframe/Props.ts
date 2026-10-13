import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {Props as WidgetProps} from "../componentWidget/Props";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

const iframeKeys = Keys.category.components.fetch.iframe;

export const Props = {
    prop_url: Define_ComponentProp<string>({
        prop: "prop_url",
        default: "",
        name: iframeKeys.props.url.name,
        description: iframeKeys.props.url.description,
    }),
    prop_width: Define_ComponentProp<string | number>({
        prop: "prop_width",
        default: "100%",
        name: iframeKeys.props.width.name,
        description: iframeKeys.props.width.description,
    }),
    prop_height: Define_ComponentProp<string | number>({
        prop: "prop_height",
        default: "1000",
        name: iframeKeys.props.height.name,
        description: iframeKeys.props.height.description,
    }),
    prop_heightAuto: Define_ComponentProp<boolean>({
        prop: "prop_heightAuto",
        default: true,
        name: iframeKeys.props.heightAuto.name,
        description: iframeKeys.props.heightAuto.description,
    }),
    prop_iframeClass: Define_ComponentProp<string[]>({
        prop: "prop_iframeClass",
        default: [],
        name: iframeKeys.props.iframeClass.name,
        description: iframeKeys.props.iframeClass.description,
    }),
    prop_iframeStyles: Define_ComponentProp<Record<string, string>>({
        prop: "prop_iframeStyles",
        default: {},
        name: iframeKeys.props.iframeStyles.name,
        description: iframeKeys.props.iframeStyles.description,
    }),
    prop_widgetWidth: Define_ComponentProp<string | null>({
        prop: "prop_widgetWidth",
        default: null,
        name: iframeKeys.props.widgetWidth.name,
        description: iframeKeys.props.widgetWidth.description,
    }),
    prop_widgetHeight: Define_ComponentProp<string | null>({
        prop: "prop_widgetHeight",
        default: null,
        name: iframeKeys.props.widgetHeight.name,
        description: iframeKeys.props.widgetHeight.description,
    }),

    // Keep the ComponentBorder controls aligned with the ComponentWidget API.
    prop_componentBorderSelector: WidgetProps.prop_componentBorderSelector,
    prop_componentBorderAppend: WidgetProps.prop_componentBorderAppend,
    prop_componentBorderClassList: WidgetProps.prop_componentBorderClassList,
    prop_componentBorderElementStyles: WidgetProps.prop_componentBorderElementStyles,
    prop_componentBorderShow: WidgetProps.prop_componentBorderShow,
    prop_componentBorderStructureClass: WidgetProps.prop_componentBorderStructureClass,
    prop_componentBorderStructureStyles: WidgetProps.prop_componentBorderStructureStyles,
    prop_componentBorderContentSize: WidgetProps.prop_componentBorderContentSize,
    prop_componentBorderContentColor: WidgetProps.prop_componentBorderContentColor,
    prop_componentBorderContentColorHover: WidgetProps.prop_componentBorderContentColorHover,
    prop_componentBorderContentBackgroundColor: WidgetProps.prop_componentBorderContentBackgroundColor,
    prop_componentBorderContentBackgroundColorHover: WidgetProps.prop_componentBorderContentBackgroundColorHover,
    prop_componentBorderColor: WidgetProps.prop_componentBorderColor,
    prop_componentBorderColorHover: WidgetProps.prop_componentBorderColorHover,
    prop_componentBorderClass: WidgetProps.prop_componentBorderClass,
    prop_componentBorderStyles: WidgetProps.prop_componentBorderStyles,
    prop_componentBorderType: WidgetProps.prop_componentBorderType,
    prop_componentBorderOpacity: WidgetProps.prop_componentBorderOpacity,
    prop_componentBorderArrowType: WidgetProps.prop_componentBorderArrowType,
    prop_componentBorderArrowWidth: WidgetProps.prop_componentBorderArrowWidth,
    prop_componentBorderArrowPosition: WidgetProps.prop_componentBorderArrowPosition,
    prop_componentBorderMinWidth: WidgetProps.prop_componentBorderMinWidth,
    prop_componentBorderWidth: WidgetProps.prop_componentBorderWidth,
    prop_componentBorderTopLeftRadiusHas: WidgetProps.prop_componentBorderTopLeftRadiusHas,
    prop_componentBorderTopRightRadiusHas: WidgetProps.prop_componentBorderTopRightRadiusHas,
    prop_componentBorderBottomLeftRadiusHas: WidgetProps.prop_componentBorderBottomLeftRadiusHas,
    prop_componentBorderBottomRightRadiusHas: WidgetProps.prop_componentBorderBottomRightRadiusHas,
    prop_componentBorderTopHas: WidgetProps.prop_componentBorderTopHas,
    prop_componentBorderRightHas: WidgetProps.prop_componentBorderRightHas,
    prop_componentBorderBottomHas: WidgetProps.prop_componentBorderBottomHas,
    prop_componentBorderLeftHas: WidgetProps.prop_componentBorderLeftHas,
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;

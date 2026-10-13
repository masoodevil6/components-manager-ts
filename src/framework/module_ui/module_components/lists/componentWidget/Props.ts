import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UiIcons from "@/ui_icons";
import * as UtilConst from "@/util_consts";
import {Keys} from "../../../module_categories/languages";
import {Props as BorderProps, BorderTypes, ArrowTypes} from "../componentBorder/Props";
import type {TFetchRequestData} from "@/util_tools";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export type WidgetFetchConfig = {
    url: string;
    data?: unknown;
    method?: string;
    contentType?: TFetchRequestData["contentType"];
};

const widgetKeys = Keys.category.components.fetch.widget;
const basicKeys = Keys.category.components.basic.props;

const defineWidgetProp = <T,>(prop: string, defaultValue: T, name: any, description: any) => Define_ComponentProp<T>({
    prop,
    default: defaultValue,
    name,
    description,
});

const defineBorderAlias = <T,>(prop: string, source: any) => Define_ComponentProp<T>({
    prop,
    default: source.default,
    name: source.name,
    description: source.description,
});

export const Props = {
    prop_layoutContent: defineWidgetProp<any>("prop_layoutContent", null, widgetKeys.props.layoutContent.name, widgetKeys.props.layoutContent.description),
    prop_widgetClass: defineWidgetProp<string[]>("prop_widgetClass", [], widgetKeys.props.widgetClass.name, widgetKeys.props.widgetClass.description),
    prop_widgetStyles: defineWidgetProp<Record<string, string>>("prop_widgetStyles", {"min-height": "80px"}, widgetKeys.props.widgetStyles.name, widgetKeys.props.widgetStyles.description),
    prop_widgetMinHeight: defineWidgetProp<string | null>("prop_widgetMinHeight", null, widgetKeys.props.widgetMinHeight.name, widgetKeys.props.widgetMinHeight.description),
    prop_widgetWidth: defineWidgetProp<string | null>("prop_widgetWidth", null, widgetKeys.props.widgetWidth.name, widgetKeys.props.widgetWidth.description),
    prop_widgetHeight: defineWidgetProp<string | null>("prop_widgetHeight", null, widgetKeys.props.widgetHeight.name, widgetKeys.props.widgetHeight.description),
    prop_fetch: defineWidgetProp<WidgetFetchConfig>("prop_fetch", {url: "", data: null}, widgetKeys.props.fetch.name, widgetKeys.props.fetch.description),
    prop_btnMore_icon: defineWidgetProp<UiIcons.IIconDefinition | null>("prop_btnMore_icon", null, widgetKeys.props.btnMoreIcon.name, widgetKeys.props.btnMoreIcon.description),
    prop_btnMore_show: defineWidgetProp<boolean>("prop_btnMore_show", false, widgetKeys.props.btnMoreShow.name, widgetKeys.props.btnMoreShow.description),
    prop_btnMore_link: defineWidgetProp<string | null>("prop_btnMore_link", null, widgetKeys.props.btnMoreLink.name, widgetKeys.props.btnMoreLink.description),

    // Props for the nested ComponentBorder host and its visual border.
    prop_componentBorderSelector: defineWidgetProp<string | null>("prop_componentBorderSelector", null, basicKeys.selector.name, basicKeys.selector.description),
    prop_componentBorderAppend: defineWidgetProp<boolean>("prop_componentBorderAppend", false, basicKeys.append.name, basicKeys.append.description),
    prop_componentBorderClassList: defineWidgetProp<string[]>("prop_componentBorderClassList", [], basicKeys.classList.name, basicKeys.classList.description),
    prop_componentBorderElementStyles: defineWidgetProp<Record<string, any>>("prop_componentBorderElementStyles", {}, basicKeys.styles.name, basicKeys.styles.description),
    prop_componentBorderShow: defineWidgetProp<boolean>("prop_componentBorderShow", true, basicKeys.prop_show.name, basicKeys.prop_show.description),
    prop_componentBorderStructureClass: defineWidgetProp<string[] | null>("prop_componentBorderStructureClass", null, basicKeys.prop_structureClass.name, basicKeys.prop_structureClass.description),
    prop_componentBorderStructureStyles: defineWidgetProp<Record<string, string> | null>("prop_componentBorderStructureStyles", null, basicKeys.prop_structureStyles.name, basicKeys.prop_structureStyles.description),

    prop_componentBorderContentSize: defineBorderAlias<UtilConst.Sizes>("prop_componentBorderContentSize", BorderProps.prop_contentSize),
    prop_componentBorderContentColor: defineBorderAlias<string | null>("prop_componentBorderContentColor", BorderProps.prop_contentColor),
    prop_componentBorderContentColorHover: defineBorderAlias<string | null>("prop_componentBorderContentColorHover", BorderProps.prop_contentColor_hover),
    prop_componentBorderContentBackgroundColor: defineBorderAlias<string | null>("prop_componentBorderContentBackgroundColor", BorderProps.prop_contentBackgroundColor),
    prop_componentBorderContentBackgroundColorHover: defineBorderAlias<string | null>("prop_componentBorderContentBackgroundColorHover", BorderProps.prop_contentBackgroundColor_hover),
    prop_componentBorderColor: defineBorderAlias<string | null>("prop_componentBorderColor", BorderProps.prop_borderColor),
    prop_componentBorderColorHover: defineBorderAlias<string | null>("prop_componentBorderColorHover", BorderProps.prop_borderColor_hover),
    prop_componentBorderClass: defineBorderAlias<string[]>("prop_componentBorderClass", BorderProps.prop_borderClass),
    prop_componentBorderStyles: defineBorderAlias<Record<string, string>>("prop_componentBorderStyles", BorderProps.prop_borderStyles),
    prop_componentBorderType: defineBorderAlias<BorderTypes>("prop_componentBorderType", BorderProps.prop_borderType),
    prop_componentBorderOpacity: defineBorderAlias<number | null>("prop_componentBorderOpacity", BorderProps.prop_borderOpacity),
    prop_componentBorderArrowType: defineBorderAlias<ArrowTypes | null>("prop_componentBorderArrowType", BorderProps.prop_borderArrowType),
    prop_componentBorderArrowWidth: defineBorderAlias<number>("prop_componentBorderArrowWidth", BorderProps.prop_borderArrowWidth),
    prop_componentBorderArrowPosition: defineBorderAlias<string | null>("prop_componentBorderArrowPosition", BorderProps.prop_borderArrowPosition),
    prop_componentBorderMinWidth: defineBorderAlias<string | null>("prop_componentBorderMinWidth", BorderProps.prop_minWidth),
    prop_componentBorderWidth: defineBorderAlias<string | null>("prop_componentBorderWidth", BorderProps.prop_width),
    prop_componentBorderTopLeftRadiusHas: defineBorderAlias<boolean>("prop_componentBorderTopLeftRadiusHas", BorderProps.prop_borderTopLeftRadiusHas),
    prop_componentBorderTopRightRadiusHas: defineBorderAlias<boolean>("prop_componentBorderTopRightRadiusHas", BorderProps.prop_borderTopRightRadiusHas),
    prop_componentBorderBottomLeftRadiusHas: defineBorderAlias<boolean>("prop_componentBorderBottomLeftRadiusHas", BorderProps.prop_borderBottomLeftRadiusHas),
    prop_componentBorderBottomRightRadiusHas: defineBorderAlias<boolean>("prop_componentBorderBottomRightRadiusHas", BorderProps.prop_borderBottomRightRadiusHas),
    prop_componentBorderTopHas: defineBorderAlias<boolean>("prop_componentBorderTopHas", BorderProps.prop_borderTopHas),
    prop_componentBorderRightHas: defineBorderAlias<boolean>("prop_componentBorderRightHas", BorderProps.prop_borderRightHas),
    prop_componentBorderBottomHas: defineBorderAlias<boolean>("prop_componentBorderBottomHas", BorderProps.prop_borderBottomHas),
    prop_componentBorderLeftHas: defineBorderAlias<boolean>("prop_componentBorderLeftHas", BorderProps.prop_borderLeftHas),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;

import * as CoreComponents from "@/core_components";
import * as CoreObservable from "@/core_observable";
import * as CoreLanguage from "@/core_languages";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {Props as BorderProps} from "../componentBorder/Props";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";
import type {ConsoleEntry} from "./Types";

type DefaultOf<T> = T extends {default: infer Value} ? Value : never;
const defineBorderAlias = <T,>(prop: string, source: any) => Define_ComponentProp<T>({
    prop,
    default: source.default,
    name: source.name,
    description: source.description,
});
const basicKeys = Keys.category.components.basic.props;

export const Props = {
    prop_entries: Define_ComponentProp<ConsoleEntry[] | CoreObservable.App<ConsoleEntry[]>>({
        prop: "prop_entries", default: [], name: Keys.category.components.console.props.entries.name,
        description: Keys.category.components.console.props.entries.description,
    }),
    prop_maxEntries: Define_ComponentProp<number>({
        prop: "prop_maxEntries", default: 500, name: Keys.category.components.console.props.maxEntries.name,
        description: Keys.category.components.console.props.maxEntries.description,
    }),
    prop_autoScroll: Define_ComponentProp<boolean>({
        prop: "prop_autoScroll", default: true, name: Keys.category.components.console.props.autoScroll.name,
        description: Keys.category.components.console.props.autoScroll.description,
    }),
    prop_showLevelFilter: Define_ComponentProp<boolean>({
        prop: "prop_showLevelFilter", default: true, name: Keys.category.components.console.props.showLevelFilter.name,
        description: Keys.category.components.console.props.showLevelFilter.description,
    }),
    prop_showClearButton: Define_ComponentProp<boolean>({
        prop: "prop_showClearButton", default: true, name: Keys.category.components.console.props.showClearButton.name,
        description: Keys.category.components.console.props.showClearButton.description,
    }),
    prop_placeholder: Define_ComponentProp<string | CoreObservable.App<string>>({
        prop: "prop_placeholder", default: CoreLanguage.App.translate(Keys.category.components.console.texts.empty), name: Keys.category.components.console.props.placeholder.name,
        description: Keys.category.components.console.props.placeholder.description,
    }),

    prop_componentBorderSelector: Define_ComponentProp<string | null>({prop: "prop_componentBorderSelector", default: null, name: basicKeys.selector.name, description: basicKeys.selector.description}),
    prop_componentBorderAppend: Define_ComponentProp<boolean>({prop: "prop_componentBorderAppend", default: false, name: basicKeys.append.name, description: basicKeys.append.description}),
    prop_componentBorderClassList: Define_ComponentProp<string[]>({prop: "prop_componentBorderClassList", default: [], name: basicKeys.classList.name, description: basicKeys.classList.description}),
    prop_componentBorderElementStyles: Define_ComponentProp<Record<string, any>>({prop: "prop_componentBorderElementStyles", default: {}, name: basicKeys.styles.name, description: basicKeys.styles.description}),
    prop_componentBorderShow: Define_ComponentProp<boolean>({prop: "prop_componentBorderShow", default: true, name: basicKeys.prop_show.name, description: basicKeys.prop_show.description}),
    prop_componentBorderStructureClass: Define_ComponentProp<string[] | null>({prop: "prop_componentBorderStructureClass", default: null, name: basicKeys.prop_structureClass.name, description: basicKeys.prop_structureClass.description}),
    prop_componentBorderStructureStyles: Define_ComponentProp<Record<string, string> | null>({prop: "prop_componentBorderStructureStyles", default: null, name: basicKeys.prop_structureStyles.name, description: basicKeys.prop_structureStyles.description}),

    prop_componentBorderContentSize: defineBorderAlias<DefaultOf<typeof BorderProps.prop_contentSize>>("prop_componentBorderContentSize", BorderProps.prop_contentSize),
    prop_componentBorderContentColor: defineBorderAlias<DefaultOf<typeof BorderProps.prop_contentColor>>("prop_componentBorderContentColor", BorderProps.prop_contentColor),
    prop_componentBorderContentColorHover: defineBorderAlias<DefaultOf<typeof BorderProps.prop_contentColor_hover>>("prop_componentBorderContentColorHover", BorderProps.prop_contentColor_hover),
    prop_componentBorderContentBackgroundColor: defineBorderAlias<DefaultOf<typeof BorderProps.prop_contentBackgroundColor>>("prop_componentBorderContentBackgroundColor", BorderProps.prop_contentBackgroundColor),
    prop_componentBorderContentBackgroundColorHover: defineBorderAlias<DefaultOf<typeof BorderProps.prop_contentBackgroundColor_hover>>("prop_componentBorderContentBackgroundColorHover", BorderProps.prop_contentBackgroundColor_hover),
    prop_componentBorderColor: defineBorderAlias<DefaultOf<typeof BorderProps.prop_borderColor>>("prop_componentBorderColor", BorderProps.prop_borderColor),
    prop_componentBorderColorHover: defineBorderAlias<DefaultOf<typeof BorderProps.prop_borderColor_hover>>("prop_componentBorderColorHover", BorderProps.prop_borderColor_hover),
    prop_componentBorderClass: Define_ComponentProp<string[]>({
        prop: "prop_componentBorderClass",
        default: ["shadow-sm", "position-relative"],
        name: BorderProps.prop_borderClass.name,
        description: BorderProps.prop_borderClass.description,
    }),
    prop_componentBorderStyles: defineBorderAlias<DefaultOf<typeof BorderProps.prop_borderStyles>>("prop_componentBorderStyles", BorderProps.prop_borderStyles),
    prop_componentBorderType: defineBorderAlias<DefaultOf<typeof BorderProps.prop_borderType>>("prop_componentBorderType", BorderProps.prop_borderType),
    prop_componentBorderOpacity: defineBorderAlias<DefaultOf<typeof BorderProps.prop_borderOpacity>>("prop_componentBorderOpacity", BorderProps.prop_borderOpacity),
    prop_componentBorderArrowType: defineBorderAlias<DefaultOf<typeof BorderProps.prop_borderArrowType>>("prop_componentBorderArrowType", BorderProps.prop_borderArrowType),
    prop_componentBorderArrowWidth: defineBorderAlias<DefaultOf<typeof BorderProps.prop_borderArrowWidth>>("prop_componentBorderArrowWidth", BorderProps.prop_borderArrowWidth),
    prop_componentBorderArrowPosition: defineBorderAlias<DefaultOf<typeof BorderProps.prop_borderArrowPosition>>("prop_componentBorderArrowPosition", BorderProps.prop_borderArrowPosition),
    prop_componentBorderMinWidth: defineBorderAlias<DefaultOf<typeof BorderProps.prop_minWidth>>("prop_componentBorderMinWidth", BorderProps.prop_minWidth),
    prop_componentBorderWidth: defineBorderAlias<DefaultOf<typeof BorderProps.prop_width>>("prop_componentBorderWidth", BorderProps.prop_width),
    prop_componentBorderTopLeftRadiusHas: defineBorderAlias<DefaultOf<typeof BorderProps.prop_borderTopLeftRadiusHas>>("prop_componentBorderTopLeftRadiusHas", BorderProps.prop_borderTopLeftRadiusHas),
    prop_componentBorderTopRightRadiusHas: defineBorderAlias<DefaultOf<typeof BorderProps.prop_borderTopRightRadiusHas>>("prop_componentBorderTopRightRadiusHas", BorderProps.prop_borderTopRightRadiusHas),
    prop_componentBorderBottomLeftRadiusHas: defineBorderAlias<DefaultOf<typeof BorderProps.prop_borderBottomLeftRadiusHas>>("prop_componentBorderBottomLeftRadiusHas", BorderProps.prop_borderBottomLeftRadiusHas),
    prop_componentBorderBottomRightRadiusHas: defineBorderAlias<DefaultOf<typeof BorderProps.prop_borderBottomRightRadiusHas>>("prop_componentBorderBottomRightRadiusHas", BorderProps.prop_borderBottomRightRadiusHas),
    prop_componentBorderTopHas: defineBorderAlias<DefaultOf<typeof BorderProps.prop_borderTopHas>>("prop_componentBorderTopHas", BorderProps.prop_borderTopHas),
    prop_componentBorderRightHas: defineBorderAlias<DefaultOf<typeof BorderProps.prop_borderRightHas>>("prop_componentBorderRightHas", BorderProps.prop_borderRightHas),
    prop_componentBorderBottomHas: defineBorderAlias<DefaultOf<typeof BorderProps.prop_borderBottomHas>>("prop_componentBorderBottomHas", BorderProps.prop_borderBottomHas),
    prop_componentBorderLeftHas: defineBorderAlias<DefaultOf<typeof BorderProps.prop_borderLeftHas>>("prop_componentBorderLeftHas", BorderProps.prop_borderLeftHas),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;

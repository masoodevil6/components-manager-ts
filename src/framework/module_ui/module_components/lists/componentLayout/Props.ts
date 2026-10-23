import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UtilTools from "@/util_tools";
import {Keys} from "../../../module_categories/languages";
import * as ComponentInputSelectOption from "../componentInputSelectOption";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

const translation = Keys.category.components.layout;

type LayoutPropGroupsType = {
    layout: CoreComponents.PropGroupInterface;
};

export const PropGroups = CoreComponents.DefinePropGroup<LayoutPropGroupsType>({
    layout: {
        name: translation.groups.layout.name,
        description: translation.groups.layout.description,
        col: 1,
    },
});

export enum LayoutColumn {
    CUSTOM = "CUSTOM",
    COL_1 = "COL_1",
    COL_2 = "COL_2",
    COL_3 = "COL_3",
    COL_4 = "COL_4",
    COL_5 = "COL_5",
    COL_6 = "COL_6",
    COL_7 = "COL_7",
    COL_8 = "COL_8",
    COL_9 = "COL_9",
    COL_10 = "COL_10",
    COL_11 = "COL_11",
    COL_12 = "COL_12",
}

const columnOptions = Object.values(LayoutColumn).map((value) => ({
    id: value,
    name: value === LayoutColumn.CUSTOM ? "Custom" : value.toLowerCase().replace("_", "-"),
}));

const columnEditor = UtilTools.Render.ComponentRender.inputSelectOption(
    ComponentInputSelectOption.Component as any,
    columnOptions,
);

export type LayoutContentItem = {
    content: unknown;
    col?: LayoutColumn | null;
    class?: string[] | string;
    styles?: Record<string, string>;
};

export const Props = {
    prop_col: Define_ComponentProp<LayoutColumn>({
        prop: "prop_col",
        default: LayoutColumn.COL_12,
        name: translation.props.col.name,
        description: translation.props.col.description,
        OptionShow: true,
        OptionComponentSelector: columnEditor.OptionComponentSelector,
        OptionComponentOption: columnEditor.OptionComponentOption,
        OptionGroup: PropGroups.layout,
    }),
    prop_layoutClass: Define_ComponentProp<string[]>({
        prop: "prop_layoutClass",
        default: [],
        name: translation.props.layoutClass.name,
        description: translation.props.layoutClass.description,
    }),
    prop_layoutStyles: Define_ComponentProp<Record<string, string>>({
        prop: "prop_layoutStyles",
        default: {},
        name: translation.props.layoutStyles.name,
        description: translation.props.layoutStyles.description,
    }),
    prop_layoutContent: Define_ComponentProp<LayoutContentItem[] | null>({
        prop: "prop_layoutContent",
        default: null,
        name: translation.props.layoutContent.name,
        description: translation.props.layoutContent.description,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;

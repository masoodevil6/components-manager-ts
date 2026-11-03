import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {LayoutColumn} from "../componentLayout/Props";
import type {LayoutContentItem} from "../componentLayout/Props";
import type {StandardStyles} from "@/util_options_std";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

const translation = Keys.category.components.basic.layoutCreator;

export type LayoutCreatorComponentInstance = {
    getElement(): unknown;
    getComponentWorkflow(): unknown;
};

export type LayoutCreatorContentItem = Omit<LayoutContentItem, "content" | "styles"> & {
    content: LayoutCreatorComponentInstance;
    styles?: StandardStyles;
};

export type LayoutCreatorItemState = {
    component: Function;
    properties: Record<string, any>;
    workflowChildName: string;
    col: LayoutContentItem["col"];
    class?: LayoutContentItem["class"];
    styles?: StandardStyles;
};

export enum LayoutCreatorMode {
    RENDER = "RENDER",
    EDIT = "EDIT",
}

export const Props = {
    prop_mode: Define_ComponentProp<LayoutCreatorMode>({
        prop: "prop_mode",
        default: LayoutCreatorMode.RENDER,
        name: translation.props.mode.name,
        description: translation.props.mode.description,
    }),
    prop_components: Define_ComponentProp<Function[] | null>({
        prop: "prop_components",
        default: null,
        name: translation.props.components.name,
        description: translation.props.components.description,
    }),
    prop_defaultColumn: Define_ComponentProp<LayoutColumn | null>({
        prop: "prop_defaultColumn",
        default: null,
        name: translation.props.defaultColumn.name,
        description: translation.props.defaultColumn.description,
    }),
    prop_initialLayoutContent: Define_ComponentProp<LayoutCreatorContentItem[] | null>({
        prop: "prop_initialLayoutContent",
        default: null,
        name: translation.props.initialLayoutContent.name,
        description: translation.props.initialLayoutContent.description,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;

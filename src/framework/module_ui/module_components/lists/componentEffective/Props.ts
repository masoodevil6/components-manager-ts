import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import * as ComponentBorder from "../componentBorder";
import type {ExtractPropsConfigType, ExtractPropsType} from "../../tools/type/TypeHelpers";

export enum EffectiveMode {
    NONE = "none",
    FADE = "fade",
    SLIDE = "slide",
    SCALE = "scale",
}

const labels = Keys.category.components.effective.props;

export const Props = {
    ...ComponentBorder.Props,
    prop_isVisible: Define_ComponentProp<boolean>({
        prop: "prop_isVisible",
        default: true,
        name: labels.isVisible.name,
        description: labels.isVisible.description,
    }),
    prop_showMode: Define_ComponentProp<EffectiveMode>({
        prop: "prop_showMode",
        default: EffectiveMode.FADE,
        name: labels.showMode.name,
        description: labels.showMode.description,
    }),
    prop_hideMode: Define_ComponentProp<EffectiveMode>({
        prop: "prop_hideMode",
        default: EffectiveMode.FADE,
        name: labels.hideMode.name,
        description: labels.hideMode.description,
    }),
    prop_showDuration: Define_ComponentProp<number>({
        prop: "prop_showDuration",
        default: 200,
        name: labels.showDuration.name,
        description: labels.showDuration.description,
    }),
    prop_hideDuration: Define_ComponentProp<number>({
        prop: "prop_hideDuration",
        default: 200,
        name: labels.hideDuration.name,
        description: labels.hideDuration.description,
    }),
    prop_easing: Define_ComponentProp<string>({
        prop: "prop_easing",
        default: "ease",
        name: labels.easing.name,
        description: labels.easing.description,
    }),
    prop_collapseSpaceWhenHidden: Define_ComponentProp<boolean>({
        prop: "prop_collapseSpaceWhenHidden",
        default: true,
        name: labels.collapseSpaceWhenHidden.name,
        description: labels.collapseSpaceWhenHidden.description,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;

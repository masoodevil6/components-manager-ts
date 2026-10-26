import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

const translation = Keys.category.components.basic.layoutCreator;

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
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;

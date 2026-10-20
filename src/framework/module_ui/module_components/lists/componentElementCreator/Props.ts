import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import * as ComponentInput from "../componentInput";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

const translation = Keys.category.components.basic.elementCreator;

export enum ElementCreatorMode {
    RENDER = "RENDER",
    EDIT = "EDIT",
    SETTING = "SETTING",
}

export const Props = {
    prop_mode: Define_ComponentProp<ElementCreatorMode>({
        prop: "prop_mode",
        default: ElementCreatorMode.RENDER,
        name: translation.props.mode.name,
        description: translation.props.mode.description,
    }),
    prop_component: Define_ComponentProp<Function>({
        prop: "prop_component",
        default: ComponentInput.Component,
        name: translation.props.component.name,
        description: translation.props.component.description,
    }),
    prop_componentProperties: Define_ComponentProp<Record<string, any>>({
        prop: "prop_componentProperties",
        default: {
            prop_labelTitle: "Input component",
            prop_placeholder: "Type something",
        },
        name: translation.props.componentProperties.name,
        description: translation.props.componentProperties.description,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;

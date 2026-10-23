import * as CoreComponents from "@/core_components";
import * as CoreReactive from "@/core_reactive";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as InputProps from "../componentInput/Props";
import {LayoutColumn} from "../componentLayout/Props";
import {Keys} from "../../../module_categories/languages";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

type InputGroupComponentInstance = {
    getElement?: () => any;
    getReactiveElement?: () => any;
    dispose?: () => void;
};

type InputGroupComponentFactory =
    | ((...args: any[]) => any)
    | (new (...args: any[]) => any);

export type InputGroupInput =
    | CoreReactive.App
    | HTMLElement
    | InputGroupComponentInstance
    | InputGroupComponentFactory;

export enum InputGroupItemType {
    INPUT = "INPUT",
    LABEL = "LABEL",
}

export type InputGroupItem = {
    type: InputGroupItemType;
    input: InputGroupInput | null;
    width: LayoutColumn | number | string | null;
};

const translation = Keys.category.components.inputGroup.props;

export const Props = {
    ...InputProps.Props,
    prop_value: Define_ComponentProp<Record<string, any>>({
        prop: "prop_value",
        default: {},
        name: InputProps.Props.prop_value.name,
        description: InputProps.Props.prop_value.description,
        OptionShow: true,
        OptionGroup: InputProps.PropGroups.value,
    }),
    prop_inputs: Define_ComponentProp<InputGroupItem[]>({
        prop: "prop_inputs",
        default: [],
        name: translation.inputs.name,
        description: translation.inputs.description,
    }),
} satisfies CoreComponents.ComponentProps;

export const PropGroups = InputProps.PropGroups;
export const InputTypes = InputProps.InputTypes;

export type PropsType = Omit<InputProps.PropsType, "prop_value"> & ExtractPropsType<typeof Props>;
export type PropsConfigType = Omit<InputProps.PropsConfigType, "prop_value"> & ExtractPropsConfigType<typeof Props>;

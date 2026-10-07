import * as CoreComponents from "@/core_components";
import * as CoreObservable from "@/core_observable";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import type {ValidatorRule} from "@/util_validators";
import {Keys} from "../../../module_categories/languages";
import {Props as InputProps} from "../componentInput/Props";
import {ComponentLabelTrait, ComponentLabelPropsType} from "../../traits/componentLabelTrait";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export interface CalculatorItem {
    name: string;
    title?: string;
    coefficient?: number;
    extension?: string;
}

export interface InformationItem {
    title: string;
    value?: string;
    title_color?: string;
    value_color?: string;
    title_backgroundColor?: string;
    value_backgroundColor?: string;
}

export interface PriceValue {
    value: number | null;
    calcs: Record<string, number>;
}

export const Props = {
    ...InputProps,
    prop_btnAddWidth: Define_ComponentProp<number>({
        prop: "prop_btnAddWidth", default: 160,
        name: InputProps.prop_btnAddWidth.name,
        description: InputProps.prop_btnAddWidth.description,
    }),
    prop_hasRules: Define_ComponentProp<boolean>({
        prop: "prop_hasRules", default: true,
        name: InputProps.prop_hasRules.name,
        description: InputProps.prop_hasRules.description,
    }),
    prop_value: Define_ComponentProp<string | number | null | CoreObservable.App<string | number | null>>({
        prop: "prop_value", default: null,
        name: Keys.category.components.input.props.value.name,
        description: Keys.category.components.input.props.value.description,
    }),
    prop_calculator: Define_ComponentProp<CalculatorItem[] | null>({
        prop: "prop_calculator", default: null,
        name: Keys.category.components.inputPrice.props.calculator.name,
        description: Keys.category.components.inputPrice.props.calculator.description,
    }),
    prop_calculatorColor: Define_ComponentProp<string | null>({
        prop: "prop_calculatorColor", default: null,
        name: Keys.category.components.inputPrice.props.calculatorColor.name,
        description: Keys.category.components.inputPrice.props.calculatorColor.description,
    }),
    prop_information: Define_ComponentProp<InformationItem[] | null>({
        prop: "prop_information", default: null,
        name: Keys.category.components.inputPrice.props.information.name,
        description: Keys.category.components.inputPrice.props.information.description,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = Omit<ExtractPropsType<typeof Props>, "prop_value"> & {
    prop_value: string | number | null | CoreObservable.App<string | number | null>;
} & ComponentLabelPropsType;
export type PropsConfigType = Omit<ExtractPropsConfigType<typeof Props>, "prop_value"> & {
    prop_value?: string | number | null | CoreObservable.App<string | number | null>;
} & ExtractPropsConfigType<typeof ComponentLabelTrait.props>;

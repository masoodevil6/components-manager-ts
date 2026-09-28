import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export interface SelectCustomSimpleOption {
    id: string | number;
    name: string | number;
    prefix: string | number;
}

export enum SelectTypeShow {
    JUST_NAME = "just_name",
    JUST_PREFIX = "just_prefix",
    BOTH = "both",
}

export const Props = {
    prop_selectName: Define_ComponentProp<string | null>({prop: "prop_selectName", default: null, name: Keys.category.components.selectCustomSimple.props.selectName.name, description: Keys.category.components.selectCustomSimple.props.selectName.description}),
    prop_selectDisable: Define_ComponentProp<boolean>({prop: "prop_selectDisable", default: false, name: Keys.category.components.selectCustomSimple.props.selectDisable.name, description: Keys.category.components.selectCustomSimple.props.selectDisable.description}),
    prop_selectValue: Define_ComponentProp<string | number | null>({prop: "prop_selectValue", default: null, name: Keys.category.components.selectCustomSimple.props.selectValue.name, description: Keys.category.components.selectCustomSimple.props.selectValue.description}),
    prop_selectClass: Define_ComponentProp<string[]>({prop: "prop_selectClass", default: ["form-control"], name: Keys.category.components.selectCustomSimple.props.selectClass.name, description: Keys.category.components.selectCustomSimple.props.selectClass.description}),
    prop_selectStyles: Define_ComponentProp<Record<string, string>>({prop: "prop_selectStyles", default: {}, name: Keys.category.components.selectCustomSimple.props.selectStyles.name, description: Keys.category.components.selectCustomSimple.props.selectStyles.description}),
    prop_selectPlaceholder: Define_ComponentProp<string | null>({prop: "prop_selectPlaceholder", default: null, name: Keys.category.components.selectCustomSimple.props.selectPlaceholder.name, description: Keys.category.components.selectCustomSimple.props.selectPlaceholder.description}),
    prop_selectOptions: Define_ComponentProp<SelectCustomSimpleOption[] | null>({prop: "prop_selectOptions", default: null, name: Keys.category.components.selectCustomSimple.props.selectOptions.name, description: Keys.category.components.selectCustomSimple.props.selectOptions.description}),
    prop_selectTypeShow: Define_ComponentProp<SelectTypeShow>({prop: "prop_selectTypeShow", default: SelectTypeShow.BOTH, name: Keys.category.components.selectCustomSimple.props.selectTypeShow.name, description: Keys.category.components.selectCustomSimple.props.selectTypeShow.description}),
    prop_selectBorderTopLeftRadiusHas: Define_ComponentProp<boolean>({prop: "prop_selectBorderTopLeftRadiusHas", default: true, name: Keys.category.components.selectCustomSimple.props.selectBorderTopLeftRadiusHas.name, description: Keys.category.components.selectCustomSimple.props.selectBorderTopLeftRadiusHas.description}),
    prop_selectBorderTopRightRadiusHas: Define_ComponentProp<boolean>({prop: "prop_selectBorderTopRightRadiusHas", default: true, name: Keys.category.components.selectCustomSimple.props.selectBorderTopRightRadiusHas.name, description: Keys.category.components.selectCustomSimple.props.selectBorderTopRightRadiusHas.description}),
    prop_selectBorderBottomLeftRadiusHas: Define_ComponentProp<boolean>({prop: "prop_selectBorderBottomLeftRadiusHas", default: true, name: Keys.category.components.selectCustomSimple.props.selectBorderBottomLeftRadiusHas.name, description: Keys.category.components.selectCustomSimple.props.selectBorderBottomLeftRadiusHas.description}),
    prop_selectBorderBottomRightRadiusHas: Define_ComponentProp<boolean>({prop: "prop_selectBorderBottomRightRadiusHas", default: true, name: Keys.category.components.selectCustomSimple.props.selectBorderBottomRightRadiusHas.name, description: Keys.category.components.selectCustomSimple.props.selectBorderBottomRightRadiusHas.description}),
    prop_selectBorderTopHas: Define_ComponentProp<boolean>({prop: "prop_selectBorderTopHas", default: true, name: Keys.category.components.selectCustomSimple.props.selectBorderTopHas.name, description: Keys.category.components.selectCustomSimple.props.selectBorderTopHas.description}),
    prop_selectBorderRightHas: Define_ComponentProp<boolean>({prop: "prop_selectBorderRightHas", default: true, name: Keys.category.components.selectCustomSimple.props.selectBorderRightHas.name, description: Keys.category.components.selectCustomSimple.props.selectBorderRightHas.description}),
    prop_selectBorderBottomHas: Define_ComponentProp<boolean>({prop: "prop_selectBorderBottomHas", default: true, name: Keys.category.components.selectCustomSimple.props.selectBorderBottomHas.name, description: Keys.category.components.selectCustomSimple.props.selectBorderBottomHas.description}),
    prop_selectBorderLeftHas: Define_ComponentProp<boolean>({prop: "prop_selectBorderLeftHas", default: true, name: Keys.category.components.selectCustomSimple.props.selectBorderLeftHas.name, description: Keys.category.components.selectCustomSimple.props.selectBorderLeftHas.description}),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;

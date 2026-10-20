import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UtilConst from "@/util_consts";
import {Keys} from "../../../module_categories/languages";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export enum InputDescriptionResize {
    NONE = "none",
    BOTH = "both",
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical",
}

const translation = Keys.category.components.simpleComponent.inputDescriptionSimple;

export const Props = {
    prop_inputName: Define_ComponentProp<string | null>({prop: "prop_inputName", default: null, name: translation.props.inputName.name, description: translation.props.inputName.description}),
    prop_inputDisable: Define_ComponentProp<boolean>({prop: "prop_inputDisable", default: false, name: translation.props.inputDisable.name, description: translation.props.inputDisable.description}),
    prop_inputValue: Define_ComponentProp<string | null>({prop: "prop_inputValue", default: null, name: translation.props.inputValue.name, description: translation.props.inputValue.description}),
    prop_inputClass: Define_ComponentProp<string[]>({prop: "prop_inputClass", default: ["form-control"], name: translation.props.inputClass.name, description: translation.props.inputClass.description}),
    prop_inputStyles: Define_ComponentProp<Record<string, string>>({prop: "prop_inputStyles", default: {}, name: translation.props.inputStyles.name, description: translation.props.inputStyles.description}),
    prop_inputPlaceholder: Define_ComponentProp<string | null>({prop: "prop_inputPlaceholder", default: null, name: translation.props.inputPlaceholder.name, description: translation.props.inputPlaceholder.description}),
    prop_inputRows: Define_ComponentProp<number>({prop: "prop_inputRows", default: 4, name: translation.props.inputRows.name, description: translation.props.inputRows.description}),
    prop_inputResize: Define_ComponentProp<InputDescriptionResize>({prop: "prop_inputResize", default: InputDescriptionResize.VERTICAL, name: translation.props.inputResize.name, description: translation.props.inputResize.description}),
    prop_inputBorderColor: Define_ComponentProp<string | null>({prop: "prop_inputBorderColor", default: null, name: translation.props.inputBorderColor.name, description: translation.props.inputBorderColor.description}),
    prop_inputBorderColorFocus: Define_ComponentProp<string | null>({prop: "prop_inputBorderColorFocus", default: null, name: translation.props.inputBorderColorFocus.name, description: translation.props.inputBorderColorFocus.description}),
    prop_inputBorderWidth: Define_ComponentProp<UtilConst.Sizes>({prop: "prop_inputBorderWidth", default: UtilConst.Sizes.M, name: translation.props.inputBorderWidth.name, description: translation.props.inputBorderWidth.description}),
    prop_inputBorderRadius: Define_ComponentProp<UtilConst.Sizes>({prop: "prop_inputBorderRadius", default: UtilConst.Sizes.M, name: translation.props.inputBorderRadius.name, description: translation.props.inputBorderRadius.description}),
    prop_inputBorderTopLeftRadiusHas: Define_ComponentProp<boolean>({prop: "prop_inputBorderTopLeftRadiusHas", default: true, name: translation.props.inputBorderTopLeftRadiusHas.name, description: translation.props.inputBorderTopLeftRadiusHas.description}),
    prop_inputBorderTopRightRadiusHas: Define_ComponentProp<boolean>({prop: "prop_inputBorderTopRightRadiusHas", default: true, name: translation.props.inputBorderTopRightRadiusHas.name, description: translation.props.inputBorderTopRightRadiusHas.description}),
    prop_inputBorderBottomLeftRadiusHas: Define_ComponentProp<boolean>({prop: "prop_inputBorderBottomLeftRadiusHas", default: true, name: translation.props.inputBorderBottomLeftRadiusHas.name, description: translation.props.inputBorderBottomLeftRadiusHas.description}),
    prop_inputBorderBottomRightRadiusHas: Define_ComponentProp<boolean>({prop: "prop_inputBorderBottomRightRadiusHas", default: true, name: translation.props.inputBorderBottomRightRadiusHas.name, description: translation.props.inputBorderBottomRightRadiusHas.description}),
    prop_inputBorderTopHas: Define_ComponentProp<boolean>({prop: "prop_inputBorderTopHas", default: true, name: translation.props.inputBorderTopHas.name, description: translation.props.inputBorderTopHas.description}),
    prop_inputBorderRightHas: Define_ComponentProp<boolean>({prop: "prop_inputBorderRightHas", default: true, name: translation.props.inputBorderRightHas.name, description: translation.props.inputBorderRightHas.description}),
    prop_inputBorderBottomHas: Define_ComponentProp<boolean>({prop: "prop_inputBorderBottomHas", default: true, name: translation.props.inputBorderBottomHas.name, description: translation.props.inputBorderBottomHas.description}),
    prop_inputBorderLeftHas: Define_ComponentProp<boolean>({prop: "prop_inputBorderLeftHas", default: true, name: translation.props.inputBorderLeftHas.name, description: translation.props.inputBorderLeftHas.description}),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;

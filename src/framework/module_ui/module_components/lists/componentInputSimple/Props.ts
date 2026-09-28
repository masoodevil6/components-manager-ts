import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export enum InputSimpleTypes {
    STRING = "string", NUMBER = "number", EMAIL = "email", PASSWORD = "password", TEL = "tel", URL = "url", SEARCH = "search", DATE = "date", TIME = "time", DATETIME_LOCAL = "datetime-local",
}

export const Props = {
    prop_inputName: Define_ComponentProp<string | null>({ prop: "prop_inputName", default: null, name: Keys.category.components.inputSimple.props.inputName.name, description: Keys.category.components.inputSimple.props.inputName.description }),
    prop_inputDisable: Define_ComponentProp<boolean>({ prop: "prop_inputDisable", default: false, name: Keys.category.components.inputSimple.props.inputDisable.name, description: Keys.category.components.inputSimple.props.inputDisable.description }),
    prop_inputValue: Define_ComponentProp<string | null>({ prop: "prop_inputValue", default: null, name: Keys.category.components.inputSimple.props.inputValue.name, description: Keys.category.components.inputSimple.props.inputValue.description }),
    prop_inputClass: Define_ComponentProp<string[]>({ prop: "prop_inputClass", default: ["form-control"], name: Keys.category.components.inputSimple.props.inputClass.name, description: Keys.category.components.inputSimple.props.inputClass.description }),
    prop_inputStyles: Define_ComponentProp<Record<string, string>>({ prop: "prop_inputStyles", default: {}, name: Keys.category.components.inputSimple.props.inputStyles.name, description: Keys.category.components.inputSimple.props.inputStyles.description }),
    prop_inputType: Define_ComponentProp<InputSimpleTypes>({ prop: "prop_inputType", default: InputSimpleTypes.STRING, name: Keys.category.components.inputSimple.props.inputType.name, description: Keys.category.components.inputSimple.props.inputType.description }),
    prop_inputPlaceholder: Define_ComponentProp<string | null>({ prop: "prop_inputPlaceholder", default: null, name: Keys.category.components.inputSimple.props.inputPlaceholder.name, description: Keys.category.components.inputSimple.props.inputPlaceholder.description }),
    prop_inputFor: Define_ComponentProp<string | null>({ prop: "prop_inputFor", default: null, name: Keys.category.components.inputSimple.props.inputFor.name, description: Keys.category.components.inputSimple.props.inputFor.description }),
    prop_inputBorderTopLeftRadiusHas: Define_ComponentProp<boolean>({ prop: "prop_inputBorderTopLeftRadiusHas", default: true, name: Keys.category.components.inputSimple.props.inputBorderTopLeftRadiusHas.name, description: Keys.category.components.inputSimple.props.inputBorderTopLeftRadiusHas.description }),
    prop_inputBorderTopRightRadiusHas: Define_ComponentProp<boolean>({ prop: "prop_inputBorderTopRightRadiusHas", default: true, name: Keys.category.components.inputSimple.props.inputBorderTopRightRadiusHas.name, description: Keys.category.components.inputSimple.props.inputBorderTopRightRadiusHas.description }),
    prop_inputBorderBottomLeftRadiusHas: Define_ComponentProp<boolean>({ prop: "prop_inputBorderBottomLeftRadiusHas", default: true, name: Keys.category.components.inputSimple.props.inputBorderBottomLeftRadiusHas.name, description: Keys.category.components.inputSimple.props.inputBorderBottomLeftRadiusHas.description }),
    prop_inputBorderBottomRightRadiusHas: Define_ComponentProp<boolean>({ prop: "prop_inputBorderBottomRightRadiusHas", default: true, name: Keys.category.components.inputSimple.props.inputBorderBottomRightRadiusHas.name, description: Keys.category.components.inputSimple.props.inputBorderBottomRightRadiusHas.description }),
    prop_inputBorderTopHas: Define_ComponentProp<boolean>({ prop: "prop_inputBorderTopHas", default: true, name: Keys.category.components.inputSimple.props.inputBorderTopHas.name, description: Keys.category.components.inputSimple.props.inputBorderTopHas.description }),
    prop_inputBorderRightHas: Define_ComponentProp<boolean>({ prop: "prop_inputBorderRightHas", default: true, name: Keys.category.components.inputSimple.props.inputBorderRightHas.name, description: Keys.category.components.inputSimple.props.inputBorderRightHas.description }),
    prop_inputBorderBottomHas: Define_ComponentProp<boolean>({ prop: "prop_inputBorderBottomHas", default: true, name: Keys.category.components.inputSimple.props.inputBorderBottomHas.name, description: Keys.category.components.inputSimple.props.inputBorderBottomHas.description }),
    prop_inputBorderLeftHas: Define_ComponentProp<boolean>({ prop: "prop_inputBorderLeftHas", default: true, name: Keys.category.components.inputSimple.props.inputBorderLeftHas.name, description: Keys.category.components.inputSimple.props.inputBorderLeftHas.description }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;

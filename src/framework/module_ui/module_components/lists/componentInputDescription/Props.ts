import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UtilConst from "@/util_consts";
import type {ValidatorRule} from "@/util_validators";
import {Keys} from "../../../module_categories/languages";
import {ComponentLabelTrait, ComponentLabelPropsType} from "../../traits/componentLabelTrait";
import {InputDescriptionResize} from "../componentInputDescriptionSimple/Props";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export {InputDescriptionResize};

const translation = Keys.category.components.inputDescription;

export const Props = {
    prop_name: Define_ComponentProp<string | null>({prop: "prop_name", default: null, name: translation.props.name.name, description: translation.props.name.description}),
    prop_value: Define_ComponentProp<string | null>({prop: "prop_value", default: null, name: translation.props.value.name, description: translation.props.value.description}),
    prop_isDisable: Define_ComponentProp<boolean>({prop: "prop_isDisable", default: false, name: translation.props.isDisable.name, description: translation.props.isDisable.description}),
    prop_placeholder: Define_ComponentProp<string | null>({prop: "prop_placeholder", default: null, name: translation.props.placeholder.name, description: translation.props.placeholder.description}),
    prop_rows: Define_ComponentProp<number>({prop: "prop_rows", default: 4, name: translation.props.rows.name, description: translation.props.rows.description}),
    prop_resize: Define_ComponentProp<InputDescriptionResize>({prop: "prop_resize", default: InputDescriptionResize.VERTICAL, name: translation.props.resize.name, description: translation.props.resize.description}),
    prop_inputClass: Define_ComponentProp<string[]>({prop: "prop_inputClass", default: ["form-control"], name: translation.props.inputClass.name, description: translation.props.inputClass.description}),
    prop_inputStyles: Define_ComponentProp<Record<string, string>>({prop: "prop_inputStyles", default: {}, name: translation.props.inputStyles.name, description: translation.props.inputStyles.description}),
    prop_inputBorderColor: Define_ComponentProp<string | null>({prop: "prop_inputBorderColor", default: null, name: translation.props.inputBorderColor.name, description: translation.props.inputBorderColor.description}),
    prop_inputBorderColorFocus: Define_ComponentProp<string | null>({prop: "prop_inputBorderColorFocus", default: null, name: translation.props.inputBorderColorFocus.name, description: translation.props.inputBorderColorFocus.description}),
    prop_inputBorderWidth: Define_ComponentProp<UtilConst.Sizes>({prop: "prop_inputBorderWidth", default: UtilConst.Sizes.M, name: translation.props.inputBorderWidth.name, description: translation.props.inputBorderWidth.description}),
    prop_inputBorderRadius: Define_ComponentProp<UtilConst.Sizes>({prop: "prop_inputBorderRadius", default: UtilConst.Sizes.M, name: translation.props.inputBorderRadius.name, description: translation.props.inputBorderRadius.description}),
    prop_backgroundColorForm: Define_ComponentProp<string>({prop: "prop_backgroundColorForm", default: "var(--secondaryColor1)", name: translation.props.backgroundColorForm.name, description: translation.props.backgroundColorForm.description}),
    prop_formBorderRadius: Define_ComponentProp<UtilConst.Sizes>({prop: "prop_formBorderRadius", default: UtilConst.Sizes.M, name: translation.props.formBorderRadius.name, description: translation.props.formBorderRadius.description}),
    prop_title: Define_ComponentProp<string | null>({prop: "prop_title", default: null, name: translation.props.title.name, description: translation.props.title.description}),
    prop_hasRules: Define_ComponentProp<boolean>({prop: "prop_hasRules", default: false, name: translation.props.hasRules.name, description: translation.props.hasRules.description}),
    prop_isAbsoluteRule: Define_ComponentProp<boolean>({prop: "prop_isAbsoluteRule", default: false, name: translation.props.isAbsoluteRule.name, description: translation.props.isAbsoluteRule.description}),
    prop_listRules: Define_ComponentProp<ValidatorRule[]>({prop: "prop_listRules", default: [], name: translation.props.listRules.name, description: translation.props.listRules.description}),
    prop_msgRules: Define_ComponentProp<Record<string, string> | null>({prop: "prop_msgRules", default: null, name: translation.props.msgRules.name, description: translation.props.msgRules.description}),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props> & ComponentLabelPropsType;
export type PropsConfigType = ExtractPropsConfigType<typeof Props> & ExtractPropsConfigType<typeof ComponentLabelTrait.props>;

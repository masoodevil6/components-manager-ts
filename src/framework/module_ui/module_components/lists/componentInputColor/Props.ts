import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import type {ValidatorRule} from "@/util_validators";
import {Keys} from "../../../module_categories/languages";
import {ComponentLabelTrait, ComponentLabelPropsType} from "../../traits/componentLabelTrait";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

const inputProps = Keys.category.components.input.props;
const colorProps = Keys.category.components.inputColor.props;

export const Props = {
    prop_name: Define_ComponentProp<string | null>({prop: "prop_name", default: null, name: inputProps.name.name, description: inputProps.name.description}),
    prop_value: Define_ComponentProp<string | null>({prop: "prop_value", default: null, name: inputProps.value.name, description: inputProps.value.description}),
    prop_isDisable: Define_ComponentProp<boolean>({prop: "prop_isDisable", default: false, name: inputProps.isDisable.name, description: inputProps.isDisable.description}),
    prop_title: Define_ComponentProp<string | null>({prop: "prop_title", default: null, name: inputProps.title.name, description: inputProps.title.description}),
    prop_colorSelected: Define_ComponentProp<string | null>({prop: "prop_colorSelected", default: null, name: colorProps.colorSelected.name, description: colorProps.colorSelected.description}),
    prop_showTitleFront: Define_ComponentProp<boolean>({prop: "prop_showTitleFront", default: true, name: colorProps.showTitleFront.name, description: colorProps.showTitleFront.description}),
    prop_borderColor: Define_ComponentProp<string>({prop: "prop_borderColor", default: "var(--primaryColor1)", name: colorProps.borderColor.name, description: colorProps.borderColor.description}),
    prop_formClass: Define_ComponentProp<string[]>({prop: "prop_formClass", default: ["rounded"], name: colorProps.formClass.name, description: colorProps.formClass.description}),
    prop_formStyles: Define_ComponentProp<Record<string, string>>({prop: "prop_formStyles", default: {}, name: colorProps.formStyles.name, description: colorProps.formStyles.description}),
    prop_optionHeight: Define_ComponentProp<number>({prop: "prop_optionHeight", default: 500, name: colorProps.optionHeight.name, description: colorProps.optionHeight.description}),
    prop_optionWidth: Define_ComponentProp<number>({prop: "prop_optionWidth", default: 400, name: colorProps.optionWidth.name, description: colorProps.optionWidth.description}),
    prop_optionStyles: Define_ComponentProp<Record<string, string>>({prop: "prop_optionStyles", default: {}, name: colorProps.optionStyles.name, description: colorProps.optionStyles.description}),
    prop_backgroundColorBody: Define_ComponentProp<string>({prop: "prop_backgroundColorBody", default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1), name: colorProps.backgroundColorBody.name, description: colorProps.backgroundColorBody.description}),
    prop_colorBody: Define_ComponentProp<string>({prop: "prop_colorBody", default: "var(--darkColor1)", name: colorProps.colorBody.name, description: colorProps.colorBody.description}),
    prop_colorIconClear: Define_ComponentProp<string | null>({prop: "prop_colorIconClear", default: null, name: colorProps.colorIconClear.name, description: colorProps.colorIconClear.description}),
    prop_colorIconEmpty: Define_ComponentProp<string | null>({prop: "prop_colorIconEmpty", default: null, name: colorProps.colorIconEmpty.name, description: colorProps.colorIconEmpty.description}),
    prop_hasRules: Define_ComponentProp<boolean>({prop: "prop_hasRules", default: true, name: colorProps.hasRules.name, description: colorProps.hasRules.description}),
    prop_isAbsoluteRule: Define_ComponentProp<boolean>({prop: "prop_isAbsoluteRule", default: true, name: colorProps.isAbsoluteRule.name, description: colorProps.isAbsoluteRule.description}),
    prop_listRules: Define_ComponentProp<ValidatorRule[]>({prop: "prop_listRules", default: [], name: colorProps.listRules.name, description: colorProps.listRules.description}),
    prop_msgRules: Define_ComponentProp<Record<string, string> | null>({prop: "prop_msgRules", default: null, name: colorProps.msgRules.name, description: colorProps.msgRules.description}),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props> & ComponentLabelPropsType;
export type PropsConfigType = ExtractPropsConfigType<typeof Props> & ExtractPropsConfigType<typeof ComponentLabelTrait.props>;

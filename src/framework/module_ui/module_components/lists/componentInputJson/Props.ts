import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import type {ValidatorRule} from "@/util_validators";
import {Keys} from "../../../module_categories/languages";
import {ComponentLabelTrait, ComponentLabelPropsType} from "../../traits/componentLabelTrait";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

const translation = Keys.category.components.inputJson;

export const Props = {
    prop_name: Define_ComponentProp<string | null>({prop: "prop_name", default: null, name: translation.props.name.name, description: translation.props.name.description}),
    prop_value: Define_ComponentProp<string>({prop: "prop_value", default: "{}", name: translation.props.value.name, description: translation.props.value.description}),
    prop_isDisable: Define_ComponentProp<boolean>({prop: "prop_isDisable", default: false, name: translation.props.isDisable.name, description: translation.props.isDisable.description}),
    prop_placeholder: Define_ComponentProp<string | null>({prop: "prop_placeholder", default: null, name: translation.props.placeholder.name, description: translation.props.placeholder.description}),
    prop_title: Define_ComponentProp<string | null>({prop: "prop_title", default: null, name: translation.props.title.name, description: translation.props.title.description}),
    prop_hasHeader: Define_ComponentProp<boolean>({prop: "prop_hasHeader", default: true, name: translation.props.hasHeader.name, description: translation.props.hasHeader.description}),
    prop_headerTitle: Define_ComponentProp<string | null>({prop: "prop_headerTitle", default: null, name: translation.props.headerTitle.name, description: translation.props.headerTitle.description}),
    prop_numbersBackgroundColor: Define_ComponentProp<string>({prop: "prop_numbersBackgroundColor", default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_2), name: translation.props.numbersBackgroundColor.name, description: translation.props.numbersBackgroundColor.description}),
    prop_numbersColor: Define_ComponentProp<string>({prop: "prop_numbersColor", default: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1), name: translation.props.numbersColor.name, description: translation.props.numbersColor.description}),
    prop_numberActiveBackgroundColor: Define_ComponentProp<string>({prop: "prop_numberActiveBackgroundColor", default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_4), name: translation.props.numberActiveBackgroundColor.name, description: translation.props.numberActiveBackgroundColor.description}),
    prop_lineActiveBackgroundColor: Define_ComponentProp<string>({prop: "prop_lineActiveBackgroundColor", default: UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_4), name: translation.props.lineActiveBackgroundColor.name, description: translation.props.lineActiveBackgroundColor.description}),
    prop_themeLightBackgroundColor: Define_ComponentProp<string>({prop: "prop_themeLightBackgroundColor", default: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1), name: translation.props.themeLightBackgroundColor.name, description: translation.props.themeLightBackgroundColor.description}),
    prop_themeDarkBackgroundColor: Define_ComponentProp<string>({prop: "prop_themeDarkBackgroundColor", default: UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_4), name: translation.props.themeDarkBackgroundColor.name, description: translation.props.themeDarkBackgroundColor.description}),
    prop_isDarkTheme: Define_ComponentProp<boolean>({prop: "prop_isDarkTheme", default: false, name: translation.props.isDarkTheme.name, description: translation.props.isDarkTheme.description}),
    prop_editorHeight: Define_ComponentProp<string>({prop: "prop_editorHeight", default: "320px", name: translation.props.editorHeight.name, description: translation.props.editorHeight.description}),
    prop_backgroundColorForm: Define_ComponentProp<string>({prop: "prop_backgroundColorForm", default: "var(--secondaryColor1)", name: translation.props.backgroundColorForm.name, description: translation.props.backgroundColorForm.description}),
    prop_formBorderRadius: Define_ComponentProp<UtilConst.Sizes>({prop: "prop_formBorderRadius", default: UtilConst.Sizes.M, name: translation.props.formBorderRadius.name, description: translation.props.formBorderRadius.description}),
    prop_hasRules: Define_ComponentProp<boolean>({prop: "prop_hasRules", default: false, name: translation.props.hasRules.name, description: translation.props.hasRules.description}),
    prop_isAbsoluteRule: Define_ComponentProp<boolean>({prop: "prop_isAbsoluteRule", default: false, name: translation.props.isAbsoluteRule.name, description: translation.props.isAbsoluteRule.description}),
    prop_listRules: Define_ComponentProp<ValidatorRule[]>({prop: "prop_listRules", default: [], name: translation.props.listRules.name, description: translation.props.listRules.description}),
    prop_msgRules: Define_ComponentProp<Record<string, string> | null>({prop: "prop_msgRules", default: null, name: translation.props.msgRules.name, description: translation.props.msgRules.description}),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props> & ComponentLabelPropsType;
export type PropsConfigType = ExtractPropsConfigType<typeof Props> & ExtractPropsConfigType<typeof ComponentLabelTrait.props>;

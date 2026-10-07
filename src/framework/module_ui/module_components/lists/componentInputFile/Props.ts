import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import * as CoreLanguage from "@/core_languages";
import type {ValidatorRule} from "@/util_validators";
import {Keys} from "../../../module_categories/languages";
import {ComponentLabelTrait, ComponentLabelPropsType} from "../../traits/componentLabelTrait";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

const inputProps = Keys.category.components.input.props;
const fileProps = Keys.category.components.inputFile.props;

export interface FileItemError {file: File; errors: string[]}

export const Props = {
    prop_name: Define_ComponentProp<string | null>({prop: "prop_name", default: "NAME", name: inputProps.name.name, description: inputProps.name.description}),
    prop_isDisable: Define_ComponentProp<boolean>({prop: "prop_isDisable", default: false, name: inputProps.isDisable.name, description: inputProps.isDisable.description}),
    prop_title: Define_ComponentProp<string | null>({prop: "prop_title", default: null, name: inputProps.title.name, description: inputProps.title.description}),
    prop_accept: Define_ComponentProp<string>({prop: "prop_accept", default: "*", name: fileProps.accept.name, description: fileProps.accept.description}),
    prop_maxCount: Define_ComponentProp<number | null>({prop: "prop_maxCount", default: null, name: fileProps.maxCount.name, description: fileProps.maxCount.description}),
    prop_maxSize: Define_ComponentProp<number | null>({prop: "prop_maxSize", default: null, name: fileProps.maxSize.name, description: fileProps.maxSize.description}),
    prop_textValidateSize: Define_ComponentProp<string>({prop: "prop_textValidateSize", default: CoreLanguage.App.translate(Keys.category.components.inputFile.texts.validateSize) as any, name: fileProps.textValidateSize.name, description: fileProps.textValidateSize.description}),
    prop_textValidateAccept: Define_ComponentProp<string>({prop: "prop_textValidateAccept", default: CoreLanguage.App.translate(Keys.category.components.inputFile.texts.validateAccept) as any, name: fileProps.textValidateAccept.name, description: fileProps.textValidateAccept.description}),
    prop_borderColor: Define_ComponentProp<string | null>({prop: "prop_borderColor", default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_3), name: fileProps.borderColor.name, description: fileProps.borderColor.description}),
    prop_borderColorHover: Define_ComponentProp<string | null>({prop: "prop_borderColorHover", default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1), name: fileProps.borderColorHover.name, description: fileProps.borderColorHover.description}),
    prop_borderHeight: Define_ComponentProp<string>({prop: "prop_borderHeight", default: "150px", name: fileProps.borderHeight.name, description: fileProps.borderHeight.description}),
    prop_textColor: Define_ComponentProp<string | null>({prop: "prop_textColor", default: UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_3), name: fileProps.textColor.name, description: fileProps.textColor.description}),
    prop_text: Define_ComponentProp<string>({prop: "prop_text", default: CoreLanguage.App.translate(Keys.category.components.inputFile.texts.dropHint) as any, name: fileProps.text.name, description: fileProps.text.description}),
    prop_showListFiles: Define_ComponentProp<boolean>({prop: "prop_showListFiles", default: true, name: fileProps.showListFiles.name, description: fileProps.showListFiles.description}),
    prop_deleteBody: Define_ComponentProp<string>({prop: "prop_deleteBody", default: CoreLanguage.App.translate(Keys.category.components.inputFile.texts.deleteQuestion) as any, name: fileProps.deleteBody.name, description: fileProps.deleteBody.description}),
    prop_deleteBtnCancel: Define_ComponentProp<string>({prop: "prop_deleteBtnCancel", default: CoreLanguage.App.translate(Keys.category.components.inputFile.texts.cancel) as any, name: fileProps.deleteBtnCancel.name, description: fileProps.deleteBtnCancel.description}),
    prop_deleteBtnAccept: Define_ComponentProp<string>({prop: "prop_deleteBtnAccept", default: CoreLanguage.App.translate(Keys.category.components.inputFile.texts.accept) as any, name: fileProps.deleteBtnAccept.name, description: fileProps.deleteBtnAccept.description}),
    prop_backgroundColor_itemFile: Define_ComponentProp<string | null>({prop: "prop_backgroundColor_itemFile", default: UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1), name: fileProps.backgroundColorItemFile.name, description: fileProps.backgroundColorItemFile.description}),
    prop_backgroundColor_itemFile_invalid: Define_ComponentProp<string | null>({prop: "prop_backgroundColor_itemFile_invalid", default: UtilStyle.Css_Color(UtilConst.ColorMain.ERROR, UtilConst.ColorGrad.GRADE_1), name: fileProps.backgroundColorItemFileInvalid.name, description: fileProps.backgroundColorItemFileInvalid.description}),
    prop_color_itemFile: Define_ComponentProp<string | null>({prop: "prop_color_itemFile", default: UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_1), name: fileProps.colorItemFile.name, description: fileProps.colorItemFile.description}),
    prop_color_itemFile_icons: Define_ComponentProp<string | null>({prop: "prop_color_itemFile_icons", default: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1), name: fileProps.colorItemFileIcons.name, description: fileProps.colorItemFileIcons.description}),
    prop_hasRules: Define_ComponentProp<boolean>({prop: "prop_hasRules", default: true, name: inputProps.hasRules.name, description: inputProps.hasRules.description}),
    prop_isAbsoluteRule: Define_ComponentProp<boolean>({prop: "prop_isAbsoluteRule", default: true, name: inputProps.isAbsoluteRule.name, description: inputProps.isAbsoluteRule.description}),
    prop_listRules: Define_ComponentProp<ValidatorRule[]>({prop: "prop_listRules", default: [], name: inputProps.listRules.name, description: inputProps.listRules.description}),
    prop_msgRules: Define_ComponentProp<Record<string, string> | null>({prop: "prop_msgRules", default: null, name: inputProps.msgRules.name, description: inputProps.msgRules.description}),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props> & ComponentLabelPropsType;
export type PropsConfigType = ExtractPropsConfigType<typeof Props> & ExtractPropsConfigType<typeof ComponentLabelTrait.props>;

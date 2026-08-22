import {
    ComponentBase,
    defineComponentMethods,
    defineComponentPatterns,
    defineComponentSchema,
    defineComponentTemplate,
    GOG_ExtractName,
    GOG_ExtractNameValue,
    GOG_SetValue,
    GOG_ValueOf, IComponentProp
} from "../../core/ComponentBase";
import {ReactiveElement} from "../../core/ReactiveElement";
import {Observable} from "../../core/Observable";
import {ToolsCss} from "../../utils/ToolsCss";
import {ToolsComponents} from "./index";
import {ComponentCallBackType} from "../../core/ComponentBase";
import {Language} from "../../core/Language";
import {AppConfig} from "../../core/AppConfig";
import {
    Color,
    COLORS_GRAD,
    COLORS_MAIN,
    CssColorVar,
    IconsType, OPERATION, SizeCalc,
    SIZES, SizesType, SizeUnit,
    ToolsComponents_BorderRadius,
    ToolsComponents_BorderWidth, TranslateUnit, UNITS, Z_INDEXES
} from "../../utils/ToolsConsts";
import {TOOLS} from "../tools";
import {
    GOG_ComponentBasicConfigs_Component_keys,
    GOG_ComponentBasicConfigs_Component_parts,
    GOG_ComponentBasicConfigs_Component_Pattern,
    GOG_ComponentBasicConfigs_Component_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_keys,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_parts,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_value_parts,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_parts,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_keys,
    GOG_ComponentBasicConfigs_Component_Structure_parts,
    GOG_ComponentBasicConfigs_Component_Structure_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_Schema,
    GOG_ComponentBasicConfigs_partDoseNotBody,
    GOG_ComponentBasicProps_Component,
    GOG_ComponentBasicProps_Component_Structure,
    GOG_ComponentBasicProps_Component_Structure_FormInput,
    GOG_ComponentBasicProps_Component_Structure_FormInput_Value,
    GOG_ComponentBasicProps_Component_Structure_FormInput_Label,
} from "../../core/component/SetupComponent";
import {ToolsIcons} from "../icons";
import {
    ComponentIconMethodsType,
    ComponentIconPropsType
} from "./ComponentIcon";
import {
    ComponentRecyclerViewPropsType,
    ComponentRecyclerViewMethodsType
} from "./ComponentRecyclerView";
import {
    ComponentValidateMethodsType,
    ComponentValidatePropsType
} from "./ComponentValidate";
import {
    ComponentLabelMethodsType,
    ComponentLabelPropsType
} from "./ComponentLabel";
import {
    ComponentWindowConfirm,
    ComponentWindowConfirmMethodsType,
    ComponentWindowConfirmPropsType,
    ComponentWindowConfirm_Methods_CONFIRM_ComponentArgs,
    ComponentWindowConfirm_Methods_CONFIRM_DataArgs,
} from "./ComponentWindowConfirm";
import {
    ComponentTooltipDescriptionMethodsType,
    ComponentTooltipDescriptionPropsType
} from "./ComponentTooltipDescription";


export interface FileItemError {
    file: File;
    errors: string[];
}


export const ComponentInputFileProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput_Value,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput_Label,
    ///----------------------
    prop_name:                              "prop_name",
    prop_accept:                            "prop_accept",
    prop_maxCount:                          "prop_maxCount",
    prop_maxSize:                           "prop_maxSize",
    prop_textValidateSize:                  "prop_textValidateSize",
    prop_textValidateAccept:                "prop_textValidateAccept",
    prop_title:                             "prop_title",
    prop_borderColor:                       "prop_borderColor",
    prop_borderColorHover:                  "prop_borderColorHover",
    prop_borderHeight:                      "prop_borderHeight",
    prop_textColor:                         "prop_textColor",
    prop_text:                              "prop_text",
    prop_showListFiles:                     "prop_showListFiles",
    var_fileIsValid:                        "var_fileIsValid",
    var_fileIsNotValid:                     "var_fileIsNotValid",
    prop_deleteBody:                        "prop_deleteBody",
    prop_deleteBtnCancel:                   "prop_deleteBtnCancel",
    prop_deleteBtnAccept:                   "prop_deleteBtnAccept",
    prop_backgroundColor_itemFile:          "prop_backgroundColor_itemFile",
    prop_backgroundColor_itemFile_invalid:  "prop_backgroundColor_itemFile_invalid",
    prop_color_itemFile:                    "prop_color_itemFile",
    prop_color_itemFile_icons:              "prop_color_itemFile_icons",
    prop_isAbsoluteRule:                    "prop_isAbsoluteRule",
    prop_listRules:                         "prop_listRules",
    prop_msgRules:                          "prop_msgRules",
} as const;


const ComponentInputFileConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys,
        ///----------------------
        [ComponentInputFileProps.prop_name]: {
            name:               ComponentInputFileProps.prop_name,
            value:              GOG_SetValue<string>("NAME"),
        },
        [ComponentInputFileProps.prop_accept]: {
            name:               ComponentInputFileProps.prop_accept,
            value:              GOG_SetValue<string>("*"),
        },
        [ComponentInputFileProps.prop_maxCount]: {
            name:               ComponentInputFileProps.prop_maxCount,
            value:              GOG_SetValue<number | null>(null),
        },
        [ComponentInputFileProps.prop_maxSize]: {
            name:               ComponentInputFileProps.prop_maxSize,
            value:              GOG_SetValue<number | null>(null),
        },
        [ComponentInputFileProps.prop_textValidateSize]: {
            name:               ComponentInputFileProps.prop_textValidateSize,
            value:              GOG_SetValue<string>("حداکثر سایز فایل، باید {{fileMaxSize}} کیلوبایت باشد"),
        },
        [ComponentInputFileProps.prop_textValidateAccept]: {
            name:               ComponentInputFileProps.prop_textValidateAccept,
            value:              GOG_SetValue<string>("فرمت قابل پذیرش {{fileAccept}} می باشد"),
        },
        [ComponentInputFileProps.prop_title]: {
            name:               ComponentInputFileProps.prop_title,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentInputFileProps.prop_borderColor]: {
            name:               ComponentInputFileProps.prop_borderColor,
            value:              GOG_SetValue<CssColorVar | null>(Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_3)),
        },
        [ComponentInputFileProps.prop_borderColorHover]: {
            name:               ComponentInputFileProps.prop_borderColorHover,
            value:              GOG_SetValue<CssColorVar | null>(Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1)),
        },
        [ComponentInputFileProps.prop_borderHeight]: {
            name:               ComponentInputFileProps.prop_borderHeight,
            value:              GOG_SetValue<string>("150px"),
        },
        [ComponentInputFileProps.prop_textColor]: {
            name:               ComponentInputFileProps.prop_textColor,
            value:              GOG_SetValue<CssColorVar | null>(Color(COLORS_MAIN.DARK, COLORS_GRAD.GRADE_3)),
        },
        [ComponentInputFileProps.prop_text]: {
            name:               ComponentInputFileProps.prop_text,
            value:              GOG_SetValue<string>("لطفا فایل خود را بکشید و رها کنید یا برای انتخاب کلیک کنید"),
        },
        [ComponentInputFileProps.prop_showListFiles]: {
            name:               ComponentInputFileProps.prop_showListFiles,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentInputFileProps.var_fileIsValid]: {
            name:               ComponentInputFileProps.var_fileIsValid,
            value:              GOG_SetValue<File[] | null>(null),
        },
        [ComponentInputFileProps.var_fileIsNotValid]: {
            name:               ComponentInputFileProps.var_fileIsNotValid,
            value:              GOG_SetValue<FileItemError[] | null>(null),
        },
        [ComponentInputFileProps.prop_deleteBody]: {
            name:               ComponentInputFileProps.prop_deleteBody,
            value:              GOG_SetValue<string>("آیا از حذف فایل مطمئن هستید"),
        },
        [ComponentInputFileProps.prop_deleteBtnCancel]: {
            name:               ComponentInputFileProps.prop_deleteBtnCancel,
            value:              GOG_SetValue<string>("لغو"),
        },
        [ComponentInputFileProps.prop_deleteBtnAccept]: {
            name:               ComponentInputFileProps.prop_deleteBtnAccept,
            value:              GOG_SetValue<string>("تایید"),
        },
        [ComponentInputFileProps.prop_backgroundColor_itemFile]: {
            name:               ComponentInputFileProps.prop_backgroundColor_itemFile,
            value:              GOG_SetValue<CssColorVar | null>(Color(COLORS_MAIN.SECONDARY, COLORS_GRAD.GRADE_1)),
        },
        [ComponentInputFileProps.prop_backgroundColor_itemFile_invalid]: {
            name:               ComponentInputFileProps.prop_backgroundColor_itemFile_invalid,
            value:              GOG_SetValue<CssColorVar | null>(Color(COLORS_MAIN.ERROR, COLORS_GRAD.GRADE_1)),
        },
        [ComponentInputFileProps.prop_color_itemFile]: {
            name:               ComponentInputFileProps.prop_color_itemFile,
            value:              GOG_SetValue<CssColorVar | null>(Color(COLORS_MAIN.DARK, COLORS_GRAD.GRADE_1)),
        },
        [ComponentInputFileProps.prop_color_itemFile_icons]: {
            name:               ComponentInputFileProps.prop_color_itemFile_icons,
            value:              GOG_SetValue<CssColorVar | null>(Color(COLORS_MAIN.ERROR, COLORS_GRAD.GRADE_1)),
        },
        [ComponentInputFileProps.prop_isAbsoluteRule]: {
            name:               ComponentInputFileProps.prop_isAbsoluteRule,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentInputFileProps.prop_listRules]: {
            name:               ComponentInputFileProps.prop_listRules,
            value:              GOG_SetValue<any[]>([]),
        },
        [ComponentInputFileProps.prop_msgRules]: {
            name:               ComponentInputFileProps.prop_msgRules,
            value:              GOG_SetValue<Record<string, string> | null>(null),
        },
    },
    schemas: {
        ...GOG_ComponentBasicConfigs_Component_parts,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_parts,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_value_parts,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_parts,
        ///----------------------
        STRUCTURE: {
            name:               "part_structure"
        },
        LABEL: {
            name:               "part_label"
        },
        VALUE: {
            name:               "part_value"
        },
        BODY: {
            name:               "part_body"
        },
        BODY_TEXT: {
            name:               "part_body_text"
        },
        FOOTER: {
            name:               "part_footer"
        },
        FOOTER_FILES: {
            name:               "part_footer_files"
        },
        FOOTER_FILE_ITEM: {
            name:               "part_footer_file_item"
        },
        FOOTER_FILE_ITEM_INVALID: {
            name:               "part_footer_file_item_invalid"
        },
        FOOTER_FILES_TOOLTIPS: {
            name:               "part_footer_files_tooltips"
        },
        WINDOW_CONFIRM: {
            name:               "part_window_confirm"
        },
        VALIDATE: {
            name:               "part_validate"
        },
    },
    templates: {
        BODY: {
            name:                "body"
        },
    },
    methods: {
        CHANGE_FILES: {
            name:                      "fn_onChangeFiles",
            dataArgs: {
                FILES: {
                    name:              "FILES",
                    value:             GOG_SetValue<File[]>([]),
                },
                VALID_FILES: {
                    name:              "VALID_FILES",
                    value:             GOG_SetValue<File[]>([]),
                },
                INVALID_FILES: {
                    name:              "INVALID_FILES",
                    value:             GOG_SetValue<FileItemError[]>([]),
                },
            },
            componentArgs: {
                VALUE: {
                    name:              "VALUE"
                }
            }
        },
        DELETE_FILE: {
            name:                      "fn_deleteFile",
            dataArgs: {
                FILE_NAME: {
                    name:              "FILE_NAME",
                    value:             GOG_SetValue<string>(""),
                },
            },
            componentArgs: {
                VALUE: {
                    name:              "VALUE"
                }
            }
        },
    }
} as const;


export type ComponentInputFilePropsType =        GOG_ExtractNameValue<typeof ComponentInputFileConfigs.keys>
export type ComponentInputFileSchemaType =       GOG_ExtractName<typeof ComponentInputFileConfigs.schemas>
export type ComponentInputFileTemplatesType =    GOG_ExtractName<typeof ComponentInputFileConfigs.templates>

export type ComponentInputFile_Methods_CHANGE_FILES_ComponentArgs = GOG_ExtractName<typeof ComponentInputFileConfigs.methods.CHANGE_FILES.componentArgs>
export type ComponentInputFile_Methods_CHANGE_FILES_DataArgs =      GOG_ExtractNameValue<typeof ComponentInputFileConfigs.methods.CHANGE_FILES.dataArgs>
export type ComponentInputFile_Methods_DELETE_FILE_ComponentArgs =   GOG_ExtractName<typeof ComponentInputFileConfigs.methods.DELETE_FILE.componentArgs>
export type ComponentInputFile_Methods_DELETE_FILE_DataArgs =        GOG_ExtractNameValue<typeof ComponentInputFileConfigs.methods.DELETE_FILE.dataArgs>

export type ComponentInputFileMethodsType = {
    [ComponentInputFileConfigs.methods.CHANGE_FILES.name]: ComponentCallBackType<ComponentInputFile_Methods_CHANGE_FILES_ComponentArgs, ComponentInputFile_Methods_CHANGE_FILES_DataArgs>
    [ComponentInputFileConfigs.methods.DELETE_FILE.name]: ComponentCallBackType<ComponentInputFile_Methods_DELETE_FILE_ComponentArgs, ComponentInputFile_Methods_DELETE_FILE_DataArgs>
}


export abstract class ComponentInputFileBase extends ComponentBase<
    ComponentInputFilePropsType,
    ComponentInputFileSchemaType,
    ComponentInputFileTemplatesType,
    ComponentInputFileMethodsType
    > {

    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN = defineComponentPatterns<ComponentInputFilePropsType>({
        ...GOG_ComponentBasicConfigs_Component_Pattern(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Pattern(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Pattern(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Pattern(this),
        ///----------------------
        [ComponentInputFileConfigs.keys.prop_name.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_name.name,
            default:                                          ComponentInputFileConfigs.keys.prop_name.value,
            title:                                            Language.translate("components.input_file.prop.prop_name.title"),
            description:                                      Language.translate("components.input_file.prop.prop_name.description"),
        },
        [ComponentInputFileConfigs.keys.prop_accept.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_accept.name,
            default:                                          ComponentInputFileConfigs.keys.prop_accept.value,
            title:                                            Language.translate("components.input_file.prop.prop_accept.title"),
            description:                                      Language.translate("components.input_file.prop.prop_accept.description"),
        },
        [ComponentInputFileConfigs.keys.prop_maxCount.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_maxCount.name,
            default:                                          ComponentInputFileConfigs.keys.prop_maxCount.value,
            title:                                            Language.translate("components.input_file.prop.prop_maxCount.title"),
            description:                                      Language.translate("components.input_file.prop.prop_maxCount.description"),
        },
        [ComponentInputFileConfigs.keys.prop_maxSize.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_maxSize.name,
            default:                                          ComponentInputFileConfigs.keys.prop_maxSize.value,
            title:                                            Language.translate("components.input_file.prop.prop_maxSize.title"),
            description:                                      Language.translate("components.input_file.prop.prop_maxSize.description"),
        },
        [ComponentInputFileConfigs.keys.prop_textValidateSize.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_textValidateSize.name,
            default:                                          ComponentInputFileConfigs.keys.prop_textValidateSize.value,
            title:                                            Language.translate("components.input_file.prop.prop_textValidateSize.title"),
            description:                                      Language.translate("components.input_file.prop.prop_textValidateSize.description"),
        },
        [ComponentInputFileConfigs.keys.prop_textValidateAccept.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_textValidateAccept.name,
            default:                                          ComponentInputFileConfigs.keys.prop_textValidateAccept.value,
            title:                                            Language.translate("components.input_file.prop.prop_textValidateAccept.title"),
            description:                                      Language.translate("components.input_file.prop.prop_textValidateAccept.description"),
        },
        [ComponentInputFileConfigs.keys.prop_title.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_title.name,
            default:                                          ComponentInputFileConfigs.keys.prop_title.value,
            title:                                            Language.translate("components.input_file.prop.prop_title.title"),
            description:                                      Language.translate("components.input_file.prop.prop_title.description"),
        },
        [ComponentInputFileConfigs.keys.prop_borderColor.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_borderColor.name,
            default:                                          ComponentInputFileConfigs.keys.prop_borderColor.value,
            title:                                            Language.translate("components.input_file.prop.prop_borderColor.title"),
            description:                                      Language.translate("components.input_file.prop.prop_borderColor.description"),
        },
        [ComponentInputFileConfigs.keys.prop_borderColorHover.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_borderColorHover.name,
            default:                                          ComponentInputFileConfigs.keys.prop_borderColorHover.value,
            title:                                            Language.translate("components.input_file.prop.prop_borderColorHover.title"),
            description:                                      Language.translate("components.input_file.prop.prop_borderColorHover.description"),
        },
        [ComponentInputFileConfigs.keys.prop_borderHeight.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_borderHeight.name,
            default:                                          ComponentInputFileConfigs.keys.prop_borderHeight.value,
            title:                                            Language.translate("components.input_file.prop.prop_borderHeight.title"),
            description:                                      Language.translate("components.input_file.prop.prop_borderHeight.description"),
        },
        [ComponentInputFileConfigs.keys.prop_textColor.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_textColor.name,
            default:                                          ComponentInputFileConfigs.keys.prop_textColor.value,
            title:                                            Language.translate("components.input_file.prop.prop_textColor.title"),
            description:                                      Language.translate("components.input_file.prop.prop_textColor.description"),
        },
        [ComponentInputFileConfigs.keys.prop_text.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_text.name,
            default:                                          ComponentInputFileConfigs.keys.prop_text.value,
            title:                                            Language.translate("components.input_file.prop.prop_text.title"),
            description:                                      Language.translate("components.input_file.prop.prop_text.description"),
        },
        [ComponentInputFileConfigs.keys.prop_showListFiles.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_showListFiles.name,
            default:                                          ComponentInputFileConfigs.keys.prop_showListFiles.value,
            title:                                            Language.translate("components.input_file.prop.prop_showListFiles.title"),
            description:                                      Language.translate("components.input_file.prop.prop_showListFiles.description"),
        },
        [ComponentInputFileConfigs.keys.var_fileIsValid.name]: {
            prop:                                             ComponentInputFileConfigs.keys.var_fileIsValid.name,
            default:                                          ComponentInputFileConfigs.keys.var_fileIsValid.value,
            title:                                            Language.translate("components.input_file.var.var_fileIsValid.title"),
            description:                                      Language.translate("components.input_file.var.var_fileIsValid.description"),
        },
        [ComponentInputFileConfigs.keys.var_fileIsNotValid.name]: {
            prop:                                             ComponentInputFileConfigs.keys.var_fileIsNotValid.name,
            default:                                          ComponentInputFileConfigs.keys.var_fileIsNotValid.value,
            title:                                            Language.translate("components.input_file.var.var_fileIsNotValid.title"),
            description:                                      Language.translate("components.input_file.var.var_fileIsNotValid.description"),
        },
        [ComponentInputFileConfigs.keys.prop_deleteBody.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_deleteBody.name,
            default:                                          ComponentInputFileConfigs.keys.prop_deleteBody.value,
            title:                                            Language.translate("components.input_file.prop.prop_deleteBody.title"),
            description:                                      Language.translate("components.input_file.prop.prop_deleteBody.description"),
        },
        [ComponentInputFileConfigs.keys.prop_deleteBtnCancel.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_deleteBtnCancel.name,
            default:                                          ComponentInputFileConfigs.keys.prop_deleteBtnCancel.value,
            title:                                            Language.translate("components.input_file.prop.prop_deleteBtnCancel.title"),
            description:                                      Language.translate("components.input_file.prop.prop_deleteBtnCancel.description"),
        },
        [ComponentInputFileConfigs.keys.prop_deleteBtnAccept.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_deleteBtnAccept.name,
            default:                                          ComponentInputFileConfigs.keys.prop_deleteBtnAccept.value,
            title:                                            Language.translate("components.input_file.prop.prop_deleteBtnAccept.title"),
            description:                                      Language.translate("components.input_file.prop.prop_deleteBtnAccept.description"),
        },
        [ComponentInputFileConfigs.keys.prop_backgroundColor_itemFile.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_backgroundColor_itemFile.name,
            default:                                          ComponentInputFileConfigs.keys.prop_backgroundColor_itemFile.value,
            title:                                            Language.translate("components.input_file.prop.prop_backgroundColor_itemFile.title"),
            description:                                      Language.translate("components.input_file.prop.prop_backgroundColor_itemFile.description"),
        },
        [ComponentInputFileConfigs.keys.prop_backgroundColor_itemFile_invalid.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_backgroundColor_itemFile_invalid.name,
            default:                                          ComponentInputFileConfigs.keys.prop_backgroundColor_itemFile_invalid.value,
            title:                                            Language.translate("components.input_file.prop.prop_backgroundColor_itemFile_invalid.title"),
            description:                                      Language.translate("components.input_file.prop.prop_backgroundColor_itemFile_invalid.description"),
        },
        [ComponentInputFileConfigs.keys.prop_color_itemFile.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_color_itemFile.name,
            default:                                          ComponentInputFileConfigs.keys.prop_color_itemFile.value,
            title:                                            Language.translate("components.input_file.prop.prop_color_itemFile.title"),
            description:                                      Language.translate("components.input_file.prop.prop_color_itemFile.description"),
        },
        [ComponentInputFileConfigs.keys.prop_color_itemFile_icons.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_color_itemFile_icons.name,
            default:                                          ComponentInputFileConfigs.keys.prop_color_itemFile_icons.value,
            title:                                            Language.translate("components.input_file.prop.prop_color_itemFile_icons.title"),
            description:                                      Language.translate("components.input_file.prop.prop_color_itemFile_icons.description"),
        },
        [ComponentInputFileConfigs.keys.prop_isAbsoluteRule.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_isAbsoluteRule.name,
            default:                                          ComponentInputFileConfigs.keys.prop_isAbsoluteRule.value,
            title:                                            Language.translate("components.input_file.prop.prop_isAbsoluteRule.title"),
            description:                                      Language.translate("components.input_file.prop.prop_isAbsoluteRule.description"),
        },
        [ComponentInputFileConfigs.keys.prop_listRules.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_listRules.name,
            default:                                          ComponentInputFileConfigs.keys.prop_listRules.value,
            title:                                            Language.translate("components.input_file.prop.prop_listRules.title"),
            description:                                      Language.translate("components.input_file.prop.prop_listRules.description"),
        },
        [ComponentInputFileConfigs.keys.prop_msgRules.name]: {
            prop:                                             ComponentInputFileConfigs.keys.prop_msgRules.name,
            default:                                          ComponentInputFileConfigs.keys.prop_msgRules.value,
            title:                                            Language.translate("components.input_file.prop.prop_msgRules.title"),
            description:                                      Language.translate("components.input_file.prop.prop_msgRules.description"),
        },
    });


    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentInputFileSchemaType, ComponentInputFilePropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Schema(this),
        ///----------------------
        STRUCTURE: {
            part:               ComponentInputFileConfigs.schemas.STRUCTURE.name,
            title:              Language.translate("components.input_file.schema.structure.title"),
            description:        Language.translate("components.input_file.schema.structure.description"),
            props: []
        },
        LABEL: {
            part:               ComponentInputFileConfigs.schemas.LABEL.name,
            title:              Language.translate("components.input_file.schema.label.title"),
            description:        Language.translate("components.input_file.schema.label.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_title.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_textValidateSize.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_textValidateAccept.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_maxCount.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_maxSize.name],
            ]
        },
        VALUE: {
            part:               ComponentInputFileConfigs.schemas.VALUE.name,
            title:              Language.translate("components.input_file.schema.value.title"),
            description:        Language.translate("components.input_file.schema.value.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_name.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_accept.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_maxCount.name],
            ]
        },
        BODY: {
            part:               ComponentInputFileConfigs.schemas.BODY.name,
            title:              Language.translate("components.input_file.schema.body.title"),
            description:        Language.translate("components.input_file.schema.body.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_borderColor.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_borderColorHover.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_borderHeight.name],
            ]
        },
        BODY_TEXT: {
            part:               ComponentInputFileConfigs.schemas.BODY_TEXT.name,
            title:              Language.translate("components.input_file.schema.body_text.title"),
            description:        Language.translate("components.input_file.schema.body_text.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_textColor.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_text.name],
            ]
        },
        FOOTER: {
            part:               ComponentInputFileConfigs.schemas.FOOTER.name,
            title:              Language.translate("components.input_file.schema.footer.title"),
            description:        Language.translate("components.input_file.schema.footer.description"),
            props: []
        },
        FOOTER_FILES: {
            part:               ComponentInputFileConfigs.schemas.FOOTER_FILES.name,
            title:              Language.translate("components.input_file.schema.footer_files.title"),
            description:        Language.translate("components.input_file.schema.footer_files.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_showListFiles.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.var_fileIsValid.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.var_fileIsNotValid.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_backgroundColor_itemFile.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_backgroundColor_itemFile_invalid.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_color_itemFile.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_color_itemFile_icons.name],
            ]
        },
        FOOTER_FILE_ITEM: {
            part:               ComponentInputFileConfigs.schemas.FOOTER_FILE_ITEM.name,
            title:              Language.translate("components.input_file.schema.footer_file_item.title"),
            description:        Language.translate("components.input_file.schema.footer_file_item.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_color_itemFile.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_color_itemFile_icons.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_backgroundColor_itemFile.name],
            ]
        },
        FOOTER_FILE_ITEM_INVALID: {
            part:               ComponentInputFileConfigs.schemas.FOOTER_FILE_ITEM_INVALID.name,
            title:              Language.translate("components.input_file.schema.footer_file_item_invalid.title"),
            description:        Language.translate("components.input_file.schema.footer_file_item_invalid.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_color_itemFile.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_backgroundColor_itemFile_invalid.name],
            ]
        },
        FOOTER_FILES_TOOLTIPS: {
            part:               ComponentInputFileConfigs.schemas.FOOTER_FILES_TOOLTIPS.name,
            title:              Language.translate("components.input_file.schema.footer_files_tooltips.title"),
            description:        Language.translate("components.input_file.schema.footer_files_tooltips.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_showListFiles.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.var_fileIsNotValid.name],
            ]
        },
        WINDOW_CONFIRM: {
            part:               ComponentInputFileConfigs.schemas.WINDOW_CONFIRM.name,
            title:              Language.translate("components.input_file.schema.window_confirm.title"),
            description:        Language.translate("components.input_file.schema.window_confirm.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_deleteBody.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_deleteBtnCancel.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_deleteBtnAccept.name],
            ]
        },
        VALIDATE: {
            part:               ComponentInputFileConfigs.schemas.VALIDATE.name,
            title:              Language.translate("components.input_file.schema.validate.title"),
            description:        Language.translate("components.input_file.schema.validate.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_isAbsoluteRule.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_listRules.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_msgRules.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.prop_title.name],
            ]
        },
    });


    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentInputFileMethodsType, ComponentInputFilePropsType>({
        [ComponentInputFileConfigs.methods.CHANGE_FILES.name]: {
            title:                                            Language.translate("components.input_file.methods.fn_onChangeFiles.title"),
            description:                                      Language.translate("components.input_file.methods.fn_onChangeFiles.description"),
            args: {
                [ComponentInputFileConfigs.methods.CHANGE_FILES.dataArgs.FILES.name]: {
                    prop:  "FILES",
                    default: GOG_SetValue<File[]>([]),
                    title: Language.translate("components.input_file.methods.fn_onChangeFiles.dataArgs.FILES.title"),
                    description: Language.translate("components.input_file.methods.fn_onChangeFiles.dataArgs.FILES.description"),
                } as IComponentProp<any>,
                [ComponentInputFileConfigs.methods.CHANGE_FILES.dataArgs.VALID_FILES.name]: {
                    prop:  "VALID_FILES",
                    default: GOG_SetValue<File[]>([]),
                    title: Language.translate("components.input_file.methods.fn_onChangeFiles.dataArgs.VALID_FILES.title"),
                    description: Language.translate("components.input_file.methods.fn_onChangeFiles.dataArgs.VALID_FILES.description"),
                } as IComponentProp<any>,
                [ComponentInputFileConfigs.methods.CHANGE_FILES.dataArgs.INVALID_FILES.name]: {
                    prop:  "INVALID_FILES",
                    default: GOG_SetValue<FileItemError[]>([]),
                    title: Language.translate("components.input_file.methods.fn_onChangeFiles.dataArgs.INVALID_FILES.title"),
                    description: Language.translate("components.input_file.methods.fn_onChangeFiles.dataArgs.INVALID_FILES.description"),
                } as IComponentProp<any>,
                [ComponentInputFileConfigs.methods.CHANGE_FILES.componentArgs.VALUE.name]: this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.var_fileIsValid.name],
            }
        },
        [ComponentInputFileConfigs.methods.DELETE_FILE.name]: {
            title:                                            Language.translate("components.input_file.methods.fn_deleteFile.title"),
            description:                                      Language.translate("components.input_file.methods.fn_deleteFile.description"),
            args: {
                [ComponentInputFileConfigs.methods.DELETE_FILE.dataArgs.FILE_NAME.name]: {
                    prop:  "FILE_NAME",
                    default: GOG_SetValue<string>(""),
                    title: Language.translate("components.input_file.methods.fn_deleteFile.dataArgs.FILE_NAME.title"),
                    description: Language.translate("components.input_file.methods.fn_deleteFile.dataArgs.FILE_NAME.description"),
                } as IComponentProp<any>,
                [ComponentInputFileConfigs.methods.DELETE_FILE.componentArgs.VALUE.name]: this._COMPONENT_PATTERN[ComponentInputFileConfigs.keys.var_fileIsValid.name],
            }
        },
    });


    /* ---------------------------------------------
        PROPERTYs Templates
    --------------------------------------------- */
    _COMPONENT_TEMPLATES = defineComponentTemplate<ComponentInputFileTemplatesType, ComponentInputFilePropsType>({
    } as any);


    /* ---------------------------------------------
        Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        return new ComponentInputFile(
            {
                classList: ["col-md-6", "col-12", "border", "p-2"],
                styles: {},

                prop_labelTitle: "Input File",
                prop_labelTooltipDescription: "Drag & drop or click to upload files",

                prop_title: "Upload files",
                prop_name: "file_example",
                prop_accept: "image/*,.pdf",
                prop_maxCount: 3,
                prop_maxSize: 5000,
                prop_showListFiles: true,
            } as any as ComponentInputFilePropsType,
            <ComponentInputFileMethodsType>{
                fn_onChangeFiles: function (event, dataArgs: ComponentInputFile_Methods_CHANGE_FILES_DataArgs, componentArgs: ComponentInputFile_Methods_CHANGE_FILES_ComponentArgs) {
                    console.log("files changed", dataArgs, componentArgs);
                },
                fn_deleteFile: function (event, dataArgs: ComponentInputFile_Methods_DELETE_FILE_DataArgs, componentArgs: ComponentInputFile_Methods_DELETE_FILE_ComponentArgs) {
                    console.log("file deleted", dataArgs, componentArgs);
                }
            }
        ).getElement() as HTMLElement;
    }
}


export class ComponentInputFile extends ComponentInputFileBase {

    private _COMPONENT_WINDOW_DELETE: ComponentWindowConfirm | null = null;
    private var_fileIsValid: Observable<File[] | null> = new Observable<File[] | null>(null);
    private var_fileIsNotValid: Observable<FileItemError[] | null> = new Observable<FileItemError[] | null>(null);

    /* ---------------------------------------------
       SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentInputFilePropsType,
        methods: ComponentInputFileMethodsType,
        events = null
    ) {
        super("input-file", null);
        super.renderComponent(config, methods, events);
    }


    /* ---------------------------------------------
       TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentInputFileConfigs.schemas.STRUCTURE.name)
    }

    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentInputFileConfigs.schemas.STRUCTURE.name:
                return this.template_render_structure(attrsDefault, data, extra);
            case ComponentInputFileConfigs.schemas.LABEL.name:
                return this.template_render_label(attrsDefault, data, extra);
            case ComponentInputFileConfigs.schemas.VALUE.name:
                return this.template_render_value(attrsDefault, data, extra);
            case ComponentInputFileConfigs.schemas.BODY.name:
                return this.template_render_body(attrsDefault, data, extra);
            case ComponentInputFileConfigs.schemas.BODY_TEXT.name:
                return this.template_render_body_text(attrsDefault, data, extra);
            case ComponentInputFileConfigs.schemas.FOOTER.name:
                return this.template_render_footer(attrsDefault, data, extra);
            case ComponentInputFileConfigs.schemas.FOOTER_FILES.name:
                return this.template_render_footer_files(attrsDefault, data, extra);
            case ComponentInputFileConfigs.schemas.FOOTER_FILE_ITEM.name:
                return this.template_render_footer_file_item(attrsDefault, data, extra);
            case ComponentInputFileConfigs.schemas.FOOTER_FILE_ITEM_INVALID.name:
                return this.template_render_footer_file_item_invalid(attrsDefault, data, extra);
            case ComponentInputFileConfigs.schemas.FOOTER_FILES_TOOLTIPS.name:
                return this.template_render_footer_files_tooltips(attrsDefault, data, extra);
            case ComponentInputFileConfigs.schemas.WINDOW_CONFIRM.name:
                return this.template_render_window_confirm(attrsDefault, data, extra);
            case ComponentInputFileConfigs.schemas.VALIDATE.name:
                return this.template_render_validate(attrsDefault, data, extra);
        }
        return ReactiveElement.part("section", {attrs: {...attrsDefault}});
    }


    private template_render_structure(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const children: any[] = [
                this.executeSchemaPart(ComponentInputFileConfigs.schemas.LABEL.name),
                this.executeSchemaPart(ComponentInputFileConfigs.schemas.VALUE.name),
                this.executeSchemaPart(ComponentInputFileConfigs.schemas.BODY.name),
                this.executeSchemaPart(ComponentInputFileConfigs.schemas.FOOTER.name),
                this.executeSchemaPart(ComponentInputFileConfigs.schemas.WINDOW_CONFIRM.name),
                this.executeSchemaPart(ComponentInputFileConfigs.schemas.VALIDATE.name),
            ];

            return ReactiveElement.part("div", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-input-file-${this._COMPONENT_RANDOM_ID}`,
                },
                className: ["position-relative"],
                children: children,
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_label(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_title = data[ComponentInputFileConfigs.keys.prop_title.name];
            const prop_textValidateSize = data[ComponentInputFileConfigs.keys.prop_textValidateSize.name];
            const prop_textValidateAccept = data[ComponentInputFileConfigs.keys.prop_textValidateAccept.name];
            const prop_accept = data[ComponentInputFileConfigs.keys.prop_accept.name];
            const prop_maxSize = data[ComponentInputFileConfigs.keys.prop_maxSize.name];

            const titleValue = prop_title instanceof Observable ? prop_title.get() : prop_title;
            if (titleValue == null) {
                return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
            }

            let textValidateSizeValue = prop_textValidateSize instanceof Observable ? prop_textValidateSize.get() : prop_textValidateSize;
            let textValidateAcceptValue = prop_textValidateAccept instanceof Observable ? prop_textValidateAccept.get() : prop_textValidateAccept;
            const acceptValue = prop_accept instanceof Observable ? prop_accept.get() : prop_accept;
            let maxSizeValue = prop_maxSize instanceof Observable ? prop_maxSize.get() : prop_maxSize;

            if (maxSizeValue != null) {
                maxSizeValue = (maxSizeValue / 10000).toFixed(3);
            }

            textValidateSizeValue = (textValidateSizeValue || "").replace("{{fileMaxSize}}", String(maxSizeValue));
            textValidateAcceptValue = (textValidateAcceptValue || "").replace("{{fileAccept}}", String(acceptValue));

            const tooltipDescription = `<div> - ${textValidateSizeValue} </div><div> - ${textValidateAcceptValue} </div>`;

            return new ToolsComponents.ComponentLabel(
                {
                    classList: [],
                    styles: {},
                    prop_labelTitle: titleValue,
                    prop_labelFor: `component-input-file-value-input-${this._COMPONENT_RANDOM_ID}`,
                    prop_labelTooltipDescription: tooltipDescription,
                } as any as ComponentLabelPropsType,
                <ComponentLabelMethodsType>{
                    fn_onClickLabel: function (event: Event, dataArgs: any, componentArgs: any) {
                    }
                }
            ).getReactiveElement();
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_value(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_name = data[ComponentInputFileConfigs.keys.prop_name.name];
            const prop_accept = data[ComponentInputFileConfigs.keys.prop_accept.name];
            const prop_maxCount = data[ComponentInputFileConfigs.keys.prop_maxCount.name];

            const nameValue = prop_name instanceof Observable ? prop_name.get() : prop_name;
            const acceptValue = prop_accept instanceof Observable ? prop_accept.get() : prop_accept;
            const maxCountValue = prop_maxCount instanceof Observable ? prop_maxCount.get() : prop_maxCount;

            return ReactiveElement.part("input", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-input-file-value-input-${this._COMPONENT_RANDOM_ID}`,
                    "type": "file",
                    "name": nameValue,
                    "accept": acceptValue,
                    ...(maxCountValue != null && maxCountValue > 1 ? {"multiple": "multiple"} : {}),
                },
                className: ["d-none"],
                on: {
                    change: (e: Event) => {
                        const input = e.target as HTMLInputElement;
                        this.fn_onChangeFiles(input.files);
                    }
                }
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_body(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_borderColor = data[ComponentInputFileConfigs.keys.prop_borderColor.name];
            const prop_borderColorHover = data[ComponentInputFileConfigs.keys.prop_borderColorHover.name];
            const prop_borderHeight = data[ComponentInputFileConfigs.keys.prop_borderHeight.name];

            const borderColorValue = prop_borderColor instanceof Observable ? prop_borderColor.get() : prop_borderColor;
            const borderColorHoverValue = prop_borderColorHover instanceof Observable ? prop_borderColorHover.get() : prop_borderColorHover;
            const borderHeightValue = prop_borderHeight instanceof Observable ? prop_borderHeight.get() : prop_borderHeight;

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-input-file-body-${this._COMPONENT_RANDOM_ID}`,
                    "draggable": "true",
                },
                className: ["p-2", "rounded", "position-relative"],
                styles: {
                    cursor: "pointer",
                    borderStyle: "dashed",
                    borderWidth: "2px",
                    borderColor: borderColorValue ?? "",
                    height: borderHeightValue ?? "150px",
                },
                children: [
                    this.executeSchemaPart(ComponentInputFileConfigs.schemas.BODY_TEXT.name),
                ],
                on: {
                    click: () => {
                        this.fn_clickToFileInput();
                    },
                    dragover: (e: Event) => {
                        this.fn_onDragStart(e);
                    },
                    dragenter: (e: Event) => {
                        this.fn_onDragStart(e);
                    },
                    dragleave: (e: Event) => {
                        this.fn_onDragEnd(e);
                    },
                    drop: (e: Event) => {
                        this.fn_onDrop(e);
                    },
                }
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_body_text(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_textColor = data[ComponentInputFileConfigs.keys.prop_textColor.name];
            const prop_text = data[ComponentInputFileConfigs.keys.prop_text.name];

            const textColorValue = prop_textColor instanceof Observable ? prop_textColor.get() : prop_textColor;
            const textValue = prop_text instanceof Observable ? prop_text.get() : prop_text;

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-input-file-body-text-${this._COMPONENT_RANDOM_ID}`,
                },
                className: ["position-absolute", "text-center"],
                styles: {
                    color: textColorValue ?? "",
                    fontSize: "11pt",
                    transform: "translate(-50%, -50%)",
                    left: "50%",
                    top: "50%",
                },
                children: [
                    ReactiveElement.b({
                        children: [textValue ?? ""],
                    })
                ],
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_footer(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            return ReactiveElement.part("div", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-input-file-footer-${this._COMPONENT_RANDOM_ID}`,
                },
                className: ["row", "mt-2"],
                children: [
                    this.executeSchemaPart(ComponentInputFileConfigs.schemas.FOOTER_FILES.name),
                ],
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_footer_files(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_showListFiles = data[ComponentInputFileConfigs.keys.prop_showListFiles.name];
            const var_fileIsValid = data[ComponentInputFileConfigs.keys.var_fileIsValid.name];
            const var_fileIsNotValid = data[ComponentInputFileConfigs.keys.var_fileIsNotValid.name];

            const showListFilesValue = prop_showListFiles instanceof Observable ? prop_showListFiles.get() : prop_showListFiles;

            if (!showListFilesValue) {
                return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
            }

            const validFilesObs = var_fileIsValid instanceof Observable ? var_fileIsValid : this.var_fileIsValid;
            const invalidFilesObs = var_fileIsNotValid instanceof Observable ? var_fileIsNotValid : this.var_fileIsNotValid;

            return new ToolsComponents.ComponentRecyclerView(
                {
                    attrs: {
                        ...attrsDefault,
                        "id": `component-input-file-footer-files-${this._COMPONENT_RANDOM_ID}`,
                    },
                    prop_formDirection: new Observable("vertical"),
                    prop_formComponents: Observable.computed(
                        (validFiles: File[] | null, invalidFiles: FileItemError[] | null) => {
                            const items: ReactiveElement[] = [];
                            let counter = 1;

                            if (Array.isArray(validFiles)) {
                                for (let i = 0; i < validFiles.length; i++) {
                                    const itemFile = validFiles[i];
                                    items.push(
                                        this.template_render_footer_file_item(attrsDefault, {
                                            itemFile,
                                            counter,
                                            itemIndex: i,
                                        }, extra)
                                    );
                                    counter++;
                                }
                            }

                            if (Array.isArray(invalidFiles)) {
                                for (let i = 0; i < invalidFiles.length; i++) {
                                    const itemFile = invalidFiles[i];
                                    items.push(
                                        this.template_render_footer_file_item_invalid(attrsDefault, {
                                            itemFile,
                                            counter,
                                            itemIndex: i,
                                        }, extra)
                                    );
                                    counter++;
                                }
                            }

                            return items;
                        },
                        [validFilesObs, invalidFilesObs],
                        this.getScope()
                    ),
                    prop_formClass: ["gap-0", "w-100"],
                } as any as ComponentRecyclerViewPropsType,
                <ComponentRecyclerViewMethodsType>{}
            ).getReactiveElement();
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_footer_file_item(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const itemFile: File = data.itemFile;
            const counter: number = data.counter;
            const prop_color_itemFile_icons = this.get(ComponentInputFileConfigs.keys.prop_color_itemFile_icons.name);

            const formatted = (itemFile.size / 10000).toFixed(3);

            return ReactiveElement.part("div", {
                attrs: {
                    ...attrsDefault,
                },
                className: ["d-flex", "align-items-center", "px-2", "py-1", "mx-0", "my-0", "border-bottom", "w-100"],
                styles: {
                    minHeight: "32px",
                    fontSize: "10pt",
                },
                children: [
                    ReactiveElement.span({
                        className: ["text-center", "text-muted", "flex-shrink-0"],
                        styles: { width: "30px" },
                        children: [String(counter)],
                    }),
                    ReactiveElement.b({
                        className: ["flex-grow-1", "mx-2"],
                        styles: {
                            fontSize: "10pt",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            direction: "ltr",
                            textAlign: "left",
                        },
                        children: [itemFile.name],
                    }),
                    ReactiveElement.span({
                        className: ["text-success", "flex-shrink-0"],
                        styles: { width: "70px", direction: "ltr", textAlign: "right" },
                        children: [
                            formatted, " KB",
                        ],
                    }),
                    new ToolsComponents.ComponentIcon(
                        {
                            classList: ["flex-shrink-0", "text-danger", "ms-2"],
                            styles: { cursor: "pointer" },
                            prop_iconClass: [],
                            prop_iconStyles: {
                                fontSize: "14pt",
                                margin: "0",
                                cursor: "pointer",
                            },
                            prop_icon: ToolsIcons.icon_delete({ size: 16, primaryColor: prop_color_itemFile_icons }),
                        } as any as ComponentIconPropsType,
                        <ComponentIconMethodsType>{
                            fn_onClickIcon: (event: Event, dataArgs: any, componentArgs: any) => {
                                this.fn_showWindowDelete(event, itemFile.name);
                            }
                        }
                    ).getReactiveElement(),
                ],
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_footer_file_item_invalid(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const itemFile: FileItemError = data.itemFile;
            const counter: number = data.counter;
            const itemIndex: number = data.itemIndex;

            const formatted = (itemFile.file.size / 10000).toFixed(3);

            let htmlError = "";
            if (itemFile.errors && Array.isArray(itemFile.errors)) {
                for (const itemError of itemFile.errors) {
                    htmlError += `<div> - ${itemError}</div>`;
                }
            }

            return ReactiveElement.part("div", {
                attrs: {
                    ...attrsDefault,
                },
                className: ["d-flex", "align-items-center", "px-2", "py-1", "mx-0", "my-0", "border-bottom", "w-100"],
                styles: {
                    minHeight: "32px",
                    fontSize: "10pt",
                },
                children: [
                    ReactiveElement.span({
                        className: ["text-center", "text-muted", "flex-shrink-0"],
                        styles: { width: "30px" },
                        children: [String(counter)],
                    }),
                    ReactiveElement.span({
                        className: ["flex-grow-1", "mx-2"],
                        styles: {
                            fontSize: "10pt",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            direction: "ltr",
                            textAlign: "left",
                        },
                        children: [itemFile.file.name],
                    }),
                    ReactiveElement.span({
                        className: ["text-success", "flex-shrink-0"],
                        styles: { width: "70px", direction: "ltr", textAlign: "right" },
                        children: [
                            formatted, " KB",
                        ],
                    }),
                    new ToolsComponents.ComponentTooltipDescription(
                        {
                            classList: [],
                            styles: {},
                            prop_icon: "?",
                            prop_description: htmlError,
                        } as any as ComponentTooltipDescriptionPropsType,
                        <ComponentTooltipDescriptionMethodsType>{}
                    ).getReactiveElement(),
                ],
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_footer_files_tooltips(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_showListFiles = data[ComponentInputFileConfigs.keys.prop_showListFiles.name];
            const var_fileIsNotValid = data[ComponentInputFileConfigs.keys.var_fileIsNotValid.name];

            const showListFilesValue = prop_showListFiles instanceof Observable ? prop_showListFiles.get() : prop_showListFiles;
            const invalidFiles = var_fileIsNotValid instanceof Observable ? var_fileIsNotValid.get() : var_fileIsNotValid;

            if (!showListFilesValue || !Array.isArray(invalidFiles)) {
                return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
            }

            const children: (ReactiveElement | string)[] = [];

            for (let i = 0; i < invalidFiles.length; i++) {
                const itemFile = invalidFiles[i];

                let htmlError = "";
                if (itemFile.errors && Array.isArray(itemFile.errors)) {
                    for (const itemError of itemFile.errors) {
                        htmlError += `<div> - ${itemError}</div>`;
                    }
                }

                children.push(
                    new ToolsComponents.ComponentTooltipDescription(
                        {
                            classList: ["fileDelete", "col-1"],
                            styles: {},
                            prop_icon: "?",
                            prop_description: htmlError,
                        } as any as ComponentTooltipDescriptionPropsType,
                        <ComponentTooltipDescriptionMethodsType>{}
                    ).getReactiveElement()
                );
            }

            return ReactiveElement.part("div", {
                attrs: {
                    ...attrsDefault,
                },
                className: [],
                children: children,
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_window_confirm(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_deleteBody = data[ComponentInputFileConfigs.keys.prop_deleteBody.name];
            const prop_deleteBtnCancel = data[ComponentInputFileConfigs.keys.prop_deleteBtnCancel.name];
            const prop_deleteBtnAccept = data[ComponentInputFileConfigs.keys.prop_deleteBtnAccept.name];

            const deleteBodyValue = prop_deleteBody instanceof Observable ? prop_deleteBody.get() : prop_deleteBody;
            const deleteBtnCancelValue = prop_deleteBtnCancel instanceof Observable ? prop_deleteBtnCancel.get() : prop_deleteBtnCancel;
            const deleteBtnAcceptValue = prop_deleteBtnAccept instanceof Observable ? prop_deleteBtnAccept.get() : prop_deleteBtnAccept;

            this._COMPONENT_WINDOW_DELETE = new ToolsComponents.ComponentWindowConfirm(
                {
                    classList: [],
                    styles: {},
                    prop_message: deleteBodyValue ?? "",
                    prop_acceptText: deleteBtnAcceptValue ?? "",
                    prop_cancelText: deleteBtnCancelValue ?? "",
                    prop_showBtnResize: false,
                } as any as ComponentWindowConfirmPropsType,
                <ComponentWindowConfirmMethodsType>{
                    fn_onConfirm: (event: Event, dataArgs: ComponentWindowConfirm_Methods_CONFIRM_DataArgs, componentArgs: ComponentWindowConfirm_Methods_CONFIRM_ComponentArgs) => {
                        const fileName = (this._COMPONENT_WINDOW_DELETE as any)?._pendingFileName ?? "";
                        this.fn_deleteFileSelected(event, fileName);
                    },
                }
            );

            return (this._COMPONENT_WINDOW_DELETE as any).getReactiveElement();
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_validate(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_isDisable = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_isAbsoluteRule = data[ComponentInputFileConfigs.keys.prop_isAbsoluteRule.name];
            const prop_listRules = data[ComponentInputFileConfigs.keys.prop_listRules.name];
            const prop_msgRules = data[ComponentInputFileConfigs.keys.prop_msgRules.name];
            const prop_title = data[ComponentInputFileConfigs.keys.prop_title.name];

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-input-file-validate-${this._COMPONENT_RANDOM_ID}`,
                },
                className: ["position-relative"],
                children: [
                    ReactiveElement.part("section", {
                        attrs: {...attrsDefault},
                        children: [
                            Observable.computed(
                                (isDisable: boolean, isAbsoluteRule: any, listRules: any, msgRules: any, title: any) => {
                                    if (isDisable) return null;
                                    if (!Array.isArray(listRules) || listRules.length === 0) return null;

                                    return new ToolsComponents.ComponentValidate(
                                        {
                                            classList: ["mt-1"],
                                            prop_reference: `component-input-file-body-${this._COMPONENT_RANDOM_ID}`,
                                            prop_isAbsolute: isAbsoluteRule ?? true,
                                            prop_listRules: listRules,
                                            prop_msgRules: msgRules ?? null,
                                            prop_title: title ?? "",
                                            prop_size: "m",
                                            prop_value: this.var_fileIsValid,
                                        } as any as ComponentValidatePropsType,
                                        <ComponentValidateMethodsType>{
                                            fn_onChangeValidate: (event: Event, dataArgs: any, componentArgs: any) => {
                                            }
                                        }
                                    ).getReactiveElement();
                                },
                                [
                                    prop_isDisable instanceof Observable ? prop_isDisable : new Observable(prop_isDisable),
                                    prop_isAbsoluteRule instanceof Observable ? prop_isAbsoluteRule : new Observable(prop_isAbsoluteRule),
                                    prop_listRules instanceof Observable ? prop_listRules : new Observable(prop_listRules),
                                    prop_msgRules instanceof Observable ? prop_msgRules : new Observable(prop_msgRules),
                                    prop_title instanceof Observable ? prop_title : new Observable(prop_title),
                                ],
                                this.getScope()
                            ),
                        ]
                    })
                ]
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
       FUNCTIONs
    --------------------------------------------- */
    private fn_getInput(): HTMLInputElement | null {
        return document.querySelector(`input#component-input-file-value-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
    }

    private fn_getDragArea(): HTMLElement | null {
        return document.querySelector(`section#component-input-file-body-${this._COMPONENT_RANDOM_ID}`) as HTMLElement | null;
    }

    private fn_clickToFileInput(): void {
        const elInput = this.fn_getInput();
        if (elInput != null) {
            elInput.click();
        }
    }

    private fn_onDragStart(event: Event): void {
        event.preventDefault();
        const elDrag = this.fn_getDragArea();
        if (elDrag != null) {
            elDrag.classList.add(`component-input-file-body-${this._COMPONENT_RANDOM_ID}-active`);
        }
    }

    private fn_onDragEnd(event: Event): void {
        event.preventDefault();
        const elDrag = this.fn_getDragArea();
        if (elDrag != null) {
            elDrag.classList.remove(`component-input-file-body-${this._COMPONENT_RANDOM_ID}-active`);
        }
    }

    private fn_onDrop(event: Event): void {
        this.fn_onDragEnd(event);
        const e = event as DragEvent;
        const files = e.dataTransfer?.files;
        if (files) {
            this.fn_onValidateCountFiles(files);
        }
    }

    private fn_onChangeFiles(files: FileList | null): void {
        if (files) {
            this.fn_onValidateCountFiles(files);
        }
    }

    private fn_onValidateCountFiles(files: FileList): void {
        const prop_textValidateSize = this.get(ComponentInputFileConfigs.keys.prop_textValidateSize.name);
        const prop_textValidateAccept = this.get(ComponentInputFileConfigs.keys.prop_textValidateAccept.name);
        const prop_accept = this.get(ComponentInputFileConfigs.keys.prop_accept.name);
        const prop_maxSize = this.get(ComponentInputFileConfigs.keys.prop_maxSize.name);
        const prop_maxCount = this.get(ComponentInputFileConfigs.keys.prop_maxCount.name);

        const dataTransfer = new DataTransfer();
        const filesAccepts: File[] = [];
        const filesUnAccepts: FileItemError[] = [];

        const elInput = this.fn_getInput();
        if (elInput != null) {
            let textValidateSizeValue = prop_textValidateSize ?? "Error File Size";
            let textValidateAcceptValue = prop_textValidateAccept ?? "Error File Accept";
            const acceptValue = prop_accept ?? "";
            let maxSizeValue = prop_maxSize ?? "";

            if (maxSizeValue != null && maxSizeValue !== "") {
                maxSizeValue = (maxSizeValue / 10000).toFixed(3);
            }

            textValidateSizeValue = textValidateSizeValue.replace("{{fileMaxSize}}", String(maxSizeValue));
            textValidateAcceptValue = textValidateAcceptValue.replace("{{fileAccept}}", String(acceptValue));

            let limit = files.length;
            if (prop_maxCount != null) {
                limit = Math.min(files.length, prop_maxCount);
            }

            let numberAccepted = 0;
            for (let i = 0; i < files.length; i++) {
                const fileSelected = files[i];
                (fileSelected as any).errors = [];

                const validateSize = this.fn_onValidateSizeFiles(fileSelected);
                const validateAccept = this.fn_onIsAccepted(fileSelected);

                let isValid = false;
                if (validateSize && validateAccept) {
                    isValid = true;
                }

                if (!validateSize) {
                    (fileSelected as any).errors.push(textValidateSizeValue);
                    isValid = false;
                }
                if (!validateAccept) {
                    (fileSelected as any).errors.push(textValidateAcceptValue);
                    isValid = false;
                }

                if (isValid) {
                    dataTransfer.items.add(fileSelected);
                    filesAccepts.push(fileSelected);
                    numberAccepted++;
                } else {
                    filesUnAccepts.push({
                        file: fileSelected,
                        errors: (fileSelected as any).errors,
                    });
                }

                if (limit <= numberAccepted) {
                    break;
                }
            }

            elInput.files = dataTransfer.files;
        }

        this.set(ComponentInputFileConfigs.keys.var_fileIsValid.name, filesAccepts);
        this.set(ComponentInputFileConfigs.keys.var_fileIsNotValid.name, filesUnAccepts);
        this.var_fileIsValid.set(filesAccepts);
        this.var_fileIsNotValid.set(filesUnAccepts);

        const params: ComponentInputFile_Methods_CHANGE_FILES_DataArgs = {
            FILES: filesAccepts as any,
            VALID_FILES: filesAccepts as any,
            INVALID_FILES: filesUnAccepts as any,
        };
        this.executeMethod(ComponentInputFileConfigs.methods.CHANGE_FILES.name, null, params);
    }

    private fn_onValidateSizeFiles(file: File): boolean {
        const prop_maxSize = this.get(ComponentInputFileConfigs.keys.prop_maxSize.name);
        if (file != null) {
            if (prop_maxSize != null) {
                const sizeValidate = prop_maxSize * 1000;
                return file.size <= sizeValidate;
            }
            return true;
        }
        return false;
    }

    private fn_onIsAccepted(file: File): boolean {
        const prop_accept = this.get(ComponentInputFileConfigs.keys.prop_accept.name);
        let accept = "";
        if (prop_accept != null) {
            accept = prop_accept;
        }

        if (!accept) return true;

        const mime = file.type;
        const name = file.name;

        return accept.split(',').some(type => {
            type = type.trim();
            if (type.endsWith('/*')) {
                return mime.startsWith(type.replace('/*', ''));
            } else if (type.startsWith('.')) {
                return name.toLowerCase().endsWith(type.toLowerCase());
            } else {
                return mime === type;
            }
        });
    }

    private fn_showWindowDelete(event: Event, filename: string): void {
        if (this._COMPONENT_WINDOW_DELETE) {
            (this._COMPONENT_WINDOW_DELETE as any)._pendingFileName = filename;
            this._COMPONENT_WINDOW_DELETE.call_open(event);
        }
    }

    private fn_deleteFileSelected(event: Event, filename: string): void {
        const elInput = this.fn_getInput();
        if (elInput != null) {
            const dt = new DataTransfer();
            const files = elInput.files;

            Array.from(files).forEach((file) => {
                if (file.name !== filename) {
                    dt.items.add(file);
                }
            });

            this.fn_onValidateCountFiles(dt.files);
        }

        const params: ComponentInputFile_Methods_DELETE_FILE_DataArgs = {
            FILE_NAME: filename as any,
        };
        this.executeMethod(ComponentInputFileConfigs.methods.DELETE_FILE.name, null, params);
    }
}

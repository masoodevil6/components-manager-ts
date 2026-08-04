import {
    ComponentBase,
    defineComponentMethods,
    defineComponentPatterns,
    defineComponentSchema,
    defineComponentTemplate,
    GOG_ExtractName,
    GOG_ExtractNameValue,
    GOG_SetValue,
    GOG_ValueOf
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
    IconsType,
    SIZES, SizesType, SizeUnit, UNITS,
    ToolsComponents_BorderRadius,
    ToolsComponents_BorderWidth, ToolsComponents_Padding, SizeCalc, OPERATION, ToolsComponents_Height,
    ToolsComponents_IconSize, StyleValue, ToolsComponents_FontSize
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
    ComponentButtonMethodsType,
    ComponentButtonPropsType,
    ComponentButton_Types
} from "./ComponentButton";
import {
    ComponentValidateMethodsType,
    ComponentValidatePropsType
} from "./ComponentValidate";
import {
    ComponentLabelMethodsType,
    ComponentLabelPropsType
} from "./ComponentLabel";
import {
    ComponentElementPosition,
    ComponentElementPositionMethodsType,
    ComponentElementPositionPropsType,
    ComponentElementPosition_positionTypes
} from "./ComponentElementPosition";
import {TranslateUnit} from "../../utils/ToolsConsts";
import {ComponentBorderMethodsType, ComponentBorderPropsType} from "./ComponentBorder";
import {ComponentInputPhone_Methods_INPUT_CHANGE_ComponentArgs} from "./ComponentInputPhone";
import {
    ComponentInputSize_Methods_INPUT_BLUR_ComponentArgs,
    ComponentInputSize_Methods_INPUT_FOCUS_ComponentArgs
} from "./ComponentInputSize";



export const ComponentInputProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput_Value,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput_Label,
    ///----------------------
    prop_title:                            "prop_title",
    prop_backgroundColorForm:              "prop_backgroundColorForm",
    prop_formBorderRadius:                 "prop_formBorderRadius",
    prop_colorIcon:                        "prop_colorIcon",
    prop_size:                             "prop_size",
    prop_inputClass:                       "prop_inputClass",
    prop_inputStyles:                      "prop_inputStyles",
    prop_inputBorderColor:                 "prop_inputBorderColor",
    prop_inputBorderColorFocus:            "prop_inputBorderColorFocus",
    prop_inputBorderWidth:                 "prop_inputBorderWidth",
    prop_inputBorderRadius:                "prop_inputBorderRadius",
    prop_type:                             "prop_type",
    prop_placeholder:                      "prop_placeholder",
    prop_icon:                             "prop_icon",
    prop_btnAddStatus:                     "prop_btnAddStatus",
    prop_btnAddWidth:                      "prop_btnAddWidth",
    prop_btnAddIcon:                       "prop_btnAddIcon",
    prop_btnAddTitle:                      "prop_btnAddTitle",
    prop_btnAddClass:                      "prop_btnAddClass",
    prop_btnColor:                         "prop_btnColor",
    prop_hasRules:                         "prop_hasRules",
    prop_isAbsoluteRule:                   "prop_isAbsoluteRule",
    prop_listRules:                        "prop_listRules",
    prop_msgRules:                         "prop_msgRules",
} as const;



export enum ComponentInput_Types {
    STRING  = "string",
    NUMBER  = "number",
    EMAIL   = "email",
    PASSWORD = "password",
    TEL     = "tel",
    URL     = "url",
    SEARCH  = "search",
    DATE    = "date",
    TIME    = "time",
    DATETIME_LOCAL = "datetime-local",
}


const ComponentInputConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys,
        ///----------------------
        [ComponentInputProps.prop_title]: {
            name:               ComponentInputProps.prop_title,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentInputProps.prop_backgroundColorForm]: {
            name:               ComponentInputProps.prop_backgroundColorForm,
            value:              GOG_SetValue<string>("var(--secondaryColor1)"),
        },
        [ComponentInputProps.prop_formBorderRadius]: {
            name:               ComponentInputProps.prop_formBorderRadius,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES>>(SIZES.M),
        },
        [ComponentInputProps.prop_colorIcon]: {
            name:               ComponentInputProps.prop_colorIcon,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentInputProps.prop_size]: {
            name:               ComponentInputProps.prop_size,
            value:              GOG_SetValue<string>(SIZES.M),
        },
        [ComponentInputProps.prop_inputClass]: {
            name:               ComponentInputProps.prop_inputClass,
            value:              GOG_SetValue<string[]>(["form-control"]),
        },
        [ComponentInputProps.prop_inputStyles]: {
            name:               ComponentInputProps.prop_inputStyles,
            value:              GOG_SetValue<Record<string, string>>({}),
        },
        [ComponentInputProps.prop_inputBorderColor]: {
            name:               ComponentInputProps.prop_inputBorderColor,
            value:              GOG_SetValue<string>("var(--primaryColor1)"),
        },
        [ComponentInputProps.prop_inputBorderColorFocus]: {
            name:               ComponentInputProps.prop_inputBorderColorFocus,
            value:              GOG_SetValue<string>("var(--secondaryColor1)"),
        },
        [ComponentInputProps.prop_inputBorderWidth]: {
            name:               ComponentInputProps.prop_inputBorderWidth,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES>>(SIZES.M),
        },
        [ComponentInputProps.prop_inputBorderRadius]: {
            name:               ComponentInputProps.prop_inputBorderRadius,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES>>(SIZES.M),
        },
        [ComponentInputProps.prop_type]: {
            name:               ComponentInputProps.prop_type,
            value:              GOG_SetValue<GOG_ValueOf<typeof ComponentInput_Types>>(ComponentInput_Types.STRING),
        },
        [ComponentInputProps.prop_placeholder]: {
            name:               ComponentInputProps.prop_placeholder,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentInputProps.prop_icon]: {
            name:               ComponentInputProps.prop_icon,
            value:              GOG_SetValue<IconsType | null>(null),
        },
        [ComponentInputProps.prop_btnAddStatus]: {
            name:               ComponentInputProps.prop_btnAddStatus,
            value:              GOG_SetValue<boolean>(false),
        },
        [ComponentInputProps.prop_btnAddWidth]: {
            name:               ComponentInputProps.prop_btnAddWidth,
            value:              GOG_SetValue<number>(120),
        },
        [ComponentInputProps.prop_btnAddIcon]: {
            name:               ComponentInputProps.prop_btnAddIcon,
            value:              GOG_SetValue<string>("&plus;"),
        },
        [ComponentInputProps.prop_btnAddTitle]: {
            name:               ComponentInputProps.prop_btnAddTitle,
            value:              GOG_SetValue<string>("add item"),
        },
        [ComponentInputProps.prop_btnAddClass]: {
            name:               ComponentInputProps.prop_btnAddClass,
            value:              GOG_SetValue<string[]>([]),
        },
        [ComponentInputProps.prop_btnColor]: {
            name:               ComponentInputProps.prop_btnColor,
            value:              GOG_SetValue<GOG_ValueOf<typeof ComponentButton_Types>>(ComponentButton_Types.SUBMIT),
        },
        [ComponentInputProps.prop_hasRules]: {
            name:               ComponentInputProps.prop_hasRules,
            value:              GOG_SetValue<boolean>(false),
        },
        [ComponentInputProps.prop_isAbsoluteRule]: {
            name:               ComponentInputProps.prop_isAbsoluteRule,
            value:              GOG_SetValue<boolean>(false),
        },
        [ComponentInputProps.prop_listRules]: {
            name:               ComponentInputProps.prop_listRules,
            value:              GOG_SetValue<any[]>([]),
        },
        [ComponentInputProps.prop_msgRules]: {
            name:               ComponentInputProps.prop_msgRules,
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
        FORM: {
            name:               "part_form"
        },
        INPUT: {
            name:               "part_input"
        },
        ICON_CLEAR: {
            name:               "part_icon_clear"
        },
        ICON: {
            name:               "part_icon"
        },
        BUTTON: {
            name:               "part_button"
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
        INPUT_CHANGE: {
            name:                      "fn_onInputChange",
            dataArgs: {
                VALUE: {
                    name:              "value",
                },
            },
            componentArgs: {}
        },
        INPUT_FOCUS: {
            name:                      "fn_onInputFocus",
            dataArgs: {
                VALUE: {
                    name:              "value",
                },
            },
            componentArgs: {}
        },
        INPUT_BLUR: {
            name:                      "fn_onInputBlur",
            dataArgs: {
                VALUE: {
                    name:              "value",
                },
            },
            componentArgs: {}
        },
        CLICK_BUTTON: {
            name:                      "fn_onClickButton",
            dataArgs: {
                VALUE: {
                    name:              "value",
                },
            },
            componentArgs: {}
        },
    }
} as const;



export type ComponentInputPropsType =                      GOG_ExtractNameValue<typeof ComponentInputConfigs.keys>
export type ComponentInputSchemaType =                     GOG_ExtractName<typeof ComponentInputConfigs.schemas>
export type ComponentInputTemplatesType =                  GOG_ExtractName<typeof ComponentInputConfigs.templates>

export type ComponentInput_Methods_INPUT_CHANGE_ComponentArgs =  GOG_ExtractName<typeof ComponentInputConfigs.methods.INPUT_CHANGE.componentArgs>
export type ComponentInput_Methods_INPUT_CHANGE_DataArgs =       GOG_ExtractNameValue<typeof ComponentInputConfigs.methods.INPUT_CHANGE.dataArgs>
export type ComponentInput_Methods_INPUT_FOCUS_ComponentArgs =   GOG_ExtractName<typeof ComponentInputConfigs.methods.INPUT_FOCUS.componentArgs>
export type ComponentInput_Methods_INPUT_FOCUS_DataArgs =        GOG_ExtractNameValue<typeof ComponentInputConfigs.methods.INPUT_FOCUS.dataArgs>
export type ComponentInput_Methods_INPUT_BLUR_ComponentArgs =    GOG_ExtractName<typeof ComponentInputConfigs.methods.INPUT_BLUR.componentArgs>
export type ComponentInput_Methods_INPUT_BLUR_DataArgs =         GOG_ExtractNameValue<typeof ComponentInputConfigs.methods.INPUT_BLUR.dataArgs>
export type ComponentInput_Methods_CLICK_BUTTON_ComponentArgs =  GOG_ExtractName<typeof ComponentInputConfigs.methods.CLICK_BUTTON.componentArgs>
export type ComponentInput_Methods_CLICK_BUTTON_DataArgs =       GOG_ExtractNameValue<typeof ComponentInputConfigs.methods.CLICK_BUTTON.dataArgs>

export type ComponentInputMethodsType = {
    [ComponentInputConfigs.methods.INPUT_CHANGE.name]: ComponentCallBackType<ComponentInput_Methods_INPUT_CHANGE_ComponentArgs, ComponentInput_Methods_INPUT_CHANGE_DataArgs>,
    [ComponentInputConfigs.methods.INPUT_FOCUS.name]:  ComponentCallBackType<ComponentInput_Methods_INPUT_FOCUS_ComponentArgs, ComponentInput_Methods_INPUT_FOCUS_DataArgs>,
    [ComponentInputConfigs.methods.INPUT_BLUR.name]:   ComponentCallBackType<ComponentInput_Methods_INPUT_BLUR_ComponentArgs, ComponentInput_Methods_INPUT_BLUR_DataArgs>,
    [ComponentInputConfigs.methods.CLICK_BUTTON.name]: ComponentCallBackType<ComponentInput_Methods_CLICK_BUTTON_ComponentArgs, ComponentInput_Methods_CLICK_BUTTON_DataArgs>,
}



export abstract class ComponentInputBase extends ComponentBase<
    ComponentInputPropsType,
    ComponentInputSchemaType,
    ComponentInputTemplatesType,
    ComponentInputMethodsType
> {

    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN = defineComponentPatterns<ComponentInputPropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Pattern(this),
            ///----------------------
            [ComponentInputConfigs.keys.prop_value.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_value.name,
                default:                                          ComponentInputConfigs.keys.prop_value.value,
                title:                                            Language.translate("components.public.props.prop_value.title"),
                description:                                      Language.translate("components.public.props.prop_value.description"),
            },
            [ComponentInputConfigs.keys.prop_title.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_title.name,
                default:                                          ComponentInputConfigs.keys.prop_title.value,
                title:                                            Language.translate("components.input.props.prop_title.title"),
                description:                                      Language.translate("components.input.props.prop_title.description"),
            },
            [ComponentInputConfigs.keys.prop_backgroundColorForm.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_backgroundColorForm.name,
                default:                                          ComponentInputConfigs.keys.prop_backgroundColorForm.value,
                title:                                            Language.translate("components.input.props.prop_backgroundColorForm.title"),
                description:                                      Language.translate("components.input.props.prop_backgroundColorForm.description"),
            },
            [ComponentInputConfigs.keys.prop_formBorderRadius.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_formBorderRadius.name,
                default:                                          ComponentInputConfigs.keys.prop_formBorderRadius.value,
                title:                                            Language.translate("components.input.props.prop_formBorderRadius.title"),
                description:                                      Language.translate("components.input.props.prop_formBorderRadius.description"),
            },
            [ComponentInputConfigs.keys.prop_colorIcon.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_colorIcon.name,
                default:                                          ComponentInputConfigs.keys.prop_colorIcon.value,
                title:                                            Language.translate("components.input.props.prop_colorIcon.title"),
                description:                                      Language.translate("components.input.props.prop_colorIcon.description"),
            },
            [ComponentInputConfigs.keys.prop_size.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_size.name,
                default:                                          ComponentInputConfigs.keys.prop_size.value,
                title:                                            Language.translate("components.input.props.prop_size.title"),
                description:                                      Language.translate("components.input.props.prop_size.description"),
            },
            [ComponentInputConfigs.keys.prop_inputClass.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_inputClass.name,
                default:                                          ComponentInputConfigs.keys.prop_inputClass.value,
                title:                                            Language.translate("components.input.props.prop_inputClass.title"),
                description:                                      Language.translate("components.input.props.prop_inputClass.description"),
            },
            [ComponentInputConfigs.keys.prop_inputStyles.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_inputStyles.name,
                default:                                          ComponentInputConfigs.keys.prop_inputStyles.value,
                title:                                            Language.translate("components.input.props.prop_inputStyles.title"),
                description:                                      Language.translate("components.input.props.prop_inputStyles.description"),
            },
            [ComponentInputConfigs.keys.prop_inputBorderColor.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_inputBorderColor.name,
                default:                                          ComponentInputConfigs.keys.prop_inputBorderColor.value,
                title:                                            Language.translate("components.input.props.prop_inputBorderColor.title"),
                description:                                      Language.translate("components.input.props.prop_inputBorderColor.description"),
            },
            [ComponentInputConfigs.keys.prop_inputBorderColorFocus.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_inputBorderColorFocus.name,
                default:                                          ComponentInputConfigs.keys.prop_inputBorderColorFocus.value,
                title:                                            Language.translate("components.input.props.prop_inputBorderColorFocus.title"),
                description:                                      Language.translate("components.input.props.prop_inputBorderColorFocus.description"),
            },
            [ComponentInputConfigs.keys.prop_inputBorderWidth.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_inputBorderWidth.name,
                default:                                          ComponentInputConfigs.keys.prop_inputBorderWidth.value,
                title:                                            Language.translate("components.input.props.prop_inputBorderWidth.title"),
                description:                                      Language.translate("components.input.props.prop_inputBorderWidth.description"),
            },
            [ComponentInputConfigs.keys.prop_inputBorderRadius.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_inputBorderRadius.name,
                default:                                          ComponentInputConfigs.keys.prop_inputBorderRadius.value,
                title:                                            Language.translate("components.input.props.prop_inputBorderRadius.title"),
                description:                                      Language.translate("components.input.props.prop_inputBorderRadius.description"),
            },
            [ComponentInputConfigs.keys.prop_type.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_type.name,
                default:                                          ComponentInputConfigs.keys.prop_type.value,
                title:                                            Language.translate("components.input.props.prop_type.title"),
                description:                                      Language.translate("components.input.props.prop_type.description"),
            },
            [ComponentInputConfigs.keys.prop_placeholder.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_placeholder.name,
                default:                                          ComponentInputConfigs.keys.prop_placeholder.value,
                title:                                            Language.translate("components.input.props.prop_placeholder.title"),
                description:                                      Language.translate("components.input.props.prop_placeholder.description"),
            },
            [ComponentInputConfigs.keys.prop_icon.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_icon.name,
                default:                                          ComponentInputConfigs.keys.prop_icon.value,
                title:                                            Language.translate("components.input.props.prop_icon.title"),
                description:                                      Language.translate("components.input.props.prop_icon.description"),
            },
            [ComponentInputConfigs.keys.prop_btnAddStatus.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_btnAddStatus.name,
                default:                                          ComponentInputConfigs.keys.prop_btnAddStatus.value,
                title:                                            Language.translate("components.input.props.prop_btnAddStatus.title"),
                description:                                      Language.translate("components.input.props.prop_btnAddStatus.description"),
            },
            [ComponentInputConfigs.keys.prop_btnAddWidth.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_btnAddWidth.name,
                default:                                          ComponentInputConfigs.keys.prop_btnAddWidth.value,
                title:                                            Language.translate("components.input.props.prop_btnAddWidth.title"),
                description:                                      Language.translate("components.input.props.prop_btnAddWidth.description"),
            },
            [ComponentInputConfigs.keys.prop_btnAddIcon.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_btnAddIcon.name,
                default:                                          ComponentInputConfigs.keys.prop_btnAddIcon.value,
                title:                                            Language.translate("components.input.props.prop_btnAddIcon.title"),
                description:                                      Language.translate("components.input.props.prop_btnAddIcon.description"),
            },
            [ComponentInputConfigs.keys.prop_btnAddTitle.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_btnAddTitle.name,
                default:                                          ComponentInputConfigs.keys.prop_btnAddTitle.value,
                title:                                            Language.translate("components.input.props.prop_btnAddTitle.title"),
                description:                                      Language.translate("components.input.props.prop_btnAddTitle.description"),
            },
            [ComponentInputConfigs.keys.prop_btnAddClass.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_btnAddClass.name,
                default:                                          ComponentInputConfigs.keys.prop_btnAddClass.value,
                title:                                            Language.translate("components.input.props.prop_btnAddClass.title"),
                description:                                      Language.translate("components.input.props.prop_btnAddClass.description"),
            },
            [ComponentInputConfigs.keys.prop_btnColor.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_btnColor.name,
                default:                                          ComponentInputConfigs.keys.prop_btnColor.value,
                title:                                            Language.translate("components.input.props.prop_btnColor.title"),
                description:                                      Language.translate("components.input.props.prop_btnColor.description"),
            },
            [ComponentInputConfigs.keys.prop_hasRules.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_hasRules.name,
                default:                                          ComponentInputConfigs.keys.prop_hasRules.value,
                title:                                            Language.translate("components.input.props.prop_hasRules.title"),
                description:                                      Language.translate("components.input.props.prop_hasRules.description"),
            },
            [ComponentInputConfigs.keys.prop_isAbsoluteRule.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_isAbsoluteRule.name,
                default:                                          ComponentInputConfigs.keys.prop_isAbsoluteRule.value,
                title:                                            Language.translate("components.input.props.prop_isAbsoluteRule.title"),
                description:                                      Language.translate("components.input.props.prop_isAbsoluteRule.description"),
            },
            [ComponentInputConfigs.keys.prop_listRules.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_listRules.name,
                default:                                          ComponentInputConfigs.keys.prop_listRules.value,
                title:                                            Language.translate("components.input.props.prop_listRules.title"),
                description:                                      Language.translate("components.input.props.prop_listRules.description"),
            },
            [ComponentInputConfigs.keys.prop_msgRules.name]: {
                prop:                                             ComponentInputConfigs.keys.prop_msgRules.name,
                default:                                          ComponentInputConfigs.keys.prop_msgRules.value,
                title:                                            Language.translate("components.input.props.prop_msgRules.title"),
                description:                                      Language.translate("components.input.props.prop_msgRules.description"),
            },
        }
    );

    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentInputSchemaType, ComponentInputPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Schema(this),
        ///----------------------
        FORM: {
            part:               ComponentInputConfigs.schemas.FORM.name,
            title:              Language.translate("components.input.schema.form.title"),
            description:        Language.translate("components.input.schema.form.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_backgroundColorForm.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_formBorderRadius.name],
            ]
        },
        ICON: {
            part:               ComponentInputConfigs.schemas.ICON.name,
            title:              Language.translate("components.input.schema.icon.title"),
            description:        Language.translate("components.input.schema.icon.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_icon.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_colorIcon.name],
            ]
        },
        INPUT: {
            part:               ComponentInputConfigs.schemas.INPUT.name,
            title:              Language.translate("components.input.schema.input.title"),
            description:        Language.translate("components.input.schema.input.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_inputClass.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_inputStyles.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_type.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_name.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_placeholder.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_icon.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_btnAddStatus.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_btnAddWidth.name],
            ]
        },
        ICON_CLEAR: {
            part:               ComponentInputConfigs.schemas.ICON_CLEAR.name,
            title:              Language.translate("components.input.schema.icon_clear.title"),
            description:        Language.translate("components.input.schema.icon_clear.description"),
            props: [
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_btnAddStatus.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_btnAddStatus.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_btnAddWidth.name],
            ]
        },
        BUTTON: {
            part:               ComponentInputConfigs.schemas.BUTTON.name,
            title:              Language.translate("components.input.schema.button.title"),
            description:        Language.translate("components.input.schema.button.description"),
            props: [
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_btnAddStatus.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_btnAddIcon.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_btnAddTitle.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_btnAddClass.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_btnColor.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_btnAddStatus.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_btnAddWidth.name],
            ]
        },
        VALIDATE: {
            part:               ComponentInputConfigs.schemas.VALIDATE.name,
            title:              Language.translate("components.input.schema.validate.title"),
            description:        Language.translate("components.input.schema.validate.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_hasRules.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_isAbsoluteRule.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_listRules.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_msgRules.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_title.name],
            ]
        },
    });


    /* ---------------------------------------------
        PROPERTYs Templates
    --------------------------------------------- */
    _COMPONENT_TEMPLATES = defineComponentTemplate<ComponentInputTemplatesType, ComponentInputPropsType>({
        BODY: {
            title:                                            Language.translate("components.input.template.body.title"),
            description:                                      Language.translate("components.input.template.body.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_placeholder.name]
        },
    });


    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentInputMethodsType, ComponentInputPropsType>({
        [ComponentInputConfigs.methods.INPUT_CHANGE.name]: {
            title:                                            Language.translate("components.input.methods.fn_onInputChange.title"),
            description:                                      Language.translate("components.input.methods.fn_onInputChange.description"),
            args: {
                [ComponentInputConfigs.methods.INPUT_CHANGE.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
            }
        },
        [ComponentInputConfigs.methods.INPUT_FOCUS.name]: {
            title:                                            Language.translate("components.input.methods.fn_onInputFocus.title"),
            description:                                      Language.translate("components.input.methods.fn_onInputFocus.description"),
            args: {
                [ComponentInputConfigs.methods.INPUT_CHANGE.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
            }
        },
        [ComponentInputConfigs.methods.INPUT_BLUR.name]: {
            title:                                            Language.translate("components.input.methods.fn_onInputBlur.title"),
            description:                                      Language.translate("components.input.methods.fn_onInputBlur.description"),
            args: {
                [ComponentInputConfigs.methods.INPUT_CHANGE.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
            }
        },
        [ComponentInputConfigs.methods.CLICK_BUTTON.name]: {
            title:                                            Language.translate("components.input.methods.fn_onClickButton.title"),
            description:                                      Language.translate("components.input.methods.fn_onClickButton.description"),
            args: {
                [ComponentInputConfigs.methods.CLICK_BUTTON.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
            }
        },
    });


    /* ---------------------------------------------
        Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {


        const inputComp = new ComponentInput(
            <ComponentInputPropsType>{
                classList: ["col-md-3", "col-12", "border", "p-2"],
                prop_labelTitle:              "Input Example",
                prop_labelTooltipDescription: "This is an input with validation",
                prop_type:                     ComponentInput_Types.STRING,
                prop_placeholder:              "Enter text...",
                prop_name:                     "input_example" ,
                prop_value:                    "value test",
                prop_icon:                     ToolsIcons.icon_search({ size: SIZES.S }),

                prop_btnAddStatus:             true,
                prop_btnAddWidth:              120,
                prop_btnAddTitle:              "Add",

                prop_hasRules:                  true ,
                prop_msgRules:                  null,
                prop_isAbsoluteRule:            true,
                prop_listRules: [
                    {
                        rule: "_not_empty",
                        description: "This field is required"
                    },
                    {
                        rule: "_char_length",
                        description: "Minimum 3 characters",
                        params: { min: 3 }
                    },
                    {
                        rule: "_text_length",
                        description: "Maximum 20 characters",
                        params: { max: 20 }
                    },
                    {
                        rule: "_is_email",
                        description: "Must be a valid email address"
                    },
                    {
                        rule: "_text_char_upper",
                        description: "Must contain at least one uppercase letter"
                    },
                ],
            },
            <ComponentInputMethodsType>{
                fn_onInputChange: (event, dataArgs, componentArgs) => {
                    console.log("ComponentInput [fn_onInputChange]", dataArgs, componentArgs);
                },
                fn_onInputFocus: (event, dataArgs, componentArgs) => {
                    console.log("ComponentInput [fn_onInputFocus]", dataArgs, componentArgs);
                },
                fn_onInputBlur: (event, dataArgs, componentArgs) => {
                    console.log("ComponentInput [fn_onInputBlur]", dataArgs, componentArgs);
                },
                fn_onClickButton: (event, dataArgs, componentArgs) => {
                    console.log("ComponentInput [fn_onClickButton]", dataArgs, componentArgs);
                },
            }
        );

        return inputComp.getElement() as HTMLElement;
    }
}


export class ComponentInput extends ComponentInputBase {

    private _ELEMENT_INPUT = null;

    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentInputPropsType,
        methods: ComponentInputMethodsType,
        events = null
    ) {
        super("input", null);
        super.renderComponent(config, methods, events);
    }


    /* ---------------------------------------------
        TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentInputConfigs.schemas.FORM.name)
    }

    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentInputConfigs.schemas.FORM.name:
                return this.template_render_form(attrsDefault, data, extra);
            case ComponentInputConfigs.schemas.INPUT.name:
                return this.template_render_input(attrsDefault, data, extra);
            case ComponentInputConfigs.schemas.ICON_CLEAR.name:
                return this.template_render_icon_clear(attrsDefault, data, extra);
            case ComponentInputConfigs.schemas.ICON.name:
                return this.template_render_icon(attrsDefault, data, extra);
            case ComponentInputConfigs.schemas.BUTTON.name:
                return this.template_render_button(attrsDefault, data, extra);
            case ComponentInputConfigs.schemas.VALIDATE.name:
                return this.template_render_validate(attrsDefault, data, extra);
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    // ---------------------------------------------
    private template_render_form(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_backgroundColorForm = data[ComponentInputConfigs.keys.prop_backgroundColorForm.name];
            const prop_formBorderRadius =    data[ComponentInputConfigs.keys.prop_formBorderRadius.name];

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                stylesCustom:`
 /* Chrome, Edge, Safari, Opera */
#${attrsDefault.id} input[type="number"]::-webkit-inner-spin-button,
#${attrsDefault.id} input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
#${attrsDefault.id} input[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
}
                ` ,
                children: [
                    new ToolsComponents.ComponentBorder(
                        <ComponentBorderPropsType>{
                            classList: [ "d-block"]  ,
                            styles: Observable.computed(
                                (sizeName) => {
                                    return {
                                        padding: ToolsComponents_Padding?.[sizeName]
                                    }
                                } ,
                                [
                                    AppConfig.get_sizeName()
                                ] ,
                                this.getScope()
                            ) ,
                            prop_borderClass: []  ,
                            prop_borderStyles: Observable.computed(
                                (sizeName) => {
                                    return {
                                        height: SizeCalc(
                                            ToolsComponents_BorderWidth?.[sizeName] ,
                                            OPERATION.ADD ,
                                            ToolsComponents_Padding?.[sizeName] ,
                                            OPERATION.ADD ,
                                            ToolsComponents_Height?.[sizeName] ,
                                            OPERATION.ADD ,
                                            ToolsComponents_Padding?.[sizeName] ,
                                            OPERATION.ADD ,
                                            ToolsComponents_BorderWidth?.[sizeName] ,
                                        ) ,
                                        padding: ToolsComponents_Padding?.[sizeName]
                                    }
                                } ,
                                [
                                    AppConfig.get_sizeName()
                                ] ,
                                this.getScope()
                            ) ,
                            prop_borderRadius: prop_formBorderRadius ,
                            prop_content:                        ReactiveElement.div({
                                className: ["position-relative"  , "h-100"] ,
                                children: [
                                    this.executeSchemaPart(ComponentInputConfigs.schemas.ICON.name),
                                    this.executeSchemaPart(ComponentInputConfigs.schemas.INPUT.name) ,
                                    this.executeSchemaPart(ComponentInputConfigs.schemas.ICON_CLEAR.name),
                                    this.executeSchemaPart(ComponentInputConfigs.schemas.BUTTON.name),
                                ]
                            }) ,
                            prop_borderColor:                    null ,
                            prop_contentBackgroundColor:         prop_backgroundColorForm ,
                        },
                        <ComponentBorderMethodsType>{}
                    ).getReactiveElement() ,
                    this.executeSchemaPart(ComponentInputConfigs.schemas.VALIDATE.name),
                ],
            });

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    // ---------------------------------------------
    private template_render_icon(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_icon =      data[ComponentInputConfigs.keys.prop_icon.name];
            const prop_colorIcon = data[ComponentInputConfigs.keys.prop_colorIcon.name];

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (icon , colorIcon: any) => {
                        if (!icon) return null;

                        return  new ToolsComponents.ComponentIcon(
                            <ComponentIconPropsType>{
                                classList:   [],
                                styles:      Observable.computed(
                                    (sizeName , dir) => {
                                        return {
                                            cursor:   "pointer",
                                            width: SizeCalc(
                                                ToolsComponents_BorderWidth?.[sizeName] ,
                                                OPERATION.ADD ,
                                                ToolsComponents_Padding?.[sizeName] ,
                                                OPERATION.ADD ,
                                                ToolsComponents_Height?.[sizeName] ,
                                                OPERATION.ADD ,
                                                ToolsComponents_Padding?.[sizeName] ,
                                                OPERATION.ADD ,
                                                ToolsComponents_BorderWidth?.[sizeName] ,
                                            ) ,
                                            height: SizeCalc(
                                                ToolsComponents_BorderWidth?.[sizeName] ,
                                                OPERATION.ADD ,
                                                ToolsComponents_Padding?.[sizeName] ,
                                                OPERATION.ADD ,
                                                ToolsComponents_Height?.[sizeName] ,
                                                OPERATION.ADD ,
                                                ToolsComponents_Padding?.[sizeName] ,
                                                OPERATION.ADD ,
                                                ToolsComponents_BorderWidth?.[sizeName] ,
                                            ) ,
                                            float: dir ? "right" : "left"
                                        }
                                    },
                                    [
                                        AppConfig.get_sizeName() ,
                                        AppConfig.get_directionRtl()
                                    ] ,
                                    this.getScope()
                                ),
                                prop_iconClass: ["d-block"],
                                prop_iconStyles:      Observable.computed(
                                    (sizeName , dir) => {
                                        return {
                                            margin:   "auto",
                                            width: SizeCalc(
                                                ToolsComponents_IconSize?.[sizeName] ,
                                            ) ,
                                            lineHeight: SizeCalc(
                                                ToolsComponents_BorderWidth?.[sizeName] ,
                                                OPERATION.ADD ,
                                                ToolsComponents_Padding?.[sizeName] ,
                                                OPERATION.ADD ,
                                                ToolsComponents_Height?.[sizeName] ,
                                                OPERATION.ADD ,
                                                ToolsComponents_Padding?.[sizeName] ,
                                                OPERATION.ADD ,
                                                ToolsComponents_BorderWidth?.[sizeName] ,
                                            ) ,
                                            height: SizeCalc(
                                                ToolsComponents_BorderWidth?.[sizeName] ,
                                                OPERATION.ADD ,
                                                ToolsComponents_Padding?.[sizeName] ,
                                                OPERATION.ADD ,
                                                ToolsComponents_Height?.[sizeName] ,
                                                OPERATION.ADD ,
                                                ToolsComponents_Padding?.[sizeName] ,
                                                OPERATION.ADD ,
                                                ToolsComponents_BorderWidth?.[sizeName] ,
                                            )
                                        }
                                    },
                                    [
                                        AppConfig.get_sizeName() ,
                                        AppConfig.get_directionRtl()
                                    ] ,
                                    this.getScope()
                                ),
                                prop_icon: prop_icon,
                            },
                            <ComponentIconMethodsType>{
                                fn_onClickIcon: (event, dataArgs, componentArgs) => {
                                    this._ELEMENT_INPUT.focusFn();
                                }
                            }).getReactiveElement()

                    },
                    [prop_icon , prop_colorIcon],
                    this.getScope()
                ),
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    // ---------------------------------------------
    private template_render_input(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {

            const prop_name =          data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_name.name];
            const prop_value =         data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name];
            const prop_isDisable =     data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_inputStyles =   data[ComponentInputConfigs.keys.prop_inputStyles.name];
            const prop_inputClass =    data[ComponentInputConfigs.keys.prop_inputClass.name];
            const prop_type =          data[ComponentInputConfigs.keys.prop_type.name];
            const prop_placeholder =   data[ComponentInputConfigs.keys.prop_placeholder.name];
            const prop_icon =          data[ComponentInputConfigs.keys.prop_icon.name];
            const prop_btnAddStatus =  data[ComponentInputConfigs.keys.prop_btnAddStatus.name];
            const prop_btnAddWidth =   data[ComponentInputConfigs.keys.prop_btnAddWidth.name];

            this._ELEMENT_INPUT = ReactiveElement.input({
                attrs: {
                    ...attrsDefault,
                },
                attrsBind: {
                    name:        Observable.computed(
                        (name) => {
                            return `${name}[value]`
                        },
                        [
                            prop_name
                        ],
                        this.getScope()
                    ),
                    value:       prop_value,
                    type:        prop_type,
                    placeholder: prop_placeholder,
                    disabled :   Observable.computed(
                        (status) => {
                            return status ? "disabled" : null
                        } ,
                        [
                            prop_isDisable
                        ] ,
                        this.getScope()
                    )
                },
                className: [
                    "d-block",
                ],
                classBind: [
                    prop_inputClass,
                ],
                styles: {
                    whiteSpace:   "nowrap",
                    overflow:     "hidden",
                    textOverflow: "ellipsis",
                    outline:      "none",
                    boxShadow:    "none",
                },
                stylesBind: (el) => ({
                    prop_inputStyles,

                    width: Observable.computed(
                        (sizeName, icon , btnAddStatus, btnAddWidth) => {
                            console.log("btnAddStatus" , btnAddStatus)
                            let listCalc = [
                                SizeUnit(100 , UNITS.PERCENT) ,
                            ];
                            if (btnAddStatus){
                                listCalc.push(OPERATION.MINUS);
                                listCalc.push(SizeUnit(btnAddWidth , UNITS.PEXEL));
                            }
                            if (icon != null){
                                listCalc.push(OPERATION.MINUS);
                                listCalc.push(ToolsComponents_BorderWidth?.[sizeName]);
                                listCalc.push(OPERATION.MINUS);
                                listCalc.push(ToolsComponents_Padding?.[sizeName]);
                                listCalc.push(OPERATION.MINUS);
                                listCalc.push(ToolsComponents_Height?.[sizeName]);
                                listCalc.push(OPERATION.MINUS);
                                listCalc.push(ToolsComponents_Padding?.[sizeName]);
                                listCalc.push(OPERATION.MINUS);
                                listCalc.push(ToolsComponents_BorderWidth?.[sizeName]);
                            }
                            return SizeCalc(...listCalc)
                        } ,
                        [
                            AppConfig.get_sizeName() ,
                            prop_icon ,
                            prop_btnAddStatus ,
                            prop_btnAddWidth
                        ] ,
                        this.getScope()
                    ) ,

                    borderWidth: Observable.computed(
                        (sizeName: string) => StyleValue.important(ToolsComponents_BorderWidth?.[sizeName]),
                        [AppConfig.get_sizeName()],
                        this.getScope()
                    ),

                    borderTopRightRadius: Observable.computed(
                        (sizeName , dir , btnAddStatus) => {
                            if(dir){
                                return ToolsComponents_BorderRadius?.[sizeName]
                            }
                            else if (!btnAddStatus){
                                return ToolsComponents_BorderRadius?.[sizeName]
                            }
                            return SizeUnit(0, UNITS.PEXEL);
                        } ,
                        [
                            AppConfig.get_sizeName() ,
                            AppConfig.get_directionRtl() ,
                            prop_btnAddStatus
                        ] ,
                        this.getScope()
                    ) ,

                    borderBottomRightRadius: Observable.computed(
                        (sizeName , dir , btnAddStatus) => {
                            if(dir){
                                return ToolsComponents_BorderRadius?.[sizeName]
                            }
                            else if (!btnAddStatus){
                                return ToolsComponents_BorderRadius?.[sizeName]
                            }
                            return SizeUnit(0, UNITS.PEXEL);
                        } ,
                        [
                            AppConfig.get_sizeName() ,
                            AppConfig.get_directionRtl(),
                            prop_btnAddStatus
                        ] ,
                        this.getScope()
                    ) ,

                    borderTopLeftRadius: Observable.computed(
                        (sizeName , dir , btnAddStatus) => {
                            if(!dir){
                                return ToolsComponents_BorderRadius?.[sizeName]
                            }
                            else if (!btnAddStatus){
                                return ToolsComponents_BorderRadius?.[sizeName]
                            }
                            return SizeUnit(0, UNITS.PEXEL);
                        } ,
                        [
                            AppConfig.get_sizeName() ,
                            AppConfig.get_directionRtl(),
                            prop_btnAddStatus
                        ] ,
                        this.getScope()
                    ) ,

                    borderBottomLeftRadius: Observable.computed(
                        (sizeName , dir, btnAddStatus) => {
                            if(!dir){
                                return ToolsComponents_BorderRadius?.[sizeName]
                            }
                            else if (!btnAddStatus){
                                return ToolsComponents_BorderRadius?.[sizeName]
                            }
                            return SizeUnit(0, UNITS.PEXEL);
                        } ,
                        [
                            AppConfig.get_sizeName() ,
                            AppConfig.get_directionRtl(),
                            prop_btnAddStatus
                        ] ,
                        this.getScope()
                    ) ,


                    direction: Observable.computed(
                        (dir)=> {
                            return dir ? "rtl" : "ltr";
                        },
                        [
                            AppConfig.get_directionRtl()
                        ] ,
                        this.getScope()
                    )  ,

                    float: Observable.computed(
                        (dir)=> {
                            return dir ? "right" : "left";
                        },
                        [
                            AppConfig.get_directionRtl()
                        ] ,
                        this.getScope()
                    )  ,

                    lineHeight: Observable.computed(
                        (sizeName)=> {
                            return ToolsComponents_Height?.[sizeName];
                        },
                        [
                            AppConfig.get_sizeName()
                        ] ,
                        this.getScope()
                    )  ,

                    borderColor: el.focus.mapList({
                        true:  StyleValue.important( Color(COLORS_MAIN.SECONDARY, COLORS_GRAD.GRADE_1))  ,
                        false: StyleValue.important( Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1))  ,
                    }) ,

                    fontSize: Observable.computed(
                        (sizeName)=> {
                            return ToolsComponents_FontSize?.[sizeName];
                        },
                        [
                            AppConfig.get_sizeName()
                        ] ,
                        this.getScope()
                    )  ,

                    paddingTop: Observable.computed(
                        (sizeName)=> {
                            return ToolsComponents_Padding?.[sizeName];
                        },
                        [
                            AppConfig.get_sizeName()
                        ] ,
                        this.getScope()
                    )  ,

                    paddingBottom: Observable.computed(
                        (sizeName)=> {
                            return ToolsComponents_Padding?.[sizeName];
                        },
                        [
                            AppConfig.get_sizeName()
                        ] ,
                        this.getScope()
                    )  ,

                }),
                on: {
                    input: (event: Event) => {
                        const value = event.target?.value ?? undefined;
                        this.fn_onChangeValue(event , value);
                    },
                    focus: (event: Event) => {
                         this.fn_onChangeFocus(event);
                    },
                    blur: (event: Event) => {
                         this.fn_onChangeBlur(event);
                    },
                }
            });

            return this._ELEMENT_INPUT;
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    // ---------------------------------------------
    private template_render_icon_clear(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_size =          data[ComponentInputConfigs.keys.prop_size.name];
            const prop_isDisable =     data[ComponentInputConfigs.keys.prop_isDisable.name];
            const prop_btnAddStatus =  data[ComponentInputConfigs.keys.prop_btnAddStatus.name];
            const prop_btnAddWidth =   data[ComponentInputConfigs.keys.prop_btnAddWidth.name];

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (isDisable: boolean, size: any) => {
                        if (isDisable) return null;

                        return new ComponentElementPosition(
                            <ComponentElementPositionPropsType>{
                                classList: [],
                                prop_positionType: ComponentElementPosition_positionTypes.ABSOLUTE,
                                prop_positionTop:      SizeUnit(50, UNITS.PERCENT),
                                //prop_positionEnd:      SizeUnit(0, UNITS.PERCENT),
                                prop_positionEnd:    Observable.computed(
                                    (sizeName, btnAddStatus , btnAddWidth) => {
                                        if (btnAddStatus){
                                            return SizeUnit(btnAddWidth , UNITS.PEXEL)
                                        }
                                        return SizeUnit(0 , UNITS.PERCENT);
                                    } ,
                                    [
                                        AppConfig.get_sizeName() ,
                                        prop_btnAddStatus ,
                                        prop_btnAddWidth
                                    ] ,
                                    this.getScope()
                                ),
                                prop_positionWidth:    Observable.computed(
                                    (sizeName) => {
                                        return SizeCalc(
                                            ToolsComponents_BorderWidth?.[sizeName] ,
                                            OPERATION.ADD ,
                                            ToolsComponents_Padding?.[sizeName] ,
                                            OPERATION.ADD ,
                                            ToolsComponents_Height?.[sizeName] ,
                                            OPERATION.ADD ,
                                            ToolsComponents_Padding?.[sizeName] ,
                                            OPERATION.ADD ,
                                            ToolsComponents_BorderWidth?.[sizeName] ,
                                        )
                                    } ,
                                    [
                                        AppConfig.get_sizeName()
                                    ] ,
                                    this.getScope()
                                ),
                                prop_positionHeight:    Observable.computed(
                                    (sizeName) => {
                                        return SizeCalc(
                                            ToolsComponents_BorderWidth?.[sizeName] ,
                                            OPERATION.ADD ,
                                            ToolsComponents_Padding?.[sizeName] ,
                                            OPERATION.ADD ,
                                            ToolsComponents_Height?.[sizeName] ,
                                            OPERATION.ADD ,
                                            ToolsComponents_Padding?.[sizeName] ,
                                            OPERATION.ADD ,
                                            ToolsComponents_BorderWidth?.[sizeName] ,
                                        )
                                    } ,
                                    [
                                        AppConfig.get_sizeName()
                                    ] ,
                                    this.getScope()
                                ),
                                prop_positionTranslate: TranslateUnit(SizeUnit(0, UNITS.PERCENT), SizeUnit(-50, UNITS.PERCENT)),
                                prop_positionZIndex: 10,
                                prop_content:  new ToolsComponents.ComponentIcon(
                                    <ComponentIconPropsType>{
                                        classList: [],
                                        prop_iconStyles:      Observable.computed(
                                            (sizeName) => {
                                                return {
                                                    cursor:     "pointer",
                                                    lineHeight:  SizeCalc(
                                                        ToolsComponents_BorderWidth?.[sizeName] ,
                                                        OPERATION.ADD ,
                                                        ToolsComponents_Padding?.[sizeName] ,
                                                        OPERATION.ADD ,
                                                        ToolsComponents_Height?.[sizeName] ,
                                                        OPERATION.ADD ,
                                                        ToolsComponents_Padding?.[sizeName] ,
                                                        OPERATION.ADD ,
                                                        ToolsComponents_BorderWidth?.[sizeName] ,
                                                    )
                                                }
                                            },
                                            [
                                                AppConfig.get_sizeName()
                                            ] ,
                                            this.getScope()
                                        ),
                                        prop_iconClass: ["d-block" , "text-center"],
                                        prop_icon: ToolsIcons.icon_clear(),
                                    },
                                    <ComponentIconMethodsType>{
                                        fn_onClickIcon: (event, dataArgs, componentArgs) => {
                                            //this.set(ComponentInputPhoneConfigs.keys.prop_value.name , "")
                                        }
                                    }
                                ).getReactiveElement(),
                            },
                            <ComponentElementPositionMethodsType>{}
                        ).getReactiveElement();
                    },
                    [prop_isDisable, prop_size],
                    this.getScope()
                ),
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    // ---------------------------------------------
    private template_render_button(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_isDisable =        data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_btnAddTitle =      data[ComponentInputConfigs.keys.prop_btnAddTitle.name];
            const prop_btnAddClass =      data[ComponentInputConfigs.keys.prop_btnAddClass.name];
            const prop_btnAddStatus =     data[ComponentInputConfigs.keys.prop_btnAddStatus.name];
            const prop_btnAddWidth =      data[ComponentInputConfigs.keys.prop_btnAddWidth.name];

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (isDisable: boolean , btnAddStatus: boolean) => {
                        if (isDisable || !btnAddStatus) return null;

                        return new ToolsComponents.ComponentButton(
                            <ComponentButtonPropsType>{
                                classList:      [],
                                styles:         {},
                                prop_btnClass: Observable.computed(
                                    (btnAddClass) => {
                                        return [...btnAddClass , "shadow-sm", "px-2"]
                                    },
                                    [
                                        prop_btnAddClass
                                    ] ,
                                    this.getScope()
                                ) ,
                                prop_btnStyles: Observable.computed(
                                    (dir , sizeName , buttonsWidth) => {
                                        return {
                                            float:                       dir ? "right" : "left" ,
                                            width:                       SizeUnit(buttonsWidth , UNITS.PEXEL),
                                            height:                      SizeCalc(
                                                ToolsComponents_BorderWidth?.[sizeName] ,
                                                OPERATION.ADD ,
                                                ToolsComponents_Padding?.[sizeName] ,
                                                OPERATION.ADD ,
                                                ToolsComponents_Height?.[sizeName] ,
                                                OPERATION.ADD ,
                                                ToolsComponents_Padding?.[sizeName] ,
                                                OPERATION.ADD ,
                                                ToolsComponents_BorderWidth?.[sizeName] ,
                                            ) ,
                                            cursor:                     "pointer",
                                        }
                                    },
                                    [
                                        AppConfig.get_directionRtl() ,
                                        AppConfig.get_sizeName() ,
                                        prop_btnAddWidth
                                    ] ,
                                    this.getScope()
                                ) ,
                                prop_btnBorderRadiusEndTop:        Observable.computed(
                                    (sizeName) => {
                                        return sizeName
                                    } ,
                                    [
                                        AppConfig.get_sizeName() ,
                                    ] ,
                                    this.getScope()
                                ),

                                prop_btnBorderRadiusEndBottom:        Observable.computed(
                                    (sizeName) => {
                                        return sizeName
                                    } ,
                                    [
                                        AppConfig.get_sizeName() ,
                                    ] ,
                                    this.getScope()
                                ),
                                prop_btnBorderRadiusStartTop:         null,
                                prop_btnBorderRadiusStartBottom:      null,
                                prop_btnBorderRadius:                 null,
                                prop_btnBorderWidth:                  0,
                                prop_btnTitle:                        prop_btnAddTitle ,
                                prop_btnType:                         "button",
                            },
                            <ComponentButtonMethodsType>{
                                fn_onClickButton: (event, dataArgs, componentArgs) => {
                                    event.stopPropagation();
                                    this.fn_onClickButton(event);
                                }
                            }).getReactiveElement()
                    },
                    [
                        prop_isDisable ,
                        prop_btnAddStatus
                    ],
                    this.getScope()
                ),
            });

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    // ---------------------------------------------
    private template_render_validate(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_isDisable =      data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_value =          data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name];
            const prop_hasRules =       data[ComponentInputConfigs.keys.prop_hasRules.name];
            const prop_isAbsoluteRule = data[ComponentInputConfigs.keys.prop_isAbsoluteRule.name];
            const prop_listRules =      data[ComponentInputConfigs.keys.prop_listRules.name];
            const prop_msgRules =       data[ComponentInputConfigs.keys.prop_msgRules.name];
            const prop_title =          data[ComponentInputConfigs.keys.prop_title.name];

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                className: ["position-relative"],
                children: Observable.computed(
                    (isDisable: boolean, hasRules: boolean) => {
                        if (isDisable || !hasRules) return null;

                        return new ToolsComponents.ComponentValidate(
                            <ComponentValidatePropsType>{
                                classList:        ["mt-1"],
                                prop_isAbsolute:  prop_isAbsoluteRule ,
                                prop_listRules:   prop_listRules ,
                                prop_msgRules:    prop_msgRules ,
                                prop_title:       prop_title ,
                                prop_value:       prop_value ,
                            },
                            <ComponentValidateMethodsType>{
                                fn_onChangeValidate: (event, dataArgs, componentArgs) => {

                                }
                            }
                        ).getReactiveElement();
                    },
                    [prop_isDisable, prop_hasRules],
                    this.getScope()
                ),
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }





    // ---------------------------------------------
    private fn_onChangeValue(event: Event , value: String|null){
        this.set(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name , value)
        const paramsFn : ComponentInputPhone_Methods_INPUT_CHANGE_ComponentArgs = {}
        this.executeMethod(ComponentInputConfigs.methods.INPUT_CHANGE.name  , event , paramsFn);
    }

    private fn_onChangeFocus(event: Event){
        const paramsFn : ComponentInputSize_Methods_INPUT_FOCUS_ComponentArgs = {}
        this.executeMethod(ComponentInputConfigs.methods.INPUT_FOCUS.name  , event , paramsFn);
    }

    private fn_onChangeBlur(event: Event){
        const paramsFn : ComponentInputSize_Methods_INPUT_BLUR_ComponentArgs = {}
        this.executeMethod(ComponentInputConfigs.methods.INPUT_BLUR.name  , event , paramsFn);
    }

    private fn_onClickButton(event: Event){
        const paramsFn : ComponentInput_Methods_CLICK_BUTTON_ComponentArgs = {}
        this.executeMethod(ComponentInputConfigs.methods.CLICK_BUTTON.name  , event , paramsFn);
    }


}

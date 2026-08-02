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
    ToolsComponents_BorderWidth
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
    prop_btnAddIcon:                       "prop_btnAddIcon",
    prop_btnAddTitle:                      "prop_btnAddTitle",
    prop_btnAddClass:                      "prop_btnAddClass",
    prop_btnColor:                         "prop_btnColor",
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
        [ComponentInputProps.prop_isAbsoluteRule]: {
            name:               ComponentInputProps.prop_isAbsoluteRule,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentInputProps.prop_listRules]: {
            name:               ComponentInputProps.prop_listRules,
            value:              GOG_SetValue<any[]>([]),
        },
        [ComponentInputProps.prop_msgRules]: {
            name:               ComponentInputProps.prop_msgRules,
            value:              GOG_SetValue<Record<string, string> | null>(null),
        },
        [GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name]: {
            name:               GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name,
            value:              GOG_SetValue<Observable<string> | string>(""),
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
        INPUT: {
            name:                      "fn_onInput",
            dataArgs: {
                VALUE: {
                    name:              "VALUE",
                    value:             GOG_SetValue<string>(""),
                },
            },
            componentArgs: {}
        },
        FOCUS: {
            name:                      "fn_onFocus",
            dataArgs: {
                VALUE: {
                    name:              "VALUE",
                    value:             GOG_SetValue<string>(""),
                },
            },
            componentArgs: {}
        },
        BLUR: {
            name:                      "fn_onBlur",
            dataArgs: {
                VALUE: {
                    name:              "VALUE",
                    value:             GOG_SetValue<string>(""),
                },
            },
            componentArgs: {}
        },
        CLICK_BUTTON: {
            name:                      "fn_onClickButton",
            dataArgs: {
                VALUE: {
                    name:              "VALUE",
                    value:             GOG_SetValue<string>(""),
                },
            },
            componentArgs: {}
        },
    }
} as const;



export type ComponentInputPropsType =                      GOG_ExtractNameValue<typeof ComponentInputConfigs.keys>
export type ComponentInputSchemaType =                     GOG_ExtractName<typeof ComponentInputConfigs.schemas>
export type ComponentInputTemplatesType =                  GOG_ExtractName<typeof ComponentInputConfigs.templates>

export type ComponentInput_Methods_INPUT_ComponentArgs =   GOG_ExtractName<typeof ComponentInputConfigs.methods.INPUT.componentArgs>
export type ComponentInput_Methods_INPUT_DataArgs =        GOG_ExtractNameValue<typeof ComponentInputConfigs.methods.INPUT.dataArgs>
export type ComponentInput_Methods_FOCUS_ComponentArgs =   GOG_ExtractName<typeof ComponentInputConfigs.methods.FOCUS.componentArgs>
export type ComponentInput_Methods_FOCUS_DataArgs =        GOG_ExtractNameValue<typeof ComponentInputConfigs.methods.FOCUS.dataArgs>
export type ComponentInput_Methods_BLUR_ComponentArgs =    GOG_ExtractName<typeof ComponentInputConfigs.methods.BLUR.componentArgs>
export type ComponentInput_Methods_BLUR_DataArgs =         GOG_ExtractNameValue<typeof ComponentInputConfigs.methods.BLUR.dataArgs>
export type ComponentInput_Methods_CLICK_BUTTON_ComponentArgs = GOG_ExtractName<typeof ComponentInputConfigs.methods.CLICK_BUTTON.componentArgs>
export type ComponentInput_Methods_CLICK_BUTTON_DataArgs = GOG_ExtractNameValue<typeof ComponentInputConfigs.methods.CLICK_BUTTON.dataArgs>

export type ComponentInputMethodsType = {
    [ComponentInputConfigs.methods.INPUT.name]: ComponentCallBackType<ComponentInput_Methods_INPUT_ComponentArgs, ComponentInput_Methods_INPUT_DataArgs>,
    [ComponentInputConfigs.methods.FOCUS.name]: ComponentCallBackType<ComponentInput_Methods_FOCUS_ComponentArgs, ComponentInput_Methods_FOCUS_DataArgs>,
    [ComponentInputConfigs.methods.BLUR.name]: ComponentCallBackType<ComponentInput_Methods_BLUR_ComponentArgs, ComponentInput_Methods_BLUR_DataArgs>,
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
        INPUT: {
            part:               ComponentInputConfigs.schemas.INPUT.name,
            title:              Language.translate("components.input.schema.input.title"),
            description:        Language.translate("components.input.schema.input.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_inputClass.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_inputStyles.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_inputBorderColor.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_inputBorderColorFocus.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_inputBorderWidth.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_inputBorderRadius.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_type.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_name.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_placeholder.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_icon.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_btnAddStatus.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_size.name],
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
        BUTTON: {
            part:               ComponentInputConfigs.schemas.BUTTON.name,
            title:              Language.translate("components.input.schema.button.title"),
            description:        Language.translate("components.input.schema.button.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_btnAddStatus.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_btnAddIcon.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_btnAddTitle.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_btnAddClass.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_btnColor.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_inputBorderWidth.name],
                this._COMPONENT_PATTERN[ComponentInputConfigs.keys.prop_formBorderRadius.name],
            ]
        },
        VALIDATE: {
            part:               ComponentInputConfigs.schemas.VALIDATE.name,
            title:              Language.translate("components.input.schema.validate.title"),
            description:        Language.translate("components.input.schema.validate.description"),
            props: [
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
        [ComponentInputConfigs.methods.INPUT.name]: {
            title:                                            Language.translate("components.input.methods.fn_onInput.title"),
            description:                                      Language.translate("components.input.methods.fn_onInput.description"),
            args: {
                [ComponentInputConfigs.methods.INPUT.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
            }
        },
        [ComponentInputConfigs.methods.FOCUS.name]: {
            title:                                            Language.translate("components.input.methods.fn_onFocus.title"),
            description:                                      Language.translate("components.input.methods.fn_onFocus.description"),
            args: {
                [ComponentInputConfigs.methods.FOCUS.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
            }
        },
        [ComponentInputConfigs.methods.BLUR.name]: {
            title:                                            Language.translate("components.input.methods.fn_onBlur.title"),
            description:                                      Language.translate("components.input.methods.fn_onBlur.description"),
            args: {
                [ComponentInputConfigs.methods.BLUR.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
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
        const valueObs = new Observable<string>("");

        const inputComp = new ComponentInput(
            <ComponentInputPropsType>{
                classList: ["col-md-3", "col-12", "border", "p-2"],
                prop_labelTitle: "Input Example",
                prop_labelTooltipDescription: "This is an input with validation",
                prop_type: ComponentInput_Types.STRING,
                prop_placeholder: "Enter text...",
                prop_name: "input_example" ,
                prop_value: valueObs,
                prop_size: SIZES.M,
                prop_icon: ToolsIcons.icon_search({ size: SIZES.S }),
                prop_btnAddStatus: true,
                prop_btnAddTitle: "Add",
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
                prop_msgRules: null,
                prop_isAbsoluteRule: true,
            },
            <ComponentInputMethodsType>{
                fn_onInput: (event, dataArgs, componentArgs) => {
                    valueObs.set((event.target as HTMLInputElement).value);
                    console.log("input", dataArgs.VALUE);
                },
                fn_onFocus: (event, dataArgs, componentArgs) => {
                    console.log("focus", dataArgs.VALUE);
                },
                fn_onBlur: (event, dataArgs, componentArgs) => {
                    console.log("blur", dataArgs.VALUE);
                },
                fn_onClickButton: (event, dataArgs, componentArgs) => {
                    console.log("button click", dataArgs.VALUE);
                },
            }
        );

        return inputComp.getElement() as HTMLElement;
    }
}


export class ComponentInput extends ComponentInputBase {

    private var_inputValue = new Observable<string>("");

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
        this.fn_setupValueObservable();
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
                return this.template_render_iconClear(attrsDefault, data, extra);
            case ComponentInputConfigs.schemas.ICON.name:
                return this.template_render_icon(attrsDefault, data, extra);
            case ComponentInputConfigs.schemas.BUTTON.name:
                return this.template_render_button(attrsDefault, data, extra);
            case ComponentInputConfigs.schemas.VALIDATE.name:
                return this.template_render_validate(attrsDefault, data, extra);
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    private template_render_form(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_backgroundColorForm = data[ComponentInputConfigs.keys.prop_backgroundColorForm.name];
            const prop_formBorderRadius =    data[ComponentInputConfigs.keys.prop_formBorderRadius.name];

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                  //  "id": `component-input-form-${this._COMPONENT_RANDOM_ID}`,
                },
                styles: {
                    marginTop: "5px" ,
                },
                children: [
                    ReactiveElement.part("section", {
                        stylesBind: {
                            backgroundColor: prop_backgroundColorForm,
                            borderRadius: prop_formBorderRadius instanceof Observable
                                ? prop_formBorderRadius.map((s: any) => `${ToolsComponents_BorderRadius[s ?? SIZES.M]} !important`)
                                : `${ToolsComponents_BorderRadius[prop_formBorderRadius ?? SIZES.M]} !important`,
                        } ,
                        className: ["position-relative", "p-0"],
                        children: [
                            this.executeSchemaPart(ComponentInputConfigs.schemas.INPUT.name),
                            this.executeSchemaPart(ComponentInputConfigs.schemas.ICON_CLEAR.name),
                            this.executeSchemaPart(ComponentInputConfigs.schemas.ICON.name),
                            this.executeSchemaPart(ComponentInputConfigs.schemas.BUTTON.name),
                        ]
                    }) ,
                    this.executeSchemaPart(ComponentInputConfigs.schemas.VALIDATE.name),
                ]
            });

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_input(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_inputClass =            data[ComponentInputConfigs.keys.prop_inputClass.name];
            const prop_inputStyles =           data[ComponentInputConfigs.keys.prop_inputStyles.name];
            const prop_inputBorderColor =      data[ComponentInputConfigs.keys.prop_inputBorderColor.name];
            const prop_inputBorderColorFocus = data[ComponentInputConfigs.keys.prop_inputBorderColorFocus.name];
            const prop_inputBorderWidth =      data[ComponentInputConfigs.keys.prop_inputBorderWidth.name];
            const prop_inputBorderRadius =     data[ComponentInputConfigs.keys.prop_inputBorderRadius.name];
            const prop_type =                  data[ComponentInputConfigs.keys.prop_type.name];
            const prop_name =                  data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_name.name];
            const prop_value =                 data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name];
            const prop_placeholder =           data[ComponentInputConfigs.keys.prop_placeholder.name];
            const prop_icon =                  data[ComponentInputConfigs.keys.prop_icon.name];
            const prop_btnAddStatus =          data[ComponentInputConfigs.keys.prop_btnAddStatus.name];
            const prop_isDisable =             data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_size =                  data[ComponentInputConfigs.keys.prop_size.name];

            const directionRtl = AppConfig.get("directionRtl");

            const inputValue = prop_value instanceof Observable
                ? prop_value
                : this.var_inputValue;

            if (prop_value instanceof Observable) {
                this.var_inputValue = prop_value;
            }

            const inputId = `component-input-input-${this._COMPONENT_RANDOM_ID}`;

            return ReactiveElement.input({
                attrs: {
                    ...attrsDefault,
                    //"id": inputId,
                },
                attrsBind: {
                    type: prop_type,
                    name: prop_name,
                    placeholder: prop_placeholder,
                    value: inputValue,
                    disabled: prop_isDisable instanceof Observable
                        ? prop_isDisable.map((v: boolean) => v ? "disabled" : (null as any))
                        : (prop_isDisable ? "disabled" : (null as any)),
                },
                className: [
                    "d-block",
                ],
                classBind: [
                    prop_inputClass,
                    prop_isDisable instanceof Observable
                        ? prop_isDisable.mapBoolean("disabled", "")
                        : (prop_isDisable ? "disabled" : ""),
                    prop_icon instanceof Observable
                        ? prop_icon.mapBoolean("border", "")
                        : (prop_icon ? "border" : ""),
                ],
                styles: {
                    [directionRtl ? "paddingLeft" : "paddingRight"]: "35px",
                    [directionRtl ? "right" : "left"]: "0",
                    direction: directionRtl ? "rtl" : "ltr",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    top: "0",
                    paddingTop: "1px" ,
                    paddingBottom: "1px" ,
                    outline: "none",
                    boxShadow: "none",
                },
                stylesBind: (el) => ({
                    prop_inputStyles,
                    borderWidth: prop_inputBorderWidth instanceof Observable
                        ? prop_inputBorderWidth.map((s: any) => `${ToolsComponents_BorderWidth[s ?? SIZES.M]} !important`)
                        : `${ToolsComponents_BorderWidth[prop_inputBorderWidth ?? SIZES.M]} !important`,
                    borderRadius: prop_inputBorderRadius instanceof Observable
                        ? prop_inputBorderRadius.map((s: any) => `${ToolsComponents_BorderRadius[s ?? SIZES.M]} !important`)
                        : `${ToolsComponents_BorderRadius[prop_inputBorderRadius ?? SIZES.M]} !important`,
                    borderColor: el.focus.mapList({
                        true:  prop_inputBorderColorFocus instanceof Observable
                            ? prop_inputBorderColorFocus.map((v: string | null) => v ? `${v} !important` : (null as any))
                            : (prop_inputBorderColorFocus ? `${prop_inputBorderColorFocus} !important` : (null as any)),
                        false: prop_inputBorderColor instanceof Observable
                            ? prop_inputBorderColor.map((v: string | null) => v ? `${v} !important` : (null as any))
                            : (prop_inputBorderColor ? `${prop_inputBorderColor} !important` : (null as any)),
                    }),
                    lineHeight: prop_size instanceof Observable
                        ? prop_size.map((s: any) => `${ToolsCss.getHeightSize(s ?? SIZES.M)}px`)
                        : `${ToolsCss.getHeightSize(prop_size ?? SIZES.M)}px`,
                    fontSize: prop_size instanceof Observable
                        ? prop_size.map((s: any) => `${ToolsCss.getFontSize(s ?? SIZES.M)}px`)
                        : `${ToolsCss.getFontSize(prop_size ?? SIZES.M)}px`,
                    [directionRtl ? "marginRight" : "marginLeft"]: prop_icon instanceof Observable
                        ? prop_icon.map((v: any) => v ? "35px" : "0")
                        : (prop_icon ? "35px" : "0"),
                    width: prop_btnAddStatus instanceof Observable
                        ? prop_btnAddStatus.map((v: boolean) => `calc(100%  - ${v ? "35px" : "0px"})`)
                        : `calc(100%  - ${prop_btnAddStatus ? "35px" : "0px"})`,
                    ...(directionRtl
                        ? { borderTopRightRadius: prop_icon instanceof Observable
                                ? prop_icon.mapBoolean("0 !important", null as any)
                                : (prop_icon ? "0 !important" : (null as any)),
                            borderBottomRightRadius: prop_icon instanceof Observable
                                ? prop_icon.mapBoolean("0 !important", null as any)
                                : (prop_icon ? "0 !important" : (null as any)),
                            borderTopLeftRadius: prop_btnAddStatus instanceof Observable
                                ? prop_btnAddStatus.mapBoolean("0 !important", null as any)
                                : (prop_btnAddStatus ? "0 !important" : (null as any)),
                            borderBottomLeftRadius: prop_btnAddStatus instanceof Observable
                                ? prop_btnAddStatus.mapBoolean("0 !important", null as any)
                                : (prop_btnAddStatus ? "0 !important" : (null as any)),
                        }
                        : { borderTopLeftRadius: prop_icon instanceof Observable
                                ? prop_icon.mapBoolean("0 !important", null as any)
                                : (prop_icon ? "0 !important" : (null as any)),
                            borderBottomLeftRadius: prop_icon instanceof Observable
                                ? prop_icon.mapBoolean("0 !important", null as any)
                                : (prop_icon ? "0 !important" : (null as any)),
                            borderTopRightRadius: prop_btnAddStatus instanceof Observable
                                ? prop_btnAddStatus.mapBoolean("0 !important", null as any)
                                : (prop_btnAddStatus ? "0 !important" : (null as any)),
                            borderBottomRightRadius: prop_btnAddStatus instanceof Observable
                                ? prop_btnAddStatus.mapBoolean("0 !important", null as any)
                                : (prop_btnAddStatus ? "0 !important" : (null as any)),
                        }),
                }),
                on: {
                    input: (event: Event) => {
                        const val = (event.target as HTMLInputElement).value;
                        this.var_inputValue.set(val);
                        const params: ComponentInput_Methods_INPUT_DataArgs = {
                            [ComponentInputConfigs.methods.INPUT.dataArgs.VALUE.name]: val,
                        };
                        this.executeMethod(ComponentInputConfigs.methods.INPUT.name, event, params);
                    },
                    focus: (event: Event) => {
                        const val = (event.target as HTMLInputElement).value;
                        const params: ComponentInput_Methods_FOCUS_DataArgs = {
                            [ComponentInputConfigs.methods.FOCUS.dataArgs.VALUE.name]: val,
                        };
                        this.executeMethod(ComponentInputConfigs.methods.FOCUS.name, event, params);
                    },
                    blur: (event: Event) => {
                        const val = (event.target as HTMLInputElement).value;
                        const params: ComponentInput_Methods_BLUR_DataArgs = {
                            [ComponentInputConfigs.methods.BLUR.dataArgs.VALUE.name]: val,
                        };
                        this.executeMethod(ComponentInputConfigs.methods.BLUR.name, event, params);
                    },
                    keydown: (event: KeyboardEvent) => {
                        if (event.key === "Enter") {
                            const btnAddStatus = prop_btnAddStatus instanceof Observable ? prop_btnAddStatus.get() : prop_btnAddStatus;
                            if (btnAddStatus) {
                                event.preventDefault();
                                const val = this.fn_getValueInput();
                                const params: ComponentInput_Methods_CLICK_BUTTON_DataArgs = {
                                    [ComponentInputConfigs.methods.CLICK_BUTTON.dataArgs.VALUE.name]: val,
                                };
                                this.executeMethod(ComponentInputConfigs.methods.CLICK_BUTTON.name, event, params);
                            }
                        }
                    },
                }
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_iconClear(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_isDisable = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_btnAddStatus = data[ComponentInputConfigs.keys.prop_btnAddStatus.name];
            const prop_size = data[ComponentInputConfigs.keys.prop_size.name];

            const directionRtl = AppConfig.get("directionRtl");

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (isDisable: boolean, btnAddStatus: boolean, size: any) => {
                        if (isDisable) return null;

                        const sizeName = size ?? SIZES.M;
                        const btnOffset = btnAddStatus ? 160 : 0;
                        const elIconHeight = ToolsCss.getIconSize(sizeName);

                        const iconClearProps: any = {
                                classList: [],
                                styles: {},
                                prop_iconClass: [],
                                prop_iconStyles: {
                                    fontSize: "20pt",
                                    margin: "0 10px",
                                    cursor: "pointer",
                                },
                                prop_icon: ToolsIcons.icon_clear({ size: sizeName }),
                        };

                        const iconClearEl = new ToolsComponents.ComponentIcon(
                            iconClearProps as ComponentIconPropsType,
                            <ComponentIconMethodsType>{
                                fn_onClickIcon: (event, dataArgs, componentArgs) => {
                                    this.fn_onClearInput(event);
                                }
                            }
                        );

                        const posProps: any = {
                                classList: [],
                                styles: {},
                                prop_positionType: ComponentElementPosition_positionTypes.ABSOLUTE,
                                prop_positionTop: SizeUnit(50, UNITS.PERCENT),
                                prop_positionWidth: SizeUnit(30, UNITS.PEXEL),
                                prop_positionHeight: SizeUnit(elIconHeight, UNITS.PEXEL),
                                prop_positionStyles: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                },
                                prop_positionTranslate: directionRtl
                                    ? TranslateUnit(SizeUnit(btnOffset, UNITS.PEXEL), SizeUnit(-50, UNITS.PERCENT))
                                    : TranslateUnit(SizeUnit(-btnOffset, UNITS.PEXEL), SizeUnit(-50, UNITS.PERCENT)),
                                prop_positionZIndex: 10,
                                prop_content: iconClearEl.getReactiveElement(),
                        };
                        if (directionRtl) {
                                posProps.prop_positionLeft = SizeUnit(0, UNITS.PEXEL);
                        } else {
                                posProps.prop_positionRight = SizeUnit(0, UNITS.PEXEL);
                        }

                        return new ComponentElementPosition(
                            posProps as ComponentElementPositionPropsType,
                            <ComponentElementPositionMethodsType>{}
                        ).getReactiveElement();
                    },
                    [prop_isDisable, prop_btnAddStatus, prop_size],
                    this.getScope()
                ),
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_icon(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_icon = data[ComponentInputConfigs.keys.prop_icon.name];
            const prop_size = data[ComponentInputConfigs.keys.prop_size.name];
            const prop_colorIcon = data[ComponentInputConfigs.keys.prop_colorIcon.name];

            const directionRtl = AppConfig.get("directionRtl");

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (iconValue: any, size: any, colorIcon: any) => {
                        if (!iconValue) return null;

                        const sizeName = size ?? SIZES.M;
                        const elIconHeight = ToolsCss.getIconSize(sizeName);

                        const iconProps: any = {
                                classList: [],
                                styles: {},
                                prop_iconClass: [],
                                prop_iconStyles: {
                                    margin: "auto",
                                    cursor: "pointer",
                                    color: colorIcon ?? "",
                                },
                                prop_icon: iconValue,
                        };

                        const iconEl = new ToolsComponents.ComponentIcon(
                            iconProps as ComponentIconPropsType,
                            <ComponentIconMethodsType>{
                                fn_onClickIcon: (event, dataArgs, componentArgs) => {
                                    this.fn_onFocusInput(event);
                                }
                            }
                        );

                        const posProps: any = {
                                classList: [],
                                styles: {},
                                prop_positionType: ComponentElementPosition_positionTypes.ABSOLUTE,
                                prop_positionTop: SizeUnit(50, UNITS.PERCENT),
                                prop_positionWidth: SizeUnit(30, UNITS.PEXEL),
                                prop_positionHeight: SizeUnit(elIconHeight, UNITS.PEXEL),
                                prop_positionStyles: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                },
                                prop_positionTranslate: directionRtl
                                    ? TranslateUnit(SizeUnit(-5, UNITS.PEXEL), SizeUnit(-50, UNITS.PERCENT))
                                    : TranslateUnit(SizeUnit(5, UNITS.PEXEL), SizeUnit(-50, UNITS.PERCENT)),
                                prop_positionZIndex: 10,
                                prop_content: iconEl.getReactiveElement(),
                        };
                        if (directionRtl) {
                                posProps.prop_positionRight = SizeUnit(0, UNITS.PEXEL);
                        } else {
                                posProps.prop_positionLeft = SizeUnit(0, UNITS.PEXEL);
                        }

                        return new ComponentElementPosition(
                            posProps as ComponentElementPositionPropsType,
                            <ComponentElementPositionMethodsType>{}
                        ).getReactiveElement();
                    },
                    [prop_icon, prop_size, prop_colorIcon],
                    this.getScope()
                ),
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_button(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_btnAddStatus =     data[ComponentInputConfigs.keys.prop_btnAddStatus.name];
            const prop_btnAddIcon =       data[ComponentInputConfigs.keys.prop_btnAddIcon.name];
            const prop_btnAddTitle =      data[ComponentInputConfigs.keys.prop_btnAddTitle.name];
            const prop_btnAddClass =      data[ComponentInputConfigs.keys.prop_btnAddClass.name];
            const prop_btnColor =         data[ComponentInputConfigs.keys.prop_btnColor.name];
            const prop_size =             data[ComponentInputConfigs.keys.prop_size.name];
            const prop_inputBorderWidth = data[ComponentInputConfigs.keys.prop_inputBorderWidth.name];
            const prop_formBorderRadius = data[ComponentInputConfigs.keys.prop_formBorderRadius.name];


            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (btnAddStatus: boolean, btnAddIcon: any, btnAddTitle: any, btnAddClass: any, btnColor: any, size: any, inputBorderWidth: any) => {
                        if (!btnAddStatus) return null;

                        const sizeName = size ?? SIZES.M;
                        const borderWidthSize = inputBorderWidth ?? SIZES.M;
                        const borderOffset = Math.round(ToolsCss.getHeightSize(borderWidthSize) / 7);

                        const btnAddClassArr = btnAddClass ?? [];
                        const btnEl = new ToolsComponents.ComponentButton(
                            <ComponentButtonPropsType>{
                                classList: [],
                                styles: {},
                                prop_btnClass: [
                                    ...btnAddClassArr ,
                                    "shadow-sm", "px-3"
                                ],
                                prop_btnStyles: {
                                    cursor: "pointer",
                                    width: "160px",
                                },
                                prop_btnBorderRadius: null ,
                                prop_btnTitle: btnAddTitle ?? "add item",
                                prop_type: btnColor ?? ComponentButton_Types.SUBMIT,
                                prop_btnType: "button",
                                prop_btnIcon: btnAddIcon ?? "&plus;",
                                prop_size: sizeName,

                                prop_btnBorderWidth:           null ,
                                prop_btnBorderRadiusEndTop:    prop_formBorderRadius ,
                                prop_btnBorderRadiusEndBottom: prop_formBorderRadius ,
                            } ,
                            <ComponentButtonMethodsType>{
                                fn_onClickButton: (event, dataArgs, componentArgs) => {
                                    event.stopPropagation();
                                    const val = this.fn_getValueInput();
                                    const params: ComponentInput_Methods_CLICK_BUTTON_DataArgs = {
                                        [ComponentInputConfigs.methods.CLICK_BUTTON.dataArgs.VALUE.name]: val,
                                    };
                                    this.executeMethod(ComponentInputConfigs.methods.CLICK_BUTTON.name, event, params);
                                }
                            }
                        );

                        const posProps: any = {
                            classList: [],
                            styles: {},
                            prop_positionType: ComponentElementPosition_positionTypes.ABSOLUTE,

                            prop_positionZIndex: 10,
                            prop_positionStyles: {
                                    cursor: "pointer",
                                    width: "160px",
                            },
                            prop_positionTop: Observable.computed(
                                (sizeName)=>{
                                    return ToolsComponents_BorderWidth?.[sizeName]
                                },
                                [
                                    AppConfig.get_sizeName()
                                ] ,
                                this.getScope()
                            ),
                            prop_positionEnd: Observable.computed(
                                (sizeName)=>{
                                    return ToolsComponents_BorderWidth?.[sizeName]
                                },
                                [
                                    AppConfig.get_sizeName()
                                ] ,
                                this.getScope()
                            ),
                            prop_content: btnEl.getReactiveElement(),
                        };


                        return new ComponentElementPosition(
                            posProps as ComponentElementPositionPropsType,
                            <ComponentElementPositionMethodsType>{}
                        ).getReactiveElement();
                    },
                    [
                        prop_btnAddStatus,
                        prop_btnAddIcon,
                        prop_btnAddTitle,
                        prop_btnAddClass,
                        prop_btnColor,
                        prop_size,
                        prop_inputBorderWidth
                    ],
                    this.getScope()
                ),
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_validate(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_isDisable = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_isAbsoluteRule = data[ComponentInputConfigs.keys.prop_isAbsoluteRule.name];
            const prop_listRules = data[ComponentInputConfigs.keys.prop_listRules.name];
            const prop_msgRules = data[ComponentInputConfigs.keys.prop_msgRules.name];
            const prop_title = data[ComponentInputConfigs.keys.prop_title.name];

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    //"id": `component-input-form-${this._COMPONENT_RANDOM_ID}`,
                },
                className: ["position-relative"],
                children: [
                    ReactiveElement.part("section", {
                        attrs: { ...attrsDefault },
                        children: Observable.computed(
                            (isDisable: boolean, isAbsoluteRule: any, listRules: any, msgRules: any, title: any) => {
                                console.log(listRules)

                                if (isDisable) return null;
                                if (!Array.isArray(listRules) || listRules.length === 0) return null;

                                return new ToolsComponents.ComponentValidate(
                                    <ComponentValidatePropsType>{
                                        classList: ["mt-1"],
                                        prop_reference: `component-input-input-${this._COMPONENT_RANDOM_ID}`,
                                        prop_isAbsolute: isAbsoluteRule ?? true,
                                        prop_listRules: listRules,
                                        prop_msgRules: msgRules ?? null,
                                        prop_title: title ?? "",
                                        prop_size: "m",
                                        prop_value: this.var_inputValue,
                                    },
                                    <ComponentValidateMethodsType>{
                                        fn_onChangeValidate: (event, dataArgs, componentArgs) => {
                                        }
                                    }
                                ).getReactiveElement();
                            },
                            [prop_isDisable, prop_isAbsoluteRule, prop_listRules, prop_msgRules, prop_title],
                            this.getScope()
                        ),
                    }).getReactiveElement()
                ]
            });

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
        FUNCTIONs
    --------------------------------------------- */
    private fn_setupValueObservable() {
        const propValueObs = this.getObservable(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name);
        if (propValueObs != null) {
            this.var_inputValue = propValueObs;
        }
    }

    fn_getValueInput(): string {
        const inputEl = document.querySelector(`input#component-input-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
        if (inputEl) {
            return inputEl.value;
        }
        return this.var_inputValue.get();
    }

    fn_onClearInput(event: Event) {
        const inputEl = document.querySelector(`input#component-input-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
        if (inputEl) {
            inputEl.value = "";
        }
        this.var_inputValue.set("");
        const params: ComponentInput_Methods_INPUT_DataArgs = {
            [ComponentInputConfigs.methods.INPUT.dataArgs.VALUE.name]: "",
        };
        this.executeMethod(ComponentInputConfigs.methods.INPUT.name, event, params);
        this.fn_onFocusInput(event);
    }

    fn_onFocusInput(event: Event) {
        const inputEl = document.querySelector(`input#component-input-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
        if (inputEl) {
            inputEl.focus();
        }
        const val = this.fn_getValueInput();
        const params: ComponentInput_Methods_FOCUS_DataArgs = {
            [ComponentInputConfigs.methods.FOCUS.dataArgs.VALUE.name]: val,
        };
        this.executeMethod(ComponentInputConfigs.methods.FOCUS.name, event, params);
    }

}

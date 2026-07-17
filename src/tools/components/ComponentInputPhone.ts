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
import {
    ComponentValidateMethodsType,
    ComponentValidatePropsType
} from "./ComponentValidate";
import {ToolsIcons} from "../icons";
import {
    ComponentIconMethodsType,
    ComponentIconPropsType
} from "./ComponentIcon";
import {
    ComponentElementPosition,
    ComponentElementPositionMethodsType,
    ComponentElementPositionPropsType,
    ComponentElementPosition_positionTypes
} from "./ComponentElementPosition";
import {TranslateUnit} from "../../utils/ToolsConsts";



export const ComponentInputPhoneProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput_Value,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput_Label,
    ///----------------------
    prop_title:                            "prop_title",
    prop_name:                             "prop_name",
    prop_value:                            "prop_value",
    prop_options:                          "prop_options",
    prop_itemSelected:                     "prop_itemSelected",
    prop_size:                             "prop_size",
    prop_placeholder:                      "prop_placeholder",
    prop_labelClass:                       "prop_labelClass",
    prop_selectWidth:                      "prop_selectWidth",
    prop_backgroundColorForm:              "prop_backgroundColorForm",
    prop_formBorderRadius:                 "prop_formBorderRadius",
    prop_colorIcon:                        "prop_colorIcon",
    prop_icon:                             "prop_icon",
    prop_iconPhone:                        "prop_iconPhone",
    prop_inputClass:                       "prop_inputClass",
    prop_inputStyles:                      "prop_inputStyles",
    prop_inputBorderColor:                 "prop_inputBorderColor",
    prop_inputBorderColorFocus:            "prop_inputBorderColorFocus",
    prop_inputBorderWidth:                 "prop_inputBorderWidth",
    prop_inputBorderRadius:                "prop_inputBorderRadius",
    prop_hasRules:                         "prop_hasRules",
    prop_isAbsoluteRule:                   "prop_isAbsoluteRule",
    prop_listRules:                        "prop_listRules",
    prop_msgRules:                         "prop_msgRules",
} as const;



const ComponentInputPhoneConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys,
        ///----------------------
        [ComponentInputPhoneProps.prop_title]: {
            name:               ComponentInputPhoneProps.prop_title,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentInputPhoneProps.prop_name]: {
            name:               ComponentInputPhoneProps.prop_name,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentInputPhoneProps.prop_value]: {
            name:               ComponentInputPhoneProps.prop_value,
            value:              GOG_SetValue<Observable<string> | string>(""),
        },
        [ComponentInputPhoneProps.prop_options]: {
            name:               ComponentInputPhoneProps.prop_options,
            value:              GOG_SetValue<any[]>([]),
        },
        [ComponentInputPhoneProps.prop_itemSelected]: {
            name:               ComponentInputPhoneProps.prop_itemSelected,
            value:              GOG_SetValue<any>(null),
        },
        [ComponentInputPhoneProps.prop_size]: {
            name:               ComponentInputPhoneProps.prop_size,
            value:              GOG_SetValue<string>(SIZES.M),
        },
        [ComponentInputPhoneProps.prop_placeholder]: {
            name:               ComponentInputPhoneProps.prop_placeholder,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentInputPhoneProps.prop_labelClass]: {
            name:               ComponentInputPhoneProps.prop_labelClass,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentInputPhoneProps.prop_selectWidth]: {
            name:               ComponentInputPhoneProps.prop_selectWidth,
            value:              GOG_SetValue<string>("140px"),
        },
        [ComponentInputPhoneProps.prop_backgroundColorForm]: {
            name:               ComponentInputPhoneProps.prop_backgroundColorForm,
            value:              GOG_SetValue<string>("var(--secondaryColor1)"),
        },
        [ComponentInputPhoneProps.prop_formBorderRadius]: {
            name:               ComponentInputPhoneProps.prop_formBorderRadius,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES>>(SIZES.M),
        },
        [ComponentInputPhoneProps.prop_colorIcon]: {
            name:               ComponentInputPhoneProps.prop_colorIcon,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentInputPhoneProps.prop_icon]: {
            name:               ComponentInputPhoneProps.prop_icon,
            value:              GOG_SetValue<IconsType | null>(ToolsIcons.icon_phone()),
        },
        [ComponentInputPhoneProps.prop_hasRules]: {
            name:               ComponentInputPhoneProps.prop_hasRules,
            value:              GOG_SetValue<boolean>(false),
        },
        [ComponentInputPhoneProps.prop_isAbsoluteRule]: {
            name:               ComponentInputPhoneProps.prop_isAbsoluteRule,
            value:              GOG_SetValue<boolean>(false),
        },
        [ComponentInputPhoneProps.prop_listRules]: {
            name:               ComponentInputPhoneProps.prop_listRules,
            value:              GOG_SetValue<any[]>([]),
        },
        [ComponentInputPhoneProps.prop_msgRules]: {
            name:               ComponentInputPhoneProps.prop_msgRules,
            value:              GOG_SetValue<Record<string, string> | null>(null),
        },
        [ComponentInputPhoneProps.prop_inputClass]: {
            name:               ComponentInputPhoneProps.prop_inputClass,
            value:              GOG_SetValue<string[]>(["form-control"]),
        },
        [ComponentInputPhoneProps.prop_inputStyles]: {
            name:               ComponentInputPhoneProps.prop_inputStyles,
            value:              GOG_SetValue<Record<string, string>>({}),
        },
        [ComponentInputPhoneProps.prop_inputBorderColor]: {
            name:               ComponentInputPhoneProps.prop_inputBorderColor,
            value:              GOG_SetValue<string>("var(--primaryColor1)"),
        },
        [ComponentInputPhoneProps.prop_inputBorderColorFocus]: {
            name:               ComponentInputPhoneProps.prop_inputBorderColorFocus,
            value:              GOG_SetValue<string>("var(--secondaryColor1)"),
        },
        [ComponentInputPhoneProps.prop_inputBorderWidth]: {
            name:               ComponentInputPhoneProps.prop_inputBorderWidth,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES>>(SIZES.M),
        },
        [ComponentInputPhoneProps.prop_inputBorderRadius]: {
            name:               ComponentInputPhoneProps.prop_inputBorderRadius,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES>>(SIZES.M),
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
        SELECT: {
            name:               "part_select"
        },
        INPUT: {
            name:               "part_input"
        },
        ICON: {
            name:               "part_icon"
        },
        ICON_CLEAR: {
            name:               "part_icon_clear"
        },
        VALIDATE: {
            name:               "part_validate"
        },
    },
    templates: {
        FORM: {
            name:                "form"
        },
    },
    methods: {
        SELECT_CHANGE: {
            name:                      "fn_onSelectChange",
            dataArgs: {
                SELECTED_ID: {
                    name:              "SELECTED_ID",
                    value:             GOG_SetValue<any>(null),
                },
                SELECTED_DATA: {
                    name:              "SELECTED_DATA",
                    value:             GOG_SetValue<any>(null),
                },
            },
            componentArgs: {}
        },
        INPUT_CHANGE: {
            name:                      "fn_onInputChange",
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
        CALLBACK: {
            name:                      "fn_callback",
            dataArgs: {
                CODE: {
                    name:              "CODE",
                    value:             GOG_SetValue<any>(null),
                },
                NUMBER: {
                    name:              "NUMBER",
                    value:             GOG_SetValue<string>(""),
                },
                TEXT: {
                    name:              "TEXT",
                    value:             GOG_SetValue<string>(""),
                },
            },
            componentArgs: {}
        },
    }
} as const;



export type ComponentInputPhonePropsType =                      GOG_ExtractNameValue<typeof ComponentInputPhoneConfigs.keys>
export type ComponentInputPhoneSchemaType =                     GOG_ExtractName<typeof ComponentInputPhoneConfigs.schemas>
export type ComponentInputPhoneTemplatesType =                  GOG_ExtractName<typeof ComponentInputPhoneConfigs.templates>

export type ComponentInputPhone_Methods_SELECT_CHANGE_ComponentArgs =   GOG_ExtractName<typeof ComponentInputPhoneConfigs.methods.SELECT_CHANGE.componentArgs>
export type ComponentInputPhone_Methods_SELECT_CHANGE_DataArgs =        GOG_ExtractNameValue<typeof ComponentInputPhoneConfigs.methods.SELECT_CHANGE.dataArgs>
export type ComponentInputPhone_Methods_INPUT_CHANGE_ComponentArgs =    GOG_ExtractName<typeof ComponentInputPhoneConfigs.methods.INPUT_CHANGE.componentArgs>
export type ComponentInputPhone_Methods_INPUT_CHANGE_DataArgs =         GOG_ExtractNameValue<typeof ComponentInputPhoneConfigs.methods.INPUT_CHANGE.dataArgs>
export type ComponentInputPhone_Methods_FOCUS_ComponentArgs =           GOG_ExtractName<typeof ComponentInputPhoneConfigs.methods.FOCUS.componentArgs>
export type ComponentInputPhone_Methods_FOCUS_DataArgs =                GOG_ExtractNameValue<typeof ComponentInputPhoneConfigs.methods.FOCUS.dataArgs>
export type ComponentInputPhone_Methods_BLUR_ComponentArgs =            GOG_ExtractName<typeof ComponentInputPhoneConfigs.methods.BLUR.componentArgs>
export type ComponentInputPhone_Methods_BLUR_DataArgs =                 GOG_ExtractNameValue<typeof ComponentInputPhoneConfigs.methods.BLUR.dataArgs>
export type ComponentInputPhone_Methods_CALLBACK_ComponentArgs =        GOG_ExtractName<typeof ComponentInputPhoneConfigs.methods.CALLBACK.componentArgs>
export type ComponentInputPhone_Methods_CALLBACK_DataArgs =             GOG_ExtractNameValue<typeof ComponentInputPhoneConfigs.methods.CALLBACK.dataArgs>

export type ComponentInputPhoneMethodsType = {
    [ComponentInputPhoneConfigs.methods.SELECT_CHANGE.name]: ComponentCallBackType<ComponentInputPhone_Methods_SELECT_CHANGE_ComponentArgs, ComponentInputPhone_Methods_SELECT_CHANGE_DataArgs>,
    [ComponentInputPhoneConfigs.methods.INPUT_CHANGE.name]: ComponentCallBackType<ComponentInputPhone_Methods_INPUT_CHANGE_ComponentArgs, ComponentInputPhone_Methods_INPUT_CHANGE_DataArgs>,
    [ComponentInputPhoneConfigs.methods.FOCUS.name]: ComponentCallBackType<ComponentInputPhone_Methods_FOCUS_ComponentArgs, ComponentInputPhone_Methods_FOCUS_DataArgs>,
    [ComponentInputPhoneConfigs.methods.BLUR.name]: ComponentCallBackType<ComponentInputPhone_Methods_BLUR_ComponentArgs, ComponentInputPhone_Methods_BLUR_DataArgs>,
    [ComponentInputPhoneConfigs.methods.CALLBACK.name]: ComponentCallBackType<ComponentInputPhone_Methods_CALLBACK_ComponentArgs, ComponentInputPhone_Methods_CALLBACK_DataArgs>,
}



export abstract class ComponentInputPhoneBase extends ComponentBase<
    ComponentInputPhonePropsType,
    ComponentInputPhoneSchemaType,
    ComponentInputPhoneTemplatesType,
    ComponentInputPhoneMethodsType
> {

    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN = defineComponentPatterns<ComponentInputPhonePropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Pattern(this),
            ///----------------------
            [ComponentInputPhoneConfigs.keys.prop_title.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_title.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_title.value,
                title:                                            Language.translate("components.input.props.prop_title.title"),
                description:                                      Language.translate("components.input.props.prop_title.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_name.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_name.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_name.value,
                title:                                            Language.translate("components.public.props.prop_name.title"),
                description:                                      Language.translate("components.public.props.prop_name.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_value.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_value.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_value.value,
                title:                                            Language.translate("components.public.props.prop_value.title"),
                description:                                      Language.translate("components.public.props.prop_value.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_options.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_options.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_options.value,
                title:                                            Language.translate("components.input_phone.props.prop_options.title"),
                description:                                      Language.translate("components.input_phone.props.prop_options.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_itemSelected.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_itemSelected.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_itemSelected.value,
                title:                                            Language.translate("components.input_phone.props.prop_itemSelected.title"),
                description:                                      Language.translate("components.input_phone.props.prop_itemSelected.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_size.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_size.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_size.value,
                title:                                            Language.translate("components.input.props.prop_size.title"),
                description:                                      Language.translate("components.input.props.prop_size.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_placeholder.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_placeholder.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_placeholder.value,
                title:                                            Language.translate("components.input.props.prop_placeholder.title"),
                description:                                      Language.translate("components.input.props.prop_placeholder.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_labelClass.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_labelClass.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_labelClass.value,
                title:                                            Language.translate("components.input.props.prop_labelClass.title"),
                description:                                      Language.translate("components.input.props.prop_labelClass.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_selectWidth.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_selectWidth.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_selectWidth.value,
                title:                                            Language.translate("components.input_phone.props.prop_selectWidth.title"),
                description:                                      Language.translate("components.input_phone.props.prop_selectWidth.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_backgroundColorForm.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_backgroundColorForm.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_backgroundColorForm.value,
                title:                                            Language.translate("components.input.props.prop_backgroundColorForm.title"),
                description:                                      Language.translate("components.input.props.prop_backgroundColorForm.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_formBorderRadius.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_formBorderRadius.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_formBorderRadius.value,
                title:                                            Language.translate("components.input.props.prop_formBorderRadius.title"),
                description:                                      Language.translate("components.input.props.prop_formBorderRadius.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_hasRules.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_hasRules.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_hasRules.value,
                title:                                            Language.translate("components.input.props.prop_hasRules.title"),
                description:                                      Language.translate("components.input.props.prop_hasRules.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_isAbsoluteRule.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_isAbsoluteRule.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_isAbsoluteRule.value,
                title:                                            Language.translate("components.input.props.prop_isAbsoluteRule.title"),
                description:                                      Language.translate("components.input.props.prop_isAbsoluteRule.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_listRules.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_listRules.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_listRules.value,
                title:                                            Language.translate("components.input.props.prop_listRules.title"),
                description:                                      Language.translate("components.input.props.prop_listRules.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_msgRules.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_msgRules.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_msgRules.value,
                title:                                            Language.translate("components.input.props.prop_msgRules.title"),
                description:                                      Language.translate("components.input.props.prop_msgRules.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_colorIcon.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_colorIcon.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_colorIcon.value,
                title:                                            Language.translate("components.input.props.prop_colorIcon.title"),
                description:                                      Language.translate("components.input.props.prop_colorIcon.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_icon.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_icon.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_icon.value,
                title:                                            Language.translate("components.input.props.prop_icon.title"),
                description:                                      Language.translate("components.input.props.prop_icon.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_inputClass.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_inputClass.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_inputClass.value,
                title:                                            Language.translate("components.input.props.prop_inputClass.title"),
                description:                                      Language.translate("components.input.props.prop_inputClass.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_inputStyles.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_inputStyles.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_inputStyles.value,
                title:                                            Language.translate("components.input.props.prop_inputStyles.title"),
                description:                                      Language.translate("components.input.props.prop_inputStyles.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_inputBorderColor.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_inputBorderColor.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_inputBorderColor.value,
                title:                                            Language.translate("components.input.props.prop_inputBorderColor.title"),
                description:                                      Language.translate("components.input.props.prop_inputBorderColor.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_inputBorderColorFocus.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_inputBorderColorFocus.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_inputBorderColorFocus.value,
                title:                                            Language.translate("components.input.props.prop_inputBorderColorFocus.title"),
                description:                                      Language.translate("components.input.props.prop_inputBorderColorFocus.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_inputBorderWidth.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_inputBorderWidth.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_inputBorderWidth.value,
                title:                                            Language.translate("components.input.props.prop_inputBorderWidth.title"),
                description:                                      Language.translate("components.input.props.prop_inputBorderWidth.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_inputBorderRadius.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_inputBorderRadius.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_inputBorderRadius.value,
                title:                                            Language.translate("components.input.props.prop_inputBorderRadius.title"),
                description:                                      Language.translate("components.input.props.prop_inputBorderRadius.description"),
            },
        }
    );


    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentInputPhoneSchemaType, ComponentInputPhonePropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Schema(this),
        ///----------------------
        FORM: {
            part:               ComponentInputPhoneConfigs.schemas.FORM.name,
            title:              Language.translate("components.input.schema.form.title"),
            description:        Language.translate("components.input.schema.form.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_icon.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_backgroundColorForm.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_formBorderRadius.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_selectWidth.name],
            ]
        },
        SELECT: {
            part:               ComponentInputPhoneConfigs.schemas.SELECT.name,
            title:              Language.translate("components.input_phone.schema.select.title"),
            description:        Language.translate("components.input_phone.schema.select.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_options.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_itemSelected.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_selectWidth.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
            ]
        },
        INPUT: {
            part:               ComponentInputPhoneConfigs.schemas.INPUT.name,
            title:              Language.translate("components.input.schema.input.title"),
            description:        Language.translate("components.input.schema.input.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_name.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_value.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_placeholder.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_hasRules.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_isAbsoluteRule.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_listRules.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_msgRules.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_title.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_inputClass.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_inputStyles.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_inputBorderColor.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_inputBorderColorFocus.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_inputBorderWidth.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_inputBorderRadius.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_icon.name],
            ]
        },
        ICON: {
            part:               ComponentInputPhoneConfigs.schemas.ICON.name,
            title:              Language.translate("components.input.schema.icon.title"),
            description:        Language.translate("components.input.schema.icon.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_icon.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_colorIcon.name],
            ]
        },
        ICON_CLEAR: {
            part:               ComponentInputPhoneConfigs.schemas.ICON_CLEAR.name,
            title:              Language.translate("components.input.schema.icon_clear.title"),
            description:        Language.translate("components.input.schema.icon_clear.description"),
            props: [
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_size.name],
            ]
        },
        VALIDATE: {
            part:               ComponentInputPhoneConfigs.schemas.VALIDATE.name,
            title:              Language.translate("components.input.schema.validate.title"),
            description:        Language.translate("components.input.schema.validate.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_hasRules.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_isAbsoluteRule.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_listRules.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_msgRules.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_title.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_size.name],
            ]
        },
    });


    /* ---------------------------------------------
        PROPERTYs Templates
    --------------------------------------------- */
    _COMPONENT_TEMPLATES = defineComponentTemplate<ComponentInputPhoneTemplatesType, ComponentInputPhonePropsType>({
        FORM: {
            title:                                            Language.translate("components.input.template.body.title"),
            description:                                      Language.translate("components.input.template.body.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_placeholder.name]
        },
    });


    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentInputPhoneMethodsType, ComponentInputPhonePropsType>({
        [ComponentInputPhoneConfigs.methods.SELECT_CHANGE.name]: {
            title:                                            Language.translate("components.input_phone.methods.fn_onSelectChange.title"),
            description:                                      Language.translate("components.input_phone.methods.fn_onSelectChange.description"),
            args: {
                [ComponentInputPhoneConfigs.methods.SELECT_CHANGE.dataArgs.SELECTED_ID.name]: this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_itemSelected.name],
                [ComponentInputPhoneConfigs.methods.SELECT_CHANGE.dataArgs.SELECTED_DATA.name]: this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_options.name],
            }
        },
        [ComponentInputPhoneConfigs.methods.INPUT_CHANGE.name]: {
            title:                                            Language.translate("components.input.methods.fn_onInput.title"),
            description:                                      Language.translate("components.input.methods.fn_onInput.description"),
            args: {
                [ComponentInputPhoneConfigs.methods.INPUT_CHANGE.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_value.name],
            }
        },
        [ComponentInputPhoneConfigs.methods.FOCUS.name]: {
            title:                                            Language.translate("components.input.methods.fn_onFocus.title"),
            description:                                      Language.translate("components.input.methods.fn_onFocus.description"),
            args: {
                [ComponentInputPhoneConfigs.methods.FOCUS.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_value.name],
            }
        },
        [ComponentInputPhoneConfigs.methods.BLUR.name]: {
            title:                                            Language.translate("components.input.methods.fn_onBlur.title"),
            description:                                      Language.translate("components.input.methods.fn_onBlur.description"),
            args: {
                [ComponentInputPhoneConfigs.methods.BLUR.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_value.name],
            }
        },
        [ComponentInputPhoneConfigs.methods.CALLBACK.name]: {
            title:                                            Language.translate("components.input_phone.methods.fn_callback.title"),
            description:                                      Language.translate("components.input_phone.methods.fn_callback.description"),
            args: {
                [ComponentInputPhoneConfigs.methods.CALLBACK.dataArgs.CODE.name]: this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_itemSelected.name],
                [ComponentInputPhoneConfigs.methods.CALLBACK.dataArgs.NUMBER.name]: this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_value.name],
                [ComponentInputPhoneConfigs.methods.CALLBACK.dataArgs.TEXT.name]: this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_value.name],
            }
        },
    });


    /* ---------------------------------------------
        Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        const valueObs = new Observable<string>("");
        const selectedObs = new Observable<any>(null);

        const inputPhoneComp = new ComponentInputPhone(
            {
                classList: ["col-md-3", "col-12", "border", "p-2"],
                prop_title: "Phone Example",
                prop_labelTitle: "Phone Example",
                prop_labelTooltipDescription: "Enter your phone number",
                prop_placeholder: "Enter phone number...",
                prop_value: valueObs,
                prop_itemSelected: selectedObs,
                prop_size: SIZES.M,
                prop_selectWidth: "140px",
                prop_options: [
                    { id: 1, name: "Iran", code: "+98" },
                    { id: 2, name: "USA", code: "+1" },
                    { id: 3, name: "UK", code: "+44" },
                    { id: 4, name: "Germany", code: "+49" },
                ],
                prop_listRules: [
                    {
                        rule: "_not_empty",
                        description: "This field is required"
                    },
                ],
                prop_msgRules: {
                    "_not_empty": "Phone number is required",
                },
                prop_isAbsoluteRule: true,
                prop_hasRules: true,
            } as any as ComponentInputPhonePropsType,
            <ComponentInputPhoneMethodsType>{
                fn_onSelectChange: (event, dataArgs, componentArgs) => {
                    selectedObs.set(dataArgs.SELECTED_ID);
                    console.log("select changed", dataArgs.SELECTED_ID, dataArgs.SELECTED_DATA);
                },
                fn_onInputChange: (event, dataArgs, componentArgs) => {
                    valueObs.set(dataArgs.VALUE);
                    console.log("input changed", dataArgs.VALUE);
                },
                fn_onFocus: (event, dataArgs, componentArgs) => {
                    console.log("focus", dataArgs.VALUE);
                },
                fn_onBlur: (event, dataArgs, componentArgs) => {
                    console.log("blur", dataArgs.VALUE);
                },
                fn_callback: (event, dataArgs, componentArgs) => {
                    console.log("callback", dataArgs.CODE, dataArgs.NUMBER, dataArgs.TEXT);
                },
            }
        );

        return inputPhoneComp.getElement() as HTMLElement;
    }
}


export class ComponentInputPhone extends ComponentInputPhoneBase {

    private var_inputValue = new Observable<string>("");
    private var_selectedCode: any = null;

    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentInputPhonePropsType,
        methods: ComponentInputPhoneMethodsType,
        events = null
    ) {
        super("input-phone", null);
        super.renderComponent(config, methods, events);
        this.fn_setupValueObservable();
    }


    /* ---------------------------------------------
        TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentInputPhoneConfigs.schemas.FORM.name)
    }

    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentInputPhoneConfigs.schemas.FORM.name:
                return this.template_render_form(attrsDefault, data, extra);
            case ComponentInputPhoneConfigs.schemas.SELECT.name:
                return this.template_render_select(attrsDefault, data, extra);
            case ComponentInputPhoneConfigs.schemas.INPUT.name:
                return this.template_render_input(attrsDefault, data, extra);
            case ComponentInputPhoneConfigs.schemas.ICON.name:
                return this.template_render_icon(attrsDefault, data, extra);
            case ComponentInputPhoneConfigs.schemas.ICON_CLEAR.name:
                return this.template_render_icon_clear(attrsDefault, data, extra);
            case ComponentInputPhoneConfigs.schemas.VALIDATE.name:
                return this.template_render_validate(attrsDefault, data, extra);
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    /* ---------------------------------------------
        template_render_form — یک ReactiveElement.section
    --------------------------------------------- */
    private template_render_form(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_backgroundColorForm = data[ComponentInputPhoneConfigs.keys.prop_backgroundColorForm.name];
            const prop_formBorderRadius =    data[ComponentInputPhoneConfigs.keys.prop_formBorderRadius.name];
            const prop_selectWidth =         data[ComponentInputPhoneConfigs.keys.prop_selectWidth.name];
            const prop_icon =                data[ComponentInputPhoneConfigs.keys.prop_icon.name];

            const directionRtl = AppConfig.get("directionRtl");

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-input-phone-form-${this._COMPONENT_RANDOM_ID}`,
                },
                styles: {
                    marginTop: "5px",
                },
                children: [
                    ReactiveElement.part("section", {
                        stylesBind: {
                            backgroundColor: prop_backgroundColorForm,
                            borderRadius: prop_formBorderRadius instanceof Observable
                                ? prop_formBorderRadius.map((s: any) => `${ToolsComponents_BorderRadius[s ?? SIZES.M]} !important`)
                                : `${ToolsComponents_BorderRadius[prop_formBorderRadius ?? SIZES.M]} !important`,
                        },
                        className: ["position-relative", "p-0", "d-flex"],
                        styles: {
                            display: "flex",
                            alignItems: "stretch",
                        },
                        children: [
                            ReactiveElement.part("div", {
                                styles: {
                                    flexShrink: "0",
                                    //width:  "35px",
                                    // [directionRtl ? "marginRight" : "marginLeft"]: prop_icon instanceof Observable
                                    //     ? prop_icon.map((v: any) => v ? "35px" : "0")
                                    //     : (prop_icon ? "35px" : "0"),
                                },
                                stylesBind: {
                                    width: Observable.computed(
                                        (icon) => {
                                            if (icon != null){
                                                return "35px";
                                            }
                                            return null;
                                        } ,
                                        [prop_icon] ,
                                        this.getScope()
                                    )
                                } ,
                                children: [
                                    this.executeSchemaPart(ComponentInputPhoneConfigs.schemas.ICON.name),
                                ]
                            }),
                            ReactiveElement.part("div", {
                                styles: {
                                    flexShrink: "0",
                                    width: prop_selectWidth ?? "140px",
                                },
                                children: [
                                    this.executeSchemaPart(ComponentInputPhoneConfigs.schemas.SELECT.name),
                                ]
                            }),
                            ReactiveElement.part("div", {
                                className: ["position-relative"],
                                styles: {
                                    flexGrow: "1",
                                    minWidth: "0",
                                    [directionRtl ? "marginRight" : "marginLeft"]: "-2px",
                                },
                                children: [
                                    this.executeSchemaPart(ComponentInputPhoneConfigs.schemas.INPUT.name),
                                    this.executeSchemaPart(ComponentInputPhoneConfigs.schemas.ICON_CLEAR.name),
                                ]
                            }),
                        ]
                    }),
                    this.executeSchemaPart(ComponentInputPhoneConfigs.schemas.VALIDATE.name),
                ]
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
        template_render_select — یک ReactiveElement.part("select")
    --------------------------------------------- */
    private template_render_select(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_options = data[ComponentInputPhoneConfigs.keys.prop_options.name];
            const prop_itemSelected = data[ComponentInputPhoneConfigs.keys.prop_itemSelected.name];
            const prop_size = data[ComponentInputPhoneConfigs.keys.prop_size.name];
            const prop_isDisable = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];

            const selectId = `component-input-phone-select-${this._COMPONENT_RANDOM_ID}`;

            const directionRtl = AppConfig.get("directionRtl");

            const options = prop_options instanceof Observable ? prop_options.get() : prop_options;
            const itemSelected = prop_itemSelected instanceof Observable ? prop_itemSelected.get() : prop_itemSelected;

            const optionsWithCode = options != null ? options.map((item: any) => ({
                id: item.id,
                name: item.hasOwnProperty("code") ? `${item.code} ${item.name}` : item.name,
                code: item.code,
            })) : [];

            const sizeName = prop_size instanceof Observable ? prop_size.get() : (prop_size ?? SIZES.M);
            const isDisable = prop_isDisable instanceof Observable ? prop_isDisable.get() : prop_isDisable;

            const optionChildren = optionsWithCode.map((opt: any) =>
                ReactiveElement.part("option", {
                    attrs: {
                        value: opt.id,
                        selected: itemSelected != null && String(opt.id) === String(itemSelected) ? "selected" : null,
                    },
                    children: opt.name,
                })
            );

            return ReactiveElement.part("select", {
                attrs: {
                    ...attrsDefault,
                    "id": selectId,
                    "disabled": isDisable ? "disabled" : null,
                },
                className: ["form-control", "d-block"],
                styles: {
                    lineHeight:      `${ToolsCss.getHeightSize(sizeName)}px`,
                    fontSize:        `${ToolsCss.getFontSize(sizeName)}px`,
                    outline:         "none",
                    boxShadow:       "none",
                    width:           "100%",
                    paddingTop:      "1px",
                    paddingBottom:   "1px",
                    borderWidth:     `${ToolsComponents_BorderWidth[SIZES.M]} !important`,
                    borderStyle:     "solid",
                    borderColor:      Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) ,
                    [directionRtl ? "borderTopLeftRadius" : "borderTopRightRadius"]: "0 !important",
                    [directionRtl ? "borderBottomLeftRadius" : "borderBottomRightRadius"]: "0 !important",
                },
                children: optionChildren,
                on: {
                    change: (event: Event) => {
                        const selectEl = event.target as HTMLSelectElement;
                        const selectedId = selectEl.value;
                        const selectedData = optionsWithCode.find((o: any) => String(o.id) === String(selectedId)) ?? null;
                        this.var_selectedCode = selectedData;
                        const params: ComponentInputPhone_Methods_SELECT_CHANGE_DataArgs = {
                            [ComponentInputPhoneConfigs.methods.SELECT_CHANGE.dataArgs.SELECTED_ID.name]: selectedId,
                            [ComponentInputPhoneConfigs.methods.SELECT_CHANGE.dataArgs.SELECTED_DATA.name]: selectedData,
                        };
                        this.executeMethod(ComponentInputPhoneConfigs.methods.SELECT_CHANGE.name, event, params);
                        this.fn_executeCallback(event);
                    },
                }
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
        template_render_input — یک ReactiveElement.input
    --------------------------------------------- */
    private template_render_input(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_inputClass = data[ComponentInputPhoneConfigs.keys.prop_inputClass.name];
            const prop_inputStyles = data[ComponentInputPhoneConfigs.keys.prop_inputStyles.name];
            const prop_inputBorderColor = data[ComponentInputPhoneConfigs.keys.prop_inputBorderColor.name];
            const prop_inputBorderColorFocus = data[ComponentInputPhoneConfigs.keys.prop_inputBorderColorFocus.name];
            const prop_inputBorderWidth = data[ComponentInputPhoneConfigs.keys.prop_inputBorderWidth.name];
            const prop_inputBorderRadius = data[ComponentInputPhoneConfigs.keys.prop_inputBorderRadius.name];
            const prop_name = data[ComponentInputPhoneConfigs.keys.prop_name.name];
            const prop_value = data[ComponentInputPhoneConfigs.keys.prop_value.name];
            const prop_size = data[ComponentInputPhoneConfigs.keys.prop_size.name];
            const prop_placeholder = data[ComponentInputPhoneConfigs.keys.prop_placeholder.name];
            const prop_isDisable = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_icon = data[ComponentInputPhoneConfigs.keys.prop_icon.name];

            const directionRtl = AppConfig.get("directionRtl");

            const inputValue = prop_value instanceof Observable
                ? prop_value
                : this.var_inputValue;

            if (prop_value instanceof Observable) {
                this.var_inputValue = prop_value;
            }

            const inputId = `component-input-phone-input-${this._COMPONENT_RANDOM_ID}`;

            return ReactiveElement.input({
                attrs: {
                    ...attrsDefault,
                    "id": inputId,
                    "type": "tel",
                },
                attrsBind: {
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
                    paddingTop: "1px",
                    paddingBottom: "1px",
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
                    ...(directionRtl
                        ? { borderTopRightRadius: prop_icon instanceof Observable
                                ? prop_icon.mapBoolean("0 !important", null as any)
                                : (prop_icon ? "0 !important" : (null as any)),
                            borderBottomRightRadius: prop_icon instanceof Observable
                                ? prop_icon.mapBoolean("0 !important", null as any)
                                : (prop_icon ? "0 !important" : (null as any)),
                            borderTopLeftRadius: "0 !important",
                            borderBottomLeftRadius: "0 !important",
                        }
                        : { borderTopLeftRadius: prop_icon instanceof Observable
                                ? prop_icon.mapBoolean("0 !important", null as any)
                                : (prop_icon ? "0 !important" : (null as any)),
                            borderBottomLeftRadius: prop_icon instanceof Observable
                                ? prop_icon.mapBoolean("0 !important", null as any)
                                : (prop_icon ? "0 !important" : (null as any)),
                            borderTopRightRadius: "0 !important",
                            borderBottomRightRadius: "0 !important",
                        }),
                }),
                on: {
                    input: (event: Event) => {
                        const val = (event.target as HTMLInputElement).value;
                        this.var_inputValue.set(val);
                        const params: ComponentInputPhone_Methods_INPUT_CHANGE_DataArgs = {
                            [ComponentInputPhoneConfigs.methods.INPUT_CHANGE.dataArgs.VALUE.name]: val,
                        };
                        this.executeMethod(ComponentInputPhoneConfigs.methods.INPUT_CHANGE.name, event, params);
                        this.fn_executeCallback(event);
                    },
                    focus: (event: Event) => {
                        const val = (event.target as HTMLInputElement).value;
                        const params: ComponentInputPhone_Methods_FOCUS_DataArgs = {
                            [ComponentInputPhoneConfigs.methods.FOCUS.dataArgs.VALUE.name]: val,
                        };
                        this.executeMethod(ComponentInputPhoneConfigs.methods.FOCUS.name, event, params);
                    },
                    blur: (event: Event) => {
                        const val = (event.target as HTMLInputElement).value;
                        const params: ComponentInputPhone_Methods_BLUR_DataArgs = {
                            [ComponentInputPhoneConfigs.methods.BLUR.dataArgs.VALUE.name]: val,
                        };
                        this.executeMethod(ComponentInputPhoneConfigs.methods.BLUR.name, event, params);
                    },
                }
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
        template_render_icon — ترکیبی: ComponentElementPosition + ComponentIcon
    --------------------------------------------- */
    private template_render_icon(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_icon = data[ComponentInputPhoneConfigs.keys.prop_icon.name];
            const prop_size = data[ComponentInputPhoneConfigs.keys.prop_size.name];
            const prop_colorIcon = data[ComponentInputPhoneConfigs.keys.prop_colorIcon.name];

            const directionRtl = AppConfig.get("directionRtl");

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (iconVal: any, size: any, colorIcon: any) => {

                        console.log(iconVal)

                        if (!iconVal) return null;

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
                            prop_icon: iconVal,
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
                    [prop_icon , prop_size, prop_colorIcon],
                    this.getScope()
                ),
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
        template_render_icon_clear — ترکیبی: ComponentElementPosition + ComponentIcon
    --------------------------------------------- */
    private template_render_icon_clear(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_isDisable = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_size = data[ComponentInputPhoneConfigs.keys.prop_size.name];

            const directionRtl = AppConfig.get("directionRtl");

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (isDisable: boolean, size: any) => {
                        if (isDisable) return null;

                        const sizeName = size ?? SIZES.M;
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
                            prop_positionTranslate: TranslateUnit(SizeUnit(0, UNITS.PEXEL), SizeUnit(-50, UNITS.PERCENT)),
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
                    [prop_isDisable, prop_size],
                    this.getScope()
                ),
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
        template_render_validate — یک ComponentValidate
    --------------------------------------------- */
    private template_render_validate(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_isDisable = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_hasRules = data[ComponentInputPhoneConfigs.keys.prop_hasRules.name];
            const prop_isAbsoluteRule = data[ComponentInputPhoneConfigs.keys.prop_isAbsoluteRule.name];
            const prop_listRules = data[ComponentInputPhoneConfigs.keys.prop_listRules.name];
            const prop_msgRules = data[ComponentInputPhoneConfigs.keys.prop_msgRules.name];
            const prop_title = data[ComponentInputPhoneConfigs.keys.prop_title.name];
            const prop_size = data[ComponentInputPhoneConfigs.keys.prop_size.name];

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                className: ["position-relative"],
                children: Observable.computed(
                    (isDisable: boolean, hasRules: boolean, isAbsoluteRule: any, listRules: any, msgRules: any, title: any, size: any) => {
                        if (isDisable) return null;
                        if (!hasRules) return null;
                        if (!Array.isArray(listRules) || listRules.length === 0) return null;

                        return new ToolsComponents.ComponentValidate(
                            <ComponentValidatePropsType>{
                                classList: ["mt-1"],
                                prop_reference: `component-input-phone-input-${this._COMPONENT_RANDOM_ID}`,
                                prop_isAbsolute: isAbsoluteRule ?? true,
                                prop_listRules: listRules,
                                prop_msgRules: msgRules ?? null,
                                prop_title: title ?? "",
                                prop_size: size ?? SIZES.M,
                                prop_value: this.var_inputValue,
                            },
                            <ComponentValidateMethodsType>{
                                fn_onChangeValidate: (event, dataArgs, componentArgs) => {
                                }
                            }
                        ).getReactiveElement();
                    },
                    [prop_isDisable, prop_hasRules, prop_isAbsoluteRule, prop_listRules, prop_msgRules, prop_title, prop_size],
                    this.getScope()
                ),
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
        FUNCTIONs
    --------------------------------------------- */
    private fn_setupValueObservable() {
        const propValueObs = this.getObservable(ComponentInputPhoneConfigs.keys.prop_value.name);
        if (propValueObs != null) {
            this.var_inputValue = propValueObs;
        }
    }

    fn_getValueInput(): string {
        const inputEl = document.querySelector(`input#component-input-phone-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
        if (inputEl) {
            return inputEl.value;
        }
        return this.var_inputValue.get();
    }

    fn_getSelectedCode(): any {
        return this.var_selectedCode;
    }

    fn_executeCallback(event: Event) {
        const code = this.var_selectedCode;
        const number = this.fn_getValueInput();
        const text = (code != null && code.hasOwnProperty("code") ? `${code["code"]}-` : "") + (number != null ? number : "");

        const params: ComponentInputPhone_Methods_CALLBACK_DataArgs = {
            [ComponentInputPhoneConfigs.methods.CALLBACK.dataArgs.CODE.name]: code,
            [ComponentInputPhoneConfigs.methods.CALLBACK.dataArgs.NUMBER.name]: number,
            [ComponentInputPhoneConfigs.methods.CALLBACK.dataArgs.TEXT.name]: text,
        };
        this.executeMethod(ComponentInputPhoneConfigs.methods.CALLBACK.name, event, params);
    }

    fn_onClearInput(event: Event) {
        const inputEl = document.querySelector(`input#component-input-phone-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
        if (inputEl) {
            inputEl.value = "";
        }
        this.var_inputValue.set("");
        const params: ComponentInputPhone_Methods_INPUT_CHANGE_DataArgs = {
            [ComponentInputPhoneConfigs.methods.INPUT_CHANGE.dataArgs.VALUE.name]: "",
        };
        this.executeMethod(ComponentInputPhoneConfigs.methods.INPUT_CHANGE.name, event, params);
        this.fn_onFocusInput(event);
    }

    fn_onFocusInput(event: Event) {
        const inputEl = document.querySelector(`input#component-input-phone-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
        if (inputEl) {
            inputEl.focus();
        }
        const val = this.fn_getValueInput();
        const params: ComponentInputPhone_Methods_FOCUS_DataArgs = {
            [ComponentInputPhoneConfigs.methods.FOCUS.dataArgs.VALUE.name]: val,
        };
        this.executeMethod(ComponentInputPhoneConfigs.methods.FOCUS.name, event, params);
    }

}

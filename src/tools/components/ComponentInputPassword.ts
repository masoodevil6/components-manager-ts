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



export const ComponentInputPasswordProps = {
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
    prop_placeholder:                      "prop_placeholder",
    prop_icon:                             "prop_icon",
    prop_hasRules:                         "prop_hasRules",
    prop_isAbsoluteRule:                   "prop_isAbsoluteRule",
    prop_listRules:                        "prop_listRules",
    prop_msgRules:                         "prop_msgRules",
} as const;



const ComponentInputPasswordConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys,
        ///----------------------
        [ComponentInputPasswordProps.prop_title]: {
            name:               ComponentInputPasswordProps.prop_title,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentInputPasswordProps.prop_backgroundColorForm]: {
            name:               ComponentInputPasswordProps.prop_backgroundColorForm,
            value:              GOG_SetValue<string>("var(--secondaryColor1)"),
        },
        [ComponentInputPasswordProps.prop_formBorderRadius]: {
            name:               ComponentInputPasswordProps.prop_formBorderRadius,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES>>(SIZES.M),
        },
        [ComponentInputPasswordProps.prop_colorIcon]: {
            name:               ComponentInputPasswordProps.prop_colorIcon,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentInputPasswordProps.prop_size]: {
            name:               ComponentInputPasswordProps.prop_size,
            value:              GOG_SetValue<string>(SIZES.M),
        },
        [ComponentInputPasswordProps.prop_inputClass]: {
            name:               ComponentInputPasswordProps.prop_inputClass,
            value:              GOG_SetValue<string[]>(["form-control"]),
        },
        [ComponentInputPasswordProps.prop_inputStyles]: {
            name:               ComponentInputPasswordProps.prop_inputStyles,
            value:              GOG_SetValue<Record<string, string>>({}),
        },
        [ComponentInputPasswordProps.prop_inputBorderColor]: {
            name:               ComponentInputPasswordProps.prop_inputBorderColor,
            value:              GOG_SetValue<string>("var(--primaryColor1)"),
        },
        [ComponentInputPasswordProps.prop_inputBorderColorFocus]: {
            name:               ComponentInputPasswordProps.prop_inputBorderColorFocus,
            value:              GOG_SetValue<string>("var(--secondaryColor1)"),
        },
        [ComponentInputPasswordProps.prop_inputBorderWidth]: {
            name:               ComponentInputPasswordProps.prop_inputBorderWidth,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES>>(SIZES.M),
        },
        [ComponentInputPasswordProps.prop_inputBorderRadius]: {
            name:               ComponentInputPasswordProps.prop_inputBorderRadius,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES>>(SIZES.M),
        },
        [ComponentInputPasswordProps.prop_placeholder]: {
            name:               ComponentInputPasswordProps.prop_placeholder,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentInputPasswordProps.prop_icon]: {
            name:               ComponentInputPasswordProps.prop_icon,
            value:              GOG_SetValue<IconsType | null>(null),
        },
        [ComponentInputPasswordProps.prop_hasRules]: {
            name:               ComponentInputPasswordProps.prop_hasRules,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentInputPasswordProps.prop_isAbsoluteRule]: {
            name:               ComponentInputPasswordProps.prop_isAbsoluteRule,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentInputPasswordProps.prop_listRules]: {
            name:               ComponentInputPasswordProps.prop_listRules,
            value:              GOG_SetValue<any[]>([]),
        },
        [ComponentInputPasswordProps.prop_msgRules]: {
            name:               ComponentInputPasswordProps.prop_msgRules,
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
        ICON_POSITION: {
            name:               "part_icon_position"
        },
        ICON: {
            name:               "part_icon"
        },
        ICON_CLEAR_POSITION: {
            name:               "part_icon_clear_position"
        },
        ICON_CLEAR: {
            name:               "part_icon_clear"
        },
        ICON_VISIT_POSITION: {
            name:               "part_icon_visit_position"
        },
        ICON_VISIT: {
            name:               "part_icon_visit"
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
        VISIT: {
            name:                      "fn_onVisit",
            dataArgs: {},
            componentArgs: {}
        },
    }
} as const;



export type ComponentInputPasswordPropsType =                      GOG_ExtractNameValue<typeof ComponentInputPasswordConfigs.keys>
export type ComponentInputPasswordSchemaType =                     GOG_ExtractName<typeof ComponentInputPasswordConfigs.schemas>
export type ComponentInputPasswordTemplatesType =                  GOG_ExtractName<typeof ComponentInputPasswordConfigs.templates>

export type ComponentInputPassword_Methods_INPUT_ComponentArgs =   GOG_ExtractName<typeof ComponentInputPasswordConfigs.methods.INPUT.componentArgs>
export type ComponentInputPassword_Methods_INPUT_DataArgs =        GOG_ExtractNameValue<typeof ComponentInputPasswordConfigs.methods.INPUT.dataArgs>
export type ComponentInputPassword_Methods_FOCUS_ComponentArgs =   GOG_ExtractName<typeof ComponentInputPasswordConfigs.methods.FOCUS.componentArgs>
export type ComponentInputPassword_Methods_FOCUS_DataArgs =        GOG_ExtractNameValue<typeof ComponentInputPasswordConfigs.methods.FOCUS.dataArgs>
export type ComponentInputPassword_Methods_BLUR_ComponentArgs =    GOG_ExtractName<typeof ComponentInputPasswordConfigs.methods.BLUR.componentArgs>
export type ComponentInputPassword_Methods_BLUR_DataArgs =         GOG_ExtractNameValue<typeof ComponentInputPasswordConfigs.methods.BLUR.dataArgs>
export type ComponentInputPassword_Methods_VISIT_ComponentArgs =   GOG_ExtractName<typeof ComponentInputPasswordConfigs.methods.VISIT.componentArgs>
export type ComponentInputPassword_Methods_VISIT_DataArgs =        GOG_ExtractNameValue<typeof ComponentInputPasswordConfigs.methods.VISIT.dataArgs>

export type ComponentInputPasswordMethodsType = {
    [ComponentInputPasswordConfigs.methods.INPUT.name]: ComponentCallBackType<ComponentInputPassword_Methods_INPUT_ComponentArgs, ComponentInputPassword_Methods_INPUT_DataArgs>,
    [ComponentInputPasswordConfigs.methods.FOCUS.name]: ComponentCallBackType<ComponentInputPassword_Methods_FOCUS_ComponentArgs, ComponentInputPassword_Methods_FOCUS_DataArgs>,
    [ComponentInputPasswordConfigs.methods.BLUR.name]: ComponentCallBackType<ComponentInputPassword_Methods_BLUR_ComponentArgs, ComponentInputPassword_Methods_BLUR_DataArgs>,
    [ComponentInputPasswordConfigs.methods.VISIT.name]: ComponentCallBackType<ComponentInputPassword_Methods_VISIT_ComponentArgs, ComponentInputPassword_Methods_VISIT_DataArgs>,
}



export abstract class ComponentInputPasswordBase extends ComponentBase<
    ComponentInputPasswordPropsType,
    ComponentInputPasswordSchemaType,
    ComponentInputPasswordTemplatesType,
    ComponentInputPasswordMethodsType
> {

    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN = defineComponentPatterns<ComponentInputPasswordPropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Pattern(this),
            ///----------------------
            [ComponentInputPasswordConfigs.keys.prop_value.name]: {
                prop:                                             ComponentInputPasswordConfigs.keys.prop_value.name,
                default:                                          ComponentInputPasswordConfigs.keys.prop_value.value,
                title:                                            Language.translate("components.public.props.prop_value.title"),
                description:                                      Language.translate("components.public.props.prop_value.description"),
            },
            [ComponentInputPasswordConfigs.keys.prop_title.name]: {
                prop:                                             ComponentInputPasswordConfigs.keys.prop_title.name,
                default:                                          ComponentInputPasswordConfigs.keys.prop_title.value,
                title:                                            Language.translate("components.input.props.prop_title.title"),
                description:                                      Language.translate("components.input.props.prop_title.description"),
            },
            [ComponentInputPasswordConfigs.keys.prop_backgroundColorForm.name]: {
                prop:                                             ComponentInputPasswordConfigs.keys.prop_backgroundColorForm.name,
                default:                                          ComponentInputPasswordConfigs.keys.prop_backgroundColorForm.value,
                title:                                            Language.translate("components.input.props.prop_backgroundColorForm.title"),
                description:                                      Language.translate("components.input.props.prop_backgroundColorForm.description"),
            },
            [ComponentInputPasswordConfigs.keys.prop_formBorderRadius.name]: {
                prop:                                             ComponentInputPasswordConfigs.keys.prop_formBorderRadius.name,
                default:                                          ComponentInputPasswordConfigs.keys.prop_formBorderRadius.value,
                title:                                            Language.translate("components.input.props.prop_formBorderRadius.title"),
                description:                                      Language.translate("components.input.props.prop_formBorderRadius.description"),
            },
            [ComponentInputPasswordConfigs.keys.prop_colorIcon.name]: {
                prop:                                             ComponentInputPasswordConfigs.keys.prop_colorIcon.name,
                default:                                          ComponentInputPasswordConfigs.keys.prop_colorIcon.value,
                title:                                            Language.translate("components.input.props.prop_colorIcon.title"),
                description:                                      Language.translate("components.input.props.prop_colorIcon.description"),
            },
            [ComponentInputPasswordConfigs.keys.prop_size.name]: {
                prop:                                             ComponentInputPasswordConfigs.keys.prop_size.name,
                default:                                          ComponentInputPasswordConfigs.keys.prop_size.value,
                title:                                            Language.translate("components.input.props.prop_size.title"),
                description:                                      Language.translate("components.input.props.prop_size.description"),
            },
            [ComponentInputPasswordConfigs.keys.prop_inputClass.name]: {
                prop:                                             ComponentInputPasswordConfigs.keys.prop_inputClass.name,
                default:                                          ComponentInputPasswordConfigs.keys.prop_inputClass.value,
                title:                                            Language.translate("components.input.props.prop_inputClass.title"),
                description:                                      Language.translate("components.input.props.prop_inputClass.description"),
            },
            [ComponentInputPasswordConfigs.keys.prop_inputStyles.name]: {
                prop:                                             ComponentInputPasswordConfigs.keys.prop_inputStyles.name,
                default:                                          ComponentInputPasswordConfigs.keys.prop_inputStyles.value,
                title:                                            Language.translate("components.input.props.prop_inputStyles.title"),
                description:                                      Language.translate("components.input.props.prop_inputStyles.description"),
            },
            [ComponentInputPasswordConfigs.keys.prop_inputBorderColor.name]: {
                prop:                                             ComponentInputPasswordConfigs.keys.prop_inputBorderColor.name,
                default:                                          ComponentInputPasswordConfigs.keys.prop_inputBorderColor.value,
                title:                                            Language.translate("components.input.props.prop_inputBorderColor.title"),
                description:                                      Language.translate("components.input.props.prop_inputBorderColor.description"),
            },
            [ComponentInputPasswordConfigs.keys.prop_inputBorderColorFocus.name]: {
                prop:                                             ComponentInputPasswordConfigs.keys.prop_inputBorderColorFocus.name,
                default:                                          ComponentInputPasswordConfigs.keys.prop_inputBorderColorFocus.value,
                title:                                            Language.translate("components.input.props.prop_inputBorderColorFocus.title"),
                description:                                      Language.translate("components.input.props.prop_inputBorderColorFocus.description"),
            },
            [ComponentInputPasswordConfigs.keys.prop_inputBorderWidth.name]: {
                prop:                                             ComponentInputPasswordConfigs.keys.prop_inputBorderWidth.name,
                default:                                          ComponentInputPasswordConfigs.keys.prop_inputBorderWidth.value,
                title:                                            Language.translate("components.input.props.prop_inputBorderWidth.title"),
                description:                                      Language.translate("components.input.props.prop_inputBorderWidth.description"),
            },
            [ComponentInputPasswordConfigs.keys.prop_inputBorderRadius.name]: {
                prop:                                             ComponentInputPasswordConfigs.keys.prop_inputBorderRadius.name,
                default:                                          ComponentInputPasswordConfigs.keys.prop_inputBorderRadius.value,
                title:                                            Language.translate("components.input.props.prop_inputBorderRadius.title"),
                description:                                      Language.translate("components.input.props.prop_inputBorderRadius.description"),
            },
            [ComponentInputPasswordConfigs.keys.prop_placeholder.name]: {
                prop:                                             ComponentInputPasswordConfigs.keys.prop_placeholder.name,
                default:                                          ComponentInputPasswordConfigs.keys.prop_placeholder.value,
                title:                                            Language.translate("components.input.props.prop_placeholder.title"),
                description:                                      Language.translate("components.input.props.prop_placeholder.description"),
            },
            [ComponentInputPasswordConfigs.keys.prop_icon.name]: {
                prop:                                             ComponentInputPasswordConfigs.keys.prop_icon.name,
                default:                                          ComponentInputPasswordConfigs.keys.prop_icon.value,
                title:                                            Language.translate("components.input.props.prop_icon.title"),
                description:                                      Language.translate("components.input.props.prop_icon.description"),
            },
            [ComponentInputPasswordConfigs.keys.prop_hasRules.name]: {
                prop:                                             ComponentInputPasswordConfigs.keys.prop_hasRules.name,
                default:                                          ComponentInputPasswordConfigs.keys.prop_hasRules.value,
                title:                                            Language.translate("components.input.props.prop_hasRules.title"),
                description:                                      Language.translate("components.input.props.prop_hasRules.description"),
            },
            [ComponentInputPasswordConfigs.keys.prop_isAbsoluteRule.name]: {
                prop:                                             ComponentInputPasswordConfigs.keys.prop_isAbsoluteRule.name,
                default:                                          ComponentInputPasswordConfigs.keys.prop_isAbsoluteRule.value,
                title:                                            Language.translate("components.input.props.prop_isAbsoluteRule.title"),
                description:                                      Language.translate("components.input.props.prop_isAbsoluteRule.description"),
            },
            [ComponentInputPasswordConfigs.keys.prop_listRules.name]: {
                prop:                                             ComponentInputPasswordConfigs.keys.prop_listRules.name,
                default:                                          ComponentInputPasswordConfigs.keys.prop_listRules.value,
                title:                                            Language.translate("components.input.props.prop_listRules.title"),
                description:                                      Language.translate("components.input.props.prop_listRules.description"),
            },
            [ComponentInputPasswordConfigs.keys.prop_msgRules.name]: {
                prop:                                             ComponentInputPasswordConfigs.keys.prop_msgRules.name,
                default:                                          ComponentInputPasswordConfigs.keys.prop_msgRules.value,
                title:                                            Language.translate("components.input.props.prop_msgRules.title"),
                description:                                      Language.translate("components.input.props.prop_msgRules.description"),
            },
        }
    );


    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentInputPasswordSchemaType, ComponentInputPasswordPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Schema(this),
        ///----------------------
        FORM: {
            part:               ComponentInputPasswordConfigs.schemas.FORM.name,
            title:              Language.translate("components.input.schema.form.title"),
            description:        Language.translate("components.input.schema.form.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_backgroundColorForm.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_formBorderRadius.name],
            ]
        },
        INPUT: {
            part:               ComponentInputPasswordConfigs.schemas.INPUT.name,
            title:              Language.translate("components.input.schema.input.title"),
            description:        Language.translate("components.input.schema.input.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_inputClass.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_inputStyles.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_inputBorderColor.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_inputBorderColorFocus.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_inputBorderWidth.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_inputBorderRadius.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_name.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_placeholder.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_icon.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_size.name],
            ]
        },
        ICON_POSITION: {
            part:               ComponentInputPasswordConfigs.schemas.ICON_POSITION.name,
            title:              Language.translate("components.input.schema.icon_position.title"),
            description:        Language.translate("components.input.schema.icon_position.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_icon.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_colorIcon.name],
            ]
        },
        ICON: {
            part:               ComponentInputPasswordConfigs.schemas.ICON.name,
            title:              Language.translate("components.input.schema.icon.title"),
            description:        Language.translate("components.input.schema.icon.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_icon.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_colorIcon.name],
            ]
        },
        ICON_CLEAR_POSITION: {
            part:               ComponentInputPasswordConfigs.schemas.ICON_CLEAR_POSITION.name,
            title:              Language.translate("components.input.schema.icon_clear_position.title"),
            description:        Language.translate("components.input.schema.icon_clear_position.description"),
            props: [
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_size.name],
            ]
        },
        ICON_CLEAR: {
            part:               ComponentInputPasswordConfigs.schemas.ICON_CLEAR.name,
            title:              Language.translate("components.input.schema.icon_clear.title"),
            description:        Language.translate("components.input.schema.icon_clear.description"),
            props: [
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_size.name],
            ]
        },
        ICON_VISIT_POSITION: {
            part:               ComponentInputPasswordConfigs.schemas.ICON_VISIT_POSITION.name,
            title:              Language.translate("components.input.schema.icon_visit_position.title"),
            description:        Language.translate("components.input.schema.icon_visit_position.description"),
            props: [
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_colorIcon.name],
            ]
        },
        ICON_VISIT: {
            part:               ComponentInputPasswordConfigs.schemas.ICON_VISIT.name,
            title:              Language.translate("components.input.schema.icon_visit.title"),
            description:        Language.translate("components.input.schema.icon_visit.description"),
            props: [
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_colorIcon.name],
            ]
        },
        VALIDATE: {
            part:               ComponentInputPasswordConfigs.schemas.VALIDATE.name,
            title:              Language.translate("components.input.schema.validate.title"),
            description:        Language.translate("components.input.schema.validate.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_hasRules.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_isAbsoluteRule.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_listRules.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_msgRules.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_title.name],
                this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_size.name],
            ]
        },
    });


    /* ---------------------------------------------
        PROPERTYs Templates
    --------------------------------------------- */
    _COMPONENT_TEMPLATES = defineComponentTemplate<ComponentInputPasswordTemplatesType, ComponentInputPasswordPropsType>({
        FORM: {
            title:                                            Language.translate("components.input.template.body.title"),
            description:                                      Language.translate("components.input.template.body.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentInputPasswordConfigs.keys.prop_placeholder.name]
        },
    });


    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentInputPasswordMethodsType, ComponentInputPasswordPropsType>({
        [ComponentInputPasswordConfigs.methods.INPUT.name]: {
            title:                                            Language.translate("components.input.methods.fn_onInput.title"),
            description:                                      Language.translate("components.input.methods.fn_onInput.description"),
            args: {
                [ComponentInputPasswordConfigs.methods.INPUT.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
            }
        },
        [ComponentInputPasswordConfigs.methods.FOCUS.name]: {
            title:                                            Language.translate("components.input.methods.fn_onFocus.title"),
            description:                                      Language.translate("components.input.methods.fn_onFocus.description"),
            args: {
                [ComponentInputPasswordConfigs.methods.FOCUS.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
            }
        },
        [ComponentInputPasswordConfigs.methods.BLUR.name]: {
            title:                                            Language.translate("components.input.methods.fn_onBlur.title"),
            description:                                      Language.translate("components.input.methods.fn_onBlur.description"),
            args: {
                [ComponentInputPasswordConfigs.methods.BLUR.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
            }
        },
        [ComponentInputPasswordConfigs.methods.VISIT.name]: {
            title:                                            Language.translate("components.input.methods.fn_onVisit.title"),
            description:                                      Language.translate("components.input.methods.fn_onVisit.description"),
            args: {}
        },
    });


    /* ---------------------------------------------
        Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        const valueObs = new Observable<string>("");

        const inputPasswordComp = new ComponentInputPassword(
            {
                classList: ["col-md-3", "col-12", "border", "p-2"],
                prop_title: "Password Example",
                prop_labelTitle: "Password Example",
                prop_labelTooltipDescription: "Enter your password",
                prop_placeholder: "Enter password...",
                prop_value: valueObs,
                prop_size: SIZES.M,
                prop_icon: ToolsIcons.icon_password({ size: SIZES.S }),
                prop_listRules: [
                    {
                        rule: "_not_empty",
                        description: "This field is required"
                    },
                    {
                        rule: "_char_length",
                        description: "Minimum 6 characters",
                        params: { min: 6 }
                    },
                    {
                        rule: "_char_length",
                        description: "Maximum 20 characters",
                        params: { max: 20 }
                    },
                    {
                        rule: "_has_uppercase",
                        description: "At least one uppercase letter"
                    },
                    {
                        rule: "_has_lowercase",
                        description: "At least one lowercase letter"
                    },
                    {
                        rule: "_has_number",
                        description: "At least one number"
                    },
                ],
                prop_msgRules: {
                    "_not_empty": "Password is required",
                    "_char_length": "Password must be between 6 and 20 characters",
                    "_has_uppercase": "Password must contain an uppercase letter",
                    "_has_lowercase": "Password must contain a lowercase letter",
                    "_has_number": "Password must contain a number",
                },
                prop_isAbsoluteRule: true,
                prop_hasRules: true,
            } as any as ComponentInputPasswordPropsType,
            <ComponentInputPasswordMethodsType>{
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
                fn_onVisit: (event, dataArgs, componentArgs) => {
                    console.log("visit toggled");
                },
            }
        );

        return inputPasswordComp.getElement() as HTMLElement;
    }
}


export class ComponentInputPassword extends ComponentInputPasswordBase {

    private var_inputValue = new Observable<string>("");
    private var_isShowPassword = new Observable<boolean>(false);

    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentInputPasswordPropsType,
        methods: ComponentInputPasswordMethodsType,
        events = null
    ) {
        super("input-password", null);
        super.renderComponent(config, methods, events);
        this.fn_setupValueObservable();
    }


    /* ---------------------------------------------
        TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentInputPasswordConfigs.schemas.FORM.name)
    }

    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentInputPasswordConfigs.schemas.FORM.name:
                return this.template_render_form(attrsDefault, data, extra);
            case ComponentInputPasswordConfigs.schemas.INPUT.name:
                return this.template_render_input(attrsDefault, data, extra);
            case ComponentInputPasswordConfigs.schemas.ICON_POSITION.name:
                return this.template_render_icon_position(attrsDefault, data, extra);
            case ComponentInputPasswordConfigs.schemas.ICON.name:
                return this.template_render_icon(attrsDefault, data, extra);
            case ComponentInputPasswordConfigs.schemas.ICON_CLEAR_POSITION.name:
                return this.template_render_icon_clear_position(attrsDefault, data, extra);
            case ComponentInputPasswordConfigs.schemas.ICON_CLEAR.name:
                return this.template_render_icon_clear(attrsDefault, data, extra);
            case ComponentInputPasswordConfigs.schemas.ICON_VISIT_POSITION.name:
                return this.template_render_icon_visit_position(attrsDefault, data, extra);
            case ComponentInputPasswordConfigs.schemas.ICON_VISIT.name:
                return this.template_render_icon_visit(attrsDefault, data, extra);
            case ComponentInputPasswordConfigs.schemas.VALIDATE.name:
                return this.template_render_validate(attrsDefault, data, extra);
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    /* ---------------------------------------------
        template_render_form — یک ReactiveElement.section
    --------------------------------------------- */
    private template_render_form(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_backgroundColorForm = data[ComponentInputPasswordConfigs.keys.prop_backgroundColorForm.name];
            const prop_formBorderRadius = data[ComponentInputPasswordConfigs.keys.prop_formBorderRadius.name];

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-input-password-form-${this._COMPONENT_RANDOM_ID}`,
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
                        className: ["position-relative", "p-0"],
                        children: [
                            this.executeSchemaPart(ComponentInputPasswordConfigs.schemas.INPUT.name),
                            this.executeSchemaPart(ComponentInputPasswordConfigs.schemas.ICON_POSITION.name),
                            this.executeSchemaPart(ComponentInputPasswordConfigs.schemas.ICON_CLEAR_POSITION.name),
                            this.executeSchemaPart(ComponentInputPasswordConfigs.schemas.ICON_VISIT_POSITION.name),
                        ]
                    }),
                    this.executeSchemaPart(ComponentInputPasswordConfigs.schemas.VALIDATE.name),
                ]
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
        template_render_input — یک ReactiveElement.input
    --------------------------------------------- */
    private template_render_input(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_inputClass = data[ComponentInputPasswordConfigs.keys.prop_inputClass.name];
            const prop_inputStyles = data[ComponentInputPasswordConfigs.keys.prop_inputStyles.name];
            const prop_inputBorderColor = data[ComponentInputPasswordConfigs.keys.prop_inputBorderColor.name];
            const prop_inputBorderColorFocus = data[ComponentInputPasswordConfigs.keys.prop_inputBorderColorFocus.name];
            const prop_inputBorderWidth = data[ComponentInputPasswordConfigs.keys.prop_inputBorderWidth.name];
            const prop_inputBorderRadius = data[ComponentInputPasswordConfigs.keys.prop_inputBorderRadius.name];
            const prop_name = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_name.name];
            const prop_value = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name];
            const prop_placeholder = data[ComponentInputPasswordConfigs.keys.prop_placeholder.name];
            const prop_icon = data[ComponentInputPasswordConfigs.keys.prop_icon.name];
            const prop_isDisable = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_size = data[ComponentInputPasswordConfigs.keys.prop_size.name];

            const directionRtl = AppConfig.get("directionRtl");

            const inputValue = prop_value instanceof Observable
                ? prop_value
                : this.var_inputValue;

            if (prop_value instanceof Observable) {
                this.var_inputValue = prop_value;
            }

            const inputId = `component-input-password-input-${this._COMPONENT_RANDOM_ID}`;

            return ReactiveElement.input({
                attrs: {
                    ...attrsDefault,
                    "id": inputId,
                },
                attrsBind: {
                    type: this.var_isShowPassword.map((show: boolean) => show ? "text" : "password"),
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
                    [directionRtl ? "paddingRight" : "paddingLeft"]: "35px",
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
                    width: "calc(100% - 70px)",
                    [directionRtl ? "marginLeft" : "marginRight"]: "35px",
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
                        const params: ComponentInputPassword_Methods_INPUT_DataArgs = {
                            [ComponentInputPasswordConfigs.methods.INPUT.dataArgs.VALUE.name]: val,
                        };
                        this.executeMethod(ComponentInputPasswordConfigs.methods.INPUT.name, event, params);
                    },
                    focus: (event: Event) => {
                        const val = (event.target as HTMLInputElement).value;
                        const params: ComponentInputPassword_Methods_FOCUS_DataArgs = {
                            [ComponentInputPasswordConfigs.methods.FOCUS.dataArgs.VALUE.name]: val,
                        };
                        this.executeMethod(ComponentInputPasswordConfigs.methods.FOCUS.name, event, params);
                    },
                    blur: (event: Event) => {
                        const val = (event.target as HTMLInputElement).value;
                        const params: ComponentInputPassword_Methods_BLUR_DataArgs = {
                            [ComponentInputPasswordConfigs.methods.BLUR.dataArgs.VALUE.name]: val,
                        };
                        this.executeMethod(ComponentInputPasswordConfigs.methods.BLUR.name, event, params);
                    },
                }
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
        template_render_icon_position — یک ComponentElementPosition
    --------------------------------------------- */
    private template_render_icon_position(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_icon = data[ComponentInputPasswordConfigs.keys.prop_icon.name];
            const prop_size = data[ComponentInputPasswordConfigs.keys.prop_size.name];
            const prop_colorIcon = data[ComponentInputPasswordConfigs.keys.prop_colorIcon.name];

            const directionRtl = AppConfig.get("directionRtl");

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (iconValue: any, size: any, colorIcon: any) => {
                        if (!iconValue) return null;

                        const sizeName = size ?? SIZES.M;
                        const elIconHeight = ToolsCss.getIconSize(sizeName);

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
                            prop_content: this.executeSchemaPart(ComponentInputPasswordConfigs.schemas.ICON.name),
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


    /* ---------------------------------------------
        template_render_icon — یک ComponentIcon
    --------------------------------------------- */
    private template_render_icon(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_icon = data[ComponentInputPasswordConfigs.keys.prop_icon.name];
            const prop_colorIcon = data[ComponentInputPasswordConfigs.keys.prop_colorIcon.name];

            const iconProps: any = {
                classList: [],
                styles: {},
                prop_iconClass: [],
                prop_iconStyles: {
                    margin: "auto",
                    cursor: "pointer",
                    color: prop_colorIcon ?? "",
                },
                prop_icon: prop_icon,
            };

            return new ToolsComponents.ComponentIcon(
                iconProps as ComponentIconPropsType,
                <ComponentIconMethodsType>{
                    fn_onClickIcon: (event, dataArgs, componentArgs) => {
                        this.fn_onFocusInput(event);
                    }
                }
            ).getReactiveElement();
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
        template_render_icon_clear_position — یک ComponentElementPosition
    --------------------------------------------- */
    private template_render_icon_clear_position(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_isDisable = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_size = data[ComponentInputPasswordConfigs.keys.prop_size.name];

            const directionRtl = AppConfig.get("directionRtl");

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (isDisable: boolean, size: any) => {
                        if (isDisable) return null;

                        const sizeName = size ?? SIZES.M;
                        const elIconHeight = ToolsCss.getIconSize(sizeName);

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
                                ? TranslateUnit(SizeUnit(40, UNITS.PEXEL), SizeUnit(-50, UNITS.PERCENT))
                                : TranslateUnit(SizeUnit(-40, UNITS.PEXEL), SizeUnit(-50, UNITS.PERCENT)),
                            prop_positionZIndex: 10,
                            prop_content: this.template_render_icon_clear(attrsDefault, data, extra),
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
        template_render_icon_clear — یک ComponentIcon
    --------------------------------------------- */
    private template_render_icon_clear(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_isDisable = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_size = data[ComponentInputPasswordConfigs.keys.prop_size.name];

            const isDisable = prop_isDisable instanceof Observable ? prop_isDisable.get() : prop_isDisable;
            if (isDisable) {
                return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
            }

            const sizeName = prop_size instanceof Observable ? prop_size.get() : (prop_size ?? SIZES.M);

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

            return new ToolsComponents.ComponentIcon(
                iconClearProps as ComponentIconPropsType,
                <ComponentIconMethodsType>{
                    fn_onClickIcon: (event, dataArgs, componentArgs) => {
                        this.fn_onClearInput(event);
                    }
                }
            ).getReactiveElement();
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
        template_render_icon_visit_position — یک ComponentElementPosition
    --------------------------------------------- */
    private template_render_icon_visit_position(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_isDisable = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_size = data[ComponentInputPasswordConfigs.keys.prop_size.name];

            const directionRtl = AppConfig.get("directionRtl");

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (isDisable: boolean, size: any) => {
                        if (isDisable) return null;

                        const sizeName = size ?? SIZES.M;
                        const elIconHeight = ToolsCss.getIconSize(sizeName);

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
                                ? TranslateUnit(SizeUnit(5, UNITS.PEXEL), SizeUnit(-50, UNITS.PERCENT))
                                : TranslateUnit(SizeUnit(-5, UNITS.PEXEL), SizeUnit(-50, UNITS.PERCENT)),
                            prop_positionZIndex: 10,
                            prop_content: this.template_render_icon_visit(attrsDefault, data, extra),
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
        template_render_icon_visit — یک ComponentIcon
    --------------------------------------------- */
    private template_render_icon_visit(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_isDisable = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_size = data[ComponentInputPasswordConfigs.keys.prop_size.name];
            const prop_colorIcon = data[ComponentInputPasswordConfigs.keys.prop_colorIcon.name];

            const isDisable = prop_isDisable instanceof Observable ? prop_isDisable.get() : prop_isDisable;
            if (isDisable) {
                return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
            }

            const sizeName = prop_size instanceof Observable ? prop_size.get() : (prop_size ?? SIZES.M);

            const iconVisitProps: any = {
                classList: [],
                styles: {},
                prop_iconClass: [],
                prop_iconStyles: {
                    margin: "auto",
                    cursor: "pointer",
                    color: prop_colorIcon ?? "",
                },
                prop_icon: this.var_isShowPassword.map((show: boolean) =>
                    show
                        ? ToolsIcons.icon_visit({ size: sizeName })
                        : ToolsIcons.icon_un_visit({ size: sizeName })
                ),
            };

            return new ToolsComponents.ComponentIcon(
                iconVisitProps as ComponentIconPropsType,
                <ComponentIconMethodsType>{
                    fn_onClickIcon: (event, dataArgs, componentArgs) => {
                        this.fn_onVisitInput(event);
                    }
                }
            ).getReactiveElement();
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
        template_render_validate — یک ComponentValidate
    --------------------------------------------- */
    private template_render_validate(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_isDisable = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_hasRules = data[ComponentInputPasswordConfigs.keys.prop_hasRules.name];
            const prop_isAbsoluteRule = data[ComponentInputPasswordConfigs.keys.prop_isAbsoluteRule.name];
            const prop_listRules = data[ComponentInputPasswordConfigs.keys.prop_listRules.name];
            const prop_msgRules = data[ComponentInputPasswordConfigs.keys.prop_msgRules.name];
            const prop_title = data[ComponentInputPasswordConfigs.keys.prop_title.name];
            const prop_size = data[ComponentInputPasswordConfigs.keys.prop_size.name];

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
                                prop_reference: `component-input-password-input-${this._COMPONENT_RANDOM_ID}`,
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
        const propValueObs = this.getObservable(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name);
        if (propValueObs != null) {
            this.var_inputValue = propValueObs;
        }
    }

    fn_getValueInput(): string {
        const inputEl = document.querySelector(`input#component-input-password-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
        if (inputEl) {
            return inputEl.value;
        }
        return this.var_inputValue.get();
    }

    fn_onClearInput(event: Event) {
        const inputEl = document.querySelector(`input#component-input-password-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
        if (inputEl) {
            inputEl.value = "";
        }
        this.var_inputValue.set("");
        const params: ComponentInputPassword_Methods_INPUT_DataArgs = {
            [ComponentInputPasswordConfigs.methods.INPUT.dataArgs.VALUE.name]: "",
        };
        this.executeMethod(ComponentInputPasswordConfigs.methods.INPUT.name, event, params);
        this.fn_onFocusInput(event);
    }

    fn_onFocusInput(event: Event) {
        const inputEl = document.querySelector(`input#component-input-password-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
        if (inputEl) {
            inputEl.focus();
        }
        const val = this.fn_getValueInput();
        const params: ComponentInputPassword_Methods_FOCUS_DataArgs = {
            [ComponentInputPasswordConfigs.methods.FOCUS.dataArgs.VALUE.name]: val,
        };
        this.executeMethod(ComponentInputPasswordConfigs.methods.FOCUS.name, event, params);
    }

    fn_onVisitInput(event: Event) {
        this.var_isShowPassword.set(!this.var_isShowPassword.get());
        this.executeMethod(ComponentInputPasswordConfigs.methods.VISIT.name, event, {});
    }

}

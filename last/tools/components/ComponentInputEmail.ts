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



export const ComponentInputEmailProps = {
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
    prop_iconEmail:                        "prop_iconEmail",
    prop_hasRules:                         "prop_hasRules",
    prop_isAbsoluteRule:                   "prop_isAbsoluteRule",
    prop_listRules:                        "prop_listRules",
    prop_msgRules:                         "prop_msgRules",
} as const;



const ComponentInputEmailConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys,
        ///----------------------
        [ComponentInputEmailProps.prop_title]: {
            name:               ComponentInputEmailProps.prop_title,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentInputEmailProps.prop_backgroundColorForm]: {
            name:               ComponentInputEmailProps.prop_backgroundColorForm,
            value:              GOG_SetValue<string>("var(--secondaryColor1)"),
        },
        [ComponentInputEmailProps.prop_formBorderRadius]: {
            name:               ComponentInputEmailProps.prop_formBorderRadius,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES>>(SIZES.M),
        },
        [ComponentInputEmailProps.prop_colorIcon]: {
            name:               ComponentInputEmailProps.prop_colorIcon,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentInputEmailProps.prop_size]: {
            name:               ComponentInputEmailProps.prop_size,
            value:              GOG_SetValue<string>(SIZES.M),
        },
        [ComponentInputEmailProps.prop_inputClass]: {
            name:               ComponentInputEmailProps.prop_inputClass,
            value:              GOG_SetValue<string[]>(["form-control"]),
        },
        [ComponentInputEmailProps.prop_inputStyles]: {
            name:               ComponentInputEmailProps.prop_inputStyles,
            value:              GOG_SetValue<Record<string, string>>({}),
        },
        [ComponentInputEmailProps.prop_inputBorderColor]: {
            name:               ComponentInputEmailProps.prop_inputBorderColor,
            value:              GOG_SetValue<string>("var(--primaryColor1)"),
        },
        [ComponentInputEmailProps.prop_inputBorderColorFocus]: {
            name:               ComponentInputEmailProps.prop_inputBorderColorFocus,
            value:              GOG_SetValue<string>("var(--secondaryColor1)"),
        },
        [ComponentInputEmailProps.prop_inputBorderWidth]: {
            name:               ComponentInputEmailProps.prop_inputBorderWidth,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES>>(SIZES.M),
        },
        [ComponentInputEmailProps.prop_inputBorderRadius]: {
            name:               ComponentInputEmailProps.prop_inputBorderRadius,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES>>(SIZES.M),
        },
        [ComponentInputEmailProps.prop_placeholder]: {
            name:               ComponentInputEmailProps.prop_placeholder,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentInputEmailProps.prop_icon]: {
            name:               ComponentInputEmailProps.prop_icon,
            value:              GOG_SetValue<IconsType | null>(null),
        },
        [ComponentInputEmailProps.prop_iconEmail]: {
            name:               ComponentInputEmailProps.prop_iconEmail,
            value:              GOG_SetValue<IconsType | null>(ToolsIcons.icon_email({})),
        },
        [ComponentInputEmailProps.prop_hasRules]: {
            name:               ComponentInputEmailProps.prop_hasRules,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentInputEmailProps.prop_isAbsoluteRule]: {
            name:               ComponentInputEmailProps.prop_isAbsoluteRule,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentInputEmailProps.prop_listRules]: {
            name:               ComponentInputEmailProps.prop_listRules,
            value:              GOG_SetValue<any[]>([]),
        },
        [ComponentInputEmailProps.prop_msgRules]: {
            name:               ComponentInputEmailProps.prop_msgRules,
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
    }
} as const;



export type ComponentInputEmailPropsType =                      GOG_ExtractNameValue<typeof ComponentInputEmailConfigs.keys>
export type ComponentInputEmailSchemaType =                     GOG_ExtractName<typeof ComponentInputEmailConfigs.schemas>
export type ComponentInputEmailTemplatesType =                  GOG_ExtractName<typeof ComponentInputEmailConfigs.templates>

export type ComponentInputEmail_Methods_INPUT_ComponentArgs =   GOG_ExtractName<typeof ComponentInputEmailConfigs.methods.INPUT.componentArgs>
export type ComponentInputEmail_Methods_INPUT_DataArgs =        GOG_ExtractNameValue<typeof ComponentInputEmailConfigs.methods.INPUT.dataArgs>
export type ComponentInputEmail_Methods_FOCUS_ComponentArgs =   GOG_ExtractName<typeof ComponentInputEmailConfigs.methods.FOCUS.componentArgs>
export type ComponentInputEmail_Methods_FOCUS_DataArgs =        GOG_ExtractNameValue<typeof ComponentInputEmailConfigs.methods.FOCUS.dataArgs>
export type ComponentInputEmail_Methods_BLUR_ComponentArgs =    GOG_ExtractName<typeof ComponentInputEmailConfigs.methods.BLUR.componentArgs>
export type ComponentInputEmail_Methods_BLUR_DataArgs =         GOG_ExtractNameValue<typeof ComponentInputEmailConfigs.methods.BLUR.dataArgs>

export type ComponentInputEmailMethodsType = {
    [ComponentInputEmailConfigs.methods.INPUT.name]: ComponentCallBackType<ComponentInputEmail_Methods_INPUT_ComponentArgs, ComponentInputEmail_Methods_INPUT_DataArgs>,
    [ComponentInputEmailConfigs.methods.FOCUS.name]: ComponentCallBackType<ComponentInputEmail_Methods_FOCUS_ComponentArgs, ComponentInputEmail_Methods_FOCUS_DataArgs>,
    [ComponentInputEmailConfigs.methods.BLUR.name]: ComponentCallBackType<ComponentInputEmail_Methods_BLUR_ComponentArgs, ComponentInputEmail_Methods_BLUR_DataArgs>,
}



export abstract class ComponentInputEmailBase extends ComponentBase<
    ComponentInputEmailPropsType,
    ComponentInputEmailSchemaType,
    ComponentInputEmailTemplatesType,
    ComponentInputEmailMethodsType
> {

    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN = defineComponentPatterns<ComponentInputEmailPropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Pattern(this),
            ///----------------------
            [ComponentInputEmailConfigs.keys.prop_value.name]: {
                prop:                                             ComponentInputEmailConfigs.keys.prop_value.name,
                default:                                          ComponentInputEmailConfigs.keys.prop_value.value,
                title:                                            Language.translate("components.public.props.prop_value.title"),
                description:                                      Language.translate("components.public.props.prop_value.description"),
            },
            [ComponentInputEmailConfigs.keys.prop_title.name]: {
                prop:                                             ComponentInputEmailConfigs.keys.prop_title.name,
                default:                                          ComponentInputEmailConfigs.keys.prop_title.value,
                title:                                            Language.translate("components.input.props.prop_title.title"),
                description:                                      Language.translate("components.input.props.prop_title.description"),
            },
            [ComponentInputEmailConfigs.keys.prop_backgroundColorForm.name]: {
                prop:                                             ComponentInputEmailConfigs.keys.prop_backgroundColorForm.name,
                default:                                          ComponentInputEmailConfigs.keys.prop_backgroundColorForm.value,
                title:                                            Language.translate("components.input.props.prop_backgroundColorForm.title"),
                description:                                      Language.translate("components.input.props.prop_backgroundColorForm.description"),
            },
            [ComponentInputEmailConfigs.keys.prop_formBorderRadius.name]: {
                prop:                                             ComponentInputEmailConfigs.keys.prop_formBorderRadius.name,
                default:                                          ComponentInputEmailConfigs.keys.prop_formBorderRadius.value,
                title:                                            Language.translate("components.input.props.prop_formBorderRadius.title"),
                description:                                      Language.translate("components.input.props.prop_formBorderRadius.description"),
            },
            [ComponentInputEmailConfigs.keys.prop_colorIcon.name]: {
                prop:                                             ComponentInputEmailConfigs.keys.prop_colorIcon.name,
                default:                                          ComponentInputEmailConfigs.keys.prop_colorIcon.value,
                title:                                            Language.translate("components.input.props.prop_colorIcon.title"),
                description:                                      Language.translate("components.input.props.prop_colorIcon.description"),
            },
            [ComponentInputEmailConfigs.keys.prop_size.name]: {
                prop:                                             ComponentInputEmailConfigs.keys.prop_size.name,
                default:                                          ComponentInputEmailConfigs.keys.prop_size.value,
                title:                                            Language.translate("components.input.props.prop_size.title"),
                description:                                      Language.translate("components.input.props.prop_size.description"),
            },
            [ComponentInputEmailConfigs.keys.prop_inputClass.name]: {
                prop:                                             ComponentInputEmailConfigs.keys.prop_inputClass.name,
                default:                                          ComponentInputEmailConfigs.keys.prop_inputClass.value,
                title:                                            Language.translate("components.input.props.prop_inputClass.title"),
                description:                                      Language.translate("components.input.props.prop_inputClass.description"),
            },
            [ComponentInputEmailConfigs.keys.prop_inputStyles.name]: {
                prop:                                             ComponentInputEmailConfigs.keys.prop_inputStyles.name,
                default:                                          ComponentInputEmailConfigs.keys.prop_inputStyles.value,
                title:                                            Language.translate("components.input.props.prop_inputStyles.title"),
                description:                                      Language.translate("components.input.props.prop_inputStyles.description"),
            },
            [ComponentInputEmailConfigs.keys.prop_inputBorderColor.name]: {
                prop:                                             ComponentInputEmailConfigs.keys.prop_inputBorderColor.name,
                default:                                          ComponentInputEmailConfigs.keys.prop_inputBorderColor.value,
                title:                                            Language.translate("components.input.props.prop_inputBorderColor.title"),
                description:                                      Language.translate("components.input.props.prop_inputBorderColor.description"),
            },
            [ComponentInputEmailConfigs.keys.prop_inputBorderColorFocus.name]: {
                prop:                                             ComponentInputEmailConfigs.keys.prop_inputBorderColorFocus.name,
                default:                                          ComponentInputEmailConfigs.keys.prop_inputBorderColorFocus.value,
                title:                                            Language.translate("components.input.props.prop_inputBorderColorFocus.title"),
                description:                                      Language.translate("components.input.props.prop_inputBorderColorFocus.description"),
            },
            [ComponentInputEmailConfigs.keys.prop_inputBorderWidth.name]: {
                prop:                                             ComponentInputEmailConfigs.keys.prop_inputBorderWidth.name,
                default:                                          ComponentInputEmailConfigs.keys.prop_inputBorderWidth.value,
                title:                                            Language.translate("components.input.props.prop_inputBorderWidth.title"),
                description:                                      Language.translate("components.input.props.prop_inputBorderWidth.description"),
            },
            [ComponentInputEmailConfigs.keys.prop_inputBorderRadius.name]: {
                prop:                                             ComponentInputEmailConfigs.keys.prop_inputBorderRadius.name,
                default:                                          ComponentInputEmailConfigs.keys.prop_inputBorderRadius.value,
                title:                                            Language.translate("components.input.props.prop_inputBorderRadius.title"),
                description:                                      Language.translate("components.input.props.prop_inputBorderRadius.description"),
            },
            [ComponentInputEmailConfigs.keys.prop_placeholder.name]: {
                prop:                                             ComponentInputEmailConfigs.keys.prop_placeholder.name,
                default:                                          ComponentInputEmailConfigs.keys.prop_placeholder.value,
                title:                                            Language.translate("components.input.props.prop_placeholder.title"),
                description:                                      Language.translate("components.input.props.prop_placeholder.description"),
            },
            [ComponentInputEmailConfigs.keys.prop_icon.name]: {
                prop:                                             ComponentInputEmailConfigs.keys.prop_icon.name,
                default:                                          ComponentInputEmailConfigs.keys.prop_icon.value,
                title:                                            Language.translate("components.input.props.prop_icon.title"),
                description:                                      Language.translate("components.input.props.prop_icon.description"),
            },
            [ComponentInputEmailConfigs.keys.prop_iconEmail.name]: {
                prop:                                             ComponentInputEmailConfigs.keys.prop_iconEmail.name,
                default:                                          ComponentInputEmailConfigs.keys.prop_iconEmail.value,
                title:                                            Language.translate("components.input.props.prop_icon.title"),
                description:                                      Language.translate("components.input.props.prop_icon.description"),
            },
            [ComponentInputEmailConfigs.keys.prop_hasRules.name]: {
                prop:                                             ComponentInputEmailConfigs.keys.prop_hasRules.name,
                default:                                          ComponentInputEmailConfigs.keys.prop_hasRules.value,
                title:                                            Language.translate("components.input.props.prop_hasRules.title"),
                description:                                      Language.translate("components.input.props.prop_hasRules.description"),
            },
            [ComponentInputEmailConfigs.keys.prop_isAbsoluteRule.name]: {
                prop:                                             ComponentInputEmailConfigs.keys.prop_isAbsoluteRule.name,
                default:                                          ComponentInputEmailConfigs.keys.prop_isAbsoluteRule.value,
                title:                                            Language.translate("components.input.props.prop_isAbsoluteRule.title"),
                description:                                      Language.translate("components.input.props.prop_isAbsoluteRule.description"),
            },
            [ComponentInputEmailConfigs.keys.prop_listRules.name]: {
                prop:                                             ComponentInputEmailConfigs.keys.prop_listRules.name,
                default:                                          ComponentInputEmailConfigs.keys.prop_listRules.value,
                title:                                            Language.translate("components.input.props.prop_listRules.title"),
                description:                                      Language.translate("components.input.props.prop_listRules.description"),
            },
            [ComponentInputEmailConfigs.keys.prop_msgRules.name]: {
                prop:                                             ComponentInputEmailConfigs.keys.prop_msgRules.name,
                default:                                          ComponentInputEmailConfigs.keys.prop_msgRules.value,
                title:                                            Language.translate("components.input.props.prop_msgRules.title"),
                description:                                      Language.translate("components.input.props.prop_msgRules.description"),
            },
        }
    );


    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentInputEmailSchemaType, ComponentInputEmailPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Schema(this),
        ///----------------------
        FORM: {
            part:               ComponentInputEmailConfigs.schemas.FORM.name,
            title:              Language.translate("components.input.schema.form.title"),
            description:        Language.translate("components.input.schema.form.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_backgroundColorForm.name],
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_formBorderRadius.name],
            ]
        },
        INPUT: {
            part:               ComponentInputEmailConfigs.schemas.INPUT.name,
            title:              Language.translate("components.input.schema.input.title"),
            description:        Language.translate("components.input.schema.input.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_inputClass.name],
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_inputStyles.name],
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_inputBorderColor.name],
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_inputBorderColorFocus.name],
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_inputBorderWidth.name],
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_inputBorderRadius.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_name.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_placeholder.name],
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_icon.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_size.name],
            ]
        },
        ICON: {
            part:               ComponentInputEmailConfigs.schemas.ICON.name,
            title:              Language.translate("components.input.schema.icon.title"),
            description:        Language.translate("components.input.schema.icon.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_icon.name],
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_iconEmail.name],
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_colorIcon.name],
            ]
        },
        ICON_CLEAR: {
            part:               ComponentInputEmailConfigs.schemas.ICON_CLEAR.name,
            title:              Language.translate("components.input.schema.icon_clear.title"),
            description:        Language.translate("components.input.schema.icon_clear.description"),
            props: [
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_size.name],
            ]
        },
        VALIDATE: {
            part:               ComponentInputEmailConfigs.schemas.VALIDATE.name,
            title:              Language.translate("components.input.schema.validate.title"),
            description:        Language.translate("components.input.schema.validate.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_hasRules.name],
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_isAbsoluteRule.name],
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_listRules.name],
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_msgRules.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_title.name],
                this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_size.name],
            ]
        },
    });


    /* ---------------------------------------------
        PROPERTYs Templates
    --------------------------------------------- */
    _COMPONENT_TEMPLATES = defineComponentTemplate<ComponentInputEmailTemplatesType, ComponentInputEmailPropsType>({
        FORM: {
            title:                                            Language.translate("components.input.template.body.title"),
            description:                                      Language.translate("components.input.template.body.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentInputEmailConfigs.keys.prop_placeholder.name]
        },
    });


    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentInputEmailMethodsType, ComponentInputEmailPropsType>({
        [ComponentInputEmailConfigs.methods.INPUT.name]: {
            title:                                            Language.translate("components.input.methods.fn_onInput.title"),
            description:                                      Language.translate("components.input.methods.fn_onInput.description"),
            args: {
                [ComponentInputEmailConfigs.methods.INPUT.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
            }
        },
        [ComponentInputEmailConfigs.methods.FOCUS.name]: {
            title:                                            Language.translate("components.input.methods.fn_onFocus.title"),
            description:                                      Language.translate("components.input.methods.fn_onFocus.description"),
            args: {
                [ComponentInputEmailConfigs.methods.FOCUS.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
            }
        },
        [ComponentInputEmailConfigs.methods.BLUR.name]: {
            title:                                            Language.translate("components.input.methods.fn_onBlur.title"),
            description:                                      Language.translate("components.input.methods.fn_onBlur.description"),
            args: {
                [ComponentInputEmailConfigs.methods.BLUR.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
            }
        },
    });


    /* ---------------------------------------------
        Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        const valueObs = new Observable<string>("");

        const inputEmailComp = new ComponentInputEmail(
            {
                classList: ["col-md-3", "col-12", "border", "p-2"],
                prop_title: "Email Example",
                prop_labelTitle: "Email Example",
                prop_labelTooltipDescription: "Enter your email",
                prop_placeholder: "Enter email...",
                prop_value: valueObs,
                prop_size: SIZES.M,
                prop_icon: ToolsIcons.icon_email({ size: SIZES.S }),
                prop_listRules: [
                    {
                        rule: "_not_empty",
                        description: "This field is required"
                    },
                ],
                prop_msgRules: {
                    "_not_empty": "Email is required",
                    "_is_email": "Please enter a valid email address",
                },
                prop_isAbsoluteRule: true,
                prop_hasRules: true,
            } as any as ComponentInputEmailPropsType,
            <ComponentInputEmailMethodsType>{
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
            }
        );

        return inputEmailComp.getElement() as HTMLElement;
    }
}


export class ComponentInputEmail extends ComponentInputEmailBase {

    private var_inputValue = new Observable<string>("");

    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentInputEmailPropsType,
        methods: ComponentInputEmailMethodsType,
        events = null
    ) {
        super("input-email", null);
        super.renderComponent(config, methods, events);
        this.fn_setupValueObservable();
    }


    /* ---------------------------------------------
        TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentInputEmailConfigs.schemas.FORM.name)
    }

    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentInputEmailConfigs.schemas.FORM.name:
                return this.template_render_form(attrsDefault, data, extra);
            case ComponentInputEmailConfigs.schemas.INPUT.name:
                return this.template_render_input(attrsDefault, data, extra);
            case ComponentInputEmailConfigs.schemas.ICON.name:
                return this.template_render_icon(attrsDefault, data, extra);
            case ComponentInputEmailConfigs.schemas.ICON_CLEAR.name:
                return this.template_render_icon_clear(attrsDefault, data, extra);
            case ComponentInputEmailConfigs.schemas.VALIDATE.name:
                return this.template_render_validate(attrsDefault, data, extra);
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    /* ---------------------------------------------
        template_render_form — یک ReactiveElement.section
    --------------------------------------------- */
    private template_render_form(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_backgroundColorForm = data[ComponentInputEmailConfigs.keys.prop_backgroundColorForm.name];
            const prop_formBorderRadius = data[ComponentInputEmailConfigs.keys.prop_formBorderRadius.name];

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-input-email-form-${this._COMPONENT_RANDOM_ID}`,
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
                            this.executeSchemaPart(ComponentInputEmailConfigs.schemas.INPUT.name),
                            this.executeSchemaPart(ComponentInputEmailConfigs.schemas.ICON.name),
                            this.executeSchemaPart(ComponentInputEmailConfigs.schemas.ICON_CLEAR.name),
                        ]
                    }),
                    this.executeSchemaPart(ComponentInputEmailConfigs.schemas.VALIDATE.name),
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
            const prop_inputClass = data[ComponentInputEmailConfigs.keys.prop_inputClass.name];
            const prop_inputStyles = data[ComponentInputEmailConfigs.keys.prop_inputStyles.name];
            const prop_inputBorderColor = data[ComponentInputEmailConfigs.keys.prop_inputBorderColor.name];
            const prop_inputBorderColorFocus = data[ComponentInputEmailConfigs.keys.prop_inputBorderColorFocus.name];
            const prop_inputBorderWidth = data[ComponentInputEmailConfigs.keys.prop_inputBorderWidth.name];
            const prop_inputBorderRadius = data[ComponentInputEmailConfigs.keys.prop_inputBorderRadius.name];
            const prop_name = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_name.name];
            const prop_value = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name];
            const prop_placeholder = data[ComponentInputEmailConfigs.keys.prop_placeholder.name];
            const prop_icon = data[ComponentInputEmailConfigs.keys.prop_icon.name];
            const prop_isDisable = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_size = data[ComponentInputEmailConfigs.keys.prop_size.name];

            const directionRtl = AppConfig.get("directionRtl");

            const inputValue = prop_value instanceof Observable
                ? prop_value
                : this.var_inputValue;

            if (prop_value instanceof Observable) {
                this.var_inputValue = prop_value;
            }

            const inputId = `component-input-email-input-${this._COMPONENT_RANDOM_ID}`;

            return ReactiveElement.input({
                attrs: {
                    ...attrsDefault,
                    "id": inputId,
                    "type": "email",
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
                    width: prop_icon instanceof Observable
                        ? prop_icon.map((v: any) => v ? "calc(100% - 35px)" : "calc(100% - 35px)")
                        : (prop_icon ? "calc(100% - 35px)" : "calc(100% - 35px)"),
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
                        const params: ComponentInputEmail_Methods_INPUT_DataArgs = {
                            [ComponentInputEmailConfigs.methods.INPUT.dataArgs.VALUE.name]: val,
                        };
                        this.executeMethod(ComponentInputEmailConfigs.methods.INPUT.name, event, params);
                    },
                    focus: (event: Event) => {
                        const val = (event.target as HTMLInputElement).value;
                        const params: ComponentInputEmail_Methods_FOCUS_DataArgs = {
                            [ComponentInputEmailConfigs.methods.FOCUS.dataArgs.VALUE.name]: val,
                        };
                        this.executeMethod(ComponentInputEmailConfigs.methods.FOCUS.name, event, params);
                    },
                    blur: (event: Event) => {
                        const val = (event.target as HTMLInputElement).value;
                        const params: ComponentInputEmail_Methods_BLUR_DataArgs = {
                            [ComponentInputEmailConfigs.methods.BLUR.dataArgs.VALUE.name]: val,
                        };
                        this.executeMethod(ComponentInputEmailConfigs.methods.BLUR.name, event, params);
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
            const prop_icon = data[ComponentInputEmailConfigs.keys.prop_icon.name];
            const prop_iconEmail = data[ComponentInputEmailConfigs.keys.prop_iconEmail.name];
            const prop_size = data[ComponentInputEmailConfigs.keys.prop_size.name];
            const prop_colorIcon = data[ComponentInputEmailConfigs.keys.prop_colorIcon.name];

            const directionRtl = AppConfig.get("directionRtl");

            const iconValue = prop_icon ?? prop_iconEmail;

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (iconVal: any, size: any, colorIcon: any) => {
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
                    [iconValue instanceof Observable ? iconValue : new Observable(iconValue), prop_size, prop_colorIcon],
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
            const prop_size = data[ComponentInputEmailConfigs.keys.prop_size.name];

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
                            prop_positionTranslate: TranslateUnit(SizeUnit(0, UNITS.PEXEL), SizeUnit(-50, UNITS.PERCENT)) ,
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
            const prop_hasRules = data[ComponentInputEmailConfigs.keys.prop_hasRules.name];
            const prop_isAbsoluteRule = data[ComponentInputEmailConfigs.keys.prop_isAbsoluteRule.name];
            const prop_listRules = data[ComponentInputEmailConfigs.keys.prop_listRules.name];
            const prop_msgRules = data[ComponentInputEmailConfigs.keys.prop_msgRules.name];
            const prop_title = data[ComponentInputEmailConfigs.keys.prop_title.name];
            const prop_size = data[ComponentInputEmailConfigs.keys.prop_size.name];

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                className: ["position-relative"],
                children: Observable.computed(
                    (isDisable: boolean, hasRules: boolean, isAbsoluteRule: any, listRules: any, msgRules: any, title: any, size: any) => {
                        if (isDisable) return null;
                        if (!hasRules) return null;
                        if (!Array.isArray(listRules) || listRules.length === 0) return null;

                        const emailRules = [...listRules, {
                            description: "Must have email format",
                            rule: "_is_email",
                            params: {}
                        }];

                        return new ToolsComponents.ComponentValidate(
                            <ComponentValidatePropsType>{
                                classList: ["mt-1"],
                                prop_reference: `component-input-email-input-${this._COMPONENT_RANDOM_ID}`,
                                prop_isAbsolute: isAbsoluteRule ?? true,
                                prop_listRules: emailRules,
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
        const inputEl = document.querySelector(`input#component-input-email-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
        if (inputEl) {
            return inputEl.value;
        }
        return this.var_inputValue.get();
    }

    fn_onClearInput(event: Event) {
        const inputEl = document.querySelector(`input#component-input-email-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
        if (inputEl) {
            inputEl.value = "";
        }
        this.var_inputValue.set("");
        const params: ComponentInputEmail_Methods_INPUT_DataArgs = {
            [ComponentInputEmailConfigs.methods.INPUT.dataArgs.VALUE.name]: "",
        };
        this.executeMethod(ComponentInputEmailConfigs.methods.INPUT.name, event, params);
        this.fn_onFocusInput(event);
    }

    fn_onFocusInput(event: Event) {
        const inputEl = document.querySelector(`input#component-input-email-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
        if (inputEl) {
            inputEl.focus();
        }
        const val = this.fn_getValueInput();
        const params: ComponentInputEmail_Methods_FOCUS_DataArgs = {
            [ComponentInputEmailConfigs.methods.FOCUS.dataArgs.VALUE.name]: val,
        };
        this.executeMethod(ComponentInputEmailConfigs.methods.FOCUS.name, event, params);
    }

}

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
    ToolsComponents_BorderWidth, SizeCalc, OPERATION, ToolsComponents_Padding, ToolsComponents_Height,
    ToolsComponents_IconSize, Z_INDEXES, ToolsComponents_ZIndex,
    ToolsComponents_FontSize, styleImportant, StyleValue, CssColorVar
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
import {ComponentBorderMethodsType, ComponentBorderPropsType} from "./ComponentBorder";



export const ComponentInputPhoneProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput_Value,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput_Label,
    ///----------------------
    prop_title:                            "prop_title",
    prop_name:                             "prop_name",
    prop_isDisable:                        "prop_isDisable",

    prop_countryHas  :                     "prop_countryHas",
    prop_countryWidth  :                   "prop_countryWidth",
    prop_countryValue:                     "prop_countryValue",
    prop_countryOptions:                   "prop_countryOptions",

    prop_cityHas  :                        "prop_cityHas",
    prop_cityWidth  :                      "prop_cityWidth",
    prop_cityValue:                        "prop_cityValue",
    prop_cityOptions:                      "prop_cityOptions",

    prop_value:                            "prop_value",
    prop_size:                             "prop_size",
    prop_placeholder:                      "prop_placeholder",
    prop_labelClass:                       "prop_labelClass",
    prop_selectWidth:                      "prop_selectWidth",
    prop_backgroundColorForm:              "prop_backgroundColorForm",
    prop_formBorderRadius:                 "prop_formBorderRadius",
    prop_colorIcon:                        "prop_colorIcon",
    prop_icon:                             "prop_icon",
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
        [ComponentInputPhoneProps.prop_isDisable]: {
            name:               ComponentInputPhoneProps.prop_isDisable,
            value:              GOG_SetValue<boolean>(false),
        },

        [ComponentInputPhoneProps.prop_countryHas]: {
            name:               ComponentInputPhoneProps.prop_countryHas,
            value:              GOG_SetValue<Observable<boolean>>(true),
        },
        [ComponentInputPhoneProps.prop_countryWidth]: {
            name:               ComponentInputPhoneProps.prop_countryWidth,
            value:              GOG_SetValue<Observable<number>>(80),
        },
        [ComponentInputPhoneProps.prop_countryValue]: {
            name:               ComponentInputPhoneProps.prop_countryValue,
            value:              GOG_SetValue<Observable<string> | string>(""),
        },

        [ComponentInputPhoneProps.prop_cityHas]: {
            name:               ComponentInputPhoneProps.prop_cityHas,
            value:              GOG_SetValue<Observable<boolean>>(false),
        },
        [ComponentInputPhoneProps.prop_cityWidth]: {
            name:               ComponentInputPhoneProps.prop_cityWidth,
            value:              GOG_SetValue<Observable<number>>(80),
        },
        [ComponentInputPhoneProps.prop_cityValue]: {
            name:               ComponentInputPhoneProps.prop_cityValue,
            value:              GOG_SetValue<Observable<string> | string>(""),
        },
        [ComponentInputPhoneProps.prop_cityOptions]: {
            name:               ComponentInputPhoneProps.prop_cityOptions,
            value:              GOG_SetValue<any[]>([]),
        },

        [ComponentInputPhoneProps.prop_value]: {
            name:               ComponentInputPhoneProps.prop_value,
            value:              GOG_SetValue<Observable<string> | string>(""),
        },
        [ComponentInputPhoneProps.prop_countryOptions]: {
            name:               ComponentInputPhoneProps.prop_countryOptions,
            value:              GOG_SetValue<any[]>([]),
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
            value:              GOG_SetValue<IconsType | null>(ToolsIcons.icon_phone({})),
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
            value:              GOG_SetValue<CssColorVar | null>(Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1)),
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
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_parts,
        ///----------------------
        FORM: {
            name:               "part_form"
        },
        COUNTRY_SELECT: {
            name:               "part_country_select"
        },
        CITY_SELECT: {
            name:               "part_city_select"
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
        SELECT_COUNTRY_CHANGE: {
            name:                      "fn_onSelectCountryChange",
            dataArgs: {
                COUNTRY: {
                    name:              "country",
                },
                CITY: {
                    name:              "city",
                },
                VALUE: {
                    name:              "value",
                },
            },
            componentArgs: {
                 
            }
        },
        
        SELECT_CITY_CHANGE: {
            name:                      "fn_onSelectCityChange",
            dataArgs: {
                COUNTRY: {
                    name:              "country",
                },
                CITY: {
                    name:              "city",
                },
                VALUE: {
                    name:              "value",
                },
            },
            componentArgs: {
                 
            }
        },
        INPUT_CHANGE: {
            name:                      "fn_onInputChange",
            dataArgs: {
                COUNTRY: {
                    name:              "country",
                },
                CITY: {
                    name:              "city",
                },
                VALUE: {
                    name:              "value",
                },
            },
            componentArgs: {

            }
        },
        INPUT_FOCUS: {
            name:                      "fn_onInputFocus",
            dataArgs: {
                COUNTRY: {
                    name:              "country",
                },
                CITY: {
                    name:              "city",
                },
                VALUE: {
                    name:              "value",
                },
            },
            componentArgs: {
                
            }
        },
        INPUT_BLUR: {
            name:                      "fn_onInputBlur",
            dataArgs: {
                COUNTRY: {
                    name:              "country",
                },
                CITY: {
                    name:              "city",
                },
                VALUE: {
                    name:              "value",
                },
            },
            componentArgs: {
                
            }
        }
    }
} as const;



export type ComponentInputPhonePropsType =                      GOG_ExtractNameValue<typeof ComponentInputPhoneConfigs.keys>
export type ComponentInputPhoneSchemaType =                     GOG_ExtractName<typeof ComponentInputPhoneConfigs.schemas>
export type ComponentInputPhoneTemplatesType =                  GOG_ExtractName<typeof ComponentInputPhoneConfigs.templates>

export type ComponentInputPhone_Methods_SELECT_COUNTRY_CHANGE_ComponentArgs =   GOG_ExtractName<typeof ComponentInputPhoneConfigs.methods.SELECT_COUNTRY_CHANGE.componentArgs>
export type ComponentInputPhone_Methods_SELECT_COUNTRY_CHANGE_DataArgs =        GOG_ExtractNameValue<typeof ComponentInputPhoneConfigs.methods.SELECT_COUNTRY_CHANGE.dataArgs>
export type ComponentInputPhone_Methods_SELECT_CITY_CHANGE_ComponentArgs =      GOG_ExtractName<typeof ComponentInputPhoneConfigs.methods.SELECT_CITY_CHANGE.componentArgs>
export type ComponentInputPhone_Methods_SELECT_CITY_CHANGE_DataArgs =           GOG_ExtractNameValue<typeof ComponentInputPhoneConfigs.methods.SELECT_CITY_CHANGE.dataArgs>
export type ComponentInputPhone_Methods_INPUT_CHANGE_ComponentArgs =            GOG_ExtractName<typeof ComponentInputPhoneConfigs.methods.INPUT_CHANGE.componentArgs>
export type ComponentInputPhone_Methods_INPUT_CHANGE_DataArgs =                 GOG_ExtractNameValue<typeof ComponentInputPhoneConfigs.methods.INPUT_CHANGE.dataArgs>
export type ComponentInputPhone_Methods_INPUT_FOCUS_ComponentArgs =             GOG_ExtractName<typeof ComponentInputPhoneConfigs.methods.INPUT_FOCUS.componentArgs>
export type ComponentInputPhone_Methods_INPUT_FOCUS_DataArgs =                  GOG_ExtractNameValue<typeof ComponentInputPhoneConfigs.methods.INPUT_FOCUS.dataArgs>
export type ComponentInputPhone_Methods_INPUT_BLUR_ComponentArgs =              GOG_ExtractName<typeof ComponentInputPhoneConfigs.methods.INPUT_BLUR.componentArgs>
export type ComponentInputPhone_Methods_INPUT_BLUR_DataArgs =                   GOG_ExtractNameValue<typeof ComponentInputPhoneConfigs.methods.INPUT_BLUR.dataArgs>

export type ComponentInputPhoneMethodsType = {
    [ComponentInputPhoneConfigs.methods.SELECT_COUNTRY_CHANGE.name]: ComponentCallBackType<ComponentInputPhone_Methods_SELECT_COUNTRY_CHANGE_ComponentArgs, ComponentInputPhone_Methods_SELECT_COUNTRY_CHANGE_DataArgs>,
    [ComponentInputPhoneConfigs.methods.SELECT_CITY_CHANGE.name]:    ComponentCallBackType<ComponentInputPhone_Methods_SELECT_CITY_CHANGE_ComponentArgs, ComponentInputPhone_Methods_SELECT_CITY_CHANGE_DataArgs>,
    [ComponentInputPhoneConfigs.methods.INPUT_CHANGE.name]:          ComponentCallBackType<ComponentInputPhone_Methods_INPUT_CHANGE_ComponentArgs, ComponentInputPhone_Methods_INPUT_CHANGE_DataArgs>,
    [ComponentInputPhoneConfigs.methods.INPUT_FOCUS.name]:           ComponentCallBackType<ComponentInputPhone_Methods_INPUT_FOCUS_ComponentArgs, ComponentInputPhone_Methods_INPUT_FOCUS_DataArgs>,
    [ComponentInputPhoneConfigs.methods.INPUT_BLUR.name]:            ComponentCallBackType<ComponentInputPhone_Methods_INPUT_BLUR_ComponentArgs, ComponentInputPhone_Methods_INPUT_BLUR_DataArgs>,
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
            [ComponentInputPhoneConfigs.keys.prop_isDisable.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_isDisable.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_isDisable.value,
                title:                                            Language.translate("components.public.props.prop_isDisable.title"),
                description:                                      Language.translate("components.public.props.prop_isDisable.description"),
            },

            [ComponentInputPhoneConfigs.keys.prop_countryHas.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_countryHas.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_countryHas.value,
                title:                                            Language.translate("components.public.props.prop_countryHas.title"),
                description:                                      Language.translate("components.public.props.prop_countryHas.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_countryWidth.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_countryWidth.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_countryWidth.value,
                title:                                            Language.translate("components.public.props.prop_countryWidth.title"),
                description:                                      Language.translate("components.public.props.prop_countryWidth.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_countryOptions.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_countryOptions.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_countryOptions.value,
                title:                                            Language.translate("components.input_phone.props.prop_countryOptions.title"),
                description:                                      Language.translate("components.input_phone.props.prop_countryOptions.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_countryValue.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_countryValue.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_countryValue.value,
                title:                                            Language.translate("components.public.props.prop_countryValue.title"),
                description:                                      Language.translate("components.public.props.prop_countryValue.description"),
            },


            [ComponentInputPhoneConfigs.keys.prop_cityHas.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_cityHas.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_cityHas.value,
                title:                                            Language.translate("components.public.props.prop_countryHas.title"),
                description:                                      Language.translate("components.public.props.prop_countryHas.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_cityWidth.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_cityWidth.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_cityWidth.value,
                title:                                            Language.translate("components.public.props.prop_countryWidth.title"),
                description:                                      Language.translate("components.public.props.prop_countryWidth.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_cityOptions.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_cityOptions.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_cityOptions.value,
                title:                                            Language.translate("components.input_phone.props.prop_cityOptions.title"),
                description:                                      Language.translate("components.input_phone.props.prop_cityOptions.description"),
            },
            [ComponentInputPhoneConfigs.keys.prop_cityValue.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_cityValue.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_cityValue.value,
                title:                                            Language.translate("components.public.props.prop_countryValue.title"),
                description:                                      Language.translate("components.public.props.prop_countryValue.description"),
            },


            [ComponentInputPhoneConfigs.keys.prop_value.name]: {
                prop:                                             ComponentInputPhoneConfigs.keys.prop_value.name,
                default:                                          ComponentInputPhoneConfigs.keys.prop_value.value,
                title:                                            Language.translate("components.public.props.prop_value.title"),
                description:                                      Language.translate("components.public.props.prop_value.description"),
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
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Schema(this),
        ///----------------------
        FORM: {
            part:               ComponentInputPhoneConfigs.schemas.FORM.name,
            title:              Language.translate("components.input.schema.form.title"),
            description:        Language.translate("components.input.schema.form.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_backgroundColorForm.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_formBorderRadius.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_selectWidth.name],
            ]
        },

        COUNTRY_SELECT: {
            part:               ComponentInputPhoneConfigs.schemas.COUNTRY_SELECT.name,
            title:              Language.translate("components.input_phone.schema.country_select.title"),
            description:        Language.translate("components.input_phone.schema.country_select.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_countryWidth.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_countryHas.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_countryOptions.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_countryValue.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_name.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_selectWidth.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_isDisable.name],
            ]
        },
        CITY_SELECT: {
            part:               ComponentInputPhoneConfigs.schemas.CITY_SELECT.name,
            title:              Language.translate("components.input_phone.schema.city_select.title"),
            description:        Language.translate("components.input_phone.schema.city_select.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_countryHas.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_countryValue.name],

                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_cityWidth.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_cityHas.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_cityOptions.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_cityValue.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_name.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_isDisable.name],
            ]
        },
        INPUT: {
            part:               ComponentInputPhoneConfigs.schemas.INPUT.name,
            title:              Language.translate("components.input.schema.input.title"),
            description:        Language.translate("components.input.schema.input.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_countryHas.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_countryWidth.name],

                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_cityHas.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_cityWidth.name],

                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_name.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_value.name],
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_placeholder.name],
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
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_isDisable.name],
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
                this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_isDisable.name],
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
        [ComponentInputPhoneConfigs.methods.SELECT_COUNTRY_CHANGE.name]: {
            title:                                            Language.translate("components.input_phone.methods.fn_onSelectCountryChange.title"),
            description:                                      Language.translate("components.input_phone.methods.fn_onSelectCountryChange.description"),
            args: {
                [ComponentInputPhoneConfigs.methods.SELECT_COUNTRY_CHANGE.dataArgs.COUNTRY.name]: this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_countryValue.name],
                [ComponentInputPhoneConfigs.methods.SELECT_COUNTRY_CHANGE.dataArgs.CITY.name]:    this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_cityValue.name],
                [ComponentInputPhoneConfigs.methods.SELECT_COUNTRY_CHANGE.dataArgs.VALUE.name]:   this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_value.name],
            }
        },
        [ComponentInputPhoneConfigs.methods.SELECT_CITY_CHANGE.name]: {
            title:                                            Language.translate("components.input_phone.methods.fn_onSelectCityChange.title"),
            description:                                      Language.translate("components.input_phone.methods.fn_onSelectCityChange.description"),
            args: {
                [ComponentInputPhoneConfigs.methods.SELECT_CITY_CHANGE.dataArgs.COUNTRY.name]: this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_countryValue.name],
                [ComponentInputPhoneConfigs.methods.SELECT_CITY_CHANGE.dataArgs.CITY.name]:    this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_cityValue.name],
                [ComponentInputPhoneConfigs.methods.SELECT_CITY_CHANGE.dataArgs.VALUE.name]:   this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_value.name],
            }
        },
        [ComponentInputPhoneConfigs.methods.INPUT_CHANGE.name]: {
            title:                                            Language.translate("components.input.methods.fn_onInput.title"),
            description:                                      Language.translate("components.input.methods.fn_onInput.description"),
            args: {
                [ComponentInputPhoneConfigs.methods.INPUT_CHANGE.dataArgs.COUNTRY.name]: this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_countryValue.name],
                [ComponentInputPhoneConfigs.methods.INPUT_CHANGE.dataArgs.CITY.name]:    this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_cityValue.name],
                [ComponentInputPhoneConfigs.methods.INPUT_CHANGE.dataArgs.VALUE.name]:   this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_value.name],     
                   }
        },
        [ComponentInputPhoneConfigs.methods.INPUT_FOCUS.name]: {
            title:                                            Language.translate("components.input.methods.fn_onFocus.title"),
            description:                                      Language.translate("components.input.methods.fn_onFocus.description"),
            args: {
                [ComponentInputPhoneConfigs.methods.INPUT_FOCUS.dataArgs.COUNTRY.name]: this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_countryValue.name],
                [ComponentInputPhoneConfigs.methods.INPUT_FOCUS.dataArgs.CITY.name]:    this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_cityValue.name],
                [ComponentInputPhoneConfigs.methods.INPUT_FOCUS.dataArgs.VALUE.name]:   this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_value.name],
            }
        },
        [ComponentInputPhoneConfigs.methods.INPUT_BLUR.name]: {
            title:                                            Language.translate("components.input.methods.fn_onBlur.title"),
            description:                                      Language.translate("components.input.methods.fn_onBlur.description"),
            args: {
                [ComponentInputPhoneConfigs.methods.INPUT_BLUR.dataArgs.COUNTRY.name]: this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_countryValue.name],
                [ComponentInputPhoneConfigs.methods.INPUT_BLUR.dataArgs.CITY.name]:    this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_cityValue.name],
                [ComponentInputPhoneConfigs.methods.INPUT_BLUR.dataArgs.VALUE.name]:   this._COMPONENT_PATTERN[ComponentInputPhoneConfigs.keys.prop_value.name],
            }
        }
    });


    /* ---------------------------------------------
        Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {

        const inputPhoneComp = new ComponentInputPhone(
            {
                classList:                     ["col-md-3", "col-12", "border", "p-2"],
                prop_title:                    "Phone Example",
                prop_labelTitle:               "Phone Example",
                prop_labelTooltipDescription:  "Enter your phone number",
                prop_placeholder:              "Enter phone number...",

                prop_countryHas:                true ,
                prop_countryWidth:              80 ,
                prop_countryValue:              1,
                prop_countryOptions: [
                    { id: 1, name: "Iran",    code: "+98" },
                    { id: 2, name: "USA",     code: "+1" },
                    { id: 3, name: "UK",      code: "+44" },
                    { id: 4, name: "Germany", code: "+49" },
                ],

                prop_cityHas:                   true ,
                prop_cityWidth:                 80 ,
                prop_cityValue:                 101,
                prop_cityOptions: [
                    { id: 101, name: "Tehran",    code: "021", countryId: 1 },
                    { id: 102, name: "Shiraz",    code: "071", countryId: 1 },
                    { id: 103, name: "Mashhad",   code: "051", countryId: 1 },
                    { id: 201, name: "New York",  code: "212", countryId: 2 },
                    { id: 202, name: "Los Angeles", code: "213", countryId: 2 },
                    { id: 301, name: "London",    code: "020", countryId: 3 },
                    { id: 401, name: "Berlin",    code: "030", countryId: 4 },
                ],

                prop_value:                    "2636617530",
                prop_listRules: [
                    {
                        rule:        "_not_empty",
                        description: "This field is required"
                    },
                ],
                prop_msgRules: {
                    "_not_empty":    "Phone number is required",
                },
                prop_name: "input_example_phone" ,
                prop_isAbsoluteRule: true,
                prop_hasRules: true,
            } as any as ComponentInputPhonePropsType,
            <ComponentInputPhoneMethodsType>{
                fn_onSelectCountryChange: (event, dataArgs, componentArgs) => {
                    console.log("fn_onSelectCountryChange", dataArgs, componentArgs);
                },
                fn_onSelectCityChange: (event, dataArgs, componentArgs) => {
                    console.log("fn_onSelectCityChange", dataArgs, componentArgs);
                },
                fn_onInputChange: (event, dataArgs, componentArgs) => {
                    console.log("fn_onInputChange", dataArgs, componentArgs);
                },
                fn_onInputFocus: (event, dataArgs, componentArgs) => {
                    console.log("fn_onInputFocus", dataArgs, componentArgs);
                },
                fn_onInputBlur: (event, dataArgs, componentArgs) => {
                    console.log("fn_onInputBlur", dataArgs, componentArgs);
                },
            }
        );

        return inputPhoneComp.getElement() as HTMLElement;
    }
}


class ComponentInputPhone extends ComponentInputPhoneBase {

    private _SEARCH_TEXT_COUNTRY =   new Observable<string>("");
    private _SEARCH_TEXT_CITY =      new Observable<string>("");
    private _DROPDOWN_OPEN_COUNTRY = new Observable<boolean>(false);
    private _DROPDOWN_OPEN_CITY =    new Observable<boolean>(false);
    private _ELEMENT_INPUT = null;


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
            case ComponentInputPhoneConfigs.schemas.COUNTRY_SELECT.name:
                return this.template_render_country_select(attrsDefault, data, extra);
            case ComponentInputPhoneConfigs.schemas.CITY_SELECT.name:
                return this.template_render_city_select(attrsDefault, data, extra);
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


    // ---------------------------------------------
    private template_render_form(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_backgroundColorForm = data[ComponentInputPhoneConfigs.keys.prop_backgroundColorForm.name];
            const prop_formBorderRadius =    data[ComponentInputPhoneConfigs.keys.prop_formBorderRadius.name];

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
                            classList: [ "pt-2" , "d-block"]  ,
                            styles: {}  ,
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
                                        )
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
                                    this.executeSchemaPart(ComponentInputPhoneConfigs.schemas.ICON.name),
                                    this.executeSchemaPart(ComponentInputPhoneConfigs.schemas.COUNTRY_SELECT.name),
                                    this.executeSchemaPart(ComponentInputPhoneConfigs.schemas.CITY_SELECT.name),
                                    this.executeSchemaPart(ComponentInputPhoneConfigs.schemas.INPUT.name) ,
                                    this.executeSchemaPart(ComponentInputPhoneConfigs.schemas.ICON_CLEAR.name),
                                ]
                            }) ,
                            prop_borderColor:                    null ,
                            prop_contentBackgroundColor:         prop_backgroundColorForm ,
                        },
                        <ComponentBorderMethodsType>{}
                    ).getReactiveElement() ,
                    this.executeSchemaPart(ComponentInputPhoneConfigs.schemas.VALIDATE.name),
                ],
            });

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    // ---------------------------------------------
    private template_render_icon(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_icon = data[ComponentInputPhoneConfigs.keys.prop_icon.name];
            const prop_colorIcon = data[ComponentInputPhoneConfigs.keys.prop_colorIcon.name];

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
    private template_render_country_select(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_countryHas=       data[ComponentInputPhoneConfigs.keys.prop_countryHas.name];
            const prop_countryWidth=     data[ComponentInputPhoneConfigs.keys.prop_countryWidth.name];

            const prop_name=             data[ComponentInputPhoneConfigs.keys.prop_name.name];
            const prop_countryOptions =  data[ComponentInputPhoneConfigs.keys.prop_countryOptions.name];
            const prop_countryValue =    data[ComponentInputPhoneConfigs.keys.prop_countryValue.name];
            const prop_isDisable =       data[ComponentInputPhoneConfigs.keys.prop_isDisable.name];

            return Observable.computed(
                (countryHas: boolean, name: string) => {
                    if (!countryHas) return null;

                    return ReactiveElement.div({
                        attrs: { ...attrsDefault },
                        className: ["custom-select-wrapper"],
                        styles: {
                            position: "relative",
                        },
                        stylesCustom: `
#${attrsDefault.id} .custom-select-option:hover {
    background-color: var(--primaryColor2, rgba(0,0,0,0.08));
}
#${attrsDefault.id} .custom-select-search:focus {
    border-color: ${Color(COLORS_MAIN.SECONDARY, COLORS_GRAD.GRADE_1)} !important;
}
#${attrsDefault.id} .custom-select-options::-webkit-scrollbar {
    width: 6px;
}
#${attrsDefault.id} .custom-select-options::-webkit-scrollbar-thumb {
    background: ${Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1)};
    border-radius: 3px;
}
#${attrsDefault.id} .custom-select-options::-webkit-scrollbar-track {
    background: transparent;
}
                        `,
                        stylesBind: {
                            width: Observable.computed(
                                (countryWidth: number) => SizeUnit(countryWidth, UNITS.PEXEL),
                                [prop_countryWidth],
                                this.getScope()
                            ),
                            float: Observable.computed(
                                (dir: boolean) => dir ? "right" : "left",
                                [AppConfig.get_directionRtl()],
                                this.getScope()
                            ),
                        },
                        children: [
                            ReactiveElement.input({
                                attrs: {
                                    type: "hidden",
                                    name: `${name}[country]`,
                                },
                                attrsBind: {
                                    value: prop_countryValue,
                                },
                            }),
                            ReactiveElement.div({
                                className: ["form-control", "d-block", "custom-select-trigger"],
                                styles: {
                                    cursor: "pointer",
                                    outline: "none",
                                    boxShadow: "none",
                                    borderStyle: "solid",
                                    borderColor: Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1),
                                    backgroundColor: Color(COLORS_MAIN.SHAN, COLORS_GRAD.GRADE_1),
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    userSelect: "none",
                                },
                                stylesBind: (el) => ({
                                    lineHeight: Observable.computed(
                                        (sizeName: string) => ToolsComponents_Height?.[sizeName],
                                        [AppConfig.get_sizeName()],
                                        this.getScope()
                                    ),
                                    
                                    borderColor: Observable.computed(
                                        (isOpen: boolean) => {
                                            if(isOpen){
                                                return `${Color(COLORS_MAIN.SECONDARY, COLORS_GRAD.GRADE_1)}`;
                                            }
                                            return `${Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1)} `;
                                        } ,
                                        [
                                            this._DROPDOWN_OPEN_COUNTRY
                                        ] ,
                                        this.getScope()
                                    ),

                                    borderWidth: Observable.computed(
                                        (sizeName: string) => StyleValue.important(ToolsComponents_BorderWidth?.[sizeName]),
                                        [AppConfig.get_sizeName()],
                                        this.getScope()
                                    ),
                                    
                                    borderTopWidth: Observable.computed(
                                        (sizeName: string) => StyleValue.important(ToolsComponents_BorderWidth?.[sizeName]),
                                        [AppConfig.get_sizeName()],
                                        this.getScope()
                                    ),
                                    borderBottomWidth: Observable.computed(
                                        (sizeName: string) => StyleValue.important(ToolsComponents_BorderWidth?.[sizeName]),
                                        [AppConfig.get_sizeName()],
                                        this.getScope()
                                    ),
                                    
                                    borderLeftWidth: Observable.computed(
                                        (dir: boolean, sizeName: string) => {
                                            if (!dir) return ToolsComponents_BorderWidth?.[sizeName];
                                            return SizeUnit(0, UNITS.PEXEL);
                                        },
                                        [
                                            AppConfig.get_directionRtl(),
                                            AppConfig.get_sizeName() 
                                        ],
                                        this.getScope()
                                    ),
                                    borderRightWidth: Observable.computed(
                                        (dir: boolean, sizeName: string) => {
                                            if (dir) return ToolsComponents_BorderWidth?.[sizeName];
                                            return SizeUnit(0, UNITS.PEXEL);
                                        },
                                        [
                                            AppConfig.get_directionRtl(),
                                            AppConfig.get_sizeName() 
                                        ],
                                        this.getScope()
                                    ),

                                    fontSize: Observable.computed(
                                        (sizeName: string) => ToolsComponents_FontSize?.[sizeName],
                                        [AppConfig.get_sizeName()],
                                        this.getScope()
                                    ),
                                    paddingTop: Observable.computed(
                                        (sizeName: string) => ToolsComponents_Padding?.[sizeName],
                                        [AppConfig.get_sizeName()],
                                        this.getScope()
                                    ),
                                    paddingBottom: Observable.computed(
                                        (sizeName: string) => ToolsComponents_Padding?.[sizeName],
                                        [AppConfig.get_sizeName()],
                                        this.getScope()
                                    ),
                                    borderTopLeftRadius: Observable.computed(
                                        (dir: boolean, sizeName: string) => {
                                            if (!dir) return ToolsComponents_BorderRadius?.[sizeName];
                                            return SizeUnit(0, UNITS.PEXEL);
                                        },
                                        [AppConfig.get_directionRtl(), AppConfig.get_sizeName()],
                                        this.getScope()
                                    ),
                                    borderBottomLeftRadius: Observable.computed(
                                        (dir: boolean, sizeName: string) => {
                                            if (!dir) return ToolsComponents_BorderRadius?.[sizeName];
                                            return SizeUnit(0, UNITS.PEXEL);
                                        },
                                        [AppConfig.get_directionRtl(), AppConfig.get_sizeName()],
                                        this.getScope()
                                    ),
                                    borderTopRightRadius: Observable.computed(
                                        (dir: boolean, sizeName: string) => {
                                            if (dir) return ToolsComponents_BorderRadius?.[sizeName];
                                            return SizeUnit(0, UNITS.PEXEL);
                                        },
                                        [AppConfig.get_directionRtl(), AppConfig.get_sizeName()],
                                        this.getScope()
                                    ),
                                    borderBottomRightRadius: Observable.computed(
                                        (dir: boolean, sizeName: string) => {
                                            if (dir) return ToolsComponents_BorderRadius?.[sizeName];
                                            return SizeUnit(0, UNITS.PEXEL);
                                        },
                                        [AppConfig.get_directionRtl(), AppConfig.get_sizeName()],
                                        this.getScope()
                                    ),
                                }),
                                attrsBind: {
                                    disabled: Observable.computed(
                                        (status: boolean) => status ? "disabled" : null,
                                        [prop_isDisable],
                                        this.getScope()
                                    ),
                                },
                                on: {
                                    click: (event: Event) => {
                                        event.stopPropagation();
                                        if (prop_isDisable.get()) return;
                                        const newOpen = !this._DROPDOWN_OPEN_COUNTRY.get();
                                        this._DROPDOWN_OPEN_COUNTRY.set(newOpen);
                                        this._DROPDOWN_OPEN_CITY.set(false);
                                        if (newOpen) {
                                            this._SEARCH_TEXT_COUNTRY.set("");
                                            const wrapperId = attrsDefault.id;
                                            setTimeout(() => {
                                                const docHandler = (e: MouseEvent) => {
                                                    const target = e.target as HTMLElement;
                                                    if (!target.closest(`#${wrapperId}`)) {
                                                        this._DROPDOWN_OPEN_COUNTRY.set(false);
                                                        document.removeEventListener('click', docHandler);
                                                    }
                                                };
                                                document.addEventListener('click', docHandler);
                                            }, 0);
                                        }
                                    },
                                },
                                children: [
                                    ReactiveElement.span({
                                        styles: {
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            flex: "1",
                                        },
                                        children: [
                                            Observable.computed(
                                                (value: any, options: any[]) => {
                                                    const found = options.find((item: any) => String(item.id) === String(value));
                                                    if (found) return `${found.code} ${found.name}`;
                                                    return "";
                                                },
                                                [
                                                    prop_countryValue,
                                                    prop_countryOptions
                                                ],
                                                this.getScope()
                                            )
                                        ],
                                    }),
                                    ReactiveElement.span({
                                        styles: {
                                            flexShrink: "0",
                                            fontSize: "10px",
                                            marginInlineStart: "4px",
                                        },
                                        children: Observable.computed(
                                            (isOpen: boolean) => [isOpen ? "▲" : "▼"],
                                            [this._DROPDOWN_OPEN_COUNTRY],
                                            this.getScope()
                                        ),
                                    }),
                                ],
                            }),
                            ReactiveElement.div({
                                className: ["custom-select-dropdown"],
                                styles: {
                                    position: "absolute",
                                    top: "100%",
                                    insetInlineStart: "0",
                                    zIndex: "9999",
                                    backgroundColor: Color(COLORS_MAIN.SHAN, COLORS_GRAD.GRADE_1),
                                    border: `1px solid ${Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1)}`,
                                    borderTop: "none",
                                    maxHeight: "220px",
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: "column",
                                    boxSizing: "border-box",
                                    minWidth: "200px",
                                },
                                stylesBind: {
                                    display: Observable.computed(
                                        (isOpen: boolean) => isOpen ? "flex" : "none",
                                        [this._DROPDOWN_OPEN_COUNTRY],
                                        this.getScope()
                                    ),
                                },
                                children: [
                                    ReactiveElement.input({
                                        attrs: {
                                            type: "text",
                                            placeholder: "Search...",
                                        },
                                        className: ["form-control", "custom-select-search"],
                                        styles: {
                                            border: "none",
                                            borderBottom: `1px solid ${Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1)}`,
                                            borderRadius: "0",
                                            outline: "none",
                                            boxShadow: "none",
                                            fontSize: "12px",
                                            padding: "6px 8px",
                                            boxSizing: "border-box",
                                            width: "100%",
                                        },
                                        attrsBind: {
                                            value: this._SEARCH_TEXT_COUNTRY,
                                        },
                                        on: {
                                            input: (event: Event) => {
                                                this._SEARCH_TEXT_COUNTRY.set((event.target as HTMLInputElement).value);
                                            },
                                            click: (event: Event) => {
                                                event.stopPropagation();
                                            },
                                            mousedown: (event: Event) => {
                                                event.stopPropagation();
                                            },
                                        },
                                    }),
                                    ReactiveElement.div({
                                        className: ["custom-select-options"],
                                        styles: {
                                            overflowY: "auto",
                                            flex: "1",
                                            maxHeight: "190px",
                                        },
                                        children: Observable.for(
                                            Observable.computed(
                                                (options: any[], search: string) => {
                                                    if (!search) return options;
                                                    const lowerSearch = search.toLowerCase();
                                                    return options.filter((item: any) =>
                                                        (item.name || "").toLowerCase().includes(lowerSearch) ||
                                                        (item.code || "").toLowerCase().includes(lowerSearch)
                                                    );
                                                },
                                                [prop_countryOptions, this._SEARCH_TEXT_COUNTRY],
                                                this.getScope()
                                            ),
                                            (item: any, index: number) => {
                                                return ReactiveElement.div({
                                                    className: ["custom-select-option"],
                                                    styles: {
                                                        padding: "6px 8px",
                                                        cursor: "pointer",
                                                        fontSize: "12px",
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                    },
                                                    stylesBind: {
                                                        backgroundColor: Observable.computed(
                                                            (value: any) => {
                                                                return String(item.id) === String(value)
                                                                    ? Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_2)
                                                                    : "transparent";
                                                            },
                                                            [prop_countryValue],
                                                            this.getScope()
                                                        ),
                                                        color: Observable.computed(
                                                            (value: any) => {
                                                                return String(item.id) === String(value)
                                                                    ? Color(COLORS_MAIN.SHAN, COLORS_GRAD.GRADE_2)
                                                                    : Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_2);
                                                            },
                                                            [prop_countryValue],
                                                            this.getScope()
                                                        ),
                                                    },
                                                    on: {
                                                        click: (event: Event) => {
                                                            event.stopPropagation();
                                                            this.set(ComponentInputPhoneConfigs.keys.prop_countryValue.name, String(item.id));
                                                            this.set(ComponentInputPhoneConfigs.keys.prop_cityValue.name, "");
                                                            this.set(ComponentInputPhoneConfigs.keys.prop_value.name , "")
                                                            this._DROPDOWN_OPEN_COUNTRY.set(false);

                                                            const params : ComponentInputPhone_Methods_SELECT_COUNTRY_CHANGE_ComponentArgs = {}
                                                            this.executeMethod(ComponentInputPhoneConfigs.methods.SELECT_COUNTRY_CHANGE.name  , event , params);

                                                        },
                                                    },
                                                    children: [
                                                        ReactiveElement.span({
                                                            styles:{
                                                                width: "60px" ,
                                                                float: "left"
                                                            },
                                                            children:[
                                                                item.code
                                                            ]
                                                        }) ,
                                                        ReactiveElement.span({
                                                            styles:{
                                                                width: "calc(100% - 60px)" ,
                                                                float: "left"
                                                            },
                                                            children:[
                                                                item.name
                                                            ]
                                                        })
                                                    ],
                                                });
                                            },
                                            {},
                                            this.getScope()
                                        ),
                                    }),
                                ],
                            }),
                        ],
                    });
                } ,
                [
                    prop_countryHas ,
                    prop_name ,
                ] ,
                this.getScope()
            )

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    // ---------------------------------------------
    private template_render_city_select(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_countryHas =    data[ComponentInputPhoneConfigs.keys.prop_countryHas.name];
            const prop_countryValue =  data[ComponentInputPhoneConfigs.keys.prop_countryValue.name];
            
            const prop_cityHas=        data[ComponentInputPhoneConfigs.keys.prop_cityHas.name];
            const prop_cityWidth=      data[ComponentInputPhoneConfigs.keys.prop_cityWidth.name];

            const prop_name=           data[ComponentInputPhoneConfigs.keys.prop_name.name];
            const prop_cityOptions =   data[ComponentInputPhoneConfigs.keys.prop_cityOptions.name];
            const prop_cityValue =     data[ComponentInputPhoneConfigs.keys.prop_cityValue.name];
            const prop_isDisable =     data[ComponentInputPhoneConfigs.keys.prop_isDisable.name];

            return Observable.computed(
                (cityHas: boolean, name: string) => {
                    if (!cityHas) return null;

                    const cityOptionsFiltered = Observable.computed(
                        (options: any[], countryHas: boolean, countryVal: any, search: string) => {
                            let filtered = options;
                            if (countryHas) {
                                filtered = filtered.filter((item: any) =>
                                    String(item.countryId) === String(countryVal)
                                );
                            }
                            if (search) {
                                const lowerSearch = search.toLowerCase();
                                filtered = filtered.filter((item: any) =>
                                    (item.name || "").toLowerCase().includes(lowerSearch) ||
                                    (item.code || "").toLowerCase().includes(lowerSearch)
                                );
                            }
                            return filtered;
                        },
                        [
                            prop_cityOptions, 
                            prop_countryHas,
                            prop_countryValue,
                            this._SEARCH_TEXT_CITY
                        ],
                        this.getScope()
                    );

                    return ReactiveElement.div({
                        attrs: { ...attrsDefault },
                        className: ["custom-select-wrapper", "city-select-wrapper"],
                        styles: {
                            position: "relative",
                        },
                        stylesCustom: `
#${attrsDefault.id} .custom-select-option:hover {
    background-color: var(--primaryColor2, rgba(0,0,0,0.08));
}
#${attrsDefault.id} .custom-select-search:focus {
    border-color: ${Color(COLORS_MAIN.SECONDARY, COLORS_GRAD.GRADE_1)} !important;
}
#${attrsDefault.id} .custom-select-options::-webkit-scrollbar {
    width: 6px;
}
#${attrsDefault.id} .custom-select-options::-webkit-scrollbar-thumb {
    background: ${Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1)};
    border-radius: 3px;
}
#${attrsDefault.id} .custom-select-options::-webkit-scrollbar-track {
    background: transparent;
}
                        `,
                        stylesBind: {
                            width: Observable.computed(
                                (cityWidth: number) => SizeUnit(cityWidth, UNITS.PEXEL),
                                [prop_cityWidth],
                                this.getScope()
                            ),
                            float: Observable.computed(
                                (dir: boolean) => dir ? "right" : "left",
                                [AppConfig.get_directionRtl()],
                                this.getScope()
                            ),
                        },
                        children: [
                            ReactiveElement.input({
                                attrs: {
                                    type: "hidden",
                                    name: `${name}[city]`,
                                },
                                attrsBind: {
                                    value: prop_cityValue,
                                },
                            }),
                            ReactiveElement.div({
                                className: ["form-control", "d-block", "custom-select-trigger"],
                                styles: {
                                    cursor:           "pointer",
                                    outline:          "none",
                                    boxShadow:        "none",
                                    borderStyle:      "solid",
                                    borderColor:      Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1),
                                    backgroundColor:  Color(COLORS_MAIN.SHAN, COLORS_GRAD.GRADE_1),
                                    display:          "flex",
                                    justifyContent:   "space-between",
                                    alignItems:       "center",
                                    overflow:         "hidden",
                                    whiteSpace:       "nowrap",
                                    textOverflow:     "ellipsis",
                                    userSelect:       "none",
                                },
                                stylesBind: (el) => ({
                                    lineHeight: Observable.computed(
                                        (sizeName: string) => ToolsComponents_Height?.[sizeName],
                                        [AppConfig.get_sizeName()],
                                        this.getScope()
                                    ),

                                    borderColor: Observable.computed(
                                        (isOpen: boolean) => {
                                            if(isOpen){
                                                return `${Color(COLORS_MAIN.SECONDARY, COLORS_GRAD.GRADE_1)}`;
                                            }
                                            return `${Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1)} `;
                                        } ,
                                        [
                                            this._DROPDOWN_OPEN_CITY
                                        ] ,
                                        this.getScope()
                                    ),
                                    
                                    fontSize: Observable.computed(
                                        (sizeName: string) => ToolsComponents_FontSize?.[sizeName],
                                        [AppConfig.get_sizeName()],
                                        this.getScope()
                                    ),
                                    paddingTop: Observable.computed(
                                        (sizeName: string) => ToolsComponents_Padding?.[sizeName],
                                        [AppConfig.get_sizeName()],
                                        this.getScope()
                                    ),
                                    paddingBottom: Observable.computed(
                                        (sizeName: string) => ToolsComponents_Padding?.[sizeName],
                                        [AppConfig.get_sizeName()],
                                        this.getScope()
                                    ),
                                    
                                    borderTopWidth: Observable.computed(
                                        (sizeName: string) => StyleValue.important(ToolsComponents_BorderWidth?.[sizeName]),
                                        [AppConfig.get_sizeName()],
                                        this.getScope()
                                    ),
                                    borderBottomWidth: Observable.computed(
                                        (sizeName: string) => StyleValue.important(ToolsComponents_BorderWidth?.[sizeName]),
                                        [AppConfig.get_sizeName()],
                                        this.getScope()
                                    ),
                                    
                                    borderLeftWidth: Observable.computed(
                                        (dir: boolean, sizeName: string) => {
                                            if (!dir) return ToolsComponents_BorderWidth?.[sizeName];
                                            return SizeUnit(0, UNITS.PEXEL);
                                        },
                                        [
                                            AppConfig.get_directionRtl(),
                                            AppConfig.get_sizeName() 
                                        ],
                                        this.getScope()
                                    ),
                                    borderRightWidth: Observable.computed(
                                        (dir: boolean, sizeName: strin) => {
                                            if (dir) return ToolsComponents_BorderWidth?.[sizeName];
                                            return SizeUnit(0, UNITS.PEXEL);
                                        },
                                        [
                                            AppConfig.get_directionRtl(),
                                            AppConfig.get_sizeName() 
                                        ],
                                        this.getScope()
                                    ),
                                    
                                    borderTopLeftRadius: Observable.computed(
                                        (dir: boolean, sizeName: string, countryHas: boolean) => {
                                            if (!dir && !countryHas) return ToolsComponents_BorderRadius?.[sizeName];
                                            return SizeUnit(0, UNITS.PEXEL);
                                        },
                                        [
                                            AppConfig.get_directionRtl(),
                                            AppConfig.get_sizeName() , 
                                            prop_countryHas
                                        ],
                                        this.getScope()
                                    ),
                                    borderBottomLeftRadius: Observable.computed(
                                        (dir: boolean, sizeName: string, countryHas: boolean) => {
                                            if (!dir && !countryHas) return ToolsComponents_BorderRadius?.[sizeName];
                                            return SizeUnit(0, UNITS.PEXEL);
                                        },
                                        [
                                            AppConfig.get_directionRtl(),
                                            AppConfig.get_sizeName() ,
                                            prop_countryHas
                                        ],
                                        this.getScope()
                                    ),
                                    borderTopRightRadius: Observable.computed(
                                        (dir: boolean, sizeName: string, countryHas: boolean) => {
                                            if (dir && !countryHas) return ToolsComponents_BorderRadius?.[sizeName];
                                            return SizeUnit(0, UNITS.PEXEL);
                                        },
                                        [
                                            AppConfig.get_directionRtl(), 
                                            AppConfig.get_sizeName() ,
                                            prop_countryHas
                                        ],
                                        this.getScope()
                                    ),
                                    borderBottomRightRadius: Observable.computed(
                                        (dir: boolean, sizeName: string, countryHas: boolean) => {
                                            if (dir && !countryHas) return ToolsComponents_BorderRadius?.[sizeName];
                                            return SizeUnit(0, UNITS.PEXEL);
                                        },
                                        [
                                            AppConfig.get_directionRtl(),
                                            AppConfig.get_sizeName() ,
                                            prop_countryHas
                                        ],
                                        this.getScope()
                                    ),
                                }),
                                attrsBind: {
                                    disabled: Observable.computed(
                                        (status: boolean) => status ? "disabled" : null,
                                        [prop_isDisable],
                                        this.getScope()
                                    ),
                                },
                                on: {
                                    click: (event: Event) => {
                                        event.stopPropagation();
                                        if (prop_isDisable.get()) return;
                                        const newOpen = !this._DROPDOWN_OPEN_CITY.get();
                                        this._DROPDOWN_OPEN_CITY.set(newOpen);
                                        this._DROPDOWN_OPEN_COUNTRY.set(false);
                                        if (newOpen) {
                                            this._SEARCH_TEXT_CITY.set("");
                                            const wrapperId = attrsDefault.id;
                                            setTimeout(() => {
                                                const docHandler = (e: MouseEvent) => {
                                                    const target = e.target as HTMLElement;
                                                    if (!target.closest(`#${wrapperId}`)) {
                                                        this._DROPDOWN_OPEN_CITY.set(false);
                                                        document.removeEventListener('click', docHandler);
                                                    }
                                                };
                                                document.addEventListener('click', docHandler);
                                            }, 0);
                                        }
                                    },
                                },
                                children: [
                                    ReactiveElement.span({
                                        styles: {
                                            overflow:       "hidden",
                                            textOverflow:   "ellipsis",
                                            whiteSpace:     "nowrap",
                                            flex:           "1",
                                        },
                                        children: [
                                            Observable.computed(
                                                (value: any, options: any[], countryHas: boolean, countryVal: any) => {
                                                    let filtered = options;
                                                    if (countryHas) {
                                                        filtered = filtered.filter((item: any) =>
                                                            String(item.countryId) === String(countryVal)
                                                        );
                                                    }
                                                    const found = filtered.find((item: any) => String(item.id) === String(value));
                                                    if (found) return `${found.code} ${found.name}`;
                                                    return "";
                                                },
                                                [prop_cityValue, prop_cityOptions, prop_countryHas, prop_countryValue],
                                                this.getScope()
                                            )
                                        ],
                                    }),
                                    ReactiveElement.span({
                                        styles: {
                                            flexShrink: "0",
                                            fontSize: "10px",
                                            marginInlineStart: "4px",
                                        },
                                        children: Observable.computed(
                                            (isOpen: boolean) => [isOpen ? "▲" : "▼"],
                                            [this._DROPDOWN_OPEN_CITY],
                                            this.getScope()
                                        ),
                                    }),
                                ],
                            }),
                            ReactiveElement.div({
                                className: ["custom-select-dropdown"],
                                styles: {
                                    position: "absolute",
                                    top: "100%",
                                    insetInlineStart: "0",
                                    zIndex: "9999",
                                    backgroundColor: Color(COLORS_MAIN.SHAN, COLORS_GRAD.GRADE_1),
                                    border: `1px solid ${Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1)}`,
                                    borderTop: "none",
                                    maxHeight: "220px",
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: "column",
                                    boxSizing: "border-box",
                                    minWidth: "200px",
                                },
                                stylesBind: {
                                    display: Observable.computed(
                                        (isOpen: boolean) => isOpen ? "flex" : "none",
                                        [this._DROPDOWN_OPEN_CITY],
                                        this.getScope()
                                    ),
                                },
                                children: [
                                    ReactiveElement.input({
                                        attrs: {
                                            type: "text",
                                            placeholder: "Search...",
                                        },
                                        className: ["form-control", "custom-select-search"],
                                        styles: {
                                            border:         "none",
                                            borderBottom:   `1px solid ${Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1)}`,
                                            borderRadius:   "0",
                                            outline:        "none",
                                            boxShadow:      "none",
                                            fontSize:       "12px",
                                            padding:        "6px 8px",
                                            boxSizing:      "border-box",
                                            width:          "100%",
                                        },
                                        attrsBind: {
                                            value: this._SEARCH_TEXT_CITY,
                                        },
                                        on: {
                                            input: (event: Event) => {
                                                this._SEARCH_TEXT_CITY.set((event.target as HTMLInputElement).value);
                                            },
                                            click: (event: Event) => {
                                                event.stopPropagation();
                                            },
                                            mousedown: (event: Event) => {
                                                event.stopPropagation();
                                            },
                                        },
                                    }),
                                    ReactiveElement.div({
                                        className: ["custom-select-options"],
                                        styles: {
                                            overflowY: "auto",
                                            flex: "1",
                                            maxHeight: "190px",
                                        },
                                        children: Observable.for(
                                            cityOptionsFiltered,
                                            (item: any, index: number) => {
                                                return ReactiveElement.div({
                                                    className: ["custom-select-option"],
                                                    styles: {
                                                        padding: "6px 8px",
                                                        cursor: "pointer",
                                                        fontSize: "12px",
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                    },
                                                    stylesBind: {
                                                        backgroundColor: Observable.computed(
                                                            (value: any) => {
                                                                return String(item.id) === String(value)
                                                                    ? Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_2)
                                                                    : "transparent";
                                                            },
                                                            [prop_cityValue],
                                                            this.getScope()
                                                        ),
                                                        color: Observable.computed(
                                                            (value: any) => {
                                                                return String(item.id) === String(value)
                                                                    ? Color(COLORS_MAIN.SHAN, COLORS_GRAD.GRADE_2)
                                                                    : Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_2);
                                                            },
                                                            [prop_cityValue],
                                                            this.getScope()
                                                        ),
                                                    },
                                                    on: {
                                                        click: (event: Event) => {
                                                            event.stopPropagation();
                                                            
                                                            this.set(ComponentInputPhoneConfigs.keys.prop_cityValue.name, String(item.id));
                                                            this.set(ComponentInputPhoneConfigs.keys.prop_value.name , "")
                                                            
                                                            this._DROPDOWN_OPEN_CITY.set(false);

                                                            const paramsFn : ComponentInputPhone_Methods_SELECT_CITY_CHANGE_ComponentArgs = {}
                                                            this.executeMethod(ComponentInputPhoneConfigs.methods.SELECT_CITY_CHANGE.name  , event , paramsFn);
                                                        },
                                                    },
                                                    children: [
                                                        ReactiveElement.span({
                                                            styles:{
                                                                width: "60px" ,
                                                                float: "left"
                                                            },
                                                            children:[
                                                                item.code
                                                            ]
                                                        }) ,
                                                        ReactiveElement.span({
                                                            styles:{
                                                                width: "calc(100% - 60px)" ,
                                                                float: "left"
                                                            },
                                                            children:[
                                                                item.name
                                                            ]
                                                        })
                                                    ]
                                                });
                                            },
                                            {},
                                            this.getScope()
                                        ),
                                    }),
                                ],
                            }),
                        ],
                    });
                },
                [
                    prop_cityHas,
                    prop_name,
                ],
                this.getScope()
            )

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    // ---------------------------------------------
    private template_render_input(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_countryHas=    data[ComponentInputPhoneConfigs.keys.prop_countryHas.name];
            const prop_countryWidth=  data[ComponentInputPhoneConfigs.keys.prop_countryWidth.name];
            const prop_cityHas=       data[ComponentInputPhoneConfigs.keys.prop_cityHas.name];
            const prop_cityWidth=     data[ComponentInputPhoneConfigs.keys.prop_cityWidth.name];

            const prop_inputClass =    data[ComponentInputPhoneConfigs.keys.prop_inputClass.name];
            const prop_inputStyles =   data[ComponentInputPhoneConfigs.keys.prop_inputStyles.name];
            const prop_name =          data[ComponentInputPhoneConfigs.keys.prop_name.name];
            const prop_placeholder =   data[ComponentInputPhoneConfigs.keys.prop_placeholder.name];
            const prop_isDisable =     data[ComponentInputPhoneConfigs.keys.prop_isDisable.name];
            const prop_value =         data[ComponentInputPhoneConfigs.keys.prop_value.name];
            const prop_icon =          data[ComponentInputPhoneConfigs.keys.prop_icon.name];

            this._ELEMENT_INPUT = ReactiveElement.input({
                attrs: {
                    ...attrsDefault,
                    type:        "number",
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
                    placeholder: prop_placeholder,
                    value:       prop_value,
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
                    top:          "0",
                    outline:      "none",
                    boxShadow:    "none",
                },
                stylesBind: (el) => ({
                    prop_inputStyles,

                    width: Observable.computed(
                        (sizeName, icon , countryHas, countryWidth, cityHas, cityWidth) => {
                            let listCalc = [
                                SizeUnit(100 , UNITS.PERCENT)
                            ];
                            if (countryHas){
                                listCalc.push(OPERATION.MINUS);
                                listCalc.push(
                                    SizeUnit(countryWidth , UNITS.PEXEL)
                                );
                            }
                            if (cityHas){
                                listCalc.push(OPERATION.MINUS);
                                listCalc.push(
                                    SizeUnit(cityWidth , UNITS.PEXEL)
                                );
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
                            prop_countryHas ,
                            prop_countryWidth ,
                            prop_cityHas ,
                            prop_cityWidth
                        ] ,
                        this.getScope()
                    ) ,


                    borderWidth: Observable.computed(
                        (sizeName: string) => StyleValue.important(ToolsComponents_BorderWidth?.[sizeName]),
                        [AppConfig.get_sizeName()],
                        this.getScope()
                    ),

                    borderTopLeftRadius: Observable.computed(
                        (dir , sizeName, countryHas , cityHas) => {
                            if(dir){
                                return ToolsComponents_BorderRadius?.[sizeName]
                            }
                            else if (!countryHas && !cityHas){
                                return ToolsComponents_BorderRadius?.[sizeName]
                            }
                            return SizeUnit(0 , UNITS.PEXEL);
                        } ,
                        [
                            AppConfig.get_directionRtl() ,
                            AppConfig.get_sizeName() ,
                            prop_countryHas ,
                            prop_cityHas
                        ] ,
                        this.getScope()
                    ) ,

                    borderBottomLeftRadius: Observable.computed(
                        (dir , sizeName, countryHas , cityHas:boolean) => {
                            if(dir){
                                return ToolsComponents_BorderRadius?.[sizeName]
                            }
                            else if (!countryHas && !cityHas){
                                return ToolsComponents_BorderRadius?.[sizeName]
                            }
                            return SizeUnit(0 , UNITS.PEXEL);
                        } ,
                        [
                            AppConfig.get_directionRtl() ,
                            AppConfig.get_sizeName() ,
                            prop_countryHas ,
                            prop_cityHas
                        ] ,
                        this.getScope()
                    ) ,

                    borderTopRightRadius: Observable.computed(
                        (dir , sizeName, countryHas , cityHas: boolean) => {
                            if(!dir){
                                return ToolsComponents_BorderRadius?.[sizeName]
                            }
                            else if (!countryHas && !cityHas){
                                return ToolsComponents_BorderRadius?.[sizeName]
                            }
                            return SizeUnit(0 , UNITS.PEXEL);
                        } ,
                        [
                            AppConfig.get_directionRtl() ,
                            AppConfig.get_sizeName() ,
                            prop_countryHas ,
                            prop_cityHas
                        ] ,
                        this.getScope()
                    ) ,

                    borderBottomRightRadius: Observable.computed(
                        (dir , sizeName, countryHas , cityHas: boolean) => {
                            if(!dir){
                                return ToolsComponents_BorderRadius?.[sizeName]
                            }
                            else if (!countryHas && !cityHas){
                                return ToolsComponents_BorderRadius?.[sizeName]
                            }
                            return SizeUnit(0 , UNITS.PEXEL);
                        } ,
                        [
                            AppConfig.get_directionRtl() ,
                            AppConfig.get_sizeName() ,
                            prop_countryHas ,
                            prop_cityHas
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
                        this.set(ComponentInputPhoneConfigs.keys.prop_value.name , value)
                        const paramsFn : ComponentInputPhone_Methods_INPUT_CHANGE_ComponentArgs = {}
                        this.executeMethod(ComponentInputPhoneConfigs.methods.INPUT_CHANGE.name  , event , paramsFn);
                    },
                    focus: (event: Event) => {
                        this._DROPDOWN_OPEN_COUNTRY.set(false);
                        this._DROPDOWN_OPEN_CITY.set(false);

                        const paramsFn : ComponentInputPhone_Methods_INPUT_FOCUS_ComponentArgs = {}
                        this.executeMethod(ComponentInputPhoneConfigs.methods.INPUT_FOCUS.name  , event , paramsFn);
                    },
                    blur: (event: Event) => {
                        const paramsFn : ComponentInputPhone_Methods_INPUT_BLUR_ComponentArgs = {}
                        this.executeMethod(ComponentInputPhoneConfigs.methods.INPUT_BLUR.name  , event , paramsFn);
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
            const prop_size =         data[ComponentInputPhoneConfigs.keys.prop_size.name];
            const prop_isDisable =    data[ComponentInputPhoneConfigs.keys.prop_isDisable.name];

            const directionRtl = AppConfig.get("directionRtl");

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
                                prop_positionEnd:      SizeUnit(0, UNITS.PERCENT),
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
                                                              this.set(ComponentInputPhoneConfigs.keys.prop_value.name , "")
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
    private template_render_validate(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_isDisable =      data[ComponentInputPhoneConfigs.keys.prop_isDisable.name];
            const prop_value =          data[ComponentInputPhoneConfigs.keys.prop_value.name];
            const prop_hasRules =       data[ComponentInputPhoneConfigs.keys.prop_hasRules.name];
            const prop_isAbsoluteRule = data[ComponentInputPhoneConfigs.keys.prop_isAbsoluteRule.name];
            const prop_listRules =      data[ComponentInputPhoneConfigs.keys.prop_listRules.name];
            const prop_msgRules =       data[ComponentInputPhoneConfigs.keys.prop_msgRules.name];
            const prop_title =          data[ComponentInputPhoneConfigs.keys.prop_title.name];

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                className: ["position-relative"],
                children: Observable.computed(
                    (isDisable: boolean, hasRules: boolean) => {
                        if (isDisable) return null;
                        if (!hasRules) return null;

                        return new ToolsComponents.ComponentValidate(
                            <ComponentValidatePropsType>{
                                classList:        ["mt-1"],
                                prop_reference:   `component-input-phone-input-${this._COMPONENT_RANDOM_ID}`,
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



}

export default ComponentInputPhone

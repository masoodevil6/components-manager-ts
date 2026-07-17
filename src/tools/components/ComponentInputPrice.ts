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
    ToolsComponents_BorderWidth,
    TranslateUnit
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
    ComponentElementPosition,
    ComponentElementPositionMethodsType,
    ComponentElementPositionPropsType,
    ComponentElementPosition_positionTypes
} from "./ComponentElementPosition";
import {ToolsConverter} from "../../utils/ToolsConverter";


export interface CalculatorItem {
    name: string;
    title?: string;
    coefficient?: number;
    extension?: string;
}

export interface InformationItem {
    title: string;
    value?: string;
    title_color?: string;
    value_color?: string;
    title_backgroundColor?: string;
    value_backgroundColor?: string;
}


export const ComponentInputPriceProps = {
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
    prop_calculator:                       "prop_calculator",
    prop_calculatorColor:                  "prop_calculatorColor",
    prop_information:                      "prop_information",
} as const;


const ComponentInputPriceConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys,
        ///----------------------
        [ComponentInputPriceProps.prop_title]: {
            name:               ComponentInputPriceProps.prop_title,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentInputPriceProps.prop_backgroundColorForm]: {
            name:               ComponentInputPriceProps.prop_backgroundColorForm,
            value:              GOG_SetValue<string>("var(--secondaryColor1)"),
        },
        [ComponentInputPriceProps.prop_formBorderRadius]: {
            name:               ComponentInputPriceProps.prop_formBorderRadius,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES>>(SIZES.M),
        },
        [ComponentInputPriceProps.prop_colorIcon]: {
            name:               ComponentInputPriceProps.prop_colorIcon,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentInputPriceProps.prop_size]: {
            name:               ComponentInputPriceProps.prop_size,
            value:              GOG_SetValue<string>(SIZES.M),
        },
        [ComponentInputPriceProps.prop_inputClass]: {
            name:               ComponentInputPriceProps.prop_inputClass,
            value:              GOG_SetValue<string[]>(["form-control"]),
        },
        [ComponentInputPriceProps.prop_inputStyles]: {
            name:               ComponentInputPriceProps.prop_inputStyles,
            value:              GOG_SetValue<Record<string, string>>({}),
        },
        [ComponentInputPriceProps.prop_inputBorderColor]: {
            name:               ComponentInputPriceProps.prop_inputBorderColor,
            value:              GOG_SetValue<string>("var(--primaryColor1)"),
        },
        [ComponentInputPriceProps.prop_inputBorderColorFocus]: {
            name:               ComponentInputPriceProps.prop_inputBorderColorFocus,
            value:              GOG_SetValue<string>("var(--secondaryColor1)"),
        },
        [ComponentInputPriceProps.prop_inputBorderWidth]: {
            name:               ComponentInputPriceProps.prop_inputBorderWidth,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES>>(SIZES.M),
        },
        [ComponentInputPriceProps.prop_inputBorderRadius]: {
            name:               ComponentInputPriceProps.prop_inputBorderRadius,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES>>(SIZES.M),
        },
        [ComponentInputPriceProps.prop_type]: {
            name:               ComponentInputPriceProps.prop_type,
            value:              GOG_SetValue<string>("string"),
        },
        [ComponentInputPriceProps.prop_placeholder]: {
            name:               ComponentInputPriceProps.prop_placeholder,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentInputPriceProps.prop_icon]: {
            name:               ComponentInputPriceProps.prop_icon,
            value:              GOG_SetValue<IconsType | null>(null),
        },
        [ComponentInputPriceProps.prop_btnAddStatus]: {
            name:               ComponentInputPriceProps.prop_btnAddStatus,
            value:              GOG_SetValue<boolean>(false),
        },
        [ComponentInputPriceProps.prop_btnAddIcon]: {
            name:               ComponentInputPriceProps.prop_btnAddIcon,
            value:              GOG_SetValue<string>("&plus;"),
        },
        [ComponentInputPriceProps.prop_btnAddTitle]: {
            name:               ComponentInputPriceProps.prop_btnAddTitle,
            value:              GOG_SetValue<string>("add item"),
        },
        [ComponentInputPriceProps.prop_btnAddClass]: {
            name:               ComponentInputPriceProps.prop_btnAddClass,
            value:              GOG_SetValue<string[]>([]),
        },
        [ComponentInputPriceProps.prop_btnColor]: {
            name:               ComponentInputPriceProps.prop_btnColor,
            value:              GOG_SetValue<GOG_ValueOf<typeof ComponentButton_Types>>(ComponentButton_Types.SUBMIT),
        },
        [ComponentInputPriceProps.prop_isAbsoluteRule]: {
            name:               ComponentInputPriceProps.prop_isAbsoluteRule,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentInputPriceProps.prop_listRules]: {
            name:               ComponentInputPriceProps.prop_listRules,
            value:              GOG_SetValue<any[]>([]),
        },
        [ComponentInputPriceProps.prop_msgRules]: {
            name:               ComponentInputPriceProps.prop_msgRules,
            value:              GOG_SetValue<Record<string, string> | null>(null),
        },
        [ComponentInputPriceProps.prop_calculator]: {
            name:               ComponentInputPriceProps.prop_calculator,
            value:              GOG_SetValue<CalculatorItem[] | null>(null),
        },
        [ComponentInputPriceProps.prop_calculatorColor]: {
            name:               ComponentInputPriceProps.prop_calculatorColor,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentInputPriceProps.prop_information]: {
            name:               ComponentInputPriceProps.prop_information,
            value:              GOG_SetValue<InformationItem[] | null>(null),
        },
        [GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name]: {
            name:               GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name,
            value:              GOG_SetValue<Observable<string> | string | number | null>(null),
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
        CALCULATOR: {
            name:               "part_calculator"
        },
        INFORMATION: {
            name:               "part_information"
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
                    value:             GOG_SetValue<{value: number | null, calcs: Record<string, number>}>({value: null, calcs: {}}),
                },
            },
            componentArgs: {}
        },
        FOCUS: {
            name:                      "fn_onFocus",
            dataArgs: {
                VALUE: {
                    name:              "VALUE",
                    value:             GOG_SetValue<{value: number | null, calcs: Record<string, number>}>({value: null, calcs: {}}),
                },
            },
            componentArgs: {}
        },
        BLUR: {
            name:                      "fn_onBlur",
            dataArgs: {
                VALUE: {
                    name:              "VALUE",
                    value:             GOG_SetValue<{value: number | null, calcs: Record<string, number>}>({value: null, calcs: {}}),
                },
            },
            componentArgs: {}
        },
        CLICK_BUTTON: {
            name:                      "fn_onClickButton",
            dataArgs: {
                VALUE: {
                    name:              "VALUE",
                    value:             GOG_SetValue<{value: number | null, calcs: Record<string, number>}>({value: null, calcs: {}}),
                },
            },
            componentArgs: {}
        },
    }
} as const;


export type ComponentInputPricePropsType =                      GOG_ExtractNameValue<typeof ComponentInputPriceConfigs.keys>
export type ComponentInputPriceSchemaType =                     GOG_ExtractName<typeof ComponentInputPriceConfigs.schemas>
export type ComponentInputPriceTemplatesType =                  GOG_ExtractName<typeof ComponentInputPriceConfigs.templates>

export type ComponentInputPrice_Methods_INPUT_ComponentArgs =   GOG_ExtractName<typeof ComponentInputPriceConfigs.methods.INPUT.componentArgs>
export type ComponentInputPrice_Methods_INPUT_DataArgs =        GOG_ExtractNameValue<typeof ComponentInputPriceConfigs.methods.INPUT.dataArgs>
export type ComponentInputPrice_Methods_FOCUS_ComponentArgs =   GOG_ExtractName<typeof ComponentInputPriceConfigs.methods.FOCUS.componentArgs>
export type ComponentInputPrice_Methods_FOCUS_DataArgs =        GOG_ExtractNameValue<typeof ComponentInputPriceConfigs.methods.FOCUS.dataArgs>
export type ComponentInputPrice_Methods_BLUR_ComponentArgs =    GOG_ExtractName<typeof ComponentInputPriceConfigs.methods.BLUR.componentArgs>
export type ComponentInputPrice_Methods_BLUR_DataArgs =         GOG_ExtractNameValue<typeof ComponentInputPriceConfigs.methods.BLUR.dataArgs>
export type ComponentInputPrice_Methods_CLICK_BUTTON_ComponentArgs = GOG_ExtractName<typeof ComponentInputPriceConfigs.methods.CLICK_BUTTON.componentArgs>
export type ComponentInputPrice_Methods_CLICK_BUTTON_DataArgs = GOG_ExtractNameValue<typeof ComponentInputPriceConfigs.methods.CLICK_BUTTON.dataArgs>

export type ComponentInputPriceMethodsType = {
    [ComponentInputPriceConfigs.methods.INPUT.name]: ComponentCallBackType<ComponentInputPrice_Methods_INPUT_ComponentArgs, ComponentInputPrice_Methods_INPUT_DataArgs>,
    [ComponentInputPriceConfigs.methods.FOCUS.name]: ComponentCallBackType<ComponentInputPrice_Methods_FOCUS_ComponentArgs, ComponentInputPrice_Methods_FOCUS_DataArgs>,
    [ComponentInputPriceConfigs.methods.BLUR.name]: ComponentCallBackType<ComponentInputPrice_Methods_BLUR_ComponentArgs, ComponentInputPrice_Methods_BLUR_DataArgs>,
    [ComponentInputPriceConfigs.methods.CLICK_BUTTON.name]: ComponentCallBackType<ComponentInputPrice_Methods_CLICK_BUTTON_ComponentArgs, ComponentInputPrice_Methods_CLICK_BUTTON_DataArgs>,
}


export abstract class ComponentInputPriceBase extends ComponentBase<
    ComponentInputPricePropsType,
    ComponentInputPriceSchemaType,
    ComponentInputPriceTemplatesType,
    ComponentInputPriceMethodsType
> {

    _COMPONENT_PATTERN = defineComponentPatterns<ComponentInputPricePropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Pattern(this),
            ///----------------------
            [ComponentInputPriceConfigs.keys.prop_value.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_value.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_value.value,
                title:                                            Language.translate("components.public.props.prop_value.title"),
                description:                                      Language.translate("components.public.props.prop_value.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_title.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_title.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_title.value,
                title:                                            Language.translate("components.input.props.prop_title.title"),
                description:                                      Language.translate("components.input.props.prop_title.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_backgroundColorForm.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_backgroundColorForm.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_backgroundColorForm.value,
                title:                                            Language.translate("components.input.props.prop_backgroundColorForm.title"),
                description:                                      Language.translate("components.input.props.prop_backgroundColorForm.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_formBorderRadius.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_formBorderRadius.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_formBorderRadius.value,
                title:                                            Language.translate("components.input.props.prop_formBorderRadius.title"),
                description:                                      Language.translate("components.input.props.prop_formBorderRadius.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_colorIcon.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_colorIcon.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_colorIcon.value,
                title:                                            Language.translate("components.input.props.prop_colorIcon.title"),
                description:                                      Language.translate("components.input.props.prop_colorIcon.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_size.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_size.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_size.value,
                title:                                            Language.translate("components.input.props.prop_size.title"),
                description:                                      Language.translate("components.input.props.prop_size.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_inputClass.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_inputClass.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_inputClass.value,
                title:                                            Language.translate("components.input.props.prop_inputClass.title"),
                description:                                      Language.translate("components.input.props.prop_inputClass.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_inputStyles.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_inputStyles.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_inputStyles.value,
                title:                                            Language.translate("components.input.props.prop_inputStyles.title"),
                description:                                      Language.translate("components.input.props.prop_inputStyles.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_inputBorderColor.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_inputBorderColor.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_inputBorderColor.value,
                title:                                            Language.translate("components.input.props.prop_inputBorderColor.title"),
                description:                                      Language.translate("components.input.props.prop_inputBorderColor.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_inputBorderColorFocus.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_inputBorderColorFocus.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_inputBorderColorFocus.value,
                title:                                            Language.translate("components.input.props.prop_inputBorderColorFocus.title"),
                description:                                      Language.translate("components.input.props.prop_inputBorderColorFocus.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_inputBorderWidth.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_inputBorderWidth.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_inputBorderWidth.value,
                title:                                            Language.translate("components.input.props.prop_inputBorderWidth.title"),
                description:                                      Language.translate("components.input.props.prop_inputBorderWidth.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_inputBorderRadius.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_inputBorderRadius.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_inputBorderRadius.value,
                title:                                            Language.translate("components.input.props.prop_inputBorderRadius.title"),
                description:                                      Language.translate("components.input.props.prop_inputBorderRadius.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_type.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_type.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_type.value,
                title:                                            Language.translate("components.input.props.prop_type.title"),
                description:                                      Language.translate("components.input.props.prop_type.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_placeholder.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_placeholder.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_placeholder.value,
                title:                                            Language.translate("components.input.props.prop_placeholder.title"),
                description:                                      Language.translate("components.input.props.prop_placeholder.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_icon.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_icon.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_icon.value,
                title:                                            Language.translate("components.input.props.prop_icon.title"),
                description:                                      Language.translate("components.input.props.prop_icon.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_btnAddStatus.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_btnAddStatus.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_btnAddStatus.value,
                title:                                            Language.translate("components.input.props.prop_btnAddStatus.title"),
                description:                                      Language.translate("components.input.props.prop_btnAddStatus.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_btnAddIcon.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_btnAddIcon.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_btnAddIcon.value,
                title:                                            Language.translate("components.input.props.prop_btnAddIcon.title"),
                description:                                      Language.translate("components.input.props.prop_btnAddIcon.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_btnAddTitle.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_btnAddTitle.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_btnAddTitle.value,
                title:                                            Language.translate("components.input.props.prop_btnAddTitle.title"),
                description:                                      Language.translate("components.input.props.prop_btnAddTitle.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_btnAddClass.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_btnAddClass.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_btnAddClass.value,
                title:                                            Language.translate("components.input.props.prop_btnAddClass.title"),
                description:                                      Language.translate("components.input.props.prop_btnAddClass.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_btnColor.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_btnColor.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_btnColor.value,
                title:                                            Language.translate("components.input.props.prop_btnColor.title"),
                description:                                      Language.translate("components.input.props.prop_btnColor.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_isAbsoluteRule.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_isAbsoluteRule.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_isAbsoluteRule.value,
                title:                                            Language.translate("components.input.props.prop_isAbsoluteRule.title"),
                description:                                      Language.translate("components.input.props.prop_isAbsoluteRule.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_listRules.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_listRules.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_listRules.value,
                title:                                            Language.translate("components.input.props.prop_listRules.title"),
                description:                                      Language.translate("components.input.props.prop_listRules.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_msgRules.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_msgRules.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_msgRules.value,
                title:                                            Language.translate("components.input.props.prop_msgRules.title"),
                description:                                      Language.translate("components.input.props.prop_msgRules.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_calculator.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_calculator.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_calculator.value,
                title:                                            Language.translate("components.inputPrice.props.prop_calculator.title"),
                description:                                      Language.translate("components.inputPrice.props.prop_calculator.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_calculatorColor.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_calculatorColor.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_calculatorColor.value,
                title:                                            Language.translate("components.inputPrice.props.prop_calculatorColor.title"),
                description:                                      Language.translate("components.inputPrice.props.prop_calculatorColor.description"),
            },
            [ComponentInputPriceConfigs.keys.prop_information.name]: {
                prop:                                             ComponentInputPriceConfigs.keys.prop_information.name,
                default:                                          ComponentInputPriceConfigs.keys.prop_information.value,
                title:                                            Language.translate("components.inputPrice.props.prop_information.title"),
                description:                                      Language.translate("components.inputPrice.props.prop_information.description"),
            },
        }
    );

    _COMPONENT_SCHEMA = defineComponentSchema<ComponentInputPriceSchemaType, ComponentInputPricePropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Schema(this),
        ///----------------------
        FORM: {
            part:               ComponentInputPriceConfigs.schemas.FORM.name,
            title:              Language.translate("components.inputPrice.schema.form.title"),
            description:        Language.translate("components.inputPrice.schema.form.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_backgroundColorForm.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_formBorderRadius.name],
            ]
        },
        INPUT: {
            part:               ComponentInputPriceConfigs.schemas.INPUT.name,
            title:              Language.translate("components.inputPrice.schema.input.title"),
            description:        Language.translate("components.inputPrice.schema.input.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_inputClass.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_inputStyles.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_inputBorderColor.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_inputBorderColorFocus.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_inputBorderWidth.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_inputBorderRadius.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_type.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_name.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_placeholder.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_icon.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_btnAddStatus.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_size.name],
            ]
        },
        ICON_CLEAR: {
            part:               ComponentInputPriceConfigs.schemas.ICON_CLEAR.name,
            title:              Language.translate("components.inputPrice.schema.icon_clear.title"),
            description:        Language.translate("components.inputPrice.schema.icon_clear.description"),
            props: [
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_btnAddStatus.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_size.name],
            ]
        },
        ICON: {
            part:               ComponentInputPriceConfigs.schemas.ICON.name,
            title:              Language.translate("components.inputPrice.schema.icon.title"),
            description:        Language.translate("components.inputPrice.schema.icon.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_icon.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_colorIcon.name],
            ]
        },
        BUTTON: {
            part:               ComponentInputPriceConfigs.schemas.BUTTON.name,
            title:              Language.translate("components.inputPrice.schema.button.title"),
            description:        Language.translate("components.inputPrice.schema.button.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_btnAddStatus.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_btnAddIcon.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_btnAddTitle.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_btnAddClass.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_btnColor.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_inputBorderWidth.name],
            ]
        },
        VALIDATE: {
            part:               ComponentInputPriceConfigs.schemas.VALIDATE.name,
            title:              Language.translate("components.inputPrice.schema.validate.title"),
            description:        Language.translate("components.inputPrice.schema.validate.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_isAbsoluteRule.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_listRules.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_msgRules.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_title.name],
            ]
        },
        CALCULATOR: {
            part:               ComponentInputPriceConfigs.schemas.CALCULATOR.name,
            title:              Language.translate("components.inputPrice.schema.calculator.title"),
            description:        Language.translate("components.inputPrice.schema.calculator.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_calculator.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_calculatorColor.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
            ]
        },
        INFORMATION: {
            part:               ComponentInputPriceConfigs.schemas.INFORMATION.name,
            title:              Language.translate("components.inputPrice.schema.information.title"),
            description:        Language.translate("components.inputPrice.schema.information.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_information.name],
                this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_size.name],
            ]
        },
    });

    _COMPONENT_TEMPLATES = defineComponentTemplate<ComponentInputPriceTemplatesType, ComponentInputPricePropsType>({
        BODY: {
            title:                                            Language.translate("components.inputPrice.template.body.title"),
            description:                                      Language.translate("components.inputPrice.template.body.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentInputPriceConfigs.keys.prop_placeholder.name]
        },
    });

    _COMPONENT_METHODS = defineComponentMethods<ComponentInputPriceMethodsType, ComponentInputPricePropsType>({
        [ComponentInputPriceConfigs.methods.INPUT.name]: {
            title:                                            Language.translate("components.inputPrice.methods.fn_onInput.title"),
            description:                                      Language.translate("components.inputPrice.methods.fn_onInput.description"),
            args: {
                [ComponentInputPriceConfigs.methods.INPUT.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
            }
        },
        [ComponentInputPriceConfigs.methods.FOCUS.name]: {
            title:                                            Language.translate("components.inputPrice.methods.fn_onFocus.title"),
            description:                                      Language.translate("components.inputPrice.methods.fn_onFocus.description"),
            args: {
                [ComponentInputPriceConfigs.methods.FOCUS.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
            }
        },
        [ComponentInputPriceConfigs.methods.BLUR.name]: {
            title:                                            Language.translate("components.inputPrice.methods.fn_onBlur.title"),
            description:                                      Language.translate("components.inputPrice.methods.fn_onBlur.description"),
            args: {
                [ComponentInputPriceConfigs.methods.BLUR.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
            }
        },
        [ComponentInputPriceConfigs.methods.CLICK_BUTTON.name]: {
            title:                                            Language.translate("components.inputPrice.methods.fn_onClickButton.title"),
            description:                                      Language.translate("components.inputPrice.methods.fn_onClickButton.description"),
            args: {
                [ComponentInputPriceConfigs.methods.CLICK_BUTTON.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
            }
        },
    });

    static override renderExampleComponent(): HTMLElement {
        const valueObs = new Observable<string>("");

        const inputPriceComp = new ComponentInputPrice(
            <ComponentInputPricePropsType>{
                classList: ["col-md-3", "col-12", "border", "p-2"],
                prop_labelTitle: "Input Price Example",
                prop_labelTooltipDescription: "This is a price input with calculator and validation",
                prop_type: "string",
                prop_placeholder: "Enter price...",
                prop_value: valueObs,
                prop_size: SIZES.M,
                prop_icon: ToolsIcons.icon_search({ size: SIZES.S }),
                prop_btnAddStatus: true,
                prop_btnAddTitle: "Add",
                prop_calculator: [
                    { name: "tax", title: "Tax (9%)", coefficient: 0.09, extension: "$" },
                    { name: "total", title: "Total", coefficient: 1.09, extension: "$" },
                ],
                prop_calculatorColor: "var(--primaryColor1)",
                prop_information: [
                    { title: "Info", value: "Enter amount in USD", title_color: "#fff", title_backgroundColor: "var(--primaryColor1)" },
                ],
                prop_listRules: [
                    {
                        rule: "_not_empty",
                        description: "This field is required"
                    },
                    {
                        rule: "_is_number",
                        description: "Must be a valid number"
                    },
                ],
                prop_msgRules: null,
                prop_isAbsoluteRule: true,
            },
            <ComponentInputPriceMethodsType>{
                fn_onInput: (event, dataArgs, componentArgs) => {
                    valueObs.set((event.target as HTMLInputElement).value);
                    console.log("input price", dataArgs.VALUE);
                },
                fn_onFocus: (event, dataArgs, componentArgs) => {
                    console.log("focus price", dataArgs.VALUE);
                },
                fn_onBlur: (event, dataArgs, componentArgs) => {
                    console.log("blur price", dataArgs.VALUE);
                },
                fn_onClickButton: (event, dataArgs, componentArgs) => {
                    console.log("button click price", dataArgs.VALUE);
                },
            }
        );

        return inputPriceComp.getElement() as HTMLElement;
    }
}


export class ComponentInputPrice extends ComponentInputPriceBase {

    private var_inputValue = new Observable<string>("");
    private var_inputValueRaw = new Observable<string>("");

    constructor(
        config: ComponentInputPricePropsType,
        methods: ComponentInputPriceMethodsType,
        events = null
    ) {
        super("inputPrice", null);
        super.renderComponent(config, methods, events);
        this.fn_setupValueObservable();
    }


    override renderContentComponent() {
        return this.executeSchemaPart(ComponentInputPriceConfigs.schemas.FORM.name)
    }

    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentInputPriceConfigs.schemas.FORM.name:
                return this.template_render_form(attrsDefault, data, extra);
            case ComponentInputPriceConfigs.schemas.INPUT.name:
                return this.template_render_input(attrsDefault, data, extra);
            case ComponentInputPriceConfigs.schemas.ICON_CLEAR.name:
                return this.template_render_iconClear(attrsDefault, data, extra);
            case ComponentInputPriceConfigs.schemas.ICON.name:
                return this.template_render_icon(attrsDefault, data, extra);
            case ComponentInputPriceConfigs.schemas.BUTTON.name:
                return this.template_render_button(attrsDefault, data, extra);
            case ComponentInputPriceConfigs.schemas.VALIDATE.name:
                return this.template_render_validate(attrsDefault, data, extra);
            case ComponentInputPriceConfigs.schemas.CALCULATOR.name:
                return this.template_render_calculator(attrsDefault, data, extra);
            case ComponentInputPriceConfigs.schemas.INFORMATION.name:
                return this.template_render_information(attrsDefault, data, extra);
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    private template_render_form(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_backgroundColorForm = data[ComponentInputPriceConfigs.keys.prop_backgroundColorForm.name];
            const prop_formBorderRadius = data[ComponentInputPriceConfigs.keys.prop_formBorderRadius.name];

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-input-price-form-${this._COMPONENT_RANDOM_ID}`,
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
                            this.executeSchemaPart(ComponentInputPriceConfigs.schemas.INPUT.name),
                            this.executeSchemaPart(ComponentInputPriceConfigs.schemas.ICON_CLEAR.name),
                            this.executeSchemaPart(ComponentInputPriceConfigs.schemas.ICON.name),
                            this.executeSchemaPart(ComponentInputPriceConfigs.schemas.BUTTON.name),
                            this.executeSchemaPart(ComponentInputPriceConfigs.schemas.INFORMATION.name),
                        ]
                    }),
                    this.executeSchemaPart(ComponentInputPriceConfigs.schemas.VALIDATE.name),
                    this.executeSchemaPart(ComponentInputPriceConfigs.schemas.CALCULATOR.name),
                ]
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_input(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_inputClass = data[ComponentInputPriceConfigs.keys.prop_inputClass.name];
            const prop_inputStyles = data[ComponentInputPriceConfigs.keys.prop_inputStyles.name];
            const prop_inputBorderColor = data[ComponentInputPriceConfigs.keys.prop_inputBorderColor.name];
            const prop_inputBorderColorFocus = data[ComponentInputPriceConfigs.keys.prop_inputBorderColorFocus.name];
            const prop_inputBorderWidth = data[ComponentInputPriceConfigs.keys.prop_inputBorderWidth.name];
            const prop_inputBorderRadius = data[ComponentInputPriceConfigs.keys.prop_inputBorderRadius.name];
            const prop_type = data[ComponentInputPriceConfigs.keys.prop_type.name];
            const prop_name = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_name.name];
            const prop_value = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name];
            const prop_placeholder = data[ComponentInputPriceConfigs.keys.prop_placeholder.name];
            const prop_icon = data[ComponentInputPriceConfigs.keys.prop_icon.name];
            const prop_btnAddStatus = data[ComponentInputPriceConfigs.keys.prop_btnAddStatus.name];
            const prop_isDisable = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_size = data[ComponentInputPriceConfigs.keys.prop_size.name];

            const directionRtl = AppConfig.get("directionRtl");

            const inputValue = prop_value instanceof Observable
                ? prop_value
                : this.var_inputValue;

            if (prop_value instanceof Observable) {
                this.var_inputValue = prop_value;
            }

            const inputId = `component-input-price-input-${this._COMPONENT_RANDOM_ID}`;

            const formattedValue = (() => {
                const raw = prop_value instanceof Observable ? prop_value.get() : prop_value;
                if (raw == null || raw === "") return "";
                return ToolsConverter.convertPriceToString(raw) ?? "";
            })();

            this.var_inputValue.set(formattedValue);

            return ReactiveElement.input({
                attrs: {
                    ...attrsDefault,
                    "id": inputId,
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
                        const target = event.target as HTMLInputElement;
                        const raw = target.value;
                        const formatted = ToolsConverter.convertPriceToString(raw) ?? "";
                        target.value = formatted;
                        this.var_inputValue.set(formatted);
                        this.var_inputValueRaw.set(raw);
                        this.fn_updateCalculator();
                        const dataValue = this.fn_getValueInput();
                        const params: ComponentInputPrice_Methods_INPUT_DataArgs = {
                            [ComponentInputPriceConfigs.methods.INPUT.dataArgs.VALUE.name]: dataValue,
                        };
                        this.executeMethod(ComponentInputPriceConfigs.methods.INPUT.name, event, params);
                    },
                    focus: (event: Event) => {
                        const target = event.target as HTMLInputElement;
                        const raw = ToolsConverter.convertStringToPrice(target.value);
                        target.value = raw != null ? String(raw) : "";
                        this.fn_toggleInformation(true);
                        const dataValue = this.fn_getValueInput();
                        const params: ComponentInputPrice_Methods_FOCUS_DataArgs = {
                            [ComponentInputPriceConfigs.methods.FOCUS.dataArgs.VALUE.name]: dataValue,
                        };
                        this.executeMethod(ComponentInputPriceConfigs.methods.FOCUS.name, event, params);
                    },
                    blur: (event: Event) => {
                        const target = event.target as HTMLInputElement;
                        const formatted = ToolsConverter.convertPriceToString(target.value) ?? "";
                        target.value = formatted;
                        this.var_inputValue.set(formatted);
                        this.fn_toggleInformation(false);
                        const dataValue = this.fn_getValueInput();
                        const params: ComponentInputPrice_Methods_BLUR_DataArgs = {
                            [ComponentInputPriceConfigs.methods.BLUR.dataArgs.VALUE.name]: dataValue,
                        };
                        this.executeMethod(ComponentInputPriceConfigs.methods.BLUR.name, event, params);
                    },
                    keydown: (event: KeyboardEvent) => {
                        if (event.key === "Enter") {
                            const btnAddStatus = prop_btnAddStatus instanceof Observable ? prop_btnAddStatus.get() : prop_btnAddStatus;
                            if (btnAddStatus) {
                                event.preventDefault();
                                const dataValue = this.fn_getValueInput();
                                const params: ComponentInputPrice_Methods_CLICK_BUTTON_DataArgs = {
                                    [ComponentInputPriceConfigs.methods.CLICK_BUTTON.dataArgs.VALUE.name]: dataValue,
                                };
                                this.executeMethod(ComponentInputPriceConfigs.methods.CLICK_BUTTON.name, event, params);
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
            const prop_btnAddStatus = data[ComponentInputPriceConfigs.keys.prop_btnAddStatus.name];
            const prop_size = data[ComponentInputPriceConfigs.keys.prop_size.name];

            const directionRtl = AppConfig.get("directionRtl");

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (isDisable: boolean, btnAddStatus: boolean, size: any) => {
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
                            prop_icon: ToolsIcons.icon_close({ size: sizeName }),
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
            const prop_icon = data[ComponentInputPriceConfigs.keys.prop_icon.name];
            const prop_size = data[ComponentInputPriceConfigs.keys.prop_size.name];
            const prop_colorIcon = data[ComponentInputPriceConfigs.keys.prop_colorIcon.name];

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
            const prop_btnAddStatus = data[ComponentInputPriceConfigs.keys.prop_btnAddStatus.name];
            const prop_btnAddIcon = data[ComponentInputPriceConfigs.keys.prop_btnAddIcon.name];
            const prop_btnAddTitle = data[ComponentInputPriceConfigs.keys.prop_btnAddTitle.name];
            const prop_btnAddClass = data[ComponentInputPriceConfigs.keys.prop_btnAddClass.name];
            const prop_btnColor = data[ComponentInputPriceConfigs.keys.prop_btnColor.name];
            const prop_size = data[ComponentInputPriceConfigs.keys.prop_size.name];
            const prop_inputBorderWidth = data[ComponentInputPriceConfigs.keys.prop_inputBorderWidth.name];

            const directionRtl = AppConfig.get("directionRtl");

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (btnAddStatus: boolean, btnAddIcon: any, btnAddTitle: any, btnAddClass: any, btnColor: any, size: any, inputBorderWidth: any) => {
                        if (!btnAddStatus) return null;

                        const sizeName = size ?? SIZES.M;
                        const borderWidthSize = inputBorderWidth ?? SIZES.M;
                        const borderOffset = Math.round(ToolsCss.getHeightSize(borderWidthSize) / 7);

                        const btnAddClassArr = btnAddClass ?? [];
                        const btnProps: any = {
                            classList: [],
                            styles: {},
                            prop_btnClass: ["shadow-sm", "px-3", ...btnAddClassArr],
                            prop_btnStyles: {
                                cursor: "pointer",
                                width: "160px",
                            },
                            prop_btnBorderRadius: null,
                            prop_btnTitle: btnAddTitle ?? "add item",
                            prop_type: btnColor ?? ComponentButton_Types.SUBMIT,
                            prop_btnType: "button",
                            prop_btnIcon: btnAddIcon ?? "&plus;",
                            prop_size: sizeName,
                            prop_btnBorderWidth: 0
                        };

                        const btnEl = new ToolsComponents.ComponentButton(
                            btnProps as ComponentButtonPropsType,
                            <ComponentButtonMethodsType>{
                                fn_onClickButton: (event, dataArgs, componentArgs) => {
                                    event.stopPropagation();
                                    const dataValue = this.fn_getValueInput();
                                    const params: ComponentInputPrice_Methods_CLICK_BUTTON_DataArgs = {
                                        [ComponentInputPriceConfigs.methods.CLICK_BUTTON.dataArgs.VALUE.name]: dataValue,
                                    };
                                    this.executeMethod(ComponentInputPriceConfigs.methods.CLICK_BUTTON.name, event, params);
                                }
                            }
                        );

                        const posProps: any = {
                            classList: [],
                            styles: {},
                            prop_positionType: ComponentElementPosition_positionTypes.ABSOLUTE,
                            prop_positionTop: SizeUnit(borderOffset, UNITS.PEXEL),
                            prop_positionZIndex: 10,
                            prop_positionStyles: {
                                cursor: "pointer",
                                width: "160px",
                            },
                            prop_content: btnEl.getReactiveElement(),
                        };
                        if (directionRtl) {
                            posProps.prop_positionLeft = SizeUnit(borderOffset, UNITS.PEXEL);
                        } else {
                            posProps.prop_positionRight = SizeUnit(borderOffset, UNITS.PEXEL);
                        }

                        return new ComponentElementPosition(
                            posProps as ComponentElementPositionPropsType,
                            <ComponentElementPositionMethodsType>{}
                        ).getReactiveElement();
                    },
                    [prop_btnAddStatus, prop_btnAddIcon, prop_btnAddTitle, prop_btnAddClass, prop_btnColor, prop_size, prop_inputBorderWidth],
                    this.getScope()
                ),
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_validate(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_isDisable = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_isAbsoluteRule = data[ComponentInputPriceConfigs.keys.prop_isAbsoluteRule.name];
            const prop_listRules = data[ComponentInputPriceConfigs.keys.prop_listRules.name];
            const prop_msgRules = data[ComponentInputPriceConfigs.keys.prop_msgRules.name];
            const prop_title = data[ComponentInputPriceConfigs.keys.prop_title.name];

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-input-price-validate-${this._COMPONENT_RANDOM_ID}`,
                },
                className: ["position-relative"],
                children: [
                    ReactiveElement.part("section", {
                        attrs: { ...attrsDefault },
                        children: Observable.computed(
                            (isDisable: boolean, isAbsoluteRule: any, listRules: any, msgRules: any, title: any) => {
                                if (isDisable) return null;
                                if (!Array.isArray(listRules) || listRules.length === 0) return null;

                                return new ToolsComponents.ComponentValidate(
                                    <ComponentValidatePropsType>{
                                        classList: ["mt-1"],
                                        prop_reference: `component-input-price-input-${this._COMPONENT_RANDOM_ID}`,
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


    private template_render_calculator(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_size = data[ComponentInputPriceConfigs.keys.prop_size.name];
            const prop_calculator = data[ComponentInputPriceConfigs.keys.prop_calculator.name];
            const prop_calculatorColor = data[ComponentInputPriceConfigs.keys.prop_calculatorColor.name];
            const prop_value = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name];

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-input-price-calculator-${this._COMPONENT_RANDOM_ID}`,
                },
                children: Observable.computed(
                    (size: any, calculator: any, calculatorColor: any, value: any) => {
                        if (!calculator || !Array.isArray(calculator) || calculator.length === 0) return null;

                        const sizeName = size ?? SIZES.M;
                        const elHeight = ToolsCss.getHeightSize(sizeName);
                        const elFontSize = ToolsCss.getFontSize(sizeName);

                        const rawValue = value instanceof Observable ? value.get() : value;
                        const numValue = ToolsConverter.convertStringToPrice(rawValue ?? "0") ?? 0;

                        const children: ReactiveElement[] = calculator.map((item: CalculatorItem) => {
                            const coefficient = item.coefficient ?? 1;
                            const calcValue = coefficient * numValue;
                            const formatted = ToolsConverter.convertPriceToString(calcValue) ?? "0";

                            return ReactiveElement.part("div", {
                                styles: {
                                    lineHeight: `${elHeight}px`,
                                    fontSize: `${elFontSize}px`,
                                },
                                children: [
                                    `${item.title ?? ""}: `,
                                    ReactiveElement.part("b", {
                                        attrs: {
                                            "data-calc-name": item.name ?? "",
                                        },
                                        className: [`component-input-price-coefficient-text-${this._COMPONENT_RANDOM_ID}-${item.name ?? ""}`, "mx-2"],
                                        styles: {
                                            color: calculatorColor ?? "",
                                        },
                                        children: [formatted],
                                    }),
                                    ReactiveElement.part("b", {
                                        children: [item.extension ?? ""],
                                    }),
                                ]
                            });
                        });

                        return ReactiveElement.part("section", {
                            children: children
                        });
                    },
                    [prop_size, prop_calculator, prop_calculatorColor, prop_value],
                    this.getScope()
                ),
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_information(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_information = data[ComponentInputPriceConfigs.keys.prop_information.name];
            const prop_size = data[ComponentInputPriceConfigs.keys.prop_size.name];

            const directionRtl = AppConfig.get("directionRtl");

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (information: any, size: any) => {
                        if (!information || !Array.isArray(information) || information.length === 0) return null;

                        const sizeName = size ?? SIZES.M;
                        const elHeight = ToolsCss.getHeightSize(sizeName);
                        const elFontSize = ToolsCss.getFontSize(sizeName);

                        const infoChildren: ReactiveElement[] = information.map((item: InformationItem) => {
                            return ReactiveElement.part("div", {
                                className: ["d-md-block", "mb-1"],
                                styles: {
                                    backgroundColor: item.value_backgroundColor ?? "",
                                },
                                children: [
                                    ReactiveElement.part("p", {
                                        className: ["text-center", "p-0", "m-0"],
                                        styles: {
                                            height: `${elHeight}px`,
                                            fontSize: `${elFontSize}px`,
                                            backgroundColor: item.title_backgroundColor ?? "",
                                            color: item.title_color ?? "",
                                        },
                                        children: [item.title],
                                    }),
                                    ReactiveElement.part("p", {
                                        className: ["p-0", "m-0", "text-center"],
                                        styles: {
                                            height: `${elHeight}px`,
                                            fontSize: `${elFontSize}px`,
                                            color: item.value_color ?? "",
                                        },
                                        children: [item.value ?? "---"],
                                    }),
                                ]
                            });
                        });

                        const posProps: any = {
                            classList: ["d-none"],
                            styles: {},
                            prop_width: "250px",
                            prop_height: null,
                            prop_content: ReactiveElement.part("section", {
                                className: ["border", "shadow-sm", "bg-white", "px-2", "py-1"],
                                styles: {
                                    zIndex: "11",
                                },
                                children: infoChildren
                            }).getElement() as any,
                            prop_elementClass: ["border", "shadow-sm", "bg-white", "px-2", "py-1"],
                            prop_elementStyles: {
                                zIndex: "11",
                            },
                            prop_positionTop: `${elHeight + 2}px`,
                        };
                        if (directionRtl) {
                            posProps.prop_positionLeft = 0;
                        } else {
                            posProps.prop_positionRight = 0;
                        }

                        return new ComponentElementPosition(
                            posProps as ComponentElementPositionPropsType,
                            <ComponentElementPositionMethodsType>{}
                        ).getReactiveElement();
                    },
                    [prop_information, prop_size],
                    this.getScope()
                ),
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private fn_setupValueObservable() {
        const propValueObs = this.getObservable(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name);
        if (propValueObs != null) {
            this.var_inputValue = propValueObs;
        }
    }

    fn_getValueInput(): {value: number | null, calcs: Record<string, number>} {
        const inputEl = document.querySelector(`input#component-input-price-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
        let inputValue = "0";
        if (inputEl) {
            inputValue = inputEl.value;
        }

        const prop_calculator = this.get(ComponentInputPriceConfigs.keys.prop_calculator.name) ?? null;

        let calcs: Record<string, number> = {};
        if (prop_calculator != null && Array.isArray(prop_calculator)) {
            for (const itemCalc of prop_calculator) {
                const name = itemCalc?.name ?? null;
                if (name != null) {
                    const coefficient = itemCalc?.coefficient ?? 1;
                    const value = coefficient * (ToolsConverter.convertStringToPrice(inputValue) ?? 0);
                    calcs[name] = value;
                    const el = document.querySelector(`.component-input-price-coefficient-text-${this._COMPONENT_RANDOM_ID}-${name}`);
                    if (el) {
                        el.textContent = ToolsConverter.convertPriceToString(value) ?? "0";
                    }
                }
            }
        }

        return {value: ToolsConverter.convertStringToPrice(inputValue), calcs};
    }

    fn_updateCalculator() {
        const prop_calculator = this.get(ComponentInputPriceConfigs.keys.prop_calculator.name) ?? null;
        if (prop_calculator != null && Array.isArray(prop_calculator)) {
            const inputEl = document.querySelector(`input#component-input-price-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
            const inputValue = inputEl ? inputEl.value : "0";
            for (const itemCalc of prop_calculator) {
                const name = itemCalc?.name ?? null;
                if (name != null) {
                    const coefficient = itemCalc?.coefficient ?? 1;
                    const value = coefficient * (ToolsConverter.convertStringToPrice(inputValue) ?? 0);
                    const el = document.querySelector(`.component-input-price-coefficient-text-${this._COMPONENT_RANDOM_ID}-${name}`);
                    if (el) {
                        el.textContent = ToolsConverter.convertPriceToString(value) ?? "0";
                    }
                }
            }
        }
    }

    fn_toggleInformation(show: boolean) {
        const infoEl = document.querySelector(`#component-input-price-form-${this._COMPONENT_RANDOM_ID} [data-part-name="${ComponentInputPriceConfigs.schemas.INFORMATION.name}"]`);
        if (infoEl) {
            if (show) {
                infoEl.classList.remove("d-none");
            } else {
                infoEl.classList.add("d-none");
            }
        }
    }

    fn_onClearInput(event: Event) {
        const inputEl = document.querySelector(`input#component-input-price-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
        if (inputEl) {
            inputEl.value = "";
        }
        this.var_inputValue.set("");
        this.fn_updateCalculator();
        const dataValue = this.fn_getValueInput();
        const params: ComponentInputPrice_Methods_INPUT_DataArgs = {
            [ComponentInputPriceConfigs.methods.INPUT.dataArgs.VALUE.name]: dataValue,
        };
        this.executeMethod(ComponentInputPriceConfigs.methods.INPUT.name, event, params);
        this.fn_onFocusInput(event);
    }

    fn_onFocusInput(event: Event) {
        const inputEl = document.querySelector(`input#component-input-price-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
        if (inputEl) {
            inputEl.focus();
        }
        const dataValue = this.fn_getValueInput();
        const params: ComponentInputPrice_Methods_FOCUS_DataArgs = {
            [ComponentInputPriceConfigs.methods.FOCUS.dataArgs.VALUE.name]: dataValue,
        };
        this.executeMethod(ComponentInputPriceConfigs.methods.FOCUS.name, event, params);
    }

    call_setValue(value: string | number) {
        const inputEl = document.querySelector(`input#component-input-price-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
        if (inputEl) {
            inputEl.value = ToolsConverter.convertPriceToString(value) ?? "";
        }
        this.fn_updateCalculator();
        const dataValue = this.fn_getValueInput();
        const params: ComponentInputPrice_Methods_INPUT_DataArgs = {
            [ComponentInputPriceConfigs.methods.INPUT.dataArgs.VALUE.name]: dataValue,
        };
        this.executeMethod(ComponentInputPriceConfigs.methods.INPUT.name, new Event("input"), params);
    }

}

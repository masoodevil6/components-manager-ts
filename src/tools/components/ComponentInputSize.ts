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
    IconsType,
    SIZES, SizeUnit, UNITS,
    ToolsComponents_BorderRadius,
    ToolsComponents_BorderWidth,
    OPERATION,
    SizeCalc,
    Z_INDEXES,
    IconsSourceType,
    Color,
    COLORS_MAIN,
    COLORS_GRAD
} from "../../utils/ToolsConsts";
import {IconOptions, IconString} from "../icons/index";

export type IconGeneratorType = (options?: IconOptions) => IconString;
import {TOOLS} from "../tools";
import {ToolsIcons} from "../icons";
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



export const ComponentInputSizeProps = {
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
    prop_iconPositive:                     "prop_iconPositive",
    prop_iconNegetive:                     "prop_iconNegetive",
    prop_iconColor:                        "prop_iconColor" ,
    prop_min:                              "prop_min",
    prop_max:                              "prop_max",
    prop_isAbsoluteRule:                   "prop_isAbsoluteRule",
    prop_listRules:                        "prop_listRules",
    prop_msgRules:                         "prop_msgRules",
} as const;



const ComponentInputSizeConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys,
        ///----------------------
        [ComponentInputSizeProps.prop_title]: {
            name:               ComponentInputSizeProps.prop_title,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentInputSizeProps.prop_backgroundColorForm]: {
            name:               ComponentInputSizeProps.prop_backgroundColorForm,
            value:              GOG_SetValue<string>("var(--secondaryColor1)"),
        },
        [ComponentInputSizeProps.prop_formBorderRadius]: {
            name:               ComponentInputSizeProps.prop_formBorderRadius,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES>>(SIZES.M),
        },
        [ComponentInputSizeProps.prop_colorIcon]: {
            name:               ComponentInputSizeProps.prop_colorIcon,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentInputSizeProps.prop_size]: {
            name:               ComponentInputSizeProps.prop_size,
            value:              GOG_SetValue<string>(SIZES.M),
        },
        [ComponentInputSizeProps.prop_inputClass]: {
            name:               ComponentInputSizeProps.prop_inputClass,
            value:              GOG_SetValue<string[]>(["form-control", "border", "border-1"]),
        },
        [ComponentInputSizeProps.prop_inputStyles]: {
            name:               ComponentInputSizeProps.prop_inputStyles,
            value:              GOG_SetValue<Record<string, string>>({}),
        },
        [ComponentInputSizeProps.prop_inputBorderColor]: {
            name:               ComponentInputSizeProps.prop_inputBorderColor,
            value:              GOG_SetValue<string>("var(--primaryColor1)"),
        },
        [ComponentInputSizeProps.prop_inputBorderColorFocus]: {
            name:               ComponentInputSizeProps.prop_inputBorderColorFocus,
            value:              GOG_SetValue<string>("var(--secondaryColor1)"),
        },
        [ComponentInputSizeProps.prop_inputBorderWidth]: {
            name:               ComponentInputSizeProps.prop_inputBorderWidth,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES>>(SIZES.M),
        },
        [ComponentInputSizeProps.prop_inputBorderRadius]: {
            name:               ComponentInputSizeProps.prop_inputBorderRadius,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES>>(SIZES.M),
        },
        [ComponentInputSizeProps.prop_placeholder]: {
            name:               ComponentInputSizeProps.prop_placeholder,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentInputSizeProps.prop_icon]: {
            name:               ComponentInputSizeProps.prop_icon,
            value:              GOG_SetValue<IconsType | null>(null),
        },
        [ComponentInputSizeProps.prop_iconPositive]: {
            name:               ComponentInputSizeProps.prop_iconPositive,
            value:              GOG_SetValue<IconsSourceType>(ToolsIcons.icon_plus_badge),
        },
        [ComponentInputSizeProps.prop_iconNegetive]: {
            name:               ComponentInputSizeProps.prop_iconNegetive,
            value:              GOG_SetValue<IconsSourceType>(ToolsIcons.icon_minus_badge),
        },
        [ComponentInputSizeProps.prop_iconColor]: {
            name:               ComponentInputSizeProps.prop_iconColor,
            value:              GOG_SetValue<Color | null>(   Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1 )),
        },
        [ComponentInputSizeProps.prop_min]: {
            name:               ComponentInputSizeProps.prop_min,
            value:              GOG_SetValue<number | null>(null),
        },
        [ComponentInputSizeProps.prop_max]: {
            name:               ComponentInputSizeProps.prop_max,
            value:              GOG_SetValue<number | null>(null),
        },
        [ComponentInputSizeProps.prop_isAbsoluteRule]: {
            name:               ComponentInputSizeProps.prop_isAbsoluteRule,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentInputSizeProps.prop_listRules]: {
            name:               ComponentInputSizeProps.prop_listRules,
            value:              GOG_SetValue<any[]>([]),
        },
        [ComponentInputSizeProps.prop_msgRules]: {
            name:               ComponentInputSizeProps.prop_msgRules,
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
        FORM: { name: "part_form" },
        INPUT: { name: "part_input" },
        ICON_CLEAR: { name: "part_icon_clear" },
        ICON: { name: "part_icon" },
        BUTTON_POSITIVE: { name: "part_button_positive" },
        BUTTON_NEGATIVE: { name: "part_button_negative" },
        VALIDATE: { name: "part_validate" },
    },
    templates: {
        BODY: { name: "body" },
    },
    methods: {
        INPUT: {
            name: "fn_onInput",
            dataArgs: { VALUE: { name: "VALUE", value: GOG_SetValue<string>("") } },
            componentArgs: {}
        },
        FOCUS: {
            name: "fn_onFocus",
            dataArgs: { VALUE: { name: "VALUE", value: GOG_SetValue<string>("") } },
            componentArgs: {}
        },
        BLUR: {
            name: "fn_onBlur",
            dataArgs: { VALUE: { name: "VALUE", value: GOG_SetValue<string>("") } },
            componentArgs: {}
        },
        CLICK_POSITIVE: {
            name: "fn_onClickPositive",
            dataArgs: { VALUE: { name: "VALUE", value: GOG_SetValue<string>("") } },
            componentArgs: {}
        },
        CLICK_NEGATIVE: {
            name: "fn_onClickNegative",
            dataArgs: { VALUE: { name: "VALUE", value: GOG_SetValue<string>("") } },
            componentArgs: {}
        },
    }
} as const;



export type ComponentInputSizePropsType = GOG_ExtractNameValue<typeof ComponentInputSizeConfigs.keys>
export type ComponentInputSizeSchemaType = GOG_ExtractName<typeof ComponentInputSizeConfigs.schemas>
export type ComponentInputSizeTemplatesType = GOG_ExtractName<typeof ComponentInputSizeConfigs.templates>

export type ComponentInputSize_Methods_INPUT_ComponentArgs = GOG_ExtractName<typeof ComponentInputSizeConfigs.methods.INPUT.componentArgs>
export type ComponentInputSize_Methods_INPUT_DataArgs = GOG_ExtractNameValue<typeof ComponentInputSizeConfigs.methods.INPUT.dataArgs>
export type ComponentInputSize_Methods_FOCUS_ComponentArgs = GOG_ExtractName<typeof ComponentInputSizeConfigs.methods.FOCUS.componentArgs>
export type ComponentInputSize_Methods_FOCUS_DataArgs = GOG_ExtractNameValue<typeof ComponentInputSizeConfigs.methods.FOCUS.dataArgs>
export type ComponentInputSize_Methods_BLUR_ComponentArgs = GOG_ExtractName<typeof ComponentInputSizeConfigs.methods.BLUR.componentArgs>
export type ComponentInputSize_Methods_BLUR_DataArgs = GOG_ExtractNameValue<typeof ComponentInputSizeConfigs.methods.BLUR.dataArgs>
export type ComponentInputSize_Methods_CLICK_POSITIVE_ComponentArgs = GOG_ExtractName<typeof ComponentInputSizeConfigs.methods.CLICK_POSITIVE.componentArgs>
export type ComponentInputSize_Methods_CLICK_POSITIVE_DataArgs = GOG_ExtractNameValue<typeof ComponentInputSizeConfigs.methods.CLICK_POSITIVE.dataArgs>
export type ComponentInputSize_Methods_CLICK_NEGATIVE_ComponentArgs = GOG_ExtractName<typeof ComponentInputSizeConfigs.methods.CLICK_NEGATIVE.componentArgs>
export type ComponentInputSize_Methods_CLICK_NEGATIVE_DataArgs = GOG_ExtractNameValue<typeof ComponentInputSizeConfigs.methods.CLICK_NEGATIVE.dataArgs>

export type ComponentInputSizeMethodsType = {
    [ComponentInputSizeConfigs.methods.INPUT.name]: ComponentCallBackType<ComponentInputSize_Methods_INPUT_ComponentArgs, ComponentInputSize_Methods_INPUT_DataArgs>,
    [ComponentInputSizeConfigs.methods.FOCUS.name]: ComponentCallBackType<ComponentInputSize_Methods_FOCUS_ComponentArgs, ComponentInputSize_Methods_FOCUS_DataArgs>,
    [ComponentInputSizeConfigs.methods.BLUR.name]: ComponentCallBackType<ComponentInputSize_Methods_BLUR_ComponentArgs, ComponentInputSize_Methods_BLUR_DataArgs>,
    [ComponentInputSizeConfigs.methods.CLICK_POSITIVE.name]: ComponentCallBackType<ComponentInputSize_Methods_CLICK_POSITIVE_ComponentArgs, ComponentInputSize_Methods_CLICK_POSITIVE_DataArgs>,
    [ComponentInputSizeConfigs.methods.CLICK_NEGATIVE.name]: ComponentCallBackType<ComponentInputSize_Methods_CLICK_NEGATIVE_ComponentArgs, ComponentInputSize_Methods_CLICK_NEGATIVE_DataArgs>,
}



export abstract class ComponentInputSizeBase extends ComponentBase<
    ComponentInputSizePropsType,
    ComponentInputSizeSchemaType,
    ComponentInputSizeTemplatesType,
    ComponentInputSizeMethodsType
> {

    _COMPONENT_PATTERN = defineComponentPatterns<ComponentInputSizePropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Pattern(this),
            ///----------------------
            [ComponentInputSizeConfigs.keys.prop_value.name]: {
                prop: ComponentInputSizeConfigs.keys.prop_value.name,
                default: ComponentInputSizeConfigs.keys.prop_value.value,
                title: Language.translate("components.public.props.prop_value.title"),
                description: Language.translate("components.public.props.prop_value.description"),
            },
            [ComponentInputSizeConfigs.keys.prop_title.name]: {
                prop: ComponentInputSizeConfigs.keys.prop_title.name,
                default: ComponentInputSizeConfigs.keys.prop_title.value,
                title: Language.translate("components.input.props.prop_title.title"),
                description: Language.translate("components.input.props.prop_title.description"),
            },
            [ComponentInputSizeConfigs.keys.prop_backgroundColorForm.name]: {
                prop: ComponentInputSizeConfigs.keys.prop_backgroundColorForm.name,
                default: ComponentInputSizeConfigs.keys.prop_backgroundColorForm.value,
                title: Language.translate("components.input.props.prop_backgroundColorForm.title"),
                description: Language.translate("components.input.props.prop_backgroundColorForm.description"),
            },
            [ComponentInputSizeConfigs.keys.prop_formBorderRadius.name]: {
                prop: ComponentInputSizeConfigs.keys.prop_formBorderRadius.name,
                default: ComponentInputSizeConfigs.keys.prop_formBorderRadius.value,
                title: Language.translate("components.input.props.prop_formBorderRadius.title"),
                description: Language.translate("components.input.props.prop_formBorderRadius.description"),
            },
            [ComponentInputSizeConfigs.keys.prop_colorIcon.name]: {
                prop: ComponentInputSizeConfigs.keys.prop_colorIcon.name,
                default: ComponentInputSizeConfigs.keys.prop_colorIcon.value,
                title: Language.translate("components.input.props.prop_colorIcon.title"),
                description: Language.translate("components.input.props.prop_colorIcon.description"),
            },
            [ComponentInputSizeConfigs.keys.prop_size.name]: {
                prop: ComponentInputSizeConfigs.keys.prop_size.name,
                default: ComponentInputSizeConfigs.keys.prop_size.value,
                title: Language.translate("components.input.props.prop_size.title"),
                description: Language.translate("components.input.props.prop_size.description"),
            },
            [ComponentInputSizeConfigs.keys.prop_inputClass.name]: {
                prop: ComponentInputSizeConfigs.keys.prop_inputClass.name,
                default: ComponentInputSizeConfigs.keys.prop_inputClass.value,
                title: Language.translate("components.input.props.prop_inputClass.title"),
                description: Language.translate("components.input.props.prop_inputClass.description"),
            },
            [ComponentInputSizeConfigs.keys.prop_inputStyles.name]: {
                prop: ComponentInputSizeConfigs.keys.prop_inputStyles.name,
                default: ComponentInputSizeConfigs.keys.prop_inputStyles.value,
                title: Language.translate("components.input.props.prop_inputStyles.title"),
                description: Language.translate("components.input.props.prop_inputStyles.description"),
            },
            [ComponentInputSizeConfigs.keys.prop_inputBorderColor.name]: {
                prop: ComponentInputSizeConfigs.keys.prop_inputBorderColor.name,
                default: ComponentInputSizeConfigs.keys.prop_inputBorderColor.value,
                title: Language.translate("components.input.props.prop_inputBorderColor.title"),
                description: Language.translate("components.input.props.prop_inputBorderColor.description"),
            },
            [ComponentInputSizeConfigs.keys.prop_inputBorderColorFocus.name]: {
                prop: ComponentInputSizeConfigs.keys.prop_inputBorderColorFocus.name,
                default: ComponentInputSizeConfigs.keys.prop_inputBorderColorFocus.value,
                title: Language.translate("components.input.props.prop_inputBorderColorFocus.title"),
                description: Language.translate("components.input.props.prop_inputBorderColorFocus.description"),
            },
            [ComponentInputSizeConfigs.keys.prop_inputBorderWidth.name]: {
                prop: ComponentInputSizeConfigs.keys.prop_inputBorderWidth.name,
                default: ComponentInputSizeConfigs.keys.prop_inputBorderWidth.value,
                title: Language.translate("components.input.props.prop_inputBorderWidth.title"),
                description: Language.translate("components.input.props.prop_inputBorderWidth.description"),
            },
            [ComponentInputSizeConfigs.keys.prop_inputBorderRadius.name]: {
                prop: ComponentInputSizeConfigs.keys.prop_inputBorderRadius.name,
                default: ComponentInputSizeConfigs.keys.prop_inputBorderRadius.value,
                title: Language.translate("components.input.props.prop_inputBorderRadius.title"),
                description: Language.translate("components.input.props.prop_inputBorderRadius.description"),
            },
            [ComponentInputSizeConfigs.keys.prop_placeholder.name]: {
                prop: ComponentInputSizeConfigs.keys.prop_placeholder.name,
                default: ComponentInputSizeConfigs.keys.prop_placeholder.value,
                title: Language.translate("components.input.props.prop_placeholder.title"),
                description: Language.translate("components.input.props.prop_placeholder.description"),
            },
            [ComponentInputSizeConfigs.keys.prop_icon.name]: {
                prop: ComponentInputSizeConfigs.keys.prop_icon.name,
                default: ComponentInputSizeConfigs.keys.prop_icon.value,
                title: Language.translate("components.input.props.prop_icon.title"),
                description: Language.translate("components.input.props.prop_icon.description"),
            },
            [ComponentInputSizeConfigs.keys.prop_iconPositive.name]: {
                prop: ComponentInputSizeConfigs.keys.prop_iconPositive.name,
                default: ComponentInputSizeConfigs.keys.prop_iconPositive.value,
                title: Language.translate("components.input_size.props.prop_iconPositive.title"),
                description: Language.translate("components.input_size.props.prop_iconPositive.description"),
            },
            [ComponentInputSizeConfigs.keys.prop_iconNegetive.name]: {
                prop: ComponentInputSizeConfigs.keys.prop_iconNegetive.name,
                default: ComponentInputSizeConfigs.keys.prop_iconNegetive.value,
                title: Language.translate("components.input_size.props.prop_iconNegetive.title"),
                description: Language.translate("components.input_size.props.prop_iconNegetive.description"),
            },
            [ComponentInputSizeConfigs.keys.prop_iconColor.name]: {
                prop: ComponentInputSizeConfigs.keys.prop_iconColor.name,
                default: ComponentInputSizeConfigs.keys.prop_iconColor.value,
                title: Language.translate("components.input_size.props.prop_iconColor.title"),
                description: Language.translate("components.input_size.props.prop_iconColor.description"),
            },
            [ComponentInputSizeConfigs.keys.prop_min.name]: {
                prop: ComponentInputSizeConfigs.keys.prop_min.name,
                default: ComponentInputSizeConfigs.keys.prop_min.value,
                title: Language.translate("components.input_size.props.prop_min.title"),
                description: Language.translate("components.input_size.props.prop_min.description"),
            },
            [ComponentInputSizeConfigs.keys.prop_max.name]: {
                prop: ComponentInputSizeConfigs.keys.prop_max.name,
                default: ComponentInputSizeConfigs.keys.prop_max.value,
                title: Language.translate("components.input_size.props.prop_max.title"),
                description: Language.translate("components.input_size.props.prop_max.description"),
            },
            [ComponentInputSizeConfigs.keys.prop_isAbsoluteRule.name]: {
                prop: ComponentInputSizeConfigs.keys.prop_isAbsoluteRule.name,
                default: ComponentInputSizeConfigs.keys.prop_isAbsoluteRule.value,
                title: Language.translate("components.input.props.prop_isAbsoluteRule.title"),
                description: Language.translate("components.input.props.prop_isAbsoluteRule.description"),
            },
            [ComponentInputSizeConfigs.keys.prop_listRules.name]: {
                prop: ComponentInputSizeConfigs.keys.prop_listRules.name,
                default: ComponentInputSizeConfigs.keys.prop_listRules.value,
                title: Language.translate("components.input.props.prop_listRules.title"),
                description: Language.translate("components.input.props.prop_listRules.description"),
            },
            [ComponentInputSizeConfigs.keys.prop_msgRules.name]: {
                prop: ComponentInputSizeConfigs.keys.prop_msgRules.name,
                default: ComponentInputSizeConfigs.keys.prop_msgRules.value,
                title: Language.translate("components.input.props.prop_msgRules.title"),
                description: Language.translate("components.input.props.prop_msgRules.description"),
            },
        }
    );

    _COMPONENT_SCHEMA = defineComponentSchema<ComponentInputSizeSchemaType, ComponentInputSizePropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Schema(this),
        ///----------------------
        FORM: {
            part: ComponentInputSizeConfigs.schemas.FORM.name,
            title: Language.translate("components.input_size.schema.form.title"),
            description: Language.translate("components.input_size.schema.form.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_backgroundColorForm.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_formBorderRadius.name],
            ]
        },
        INPUT: {
            part: ComponentInputSizeConfigs.schemas.INPUT.name,
            title: Language.translate("components.input_size.schema.input.title"),
            description: Language.translate("components.input_size.schema.input.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_inputClass.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_inputStyles.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_inputBorderColor.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_inputBorderColorFocus.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_inputBorderWidth.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_inputBorderRadius.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_name.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_placeholder.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_icon.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_min.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_max.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_size.name],
            ]
        },
        ICON_CLEAR: {
            part: ComponentInputSizeConfigs.schemas.ICON_CLEAR.name,
            title: Language.translate("components.input_size.schema.icon_clear.title"),
            description: Language.translate("components.input_size.schema.icon_clear.description"),
            props: [
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_size.name],
            ]
        },
        ICON: {
            part: ComponentInputSizeConfigs.schemas.ICON.name,
            title: Language.translate("components.input_size.schema.icon.title"),
            description: Language.translate("components.input_size.schema.icon.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_icon.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_colorIcon.name],
            ]
        },
        BUTTON_POSITIVE: {
            part: ComponentInputSizeConfigs.schemas.BUTTON_POSITIVE.name,
            title: Language.translate("components.input_size.schema.button_positive.title"),
            description: Language.translate("components.input_size.schema.button_positive.description"),
            props: [
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_iconPositive.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_iconColor.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_inputBorderWidth.name],
            ]
        },
        BUTTON_NEGATIVE: {
            part: ComponentInputSizeConfigs.schemas.BUTTON_NEGATIVE.name,
            title: Language.translate("components.input_size.schema.button_negative.title"),
            description: Language.translate("components.input_size.schema.button_negative.description"),
            props: [
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_iconNegetive.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_iconColor.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_inputBorderWidth.name],
            ]
        },
        VALIDATE: {
            part: ComponentInputSizeConfigs.schemas.VALIDATE.name,
            title: Language.translate("components.input_size.schema.validate.title"),
            description: Language.translate("components.input_size.schema.validate.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_isAbsoluteRule.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_listRules.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_msgRules.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_title.name],
            ]
        },
    });

    _COMPONENT_TEMPLATES = defineComponentTemplate<ComponentInputSizeTemplatesType, ComponentInputSizePropsType>({
        BODY: {
            title: Language.translate("components.input_size.template.body.title"),
            description: Language.translate("components.input_size.template.body.description"),
            reference: this._COMPONENT_PATTERN[ComponentInputSizeConfigs.keys.prop_placeholder.name]
        },
    });

    _COMPONENT_METHODS = defineComponentMethods<ComponentInputSizeMethodsType, ComponentInputSizePropsType>({
        [ComponentInputSizeConfigs.methods.INPUT.name]: {
            title: Language.translate("components.input_size.methods.fn_onInput.title"),
            description: Language.translate("components.input_size.methods.fn_onInput.description"),
            args: {
                [ComponentInputSizeConfigs.methods.INPUT.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
            }
        },
        [ComponentInputSizeConfigs.methods.FOCUS.name]: {
            title: Language.translate("components.input_size.methods.fn_onFocus.title"),
            description: Language.translate("components.input_size.methods.fn_onFocus.description"),
            args: {
                [ComponentInputSizeConfigs.methods.FOCUS.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
            }
        },
        [ComponentInputSizeConfigs.methods.BLUR.name]: {
            title: Language.translate("components.input_size.methods.fn_onBlur.title"),
            description: Language.translate("components.input_size.methods.fn_onBlur.description"),
            args: {
                [ComponentInputSizeConfigs.methods.BLUR.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
            }
        },
        [ComponentInputSizeConfigs.methods.CLICK_POSITIVE.name]: {
            title: Language.translate("components.input_size.methods.fn_onClickPositive.title"),
            description: Language.translate("components.input_size.methods.fn_onClickPositive.description"),
            args: {
                [ComponentInputSizeConfigs.methods.CLICK_POSITIVE.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
            }
        },
        [ComponentInputSizeConfigs.methods.CLICK_NEGATIVE.name]: {
            title: Language.translate("components.input_size.methods.fn_onClickNegative.title"),
            description: Language.translate("components.input_size.methods.fn_onClickNegative.description"),
            args: {
                [ComponentInputSizeConfigs.methods.CLICK_NEGATIVE.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],
            }
        },
    });


    static override renderExampleComponent(): HTMLElement {
        const valueObs = new Observable<string>("0");
        const comp = new ComponentInputSize(
            <ComponentInputSizePropsType>{
                classList: ["col-md-3", "col-12", "border", "p-2"],
                prop_labelTitle: "Input Size Example",
                prop_labelTooltipDescription: "Numeric input with +/- buttons and min/max",
                prop_placeholder: "Enter number...",
                prop_value: valueObs,
                prop_size: SIZES.M,
                prop_icon: ToolsIcons.icon_search({ size: SIZES.S }),
                prop_min: 0,
                prop_max: 100,
                //prop_iconPositive: ToolsIcons.icon_plus_badge,
                //prop_iconNegetive: ToolsIcons.icon_minus_badge,
                prop_listRules: [
                    { rule: "_not_empty", description: "This field is required" },
                    { rule: "_is_number", description: "Must be a valid number" },
                ],
                prop_msgRules: null,
                prop_isAbsoluteRule: true,
            },
            <ComponentInputSizeMethodsType>{
                fn_onInput: (event, dataArgs) => { valueObs.set((event.target as HTMLInputElement).value); },
                fn_onFocus: (event, dataArgs) => {},
                fn_onBlur: (event, dataArgs) => {},
                fn_onClickPositive: (event, dataArgs) => {},
                fn_onClickNegative: (event, dataArgs) => {},
            }
        );
        return comp.getElement() as HTMLElement;
    }
}


export class ComponentInputSize extends ComponentInputSizeBase {

    private var_inputValue = new Observable<string>("");

    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentInputSizePropsType,
        methods: ComponentInputSizeMethodsType,
        events = null
    ) {
        super("input-size", null);
        super.renderComponent(config, methods, events);
        this.fn_setupValueObservable();
    }


    /* ---------------------------------------------
        TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentInputSizeConfigs.schemas.FORM.name)
    }

    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentInputSizeConfigs.schemas.FORM.name:
                return this.template_render_form(attrsDefault, data, extra);
            case ComponentInputSizeConfigs.schemas.INPUT.name:
                return this.template_render_input(attrsDefault, data, extra);
            case ComponentInputSizeConfigs.schemas.ICON_CLEAR.name:
                return this.template_render_iconClear(attrsDefault, data, extra);
            case ComponentInputSizeConfigs.schemas.ICON.name:
                return this.template_render_icon(attrsDefault, data, extra);
            case ComponentInputSizeConfigs.schemas.BUTTON_POSITIVE.name:
                return this.template_render_buttonPositive(attrsDefault, data, extra);
            case ComponentInputSizeConfigs.schemas.BUTTON_NEGATIVE.name:
                return this.template_render_buttonNegative(attrsDefault, data, extra);
            case ComponentInputSizeConfigs.schemas.VALIDATE.name:
                return this.template_render_validate(attrsDefault, data, extra);
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    private template_render_form(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_backgroundColorForm = data[ComponentInputSizeConfigs.keys.prop_backgroundColorForm.name];
            const prop_formBorderRadius = data[ComponentInputSizeConfigs.keys.prop_formBorderRadius.name];

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-input-size-form-${this._COMPONENT_RANDOM_ID}`,
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
                            this.executeSchemaPart(ComponentInputSizeConfigs.schemas.INPUT.name),
                            this.executeSchemaPart(ComponentInputSizeConfigs.schemas.ICON_CLEAR.name),
                            this.executeSchemaPart(ComponentInputSizeConfigs.schemas.ICON.name),
                            this.executeSchemaPart(ComponentInputSizeConfigs.schemas.BUTTON_POSITIVE.name),
                            this.executeSchemaPart(ComponentInputSizeConfigs.schemas.BUTTON_NEGATIVE.name),
                        ]
                    }) ,
                    this.executeSchemaPart(ComponentInputSizeConfigs.schemas.VALIDATE.name),
                ]
            });

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_input(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_inputClass = data[ComponentInputSizeConfigs.keys.prop_inputClass.name];
            const prop_inputStyles = data[ComponentInputSizeConfigs.keys.prop_inputStyles.name];
            const prop_inputBorderColor = data[ComponentInputSizeConfigs.keys.prop_inputBorderColor.name];
            const prop_inputBorderColorFocus = data[ComponentInputSizeConfigs.keys.prop_inputBorderColorFocus.name];
            const prop_inputBorderWidth = data[ComponentInputSizeConfigs.keys.prop_inputBorderWidth.name];
            const prop_inputBorderRadius = data[ComponentInputSizeConfigs.keys.prop_inputBorderRadius.name];
            const prop_name = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_name.name];
            const prop_value = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name];
            const prop_placeholder = data[ComponentInputSizeConfigs.keys.prop_placeholder.name];
            const prop_icon = data[ComponentInputSizeConfigs.keys.prop_icon.name];
            const prop_isDisable = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_size = data[ComponentInputSizeConfigs.keys.prop_size.name];

            const directionRtl = AppConfig.get("directionRtl");

            const inputValue = prop_value instanceof Observable
                ? prop_value
                : this.var_inputValue;

            if (prop_value instanceof Observable) {
                this.var_inputValue = prop_value;
            }

            const inputId = `component-input-size-input-${this._COMPONENT_RANDOM_ID}`;

            return ReactiveElement.input({
                attrs: {
                    ...attrsDefault,
                    "id": inputId,
                    "type": "text",
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
                    [directionRtl ? "paddingLeft" : "paddingRight"]: "20px",
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

                    borderWidth: Observable.computed((borderWidth) =>
                            {
                                console.log(borderWidth)
                                return  `${ToolsComponents_BorderWidth?.[borderWidth]} !important`
                            },
                            [
                                 prop_inputBorderWidth , 
                            ],
                            this.getScope()
                        ) ,
                        
                    borderRadius: Observable.computed((borderRadius) =>
                            {
                                return  `${ToolsComponents_BorderRadius?.[borderRadius]} !important`
                            },
                            [
                                 prop_inputBorderRadius , 
                            ],
                            this.getScope()
                        ) ,
                        
                    borderColor: el.focus.mapList({
                        true:  
                            Observable.computed((borderColor) =>
                                {
                                     return  `${borderColor} !important`
                                },
                                [
                                    prop_inputBorderColorFocus , 
                                ],
                                this.getScope()
                            ) ,

                        false:  
                            Observable.computed((borderColor) =>
                                {
                                     return  `${borderColor} !important`
                                },
                                [
                                    prop_inputBorderColor , 
                                ],
                                this.getScope()
                            ) ,
                        }),

                    lineHeight: Observable.computed((sizeName) =>
                            {
                                return SizeUnit(
                                    ToolsCss.getHeightSize(sizeName),
                                     UNITS.PEXEL
                                )
                            },
                            [
                                 AppConfig.get_sizeName() , 
                            ],
                            this.getScope()
                        ) ,

                    fontSize: Observable.computed((sizeName) =>
                            {
                                return SizeUnit(
                                    ToolsCss.getFontSize(sizeName),
                                     UNITS.PEXEL
                                )
                            },
                            [
                                 AppConfig.get_sizeName() , 
                            ],
                            this.getScope()
                        ) ,

                    width: Observable.computed((icon) =>
                            {
                                let calc = [
                                    SizeUnit(100, UNITS.PERCENT) 
                                ];
                                if(icon){
                                    calc.push(OPERATION.MINUS);
                                    calc.push(SizeUnit(35, UNITS.PEXEL));
                                }
                                return  SizeCalc(...calc);
                            },
                            [
                                 prop_icon 
                            ],
                            this.getScope()
                        ) ,

                    marginLeft: Observable.computed(( dir , icon) =>
                            {
                                if(!dir && icon != null){
                                    return  SizeUnit(35, UNITS.PEXEL);
                                }
                                return null;
                            },
                            [
                                 AppConfig.get_directionRtl() , 
                                 prop_icon 
                            ],
                            this.getScope()
                        ) ,
                        
                    marginRight: Observable.computed(( dir , icon) =>
                            {
                                if(dir && icon != null){
                                    return  SizeUnit(35, UNITS.PEXEL);
                                }
                                return null;
                            },
                            [ 
                                 AppConfig.get_directionRtl() , 
                                 prop_icon 
                            ],
                            this.getScope()
                        ) ,
                }),
                on: {
                    input: (event: Event) => {
                        const val = (event.target as HTMLInputElement).value;
                        this.fn_validateInputIsNumber(event);
                        const params: ComponentInputSize_Methods_INPUT_DataArgs = {
                            [ComponentInputSizeConfigs.methods.INPUT.dataArgs.VALUE.name]: val,
                        };
                        this.executeMethod(ComponentInputSizeConfigs.methods.INPUT.name, event, params);
                    },
                    focus: (event: Event) => {
                        const val = (event.target as HTMLInputElement).value;
                        const params: ComponentInputSize_Methods_FOCUS_DataArgs = {
                            [ComponentInputSizeConfigs.methods.FOCUS.dataArgs.VALUE.name]: val,
                        };
                        this.executeMethod(ComponentInputSizeConfigs.methods.FOCUS.name, event, params);
                    },
                    blur: (event: Event) => {
                        const val = (event.target as HTMLInputElement).value;
                        const params: ComponentInputSize_Methods_BLUR_DataArgs = {
                            [ComponentInputSizeConfigs.methods.BLUR.dataArgs.VALUE.name]: val,
                        };
                        this.executeMethod(ComponentInputSizeConfigs.methods.BLUR.name, event, params);
                    },
                }
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_iconClear(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_isDisable = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
          
            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (isDisable: boolean) => {
                        if (isDisable) return null;

                        return new ComponentElementPosition(
                            <ComponentElementPositionPropsType>
                            {
                                classList: [],
                                styles: {},
                                
                                prop_positionZIndex: ToolsCss.getZIndex(Z_INDEXES.tools_btn , 10),
                                prop_positionType:   ComponentElementPosition_positionTypes.ABSOLUTE,
                                prop_positionTop:    SizeUnit(50, UNITS.PERCENT),
                                prop_positionWidth:  SizeUnit(30, UNITS.PEXEL),
                                prop_positionStyles: {
                                    display:         "flex",
                                    alignItems:      "center",
                                    justifyContent:  "center",
                                },
                                prop_positionLeft: Observable.computed(( dir) =>
                                                                 {
                                                                    return dir ? SizeUnit(0, UNITS.PEXEL) : null;
                                                                 },
                                                                 [
                                                                      AppConfig.get_directionRtl() 
                                                                 ],
                                                                 this.getScope()
                                                            ) ,
                                prop_positionRight: Observable.computed(( dir) =>
                                                                 {
                                                                    return !dir ? SizeUnit(0, UNITS.PEXEL) : null;
                                                                 },
                                                                 [
                                                                      AppConfig.get_directionRtl() 
                                                                 ],
                                                                 this.getScope()
                                                            ) ,
                                prop_positionHeight: Observable.computed(( sizeName) =>
                                                                 {
                                                                     return SizeUnit(
                                                                        ToolsCss.getIconSize(sizeName),
                                                                        UNITS.PEXEL
                                                                    );
                                                                 },
                                                                 [
                                                                      AppConfig.get_sizeName() 
                                                                 ],
                                                                 this.getScope()
                                                            ) ,
                                prop_positionTranslate: Observable.computed(( dir) =>
                                                                 {
                                                                     return dir
                                                                        ? TranslateUnit(SizeUnit(70, UNITS.PEXEL), SizeUnit(-50, UNITS.PERCENT))
                                                                        : TranslateUnit(SizeUnit(-70, UNITS.PEXEL), SizeUnit(-50, UNITS.PERCENT));
                                                                 },
                                                                 [
                                                                      AppConfig.get_directionRtl() 
                                                                 ],
                                                                 this.getScope()
                                                            ) ,
                                prop_content: new ToolsComponents.ComponentIcon(
                                                        <ComponentIconPropsType>{
                                                            classList: [],
                                                            styles: {},
                                                            prop_iconClass: [],
                                                            prop_iconStyles: {
                                                                fontSize: "20pt",
                                                                margin: "0 10px",
                                                                cursor: "pointer",
                                                            },

                                                            prop_icon: Observable.computed(( sizeName) =>
                                                                 {
                                                                     return ToolsIcons.icon_clear({ size: sizeName });
                                                                 },
                                                                 [
                                                                      AppConfig.get_sizeName() 
                                                                 ],
                                                                 this.getScope()
                                                            )

                                                        } ,
                                                        <ComponentIconMethodsType>{
                                                            fn_onClickIcon: (event, dataArgs, componentArgs) => {
                                                                this.fn_onClearInput(event);
                                                            }
                                                        }
                                                    ).getReactiveElement(),
                            } ,
                            <ComponentElementPositionMethodsType>{

                            }
                        ).getReactiveElement();
                    },
                    [prop_isDisable],
                    this.getScope()
                ),
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_icon(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_icon = data[ComponentInputSizeConfigs.keys.prop_icon.name];

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (iconValue: any, size: any) => {
                        if (!iconValue) return null;
                     
                        return new ComponentElementPosition(
                            <ComponentElementPositionPropsType>{
                                classList: [],
                                styles: {},
                                prop_positionZIndex: ToolsCss.getZIndex(Z_INDEXES.tools_btn , 10),
                                prop_positionType:   ComponentElementPosition_positionTypes.ABSOLUTE,
                                prop_positionTop:    SizeUnit(50, UNITS.PERCENT),
                                prop_positionWidth:  SizeUnit(30, UNITS.PEXEL),
                                prop_positionStyles: {
                                    display:         "flex",
                                    alignItems:      "center",
                                    justifyContent:  "center",
                                },
                                prop_positionLeft: Observable.computed(( dir) =>
                                                                 {
                                                                    return !dir ? SizeUnit(0, UNITS.PEXEL) : null;
                                                                 },
                                                                 [
                                                                      AppConfig.get_directionRtl() 
                                                                 ],
                                                                 this.getScope()
                                                            ) ,
                                prop_positionRight: Observable.computed(( dir) =>
                                                                 {
                                                                    return dir ? SizeUnit(0, UNITS.PEXEL) : null;
                                                                 },
                                                                 [
                                                                      AppConfig.get_directionRtl() 
                                                                 ],
                                                                 this.getScope()
                                                            ) ,
                                prop_positionTranslate: Observable.computed(( dir) =>
                                                                 {
                                                                     return dir  
                                                                        ? TranslateUnit(SizeUnit(-5, UNITS.PEXEL), SizeUnit(-50, UNITS.PERCENT))
                                                                        : TranslateUnit(SizeUnit(5, UNITS.PEXEL), SizeUnit(-50, UNITS.PERCENT));
                                                                 },
                                                                 [
                                                                      AppConfig.get_directionRtl() 
                                                                 ],
                                                                 this.getScope()
                                                            ) ,
                                prop_positionHeight: Observable.computed(( sizeName) =>
                                                                 {
                                                                     return SizeUnit(
                                                                        ToolsCss.getIconSize(sizeName),
                                                                        UNITS.PEXEL
                                                                    );
                                                                 },
                                                                 [
                                                                      AppConfig.get_sizeName() 
                                                                 ],
                                                                 this.getScope()
                                                            ) ,
                                prop_content: new ToolsComponents.ComponentIcon(
                                                     <ComponentIconPropsType> {
                                                         classList:        [],
                                                         styles:           {},
                                                         prop_iconClass:   [],
                                                         prop_iconStyles:  {
                                                             margin:        "auto",
                                                             cursor:        "pointer",
                                                         },
                                                         prop_icon:    prop_icon,
                                                     } ,
                                                     <ComponentIconMethodsType>{
                                                         fn_onClickIcon: (event, dataArgs, componentArgs) => {
                                                             this.fn_onFocusInput(event);
                                                         }
                                                     }
                                                 ).getReactiveElement(),
                            } ,
                            <ComponentElementPositionMethodsType>{}
                        ).getReactiveElement();
                    },
                    [prop_icon],
                    this.getScope()
                ),
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_buttonPositive(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_isDisable =    data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_iconPositive = data[ComponentInputSizeConfigs.keys.prop_iconPositive.name];
            const prop_iconColor =    data[ComponentInputSizeConfigs.keys.prop_iconColor.name];
            const prop_inputBorderWidth = data[ComponentInputSizeConfigs.keys.prop_inputBorderWidth.name];

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (isDisable: boolean) => {
                        if (isDisable ) return null;
                      
                        return new ComponentElementPosition(
                            <ComponentElementPositionPropsType>{
                                classList: [],
                                styles: {},
                                prop_positionType:    ComponentElementPosition_positionTypes.ABSOLUTE,
                                prop_positionZIndex:  10,
                                prop_positionStyles: {
                                    cursor:           "pointer",
                                    width:            "35px",
                                },
                                prop_positionTop:      Observable.computed(( sizeName) =>
                                                                {
                                                                    return`${ToolsComponents_BorderWidth?.[sizeName]} `;
                                                                },
                                                                [
                                                                    prop_inputBorderWidth
                                                                ],
                                                                this.getScope()
                                                            ) ,
                                prop_positionEnd:      Observable.computed(( sizeName) =>
                                                                {
                                                                    return`${ToolsComponents_BorderWidth?.[sizeName]} `;
                                                                },
                                                                [
                                                                    prop_inputBorderWidth
                                                                ],
                                                                this.getScope()
                                                            ) ,
                                prop_content: new ToolsComponents.ComponentButton(
                                                      <ComponentButtonPropsType>{
                                                          classList:      [],
                                                          styles:         {},
                                                          prop_btnClass:  ["shadow-sm", "px-2"],
                                                          prop_btnStyles: {
                                                              cursor:                     "pointer",
                                                              width:                      "35px",
                                                              borderTopRightRadius:       "0 !important",
                                                              borderBottomRightRadius:    "0 !important",
                                                              borderTopLeftRadius:        "0 !important",
                                                              borderBottomLeftRadius:     "0 !important",
                                                          },
                                                          prop_btnBorderRadius:        null,
                                                          prop_btnTitle:               Observable.computed(( iconColor , iconPositive) =>
                                                                                               {
                                                                                                   return iconPositive?.({primaryColor: iconColor})
                                                                                               },
                                                                                               [ 
                                                                                                    prop_iconColor , 
                                                                                                    prop_iconPositive 
                                                                                               ],
                                                                                               this.getScope()
                                                                                          ) ,
                                                          prop_btnType:                "button",
                                                          prop_btnBorderWidth:         0,
                                                      },
                                                      <ComponentButtonMethodsType>{
                                                          fn_onClickButton: (event, dataArgs, componentArgs) => {
                                                              event.stopPropagation();
                                                              this.fn_positiveInputValue(event);
                                                              const val = this.fn_getValueInput();
                                                              const params: ComponentInputSize_Methods_CLICK_POSITIVE_DataArgs = {
                                                                  [ComponentInputSizeConfigs.methods.CLICK_POSITIVE.dataArgs.VALUE.name]: val,
                                                              };
                                                              this.executeMethod(ComponentInputSizeConfigs.methods.CLICK_POSITIVE.name, event, params);
                                                          }
                                                      }).getReactiveElement(),
                                                      
                            },
                            <ComponentElementPositionMethodsType>{}
                        ).getReactiveElement();
                    },
                    [prop_isDisable],
                    this.getScope()
                ),
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_buttonNegative(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_isDisable = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_iconNegetive = data[ComponentInputSizeConfigs.keys.prop_iconNegetive.name];
            const prop_iconColor = data[ComponentInputSizeConfigs.keys.prop_iconColor.name];
            const prop_inputBorderWidth = data[ComponentInputSizeConfigs.keys.prop_inputBorderWidth.name];

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (isDisable: boolean) => {
                        if (isDisable) return null;

                        return new ComponentElementPosition(
                            <ComponentElementPositionPropsType>{
                                classList: [],
                                styles: {},
                                prop_positionType:     ComponentElementPosition_positionTypes.ABSOLUTE,
                                prop_positionTop:      SizeUnit(0, UNITS.PEXEL),
                                prop_positionZIndex:   10,
                                prop_positionStyles: {
                                    cursor:       "pointer",
                                    width:        "35px",
                                },
                                prop_positionTop:      Observable.computed(( sizeName) =>
                                                           {
                                                               return`${ToolsComponents_BorderWidth?.[sizeName]} `;
                                                           },
                                                           [
                                                               prop_inputBorderWidth
                                                           ],
                                                           this.getScope()
                                                       ) ,
                                prop_positionEnd:      Observable.computed(( sizeName) =>
                                                            {
                                                                return  SizeCalc(
                                                                    `${ToolsComponents_BorderWidth?.[sizeName]}` ,
                                                                    OPERATION.ADD ,
                                                                    SizeUnit(35, UNITS.PEXEL)
                                                                );
                                                            },
                                                            [
                                                                prop_inputBorderWidth
                                                            ],
                                                            this.getScope()
                                                        ) ,
                                prop_content: new ToolsComponents.ComponentButton(
                                    <ComponentButtonPropsType>{
                                                     classList:      [],
                                                     styles:         {},
                                                     prop_btnClass:  ["shadow-sm", "px-2"],
                                                     prop_btnStyles: {
                                                         cursor:                     "pointer",
                                                         width:                      "35px",
                                                         borderTopRightRadius:       "0 !important",
                                                         borderBottomRightRadius:    "0 !important",
                                                         borderTopLeftRadius:        "0 !important",
                                                         borderBottomLeftRadius:     "0 !important",
                                                     },
                                                     prop_btnBorderRadius:        null,
                                                     prop_btnTitle:               Observable.computed(( iconColor , iconNegetive) =>
                                                         {
                                                             return iconNegetive?.({primaryColor: iconColor})
                                                         },
                                                         [
                                                             prop_iconColor ,
                                                             prop_iconNegetive
                                                         ],
                                                         this.getScope()
                                                     ) ,
                                                     prop_btnType:                "button",
                                                     prop_btnBorderWidth:         0,
                                                 },
                                                 <ComponentButtonMethodsType>{
                                                     fn_onClickButton: (event, dataArgs, componentArgs) => {
                                                         event.stopPropagation();
                                                         this.fn_negativeInputValue(event);
                                                         const val = this.fn_getValueInput();
                                                         const params: ComponentInputSize_Methods_CLICK_NEGATIVE_DataArgs = {
                                                             [ComponentInputSizeConfigs.methods.CLICK_NEGATIVE.dataArgs.VALUE.name]: val,
                                                         };
                                                         this.executeMethod(ComponentInputSizeConfigs.methods.CLICK_NEGATIVE.name, event, params);
                                                     }
                                                 }
                                                 ).getReactiveElement(),
                            },
                            <ComponentElementPositionMethodsType>{}
                        ).getReactiveElement();
                    },
                    [prop_isDisable],
                    this.getScope()
                ),
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_validate(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_isDisable = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_isAbsoluteRule = data[ComponentInputSizeConfigs.keys.prop_isAbsoluteRule.name];
            const prop_listRules = data[ComponentInputSizeConfigs.keys.prop_listRules.name];
            const prop_msgRules = data[ComponentInputSizeConfigs.keys.prop_msgRules.name];
            const prop_title = data[ComponentInputSizeConfigs.keys.prop_title.name];

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-input-size-validate-${this._COMPONENT_RANDOM_ID}`,
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
                                        prop_reference: `component-input-size-input-${this._COMPONENT_RANDOM_ID}`,
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
        const inputEl = document.querySelector(`input#component-input-size-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
        if (inputEl) {
            return inputEl.value;
        }
        return this.var_inputValue.get();
    }

    fn_onClearInput(event: Event) {
        const inputEl = document.querySelector(`input#component-input-size-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
        if (inputEl) {
            inputEl.value = "";
        }
        this.var_inputValue.set("");
        const params: ComponentInputSize_Methods_INPUT_DataArgs = {
            [ComponentInputSizeConfigs.methods.INPUT.dataArgs.VALUE.name]: "",
        };
        this.executeMethod(ComponentInputSizeConfigs.methods.INPUT.name, event, params);
        this.fn_onFocusInput(event);
    }

    fn_onFocusInput(event: Event) {
        const inputEl = document.querySelector(`input#component-input-size-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
        if (inputEl) {
            inputEl.focus();
        }
        const val = this.fn_getValueInput();
        const params: ComponentInputSize_Methods_FOCUS_DataArgs = {
            [ComponentInputSizeConfigs.methods.FOCUS.dataArgs.VALUE.name]: val,
        };
        this.executeMethod(ComponentInputSizeConfigs.methods.FOCUS.name, event, params);
    }

    fn_positiveInputValue(event: Event) {
        const inputEl = document.querySelector(`input#component-input-size-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
        if (!inputEl) return;
        let value = parseFloat(this.fn_convertStrToNum(inputEl.value));
        if (isNaN(value)) {
            value = 0;
        } else {
            value = value + 1;
        }
        this.fn_setValueInput(inputEl, value);
    }

    fn_negativeInputValue(event: Event) {
        const inputEl = document.querySelector(`input#component-input-size-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
        if (!inputEl) return;
        let value = parseFloat(this.fn_convertStrToNum(inputEl.value));
        if (isNaN(value)) {
            value = 0;
        } else {
            value = value - 1;
        }
        this.fn_setValueInput(inputEl, value);
    }

    fn_validateInputIsNumber(event: Event) {
        const inputEl = document.querySelector(`input#component-input-size-input-${this._COMPONENT_RANDOM_ID}`) as HTMLInputElement | null;
        if (!inputEl) return;
        const value = parseFloat(this.fn_convertStrToNum((event.target as HTMLInputElement).value));
        if (!isNaN(value)) {
            this.fn_setValueInput(inputEl, value);
        }
    }

    fn_setValueInput(inputEl: HTMLInputElement, value: number) {
        const prop_min = this.get(ComponentInputSizeConfigs.keys.prop_min.name) as number | null;
        const prop_max = this.get(ComponentInputSizeConfigs.keys.prop_max.name) as number | null;

        if (prop_min != null && value < prop_min) {
            inputEl.value = String(prop_min);
        } else if (prop_max != null && value > prop_max) {
            inputEl.value = String(prop_max);
        } else {
            inputEl.value = String(value);
        }
        this.var_inputValue.set(inputEl.value);
    }

    private fn_convertStrToNum(str: string): string {
        return str.replace(/[^0-9.\-]/g, "");
    }

}

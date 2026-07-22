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
import {ToolsCss} from "../../utils/ToolsCss";
import {ToolsComponents} from "./index";
import {ComponentCallBackType} from "../../core/ComponentBase";
import {Language} from "../../core/Language";
import {AppConfig} from "../../core/AppConfig";
import {
    Color,
    COLORS_GRAD,
    COLORS_MAIN,
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
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_parts,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_parts,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_value_parts,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_keys,
    GOG_ComponentBasicConfigs_Component_Structure_parts,
    GOG_ComponentBasicConfigs_Component_Structure_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_Schema,
    GOG_ComponentBasicConfigs_partDoseNotBody,
    GOG_ComponentBasicProps_Component,
    GOG_ComponentBasicProps_Component_Structure,
    GOG_ComponentBasicProps_Component_Structure_FormInput,
    GOG_ComponentBasicProps_Component_Structure_FormInput_Label,
    GOG_ComponentBasicProps_Component_Structure_FormInput_Value,
} from "../../core/component/SetupComponent";
import {Observable} from "../../core/Observable";
import {
    ComponentBorder_Methods_CLICK_BORDER_ComponentArgs,
    ComponentBorder_Methods_CLICK_BORDER_DataArgs,
    ComponentBorderMethodsType,
    ComponentBorderPropsType
} from "./ComponentBorder";
import {ToolsIcons} from "../icons";
import {ComponentIconMethodsType, ComponentIconPropsType} from "./ComponentIcon";
import {
    ComponentElementPosition,
    ComponentElementPositionMethodsType,
    ComponentElementPositionPropsType
} from "./ComponentElementPosition";
import {ComponentValidateMethodsType, ComponentValidatePropsType} from "./ComponentValidate";
import {ComponentLabelMethodsType, ComponentLabelPropsType} from "./ComponentLabel";


export const ComponentInputColorProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput_Value,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput_Label,
    ///----------------------
    prop_size:                              "prop_size",
    prop_showTitleFront:                    "prop_showTitleFront",
    prop_colorSelected:                     "prop_colorSelected",
    prop_borderColor:                       "prop_borderColor",
    prop_formClass:                         "prop_formClass",
    prop_formStyles:                        "prop_formStyles",
    prop_optionHeight:                      "prop_optionHeight",
    prop_optionWidth:                       "prop_optionWidth",
    prop_optionStyles:                      "prop_optionStyles",
    prop_positionTop:                       "prop_positionTop",
    prop_backgroundColorBody:               "prop_backgroundColorBody",
    prop_colorBody:                         "prop_colorBody",
    prop_colorIconClear:                    "prop_colorIconClear",
    prop_colorIconEmpty:                    "prop_colorIconEmpty",
    prop_hasRules:                          "prop_hasRules",
    prop_isAbsoluteRule:                    "prop_isAbsoluteRule",
    prop_listRules:                         "prop_listRules",
    prop_msgRules:                          "prop_msgRules",
    var_isEmptyColor:                       "var_isEmptyColor",
} as const;


const ComponentInputColorConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys,
        ///----------------------
        [ComponentInputColorProps.prop_size]: {
            name:               ComponentInputColorProps.prop_size,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES>>(SIZES.M),
        },
        [ComponentInputColorProps.prop_showTitleFront]: {
            name:               ComponentInputColorProps.prop_showTitleFront,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentInputColorProps.prop_colorSelected]: {
            name:               ComponentInputColorProps.prop_colorSelected,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentInputColorProps.prop_borderColor]: {
            name:               ComponentInputColorProps.prop_borderColor,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentInputColorProps.prop_formClass]: {
            name:               ComponentInputColorProps.prop_formClass,
            value:              GOG_SetValue<string[]>(["rounded"]),
        },
        [ComponentInputColorProps.prop_formStyles]: {
            name:               ComponentInputColorProps.prop_formStyles,
            value:              GOG_SetValue<Record<string, string>>({}),
        },
        [ComponentInputColorProps.prop_optionHeight]: {
            name:               ComponentInputColorProps.prop_optionHeight,
            value:              GOG_SetValue<number>(375),
        },
        [ComponentInputColorProps.prop_optionWidth]: {
            name:               ComponentInputColorProps.prop_optionWidth,
            value:              GOG_SetValue<number>(350),
        },
        [ComponentInputColorProps.prop_optionStyles]: {
            name:               ComponentInputColorProps.prop_optionStyles,
            value:              GOG_SetValue<Record<string, string>>({}),
        },
        [ComponentInputColorProps.prop_positionTop]: {
            name:               ComponentInputColorProps.prop_positionTop,
            value:              GOG_SetValue<string>("0px"),
        },
        [ComponentInputColorProps.prop_backgroundColorBody]: {
            name:               ComponentInputColorProps.prop_backgroundColorBody,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentInputColorProps.prop_colorBody]: {
            name:               ComponentInputColorProps.prop_colorBody,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentInputColorProps.prop_colorIconClear]: {
            name:               ComponentInputColorProps.prop_colorIconClear,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentInputColorProps.prop_colorIconEmpty]: {
            name:               ComponentInputColorProps.prop_colorIconEmpty,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentInputColorProps.prop_hasRules]: {
            name:               ComponentInputColorProps.prop_hasRules,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentInputColorProps.prop_isAbsoluteRule]: {
            name:               ComponentInputColorProps.prop_isAbsoluteRule,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentInputColorProps.prop_listRules]: {
            name:               ComponentInputColorProps.prop_listRules,
            value:              GOG_SetValue<any[]>([]),
        },
        [ComponentInputColorProps.prop_msgRules]: {
            name:               ComponentInputColorProps.prop_msgRules,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentInputColorProps.var_isEmptyColor]: {
            name:               ComponentInputColorProps.var_isEmptyColor,
            value:              GOG_SetValue<boolean>(false),
        },
    },
    schemas: {
        ...GOG_ComponentBasicConfigs_Component_parts,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_parts,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_value_parts,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_parts,
        ///----------------------
        Main: {
            name:               "part-main"
        },
        FormColor: {
            name:               "part-form-color"
        },
        FormColorIconEmpty: {
            name:               "part-form-color-icon-empty"
        },
        FormTitle: {
            name:               "part-form-title"
        },
        FormIconClear: {
            name:               "part-form-icon-clear"
        },
        FormSelector: {
            name:               "part-form-selector"
        },
        FormSelectorBorder: {
            name:               "part-form-selector-border"
        },
        FormSelectorSLSquare: {
            name:               "part-form-selector-sl-square"
        },
        FormSelectorHueSlider: {
            name:               "part-form-selector-hue-slider"
        },
        FormSelectorOpacitySlider: {
            name:               "part-form-selector-opacity-slider"
        },
        FormSelectorInfoCode: {
            name:               "part-form-selector-info-code"
        },
        FormSelectorInfoOpacity: {
            name:               "part-form-selector-info-opacity"
        },
        Validate: {
            name:               "part-validate"
        },
    },
    templates: {},
    methods: {
        CHANGE: {
            name:               "fn_onChangeColor",
            dataArgs: {
                COLOR: {
                    name:       "COLOR",
                    value:      GOG_SetValue<string>("")
                }
            },
            componentArgs: {}
        },
    }
} as const;


export type ComponentInputColorPropsType =          GOG_ExtractNameValue<typeof ComponentInputColorConfigs.keys>
export type ComponentInputColorSchemaType =         GOG_ExtractName<typeof ComponentInputColorConfigs.schemas>
export type ComponentInputColorTemplatesType =      GOG_ExtractName<typeof ComponentInputColorConfigs.templates>

export type ComponentInputColor_Methods_CHANGE_DataArgs =       GOG_ExtractNameValue<typeof ComponentInputColorConfigs.methods.CHANGE.dataArgs>
export type ComponentInputColor_Methods_CHANGE_ComponentArgs =  GOG_ExtractName<typeof ComponentInputColorConfigs.methods.CHANGE.componentArgs>

export type ComponentInputColorMethodsType = {
    [ComponentInputColorConfigs.methods.CHANGE.name]: ComponentCallBackType<ComponentInputColor_Methods_CHANGE_ComponentArgs, ComponentInputColor_Methods_CHANGE_DataArgs>
}


export abstract class ComponentInputColorBase extends ComponentBase<
    ComponentInputColorPropsType,
    ComponentInputColorSchemaType,
    ComponentInputColorTemplatesType,
    ComponentInputColorMethodsType
> {

    _COMPONENT_PATTERN = defineComponentPatterns<ComponentInputColorPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Pattern(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Pattern(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Pattern(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Pattern(this),
        ///----------------------
        [ComponentInputColorConfigs.keys.prop_size.name]: {
            prop:               ComponentInputColorConfigs.keys.prop_size.name,
            default:            ComponentInputColorConfigs.keys.prop_size.value,
            title:              Language.translate("components.input_color.prop.prop_size.title"),
            description:        Language.translate("components.input_color.prop.prop_size.description"),
        },
        [ComponentInputColorConfigs.keys.prop_showTitleFront.name]: {
            prop:               ComponentInputColorConfigs.keys.prop_showTitleFront.name,
            default:            ComponentInputColorConfigs.keys.prop_showTitleFront.value,
            title:              Language.translate("components.input_color.prop.prop_showTitleFront.title"),
            description:        Language.translate("components.input_color.prop.prop_showTitleFront.description"),
        },
        [ComponentInputColorConfigs.keys.prop_colorSelected.name]: {
            prop:               ComponentInputColorConfigs.keys.prop_colorSelected.name,
            default:            ComponentInputColorConfigs.keys.prop_colorSelected.value,
            title:              Language.translate("components.input_color.prop.prop_colorSelected.title"),
            description:        Language.translate("components.input_color.prop.prop_colorSelected.description"),
        },
        [ComponentInputColorConfigs.keys.prop_borderColor.name]: {
            prop:               ComponentInputColorConfigs.keys.prop_borderColor.name,
            default:            ComponentInputColorConfigs.keys.prop_borderColor.value,
            title:              Language.translate("components.input_color.prop.prop_borderColor.title"),
            description:        Language.translate("components.input_color.prop.prop_borderColor.description"),
        },
        [ComponentInputColorConfigs.keys.prop_formClass.name]: {
            prop:               ComponentInputColorConfigs.keys.prop_formClass.name,
            default:            ComponentInputColorConfigs.keys.prop_formClass.value,
            title:              Language.translate("components.input_color.prop.prop_formClass.title"),
            description:        Language.translate("components.input_color.prop.prop_formClass.description"),
        },
        [ComponentInputColorConfigs.keys.prop_formStyles.name]: {
            prop:               ComponentInputColorConfigs.keys.prop_formStyles.name,
            default:            ComponentInputColorConfigs.keys.prop_formStyles.value,
            title:              Language.translate("components.input_color.prop.prop_formStyles.title"),
            description:        Language.translate("components.input_color.prop.prop_formStyles.description"),
        },
        [ComponentInputColorConfigs.keys.prop_optionHeight.name]: {
            prop:               ComponentInputColorConfigs.keys.prop_optionHeight.name,
            default:            ComponentInputColorConfigs.keys.prop_optionHeight.value,
            title:              Language.translate("components.input_color.prop.prop_optionHeight.title"),
            description:        Language.translate("components.input_color.prop.prop_optionHeight.description"),
        },
        [ComponentInputColorConfigs.keys.prop_optionWidth.name]: {
            prop:               ComponentInputColorConfigs.keys.prop_optionWidth.name,
            default:            ComponentInputColorConfigs.keys.prop_optionWidth.value,
            title:              Language.translate("components.input_color.prop.prop_optionWidth.title"),
            description:        Language.translate("components.input_color.prop.prop_optionWidth.description"),
        },
        [ComponentInputColorConfigs.keys.prop_optionStyles.name]: {
            prop:               ComponentInputColorConfigs.keys.prop_optionStyles.name,
            default:            ComponentInputColorConfigs.keys.prop_optionStyles.value,
            title:              Language.translate("components.input_color.prop.prop_optionStyles.title"),
            description:        Language.translate("components.input_color.prop.prop_optionStyles.description"),
        },
        [ComponentInputColorConfigs.keys.prop_positionTop.name]: {
            prop:               ComponentInputColorConfigs.keys.prop_positionTop.name,
            default:            ComponentInputColorConfigs.keys.prop_positionTop.value,
            title:              Language.translate("components.input_color.prop.prop_positionTop.title"),
            description:        Language.translate("components.input_color.prop.prop_positionTop.description"),
        },
        [ComponentInputColorConfigs.keys.prop_backgroundColorBody.name]: {
            prop:               ComponentInputColorConfigs.keys.prop_backgroundColorBody.name,
            default:            ComponentInputColorConfigs.keys.prop_backgroundColorBody.value,
            title:              Language.translate("components.input_color.prop.prop_backgroundColorBody.title"),
            description:        Language.translate("components.input_color.prop.prop_backgroundColorBody.description"),
        },
        [ComponentInputColorConfigs.keys.prop_colorBody.name]: {
            prop:               ComponentInputColorConfigs.keys.prop_colorBody.name,
            default:            ComponentInputColorConfigs.keys.prop_colorBody.value,
            title:              Language.translate("components.input_color.prop.prop_colorBody.title"),
            description:        Language.translate("components.input_color.prop.prop_colorBody.description"),
        },
        [ComponentInputColorConfigs.keys.prop_colorIconClear.name]: {
            prop:               ComponentInputColorConfigs.keys.prop_colorIconClear.name,
            default:            ComponentInputColorConfigs.keys.prop_colorIconClear.value,
            title:              Language.translate("components.input_color.prop.prop_colorIconClear.title"),
            description:        Language.translate("components.input_color.prop.prop_colorIconClear.description"),
        },
        [ComponentInputColorConfigs.keys.prop_colorIconEmpty.name]: {
            prop:               ComponentInputColorConfigs.keys.prop_colorIconEmpty.name,
            default:            ComponentInputColorConfigs.keys.prop_colorIconEmpty.value,
            title:              Language.translate("components.input_color.prop.prop_colorIconEmpty.title"),
            description:        Language.translate("components.input_color.prop.prop_colorIconEmpty.description"),
        },
        [ComponentInputColorConfigs.keys.prop_hasRules.name]: {
            prop:               ComponentInputColorConfigs.keys.prop_hasRules.name,
            default:            ComponentInputColorConfigs.keys.prop_hasRules.value,
            title:              Language.translate("components.input_color.prop.prop_hasRules.title"),
            description:        Language.translate("components.input_color.prop.prop_hasRules.description"),
        },
        [ComponentInputColorConfigs.keys.prop_isAbsoluteRule.name]: {
            prop:               ComponentInputColorConfigs.keys.prop_isAbsoluteRule.name,
            default:            ComponentInputColorConfigs.keys.prop_isAbsoluteRule.value,
            title:              Language.translate("components.input_color.prop.prop_isAbsoluteRule.title"),
            description:        Language.translate("components.input_color.prop.prop_isAbsoluteRule.description"),
        },
        [ComponentInputColorConfigs.keys.prop_listRules.name]: {
            prop:               ComponentInputColorConfigs.keys.prop_listRules.name,
            default:            ComponentInputColorConfigs.keys.prop_listRules.value,
            title:              Language.translate("components.input_color.prop.prop_listRules.title"),
            description:        Language.translate("components.input_color.prop.prop_listRules.description"),
        },
        [ComponentInputColorConfigs.keys.prop_msgRules.name]: {
            prop:               ComponentInputColorConfigs.keys.prop_msgRules.name,
            default:            ComponentInputColorConfigs.keys.prop_msgRules.value,
            title:              Language.translate("components.input_color.prop.prop_msgRules.title"),
            description:        Language.translate("components.input_color.prop.prop_msgRules.description"),
        },
        [ComponentInputColorConfigs.keys.var_isEmptyColor.name]: {
            prop:               ComponentInputColorConfigs.keys.var_isEmptyColor.name,
            default:            ComponentInputColorConfigs.keys.var_isEmptyColor.value,
            title:              Language.translate("components.input_color.prop.var_isEmptyColor.title"),
            description:        Language.translate("components.input_color.prop.var_isEmptyColor.description"),
        },
    });


    _COMPONENT_SCHEMA = defineComponentSchema<ComponentInputColorSchemaType, ComponentInputColorPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Schema(this),
        ///----------------------
        [ComponentInputColorConfigs.schemas.Main.name]: {
            part:               ComponentInputColorConfigs.schemas.Main.name,
            title:              Language.translate("components.input_color.schema.main.title"),
            description:        Language.translate("components.input_color.schema.main.description"),
            props: []
        },
        [ComponentInputColorConfigs.schemas.FormColor.name]: {
            part:               ComponentInputColorConfigs.schemas.FormColor.name,
            title:              Language.translate("components.input_color.schema.form_color.title"),
            description:        Language.translate("components.input_color.schema.form_color.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_colorSelected.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_borderColor.name],
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_formClass.name],
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_formStyles.name],
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.var_isEmptyColor.name],
            ]
        },
        [ComponentInputColorConfigs.schemas.FormColorIconEmpty.name]: {
            part:               ComponentInputColorConfigs.schemas.FormColorIconEmpty.name,
            title:              Language.translate("components.input_color.schema.form_color_icon_empty.title"),
            description:        Language.translate("components.input_color.schema.form_color_icon_empty.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_colorIconEmpty.name],
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.var_isEmptyColor.name],
            ]
        },
        [ComponentInputColorConfigs.schemas.FormTitle.name]: {
            part:               ComponentInputColorConfigs.schemas.FormTitle.name,
            title:              Language.translate("components.input_color.schema.form_title.title"),
            description:        Language.translate("components.input_color.schema.form_title.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_showTitleFront.name],
            ]
        },
        [ComponentInputColorConfigs.schemas.FormIconClear.name]: {
            part:               ComponentInputColorConfigs.schemas.FormIconClear.name,
            title:              Language.translate("components.input_color.schema.form_icon_clear.title"),
            description:        Language.translate("components.input_color.schema.form_icon_clear.description"),
            props: [
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_colorIconClear.name],
            ]
        },
        [ComponentInputColorConfigs.schemas.FormSelector.name]: {
            part:               ComponentInputColorConfigs.schemas.FormSelector.name,
            title:              Language.translate("components.input_color.schema.form_selector.title"),
            description:        Language.translate("components.input_color.schema.form_selector.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_optionHeight.name],
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_optionWidth.name],
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_optionStyles.name],
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_positionTop.name],
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_backgroundColorBody.name],
            ]
        },
        [ComponentInputColorConfigs.schemas.FormSelectorBorder.name]: {
            part:               ComponentInputColorConfigs.schemas.FormSelectorBorder.name,
            title:              Language.translate("components.input_color.schema.form_selector_border.title"),
            description:        Language.translate("components.input_color.schema.form_selector_border.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_backgroundColorBody.name],
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_optionStyles.name],
            ]
        },
        [ComponentInputColorConfigs.schemas.FormSelectorSLSquare.name]: {
            part:               ComponentInputColorConfigs.schemas.FormSelectorSLSquare.name,
            title:              Language.translate("components.input_color.schema.form_selector_sl_square.title"),
            description:        Language.translate("components.input_color.schema.form_selector_sl_square.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_optionWidth.name],
            ]
        },
        [ComponentInputColorConfigs.schemas.FormSelectorHueSlider.name]: {
            part:               ComponentInputColorConfigs.schemas.FormSelectorHueSlider.name,
            title:              Language.translate("components.input_color.schema.form_selector_hue_slider.title"),
            description:        Language.translate("components.input_color.schema.form_selector_hue_slider.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_optionWidth.name],
            ]
        },
        [ComponentInputColorConfigs.schemas.FormSelectorOpacitySlider.name]: {
            part:               ComponentInputColorConfigs.schemas.FormSelectorOpacitySlider.name,
            title:              Language.translate("components.input_color.schema.form_selector_opacity_slider.title"),
            description:        Language.translate("components.input_color.schema.form_selector_opacity_slider.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_optionWidth.name],
            ]
        },
        [ComponentInputColorConfigs.schemas.FormSelectorInfoCode.name]: {
            part:               ComponentInputColorConfigs.schemas.FormSelectorInfoCode.name,
            title:              Language.translate("components.input_color.schema.form_selector_info_code.title"),
            description:        Language.translate("components.input_color.schema.form_selector_info_code.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_colorSelected.name],
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_colorBody.name],
            ]
        },
        [ComponentInputColorConfigs.schemas.FormSelectorInfoOpacity.name]: {
            part:               ComponentInputColorConfigs.schemas.FormSelectorInfoOpacity.name,
            title:              Language.translate("components.input_color.schema.form_selector_info_opacity.title"),
            description:        Language.translate("components.input_color.schema.form_selector_info_opacity.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_colorBody.name],
            ]
        },
        [ComponentInputColorConfigs.schemas.Validate.name]: {
            part:               ComponentInputColorConfigs.schemas.Validate.name,
            title:              Language.translate("components.input_color.schema.validate.title"),
            description:        Language.translate("components.input_color.schema.validate.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_hasRules.name],
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_isAbsoluteRule.name],
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_listRules.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTitle.name],
                this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_msgRules.name],
            ]
        },
    });


    _COMPONENT_TEMPLATES = defineComponentTemplate<ComponentInputColorTemplatesType, ComponentInputColorPropsType>({

    });


    _COMPONENT_METHODS = defineComponentMethods<ComponentInputColorMethodsType, ComponentInputColorPropsType>({
        [ComponentInputColorConfigs.methods.CHANGE.name]: {
            title:              Language.translate("components.input_color.methods.fn_onChangeColor.title"),
            description:        Language.translate("components.input_color.methods.fn_onChangeColor.description"),
            args: {
                [ComponentInputColorConfigs.methods.CHANGE.dataArgs.COLOR.name]: this._COMPONENT_PATTERN[ComponentInputColorConfigs.keys.prop_colorSelected.name],
            }
        },
    });


    static override renderExampleComponent(): any {
        return new ComponentInputColor(
            <ComponentInputColorPropsType>{
                classList: ["col-md-3", "col-12", "border", "p-2"],
                styles: {},
                prop_colorSelected: "#ff0000",
                prop_labelTitle: "Input Color",
                prop_labelTooltipDescription: "this is for color input",
            },
            <ComponentInputColorMethodsType>{
                fn_onChangeColor: function (event, dataArgs: ComponentInputColor_Methods_CHANGE_DataArgs, componentArgs: ComponentInputColor_Methods_CHANGE_ComponentArgs) {
                    console.log("color changed", dataArgs, componentArgs);
                }
            }
        ).getElement();
    }
}


export class ComponentInputColor extends ComponentInputColorBase {

    var_hue:               Observable<number>;
    var_sat:               Observable<number>;
    var_light:             Observable<number>;
    var_opacity:           Observable<number>;
    var_hex:               Observable<string>;
    var_hsl:               Observable<string>;
    var_rgbaColor:         Observable<string>;
    var_opacityPercent:    Observable<number>;
    var_showFormSelectOption: Observable<boolean>;
    var_popupDisplay:         Observable<Record<string, string>>;
    var_isEmptyColor:      Observable<boolean>;
    var_colorSelected:     Observable<string>;

    private var_draggingHue = false;
    private var_draggingSL = false;
    private var_draggingOpacity = false;

    private _hueCanvas: HTMLCanvasElement | null = null;
    private _slCanvas: HTMLCanvasElement | null = null;
    private _opacityCanvas: HTMLCanvasElement | null = null;
    private _hueIndicator: HTMLElement | null = null;
    private _slIndicator: HTMLElement | null = null;
    private _opacityIndicator: HTMLElement | null = null;
    private _componentElement: HTMLElement | null = null;


    constructor(
        config: ComponentInputColorPropsType,
        methods: ComponentInputColorMethodsType,
        events = null
    ) {
        super("input-color", null);
        super.renderComponent(config, methods, events);
        this._componentElement = this.getElement() as HTMLElement;
    }


    override renderContentComponent() {
        return this.executeSchemaPart(ComponentInputColorConfigs.schemas.Main.name);
    }

    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentInputColorConfigs.schemas.Main.name:
                return this.template_render_main(attrsDefault, data, extra);
            case ComponentInputColorConfigs.schemas.FormColor.name:
                return this.template_render_form_color(attrsDefault, data, extra);
            case ComponentInputColorConfigs.schemas.FormColorIconEmpty.name:
                return this.template_render_form_color_icon_empty(attrsDefault, data, extra);
            case ComponentInputColorConfigs.schemas.FormTitle.name:
                return this.template_render_form_title(attrsDefault, data, extra);
            case ComponentInputColorConfigs.schemas.FormIconClear.name:
                return this.template_render_form_icon_clear(attrsDefault, data, extra);
            case ComponentInputColorConfigs.schemas.FormSelector.name:
                return this.template_render_form_selector(attrsDefault, data, extra);
            case ComponentInputColorConfigs.schemas.FormSelectorBorder.name:
                return this.template_render_form_selector_border(attrsDefault, data, extra);
            case ComponentInputColorConfigs.schemas.FormSelectorSLSquare.name:
                return this.template_render_form_selector_sl_square(attrsDefault, data, extra);
            case ComponentInputColorConfigs.schemas.FormSelectorHueSlider.name:
                return this.template_render_form_selector_hue_slider(attrsDefault, data, extra);
            case ComponentInputColorConfigs.schemas.FormSelectorOpacitySlider.name:
                return this.template_render_form_selector_opacity_slider(attrsDefault, data, extra);
            case ComponentInputColorConfigs.schemas.FormSelectorInfoCode.name:
                return this.template_render_form_selector_info_code(attrsDefault, data, extra);
            case ComponentInputColorConfigs.schemas.FormSelectorInfoOpacity.name:
                return this.template_render_form_selector_info_opacity(attrsDefault, data, extra);
            case ComponentInputColorConfigs.schemas.Validate.name:
                return this.template_render_validate(attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
        TEMPLATEs
    --------------------------------------------- */
    private template_render_main(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            this.fn_setupObservables();

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault
                },
                className: ["position-relative"],
                styles: {
                    display: "flow-root"
                },
                children: [
                    this.executeSchemaPart(ComponentInputColorConfigs.schemas.FormColor.name),
                    this.executeSchemaPart(ComponentInputColorConfigs.schemas.FormTitle.name),
                    this.executeSchemaPart(ComponentInputColorConfigs.schemas.FormIconClear.name),
                    this.executeSchemaPart(ComponentInputColorConfigs.schemas.FormSelector.name),
                    this.executeSchemaPart(ComponentInputColorConfigs.schemas.Validate.name),
                ]
            });
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_form_color(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_isDisable =     data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_borderColor =   data[ComponentInputColorConfigs.keys.prop_borderColor.name];
            const prop_formClass =     data[ComponentInputColorConfigs.keys.prop_formClass.name];
            const prop_formStyles =    data[ComponentInputColorConfigs.keys.prop_formStyles.name];
            const prop_size =          data[ComponentInputColorConfigs.keys.prop_size.name];

            const directionRtl = AppConfig.get("directionRtl");
            const elHeight = ToolsCss.getHeightSize(prop_size instanceof Observable ? prop_size.get() : prop_size);

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault
                },
                className: [
                    ...(prop_formClass instanceof Observable ? [] : (prop_formClass || [])),
                    "position-relative"
                ],
                classBind: [
                    prop_formClass instanceof Observable ? prop_formClass : null,
                ].filter(Boolean),
                styles: {
                    cursor: (prop_isDisable instanceof Observable ? prop_isDisable.get() : prop_isDisable) ? "not-allowed" : "pointer",
                    border: `solid 1px ${prop_borderColor instanceof Observable ? prop_borderColor.get() : prop_borderColor}`,
                    boxShadow: "#00000047 0px 0px 5px, inset 0 2px 4px #0000004d",
                    float: directionRtl ? "right" : "left",
                    width: `${elHeight}px`,
                    height: `${elHeight}px`,
                    ...(prop_formStyles instanceof Observable ? prop_formStyles.get() : prop_formStyles),
                },
                stylesBind: {
                    backgroundColor: Observable.computed(
                        (isEmpty: boolean, rgba: string) => isEmpty ? "" : rgba,
                        [this.var_isEmptyColor, this.var_rgbaColor],
                        this.getScope()
                    ),
                },
                on: {
                    click: (e) => this.fn_onclickInputColor(e)
                },
                children: [
                    this.executeSchemaPart(ComponentInputColorConfigs.schemas.FormColorIconEmpty.name)
                ]
            });
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_form_color_icon_empty(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_size =            data[ComponentInputColorConfigs.keys.prop_size.name];
            const prop_colorIconEmpty =  data[ComponentInputColorConfigs.keys.prop_colorIconEmpty.name];

            const sizeVal = prop_size instanceof Observable ? prop_size.get() : prop_size;

            return new ToolsComponents.ComponentIcon(
                <any>{
                    prop_structureClass: ["position-absolute"],
                    prop_structureStyles: {
                        zIndex: `${ToolsCss.getZIndex(Z_INDEXES.icon_attach, 5)}`,
                        cursor: "pointer",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    },
                    prop_icon: ToolsIcons.icon_empty({size: sizeVal}),
                    prop_iconClass: [],
                    prop_iconStyles: {},
                },
                <ComponentIconMethodsType>{
                    fn_onClickIcon: () => {},
                    fn_onHoverIcon: () => {},
                    fn_onBlurIcon: () => {}
                }
            ).getReactiveElement();
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_form_title(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_size =            data[ComponentInputColorConfigs.keys.prop_size.name];
            const prop_showTitleFront =  data[ComponentInputColorConfigs.keys.prop_showTitleFront.name];

            const sizeVal = prop_size instanceof Observable ? prop_size.get() : prop_size;
            const elHeight = ToolsCss.getHeightSize(sizeVal);
            const elFontSize = ToolsCss.getFontSize(sizeVal);
            const directionRtl = AppConfig.get("directionRtl");

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault
                },
                className: ["mx-2"],
                classBind: [
                    prop_showTitleFront instanceof Observable
                        ? prop_showTitleFront.mapBoolean("show", "d-none")
                        : (prop_showTitleFront ? "show" : "d-none")
                ],
                styles: {
                    cursor: "pointer",
                    float: directionRtl ? "right" : "left",
                    height: `${elHeight}px`,
                    lineHeight: `${elHeight}px`,
                    fontSize: `${elFontSize}px`,
                },
                stylesBind: {
                    color: this.var_hex,
                },
                on: {
                    click: (e) => this.fn_onclickInputColor(e)
                },
                children: [
                    ReactiveElement.b({
                        children: [this.var_hex]
                    })
                ]
            });
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_form_icon_clear(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_isDisable =       data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_size =            data[ComponentInputColorConfigs.keys.prop_size.name];
            const prop_colorIconClear =  data[ComponentInputColorConfigs.keys.prop_colorIconClear.name];

            const isDisable = prop_isDisable instanceof Observable ? prop_isDisable.get() : prop_isDisable;
            if (isDisable) return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);

            const sizeVal = prop_size instanceof Observable ? prop_size.get() : prop_size;
            const directionRtl = AppConfig.get("directionRtl");

            const styles: Record<string, string> = {
                zIndex: `${ToolsCss.getZIndex(Z_INDEXES.icon_attach, 5)}`,
                cursor: "pointer",
                top: "50%",
            };
            if (directionRtl) {
                styles["left"] = "0";
                styles["transform"] = "translate(5px, -50%)";
            } else {
                styles["right"] = "0";
                styles["transform"] = "translate(-5px, -50%)";
            }

            return new ToolsComponents.ComponentIcon(
                <any>{
                    prop_structureClass: ["position-absolute"],
                    prop_structureStyles: styles,
                    prop_icon: ToolsIcons.icon_clear_broom({size: sizeVal}),
                    prop_iconClass: [],
                    prop_iconStyles: {},
                },
                <ComponentIconMethodsType>{
                    fn_onClickIcon: () => {
                        this.fn_clearColor();
                    },
                    fn_onHoverIcon: () => {},
                    fn_onBlurIcon: () => {}
                }
            ).getReactiveElement();
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_form_selector(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_optionHeight =        data[ComponentInputColorConfigs.keys.prop_optionHeight.name];
            const prop_optionWidth =         data[ComponentInputColorConfigs.keys.prop_optionWidth.name];
            const prop_optionStyles =        data[ComponentInputColorConfigs.keys.prop_optionStyles.name];
            const prop_backgroundColorBody = data[ComponentInputColorConfigs.keys.prop_backgroundColorBody.name];

            const heightVal = prop_optionHeight instanceof Observable ? prop_optionHeight.get() : prop_optionHeight;
            const widthVal = prop_optionWidth instanceof Observable ? prop_optionWidth.get() : prop_optionWidth;

            return new ComponentElementPosition(
                <any>{
                    classList: [],
                    prop_positionType: "absolute",
                    prop_positionTop: SizeUnit(100, UNITS.PERCENT),
                    prop_positionLeft: SizeUnit(0, UNITS.PERCENT),
                    prop_positionWidth: SizeUnit(widthVal, UNITS.PEXEL),
                    prop_positionHeight: SizeUnit(heightVal, UNITS.PEXEL),
                    prop_positionZIndex: ToolsCss.getZIndex(Z_INDEXES.popup, 100),
                    prop_positionStyles: {
                        display: this.var_popupDisplay,
                    },
                    prop_content: this.executeSchemaPart(ComponentInputColorConfigs.schemas.FormSelectorBorder.name),
                },
                <ComponentElementPositionMethodsType>{}
            ).getReactiveElement();
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_form_selector_border(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_backgroundColorBody = data[ComponentInputColorConfigs.keys.prop_backgroundColorBody.name];
            const prop_optionStyles =        data[ComponentInputColorConfigs.keys.prop_optionStyles.name];

            const bgVal = prop_backgroundColorBody instanceof Observable ? prop_backgroundColorBody.get() : prop_backgroundColorBody;

            return new ToolsComponents.ComponentBorder(
                <any>{
                    prop_borderClass: ["shadow-sm", "position-relative", "px-2", "rounded", "form-control", "custom-select"],
                    prop_borderStyles: {
                        display: "flow-root",
                        backgroundColor: bgVal,
                        ...(prop_optionStyles instanceof Observable ? prop_optionStyles.get() : prop_optionStyles),
                    },
                    prop_content: [
                        ReactiveElement.part("section", {
                            className: ["row", "px-0", "py-2", "m-0"],
                            children: [
                                ReactiveElement.part("div", {
                                    className: ["col-10", "mt-2"],
                                    children: [
                                        this.executeSchemaPart(ComponentInputColorConfigs.schemas.FormSelectorSLSquare.name)
                                    ]
                                }),
                                ReactiveElement.part("div", {
                                    className: ["col-2", "mt-2"],
                                    children: [
                                        this.executeSchemaPart(ComponentInputColorConfigs.schemas.FormSelectorHueSlider.name)
                                    ]
                                }),
                                ReactiveElement.part("div", {
                                    className: ["col-12", "mt-2"],
                                    children: [
                                        this.executeSchemaPart(ComponentInputColorConfigs.schemas.FormSelectorOpacitySlider.name)
                                    ]
                                }),
                                ReactiveElement.part("div", {
                                    className: ["col-8", "border-top", "mt-3"],
                                    children: [
                                        this.executeSchemaPart(ComponentInputColorConfigs.schemas.FormSelectorInfoCode.name)
                                    ]
                                }),
                                ReactiveElement.part("div", {
                                    className: ["col-4", "border-top", "mt-3"],
                                    children: [
                                        this.executeSchemaPart(ComponentInputColorConfigs.schemas.FormSelectorInfoOpacity.name)
                                    ]
                                }),
                            ]
                        })
                    ]
                },
                <ComponentBorderMethodsType>{}
            ).getReactiveElement();
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_form_selector_sl_square(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_optionWidth = data[ComponentInputColorConfigs.keys.prop_optionWidth.name];
            const widthVal = prop_optionWidth instanceof Observable ? prop_optionWidth.get() : prop_optionWidth;
            const size = Math.round(widthVal * 0.70);

            const canvasEl = document.createElement("canvas");
            canvasEl.className = "sl-canvas";
            canvasEl.width = size;
            canvasEl.height = size;
            canvasEl.style.cursor = "pointer";

            const indicatorEl = document.createElement("div");
            indicatorEl.className = "sl-indicator";
            indicatorEl.style.cssText = `position:absolute;width:20px;height:20px;background-color:white;border-radius:100%;transform:translate(-50%, -50%);pointer-events:none;`;
            const innerDot = document.createElement("div");
            innerDot.style.cssText = `position:absolute;width:8px;height:8px;background-color:#000;border-radius:100%;left:50%;top:50%;transform:translate(-50%, -50%);`;
            indicatorEl.appendChild(innerDot);

            this._slCanvas = canvasEl;
            this._slIndicator = indicatorEl;

            canvasEl.addEventListener("mousedown", (e) => {
                this.var_draggingSL = true;
                this.fn_moveSL(e);
            });

            this.fn_drawSL();

            const container = ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                styles: {
                    width: `${size}px`,
                    height: `${size}px`,
                    position: "relative",
                    cursor: "pointer",
                },
                children: [
                    canvasEl,
                    indicatorEl
                ]
            });
            return container;
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_form_selector_hue_slider(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_optionWidth = data[ComponentInputColorConfigs.keys.prop_optionWidth.name];
            const widthVal = prop_optionWidth instanceof Observable ? prop_optionWidth.get() : prop_optionWidth;
            const height = Math.round(widthVal * 0.70);

            const canvasEl = document.createElement("canvas");
            canvasEl.className = "hue-canvas";
            canvasEl.width = 20;
            canvasEl.height = height;
            canvasEl.style.cssText = "border-radius:30px;display:block;margin:0 auto;cursor:pointer;";

            const indicatorEl = document.createElement("div");
            indicatorEl.className = "hue-indicator";
            indicatorEl.style.cssText = `position:absolute;width:25px;height:25px;background:#fff;border-radius:100%;left:50%;transform:translate(-50%, -50%);`;

            this._hueCanvas = canvasEl;
            this._hueIndicator = indicatorEl;

            canvasEl.addEventListener("mousedown", (e) => {
                this.var_draggingHue = true;
                this.fn_moveHue(e);
            });

            this.fn_drawHue();

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                styles: {
                    width: "30px",
                    height: `${height}px`,
                    position: "relative",
                    cursor: "pointer",
                },
                children: [
                    canvasEl,
                    indicatorEl
                ]
            });
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_form_selector_opacity_slider(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_optionWidth = data[ComponentInputColorConfigs.keys.prop_optionWidth.name];
            const widthVal = prop_optionWidth instanceof Observable ? prop_optionWidth.get() : prop_optionWidth;
            const width = Math.round(widthVal * 0.70);

            const canvasEl = document.createElement("canvas");
            canvasEl.className = "opacity-canvas";
            canvasEl.width = width;
            canvasEl.height = 20;
            canvasEl.style.cssText = "border-radius:30px;margin-top:2.5px;cursor:pointer;";

            const indicatorEl = document.createElement("div");
            indicatorEl.className = "opacity-indicator";
            indicatorEl.style.cssText = `position:absolute;width:25px;height:25px;background:#fff;border-radius:100%;border:2px solid #fff;top:50%;transform:translate(-50%, -50%);pointer-events:none;`;

            this._opacityCanvas = canvasEl;
            this._opacityIndicator = indicatorEl;

            canvasEl.addEventListener("mousedown", (e) => {
                this.var_draggingOpacity = true;
                this.fn_moveOpacity(e);
            });

            this.fn_drawOpacity();

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                styles: {
                    position: "relative",
                    width: `${width}px`,
                    height: "25px",
                    cursor: "pointer",
                },
                children: [
                    canvasEl,
                    indicatorEl
                ]
            });
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_form_selector_info_code(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_colorBody = data[ComponentInputColorConfigs.keys.prop_colorBody.name];
            const colorBodyVal = prop_colorBody instanceof Observable ? prop_colorBody.get() : prop_colorBody;

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                className: ["text-center"],
                styles: {
                    cursor: "pointer",
                    color: colorBodyVal,
                },
                on: {
                    click: (e) => this.fn_copyColorCodeSelected(e)
                },
                children: [
                    ReactiveElement.p({
                        className: ["p-0", "m-0"],
                        children: [ReactiveElement.b({ children: ["Hex"] })]
                    }),
                    ReactiveElement.p({
                        className: ["p-0", "m-0", "txt-color-code"],
                        children: [this.var_hex]
                    }),
                ]
            });
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_form_selector_info_opacity(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_colorBody = data[ComponentInputColorConfigs.keys.prop_colorBody.name];
            const colorBodyVal = prop_colorBody instanceof Observable ? prop_colorBody.get() : prop_colorBody;

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                className: ["text-center"],
                styles: {
                    color: colorBodyVal,
                },
                children: [
                    ReactiveElement.p({
                        className: ["p-0", "m-0"],
                        children: [ReactiveElement.b({ children: ["Opacity"] })]
                    }),
                    ReactiveElement.p({
                        className: ["p-0", "m-0", "txt-color-opacity"],
                        children: [this.var_opacityPercent.map(v => String(v))]
                    }),
                ]
            });
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_validate(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_isDisable =       data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_isAbsoluteRule =  data[ComponentInputColorConfigs.keys.prop_isAbsoluteRule.name];
            const prop_listRules =       data[ComponentInputColorConfigs.keys.prop_listRules.name];
            const prop_title =           data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTitle.name];
            const prop_msgRules =        data[ComponentInputColorConfigs.keys.prop_msgRules.name];

            const isDisable = prop_isDisable instanceof Observable ? prop_isDisable.get() : prop_isDisable;
            if (isDisable) return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);

            const listRules = prop_listRules instanceof Observable ? prop_listRules.get() : prop_listRules;
            if (!Array.isArray(listRules) || listRules.length === 0) return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);

            return new ToolsComponents.ComponentValidate(
                <any>{
                    classList: ["mt-1"],
                    prop_reference: `component-input-color-value-${this._COMPONENT_RANDOM_ID}`,
                    prop_isAbsolute: prop_isAbsoluteRule instanceof Observable ? prop_isAbsoluteRule.get() : prop_isAbsoluteRule,
                    prop_listRules: listRules,
                    prop_msgRules: prop_msgRules instanceof Observable ? prop_msgRules.get() : prop_msgRules,
                    prop_title: prop_title instanceof Observable ? prop_title.get() : (prop_title ?? ""),
                    prop_size: "m",
                    prop_value: this.var_colorSelected,
                },
                <ComponentValidateMethodsType>{
                    fn_onChangeValidate: () => {}
                }
            ).getReactiveElement();
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
        FUNCTIONs
    --------------------------------------------- */
    private fn_setupObservables(): void {
        const propColorObs = this.getObservable(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name);
        const propColorSelected = this.getObservable(ComponentInputColorConfigs.keys.prop_colorSelected.name);
        const propIsEmpty = this.getObservable(ComponentInputColorConfigs.keys.var_isEmptyColor.name);

        const initialColor = (propColorSelected instanceof Observable ? propColorSelected.get() : null)
            ?? (propColorObs instanceof Observable ? propColorObs.get() : null)
            ?? "#ff0000";

        this.var_colorSelected = propColorObs instanceof Observable ? propColorObs : new Observable<string>(initialColor);
        this.var_isEmptyColor = propIsEmpty instanceof Observable ? propIsEmpty : new Observable<boolean>(false);
        this.var_showFormSelectOption = new Observable<boolean>(false);
        this.var_popupDisplay = this.var_showFormSelectOption.map(
            (show: boolean) => ({ display: show ? "block" : "none" }) as Record<string, string>,
            this.getScope()
        );

        const [h, s, l] = this.fn_hexToHsl(initialColor);
        this.var_hue = new Observable<number>(h);
        this.var_sat = new Observable<number>(s);
        this.var_light = new Observable<number>(l);
        this.var_opacity = new Observable<number>(1);

        this.var_hex = Observable.computed(
            (hue: number, sat: number, light: number) => this.fn_hslToHex(hue, sat, light),
            [this.var_hue, this.var_sat, this.var_light],
            this.getScope()
        );

        this.var_hsl = Observable.computed(
            (hue: number, sat: number, light: number) => `hsl(${Math.round(hue)},${Math.round(sat)}%,${Math.round(light)}%)`,
            [this.var_hue, this.var_sat, this.var_light],
            this.getScope()
        );

        this.var_rgbaColor = Observable.computed(
            (hue: number, sat: number, light: number, opacity: number) => {
                const rgb = this.fn_hslToRgb(hue, sat, light);
                return `rgba(${rgb.join(",")},${opacity})`;
            },
            [this.var_hue, this.var_sat, this.var_light, this.var_opacity],
            this.getScope()
        );

        this.var_opacityPercent = this.var_opacity.map(
            (v: number) => Math.round(v * 100),
            this.getScope()
        );

        if (!initialColor || initialColor === "") {
            this.var_isEmptyColor.set(true);
        }

        this.fn_connectGlobalMouseEvents();
    }


    private fn_connectGlobalMouseEvents(): void {
        window.addEventListener("mousemove", (e) => {
            if (this.var_draggingHue) this.fn_moveHue(e);
            if (this.var_draggingSL) this.fn_moveSL(e);
            if (this.var_draggingOpacity) this.fn_moveOpacity(e);
        });

        window.addEventListener("mouseup", () => {
            this.var_draggingHue = false;
            this.var_draggingSL = false;
            this.var_draggingOpacity = false;
        });

        document.addEventListener("click", (e) => this.fn_onClickOutside(e));
    }


    private fn_onclickInputColor(event: Event): void {
        const prop_isDisable = this.get(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name);
        if (prop_isDisable) return;

        event.stopPropagation();

        const isShowing = this.var_showFormSelectOption.get();
        this.var_showFormSelectOption.set(!isShowing);

        if (!isShowing) {
            requestAnimationFrame(() => {
                this.fn_drawHue();
                this.fn_drawSL();
                this.fn_drawOpacity();
                this.fn_updateIndicators();
            });
        }
    }


    private fn_onClickOutside(event: Event): void {
        if (!this.var_showFormSelectOption.get()) return;
        const target = event.target as HTMLElement;
        const selectorEl = this._componentElement?.querySelector('[data-part-name="part-form-selector"]');
        const formColorEl = this._componentElement?.querySelector('[data-part-name="part-form-color"]');
        if (selectorEl && !selectorEl.contains(target) && formColorEl && !formColorEl.contains(target)) {
            this.var_showFormSelectOption.set(false);
        }
    }


    private fn_clearColor(): void {
        this.var_isEmptyColor.set(true);
        this.var_colorSelected.set("");
        this.fn_onChangeColor("");
    }


    private fn_copyColorCodeSelected(event: Event): void {
        const hex = this.var_hex.get();
        navigator.clipboard?.writeText(hex);
    }


    private fn_drawHue(): void {
        const ctx = this._hueCanvas?.getContext("2d");
        if (!ctx || !this._hueCanvas) return;

        const grad = ctx.createLinearGradient(0, 0, 0, this._hueCanvas.height);
        grad.addColorStop(0, "red");
        grad.addColorStop(0.17, "yellow");
        grad.addColorStop(0.33, "lime");
        grad.addColorStop(0.5, "cyan");
        grad.addColorStop(0.67, "blue");
        grad.addColorStop(0.83, "magenta");
        grad.addColorStop(1, "red");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, this._hueCanvas.width, this._hueCanvas.height);
    }


    private fn_drawSL(): void {
        const ctx = this._slCanvas?.getContext("2d");
        if (!ctx || !this._slCanvas) return;

        const width = this._slCanvas.width;
        const height = this._slCanvas.height;
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;
        const hue = this.var_hue.get();

        for (let y = 0; y < height; y++) {
            const l = 100 - (y / height * 100);
            for (let x = 0; x < width; x++) {
                const s = x / width * 100;
                const rgb = this.fn_hslToRgb(hue, s, l);
                const idx = (y * width + x) * 4;
                data[idx] = rgb[0];
                data[idx + 1] = rgb[1];
                data[idx + 2] = rgb[2];
                data[idx + 3] = 255;
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }


    private fn_drawOpacity(): void {
        const ctx = this._opacityCanvas?.getContext("2d");
        if (!ctx || !this._opacityCanvas) return;

        const width = this._opacityCanvas.width;
        const height = this._opacityCanvas.height;
        const rgb = this.fn_hslToRgb(this.var_hue.get(), this.var_sat.get(), this.var_light.get());

        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, `rgba(${rgb.join(",")},0)`);
        grad.addColorStop(1, `rgba(${rgb.join(",")},1)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
    }


    private fn_updateIndicators(): void {
        if (this._slIndicator && this._slCanvas) {
            this._slIndicator.style.left = `${(this.var_sat.get() / 100 * this._slCanvas.width)}px`;
            this._slIndicator.style.top = `${((1 - this.var_light.get() / 100) * this._slCanvas.height)}px`;
        }
        if (this._hueIndicator && this._hueCanvas) {
            this._hueIndicator.style.top = `${(this.var_hue.get() / 360 * this._hueCanvas.height)}px`;
        }
        if (this._opacityIndicator && this._opacityCanvas) {
            this._opacityIndicator.style.left = `${(this.var_opacity.get() * this._opacityCanvas.width)}px`;
        }

        this.var_isEmptyColor.set(false);

        const hex = this.var_hex.get();
        const hsl = this.var_hsl.get();
        this.var_colorSelected.set(hsl);

        this.fn_drawSL();
        this.fn_drawOpacity();

        this.fn_onChangeColor(hex);
    }


    private fn_moveHue(e: MouseEvent): void {
        if (!this._hueCanvas) return;
        const rect = this._hueCanvas.getBoundingClientRect();
        let y = e.clientY - rect.top;
        y = Math.max(0, Math.min(y, this._hueCanvas.height));
        this.var_hue.set(y / this._hueCanvas.height * 360);
        this.fn_updateIndicators();
    }


    private fn_moveSL(e: MouseEvent): void {
        if (!this._slCanvas) return;
        const rect = this._slCanvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        x = Math.max(0, Math.min(x, this._slCanvas.width));
        y = Math.max(0, Math.min(y, this._slCanvas.height));
        this.var_sat.set(x / this._slCanvas.width * 100);
        this.var_light.set(100 - y / this._slCanvas.height * 100);
        this.fn_updateIndicators();
    }


    private fn_moveOpacity(e: MouseEvent): void {
        if (!this._opacityCanvas) return;
        const rect = this._opacityCanvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        x = Math.max(0, Math.min(x, this._opacityCanvas.width));
        this.var_opacity.set(parseFloat((x / this._opacityCanvas.width).toFixed(2)));
        if (this._opacityIndicator) {
            this._opacityIndicator.style.left = `${x}px`;
        }
        this.fn_drawOpacity();
    }


    private fn_hslToRgb(h: number, s: number, l: number): [number, number, number] {
        s /= 100; l /= 100;
        const k = (n: number) => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
    }


    private fn_hexToHsl(hex: string): [number, number, number] {
        if (!hex) return [0, 100, 50];
        hex = hex.replace(/^#/, "");
        if (hex.length === 3) {
            hex = hex.split("").map(x => x + x).join("");
        }
        const bigint = parseInt(hex, 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;

        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h: number, s: number, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
                default: h = 0;
            }
            h /= 6;
        }

        return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
    }


    private fn_hslToHex(h: number, s: number, l: number): string {
        s /= 100; l /= 100;
        const a = s * Math.min(l, 1 - l);
        const f = (n: number) => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color);
        };
        const r = f(0), g = f(8), b = f(4);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }


    private fn_onChangeColor(color: string): void {
        const params: ComponentInputColor_Methods_CHANGE_DataArgs = {
            [ComponentInputColorConfigs.methods.CHANGE.dataArgs.COLOR.name]: color,
        };
        this.executeMethod(ComponentInputColorConfigs.methods.CHANGE.name, null as any, params);
    }
}

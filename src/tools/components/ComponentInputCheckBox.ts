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
    ComponentBorder_Methods_CLICK_BORDER_ComponentArgs, ComponentBorder_Methods_CLICK_BORDER_DataArgs,
    ComponentBorderMethodsType,
    ComponentBorderProps,
    ComponentBorderPropsType
} from "./ComponentBorder";
import {ToolsIcons} from "../icons";
import {ComponentIconMethodsType, ComponentIconPropsType} from "./ComponentIcon";
import {fa} from "../../langs/Fa";
import {
    ComponentElementPosition,
    ComponentElementPositionMethodsType,
    ComponentElementPositionPropsType
} from "./ComponentElementPosition";







export const ComponentInputCheckBoxProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput,
    ...GOG_ComponentBasicProps_Component_Structure_FormInput_Value ,
    ...GOG_ComponentBasicProps_Component_Structure_FormInput_Label ,
    ///----------------------
    prop_borderIconClass :                   "prop_borderIconClass" ,
    prop_borderIconStyles :                  "prop_borderIconStyles" ,
    prop_borderIconColor_selected :          "prop_borderIconColor_selected" ,
    prop_borderIconColor_unSelected :        "prop_borderIconColor_unSelected" ,
    prop_borderIconColor_disable :           "prop_borderIconColor_disable" ,
    prop_borderIconWidth :                   "prop_borderIconWidth" ,
    prop_borderIconRadius :                  "prop_borderIconRadius" ,
    prop_borderIconOpacity :                 "prop_borderIconOpacity" ,
    prop_borderIconBackground_selected :     "prop_borderIconBackground_selected" ,
    prop_borderIconBackground_unSelected :   "prop_borderIconBackground_unSelected" ,
    prop_borderIconBackground_disable :      "prop_borderIconBackground_disable" ,

    prop_icon :                              "prop_icon" ,
    prop_iconClass :                         "prop_iconClass" ,
    prop_iconStyles :                        "prop_iconStyles" ,

    prop_title :                             "prop_title" ,
    prop_titleShow :                         "prop_titleShow" ,
    prop_titleClass :                        "prop_titleClass" ,
    prop_titleStyles :                       "prop_titleStyles" ,
    prop_titleColor_selected :               "prop_titleColor_selected" ,
    prop_titleColor_unSelected :             "prop_titleColor_unSelected" ,
    prop_titleColor_disable :                "prop_titleColor_disable" ,

} as const;


export const ComponentInputCheckBoxConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys ,
        ///----------------------
        [ComponentInputCheckBoxProps.prop_borderIconClass]: {
            name:               ComponentInputCheckBoxProps.prop_borderIconClass ,
            value:              GOG_SetValue<string[]>( [ ] ) ,
        } ,
        [ComponentInputCheckBoxProps.prop_borderIconStyles]: {
            name:               ComponentInputCheckBoxProps.prop_borderIconStyles ,
            value:              GOG_SetValue<Record<string, string>>( {}) ,
        } ,
        [ComponentInputCheckBoxProps.prop_borderIconColor_selected]: {
            name:               ComponentInputCheckBoxProps.prop_borderIconColor_selected ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1)) ,
        } ,
        [ComponentInputCheckBoxProps.prop_borderIconColor_unSelected]: {
            name:               ComponentInputCheckBoxProps.prop_borderIconColor_unSelected ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_3)) ,
        } ,
        [ComponentInputCheckBoxProps.prop_borderIconColor_disable]: {
            name:               ComponentInputCheckBoxProps.prop_borderIconColor_disable ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.DARK , COLORS_GRAD.GRADE_1)) ,
        } ,
        [ComponentInputCheckBoxProps.prop_borderIconWidth]: {
            name:               ComponentInputCheckBoxProps.prop_borderIconWidth ,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M),
        } ,
        [ComponentInputCheckBoxProps.prop_borderIconRadius]: {
            name:               ComponentInputCheckBoxProps.prop_borderIconRadius ,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M),
        } ,
        [ComponentInputCheckBoxProps.prop_borderIconOpacity]: {
            name:               ComponentInputCheckBoxProps.prop_borderIconOpacity ,
            value:              GOG_SetValue<number|null>(100),
        } ,
        [ComponentInputCheckBoxProps.prop_borderIconBackground_selected]: {
            name:               ComponentInputCheckBoxProps.prop_borderIconBackground_selected ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1)),
        } ,
        [ComponentInputCheckBoxProps.prop_borderIconBackground_unSelected]: {
            name:               ComponentInputCheckBoxProps.prop_borderIconBackground_unSelected ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.SHADOW , COLORS_GRAD.GRADE_2)),
        } ,
        [ComponentInputCheckBoxProps.prop_borderIconBackground_disable]: {
            name:               ComponentInputCheckBoxProps.prop_borderIconBackground_disable ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.DARK , COLORS_GRAD.GRADE_2)),
        } ,


        [ComponentInputCheckBoxProps.prop_icon]: {
            name:               ComponentInputCheckBoxProps.prop_icon ,
            value:              GOG_SetValue<IconsType |null>(ToolsIcons.icon_tik({size: AppConfig.get("stdHeight" , 30) - 5 , primaryColor: Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1)}) ) ,
        } ,
        [ComponentInputCheckBoxProps.prop_iconClass]: {
            name:               ComponentInputCheckBoxProps.prop_iconClass ,
            value:              GOG_SetValue<string[]>( [ ] ) ,
        } ,
        [ComponentInputCheckBoxProps.prop_iconStyles]: {
            name:               ComponentInputCheckBoxProps.prop_iconStyles ,
            value:              GOG_SetValue<Record<string, string>>( {}) ,
        } ,


        [ComponentInputCheckBoxProps.prop_title]: {
            name:               ComponentInputCheckBoxProps.prop_title ,
            value:              GOG_SetValue<string[]>( [ ] ) ,
        } ,
        [ComponentInputCheckBoxProps.prop_titleShow]: {
            name:               ComponentInputCheckBoxProps.prop_titleShow ,
            value:              GOG_SetValue<boolean>( true) ,
        } ,
        [ComponentInputCheckBoxProps.prop_titleClass]: {
            name:               ComponentInputCheckBoxProps.prop_titleClass ,
            value:              GOG_SetValue<string[]>( [ ] ) ,
        } ,
        [ComponentInputCheckBoxProps.prop_titleStyles]: {
            name:               ComponentInputCheckBoxProps.prop_titleStyles ,
            value:              GOG_SetValue<Record<string, string>>( {}) ,
        } ,
        [ComponentInputCheckBoxProps.prop_titleColor_selected]: {
            name:               ComponentInputCheckBoxProps.prop_titleColor_selected ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1)),
        } ,
        [ComponentInputCheckBoxProps.prop_titleColor_unSelected]: {
            name:               ComponentInputCheckBoxProps.prop_titleColor_unSelected ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_5)),
        } ,
        [ComponentInputCheckBoxProps.prop_titleColor_disable]: {
            name:               ComponentInputCheckBoxProps.prop_titleColor_disable ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.DARK , COLORS_GRAD.GRADE_2)),
        } ,

    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_Component_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_value_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_parts ,

        ///----------------------
        Main: {
            name:                      "part-main"
        } ,
        Main_Icon: {
            name:                      "part-main-icon"
        } ,
        Main_Icon_Position: {
            name:                      "part-main-icon-position"
        } ,
        Main_Icon_Position_CheckBox: {
            name:                      "part-main-icon-position-checkBox"
        } ,
        Main_Title: {
            name:                      "part-main-title"
        } ,
    } ,
    templates: {

    } ,
    methods: {
        CLICK: {
            name:                      "fn_onClickCheckbox" ,
            dataArgs: {},
            componentArgs: {
                IS_DISABLE : {
                    name:                 "isDisable"
                } ,
                VALUE : {
                    name:                 "value"
                }
            }
        },
    }
} as const


export type ComponentInputCheckBoxPropsType =        GOG_ExtractNameValue<typeof ComponentInputCheckBoxConfigs.keys>
export type ComponentInputCheckBoxSchemaType =       GOG_ExtractName<typeof ComponentInputCheckBoxConfigs.schemas>
export type ComponentInputCheckBoxTemplatesType =    GOG_ExtractName<typeof ComponentInputCheckBoxConfigs.templates>

export type ComponentInputCheckBox_Methods_CLICK_ComponentArgs =   GOG_ExtractName<typeof ComponentInputCheckBoxConfigs.methods.CLICK.componentArgs>
export type ComponentInputCheckBox_Methods_CLICK_DataArgs =        GOG_ExtractNameValue<typeof ComponentInputCheckBoxConfigs.methods.CLICK.dataArgs>

export type ComponentInputCheckBoxMethodsType = {
    [ComponentInputCheckBoxConfigs.methods.CLICK.name]: ComponentCallBackType<ComponentInputCheckBox_Methods_CLICK_ComponentArgs , ComponentInputCheckBox_Methods_CLICK_DataArgs>
}


export abstract class ComponentInputCheckBoxBase extends ComponentBase<
    ComponentInputCheckBoxPropsType ,
    ComponentInputCheckBoxSchemaType ,
    ComponentInputCheckBoxTemplatesType ,
    ComponentInputCheckBoxMethodsType
    > {


    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN = defineComponentPatterns<ComponentInputCheckBoxPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Pattern(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Pattern(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Pattern(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Pattern(this) ,
        ///----------------------
        [ComponentInputCheckBoxConfigs.keys.prop_borderIconClass.name]: {
            prop:                                             ComponentInputCheckBoxConfigs.keys.prop_borderIconClass.name,
            default:                                          ComponentInputCheckBoxConfigs.keys.prop_borderIconClass.value,
            title:                                            Language.translate("components.input_check_box.prop.prop_borderIconClass.title"),
            description:                                      Language.translate("components.input_check_box.prop.prop_borderIconClass.description"),
        } ,
        [ComponentInputCheckBoxConfigs.keys.prop_borderIconStyles.name]: {
            prop:                                             ComponentInputCheckBoxConfigs.keys.prop_borderIconStyles.name,
            default:                                          ComponentInputCheckBoxConfigs.keys.prop_borderIconStyles.value,
            title:                                            Language.translate("components.input_check_box.prop.prop_borderIconStyles.title"),
            description:                                      Language.translate("components.input_check_box.prop.prop_borderIconStyles.description"),
        } ,
        [ComponentInputCheckBoxConfigs.keys.prop_borderIconColor_selected.name]: {
            prop:                                             ComponentInputCheckBoxConfigs.keys.prop_borderIconColor_selected.name,
            default:                                          ComponentInputCheckBoxConfigs.keys.prop_borderIconColor_selected.value,
            title:                                            Language.translate("components.input_check_box.prop.prop_borderIconColor_selected.title"),
            description:                                      Language.translate("components.input_check_box.prop.prop_borderIconColor_selected.description"),
        } ,
        [ComponentInputCheckBoxConfigs.keys.prop_borderIconColor_unSelected.name]: {
            prop:                                             ComponentInputCheckBoxConfigs.keys.prop_borderIconColor_unSelected.name,
            default:                                          ComponentInputCheckBoxConfigs.keys.prop_borderIconColor_unSelected.value,
            title:                                            Language.translate("components.input_check_box.prop.prop_borderIconColor_unSelected.title"),
            description:                                      Language.translate("components.input_check_box.prop.prop_borderIconColor_unSelected.description"),
        } ,
        [ComponentInputCheckBoxConfigs.keys.prop_borderIconColor_disable.name]: {
            prop:                                             ComponentInputCheckBoxConfigs.keys.prop_borderIconColor_disable.name,
            default:                                          ComponentInputCheckBoxConfigs.keys.prop_borderIconColor_disable.value,
            title:                                            Language.translate("components.input_check_box.prop.prop_borderIconColor_disable.title"),
            description:                                      Language.translate("components.input_check_box.prop.prop_borderIconColor_disable.description"),
        } ,
        [ComponentInputCheckBoxConfigs.keys.prop_borderIconWidth.name]: {
            prop:                                             ComponentInputCheckBoxConfigs.keys.prop_borderIconWidth.name,
            default:                                          ComponentInputCheckBoxConfigs.keys.prop_borderIconWidth.value,
            title:                                            Language.translate("components.input_check_box.prop.prop_borderIconWidth.title"),
            description:                                      Language.translate("components.input_check_box.prop.prop_borderIconWidth.description"),
        } ,
        [ComponentInputCheckBoxConfigs.keys.prop_borderIconRadius.name]: {
            prop:                                             ComponentInputCheckBoxConfigs.keys.prop_borderIconRadius.name,
            default:                                          ComponentInputCheckBoxConfigs.keys.prop_borderIconRadius.value,
            title:                                            Language.translate("components.input_check_box.prop.prop_borderIconRadius.title"),
            description:                                      Language.translate("components.input_check_box.prop.prop_borderIconRadius.description"),
        } ,
        [ComponentInputCheckBoxConfigs.keys.prop_borderIconOpacity.name]: {
            prop:                                             ComponentInputCheckBoxConfigs.keys.prop_borderIconOpacity.name,
            default:                                          ComponentInputCheckBoxConfigs.keys.prop_borderIconOpacity.value,
            title:                                            Language.translate("components.input_check_box.prop.prop_borderIconOpacity.title"),
            description:                                      Language.translate("components.input_check_box.prop.prop_borderIconOpacity.description"),
        } ,
        [ComponentInputCheckBoxConfigs.keys.prop_borderIconBackground_selected.name]: {
            prop:                                             ComponentInputCheckBoxConfigs.keys.prop_borderIconBackground_selected.name,
            default:                                          ComponentInputCheckBoxConfigs.keys.prop_borderIconBackground_selected.value,
            title:                                            Language.translate("components.input_check_box.prop.prop_borderIconBackground_selected.title"),
            description:                                      Language.translate("components.input_check_box.prop.prop_borderIconBackground_selected.description"),
        } ,
        [ComponentInputCheckBoxConfigs.keys.prop_borderIconBackground_unSelected.name]: {
            prop:                                             ComponentInputCheckBoxConfigs.keys.prop_borderIconBackground_unSelected.name,
            default:                                          ComponentInputCheckBoxConfigs.keys.prop_borderIconBackground_unSelected.value,
            title:                                            Language.translate("components.input_check_box.prop.prop_borderIconBackground_unSelected.title"),
            description:                                      Language.translate("components.input_check_box.prop.prop_borderIconBackground_unSelected.description"),
        } ,
        [ComponentInputCheckBoxConfigs.keys.prop_borderIconBackground_disable.name]: {
            prop:                                             ComponentInputCheckBoxConfigs.keys.prop_borderIconBackground_disable.name,
            default:                                          ComponentInputCheckBoxConfigs.keys.prop_borderIconBackground_disable.value,
            title:                                            Language.translate("components.input_check_box.prop.prop_borderIconBackground_disable.title"),
            description:                                      Language.translate("components.input_check_box.prop.prop_borderIconBackground_disable.description"),
        } ,

        [ComponentInputCheckBoxConfigs.keys.prop_icon.name]: {
            prop:                                             ComponentInputCheckBoxConfigs.keys.prop_icon.name,
            default:                                          ComponentInputCheckBoxConfigs.keys.prop_icon.value,
            title:                                            Language.translate("components.input_check_box.prop.prop_icon.title"),
            description:                                      Language.translate("components.input_check_box.prop.prop_icon.description"),
        } ,
        [ComponentInputCheckBoxConfigs.keys.prop_iconClass.name]: {
            prop:                                             ComponentInputCheckBoxConfigs.keys.prop_iconClass.name,
            default:                                          ComponentInputCheckBoxConfigs.keys.prop_iconClass.value,
            title:                                            Language.translate("components.input_check_box.prop.prop_iconClass.title"),
            description:                                      Language.translate("components.input_check_box.prop.prop_iconClass.description"),
        } ,
        [ComponentInputCheckBoxConfigs.keys.prop_iconStyles.name]: {
            prop:                                             ComponentInputCheckBoxConfigs.keys.prop_iconStyles.name,
            default:                                          ComponentInputCheckBoxConfigs.keys.prop_iconStyles.value,
            title:                                            Language.translate("components.input_check_box.prop.prop_iconStyles.title"),
            description:                                      Language.translate("components.input_check_box.prop.prop_iconStyles.description"),
        } ,

        [ComponentInputCheckBoxConfigs.keys.prop_title.name]: {
            prop:                                             ComponentInputCheckBoxConfigs.keys.prop_title.name,
            default:                                          ComponentInputCheckBoxConfigs.keys.prop_title.value,
            title:                                            Language.translate("components.input_check_box.prop.prop_title.title"),
            description:                                      Language.translate("components.input_check_box.prop.prop_title.description"),
        } ,
        [ComponentInputCheckBoxConfigs.keys.prop_titleShow.name]: {
            prop:                                             ComponentInputCheckBoxConfigs.keys.prop_titleShow.name,
            default:                                          ComponentInputCheckBoxConfigs.keys.prop_titleShow.value,
            title:                                            Language.translate("components.input_check_box.prop.prop_titleShow.title"),
            description:                                      Language.translate("components.input_check_box.prop.prop_titleShow.description"),
        } ,
        [ComponentInputCheckBoxConfigs.keys.prop_titleClass.name]: {
            prop:                                             ComponentInputCheckBoxConfigs.keys.prop_titleClass.name,
            default:                                          ComponentInputCheckBoxConfigs.keys.prop_titleClass.value,
            title:                                            Language.translate("components.input_check_box.prop.prop_titleClass.title"),
            description:                                      Language.translate("components.input_check_box.prop.prop_titleClass.description"),
        } ,
        [ComponentInputCheckBoxConfigs.keys.prop_titleStyles.name]: {
            prop:                                             ComponentInputCheckBoxConfigs.keys.prop_titleStyles.name,
            default:                                          ComponentInputCheckBoxConfigs.keys.prop_titleStyles.value,
            title:                                            Language.translate("components.input_check_box.prop.prop_titleStyles.title"),
            description:                                      Language.translate("components.input_check_box.prop.prop_titleStyles.description"),
        } ,
        [ComponentInputCheckBoxConfigs.keys.prop_titleColor_selected.name]: {
            prop:                                             ComponentInputCheckBoxConfigs.keys.prop_titleColor_selected.name,
            default:                                          ComponentInputCheckBoxConfigs.keys.prop_titleColor_selected.value,
            title:                                            Language.translate("components.input_check_box.prop.prop_titleColor_selected.title"),
            description:                                      Language.translate("components.input_check_box.prop.prop_titleColor_selected.description"),
        } ,
        [ComponentInputCheckBoxConfigs.keys.prop_titleColor_unSelected.name]: {
            prop:                                             ComponentInputCheckBoxConfigs.keys.prop_titleColor_unSelected.name,
            default:                                          ComponentInputCheckBoxConfigs.keys.prop_titleColor_unSelected.value,
            title:                                            Language.translate("components.input_check_box.prop.prop_titleColor_unSelected.title"),
            description:                                      Language.translate("components.input_check_box.prop.prop_titleColor_unSelected.description"),
        } ,
        [ComponentInputCheckBoxConfigs.keys.prop_titleColor_disable.name]: {
            prop:                                             ComponentInputCheckBoxConfigs.keys.prop_titleColor_disable.name,
            default:                                          ComponentInputCheckBoxConfigs.keys.prop_titleColor_disable.value,
            title:                                            Language.translate("components.input_check_box.prop.prop_titleColor_disable.title"),
            description:                                      Language.translate("components.input_check_box.prop.prop_titleColor_disable.description"),
        } ,
    });



    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentInputCheckBoxSchemaType , ComponentInputCheckBoxPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Schema(this) ,
        ///----------------------
        [ComponentInputCheckBoxConfigs.schemas.Main.name]: {
            part:               ComponentInputCheckBoxConfigs.schemas.Main.name ,
            title:              Language.translate("components.input_check_box.schema.main.title") ,
            description:        Language.translate("components.input_check_box.schema.main.description") ,
            props: [

            ]
        } ,
        [ComponentInputCheckBoxConfigs.schemas.Main_Icon.name]: {
            part:               ComponentInputCheckBoxConfigs.schemas.Main_Icon.name ,
            title:              Language.translate("components.input_check_box.schema.main_icon.title") ,
            description:        Language.translate("components.input_check_box.schema.main_icon.description") ,
            props: [
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name] ,
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_borderIconClass.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_borderIconStyles.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_borderIconColor_selected.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_borderIconColor_unSelected.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_borderIconColor_disable.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_borderIconWidth.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_borderIconOpacity.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_borderIconRadius.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_borderIconBackground_selected.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_borderIconBackground_unSelected.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_borderIconBackground_disable.name] ,
            ]
        } ,
        [ComponentInputCheckBoxConfigs.schemas.Main_Icon_Position.name]: {
            part:               ComponentInputCheckBoxConfigs.schemas.Main_Icon_Position.name ,
            title:              Language.translate("components.input_check_box.schema.main_icon_position.title") ,
            description:        Language.translate("components.input_check_box.schema.main_icon_position.description") ,
            props: [
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_icon.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_iconClass.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_iconStyles.name] ,
            ]
        } ,
        [ComponentInputCheckBoxConfigs.schemas.Main_Icon_Position_CheckBox.name]: {
            part:               ComponentInputCheckBoxConfigs.schemas.Main_Icon_Position_CheckBox.name ,
            title:              Language.translate("components.input_check_box.schema.main_icon_position_checkBox.title") ,
            description:        Language.translate("components.input_check_box.schema.main_icon_position_checkBox.description") ,
            props: [
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_icon.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_iconClass.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_iconStyles.name] ,
            ]
        } ,
        [ComponentInputCheckBoxConfigs.schemas.Main_Title.name]: {
            part:               ComponentInputCheckBoxConfigs.schemas.Main_Title.name ,
            title:              Language.translate("components.input_check_box.schema.main_title.title") ,
            description:        Language.translate("components.input_check_box.schema.main_title.description") ,
            props: [
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name] ,
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_title.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_titleShow.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_titleClass.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_titleStyles.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_titleColor_selected.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_titleColor_unSelected.name] ,
                this._COMPONENT_PATTERN[ComponentInputCheckBoxConfigs.keys.prop_titleColor_disable.name] ,
            ]
        } ,
    })




    /* ---------------------------------------------
           PROPERTYs Pattern
        --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentInputCheckBoxTemplatesType , ComponentInputCheckBoxPropsType>({

    });


    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentInputCheckBoxMethodsType , ComponentInputCheckBoxPropsType>({
        [ComponentInputCheckBoxConfigs.methods.CLICK.name]: {
            title:                                            Language.translate("components.input_check_box.methods.fn_onClickCheckbox.title"),
            description:                                      Language.translate("components.input_check_box.methods.fn_onClickCheckbox.description"),
            args: {
                [ComponentInputCheckBoxConfigs.methods.CLICK.componentArgs.IS_DISABLE.name] : this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name] ,
                [ComponentInputCheckBoxConfigs.methods.CLICK.componentArgs.VALUE.name] : this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name]
            }
        } ,
    });


    /* ---------------------------------------------
       Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        return new ComponentInputCheckBox(
            <ComponentInputCheckBoxPropsType>{
                classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                styles: {}  ,

                prop_value: true ,
                //prop_isDisable: true,
               // prop_name: "checkbox_name",
                prop_title: "Item CheckBox",

                prop_labelTitle: "Input checkBox" ,
                prop_labelTooltipDescription: "this is for checkBox"
            },
            <ComponentInputCheckBoxMethodsType>{
                fn_onClickCheckbox: function (event, dataArgs : ComponentInputCheckBox_Methods_CLICK_DataArgs, componentArgs: ComponentInputCheckBox_Methods_CLICK_ComponentArgs) {
                    console.log("checkbox" , dataArgs , componentArgs);
                }

            }
        ).getElement();
    }
}

export class ComponentInputCheckBox extends ComponentInputCheckBoxBase {

    /* ---------------------------------------------
       SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentInputCheckBoxPropsType,
        methods: ComponentInputCheckBoxMethodsType ,
        events = null
    ) {
        super("input-checkbox", null);
        super.renderComponent(config, methods , events);
    }


    /* ---------------------------------------------
     TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentInputCheckBoxConfigs.schemas.Main.name)
    }

    override renderManagerComponent(partName , attrsDefault, data , extra) : ReactiveElement {
        switch (partName){
            case ComponentInputCheckBoxConfigs.schemas.Main.name:
                return  this.template_render_main(attrsDefault , data , extra);
            case ComponentInputCheckBoxConfigs.schemas.Main_Icon.name:
                return  this.template_render_main_icon(attrsDefault , data , extra);
            case ComponentInputCheckBoxConfigs.schemas.Main_Icon_Position.name:
                return  this.template_render_main_icon_position(attrsDefault , data , extra);
            case ComponentInputCheckBoxConfigs.schemas.Main_Icon_Position_CheckBox.name:
                return  this.template_render_main_icon_position_checkBox(attrsDefault , data , extra);
            case ComponentInputCheckBoxConfigs.schemas.Main_Title.name:
                return  this.template_render_main_title(attrsDefault , data , extra);
        }
    }


    private template_render_main(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                styles: {},
                className: [
                     "p-0" , "m-0" , "mt-1"
                ] ,
                children: [
                    this.executeSchemaPart(ComponentInputCheckBoxConfigs.schemas.Main_Icon.name) ,
                    this.executeSchemaPart(ComponentInputCheckBoxConfigs.schemas.Main_Title.name) ,
                ]
            });

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_main_icon(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_value=                               data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name];
            const prop_isDisable=                           data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_borderIconClass=                     data[ComponentInputCheckBoxConfigs.keys.prop_borderIconClass.name];
            const prop_borderIconStyles=                    data[ComponentInputCheckBoxConfigs.keys.prop_borderIconStyles.name];
            const prop_borderIconColor_selected=            data[ComponentInputCheckBoxConfigs.keys.prop_borderIconColor_selected.name];
            const prop_borderIconColor_unSelected=          data[ComponentInputCheckBoxConfigs.keys.prop_borderIconColor_unSelected.name];
            const prop_borderIconColor_disable=             data[ComponentInputCheckBoxConfigs.keys.prop_borderIconColor_disable.name];
            const prop_borderIconWidth=                     data[ComponentInputCheckBoxConfigs.keys.prop_borderIconWidth.name];
            const prop_borderIconRadius=                    data[ComponentInputCheckBoxConfigs.keys.prop_borderIconRadius.name];
            const prop_borderIconOpacity=                   data[ComponentInputCheckBoxConfigs.keys.prop_borderIconOpacity.name];
            const prop_borderIconBackground_selected=       data[ComponentInputCheckBoxConfigs.keys.prop_borderIconBackground_selected.name];
            const prop_borderIconBackground_unSelected=     data[ComponentInputCheckBoxConfigs.keys.prop_borderIconBackground_unSelected.name];
            const prop_borderIconBackground_disable=        data[ComponentInputCheckBoxConfigs.keys.prop_borderIconBackground_disable.name];

            prop_borderIconStyles.set({
                ...prop_borderIconStyles.get() ,
                width:     SizeUnit(100 , UNITS.PERCENT) ,
                height:    SizeUnit(100 , UNITS.PERCENT) ,
                boxShadow: "#00000047 0px 0px 5px, inset 0 2px 4px #0000004d"
            });

            const directionRtl =     AppConfig.get("directionRtl");
            const stdHeight =        AppConfig.get("stdHeight" , 30);

            return new ToolsComponents.ComponentBorder(
                <ComponentBorderPropsType>{
                    //classList:                              ["col-md-2"  ] ,
                    styles: {
                        float:  directionRtl ? "right" : "left" ,
                        width:  SizeUnit(stdHeight + 10 , UNITS.PEXEL)
                    } ,
                    prop_structureClass:                    ["position-relative" ]  ,
                    prop_structureStyles:                       {
                        cursor:    "pointer" ,
                        width:     SizeUnit(stdHeight , UNITS.PEXEL) ,
                        height:     SizeUnit(stdHeight , UNITS.PEXEL) ,
                    }  ,

                    prop_content:                          this.executeSchemaPart(ComponentInputCheckBoxConfigs.schemas.Main_Icon_Position.name) ,
                    prop_borderClass:                      prop_borderIconClass ,
                    prop_borderStyles:                     prop_borderIconStyles ,
                    prop_borderRadius:                     prop_borderIconRadius ,
                    prop_borderWidth:                      prop_borderIconWidth ,
                    prop_borderOpacity:                    prop_borderIconOpacity,
                    prop_borderColor:                      prop_value.map(value=> {

                        return prop_isDisable.map(disable=> {
                            if (disable){
                                return prop_borderIconColor_disable.get()
                            }
                            else {
                                if (typeof value == "number"){
                                    if (value == 0){
                                        return prop_borderIconColor_unSelected.get()
                                    }
                                    else {
                                        return prop_borderIconColor_selected.get()
                                    }
                                }
                                else if (typeof value == "boolean" || typeof value == "string"){
                                    if (value){
                                        return prop_borderIconColor_selected.get()
                                    }
                                    else {
                                        return prop_borderIconColor_unSelected.get()
                                    }
                                }
                                return null
                            }
                        }).get()

                    }) ,
                    prop_contentBackgroundColor:           prop_value.map(value=> {

                        return prop_isDisable.map(disable=> {
                            if (disable){
                                return prop_borderIconBackground_disable.get()
                            }
                            else {
                                if (typeof value == "number"){
                                    if (value == 0){
                                        return prop_borderIconBackground_unSelected.get()
                                    }
                                    else {
                                        return prop_borderIconBackground_selected.get()
                                    }
                                }
                                else if (typeof value == "boolean" || typeof value == "string"){
                                    if (value){
                                        return prop_borderIconBackground_selected.get()
                                    }
                                    else {
                                        return prop_borderIconBackground_unSelected.get()
                                    }
                                }
                                return null
                            }
                        }).get()

                    })
                } ,
                <ComponentBorderMethodsType>{
                    fn_onClickBorder: function (event, dataArgs : ComponentBorder_Methods_CLICK_BORDER_ComponentArgs, componentArgs: ComponentBorder_Methods_CLICK_BORDER_DataArgs)  {
                        this.pr_setChangeValue(event)
                    }.bind(this) ,
                }
            ).getReactiveElement();

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    private template_render_main_icon_position(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            return new ComponentElementPosition(
                <ComponentElementPositionPropsType>{
                    classList:               ["d-block"]  ,
                    styles: {
                        width:        SizeUnit(100 , UNITS.PERCENT) ,
                        height:       SizeUnit(100 , UNITS.PERCENT) ,
                    },
                    prop_structureStyles: {
                        width:        SizeUnit(100 , UNITS.PERCENT) ,
                        height:       SizeUnit(100 , UNITS.PERCENT) ,
                    },
                    prop_positionStyles: {
                        width:        SizeUnit(100 , UNITS.PERCENT) ,
                        height:       SizeUnit(100 , UNITS.PERCENT) ,
                    },

                    prop_positionTop:        SizeUnit(50 , UNITS.PERCENT) ,
                    prop_positionLeft:       SizeUnit(50 , UNITS.PERCENT) ,
                    prop_positionTranslate:  TranslateUnit(SizeUnit(-50 , UNITS.PERCENT ) , SizeUnit(-50 , UNITS.PERCENT )) ,
                    prop_positionHeight:     null ,
                    prop_content:            this.executeSchemaPart(ComponentInputCheckBoxConfigs.schemas.Main_Icon_Position_CheckBox.name) ,
                } ,
                <ComponentElementPositionMethodsType>{

                }
            ).getReactiveElement();

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_main_icon_position_checkBox(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_value=                  data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name];
            const prop_icon=                   data[ComponentInputCheckBoxConfigs.keys.prop_icon.name];
            const prop_iconClass=              data[ComponentInputCheckBoxConfigs.keys.prop_iconClass.name];
            const prop_iconStyles=             data[ComponentInputCheckBoxConfigs.keys.prop_iconStyles.name];

            return new ToolsComponents.ComponentIcon(
                <ComponentIconPropsType>{
                    prop_structureClass:                    ["position-absolute" ]  ,
                    prop_structureStyles:     {
                        top:          SizeUnit(50 , UNITS.PERCENT) ,
                        left:         SizeUnit(50 , UNITS.PERCENT) ,
                        transform:    TranslateUnit(SizeUnit(-50 , UNITS.PERCENT ) , SizeUnit(-50 , UNITS.PERCENT ))
                    },
                    prop_iconClass :                        prop_iconClass ,
                    prop_iconStyles :                       prop_iconStyles ,
                    prop_icon:                              prop_value.mapBoolean(prop_icon.get() , null)  ,

                },
                <ComponentIconMethodsType>{

                }
            ).getReactiveElement();


        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_main_title(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_value=                   data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name];
            const prop_isDisable=               data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_title=                   data[ComponentInputCheckBoxConfigs.keys.prop_title.name];
            const prop_titleShow=               data[ComponentInputCheckBoxConfigs.keys.prop_titleShow.name];
            const prop_titleClass=              data[ComponentInputCheckBoxConfigs.keys.prop_titleClass.name];
            const prop_titleStyles=             data[ComponentInputCheckBoxConfigs.keys.prop_titleStyles.name];
            const prop_titleColor_selected=     data[ComponentInputCheckBoxConfigs.keys.prop_titleColor_selected.name];
            const prop_titleColor_unSelected=   data[ComponentInputCheckBoxConfigs.keys.prop_titleColor_unSelected.name];
            const prop_titleColor_disable=      data[ComponentInputCheckBoxConfigs.keys.prop_titleColor_disable.name];


            const stdHeight =        AppConfig.get("stdHeight" , 30);
            const directionRtl =     AppConfig.get("directionRtl");
            const elFontSize =       ToolsCss.getFontSize(AppConfig.get("sizeName"));

            return ReactiveElement.part(  "b" ,{
                attrs: {
                    ...attrsDefault
                },
                className: [] ,
                styles: {
                    cursor:      "pointer" ,
                    float:        directionRtl ? "right" : "left" ,
                    fontSize:     SizeUnit(elFontSize , UNITS.POINT) ,
                    lineHeight:   SizeUnit(stdHeight , UNITS.PEXEL) ,
                    width:        SizeCalc(
                        SizeUnit(100 , UNITS.PERCENT ) , OPERATION.MINUS  ,
                        SizeUnit(stdHeight + 10 , UNITS.PEXEL)
                    ),
                },
                stylesBind: {
                    prop_titleStyles ,
                    color:        prop_value.map(value=> {

                        return prop_isDisable.map(disable=> {
                            if (disable){
                                return prop_titleColor_disable.get()
                            }
                            else {
                                if (typeof value == "number"){
                                    if (value == 0){
                                        return prop_titleColor_unSelected.get()
                                    }
                                    else {
                                        return prop_titleColor_selected.get()
                                    }
                                }
                                else if (typeof value == "boolean" || typeof value == "string"){
                                    if (value){
                                        return prop_titleColor_selected.get()
                                    }
                                    else {
                                        return prop_titleColor_unSelected.get()
                                    }
                                }
                                return null
                            }
                        }).get()

                    })
                } ,
                classBind: [
                    prop_titleShow.mapBoolean("show" ,"d-none") ,
                    prop_titleClass
                ],
                children: [
                    prop_title
                ] ,
                on: {
                    click: e => {
                        this.pr_setChangeValue(e)
                    }
                }
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }





    /* ---------------------------------------------
     FUNCTIONs
    --------------------------------------------- */
    private pr_onClickLabel(event , dataArgs , componentArgs): void{
        this.pr_setChangeValue(event)
    }

    private pr_setChangeValue(event) : void {
        const prop_isDisable = this.get(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name);
        if (prop_isDisable){

            const params : ComponentInputCheckBox_Methods_CLICK_DataArgs = {}
            this.executeMethod(ComponentInputCheckBoxConfigs.methods.CLICK.name  , event , params);
        }
        else {
            const prop_value=  this.get(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name);
            this.set(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name , !prop_value)

            const params : ComponentInputCheckBox_Methods_CLICK_DataArgs = {}
            this.executeMethod(ComponentInputCheckBoxConfigs.methods.CLICK.name  , event , params);
        }
    }

}
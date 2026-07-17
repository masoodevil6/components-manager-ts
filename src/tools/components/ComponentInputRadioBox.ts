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
    CssColorVar,
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
    ComponentBorder_Methods_CLICK_BORDER_ComponentArgs,
    ComponentBorder_Methods_CLICK_BORDER_DataArgs,
    ComponentBorderMethodsType,
    ComponentBorderPropsType
} from "./ComponentBorder";
import {ComponentIconMethodsType, ComponentIconPropsType} from "./ComponentIcon";
import {
    ComponentElementPosition,
    ComponentElementPositionMethodsType,
    ComponentElementPositionPropsType
} from "./ComponentElementPosition";
import {
    ComponentRecyclerViewPropsType,
    ComponentRecyclerViewMethodsType
} from "./ComponentRecyclerView";
import {
    ComponentValidateMethodsType,
    ComponentValidatePropsType
} from "./ComponentValidate";


export interface RadioOptionItem {
    id: string | number;
    name: string;
    body?: ReactiveElement | string | null;
}


export const ComponentInputRadioBoxProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput_Value,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput_Label,
    ///----------------------
    prop_title:                             "prop_title",
    prop_name:                              "prop_name",
    prop_options:                           "prop_options",
    prop_itemSelected:                      "prop_itemSelected",
    prop_direction:                         "prop_direction",
    prop_size:                              "prop_size",
    prop_labelClass:                        "prop_labelClass",
    prop_firstCallback:                     "prop_firstCallback",

    prop_borderIconClass:                   "prop_borderIconClass",
    prop_borderIconStyles:                  "prop_borderIconStyles",
    prop_borderIconColor_selected:          "prop_borderIconColor_selected",
    prop_borderIconColor_unSelected:        "prop_borderIconColor_unSelected",
    prop_borderIconColor_disable:           "prop_borderIconColor_disable",
    prop_borderIconWidth:                   "prop_borderIconWidth",
    prop_borderIconRadius:                  "prop_borderIconRadius",
    prop_borderIconOpacity:                 "prop_borderIconOpacity",
    prop_borderIconBackground_selected:     "prop_borderIconBackground_selected",
    prop_borderIconBackground_unSelected:   "prop_borderIconBackground_unSelected",
    prop_borderIconBackground_disable:      "prop_borderIconBackground_disable",

    prop_icon:                              "prop_icon",
    prop_iconClass:                         "prop_iconClass",
    prop_iconStyles:                        "prop_iconStyles",

    prop_titleShow:                         "prop_titleShow",
    prop_titleClass:                        "prop_titleClass",
    prop_titleStyles:                       "prop_titleStyles",
    prop_titleColor_selected:               "prop_titleColor_selected",
    prop_titleColor_unSelected:             "prop_titleColor_unSelected",
    prop_titleColor_disable:                "prop_titleColor_disable",

    prop_isAbsoluteRule:                    "prop_isAbsoluteRule",
    prop_listRules:                         "prop_listRules",
    prop_msgRules:                          "prop_msgRules",
} as const;


enum ComponentInputRadioBox_DirectionTypes {
    VERTICAL   = "vertical",
    HORIZONTAL = "horizontal",
}


const ComponentInputRadioBoxConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys,
        ///----------------------
        [ComponentInputRadioBoxProps.prop_title]: {
            name:               ComponentInputRadioBoxProps.prop_title,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentInputRadioBoxProps.prop_name]: {
            name:               ComponentInputRadioBoxProps.prop_name,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentInputRadioBoxProps.prop_options]: {
            name:               ComponentInputRadioBoxProps.prop_options,
            value:              GOG_SetValue<RadioOptionItem[]>([]),
        },
        [ComponentInputRadioBoxProps.prop_itemSelected]: {
            name:               ComponentInputRadioBoxProps.prop_itemSelected,
            value:              GOG_SetValue<string | number | null>(null),
        },
        [ComponentInputRadioBoxProps.prop_direction]: {
            name:               ComponentInputRadioBoxProps.prop_direction,
            value:              GOG_SetValue<GOG_ValueOf<typeof ComponentInputRadioBox_DirectionTypes>>(ComponentInputRadioBox_DirectionTypes.VERTICAL),
        },
        [ComponentInputRadioBoxProps.prop_size]: {
            name:               ComponentInputRadioBoxProps.prop_size,
            value:              GOG_SetValue<string>(SIZES.M),
        },
        [ComponentInputRadioBoxProps.prop_labelClass]: {
            name:               ComponentInputRadioBoxProps.prop_labelClass,
            value:              GOG_SetValue<string[]>([]),
        },
        [ComponentInputRadioBoxProps.prop_firstCallback]: {
            name:               ComponentInputRadioBoxProps.prop_firstCallback,
            value:              GOG_SetValue<boolean>(false),
        },

        [ComponentInputRadioBoxProps.prop_borderIconClass]: {
            name:               ComponentInputRadioBoxProps.prop_borderIconClass,
            value:              GOG_SetValue<string[]>([]),
        },
        [ComponentInputRadioBoxProps.prop_borderIconStyles]: {
            name:               ComponentInputRadioBoxProps.prop_borderIconStyles,
            value:              GOG_SetValue<Record<string, string>>({}),
        },
        [ComponentInputRadioBoxProps.prop_borderIconColor_selected]: {
            name:               ComponentInputRadioBoxProps.prop_borderIconColor_selected,
            value:              GOG_SetValue<CssColorVar | null>(Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1)),
        },
        [ComponentInputRadioBoxProps.prop_borderIconColor_unSelected]: {
            name:               ComponentInputRadioBoxProps.prop_borderIconColor_unSelected,
            value:              GOG_SetValue<CssColorVar | null>(Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_3)),
        },
        [ComponentInputRadioBoxProps.prop_borderIconColor_disable]: {
            name:               ComponentInputRadioBoxProps.prop_borderIconColor_disable,
            value:              GOG_SetValue<CssColorVar | null>(Color(COLORS_MAIN.DARK, COLORS_GRAD.GRADE_1)),
        },
        [ComponentInputRadioBoxProps.prop_borderIconWidth]: {
            name:               ComponentInputRadioBoxProps.prop_borderIconWidth,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M),
        },
        [ComponentInputRadioBoxProps.prop_borderIconRadius]: {
            name:               ComponentInputRadioBoxProps.prop_borderIconRadius,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(999),
        },
        [ComponentInputRadioBoxProps.prop_borderIconOpacity]: {
            name:               ComponentInputRadioBoxProps.prop_borderIconOpacity,
            value:              GOG_SetValue<number | null>(100),
        },
        [ComponentInputRadioBoxProps.prop_borderIconBackground_selected]: {
            name:               ComponentInputRadioBoxProps.prop_borderIconBackground_selected,
            value:              GOG_SetValue<CssColorVar | null>(Color(COLORS_MAIN.SECONDARY, COLORS_GRAD.GRADE_1)),
        },
        [ComponentInputRadioBoxProps.prop_borderIconBackground_unSelected]: {
            name:               ComponentInputRadioBoxProps.prop_borderIconBackground_unSelected,
            value:              GOG_SetValue<CssColorVar | null>(Color(COLORS_MAIN.SHADOW, COLORS_GRAD.GRADE_2)),
        },
        [ComponentInputRadioBoxProps.prop_borderIconBackground_disable]: {
            name:               ComponentInputRadioBoxProps.prop_borderIconBackground_disable,
            value:              GOG_SetValue<CssColorVar | null>(Color(COLORS_MAIN.DARK, COLORS_GRAD.GRADE_2)),
        },

        [ComponentInputRadioBoxProps.prop_icon]: {
            name:               ComponentInputRadioBoxProps.prop_icon,
            value:              GOG_SetValue<IconsType | null>(ToolsIcons.icon_tik({size: AppConfig.get("stdHeight", 30) - 5, primaryColor: Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1)})),
        },
        [ComponentInputRadioBoxProps.prop_iconClass]: {
            name:               ComponentInputRadioBoxProps.prop_iconClass,
            value:              GOG_SetValue<string[]>([]),
        },
        [ComponentInputRadioBoxProps.prop_iconStyles]: {
            name:               ComponentInputRadioBoxProps.prop_iconStyles,
            value:              GOG_SetValue<Record<string, string>>({}),
        },

        [ComponentInputRadioBoxProps.prop_titleShow]: {
            name:               ComponentInputRadioBoxProps.prop_titleShow,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentInputRadioBoxProps.prop_titleClass]: {
            name:               ComponentInputRadioBoxProps.prop_titleClass,
            value:              GOG_SetValue<string[]>([]),
        },
        [ComponentInputRadioBoxProps.prop_titleStyles]: {
            name:               ComponentInputRadioBoxProps.prop_titleStyles,
            value:              GOG_SetValue<Record<string, string>>({}),
        },
        [ComponentInputRadioBoxProps.prop_titleColor_selected]: {
            name:               ComponentInputRadioBoxProps.prop_titleColor_selected,
            value:              GOG_SetValue<CssColorVar | null>(Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1)),
        },
        [ComponentInputRadioBoxProps.prop_titleColor_unSelected]: {
            name:               ComponentInputRadioBoxProps.prop_titleColor_unSelected,
            value:              GOG_SetValue<CssColorVar | null>(Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_5)),
        },
        [ComponentInputRadioBoxProps.prop_titleColor_disable]: {
            name:               ComponentInputRadioBoxProps.prop_titleColor_disable,
            value:              GOG_SetValue<CssColorVar | null>(Color(COLORS_MAIN.DARK, COLORS_GRAD.GRADE_2)),
        },

        [ComponentInputRadioBoxProps.prop_isAbsoluteRule]: {
            name:               ComponentInputRadioBoxProps.prop_isAbsoluteRule,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentInputRadioBoxProps.prop_listRules]: {
            name:               ComponentInputRadioBoxProps.prop_listRules,
            value:              GOG_SetValue<any[]>([]),
        },
        [ComponentInputRadioBoxProps.prop_msgRules]: {
            name:               ComponentInputRadioBoxProps.prop_msgRules,
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
        BODY: {
            name:               "part_body"
        },
        OPTIONS: {
            name:               "part_options"
        },
        OPTION_ITEM: {
            name:               "part_option_item"
        },
        OPTION_ITEM_BORDER: {
            name:               "part_option_item_border"
        },
        OPTION_ITEM_ICON_POSITION: {
            name:               "part_option_item_icon_position"
        },
        OPTION_ITEM_ICON: {
            name:               "part_option_item_icon"
        },
        OPTION_ITEM_TITLE: {
            name:               "part_option_item_title"
        },
        OPTION_ITEM_BODY: {
            name:               "part_option_item_body"
        },
        SHARED_BODY: {
            name:               "part_shared_body"
        },
        VALIDATE: {
            name:               "part_validate"
        },
    },
    templates: {

    },
    methods: {
        SELECT_ITEM: {
            name:                      "fn_onSelectItem",
            dataArgs: {
                ITEM_ID: {
                    name:              "ITEM_ID",
                    value:             GOG_SetValue<string | number | null>(null),
                },
                ITEM_INDEX: {
                    name:              "ITEM_INDEX",
                    value:             GOG_SetValue<number>(0),
                },
            },
            componentArgs: {
                IS_DISABLE: {
                    name:              "IS_DISABLE"
                },
                VALUE: {
                    name:              "VALUE"
                }
            }
        },
    }
} as const;


export type ComponentInputRadioBoxPropsType =        GOG_ExtractNameValue<typeof ComponentInputRadioBoxConfigs.keys>
export type ComponentInputRadioBoxSchemaType =       GOG_ExtractName<typeof ComponentInputRadioBoxConfigs.schemas>
export type ComponentInputRadioBoxTemplatesType =    GOG_ExtractName<typeof ComponentInputRadioBoxConfigs.templates>

export type ComponentInputRadioBox_Methods_SELECT_ITEM_ComponentArgs = GOG_ExtractName<typeof ComponentInputRadioBoxConfigs.methods.SELECT_ITEM.componentArgs>
export type ComponentInputRadioBox_Methods_SELECT_ITEM_DataArgs =      GOG_ExtractNameValue<typeof ComponentInputRadioBoxConfigs.methods.SELECT_ITEM.dataArgs>

export type ComponentInputRadioBoxMethodsType = {
    [ComponentInputRadioBoxConfigs.methods.SELECT_ITEM.name]: ComponentCallBackType<ComponentInputRadioBox_Methods_SELECT_ITEM_ComponentArgs, ComponentInputRadioBox_Methods_SELECT_ITEM_DataArgs>
}


export abstract class ComponentInputRadioBoxBase extends ComponentBase<
    ComponentInputRadioBoxPropsType,
    ComponentInputRadioBoxSchemaType,
    ComponentInputRadioBoxTemplatesType,
    ComponentInputRadioBoxMethodsType
    > {

    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN = defineComponentPatterns<ComponentInputRadioBoxPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Pattern(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Pattern(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Pattern(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Pattern(this),
        ///----------------------
        [ComponentInputRadioBoxConfigs.keys.prop_title.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_title.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_title.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_title.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_title.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_name.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_name.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_name.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_name.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_name.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_options.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_options.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_options.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_options.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_options.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_itemSelected.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_itemSelected.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_itemSelected.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_itemSelected.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_itemSelected.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_direction.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_direction.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_direction.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_direction.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_direction.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_size.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_size.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_size.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_size.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_size.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_labelClass.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_labelClass.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_labelClass.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_labelClass.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_labelClass.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_firstCallback.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_firstCallback.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_firstCallback.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_firstCallback.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_firstCallback.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_borderIconClass.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_borderIconClass.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_borderIconClass.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_borderIconClass.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_borderIconClass.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_borderIconStyles.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_borderIconStyles.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_borderIconStyles.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_borderIconStyles.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_borderIconStyles.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_borderIconColor_selected.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_borderIconColor_selected.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_borderIconColor_selected.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_borderIconColor_selected.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_borderIconColor_selected.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_borderIconColor_unSelected.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_borderIconColor_unSelected.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_borderIconColor_unSelected.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_borderIconColor_unSelected.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_borderIconColor_unSelected.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_borderIconColor_disable.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_borderIconColor_disable.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_borderIconColor_disable.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_borderIconColor_disable.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_borderIconColor_disable.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_borderIconWidth.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_borderIconWidth.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_borderIconWidth.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_borderIconWidth.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_borderIconWidth.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_borderIconRadius.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_borderIconRadius.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_borderIconRadius.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_borderIconRadius.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_borderIconRadius.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_borderIconOpacity.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_borderIconOpacity.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_borderIconOpacity.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_borderIconOpacity.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_borderIconOpacity.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_borderIconBackground_selected.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_borderIconBackground_selected.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_borderIconBackground_selected.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_borderIconBackground_selected.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_borderIconBackground_selected.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_borderIconBackground_unSelected.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_borderIconBackground_unSelected.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_borderIconBackground_unSelected.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_borderIconBackground_unSelected.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_borderIconBackground_unSelected.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_borderIconBackground_disable.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_borderIconBackground_disable.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_borderIconBackground_disable.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_borderIconBackground_disable.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_borderIconBackground_disable.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_icon.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_icon.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_icon.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_icon.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_icon.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_iconClass.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_iconClass.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_iconClass.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_iconClass.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_iconClass.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_iconStyles.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_iconStyles.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_iconStyles.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_iconStyles.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_iconStyles.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_titleShow.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_titleShow.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_titleShow.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_titleShow.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_titleShow.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_titleClass.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_titleClass.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_titleClass.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_titleClass.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_titleClass.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_titleStyles.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_titleStyles.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_titleStyles.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_titleStyles.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_titleStyles.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_titleColor_selected.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_titleColor_selected.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_titleColor_selected.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_titleColor_selected.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_titleColor_selected.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_titleColor_unSelected.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_titleColor_unSelected.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_titleColor_unSelected.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_titleColor_unSelected.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_titleColor_unSelected.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_titleColor_disable.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_titleColor_disable.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_titleColor_disable.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_titleColor_disable.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_titleColor_disable.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_isAbsoluteRule.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_isAbsoluteRule.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_isAbsoluteRule.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_isAbsoluteRule.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_isAbsoluteRule.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_listRules.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_listRules.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_listRules.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_listRules.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_listRules.description"),
        },
        [ComponentInputRadioBoxConfigs.keys.prop_msgRules.name]: {
            prop:                                             ComponentInputRadioBoxConfigs.keys.prop_msgRules.name,
            default:                                          ComponentInputRadioBoxConfigs.keys.prop_msgRules.value,
            title:                                            Language.translate("components.input_radio_box.prop.prop_msgRules.title"),
            description:                                      Language.translate("components.input_radio_box.prop.prop_msgRules.description"),
        },
    })


    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentInputRadioBoxSchemaType, ComponentInputRadioBoxPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Schema(this),
        ///----------------------
        BODY: {
            part:               ComponentInputRadioBoxConfigs.schemas.BODY.name,
            title:              Language.translate("components.input_radio_box.schema.body.title"),
            description:        Language.translate("components.input_radio_box.schema.body.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_name.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_options.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_itemSelected.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_direction.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_firstCallback.name],
            ]
        },
        OPTIONS: {
            part:               ComponentInputRadioBoxConfigs.schemas.OPTIONS.name,
            title:              Language.translate("components.input_radio_box.schema.options.title"),
            description:        Language.translate("components.input_radio_box.schema.options.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_direction.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_options.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_itemSelected.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
            ]
        },
        OPTION_ITEM: {
            part:               ComponentInputRadioBoxConfigs.schemas.OPTION_ITEM.name,
            title:              Language.translate("components.input_radio_box.schema.option_item.title"),
            description:        Language.translate("components.input_radio_box.schema.option_item.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_itemSelected.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_borderIconClass.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_borderIconStyles.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_borderIconColor_selected.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_borderIconColor_unSelected.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_borderIconColor_disable.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_borderIconWidth.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_borderIconRadius.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_borderIconOpacity.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_borderIconBackground_selected.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_borderIconBackground_unSelected.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_borderIconBackground_disable.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_icon.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_iconClass.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_iconStyles.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_titleShow.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_titleClass.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_titleStyles.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_titleColor_selected.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_titleColor_unSelected.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_titleColor_disable.name],
            ]
        },
        OPTION_ITEM_BORDER: {
            part:               ComponentInputRadioBoxConfigs.schemas.OPTION_ITEM_BORDER.name,
            title:              Language.translate("components.input_radio_box.schema.option_item_border.title"),
            description:        Language.translate("components.input_radio_box.schema.option_item_border.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_itemSelected.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_borderIconClass.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_borderIconStyles.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_borderIconColor_selected.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_borderIconColor_unSelected.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_borderIconColor_disable.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_borderIconWidth.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_borderIconRadius.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_borderIconOpacity.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_borderIconBackground_selected.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_borderIconBackground_unSelected.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_borderIconBackground_disable.name],
            ]
        },
        OPTION_ITEM_ICON_POSITION: {
            part:               ComponentInputRadioBoxConfigs.schemas.OPTION_ITEM_ICON_POSITION.name,
            title:              Language.translate("components.input_radio_box.schema.option_item_icon_position.title"),
            description:        Language.translate("components.input_radio_box.schema.option_item_icon_position.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_itemSelected.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_icon.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_iconClass.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_iconStyles.name],
            ]
        },
        OPTION_ITEM_ICON: {
            part:               ComponentInputRadioBoxConfigs.schemas.OPTION_ITEM_ICON.name,
            title:              Language.translate("components.input_radio_box.schema.option_item_icon.title"),
            description:        Language.translate("components.input_radio_box.schema.option_item_icon.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_itemSelected.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_icon.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_iconClass.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_iconStyles.name],
            ]
        },
        OPTION_ITEM_TITLE: {
            part:               ComponentInputRadioBoxConfigs.schemas.OPTION_ITEM_TITLE.name,
            title:              Language.translate("components.input_radio_box.schema.option_item_title.title"),
            description:        Language.translate("components.input_radio_box.schema.option_item_title.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_itemSelected.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_titleShow.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_titleClass.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_titleStyles.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_titleColor_selected.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_titleColor_unSelected.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_titleColor_disable.name],
            ]
        },
        OPTION_ITEM_BODY: {
            part:               ComponentInputRadioBoxConfigs.schemas.OPTION_ITEM_BODY.name,
            title:              Language.translate("components.input_radio_box.schema.option_item_body.title"),
            description:        Language.translate("components.input_radio_box.schema.option_item_body.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_options.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_itemSelected.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_direction.name],
            ]
        },
        SHARED_BODY: {
            part:               ComponentInputRadioBoxConfigs.schemas.SHARED_BODY.name,
            title:              Language.translate("components.input_radio_box.schema.shared_body.title"),
            description:        Language.translate("components.input_radio_box.schema.shared_body.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_options.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_itemSelected.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_direction.name],
            ]
        },
        VALIDATE: {
            part:               ComponentInputRadioBoxConfigs.schemas.VALIDATE.name,
            title:              Language.translate("components.input_radio_box.schema.validate.title"),
            description:        Language.translate("components.input_radio_box.schema.validate.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_isAbsoluteRule.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_listRules.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_msgRules.name],
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_title.name],
            ]
        },
    })


    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentInputRadioBoxMethodsType, ComponentInputRadioBoxPropsType>({
        [ComponentInputRadioBoxConfigs.methods.SELECT_ITEM.name]: {
            title:                                            Language.translate("components.input_radio_box.methods.fn_onSelectItem.title"),
            description:                                      Language.translate("components.input_radio_box.methods.fn_onSelectItem.description"),
            args: {
                [ComponentInputRadioBoxConfigs.methods.SELECT_ITEM.dataArgs.ITEM_ID.name]:   this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_itemSelected.name],
                [ComponentInputRadioBoxConfigs.methods.SELECT_ITEM.dataArgs.ITEM_INDEX.name]: {
                    prop:  "ITEM_INDEX",
                    default: GOG_SetValue<number>(0),
                    title: Language.translate("components.input_radio_box.methods.fn_onSelectItem.dataArgs.ITEM_INDEX.title"),
                    description: Language.translate("components.input_radio_box.methods.fn_onSelectItem.dataArgs.ITEM_INDEX.description"),
                } as IComponentProp<any>,
                [ComponentInputRadioBoxConfigs.methods.SELECT_ITEM.componentArgs.IS_DISABLE.name]: this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name],
                [ComponentInputRadioBoxConfigs.methods.SELECT_ITEM.componentArgs.VALUE.name]:      this._COMPONENT_PATTERN[ComponentInputRadioBoxConfigs.keys.prop_itemSelected.name],
            }
        },
    });


    /* ---------------------------------------------
        PROPERTYs Templates
    --------------------------------------------- */
    _COMPONENT_TEMPLATES = defineComponentTemplate<ComponentInputRadioBoxTemplatesType, ComponentInputRadioBoxPropsType>({

    });


    /* ---------------------------------------------
        Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        const itemSelected = new Observable<string | number | null>("opt1");

        return new ComponentInputRadioBox(
            {
                classList: ["col-md-6", "col-12", "border", "p-2"],
                styles: {},

                prop_labelTitle: "Input RadioBox",
                prop_labelTooltipDescription: "This is a radio box with vertical and horizontal options",

                prop_title: "Select an option",
                prop_name: "radio_example",
                prop_options: [
                    {id: "opt1", name: "Option 1", body: "Body content for option 1"},
                    {id: "opt2", name: "Option 2", body: "Body content for option 2"},
                    {id: "opt3", name: "Option 3", body: "Body content for option 3"},
                ],
                prop_itemSelected: itemSelected,
                prop_direction: "vertical",
                prop_firstCallback: true,
            } as any as ComponentInputRadioBoxPropsType,
            <ComponentInputRadioBoxMethodsType>{
                fn_onSelectItem: function (event, dataArgs: ComponentInputRadioBox_Methods_SELECT_ITEM_DataArgs, componentArgs: ComponentInputRadioBox_Methods_SELECT_ITEM_ComponentArgs) {
                    console.log("radio selected", dataArgs, componentArgs);
                }
            }
        ).getElement() as HTMLElement;
    }
}


export class ComponentInputRadioBox extends ComponentInputRadioBoxBase {

    private var_itemSelected: Observable<string | number | null> = new Observable<string | number | null>(null);

    /* ---------------------------------------------
       SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentInputRadioBoxPropsType,
        methods: ComponentInputRadioBoxMethodsType,
        events = null
    ) {
        super("input-radio-box", null);
        super.renderComponent(config, methods, events);
        this.fn_setupItemSelectedListener();
    }


    /* ---------------------------------------------
       TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentInputRadioBoxConfigs.schemas.BODY.name)
    }

    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentInputRadioBoxConfigs.schemas.BODY.name:
                return this.template_render_body(attrsDefault, data, extra);
            case ComponentInputRadioBoxConfigs.schemas.OPTIONS.name:
                return this.template_render_options(attrsDefault, data, extra);
            case ComponentInputRadioBoxConfigs.schemas.OPTION_ITEM.name:
                return this.template_render_option_item(attrsDefault, data, extra);
            case ComponentInputRadioBoxConfigs.schemas.OPTION_ITEM_BORDER.name:
                return this.template_render_option_item_border(attrsDefault, data, extra);
            case ComponentInputRadioBoxConfigs.schemas.OPTION_ITEM_ICON_POSITION.name:
                return this.template_render_option_item_icon_position(attrsDefault, data, extra);
            case ComponentInputRadioBoxConfigs.schemas.OPTION_ITEM_ICON.name:
                return this.template_render_option_item_icon(attrsDefault, data, extra);
            case ComponentInputRadioBoxConfigs.schemas.OPTION_ITEM_TITLE.name:
                return this.template_render_option_item_title(attrsDefault, data, extra);
            case ComponentInputRadioBoxConfigs.schemas.OPTION_ITEM_BODY.name:
                return this.template_render_option_item_body(attrsDefault, data, extra);
            case ComponentInputRadioBoxConfigs.schemas.SHARED_BODY.name:
                return this.template_render_shared_body(attrsDefault, data, extra);
            case ComponentInputRadioBoxConfigs.schemas.VALIDATE.name:
                return this.template_render_validate(attrsDefault, data, extra);
        }
        return ReactiveElement.part("section", {attrs: {...attrsDefault}});
    }


    private template_render_body(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_direction = data[ComponentInputRadioBoxConfigs.keys.prop_direction.name];
            const isHorizontal = prop_direction instanceof Observable
                ? prop_direction.get() === ComponentInputRadioBox_DirectionTypes.HORIZONTAL
                : prop_direction === ComponentInputRadioBox_DirectionTypes.HORIZONTAL;

            const children: any[] = [
                this.executeSchemaPart(ComponentInputRadioBoxConfigs.schemas.OPTIONS.name),
            ];

            if (isHorizontal) {
                children.push(this.executeSchemaPart(ComponentInputRadioBoxConfigs.schemas.SHARED_BODY.name));
            }

            children.push(this.executeSchemaPart(ComponentInputRadioBoxConfigs.schemas.VALIDATE.name));

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-input-radio-box-body-${this._COMPONENT_RANDOM_ID}`,
                },
                styles: {},
                className: ["p-0", "m-0", "mt-1"],
                children: children,
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_options(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_direction = data[ComponentInputRadioBoxConfigs.keys.prop_direction.name];
            const prop_options = data[ComponentInputRadioBoxConfigs.keys.prop_options.name];
            const prop_itemSelected = data[ComponentInputRadioBoxConfigs.keys.prop_itemSelected.name];
            const prop_isDisable = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];

            if (prop_itemSelected instanceof Observable) {
                this.var_itemSelected = prop_itemSelected;
            }

            const options = prop_options instanceof Observable ? prop_options.get() : prop_options;
            if (!Array.isArray(options) || options.length === 0) {
                return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
            }

            const formDirection = prop_direction instanceof Observable
                ? prop_direction.map((d: string) => d === ComponentInputRadioBox_DirectionTypes.HORIZONTAL ? "horizontal" : "vertical")
                : new Observable(prop_direction === ComponentInputRadioBox_DirectionTypes.HORIZONTAL ? "horizontal" : "vertical");

            const optionItems: ReactiveElement[] = [];
            for (let i = 0; i < options.length; i++) {
                const item = options[i];
                const itemId = item.id ?? i;
                const itemName = item.name ?? "";
                const itemBody = item.body ?? null;

                optionItems.push(
                    this.template_render_option_item(attrsDefault, {
                        itemId,
                        itemName,
                        itemBody,
                        itemIndex: i,
                        prop_itemSelected,
                        prop_isDisable,
                    }, extra)
                );
            }

            return new ToolsComponents.ComponentRecyclerView(
                {
                    attrs: {
                        ...attrsDefault,
                        "id": `component-input-radio-box-options-${this._COMPONENT_RANDOM_ID}`,
                    },
                    prop_formDirection: formDirection,
                    prop_formComponents: optionItems,
                    prop_formClass: ["gap-2"],
                } as any as ComponentRecyclerViewPropsType,
                <ComponentRecyclerViewMethodsType>{}
            ).getReactiveElement();
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_option_item(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const itemId = data.itemId;
            const itemName = data.itemName;
            const itemBody = data.itemBody;
            const itemIndex = data.itemIndex;
            const prop_itemSelected = data.prop_itemSelected;
            const prop_isDisable = data.prop_isDisable;
            const prop_direction = this.get(ComponentInputRadioBoxConfigs.keys.prop_direction.name);

            const isHorizontal = prop_direction === ComponentInputRadioBox_DirectionTypes.HORIZONTAL;
            const isSelected = prop_itemSelected instanceof Observable
                ? prop_itemSelected.map((v: any) => v === itemId)
                : new Observable(prop_itemSelected === itemId);

            const stdHeight = AppConfig.get("stdHeight", 30);
            const directionRtl = AppConfig.get("directionRtl");

            const children: any[] = [
                ReactiveElement.part("div", {
                    styles: {
                        float: directionRtl ? "right" : "left",
                        width: SizeUnit(stdHeight + 10, UNITS.PEXEL),
                        cursor: "pointer",
                    },
                    children: [
                        this.template_render_option_item_border(attrsDefault, {
                            itemId,
                            prop_itemSelected,
                            prop_isDisable,
                        }, extra),
                    ],
                    on: {
                        click: (e: Event) => {
                            this.fn_onSelectItem(itemId, itemIndex);
                        }
                    }
                }),
                this.template_render_option_item_title(attrsDefault, {
                    itemId,
                    itemName,
                    prop_itemSelected,
                    prop_isDisable,
                }, extra),
            ];

            if (!isHorizontal && itemBody != null) {
                children.push(
                    this.template_render_option_item_body(attrsDefault, {
                        itemId,
                        itemBody,
                        itemIndex,
                        prop_itemSelected,
                    }, extra)
                );
            }

            return ReactiveElement.part("div", {
                attrs: {
                    ...attrsDefault,
                    "data-item-id": String(itemId),
                    "data-item-index": String(itemIndex),
                },
                className: ["mb-2", "position-relative"],
                stylesBind: {
                    opacity: prop_isDisable instanceof Observable
                        ? prop_isDisable.map((d: boolean) => d ? "0.5" : "1")
                        : (prop_isDisable ? "0.5" : "1"),
                },
                children: children,
                on: {
                    click: (e: Event) => {
                        this.fn_onSelectItem(itemId, itemIndex);
                    }
                }
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_option_item_border(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const itemId = data.itemId;
            const prop_itemSelected = data.prop_itemSelected;
            const prop_isDisable = data.prop_isDisable;

            const prop_borderIconClass = this.getObservable(ComponentInputRadioBoxConfigs.keys.prop_borderIconClass.name);
            const prop_borderIconStyles = this.getObservable(ComponentInputRadioBoxConfigs.keys.prop_borderIconStyles.name);
            const prop_borderIconColor_selected = this.getObservable(ComponentInputRadioBoxConfigs.keys.prop_borderIconColor_selected.name);
            const prop_borderIconColor_unSelected = this.getObservable(ComponentInputRadioBoxConfigs.keys.prop_borderIconColor_unSelected.name);
            const prop_borderIconColor_disable = this.getObservable(ComponentInputRadioBoxConfigs.keys.prop_borderIconColor_disable.name);
            const prop_borderIconWidth = this.getObservable(ComponentInputRadioBoxConfigs.keys.prop_borderIconWidth.name);
            const prop_borderIconRadius = this.getObservable(ComponentInputRadioBoxConfigs.keys.prop_borderIconRadius.name);
            const prop_borderIconOpacity = this.getObservable(ComponentInputRadioBoxConfigs.keys.prop_borderIconOpacity.name);
            const prop_borderIconBackground_selected = this.getObservable(ComponentInputRadioBoxConfigs.keys.prop_borderIconBackground_selected.name);
            const prop_borderIconBackground_unSelected = this.getObservable(ComponentInputRadioBoxConfigs.keys.prop_borderIconBackground_unSelected.name);
            const prop_borderIconBackground_disable = this.getObservable(ComponentInputRadioBoxConfigs.keys.prop_borderIconBackground_disable.name);

            prop_borderIconStyles.set({
                ...prop_borderIconStyles.get(),
                width:     SizeUnit(100, UNITS.PERCENT),
                height:    SizeUnit(100, UNITS.PERCENT),
                boxShadow: "#00000047 0px 0px 5px, inset 0 2px 4px #0000004d"
            });

            const stdHeight = AppConfig.get("stdHeight", 30);
            const directionRtl = AppConfig.get("directionRtl");

            const isSelectedObs = prop_itemSelected instanceof Observable
                ? prop_itemSelected.map((v: any) => v === itemId)
                : new Observable(prop_itemSelected === itemId);

            const isDisableObs = prop_isDisable instanceof Observable ? prop_isDisable : new Observable(prop_isDisable);

            return new ToolsComponents.ComponentBorder(
                {
                    styles: {
                        float: directionRtl ? "right" : "left",
                        width: SizeUnit(stdHeight + 10, UNITS.PEXEL),
                    },
                    prop_structureClass: ["position-relative"],
                    prop_structureStyles: {
                        cursor: "pointer",
                        width: SizeUnit(stdHeight, UNITS.PEXEL),
                        height: SizeUnit(stdHeight, UNITS.PEXEL),
                    },
                    prop_content: this.template_render_option_item_icon_position(attrsDefault, {
                        itemId,
                        prop_itemSelected,
                    }, extra),
                    prop_borderClass: prop_borderIconClass,
                    prop_borderStyles: prop_borderIconStyles,
                    prop_borderRadius: prop_borderIconRadius,
                    prop_borderWidth: prop_borderIconWidth,
                    prop_borderOpacity: prop_borderIconOpacity,
                    prop_borderColor: isSelectedObs.map(selected => {
                        return isDisableObs.map(disable => {
                            if (disable) return prop_borderIconColor_disable.get();
                            return selected ? prop_borderIconColor_selected.get() : prop_borderIconColor_unSelected.get();
                        }).get();
                    }),
                    prop_contentBackgroundColor: isSelectedObs.map(selected => {
                        return isDisableObs.map(disable => {
                            if (disable) return prop_borderIconBackground_disable.get();
                            return selected ? prop_borderIconBackground_selected.get() : prop_borderIconBackground_unSelected.get();
                        }).get();
                    }),
                } as any as ComponentBorderPropsType,
                <ComponentBorderMethodsType>{
                    fn_onClickBorder: function (event: Event) {
                        this.fn_onSelectItem(itemId, 0);
                    }.bind(this),
                }
            ).getReactiveElement();
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_option_item_icon_position(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const itemId = data.itemId;
            const prop_itemSelected = data.prop_itemSelected;

            return new ComponentElementPosition(
                {
                    classList: ["d-block"],
                    styles: {
                        width: SizeUnit(100, UNITS.PERCENT),
                        height: SizeUnit(100, UNITS.PERCENT),
                    },
                    prop_structureStyles: {
                        width: SizeUnit(100, UNITS.PERCENT),
                        height: SizeUnit(100, UNITS.PERCENT),
                    },
                    prop_positionStyles: {
                        width: SizeUnit(100, UNITS.PERCENT),
                        height: SizeUnit(100, UNITS.PERCENT),
                    },
                    prop_positionTop: SizeUnit(50, UNITS.PERCENT),
                    prop_positionLeft: SizeUnit(50, UNITS.PERCENT),
                    prop_positionTranslate: TranslateUnit(SizeUnit(-50, UNITS.PERCENT), SizeUnit(-50, UNITS.PERCENT)),
                    prop_positionHeight: null,
                    prop_content: this.template_render_option_item_icon(attrsDefault, {
                        itemId,
                        prop_itemSelected,
                    }, extra),
                } as any as ComponentElementPositionPropsType,
                <ComponentElementPositionMethodsType>{}
            ).getReactiveElement();
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_option_item_icon(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const itemId = data.itemId;
            const prop_itemSelected = data.prop_itemSelected;

            const prop_icon = this.getObservable(ComponentInputRadioBoxConfigs.keys.prop_icon.name);
            const prop_iconClass = this.getObservable(ComponentInputRadioBoxConfigs.keys.prop_iconClass.name);
            const prop_iconStyles = this.getObservable(ComponentInputRadioBoxConfigs.keys.prop_iconStyles.name);

            const isSelectedObs = prop_itemSelected instanceof Observable
                ? prop_itemSelected.map((v: any) => v === itemId)
                : new Observable(prop_itemSelected === itemId);

            return new ToolsComponents.ComponentIcon(
                {
                    prop_structureClass: ["position-absolute"],
                    prop_structureStyles: {
                        top: SizeUnit(50, UNITS.PERCENT),
                        left: SizeUnit(50, UNITS.PERCENT),
                        transform: TranslateUnit(SizeUnit(-50, UNITS.PERCENT), SizeUnit(-50, UNITS.PERCENT)),
                    },
                    prop_iconClass: prop_iconClass,
                    prop_iconStyles: prop_iconStyles,
                    prop_icon: isSelectedObs.mapBoolean(prop_icon.get(), null),
                } as any as ComponentIconPropsType,
                <ComponentIconMethodsType>{}
            ).getReactiveElement();
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_option_item_title(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const itemId = data.itemId;
            const itemName = data.itemName;
            const prop_itemSelected = data.prop_itemSelected;
            const prop_isDisable = data.prop_isDisable;

            const prop_titleShow = this.getObservable(ComponentInputRadioBoxConfigs.keys.prop_titleShow.name);
            const prop_titleClass = this.getObservable(ComponentInputRadioBoxConfigs.keys.prop_titleClass.name);
            const prop_titleStyles = this.getObservable(ComponentInputRadioBoxConfigs.keys.prop_titleStyles.name);
            const prop_titleColor_selected = this.getObservable(ComponentInputRadioBoxConfigs.keys.prop_titleColor_selected.name);
            const prop_titleColor_unSelected = this.getObservable(ComponentInputRadioBoxConfigs.keys.prop_titleColor_unSelected.name);
            const prop_titleColor_disable = this.getObservable(ComponentInputRadioBoxConfigs.keys.prop_titleColor_disable.name);

            const stdHeight = AppConfig.get("stdHeight", 30);
            const directionRtl = AppConfig.get("directionRtl");
            const elFontSize = ToolsCss.getFontSize(AppConfig.get("sizeName"));

            const isSelectedObs = prop_itemSelected instanceof Observable
                ? prop_itemSelected.map((v: any) => v === itemId)
                : new Observable(prop_itemSelected === itemId);

            const isDisableObs = prop_isDisable instanceof Observable ? prop_isDisable : new Observable(prop_isDisable);

            return ReactiveElement.part("b", {
                attrs: {
                    ...attrsDefault,
                },
                className: [],
                styles: {
                    cursor: "pointer",
                    float: directionRtl ? "right" : "left",
                    fontSize: SizeUnit(elFontSize, UNITS.POINT),
                    lineHeight: SizeUnit(stdHeight, UNITS.PEXEL),
                    width: SizeCalc(
                        SizeUnit(100, UNITS.PERCENT), OPERATION.MINUS,
                        SizeUnit(stdHeight + 10, UNITS.PEXEL)
                    ),
                },
                stylesBind: {
                    ...prop_titleStyles.get(),
                    color: Observable.computed(
                        (selected: boolean, isDisable: boolean) => {
                            if (isDisable) return prop_titleColor_disable.get();
                            return selected ? prop_titleColor_selected.get() : prop_titleColor_unSelected.get();
                        },
                        [isSelectedObs, isDisableObs],
                        this.getScope()
                    ),
                },
                classBind: [
                    prop_titleShow.mapBoolean("show", "d-none"),
                    prop_titleClass,
                ],
                children: [
                    itemName,
                ],
                on: {
                    click: (e: Event) => {
                        const itemIndex = this.fn_getItemIndexById(itemId);
                        this.fn_onSelectItem(itemId, itemIndex);
                    }
                }
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_option_item_body(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const itemId = data.itemId;
            const itemBody = data.itemBody;
            const itemIndex = data.itemIndex;
            const prop_itemSelected = data.prop_itemSelected;

            const isSelectedObs = prop_itemSelected instanceof Observable
                ? prop_itemSelected.map((v: any) => v === itemId)
                : new Observable(prop_itemSelected === itemId);

            return ReactiveElement.part("div", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-input-radio-box-body-content-${this._COMPONENT_RANDOM_ID}-${itemIndex}`,
                },
                className: ["ms-4", "mt-1"],
                classBind: [
                    isSelectedObs.mapBoolean("show", "d-none"),
                ],
                children: [
                    itemBody ?? "",
                ],
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_shared_body(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_options = data[ComponentInputRadioBoxConfigs.keys.prop_options.name];
            const prop_itemSelected = data[ComponentInputRadioBoxConfigs.keys.prop_itemSelected.name];

            const options = prop_options instanceof Observable ? prop_options.get() : prop_options;
            const selectedId = prop_itemSelected instanceof Observable ? prop_itemSelected.get() : prop_itemSelected;

            let bodyHtml = "";
            if (Array.isArray(options)) {
                for (const item of options) {
                    if (item.id === selectedId && item.body != null) {
                        bodyHtml = item.body;
                        break;
                    }
                }
            }

            const sharedBodyObs = (prop_itemSelected instanceof Observable ? prop_itemSelected : new Observable(prop_itemSelected)).map((selId: any) => {
                if (!Array.isArray(options)) return "";
                for (const item of options) {
                    if (item.id === selId && item.body != null) {
                        return item.body;
                    }
                }
                return "";
            });

            return ReactiveElement.part("div", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-input-radio-box-shared-body-${this._COMPONENT_RANDOM_ID}`,
                },
                className: ["mt-2"],
                children: [
                    sharedBodyObs,
                ],
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_validate(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_isDisable = data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_isAbsoluteRule = data[ComponentInputRadioBoxConfigs.keys.prop_isAbsoluteRule.name];
            const prop_listRules = data[ComponentInputRadioBoxConfigs.keys.prop_listRules.name];
            const prop_msgRules = data[ComponentInputRadioBoxConfigs.keys.prop_msgRules.name];
            const prop_title = data[ComponentInputRadioBoxConfigs.keys.prop_title.name];

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-input-radio-box-validate-${this._COMPONENT_RANDOM_ID}`,
                },
                className: ["position-relative"],
                children: [
                    ReactiveElement.part("section", {
                        attrs: {...attrsDefault},
                        children: [
                            Observable.computed(
                                (isDisable: boolean, isAbsoluteRule: any, listRules: any, msgRules: any, title: any) => {
                                    if (isDisable) return null;
                                    if (!Array.isArray(listRules) || listRules.length === 0) return null;

                                    return new ToolsComponents.ComponentValidate(
                                        <ComponentValidatePropsType>{
                                            classList: ["mt-1"],
                                            prop_reference: `component-input-radio-box-body-${this._COMPONENT_RANDOM_ID}`,
                                            prop_isAbsolute: isAbsoluteRule ?? true,
                                            prop_listRules: listRules,
                                            prop_msgRules: msgRules ?? null,
                                            prop_title: title ?? "",
                                            prop_size: "m",
                                            prop_value: this.var_itemSelected,
                                        },
                                        <ComponentValidateMethodsType>{
                                            fn_onChangeValidate: (event: Event, dataArgs: any, componentArgs: any) => {
                                            }
                                        }
                                    ).getReactiveElement();
                                },
                                [
                                    prop_isDisable instanceof Observable ? prop_isDisable : new Observable(prop_isDisable),
                                    prop_isAbsoluteRule instanceof Observable ? prop_isAbsoluteRule : new Observable(prop_isAbsoluteRule),
                                    prop_listRules instanceof Observable ? prop_listRules : new Observable(prop_listRules),
                                    prop_msgRules instanceof Observable ? prop_msgRules : new Observable(prop_msgRules),
                                    prop_title instanceof Observable ? prop_title : new Observable(prop_title),
                                ],
                                this.getScope()
                            ),
                        ]
                    })
                ]
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
       FUNCTIONs
    --------------------------------------------- */
    private fn_setupItemSelectedListener(): void {
        const prop_firstCallback = this.get(ComponentInputRadioBoxConfigs.keys.prop_firstCallback.name);
        const prop_itemSelected = this.get(ComponentInputRadioBoxConfigs.keys.prop_itemSelected.name);
        const prop_direction = this.get(ComponentInputRadioBoxConfigs.keys.prop_direction.name);
        const prop_options = this.get(ComponentInputRadioBoxConfigs.keys.prop_options.name);

        if (prop_firstCallback && prop_itemSelected != null) {
            this.fn_fireCallback(null, prop_itemSelected, prop_options);
        }
    }


    private fn_onSelectItem(itemId: string | number, itemIndex: number): void {
        const prop_isDisable = this.get(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name);
        if (prop_isDisable) return;

        this.set(ComponentInputRadioBoxConfigs.keys.prop_itemSelected.name, itemId);
        this.var_itemSelected.set(itemId);

        const options = this.get(ComponentInputRadioBoxConfigs.keys.prop_options.name);
        const direction = this.get(ComponentInputRadioBoxConfigs.keys.prop_direction.name);
        const isHorizontal = direction === ComponentInputRadioBox_DirectionTypes.HORIZONTAL;

        if (isHorizontal) {
            this.fn_showSharedBody(itemId, options);
        } else {
            this.fn_showVerticalBody(itemId, options);
        }

        const params: ComponentInputRadioBox_Methods_SELECT_ITEM_DataArgs = {
            ITEM_ID: itemId as any,
            ITEM_INDEX: itemIndex as any,
        };
        this.executeMethod(ComponentInputRadioBoxConfigs.methods.SELECT_ITEM.name, null, params);
    }


    private fn_showVerticalBody(selectedId: string | number, options: RadioOptionItem[]): void {
        if (!Array.isArray(options)) return;
        for (let i = 0; i < options.length; i++) {
            const item = options[i];
            const itemId = item.id ?? i;
            const el = document.querySelector(`#${this._COMPONENT_ID} #component-input-radio-box-body-content-${this._COMPONENT_RANDOM_ID}-${i}`);
            if (el != null) {
                if (itemId === selectedId) {
                    el.classList.remove("d-none");
                } else {
                    el.classList.add("d-none");
                }
            }
        }
    }


    private fn_showSharedBody(selectedId: string | number, options: RadioOptionItem[]): void {
        const sharedEl = document.querySelector(`#${this._COMPONENT_ID} #component-input-radio-box-shared-body-${this._COMPONENT_RANDOM_ID}`) as HTMLElement;
        if (sharedEl == null) return;
        sharedEl.innerHTML = "";
        if (Array.isArray(options)) {
            for (const item of options) {
                if (item.id === selectedId && item.body != null) {
                    if (item.body instanceof ReactiveElement) {
                        sharedEl.appendChild(item.body.getElement());
                    } else {
                        sharedEl.innerHTML = item.body;
                    }
                    break;
                }
            }
        }
    }


    private fn_fireCallback(event: Event | null, selectedId: string | number, options: RadioOptionItem[]): void {
        const prop_isDisable = this.get(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name);
        if (prop_isDisable) return;

        let selectedData: RadioOptionItem | null = null;
        if (Array.isArray(options)) {
            for (const item of options) {
                if (item.id === selectedId) {
                    selectedData = item;
                    break;
                }
            }
        }

        const params: ComponentInputRadioBox_Methods_SELECT_ITEM_DataArgs = {
            ITEM_ID: selectedId as any,
            ITEM_INDEX: this.fn_getItemIndexById(selectedId) as any,
        };
        this.executeMethod(ComponentInputRadioBoxConfigs.methods.SELECT_ITEM.name, event, params);
    }


    private fn_getItemIndexById(itemId: string | number): number {
        const options = this.get(ComponentInputRadioBoxConfigs.keys.prop_options.name);
        if (!Array.isArray(options)) return 0;
        for (let i = 0; i < options.length; i++) {
            if (options[i].id === itemId) return i;
        }
        return 0;
    }


    public fn_getValue(): string | number | null {
        return this.get(ComponentInputRadioBoxConfigs.keys.prop_itemSelected.name);
    }
}

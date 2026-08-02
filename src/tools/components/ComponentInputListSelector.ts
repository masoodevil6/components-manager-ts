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
    ToolsComponents_BorderWidth, ToolsComponents_Height, ToolsComponents_Margin, ToolsComponents_Padding, UNITS
} from "../../utils/ToolsConsts";
import {TOOLS} from "../tools";
import {
    GOG_ComponentBasicConfigs_Component_keys,
    GOG_ComponentBasicConfigs_Component_parts,
    GOG_ComponentBasicConfigs_Component_Pattern,
    GOG_ComponentBasicConfigs_Component_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_keys,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_parts,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_parts,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_keys,
    GOG_ComponentBasicConfigs_Component_Structure_parts,
    GOG_ComponentBasicConfigs_Component_Structure_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_Schema, GOG_ComponentBasicConfigs_partDoseNotBody,
    GOG_ComponentBasicProps_Component,
    GOG_ComponentBasicProps_Component_Structure,
    GOG_ComponentBasicProps_Component_Structure_FormInput,
    GOG_ComponentBasicProps_Component_Structure_FormInput_Label,
} from "../../core/component/SetupComponent";
import {Observable} from "../../core/Observable";
import {
    ComponentIcon_Methods_CLICK_ComponentArgs,
    ComponentIcon_Methods_CLICK_DataArgs,
    ComponentIconMethodsType,
    ComponentIconPropsType
} from "./ComponentIcon";
import {ToolsIcons} from "../icons";
import {
    ComponentInputAgreementCheckBox,
    ComponentInputAgreementCheckBox_Methods_CLICK_ALL_ComponentArgs,
    ComponentInputAgreementCheckBox_Methods_CLICK_ALL_DataArgs,
    ComponentInputAgreementCheckBox_Methods_CLICK_ITEM_ComponentArgs,
    ComponentInputAgreementCheckBox_Methods_CLICK_ITEM_DataArgs,
    ComponentInputAgreementCheckBoxMethodsType,
    ComponentInputAgreementCheckBoxPropsType
} from "./ComponentInputAgreementCheckBox";
import {
    ComponentPositionMenu,
    ComponentPositionMenu_Methods_CLICK_ACCEPT_ComponentArgs,
    ComponentPositionMenu_Methods_CLICK_ACCEPT_DataArgs,
    ComponentPositionMenu_Methods_CLICK_OPEN_ComponentArgs,
    ComponentPositionMenu_Methods_CLICK_OPEN_DataArgs,
    ComponentPositionMenu_Methods_CLICK_REJECT_ComponentArgs,
    ComponentPositionMenu_Methods_CLICK_REJECT_DataArgs,
    ComponentPositionMenuMethodsType,
    ComponentPositionMenuPropsType
} from "./ComponentPositionMenu";
import {
    ComponentListSelectedScroller,
    ComponentListSelectedScroller_Methods_DELETE_ITEM_ComponentArgs,
    ComponentListSelectedScroller_Methods_DELETE_ITEM_DataArgs,
    ComponentListSelectedScrollerMethodsType,
    ComponentListSelectedScrollerPropsType,
    propListSelectedScroller_List
} from "./ComponentListSelectedScroller";
import {ComponentBorderMethodsType, ComponentBorderPropsType } from "./ComponentBorder";




export const ComponentInputListSelectorProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput,
    ...GOG_ComponentBasicProps_Component_Structure_FormInput_Label ,

    ///----------------------
    prop_inputBackgroundColor :           "prop_inputBackgroundColor" ,
    prop_menuBackgroundColor :            "prop_menuBackgroundColor" ,
    prop_menuBorderColor :                "prop_menuBorderColor" ,

    prop_columns :                        "prop_columns" ,
    prop_icon :                           "prop_icon" ,
    prop_showListSelected :               "prop_showListSelected" ,
    prop_labelShow :                      "prop_labelShow" ,
    prop_widthBody :                      "prop_widthBody" ,
    prop_heightBody :                     "prop_heightBody" ,
    prop_heightItems :                    "prop_heightItems" ,
    prop_titleAll :                       "prop_titleAll" ,
    prop_draggable :                      "prop_draggable" ,
    prop_backgroundColorIcon :            "prop_backgroundColorIcon" ,
    prop_colorIcon :                      "prop_colorIcon" ,
} as const;

export type ColumnItem = {
    id:       string | number;
    title:    Observable<string> | string | null;
    selected: boolean;
};


const ComponentInputListSelectorConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys ,

        ///----------------------

        [ComponentInputListSelectorProps.prop_inputBackgroundColor]: {
            name:                ComponentInputListSelectorProps.prop_inputBackgroundColor,
            value:               GOG_SetValue<Color | null>( Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1 )),
        } ,
        [ComponentInputListSelectorProps.prop_menuBackgroundColor]: {
            name:                ComponentInputListSelectorProps.prop_menuBackgroundColor,
            value:               GOG_SetValue<Color | null>( Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1 )),
        } ,
        [ComponentInputListSelectorProps.prop_menuBorderColor]: {
            name:                ComponentInputListSelectorProps.prop_menuBorderColor,
            value:               GOG_SetValue<Color | null>(   Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1 )),
        } ,

        [ComponentInputListSelectorProps.prop_columns]: {
            name:                ComponentInputListSelectorProps.prop_columns,
            value:               GOG_SetValue<ColumnItem[]>( [] ),
        } ,
        [ComponentInputListSelectorProps.prop_icon]: {
            name:                ComponentInputListSelectorProps.prop_icon,
            value:               GOG_SetValue<IconsType | null>( ToolsIcons.icon_select_columns({size: SIZES.L}) ),
        } ,
        [ComponentInputListSelectorProps.prop_showListSelected]: {
            name:                ComponentInputListSelectorProps.prop_showListSelected,
            value:               GOG_SetValue<boolean>( true ),
        } ,
        [ComponentInputListSelectorProps.prop_labelShow]: {
            name:                ComponentInputListSelectorProps.prop_labelShow,
            value:               GOG_SetValue<boolean>( true ),
        } ,
        [ComponentInputListSelectorProps.prop_widthBody]: {
            name:                ComponentInputListSelectorProps.prop_widthBody,
            value:               GOG_SetValue<SizeUnit>( SizeUnit(300 , UNITS.PEXEL) ),
        } ,
        [ComponentInputListSelectorProps.prop_heightBody]: {
            name:                ComponentInputListSelectorProps.prop_heightBody,
            value:               GOG_SetValue<SizeUnit>( SizeUnit(300 , UNITS.PEXEL) ),
        } ,
        [ComponentInputListSelectorProps.prop_heightItems]: {
            name:                ComponentInputListSelectorProps.prop_heightItems,
            value:               GOG_SetValue<number>( 45 ),
        } ,
        [ComponentInputListSelectorProps.prop_titleAll]: {
            name:                ComponentInputListSelectorProps.prop_titleAll,
            value:               GOG_SetValue<Observable<string> | string>( "Select All" ),
        } ,
        [ComponentInputListSelectorProps.prop_draggable]: {
            name:                ComponentInputListSelectorProps.prop_draggable,
            value:               GOG_SetValue<boolean>( true ),
        } ,
        [ComponentInputListSelectorProps.prop_backgroundColorIcon]: {
            name:                ComponentInputListSelectorProps.prop_backgroundColorIcon,
            value:               GOG_SetValue<Color | null>( null ),
        } ,
        [ComponentInputListSelectorProps.prop_colorIcon]: {
            name:                ComponentInputListSelectorProps.prop_colorIcon,
            value:               GOG_SetValue<Color | null>( null ),
        } ,
    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_Component_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_parts ,

        ///----------------------
        Main: {
            name:                      "part-main"
        } ,
        Main_FormFloatMenu: {
            name:                      "part-main-formFloutMenu"
        } ,
        Main_FormFloatMenu_IconList: {
            name:                      "part-main-formFloutMenu-iconList"
        } ,
        Main_FormFloatMenu_CheckBoxes: {
            name:                      "part-main-formFloutMenu-checkBoxes"
        } ,
        Main_FormListSelected: {
            name:                      "part-main-formListSelected"
        } ,
    } ,
    templates: {

    } ,
    methods: {
        CLICK_ICON: {
            name:                      "fn_onClickIcon" ,
            dataArgs: {},
            componentArgs: {}
        },
        CLICK_ACCEPT: {
            name:                      "fn_onClickAccept" ,
            dataArgs: {},
            componentArgs: {
                COLUMNS : {
                    name:                 "COLUMNS"
                }
            }
        },
        CLICK_REJECT: {
            name:                      "fn_onClickReject" ,
            dataArgs: {},
            componentArgs: {}
        },
        CALLBACK_COL_SELECTOR: {
            name:                      "fn_onCallbackColSelector" ,
            dataArgs: {},
            componentArgs: {
                ORDER : {
                    name:                 "ORDER"
                } ,
                IS_COMPLETE : {
                    name:                 "IS_COMPLETE"
                }
            }
        },
        DELETE_SELECTED_ITEM: {
            name:                      "fn_onDeleteSelectedItem" ,
            dataArgs: {},
            componentArgs: {
                LIST : {
                    name:                 "LIST"
                } ,
                VALUE : {
                    name:                 "VALUE"
                }
            }
        },
    }
} as const


export type ComponentInputListSelectorPropsType =        GOG_ExtractNameValue<typeof ComponentInputListSelectorConfigs.keys>
export type ComponentInputListSelectorSchemaType =       GOG_ExtractName<typeof ComponentInputListSelectorConfigs.schemas>
export type ComponentInputListSelectorTemplatesType =    GOG_ExtractName<typeof ComponentInputListSelectorConfigs.templates>

export type ComponentInputListSelector_Methods_CLICK_ICON_ComponentArgs =       GOG_ExtractName<typeof ComponentInputListSelectorConfigs.methods.CLICK_ICON.componentArgs>
export type ComponentInputListSelector_Methods_CLICK_ICON_DataArgs =          GOG_ExtractNameValue<typeof ComponentInputListSelectorConfigs.methods.CLICK_ICON.dataArgs>

export type ComponentInputListSelector_Methods_CLICK_ACCEPT_ComponentArgs =   GOG_ExtractName<typeof ComponentInputListSelectorConfigs.methods.CLICK_ACCEPT.componentArgs>
export type ComponentInputListSelector_Methods_CLICK_ACCEPT_DataArgs =      GOG_ExtractNameValue<typeof ComponentInputListSelectorConfigs.methods.CLICK_ACCEPT.dataArgs>

export type ComponentInputListSelector_Methods_CLICK_REJECT_ComponentArgs =   GOG_ExtractName<typeof ComponentInputListSelectorConfigs.methods.CLICK_REJECT.componentArgs>
export type ComponentInputListSelector_Methods_CLICK_REJECT_DataArgs =      GOG_ExtractNameValue<typeof ComponentInputListSelectorConfigs.methods.CLICK_REJECT.dataArgs>

export type ComponentInputListSelector_Methods_CALLBACK_COL_SELECTOR_ComponentArgs = GOG_ExtractName<typeof ComponentInputListSelectorConfigs.methods.CALLBACK_COL_SELECTOR.componentArgs>
export type ComponentInputListSelector_Methods_CALLBACK_COL_SELECTOR_DataArgs =    GOG_ExtractNameValue<typeof ComponentInputListSelectorConfigs.methods.CALLBACK_COL_SELECTOR.dataArgs>

export type ComponentInputListSelector_Methods_DELETE_SELECTED_ITEM_ComponentArgs = GOG_ExtractName<typeof ComponentInputListSelectorConfigs.methods.DELETE_SELECTED_ITEM.componentArgs>
export type ComponentInputListSelector_Methods_DELETE_SELECTED_ITEM_DataArgs =    GOG_ExtractNameValue<typeof ComponentInputListSelectorConfigs.methods.DELETE_SELECTED_ITEM.dataArgs>

export type ComponentInputListSelectorMethodsType = {
    [ComponentInputListSelectorConfigs.methods.CLICK_ICON.name]:                ComponentCallBackType<ComponentInputListSelector_Methods_CLICK_ICON_ComponentArgs , ComponentInputListSelector_Methods_CLICK_ICON_DataArgs>
    [ComponentInputListSelectorConfigs.methods.CLICK_ACCEPT.name]:             ComponentCallBackType<ComponentInputListSelector_Methods_CLICK_ACCEPT_ComponentArgs , ComponentInputListSelector_Methods_CLICK_ACCEPT_DataArgs>
    [ComponentInputListSelectorConfigs.methods.CLICK_REJECT.name]:             ComponentCallBackType<ComponentInputListSelector_Methods_CLICK_REJECT_ComponentArgs , ComponentInputListSelector_Methods_CLICK_REJECT_DataArgs>
    [ComponentInputListSelectorConfigs.methods.CALLBACK_COL_SELECTOR.name]:     ComponentCallBackType<ComponentInputListSelector_Methods_CALLBACK_COL_SELECTOR_ComponentArgs , ComponentInputListSelector_Methods_CALLBACK_COL_SELECTOR_DataArgs>
    [ComponentInputListSelectorConfigs.methods.DELETE_SELECTED_ITEM.name]:     ComponentCallBackType<ComponentInputListSelector_Methods_DELETE_SELECTED_ITEM_ComponentArgs , ComponentInputListSelector_Methods_DELETE_SELECTED_ITEM_DataArgs>
}


export abstract class ComponentInputListSelectorBase extends ComponentBase<
    ComponentInputListSelectorPropsType ,
    ComponentInputListSelectorSchemaType ,
    ComponentInputListSelectorTemplatesType ,
    ComponentInputListSelectorMethodsType
    >{


    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN=  defineComponentPatterns<ComponentInputListSelectorPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Pattern(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Pattern(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Pattern(this) ,
        ///----------------------
        [ComponentInputListSelectorConfigs.keys.prop_inputBackgroundColor.name]: {
            prop:                                             ComponentInputListSelectorConfigs.keys.prop_inputBackgroundColor.name,
            default:                                          ComponentInputListSelectorConfigs.keys.prop_inputBackgroundColor.value,
            title:                                            Language.translate("components.input_list_selector.props.prop_inputBackgroundColor.title"),
            description:                                      Language.translate("components.input_list_selector.props.prop_inputBackgroundColor.description"),
        } ,
        [ComponentInputListSelectorConfigs.keys.prop_menuBackgroundColor.name]: {
            prop:                                             ComponentInputListSelectorConfigs.keys.prop_menuBackgroundColor.name,
            default:                                          ComponentInputListSelectorConfigs.keys.prop_menuBackgroundColor.value,
            title:                                            Language.translate("components.input_list_selector.props.prop_menuBackgroundColor.title"),
            description:                                      Language.translate("components.input_list_selector.props.prop_menuBackgroundColor.description"),
        } ,
        [ComponentInputListSelectorConfigs.keys.prop_menuBorderColor.name]: {
            prop:                                             ComponentInputListSelectorConfigs.keys.prop_menuBorderColor.name,
            default:                                          ComponentInputListSelectorConfigs.keys.prop_menuBorderColor.value,
            title:                                            Language.translate("components.input_list_selector.props.prop_menuBorderColor.title"),
            description:                                      Language.translate("components.input_list_selector.props.prop_menuBorderColor.description"),
        } ,
        [ComponentInputListSelectorConfigs.keys.prop_columns.name]: {
            prop:                                             ComponentInputListSelectorConfigs.keys.prop_columns.name,
            default:                                          ComponentInputListSelectorConfigs.keys.prop_columns.value,
            title:                                            Language.translate("components.input_list_selector.props.prop_columns.title"),
            description:                                      Language.translate("components.input_list_selector.props.prop_columns.description"),
        } ,
        [ComponentInputListSelectorConfigs.keys.prop_icon.name]: {
            prop:                                             ComponentInputListSelectorConfigs.keys.prop_icon.name,
            default:                                          ComponentInputListSelectorConfigs.keys.prop_icon.value,
            title:                                            Language.translate("components.input_list_selector.props.prop_icon.title"),
            description:                                      Language.translate("components.input_list_selector.props.prop_icon.description"),
        } ,
        [ComponentInputListSelectorConfigs.keys.prop_showListSelected.name]: {
            prop:                                             ComponentInputListSelectorConfigs.keys.prop_showListSelected.name,
            default:                                          ComponentInputListSelectorConfigs.keys.prop_showListSelected.value,
            title:                                            Language.translate("components.input_list_selector.props.prop_showListSelected.title"),
            description:                                      Language.translate("components.input_list_selector.props.prop_showListSelected.description"),
        } ,
        [ComponentInputListSelectorConfigs.keys.prop_labelShow.name]: {
            prop:                                             ComponentInputListSelectorConfigs.keys.prop_labelShow.name,
            default:                                          ComponentInputListSelectorConfigs.keys.prop_labelShow.value,
            title:                                            Language.translate("components.input_list_selector.props.prop_labelShow.title"),
            description:                                      Language.translate("components.input_list_selector.props.prop_labelShow.description"),
        } ,
        [ComponentInputListSelectorConfigs.keys.prop_widthBody.name]: {
            prop:                                             ComponentInputListSelectorConfigs.keys.prop_widthBody.name,
            default:                                          ComponentInputListSelectorConfigs.keys.prop_widthBody.value,
            title:                                            Language.translate("components.input_list_selector.props.prop_widthBody.title"),
            description:                                      Language.translate("components.input_list_selector.props.prop_widthBody.description"),
        } ,
        [ComponentInputListSelectorConfigs.keys.prop_heightBody.name]: {
            prop:                                             ComponentInputListSelectorConfigs.keys.prop_heightBody.name,
            default:                                          ComponentInputListSelectorConfigs.keys.prop_heightBody.value,
            title:                                            Language.translate("components.input_list_selector.props.prop_heightBody.title"),
            description:                                      Language.translate("components.input_list_selector.props.prop_heightBody.description"),
        } ,
        [ComponentInputListSelectorConfigs.keys.prop_heightItems.name]: {
            prop:                                             ComponentInputListSelectorConfigs.keys.prop_heightItems.name,
            default:                                          ComponentInputListSelectorConfigs.keys.prop_heightItems.value,
            title:                                            Language.translate("components.input_list_selector.props.prop_heightItems.title"),
            description:                                      Language.translate("components.input_list_selector.props.prop_heightItems.description"),
        } ,
        [ComponentInputListSelectorConfigs.keys.prop_titleAll.name]: {
            prop:                                             ComponentInputListSelectorConfigs.keys.prop_titleAll.name,
            default:                                          ComponentInputListSelectorConfigs.keys.prop_titleAll.value,
            title:                                            Language.translate("components.input_list_selector.props.prop_titleAll.title"),
            description:                                      Language.translate("components.input_list_selector.props.prop_titleAll.description"),
        } ,
        [ComponentInputListSelectorConfigs.keys.prop_draggable.name]: {
            prop:                                             ComponentInputListSelectorConfigs.keys.prop_draggable.name,
            default:                                          ComponentInputListSelectorConfigs.keys.prop_draggable.value,
            title:                                            Language.translate("components.input_list_selector.props.prop_draggable.title"),
            description:                                      Language.translate("components.input_list_selector.props.prop_draggable.description"),
        } ,
        [ComponentInputListSelectorConfigs.keys.prop_backgroundColorIcon.name]: {
            prop:                                             ComponentInputListSelectorConfigs.keys.prop_backgroundColorIcon.name,
            default:                                          ComponentInputListSelectorConfigs.keys.prop_backgroundColorIcon.value,
            title:                                            Language.translate("components.input_list_selector.props.prop_backgroundColorIcon.title"),
            description:                                      Language.translate("components.input_list_selector.props.prop_backgroundColorIcon.description"),
        } ,
        [ComponentInputListSelectorConfigs.keys.prop_colorIcon.name]: {
            prop:                                             ComponentInputListSelectorConfigs.keys.prop_colorIcon.name,
            default:                                          ComponentInputListSelectorConfigs.keys.prop_colorIcon.value,
            title:                                            Language.translate("components.input_list_selector.props.prop_colorIcon.title"),
            description:                                      Language.translate("components.input_list_selector.props.prop_colorIcon.description"),
        } ,
    });



    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentInputListSelectorSchemaType , ComponentInputListSelectorPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Schema(this) ,

        ///----------------------
        [ComponentInputListSelectorConfigs.schemas.Main.name]: {
            part:               ComponentInputListSelectorConfigs.schemas.Main.name ,
            title:              Language.translate("components.input_list_selector.schema.main.title") ,
            description:        Language.translate("components.input_list_selector.schema.main.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_columns.name] ,
                this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_icon.name] ,
                this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_showListSelected.name] ,
                this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_labelShow.name] ,
                this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_draggable.name] ,
                this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_backgroundColorIcon.name] ,
                this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_colorIcon.name] ,
            ]
        } ,
        [ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu.name]: {
            part:               ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu.name ,
            title:              Language.translate("components.input_list_selector.schema.main_formFloatMenu.title") ,
            description:        Language.translate("components.input_list_selector.schema.main_formFloatMenu.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_menuBackgroundColor.name] ,
                this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_menuBorderColor.name] ,
                this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_widthBody.name] ,
                this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_heightBody.name] ,
            ]
        } ,
        [ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu_IconList.name]: {
            part:               ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu_IconList.name ,
            title:              Language.translate("components.input_list_selector.schema.main_formFloatMenu_iconList.title") ,
            description:        Language.translate("components.input_list_selector.schema.main_formFloatMenu_iconList.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_icon.name] ,
                this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_backgroundColorIcon.name] ,
                this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_colorIcon.name] ,
            ]
        } ,
        [ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu_CheckBoxes.name]: {
            part:               ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu_CheckBoxes.name ,
            title:              Language.translate("components.input_list_selector.schema.main_formFloatMenu_body_checkBoxes.title") ,
            description:        Language.translate("components.input_list_selector.schema.main_formFloatMenu_body_checkBoxes.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_columns.name] ,
                this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_titleAll.name] ,
                this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_heightItems.name] ,
                this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_draggable.name] ,
            ]
        } ,
        [ComponentInputListSelectorConfigs.schemas.Main_FormListSelected.name]: {
            part:               ComponentInputListSelectorConfigs.schemas.Main_FormListSelected.name ,
            title:              Language.translate("components.input_list_selector.schema.main_formListSelected.title") ,
            description:        Language.translate("components.input_list_selector.schema.main_formListSelected.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_columns.name] ,
                this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_showListSelected.name] ,
            ]
        } ,
    })


    /* ---------------------------------------------
           PROPERTYs Pattern
        --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentInputListSelectorTemplatesType , ComponentInputListSelectorPropsType>({

    });


    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentInputListSelectorMethodsType , ComponentInputListSelectorPropsType>({
        [ComponentInputListSelectorConfigs.methods.CLICK_ICON.name]: {
            title:                                            Language.translate("components.input_list_selector.methods.fn_onClickIcon.title"),
            description:                                      Language.translate("components.input_list_selector.methods.fn_onClickIcon.description"),
            args: {}
        },
        [ComponentInputListSelectorConfigs.methods.CLICK_ACCEPT.name]: {
            title:                                            Language.translate("components.input_list_selector.methods.fn_onClickAccept.title"),
            description:                                      Language.translate("components.input_list_selector.methods.fn_onClickAccept.description"),
            args: {
                [ComponentInputListSelectorConfigs.methods.CLICK_ACCEPT.componentArgs.COLUMNS.name] : this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_columns.name] ,
            }
        },
        [ComponentInputListSelectorConfigs.methods.CLICK_REJECT.name]: {
            title:                                            Language.translate("components.input_list_selector.methods.fn_onClickReject.title"),
            description:                                      Language.translate("components.input_list_selector.methods.fn_onClickReject.description"),
            args: {}
        },
        [ComponentInputListSelectorConfigs.methods.CALLBACK_COL_SELECTOR.name]: {
            title:                                            Language.translate("components.input_list_selector.methods.fn_onCallbackColSelector.title"),
            description:                                      Language.translate("components.input_list_selector.methods.fn_onCallbackColSelector.description"),
            args: {
                [ComponentInputListSelectorConfigs.methods.CALLBACK_COL_SELECTOR.componentArgs.ORDER.name] :      this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_columns.name] ,
                [ComponentInputListSelectorConfigs.methods.CALLBACK_COL_SELECTOR.componentArgs.IS_COMPLETE.name] : this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_columns.name] ,
            }
        },
        [ComponentInputListSelectorConfigs.methods.DELETE_SELECTED_ITEM.name]: {
            title:                                            Language.translate("components.input_list_selector.methods.fn_onDeleteSelectedItem.title"),
            description:                                      Language.translate("components.input_list_selector.methods.fn_onDeleteSelectedItem.description"),
            args: {
                [ComponentInputListSelectorConfigs.methods.DELETE_SELECTED_ITEM.componentArgs.LIST.name] :  this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_columns.name] ,
                [ComponentInputListSelectorConfigs.methods.DELETE_SELECTED_ITEM.componentArgs.VALUE.name] : this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_columns.name] ,
            }
        },
    });


    /* ---------------------------------------------
       Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {

        return ReactiveElement.div({
            className: ["col-md-3" , "col-12" , "border" , "p-2"] ,
            children: [
                new ComponentInputListSelector(
                    <ComponentInputListSelectorPropsType>{
                        classList: ["border-bottom" , "border-2" , "pb-2"]  ,
                        styles: {}  ,

                        prop_labelTitle: "Input List Selector" ,
                        prop_labelTooltipDescription: "this is for [input-list-selector]" ,
                        prop_labelShow: true ,
                        prop_showListSelected: true ,
                        prop_draggable: true ,
                        prop_widthBody: SizeUnit(350 , UNITS.PEXEL) ,
                        prop_heightBody: SizeUnit(300 , UNITS.PEXEL) ,
                        prop_heightItems: 45 ,

                        prop_columns: [
                            { id: "col1", title: "Column 1", selected: true } ,
                            { id: "col2", title: "Column 2", selected: true } ,
                            { id: "col3", title: "Column 3", selected: false } ,
                            { id: "col4", title: "Column 4", selected: true } ,
                            { id: "col5", title: "Column 5", selected: false } ,
                        ] ,
                    },
                    <ComponentInputListSelectorMethodsType>{
                        fn_onClickIcon: function (event, dataArgs, componentArgs) {
                            console.log("[InputListSelector] icon clicked");
                        } ,
                        fn_onClickAccept: function (event, dataArgs, componentArgs) {
                            console.log("[InputListSelector] accept clicked", componentArgs);
                        } ,
                        fn_onClickReject: function (event, dataArgs, componentArgs) {
                            console.log("[InputListSelector] reject clicked");
                        } ,
                        fn_onCallbackColSelector: function (event, dataArgs, componentArgs) {
                            console.log("[InputListSelector] callback col selector", componentArgs);
                        } ,
                        fn_onDeleteSelectedItem: function (event, dataArgs, componentArgs) {
                            console.log("[InputListSelector] delete selected item", componentArgs);
                        } ,
                    }
                ).getReactiveElement() ,
                new ComponentInputListSelector(
                    <ComponentInputListSelectorPropsType>{
                        classList: ["mt-2"]  ,
                        styles: {}  ,

                        prop_showListSelected: false ,
                        prop_inputBackgroundColor: null ,

                        prop_columns: [
                            { id: "col1", title: "Column 1", selected: true } ,
                            { id: "col2", title: "Column 2", selected: true } ,
                            { id: "col3", title: "Column 3", selected: false } ,
                            { id: "col4", title: "Column 4", selected: true } ,
                            { id: "col5", title: "Column 5", selected: false } ,
                        ] ,
                    },
                    <ComponentInputListSelectorMethodsType>{
                        fn_onClickIcon: function (event, dataArgs, componentArgs) {
                            console.log("[InputListSelector] icon clicked");
                        } ,
                        fn_onClickAccept: function (event, dataArgs, componentArgs) {
                            console.log("[InputListSelector] accept clicked", componentArgs);
                        } ,
                        fn_onClickReject: function (event, dataArgs, componentArgs) {
                            console.log("[InputListSelector] reject clicked");
                        } ,
                        fn_onCallbackColSelector: function (event, dataArgs, componentArgs) {
                            console.log("[InputListSelector] callback col selector", componentArgs);
                        } ,
                        fn_onDeleteSelectedItem: function (event, dataArgs, componentArgs) {
                            console.log("[InputListSelector] delete selected item", componentArgs);
                        } ,
                    }
                ).getReactiveElement()
            ]
        })


    }


}


export class ComponentInputListSelector extends ComponentInputListSelectorBase {

    private var_columns: Observable<ColumnItem[]>;
    private var_tempOrder: Observable<(string | number)[]>;
    private var_showPopup: Observable<boolean>;
    private _checkBoxInstance: ComponentInputAgreementCheckBox | null = null;
    private _columnsBackup: ColumnItem[] = [];

    /* ---------------------------------------------
       SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentInputListSelectorPropsType,
        methods: ComponentInputListSelectorMethodsType ,
        events = null
    ) {
        super("input-list-selector", null);

        const rawColumns = (config as any)[ComponentInputListSelectorConfigs.keys.prop_columns.name] ?? [];
        const initialColumns: ColumnItem[] = Observable.isObservable(rawColumns) ? rawColumns.get() : rawColumns;
        this.var_columns = new Observable<ColumnItem[]>([...initialColumns]);
        this.var_tempOrder = new Observable<(string | number)[]>([]);
        this.var_showPopup = new Observable<boolean>(false);

        super.renderComponent(config, methods , events);
    }


    /* ---------------------------------------------
      TEMPLATEs
     --------------------------------------------- */

    override renderContentComponent() {
        return this.executeSchemaPart(ComponentInputListSelectorConfigs.schemas.Main.name)
    }


    override renderManagerComponent(partName , attrsDefault, data , extra) : ReactiveElement {
        switch (partName){
            case ComponentInputListSelectorConfigs.schemas.Main.name:
                return  this.template_render_main(attrsDefault , data , extra);
            case ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu.name:
                return  this.template_render_main_formFloatMenu(attrsDefault , data , extra);
            case ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu_IconList.name:
                return  this.template_render_main_formFloatMenu_iconList(attrsDefault , data , extra);
            case ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu_CheckBoxes.name:
                return  this.template_render_main_formFloatMenu_checkBoxes(attrsDefault , data , extra);
            case ComponentInputListSelectorConfigs.schemas.Main_FormListSelected.name:
                return  this.template_render_main_formListSelected(attrsDefault , data , extra);
        }
    }


    private template_render_main(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {
            const prop_inputBackgroundColor =       data[ComponentInputListSelectorConfigs.keys.prop_inputBackgroundColor.name];

            return new ToolsComponents.ComponentBorder(
                <ComponentBorderPropsType>{
                    classList: ["pt-2" , "d-block"]  ,
                    prop_borderClass: []  ,
                    styles: {}  ,
                    prop_content:                        ReactiveElement.div({
                        children: [
                            this.executeSchemaPart(ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu.name) ,
                            this.executeSchemaPart(ComponentInputListSelectorConfigs.schemas.Main_FormListSelected.name)
                        ]
                    }) ,
                    prop_borderColor:                    null ,
                    prop_contentBackgroundColor:         prop_inputBackgroundColor ,
                },
                <ComponentBorderMethodsType>{}
            ).getReactiveElement();

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_main_formFloatMenu(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_menuBackgroundColor =       data[ComponentInputListSelectorConfigs.keys.prop_menuBackgroundColor.name];
            const prop_menuBorderColor =           data[ComponentInputListSelectorConfigs.keys.prop_menuBorderColor.name];
            const prop_widthBody =                 data[ComponentInputListSelectorConfigs.keys.prop_widthBody.name];
            const prop_heightBody =                data[ComponentInputListSelectorConfigs.keys.prop_heightBody.name];


            return ReactiveElement.part("div", {
                attrs: { ...attrsDefault },
                className: [
                    "position-relative"
                ]  ,
                stylesBind: {
                    width: Observable.computed(
                        (sizeName) => {
                            return  SizeCalc(
                                ToolsComponents_Padding?.[sizeName] ,
                                OPERATION.ADD ,
                                ToolsComponents_Height?.[sizeName] ,
                                OPERATION.ADD ,
                                ToolsComponents_Padding?.[sizeName] ,
                            )
                        } ,
                        [AppConfig.get_sizeName()],
                        this.getScope()
                    ) ,
                    height: Observable.computed(
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
                        [AppConfig.get_sizeName()],
                        this.getScope()
                    ) ,
                    marginTop: Observable.computed(
                        (sizeName) => {
                            return ToolsComponents_Margin?.[sizeName]
                        } ,
                        [AppConfig.get_sizeName()],
                        this.getScope()
                    ) ,
                    marginBottom: Observable.computed(
                        (sizeName) => {
                            return ToolsComponents_Margin?.[sizeName]
                        } ,
                        [AppConfig.get_sizeName()],
                        this.getScope()
                    ) ,
                    marginLeft: Observable.computed(
                        (sizeName) => {
                            return ToolsComponents_Margin?.[sizeName]
                        } ,
                        [AppConfig.get_sizeName()],
                        this.getScope()
                    ) ,
                    marginRight: Observable.computed(
                        (sizeName) => {
                            return ToolsComponents_Margin?.[sizeName]
                        } ,
                        [AppConfig.get_sizeName()],
                        this.getScope()
                    ) ,
                    float: Observable.computed(
                        (dir) => {
                            return   dir ? "right" : "left"
                        } ,
                        [AppConfig.get_directionRtl()],
                        this.getScope()
                    ) ,
                } ,
                children: [
                    new ComponentPositionMenu(
                        <ComponentPositionMenuPropsType>{
                            classList: [
                                // "col-md-2" , "col-12" , "border" , "p-2"
                            ]  ,
                            styles: Observable.computed(
                                (sizeName, dir) => {
                                    return{
                                        width :  SizeUnit(
                                            ToolsCss.getIconSize(sizeName),
                                            UNITS.PEXEL
                                        ),
                                        height :  SizeUnit(
                                            ToolsCss.getIconSize(sizeName),
                                            UNITS.PEXEL
                                        ),
                                    };
                                } ,
                                [
                                    AppConfig.get_sizeName() ,
                                    AppConfig.get_directionRtl()
                                ],
                                this.getScope()
                            ) ,

                            prop_structureClass: [
                                "w-100" , "h-100"
                            ] ,

                            prop_menuBackgroundColor:   prop_menuBackgroundColor ,
                            prop_menuBorderColor:       prop_menuBorderColor ,
                            prop_menuSelector:          this.executeSchemaPart(ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu_IconList.name)  ,
                            prop_menuBody:              this.executeSchemaPart(ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu_CheckBoxes.name) ,
                            prop_menuBodyWidth:         prop_widthBody ?? SizeUnit(350 , UNITS.PEXEL) ,
                            prop_menuBodyHeight:        prop_heightBody ?? SizeUnit(300 , UNITS.PEXEL) ,
                        },
                        <ComponentPositionMenuMethodsType>{
                            fn_onClickOpen: (event: Event, dataArgs: ComponentPositionMenu_Methods_CLICK_OPEN_DataArgs, componentArgs: ComponentPositionMenu_Methods_CLICK_OPEN_ComponentArgs) => {
                                event.preventDefault();
                                this.fn_onClickIcon(event);
                            } ,
                            fn_onClickAccept: (event: Event, dataArgs: ComponentPositionMenu_Methods_CLICK_ACCEPT_DataArgs, componentArgs: ComponentPositionMenu_Methods_CLICK_ACCEPT_ComponentArgs) => {
                                event.preventDefault();
                                this.fn_onClickAccept(event);
                                return true;
                            } ,
                            fn_onClickReject: (event: Event, dataArgs: ComponentPositionMenu_Methods_CLICK_REJECT_DataArgs, componentArgs: ComponentPositionMenu_Methods_CLICK_REJECT_ComponentArgs) => {
                                event.preventDefault();
                                this.fn_onClickReject(event);
                            }
                        }
                    ).getReactiveElement()
                ]
            });


        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_main_formFloatMenu_iconList(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_icon =                    data[ComponentInputListSelectorConfigs.keys.prop_icon.name];
            const prop_backgroundColorIcon =     data[ComponentInputListSelectorConfigs.keys.prop_backgroundColorIcon.name];
            const prop_colorIcon =               data[ComponentInputListSelectorConfigs.keys.prop_colorIcon.name];

            const styles: Record<string, string> = {
                "cursor": "pointer",
            };
            if (prop_backgroundColorIcon) {
                styles["background-color"] = String(prop_backgroundColorIcon);
            }

            const iconStyles: Record<string, string> = {
                "top": "50%",
                "left": "50%",
                "transform": "translate(-50%, -50%)",
                "position": "absolute",
            };
            if (prop_colorIcon) {
                iconStyles["color"] = String(prop_colorIcon);
            }

            return new ToolsComponents.ComponentIcon(
                <ComponentIconPropsType>{
                    classList:  [
                        "position-relative", "d-block" , "w-100" , "h-100"
                    ]  ,
                    prop_structureClass: [  "d-block" , "w-100" , "h-100"]  ,
                    styles:     styles,
                    prop_iconClass : [
                        //"position-absolute"
                    ] ,
                    prop_iconStyles : iconStyles ,
                    prop_icon: prop_icon ,
                },
                <ComponentIconMethodsType>{
                    fn_onClickIcon: (event: any, dataArgs : ComponentIcon_Methods_CLICK_DataArgs, componentArgs: ComponentIcon_Methods_CLICK_ComponentArgs)  => {
                        this.fn_onClickIcon(event);
                    } ,
                }
            ).getReactiveElement();

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_main_formFloatMenu_checkBoxes(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_titleAll =        data[ComponentInputListSelectorConfigs.keys.prop_titleAll.name];
            const prop_heightItems =     data[ComponentInputListSelectorConfigs.keys.prop_heightItems.name];
            const prop_draggable =       data[ComponentInputListSelectorConfigs.keys.prop_draggable.name];

            return ReactiveElement.part("div", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (columns) => {
                        const checkBoxList = columns.map((col: ColumnItem) => ({
                            id: col.id,
                            title: col.title,
                        }));
                        const selectedIds = columns.filter((c: ColumnItem) => c.selected).map((c: ColumnItem) => c.id);
                        const orderIds = selectedIds.slice();

                        const checkBox = new ToolsComponents.ComponentInputAgreementCheckBox(
                            <ComponentInputAgreementCheckBoxPropsType>{
                                classList:                []  ,
                                styles:                   {}  ,
                                prop_name:                "input-list-selector-checkboxes" ,
                                prop_checkBoxOrderStatus: prop_draggable ?? true ,
                                prop_checkBoxList:        checkBoxList ,
                                prop_value:               selectedIds ,
                                prop_checkBoxOrder:       orderIds ,
                                prop_checkBoxAllTitle:    prop_titleAll ?? "Select All" ,
                            },
                            <ComponentInputAgreementCheckBoxMethodsType>{
                                fn_onClickAll: (event: Event, dataArgs : ComponentInputAgreementCheckBox_Methods_CLICK_ALL_DataArgs, componentArgs: ComponentInputAgreementCheckBox_Methods_CLICK_ALL_ComponentArgs) => {
                                    event.stopPropagation();
                                    const currentValue = componentArgs.VALUE;
                                    const list = componentArgs.LIST;
                                    if (Array.isArray(currentValue) && Array.isArray(list)) {
                                        const newOrder = list
                                            .filter((item: any) => currentValue.includes(item.id))
                                            .map((item: any) => item.id);
                                        this.var_tempOrder.set(newOrder);
                                    }
                                } ,
                                fn_onClickItem: (event: Event, dataArgs : ComponentInputAgreementCheckBox_Methods_CLICK_ITEM_DataArgs, componentArgs: ComponentInputAgreementCheckBox_Methods_CLICK_ITEM_ComponentArgs) => {
                                    event.stopPropagation();
                                    const currentValue = componentArgs.VALUE;
                                    const list = componentArgs.LIST;
                                    if (Array.isArray(currentValue) && Array.isArray(list)) {
                                        const newOrder = list
                                            .filter((item: any) => currentValue.includes(item.id))
                                            .map((item: any) => item.id);
                                        this.var_tempOrder.set(newOrder);
                                    }
                                }
                            }
                        );
                        this._checkBoxInstance = checkBox;
                        return [checkBox.getReactiveElement()];
                    },
                    [this.var_columns],
                    this.getScope()
                )
            });

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_main_formListSelected(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_showListSelected =    data[ComponentInputListSelectorConfigs.keys.prop_showListSelected.name];

            return Observable.conditionWhen(
                prop_showListSelected ,
                (statusShowListScroller) => {
                    return statusShowListScroller
                } ,
                () => {
                    return ReactiveElement.part("div", {
                         attrs: { ...attrsDefault },
                         className: [
                             "p-0", "m-0"
                         ]  ,
                         children: Observable.computed(
                             (columns) => {
                                 const selectedList: propListSelectedScroller_List[] = columns
                                     .filter((c: ColumnItem) => c.selected)
                                     .map((c: ColumnItem) => ({
                                         id: c.id,
                                         title: c.title,
                                         canDelete: true,
                                     }));

                                 const selectedIds = columns.filter((c: ColumnItem) => c.selected).map((c: ColumnItem) => c.id);

                                 return [new ComponentListSelectedScroller(
                                     <any>{
                                         classList: []  ,
                                         styles: {}  ,

                                         prop_borderColor:  Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1),
                                         prop_list:         selectedList ,
                                         prop_value:        selectedIds ,
                                     },
                                     <ComponentListSelectedScrollerMethodsType>{
                                         fn_onDeleteItem: (event: any, dataArgs: ComponentListSelectedScroller_Methods_DELETE_ITEM_DataArgs, componentArgs: ComponentListSelectedScroller_Methods_DELETE_ITEM_ComponentArgs) => {
                                             this.fn_onDeleteSelectedItem(event, dataArgs);
                                         }
                                     }
                                 ).getReactiveElement()];
                             },
                             [this.var_columns],
                             this.getScope()
                         )
                        }
                    );
                } ,
                () => {
                    return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
                } ,
                this.getScope()
            ).get();

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
      FUNCTIONs
     --------------------------------------------- */

    private fn_onClickIcon(event: any) {
        const currentShow = this.var_showPopup.get();
        this.var_showPopup.set(!currentShow);

        if (!currentShow) {
            const columns = this.var_columns.get();
            const selectedIds = columns.filter(c => c.selected).map(c => c.id);
            this.var_tempOrder.set([...selectedIds]);
            this._columnsBackup = columns.map(c => ({ ...c }));
        }

        const params: ComponentInputListSelector_Methods_CLICK_ICON_DataArgs = {};
        this.executeMethod(ComponentInputListSelectorConfigs.methods.CLICK_ICON.name, event, params);
    }

    private fn_onClickAccept(event: any) {
        let tempOrder = this.var_tempOrder.get();

        if (this._checkBoxInstance) {
            const cbValue = this._checkBoxInstance.get(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name);
            const cbOrder = this._checkBoxInstance.get("prop_checkBoxOrder");
            if (Array.isArray(cbValue)) {
                const valueSet = new Set(cbValue);
                const orderSet = new Set(cbOrder);
                tempOrder = (Array.isArray(cbOrder) ? cbOrder : []).filter((id: string | number) => valueSet.has(id));
                cbValue.forEach((id: string | number) => {
                    if (!orderSet.has(id)) tempOrder.push(id);
                });
            }
        }

        const columns = this.var_columns.get();

        const colMap = new Map(columns.map(c => [c.id, c]));
        const selectedSet = new Set(tempOrder);
        const orderedSelected: ColumnItem[] = tempOrder
            .map((id: string | number) => {
                const col = colMap.get(id);
                if (col) return { ...col, selected: true };
                return null;
            })
            .filter(Boolean) as ColumnItem[];
        const rest: ColumnItem[] = columns
            .filter(c => !selectedSet.has(c.id))
            .map(c => ({ ...c, selected: false }));
        const newColumns: ColumnItem[] = [...orderedSelected, ...rest];

        this.var_columns.set(newColumns);
        this.set(ComponentInputListSelectorConfigs.keys.prop_columns.name, newColumns);

        const params: ComponentInputListSelector_Methods_CLICK_ACCEPT_DataArgs = {};
        this.executeMethod(ComponentInputListSelectorConfigs.methods.CLICK_ACCEPT.name, event, params);

        const callbackParams: ComponentInputListSelector_Methods_CALLBACK_COL_SELECTOR_DataArgs = {};
        this.executeMethod(ComponentInputListSelectorConfigs.methods.CALLBACK_COL_SELECTOR.name, event, callbackParams);

        this.var_tempOrder.set([]);
        this.var_showPopup.set(false);
    }

    private fn_onClickReject(event: any) {
        if (this._columnsBackup.length > 0) {
            const restored = this._columnsBackup.map(c => ({ ...c }));
            this.var_columns.set(restored);
            this.set(ComponentInputListSelectorConfigs.keys.prop_columns.name, restored);
        }
        this.var_tempOrder.set([]);
        this.var_showPopup.set(false);

        const params: ComponentInputListSelector_Methods_CLICK_REJECT_DataArgs = {};
        this.executeMethod(ComponentInputListSelectorConfigs.methods.CLICK_REJECT.name, event, params);
    }

    private fn_onDeleteSelectedItem(event: any, dataArgs: any) {
        const itemId = dataArgs?.ID;
        const columns = this.var_columns.get();

        const newColumns: ColumnItem[] = columns.map(col => {
            if (col.id === itemId) {
                return { ...col, selected: false };
            }
            return col;
        });

        this.var_columns.set(newColumns);
        this.set(ComponentInputListSelectorConfigs.keys.prop_columns.name, newColumns);

        const params: ComponentInputListSelector_Methods_DELETE_SELECTED_ITEM_DataArgs = {};
        this.executeMethod(ComponentInputListSelectorConfigs.methods.DELETE_SELECTED_ITEM.name, event, params);
    }

}

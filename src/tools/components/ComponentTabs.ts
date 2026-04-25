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
    IconsType, SizeCalc,
    SIZES, SizesType, SizeUnit,
    ToolsComponents_BorderRadius,
    ToolsComponents_BorderWidth, UNITS
} from "../../utils/ToolsConsts";
import {TOOLS} from "../tools";
import {
    GOG_ComponentBasicConfigs_Component_keys,
    GOG_ComponentBasicConfigs_Component_parts,
    GOG_ComponentBasicConfigs_Component_Pattern,
    GOG_ComponentBasicConfigs_Component_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_keys,
    GOG_ComponentBasicConfigs_Component_Structure_parts,
    GOG_ComponentBasicConfigs_Component_Structure_Pattern, GOG_ComponentBasicConfigs_Component_Structure_Schema,
    GOG_ComponentBasicProps_Component,
    GOG_ComponentBasicProps_Component_Structure,
} from "../../core/component/SetupComponent";
import {Observable} from "../../core/Observable";
import {
    ComponentBorder_Methods_CLICK_BORDER_ComponentArgs,
    ComponentBorder_Methods_CLICK_BORDER_DataArgs,
    ComponentBorderMethodsType,
    ComponentBorderPropsType
} from "./ComponentBorder";
import {ComponentIconMethodsType, ComponentIconPropsType} from "./ComponentIcon";




export const ComponentTabsProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,

    prop_borderBackgroundSelected :      "prop_borderBackgroundSelected" ,
    prop_borderBackgroundUnselected :    "prop_borderBackgroundUnselected" ,
    prop_borderBackgroundBefore :        "prop_borderBackgroundBefore" ,
    prop_borderBackgroundAfter :         "prop_borderBackgroundAfter" ,
    prop_borderClass :                   "prop_borderClass" ,
    prop_borderStyles :                  "prop_borderStyles" ,
    prop_borderColor :                   "prop_borderColor" ,
    prop_borderWidth :                   "prop_borderWidth" ,
    prop_borderRadius :                  "prop_borderRadius" ,
    prop_borderMinWidth :                "prop_borderMinWidth" ,

    prop_iconClass :                     "prop_iconClass" ,
    prop_iconStyles :                    "prop_iconStyles" ,

    prop_titleStyles :                   "prop_titleStyles" ,
    prop_titleClass :                    "prop_titleClass" ,
    prop_titleColorSelected :            "prop_titleColorSelected" ,
    prop_titleColorUnselected :          "prop_titleColorUnselected" ,

    prop_bodyStyles :                    "prop_bodyStyles" ,
    prop_bodyClass :                     "prop_bodyClass" ,
    prop_bodyBackgroundColor :           "prop_bodyBackgroundColor" ,
    prop_bodyBorderColor :               "prop_bodyBorderColor" ,
    prop_bodyBorderWidth :               "prop_bodyBorderWidth" ,
    prop_bodyBorderRadius :              "prop_bodyBorderRadius" ,

    prop_tabs :                          "prop_tabs" ,
    prop_tabsView :                      "prop_tabsView" ,
    prop_tabSelected :                   "prop_tabSelected" ,
} as const;



export type propTabType = {
    id:               string|number;
    title?:           Observable<string>| string| null;
    icon?:            IconsType |null;
    body?:            ReactiveElement|string|null
};

export enum ComponentTabs_viewTypes{
    FULL_WIDTH=       "full_width",
    FLOAT=            "float",
}


const ComponentTabsConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys ,
        ///----------------------
        [ComponentTabsProps.prop_borderBackgroundSelected]: {
            name:                      ComponentTabsProps.prop_borderBackgroundSelected ,
            value:                     GOG_SetValue<Color | null>( Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1)),
        } ,
        [ComponentTabsProps.prop_borderBackgroundUnselected]: {
            name:                      ComponentTabsProps.prop_borderBackgroundUnselected ,
            value:                     GOG_SetValue<Color | null>( Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_3)),
        } ,
        [ComponentTabsProps.prop_borderBackgroundBefore]: {
            name:                      ComponentTabsProps.prop_borderBackgroundBefore ,
            value:                     GOG_SetValue<Color | null>( Color(COLORS_MAIN.SHADOW , COLORS_GRAD.GRADE_2)),
        } ,
        [ComponentTabsProps.prop_borderBackgroundAfter]: {
            name:                      ComponentTabsProps.prop_borderBackgroundAfter ,
            value:                     GOG_SetValue<Color | null>( Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_4)),
        } ,
        [ComponentTabsProps.prop_borderClass]: {
            name:                      ComponentTabsProps.prop_borderClass ,
            value:                     GOG_SetValue<string[]>( [] ) ,
        } ,
        [ComponentTabsProps.prop_borderStyles]: {
            name:                      ComponentTabsProps.prop_borderStyles ,
            value:                     GOG_SetValue<Record<string, string>>( {overflow: "hidden"}) ,
        } ,
        [ComponentTabsProps.prop_borderColor]: {
            name:                      ComponentTabsProps.prop_borderColor ,
            value:                     GOG_SetValue<Color | null>(null) ,
        } ,
        [ComponentTabsProps.prop_borderWidth]: {
            name:                      ComponentTabsProps.prop_borderWidth ,
            value:                     GOG_SetValue<GOG_ValueOf<typeof SIZES> | number | null>(null),
        } ,
        [ComponentTabsProps.prop_borderRadius]: {
            name:                      ComponentTabsProps.prop_borderRadius ,
            value:                     GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M),
        } ,
        [ComponentTabsProps.prop_borderMinWidth]: {
            name:                      ComponentTabsProps.prop_borderMinWidth ,
            value:                     GOG_SetValue<SizeUnit | SizeCalc |null>(SizeUnit(120 , UNITS.PEXEL)),
        } ,

        [ComponentTabsProps.prop_iconClass]: {
            name:                      ComponentTabsProps.prop_iconClass,
            value:                     GOG_SetValue<string[]>( []) ,
        } ,
        [ComponentTabsProps.prop_iconStyles]: {
            name:                      ComponentTabsProps.prop_iconStyles,
            value:                     GOG_SetValue<Record<string, string>>({}) ,
        } ,

        [ComponentTabsProps.prop_titleClass]: {
            name:                      ComponentTabsProps.prop_titleClass,
            value:                     GOG_SetValue<string[]>( []) ,
        } ,
        [ComponentTabsProps.prop_titleStyles]: {
            name:                      ComponentTabsProps.prop_titleStyles,
            value:                     GOG_SetValue<Record<string, string>>({}) ,
        } ,
        [ComponentTabsProps.prop_titleColorSelected]: {
            name:                      ComponentTabsProps.prop_titleColorSelected,
            value:                     GOG_SetValue<Color | null>( Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1 )),
        } ,
        [ComponentTabsProps.prop_titleColorUnselected]: {
            name:                      ComponentTabsProps.prop_titleColorUnselected,
            value:                     GOG_SetValue<Color | null>( Color(COLORS_MAIN.DARK , COLORS_GRAD.GRADE_1 )),
        } ,


        [ComponentTabsProps.prop_bodyClass]: {
            name:                      ComponentTabsProps.prop_bodyClass,
            value:                     GOG_SetValue<string[]>( []) ,
        } ,
        [ComponentTabsProps.prop_bodyStyles]: {
            name:                      ComponentTabsProps.prop_bodyStyles,
            value:                     GOG_SetValue<Record<string, string>>({}) ,
        } ,
        [ComponentTabsProps.prop_bodyBackgroundColor]: {
            name:                      ComponentTabsProps.prop_bodyBackgroundColor,
            value:                        GOG_SetValue<Color | null>( Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1 )),
        } ,
        [ComponentTabsProps.prop_bodyBorderColor]: {
            name:                      ComponentTabsProps.prop_bodyBorderColor ,
            value:                     GOG_SetValue<Color | null>(null) ,
        } ,
        [ComponentTabsProps.prop_bodyBorderWidth]: {
            name:                      ComponentTabsProps.prop_bodyBorderWidth ,
            value:                     GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.S),
        } ,
        [ComponentTabsProps.prop_bodyBorderRadius]: {
            name:                      ComponentTabsProps.prop_bodyBorderRadius ,
            value:                     GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.S),
        } ,

        [ComponentTabsProps.prop_tabsView]: {
            name:                      ComponentTabsProps.prop_tabsView ,
            value:                     GOG_SetValue<GOG_ValueOf<typeof ComponentTabs_viewTypes>>(ComponentTabs_viewTypes.FULL_WIDTH),
        } ,
        [ComponentTabsProps.prop_tabs]: {
            name:                      ComponentTabsProps.prop_tabs ,
            value:                     GOG_SetValue<propTabType[]>([]),
        } ,
        [ComponentTabsProps.prop_tabSelected]: {
            name:                      ComponentTabsProps.prop_tabSelected ,
            value:                     GOG_SetValue<string|number|null>(null),
        } ,
    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_Component_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts ,
        FORM: {
            name:                      "part-form"
        } ,
        FORM_TABS: {
            name:                      "part-form-tabs"
        } ,
        FORM_TABS_BORDER: {
            name:                      "part-form-tabs-border"
        } ,
        FORM_TABS_BORDER_CONTENT: {
            name:                      "part-form-tabs-border-content"
        } ,
        FORM_TABS_BORDER_CONTENT_ICON: {
            name:                      "part-form-tabs-border-content-icon"
        } ,
        FORM_TABS_BORDER_CONTENT_TITLE: {
            name:                      "part-form-tabs-border-content-title"
        } ,
        FORM_BODYS: {
            name:                      "part-form-bodys"
        } ,
        FORM_BODYS_BORDER: {
            name:                      "part-form-bodys-border"
        } ,
    } ,
    templates: {

    } ,
    methods: {
        CLICK_TAB: {
            name:                      "fn_onClickTab" ,
            dataArgs: {},
            componentArgs: {
                TAB_SELECTED : {
                    name:                 "TAB_SELECTED"
                }
            }
        },
        CLICK_BODY: {
            name:                      "fn_onClickBody" ,
            dataArgs: {},
            componentArgs: {
                TAB_SELECTED : {
                    name:                 "TAB_SELECTED"
                }
            }
        },
    }
} as const


export type ComponentTabsPropsType =                             GOG_ExtractNameValue<typeof ComponentTabsConfigs.keys>
export type ComponentTabsSchemaType =                            GOG_ExtractName<typeof ComponentTabsConfigs.schemas>
export type ComponentTabsTemplatesType =                         GOG_ExtractName<typeof ComponentTabsConfigs.templates>

export type ComponentTabs_Methods_CLICK_TAB_ComponentArgs =   GOG_ExtractName<typeof ComponentTabsConfigs.methods.CLICK_TAB.componentArgs>
export type ComponentTabs_Methods_CLICK_TAB_DataArgs =        GOG_ExtractNameValue<typeof ComponentTabsConfigs.methods.CLICK_TAB.dataArgs>

export type ComponentTabs_Methods_CLICK_BODY_ComponentArgs =   GOG_ExtractName<typeof ComponentTabsConfigs.methods.CLICK_BODY.componentArgs>
export type ComponentTabs_Methods_CLICK_BODY_DataArgs =        GOG_ExtractNameValue<typeof ComponentTabsConfigs.methods.CLICK_BODY.dataArgs>

export type ComponentTabsMethodsType = {
    [ComponentTabsConfigs.methods.CLICK_TAB.name]: ComponentCallBackType<ComponentTabs_Methods_CLICK_TAB_ComponentArgs , ComponentTabs_Methods_CLICK_TAB_DataArgs>
    [ComponentTabsConfigs.methods.CLICK_BODY.name]: ComponentCallBackType<ComponentTabs_Methods_CLICK_BODY_ComponentArgs , ComponentTabs_Methods_CLICK_BODY_DataArgs>
}

export abstract class ComponentTabsBase extends ComponentBase<
    ComponentTabsPropsType ,
    ComponentTabsSchemaType ,
    ComponentTabsTemplatesType ,
    ComponentTabsMethodsType
    >{

    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN=  defineComponentPatterns<ComponentTabsPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Pattern(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this) ,

        [ComponentTabsConfigs.keys.prop_borderBackgroundSelected.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_borderBackgroundSelected.name,
            default:                                          ComponentTabsConfigs.keys.prop_borderBackgroundSelected.value,
            title:                                            Language.translate("components.tabs.prop.prop_borderBackgroundSelected.title"),
            description:                                      Language.translate("components.tabs.prop.prop_borderBackgroundSelected.description"),
        } ,
        [ComponentTabsConfigs.keys.prop_borderBackgroundUnselected.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_borderBackgroundUnselected.name,
            default:                                          ComponentTabsConfigs.keys.prop_borderBackgroundUnselected.value,
            title:                                            Language.translate("components.tabs.prop.prop_borderBackgroundSelected.title"),
            description:                                      Language.translate("components.tabs.prop.prop_borderBackgroundSelected.description"),
        } ,
        [ComponentTabsConfigs.keys.prop_borderBackgroundBefore.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_borderBackgroundBefore.name,
            default:                                          ComponentTabsConfigs.keys.prop_borderBackgroundBefore.value,
            title:                                            Language.translate("components.tabs.prop.prop_borderBackgroundBefore.title"),
            description:                                      Language.translate("components.tabs.prop.prop_borderBackgroundBefore.description"),
        } ,
        [ComponentTabsConfigs.keys.prop_borderBackgroundAfter.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_borderBackgroundAfter.name,
            default:                                          ComponentTabsConfigs.keys.prop_borderBackgroundAfter.value,
            title:                                            Language.translate("components.tabs.prop.prop_borderBackgroundAfter.title"),
            description:                                      Language.translate("components.tabs.prop.prop_borderBackgroundAfter.description"),
        } ,
        [ComponentTabsConfigs.keys.prop_borderClass.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_borderClass.name,
            default:                                          ComponentTabsConfigs.keys.prop_borderClass.value,
            title:                                            Language.translate("components.tabs.prop.prop_borderClass.title"),
            description:                                      Language.translate("components.tabs.prop.prop_borderClass.description"),
        } ,
        [ComponentTabsConfigs.keys.prop_borderStyles.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_borderStyles.name,
            default:                                          ComponentTabsConfigs.keys.prop_borderStyles.value,
            title:                                            Language.translate("components.tabs.prop.prop_borderStyles.title"),
            description:                                      Language.translate("components.tabs.prop.prop_borderStyles.description"),
        } ,
        [ComponentTabsConfigs.keys.prop_borderColor.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_borderColor.name,
            default:                                          ComponentTabsConfigs.keys.prop_borderColor.value,
            title:                                            Language.translate("components.tabs.prop.prop_borderColor.title"),
            description:                                      Language.translate("components.tabs.prop.prop_borderColor.description"),
        } ,
        [ComponentTabsConfigs.keys.prop_borderWidth.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_borderWidth.name,
            default:                                          ComponentTabsConfigs.keys.prop_borderWidth.value,
            title:                                            Language.translate("components.tabs.prop.prop_borderWidth.title"),
            description:                                      Language.translate("components.tabs.prop.prop_borderWidth.description"),
        } ,
        [ComponentTabsConfigs.keys.prop_borderRadius.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_borderRadius.name,
            default:                                          ComponentTabsConfigs.keys.prop_borderRadius.value,
            title:                                            Language.translate("components.tabs.prop.prop_borderRadius.title"),
            description:                                      Language.translate("components.tabs.prop.prop_borderRadius.description"),
        } ,
        [ComponentTabsConfigs.keys.prop_borderMinWidth.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_borderMinWidth.name,
            default:                                          ComponentTabsConfigs.keys.prop_borderMinWidth.value,
            title:                                            Language.translate("components.tabs.prop.prop_borderMinWidth.title"),
            description:                                      Language.translate("components.tabs.prop.prop_borderMinWidth.description"),
        } ,

        [ComponentTabsConfigs.keys.prop_iconClass.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_iconClass.name,
            default:                                          ComponentTabsConfigs.keys.prop_iconClass.value,
            title:                                            Language.translate("components.tabs.prop.prop_iconClass.title"),
            description:                                      Language.translate("components.tabs.prop.prop_iconClass.description"),
        } ,
        [ComponentTabsConfigs.keys.prop_iconStyles.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_iconStyles.name,
            default:                                          ComponentTabsConfigs.keys.prop_iconStyles.value,
            title:                                            Language.translate("components.tabs.prop.prop_iconStyles.title"),
            description:                                      Language.translate("components.tabs.prop.prop_iconStyles.description"),
        } ,

        [ComponentTabsConfigs.keys.prop_titleStyles.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_titleStyles.name,
            default:                                          ComponentTabsConfigs.keys.prop_titleStyles.value,
            title:                                            Language.translate("components.tabs.prop.prop_titleStyles.title"),
            description:                                      Language.translate("components.tabs.prop.prop_titleStyles.description"),
        } ,
        [ComponentTabsConfigs.keys.prop_titleClass.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_titleClass.name,
            default:                                          ComponentTabsConfigs.keys.prop_titleClass.value,
            title:                                            Language.translate("components.tabs.prop.prop_titleClass.title"),
            description:                                      Language.translate("components.tabs.prop.prop_titleClass.description"),
        } ,
        [ComponentTabsConfigs.keys.prop_titleColorSelected.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_titleColorSelected.name,
            default:                                          ComponentTabsConfigs.keys.prop_titleColorSelected.value,
            title:                                            Language.translate("components.tabs.prop.prop_titleColorSelected.title"),
            description:                                      Language.translate("components.tabs.prop.prop_titleColorSelected.description"),
        } ,

        [ComponentTabsConfigs.keys.prop_titleColorUnselected.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_titleColorUnselected.name,
            default:                                          ComponentTabsConfigs.keys.prop_titleColorUnselected.value,
            title:                                            Language.translate("components.tabs.prop.prop_titleColorUnselected.title"),
            description:                                      Language.translate("components.tabs.prop.prop_titleColorUnselected.description"),
        } ,

        [ComponentTabsConfigs.keys.prop_bodyStyles.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_bodyStyles.name,
            default:                                          ComponentTabsConfigs.keys.prop_bodyStyles.value,
            title:                                            Language.translate("components.tabs.prop.prop_bodyStyles.title"),
            description:                                      Language.translate("components.tabs.prop.prop_bodyStyles.description"),
        } ,
        [ComponentTabsConfigs.keys.prop_bodyClass.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_bodyClass.name,
            default:                                          ComponentTabsConfigs.keys.prop_bodyClass.value,
            title:                                            Language.translate("components.tabs.prop.prop_bodyClass.title"),
            description:                                      Language.translate("components.tabs.prop.prop_bodyClass.description"),
        } ,
        [ComponentTabsConfigs.keys.prop_bodyBackgroundColor.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_bodyBackgroundColor.name,
            default:                                          ComponentTabsConfigs.keys.prop_bodyBackgroundColor.value,
            title:                                            Language.translate("components.tabs.prop.prop_bodyBackgroundColor.title"),
            description:                                      Language.translate("components.tabs.prop.prop_bodyBackgroundColor.description"),
        } ,
        [ComponentTabsConfigs.keys.prop_bodyBorderColor.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_bodyBorderColor.name,
            default:                                          ComponentTabsConfigs.keys.prop_bodyBorderColor.value,
            title:                                            Language.translate("components.tabs.prop.prop_bodyBorderColor.title"),
            description:                                      Language.translate("components.tabs.prop.prop_bodyBorderColor.description"),
        } ,
        [ComponentTabsConfigs.keys.prop_bodyBorderWidth.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_bodyBorderWidth.name,
            default:                                          ComponentTabsConfigs.keys.prop_bodyBorderWidth.value,
            title:                                            Language.translate("components.tabs.prop.prop_bodyBorderWidth.title"),
            description:                                      Language.translate("components.tabs.prop.prop_bodyBorderWidth.description"),
        } ,
        [ComponentTabsConfigs.keys.prop_bodyBorderRadius.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_bodyBorderRadius.name,
            default:                                          ComponentTabsConfigs.keys.prop_bodyBorderRadius.value,
            title:                                            Language.translate("components.tabs.prop.prop_bodyBorderRadius.title"),
            description:                                      Language.translate("components.tabs.prop.prop_bodyBorderRadius.description"),
        } ,

        [ComponentTabsConfigs.keys.prop_tabs.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_tabs.name,
            default:                                          ComponentTabsConfigs.keys.prop_tabs.value,
            title:                                            Language.translate("components.tabs.prop.prop_tabs.title"),
            description:                                      Language.translate("components.tabs.prop.prop_tabs.description"),
        } ,
        [ComponentTabsConfigs.keys.prop_tabsView.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_tabsView.name,
            default:                                          ComponentTabsConfigs.keys.prop_tabsView.value,
            title:                                            Language.translate("components.tabs.prop.prop_tabsView.title"),
            description:                                      Language.translate("components.tabs.prop.prop_tabsView.description"),
        } ,
        [ComponentTabsConfigs.keys.prop_tabSelected.name]: {
            prop:                                             ComponentTabsConfigs.keys.prop_tabSelected.name,
            default:                                          ComponentTabsConfigs.keys.prop_tabSelected.value,
            title:                                            Language.translate("components.tabs.prop.prop_tabSelected.title"),
            description:                                      Language.translate("components.tabs.prop.prop_tabSelected.description"),
        } ,
    });


    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentTabsSchemaType , ComponentTabsPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this) ,
        [ComponentTabsConfigs.schemas.FORM.name]: {
            part:               ComponentTabsConfigs.schemas.FORM.name ,
            title:              Language.translate("components.tabs.schema.form.title") ,
            description:        Language.translate("components.tabs.schema.form.description") ,
            props: [

            ]
        } ,
        [ComponentTabsConfigs.schemas.FORM_TABS.name]: {
            part:               ComponentTabsConfigs.schemas.FORM_TABS.name ,
            title:              Language.translate("components.tabs.schema.form_tabs.title") ,
            description:        Language.translate("components.tabs.schema.form_tabs.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_tabs.name] ,
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_tabsView.name] ,
            ]
        } ,
        [ComponentTabsConfigs.schemas.FORM_TABS_BORDER.name]: {
            part:               ComponentTabsConfigs.schemas.FORM_TABS_BORDER.name ,
            title:              Language.translate("components.tabs.schema.form_tabs_border.title") ,
            description:        Language.translate("components.tabs.schema.form_tabs_border.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_tabSelected.name] ,

                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_borderBackgroundSelected.name] ,
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_borderBackgroundUnselected.name] ,
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_borderClass.name] ,
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_borderStyles.name] ,
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_borderColor.name] ,
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_borderWidth.name] ,
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_borderRadius.name] ,
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_borderMinWidth.name] ,
            ]
        } ,
        [ComponentTabsConfigs.schemas.FORM_TABS_BORDER_CONTENT.name]: {
            part:               ComponentTabsConfigs.schemas.FORM_TABS_BORDER_CONTENT.name ,
            title:              Language.translate("components.tabs.schema.form_tabs_border_content.title") ,
            description:        Language.translate("components.tabs.schema.form_tabs_border_content.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_tabsView.name] ,
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_borderBackgroundBefore.name] ,
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_borderBackgroundAfter.name] ,
            ]
        } ,
        [ComponentTabsConfigs.schemas.FORM_TABS_BORDER_CONTENT_TITLE.name]: {
            part:               ComponentTabsConfigs.schemas.FORM_TABS_BORDER_CONTENT_TITLE.name ,
            title:              Language.translate("components.tabs.schema.form_tabs_border_content_icon.title") ,
            description:        Language.translate("components.tabs.schema.form_tabs_border_content_icon.description") ,
            props: [

                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_tabSelected.name] ,
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_titleStyles.name] ,
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_titleClass.name] ,
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_titleColorSelected.name] ,
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_titleColorUnselected.name] ,
            ]
        } ,
        [ComponentTabsConfigs.schemas.FORM_TABS_BORDER_CONTENT_ICON.name]: {
            part:               ComponentTabsConfigs.schemas.FORM_TABS_BORDER_CONTENT_ICON.name ,
            title:              Language.translate("components.tabs.schema.form_tabs_border_content_title.title") ,
            description:        Language.translate("components.tabs.schema.form_tabs_border_content_title.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_iconClass.name] ,
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_iconStyles.name] ,
            ]
        } ,
        [ComponentTabsConfigs.schemas.FORM_BODYS.name]: {
            part:               ComponentTabsConfigs.schemas.FORM_BODYS.name ,
            title:              Language.translate("components.tabs.schema.form_bodys.title") ,
            description:        Language.translate("components.tabs.schema.form_bodys.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_tabs.name] ,
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_tabsView.name] ,
            ]
        } ,
        [ComponentTabsConfigs.schemas.FORM_BODYS_BORDER.name]: {
            part:               ComponentTabsConfigs.schemas.FORM_BODYS_BORDER.name ,
            title:              Language.translate("components.tabs.schema.form_bodys_border.title") ,
            description:        Language.translate("components.tabs.schema.form_bodys_border.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_tabSelected.name] ,

                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_bodyStyles.name] ,
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_bodyClass.name] ,
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_bodyBorderColor.name] ,
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_bodyBorderWidth.name] ,
                this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_bodyBorderRadius.name] ,
            ]
        } ,
    })



    /* ---------------------------------------------
           PROPERTYs Pattern
        --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentTabsTemplatesType , ComponentTabsPropsType>({

    });




    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentTabsMethodsType , ComponentTabsPropsType>({
        [ComponentTabsConfigs.methods.CLICK_TAB.name]: {
            title:                                            Language.translate("components.tabs.methods.fn_onClickTab.title"),
            description:                                      Language.translate("components.tabs.methods.fn_onClickTab.description"),
            args: {
                [ComponentTabsConfigs.methods.CLICK_TAB.componentArgs.TAB_SELECTED.name] : this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_tabSelected.name]
            }
        } ,
        [ComponentTabsConfigs.methods.CLICK_BODY.name]: {
            title:                                            Language.translate("components.tabs.methods.fn_onClickBody.title"),
            description:                                      Language.translate("components.tabs.methods.fn_onClickBody.description"),
            args: {
                [ComponentTabsConfigs.methods.CLICK_BODY.componentArgs.TAB_SELECTED.name] : this._COMPONENT_PATTERN[ComponentTabsConfigs.keys.prop_tabSelected.name]
            }
        } ,
    });



    /* ---------------------------------------------
       Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        return new ComponentTabs(
            <ComponentTabsPropsType>{
                classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                styles: {}  ,

                prop_tabsView: "full_width" ,
                prop_tabSelected: 1 ,
                prop_tabs: [
                    {
                        id:     1 ,
                        title:  Language.translate("Tab_a"),
                        icon:   TOOLS.ICON.icon_search({size: SIZES.L , primaryColor: Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1) , secondaryColor: Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) }) ,
                        body:   "tab A"
                    } ,
                    {
                        id:     2 ,
                        title:  Language.translate("Tab_b"),
                        icon:   TOOLS.ICON.icon_calendar({size: SIZES.L , primaryColor: Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1) , secondaryColor: Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) }) ,
                        body:   "tab B"
                    }
                ]
            },
            <ComponentTabsMethodsType>{
                fn_onClickTab: function (event, dataArgs:ComponentTabs_Methods_CLICK_TAB_DataArgs, componentArgs:ComponentTabs_Methods_CLICK_TAB_ComponentArgs)  {
                    console.log("tab clicked" , dataArgs , componentArgs)
                } ,
                fn_onClickBody: function (event, dataArgs:ComponentTabs_Methods_CLICK_BODY_DataArgs, componentArgs:ComponentTabs_Methods_CLICK_BODY_ComponentArgs)  {
                    console.log("tab Body clicked" , dataArgs , componentArgs)
                }
            }
        ).getElement();
    }


}

export class ComponentTabs extends ComponentTabsBase{


    /* ---------------------------------------------
       SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentTabsPropsType ,
        methods: ComponentTabsMethodsType ,
        events = null
    ) {
        super("tabs" , null);
        super.renderComponent(config , methods , events);
    }



    /* ---------------------------------------------
      TEMPLATEs
     --------------------------------------------- */

    override renderContentComponent() {
        return this.executeSchemaPart(ComponentTabsConfigs.schemas.FORM.name)
    }

    override renderManagerComponent(partName , attrsDefault, data , extra) : ReactiveElement {
        switch (partName){
            case ComponentTabsConfigs.schemas.FORM.name:
                return  this.template_render_form(attrsDefault , data , extra);
            case ComponentTabsConfigs.schemas.FORM_TABS.name:
                return  this.template_render_formTabs(attrsDefault , data , extra);
            case ComponentTabsConfigs.schemas.FORM_TABS_BORDER.name:
                return  this.template_render_formTabsBorder(attrsDefault , data , extra);
            case ComponentTabsConfigs.schemas.FORM_TABS_BORDER_CONTENT.name:
                return  this.template_render_formTabsBorderContent(attrsDefault , data , extra);
            case ComponentTabsConfigs.schemas.FORM_TABS_BORDER_CONTENT_ICON.name:
                return  this.template_render_formTabsBorderContentIcon(attrsDefault , data , extra);
            case ComponentTabsConfigs.schemas.FORM_TABS_BORDER_CONTENT_TITLE.name:
                return  this.template_render_formTabsBorderContentTitle(attrsDefault , data , extra);
            case ComponentTabsConfigs.schemas.FORM_BODYS.name:
                return  this.template_render_formBodys(attrsDefault , data , extra);
            case ComponentTabsConfigs.schemas.FORM_BODYS_BORDER.name:
                return  this.template_render_formBodysBorder(attrsDefault , data , extra);
        }
    }


    private template_render_form(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                children: [
                    this.executeSchemaPart(ComponentTabsConfigs.schemas.FORM_TABS.name) ,
                    this.executeSchemaPart(ComponentTabsConfigs.schemas.FORM_BODYS.name)
                ]
            });

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }

    private template_render_formTabs(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_tabs=         data[ComponentTabsConfigs.keys.prop_tabs.name];
            const prop_tabsView=     data[ComponentTabsConfigs.keys.prop_tabsView.name];

            let tabsEl = [];
            const tabsList = prop_tabs.get()
            if (tabsList && Array.isArray(tabsList)) {
                for (let i = 0; i < tabsList.length; i++) {
                    const itemTab = tabsList[i];

                    tabsEl.push(
                        ReactiveElement.section(
                            {
                                attrs: {
                                    "id": `component-tabs-item-${this._COMPONENT_RANDOM_ID}-${i}`,
                                },
                                styles: {
                                    cursor: "pointer"
                                } ,
                                className: ["p-0"] ,
                                classBind: [
                                    prop_tabsView.map(
                                        v=>{
                                            switch (v){
                                                case ComponentTabs_viewTypes.FULL_WIDTH:
                                                    switch (tabsList.length){
                                                        case 4:
                                                            return  "col-md-3";
                                                        case 3:
                                                            return "col-md-4";
                                                        case 2:
                                                            return "col-md-6";
                                                        case 1:
                                                            return "col-md-12";
                                                    }
                                                case ComponentTabs_viewTypes.FLOAT:
                                                    return ["float-start"];
                                            }
                                            return null;
                                        }
                                    ) ,
                                ] ,
                                children: (el) => [
                                    this.executeSchemaPart(ComponentTabsConfigs.schemas.FORM_TABS_BORDER.name , {itemTab  , tabIndex: i , tabLength: tabsList.length})
                                ]
                            }
                        )
                    )

                }
            }

            return  ReactiveElement.part(  "section" ,
                {
                    attrs: {
                        ...attrsDefault
                    },
                    classBind: [
                        prop_tabsView.map(
                            v=>{
                                switch (v){
                                    case ComponentTabs_viewTypes.FULL_WIDTH:
                                        return ["row" , "m-0" , "mb-1"];
                                    case ComponentTabs_viewTypes.FLOAT:
                                        return ["pb-1"];
                                }
                                return null;
                            }
                        ) ,
                    ],
                    stylesBind: {
                        display:    prop_tabsView.map(
                            v=>{
                                switch (v){
                                    case ComponentTabs_viewTypes.FLOAT:
                                        return "flow-root";
                                }
                                return null;
                            }
                        ) ,
                    } ,
                    className: ["pt-0"] ,
                    children: [
                        ...tabsEl
                    ]
                });

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }

    private template_render_formTabsBorder(attrsDefault , data , extra) : ReactiveElement {

        if (data != null && extra.hasOwnProperty("itemTab") && extra.hasOwnProperty("tabIndex") && extra.hasOwnProperty("tabLength")) {
            const itemTab = extra.itemTab;
            const tabIndex = extra.tabIndex;
            const tabLength = extra.tabLength;

            const prop_tabSelected=                 data[ComponentTabsConfigs.keys.prop_tabSelected.name];

            const prop_borderBackgroundSelected=    data[ComponentTabsConfigs.keys.prop_borderBackgroundSelected.name];
            const prop_borderBackgroundUnselected=  data[ComponentTabsConfigs.keys.prop_borderBackgroundUnselected.name];
            const prop_borderClass=                 data[ComponentTabsConfigs.keys.prop_borderClass.name];
            const prop_borderStyles=                data[ComponentTabsConfigs.keys.prop_borderStyles.name];
            const prop_borderColor=                 data[ComponentTabsConfigs.keys.prop_borderColor.name];
            const prop_borderWidth=                 data[ComponentTabsConfigs.keys.prop_borderWidth.name];
            const prop_borderRadius=                data[ComponentTabsConfigs.keys.prop_borderRadius.name];
            const prop_borderMinWidth=              data[ComponentTabsConfigs.keys.prop_borderMinWidth.name];

            const classMargin = [];
            if (tabIndex < tabLength - 1){
                classMargin.push("me-1")
            }
            if (tabIndex > 0){
                classMargin.push("ms-1")
            }
            return  new ToolsComponents.ComponentBorder(
                <ComponentBorderPropsType>{
                    prop_contentSize:             SIZES.S ,
                    classList:                    prop_borderClass  ,
                    styles:                       prop_borderStyles  ,
                    prop_content:                 this.executeSchemaPart(ComponentTabsConfigs.schemas.FORM_TABS_BORDER_CONTENT.name , {itemTab}) ,
                    prop_borderRadius:            prop_borderRadius ,
                    prop_borderWidth:             prop_borderWidth ,
                    prop_minWidth:                prop_borderMinWidth ,
                    prop_borderClass:             [ ...classMargin ,"px-2" , "py-1" , "position-relative"] ,
                    prop_contentBackgroundColor:  prop_tabSelected.map(
                        v=>{
                            let bgColor = prop_borderBackgroundUnselected.get()
                            if (v == itemTab.id){
                                bgColor = prop_borderBackgroundSelected.get()
                            }
                            return bgColor;
                        }
                    )  ,
                    prop_borderColor:             prop_borderColor
                } ,
                <ComponentBorderMethodsType>{
                    fn_onClickBorder: function (event, dataArgs:ComponentBorder_Methods_CLICK_BORDER_DataArgs, componentArgs:ComponentBorder_Methods_CLICK_BORDER_ComponentArgs) {
                        const tabId = extra?.itemTab?.id
                        if (tabId){
                            this.set(ComponentTabsConfigs.keys.prop_tabSelected.name , tabId)
                        }
                        const params : ComponentTabs_Methods_CLICK_TAB_DataArgs = {}
                        this.executeMethod(ComponentTabsConfigs.methods.CLICK_TAB.name  , event , params);
                    }.bind(this)
                }
            ).getReactiveElement();
        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }

    private template_render_formTabsBorderContent(attrsDefault , data , extra) : ReactiveElement {

        if (data != null && extra?.itemTab) {
            const itemTab = extra.itemTab;

            const prop_borderBackgroundBefore=  data[ComponentTabsConfigs.keys.prop_borderBackgroundBefore.name];
            const prop_borderBackgroundAfter=  data[ComponentTabsConfigs.keys.prop_borderBackgroundAfter.name];

            const contentHeight = ToolsCss.getHeightSize(AppConfig.get("sizeName"));

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                stylesCustom: `
#${attrsDefault?.id}:before{
    content:             "";
    width:               calc(100% - 10px);
    height:              115%;
    display:             block;
    position:            absolute;
    top:                 0;
    left:                5px;
    background-color:    ${prop_borderBackgroundBefore.get()};
    clip-path:           ellipse(75% 50% at 50% 0);
}
#${attrsDefault?.id}:after{
    background-color: ${prop_borderBackgroundAfter} !important;
}
                ` ,
                styles: {
                    height: `${contentHeight}px` ,
                },
                className: [ "row"] ,
                children: [
                    this.executeSchemaPart(ComponentTabsConfigs.schemas.FORM_TABS_BORDER_CONTENT_TITLE.name , {itemTab}) ,
                    this.executeSchemaPart(ComponentTabsConfigs.schemas.FORM_TABS_BORDER_CONTENT_ICON.name , {itemTab})
                ]
            });

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }

    private template_render_formTabsBorderContentIcon(attrsDefault , data , extra) : ReactiveElement {

        if (data != null && extra?.itemTab) {
            const itemTab = extra.itemTab;

            const prop_iconClass=    data[ComponentTabsConfigs.keys.prop_iconClass.name];
            const prop_iconStyles=   data[ComponentTabsConfigs.keys.prop_iconStyles.name];

            return new ToolsComponents.ComponentIcon(
                <ComponentIconPropsType>{
                    classList:          [ "text-center" , "col-5" , "px-0"]  ,
                    styles:             { }  ,

                    prop_iconClass :    prop_iconClass ,
                    prop_iconStyles :   prop_iconStyles ,
                    prop_icon:          itemTab?.icon ,
                    prop_iconTitle:     itemTab?.title ,
                } ,
                <ComponentIconMethodsType>{

                }
            ).getReactiveElement();

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }

    private template_render_formTabsBorderContentTitle(attrsDefault , data , extra) : ReactiveElement {

        if (data != null && extra?.itemTab) {
            const itemTab = extra.itemTab;

            const prop_tabSelected=             data[ComponentTabsConfigs.keys.prop_tabSelected.name];

            const prop_titleStyles=             data[ComponentTabsConfigs.keys.prop_titleStyles.name];
            const prop_titleClass=              data[ComponentTabsConfigs.keys.prop_titleClass.name];
            const prop_titleColorSelected=      data[ComponentTabsConfigs.keys.prop_titleColorSelected.name];
            const prop_titleColorUnselected=    data[ComponentTabsConfigs.keys.prop_titleColorUnselected.name];

            const contentHeight   = ToolsCss.getHeightSize(AppConfig.get("sizeName"));
            const contentFontSize = ToolsCss.getFontSize(AppConfig.get("sizeName"));

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                styles: {
                    lineHeight: `${contentHeight}px` ,
                    fontSize:   `${contentFontSize}px` ,
                },
                stylesBind: {
                    prop_titleStyles ,
                    color:  prop_tabSelected.map(
                        v=>{
                            let txtColor = prop_titleColorUnselected.get()
                            if (v == itemTab.id){
                                txtColor = prop_titleColorSelected.get()
                            }
                            return txtColor;
                        }
                    )  ,
                },
                classBind: [
                    prop_titleClass
                ],
                className: [
                    "text-center" , "col-7" , "px-0"
                ] ,
                children: [
                    ReactiveElement.b({
                        children: [
                            itemTab?.title
                        ]
                    })
                ]
            });

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }

    private template_render_formBodys(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_tabs=         data[ComponentTabsConfigs.keys.prop_tabs.name];
            const prop_tabsView=     data[ComponentTabsConfigs.keys.prop_tabsView.name];

            let tabsEl = [];
            const tabsList = prop_tabs.get()
            if (tabsList && Array.isArray(tabsList)) {
                for (let i = 0; i < tabsList.length; i++) {
                    const itemTab = tabsList[i];

                    tabsEl.push(
                        ReactiveElement.section(
                            {
                                attrs: {
                                    "id": `component-tabs-body-item-${this._COMPONENT_RANDOM_ID}-${i}`,
                                },
                                children: (el) => [
                                    this.executeSchemaPart(ComponentTabsConfigs.schemas.FORM_BODYS_BORDER.name , {itemTab  , tabIndex: i , tabLength: tabsList.length})
                                ]
                            }
                        )
                    )

                }
            }

            return  ReactiveElement.part(  "section" ,
                {
                    attrs: {
                        ...attrsDefault
                    },
                    children: [
                        ...tabsEl
                    ]
                });

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }

    private template_render_formBodysBorder(attrsDefault , data , extra) : ReactiveElement {

        if (data != null && extra?.itemTab)  {

            const prop_tabSelected=           data[ComponentTabsConfigs.keys.prop_tabSelected.name];

            const prop_bodyStyles=            data[ComponentTabsConfigs.keys.prop_bodyStyles.name];
            const prop_bodyClass=             data[ComponentTabsConfigs.keys.prop_bodyClass.name];
            const prop_bodyBackgroundColor=   data[ComponentTabsConfigs.keys.prop_bodyBackgroundColor.name];
            const prop_bodyBorderColor=       data[ComponentTabsConfigs.keys.prop_bodyBorderColor.name];
            const prop_bodyBorderWidth=       data[ComponentTabsConfigs.keys.prop_bodyBorderWidth.name];
            const prop_bodyBorderRadius=      data[ComponentTabsConfigs.keys.prop_bodyBorderRadius.name];

            return  new ToolsComponents.ComponentBorder(
                <ComponentBorderPropsType>{
                    prop_show: prop_tabSelected.map(
                        v=>{
                            if (v == extra.itemTab?.id){
                                return true;
                            }
                            return false;
                        }
                    ) ,
                    prop_contentSize:             SIZES.S ,
                    classList:                    prop_bodyClass  ,
                    styles:                       prop_bodyStyles  ,
                    prop_content:                 extra.itemTab?.body ,
                    prop_borderRadius:            prop_bodyBorderRadius ,
                    prop_borderWidth:             prop_bodyBorderWidth ,
                    prop_borderClass:             [
                        "px-2" , "py-1" , "position-relative"
                    ] ,
                    prop_contentBackgroundColor:  prop_bodyBackgroundColor  ,
                    prop_borderColor:             prop_bodyBorderColor
                } ,
                <ComponentBorderMethodsType>{
                    fn_onClickBorder: function (event, dataArgs:ComponentBorder_Methods_CLICK_BORDER_DataArgs, componentArgs:ComponentBorder_Methods_CLICK_BORDER_ComponentArgs) {
                        const params : ComponentTabs_Methods_CLICK_TAB_DataArgs = {}
                        this.executeMethod(ComponentTabsConfigs.methods.CLICK_BODY.name  , event , params);
                    }.bind(this)
                }
            ).getReactiveElement();
        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }




}
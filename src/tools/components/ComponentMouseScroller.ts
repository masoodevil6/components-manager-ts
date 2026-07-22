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
    GOG_ComponentBasicConfigs_Component_Schema, GOG_ComponentBasicConfigs_Component_Structure_FormInput_keys,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_parts,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_keys,
    GOG_ComponentBasicConfigs_Component_Structure_parts,
    GOG_ComponentBasicConfigs_Component_Structure_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_Schema,
    GOG_ComponentBasicProps_Component,
    GOG_ComponentBasicProps_Component_Structure, GOG_ComponentBasicProps_Component_Structure_FormInput,
} from "../../core/component/SetupComponent";
import {
    ComponentBorder,
    ComponentBorder_Methods_CLICK_BORDER_ComponentArgs, ComponentBorder_Methods_CLICK_BORDER_DataArgs,
    ComponentBorderMethodsType,
    ComponentBorderPropsType
} from "./ComponentBorder";
import {Observable} from "../../core/Observable";
import {
    ComponentSidebar,
    ComponentSidebar_directionTypes,
    ComponentSidebarMethodsType, ComponentSidebarProps,
    ComponentSideBarPropsType
} from "./ComponentSidebar";
import {ToolsIcons} from "../icons";
import {
    ComponentIcon, ComponentIcon_Methods_CLICK_ComponentArgs,
    ComponentIcon_Methods_HOVER_DataArgs,
    ComponentIconMethodsType,
    ComponentIconPropsType
} from "./ComponentIcon";
import {ComponentElementPositionMethodsType, ComponentElementPositionPropsType} from "./ComponentElementPosition";




export const ComponentMouseScrollerProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,

    prop_borderBackgroundColor_light :      "prop_borderBackgroundColor_light" ,
    prop_borderBackgroundColor_dark :       "prop_borderBackgroundColor_dark" ,
    prop_borderWidth :                      "prop_borderWidth" ,
    prop_borderRadius :                     "prop_borderRadius" ,
    prop_borderColor :                      "prop_borderColor" ,

    prop_toolsZoomHas :                     "prop_toolsZoomHas" ,
    prop_toolsColorModeHas :                "prop_toolsColorModeHas" ,
    prop_toolsOpacity :                     "prop_toolsOpacity" ,

    prop_colorMode :                        "prop_colorMode" ,

    prop_sideBarsMargin:                    "prop_sideBarsMargin" ,

    prop_sideBarHas:                        "prop_sideBarHas" ,
    prop_sideBarWidth:                      "prop_sideBarWidth" ,
    prop_sideBarBtnOpenHas:                 "prop_sideBarBtnOpenHas" ,
    prop_sideBarContent:                    "prop_sideBarContent" ,

    prop_sideBarTopHas:                     "prop_sideBarTopHas" ,
    prop_sideBarTopWidth:                   "prop_sideBarTopWidth" ,
    prop_sideBarTopContent:                 "prop_sideBarTopContent" ,

    prop_sideBarBottomHas:                   "prop_sideBarBottomHas" ,
    prop_sideBarBottomWidth:                 "prop_sideBarBottomWidth" ,
    prop_sideBarBottomContent:               "prop_sideBarBottomContent" ,

    prop_zoom:                               "prop_zoom" ,
    prop_zoomMin:                            "prop_zoomMin" ,
    prop_zoomMax:                            "prop_zoomMax" ,
    prop_zoomStep:                           "prop_zoomStep" ,

    prop_scrollLeft:                         "prop_scrollLeft" ,
    prop_scrollTop:                          "prop_scrollTop" ,

    prop_content:                            "prop_content" ,

} as const;

export enum ComponentMouseScroller_lightTypes{
    LIGHT=     "light",
    DARK=      "dark",
}

const ComponentMouseScrollerConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys ,
        ///----------------------

        [ComponentMouseScrollerProps.prop_borderBackgroundColor_light]: {
            name:               ComponentMouseScrollerProps.prop_borderBackgroundColor_light ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.SHADOW , COLORS_GRAD.GRADE_5)),
        } ,
        [ComponentMouseScrollerProps.prop_borderBackgroundColor_dark]: {
            name:               ComponentMouseScrollerProps.prop_borderBackgroundColor_dark ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.SHADOW , COLORS_GRAD.GRADE_3)),
        } ,
        [ComponentMouseScrollerProps.prop_borderWidth]: {
            name:               ComponentMouseScrollerProps.prop_borderWidth ,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M),
        } ,
        [ComponentMouseScrollerProps.prop_borderRadius]: {
            name:               ComponentMouseScrollerProps.prop_borderRadius ,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M),
        } ,
        [ComponentMouseScrollerProps.prop_borderColor]: {
            name:               ComponentMouseScrollerProps.prop_borderColor ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1)) ,
        } ,


        [ComponentMouseScrollerProps.prop_toolsZoomHas]: {
            name:               ComponentMouseScrollerProps.prop_toolsZoomHas ,
            value:              GOG_SetValue<boolean>(true) ,
        } ,
        [ComponentMouseScrollerProps.prop_toolsColorModeHas]: {
            name:               ComponentMouseScrollerProps.prop_toolsColorModeHas ,
            value:              GOG_SetValue<boolean>(true) ,
        } ,
        [ComponentMouseScrollerProps.prop_toolsOpacity]: {
            name:                      ComponentMouseScrollerProps.prop_toolsOpacity ,
            value:                     GOG_SetValue<Number | null>( 40),
        } ,


        [ComponentMouseScrollerProps.prop_colorMode]: {
            name:                     ComponentMouseScrollerProps.prop_colorMode ,
            value:                    GOG_SetValue<GOG_ValueOf<typeof ComponentMouseScroller_lightTypes>>(ComponentMouseScroller_lightTypes.LIGHT),
        } ,


        [ComponentMouseScrollerProps.prop_sideBarsMargin]: {
            name:                     ComponentMouseScrollerProps.prop_sideBarsMargin ,
            value:                     GOG_SetValue<Number | null>( 5),
        } ,


        [ComponentMouseScrollerProps.prop_sideBarHas]: {
            name:                     ComponentMouseScrollerProps.prop_sideBarHas ,
            value:                    GOG_SetValue<boolean>(false) ,
        } ,
        [ComponentMouseScrollerProps.prop_sideBarWidth]: {
            name:                     ComponentMouseScrollerProps.prop_sideBarWidth ,
            value:                     GOG_SetValue<Number | null>( 40),
        } ,
        [ComponentMouseScrollerProps.prop_sideBarBtnOpenHas]: {
            name:                     ComponentMouseScrollerProps.prop_sideBarBtnOpenHas ,
            value:                    GOG_SetValue<boolean>(true) ,
        } ,
        [ComponentMouseScrollerProps.prop_sideBarContent]: {
            name:                     ComponentMouseScrollerProps.prop_sideBarContent ,
            value:                     GOG_SetValue<string | ReactiveElement | null>( null) ,
        } ,


        [ComponentMouseScrollerProps.prop_sideBarTopHas]: {
            name:                     ComponentMouseScrollerProps.prop_sideBarTopHas ,
            value:                    GOG_SetValue<boolean>(false) ,
        } ,
        [ComponentMouseScrollerProps.prop_sideBarTopWidth]: {
            name:                     ComponentMouseScrollerProps.prop_sideBarTopWidth ,
            value:                     GOG_SetValue<Number | null>( 40),
        } ,
        [ComponentMouseScrollerProps.prop_sideBarTopContent]: {
            name:                     ComponentMouseScrollerProps.prop_sideBarTopContent ,
            value:                     GOG_SetValue<string | ReactiveElement | null>( null) ,
        } ,


        [ComponentMouseScrollerProps.prop_sideBarBottomHas]: {
            name:                     ComponentMouseScrollerProps.prop_sideBarBottomHas ,
            value:                    GOG_SetValue<boolean>(false) ,
        } ,
        [ComponentMouseScrollerProps.prop_sideBarBottomWidth]: {
            name:                     ComponentMouseScrollerProps.prop_sideBarBottomWidth ,
            value:                     GOG_SetValue<Number | null>( 40),
        } ,
        [ComponentMouseScrollerProps.prop_sideBarBottomContent]: {
            name:                     ComponentMouseScrollerProps.prop_sideBarBottomContent ,
            value:                     GOG_SetValue<string | ReactiveElement | null>( null) ,
        } ,


        [ComponentMouseScrollerProps.prop_zoom]: {
            name:                     ComponentMouseScrollerProps.prop_zoom ,
            value:                     GOG_SetValue<number>(1.0) ,
        } ,
        [ComponentMouseScrollerProps.prop_zoomMin]: {
            name:                     ComponentMouseScrollerProps.prop_zoomMin ,
            value:                     GOG_SetValue<number>(0.4) ,
        } ,
        [ComponentMouseScrollerProps.prop_zoomMax]: {
            name:                     ComponentMouseScrollerProps.prop_zoomMax ,
            value:                     GOG_SetValue<number>(3.0) ,
        } ,
        [ComponentMouseScrollerProps.prop_zoomStep]: {
            name:                     ComponentMouseScrollerProps.prop_zoomStep ,
            value:                     GOG_SetValue<number>( 1.0015) ,
        } ,


        [ComponentMouseScrollerProps.prop_scrollLeft]: {
            name:                     ComponentMouseScrollerProps.prop_scrollLeft ,
            value:                     GOG_SetValue<number>( 0) ,
        } ,
        [ComponentMouseScrollerProps.prop_scrollTop]: {
            name:                     ComponentMouseScrollerProps.prop_scrollTop ,
            value:                     GOG_SetValue<number>( 0) ,
        } ,


        [ComponentMouseScrollerProps.prop_content]: {
            name:                      ComponentMouseScrollerProps.prop_content ,
            value:                     GOG_SetValue<string | ReactiveElement | null>( "") ,
        } ,

    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_Component_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts ,
        ///----------------------
        BORDER: {
            name:                      "part-border"
        } ,
        BORDER_CONTENT: {
            name:                      "part-border-content"
        } ,
        BORDER_CONTENT_VIEW: {
            name:                      "part-border-content-view"
        } ,


        BORDER_CONTENT_SIDEBAR: {
            name:                      "part-border-content-sidebar"
        } ,

        BORDER_CONTENT_SIDEBARTOP: {
            name:                      "part-border-content-sidebarTop"
        } ,

        BORDER_CONTENT_SIDEBARBOTTOM: {
            name:                      "part-border-content-sidebarBottom"
        } ,

        BORDER_CONTENT_POSITIONZOOM: {
            name:                      "part-border-content-positionZoom"
        } ,
        BORDER_CONTENT_POSITIONZOOM_BORDER: {
            name:                      "part-border-content-positionZoom_border"
        } ,
        BORDER_CONTENT_TOOLS: {
            name:                      "part-border-content-tools"
        } ,
        BORDER_CONTENT_TOOLS_CONTENT: {
            name:                      "part-border-content-tools-content"
        } ,

        BORDER_CONTENT_TOOLS_CONTENT_ZOOMING: {
            name:                      "part-border-content-tools-content-zooing"
        } ,
        BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_IN: {
            name:                      "part-border-content-tools-content-zooing-in"
        } ,
        BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_REFRESH: {
            name:                      "part-border-content-tools-content-zooing-back"
        } ,
        BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_OUT: {
            name:                      "part-border-content-tools-content-zooing-out"
        } ,

        BORDER_CONTENT_TOOLS_CONTENT_COLORING: {
            name:                      "part-border-content-tools-content-coloring"
        } ,
        BORDER_CONTENT_TOOLS_CONTENT_COLORING_LIGHT: {
            name:                      "part-border-content-tools-content-coloring-light"
        } ,
        BORDER_CONTENT_TOOLS_CONTENT_COLORING_DARK: {
            name:                      "part-border-content-tools-content-coloring-dark"
        } ,

    } ,
    templates: {

    } ,
    methods: {

    }
} as const


export type ComponentMouseScrollerPropsType =                             GOG_ExtractNameValue<typeof ComponentMouseScrollerConfigs.keys>
export type ComponentMouseScrollerSchemaType =                            GOG_ExtractName<typeof ComponentMouseScrollerConfigs.schemas>
export type ComponentMouseScrollerTemplatesType =                         GOG_ExtractName<typeof ComponentMouseScrollerConfigs.templates>

export type ComponentMouseScrollerMethodsType = {

}




export abstract class ComponentMouseScrollerBase extends ComponentBase<
    ComponentMouseScrollerPropsType ,
    ComponentMouseScrollerSchemaType ,
    ComponentMouseScrollerTemplatesType ,
    ComponentMouseScrollerMethodsType
>{

    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN=  defineComponentPatterns<ComponentMouseScrollerPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Pattern(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this) ,

        ///----------------------
        [ComponentMouseScrollerConfigs.keys.prop_borderBackgroundColor_light.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_borderBackgroundColor_light.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_borderBackgroundColor_light.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_borderBackgroundColor_light.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_borderBackgroundColor_light.description"),
        } ,
        [ComponentMouseScrollerConfigs.keys.prop_borderBackgroundColor_dark.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_borderBackgroundColor_dark.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_borderBackgroundColor_dark.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_borderBackgroundColor_dark.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_borderBackgroundColor_dark.description"),
        } ,
        [ComponentMouseScrollerConfigs.keys.prop_borderWidth.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_borderWidth.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_borderWidth.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_borderWidth.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_borderWidth.description"),
        } ,
        [ComponentMouseScrollerConfigs.keys.prop_borderRadius.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_borderRadius.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_borderRadius.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_borderRadius.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_borderRadius.description"),
        } ,
        [ComponentMouseScrollerConfigs.keys.prop_borderColor.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_borderColor.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_borderColor.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_borderColor.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_borderColor.description"),
        } ,


        [ComponentMouseScrollerConfigs.keys.prop_toolsZoomHas.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_toolsZoomHas.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_toolsZoomHas.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_toolsZoomHas.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_toolsZoomHas.description"),
        } ,
        [ComponentMouseScrollerConfigs.keys.prop_toolsColorModeHas.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_toolsColorModeHas.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_toolsColorModeHas.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_toolsColorModeHas.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_toolsColorModeHas.description"),
        } ,
        [ComponentMouseScrollerConfigs.keys.prop_toolsOpacity.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_toolsOpacity.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_toolsOpacity.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_toolsOpacity.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_toolsOpacity.description"),
        } ,


        [ComponentMouseScrollerConfigs.keys.prop_colorMode.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_colorMode.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_colorMode.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_colorMode.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_colorMode.description"),
        } ,


        [ComponentMouseScrollerConfigs.keys.prop_sideBarsMargin.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_sideBarsMargin.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_sideBarsMargin.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_sideBarsMargin.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_sideBarsMargin.description"),
        } ,


        [ComponentMouseScrollerConfigs.keys.prop_sideBarHas.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_sideBarHas.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_sideBarHas.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_sideBarHas.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_sideBarHas.description"),
        } ,
        [ComponentMouseScrollerConfigs.keys.prop_sideBarWidth.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_sideBarWidth.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_sideBarWidth.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_sideBarWidth.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_sideBarWidth.description"),
        } ,
        [ComponentMouseScrollerConfigs.keys.prop_sideBarBtnOpenHas.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_sideBarBtnOpenHas.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_sideBarBtnOpenHas.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_sideBarBtnOpenHas.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_sideBarBtnOpenHas.description"),
        } ,
        [ComponentMouseScrollerConfigs.keys.prop_sideBarContent.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_sideBarContent.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_sideBarContent.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_sideBarContent.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_sideBarContent.description"),
        } ,


        [ComponentMouseScrollerConfigs.keys.prop_sideBarTopHas.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_sideBarTopHas.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_sideBarTopHas.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_sideBarTopHas.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_sideBarTopHas.description"),
        } ,
        [ComponentMouseScrollerConfigs.keys.prop_sideBarTopWidth.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_sideBarTopWidth.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_sideBarTopWidth.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_sideBarTopWidth.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_sideBarTopWidth.description"),
        } ,
        [ComponentMouseScrollerConfigs.keys.prop_sideBarTopContent.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_sideBarTopContent.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_sideBarTopContent.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_sideBarTopContent.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_sideBarTopContent.description"),
        } ,


        [ComponentMouseScrollerConfigs.keys.prop_sideBarBottomHas.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_sideBarBottomHas.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_sideBarBottomHas.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_sideBarBottomHas.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_sideBarBottomHas.description"),
        } ,
        [ComponentMouseScrollerConfigs.keys.prop_sideBarBottomWidth.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_sideBarBottomWidth.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_sideBarBottomWidth.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_sideBarBottomWidth.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_sideBarBottomWidth.description"),
        } ,
        [ComponentMouseScrollerConfigs.keys.prop_sideBarBottomContent.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_sideBarBottomContent.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_sideBarBottomContent.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_sideBarBottomContent.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_sideBarBottomContent.description"),
        } ,


        [ComponentMouseScrollerConfigs.keys.prop_zoom.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_zoom.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_zoom.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_zoom.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_zoom.description"),
        } ,
        [ComponentMouseScrollerConfigs.keys.prop_zoomMin.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_zoomMin.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_zoomMin.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_zoomMin.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_zoomMin.description"),
        } ,
        [ComponentMouseScrollerConfigs.keys.prop_zoomMax.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_zoomMax.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_zoomMax.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_zoomMax.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_zoomMax.description"),
        } ,
        [ComponentMouseScrollerConfigs.keys.prop_zoomStep.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_zoomStep.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_zoomStep.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_zoomStep.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_zoomStep.description"),
        } ,


        [ComponentMouseScrollerConfigs.keys.prop_scrollLeft.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_scrollLeft.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_scrollLeft.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_scrollLeft.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_scrollLeft.description"),
        } ,
        [ComponentMouseScrollerConfigs.keys.prop_scrollTop.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_scrollTop.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_scrollTop.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_scrollTop.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_scrollTop.description"),
        } ,


        [ComponentMouseScrollerConfigs.keys.prop_content.name]: {
            prop:                                             ComponentMouseScrollerConfigs.keys.prop_content.name,
            default:                                          ComponentMouseScrollerConfigs.keys.prop_content.value,
            title:                                            Language.translate("components.mouse_scroller.prop.prop_content.title"),
            description:                                      Language.translate("components.mouse_scroller.prop.prop_content.description"),
        } ,


    });


    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentMouseScrollerSchemaType , ComponentMouseScrollerPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this) ,
        ///----------------------

        [ComponentMouseScrollerConfigs.schemas.BORDER.name]: {
            part:               ComponentMouseScrollerConfigs.schemas.BORDER.name ,
            title:              Language.translate("components.mouse_scroller.schema.border.title") ,
            description:        Language.translate("components.mouse_scroller.schema.border.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_toolsOpacity.name] ,

                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_colorMode.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_borderBackgroundColor_light.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_borderBackgroundColor_dark.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_borderWidth.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_borderRadius.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_borderColor.name] ,
            ]
        } ,
        [ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT.name]: {
            part:               ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT.name ,
            title:              Language.translate("components.mouse_scroller.schema.border_content.title") ,
            description:        Language.translate("components.mouse_scroller.schema.border_content.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_scrollLeft.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_scrollTop.name] ,
            ]
        } ,
        [ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_VIEW.name]: {
            part:               ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_VIEW.name ,
            title:              Language.translate("components.mouse_scroller.schema.border_content_view.title") ,
            description:        Language.translate("components.mouse_scroller.schema.border_content_view.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_content.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_zoom.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_scrollLeft.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_scrollTop.name] ,
            ]
        } ,

        [ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_SIDEBAR.name]: {
            part:               ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_SIDEBAR.name ,
            title:              Language.translate("components.mouse_scroller.schema.border_content_sidebar.title") ,
            description:        Language.translate("components.mouse_scroller.schema.border_content_sidebar.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_sideBarHas.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_sideBarWidth.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_sideBarBtnOpenHas.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_sideBarContent.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_sideBarsMargin.name] ,

                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_sideBarTopHas.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_sideBarTopWidth.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_sideBarBottomHas.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_sideBarBottomWidth.name] ,
            ]
        } ,

        [ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_SIDEBARTOP.name]: {
            part:               ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_SIDEBARTOP.name ,
            title:              Language.translate("components.mouse_scroller.schema.border_content_sidebarTop.title") ,
            description:        Language.translate("components.mouse_scroller.schema.border_content_sidebarTop.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_sideBarTopHas.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_sideBarTopWidth.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_sideBarTopContent.name] ,
            ]
        } ,

        [ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_SIDEBARBOTTOM.name]: {
            part:               ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_SIDEBARBOTTOM.name ,
            title:              Language.translate("components.mouse_scroller.schema.border_content_sidebarBottom.title") ,
            description:        Language.translate("components.mouse_scroller.schema.border_content_sidebarBottom.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_sideBarBottomHas.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_sideBarBottomWidth.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_sideBarBottomContent.name] ,
            ]
        } ,


        [ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_POSITIONZOOM.name]: {
            part:               ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_POSITIONZOOM.name ,
            title:              Language.translate("components.mouse_scroller.schema.border_content_positionZoom.title") ,
            description:        Language.translate("components.mouse_scroller.schema.border_content_positionZoom.description") ,
            props: [

            ]
        } ,
        [ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_POSITIONZOOM_BORDER.name]: {
            part:               ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_POSITIONZOOM_BORDER.name ,
            title:              Language.translate("components.mouse_scroller.schema.border_content_positionZoom_border.title") ,
            description:        Language.translate("components.mouse_scroller.schema.border_content_positionZoom_border.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_zoom.name] ,
            ]
        } ,

        [ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS.name]: {
            part:               ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS.name ,
            title:              Language.translate("components.mouse_scroller.schema.border_content_tools.title") ,
            description:        Language.translate("components.mouse_scroller.schema.border_content_tools.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_sideBarTopHas.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_sideBarTopWidth.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_sideBarBottomHas.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_sideBarBottomWidth.name] ,
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_sideBarsMargin.name] ,
            ]
        } ,
        [ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT.name]: {
            part:               ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT.name ,
            title:              Language.translate("components.mouse_scroller.schema.border_content_tools_content.title") ,
            description:        Language.translate("components.mouse_scroller.schema.border_content_tools_content.description") ,
            props: [

            ]
        } ,


        [ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING.name]: {
            part:               ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING.name ,
            title:              Language.translate("components.mouse_scroller.schema.border_content_tools_content_zooming.title") ,
            description:        Language.translate("components.mouse_scroller.schema.border_content_tools_content_zooming.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_toolsZoomHas.name] ,
            ]
        } ,
        [ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_IN.name]: {
            part:               ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_IN.name ,
            title:              Language.translate("components.mouse_scroller.schema.border_content_tools_content_zooming_int.title") ,
            description:        Language.translate("components.mouse_scroller.schema.border_content_tools_content_zooming_int.description") ,
            props: [

            ]
        } ,
        [ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_REFRESH.name]: {
            part:               ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_REFRESH.name ,
            title:              Language.translate("components.mouse_scroller.schema.border_content_tools_contentzoom_refresh.title") ,
            description:        Language.translate("components.mouse_scroller.schema.border_content_tools_contentzoom_refresh.description") ,
            props: [

            ]
        } ,
        [ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_OUT.name]: {
            part:               ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_OUT.name ,
            title:              Language.translate("components.mouse_scroller.schema.border_content_tools_content_zooming_out.title") ,
            description:        Language.translate("components.mouse_scroller.schema.border_content_tools_content_zooming_out.description") ,
            props: [

            ]
        } ,


        [ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_COLORING.name]: {
            part:               ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_COLORING.name ,
            title:              Language.translate("components.mouse_scroller.schema.border_content_tools_content_coloring.title") ,
            description:        Language.translate("components.mouse_scroller.schema.border_content_tools_content_coloring.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentMouseScrollerConfigs.keys.prop_toolsColorModeHas.name] ,
            ]
        } ,
        [ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_COLORING_LIGHT.name]: {
            part:               ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_COLORING_LIGHT.name ,
            title:              Language.translate("components.mouse_scroller.schema.border_content_tools_content_coloring_light.title") ,
            description:        Language.translate("components.mouse_scroller.schema.border_content_tools_content_coloring_light.description") ,
            props: [

            ]
        } ,
        [ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_COLORING_DARK.name]: {
            part:               ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_COLORING_DARK.name ,
            title:              Language.translate("components.mouse_scroller.schema.border_content_tools_content_coloring_dark.title") ,
            description:        Language.translate("components.mouse_scroller.schema.border_content_tools_content_coloring_dark.description") ,
            props: [

            ]
        } ,

    })


    /* ---------------------------------------------
           PROPERTYs Pattern
        --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentMouseScrollerTemplatesType , ComponentMouseScrollerPropsType>({

    });


    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentMouseScrollerMethodsType , ComponentMouseScrollerPropsType>({

    });


    /* ---------------------------------------------
       Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        return new ComponentMouseScroller(
            <ComponentMouseScrollerPropsType>{
                classList: ["col-md-6" , "col-12" , "border" , "p-2"]  ,
                styles: {
                    "height" : "500px"
                }  ,

                prop_sideBarHas: true ,
                prop_sidebarBtnOpenHas: false ,
                prop_sideBarContent: "side Test" ,
                prop_sideBarWidth: 120 ,

                prop_sideBarTopHas: true ,
                prop_sideBarTopContent: "Top Test" ,

                prop_sideBarBottomHas: true ,
                prop_sideBarBottomContent: "bottom Test" ,
                //prop_toolsZoomHas: false ,

                prop_content: ReactiveElement.div({
                    styles: {
                        width:  "1500px" ,
                        height: "2500px" ,
                    },
                    className: [
                        "border" , "border-dark"
                    ] ,
                    children: [
                        "asd"
                    ]
                })
            },
            <ComponentMouseScrollerMethodsType>{

            }
        ).getElement();
    }


}

export class ComponentMouseScroller extends ComponentMouseScrollerBase {

    _DEFAULT_OPACITY = new Observable(100);

    _ELEMENT_SCROLLER = null;
    _ELEMENT_CONTAINER = null;


    _START_CLIENT_X = 0;
    _START_CLIENT_Y = 0;
    _SCROLL_LEFT = 0;
    _SCROLL_TOP = 0;

    _SCROLL_IS_DOWN = new Observable(false);
    _POINTER_CAPTURED = false;
    _DRAG_THRESHOLD = 5;


    /* ---------------------------------------------
       SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentMouseScrollerPropsType ,
        methods: ComponentMouseScrollerMethodsType ,
        events = null
    ) {
        super("mouse-scroller" , null);
        super.renderComponent(
            {
                prop_structureStyles: {
                    "height" :                  SizeUnit(100 , UNITS.PERCENT)  ,
                } ,
                ...config
            } ,
            methods , events);
    }


    /* ---------------------------------------------
      TEMPLATEs
     --------------------------------------------- */

    override renderContentComponent() {
        return this.executeSchemaPart(ComponentMouseScrollerConfigs.schemas.BORDER.name)
    }


    override renderManagerComponent(partName , attrsDefault, data , extra) : ReactiveElement {
        switch (partName){
            case ComponentMouseScrollerConfigs.schemas.BORDER.name:
                return  this.template_render_border(attrsDefault , data , extra);

            case ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT.name:
                return  this.template_render_border_content(attrsDefault , data , extra);
            case ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_VIEW.name:
                return  this.template_render_border_content_view(attrsDefault , data , extra);

            case ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_SIDEBAR.name:
                return  this.template_render_border_content_sidebar(attrsDefault , data , extra);

            case ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_SIDEBARTOP.name:
                return  this.template_render_border_content_sidebarTop(attrsDefault , data , extra);

            case ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_SIDEBARBOTTOM.name:
                return  this.template_render_border_content_sidebarBottom(attrsDefault , data , extra);

            case ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_POSITIONZOOM.name:
                return  this.template_render_border_content_positionZoom(attrsDefault , data , extra);
            case ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_POSITIONZOOM_BORDER.name:
                return  this.template_render_border_content_positionZoom_border(attrsDefault , data , extra);

            case ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS.name:
                return  this.template_render_border_content_tools(attrsDefault , data , extra);
            case ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT.name:
                return  this.template_render_border_content_tools_content(attrsDefault , data , extra);

            case ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING.name:
                return  this.template_render_border_content_tools_content_zooming(attrsDefault , data , extra);
            case ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_IN.name:
                return  this.template_render_border_content_tools_content_zooming_in(attrsDefault , data , extra);
            case ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_REFRESH.name:
                return  this.template_render_border_content_tools_content_zooming_refresh(attrsDefault , data , extra);
            case ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_OUT.name:
                return  this.template_render_border_content_tools_content_zooming_out(attrsDefault , data , extra);

            case ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_COLORING.name:
                return  this.template_render_border_content_tools_content_coloring(attrsDefault , data , extra);
            case ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_COLORING_LIGHT.name:
                return  this.template_render_border_content_tools_content_coloring_light(attrsDefault , data , extra);
            case ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_COLORING_DARK.name:
                return  this.template_render_border_content_tools_content_coloring_dark(attrsDefault , data , extra);
        }
    }


    private template_render_border(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_colorMode=                   data[ComponentMouseScrollerConfigs.keys.prop_colorMode.name];
            const prop_borderBackgroundColor_light= data[ComponentMouseScrollerConfigs.keys.prop_borderBackgroundColor_light.name];
            const prop_borderBackgroundColor_dark=  data[ComponentMouseScrollerConfigs.keys.prop_borderBackgroundColor_dark.name];
            const prop_borderWidth=                 data[ComponentMouseScrollerConfigs.keys.prop_borderWidth.name];
            const prop_borderRadius=                data[ComponentMouseScrollerConfigs.keys.prop_borderRadius.name];
            const prop_borderColor=                 data[ComponentMouseScrollerConfigs.keys.prop_borderColor.name];

            const prop_toolsOpacity =               data[ComponentMouseScrollerConfigs.keys.prop_toolsOpacity.name];
            this._DEFAULT_OPACITY = Observable.computed(
                v => v,
                [prop_toolsOpacity]
            );

            return new ToolsComponents.ComponentBorder(
                <ComponentBorderPropsType>{
                    prop_contentSize:             SIZES.S ,
                    classList:                    []  ,
                    styles: {
                        "height" :                  SizeUnit(100 , UNITS.PERCENT)  ,
                        "overflow" :               "hidden" ,

                        "-webkit-user-select":      "none",
                        "-moz-user-select":         "none",
                        "-ms-user-select":          "none",
                        "-ms-overflow-style":       "none",
                        "scrollbar-width":          "none",
                    } ,
                    prop_structureStyles: {
                        "height" :                  SizeUnit(100 , UNITS.PERCENT)  ,
                    } ,
                    prop_borderStyles: {
                        "height" :                  SizeUnit(100 , UNITS.PERCENT)  ,
                    } ,
                    prop_borderClass: ["p-0"] ,

                    prop_content:                  this.executeSchemaPart(ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT.name) ,

                    prop_borderRadius:            prop_borderRadius ,
                    prop_borderWidth:             prop_borderWidth ,
                    prop_borderColor:             prop_borderColor ,

                    prop_contentBackgroundColor:  Observable.computed(( colorMode , borderBackgroundColor_light , borderBackgroundColor_dark) => {
                        switch (colorMode){
                            case ComponentMouseScroller_lightTypes.LIGHT:
                                return borderBackgroundColor_light;
                            case ComponentMouseScroller_lightTypes.DARK:
                                return borderBackgroundColor_dark;
                        }
                    }, [ prop_colorMode , prop_borderBackgroundColor_light , prop_borderBackgroundColor_dark], this.getScope()),
                } ,
                <ComponentBorderMethodsType>{

                } ,
                {
                    mouseenter: function(){
                        this._DEFAULT_OPACITY.set(100)
                    }.bind(this) ,

                    mouseleave: function(){
                        this._DEFAULT_OPACITY.set(this.get("prop_toolsOpacity"))
                    }.bind(this)
                } ,
            ).getReactiveElement();

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_border_content(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {
            //const prop_scrollLeft =   data[ComponentMouseScrollerConfigs.keys.prop_scrollLeft.name] ?? new Observable(0);
            //const prop_scrollTop =    data[ComponentMouseScrollerConfigs.keys.prop_scrollTop.name]  ?? new Observable(0);

            this._ELEMENT_CONTAINER = ReactiveElement.part(
                "section" ,
                {
                    attrs: {
                        ...attrsDefault
                    },
                    className: [
                        "position-relative"
                    ] ,
                    styles: {
                        "height" :                  SizeUnit(100 , UNITS.PERCENT)  ,
                        "overflow" :               "hidden" ,
                        "cursor":                  "all-scroll",
                        "scroll-behavior":         "smooth" ,
                    } ,
                    
                    on: {
                        wheel: function(event){
                            this.fn_scrollerWheel(event);
                        }.bind(this) ,

                        pointerdown: function(event){
                            this.fn_scrollerMouseDown(event);
                        }.bind(this) ,

                        pointermove: function(event){
                            this.fn_scrollerMouseMove(event);
                        }.bind(this) ,

                        pointerup: function(event){
                            this.fn_scrollerMouseUp(event);
                        }.bind(this) ,

                        pointerleave: function(event){
                          //  this.fn_scrollerMouseLeave(event);
                        }.bind(this) ,

                    },
                    children: [
                        ReactiveElement.div({
                            className: [
                                "ms-scroller-hidden"
                            ],
                            styles: {
                                width:    "100%",
                                height:   "100%",
                                overflow: "scroll",
                                "scrollbar-width":   "none",
                                "-ms-overflow-style": "none",
                            },
                            propsBind: {
                                scrollTop:   this._COMPONENT_PROPS_BIND?.[ComponentMouseScrollerConfigs.keys.prop_scrollTop.name]  ?? new Observable(0),
                                scrollLeft:  this._COMPONENT_PROPS_BIND?.[ComponentMouseScrollerConfigs.keys.prop_scrollLeft.name] ?? new Observable(0),
                            } ,
                             children: [
                                 this.executeSchemaPart(ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_VIEW.name) ,
                             ]
                        }),
                        this.executeSchemaPart(ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_SIDEBARTOP.name) ,
                        this.executeSchemaPart(ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_SIDEBARBOTTOM.name) ,
                        this.executeSchemaPart(ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_SIDEBAR.name) ,
                        this.executeSchemaPart(ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS.name) ,
                        this.executeSchemaPart(ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_POSITIONZOOM.name) ,
                    ]
                });

            return this._ELEMENT_CONTAINER;

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_border_content_view(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {
            const prop_content=       data[ComponentMouseScrollerConfigs.keys.prop_content.name];
            const prop_zoom =         data[ComponentMouseScrollerConfigs.keys.prop_zoom.name];

            this._ELEMENT_SCROLLER = ReactiveElement.part(
                "section" ,
                {
                    attrs: {
                        ...attrsDefault,
                    },
                    styles: {
                        width:              "100%" ,
                        height:             "100%" ,
                        zIndex:             "0" ,
                        position:           "relative" ,
                        "transition" :      "transform 500ms" ,
                        "transform-origin": "0 0" ,
                        "overflow":         "unset",
                        "user-select":      "none",
                    },
                    stylesBind: {
                        transform: Observable.computed(( zoomNumber) =>
                            {
                                return `scale(${ zoomNumber })`
                            },
                            [prop_zoom ],
                            this.getScope()
                        ) ,
                    } ,
                    children: [
                        ReactiveElement.div({
                            children: prop_content
                        })

                    ]
                });

            return this._ELEMENT_SCROLLER;
        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_border_content_sidebar(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_sideBarsMargin =             data[ComponentMouseScrollerConfigs.keys.prop_sideBarsMargin.name];
            const prop_sideBarHas =                 data[ComponentMouseScrollerConfigs.keys.prop_sideBarHas.name];
            const prop_sideBarWidth =               data[ComponentMouseScrollerConfigs.keys.prop_sideBarWidth.name];
            const prop_sideBarBtnOpenHas =          data[ComponentMouseScrollerConfigs.keys.prop_sideBarBtnOpenHas.name];
            const prop_sideBarContent =             data[ComponentMouseScrollerConfigs.keys.prop_sideBarContent.name];

            const prop_sideBarTopHas =              data[ComponentMouseScrollerConfigs.keys.prop_sideBarTopHas.name];
            const prop_sideBarTopWidth =            data[ComponentMouseScrollerConfigs.keys.prop_sideBarTopWidth.name];
            const prop_sideBarBottomHas =           data[ComponentMouseScrollerConfigs.keys.prop_sideBarBottomHas.name];
            const prop_sideBarBottomWidth =         data[ComponentMouseScrollerConfigs.keys.prop_sideBarBottomWidth.name];

            return new ToolsComponents.ComponentSidebar(
                <ComponentSideBarPropsType>{
                    classList: []  ,
                    styles: Observable.computed(( sidebarOpacity ,
                                                  sideBarWidth ,
                                                  sideBarTopHas , sideBarTopWidth  ,
                                                  sideBarBottomHas , sideBarBottomWidth ,
                                                  sideBarsMargin) => {
                        let height = [SizeUnit(100 , UNITS.PERCENT)];
                        let top =  [];
                        if (sideBarTopHas){
                            height.push(OPERATION.MINUS);
                            height.push(SizeUnit(sideBarTopWidth ,UNITS.PEXEL ));
                            top.push(SizeUnit(sideBarTopWidth , UNITS.PEXEL));
                        }
                        if (sideBarBottomHas){
                            height.push(OPERATION.MINUS);
                            height.push(SizeUnit(sideBarBottomWidth ,UNITS.PEXEL ));
                        }
                        if (sideBarsMargin){
                            height.push(OPERATION.MINUS);
                            height.push(SizeUnit(2*sideBarsMargin ,UNITS.PEXEL ));
                            top.push(OPERATION.ADD);
                            top.push(SizeUnit(sideBarsMargin , UNITS.PEXEL));
                        }
                        return {
                            "transition" :  "opacity 500ms" ,
                            "opacity":      sidebarOpacity!=null ? SizeUnit(sidebarOpacity , UNITS.PERCENT) : SizeUnit(100 , UNITS.PERCENT) ,
                            "width" :       SizeUnit(sideBarWidth+30 , UNITS.PEXEL),
                            "height" :      SizeCalc(...height) ,
                            "position" :    "absolute" ,
                            "top" :         SizeCalc(...top) ,
                        }
                    }, [
                        this._DEFAULT_OPACITY ,
                        prop_sideBarWidth ,
                        prop_sideBarTopHas , prop_sideBarTopWidth  ,
                        prop_sideBarBottomHas , prop_sideBarBottomWidth ,
                        prop_sideBarsMargin],
                        this.getScope()
                    ),

                    prop_blurHas:                false ,
                    prop_sidebarBtnOpenHas:      prop_sideBarBtnOpenHas ,
                    prop_sidebarIsOpen:          true ,

                    prop_show:   Observable.computed(( sideBarHas , isDown) => {
                        return sideBarHas && !isDown
                    }, [ prop_sideBarHas , this._SCROLL_IS_DOWN], this.getScope()),

                    prop_sidebarDirection: Observable.computed(( dir) => {
                        return dir ?  ComponentSidebar_directionTypes.RTL : ComponentSidebar_directionTypes.LTR
                    }, [ AppConfig.observable("directionRtl")], this.getScope()),

                    prop_sidebarWidth:  Observable.computed(( sideBarWidth) => {
                        return  sideBarWidth || 0;
                    }, [ prop_sideBarWidth ], this.getScope()),

                    prop_sidebarPositionStart:    SizeUnit(0 , UNITS.PEXEL),
                    prop_sidebarPositionEnd:      SizeUnit(0 , UNITS.PEXEL),

                    prop_sidebarBorderRadius:     SIZES.M,
                    prop_sidebarContent:          prop_sideBarContent

                },
                <ComponentSidebarMethodsType>{

                }
            ).getReactiveElement();

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_border_content_sidebarTop(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_sideBarTopHas =              data[ComponentMouseScrollerConfigs.keys.prop_sideBarTopHas.name];
            const prop_sideBarTopWidth =            data[ComponentMouseScrollerConfigs.keys.prop_sideBarTopWidth.name];
            const prop_sideBarTopContent =          data[ComponentMouseScrollerConfigs.keys.prop_sideBarTopContent.name];

            return new ToolsComponents.ComponentSidebar(
                <ComponentSideBarPropsType>{
                    classList: []  ,
                    styles: Observable.computed(
                        ( sidebarOpacity , sideBarTopWidth) => {
                            return {
                                "transition" :  "opacity 500ms" ,
                                "opacity":      sidebarOpacity!=null ? SizeUnit(sidebarOpacity , UNITS.PERCENT) : SizeUnit(100 , UNITS.PERCENT) ,
                                "width" :    SizeUnit(100 , UNITS.PERCENT),
                                "height" :   SizeUnit(sideBarTopWidth , UNITS.PEXEL) ,
                                "position" : "absolute" ,
                                "top" :      "0px"
                            }
                        },
                        [
                            this._DEFAULT_OPACITY ,
                            prop_sideBarTopWidth
                        ], this.getScope()),

                    prop_show:   Observable.computed(( sideBarTopHas , isDown) => {
                        return sideBarTopHas && !isDown
                    }, [ prop_sideBarTopHas ,  this._SCROLL_IS_DOWN], this.getScope()),

                    prop_blurHas:                false ,
                    prop_sidebarBtnOpenHas:      false ,
                    prop_sidebarIsOpen:          true ,

                    prop_sidebarDirection:       ComponentSidebar_directionTypes.TTB ,

                    prop_sidebarWidth:  Observable.computed(( sideBarTopWidth) => {
                        if (sideBarTopWidth){
                            return  SizeUnit(sideBarTopWidth , UNITS.PEXEL);
                        }
                        return  SizeUnit(0 , UNITS.PEXEL);
                    }, [ prop_sideBarTopWidth ], this.getScope()),

                    prop_sidebarPositionStart:    SizeUnit(0 , UNITS.PEXEL),
                    prop_sidebarPositionEnd:      SizeUnit(0 , UNITS.PEXEL),

                    prop_sidebarContent:          prop_sideBarTopContent

                },
                <ComponentSidebarMethodsType>{

                }
            ).getReactiveElement();

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_border_content_sidebarBottom(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_sideBarBottomHas =              data[ComponentMouseScrollerConfigs.keys.prop_sideBarBottomHas.name];
            const prop_sideBarBottomWidth =            data[ComponentMouseScrollerConfigs.keys.prop_sideBarBottomWidth.name];
            const prop_sideBarBottomContent =          data[ComponentMouseScrollerConfigs.keys.prop_sideBarBottomContent.name];

            return new ToolsComponents.ComponentSidebar(
                <ComponentSideBarPropsType>{
                    classList: []  ,
                    styles: Observable.computed(
                        ( sidebarOpacity , sideBarBottomWidth) => {
                            return {
                                "transition" :  "opacity 500ms" ,
                                "opacity":      sidebarOpacity!=null ? SizeUnit(sidebarOpacity , UNITS.PERCENT) : SizeUnit(100 , UNITS.PERCENT) ,
                                "width" :    SizeUnit(100 , UNITS.PERCENT),
                                "height" :   SizeUnit(sideBarBottomWidth , UNITS.PEXEL) ,
                                "position" : "absolute" ,
                                "bottom" :      "0px"
                            }
                        }, [
                            this._DEFAULT_OPACITY ,
                            prop_sideBarBottomWidth
                        ], this.getScope()),

                    prop_show:   Observable.computed(( sideBarBottomHas , isDown) => {
                        return sideBarBottomHas && !isDown
                    }, [ prop_sideBarBottomHas ,  this._SCROLL_IS_DOWN], this.getScope()),

                    prop_blurHas:                false ,
                    prop_sidebarBtnOpenHas:      false ,
                    prop_sidebarIsOpen:          true ,

                    prop_sidebarDirection:       ComponentSidebar_directionTypes.BTT ,

                    prop_sidebarWidth:  Observable.computed(( sideBarBottomWidth) => {
                        if (sideBarBottomWidth){
                            return  SizeUnit(sideBarBottomWidth , UNITS.PEXEL);
                        }
                        return  SizeUnit(0 , UNITS.PEXEL);
                    }, [ prop_sideBarBottomWidth ], this.getScope()),

                    prop_sidebarPositionStart:    SizeUnit(0 , UNITS.PEXEL),
                    prop_sidebarPositionEnd:      SizeUnit(0 , UNITS.PEXEL),

                    prop_sidebarContent:          prop_sideBarBottomContent

                },
                <ComponentSidebarMethodsType>{

                }
            ).getReactiveElement();

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_border_content_positionZoom(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const zoomPositionSide = SizeCalc(
                SizeUnit( 5, UNITS.PEXEL) , OPERATION.ADD ,
                SizeUnit( 40, UNITS.PEXEL) , OPERATION.ADD ,
                SizeUnit( 5, UNITS.PEXEL) ,
            )

            return new ToolsComponents.ComponentElementPosition(
                <ComponentElementPositionPropsType>{

                    prop_positionTop:      SizeUnit( 45, UNITS.PEXEL) ,
                    styles: Observable.computed(( sidebarOpacity ) => {
                            return {
                                "transition" :  "opacity 500ms" ,
                                "opacity":      sidebarOpacity!=null ? SizeUnit(sidebarOpacity , UNITS.PERCENT) : SizeUnit(100 , UNITS.PERCENT) ,
                            }
                        }, [
                            this._DEFAULT_OPACITY ],
                        this.getScope()
                    ),

                    prop_positionLeft: Observable.computed(( dir) => {
                        return dir ? zoomPositionSide : null
                    }, [ AppConfig.observable("directionRtl")], this.getScope()),
                    prop_positionRight: Observable.computed(( dir) => {
                        return dir ? null : zoomPositionSide
                    }, [ AppConfig.observable("directionRtl")], this.getScope()),

                    prop_positionWidth:    SizeUnit( 50, UNITS.PEXEL) ,
                    prop_positionHeight:   SizeUnit( 30, UNITS.PEXEL) ,

                    prop_content:          this.executeSchemaPart(ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_POSITIONZOOM_BORDER.name) ,

                    prop_show:   Observable.computed((  isDown) => {
                        return !isDown
                    }, [ this._SCROLL_IS_DOWN], this.getScope()),

                    prop_positionStyles:   Observable.computed((  toolsOpacity) => {
                        let transition = "opacity 500ms, ";
                        return {
                            transition ,
                            opacity:  toolsOpacity!=null ? SizeUnit(toolsOpacity , UNITS.PERCENT) : SizeUnit(100 , UNITS.PERCENT)
                        }
                    }, [ this._DEFAULT_OPACITY], this.getScope()),

                } ,
                <ComponentElementPositionMethodsType>{

                }
            ).getReactiveElement();

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_border_content_positionZoom_border(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {
            const prop_zoom =              data[ComponentMouseScrollerConfigs.keys.prop_zoom.name];

            return new ToolsComponents.ComponentBorder(
                <ComponentBorderPropsType>{
                    prop_borderClass:                       ["p-0"] ,

                    prop_contentBackgroundColor:   Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) ,

                    prop_content:                   [
                        ReactiveElement.b(
                            {
                                attrs: {
                                    ...attrsDefault
                                },
                                className: [
                                    "text-center" , "d-block" , "text-white"
                                ] ,
                                children: Observable.computed(( zoom) =>
                                    {
                                        return Number((zoom*100).toFixed(0))+ UNITS.PERCENT;
                                    },
                                    [prop_zoom],
                                    this.getScope()
                                ),
                            })
                    ] ,
                } ,
                <ComponentBorderMethodsType>{
                    fn_onClickBorder: function (event, dataArgs : ComponentBorder_Methods_CLICK_BORDER_ComponentArgs, componentArgs: ComponentBorder_Methods_CLICK_BORDER_DataArgs)  {
                        this.pr_setChangeValue(event)
                    }.bind(this) ,
                }
            ).getReactiveElement();

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_border_content_tools(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_sideBarsMargin =             data[ComponentMouseScrollerConfigs.keys.prop_sideBarsMargin.name];

            const prop_sideBarTopHas =              data[ComponentMouseScrollerConfigs.keys.prop_sideBarTopHas.name];
            const prop_sideBarTopWidth =            data[ComponentMouseScrollerConfigs.keys.prop_sideBarTopWidth.name];
            const prop_sideBarBottomHas =           data[ComponentMouseScrollerConfigs.keys.prop_sideBarBottomHas.name];
            const prop_sideBarBottomWidth =         data[ComponentMouseScrollerConfigs.keys.prop_sideBarBottomWidth.name];

            return new ToolsComponents.ComponentSidebar(
                <ComponentSideBarPropsType>{
                    classList: []  ,

                    styles: Observable.computed(  (sidebarOpacity ,
                                                   dir ,
                                                  sideBarTopHas , sideBarTopWidth  ,
                                                  sideBarBottomHas , sideBarBottomWidth ,
                                                  sideBarsMargin) => {
                            let height = [SizeUnit(100 , UNITS.PERCENT)];
                            let top =  [];
                            if (sideBarTopHas){
                                height.push(OPERATION.MINUS);
                                height.push(SizeUnit(sideBarTopWidth ,UNITS.PEXEL ));
                                top.push(SizeUnit(sideBarTopWidth , UNITS.PEXEL));
                            }
                            if (sideBarBottomHas){
                                height.push(OPERATION.MINUS);
                                height.push(SizeUnit(sideBarBottomWidth ,UNITS.PEXEL ));
                            }
                            if (sideBarsMargin){
                                height.push(OPERATION.MINUS);
                                height.push(SizeUnit(2*sideBarsMargin ,UNITS.PEXEL ));
                                top.push(OPERATION.ADD);
                                top.push(SizeUnit(sideBarsMargin , UNITS.PEXEL));
                            }
                            return {
                                "transition" :  "opacity 500ms" ,
                                "opacity":      sidebarOpacity!=null ? SizeUnit(sidebarOpacity , UNITS.PERCENT) : SizeUnit(100 , UNITS.PERCENT) ,
                                "width" :    SizeUnit(40 + 2*sideBarsMargin , UNITS.PEXEL),
                                "height" :   SizeCalc(...height) ,
                                "position" : "absolute" ,
                                "top" :      SizeCalc(...top) ,
                                [ dir ? "left" : "right"]:     "0px"
                            }
                        }, [
                            this._DEFAULT_OPACITY ,
                            AppConfig.observable("directionRtl") ,
                            prop_sideBarTopHas , prop_sideBarTopWidth  ,
                            prop_sideBarBottomHas , prop_sideBarBottomWidth ,
                            prop_sideBarsMargin],
                        this.getScope()
                    ),

                    prop_blurHas:                false ,
                    prop_sidebarBtnOpenHas:      false ,
                    prop_sidebarIsOpen:          true ,
                    prop_show:   Observable.computed(( isDown) => {
                        return !isDown
                    }, [  this._SCROLL_IS_DOWN], this.getScope()),

                    prop_sidebarDirection: Observable.computed(( dir) => {
                        return dir ? ComponentSidebar_directionTypes.LTR : ComponentSidebar_directionTypes.RTL
                    }, [ AppConfig.observable("directionRtl")], this.getScope()),

                    prop_sidebarWidth:           40,

                    prop_sidebarMargin:  Observable.computed(( sideBarsMargin) => {
                        if (sideBarsMargin){
                            return  SizeUnit(sideBarsMargin , UNITS.PEXEL);
                        }
                        return  SizeUnit(0 , UNITS.PEXEL);
                    }, [ prop_sideBarsMargin ], this.getScope()),

                    prop_sidebarPositionStart:   SizeUnit(0 , UNITS.PEXEL),
                    prop_sidebarPositionEnd:   SizeUnit(0 , UNITS.PEXEL),

                    prop_sidebarBorderRadius:     SIZES.M,
                    prop_sidebarContent: [
                        this.executeSchemaPart(ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT.name)
                    ]

                },
                <ComponentSidebarMethodsType>{

                }
            ).getReactiveElement();

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_border_content_tools_content(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            return ReactiveElement.part(
                "section" ,
                {
                    attrs: {
                        ...attrsDefault
                    },
                    className: [
                        "p-1"
                    ] ,
                    on: {

                    },
                    children: [
                        this.executeSchemaPart(ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING.name) ,
                        this.executeSchemaPart(ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_COLORING.name) ,
                    ]
                })

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_border_content_tools_content_zooming(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {
            const prop_toolsZoomHas=             data[ComponentMouseScrollerConfigs.keys.prop_toolsZoomHas.name];

            return ReactiveElement.part(
                "section" ,
                {
                    attrs: {
                        ...attrsDefault
                    },
                    className: [
                        "border-2" , "border-bottom" , "mb-2"
                    ] ,
                    children: Observable.conditionSwitch(
                        prop_toolsZoomHas,
                        {
                            true: () => ReactiveElement.div({
                                children: [
                                    this.executeSchemaPart(ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_IN.name) ,
                                    this.executeSchemaPart(ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_REFRESH.name) ,
                                    this.executeSchemaPart(ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_OUT.name) ,
                                ]
                            }) ,

                            false: () => null
                        },
                        this.getScope()
                    )
                })

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_border_content_tools_content_zooming_in(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            return new ComponentIcon(
                <ComponentIconPropsType>{
                    classList: ["mb-1" , "d-block"] ,
                    styles: {
                        cursor: "pointer"
                    } ,

                    prop_icon: ToolsIcons.icon_zoom_in({size: SIZES.XXL , primaryColor:Color(COLORS_MAIN.SHAN ,COLORS_GRAD.GRADE_1), secondaryColor:Color(COLORS_MAIN.PRIMARY ,COLORS_GRAD.GRADE_4)})
                } ,
                <ComponentIconMethodsType>{
                    fn_onClickIcon: function (event, dataArgs:ComponentIcon_Methods_HOVER_DataArgs, componentArgs : ComponentIcon_Methods_CLICK_ComponentArgs){
                        const scroller = this._ELEMENT_SCROLLER?.getElement();
                        const rect = scroller.getBoundingClientRect();
                        this.fn_scrollerScaleProgress(rect.left , rect.top , -100)
                    }.bind(this) ,
                }
            ).getElement();
        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_border_content_tools_content_zooming_refresh(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {
            return new ComponentIcon(
                <ComponentIconPropsType>{
                    classList: ["mb-1" , "d-block"] ,
                    styles: {
                        cursor: "pointer"
                    } ,

                    prop_icon: ToolsIcons.icon_zoom_refresh({size: SIZES.XXL , primaryColor:Color(COLORS_MAIN.SHAN ,COLORS_GRAD.GRADE_1), secondaryColor:Color(COLORS_MAIN.PRIMARY ,COLORS_GRAD.GRADE_4)})
                } ,
                <ComponentIconMethodsType>{
                    fn_onClickIcon: function (event, dataArgs:ComponentIcon_Methods_HOVER_DataArgs, componentArgs : ComponentIcon_Methods_CLICK_ComponentArgs){
                        const scroller = this._ELEMENT_SCROLLER?.getElement();
                        const rect = scroller.getBoundingClientRect();
                        this.fn_scrollerScaleProgress(rect.left , rect.top)
                    }.bind(this) ,
                }
            ).getElement();
        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_border_content_tools_content_zooming_out(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            return new ComponentIcon(
                <ComponentIconPropsType>{
                    classList: ["mb-1" , "d-block"] ,
                    styles: {
                        cursor: "pointer"
                    } ,

                    prop_icon: ToolsIcons.icon_zoom_out({size: SIZES.XXL , primaryColor:Color(COLORS_MAIN.SHAN ,COLORS_GRAD.GRADE_1), secondaryColor:Color(COLORS_MAIN.PRIMARY ,COLORS_GRAD.GRADE_4)})
                } ,
                <ComponentIconMethodsType>{
                    fn_onClickIcon: function (event, dataArgs:ComponentIcon_Methods_HOVER_DataArgs, componentArgs : ComponentIcon_Methods_CLICK_ComponentArgs){
                        const scroller = this._ELEMENT_SCROLLER?.getElement();
                        const rect = scroller.getBoundingClientRect();
                        this.fn_scrollerScaleProgress(rect.left , rect.top , 100)
                    }.bind(this) ,
                }
            ).getElement();

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_border_content_tools_content_coloring(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {
            const prop_toolsColorModeHas=             data[ComponentMouseScrollerConfigs.keys.prop_toolsColorModeHas.name];

            return ReactiveElement.part(
                "section" ,
                {
                    attrs: {
                        ...attrsDefault
                    },
                    className: [
                        "border-2" , "border-bottom" , "mb-2"
                    ] ,
                    children: Observable.conditionSwitch(
                        prop_toolsColorModeHas,
                        {
                            true: () => ReactiveElement.div({
                                children: [
                                    this.executeSchemaPart(ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_COLORING_LIGHT.name) ,
                                    this.executeSchemaPart(ComponentMouseScrollerConfigs.schemas.BORDER_CONTENT_TOOLS_CONTENT_COLORING_DARK.name) ,
                                ]
                            }) ,

                            false: () => null
                        },
                        this.getScope()
                    )
                })

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_border_content_tools_content_coloring_light(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            return new ComponentIcon(
                <ComponentIconPropsType>{
                    classList: ["mb-1" , "d-block"] ,
                    styles: {
                        cursor: "pointer"
                    } ,

                    prop_icon: ToolsIcons.icon_sun({size: SIZES.XXL , primaryColor:Color(COLORS_MAIN.SHAN ,COLORS_GRAD.GRADE_1), secondaryColor:Color(COLORS_MAIN.PRIMARY ,COLORS_GRAD.GRADE_4)})
                } ,
                <ComponentIconMethodsType>{
                    fn_onClickIcon: function (event, dataArgs:ComponentIcon_Methods_HOVER_DataArgs, componentArgs : ComponentIcon_Methods_CLICK_ComponentArgs){
                        this.set("prop_colorMode" , ComponentMouseScroller_lightTypes.LIGHT)
                    }.bind(this) ,
                }
            ).getElement();

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_border_content_tools_content_coloring_dark(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            return new ComponentIcon(
                <ComponentIconPropsType>{
                    classList: ["mb-1" , "d-block"] ,
                    styles: {
                        cursor: "pointer"
                    } ,

                    prop_icon: ToolsIcons.icon_moon({size: SIZES.XXL , primaryColor:Color(COLORS_MAIN.SHAN ,COLORS_GRAD.GRADE_1), secondaryColor:Color(COLORS_MAIN.PRIMARY ,COLORS_GRAD.GRADE_4)})
                } ,
                <ComponentIconMethodsType>{
                    fn_onClickIcon: function (event, dataArgs:ComponentIcon_Methods_HOVER_DataArgs, componentArgs : ComponentIcon_Methods_CLICK_ComponentArgs){
                        this.set("prop_colorMode" , ComponentMouseScroller_lightTypes.DARK)
                    }.bind(this) ,
                }
            ).getElement();

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }






    private fn_scrollerMouseDown(event){
        this._SCROLL_IS_DOWN.set(true);
        this._POINTER_CAPTURED = false;
        this._START_CLIENT_X = event.clientX;
        this._START_CLIENT_Y = event.clientY;
        this._SCROLL_LEFT = this._COMPONENT_PROPS_BIND[ComponentMouseScrollerConfigs.keys.prop_scrollLeft.name]?.get() ?? 0;
        this._SCROLL_TOP  = this._COMPONENT_PROPS_BIND[ComponentMouseScrollerConfigs.keys.prop_scrollTop.name]?.get() ?? 0;
    }

    private fn_scrollerMouseMove(event){
        if (!this._SCROLL_IS_DOWN.get()) return;
        const dx = event.clientX - this._START_CLIENT_X;
        const dy = event.clientY - this._START_CLIENT_Y;

        if (!this._POINTER_CAPTURED && (Math.abs(dx) > this._DRAG_THRESHOLD || Math.abs(dy) > this._DRAG_THRESHOLD)) {
            this._POINTER_CAPTURED = true;
            const el = this._ELEMENT_CONTAINER?.getElement();
            if (el && event.pointerId != null) {
                try { el.setPointerCapture(event.pointerId); } catch(e) {}
            }
        }

        if (this._POINTER_CAPTURED) {
            this._COMPONENT_PROPS_BIND[ComponentMouseScrollerConfigs.keys.prop_scrollLeft.name]?.set(this._SCROLL_LEFT - dx);
            this._COMPONENT_PROPS_BIND[ComponentMouseScrollerConfigs.keys.prop_scrollTop.name]?.set(this._SCROLL_TOP - dy);
        }
    }

    private fn_scrollerMouseLeave(event){
        this._SCROLL_IS_DOWN.set(false);
    }

    private fn_scrollerMouseUp(event){
        this._SCROLL_IS_DOWN.set(false);

        if (this._POINTER_CAPTURED) {
            this._POINTER_CAPTURED = false;
            const el = this._ELEMENT_CONTAINER?.getElement();
            if (el && event.pointerId != null) {
                try { el.releasePointerCapture(event.pointerId); } catch(e) {}
            }
        }
    }



    private fn_scrollerWheel(event){
        event.preventDefault();
        event.stopPropagation();
        this.fn_scrollerScaleProgress(event.clientX , event.clientY , event.deltaY);
    }

    private fn_scrollerScaleProgress(x , y , zoomStep=null){

        const container = this._ELEMENT_CONTAINER?.getElement();
        const rect = container?.getBoundingClientRect();
        const mouseX = rect ? x - rect.left : 0;
        const mouseY = rect ? y - rect.top : 0;

        this._COMPONENT_PROPS_BIND[ComponentMouseScrollerConfigs.keys.prop_zoom.name].update(
            function(scale, self , {min , max , step , scrollLeft , scrollTop }){
                let newScale = 1;
                if (zoomStep != null){
                    newScale = Math.min(Math.max(scale * Math.pow(step, -zoomStep), min), max);
                    newScale = newScale > min ? newScale : min;
                }

                const scaleRatio = newScale / scale;

                const newScrollLeft = (scrollLeft + mouseX) * scaleRatio - mouseX;
                const newScrollTop  = (scrollTop + mouseY)  * scaleRatio - mouseY;

                this._COMPONENT_PROPS_BIND[ComponentMouseScrollerConfigs.keys.prop_scrollLeft.name]?.set(newScrollLeft);
                this._COMPONENT_PROPS_BIND[ComponentMouseScrollerConfigs.keys.prop_scrollTop.name]?.set(newScrollTop);

                return newScale;
            }.bind(this) ,
            {
                min:        this._COMPONENT_PROPS_BIND?.[ComponentMouseScrollerConfigs.keys.prop_zoomMin.name]    ?? new Observable(0.4)  ,
                max:        this._COMPONENT_PROPS_BIND?.[ComponentMouseScrollerConfigs.keys.prop_zoomMax.name]    ?? new Observable(3.0)  ,
                step:       this._COMPONENT_PROPS_BIND?.[ComponentMouseScrollerConfigs.keys.prop_zoomStep.name]   ?? new Observable(1.0015)  ,
                scrollLeft: this._COMPONENT_PROPS_BIND?.[ComponentMouseScrollerConfigs.keys.prop_scrollLeft.name] ?? new Observable(0) ,
                scrollTop:  this._COMPONENT_PROPS_BIND?.[ComponentMouseScrollerConfigs.keys.prop_scrollTop.name]  ?? new Observable(0) ,
            }
        ) ;
    }



}

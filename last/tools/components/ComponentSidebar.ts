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
import {Observable} from "../../core/Observable";
import {ComponentTabsProps} from "./ComponentTabs";
import {
    ComponentElementPosition, ComponentElementPosition_Methods_CLICK_DataArgs,
    ComponentElementPositionMethodsType,
    ComponentElementPositionPropsType
} from "./ComponentElementPosition";
import {ComponentButton_Types, ComponentButtonMethodsType, ComponentButtonPropsType} from "./ComponentButton";
import {ComponentIconMethodsType, ComponentIconPropsType} from "./ComponentIcon";
import {ToolsIcons} from "../icons";
import {ComponentMessages_Methods_CLOSE_MESSAGE_DataArgs} from "./ComponentMessages";





export const ComponentSidebarProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,

    prop_blurBackground :         "prop_blurBackground" ,
    prop_blurHas :                "prop_blurHas" ,

    prop_sidebarBackground :      "prop_sidebarBackground" ,
    prop_sidebarBorderRadius :    "prop_sidebarBorderRadius" ,
    prop_sidebarWidth :           "prop_sidebarWidth" ,
    prop_sidebarDirection :       "prop_sidebarDirection" ,
    prop_sidebarIsOpen :          "prop_sidebarIsOpen" ,
    prop_sidebarDuration :        "prop_sidebarDuration" ,
    prop_sidebarContent :         "prop_sidebarContent" ,
    prop_sidebarPositionStart :   "prop_sidebarPositionStart" ,
    prop_sidebarPositionEnd :     "prop_sidebarPositionEnd" ,
    prop_sidebarMargin :          "prop_sidebarMargin" ,
    prop_sidebarOpacity :         "prop_sidebarOpacity" ,

    prop_sidebarBtnOpenHas :      "prop_sidebarBtnOpenHas" ,
    prop_sidebarBtnOpenSize :     "prop_sidebarBtnOpenSize" ,
    prop_sidebarBtnColor :        "prop_sidebarBtnColor" ,
} as const;



export type propSidebarType = {
    id:               string|number;
    title?:           Observable<string>| string| null;
    icon?:            IconsType |null;
};

export enum ComponentSidebar_directionTypes{
    RTL=       "right_to_left",
    LTR=       "left_to_right",
    TTB=       "top_to_buttom",
    BTT=       "bottom_to_top",
}


const ComponentSidebarConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys ,
        ///----------------------


        [ComponentSidebarProps.prop_blurBackground]: {
            name:                      ComponentSidebarProps.prop_blurBackground ,
            value:                     GOG_SetValue<Color | null>( Color(COLORS_MAIN.SHADOW , COLORS_GRAD.GRADE_4)),
        } ,
        [ComponentSidebarProps.prop_blurHas]: {
            name:                      ComponentSidebarProps.prop_blurHas ,
            value:                     GOG_SetValue<boolean>(true),
        } ,


        [ComponentSidebarProps.prop_sidebarBackground]: {
            name:                      ComponentSidebarProps.prop_sidebarBackground ,
            value:                     GOG_SetValue<Color | null>( Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1)),
        } ,
        [ComponentSidebarProps.prop_sidebarBorderRadius]: {
            name:                      ComponentSidebarProps.prop_sidebarBorderRadius ,
            value:                     GOG_SetValue<GOG_ValueOf<typeof SIZES | null> | number>(null),
        } ,
        [ComponentSidebarProps.prop_sidebarWidth]: {
            name:                      ComponentSidebarProps.prop_sidebarWidth ,
            value:                     GOG_SetValue<number|null>(120),
        } ,
        [ComponentSidebarProps.prop_sidebarDirection]: {
            name:                      ComponentSidebarProps.prop_sidebarDirection ,
            value:                    GOG_SetValue<GOG_ValueOf<typeof ComponentSidebar_directionTypes>>(ComponentSidebar_directionTypes.LTR),
        } ,
        [ComponentSidebarProps.prop_sidebarIsOpen]: {
            name:                      ComponentSidebarProps.prop_sidebarIsOpen ,
            value:                     GOG_SetValue<boolean>(true),
        } ,
        [ComponentSidebarProps.prop_sidebarDuration]: {
            name:                      ComponentSidebarProps.prop_sidebarDuration ,
            value:                     GOG_SetValue<number>(500),
        } ,
        [ComponentSidebarProps.prop_sidebarContent]: {
            name:                      ComponentSidebarProps.prop_sidebarContent ,
            value:                     GOG_SetValue<string | ReactiveElement | null>( "") ,
        } ,
        [ComponentSidebarProps.prop_sidebarPositionStart]: {
            name:                      ComponentSidebarProps.prop_sidebarPositionStart ,
            value:                     GOG_SetValue<GOG_ValueOf<typeof SIZES | null> | number>(null),
        } ,
        [ComponentSidebarProps.prop_sidebarPositionEnd]: {
            name:                      ComponentSidebarProps.prop_sidebarPositionEnd ,
            value:                     GOG_SetValue<GOG_ValueOf<typeof SIZES | null> | number>(null),
        } ,
        [ComponentSidebarProps.prop_sidebarMargin]: {
            name:                      ComponentSidebarProps.prop_sidebarMargin ,
            value:                      GOG_SetValue<SizeUnit | SizeCalc | null>( null),
        } ,
        [ComponentSidebarProps.prop_sidebarOpacity]: {
            name:                      ComponentSidebarProps.prop_sidebarOpacity ,
            value:                      GOG_SetValue<Number | null>( null),
        } ,


        [ComponentSidebarProps.prop_sidebarBtnOpenHas]: {
            name:                      ComponentSidebarProps.prop_sidebarBtnOpenHas ,
            value:                     GOG_SetValue<boolean>(true),
        } ,
        [ComponentSidebarProps.prop_sidebarBtnOpenSize]: {
            name:                      ComponentSidebarProps.prop_sidebarBtnOpenSize ,
            value:                     GOG_SetValue<number |null>( 25 ),
        } ,
        [ComponentSidebarProps.prop_sidebarBtnColor]: {
            name:                      ComponentSidebarProps.prop_sidebarBtnColor ,
            value:                     GOG_SetValue<Color | null>( Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1)),
        } ,

    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_Component_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts ,
        ///----------------------
        CONTENT: {
            name:                      "part-content"
        } ,
        CONTENT_BLUR: {
            name:                      "part-content-blur"
        } ,
        CONTENT_SIDEBAR: {
            name:                      "part-content-sidebar"
        } ,
        CONTENT_SIDEBAR_CONTENT: {
            name:                      "part-content-sidebar-content"
        } ,
        CONTENT_SIDEBAR_CONTENT_POSITION: {
            name:                      "part-content-sidebar-content-position"
        } ,
        CONTENT_SIDEBAR_CONTENT_POSITION_BUTTON: {
            name:                      "part-content-sidebar-content-position-button"
        } ,
        CONTENT_SIDEBAR_CONTENT_POSITION_BUTTON_ICON: {
            name:                      "part-content-sidebar-content-position-button-icon"
        } ,
    } ,
    templates: {

    } ,
    methods: {

    }
} as const


export type ComponentSideBarPropsType =                             GOG_ExtractNameValue<typeof ComponentSidebarConfigs.keys>
export type ComponentSideBarSchemaType =                            GOG_ExtractName<typeof ComponentSidebarConfigs.schemas>
export type ComponentSideBarTemplatesType =                         GOG_ExtractName<typeof ComponentSidebarConfigs.templates>

export type ComponentSidebarMethodsType = {

}


export abstract class ComponentSidebarBase extends ComponentBase<
    ComponentSideBarPropsType ,
    ComponentSideBarSchemaType ,
    ComponentSideBarTemplatesType ,
    ComponentSidebarMethodsType
>{

    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN=  defineComponentPatterns<ComponentSideBarPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Pattern(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this) ,

        ///----------------------
        [ComponentSidebarConfigs.keys.prop_blurBackground.name]: {
            prop:                                             ComponentSidebarConfigs.keys.prop_blurBackground.name,
            default:                                          ComponentSidebarConfigs.keys.prop_blurBackground.value,
            title:                                            Language.translate("components.sidebar.prop.prop_blurBackground.title"),
            description:                                      Language.translate("components.sidebar.prop.prop_blurBackground.description"),
        } ,
        [ComponentSidebarConfigs.keys.prop_blurHas.name]: {
            prop:                                             ComponentSidebarConfigs.keys.prop_blurHas.name,
            default:                                          ComponentSidebarConfigs.keys.prop_blurHas.value,
            title:                                            Language.translate("components.sidebar.prop.prop_blurHas.title"),
            description:                                      Language.translate("components.sidebar.prop.prop_blurHas.description"),
        } ,


        [ComponentSidebarConfigs.keys.prop_sidebarBackground.name]: {
            prop:                                             ComponentSidebarConfigs.keys.prop_sidebarBackground.name,
            default:                                          ComponentSidebarConfigs.keys.prop_sidebarBackground.value,
            title:                                            Language.translate("components.sidebar.prop.prop_sidebarBackground.title"),
            description:                                      Language.translate("components.sidebar.prop.prop_sidebarBackground.description"),
        } ,
        [ComponentSidebarConfigs.keys.prop_sidebarBorderRadius.name]: {
            prop:                                             ComponentSidebarConfigs.keys.prop_sidebarBorderRadius.name,
            default:                                          ComponentSidebarConfigs.keys.prop_sidebarBorderRadius.value,
            title:                                            Language.translate("components.sidebar.prop.prop_sidebarBorderRadius.title"),
            description:                                      Language.translate("components.sidebar.prop.prop_sidebarBorderRadius.description"),
        } ,
        [ComponentSidebarConfigs.keys.prop_sidebarWidth.name]: {
            prop:                                             ComponentSidebarConfigs.keys.prop_sidebarWidth.name,
            default:                                          ComponentSidebarConfigs.keys.prop_sidebarWidth.value,
            title:                                            Language.translate("components.sidebar.prop.prop_sidebarWidth.title"),
            description:                                      Language.translate("components.sidebar.prop.prop_sidebarWidth.description"),
        } ,
        [ComponentSidebarConfigs.keys.prop_sidebarDirection.name]: {
            prop:                                             ComponentSidebarConfigs.keys.prop_sidebarDirection.name,
            default:                                          ComponentSidebarConfigs.keys.prop_sidebarDirection.value,
            title:                                            Language.translate("components.sidebar.prop.prop_sidebarDirection.title"),
            description:                                      Language.translate("components.sidebar.prop.prop_sidebarDirection.description"),
        } ,
        [ComponentSidebarConfigs.keys.prop_sidebarIsOpen.name]: {
            prop:                                             ComponentSidebarConfigs.keys.prop_sidebarIsOpen.name,
            default:                                          ComponentSidebarConfigs.keys.prop_sidebarIsOpen.value,
            title:                                            Language.translate("components.sidebar.prop.prop_sidebarIsOpen.title"),
            description:                                      Language.translate("components.sidebar.prop.prop_sidebarIsOpen.description"),
        } ,
        [ComponentSidebarConfigs.keys.prop_sidebarDuration.name]: {
            prop:                                             ComponentSidebarConfigs.keys.prop_sidebarDuration.name,
            default:                                          ComponentSidebarConfigs.keys.prop_sidebarDuration.value,
            title:                                            Language.translate("components.sidebar.prop.prop_sidebarDuration.title"),
            description:                                      Language.translate("components.sidebar.prop.prop_sidebarDuration.description"),
        } ,
        [ComponentSidebarConfigs.keys.prop_sidebarContent.name]: {
            prop:                                             ComponentSidebarConfigs.keys.prop_sidebarContent.name,
            default:                                          ComponentSidebarConfigs.keys.prop_sidebarContent.value,
            title:                                            Language.translate("components.sidebar.prop.prop_sidebarContent.title"),
            description:                                      Language.translate("components.sidebar.prop.prop_sidebarContent.description"),
        } ,
        [ComponentSidebarConfigs.keys.prop_sidebarPositionStart.name]: {
            prop:                                             ComponentSidebarConfigs.keys.prop_sidebarPositionStart.name,
            default:                                          ComponentSidebarConfigs.keys.prop_sidebarPositionStart.value,
            title:                                            Language.translate("components.sidebar.prop.prop_sidebarPositionStart.title"),
            description:                                      Language.translate("components.sidebar.prop.prop_sidebarPositionStart.description"),
        } ,
        [ComponentSidebarConfigs.keys.prop_sidebarPositionEnd.name]: {
            prop:                                             ComponentSidebarConfigs.keys.prop_sidebarPositionEnd.name,
            default:                                          ComponentSidebarConfigs.keys.prop_sidebarPositionEnd.value,
            title:                                            Language.translate("components.sidebar.prop.prop_sidebarPositionEnd.title"),
            description:                                      Language.translate("components.sidebar.prop.prop_sidebarPositionEnd.description"),
        } ,
        [ComponentSidebarConfigs.keys.prop_sidebarMargin.name]: {
            prop:                                             ComponentSidebarConfigs.keys.prop_sidebarMargin.name,
            default:                                          ComponentSidebarConfigs.keys.prop_sidebarMargin.value,
            title:                                            Language.translate("components.sidebar.prop.prop_sidebarMargin.title"),
            description:                                      Language.translate("components.sidebar.prop.prop_sidebarMargin.description"),
        } ,
        [ComponentSidebarConfigs.keys.prop_sidebarOpacity.name]: {
            prop:                                             ComponentSidebarConfigs.keys.prop_sidebarOpacity.name,
            default:                                          ComponentSidebarConfigs.keys.prop_sidebarOpacity.value,
            title:                                            Language.translate("components.sidebar.prop.prop_sidebarOpacity.title"),
            description:                                      Language.translate("components.sidebar.prop.prop_sidebarOpacity.description"),
        } ,


        [ComponentSidebarConfigs.keys.prop_sidebarBtnOpenHas.name]: {
            prop:                                             ComponentSidebarConfigs.keys.prop_sidebarBtnOpenHas.name,
            default:                                          ComponentSidebarConfigs.keys.prop_sidebarBtnOpenHas.value,
            title:                                            Language.translate("components.sidebar.prop.prop_sidebarBtnOpenHas.title"),
            description:                                      Language.translate("components.sidebar.prop.prop_sidebarBtnOpenHas.description"),
        } ,
        [ComponentSidebarConfigs.keys.prop_sidebarBtnOpenSize.name]: {
            prop:                                             ComponentSidebarConfigs.keys.prop_sidebarBtnOpenSize.name,
            default:                                          ComponentSidebarConfigs.keys.prop_sidebarBtnOpenSize.value,
            title:                                            Language.translate("components.sidebar.prop.prop_sidebarBtnOpenSize.title"),
            description:                                      Language.translate("components.sidebar.prop.prop_sidebarBtnOpenSize.description"),
        } ,
        [ComponentSidebarConfigs.keys.prop_sidebarBtnColor.name]: {
            prop:                                             ComponentSidebarConfigs.keys.prop_sidebarBtnColor.name,
            default:                                          ComponentSidebarConfigs.keys.prop_sidebarBtnColor.value,
            title:                                            Language.translate("components.sidebar.prop.prop_sidebarBtnColor.title"),
            description:                                      Language.translate("components.sidebar.prop.prop_sidebarBtnColor.description"),
        } ,
    });


    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentSideBarSchemaType , ComponentSideBarPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this) ,
        ///----------------------

        [ComponentSidebarConfigs.schemas.CONTENT.name]: {
            part:               ComponentSidebarConfigs.schemas.CONTENT.name ,
            title:              Language.translate("components.sidebar.schema.content.title") ,
            description:        Language.translate("components.sidebar.schema.content.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_sidebarDirection.name] ,
            ]
        } ,
        [ComponentSidebarConfigs.schemas.CONTENT_BLUR.name]: {
            part:               ComponentSidebarConfigs.schemas.CONTENT_BLUR.name ,
            title:              Language.translate("components.sidebar.schema.content_blur.title") ,
            description:        Language.translate("components.sidebar.schema.content_blur.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_blurBackground.name] ,
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_blurHas.name] ,
            ]
        } ,
        [ComponentSidebarConfigs.schemas.CONTENT_SIDEBAR.name]: {
            part:               ComponentSidebarConfigs.schemas.CONTENT_SIDEBAR.name ,
            title:              Language.translate("components.sidebar.schema.content_sidebar.title") ,
            description:        Language.translate("components.sidebar.schema.content_sidebar.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_sidebarBackground.name] ,
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_sidebarBorderRadius.name] ,
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_sidebarWidth.name] ,
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_sidebarIsOpen.name] ,
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_sidebarDirection.name] ,
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_sidebarDuration.name] ,
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_sidebarPositionStart.name] ,
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_sidebarPositionEnd.name] ,
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_sidebarMargin.name] ,
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_sidebarOpacity.name] ,
            ]
        } ,
        [ComponentSidebarConfigs.schemas.CONTENT_SIDEBAR_CONTENT.name]: {
            part:               ComponentSidebarConfigs.schemas.CONTENT_SIDEBAR_CONTENT.name ,
            title:              Language.translate("components.sidebar.schema.content_sidebar_content.title") ,
            description:        Language.translate("components.sidebar.schema.content_sidebar_content.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_sidebarBtnOpenHas.name] ,
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_sidebarContent.name] ,
            ]
        } ,
        [ComponentSidebarConfigs.schemas.CONTENT_SIDEBAR_CONTENT_POSITION.name]: {
            part:               ComponentSidebarConfigs.schemas.CONTENT_SIDEBAR_CONTENT_POSITION.name ,
            title:              Language.translate("components.sidebar.schema.content_sidebar_content_position.title") ,
            description:        Language.translate("components.sidebar.schema.content_sidebar_content_position.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_sidebarBtnOpenSize.name] ,
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_sidebarDirection.name] ,
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_sidebarIsOpen.name] ,
            ]
        } ,
        [ComponentSidebarConfigs.schemas.CONTENT_SIDEBAR_CONTENT_POSITION_BUTTON.name]: {
            part:               ComponentSidebarConfigs.schemas.CONTENT_SIDEBAR_CONTENT_POSITION_BUTTON.name ,
            title:              Language.translate("components.sidebar.schema.content_sidebar_content_position_button.title") ,
            description:        Language.translate("components.sidebar.schema.content_sidebar_content_position_button.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_sidebarBtnOpenSize.name] ,
            ]
        } ,
        [ComponentSidebarConfigs.schemas.CONTENT_SIDEBAR_CONTENT_POSITION_BUTTON_ICON.name]: {
            part:               ComponentSidebarConfigs.schemas.CONTENT_SIDEBAR_CONTENT_POSITION_BUTTON_ICON.name ,
            title:              Language.translate("components.sidebar.schema.content_sidebar_content_position_button_icon.title") ,
            description:        Language.translate("components.sidebar.schema.content_sidebar_content_position_button.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_sidebarBtnOpenSize.name] ,
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_sidebarIsOpen.name] ,
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_sidebarBtnColor.name] ,
                this._COMPONENT_PATTERN[ComponentSidebarConfigs.keys.prop_sidebarDirection.name] ,
            ]
        } ,
    })



    /* ---------------------------------------------
           PROPERTYs Pattern
        --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentSideBarTemplatesType , ComponentSideBarPropsType>({

    });




    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentSidebarMethodsType , ComponentSideBarPropsType>({

    });



    /* ---------------------------------------------
       Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        return new ComponentSidebar(
            <ComponentSideBarPropsType>{
                classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                styles: {
                    "height" : "250px"
                }  ,

                prop_blurHas:                true ,
                prop_sidebarDirection:       ComponentSidebar_directionTypes.RTL ,
                prop_sidebarIsOpen:          true ,
                prop_sidebarPositionStart:   SizeUnit(40 , UNITS.PEXEL),
                prop_sidebarPositionEnd:     SizeUnit(30 , UNITS.PEXEL),
               // prop_sidebarMargin:          SizeUnit(10 , UNITS.PEXEL),
                prop_sidebarOpacity:         40,
                prop_sidebarBorderRadius:    SIZES.M,
                prop_sidebarContent: [
                    ReactiveElement.section({
                        className:[
                            "border-bottom" , "border-white" , "px-2" , "text-white"
                        ] ,
                        children: [
                            "item1"
                        ]
                    }) ,
                    ReactiveElement.section({
                        className:[
                            "border-bottom" , "border-white" , "px-2" , "text-white"
                        ] ,
                        children: [
                            "item2"
                        ]
                    })
                ]

            },
            <ComponentSidebarMethodsType>{

            }
        ).getElement();
    }


}

export class ComponentSidebar extends ComponentSidebarBase{

    _DEFAULT_OPACITY = null;

    /* ---------------------------------------------
       SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentSideBarPropsType ,
        methods: ComponentSidebarMethodsType ,
        events = null
    ) {
        super("sidebar" , null);
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
        return this.executeSchemaPart(ComponentSidebarConfigs.schemas.CONTENT.name)
    }

    override renderManagerComponent(partName , attrsDefault, data , extra) : ReactiveElement {
        switch (partName){
            case ComponentSidebarConfigs.schemas.CONTENT.name:
                return  this.template_render_content(attrsDefault , data , extra);
            case ComponentSidebarConfigs.schemas.CONTENT_BLUR.name:
                return  this.template_render_content_blur(attrsDefault , data , extra);
            case ComponentSidebarConfigs.schemas.CONTENT_SIDEBAR.name:
                return  this.template_render_content_sidebar(attrsDefault , data , extra);
            case ComponentSidebarConfigs.schemas.CONTENT_SIDEBAR_CONTENT.name:
                return  this.template_render_content_sidebar_content(attrsDefault , data , extra);
            case ComponentSidebarConfigs.schemas.CONTENT_SIDEBAR_CONTENT_POSITION.name:
                return  this.template_render_content_sidebar_content_position(attrsDefault , data , extra);
            case ComponentSidebarConfigs.schemas.CONTENT_SIDEBAR_CONTENT_POSITION_BUTTON.name:
                return  this.template_render_content_sidebar_content_position_button(attrsDefault , data , extra);
            case ComponentSidebarConfigs.schemas.CONTENT_SIDEBAR_CONTENT_POSITION_BUTTON_ICON.name:
                return  this.template_render_content_sidebar_content_position_button_icon(attrsDefault , data , extra);
        }
    }


    private template_render_content(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_sidebarDirection=       data[ComponentSidebarConfigs.keys.prop_sidebarDirection.name];

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                styles: {
                    "height" :                  SizeUnit(100 , UNITS.PERCENT)  ,
                    "overflow" : "hidden"
                } ,
                stylesBind: {
                    direction:             Observable.computed(( sidebarDirection) => {
                        if (sidebarDirection == ComponentSidebar_directionTypes.RTL){
                            return "rtl"
                        }
                        if (sidebarDirection == ComponentSidebar_directionTypes.LTR){
                            return "ltr"
                        }
                        return null;
                    }, [ prop_sidebarDirection], this.getScope()),
                } ,
                className: [
                    "position-relative" ,
                ] ,
                children: [
                    this.executeSchemaPart(ComponentSidebarConfigs.schemas.CONTENT_BLUR.name) ,
                    this.executeSchemaPart(ComponentSidebarConfigs.schemas.CONTENT_SIDEBAR.name) ,
                ] ,
                on:{
                    mouseenter: function(){
                        this._DEFAULT_OPACITY.set(100)
                    }.bind(this) ,
                    mouseleave: function(){
                        this._DEFAULT_OPACITY.set(this.get("prop_sidebarOpacity"))
                    }.bind(this)
                }
            });

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_content_blur(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_blurBackground=    data[ComponentSidebarConfigs.keys.prop_blurBackground.name];
            const prop_blurHas=           data[ComponentSidebarConfigs.keys.prop_blurHas.name];

            return Observable.computed(( blurHas) => {
                if (blurHas){
                    return new ToolsComponents.ComponentElementPosition(
                        <ComponentElementPositionPropsType>{
                            styles: {
                                "position" :                "absolute"  ,
                                "width" :                   SizeUnit(100 , UNITS.PERCENT)  ,
                                "height" :                  SizeUnit(100 , UNITS.PERCENT)  ,
                            } ,
                            prop_structureStyles: {
                                "height" :                  SizeUnit(100 , UNITS.PERCENT)  ,
                            } ,

                            prop_positionTop:               SizeUnit(0 , UNITS.PEXEL) ,
                            prop_positionLeft:              SizeUnit(0 , UNITS.PEXEL) ,
                            prop_positionZIndex:            ToolsCss.getZIndex(Z_INDEXES.blur_popup) ,
                            prop_positionWidth:             SizeUnit(100 , UNITS.PERCENT)  ,
                            prop_positionHeight:            SizeUnit(100 , UNITS.PERCENT)  ,
                            prop_positionBackgroundColor:   prop_blurBackground ,
                        } ,
                        <ComponentElementPositionMethodsType>{

                        }
                    ).getReactiveElement()
                }
            }, [ prop_blurHas], this.getScope())


        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_content_sidebar(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_sidebarBackground=      data[ComponentSidebarConfigs.keys.prop_sidebarBackground.name];
            const prop_sidebarBorderRadius=    data[ComponentSidebarConfigs.keys.prop_sidebarBorderRadius.name];
            const prop_sidebarWidth=           data[ComponentSidebarConfigs.keys.prop_sidebarWidth.name];
            const prop_sidebarIsOpen=          data[ComponentSidebarConfigs.keys.prop_sidebarIsOpen.name];
            const prop_sidebarDirection=       data[ComponentSidebarConfigs.keys.prop_sidebarDirection.name];
            const prop_sidebarDuration=        data[ComponentSidebarConfigs.keys.prop_sidebarDuration.name];
            const prop_sidebarPositionStart=   data[ComponentSidebarConfigs.keys.prop_sidebarPositionStart.name];
            const prop_sidebarPositionEnd=     data[ComponentSidebarConfigs.keys.prop_sidebarPositionEnd.name];
            const prop_sidebarMargin=          data[ComponentSidebarConfigs.keys.prop_sidebarMargin.name];
            const prop_sidebarOpacity =        data[ComponentSidebarConfigs.keys.prop_sidebarOpacity.name];

            this._DEFAULT_OPACITY = Observable.computed(
                v => v,
                [prop_sidebarOpacity]
            );

            return new ToolsComponents.ComponentElementPosition(
                <ComponentElementPositionPropsType>{
                    prop_positionZIndex:            ToolsCss.getZIndex(Z_INDEXES.popup) ,
                    prop_positionBackgroundColor:   prop_sidebarBackground ,
                    prop_content:                   this.executeSchemaPart(ComponentSidebarConfigs.schemas.CONTENT_SIDEBAR_CONTENT.name) ,

                    prop_positionStyles: Observable.computed(( sidebarDirection, sidebarDuration, sidebarBorderRadius , sidebarMargin, sidebarOpacity) => {
                        let transition = "opacity 500ms, ";
                        let borderHeight = null;
                        let borderTopLeftRadius = null;
                        let borderTopRightRadius = null;
                        let borderBottomLeftRadius = null;
                        let borderBottomRightRadius = null;

                        if (sidebarMargin != null){
                            if (typeof sidebarBorderRadius == "string" && ToolsCss.checkExistSizeSelected(sidebarBorderRadius)){
                                borderTopLeftRadius =      ToolsComponents_BorderRadius[sidebarBorderRadius];
                                borderTopRightRadius =     ToolsComponents_BorderRadius[sidebarBorderRadius];
                                borderBottomLeftRadius =   ToolsComponents_BorderRadius[sidebarBorderRadius];
                                borderBottomRightRadius =  ToolsComponents_BorderRadius[sidebarBorderRadius];
                            }
                            else if (typeof sidebarBorderRadius == "number"){
                                borderTopLeftRadius =      sidebarBorderRadius + "px";
                                borderTopRightRadius =     sidebarBorderRadius + "px";
                                borderBottomLeftRadius =   sidebarBorderRadius + "px";
                                borderBottomRightRadius =  sidebarBorderRadius + "px";
                            }
                        }
                        else {
                            switch (sidebarDirection){
                                case ComponentSidebar_directionTypes.LTR:
                                    if (typeof sidebarBorderRadius == "string" && ToolsCss.checkExistSizeSelected(sidebarBorderRadius)){
                                        borderTopRightRadius = ToolsComponents_BorderRadius[sidebarBorderRadius];
                                        borderBottomRightRadius = ToolsComponents_BorderRadius[sidebarBorderRadius];
                                    }
                                    else if (typeof sidebarBorderRadius == "number"){
                                        borderTopRightRadius = sidebarBorderRadius + "px";
                                        borderBottomRightRadius = sidebarBorderRadius + "px";
                                    }
                                    break;
                                case ComponentSidebar_directionTypes.TTB:
                                    if (typeof sidebarBorderRadius == "string" && ToolsCss.checkExistSizeSelected(sidebarBorderRadius)){
                                        borderBottomRightRadius = ToolsComponents_BorderRadius[sidebarBorderRadius];
                                        borderBottomLeftRadius = ToolsComponents_BorderRadius[sidebarBorderRadius];
                                    }
                                    else if (typeof sidebarBorderRadius == "number"){
                                        borderBottomRightRadius = sidebarBorderRadius + "px";
                                        borderBottomLeftRadius = sidebarBorderRadius + "px";
                                    }
                                    break;
                                case ComponentSidebar_directionTypes.RTL:
                                    if (typeof sidebarBorderRadius == "string" && ToolsCss.checkExistSizeSelected(sidebarBorderRadius)){
                                        borderTopLeftRadius = ToolsComponents_BorderRadius[sidebarBorderRadius];
                                        borderBottomLeftRadius = ToolsComponents_BorderRadius[sidebarBorderRadius];
                                    }
                                    else if (typeof sidebarBorderRadius == "number"){
                                        borderTopLeftRadius = sidebarBorderRadius + "px";
                                        borderBottomLeftRadius = sidebarBorderRadius + "px";
                                    }
                                    break;
                                case ComponentSidebar_directionTypes.BTT:
                                    if (typeof sidebarBorderRadius == "string" && ToolsCss.checkExistSizeSelected(sidebarBorderRadius)){
                                        borderTopLeftRadius = ToolsComponents_BorderRadius[sidebarBorderRadius];
                                        borderTopRightRadius = ToolsComponents_BorderRadius[sidebarBorderRadius];
                                    }
                                    else if (typeof sidebarBorderRadius == "number"){
                                        borderTopLeftRadius = sidebarBorderRadius + "px";
                                        borderTopRightRadius = sidebarBorderRadius + "px";
                                    }
                                    break;
                            }
                        }

                        if (sidebarDirection == ComponentSidebar_directionTypes.LTR){
                            transition += `left ${sidebarDuration}ms `;
                        }
                        if (sidebarDirection == ComponentSidebar_directionTypes.TTB){
                            transition += `top ${sidebarDuration}ms `;
                            borderHeight =  SizeUnit(100 , UNITS.PERCENT) ;
                        }
                        if (sidebarDirection == ComponentSidebar_directionTypes.RTL){
                            transition += `right ${sidebarDuration}ms `;
                        }
                        if (sidebarDirection == ComponentSidebar_directionTypes.BTT){
                            transition += `bottom ${sidebarDuration}ms `;
                            borderHeight =  SizeUnit(100 , UNITS.PERCENT) ;
                        }


                        return {
                            transition ,
                            borderTopRightRadius , borderTopLeftRadius ,
                            borderBottomRightRadius , borderBottomLeftRadius ,
                            opacity:   sidebarOpacity!=null ? SizeUnit(sidebarOpacity , UNITS.PERCENT) : SizeUnit(100 , UNITS.PERCENT) ,
                            height: borderHeight ,
                        }
                    }, [ prop_sidebarDirection , prop_sidebarDuration , prop_sidebarBorderRadius , prop_sidebarMargin , this._DEFAULT_OPACITY], this.getScope()),

                    prop_positionTop:             Observable.computed(( sidebarDirection, sidebarIsOpen , sidebarWidth , sidebarPositionStart , sidebarPositionEnd, sidebarMargin ) => {
                        if (sidebarDirection == ComponentSidebar_directionTypes.TTB){
                            if (sidebarIsOpen){
                                const calc = sidebarMargin != null ? [ OPERATION.ADD , sidebarMargin ] : [];
                                return SizeCalc(SizeUnit(0 , UNITS.PEXEL) , ...calc);
                            }
                            else {
                                return SizeUnit(-sidebarWidth , UNITS.PEXEL);
                            }
                        }
                        if (sidebarDirection == ComponentSidebar_directionTypes.RTL || sidebarDirection == ComponentSidebar_directionTypes.LTR){
                            return sidebarPositionStart;
                        }
                        return null;
                    }, [ prop_sidebarDirection, prop_sidebarIsOpen , prop_sidebarWidth , prop_sidebarPositionStart , prop_sidebarPositionEnd , prop_sidebarMargin], this.getScope()),

                    prop_positionLeft:        Observable.computed(( sidebarDirection, sidebarIsOpen , sidebarWidth , sidebarPositionStart , sidebarPositionEnd , sidebarMargin ) => {
                        if (sidebarDirection == ComponentSidebar_directionTypes.LTR){
                            if (sidebarIsOpen){
                                const calc = sidebarMargin != null ? [ OPERATION.ADD , sidebarMargin ] : [];
                                return SizeCalc(SizeUnit(0 , UNITS.PEXEL) , ...calc);
                            }
                            else {
                                return SizeUnit(-sidebarWidth , UNITS.PEXEL);
                            }
                        }
                        if (sidebarDirection == ComponentSidebar_directionTypes.TTB || sidebarDirection == ComponentSidebar_directionTypes.BTT){
                            return sidebarPositionStart;
                        }
                        return null;
                    }, [ prop_sidebarDirection, prop_sidebarIsOpen , prop_sidebarWidth , prop_sidebarPositionStart , prop_sidebarPositionEnd , prop_sidebarMargin], this.getScope()),

                    prop_positionBottom:             Observable.computed(( sidebarDirection, sidebarIsOpen , sidebarWidth , sidebarPositionStart , sidebarPositionEnd, sidebarMargin ) => {
                        if (sidebarDirection == ComponentSidebar_directionTypes.BTT){
                            if (sidebarIsOpen){
                                const calc = sidebarMargin != null ? [ OPERATION.ADD , sidebarMargin ] : [];
                                return SizeCalc(SizeUnit(0 , UNITS.PEXEL) , ...calc);
                            }
                            else {
                                return SizeUnit(-sidebarWidth , UNITS.PEXEL);
                            }
                        }
                        if (sidebarDirection == ComponentSidebar_directionTypes.RTL || sidebarDirection == ComponentSidebar_directionTypes.LTR){
                            return sidebarPositionEnd;
                        }
                        return null;
                    }, [ prop_sidebarDirection, prop_sidebarIsOpen , prop_sidebarWidth , prop_sidebarPositionStart , prop_sidebarPositionEnd , prop_sidebarMargin], this.getScope()),

                    prop_positionRight:           Observable.computed(( sidebarDirection, sidebarIsOpen , sidebarWidth , sidebarPositionStart , sidebarPositionEnd , sidebarMargin ) => {
                        if (sidebarDirection == ComponentSidebar_directionTypes.RTL){
                            console.log( sidebarDirection, sidebarIsOpen , sidebarWidth , sidebarPositionStart , sidebarPositionEnd , sidebarMargin)

                            if (sidebarIsOpen){
                                const calc = sidebarMargin != null ? [ OPERATION.ADD , sidebarMargin ] : [];
                                return SizeCalc(SizeUnit(0 , UNITS.PEXEL) , ...calc);
                            }
                            else {
                                return SizeUnit(-sidebarWidth , UNITS.PEXEL);
                            }
                        }
                        if (sidebarDirection == ComponentSidebar_directionTypes.TTB || sidebarDirection == ComponentSidebar_directionTypes.BTT){
                            return sidebarPositionEnd;
                        }
                        return null;
                    }, [ prop_sidebarDirection, prop_sidebarIsOpen , prop_sidebarWidth , prop_sidebarPositionStart , prop_sidebarPositionEnd , prop_sidebarMargin], this.getScope()),



                    prop_positionWidth:             Observable.computed(( sidebarDirection, sidebarWidth , sidebarPositionStart , sidebarPositionEnd) => {
                        if (sidebarDirection == ComponentSidebar_directionTypes.RTL || sidebarDirection == ComponentSidebar_directionTypes.LTR){
                            return SizeUnit(sidebarWidth , UNITS.PEXEL) ;
                        }
                        return SizeCalc(
                            SizeUnit(100 , UNITS.PERCENT) ,
                            OPERATION.MINUS ,
                            sidebarPositionStart ,
                            OPERATION.MINUS ,
                            sidebarPositionEnd ,
                        )
                    }, [ prop_sidebarDirection , prop_sidebarWidth , prop_sidebarPositionStart , prop_sidebarPositionEnd], this.getScope()),

                    prop_positionHeight:             Observable.computed(( sidebarDirection, sidebarWidth , sidebarPositionStart , sidebarPositionEnd) => {
                        if (sidebarDirection == ComponentSidebar_directionTypes.TTB || sidebarDirection == ComponentSidebar_directionTypes.BTT){
                            return SizeUnit(sidebarWidth , UNITS.PEXEL) ;
                        }
                        return SizeCalc(
                            SizeUnit(100 , UNITS.PERCENT) ,
                            OPERATION.MINUS ,
                            sidebarPositionStart ,
                            OPERATION.MINUS ,
                            sidebarPositionEnd ,
                        )
                    }, [ prop_sidebarDirection , prop_sidebarWidth , prop_sidebarPositionStart , prop_sidebarPositionEnd], this.getScope()),

                } ,
                <ComponentElementPositionMethodsType>{

                }
            ).getReactiveElement()

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_content_sidebar_content(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {
            const prop_sidebarContent=           data[ComponentSidebarConfigs.keys.prop_sidebarContent.name];
            const prop_sidebarBtnOpenHas=        data[ComponentSidebarConfigs.keys.prop_sidebarBtnOpenHas.name];

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                styles: {

                },
                children: Observable.conditionSwitch(
                    prop_sidebarBtnOpenHas,
                    {
                        true: () => ReactiveElement.div({
                            children: [
                                prop_sidebarContent ,
                                this.executeSchemaPart(ComponentSidebarConfigs.schemas.CONTENT_SIDEBAR_CONTENT_POSITION.name)
                            ]
                        }) ,

                        false: () => ReactiveElement.div({
                            children: [
                                prop_sidebarContent
                            ]
                        })
                    },
                    this.getScope()
                )
            });
        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_content_sidebar_content_position(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_sidebarBtnOpenSize=          data[ComponentSidebarConfigs.keys.prop_sidebarBtnOpenSize.name];
            const prop_sidebarDirection=            data[ComponentSidebarConfigs.keys.prop_sidebarDirection.name];
            const prop_sidebarIsOpen=          data[ComponentSidebarConfigs.keys.prop_sidebarIsOpen.name];

            return new ToolsComponents.ComponentElementPosition(
                <ComponentElementPositionPropsType>{

                    prop_positionRight:             Observable.computed(( sidebarBtnOpenSize , sidebarDirection, sidebarIsOpen) => {
                        if (sidebarDirection == ComponentSidebar_directionTypes.LTR){
                            if (sidebarIsOpen){
                                return SizeCalc(
                                    SizeUnit(-(sidebarBtnOpenSize) , UNITS.PEXEL) ,
                                    OPERATION.ADD ,
                                    SizeUnit((sidebarBtnOpenSize/4) , UNITS.PEXEL) ,
                                )
                            }
                            else {
                                return  SizeUnit(-(sidebarBtnOpenSize) , UNITS.PEXEL)
                            }
                        }
                        else if (sidebarDirection == ComponentSidebar_directionTypes.BTT || sidebarDirection == ComponentSidebar_directionTypes.TTB){
                            return  SizeUnit(50 , UNITS.PERCENT)
                        }
                    }, [ prop_sidebarBtnOpenSize , prop_sidebarDirection , prop_sidebarIsOpen ], this.getScope()),

                    prop_positionLeft:             Observable.computed(( sidebarBtnOpenSize , sidebarDirection , sidebarIsOpen) => {
                        if (sidebarDirection == ComponentSidebar_directionTypes.RTL){
                            if (sidebarIsOpen){
                                return SizeCalc(
                                    SizeUnit(-(sidebarBtnOpenSize) , UNITS.PEXEL) ,
                                    OPERATION.ADD ,
                                    SizeUnit((sidebarBtnOpenSize/4) , UNITS.PEXEL) ,
                                )
                            }
                            else {
                                return  SizeUnit(-(sidebarBtnOpenSize) , UNITS.PEXEL)
                            }
                        }
                        else if (sidebarDirection == ComponentSidebar_directionTypes.BTT || sidebarDirection == ComponentSidebar_directionTypes.TTB){
                            return  SizeUnit(50 , UNITS.PERCENT)
                        }
                    }, [ prop_sidebarBtnOpenSize , prop_sidebarDirection , prop_sidebarIsOpen], this.getScope()),

                    prop_positionTop:             Observable.computed(( sidebarBtnOpenSize , sidebarDirection , sidebarIsOpen) => {
                        if (sidebarDirection == ComponentSidebar_directionTypes.BTT){
                            if (sidebarIsOpen){
                                return SizeCalc(
                                    SizeUnit(-(sidebarBtnOpenSize) , UNITS.PEXEL) ,
                                    OPERATION.ADD ,
                                    SizeUnit((sidebarBtnOpenSize/4) , UNITS.PEXEL) ,
                                )
                            }
                            else {
                                return  SizeUnit(-(sidebarBtnOpenSize) , UNITS.PEXEL)
                            }
                        }
                        if (sidebarDirection == ComponentSidebar_directionTypes.LTR || sidebarDirection == ComponentSidebar_directionTypes.RTL){
                            return SizeUnit(50 , UNITS.PERCENT)
                        }
                    }, [ prop_sidebarBtnOpenSize , prop_sidebarDirection , prop_sidebarIsOpen], this.getScope()),

                    prop_positionBottom:             Observable.computed(( sidebarBtnOpenSize , sidebarDirection , sidebarIsOpen) => {
                        if (sidebarDirection == ComponentSidebar_directionTypes.TTB){
                            if (sidebarIsOpen){
                                return SizeCalc(
                                    SizeUnit(-(sidebarBtnOpenSize) , UNITS.PEXEL) ,
                                    OPERATION.ADD ,
                                    SizeUnit((sidebarBtnOpenSize/4) , UNITS.PEXEL) ,
                                )
                            }
                            else {
                                return  SizeUnit(-(sidebarBtnOpenSize) , UNITS.PEXEL)
                            }
                        }
                    }, [ prop_sidebarBtnOpenSize , prop_sidebarDirection , prop_sidebarIsOpen], this.getScope()),



                    prop_positionWidth:             Observable.computed(( sidebarBtnOpenSize) => {
                        return SizeUnit(sidebarBtnOpenSize , UNITS.PEXEL)
                    }, [ prop_sidebarBtnOpenSize ], this.getScope()),
                    prop_positionHeight:             Observable.computed(( sidebarBtnOpenSize) => {
                        return SizeUnit(sidebarBtnOpenSize , UNITS.PEXEL)
                    }, [ prop_sidebarBtnOpenSize ], this.getScope()),


                    prop_positionTranslate:           Observable.computed(( sidebarBtnOpenSize , sidebarDirection , sidebarIsOpen) => {
                        let x = -50;
                        let y = 0;
                        if (sidebarDirection == ComponentSidebar_directionTypes.RTL || sidebarDirection == ComponentSidebar_directionTypes.LTR){
                            x = 0;
                            y = -50;
                        }
                        return TranslateUnit(
                            SizeUnit(x , UNITS.PERCENT) ,
                            SizeUnit(y , UNITS.PERCENT) ,
                        )
                    }, [ prop_sidebarBtnOpenSize , prop_sidebarDirection , prop_sidebarIsOpen], this.getScope()),

                    prop_content:                   this.executeSchemaPart(ComponentSidebarConfigs.schemas.CONTENT_SIDEBAR_CONTENT_POSITION_BUTTON.name)
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


    private template_render_content_sidebar_content_position_button(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_sidebarBtnOpenSize=          data[ComponentSidebarConfigs.keys.prop_sidebarBtnOpenSize.name];

            return new ToolsComponents.ComponentButton(
                <ComponentButtonPropsType>{
                    classList: [

                    ],
                    prop_btnStyles: {
                        padding: "0"
                    } ,

                    prop_btnWidth: Observable.computed(( sidebarBtnOpenSize) => {
                        return SizeUnit(sidebarBtnOpenSize , UNITS.PEXEL)
                    }, [ prop_sidebarBtnOpenSize ], this.getScope()),
                    prop_btnHeight: Observable.computed(( sidebarBtnOpenSize) => {
                        return SizeUnit(sidebarBtnOpenSize , UNITS.PEXEL)
                    }, [ prop_sidebarBtnOpenSize ], this.getScope()),

                    prop_type:                       ComponentButton_Types.SUBMIT,

                    prop_btnTitle:        this.executeSchemaPart(ComponentSidebarConfigs.schemas.CONTENT_SIDEBAR_CONTENT_POSITION_BUTTON_ICON.name)
                },
                <ComponentButtonMethodsType>{
                    fn_onClickButton: (event, dataArgs, componentArgs) => {
                        const isOpen = this.get("prop_sidebarIsOpen");
                        this.set("prop_sidebarIsOpen" , !isOpen)
                    }
                }
            ).getReactiveElement();
        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_content_sidebar_content_position_button_icon(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_sidebarBtnOpenSize=     data[ComponentSidebarConfigs.keys.prop_sidebarBtnOpenSize.name];
            const prop_sidebarIsOpen=          data[ComponentSidebarConfigs.keys.prop_sidebarIsOpen.name];
            const prop_sidebarBtnColor=        data[ComponentSidebarConfigs.keys.prop_sidebarBtnColor.name];
            const prop_sidebarDirection=            data[ComponentSidebarConfigs.keys.prop_sidebarDirection.name];

            return new ToolsComponents.ComponentIcon(
                <ComponentIconPropsType>{

                    prop_iconStyles: {
                       textAlign: "center"
                    } ,

                    prop_icon: Observable.computed(( sidebarBtnOpenSize, sidebarIsOpen , sidebarBtnColor, sidebarDirection) => {
                        let icon = null;
                        switch (sidebarDirection){
                            case ComponentSidebar_directionTypes.TTB:
                                icon = sidebarIsOpen ? "icon_arrow_up" : "icon_arrow_down"
                                break;
                            case ComponentSidebar_directionTypes.RTL:
                                icon = sidebarIsOpen ? "icon_arrow_right" : "icon_arrow_left"
                                break;
                            case ComponentSidebar_directionTypes.BTT:
                                icon = sidebarIsOpen ? "icon_arrow_down" : "icon_arrow_up"
                                break;
                            case ComponentSidebar_directionTypes.LTR:
                                icon = sidebarIsOpen ? "icon_arrow_left" : "icon_arrow_right"
                                break;
                        }
                        return ToolsIcons?.[icon]({size: (2*sidebarBtnOpenSize/3) , primaryColor: sidebarBtnColor });
                        //
                    }, [ prop_sidebarBtnOpenSize , prop_sidebarIsOpen , prop_sidebarBtnColor , prop_sidebarDirection], this.getScope()),
                },
                <ComponentIconMethodsType>{
                    fn_onClickIcon: function (event , args)  {

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
}

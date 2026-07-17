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
    CssColorVar,
    IconsType,
    SIZES, SizesType, SizeUnit, TranslateUnit ,
    UNITS, Z_INDEXES
} from "../../utils/ToolsConsts";
import {Observable} from "../../core/Observable";
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
import {ToolsIcons} from "../icons";
import {
    ComponentElementPositionMethodsType,
    ComponentElementPositionPropsType,
    ComponentElementPosition_positionTypes
} from "./ComponentElementPosition";
import {ComponentIconMethodsType, ComponentIconPropsType} from "./ComponentIcon";
import {
    ComponentButton_Methods_CLICK_ComponentArgs,
    ComponentButton_Methods_CLICK_DataArgs,
    ComponentButtonMethodsType,
    ComponentButtonPropsType
} from "./ComponentButton";


export const ComponentWebCodeProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    prop_icon :                          "prop_icon" ,
    prop_iconClass :                     "prop_iconClass" ,
    prop_iconStyles :                    "prop_iconStyles" ,

    prop_background :                    "prop_background" ,

    prop_btnRetryHas :                   "prop_btnRetryHas" ,
    prop_btnRetryTitle :                 "prop_btnRetryTitle" ,
    prop_btnRetryClass :                 "prop_btnRetryClass" ,
    prop_btnRetryIcon :                  "prop_btnRetryIcon" ,
} as const;


const ComponentWebCodeConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys ,
        ///----------------------
        [ComponentWebCodeProps.prop_icon]: {
            name:               ComponentWebCodeProps.prop_icon,
            value:              GOG_SetValue<IconsType | null>(ToolsIcons.icon_web_code_404({ size: 250, primaryColor: Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1), secondaryColor: Color(COLORS_MAIN.ERROR , COLORS_GRAD.GRADE_1) })),
        } ,
        [ComponentWebCodeProps.prop_iconClass]: {
            name:               ComponentWebCodeProps.prop_iconClass,
            value:              GOG_SetValue<string[]>([]) ,
        } ,
        [ComponentWebCodeProps.prop_iconStyles]: {
            name:               ComponentWebCodeProps.prop_iconStyles,
            value:              GOG_SetValue<Record<string, string>>({}) ,
        } ,

        [ComponentWebCodeProps.prop_background]: {
            name:               ComponentWebCodeProps.prop_background,
            value:              GOG_SetValue<CssColorVar>(Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_4)),
        } ,

        [ComponentWebCodeProps.prop_btnRetryHas]: {
            name:               ComponentWebCodeProps.prop_btnRetryHas,
            value:              GOG_SetValue<boolean>(true),
        } ,
        [ComponentWebCodeProps.prop_btnRetryTitle]: {
            name:               ComponentWebCodeProps.prop_btnRetryTitle,
            value:              GOG_SetValue<string>("Retry"),
        } ,
        [ComponentWebCodeProps.prop_btnRetryClass]: {
            name:               ComponentWebCodeProps.prop_btnRetryClass,
            value:              GOG_SetValue<string[]>(["w-100"]),
        } ,
        [ComponentWebCodeProps.prop_btnRetryIcon]: {
            name:               ComponentWebCodeProps.prop_btnRetryIcon,
            value:              GOG_SetValue<IconsType | null>(ToolsIcons.icon_reload({ size: SIZES.M, primaryColor: Color(COLORS_MAIN.ERROR , COLORS_GRAD.GRADE_4), secondaryColor: Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1) })),
        } ,
    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_Component_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts ,
        CONTENT: {
            name:               "part_content"
        } ,
        CONTENT_BLUR: {
            name:               "part_content_blur"
        } ,

        CONTENT_BLUR_POSITION: {
            name:               "part_content_blur_position"
        } ,
        CONTENT_BLUR_POSITION_ICON: {
            name:               "part_content_blur_position_icon"
        } ,
        CONTENT_BLUR_POSITION_RETRY: {
            name:               "part_content_blur_position_retry"
        } ,
    } ,
    templates: {
        BODY: {
            name:                "body"
        } ,
    } ,
    methods: {
        RETRY_CLICK: {
            name:                      "fn_onRetryClick" ,
            dataArgs: {},
            componentArgs: {}
        },
    }
} as const


export type ComponentWebCodePropsType =                      GOG_ExtractNameValue<typeof ComponentWebCodeConfigs.keys>
export type ComponentWebCodeSchemaType =                     GOG_ExtractName<typeof ComponentWebCodeConfigs.schemas>
export type ComponentWebCodeTemplatesType =                  GOG_ExtractName<typeof ComponentWebCodeConfigs.templates>

export type ComponentWebCode_Methods_RETRY_CLICK_ComponentArgs =   GOG_ExtractName<typeof ComponentWebCodeConfigs.methods.RETRY_CLICK.componentArgs>
export type ComponentWebCode_Methods_RETRY_CLICK_DataArgs =        GOG_ExtractNameValue<typeof ComponentWebCodeConfigs.methods.RETRY_CLICK.dataArgs>

export type ComponentWebCodeMethodsType = {
    [ComponentWebCodeConfigs.methods.RETRY_CLICK.name]: ComponentCallBackType<ComponentWebCode_Methods_RETRY_CLICK_ComponentArgs , ComponentWebCode_Methods_RETRY_CLICK_DataArgs>
}


export class ComponentWebCodeBase extends ComponentBase<
    ComponentWebCodePropsType ,
    ComponentWebCodeSchemaType ,
    ComponentWebCodeTemplatesType ,
    ComponentWebCodeMethodsType
>{


    /* ---------------------------------------------
    PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN=  defineComponentPatterns<ComponentWebCodePropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this) ,
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this) ,
            [ComponentWebCodeConfigs.keys.prop_icon.name]: {
                prop:                                             ComponentWebCodeConfigs.keys.prop_icon.name,
                default:                                          ComponentWebCodeConfigs.keys.prop_icon.value,
                title:                                            Language.translate("components.web_code.props.prop_icon.title"),
                description:                                      Language.translate("components.web_code.props.prop_icon.description"),
            } ,
            [ComponentWebCodeConfigs.keys.prop_iconClass.name]: {
                prop:                                             ComponentWebCodeConfigs.keys.prop_iconClass.name,
                default:                                          ComponentWebCodeConfigs.keys.prop_iconClass.value,
                title:                                            Language.translate("components.web_code.props.prop_iconClass.title"),
                description:                                      Language.translate("components.web_code.props.prop_iconClass.description"),
            } ,
            [ComponentWebCodeConfigs.keys.prop_iconStyles.name]: {
                prop:                                             ComponentWebCodeConfigs.keys.prop_iconStyles.name,
                default:                                          ComponentWebCodeConfigs.keys.prop_iconStyles.value,
                title:                                            Language.translate("components.web_code.props.prop_iconStyles.title"),
                description:                                      Language.translate("components.web_code.props.prop_iconStyles.description"),
            } ,

            [ComponentWebCodeConfigs.keys.prop_background.name]: {
                prop:                                             ComponentWebCodeConfigs.keys.prop_background.name,
                default:                                          ComponentWebCodeConfigs.keys.prop_background.value,
                title:                                            Language.translate("components.web_code.props.prop_background.title"),
                description:                                      Language.translate("components.web_code.props.prop_background.description"),
            } ,

            [ComponentWebCodeConfigs.keys.prop_btnRetryHas.name]: {
                prop:                                             ComponentWebCodeConfigs.keys.prop_btnRetryHas.name,
                default:                                          ComponentWebCodeConfigs.keys.prop_btnRetryHas.value,
                title:                                            Language.translate("components.web_code.props.prop_btnRetryHas.title"),
                description:                                      Language.translate("components.web_code.props.prop_btnRetryHas.description"),
            } ,
            [ComponentWebCodeConfigs.keys.prop_btnRetryTitle.name]: {
                prop:                                             ComponentWebCodeConfigs.keys.prop_btnRetryTitle.name,
                default:                                          ComponentWebCodeConfigs.keys.prop_btnRetryTitle.value,
                title:                                            Language.translate("components.web_code.props.prop_btnRetryTitle.title"),
                description:                                      Language.translate("components.web_code.props.prop_btnRetryTitle.description"),
            } ,
            [ComponentWebCodeConfigs.keys.prop_btnRetryClass.name]: {
                prop:                                             ComponentWebCodeConfigs.keys.prop_btnRetryClass.name,
                default:                                          ComponentWebCodeConfigs.keys.prop_btnRetryClass.value,
                title:                                            Language.translate("components.web_code.props.prop_btnRetryClass.title"),
                description:                                      Language.translate("components.web_code.props.prop_btnRetryClass.description"),
            } ,
            [ComponentWebCodeConfigs.keys.prop_btnRetryIcon.name]: {
                prop:                                             ComponentWebCodeConfigs.keys.prop_btnRetryIcon.name,
                default:                                          ComponentWebCodeConfigs.keys.prop_btnRetryIcon.value,
                title:                                            Language.translate("components.web_code.props.prop_btnRetryIcon.title"),
                description:                                      Language.translate("components.web_code.props.prop_btnRetryIcon.description"),
            } ,
        }
    );


    /* ---------------------------------------------
             PROPERTYs Props
      --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentWebCodeSchemaType  , ComponentWebCodePropsType>( {
        ...GOG_ComponentBasicConfigs_Component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this) ,
        CONTENT: {
            part:                                                 ComponentWebCodeConfigs.schemas.CONTENT.name ,
            title:                                                Language.translate("components.web_code.schema.content.title") ,
            description:                                          Language.translate("components.web_code.schema.content.description") ,
            props: []
        } ,
        CONTENT_BLUR: {
            part:                                                 ComponentWebCodeConfigs.schemas.CONTENT_BLUR.name ,
            title:                                                Language.translate("components.web_code.schema.content_blur.title") ,
            description:                                          Language.translate("components.web_code.schema.content_blur.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentWebCodeConfigs.keys.prop_background.name] ,
            ]
        } ,
        CONTENT_BLUR_POSITION: {
            part:                                                 ComponentWebCodeConfigs.schemas.CONTENT_BLUR_POSITION.name ,
            title:                                                Language.translate("components.web_code.schema.content_blur_position.title") ,
            description:                                          Language.translate("components.web_code.schema.content_blur_position.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentWebCodeConfigs.keys.prop_icon.name]  ,
                this._COMPONENT_PATTERN[ComponentWebCodeConfigs.keys.prop_iconClass.name]  ,
                this._COMPONENT_PATTERN[ComponentWebCodeConfigs.keys.prop_iconStyles.name]  ,
            ]
        } ,
        CONTENT_BLUR_POSITION_ICON: {
            part:                                                 ComponentWebCodeConfigs.schemas.CONTENT_BLUR_POSITION_ICON.name ,
            title:                                                Language.translate("components.web_code.schema.content_blur_position_icon.title") ,
            description:                                          Language.translate("components.web_code.schema.content_blur_position_icon.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentWebCodeConfigs.keys.prop_icon.name]  ,
                this._COMPONENT_PATTERN[ComponentWebCodeConfigs.keys.prop_iconClass.name]  ,
                this._COMPONENT_PATTERN[ComponentWebCodeConfigs.keys.prop_iconStyles.name]  ,
            ]
        } ,
        CONTENT_BLUR_POSITION_RETRY: {
            part:                                                 ComponentWebCodeConfigs.schemas.CONTENT_BLUR_POSITION_RETRY.name ,
            title:                                                Language.translate("components.web_code.schema.content_blur_position_retry.title") ,
            description:                                          Language.translate("components.web_code.schema.content_blur_position_retry.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentWebCodeConfigs.keys.prop_btnRetryHas.name]  ,
                this._COMPONENT_PATTERN[ComponentWebCodeConfigs.keys.prop_btnRetryTitle.name]  ,
                this._COMPONENT_PATTERN[ComponentWebCodeConfigs.keys.prop_btnRetryClass.name]  ,
                this._COMPONENT_PATTERN[ComponentWebCodeConfigs.keys.prop_btnRetryIcon.name]  ,
            ]
        } ,
    });



    /* ---------------------------------------------
        PROPERTYs template
     --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentWebCodeTemplatesType , ComponentWebCodePropsType>({
        BODY: {
            title:                                            Language.translate("components.web_code.template.body.title"),
            description:                                      Language.translate("components.web_code.template.body.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentWebCodeConfigs.keys.prop_icon.name]
        } ,
    });


    /* ---------------------------------------------
        PROPERTYs Methods
     --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentWebCodeMethodsType , ComponentWebCodePropsType>({
        [ComponentWebCodeConfigs.methods.RETRY_CLICK.name]: {
            title:                                            Language.translate("components.web_code.methods.fn_onRetryClick.title"),
            description:                                      Language.translate("components.web_code.methods.fn_onRetryClick.description"),
            args: {}
        }
    });



    /* ---------------------------------------------
        Example
     --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        return new ComponentWebCode(
            <ComponentWebCodePropsType> {
                classList: ["col-md-3" , "col-12" , "border" , "p-2" , "position-relative"]  ,
                styles: {}  ,

                prop_icon:        ToolsIcons.icon_web_code_404({ size: 250, primaryColor: Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_4), secondaryColor: Color(COLORS_MAIN.ERROR , COLORS_GRAD.GRADE_1) }) ,
                prop_btnRetryHas: true
            } ,
            <ComponentWebCodeMethodsType>{
                fn_onRetryClick: (event, dataArgs: ComponentWebCode_Methods_RETRY_CLICK_DataArgs, componentArgs: ComponentWebCode_Methods_RETRY_CLICK_ComponentArgs) => {
                    alert("do Retry")
                }
            }
        ).getElement() as HTMLElement;
    }

}

export class ComponentWebCode extends ComponentWebCodeBase {

    /* ---------------------------------------------
       SETUP
     --------------------------------------------- */
    constructor(
        config: ComponentWebCodePropsType,
        methods: ComponentWebCodeMethodsType ,
        events = null
    ) {
        super("web-code", null);
        super.renderComponent(
            {
                prop_structureStyles: {
                    "width" :                  SizeUnit(100 , UNITS.PERCENT)  ,
                    "height" :                 SizeUnit(100 , UNITS.PERCENT)  ,
                } ,
                ...config
            },
            methods , events);
    }


    /* ---------------------------------------------
         TEMPLATEs
      --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentWebCodeConfigs.schemas.CONTENT.name)
    }


    override renderManagerComponent(partName , attrsDefault , data , extra) :  ReactiveElement {
        switch (partName){
            case ComponentWebCodeConfigs.schemas.CONTENT.name:
                return  this.template_render_content(attrsDefault , data , extra);
            case ComponentWebCodeConfigs.schemas.CONTENT_BLUR.name:
                return  this.template_render_content_blur(attrsDefault , data , extra);
            case ComponentWebCodeConfigs.schemas.CONTENT_BLUR_POSITION.name:
                return  this.template_render_content_blur_position(attrsDefault , data , extra);
            case ComponentWebCodeConfigs.schemas.CONTENT_BLUR_POSITION_ICON.name:
                return  this.template_render_content_blur_position_icon(attrsDefault , data , extra);
            case ComponentWebCodeConfigs.schemas.CONTENT_BLUR_POSITION_RETRY.name:
                return  this.template_render_content_blur_position_retry(attrsDefault , data , extra);
        }
    }


    private template_render_content(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            return ReactiveElement.part(  "section" ,
                {
                    attrs: {
                        ...attrsDefault
                    },
                    styles:{
                        "width" :                  SizeUnit(100 , UNITS.PERCENT)  ,
                        "height" :                 SizeUnit(100 , UNITS.PERCENT)  ,
                    } ,
                    children: [
                        this.executeSchemaPart(ComponentWebCodeConfigs.schemas.CONTENT_BLUR.name) ,
                    ]
                })
        }

        return ReactiveElement.section({
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_content_blur(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_background =        data[ComponentWebCodeConfigs.keys.prop_background.name] ;

            return new ToolsComponents.ComponentElementPosition(
                {
                    classList:               []  ,
                    styles:{
                        "width" :            SizeUnit(100 , UNITS.PERCENT)  ,
                        "height" :           SizeUnit(100 , UNITS.PERCENT)  ,
                        "display" :          "block"  ,
                    } ,
                    prop_structureStyles:{
                        "width" :            SizeUnit(100 , UNITS.PERCENT)  ,
                        "height" :           SizeUnit(100 , UNITS.PERCENT)  ,
                        "display" :          "block"  ,
                    } ,

                    prop_positionType:       ComponentElementPosition_positionTypes.FIX ,
                    prop_positionWidth:      SizeUnit(100 , UNITS.PERCENT) ,
                    prop_positionHeight:     SizeUnit(100 , UNITS.PERCENT) ,
                    prop_positionZIndex:     ToolsCss.getZIndex(Z_INDEXES.blur_popup) ,
                    prop_positionStyles :    Observable.computed(
                        (background) => {
                            return {
                                backgroundColor : background
                            }
                        },
                        [prop_background],
                        this.getScope()
                    ),

                    prop_content:            [
                        this.executeSchemaPart(ComponentWebCodeConfigs.schemas.CONTENT_BLUR_POSITION.name) ,
                    ] ,
                } as unknown as ComponentElementPositionPropsType ,
                <ComponentElementPositionMethodsType>{

                }
            ).getReactiveElement();

        }

        return ReactiveElement.section({
            attrs: {
                ...attrsDefault
            }
        });
    }

    
    private template_render_content_blur_position(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            return new ToolsComponents.ComponentElementPosition(
                {
                    classList:               []  ,
                    styles:                  {
                        "position" :              "relative" ,
                        "display" :               "block" ,
                        "width" :                  SizeUnit(100 , UNITS.PERCENT)  ,
                        "height" :                 SizeUnit(100 , UNITS.PERCENT)  ,
                    } ,
                    prop_structureStyles:   {
                        "width" :                  SizeUnit(100 , UNITS.PERCENT)  ,
                        "height" :                 SizeUnit(100 , UNITS.PERCENT)  ,
                    } ,
                    prop_positionStyles:     {
                        "height" :     "auto" ,
                    } ,
                    zIndex: `${ToolsCss.getZIndex(Z_INDEXES.tools_blur)}`,

                    prop_positionType:       ComponentElementPosition_positionTypes.ABSOLUTE ,
                    prop_positionWidth:      null ,
                    prop_positionHeight:     SizeUnit(100 , UNITS.PERCENT) ,

                    prop_positionLeft:       SizeUnit(50 , UNITS.PERCENT) ,
                    prop_positionTop:        SizeUnit(50 , UNITS.PERCENT) ,
                    prop_positionTranslate:  TranslateUnit(
                        SizeUnit(-50 , UNITS.PERCENT)  ,
                        SizeUnit(-50 , UNITS.PERCENT) 
                    ) ,
                    //prop_positionZIndex:     ToolsCss.getZIndex(Z_INDEXES.blur_popup) ,
                    

                    prop_content:            [
                       this.executeSchemaPart(ComponentWebCodeConfigs.schemas.CONTENT_BLUR_POSITION_ICON.name) ,
                       this.executeSchemaPart(ComponentWebCodeConfigs.schemas.CONTENT_BLUR_POSITION_RETRY.name)
                    ] ,
                } as unknown as ComponentElementPositionPropsType ,
                <ComponentElementPositionMethodsType>{

                }
            ).getReactiveElement();

        }

        return ReactiveElement.section({
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_content_blur_position_icon(attrsDefault , data , extra) : ReactiveElement {

        if (data != null){

            const prop_icon =        data[ComponentWebCodeConfigs.keys.prop_icon.name] ;
            const prop_iconClass =   data[ComponentWebCodeConfigs.keys.prop_iconClass.name] ;
            const prop_iconStyles =  data[ComponentWebCodeConfigs.keys.prop_iconStyles.name] ;

            return new ToolsComponents.ComponentIcon(
                <ComponentIconPropsType>{
                    classList: []  ,
                    styles: {

                    }  ,

                    prop_iconClass :    prop_iconClass ,
                    prop_iconStyles :   prop_iconStyles ,
                    prop_icon:          prop_icon ,
                } ,
                <ComponentIconMethodsType>{

                }
            ).getReactiveElement();

        }

        return ReactiveElement.section({
            attrs: {
                ...attrsDefault
            }
        });
    }

    private template_render_content_blur_position_retry(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_btnRetryHas =       data[ComponentWebCodeConfigs.keys.prop_btnRetryHas.name] ;
            const prop_btnRetryTitle =     data[ComponentWebCodeConfigs.keys.prop_btnRetryTitle.name] ;
            const prop_btnRetryClass =     data[ComponentWebCodeConfigs.keys.prop_btnRetryClass.name] ;
            const prop_btnRetryIcon =      data[ComponentWebCodeConfigs.keys.prop_btnRetryIcon.name] ;

            if (prop_btnRetryHas.get()){
                return new ToolsComponents.ComponentButton(
                    <ComponentButtonPropsType>{
                        classList:        ["mt-2"] ,
                        prop_btnClass:    prop_btnRetryClass  ,
                        prop_btnTitle:    prop_btnRetryTitle   ,
                        prop_btnIcon:     prop_btnRetryIcon   ,
                        prop_type:       "submit" ,
                        prop_btnType:    "button"
                    } ,
                    <ComponentButtonMethodsType>{
                        fn_onClickButton: function (event, dataArgs : ComponentButton_Methods_CLICK_DataArgs, componentArgs: ComponentButton_Methods_CLICK_ComponentArgs) {
                            const params: ComponentWebCode_Methods_RETRY_CLICK_DataArgs = {};
                            this.executeMethod(ComponentWebCodeConfigs.methods.RETRY_CLICK.name , event , params);
                        }.bind(this)
                    }
                ).getReactiveElement();
            }

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }

}

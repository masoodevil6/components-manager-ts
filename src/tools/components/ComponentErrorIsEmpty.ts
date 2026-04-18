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
import {ToolsIcons} from "../icons";
import {
    ComponentBorder_ArrowTypes,
    ComponentBorderMethodsType,
    ComponentBorderProps,
    ComponentBorderPropsType
} from "./ComponentBorder";
import {ComponentFloatMenu, ComponentFloatMenuMethodsType, ComponentFloatMenuPropsType} from "./ComponentFloatMenu";
import {ComponentIconMethodsType, ComponentIconPropsType} from "./ComponentIcon";
import {
    ComponentButton_Methods_CLICK_ComponentArgs,
    ComponentButton_Methods_CLICK_DataArgs,
    ComponentButtonMethodsType,
    ComponentButtonPropsType
} from "./ComponentButton";




export const ComponentErrorIsEmptyProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    prop_borderClass :                  "prop_borderClass" ,
    prop_borderStyles :                 "prop_borderStyles" ,
    prop_borderColor :                  "prop_borderColor" ,

    prop_icon :                         "prop_icon" ,
    prop_iconClass :                    "prop_iconClass" ,
    prop_iconStyles :                   "prop_iconStyles" ,

    prop_title :                        "prop_title" ,
    prop_titleColor :                   "prop_titleColor" ,
    prop_titleClass :                   "prop_titleClass" ,
    prop_titleStyles :                  "prop_titleStyles" ,

    prop_btnHas :                       "prop_btnHas" ,
    prop_btnClass :                     "prop_btnClass" ,
    prop_btnStyles :                    "prop_btnStyles" ,
    prop_btnTitle :                     "prop_btnTitle" ,
    prop_btnIcon :                      "prop_btnIcon" ,
} as const;


const ComponentErrorIsEmptyConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys ,
        ///----------------------
        [ComponentErrorIsEmptyProps.prop_borderClass]: {
            name:               ComponentErrorIsEmptyProps.prop_borderClass,
            value:              GOG_SetValue<string[]>( ["p-2"]) ,
        } ,
        [ComponentErrorIsEmptyProps.prop_borderStyles]: {
            name:               ComponentErrorIsEmptyProps.prop_borderStyles,
            value:              GOG_SetValue<Record<string, string>>({}) ,
        } ,
        [ComponentErrorIsEmptyProps.prop_borderColor]: {
            name:               ComponentErrorIsEmptyProps.prop_borderColor,
            value:              GOG_SetValue<Color | null>(Color(COLORS_MAIN.ERROR , COLORS_GRAD.GRADE_2)),
        } ,


        [ComponentErrorIsEmptyProps.prop_icon]: {
            name:               ComponentErrorIsEmptyProps.prop_icon,
            value:              GOG_SetValue<IconsType|null>(ToolsIcons.icon_warning({size:80})),
        } ,
        [ComponentErrorIsEmptyProps.prop_iconClass]: {
            name:               ComponentErrorIsEmptyProps.prop_iconClass,
            value:              GOG_SetValue<string[]>(["font-30pt" , "text-danger"]),
        } ,
        [ComponentErrorIsEmptyProps.prop_iconStyles]: {
            name:               ComponentErrorIsEmptyProps.prop_iconStyles,
            value:              GOG_SetValue<Record<string, string>>( {  "display" : "block" ,  "text-align" : "center" , } ),
        } ,


        [ComponentErrorIsEmptyProps.prop_title]: {
            name:               ComponentErrorIsEmptyProps.prop_title,
            value:              GOG_SetValue<string>(""),
        } ,
        [ComponentErrorIsEmptyProps.prop_titleColor]: {
            name:               ComponentErrorIsEmptyProps.prop_titleColor,
            value:              GOG_SetValue<Color | null>(Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1)),
        } ,
        [ComponentErrorIsEmptyProps.prop_titleClass]: {
            name:               ComponentErrorIsEmptyProps.prop_titleClass,
            value:              GOG_SetValue<string[]>(["text-center"]),
        } ,
        [ComponentErrorIsEmptyProps.prop_titleStyles]: {
            name:               ComponentErrorIsEmptyProps.prop_titleStyles,
            value:              GOG_SetValue<Record<string, string>>({}),
        } ,


        [ComponentErrorIsEmptyProps.prop_btnHas]: {
            name:               ComponentErrorIsEmptyProps.prop_btnHas,
            value:              GOG_SetValue<boolean>(false),
        } ,
        [ComponentErrorIsEmptyProps.prop_btnClass]: {
            name:               ComponentErrorIsEmptyProps.prop_btnClass,
            value:              GOG_SetValue<string[]>([ "mx-auto"]),
        } ,
        [ComponentErrorIsEmptyProps.prop_btnStyles]: {
            name:               ComponentErrorIsEmptyProps.prop_btnStyles,
            value:              GOG_SetValue<Record<string, string>>( {"cursor" : "pointer" , "width" : "100%"  , "text-align" : "center!important" ,} ),
        } ,
        [ComponentErrorIsEmptyProps.prop_btnTitle]: {
            name:               ComponentErrorIsEmptyProps.prop_btnTitle,
            value:              GOG_SetValue<string>( "Retry" ),
        } ,
        [ComponentErrorIsEmptyProps.prop_btnIcon]: {
            name:               ComponentErrorIsEmptyProps.prop_btnIcon,
            value:              GOG_SetValue<IconsType|null>(ToolsIcons.icon_reload({size: SIZES.M , primaryColor:Color(COLORS_MAIN.SHAN ,COLORS_GRAD.GRADE_1), secondaryColor:Color(COLORS_MAIN.ERROR ,COLORS_GRAD.GRADE_4)})),
        } ,
    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_Component_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts ,
        BORDER: {
            name:               "part_border"
        } ,
        BORDER_CONTENT: {
            name:               "part_border_content"
        } ,
        BORDER_CONTENT_ICON: {
            name:               "part_border_content_icon"
        } ,
        BORDER_CONTENT_TITLE: {
            name:               "part_border_content_title"
        } ,
        BORDER_CONTENT_BTN_RETRY: {
            name:               "part_border_content_btn_retry"
        } ,
    } ,
    templates: {
        BODY: {
            name:                "body"
        } ,
        BTN: {
            name:                "btn"
        } ,
    } ,
    methods: {
        BTN_CLICK: {
            name:                      "fn_onBtnClick" ,
            dataArgs: {},
            componentArgs: {}
        },
    }
} as const


export type ComponentErrorIsEmptyPropsType =                      GOG_ExtractNameValue<typeof ComponentErrorIsEmptyConfigs.keys>
export type ComponentErrorIsEmptySchemaType =                     GOG_ExtractName<typeof ComponentErrorIsEmptyConfigs.schemas>
export type ComponentErrorIsEmptyTemplatesType =                  GOG_ExtractName<typeof ComponentErrorIsEmptyConfigs.templates>

export type ComponentErrorIsEmpty_Methods_BTN_CLICK_ComponentArgs =   GOG_ExtractName<typeof ComponentErrorIsEmptyConfigs.methods.BTN_CLICK.componentArgs>
export type ComponentErrorIsEmpty_Methods_BTN_CLICK_DataArgs =        GOG_ExtractNameValue<typeof ComponentErrorIsEmptyConfigs.methods.BTN_CLICK.dataArgs>

export type ComponentErrorIsEmptyMethodsType = {
    [ComponentErrorIsEmptyConfigs.methods.BTN_CLICK.name]: ComponentCallBackType<ComponentErrorIsEmpty_Methods_BTN_CLICK_ComponentArgs , ComponentErrorIsEmpty_Methods_BTN_CLICK_DataArgs>
}





export class ComponentErrorIsEmptyBase extends ComponentBase<
    ComponentErrorIsEmptyPropsType ,
    ComponentErrorIsEmptySchemaType ,
    ComponentErrorIsEmptyTemplatesType ,
    ComponentErrorIsEmptyMethodsType
>{


    /* ---------------------------------------------
    PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN=  defineComponentPatterns<ComponentErrorIsEmptyPropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this) ,
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this) ,
            [ComponentErrorIsEmptyConfigs.keys.prop_borderClass.name]: {
                prop:                                             ComponentErrorIsEmptyConfigs.keys.prop_borderClass.name,
                default:                                          ComponentErrorIsEmptyConfigs.keys.prop_borderClass.value,
                title:                                            Language.translate("components.error_is_empty.props.prop_borderClass.title"),
                description:                                      Language.translate("components.error_is_empty.props.prop_borderClass.description"),
            } ,
            [ComponentErrorIsEmptyConfigs.keys.prop_borderStyles.name]: {
                prop:                                             ComponentErrorIsEmptyConfigs.keys.prop_borderStyles.name,
                default:                                          ComponentErrorIsEmptyConfigs.keys.prop_borderStyles.value,
                title:                                            Language.translate("components.error_is_empty.props.prop_borderStyles.title"),
                description:                                      Language.translate("components.error_is_empty.props.prop_borderStyles.description"),
            } ,
            [ComponentErrorIsEmptyConfigs.keys.prop_borderColor.name]: {
                prop:                                             ComponentErrorIsEmptyConfigs.keys.prop_borderColor.name,
                default:                                          ComponentErrorIsEmptyConfigs.keys.prop_borderColor.value,
                title:                                            Language.translate("components.error_is_empty.props.prop_borderColor.title"),
                description:                                      Language.translate("components.error_is_empty.props.prop_borderColor.description"),
            } ,

            [ComponentErrorIsEmptyConfigs.keys.prop_icon.name]: {
                prop:                                             ComponentErrorIsEmptyConfigs.keys.prop_icon.name,
                default:                                          ComponentErrorIsEmptyConfigs.keys.prop_icon.value,
                title:                                            Language.translate("components.error_is_empty.props.prop_icon.title"),
                description:                                      Language.translate("components.error_is_empty.props.prop_icon.description"),
            } ,
            [ComponentErrorIsEmptyConfigs.keys.prop_iconClass.name]: {
                prop:                                             ComponentErrorIsEmptyConfigs.keys.prop_iconClass.name,
                default:                                          ComponentErrorIsEmptyConfigs.keys.prop_iconClass.value,
                title:                                            Language.translate("components.error_is_empty.props.prop_iconClass.title"),
                description:                                      Language.translate("components.error_is_empty.props.prop_iconClass.description"),
            } ,
            [ComponentErrorIsEmptyConfigs.keys.prop_iconStyles.name]: {
                prop:                                             ComponentErrorIsEmptyConfigs.keys.prop_iconStyles.name,
                default:                                          ComponentErrorIsEmptyConfigs.keys.prop_iconStyles.value,
                title:                                            Language.translate("components.error_is_empty.props.prop_iconClass.title"),
                description:                                      Language.translate("components.error_is_empty.props.prop_iconClass.description"),
            } ,

            [ComponentErrorIsEmptyConfigs.keys.prop_title.name]: {
                prop:                                             ComponentErrorIsEmptyConfigs.keys.prop_title.name,
                default:                                          ComponentErrorIsEmptyConfigs.keys.prop_title.value,
                title:                                            Language.translate("components.error_is_empty.props.prop_title.title"),
                description:                                      Language.translate("components.error_is_empty.props.prop_title.description"),
            } ,
            [ComponentErrorIsEmptyConfigs.keys.prop_titleColor.name]: {
                prop:                                             ComponentErrorIsEmptyConfigs.keys.prop_titleColor.name,
                default:                                          ComponentErrorIsEmptyConfigs.keys.prop_titleColor.value,
                title:                                            Language.translate("components.error_is_empty.props.prop_titleColor.title"),
                description:                                      Language.translate("components.error_is_empty.props.prop_titleColor.description"),
            } ,
            [ComponentErrorIsEmptyConfigs.keys.prop_titleClass.name]: {
                prop:                                             ComponentErrorIsEmptyConfigs.keys.prop_titleClass.name,
                default:                                          ComponentErrorIsEmptyConfigs.keys.prop_titleClass.value,
                title:                                            Language.translate("components.error_is_empty.props.prop_titleClass.title"),
                description:                                      Language.translate("components.error_is_empty.props.prop_titleClass.description"),
            } ,
            [ComponentErrorIsEmptyConfigs.keys.prop_titleStyles.name]: {
                prop:                                             ComponentErrorIsEmptyConfigs.keys.prop_titleStyles.name,
                default:                                          ComponentErrorIsEmptyConfigs.keys.prop_titleStyles.value,
                title:                                            Language.translate("components.error_is_empty.props.prop_titleStyles.title"),
                description:                                      Language.translate("components.error_is_empty.props.prop_titleStyles.description"),
            } ,

            [ComponentErrorIsEmptyConfigs.keys.prop_btnHas.name]: {
                prop:                                             ComponentErrorIsEmptyConfigs.keys.prop_btnHas.name,
                default:                                          ComponentErrorIsEmptyConfigs.keys.prop_btnHas.value,
                title:                                            Language.translate("components.error_is_empty.props.prop_btnHas.title"),
                description:                                      Language.translate("components.error_is_empty.props.prop_btnHas.description"),
            } ,
            [ComponentErrorIsEmptyConfigs.keys.prop_btnClass.name]: {
                prop:                                             ComponentErrorIsEmptyConfigs.keys.prop_btnClass.name,
                default:                                          ComponentErrorIsEmptyConfigs.keys.prop_btnClass.value,
                title:                                            Language.translate("components.error_is_empty.props.prop_btnClass.title"),
                description:                                      Language.translate("components.error_is_empty.props.prop_btnClass.description"),
            } ,
            [ComponentErrorIsEmptyConfigs.keys.prop_btnStyles.name]: {
                prop:                                             ComponentErrorIsEmptyConfigs.keys.prop_btnStyles.name,
                default:                                          ComponentErrorIsEmptyConfigs.keys.prop_btnStyles.value,
                title:                                            Language.translate("components.error_is_empty.props.prop_btnStyles.title"),
                description:                                      Language.translate("components.error_is_empty.props.prop_btnStyles.description"),
            } ,
            [ComponentErrorIsEmptyConfigs.keys.prop_btnTitle.name]: {
                prop:                                             ComponentErrorIsEmptyConfigs.keys.prop_btnTitle.name,
                default:                                          ComponentErrorIsEmptyConfigs.keys.prop_btnTitle.value,
                title:                                            Language.translate("components.error_is_empty.props.prop_btnTitle.title"),
                description:                                      Language.translate("components.error_is_empty.props.prop_btnTitle.description"),
            } ,
            [ComponentErrorIsEmptyConfigs.keys.prop_btnIcon.name]: {
                prop:                                             ComponentErrorIsEmptyConfigs.keys.prop_btnIcon.name,
                default:                                          ComponentErrorIsEmptyConfigs.keys.prop_btnIcon.value,
                title:                                            Language.translate("components.error_is_empty.props.prop_btnIcon.title"),
                description:                                      Language.translate("components.error_is_empty.props.prop_btnIcon.description"),
            } ,
        }
    );


    /* ---------------------------------------------
             PROPERTYs Props
      --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentErrorIsEmptySchemaType  , ComponentErrorIsEmptyPropsType>( {
        ...GOG_ComponentBasicConfigs_Component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this) ,
        [ComponentErrorIsEmptyConfigs.schemas.BORDER.name]: {
            part:                                                 ComponentErrorIsEmptyConfigs.schemas.BORDER.name ,
            title:                                                Language.translate("components.error_is_empty.schema.border.title") ,
            description:                                          Language.translate("components.error_is_empty.schema.border.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentErrorIsEmptyConfigs.keys.prop_borderClass.name]  ,
                this._COMPONENT_PATTERN[ComponentErrorIsEmptyConfigs.keys.prop_borderStyles.name]  ,
                this._COMPONENT_PATTERN[ComponentErrorIsEmptyConfigs.keys.prop_borderColor.name]  ,
            ]
        } ,
        [ComponentErrorIsEmptyConfigs.schemas.BORDER_CONTENT.name]: {
            part:                                                 ComponentErrorIsEmptyConfigs.schemas.BORDER_CONTENT.name ,
            title:                                                Language.translate("components.error_is_empty.schema.border_content.title") ,
            description:                                          Language.translate("components.error_is_empty.schema.border_content.description") ,
            props: [

            ]
        } ,
        [ComponentErrorIsEmptyConfigs.schemas.BORDER_CONTENT_ICON.name]: {
            part:                                                 ComponentErrorIsEmptyConfigs.schemas.BORDER_CONTENT_ICON.name ,
            title:                                                Language.translate("components.error_is_empty.schema.border_content_icon.title") ,
            description:                                          Language.translate("components.error_is_empty.schema.border_content_icon.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentErrorIsEmptyConfigs.keys.prop_icon.name]  ,
                this._COMPONENT_PATTERN[ComponentErrorIsEmptyConfigs.keys.prop_iconClass.name]  ,
                this._COMPONENT_PATTERN[ComponentErrorIsEmptyConfigs.keys.prop_iconStyles.name]  ,
            ]
        } ,
        [ComponentErrorIsEmptyConfigs.schemas.BORDER_CONTENT_TITLE.name]: {
            part:                                                 ComponentErrorIsEmptyConfigs.schemas.BORDER_CONTENT_TITLE.name ,
            title:                                                Language.translate("components.error_is_empty.schema.border_content_title.title") ,
            description:                                          Language.translate("components.error_is_empty.schema.border_content_title.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentErrorIsEmptyConfigs.keys.prop_title.name]  ,
                this._COMPONENT_PATTERN[ComponentErrorIsEmptyConfigs.keys.prop_titleColor.name]  ,
                this._COMPONENT_PATTERN[ComponentErrorIsEmptyConfigs.keys.prop_titleClass.name]  ,
                this._COMPONENT_PATTERN[ComponentErrorIsEmptyConfigs.keys.prop_titleStyles.name]  ,
            ]
        } ,
        [ComponentErrorIsEmptyConfigs.schemas.BORDER_CONTENT_BTN_RETRY.name]: {
            part:                                                 ComponentErrorIsEmptyConfigs.schemas.BORDER_CONTENT_BTN_RETRY.name ,
            title:                                                Language.translate("components.error_is_empty.schema.border_content_btn_retry.title") ,
            description:                                          Language.translate("components.error_is_empty.schema.border_content_btn_retry.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentErrorIsEmptyConfigs.keys.prop_btnHas.name]  ,
                this._COMPONENT_PATTERN[ComponentErrorIsEmptyConfigs.keys.prop_btnClass.name]  ,
                this._COMPONENT_PATTERN[ComponentErrorIsEmptyConfigs.keys.prop_btnStyles.name]  ,
                this._COMPONENT_PATTERN[ComponentErrorIsEmptyConfigs.keys.prop_btnTitle.name]  ,
                this._COMPONENT_PATTERN[ComponentErrorIsEmptyConfigs.keys.prop_btnIcon.name]  ,
            ]
        } ,
    });



    /* ---------------------------------------------
        PROPERTYs template
     --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentErrorIsEmptyTemplatesType , ComponentErrorIsEmptyPropsType>({
        [ComponentErrorIsEmptyConfigs.templates.BODY.name]: {
            title:                                            Language.translate("components.error_is_empty.template.body.title"),
            description:                                      Language.translate("components.error_is_empty.template.body.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentErrorIsEmptyConfigs.keys.prop_title.name]
        } ,
        [ComponentErrorIsEmptyConfigs.templates.BTN.name]: {
            title:                                            Language.translate("components.error_is_empty.template.btn.title"),
            description:                                      Language.translate("components.error_is_empty.template.btn.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentErrorIsEmptyConfigs.keys.prop_btnTitle.name]
        } ,
    });


    /* ---------------------------------------------
        PROPERTYs Methods
     --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentErrorIsEmptyMethodsType , ComponentErrorIsEmptyPropsType>({
        [ComponentErrorIsEmptyConfigs.methods.BTN_CLICK.name]: {
            title:                                            Language.translate("components.error_is_empty.methods.fn_onBtnClick.title"),
            description:                                      Language.translate("components.error_is_empty.methods.fn_onBtnClick.description"),
            args: {}
        }
    });



    /* ---------------------------------------------
        Example
     --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        return new ComponentErrorIsEmpty(
            <ComponentErrorIsEmptyPropsType> {
                classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                styles: {
                    color: "red"
                }  ,

                prop_title:  "error is empty" ,
                prop_btnHas: true

            } ,
            <ComponentErrorIsEmptyMethodsType>{
                fn_onBtnClick: (event, dataArgs: ComponentErrorIsEmpty_Methods_BTN_CLICK_DataArgs, componentArgs:ComponentErrorIsEmpty_Methods_BTN_CLICK_ComponentArgs) => {
                    alert("do Retry")
                }
            }
        ).getElement();
    }

}

export class ComponentErrorIsEmpty extends ComponentErrorIsEmptyBase {

    /* ---------------------------------------------
       SETUP
     --------------------------------------------- */
    constructor(
        config: ComponentErrorIsEmptyPropsType,
        methods: ComponentErrorIsEmptyMethodsType
    ) {
        super("error-is-empty", null);
        super.renderComponent(config, methods);
    }


    /* ---------------------------------------------
         TEMPLATEs
      --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentErrorIsEmptyConfigs.schemas.BORDER.name)
    }


    override renderManagerComponent(partName , attrsDefault , data , extra) :  ReactiveElement {
        switch (partName){
            case ComponentErrorIsEmptyConfigs.schemas.BORDER.name:
                return  this.template_render_border(attrsDefault , data , extra);
            case ComponentErrorIsEmptyConfigs.schemas.BORDER_CONTENT.name:
                return  this.template_render_borderContent(attrsDefault , data , extra);
            case ComponentErrorIsEmptyConfigs.schemas.BORDER_CONTENT_ICON.name:
                return  this.template_render_borderContentIcon(attrsDefault , data , extra);
            case ComponentErrorIsEmptyConfigs.schemas.BORDER_CONTENT_TITLE.name:
                return  this.template_render_borderContentTitle(attrsDefault , data , extra);
            case ComponentErrorIsEmptyConfigs.schemas.BORDER_CONTENT_BTN_RETRY.name:
                return  this.template_render_borderContentBtnRetry(attrsDefault , data , extra);
        }
    }


    private template_render_border(attrsDefault , data , extra) : ReactiveElement {

        if (data != null){

            const prop_borderColor =        data[ComponentErrorIsEmptyConfigs.keys.prop_borderColor.name] ;
            const prop_borderClass =        data[ComponentErrorIsEmptyConfigs.keys.prop_borderClass.name] ;
            const prop_borderStyles =       data[ComponentErrorIsEmptyConfigs.keys.prop_borderStyles.name] ;

            return new ToolsComponents.ComponentBorder(
                <ComponentBorderPropsType>{
                    classList:                [] ,
                    styles:                   {} ,
                    prop_borderStyles:        prop_borderStyles ,
                    prop_borderClass:         prop_borderClass ,
                    prop_borderColor:         prop_borderColor ,
                    prop_content:             this.executeSchemaPart(ComponentErrorIsEmptyConfigs.schemas.BORDER_CONTENT.name)
                },
                <ComponentBorderMethodsType>{

                }
            ).getReactiveElement();

        }

        return ReactiveElement.section({
            attrs: {
                ...attrsDefault
            }
        });
    }

    private template_render_borderContent(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            return ReactiveElement.part(  "section" ,
                {
                    attrs: {
                        ...attrsDefault
                    },

                    children: [
                        this.executeSchemaPart(ComponentErrorIsEmptyConfigs.schemas.BORDER_CONTENT_ICON.name) ,
                        this.executeSchemaPart(ComponentErrorIsEmptyConfigs.schemas.BORDER_CONTENT_TITLE.name) ,
                        this.executeSchemaPart(ComponentErrorIsEmptyConfigs.schemas.BORDER_CONTENT_BTN_RETRY.name) ,
                    ]
                })
        }

        return ReactiveElement.section({
            attrs: {
                ...attrsDefault
            }
        });
    }

    private template_render_borderContentIcon(attrsDefault , data , extra) : ReactiveElement {

        if (data != null){

            const prop_icon =        data[ComponentErrorIsEmptyConfigs.keys.prop_icon.name] ;
            const prop_iconClass =   data[ComponentErrorIsEmptyConfigs.keys.prop_iconClass.name] ;
            const prop_iconStyles =  data[ComponentErrorIsEmptyConfigs.keys.prop_iconStyles.name] ;

            return new ToolsComponents.ComponentIcon(
                <ComponentIconPropsType>{
                    classList: []  ,
                    styles: {}  ,

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

    private template_render_borderContentTitle(attrsDefault , data , extra) : ReactiveElement {

        if (data != null){

            const prop_title =        data[ComponentErrorIsEmptyConfigs.keys.prop_title.name] ;
            const prop_titleColor =   data[ComponentErrorIsEmptyConfigs.keys.prop_titleColor.name] ;
            const prop_titleClass =   data[ComponentErrorIsEmptyConfigs.keys.prop_titleClass.name] ;
            const prop_titleStyles =  data[ComponentErrorIsEmptyConfigs.keys.prop_titleStyles.name] ;

            const elFontSize = ToolsCss.getFontSize(AppConfig.get("sizeNameLarge"));
            const elHeight = ToolsCss.getIconSize(AppConfig.get("sizeNameLarge"));

            return ReactiveElement.part(  "section" ,
                {
                    attrs: {
                        ...attrsDefault
                    },
                    styles: {
                        lineHeight:   `${elHeight}px` ,
                        fontSize:     `${elFontSize}px`
                    } ,
                    stylesBind: {
                        prop_titleStyles ,
                        color:         prop_titleColor
                    } ,
                    className: [] ,
                    classBind: [
                        prop_titleClass
                    ] ,
                    children: [
                        ReactiveElement.b({
                            children: [
                                prop_title
                            ]
                        })
                    ]
                })
        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }

    private template_render_borderContentBtnRetry(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_btnHas =       data[ComponentErrorIsEmptyConfigs.keys.prop_btnHas.name] ;
            const prop_btnClass =     data[ComponentErrorIsEmptyConfigs.keys.prop_btnClass.name] ;
            const prop_btnStyles =    data[ComponentErrorIsEmptyConfigs.keys.prop_btnStyles.name] ;
            const prop_btnTitle =     data[ComponentErrorIsEmptyConfigs.keys.prop_btnTitle.name] ;
            const prop_btnIcon =      data[ComponentErrorIsEmptyConfigs.keys.prop_btnIcon.name] ;

            if (prop_btnHas.get()){
                return new ToolsComponents.ComponentButton(
                    <ComponentButtonPropsType>{
                        classList:        ["mt-2"] ,
                        prop_btnClass:    prop_btnClass  ,
                        prop_btnStyles:   prop_btnStyles  ,
                        prop_btnTitle:    prop_btnTitle   ,
                        prop_btnIcon:     prop_btnIcon   ,
                        prop_type:       "submit" ,
                        prop_btnType:    "button"
                    } ,
                    <ComponentButtonMethodsType>{
                        fn_onClickButton: function (event, dataArgs : ComponentButton_Methods_CLICK_DataArgs, componentArgs: ComponentButton_Methods_CLICK_ComponentArgs) {
                            const params: ComponentErrorIsEmpty_Methods_BTN_CLICK_DataArgs = {};
                            this.executeMethod(ComponentErrorIsEmptyConfigs.methods.BTN_CLICK.name , event , params);
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

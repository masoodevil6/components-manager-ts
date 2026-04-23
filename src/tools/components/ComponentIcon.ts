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





export const ComponentIconProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    prop_icon :                          "prop_icon" ,
    prop_iconTitle :                     "prop_iconTitle" ,
    prop_iconClass :                     "prop_iconClass" ,
    prop_iconStyles :                    "prop_iconStyles" ,
} as const;



const ComponentIconConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys ,
        ///----------------------
        [ComponentIconProps.prop_icon]: {
            name:               ComponentIconProps.prop_icon,
            value:              GOG_SetValue<IconsType |null>(null) ,
        } ,
        [ComponentIconProps.prop_iconTitle]: {
            name:               ComponentIconProps.prop_iconTitle,
            value:              GOG_SetValue<string>( "") ,
        } ,
        [ComponentIconProps.prop_iconClass]: {
            name:               ComponentIconProps.prop_iconClass,
            value:              GOG_SetValue<string[]>( []) ,
        } ,
        [ComponentIconProps.prop_iconStyles]: {
            name:               ComponentIconProps.prop_iconStyles,
            value:              GOG_SetValue<Record<string, string>>({}) ,
        } ,
    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_Component_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts ,
        ICON: {
            name:               "part_icon"
        } ,
    } ,
    templates: {
        BODY: {
            name:                "body"
        } ,
    } ,
    methods: {
        CLICK: {
            name:                      "fn_onClickIcon" ,
            dataArgs: {},
            componentArgs: {
                ICON : {
                    name:              "icon"
                }
            }
        },
        HOVER: {
            name:                      "fn_onHoverIcon" ,
            dataArgs: {},
            componentArgs: {
                ICON : {
                    name:              "icon"
                }
            }
        },
        BLUR: {
            name:                      "fn_onBlurIcon" ,
            dataArgs: {},
            componentArgs: {
                ICON : {
                    name:              "icon"
                }
            }
        },
    }
} as const


export type ComponentIconPropsType =                      GOG_ExtractNameValue<typeof ComponentIconConfigs.keys>
export type ComponentIconSchemaType =                     GOG_ExtractName<typeof ComponentIconConfigs.schemas>
export type ComponentIconTemplatesType =                  GOG_ExtractName<typeof ComponentIconConfigs.templates>

export type ComponentIcon_Methods_CLICK_ComponentArgs =   GOG_ExtractName<typeof ComponentIconConfigs.methods.CLICK.componentArgs>
export type ComponentIcon_Methods_CLICK_DataArgs =        GOG_ExtractNameValue<typeof ComponentIconConfigs.methods.CLICK.dataArgs>

export type ComponentIcon_Methods_HOVER_ComponentArgs =   GOG_ExtractName<typeof ComponentIconConfigs.methods.HOVER.componentArgs>
export type ComponentIcon_Methods_HOVER_DataArgs =        GOG_ExtractNameValue<typeof ComponentIconConfigs.methods.HOVER.dataArgs>

export type ComponentIcon_Methods_BLUR_ComponentArgs =   GOG_ExtractName<typeof ComponentIconConfigs.methods.BLUR.componentArgs>
export type ComponentIcon_Methods_BLUR_DataArgs =        GOG_ExtractNameValue<typeof ComponentIconConfigs.methods.BLUR.dataArgs>

export type ComponentIconMethodsType = {
    [ComponentIconConfigs.methods.CLICK.name]: ComponentCallBackType<ComponentIcon_Methods_CLICK_ComponentArgs , ComponentIcon_Methods_CLICK_DataArgs>
    [ComponentIconConfigs.methods.HOVER.name]: ComponentCallBackType<ComponentIcon_Methods_HOVER_ComponentArgs , ComponentIcon_Methods_HOVER_DataArgs>
    [ComponentIconConfigs.methods.BLUR.name]:  ComponentCallBackType<ComponentIcon_Methods_BLUR_ComponentArgs , ComponentIcon_Methods_BLUR_DataArgs>
}









export class ComponentIconBase extends ComponentBase<
    ComponentIconPropsType ,
    ComponentIconSchemaType ,
    ComponentIconTemplatesType ,
    ComponentIconMethodsType
    >{




    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN=  defineComponentPatterns<ComponentIconPropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this) ,
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this) ,
            [ComponentIconConfigs.keys.prop_icon.name]: {
                prop:                                             ComponentIconConfigs.keys.prop_icon.name,
                default:                                          ComponentIconConfigs.keys.prop_icon.value,
                title:                                            Language.translate("components.icon.props.prop_icon.title"),
                description:                                      Language.translate("components.icon.props.prop_icon.description"),
            } ,
            [ComponentIconConfigs.keys.prop_iconTitle.name]: {
                prop:                                             ComponentIconConfigs.keys.prop_iconTitle.name,
                default:                                          ComponentIconConfigs.keys.prop_iconTitle.value,
                title:                                            Language.translate("components.icon.props.prop_iconTitle.title"),
                description:                                      Language.translate("components.icon.props.prop_iconTitle.description"),
            } ,
            [ComponentIconConfigs.keys.prop_iconClass.name]: {
                prop:                                             ComponentIconConfigs.keys.prop_iconClass.name,
                default:                                          ComponentIconConfigs.keys.prop_iconClass.value,
                title:                                            Language.translate("components.icon.props.prop_iconClass.title"),
                description:                                      Language.translate("components.icon.props.prop_iconClass.description"),
            } ,
            [ComponentIconConfigs.keys.prop_iconStyles.name]: {
                prop:                                             ComponentIconConfigs.keys.prop_iconStyles.name,
                default:                                          ComponentIconConfigs.keys.prop_iconStyles.value,
                title:                                            Language.translate("components.icon.props.prop_iconStyles.title"),
                description:                                      Language.translate("components.icon.props.prop_iconStyles.description"),
            } ,
        }
    );



    /* ---------------------------------------------
        PROPERTYs Props
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentIconSchemaType  , ComponentIconPropsType>( {
        ...GOG_ComponentBasicConfigs_Component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this) ,
        [ComponentIconConfigs.schemas.ICON.name]: {
            part:               ComponentIconConfigs.schemas.ICON.name ,
            title:              Language.translate("components.icon.schema.icon.title") ,
            description:        Language.translate("components.icon.schema.icon.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentIconConfigs.keys.prop_icon.name] ,
                this._COMPONENT_PATTERN[ComponentIconConfigs.keys.prop_iconTitle.name] ,
                this._COMPONENT_PATTERN[ComponentIconConfigs.keys.prop_iconClass.name] ,
                this._COMPONENT_PATTERN[ComponentIconConfigs.keys.prop_iconStyles.name] ,
            ]
        } ,
    });



    /* ---------------------------------------------
        PROPERTYs Pattern
     --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentIconTemplatesType , ComponentIconPropsType>({
        [ComponentIconConfigs.templates.BODY.name]: {
            title:                                            Language.translate("components.icon.template.body.title"),
            description:                                      Language.translate("components.icon.template.body.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentIconConfigs.keys.prop_icon.name]
        } ,
    });



    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentIconMethodsType , ComponentIconPropsType>({
        [ComponentIconConfigs.methods.CLICK.name]: {
            title:                                            Language.translate("components.icon.methods.fn_onClick.title"),
            description:                                      Language.translate("components.icon.methods.fn_onClick.description"),
            args: {
                [ComponentIconConfigs.methods.CLICK.componentArgs.ICON.name]:      this._COMPONENT_PATTERN[ComponentIconConfigs.keys.prop_icon.name]
            }
        } ,
        [ComponentIconConfigs.methods.HOVER.name]: {
            title:                                            Language.translate("components.icon.fn_onHover.title"),
            description:                                      Language.translate("components.icon.fn_onHover.description"),
            args: {
                [ComponentIconConfigs.methods.HOVER.componentArgs.ICON.name]:      this._COMPONENT_PATTERN[ComponentIconConfigs.keys.prop_icon.name]
            }
        } ,
        [ComponentIconConfigs.methods.BLUR.name]: {
            title:                                            Language.translate("components.icon.fn_onBlur.title"),
            description:                                      Language.translate("components.icon.fn_onBlur.description"),
            args: {
                [ComponentIconConfigs.methods.BLUR.componentArgs.ICON.name]:      this._COMPONENT_PATTERN[ComponentIconConfigs.keys.prop_icon.name]
            }
        }
    });



    /* ---------------------------------------------
        Example
     --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        return new ComponentIcon(
            <ComponentIconPropsType>{
                classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                styles: {
                    color: "red"
                }  ,

                prop_show :   true ,
                prop_icon:    TOOLS.ICON.icon_application({size: 80 }) ,
            } ,
            <ComponentIconMethodsType>{
                fn_onClickIcon: function (event, dataArgs:ComponentIcon_Methods_HOVER_DataArgs, componentArgs : ComponentIcon_Methods_CLICK_ComponentArgs){
                    this.set(ComponentIconProps.prop_icon ,  TOOLS.ICON.icon_qrcode({size: 80}) )
                    console.log(event , dataArgs , componentArgs)
                } ,
            }
        ).getElement();
    }

}


export class ComponentIcon extends ComponentIconBase {

    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentIconPropsType ,
        methods: ComponentIconMethodsType ,
        events = null
    ) {
        super("icon" , null);
        super.renderComponent(config , methods , events);
    }



    /* ---------------------------------------------
       TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentIconConfigs.schemas.ICON.name)
    }

    override renderManagerComponent(partName , attrsDefault , data , extra) :  ReactiveElement {
        switch (partName){
            case ComponentIconConfigs.schemas.ICON.name:
                return  this.templateFn_render_icon(attrsDefault , data , extra);
        }
    }

    
    private templateFn_render_icon(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {
            const prop_icon                = data[ComponentIconConfigs.keys.prop_icon.name];
            const prop_iconTitle           = data[ComponentIconConfigs.keys.prop_iconTitle.name];
            const prop_iconClass           = data[ComponentIconConfigs.keys.prop_iconClass.name];
            const prop_iconStyles          = data[ComponentIconConfigs.keys.prop_iconStyles.name];

            return ReactiveElement.part(  "i" ,{
                attrs: {
                    ...attrsDefault
                },
                attrsBind: {
                    title:  prop_iconTitle,
                } ,
                styles: {

                },
                stylesBind: {
                    prop_iconStyles
                },
                className: [

                ],
                classBind: [
                    prop_iconClass
                ],
                on: {

                    click: (event: Event) => {
                        const params : ComponentIcon_Methods_CLICK_DataArgs = {}
                        this.executeMethod(ComponentIconConfigs.methods.CLICK.name , event , params);
                    },

                    mouseenter: (event: Event) => {
                        const params : ComponentIcon_Methods_HOVER_DataArgs = {}
                        this.executeMethod(ComponentIconConfigs.methods.HOVER.name , event , params);
                    },

                    mouseleave: (event: Event) => {
                        const params : ComponentIcon_Methods_BLUR_DataArgs = {}
                        this.executeMethod(ComponentIconConfigs.methods.BLUR.name , event , params);
                    }
                },
                children: [
                    prop_icon
                ]
            });

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });

    }

}
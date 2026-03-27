import {
    ComponentBase,
    defineComponentMethods,
    defineComponentPatterns,
    defineComponentProps,
    defineComponentTemplate,
    extractPropNames,
    GOG_ComponentConfigBasicKey,
    GOG_ComponentConfigBasicPattern, GOG_ComponentConfigBasicProps,
    GOG_ExtractName,
    GOG_ExtractNameValue,
    GOG_SetValue,
    GOG_ValueOf
} from "../../core/ComponentBase";
import {ReactiveElement} from "../../core/ReactiveElement";

import {GOG_ComponentConfigBasicType} from "../../core/ComponentBase";
import {ComponentCallBackType} from "../../core/ComponentBase";
import {Language} from "../../core/Language";
import {
    Color,
    COLORS_GRAD,
    COLORS_MAIN,
    IconsType,
    SIZES,
    ToolsComponents_BorderRadius,
    ToolsComponents_BorderWidth
} from "../../utils/ToolsConsts";
import {
    ComponentMessagesPropsType,
    ComponentMessagesSchemaType,
    ComponentMessagesTemplatesType
} from "./ComponentMessages";




export const ComponentIconProps = {
    ...GOG_ComponentConfigBasicProps ,
    prop_icon :                          "prop_icon" ,
    prop_title :                         "prop_title" ,
    prop_iconClass :                     "prop_iconClass" ,
    prop_iconStyles :                    "prop_iconStyles" ,
} as const;



const ComponentIconConfigs  =  {
    keys: {
        ...GOG_ComponentConfigBasicKey ,
        ///----------------------
        [ComponentIconProps.prop_icon]: {
            name:               ComponentIconProps.prop_icon,
            value:              GOG_SetValue<IconsType|null>( null) ,
        } ,
        [ComponentIconProps.prop_title]: {
            name:               ComponentIconProps.prop_title,
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
        COMPONENT: {
            name:               "part_component"
        } ,
        STRUCTURE: {
            name:               "part_structure"
        } ,
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


export type ComponentIconPropsType =                      GOG_ComponentConfigBasicType & GOG_ExtractNameValue<typeof ComponentIconConfigs.keys>
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
            ...GOG_ComponentConfigBasicPattern ,
            [ComponentIconConfigs.keys.prop_icon.name]: {
                prop:                                             ComponentIconConfigs.keys.prop_icon.name,
                default:                                          ComponentIconConfigs.keys.prop_icon.value,
                title:                                            Language.translate("components.icon.prop_icon.title"),
                description:                                      Language.translate("components.icon.prop_icon.description"),
            } ,
            [ComponentIconConfigs.keys.prop_title.name]: {
                prop:                                             ComponentIconConfigs.keys.prop_title.name,
                default:                                          ComponentIconConfigs.keys.prop_title.value,
                title:                                            Language.translate("components.icon.prop_title.title"),
                description:                                      Language.translate("components.icon.prop_title.description"),
            } ,
            [ComponentIconConfigs.keys.prop_iconClass.name]: {
                prop:                                             ComponentIconConfigs.keys.prop_iconClass.name,
                default:                                          ComponentIconConfigs.keys.prop_iconClass.value,
                title:                                            Language.translate("components.icon.prop_iconClass.title"),
                description:                                      Language.translate("components.icon.prop_iconClass.description"),
            } ,
            [ComponentIconConfigs.keys.prop_iconStyles.name]: {
                prop:                                             ComponentIconConfigs.keys.prop_iconStyles.name,
                default:                                          ComponentIconConfigs.keys.prop_iconStyles.value,
                title:                                            Language.translate("components.icon.prop_iconStyles.title"),
                description:                                      Language.translate("components.icon.prop_iconStyles.description"),
            } ,
        }
    );



    /* ---------------------------------------------
        PROPERTYs Props
    --------------------------------------------- */
    _COMPONENT_PROPS = defineComponentProps<ComponentIconSchemaType  , ComponentIconPropsType>( {
        [ComponentIconConfigs.schemas.COMPONENT.name]: [

        ],
        [ComponentIconConfigs.schemas.STRUCTURE.name]: [

        ],
        [ComponentIconConfigs.schemas.ICON.name]: [
            this._COMPONENT_PATTERN[ComponentIconConfigs.keys.prop_icon.name] ,
            this._COMPONENT_PATTERN[ComponentIconConfigs.keys.prop_title.name] ,
            this._COMPONENT_PATTERN[ComponentIconConfigs.keys.prop_iconClass.name] ,
            this._COMPONENT_PATTERN[ComponentIconConfigs.keys.prop_iconStyles.name] ,
        ],
    });



    /* ---------------------------------------------
        PROPERTYs Pattern
     --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentIconTemplatesType , ComponentIconPropsType>({
        [ComponentIconConfigs.templates.BODY.name]: {
            title:                                            Language.translate("components.icon.template_body.title"),
            description:                                      Language.translate("components.icon.template_body.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentIconConfigs.keys.prop_icon.name]
        } ,
    });



    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentIconMethodsType , ComponentIconPropsType>({
        [ComponentIconConfigs.methods.CLICK.name]: {
            title:                                            Language.translate("components.icon.fn_onClick.title"),
            description:                                      Language.translate("components.icon.fn_onClick.description"),
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


}


export class ComponentIcon extends ComponentIconBase {

    constructor(
        config: ComponentIconPropsType ,
        methods: ComponentIconMethodsType
    ) {
        super("component-icon" , null);
        super.renderComponent(config , methods);
    }


    /* TEMPLATE */
    override template_render_structure() {
        const partName = ComponentIconConfigs.schemas.STRUCTURE.name ;

        return this.templateBasic_render_structure(
            ReactiveElement.section({
                children: [
                    this.#templateFn_render_icon(),
                ]
            })
        );

    }
    
    #templateFn_render_icon() {
        const partName = ComponentIconConfigs.schemas.ICON.name;
        const data = this.getPartProps(partName);

        if (data != null) {
            const prop_title     = data[ComponentIconConfigs.keys.prop_title.name];
            const prop_icon      = data[ComponentIconConfigs.keys.prop_icon.name];
            const prop_iconClass = data[ComponentIconConfigs.keys.prop_iconClass.name];
            const prop_iconStyles= data[ComponentIconConfigs.keys.prop_iconStyles.name];

            return ReactiveElement.i({
                attrs: {
                    "data-part-name":     partName,
                    "id":                `component-icon-icon-${this._COMPONENT_RANDOM_ID}`,
                },
                attrsBind: {
                    title:  prop_title,
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

        return ReactiveElement.section({
            attrs: {
                "data-part-name": partName
            }
        });

    }

}
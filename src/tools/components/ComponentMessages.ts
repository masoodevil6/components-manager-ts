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

import {ToolsCss} from "../../utils/ToolsCss";

import {ToolsComponents} from "./index";
import {ToolsIcons} from "../icons";

import {GOG_ComponentConfigBasicType} from "../../core/ComponentBase";
import {ComponentCallBackType} from "../../core/ComponentBase";
import {Language} from "../../core/Language";
import {AppConfig} from "../../core/AppConfig";
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
    ComponentRecyclerViewMethodsType,
    ComponentRecyclerViewPropsType,
    ComponentRecyclerViewSchemaType, ComponentRecyclerViewTemplatesType
} from "./ComponentRecyclerView";
import {ComponentIconMethodsType, ComponentIconPropsType} from "./ComponentIcon";




export const ComponentMessagesProps = {
    ...GOG_ComponentConfigBasicProps ,
    prop_type :                         "prop_type" ,
    prop_messages :                     "prop_messages" ,
    prop_borderWidth :                  "prop_borderWidth" ,
    prop_iconColor :                    "prop_iconColor" ,
    prop_borderColor :                  "prop_borderColor" ,
    prop_backgroundColor :              "prop_backgroundColor" ,
    prop_textColor :                    "prop_textColor" ,
} as const;



export enum ComponentMessages_MessageTypes{
    CUSTOM=    "custom",
    SUCCESS=   "success",
    WARNING=   "warning",
    ERROR=     "error"
}


const ComponentMessagesConfigs  =  {
    keys: {
        ...GOG_ComponentConfigBasicKey ,
        ///----------------------
        [ComponentMessagesProps.prop_type] : {
            name:               ComponentMessagesProps.prop_type,
            value:              GOG_SetValue<GOG_ValueOf<typeof ComponentMessages_MessageTypes>>(ComponentMessages_MessageTypes.SUCCESS),
        } ,
        [ComponentMessagesProps.prop_messages]: {
            name:               ComponentMessagesProps.prop_messages,
            value:              GOG_SetValue<string[]>([]) ,
        } ,
        [ComponentMessagesProps.prop_borderWidth]: {
            name:               ComponentMessagesProps.prop_borderWidth,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.XS),
        } ,
        [ComponentMessagesProps.prop_iconColor]:{
            name:               ComponentMessagesProps.prop_iconColor,
            value:              GOG_SetValue<typeof Color | null>(null),
        } ,
        [ComponentMessagesProps.prop_borderColor]:{
            name:               ComponentMessagesProps.prop_borderColor,
            value:              GOG_SetValue<typeof Color | null>(null),
        } ,
        [ComponentMessagesProps.prop_backgroundColor]:{
            name:               ComponentMessagesProps.prop_backgroundColor,
            value:              GOG_SetValue<typeof Color | null>(null),
        },
        [ComponentMessagesProps.prop_textColor]:{
            name:               ComponentMessagesProps.prop_textColor,
            value:              GOG_SetValue<typeof Color | null>(null),
        }
    } ,
    schemas:   {
        COMPONENT: {
            name:               "part_component"
        } ,
        STRUCTURE: {
            name:               "part_structure"
        } ,
        MESSAGE: {
            name:               "part_message"
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
        CLOSE_MESSAGE: {
            name:                      "fn_onCloseMessage" ,
            dataArgs: {
                MESSAGES_INDEX: {
                    name:              "index" ,
                    value:             GOG_SetValue<number>(0) ,
                } ,
                MESSAGE_TEXT: {
                    name:              "message" ,
                    value:             GOG_SetValue<string>("") ,
                },
                MESSAGE_TYPE : {
                    name:              "type" ,
                    value:              GOG_SetValue<GOG_ValueOf<typeof ComponentMessages_MessageTypes>>(ComponentMessages_MessageTypes.SUCCESS),
                }
            },
            componentArgs: {}
        },
    }
} as const


export type ComponentMessagesPropsType =             GOG_ComponentConfigBasicType & GOG_ExtractNameValue<typeof ComponentMessagesConfigs.keys>
export type ComponentMessagesSchemaType =            GOG_ExtractName<typeof ComponentMessagesConfigs.schemas>
export type ComponentMessagesTemplatesType =         GOG_ExtractName<typeof ComponentMessagesConfigs.templates>

export type ComponentMessages_Methods_CLOSE_MESSAGE_ComponentArgs =   GOG_ExtractName<typeof ComponentMessagesConfigs.methods.CLOSE_MESSAGE.componentArgs>
export type ComponentMessages_Methods_CLOSE_MESSAGE_DataArgs =        GOG_ExtractNameValue<typeof ComponentMessagesConfigs.methods.CLOSE_MESSAGE.dataArgs>

export type ComponentMessageMethodsType = {
    [ComponentMessagesConfigs.methods.CLOSE_MESSAGE.name]: ComponentCallBackType<ComponentMessages_Methods_CLOSE_MESSAGE_ComponentArgs , ComponentMessages_Methods_CLOSE_MESSAGE_DataArgs>
}







export class ComponentMessagesBase extends ComponentBase<
    ComponentMessagesPropsType ,
    ComponentMessagesSchemaType ,
    ComponentMessagesTemplatesType ,
    ComponentMessageMethodsType
    >{



    /* ---------------------------------------------
    PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN=  defineComponentPatterns<ComponentMessagesPropsType>(
        {
            ...GOG_ComponentConfigBasicPattern ,
            [ComponentMessagesConfigs.keys.prop_type.name]: {
                prop:                                             ComponentMessagesConfigs.keys.prop_type.name,
                default:                                          ComponentMessagesConfigs.keys.prop_type.value,
                title:                                            Language.translate("components.messages.prop_type.title"),
                description:                                      Language.translate("components.messages.prop_type.description"),
            } ,
            [ComponentMessagesConfigs.keys.prop_messages.name]: {
                prop:                                             ComponentMessagesConfigs.keys.prop_messages.name,
                default:                                          ComponentMessagesConfigs.keys.prop_messages.value,
                hasMultiTemplate:                                 false,
                title:                                            Language.translate("components.messages.prop_messages.title"),
                description:                                      Language.translate("components.messages.prop_messages.description"),
            } ,
            [ComponentMessagesConfigs.keys.prop_borderWidth.name]: {
                prop:                                             ComponentMessagesConfigs.keys.prop_borderWidth.name,
                default:                                          ComponentMessagesConfigs.keys.prop_borderWidth.value,
                hasMultiTemplate:                                 false,
                title:                                            Language.translate("components.messages.prop_borderWidth.title"),
                description:                                      Language.translate("components.messages.prop_borderWidth.description"),
            } ,
            [ComponentMessagesConfigs.keys.prop_iconColor.name]: {
                prop:                                             ComponentMessagesConfigs.keys.prop_iconColor.name,
                default:                                          ComponentMessagesConfigs.keys.prop_iconColor.value,
                title:                                            Language.translate("components.messages.prop_iconColor.title"),
                description:                                      Language.translate("components.messages.prop_iconColor.description"),
            } ,
            [ComponentMessagesConfigs.keys.prop_borderColor.name]: {
                prop:                                             ComponentMessagesConfigs.keys.prop_borderColor.name,
                default:                                          ComponentMessagesConfigs.keys.prop_borderColor.value,
                title:                                            Language.translate("components.messages.prop_borderColor.title"),
                description:                                      Language.translate("components.messages.prop_borderColor.description"),
            } ,
            [ComponentMessagesConfigs.keys.prop_backgroundColor.name]: {
                prop:                                             ComponentMessagesConfigs.keys.prop_backgroundColor.name,
                default:                                          ComponentMessagesConfigs.keys.prop_backgroundColor.value,
                title:                                            Language.translate("components.messages.prop_backgroundColor.title"),
                description:                                      Language.translate("components.messages.prop_backgroundColor.description"),
            } ,
            [ComponentMessagesConfigs.keys.prop_textColor.name]: {
                prop:                                             ComponentMessagesConfigs.keys.prop_textColor.name,
                default:                                          ComponentMessagesConfigs.keys.prop_textColor.value,
                title:                                            Language.translate("components.messages.prop_textColor.title"),
                description:                                      Language.translate("components.messages.prop_textColor.description"),
            } ,
        }
    );



    /* ---------------------------------------------
             PROPERTYs Props
      --------------------------------------------- */
    _COMPONENT_PROPS = defineComponentProps<ComponentMessagesSchemaType  , ComponentMessagesPropsType>( {
        [ComponentMessagesConfigs.schemas.COMPONENT.name]: [

        ],
        [ComponentMessagesConfigs.schemas.STRUCTURE.name]: [

        ],
        [ComponentMessagesConfigs.schemas.MESSAGE.name]: [
            this._COMPONENT_PATTERN[ComponentMessagesConfigs.keys.prop_type.name]  ,
            this._COMPONENT_PATTERN[ComponentMessagesConfigs.keys.prop_messages.name]  ,
            this._COMPONENT_PATTERN[ComponentMessagesConfigs.keys.prop_borderWidth.name]  ,
            this._COMPONENT_PATTERN[ComponentMessagesConfigs.keys.prop_backgroundColor.name]  ,
            this._COMPONENT_PATTERN[ComponentMessagesConfigs.keys.prop_textColor.name]  ,
            this._COMPONENT_PATTERN[ComponentMessagesConfigs.keys.prop_borderColor.name]  ,
        ],
        [ComponentMessagesConfigs.schemas.ICON.name]: [
            this._COMPONENT_PATTERN[ComponentMessagesConfigs.keys.prop_messages.name]  ,
            this._COMPONENT_PATTERN[ComponentMessagesConfigs.keys.prop_iconColor.name]  ,
            this._COMPONENT_PATTERN[ComponentMessagesConfigs.keys.prop_type.name]  ,
        ],
    });



    /* ---------------------------------------------
    PROPERTYs Methods
     --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentMessageMethodsType , ComponentMessagesPropsType>({
        [ComponentMessagesConfigs.methods.CLOSE_MESSAGE.name]: {
            title:                                            Language.translate("components.messages.CLOSE_MESSAGE.title"),
            description:                                      Language.translate("components.messages.CLOSE_MESSAGE.description"),
            args: {}
        }
    });



    /* ---------------------------------------------
        PROPERTYs Pattern
     --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentMessagesTemplatesType , ComponentMessagesPropsType>({
        [ComponentMessagesConfigs.templates.BODY.name]: {
            title:                                            Language.translate("components.messages.BODY.title"),
            description:                                      Language.translate("components.messages.BODY.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentMessagesConfigs.keys.prop_messages]
        } ,
    });



}
export class ComponentMessages extends ComponentMessagesBase{

    /* ---------------------------------------------
       SETUP
   --------------------------------------------- */
    constructor(
        config: ComponentMessagesPropsType ,
        methods: ComponentMessageMethodsType
    ) {
        super("component-message" , null);
        super.renderComponent(config , methods);
    }


    /* ---------------------------------------------
       TEMPLATEs
    --------------------------------------------- */
    override template_render_structure() {
        const partName = ComponentMessagesConfigs.schemas.STRUCTURE.name;

        return this.templateBasic_render_structure(
            ReactiveElement.section({
                children: [
                    this.#template_render_messages() ,
                ]
            })
        );
    }

    #template_render_messages() {
        const partName = ComponentMessagesConfigs.schemas.MESSAGE.name;
        const data = this.getPartProps(partName)

        if (data != null){

            const prop_messages     =   data[ComponentMessagesConfigs.keys.prop_messages.name] ;
            const prop_borderWidth  =   data[ComponentMessagesConfigs.keys.prop_borderWidth.name] ;
            const prop_type         =   data[ComponentMessagesConfigs.keys.prop_type.name] ;

            let msgBackgroundColor = {};
            msgBackgroundColor[ComponentMessages_MessageTypes.SUCCESS] =      "var(--successColor4)";
            msgBackgroundColor[ComponentMessages_MessageTypes.ERROR] =        "var(--errorColor4)";
            msgBackgroundColor[ComponentMessages_MessageTypes.WARNING] =      "var(--warningColor4)";
            msgBackgroundColor[ComponentMessages_MessageTypes.CUSTOM] =       data[ComponentMessagesConfigs.keys.prop_backgroundColor.name];

            let msgColor = {};
            msgColor[ComponentMessages_MessageTypes.SUCCESS] =               "var(--successColor1)";
            msgColor[ComponentMessages_MessageTypes.ERROR] =                 "var(--errorColor1)";
            msgColor[ComponentMessages_MessageTypes.WARNING] =               "var(--warningColor1)";
            msgColor[ComponentMessages_MessageTypes.CUSTOM] =                data[ComponentMessagesConfigs.keys.prop_textColor.name];

            let msgBorderColor = {};
            msgBorderColor[ComponentMessages_MessageTypes.SUCCESS] =         "var(--successColor1)";
            msgBorderColor[ComponentMessages_MessageTypes.ERROR] =           "var(--errorColor1)";
            msgBorderColor[ComponentMessages_MessageTypes.WARNING] =         "var(--warningColor1)";
            msgBorderColor[ComponentMessages_MessageTypes.CUSTOM] =          data[ComponentMessagesConfigs.keys.prop_borderColor.name];

            const elFontSize = ToolsCss.getFontSize(AppConfig.get("sizeName"));

            let messagesEl = [];
            const messagesList = prop_messages.get()
            if (messagesList && Array.isArray(messagesList)){
                for (let i = 0; i < messagesList.length; i++) {
                    const msg = messagesList[i];
                    messagesEl.push(
                        ReactiveElement.section(
                            {
                                attrs: {
                                    "id":      `component-messages-item-${this._COMPONENT_RANDOM_ID}-${i}`,
                                    "role" :  "alert"
                                },
                                styles: {} ,
                                className: [] ,
                                children: (el) => [
                                    ReactiveElement.div(
                                        {
                                            attrs: {
                                                "id":  `component-messages-item-${this._COMPONENT_RANDOM_ID}-body-${i}`,
                                            },
                                            styles: {
                                                fontSize :        `${elFontSize}pt` ,
                                            } ,
                                            stylesBind: {
                                                borderStyle:      prop_borderWidth.map(
                                                    v=>{
                                                        if ((typeof v == "string" && ToolsCss.checkExistSizeSelected(v)) || (typeof v == "number")){
                                                            return "solid";
                                                        }
                                                        return null;
                                                    }
                                                ) ,
                                                borderWidth:      prop_borderWidth.map(
                                                    v=>{
                                                        if (typeof v == "string" && ToolsCss.checkExistSizeSelected(v)){
                                                            return ToolsComponents_BorderWidth[v];
                                                        }
                                                        else if (typeof v == "number"){
                                                            return v + "px";
                                                        }
                                                        return null;
                                                    }
                                                ) ,
                                                backgroundColor:  prop_type.mapList(msgBackgroundColor) ,
                                                borderColor:      prop_type.mapList(msgBorderColor) ,
                                                color:            prop_type.mapList(msgColor) ,
                                            } ,
                                            className: [
                                                "mb-2" , "mt-2" , "rounded" , "shadow-sm"
                                            ] ,
                                            children: [
                                                ReactiveElement.div(
                                                    {
                                                        attrs: {
                                                            "id":  `component-messages-item-${this._COMPONENT_RANDOM_ID}-body-message-${i}`,
                                                        },
                                                        className: [
                                                            "alert" ,
                                                        ] ,

                                                        children: [
                                                            ReactiveElement.b(
                                                                {
                                                                    children:[
                                                                        msg
                                                                    ] ,
                                                                }
                                                            ),
                                                            this.#componentFn_render_icon(el , i , msg)
                                                        ]
                                                    })
                                            ]
                                        })
                                ]
                            })
                    )
                }
            }



            return ReactiveElement.section(
                {
                    attrs: {
                        "id":  `component-messages-${this._COMPONENT_RANDOM_ID}`,
                    },
                    children: [
                        ...messagesEl
                    ]
                });
        }

        return ReactiveElement.section({
            attrs: {
                "data-part-name":  partName
            }
        });
    }

    #componentFn_render_icon (el , index , message) {
        const partName = ComponentMessagesConfigs.schemas.ICON.name;
        const data = this.getPartProps(partName)

        if (data != null){
            const prop_type    =    data[ComponentMessagesConfigs.keys.prop_type.name];

            let prop_colorIcon = {};
            prop_colorIcon[ComponentMessages_MessageTypes.SUCCESS] =   "var(--successColor1)";
            prop_colorIcon[ComponentMessages_MessageTypes.ERROR] =     "var(--errorColor1)";
            prop_colorIcon[ComponentMessages_MessageTypes.WARNING] =   "var(--warningColor1)";
            prop_colorIcon[ComponentMessages_MessageTypes.CUSTOM] =    data[ComponentMessagesConfigs.keys.prop_textColor.name];

            const elHeight = ToolsCss.getIconSize(AppConfig.get("sizeNameSmall"));

            return new ToolsComponents.ComponentIcon(
                <ComponentIconPropsType>{
                    classList:  [
                        "position-absolute"
                    ]  ,
                    styles:     {
                        "top" :                "5px" ,
                        "inset-inline-end" :   "5px"
                    },

                    prop_iconClass : [
                        "mx-2"
                    ] ,
                    prop_iconStyles : {
                        "cursor" : "pointer"
                    } ,
                    prop_icon: ToolsIcons.icon_close({size: elHeight , primaryColor: prop_type.mapList(prop_colorIcon) }) ,
                },
                <ComponentIconMethodsType>{
                    fn_onClickIcon: function (event , args)  {
                        el.remove()
                        const params: ComponentMessages_Methods_CLOSE_MESSAGE_DataArgs = {
                            [ComponentMessagesConfigs.methods.CLOSE_MESSAGE.dataArgs.MESSAGES_INDEX.name]:  index ,
                            [ComponentMessagesConfigs.methods.CLOSE_MESSAGE.dataArgs.MESSAGE_TEXT.name]:    message ,
                            [ComponentMessagesConfigs.methods.CLOSE_MESSAGE.dataArgs.MESSAGE_TYPE.name]:    prop_type.get()
                        }
                        this.executeMethod(ComponentMessagesConfigs.methods.CLOSE_MESSAGE.name  , event , params);
                    }.bind(this) ,
                }
            ).getSchema();

        }

        return ReactiveElement.section({
            attrs: {
                "data-part-name":  partName
            }
        });
    }

}

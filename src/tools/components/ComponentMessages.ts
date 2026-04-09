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
    GOG_ComponentBasicConfigs_component_keys,
    GOG_ComponentBasicConfigs_component_parts,
    GOG_ComponentBasicConfigs_component_Pattern, GOG_ComponentBasicConfigs_component_Schema,
    GOG_ComponentBasicConfigs_structure_keys,
    GOG_ComponentBasicConfigs_structure_parts,
    GOG_ComponentBasicConfigs_structure_Pattern, GOG_ComponentBasicConfigs_structure_Schema,
    GOG_ComponentBasicProps_component,
    GOG_ComponentBasicProps_structure
} from "../../core/component/SetupComponent";
import {ToolsIcons} from "../icons";
import {
    ComponentIconMethodsType,
    ComponentIconPropsType
} from "./ComponentIcon";




export const ComponentMessagesProps = {
    ... GOG_ComponentBasicProps_component,
    ... GOG_ComponentBasicProps_structure,
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
        ...GOG_ComponentBasicConfigs_component_keys ,
        ...GOG_ComponentBasicConfigs_structure_keys ,
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
            value:              GOG_SetValue<SizesType| number>(SIZES.XS),
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
        ...GOG_ComponentBasicConfigs_component_parts ,
        ...GOG_ComponentBasicConfigs_structure_parts ,
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


export type ComponentMessagesPropsType =             GOG_ExtractNameValue<typeof ComponentMessagesConfigs.keys>
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
            ...GOG_ComponentBasicConfigs_component_Pattern(this) ,
            ...GOG_ComponentBasicConfigs_structure_Pattern(this) ,
            [ComponentMessagesConfigs.keys.prop_type.name]: {
                prop:                                             ComponentMessagesConfigs.keys.prop_type.name,
                default:                                          ComponentMessagesConfigs.keys.prop_type.value,
                title:                                            Language.translate("components.messages.props.prop_type.title"),
                description:                                      Language.translate("components.messages.props.prop_type.description"),
            } ,
            [ComponentMessagesConfigs.keys.prop_messages.name]: {
                prop:                                             ComponentMessagesConfigs.keys.prop_messages.name,
                default:                                          ComponentMessagesConfigs.keys.prop_messages.value,
                hasMultiTemplate:                                 false,
                title:                                            Language.translate("components.messages.props.prop_messages.title"),
                description:                                      Language.translate("components.messages.props.prop_messages.description"),
            } ,
            [ComponentMessagesConfigs.keys.prop_borderWidth.name]: {
                prop:                                             ComponentMessagesConfigs.keys.prop_borderWidth.name,
                default:                                          ComponentMessagesConfigs.keys.prop_borderWidth.value,
                hasMultiTemplate:                                 false,
                title:                                            Language.translate("components.messages.props.prop_borderWidth.title"),
                description:                                      Language.translate("components.messages.props.prop_borderWidth.description"),
            } ,
            [ComponentMessagesConfigs.keys.prop_iconColor.name]: {
                prop:                                             ComponentMessagesConfigs.keys.prop_iconColor.name,
                default:                                          ComponentMessagesConfigs.keys.prop_iconColor.value,
                title:                                            Language.translate("components.messages.props.prop_iconColor.title"),
                description:                                      Language.translate("components.messages.props.prop_iconColor.description"),
            } ,
            [ComponentMessagesConfigs.keys.prop_borderColor.name]: {
                prop:                                             ComponentMessagesConfigs.keys.prop_borderColor.name,
                default:                                          ComponentMessagesConfigs.keys.prop_borderColor.value,
                title:                                            Language.translate("components.messages.props.prop_borderColor.title"),
                description:                                      Language.translate("components.messages.props.prop_borderColor.description"),
            } ,
            [ComponentMessagesConfigs.keys.prop_backgroundColor.name]: {
                prop:                                             ComponentMessagesConfigs.keys.prop_backgroundColor.name,
                default:                                          ComponentMessagesConfigs.keys.prop_backgroundColor.value,
                title:                                            Language.translate("components.messages.props.prop_backgroundColor.title"),
                description:                                      Language.translate("components.messages.props.prop_backgroundColor.description"),
            } ,
            [ComponentMessagesConfigs.keys.prop_textColor.name]: {
                prop:                                             ComponentMessagesConfigs.keys.prop_textColor.name,
                default:                                          ComponentMessagesConfigs.keys.prop_textColor.value,
                title:                                            Language.translate("components.messages.props.prop_textColor.title"),
                description:                                      Language.translate("components.messages.props.prop_textColor.description"),
            } ,
        }
    );



    /* ---------------------------------------------
             PROPERTYs Props
      --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentMessagesSchemaType  , ComponentMessagesPropsType>( {
        ...GOG_ComponentBasicConfigs_component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_structure_Schema(this) ,
        [ComponentMessagesConfigs.schemas.MESSAGE.name]: {
            part:               ComponentMessagesConfigs.schemas.MESSAGE.name ,
            title:              Language.translate("components.messages.schema.messages.title") ,
            description:        Language.translate("components.messages.schema.messages.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentMessagesConfigs.keys.prop_type.name]  ,
                this._COMPONENT_PATTERN[ComponentMessagesConfigs.keys.prop_messages.name]  ,
                this._COMPONENT_PATTERN[ComponentMessagesConfigs.keys.prop_borderWidth.name]  ,
                this._COMPONENT_PATTERN[ComponentMessagesConfigs.keys.prop_backgroundColor.name]  ,
                this._COMPONENT_PATTERN[ComponentMessagesConfigs.keys.prop_textColor.name]  ,
                this._COMPONENT_PATTERN[ComponentMessagesConfigs.keys.prop_borderColor.name]  ,
            ]
        } ,
        [ComponentMessagesConfigs.schemas.ICON.name]: {
            part:               ComponentMessagesConfigs.schemas.ICON.name ,
            title:              Language.translate("components.messages.schema.icon.title") ,
            description:        Language.translate("components.messages.schema.icon.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentMessagesConfigs.keys.prop_messages.name]  ,
                this._COMPONENT_PATTERN[ComponentMessagesConfigs.keys.prop_iconColor.name]  ,
                this._COMPONENT_PATTERN[ComponentMessagesConfigs.keys.prop_type.name]  ,
            ]
        } ,

    });


    /* ---------------------------------------------
        PROPERTYs template
     --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentMessagesTemplatesType , ComponentMessagesPropsType>({
        [ComponentMessagesConfigs.templates.BODY.name]: {
            title:                                            Language.translate("components.messages.template.body.title"),
            description:                                      Language.translate("components.messages.template.body.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentMessagesConfigs.keys.prop_messages.name]
        } ,
    });


    /* ---------------------------------------------
    PROPERTYs Methods
     --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentMessageMethodsType , ComponentMessagesPropsType>({
        [ComponentMessagesConfigs.methods.CLOSE_MESSAGE.name]: {
            title:                                            Language.translate("components.messages.methods.fn_onCloseMessage.title"),
            description:                                      Language.translate("components.messages.methods.fn_onCloseMessage.description"),
            args: {}
        }
    });


    /* ---------------------------------------------
        Example
     --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {

        return new ComponentMessages(
            <ComponentMessagesPropsType> {
                classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                styles: {
                    color: "red"
                }  ,
                prop_show : true ,
                prop_type: "warning",
                prop_messages: ["error1" , "error2" , "error3"] ,
            } ,
            <ComponentMessageMethodsType>{
                fn_onCloseMessage: (event, dataArgs: ComponentMessages_Methods_CLOSE_MESSAGE_DataArgs, componentArgs: ComponentMessages_Methods_CLOSE_MESSAGE_ComponentArgs) => {
                    console.log(event , dataArgs.index , dataArgs.message , dataArgs.type)
                }
            }
        ).getElement();
    }


}
export class ComponentMessages extends ComponentMessagesBase{

    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentMessagesPropsType ,
        methods: ComponentMessageMethodsType
    ) {
        super("message" , null);
        super.renderComponent(config , methods);
    }


    /* ---------------------------------------------
       TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentMessagesConfigs.schemas.MESSAGE.name)
    }

    override renderManagerComponent(partName , attrsDefault, data , extra) : ReactiveElement {
        switch (partName){
            case ComponentMessagesConfigs.schemas.MESSAGE.name:
                return  this.template_render_messages(attrsDefault , data , extra);
            case ComponentMessagesConfigs.schemas.ICON.name:
                return  this.componentFn_render_icon(attrsDefault , data , extra);
        }
    }

    private template_render_messages(attrsDefault , data , extra) : ReactiveElement {

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

                                                            this.executeSchemaPart(ComponentMessagesConfigs.schemas.ICON.name , {el , index: i , message: msg})
                                                        ]
                                                    })
                                            ]
                                        })
                                ]
                            })
                    )
                }
            }



           return  ReactiveElement.part(  "section" ,
                {
                    attrs: {
                        ...attrsDefault
                    },
                    children: [
                        ...messagesEl
                    ]
                });
        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }

    private componentFn_render_icon (attrsDefault , data , extra) : ReactiveElement {
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
                    prop_icon: ToolsIcons.icon_close({size: elHeight , primaryColor: prop_type.mapList(prop_colorIcon) })
                },
                <ComponentIconMethodsType>{
                    fn_onClickIcon: function (event , args)  {
                        if (extra && extra.hasOwnProperty("el")){
                            extra.el.remove()
                            const params: ComponentMessages_Methods_CLOSE_MESSAGE_DataArgs = {
                                [ComponentMessagesConfigs.methods.CLOSE_MESSAGE.dataArgs.MESSAGES_INDEX.name]:  extra?.index ?? null,
                                [ComponentMessagesConfigs.methods.CLOSE_MESSAGE.dataArgs.MESSAGE_TEXT.name]:    extra?.message ?? null ,
                                [ComponentMessagesConfigs.methods.CLOSE_MESSAGE.dataArgs.MESSAGE_TYPE.name]:    prop_type.get()
                            }
                            this.executeMethod(ComponentMessagesConfigs.methods.CLOSE_MESSAGE.name  , event , params);
                        }
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

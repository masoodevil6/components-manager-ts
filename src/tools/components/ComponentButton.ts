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

import {GOG_ComponentConfigBasicType} from "../../core/ComponentBase";
import {ComponentCallBackType} from "../../core/ComponentBase";
import {Language} from "../../core/Language";
import {AppConfig} from "../../core/AppConfig";
import {
    Color, IconsType,
} from "../../utils/ToolsConsts";
import {ComponentMessages_MessageTypes} from "./ComponentMessages";
import {
    ComponentIcon_Methods_BLUR_ComponentArgs,
    ComponentIcon_Methods_BLUR_DataArgs,
    ComponentIcon_Methods_CLICK_ComponentArgs,
    ComponentIcon_Methods_CLICK_DataArgs,
    ComponentIcon_Methods_HOVER_ComponentArgs,
    ComponentIcon_Methods_HOVER_DataArgs, ComponentIconMethodsType,
    ComponentIconPropsType,
    ComponentIconSchemaType, ComponentIconTemplatesType
} from "./ComponentIcon";





export const ComponentButtonProps = {
    ...GOG_ComponentConfigBasicProps ,
    prop_title :                           "prop_title" ,
    prop_type :                            "prop_type" ,
    prop_btnType :                         "prop_btnType" ,
    prop_btnClass :                        "prop_btnClass" ,
    prop_btnStyles :                       "prop_btnStyles" ,
    prop_btnBackgroundColor :              "prop_btnBackgroundColor" ,
    prop_btnBackgroundColor_hover :        "prop_btnBackgroundColor_hover" ,
    prop_btnColor :                        "prop_btnColor" ,
} as const;




export enum ComponentButton_Types{
    CUSTOM=    "custom",
    SUBMIT=    "submit",
    CANCEL=    "cancel",
    BACK=      "back"
}

export enum ComponentButton_ButtonTypes{
    SUBMIT=    "submit",
    BUTTON=    "button",
}



const ComponentButtonConfigs  =  {
    keys: {
        ...GOG_ComponentConfigBasicKey ,
        ///----------------------
        [ComponentButtonProps.prop_title]: {
            name:               ComponentButtonProps.prop_title,
            value:              GOG_SetValue<string>( "") ,
        } ,
        [ComponentButtonProps.prop_type]: {
            name:               ComponentButtonProps.prop_type,
            value:              GOG_SetValue<GOG_ValueOf<typeof ComponentButton_Types>>(ComponentButton_Types.SUBMIT),
        } ,
        [ComponentButtonProps.prop_btnType]: {
            name:               ComponentButtonProps.prop_btnType,
            value:              GOG_SetValue<GOG_ValueOf<typeof ComponentButton_ButtonTypes>>(ComponentButton_ButtonTypes.BUTTON),
        } ,
        [ComponentButtonProps.prop_btnClass]: {
            name:               ComponentButtonProps.prop_btnClass,
            value:              GOG_SetValue<string[]>( ["w-100"]) ,
        } ,
        [ComponentButtonProps.prop_btnStyles]: {
            name:               ComponentButtonProps.prop_btnStyles,
            value:              GOG_SetValue<Record<string, string>>( {}) ,
        } ,
        [ComponentButtonProps.prop_btnBackgroundColor]: {
            name:               ComponentButtonProps.prop_btnBackgroundColor,
            value:              GOG_SetValue<typeof Color | null>(null),
        } ,
        [ComponentButtonProps.prop_btnBackgroundColor_hover]: {
            name:               ComponentButtonProps.prop_btnBackgroundColor_hover,
            value:              GOG_SetValue<typeof Color | null>(null),
        } ,
        [ComponentButtonProps.prop_btnColor]: {
            name:               ComponentButtonProps.prop_btnColor,
            value:              GOG_SetValue<typeof Color | null>(null),
        } ,
    } ,
    schemas:   {
        COMPONENT: {
            name:               "part_component"
        } ,
        STRUCTURE: {
            name:               "part_structure"
        } ,
        BUTTON: {
            name:               "part_button"
        } ,
    } ,
    templates: {
        BODY: {
            name:                "body"
        } ,
    } ,
    methods: {
        CLICK: {
            name:                      "fn_onClickButton" ,
            dataArgs: {},
            componentArgs: {}
        },
    }
} as const



export type ComponentButtonPropsType =                      GOG_ComponentConfigBasicType & GOG_ExtractNameValue<typeof ComponentButtonConfigs.keys>
export type ComponentButtonSchemaType =                     GOG_ExtractName<typeof ComponentButtonConfigs.schemas>
export type ComponentButtonTemplatesType =                  GOG_ExtractName<typeof ComponentButtonConfigs.templates>

export type ComponentButton_Methods_CLICK_ComponentArgs =   GOG_ExtractName<typeof ComponentButtonConfigs.methods.CLICK.componentArgs>
export type ComponentButton_Methods_CLICK_DataArgs =        GOG_ExtractNameValue<typeof ComponentButtonConfigs.methods.CLICK.dataArgs>

export type ComponentButtonMethodsType = {
    [ComponentButtonConfigs.methods.CLICK.name]: ComponentCallBackType<ComponentButton_Methods_CLICK_ComponentArgs , ComponentButton_Methods_CLICK_DataArgs>
}




export class ComponentButtonBase extends ComponentBase<
    ComponentButtonPropsType ,
    ComponentButtonSchemaType ,
    ComponentButtonTemplatesType ,
    ComponentButtonMethodsType
    >{



    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN=  defineComponentPatterns<ComponentButtonPropsType>(
        {
            ...GOG_ComponentConfigBasicPattern ,
            [ComponentButtonConfigs.keys.prop_title.name]: {
                prop:                                             ComponentButtonConfigs.keys.prop_title.name,
                default:                                          ComponentButtonConfigs.keys.prop_title.value,
                title:                                            Language.translate("components.button.prop_title.title"),
                description:                                      Language.translate("components.button.prop_title.description"),
            } ,
            [ComponentButtonConfigs.keys.prop_type.name]: {
                prop:                                             ComponentButtonConfigs.keys.prop_type.name,
                default:                                          ComponentButtonConfigs.keys.prop_type.value,
                title:                                            Language.translate("components.button.prop_type.title"),
                description:                                      Language.translate("components.button.prop_type.description"),
            } ,
            [ComponentButtonConfigs.keys.prop_btnType.name]: {
                prop:                                             ComponentButtonConfigs.keys.prop_btnType.name,
                default:                                          ComponentButtonConfigs.keys.prop_btnType.value,
                title:                                            Language.translate("components.button.prop_btnType.title"),
                description:                                      Language.translate("components.button.prop_btnType.description"),
            } ,
            [ComponentButtonConfigs.keys.prop_btnClass.name]: {
                prop:                                             ComponentButtonConfigs.keys.prop_btnClass.name,
                default:                                          ComponentButtonConfigs.keys.prop_btnClass.value,
                title:                                            Language.translate("components.button.prop_btnClass.title"),
                description:                                      Language.translate("components.button.prop_btnClass.description"),
            } ,
            [ComponentButtonConfigs.keys.prop_btnStyles.name]: {
                prop:                                             ComponentButtonConfigs.keys.prop_btnStyles.name,
                default:                                          ComponentButtonConfigs.keys.prop_btnStyles.value,
                title:                                            Language.translate("components.button.prop_btnStyles.title"),
                description:                                      Language.translate("components.button.prop_btnStyles.description"),
            } ,
            [ComponentButtonConfigs.keys.prop_btnBackgroundColor.name]: {
                prop:                                             ComponentButtonConfigs.keys.prop_btnBackgroundColor.name,
                default:                                          ComponentButtonConfigs.keys.prop_btnBackgroundColor.value,
                title:                                            Language.translate("components.button.prop_btnBackgroundColor.title"),
                description:                                      Language.translate("components.button.prop_btnBackgroundColor.description"),
            } ,
            [ComponentButtonConfigs.keys.prop_btnBackgroundColor_hover.name]: {
                prop:                                             ComponentButtonConfigs.keys.prop_btnBackgroundColor_hover.name,
                default:                                          ComponentButtonConfigs.keys.prop_btnBackgroundColor_hover.value,
                title:                                            Language.translate("components.button.prop_btnBackgroundColor_hover.title"),
                description:                                      Language.translate("components.button.prop_btnBackgroundColor_hover.description"),
            } ,
            [ComponentButtonConfigs.keys.prop_btnColor.name]: {
                prop:                                             ComponentButtonConfigs.keys.prop_btnColor.name,
                default:                                          ComponentButtonConfigs.keys.prop_btnColor.value,
                title:                                            Language.translate("components.button.prop_btnColor.title"),
                description:                                      Language.translate("components.button.prop_btnColor.description"),
            } ,
        }
    );


    /* ---------------------------------------------
        PROPERTYs Props
    --------------------------------------------- */
    _COMPONENT_PROPS = defineComponentProps<ComponentButtonSchemaType  , ComponentButtonPropsType>( {
        [ComponentButtonConfigs.schemas.COMPONENT.name]: [

        ],
        [ComponentButtonConfigs.schemas.STRUCTURE.name]: [

        ],
        [ComponentButtonConfigs.schemas.BUTTON.name]: [
            this._COMPONENT_PATTERN[ComponentButtonConfigs.keys.prop_title.name] ,
            this._COMPONENT_PATTERN[ComponentButtonConfigs.keys.prop_type.name] ,
            this._COMPONENT_PATTERN[ComponentButtonConfigs.keys.prop_btnType.name] ,
            this._COMPONENT_PATTERN[ComponentButtonConfigs.keys.prop_btnClass.name] ,
            this._COMPONENT_PATTERN[ComponentButtonConfigs.keys.prop_btnStyles.name] ,
            this._COMPONENT_PATTERN[ComponentButtonConfigs.keys.prop_btnBackgroundColor.name] ,
            this._COMPONENT_PATTERN[ComponentButtonConfigs.keys.prop_btnBackgroundColor_hover.name] ,
            this._COMPONENT_PATTERN[ComponentButtonConfigs.keys.prop_btnColor.name] ,
        ],
    });

    /* ---------------------------------------------
            PROPERTYs Pattern
         --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentButtonTemplatesType , ComponentButtonPropsType>({
        [ComponentButtonConfigs.templates.BODY.name]: {
            title:                                            Language.translate("components.button.template_body.title"),
            description:                                      Language.translate("components.button.template_body.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentButtonConfigs.keys.prop_title.name]
        } ,
    });



    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentButtonMethodsType , ComponentButtonPropsType>({
        [ComponentButtonConfigs.methods.CLICK.name]: {
            title:                                            Language.translate("components.button.fn_onClick.title"),
            description:                                      Language.translate("components.button.fn_onClick.description"),
            args: {}
        } ,
    });

}

export class ComponentButton extends ComponentButtonBase{

    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentButtonPropsType ,
        methods : ComponentButtonMethodsType
    ) {
        super("component-button" , null);
        super.renderComponent(config , methods);
    }


    /* ---------------------------------------------
       TEMPLATEs
    --------------------------------------------- */
    override template_render_structure() {
        const partName =  ComponentButtonConfigs.schemas.STRUCTURE.name;
        return this.templateBasic_render_structure(
            ReactiveElement.section({
                children: [
                    this.#template_render_button() ,
                ]
            })
        );
    }

    #template_render_button() {
        const partName =  ComponentButtonConfigs.schemas.BUTTON.name;
        const data = this.getPartProps(partName)

        if (data != null){

            const prop_type        =   data[ComponentButtonConfigs.keys.prop_type.name];
            const prop_btnType     =   data[ComponentButtonConfigs.keys.prop_btnType.name];
            const prop_title       =   data[ComponentButtonConfigs.keys.prop_title.name];

            const prop_btnClass    =   data[ComponentButtonConfigs.keys.prop_btnClass.name];
            const prop_btnStyles   =   data[ComponentButtonConfigs.keys.prop_btnStyles.name];

            let btnBackgroundColor = {};
            btnBackgroundColor[ComponentButton_Types.SUBMIT] =          "var(--primaryColor1)";
            btnBackgroundColor[ComponentButton_Types.BACK] =            "var(--secondaryColor1)";
            btnBackgroundColor[ComponentButton_Types.CANCEL] =          "var(--errorColor1)";
            btnBackgroundColor[ComponentButton_Types.CUSTOM] =          data[ComponentButtonConfigs.keys.prop_btnBackgroundColor.name];

            let btnBackgroundColor_hover = {};
            btnBackgroundColor_hover[ComponentButton_Types.SUBMIT] =   "var(--primaryColor2)";
            btnBackgroundColor_hover[ComponentButton_Types.BACK] =     "var(--secondaryColor2)";
            btnBackgroundColor_hover[ComponentButton_Types.CANCEL] =   "var(--errorColor2)";
            btnBackgroundColor_hover[ComponentButton_Types.CUSTOM] =   data[ComponentButtonConfigs.keys.prop_btnBackgroundColor_hover.name];

            let btnColor = {};
            btnColor[ComponentButton_Types.SUBMIT] =                  "var(--shanColor1)";
            btnColor[ComponentButton_Types.BACK] =                    "var(--darkColor1)";
            btnColor[ComponentButton_Types.CANCEL] =                  "var(--shanColor1)";
            btnColor[ComponentButton_Types.CUSTOM] =                  data[ComponentButtonConfigs.keys.prop_btnColor.name];

            const btnHeight   = ToolsCss.getHeightSize(AppConfig.get("sizeName"));
            const btnFontSize = ToolsCss.getFontSize(AppConfig.get("sizeName"));

            return ReactiveElement.section(
                {
                    attrs: {
                        "data-part-name":     partName,
                        "id":                `component-buttn-form-${this._COMPONENT_RANDOM_ID}`,
                    },
                    attrsBind: {
                        "type":               prop_btnType
                    },
                    children: [
                        ReactiveElement.button(
                            {
                                attrs: {
                                    "id":     `component-button-${this._COMPONENT_RANDOM_ID}`,
                                },
                                className: [
                                    "shadow-sm" , "border-0" , "rounded" , "py-1"
                                ] ,
                                classBind: [
                                    prop_btnClass
                                ] ,
                                styles: {
                                    //height :            `${btnHeight}px` ,
                                    lineHeight :        `${btnHeight}px` ,
                                    fontSize :          `${btnFontSize}pt` ,
                                },
                                stylesBind: (el) => ({
                                    backgroundColor: el.hover.mapList({
                                        true:           prop_type.mapList(btnBackgroundColor_hover),
                                        false:          prop_type.mapList(btnBackgroundColor)
                                    }) ,
                                    transition: el.hover.mapList({
                                        true:           "background-color 1000ms ease" ,
                                        false:          "background-color 200ms ease"
                                    }) ,
                                    color:              prop_type.mapList(btnColor) ,
                                    prop_btnStyles ,
                                }) ,
                                children: [
                                    ReactiveElement.b(
                                        {
                                            children: [
                                                prop_title
                                            ]
                                        }
                                    )
                                ] ,
                                on: {
                                    click: (event) => {
                                        const params: ComponentButton_Methods_CLICK_DataArgs = {}
                                        this.executeMethod(ComponentButtonConfigs.methods.CLICK.name , event , params);
                                    },
                                }
                            }
                        )
                    ]
                });
        }

        return ReactiveElement.section({
            attrs: {
                "data-part-name":  partName
            }
        });
    }



    /* ---------------------------------------------
       FUNCTIONs
    --------------------------------------------- */


}
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
import {ComponentIconMethodsType, ComponentIconPropsType} from "./ComponentIcon";






export const ComponentButtonProps = {
    ... GOG_ComponentBasicProps_component,
    ... GOG_ComponentBasicProps_structure,
    prop_title :                           "prop_title" ,
    prop_type :                            "prop_type" ,

    prop_btnType :                         "prop_btnType" ,
    prop_btnClass :                        "prop_btnClass" ,
    prop_btnStyles :                       "prop_btnStyles" ,
    prop_btnBackgroundColor :              "prop_btnBackgroundColor" ,
    prop_btnBackgroundColor_hover :        "prop_btnBackgroundColor_hover" ,
    prop_btnColor :                        "prop_btnColor" ,

    prop_btnIcon :                         "prop_btnIcon" ,
    prop_btnIconStyles :                   "prop_btnIconStyles" ,
    prop_btnIconClass :                    "prop_btnIconClass" ,
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
        ...GOG_ComponentBasicConfigs_component_keys ,
        ...GOG_ComponentBasicConfigs_structure_keys ,
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
            value:              GOG_SetValue<Color | null>(null),
        } ,
        [ComponentButtonProps.prop_btnBackgroundColor_hover]: {
            name:               ComponentButtonProps.prop_btnBackgroundColor_hover,
            value:              GOG_SetValue<Color | null>(null),
        } ,
        [ComponentButtonProps.prop_btnColor]: {
            name:               ComponentButtonProps.prop_btnColor,
            value:              GOG_SetValue<Color | null>(null),
        } ,

        [ComponentButtonProps.prop_btnIcon]: {
            name:               ComponentButtonProps.prop_btnIcon,
            value:              GOG_SetValue<IconsType|null>(null),
        } ,
        [ComponentButtonProps.prop_btnIconStyles]: {
            name:               ComponentButtonProps.prop_btnIconStyles,
            value:              GOG_SetValue<Record<string, string>>( {}) ,
        } ,
        [ComponentButtonProps.prop_btnIconClass]: {
            name:               ComponentButtonProps.prop_btnIconClass,
            value:              GOG_SetValue<string[]>( ["w-100"]) ,
        } ,

    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_component_parts ,
        ...GOG_ComponentBasicConfigs_structure_parts ,
        BUTTON: {
            name:               "part_button"
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
            name:                      "fn_onClickButton" ,
            dataArgs: {},
            componentArgs: {}
        },
    }
} as const



export type ComponentButtonPropsType =                      GOG_ExtractNameValue<typeof ComponentButtonConfigs.keys>
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
            ...GOG_ComponentBasicConfigs_component_Pattern(this) ,
            ...GOG_ComponentBasicConfigs_structure_Pattern(this) ,
            [ComponentButtonConfigs.keys.prop_title.name]: {
                prop:                                             ComponentButtonConfigs.keys.prop_title.name,
                default:                                          ComponentButtonConfigs.keys.prop_title.value,
                title:                                            Language.translate("components.button.props.prop_title.title"),
                description:                                      Language.translate("components.button.props.prop_title.description"),
            } ,
            [ComponentButtonConfigs.keys.prop_type.name]: {
                prop:                                             ComponentButtonConfigs.keys.prop_type.name,
                default:                                          ComponentButtonConfigs.keys.prop_type.value,
                title:                                            Language.translate("components.button.props.prop_type.title"),
                description:                                      Language.translate("components.button.props.prop_type.description"),
            } ,

            [ComponentButtonConfigs.keys.prop_btnType.name]: {
                prop:                                             ComponentButtonConfigs.keys.prop_btnType.name,
                default:                                          ComponentButtonConfigs.keys.prop_btnType.value,
                title:                                            Language.translate("components.button.props.prop_btnType.title"),
                description:                                      Language.translate("components.button.props.prop_btnType.description"),
            } ,
            [ComponentButtonConfigs.keys.prop_btnClass.name]: {
                prop:                                             ComponentButtonConfigs.keys.prop_btnClass.name,
                default:                                          ComponentButtonConfigs.keys.prop_btnClass.value,
                title:                                            Language.translate("components.button.props.prop_btnClass.title"),
                description:                                      Language.translate("components.button.props.prop_btnClass.description"),
            } ,
            [ComponentButtonConfigs.keys.prop_btnStyles.name]: {
                prop:                                             ComponentButtonConfigs.keys.prop_btnStyles.name,
                default:                                          ComponentButtonConfigs.keys.prop_btnStyles.value,
                title:                                            Language.translate("components.button.props.prop_btnStyles.title"),
                description:                                      Language.translate("components.button.props.prop_btnStyles.description"),
            } ,
            [ComponentButtonConfigs.keys.prop_btnBackgroundColor.name]: {
                prop:                                             ComponentButtonConfigs.keys.prop_btnBackgroundColor.name,
                default:                                          ComponentButtonConfigs.keys.prop_btnBackgroundColor.value,
                title:                                            Language.translate("components.button.props.prop_btnBackgroundColor.title"),
                description:                                      Language.translate("components.button.props.prop_btnBackgroundColor.description"),
            } ,
            [ComponentButtonConfigs.keys.prop_btnBackgroundColor_hover.name]: {
                prop:                                             ComponentButtonConfigs.keys.prop_btnBackgroundColor_hover.name,
                default:                                          ComponentButtonConfigs.keys.prop_btnBackgroundColor_hover.value,
                title:                                            Language.translate("components.button.props.prop_btnBackgroundColor_hover.title"),
                description:                                      Language.translate("components.button.props.prop_btnBackgroundColor_hover.description"),
            } ,
            [ComponentButtonConfigs.keys.prop_btnColor.name]: {
                prop:                                             ComponentButtonConfigs.keys.prop_btnColor.name,
                default:                                          ComponentButtonConfigs.keys.prop_btnColor.value,
                title:                                            Language.translate("components.button.props.prop_btnColor.title"),
                description:                                      Language.translate("components.button.props.prop_btnColor.description"),
            } ,

            [ComponentButtonConfigs.keys.prop_btnIcon.name]: {
                prop:                                             ComponentButtonConfigs.keys.prop_btnIcon.name,
                default:                                          ComponentButtonConfigs.keys.prop_btnIcon.value,
                title:                                            Language.translate("components.button.props.prop_btnIcon.title"),
                description:                                      Language.translate("components.button.props.prop_btnIcon.description"),
            } ,
            [ComponentButtonConfigs.keys.prop_btnIconStyles.name]: {
                prop:                                             ComponentButtonConfigs.keys.prop_btnIconStyles.name,
                default:                                          ComponentButtonConfigs.keys.prop_btnIconStyles.value,
                title:                                            Language.translate("components.button.props.prop_btnIconStyles.title"),
                description:                                      Language.translate("components.button.props.prop_btnIconStyles.description"),
            } ,
            [ComponentButtonConfigs.keys.prop_btnIconClass.name]: {
                prop:                                             ComponentButtonConfigs.keys.prop_btnIconClass.name,
                default:                                          ComponentButtonConfigs.keys.prop_btnIconClass.value,
                title:                                            Language.translate("components.button.props.prop_btnIconClass.title"),
                description:                                      Language.translate("components.button.props.prop_btnIconClass.description"),
            } ,
        }
    );

    /* ---------------------------------------------
        PROPERTYs Props
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentButtonSchemaType  , ComponentButtonPropsType>( {
        ...GOG_ComponentBasicConfigs_component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_structure_Schema(this) ,
        [ComponentButtonConfigs.schemas.BUTTON.name]: {
            part:               ComponentButtonConfigs.schemas.BUTTON.name ,
            title:              Language.translate("components.button.schema.button.title") ,
            description:        Language.translate("components.button.schema.button.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentButtonConfigs.keys.prop_title.name] ,
                this._COMPONENT_PATTERN[ComponentButtonConfigs.keys.prop_type.name] ,
                this._COMPONENT_PATTERN[ComponentButtonConfigs.keys.prop_btnType.name] ,
                this._COMPONENT_PATTERN[ComponentButtonConfigs.keys.prop_btnClass.name] ,
                this._COMPONENT_PATTERN[ComponentButtonConfigs.keys.prop_btnStyles.name] ,
                this._COMPONENT_PATTERN[ComponentButtonConfigs.keys.prop_btnBackgroundColor.name] ,
                this._COMPONENT_PATTERN[ComponentButtonConfigs.keys.prop_btnBackgroundColor_hover.name] ,
                this._COMPONENT_PATTERN[ComponentButtonConfigs.keys.prop_btnColor.name] ,
            ]
        } ,
        [ComponentButtonConfigs.schemas.ICON.name]: {
            part:               ComponentButtonConfigs.schemas.ICON.name ,
            title:              Language.translate("components.button.schema.icon.title") ,
            description:        Language.translate("components.button.schema.icon.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentButtonConfigs.keys.prop_btnIcon.name] ,
                this._COMPONENT_PATTERN[ComponentButtonConfigs.keys.prop_btnIconStyles.name] ,
                this._COMPONENT_PATTERN[ComponentButtonConfigs.keys.prop_btnIconClass.name] ,
            ]
        } ,
    });

    /* ---------------------------------------------
            PROPERTYs Pattern
         --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentButtonTemplatesType , ComponentButtonPropsType>({
        [ComponentButtonConfigs.templates.BODY.name]: {
            title:                                            Language.translate("components.button.template.body.title"),
            description:                                      Language.translate("components.button.template.body.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentButtonConfigs.keys.prop_title.name]
        } ,
    });



    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentButtonMethodsType , ComponentButtonPropsType>({
        [ComponentButtonConfigs.methods.CLICK.name]: {
            title:                                            Language.translate("components.button.methods.fn_onClick.title"),
            description:                                      Language.translate("components.button.methods.fn_onClick.description"),
            args: {}
        } ,
    });


    /* ---------------------------------------------
        Example
     --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        return new ComponentButton(
            <ComponentButtonPropsType>{
                classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                prop_title: "asd" ,
                prop_type: "submit" ,
                prop_btnIcon: ToolsIcons.icon_reload({size: SIZES.M , primaryColor:Color(COLORS_MAIN.SHAN ,COLORS_GRAD.GRADE_1), secondaryColor:Color(COLORS_MAIN.INFO ,COLORS_GRAD.GRADE_4)})
            } ,
            <ComponentButtonMethodsType>{
                fn_onClickButton: function (event, dataArgs : ComponentButton_Methods_CLICK_DataArgs, componentArgs: ComponentButton_Methods_CLICK_ComponentArgs) {
                    alert("asd");
                }
            }
        ).getElement();
    }

}

export class ComponentButton extends ComponentButtonBase{

    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentButtonPropsType ,
        methods : ComponentButtonMethodsType
    ) {
        super("button" , null);
        super.renderComponent(config , methods);
    }


    /* ---------------------------------------------
       TEMPLATEs
    --------------------------------------------- */


    override renderContentComponent() {
        return this.executeSchemaPart(ComponentButtonConfigs.schemas.BUTTON.name)
    }

    override renderManagerComponent(partName , attrsDefault , data , extra) :  ReactiveElement {
        switch (partName){
            case ComponentButtonConfigs.schemas.BUTTON.name:
                return  this.template_render_button(attrsDefault , data , extra);
            case ComponentButtonConfigs.schemas.ICON.name:
                return  this.template_render_buttonIcon(attrsDefault , data , extra);
        }
    }

    private template_render_button(attrsDefault , data , extra) : ReactiveElement{

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

            return ReactiveElement.part(  "section" ,
                {
                    attrs: {
                        ...attrsDefault
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
                                                prop_title ,
                                                this.executeSchemaPart(ComponentButtonConfigs.schemas.ICON.name)
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

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }

    private template_render_buttonIcon(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_btnIcon        =   data[ComponentButtonConfigs.keys.prop_btnIcon.name];
            const prop_btnIconStyles  =   data[ComponentButtonConfigs.keys.prop_btnIconStyles.name];
            const prop_btnIconClass   =   data[ComponentButtonConfigs.keys.prop_btnIconClass.name];

            return new ToolsComponents.ComponentIcon(
                <ComponentIconPropsType>{
                    classList: ["d-inline-block" , "mx-2"]  ,
                    styles: {}  ,

                    prop_iconClass :    prop_btnIconClass ,
                    prop_iconStyles :   prop_btnIconStyles ,
                    prop_icon:          prop_btnIcon ,
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



    /* ---------------------------------------------
       FUNCTIONs
    --------------------------------------------- */


}
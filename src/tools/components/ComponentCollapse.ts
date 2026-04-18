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
    ComponentBorder_Methods_CLICK_BORDER_ComponentArgs,
    ComponentBorder_Methods_CLICK_BORDER_DataArgs,
    ComponentBorderMethodsType,
    ComponentBorderProps,
    ComponentBorderPropsType
} from "./ComponentBorder";
import {ComponentLabel_Methods_CLICK_DataArgs, ComponentLabelProps} from "./ComponentLabel";
import {ComponentIconMethodsType, ComponentIconProps, ComponentIconPropsType} from "./ComponentIcon";






export const ComponentCollapseProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    prop_borderBackground :              "prop_borderBackground" ,
    prop_borderClass :                   "prop_borderClass" ,
    prop_borderStyles :                  "prop_borderStyles" ,
    prop_borderColor :                   "prop_borderColor" ,
    prop_borderWidth :                   "prop_borderWidth" ,
    prop_borderRadius :                  "prop_borderRadius" ,
    prop_borderMinWidth :                "prop_borderMinWidth" ,

    prop_icon :                          "prop_icon" ,
    prop_iconClass :                     "prop_iconClass" ,
    prop_iconStyles :                    "prop_iconStyles" ,

    prop_title :                         "prop_title" ,
    prop_titleStyles :                   "prop_titleStyles" ,
    prop_titleClass :                    "prop_titleClass" ,
    prop_titleColor :                    "prop_titleColor" ,

    prop_arrowStyles :                   "prop_arrowStyles" ,
    prop_arrowClass :                    "prop_arrowClass" ,

    prop_body :                          "prop_body" ,
    prop_bodyStyles :                    "prop_bodyStyles" ,
    prop_bodyClass :                     "prop_bodyClass" ,
    prop_bodyIsOpen :                    "prop_bodyIsOpen" ,
    prop_bodyBorderColor :               "prop_bodyBorderColor" ,
    prop_bodyBorderWidth :               "prop_bodyBorderWidth" ,
    prop_bodyBorderRadius :              "prop_bodyBorderRadius" ,

} as const;



const ComponentCollapseConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys ,
        ///----------------------
        [ComponentCollapseProps.prop_borderBackground]: {
            name:               ComponentCollapseProps.prop_borderBackground ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1)),
        } ,
        [ComponentCollapseProps.prop_borderClass]: {
            name:               ComponentCollapseProps.prop_borderClass ,
            value:              GOG_SetValue<string[]>( [] ) ,
        } ,
        [ComponentCollapseProps.prop_borderStyles]: {
            name:               ComponentCollapseProps.prop_borderStyles ,
            value:              GOG_SetValue<Record<string, string>>( {}) ,
        } ,
        [ComponentCollapseProps.prop_borderColor]: {
            name:               ComponentCollapseProps.prop_borderColor ,
            value:              GOG_SetValue<Color | null>(null) ,
        } ,
        [ComponentCollapseProps.prop_borderWidth]: {
            name:               ComponentCollapseProps.prop_borderWidth ,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M),
        } ,
        [ComponentCollapseProps.prop_borderRadius]: {
            name:               ComponentCollapseProps.prop_borderRadius ,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M),
        } ,
        [ComponentCollapseProps.prop_borderMinWidth]: {
            name:               ComponentCollapseProps.prop_borderMinWidth ,
            value:              GOG_SetValue<SizeUnit | SizeCalc |null>(null),
        } ,

        [ComponentCollapseProps.prop_icon]: {
            name:               ComponentCollapseProps.prop_icon,
            value:              GOG_SetValue<IconsType |null>(null) ,
        } ,
        [ComponentCollapseProps.prop_iconClass]: {
            name:               ComponentCollapseProps.prop_iconClass,
            value:              GOG_SetValue<string[]>( []) ,
        } ,
        [ComponentCollapseProps.prop_iconStyles]: {
            name:               ComponentCollapseProps.prop_iconStyles,
            value:              GOG_SetValue<Record<string, string>>({}) ,
        } ,

        [ComponentCollapseProps.prop_title]: {
            name:               ComponentCollapseProps.prop_title,
            value:              GOG_SetValue<string|null>(null) ,
        } ,
        [ComponentCollapseProps.prop_titleClass]: {
            name:               ComponentCollapseProps.prop_titleClass,
            value:              GOG_SetValue<string[]>( []) ,
        } ,
        [ComponentCollapseProps.prop_titleStyles]: {
            name:               ComponentCollapseProps.prop_titleStyles,
            value:              GOG_SetValue<Record<string, string>>({}) ,
        } ,
        [ComponentCollapseProps.prop_titleColor]: {
            name:               ComponentCollapseProps.prop_titleColor,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1 )),
        } ,

        [ComponentCollapseProps.prop_arrowClass]: {
            name:               ComponentCollapseProps.prop_arrowClass,
            value:              GOG_SetValue<string[]>( []) ,
        } ,
        [ComponentCollapseProps.prop_arrowStyles]: {
            name:               ComponentCollapseProps.prop_arrowStyles,
            value:              GOG_SetValue<Record<string, string>>({}) ,
        } ,

        [ComponentCollapseProps.prop_body]: {
            name:               ComponentCollapseProps.prop_body,
            value:              GOG_SetValue<ReactiveElement|string|null>( null) ,
        } ,
        [ComponentCollapseProps.prop_bodyClass]: {
            name:               ComponentCollapseProps.prop_bodyClass,
            value:              GOG_SetValue<string[]>( []) ,
        } ,
        [ComponentCollapseProps.prop_bodyStyles]: {
            name:               ComponentCollapseProps.prop_bodyStyles,
            value:              GOG_SetValue<Record<string, string>>({}) ,
        } ,
        [ComponentCollapseProps.prop_bodyIsOpen]: {
            name:               ComponentCollapseProps.prop_bodyIsOpen,
            value:              GOG_SetValue<boolean>(false) ,
        } ,
        [ComponentCollapseProps.prop_bodyBorderColor]: {
            name:               ComponentCollapseProps.prop_bodyBorderColor ,
            value:              GOG_SetValue<Color | null>(null) ,
        } ,
        [ComponentCollapseProps.prop_bodyBorderWidth]: {
            name:               ComponentCollapseProps.prop_bodyBorderWidth ,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.S),
        } ,
        [ComponentCollapseProps.prop_bodyBorderRadius]: {
            name:               ComponentCollapseProps.prop_bodyBorderRadius ,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.S),
        } ,
    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_Component_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts ,
        FORM: {
            name:                         "part_form"
        } ,
        FORM_BORDER: {
            name:                         "part_form_border"
        } ,
        FORM_BORDER_CONTENT: {
            name:                         "part_form_border_content"
        } ,
        FORM_BORDER_CONTENT_ICON: {
            name:                         "part_form_border_content_icon"
        } ,
        FORM_BORDER_CONTENT_TITLE: {
            name:                         "part_form_border_content_title"
        } ,
        FORM_BORDER_CONTENT_ARROW: {
            name:                         "part_form_border_content_arrow"
        } ,
        FORM_BODY: {
            name:                         "part_form_body"
        } ,
    } ,
    templates: {
        TITLE: {
            name:                         "title"
        } ,
        BODY: {
            name:                         "body"
        } ,
    } ,
    methods: {
        CLICK: {
            name:                         "fn_onClickCollapse" ,
            dataArgs: {},
            componentArgs: {
                IS_OPEN : {
                    name:                 "isOpen"
                }
            }
        },
    }
} as const


export type ComponentCollapsePropsType =                      GOG_ExtractNameValue<typeof ComponentCollapseConfigs.keys>
export type ComponentCollapseSchemaType =                     GOG_ExtractName<typeof ComponentCollapseConfigs.schemas>
export type ComponentCollapseTemplatesType =                  GOG_ExtractName<typeof ComponentCollapseConfigs.templates>

export type ComponentCollapse_Methods_CLICK_ComponentArgs =   GOG_ExtractName<typeof ComponentCollapseConfigs.methods.CLICK.componentArgs>
export type ComponentCollapse_Methods_CLICK_DataArgs =        GOG_ExtractNameValue<typeof ComponentCollapseConfigs.methods.CLICK.dataArgs>

export type ComponentCollapseMethodsType = {
    [ComponentCollapseConfigs.methods.CLICK.name]: ComponentCallBackType<ComponentCollapse_Methods_CLICK_ComponentArgs , ComponentCollapse_Methods_CLICK_DataArgs>
}



export class ComponentCollapseBase extends ComponentBase<
    ComponentCollapsePropsType ,
    ComponentCollapseSchemaType ,
    ComponentCollapseTemplatesType ,
    ComponentCollapseMethodsType
    >{


    /* ---------------------------------------------
       PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN=  defineComponentPatterns<ComponentCollapsePropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this),
            [ComponentCollapseConfigs.keys.prop_borderBackground.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_borderBackground.name,
                default:                                          ComponentCollapseConfigs.keys.prop_borderBackground.value,
                title:                                            Language.translate("components.collapse.prop.prop_borderBackground.title"),
                description:                                      Language.translate("components.collapse.prop.prop_borderBackground.description"),
            } ,
            [ComponentCollapseConfigs.keys.prop_borderClass.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_borderClass.name,
                default:                                          ComponentCollapseConfigs.keys.prop_borderClass.value,
                title:                                            Language.translate("components.collapse.prop.prop_borderClass.title"),
                description:                                      Language.translate("components.collapse.prop.prop_borderClass.description"),
            } ,
            [ComponentCollapseConfigs.keys.prop_borderStyles.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_borderStyles.name,
                default:                                          ComponentCollapseConfigs.keys.prop_borderStyles.value,
                title:                                            Language.translate("components.collapse.prop.prop_borderStyles.title"),
                description:                                      Language.translate("components.collapse.prop.prop_borderStyles.description"),
            } ,
            [ComponentCollapseConfigs.keys.prop_borderColor.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_borderColor.name,
                default:                                          ComponentCollapseConfigs.keys.prop_borderColor.value,
                title:                                            Language.translate("components.collapse.prop.prop_borderColor.title"),
                description:                                      Language.translate("components.collapse.prop.prop_borderColor.description"),
            } ,
            [ComponentCollapseConfigs.keys.prop_borderWidth.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_borderWidth.name,
                default:                                          ComponentCollapseConfigs.keys.prop_borderWidth.value,
                title:                                            Language.translate("components.collapse.prop.prop_borderWidth.title"),
                description:                                      Language.translate("components.collapse.prop.prop_borderWidth.description"),
            } ,
            [ComponentCollapseConfigs.keys.prop_borderRadius.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_borderRadius.name,
                default:                                          ComponentCollapseConfigs.keys.prop_borderRadius.value,
                title:                                            Language.translate("components.collapse.prop.prop_borderRadius.title"),
                description:                                      Language.translate("components.collapse.prop.prop_borderRadius.description"),
            } ,
            [ComponentCollapseConfigs.keys.prop_borderMinWidth.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_borderMinWidth.name,
                default:                                          ComponentCollapseConfigs.keys.prop_borderMinWidth.value,
                title:                                            Language.translate("components.collapse.prop.prop_borderMinWidth.title"),
                description:                                      Language.translate("components.collapse.prop.prop_borderMinWidth.description"),
            } ,


            [ComponentCollapseConfigs.keys.prop_icon.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_icon.name,
                default:                                          ComponentCollapseConfigs.keys.prop_icon.value,
                title:                                            Language.translate("components.collapse.prop.prop_icon.title"),
                description:                                      Language.translate("components.collapse.prop.prop_icon.description"),
            } ,
            [ComponentCollapseConfigs.keys.prop_iconClass.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_iconClass.name,
                default:                                          ComponentCollapseConfigs.keys.prop_iconClass.value,
                title:                                            Language.translate("components.collapse.prop.prop_iconClass.title"),
                description:                                      Language.translate("components.collapse.prop.prop_iconClass.description"),
            } ,
            [ComponentCollapseConfigs.keys.prop_iconStyles.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_iconStyles.name,
                default:                                          ComponentCollapseConfigs.keys.prop_iconStyles.value,
                title:                                            Language.translate("components.collapse.prop.prop_iconStyles.title"),
                description:                                      Language.translate("components.collapse.prop.prop_iconStyles.description"),
            } ,


            [ComponentCollapseConfigs.keys.prop_title.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_title.name,
                default:                                          ComponentCollapseConfigs.keys.prop_title.value,
                title:                                            Language.translate("components.collapse.prop.prop_title.title"),
                description:                                      Language.translate("components.collapse.prop.prop_title.description"),
            } ,
            [ComponentCollapseConfigs.keys.prop_titleStyles.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_titleStyles.name,
                default:                                          ComponentCollapseConfigs.keys.prop_titleStyles.value,
                title:                                            Language.translate("components.collapse.prop.prop_titleStyles.title"),
                description:                                      Language.translate("components.collapse.prop.prop_titleStyles.description"),
            } ,
            [ComponentCollapseConfigs.keys.prop_titleClass.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_titleClass.name,
                default:                                          ComponentCollapseConfigs.keys.prop_titleClass.value,
                title:                                            Language.translate("components.collapse.prop.prop_titleClass.title"),
                description:                                      Language.translate("components.collapse.prop.prop_titleClass.description"),
            } ,
            [ComponentCollapseConfigs.keys.prop_titleColor.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_titleColor.name,
                default:                                          ComponentCollapseConfigs.keys.prop_titleColor.value,
                title:                                            Language.translate("components.collapse.prop.prop_titleColor.title"),
                description:                                      Language.translate("components.collapse.prop.prop_titleColor.description"),
            } ,


            [ComponentCollapseConfigs.keys.prop_arrowClass.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_arrowClass.name,
                default:                                          ComponentCollapseConfigs.keys.prop_arrowClass.value,
                title:                                            Language.translate("components.collapse.prop.prop_arrowClass.title"),
                description:                                      Language.translate("components.collapse.prop.prop_arrowClass.description"),
            } ,
            [ComponentCollapseConfigs.keys.prop_arrowStyles.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_arrowStyles.name,
                default:                                          ComponentCollapseConfigs.keys.prop_arrowStyles.value,
                title:                                            Language.translate("components.collapse.prop.prop_arrowStyles.title"),
                description:                                      Language.translate("components.collapse.prop.prop_arrowStyles.description"),
            } ,


            [ComponentCollapseConfigs.keys.prop_body.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_body.name,
                default:                                          ComponentCollapseConfigs.keys.prop_body.value,
                title:                                            Language.translate("components.collapse.prop.prop_body.title"),
                description:                                      Language.translate("components.collapse.prop.prop_body.description"),
            } ,
            [ComponentCollapseConfigs.keys.prop_bodyStyles.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_bodyStyles.name,
                default:                                          ComponentCollapseConfigs.keys.prop_bodyStyles.value,
                title:                                            Language.translate("components.collapse.prop.prop_bodyStyles.title"),
                description:                                      Language.translate("components.collapse.prop.prop_bodyStyles.description"),
            } ,
            [ComponentCollapseConfigs.keys.prop_bodyClass.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_bodyClass.name,
                default:                                          ComponentCollapseConfigs.keys.prop_bodyClass.value,
                title:                                            Language.translate("components.collapse.prop.prop_bodyClass.title"),
                description:                                      Language.translate("components.collapse.prop.prop_bodyClass.description"),
            } ,
            [ComponentCollapseConfigs.keys.prop_bodyIsOpen.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_bodyIsOpen.name,
                default:                                          ComponentCollapseConfigs.keys.prop_bodyIsOpen.value,
                title:                                            Language.translate("components.collapse.prop.prop_bodyIsOpen.title"),
                description:                                      Language.translate("components.collapse.prop.prop_bodyIsOpen.description"),
            } ,
            [ComponentCollapseConfigs.keys.prop_bodyBorderColor.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_bodyBorderColor.name,
                default:                                          ComponentCollapseConfigs.keys.prop_bodyBorderColor.value,
                title:                                            Language.translate("components.collapse.prop.prop_bodyBorderColor.title"),
                description:                                      Language.translate("components.collapse.prop.prop_bodyBorderColor.description"),
            } ,
            [ComponentCollapseConfigs.keys.prop_bodyBorderWidth.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_bodyBorderWidth.name,
                default:                                          ComponentCollapseConfigs.keys.prop_bodyBorderWidth.value,
                title:                                            Language.translate("components.collapse.prop.prop_bodyBorderWidth.title"),
                description:                                      Language.translate("components.collapse.prop.prop_bodyBorderWidth.description"),
            } ,
            [ComponentCollapseConfigs.keys.prop_bodyBorderRadius.name]: {
                prop:                                             ComponentCollapseConfigs.keys.prop_bodyBorderRadius.name,
                default:                                          ComponentCollapseConfigs.keys.prop_bodyBorderRadius.value,
                title:                                            Language.translate("components.collapse.prop.prop_bodyBorderRadius.title"),
                description:                                      Language.translate("components.collapse.prop.prop_bodyBorderRadius.description"),
            } ,


        }
    );

    /* ---------------------------------------------
        PROPERTYs Props
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentCollapseSchemaType  , ComponentCollapsePropsType>( {
        ...GOG_ComponentBasicConfigs_Component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this) ,
        [ComponentCollapseConfigs.schemas.FORM.name]: {
            part:               ComponentCollapseConfigs.schemas.FORM.name ,
            title:              Language.translate("components.collapse.schema.form.title") ,
            description:        Language.translate("components.collapse.schema.form.description") ,
            props: []
        } ,
        [ComponentCollapseConfigs.schemas.FORM_BORDER.name]: {
            part:               ComponentCollapseConfigs.schemas.FORM_BORDER.name ,
            title:              Language.translate("components.collapse.schema.form_border.title") ,
            description:        Language.translate("components.collapse.schema.form_border.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_borderBackground.name] ,
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_borderClass.name] ,
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_borderStyles.name] ,
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_borderColor.name] ,
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_borderWidth.name] ,
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_borderRadius.name] ,
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_borderMinWidth.name] ,
            ]
        } ,
        [ComponentCollapseConfigs.schemas.FORM_BORDER_CONTENT.name]: {
            part:               ComponentCollapseConfigs.schemas.FORM_BORDER_CONTENT.name ,
            title:              Language.translate("components.collapse.schema.form_border_content.title") ,
            description:        Language.translate("components.collapse.schema.form_border_content.description") ,
            props: []
        } ,
        [ComponentCollapseConfigs.schemas.FORM_BORDER_CONTENT_ICON.name]: {
            part:               ComponentCollapseConfigs.schemas.FORM_BORDER_CONTENT_ICON.name ,
            title:              Language.translate("components.collapse.schema.form_border_content_icon.title") ,
            description:        Language.translate("components.collapse.schema.form_border_content_icon.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_icon.name] ,
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_iconClass.name] ,
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_iconStyles.name] ,
            ]
        } ,
        [ComponentCollapseConfigs.schemas.FORM_BORDER_CONTENT_TITLE.name]: {
            part:               ComponentCollapseConfigs.schemas.FORM_BORDER_CONTENT_TITLE.name ,
            title:              Language.translate("components.collapse.schema.form_border_content_title.title") ,
            description:        Language.translate("components.collapse.schema.form_border_content_title.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_title.name] ,
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_titleStyles.name] ,
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_titleClass.name] ,
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_titleColor.name] ,
            ]
        } ,
        [ComponentCollapseConfigs.schemas.FORM_BORDER_CONTENT_ARROW.name]: {
            part:               ComponentCollapseConfigs.schemas.FORM_BORDER_CONTENT_ARROW.name ,
            title:              Language.translate("components.collapse.schema.form_border_content_arrow.title") ,
            description:        Language.translate("components.collapse.schema.form_border_content_arrow.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_arrowClass.name] ,
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_arrowStyles.name] ,
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_bodyIsOpen.name] ,
            ]
        } ,
        [ComponentCollapseConfigs.schemas.FORM_BODY.name]: {
            part:               ComponentCollapseConfigs.schemas.FORM_BODY.name ,
            title:              Language.translate("components.collapse.schema.form_body.title") ,
            description:        Language.translate("components.collapse.schema.form_body.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_body.name] ,
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_bodyStyles.name] ,
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_bodyClass.name] ,
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_bodyIsOpen.name] ,
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_bodyBorderColor.name] ,
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_bodyBorderWidth.name] ,
                this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_bodyBorderRadius.name] ,
            ]
        } ,
    })


    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentCollapseTemplatesType , ComponentCollapsePropsType>({
        [ComponentCollapseConfigs.templates.TITLE.name]: {
            title:                                            Language.translate("components.collapse.template.title.title"),
            description:                                      Language.translate("components.collapse.template.title.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_borderBackground.name]
        } ,
        [ComponentCollapseConfigs.templates.BODY.name]: {
            title:                                            Language.translate("components.collapse.template.body.title"),
            description:                                      Language.translate("components.collapse.template.body.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_borderBackground.name]
        } ,
    });



    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentCollapseMethodsType , ComponentCollapsePropsType>({
        [ComponentCollapseConfigs.methods.CLICK.name]: {
            title:                                            Language.translate("components.button.methods.fn_onClickCollapse.title"),
            description:                                      Language.translate("components.button.methods.fn_onClickCollapse.description"),
            args: {
                [ComponentCollapseConfigs.methods.CLICK.componentArgs.IS_OPEN.name] : this._COMPONENT_PATTERN[ComponentCollapseConfigs.keys.prop_bodyIsOpen.name]
            }
        } ,
    });



    /* ---------------------------------------------
        Example
     --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        return new ComponentCollapse(
            <ComponentCollapsePropsType>{
                classList:     ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                prop_title:    "asd" ,
                prop_body:      ReactiveElement.section({
                    className:[] ,
                    children: [
                        "BODY"
                    ]
                }) ,

                prop_icon:     TOOLS.ICON.icon_search({size: SIZES.L , primaryColor: Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1) , secondaryColor: Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) }) ,

            } ,
            <ComponentCollapseMethodsType>{
                fn_onClickCollapse: function (event, dataArgs : ComponentCollapse_Methods_CLICK_DataArgs, componentArgs: ComponentCollapse_Methods_CLICK_ComponentArgs) {
                    console.log("collapse" , dataArgs , componentArgs);
                }
            }
        ).getElement();
    }


}

export class ComponentCollapse extends ComponentCollapseBase{



    /* ---------------------------------------------
      SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentCollapsePropsType ,
        methods : ComponentCollapseMethodsType
    ) {
        super("collapse" , null);
        super.renderComponent(config , methods);
    }


    /* ---------------------------------------------
       TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentCollapseConfigs.schemas.FORM.name)
    }

    override renderManagerComponent(partName , attrsDefault , data , extra) :  ReactiveElement {
        switch (partName){
            case ComponentCollapseConfigs.schemas.FORM.name:
                return  this.template_render_form(attrsDefault , data , extra);
            case ComponentCollapseConfigs.schemas.FORM_BORDER.name:
                return  this.template_render_formBorder(attrsDefault , data , extra);
            case ComponentCollapseConfigs.schemas.FORM_BORDER_CONTENT.name:
                return  this.template_render_formBorderContent(attrsDefault , data , extra);
            case ComponentCollapseConfigs.schemas.FORM_BORDER_CONTENT_ICON.name:
                return  this.template_render_formBorderContentIcon(attrsDefault , data , extra);
            case ComponentCollapseConfigs.schemas.FORM_BORDER_CONTENT_TITLE.name:
                return  this.template_render_formBorderContentTitle(attrsDefault , data , extra);
            case ComponentCollapseConfigs.schemas.FORM_BORDER_CONTENT_ARROW.name:
                return  this.template_render_formBorderContentArrow(attrsDefault , data , extra);
            case ComponentCollapseConfigs.schemas.FORM_BODY.name:
                return  this.template_render_formBody(attrsDefault , data , extra);
        }
    }


    private template_render_form(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                children: [
                    this.executeSchemaPart(ComponentCollapseConfigs.schemas.FORM_BORDER.name) ,
                    this.executeSchemaPart(ComponentCollapseConfigs.schemas.FORM_BODY.name) ,
                ]
            });

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }

    private template_render_formBorder(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {
            const prop_borderBackground=            data[ComponentCollapseConfigs.keys.prop_borderBackground.name];
            const prop_borderClass=                data[ComponentCollapseConfigs.keys.prop_borderClass.name];
            const prop_borderStyles=               data[ComponentCollapseConfigs.keys.prop_borderStyles.name];
            const prop_borderColor=                data[ComponentCollapseConfigs.keys.prop_borderColor.name];
            const prop_borderWidth=                data[ComponentCollapseConfigs.keys.prop_borderWidth.name];
            const prop_borderRadius=               data[ComponentCollapseConfigs.keys.prop_borderRadius.name];
            const prop_borderMinWidth=             data[ComponentCollapseConfigs.keys.prop_borderMinWidth.name];


            return  new ToolsComponents.ComponentBorder(
                <ComponentBorderPropsType>{
                    classList:                      []  ,
                    styles:                         {
                        cursor: "pointer"
                    }  ,
                    prop_borderClass:               prop_borderClass ,
                    prop_borderStyles:              prop_borderStyles ,
                    prop_contentBackgroundColor:    prop_borderBackground ,
                    prop_borderColor:               prop_borderColor ,
                    prop_borderWidth:               prop_borderWidth ,
                    prop_borderRadius:              prop_borderRadius ,
                    prop_minWidth:                  prop_borderMinWidth ,
                    prop_content:                   this.executeSchemaPart(ComponentCollapseConfigs.schemas.FORM_BORDER_CONTENT.name)

                } ,
                <ComponentBorderMethodsType>{
                    fn_onClickBorder: function (event, dataArgs:ComponentBorder_Methods_CLICK_BORDER_DataArgs, componentArgs:ComponentBorder_Methods_CLICK_BORDER_ComponentArgs) {
                        const isOpen = this.get(ComponentCollapseConfigs.keys.prop_bodyIsOpen.name);
                        this.set(ComponentCollapseConfigs.keys.prop_bodyIsOpen.name , !isOpen)

                        const params : ComponentCollapse_Methods_CLICK_DataArgs = {}
                        this.executeMethod(ComponentCollapseConfigs.methods.CLICK.name  , event , params);

                    }.bind(this)
                }
            ).getReactiveElement();

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }



    private template_render_formBorderContent(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                styles: {

                },
                className: [
                    "row" , "p-0" , 'm-0'
                ] ,
                children: [
                    this.executeSchemaPart(ComponentCollapseConfigs.schemas.FORM_BORDER_CONTENT_ICON.name) ,
                    this.executeSchemaPart(ComponentCollapseConfigs.schemas.FORM_BORDER_CONTENT_TITLE.name) ,
                    this.executeSchemaPart(ComponentCollapseConfigs.schemas.FORM_BORDER_CONTENT_ARROW.name) ,
                ]
            });

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }



    private template_render_formBorderContentIcon(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_icon=                  data[ComponentCollapseConfigs.keys.prop_icon.name];
            const prop_iconClass=             data[ComponentCollapseConfigs.keys.prop_iconClass.name];
            const prop_iconStyles=            data[ComponentCollapseConfigs.keys.prop_iconStyles.name];

            return new ToolsComponents.ComponentIcon(
                <ComponentIconPropsType>{
                    classList:          ["col-md-1" , "col-12"]  ,
                    styles:             {}  ,

                    prop_iconClass :    prop_iconClass ,
                    prop_iconStyles :   prop_iconStyles ,
                    prop_icon:          prop_icon ,
                } ,
                <ComponentIconMethodsType>{

                }
            ).getReactiveElement();

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }



    private template_render_formBorderContentTitle(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_title=                 data[ComponentCollapseConfigs.keys.prop_title.name];
            const prop_titleStyles=           data[ComponentCollapseConfigs.keys.prop_titleStyles.name];
            const prop_titleClass=            data[ComponentCollapseConfigs.keys.prop_titleClass.name];
            const prop_titleColor=            data[ComponentCollapseConfigs.keys.prop_titleColor.name];

            const contentHeight   = ToolsCss.getHeightSize(AppConfig.get("sizeName"));
            const contentFontSize = ToolsCss.getFontSize(AppConfig.get("sizeName"));

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                styles: {
                    lineHeight: `${contentHeight}px` ,
                    fontSize:   `${contentFontSize}px`
                },
                stylesBind: {
                    prop_titleStyles,
                    color:       prop_titleColor
                },
                classBind: [
                    prop_titleClass
                ],
                className:     [
                    "col-md-10" , "col-12"
                ] ,
                children: [
                    ReactiveElement.b({
                        children: [
                            prop_title
                        ]
                    })
                ]
            });

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_formBorderContentArrow(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_arrowClass=            data[ComponentCollapseConfigs.keys.prop_arrowClass.name];
            const prop_arrowStyles=           data[ComponentCollapseConfigs.keys.prop_arrowStyles.name];
            const prop_bodyIsOpen=            data[ComponentCollapseConfigs.keys.prop_bodyIsOpen.name];

            return new ToolsComponents.ComponentIcon(
                <ComponentIconPropsType>{
                    classList:          ["col-md-1" , "col-12"]  ,
                    styles:             {}  ,

                    prop_iconClass :    prop_arrowClass ,
                    prop_iconStyles :   prop_arrowStyles ,
                    prop_icon:          prop_bodyIsOpen.mapList({
                        true:           TOOLS.ICON.icon_arrow_up({size: SIZES.L , primaryColor: Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1) , secondaryColor: Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) })  ,
                        false:          TOOLS.ICON.icon_arrow_down({size: SIZES.L , primaryColor: Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1) , secondaryColor: Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) })
                    }) ,
                } ,
                <ComponentIconMethodsType>{

                }
            ).getReactiveElement();
        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_formBody(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_body=                  data[ComponentCollapseConfigs.keys.prop_body.name];
            const prop_bodyStyles=            data[ComponentCollapseConfigs.keys.prop_bodyStyles.name];
            const prop_bodyClass=             data[ComponentCollapseConfigs.keys.prop_bodyClass.name];
            const prop_bodyIsOpen=            data[ComponentCollapseConfigs.keys.prop_bodyIsOpen.name];
            const prop_bodyBorderColor=       data[ComponentCollapseConfigs.keys.prop_bodyBorderColor.name];
            const prop_bodyBorderWidth=       data[ComponentCollapseConfigs.keys.prop_bodyBorderWidth.name];
            const prop_bodyBorderRadius=      data[ComponentCollapseConfigs.keys.prop_bodyBorderRadius.name];

            const contentHeight   = ToolsCss.getHeightSize(AppConfig.get("sizeName"));
            const contentFontSize = ToolsCss.getFontSize(AppConfig.get("sizeName"));

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                styles: {
                    lineHeight: `${contentHeight}px` ,
                    fontSize:   `${contentFontSize}px`
                },
                stylesBind: {
                    prop_bodyStyles,
                    borderColor:      prop_bodyBorderColor ,
                    borderStyle:      prop_bodyBorderWidth.map(
                        v=>{
                            if ((typeof v == "string" && ToolsCss.checkExistSizeSelected(v)) || (typeof v == "number")){
                                return "solid";
                            }
                            return null;
                        }
                    ) ,
                    borderWidth:      prop_bodyBorderWidth.map(
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
                    borderRadius: prop_bodyBorderRadius.map(
                        v=>{
                            if (typeof v == "string" && ToolsCss.checkExistSizeSelected(v)){
                                return ToolsComponents_BorderRadius[v];
                            }
                            else if (typeof v == "number"){
                                return v + "px";
                            }
                            return null;
                        }
                    ) ,
                },
                classBind: [
                    prop_bodyIsOpen.mapBoolean("show" , "d-none") ,
                    prop_bodyClass
                ],
                className:     [
                    "col-12" , "p-2"
                ] ,
                children: [
                    prop_body
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


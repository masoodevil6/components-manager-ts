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
import {
    ComponentIcon, ComponentIcon_Methods_CLICK_ComponentArgs, ComponentIcon_Methods_HOVER_DataArgs, ComponentIconBase,
    ComponentIconMethodsType, ComponentIconProps,
    ComponentIconPropsType,
    ComponentIconSchemaType,
    ComponentIconTemplatesType
} from "./ComponentIcon";
import {ToolsIcons} from "../icons";
import {
    ComponentBorder_Methods_CLICK_BORDER_ComponentArgs,
    ComponentBorder_Methods_CLICK_BORDER_DataArgs,
    ComponentBorderMethodsType,
    ComponentBorderProps,
    ComponentBorderPropsType
} from "./ComponentBorder";
import {ComponentFloatMenu_ShowTypes} from "./ComponentFloatMenu";
import {
    ComponentTooltipDescription, ComponentTooltipDescription_PositionTypes,
    ComponentTooltipDescriptionMethodsType, ComponentTooltipDescriptionProps,
    ComponentTooltipDescriptionPropsType
} from "./ComponentTooltipDescription";



export const ComponentLabelProps = {
    ... GOG_ComponentBasicProps_component,
    ... GOG_ComponentBasicProps_structure,
    ///----------------------
    prop_labelBackground :                       "prop_labelBackground" ,
    prop_labelRadius :                           "prop_labelRadius" ,
    prop_labelMinWidth :                         "prop_labelMinWidth" ,

    prop_labelTitle :                            "prop_labelTitle" ,
    prop_labelFor :                              "prop_labelFor" ,
    prop_labelStyle :                            "prop_labelStyle" ,
    prop_labelClass :                            "prop_labelClass" ,
    prop_labelColor :                            "prop_labelColor" ,

    prop_tooltipIcon :                           "prop_tooltipIcon" ,
    prop_tooltipDescription :                    "prop_tooltipDescription" ,
    prop_tooltipBackground :                     "prop_tooltipBackground" ,
    prop_tooltipColor :                          "prop_tooltipColor" ,
    prop_tooltipPosition :                       "prop_tooltipPosition" ,
    prop_tooltipDirection :                      "prop_tooltipDirection" ,
} as const;

export enum ComponentLabel_TooltipPositionTypes{
    TOP=       "top",
    BOTTOM=    "bottom",
}

const ComponentLabelConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_component_keys ,
        ...GOG_ComponentBasicConfigs_structure_keys ,
        ///----------------------
        [ComponentLabelProps.prop_labelBackground]: {
            name:               ComponentLabelProps.prop_labelBackground,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1)),
        } ,
        [ComponentLabelProps.prop_labelRadius]: {
            name:               ComponentLabelProps.prop_labelRadius,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M),
        } ,
        [ComponentLabelProps.prop_labelMinWidth]: {
            name:               ComponentLabelProps.prop_labelMinWidth,
            value:              GOG_SetValue<SizeUnit | SizeCalc |null>(null),
        } ,

        [ComponentLabelProps.prop_labelTitle]: {
            name:               ComponentLabelProps.prop_labelTitle,
            value:              GOG_SetValue<string |null>(null) ,
        } ,
        [ComponentLabelProps.prop_labelFor]: {
            name:               ComponentLabelProps.prop_labelFor,
            value:              GOG_SetValue<string |null>(null) ,
        } ,
        [ComponentLabelProps.prop_labelStyle]: {
            name:               ComponentLabelProps.prop_labelStyle,
            value:              GOG_SetValue<Record<string, string>>({}) ,
        } ,
        [ComponentLabelProps.prop_labelClass]: {
            name:               ComponentLabelProps.prop_labelClass,
            value:              GOG_SetValue<string[]>( []) ,
        } ,
        [ComponentLabelProps.prop_labelColor]: {
            name:               ComponentLabelProps.prop_labelColor,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1 )),
        } ,


        [ComponentLabelProps.prop_tooltipIcon]: {
            name:               ComponentLabelProps.prop_tooltipIcon,
            value:               GOG_SetValue<IconsType |null>(ToolsIcons.icon_exclamation_square({size: SIZES.M})) ,
        } ,
        [ComponentLabelProps.prop_tooltipDescription]: {
            name:               ComponentLabelProps.prop_tooltipDescription,
            value:              GOG_SetValue<string |null>(null) ,
        } ,
        [ComponentLabelProps.prop_tooltipBackground]: {
            name:               ComponentLabelProps.prop_tooltipBackground,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1 )),
        } ,
        [ComponentLabelProps.prop_tooltipColor]: {
            name:               ComponentLabelProps.prop_tooltipColor,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1 )),
        } ,
        [ComponentLabelProps.prop_tooltipPosition]: {
            name:               ComponentLabelProps.prop_tooltipPosition,
            value:              GOG_SetValue<SizeUnit | SizeCalc | null>( SizeUnit(2.5 , UNITS.PERCENT)) ,
        } ,
        [ComponentLabelProps.prop_tooltipDirection]: {
            name:                ComponentTooltipDescriptionProps.prop_direction,
            value:               GOG_SetValue<GOG_ValueOf<typeof ComponentLabel_TooltipPositionTypes>>(ComponentLabel_TooltipPositionTypes.BOTTOM),
        } ,
    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_component_parts ,
        ...GOG_ComponentBasicConfigs_structure_parts ,
        ///----------------------
        BORDER: {
            name:               "part-border"
        } ,
        BORDER_CONTENT: {
            name:               "part-content"
        } ,
        LABEL: {
            name:               "part-label"
        } ,
        TOOLTIP: {
            name:               "part-tooltip"
        } ,
    } ,
    templates: {
        TITLE: {
            name:                "title"
        } ,
        TOOLTIP: {
            name:                "tooltip"
        } ,
    } ,
    methods: {
        CLICK: {
            name:                      "fn_onClickLabel" ,
            dataArgs: {},
            componentArgs: {
                FOR : {
                    name:              "for"
                }
            }
        },
    }
} as const


export type ComponentLabelPropsType =                      GOG_ExtractNameValue<typeof ComponentLabelConfigs.keys>
export type ComponentLabelSchemaType =                     GOG_ExtractName<typeof ComponentLabelConfigs.schemas>
export type ComponentLabelTemplatesType =                  GOG_ExtractName<typeof ComponentLabelConfigs.templates>

export type ComponentLabel_Methods_CLICK_ComponentArgs =   GOG_ExtractName<typeof ComponentLabelConfigs.methods.CLICK.componentArgs>
export type ComponentLabel_Methods_CLICK_DataArgs =        GOG_ExtractNameValue<typeof ComponentLabelConfigs.methods.CLICK.dataArgs>

export type ComponentLabelMethodsType = {
    [ComponentLabelConfigs.methods.CLICK.name]: ComponentCallBackType<ComponentLabel_Methods_CLICK_ComponentArgs , ComponentLabel_Methods_CLICK_DataArgs>
}



export class ComponentLabelBase extends ComponentBase<
    ComponentLabelPropsType ,
    ComponentLabelSchemaType ,
    ComponentLabelTemplatesType ,
    ComponentLabelMethodsType
    >{


    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN=  defineComponentPatterns<ComponentLabelPropsType>(
        {
            ...GOG_ComponentBasicConfigs_component_Pattern(this) ,
            ...GOG_ComponentBasicConfigs_structure_Pattern(this) ,
            ///----------------------
            [ComponentLabelConfigs.keys.prop_labelBackground.name]: {
                prop:                                             ComponentLabelConfigs.keys.prop_labelBackground.name,
                default:                                          ComponentLabelConfigs.keys.prop_labelBackground.value,
                title:                                            Language.translate("components.label.prop.prop_labelBackground.title"),
                description:                                      Language.translate("components.label.prop.prop_labelBackground.description"),
            } ,
            [ComponentLabelConfigs.keys.prop_labelRadius.name]: {
                prop:                                             ComponentLabelConfigs.keys.prop_labelRadius.name,
                default:                                          ComponentLabelConfigs.keys.prop_labelRadius.value,
                title:                                            Language.translate("components.label.prop.prop_labelRadius.title"),
                description:                                      Language.translate("components.label.prop.prop_labelRadius.description"),
            } ,
            [ComponentLabelConfigs.keys.prop_labelMinWidth.name]: {
                prop:                                             ComponentLabelConfigs.keys.prop_labelMinWidth.name,
                default:                                          ComponentLabelConfigs.keys.prop_labelMinWidth.value,
                title:                                            Language.translate("components.label.prop.prop_labelMinWidth.title"),
                description:                                      Language.translate("components.label.prop.prop_labelMinWidth.description"),
            } ,

            [ComponentLabelConfigs.keys.prop_labelTitle.name]: {
                prop:                                             ComponentLabelConfigs.keys.prop_labelTitle.name,
                default:                                          ComponentLabelConfigs.keys.prop_labelTitle.value,
                title:                                            Language.translate("components.label.prop.prop_labelTitle.title"),
                description:                                      Language.translate("components.label.prop.prop_labelTitle.description"),
            } ,
            [ComponentLabelConfigs.keys.prop_labelFor.name]: {
                prop:                                             ComponentLabelConfigs.keys.prop_labelFor.name,
                default:                                          ComponentLabelConfigs.keys.prop_labelFor.value,
                title:                                            Language.translate("components.label.prop.prop_labelFor.title"),
                description:                                      Language.translate("components.label.prop.prop_labelFor.description"),
            } ,
            [ComponentLabelConfigs.keys.prop_labelStyle.name]: {
                prop:                                             ComponentLabelConfigs.keys.prop_labelStyle.name,
                default:                                          ComponentLabelConfigs.keys.prop_labelStyle.value,
                title:                                            Language.translate("components.label.prop.prop_labelStyle.title"),
                description:                                      Language.translate("components.label.prop.prop_labelStyle.description"),
            } ,
            [ComponentLabelConfigs.keys.prop_labelClass.name]: {
                prop:                                             ComponentLabelConfigs.keys.prop_labelClass.name,
                default:                                          ComponentLabelConfigs.keys.prop_labelClass.value,
                title:                                            Language.translate("components.label.prop.prop_labelClass.title"),
                description:                                      Language.translate("components.label.prop.prop_labelClass.description"),
            } ,
            [ComponentLabelConfigs.keys.prop_labelColor.name]: {
                prop:                                             ComponentLabelConfigs.keys.prop_labelColor.name,
                default:                                          ComponentLabelConfigs.keys.prop_labelColor.value,
                title:                                            Language.translate("components.label.prop.prop_labelColor.title"),
                description:                                      Language.translate("components.label.prop.prop_labelColor.description"),
            } ,


            [ComponentLabelConfigs.keys.prop_tooltipIcon.name]: {
                prop:                                             ComponentLabelConfigs.keys.prop_tooltipIcon.name,
                default:                                          ComponentLabelConfigs.keys.prop_tooltipIcon.value,
                title:                                            Language.translate("components.label.prop.prop_tooltipIcon.title"),
                description:                                      Language.translate("components.label.prop.prop_tooltipIcon.description"),
            } ,
            [ComponentLabelConfigs.keys.prop_tooltipDescription.name]: {
                prop:                                             ComponentLabelConfigs.keys.prop_tooltipDescription.name,
                default:                                          ComponentLabelConfigs.keys.prop_tooltipDescription.value,
                title:                                            Language.translate("components.label.prop.prop_tooltipDescription.title"),
                description:                                      Language.translate("components.label.prop.prop_tooltipDescription.description"),
            } ,
            [ComponentLabelConfigs.keys.prop_tooltipBackground.name]: {
                prop:                                             ComponentLabelConfigs.keys.prop_tooltipBackground.name,
                default:                                          ComponentLabelConfigs.keys.prop_tooltipBackground.value,
                title:                                            Language.translate("components.label.prop.prop_tooltipBackground.title"),
                description:                                      Language.translate("components.label.prop.prop_tooltipBackground.description"),
            } ,
            [ComponentLabelConfigs.keys.prop_tooltipColor.name]: {
                prop:                                             ComponentLabelConfigs.keys.prop_tooltipColor.name,
                default:                                          ComponentLabelConfigs.keys.prop_tooltipColor.value,
                title:                                            Language.translate("components.label.prop.prop_tooltipColor.title"),
                description:                                      Language.translate("components.label.prop.prop_tooltipColor.description"),
            } ,
            [ComponentLabelConfigs.keys.prop_tooltipPosition.name]: {
                prop:                                             ComponentLabelConfigs.keys.prop_tooltipPosition.name,
                default:                                          ComponentLabelConfigs.keys.prop_tooltipPosition.value,
                title:                                            Language.translate("components.label.prop.prop_tooltipPosition.title"),
                description:                                      Language.translate("components.label.prop.prop_tooltipPosition.description"),
            } ,
            [ComponentLabelConfigs.keys.prop_tooltipDirection.name]: {
                prop:                                             ComponentLabelConfigs.keys.prop_tooltipDirection.name,
                default:                                          ComponentLabelConfigs.keys.prop_tooltipDirection.value,
                title:                                            Language.translate("components.label.prop.prop_tooltipDirection.title"),
                description:                                      Language.translate("components.label.prop.prop_tooltipDirection.description"),
            } ,


        }
    );

    //
    // prop_tooltipIcon :                           "prop_tooltipIcon" ,
    // prop_tooltipDescription :                    "prop_tooltipDescription" ,
    // prop_tooltipPosition :                       "prop_tooltipPosition" ,
    /* ---------------------------------------------
        PROPERTYs Props
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentLabelSchemaType  , ComponentLabelPropsType>( {
        ...GOG_ComponentBasicConfigs_component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_structure_Schema(this) ,
        [ComponentLabelConfigs.schemas.BORDER.name]: {
            part:               ComponentLabelConfigs.schemas.BORDER.name ,
            title:              Language.translate("components.label.schema.border.title") ,
            description:        Language.translate("components.label.schema.border.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelBackground.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelRadius.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelMinWidth.name] ,
            ]
        } ,
        [ComponentLabelConfigs.schemas.BORDER_CONTENT.name]: {
            part:               ComponentLabelConfigs.schemas.BORDER_CONTENT.name ,
            title:              Language.translate("components.label.schema.border_content.title") ,
            description:        Language.translate("components.label.schema.border_content.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelTitle.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelFor.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelStyle.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelClass.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelColor.name] ,
            ]
        } ,
        [ComponentLabelConfigs.schemas.LABEL.name]: {
            part:               ComponentLabelConfigs.schemas.LABEL.name ,
            title:              Language.translate("components.label.schema.label.title") ,
            description:        Language.translate("components.label.schema.label.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelTitle.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelFor.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelStyle.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelClass.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelColor.name] ,
            ]
        } ,
        [ComponentLabelConfigs.schemas.TOOLTIP.name]: {
            part:               ComponentLabelConfigs.schemas.TOOLTIP.name ,
            title:              Language.translate("components.label.schema.tooltip.title") ,
            description:        Language.translate("components.label.schema.tooltip.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_tooltipIcon.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_tooltipDescription.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_tooltipBackground.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_tooltipColor.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_tooltipPosition.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_tooltipDirection.name] ,
            ]
        } ,
    });


    /* ---------------------------------------------
       PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentLabelTemplatesType , ComponentLabelPropsType>({
        [ComponentLabelConfigs.templates.TITLE.name]: {
            title:                                            Language.translate("components.label.template.title.title"),
            description:                                      Language.translate("components.label.template.title.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelTitle.name]
        } ,
        [ComponentLabelConfigs.templates.TOOLTIP.name]: {
            title:                                            Language.translate("components.label.template.tooltip.title"),
            description:                                      Language.translate("components.label.template.tooltip.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_tooltipDescription.name]
        } ,
    });



    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentLabelMethodsType , ComponentLabelPropsType>({
        [ComponentLabelConfigs.methods.CLICK.name]: {
            title:                                            Language.translate("components.label.methods.fn_onClickLabel.title"),
            description:                                      Language.translate("components.label.methods.fn_onClickLabel.description"),
            args: {
                [ComponentLabelConfigs.methods.CLICK.componentArgs.FOR.name] : this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelFor.name]
            }
        } ,
    });




    /* ---------------------------------------------
        Example
     --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        return new ComponentLabel(
            <ComponentLabelPropsType>{
                classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                styles: {

                }  ,

                prop_labelTitle:          "TITLE" ,
                prop_tooltipDescription : "DESCRIPTION" ,
                prop_labelFor : "input-test" ,
            } ,
            <ComponentLabelMethodsType>{
                fn_onClickLabel:  function (event, dataArgs:ComponentLabel_Methods_CLICK_DataArgs, componentArgs:ComponentLabel_Methods_CLICK_ComponentArgs){
                    console.log("clicked " , dataArgs , componentArgs)
                }
            }
        ).getElement();
    }

}

export class ComponentLabel extends ComponentLabelBase {

    /* ---------------------------------------------
      SETUP
  --------------------------------------------- */
    constructor(
        config: ComponentLabelPropsType ,
        methods: ComponentLabelMethodsType
    ) {
        super("label" , null);
        super.renderComponent(config , methods);
    }


    /* ---------------------------------------------
     TEMPLATEs
  --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentLabelConfigs.schemas.BORDER.name)
    }

    override renderManagerComponent(partName , attrsDefault , data , extra) :  ReactiveElement {
        switch (partName){
            case ComponentLabelConfigs.schemas.BORDER.name:
                return  this.templateFn_render_border(attrsDefault , data , extra);
            case ComponentLabelConfigs.schemas.BORDER_CONTENT.name:
                return  this.templateFn_render_borderContent(attrsDefault , data , extra);
            case ComponentLabelConfigs.schemas.LABEL.name:
                return  this.templateFn_render_label(attrsDefault , data , extra);
            case ComponentLabelConfigs.schemas.TOOLTIP.name:
                return  this.templateFn_render_tooltip(attrsDefault , data , extra);
        }
    }


    override templateFn_render_border(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_labelBackground =           data[ComponentLabelConfigs.keys.prop_labelBackground.name];
            const prop_labelRadius =               data[ComponentLabelConfigs.keys.prop_labelRadius.name];
            const prop_labelMinWidth =             data[ComponentLabelConfigs.keys.prop_labelMinWidth.name];

            return  new ToolsComponents.ComponentBorder(
                <ComponentBorderPropsType>{
                    classList:                      []  ,
                    styles:                         {}  ,

                    prop_borderClass:               ["position-relative" , "py-1" , "px-2"] ,
                    prop_content:                   this.executeSchemaPart(ComponentLabelConfigs.schemas.BORDER_CONTENT.name) ,
                    prop_contentBackgroundColor:    prop_labelBackground ,
                    prop_borderRadius:              prop_labelRadius ,
                    prop_minWidth:                  prop_labelMinWidth
                } ,
                <ComponentBorderMethodsType>{
                    fn_onClickBorder: function (event, dataArgs:ComponentBorder_Methods_CLICK_BORDER_DataArgs, componentArgs:ComponentBorder_Methods_CLICK_BORDER_ComponentArgs) {
                        const params : ComponentLabel_Methods_CLICK_DataArgs = {}
                        this.executeMethod(ComponentLabelConfigs.methods.CLICK.name  , event , params);
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


    override templateFn_render_borderContent(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                styles: {
                    cursor:     "pointer"
                },
                className: [
                    "position-relative" ,
                ] ,
                children: [
                    this.executeSchemaPart(ComponentLabelConfigs.schemas.LABEL.name) ,
                    this.executeSchemaPart(ComponentLabelConfigs.schemas.TOOLTIP.name) ,
                ]
            });
        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    override templateFn_render_label(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_labelTitle =           data[ComponentLabelConfigs.keys.prop_labelTitle.name];
            const prop_labelFor =             data[ComponentLabelConfigs.keys.prop_labelFor.name];
            const prop_labelStyle =           data[ComponentLabelConfigs.keys.prop_labelStyle.name];
            const prop_labelClass =           data[ComponentLabelConfigs.keys.prop_labelClass.name];
            const prop_labelColor =           data[ComponentLabelConfigs.keys.prop_labelColor.name];

            const contentHeight   = ToolsCss.getHeightSize(AppConfig.get("sizeName"));
            const contentFontSize = ToolsCss.getFontSize(AppConfig.get("sizeName"));

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                attrsBind: {
                    for:         prop_labelFor
                },
                styles: {
                    lineHeight: `${contentHeight}px` ,
                    fontSize:   `${contentFontSize}px`
                },
                stylesBind: {
                    prop_labelStyle,
                    color:       prop_labelColor
                },
                classBind: [
                    prop_labelClass
                ],
                children: [
                    ReactiveElement.b({
                        children: [
                            prop_labelTitle
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

    override templateFn_render_tooltip(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_tooltipIcon =           data[ComponentLabelConfigs.keys.prop_tooltipIcon.name];
            const prop_tooltipDescription =    data[ComponentLabelConfigs.keys.prop_tooltipDescription.name];
            const prop_tooltipBackground =     data[ComponentLabelConfigs.keys.prop_tooltipBackground.name];
            const prop_tooltipColor =          data[ComponentLabelConfigs.keys.prop_tooltipColor.name];
            const prop_tooltipPosition =       data[ComponentLabelConfigs.keys.prop_tooltipPosition.name];
            const prop_tooltipDirection =       data[ComponentLabelConfigs.keys.prop_tooltipDirection.name];

            if (prop_tooltipDescription.get()){

                return new ComponentTooltipDescription(
                    <ComponentTooltipDescriptionPropsType>{
                        classList:                []  ,
                        styles:                   {}  ,

                        prop_description:         prop_tooltipDescription ,
                        prop_icon:                prop_tooltipIcon ,
                        prop_iconClass:           [] ,
                        prop_iconStyles:          {top: "0"} ,
                        prop_iconPosition:        prop_tooltipPosition ,
                        prop_direction:           prop_tooltipDirection ,
                        prop_borderBackground:    prop_tooltipBackground,
                        prop_borderColor:         prop_tooltipColor

                    },
                    <ComponentTooltipDescriptionMethodsType>{

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
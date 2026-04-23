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
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_keys,
    GOG_ComponentBasicConfigs_Component_Structure_parts,
    GOG_ComponentBasicConfigs_Component_Structure_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_Schema,
    GOG_ComponentBasicProps_Component,
    GOG_ComponentBasicProps_Component_Structure,
    GOG_ComponentBasicProps_Component_Structure_FormInput_Label,
} from "../../core/component/SetupComponent";
import {ToolsIcons} from "../icons";
import {
    ComponentBorder_Methods_CLICK_BORDER_ComponentArgs,
    ComponentBorder_Methods_CLICK_BORDER_DataArgs,
    ComponentBorderMethodsType,
    ComponentBorderProps,
    ComponentBorderPropsType
} from "./ComponentBorder";
import {
    ComponentTooltipDescription, ComponentTooltipDescriptionMethodsType,
    ComponentTooltipDescriptionPropsType
} from "./ComponentTooltipDescription";
import {fa} from "../../langs/Fa";









export const ComponentLabelProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    ///----------------------
    ...GOG_ComponentBasicProps_Component_Structure_FormInput_Label
} as const;



const ComponentLabelConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys ,
        ///----------------------
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys
    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_Component_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts ,
        ///----------------------
        BORDER: {
            name:               "part-border"
        } ,
        BORDER_CONTENT: {
            name:               "part-content"
        } ,
        BORDER_CONTENT_LABEL: {
            name:               "part-content-label"
        } ,
        BORDER_CONTENT_TOOLTIP: {
            name:               "part-content-tooltip"
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
            dataArgs: {
                IS_DISABLE: {
                    name:              "isDisable" ,
                    value:             GOG_SetValue<boolean>(false) ,
                } ,
            },
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
            ...GOG_ComponentBasicConfigs_Component_Pattern(this) ,
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this) ,
            ///----------------------
            ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Pattern(this)
        }
    );


    /* ---------------------------------------------
        PROPERTYs Props
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentLabelSchemaType  , ComponentLabelPropsType>( {
        ...GOG_ComponentBasicConfigs_Component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this) ,
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
        [ComponentLabelConfigs.schemas.BORDER_CONTENT_LABEL.name]: {
            part:               ComponentLabelConfigs.schemas.BORDER_CONTENT_LABEL.name ,
            title:              Language.translate("components.label.schema.border_content_label.title") ,
            description:        Language.translate("components.label.schema.border_content_label.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelTitle.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelFor.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelStyle.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelClass.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelColor.name] ,
            ]
        } ,
        [ComponentLabelConfigs.schemas.BORDER_CONTENT_TOOLTIP.name]: {
            part:               ComponentLabelConfigs.schemas.BORDER_CONTENT_TOOLTIP.name ,
            title:              Language.translate("components.label.schema.border_content_tooltip.title") ,
            description:        Language.translate("components.label.schema.border_content_tooltip.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelTooltipIcon.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelTooltipDescription.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelTooltipBackground.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelTooltipColor.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelTooltipPosition.name] ,
                this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelTooltipDirection.name] ,
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
            reference:                                        this._COMPONENT_PATTERN[ComponentLabelConfigs.keys.prop_labelTooltipDescription.name]
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

                prop_labelTitle: "Label" ,
                prop_labelTooltipDescription : "ToolTip DESCRIPTION" ,
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
        methods: ComponentLabelMethodsType ,
        events = null
    ) {
        super("label" , null);
        super.renderComponent(config , methods , events);
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
            case ComponentLabelConfigs.schemas.BORDER_CONTENT_LABEL.name:
                return  this.templateFn_render_borderContentLabel(attrsDefault , data , extra);
            case ComponentLabelConfigs.schemas.BORDER_CONTENT_TOOLTIP.name:
                return  this.templateFn_render_borderContentTooltip(attrsDefault , data , extra);
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

                    prop_borderClass:               ["position-relative" , "py-0" , "px-2"] ,
                    prop_content:                   this.executeSchemaPart(ComponentLabelConfigs.schemas.BORDER_CONTENT.name) ,
                    prop_contentBackgroundColor:    prop_labelBackground ,
                    prop_borderRadius:              prop_labelRadius ,
                    prop_minWidth:                  prop_labelMinWidth
                } ,
                <ComponentBorderMethodsType>{
                    fn_onClickBorder: function (event, dataArgs:ComponentBorder_Methods_CLICK_BORDER_DataArgs, componentArgs:ComponentBorder_Methods_CLICK_BORDER_ComponentArgs) {
                        const params : ComponentLabel_Methods_CLICK_DataArgs = {
                            isDisable: false
                        }
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
                    this.executeSchemaPart(ComponentLabelConfigs.schemas.BORDER_CONTENT_LABEL.name) ,
                    this.executeSchemaPart(ComponentLabelConfigs.schemas.BORDER_CONTENT_TOOLTIP.name) ,
                ]
            });
        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    override templateFn_render_borderContentLabel(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_labelTitle =           data[ComponentLabelConfigs.keys.prop_labelTitle.name];
            const prop_labelFor =             data[ComponentLabelConfigs.keys.prop_labelFor.name];
            const prop_labelStyle =           data[ComponentLabelConfigs.keys.prop_labelStyle.name];
            const prop_labelClass =           data[ComponentLabelConfigs.keys.prop_labelClass.name];
            const prop_labelColor =           data[ComponentLabelConfigs.keys.prop_labelColor.name];

            const contentHeight =     ToolsCss.getHeightSize(AppConfig.get("sizeName"));
            const contentLineHeight = ToolsCss.getLineHeightSize(AppConfig.get("sizeName"));
            const contentFontSize =   ToolsCss.getFontSize(AppConfig.get("sizeName"));

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                attrsBind: {
                    for:         prop_labelFor
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
                        styles: {
                            height:     `${contentHeight}px` ,
                            lineHeight: `${contentLineHeight}px` ,
                            fontSize:   `${contentFontSize}px`
                        },
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

    override templateFn_render_borderContentTooltip(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_labelTooltipIcon =           data[ComponentLabelConfigs.keys.prop_labelTooltipIcon.name];
            const prop_labelTooltipDescription =    data[ComponentLabelConfigs.keys.prop_labelTooltipDescription.name];
            const prop_labelTooltipBackground =     data[ComponentLabelConfigs.keys.prop_labelTooltipBackground.name];
            const prop_labelTooltipColor =          data[ComponentLabelConfigs.keys.prop_labelTooltipColor.name];
            const prop_labelTooltipPosition =       data[ComponentLabelConfigs.keys.prop_labelTooltipPosition.name];
            const prop_labelTooltipDirection =       data[ComponentLabelConfigs.keys.prop_labelTooltipDirection.name];

            if (prop_labelTooltipDescription.get()){

                return new ComponentTooltipDescription(
                    <ComponentTooltipDescriptionPropsType>{
                        classList:                []  ,
                        styles:                   {}  ,

                        prop_description:         prop_labelTooltipDescription ,
                        prop_icon:                prop_labelTooltipIcon ,
                        prop_iconClass:           [] ,
                        prop_iconStyles:          {top: "0"} ,
                        prop_iconPosition:        prop_labelTooltipPosition ,
                        prop_direction:           prop_labelTooltipDirection ,
                        prop_borderBackground:    prop_labelTooltipBackground,
                        prop_borderColor:         prop_labelTooltipColor

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
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
import {ComponentMethodType} from "../../core/ComponentBase";
import {ComponentTemplateType} from "../../core/ComponentBase";
import {ComponentCallBackType} from "../../core/ComponentBase";
import {Language} from "../../core/Language";
import {AppConfig} from "../../core/AppConfig";
import {
    Color,
    COLORS_GRAD,
    COLORS_MAIN,
    IconsType,
    SIZES, SizesType,
    ToolsComponents_BorderRadius,
    ToolsComponents_BorderWidth
} from "../../utils/ToolsConsts";
import {
    ComponentButton_ButtonTypes,
    ComponentButton_Methods_CLICK_ComponentArgs,
    ComponentButton_Methods_CLICK_DataArgs,
    ComponentButton_Types,
    ComponentButtonMethodsType,
    ComponentButtonPropsType,
    ComponentButtonSchemaType,
    ComponentButtonTemplatesType
} from "./ComponentButton";
import {fa} from "../../langs/Fa";
import {ComponentFloatMenuMethodsType, ComponentFloatMenuPropsType} from "./ComponentFloatMenu";



export const ComponentBorderProps = {
    ...GOG_ComponentConfigBasicProps ,
    prop_content :                        "prop_content" ,
    prop_contentColor :                   "prop_contentColor" ,
    prop_contentBackgroundColor :         "prop_contentBackgroundColor" ,
    prop_borderClass :                    "prop_borderClass" ,
    prop_borderStyles :                   "prop_borderStyles" ,
    prop_borderColor :                    "prop_borderColor" ,
    prop_borderWidth :                    "prop_borderWidth" ,
    prop_borderRadius :                   "prop_borderRadius" ,
    prop_borderArrowType :                "prop_borderArrowType" ,
    prop_borderArrowWidth :               "prop_borderArrowWidth" ,
    prop_borderArrowPosition :            "prop_borderArrowPosition" ,
    prop_minWidth :                       "prop_minWidth" ,
    prop_optionHas :                      "prop_optionHas" ,
    prop_optionIcon :                     "prop_optionIcon" ,
} as const;



export enum ComponentBorder_ArrowTypes{
    TOP=     "top",
    RIGHT=   "right",
    BOTTOM=  "bottom",
    LEFT=    "left"
}



const ComponentBorderConfigs  =  {
    keys: {
        ...GOG_ComponentConfigBasicKey ,
        ///----------------------
        [ComponentBorderProps.prop_content]: {
            name:               ComponentBorderProps.prop_content ,
            value:              GOG_SetValue<string>( "") ,
        } ,
        [ComponentBorderProps.prop_contentColor]: {
            name:               ComponentBorderProps.prop_contentColor ,
            value:              GOG_SetValue<GOG_ValueOf<typeof Color | null>>(null),
        } ,
        [ComponentBorderProps.prop_contentBackgroundColor]: {
            name:               ComponentBorderProps.prop_contentBackgroundColor ,
            value:              GOG_SetValue<GOG_ValueOf<typeof Color | null>>( Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1)),
        } ,
        [ComponentBorderProps.prop_borderClass]: {
            name:               ComponentBorderProps.prop_borderClass ,
            value:              GOG_SetValue<string[]>( [ "shadow-sm" , "position-relative" , "p-2"] ) ,
        } ,
        [ComponentBorderProps.prop_borderStyles]: {
            name:               ComponentBorderProps.prop_borderStyles ,
            value:              GOG_SetValue<Record<string, string>>( {"display" : "flow-root"}) ,
        } ,
        [ComponentBorderProps.prop_borderColor]: {
            name:               ComponentBorderProps.prop_borderColor ,
            value:              GOG_SetValue<GOG_ValueOf<typeof Color | null>>( Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1)) ,
        } ,
        [ComponentBorderProps.prop_borderWidth]: {
            name:               ComponentBorderProps.prop_borderWidth ,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M),
        } ,
        [ComponentBorderProps.prop_borderRadius]: {
            name:               ComponentBorderProps.prop_borderRadius ,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M),
        } ,
        [ComponentBorderProps.prop_borderArrowType]: {
            name:               ComponentBorderProps.prop_borderArrowType ,
            value:              GOG_SetValue<GOG_ValueOf<typeof ComponentBorder_ArrowTypes | null>>(null),
        } ,
        [ComponentBorderProps.prop_borderArrowWidth]: {
            name:               ComponentBorderProps.prop_borderArrowWidth ,
            value:              GOG_SetValue<number>(10),
        } ,
        [ComponentBorderProps.prop_borderArrowPosition]: {
            name:               ComponentBorderProps.prop_borderArrowPosition ,
            value:              GOG_SetValue<number>(50),
        } ,
        [ComponentBorderProps.prop_minWidth]: {
            name:               ComponentBorderProps.prop_minWidth ,
            value:              GOG_SetValue<number|null>(null),
        } ,
        [ComponentBorderProps.prop_optionHas]: {
            name:               ComponentBorderProps.prop_optionHas ,
            value:              GOG_SetValue<boolean>(false),
        } ,
        [ComponentBorderProps.prop_optionIcon]: {
            name:               ComponentBorderProps.prop_optionIcon ,
            value:              GOG_SetValue<IconsType|null>( null) ,
        } ,
    } ,
    schemas:   {
        COMPONENT: {
            name:               "part_component"
        } ,
        STRUCTURE: {
            name:               "part_structure"
        } ,
        BORDER: {
            name:               "part_border"
        } ,
        FLOAT: {
            name:               "part_float"
        } ,
        FLOAT_SELECTOR: {
            name:               "part_float_selector"
        } ,
        FLOAT_OPTIONS: {
            name:               "part_float_options"
        } ,
        FLOAT_OPTIONS_ICON: {
            name:               "part_float_options_icon"
        } ,
    } ,
    templates: {
        BODY: {
            name:                "body"
        } ,
    } ,
    methods: {
        CLICK_BORDER: {
            name:                      "fn_onClickBorder" ,
            dataArgs: {},
            componentArgs: {}
        },
        CLICK_OPTION: {
            name:                      "fn_onClickOption" ,
            dataArgs: {},
            componentArgs: {}
        },
    }
} as const


export type ComponentBorderPropsType =                             GOG_ComponentConfigBasicType & GOG_ExtractNameValue<typeof ComponentBorderConfigs.keys>
export type ComponentBorderSchemaType =                            GOG_ExtractName<typeof ComponentBorderConfigs.schemas>
export type ComponentBorderTemplatesType =                         GOG_ExtractName<typeof ComponentBorderConfigs.templates>

export type ComponentBorder_Methods_CLICK_BORDER_ComponentArgs =   GOG_ExtractName<typeof ComponentBorderConfigs.methods.CLICK_BORDER.componentArgs>
export type ComponentBorder_Methods_CLICK_BORDER_DataArgs =        GOG_ExtractNameValue<typeof ComponentBorderConfigs.methods.CLICK_BORDER.dataArgs>

export type ComponentBorder_Methods_Click_OPTION_ComponentArgs =   GOG_ExtractName<typeof ComponentBorderConfigs.methods.CLICK_OPTION.componentArgs>
export type ComponentBorder_Methods_Click_OPTION_DataArgs =        GOG_ExtractNameValue<typeof ComponentBorderConfigs.methods.CLICK_OPTION.dataArgs>

export type ComponentBorderMethodsType = {
    [ComponentBorderConfigs.methods.CLICK_BORDER.name]: ComponentCallBackType<ComponentBorder_Methods_CLICK_BORDER_ComponentArgs , ComponentBorder_Methods_CLICK_BORDER_DataArgs>
    [ComponentBorderConfigs.methods.CLICK_OPTION.name]: ComponentCallBackType<ComponentBorder_Methods_Click_OPTION_ComponentArgs , ComponentBorder_Methods_Click_OPTION_DataArgs>
}





export class ComponentBorderBase extends ComponentBase<
    ComponentBorderPropsType ,
    ComponentBorderSchemaType ,
    ComponentBorderTemplatesType ,
    ComponentBorderMethodsType
    >{



    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN=  defineComponentPatterns<ComponentBorderPropsType>(
        {
            ...GOG_ComponentConfigBasicPattern ,
            [ComponentBorderConfigs.keys.prop_content.name]: {
                prop:                                             ComponentBorderConfigs.keys.prop_content.name,
                default:                                          ComponentBorderConfigs.keys.prop_content.value,
                title:                                            Language.translate("components.border.prop_content.title"),
                description:                                      Language.translate("components.border.prop_content.description"),
            } ,
            [ComponentBorderConfigs.keys.prop_contentColor.name]: {
                prop:                                             ComponentBorderConfigs.keys.prop_contentColor.name,
                default:                                          ComponentBorderConfigs.keys.prop_contentColor.value,
                title:                                            Language.translate("components.border.prop_contentColor.title"),
                description:                                      Language.translate("components.border.prop_contentColor.description"),
            } ,
            [ComponentBorderConfigs.keys.prop_contentBackgroundColor.name]: {
                prop:                                             ComponentBorderConfigs.keys.prop_contentBackgroundColor.name,
                default:                                          ComponentBorderConfigs.keys.prop_contentBackgroundColor.value,
                title:                                            Language.translate("components.border.prop_contentBackgroundColor.title"),
                description:                                      Language.translate("components.border.prop_contentBackgroundColor.description"),
            } ,
            [ComponentBorderConfigs.keys.prop_borderClass.name]: {
                prop:                                             ComponentBorderConfigs.keys.prop_borderClass.name,
                default:                                          ComponentBorderConfigs.keys.prop_borderClass.value,
                title:                                            Language.translate("components.border.prop_borderClass.title"),
                description:                                      Language.translate("components.border.prop_borderClass.description"),
            } ,
            [ComponentBorderConfigs.keys.prop_borderStyles.name]: {
                prop:                                             ComponentBorderConfigs.keys.prop_borderStyles.name,
                default:                                          ComponentBorderConfigs.keys.prop_borderStyles.value,
                title:                                            Language.translate("components.border.prop_borderStyles.title"),
                description:                                      Language.translate("components.border.prop_borderStyles.description"),
            } ,
            [ComponentBorderConfigs.keys.prop_borderColor.name]: {
                prop:                                             ComponentBorderConfigs.keys.prop_borderColor.name,
                default:                                          ComponentBorderConfigs.keys.prop_borderColor.value,
                title:                                            Language.translate("components.border.prop_borderColor.title"),
                description:                                      Language.translate("components.border.prop_borderColor.description"),
            } ,
            [ComponentBorderConfigs.keys.prop_borderWidth.name]: {
                prop:                                             ComponentBorderConfigs.keys.prop_borderWidth.name,
                default:                                          ComponentBorderConfigs.keys.prop_borderWidth.value,
                title:                                            Language.translate("components.border.prop_borderWidth.title"),
                description:                                      Language.translate("components.border.prop_borderWidth.description"),
            } ,
            [ComponentBorderConfigs.keys.prop_borderRadius.name]: {
                prop:                                             ComponentBorderConfigs.keys.prop_borderRadius.name,
                default:                                          ComponentBorderConfigs.keys.prop_borderRadius.value,
                title:                                            Language.translate("components.border.prop_borderRadius.title"),
                description:                                      Language.translate("components.border.prop_borderRadius.description"),
            } ,
            [ComponentBorderConfigs.keys.prop_borderArrowType.name]: {
                prop:                                             ComponentBorderConfigs.keys.prop_borderArrowType.name,
                default:                                          ComponentBorderConfigs.keys.prop_borderArrowType.value,
                title:                                            Language.translate("components.border.prop_borderArrowType.title"),
                description:                                      Language.translate("components.border.prop_borderArrowType.description"),
            } ,
            [ComponentBorderConfigs.keys.prop_borderArrowWidth.name]: {
                prop:                                             ComponentBorderConfigs.keys.prop_borderArrowWidth.name,
                default:                                          ComponentBorderConfigs.keys.prop_borderArrowWidth.value,
                title:                                            Language.translate("components.border.prop_borderArrowWidth.title"),
                description:                                      Language.translate("components.border.prop_borderArrowWidth.description"),
            } ,
            [ComponentBorderConfigs.keys.prop_borderArrowPosition.name]: {
                prop:                                             ComponentBorderConfigs.keys.prop_borderArrowPosition.name,
                default:                                          ComponentBorderConfigs.keys.prop_borderArrowPosition.value,
                title:                                            Language.translate("components.border.prop_borderArrowPosition.title"),
                description:                                      Language.translate("components.border.prop_borderArrowPosition.description"),
            } ,
            [ComponentBorderConfigs.keys.prop_minWidth.name]: {
                prop:                                             ComponentBorderConfigs.keys.prop_minWidth.name,
                default:                                          ComponentBorderConfigs.keys.prop_minWidth.value,
                title:                                            Language.translate("components.border.prop_minWidth.title"),
                description:                                      Language.translate("components.border.prop_minWidth.description"),
            } ,
            [ComponentBorderConfigs.keys.prop_optionHas.name]: {
                prop:                                             ComponentBorderConfigs.keys.prop_optionHas.name,
                default:                                          ComponentBorderConfigs.keys.prop_optionHas.value,
                title:                                            Language.translate("components.border.OPTION_HAS.title"),
                description:                                      Language.translate("components.border.OPTION_HAS.description"),
            } ,
            [ComponentBorderConfigs.keys.prop_optionIcon.name]: {
                prop:                                             ComponentBorderConfigs.keys.prop_optionIcon.name,
                default:                                          ComponentBorderConfigs.keys.prop_optionIcon.value,
                title:                                            Language.translate("components.border.prop_optionIcon.title"),
                description:                                      Language.translate("components.border.prop_optionIcon.description"),
            } ,
        }
    );


    /* ---------------------------------------------
        PROPERTYs Props
    --------------------------------------------- */
    _COMPONENT_PROPS = defineComponentProps<ComponentBorderSchemaType  , ComponentBorderPropsType>( {
        [ComponentBorderConfigs.schemas.COMPONENT.name]: [

        ],
        [ComponentBorderConfigs.schemas.STRUCTURE.name]: [

        ],
        [ComponentBorderConfigs.schemas.BORDER.name]: [
            this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderArrowType.name] ,
            this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderArrowWidth.name] ,
            this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderArrowPosition.name] ,
            this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderRadius.name] ,
            this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderWidth.name] ,
            this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderColor.name] ,
            this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderClass.name] ,
            this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderStyles.name] ,
            this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_content.name] ,
            this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_contentColor.name] ,
            this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_contentBackgroundColor.name] ,
            this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_minWidth.name] ,
        ],
        [ComponentBorderConfigs.schemas.FLOAT.name]: [
            this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_optionHas.name] ,
        ],
        [ComponentBorderConfigs.schemas.FLOAT_SELECTOR.name]: [

        ],
        [ComponentBorderConfigs.schemas.FLOAT_OPTIONS.name]: [
            this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_optionIcon.name] ,
        ],
        [ComponentBorderConfigs.schemas.FLOAT_OPTIONS_ICON.name]: [

        ],
    });



    /* ---------------------------------------------
           PROPERTYs Pattern
        --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentBorderTemplatesType , ComponentBorderPropsType>({
        [ComponentBorderConfigs.templates.BODY.name]: {
            title:                                            Language.translate("components.border.template_body.title"),
            description:                                      Language.translate("components.border.template_body.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_content.name]
        } ,
    });



    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentBorderMethodsType , ComponentBorderPropsType>({
        [ComponentBorderConfigs.methods.CLICK_BORDER.name]: {
            title:                                            Language.translate("components.border.fn_onClickBorder.title"),
            description:                                      Language.translate("components.border.fn_onClickBorder.description"),
            args: {}
        } ,
        [ComponentBorderConfigs.methods.CLICK_OPTION.name]: {
            title:                                            Language.translate("components.border.fn_onClickOption.title"),
            description:                                      Language.translate("components.border.fn_onClickOption.description"),
            args: {}
        } ,
    });


}



export class ComponentBorder extends ComponentBorderBase{

    /* ---------------------------------------------
       SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentBorderPropsType ,
        methods: ComponentBorderMethodsType
    ) {
        super("component-border" , null);
        super.renderComponent(config , methods);
    }



    /* ---------------------------------------------
      TEMPLATEs
     --------------------------------------------- */

    override template_render_structure() {
        const partName = ComponentBorderConfigs.schemas.STRUCTURE.name;

        return this.templateBasic_render_structure(
            ReactiveElement.section({
                children: [
                    this.#template_render_border() ,
                ]
            })
        );
    }

    #template_render_border() {
        const partName = ComponentBorderConfigs.schemas.BORDER.name;
        const data = this.getPartProps(partName)

        if (data != null){
            const prop_borderArrowType=                 data[ComponentBorderConfigs.keys.prop_borderArrowType.name];
            const prop_borderArrowWidth=                data[ComponentBorderConfigs.keys.prop_borderArrowWidth.name];
            const prop_borderArrowPosition=             data[ComponentBorderConfigs.keys.prop_borderArrowPosition.name];
            const prop_borderRadius =                   data[ComponentBorderConfigs.keys.prop_borderRadius.name];
            const prop_borderColor =                    data[ComponentBorderConfigs.keys.prop_borderColor.name];
            const prop_borderWidth =                    data[ComponentBorderConfigs.keys.prop_borderWidth.name];
            const prop_borderClass=                     data[ComponentBorderConfigs.keys.prop_borderClass.name];
            const prop_borderStyles=                    data[ComponentBorderConfigs.keys.prop_borderStyles.name];
            const prop_content=                         data[ComponentBorderConfigs.keys.prop_content.name];
            const prop_contentColor=                    data[ComponentBorderConfigs.keys.prop_contentColor.name];
            const prop_contentBackgroundColor=          data[ComponentBorderConfigs.keys.prop_contentBackgroundColor.name];
            const prop_minWidth =                       data[ComponentBorderConfigs.keys.prop_minWidth.name];

            const directionRtl = AppConfig.get("directionRtl");
            const elFontSize = ToolsCss.getFontSize(AppConfig.get("sizeName"));
            const elHeight = ToolsCss.getIconSize(AppConfig.get("sizeName"));


            let borderArrow = "";
            switch (prop_borderArrowType.get()){
                case ComponentBorder_ArrowTypes.TOP:
                    borderArrow = `
#component-border-border-${this._COMPONENT_RANDOM_ID}:after{
   content:                                    "";
   position:                                   absolute;
   ${directionRtl? "right" : "left"}:          ${prop_borderArrowPosition.get()}%;
   top:                                        -${prop_borderArrowWidth.get()}px;
   width:                                      0px;
   height:                                     0px;
   border-style:                               solid;
   border-width:                               0 ${(2/3)*prop_borderArrowWidth.get()}px ${prop_borderArrowWidth.get()}px ${(2/3)*prop_borderArrowWidth.get()}px;
   border-color:                               transparent transparent ${prop_borderColor.get()} transparent;
   transform:                                  translate(-50% , 0) rotate(0deg);
}
                    `
                    break;
                case ComponentBorder_ArrowTypes.RIGHT:
                    borderArrow = `
#component-border-border-${this._COMPONENT_RANDOM_ID}:after{
   content:                                   "";
   position:                                  absolute;
   top:                                       ${prop_borderArrowPosition.get()}%;
   ${directionRtl? "left" : "right"}:         -${prop_borderArrowWidth.get()}px;
   width:                                     0;
   height:                                    0;
   border-style:                              solid;
   border-width:                              ${(2/3)*prop_borderArrowWidth.get()}px ${prop_borderArrowWidth.get()}px ${(2/3)*prop_borderArrowWidth.get()}px 0;
   border-color:                              transparent ${prop_borderColor.get()} transparent transparent;
   transform:                                 translate(0 , -50%)  rotate(180deg);
}
                    `
                    break;
                case ComponentBorder_ArrowTypes.BOTTOM:
                    borderArrow = `
#component-border-border-${this._COMPONENT_RANDOM_ID}:after{
   content:                                    "";
   position:                                   absolute;
   ${directionRtl? "right" : "left"}:          ${prop_borderArrowPosition.get()}%;
   bottom:                                        -${prop_borderArrowWidth.get()}px;
   width:                                      0px;
   height:                                     0px;
   border-style:                               solid;
   border-width:                               ${prop_borderArrowWidth.get()}px ${(2/3)*prop_borderArrowWidth.get()}px 0 ${(2/3)*prop_borderArrowWidth.get()}px;
   border-color:                               ${prop_borderColor.get()} transparent transparent transparent;
   transform:                                  translate(-50% , 0) rotate(0deg);
}
                    `
                    break;
                case ComponentBorder_ArrowTypes.LEFT:
                    borderArrow = `
#component-border-border-${this._COMPONENT_RANDOM_ID}:after{
   content:                                    "";
   position:                                   absolute;
   top:                                        ${prop_borderArrowPosition.get()}%;
   ${directionRtl? "right" : "left"}:          -${prop_borderArrowWidth.get()}px;
   width:                                      0;
   height:                                     0;
   border-style:                               solid;
   border-width:                               ${(2/3)*prop_borderArrowWidth.get()}px 0 ${(2/3)*prop_borderArrowWidth.get()}px ${prop_borderArrowWidth.get()}px;
   border-color:                               transparent transparent transparent ${prop_borderColor.get()};
   transform:                                  translate(0 , -50%)  rotate(180deg);
}
                    `
                    break;
            }

            return ReactiveElement.section(
                {
                    attrs: {
                        "id":      `component-border-border-${this._COMPONENT_RANDOM_ID}`,
                    },
                    stylesCustom: borderArrow ,
                    styles: {
                        lineHeight:   `${elHeight}px` ,
                        fontSize:     `${elFontSize}px`
                    } ,
                    stylesBind: {
                        prop_borderStyles ,
                        minWidth:         prop_minWidth.map(v=>v+"px") ,
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
                        borderRadius: prop_borderRadius.map(
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
                        borderColor:      prop_borderColor ,
                        color:            prop_contentColor ,
                        backgroundColor:  prop_contentBackgroundColor
                    } ,
                    className: [] ,
                    classBind: [
                        prop_borderClass
                    ] ,
                    on: {
                        click: (event: Event) => {
                            const params : ComponentBorder_Methods_CLICK_BORDER_DataArgs = {}
                            this.executeMethod(ComponentBorderConfigs.methods.CLICK_BORDER.name  , event , params);
                        },
                    },
                    children: [
                        prop_content ,
                        this.#componentFn_render_float()
                    ]
                })
        }

        return ReactiveElement.section({
            attrs: {
                "data-part-name":  partName
            }
        });
    }

    #componentFn_render_float() {
        const partName = ComponentBorderConfigs.schemas.FLOAT.name;
        const data = this.getPartProps(partName)

        if (data != null){
            const prop_optionHas  =   data[ComponentBorderConfigs.keys.prop_optionHas.name];

            const directionRtl = AppConfig.get("directionRtl");

            if (prop_optionHas.get()){
                //Language.translate("components.border.prop_content.title")

                const iconSelector =  this.#componentFn_render_floatSelector()
                const floatContent =  this.#componentFn_render_floatOptions()

                return new ToolsComponents.ComponentFloatMenu(
                    <ComponentFloatMenuPropsType>{
                        classList:                  []  ,
                        prop_selectorContent:       iconSelector.getElement(),
                        prop_floatContent:          floatContent.getElement() ,
                        prop_selectorTypeShow:      "hover" ,
                        prop_floatDirection:        "left" ,
                        prop_floatArrowWidth:       10 ,
                    } ,
                    <ComponentFloatMenuMethodsType>{

                    }
                ).getSchema()
            }

        }

        return ReactiveElement.section({
            attrs: {
                "data-part-name":  partName
            }
        });
    }



    #componentFn_render_floatSelector() {
        const partName = ComponentBorderConfigs.schemas.FLOAT_SELECTOR.name;
        const data = this.getPartProps(partName)

        if (data != null) {
            const prop_optionIcon  =  data[ComponentBorderConfigs.keys.prop_optionIcon.name];

        }

        return ReactiveElement.section({
            attrs: {
                "data-part-name":  partName
            }
        });
    }



    #componentFn_render_floatOptions() {
        const partName = ComponentBorderConfigs.schemas.FLOAT_OPTIONS.name;
        const data = this.getPartProps(partName)

        if (data != null) {

        }

        return ReactiveElement.section({
            attrs: {
                "data-part-name":  partName
            }
        });
    }


    #componentFn_render_floatOptionsIcon() {
        const partName = ComponentBorderConfigs.schemas.FLOAT_OPTIONS_ICON.name;
        const data = this.getPartProps(partName)

        if (data != null) {

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

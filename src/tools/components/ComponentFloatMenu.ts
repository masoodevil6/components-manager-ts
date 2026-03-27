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

import {ToolsComponents} from "./index";

import {GOG_ComponentConfigBasicType} from "../../core/ComponentBase";
import {ComponentMethodType} from "../../core/ComponentBase";
import {ComponentTemplateType} from "../../core/ComponentBase";
import {Language} from "../../core/Language";
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Color, COLORS_GRAD, COLORS_MAIN, IconsType, SIZES} from "../../utils/ToolsConsts";
import {
    ComponentBorder_ArrowTypes, ComponentBorderMethodsType, ComponentBorderProps,
    ComponentBorderPropsType,
} from "./ComponentBorder";





export const ComponentFloatMenuProps = {
    ...GOG_ComponentConfigBasicProps,
    prop_selectorContent :        "prop_selectorContent" ,
    prop_selectorClass :          "prop_selectorClass" ,
    prop_selectorStyles :         "prop_selectorStyles" ,
    prop_selectorShowType :       "prop_selectorShowType" ,
    prop_floatContent :           "prop_floatContent" ,
    prop_floatDirectionType :     "prop_floatDirectionType" ,
    prop_floatArrowWidth :        "prop_floatArrowWidth" ,
    prop_floatBorderWidth :       "prop_floatBorderWidth" ,
    prop_floatBorderRadius :      "prop_floatBorderRadius" ,
    prop_floatMinWidth :          "prop_floatMinWidth" ,
} as const;




export enum ComponentFloatMenu_DirectionTypes{
    TOP=       "top",
    RIGHT=     "right",
    BOTTOM=    "bottom",
    LEFT=      "left"
}


export enum ComponentFloatMenu_ShowTypes{
    HOVER=     "hover",
    CLICK=     "click",
}


const ComponentFloatMenuConfigs  =  {
    keys: {
        ...GOG_ComponentConfigBasicKey ,
        ///----------------------
        [ComponentFloatMenuProps.prop_selectorContent] : {
            name:                ComponentFloatMenuProps.prop_selectorContent ,
            value:               GOG_SetValue<string | HTMLElement | ReactiveElement>( "") ,
        } ,
        [ComponentFloatMenuProps.prop_selectorClass] : {
            name:                ComponentFloatMenuProps.prop_selectorClass,
            value:               GOG_SetValue<string[]>( []) ,
        } ,
        [ComponentFloatMenuProps.prop_selectorStyles] : {
            name:                ComponentFloatMenuProps.prop_selectorStyles,
            value:               GOG_SetValue<Record<string, string>>({}) ,
        } ,
        [ComponentFloatMenuProps.prop_selectorShowType] : {
            name:                ComponentFloatMenuProps.prop_selectorShowType,
            value:               GOG_SetValue<GOG_ValueOf<typeof ComponentFloatMenu_ShowTypes>>(ComponentFloatMenu_ShowTypes.CLICK),
        } ,
        [ComponentFloatMenuProps.prop_floatContent] : {
            name:                ComponentFloatMenuProps.prop_floatContent,
            value:               GOG_SetValue<string | HTMLElement | ReactiveElement>( "") ,
        } ,
        [ComponentFloatMenuProps.prop_floatDirectionType] : {
            name:                ComponentFloatMenuProps.prop_floatDirectionType,
            value:               GOG_SetValue<GOG_ValueOf<typeof ComponentFloatMenu_DirectionTypes>>(ComponentFloatMenu_DirectionTypes.TOP),
        } ,
        [ComponentFloatMenuProps.prop_floatArrowWidth] : {
            name:                ComponentFloatMenuProps.prop_floatArrowWidth,
            value:               GOG_SetValue<number>(10),
        } ,
        [ComponentFloatMenuProps.prop_floatBorderWidth] : {
            name:               ComponentFloatMenuProps.prop_floatBorderWidth,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M),
        } ,
        [ComponentFloatMenuProps.prop_floatBorderRadius] : {
            name:               ComponentFloatMenuProps.prop_floatBorderRadius,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M),
        } ,
        [ComponentFloatMenuProps.prop_floatMinWidth] : {
            name:               ComponentFloatMenuProps.prop_floatMinWidth,
            value:              GOG_SetValue<number | null>(null),
        } ,
    } ,
    schemas:   {
        COMPONENT: {
            name:               "part_component"
        } ,
        STRUCTURE: {
            name:               "part_structure"
        } ,
        SELECTOR: {
            name:               "part_selector"
        } ,
        BORDER: {
            name:               "part_border"
        } ,
    } ,
    templates: {
        SELECTOR: {
            name:                "selector"
        } ,
        BODY: {
            name:                "body"
        } ,
    } ,
    methods: {

    }
} as const




export type ComponentFloatMenuPropsType =                             GOG_ComponentConfigBasicType & GOG_ExtractNameValue<typeof ComponentFloatMenuConfigs.keys>
export type ComponentFloatMenuSchemaType =                            GOG_ExtractName<typeof ComponentFloatMenuConfigs.schemas>
export type ComponentFloatMenuTemplatesType =                         GOG_ExtractName<typeof ComponentFloatMenuConfigs.templates>

export type ComponentFloatMenuMethodsType = {

}





export class ComponentFloatMenuBase extends ComponentBase<
    ComponentFloatMenuPropsType ,
    ComponentFloatMenuSchemaType ,
    ComponentFloatMenuTemplatesType ,
    ComponentFloatMenuMethodsType
    > {



    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN=  defineComponentPatterns<ComponentFloatMenuPropsType>(
        {
            ...GOG_ComponentConfigBasicPattern ,

            [ComponentFloatMenuConfigs.keys.prop_selectorContent.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_selectorContent.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_selectorContent.value,
                title:                                            Language.translate("components.float_menu.prop_selectorContent.title"),
                description:                                      Language.translate("components.float_menu.prop_selectorContent.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_selectorClass.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_selectorClass.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_selectorClass.value,
                title:                                            Language.translate("components.float_menu.prop_selectorClass.title"),
                description:                                      Language.translate("components.float_menu.prop_selectorClass.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_selectorStyles.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_selectorStyles.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_selectorStyles.value,
                title:                                            Language.translate("components.float_menu.prop_selectorStyles.title"),
                description:                                      Language.translate("components.float_menu.prop_selectorStyles.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_selectorShowType.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_selectorShowType.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_selectorShowType.value,
                title:                                            Language.translate("components.float_menu.prop_selectorShowType.title"),
                description:                                      Language.translate("components.float_menu.prop_selectorShowType.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatContent.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatContent.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatContent.value,
                title:                                            Language.translate("components.float_menu.prop_floatContent.title"),
                description:                                      Language.translate("components.float_menu.prop_floatContent.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatDirectionType.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatDirectionType.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatDirectionType.value,
                title:                                            Language.translate("components.float_menu.prop_floatDirectionType.title"),
                description:                                      Language.translate("components.float_menu.prop_floatDirectionType.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatArrowWidth.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatArrowWidth.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatArrowWidth.value,
                title:                                            Language.translate("components.float_menu.prop_floatArrowWidth.title"),
                description:                                      Language.translate("components.float_menu.prop_floatArrowWidth.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatBorderWidth.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatBorderWidth.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatBorderWidth.value,
                title:                                            Language.translate("components.float_menu.prop_floatBorderWidth.title"),
                description:                                      Language.translate("components.float_menu.prop_floatBorderWidth.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatBorderRadius.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatBorderRadius.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatBorderRadius.value,
                title:                                            Language.translate("components.float_menu.prop_floatBorderRadius.title"),
                description:                                      Language.translate("components.float_menu.prop_floatBorderRadius.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatMinWidth.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatMinWidth.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatMinWidth.value,
                title:                                            Language.translate("components.float_menu.prop_floatMinWidth.title"),
                description:                                      Language.translate("components.float_menu.prop_floatMinWidth.description"),
            } ,

        }
    );


    /* ---------------------------------------------
        PROPERTYs Props
    --------------------------------------------- */
    _COMPONENT_PROPS = defineComponentProps<ComponentFloatMenuSchemaType  , ComponentFloatMenuPropsType>( {
        [ComponentFloatMenuConfigs.schemas.COMPONENT.name]: [

        ],
        [ComponentFloatMenuConfigs.schemas.STRUCTURE.name]: [

        ],
        [ComponentFloatMenuConfigs.schemas.SELECTOR.name]: [
            this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_selectorContent.name] ,
            this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_selectorClass.name] ,
            this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_selectorStyles.name] ,
            this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_selectorShowType.name] ,
        ],
        [ComponentFloatMenuConfigs.schemas.BORDER.name]: [
            this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatContent.name] ,
            this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatDirectionType.name] ,
            this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatArrowWidth.name] ,
            this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatBorderWidth.name] ,
            this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatBorderRadius.name] ,
            this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatMinWidth.name] ,
        ],
    });




    /* ---------------------------------------------
        PROPERTYs Pattern
     --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentFloatMenuTemplatesType , ComponentFloatMenuPropsType>({
        [ComponentFloatMenuConfigs.templates.SELECTOR.name]: {
            title:                                            Language.translate("components.float_menu.template_selector.title"),
            description:                                      Language.translate("components.float_menu.template_selector.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_selectorContent.name] ,
        } ,
        [ComponentFloatMenuConfigs.templates.BODY.name]: {
            title:                                            Language.translate("components.float_menu.template_border.title"),
            description:                                      Language.translate("components.float_menu.template_border.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatContent.name]
        } ,
    });



    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentFloatMenuMethodsType , ComponentFloatMenuPropsType>({

    });

}


export class ComponentFloatMenu extends ComponentFloatMenuBase {

    _COMPONENT_BORDER = null;

    constructor(
        config: ComponentFloatMenuPropsType ,
        methods: ComponentFloatMenuMethodsType
    ) {
        super(
            "component-float-menu" ,
            null
        );
        super.renderComponent(config , methods);
    }


    /* TEMPLATE */
    override template_render_structure() {
        const partName = ComponentFloatMenuConfigs.schemas.STRUCTURE.name ;

        return this.templateBasic_render_structure(
            ReactiveElement.section({
                children: [
                    this.#templateFn_render_selector(),
                ]
            })
        );

    }

    #templateFn_render_selector() {
        const partName = ComponentFloatMenuConfigs.schemas.SELECTOR.name ;
        const data = this.getPartProps(partName);

        if (data != null) {

            const contentHeight   = ToolsCss.getHeightSize(AppConfig.get("sizeName"));
            const contentFontSize = ToolsCss.getFontSize(AppConfig.get("sizeName"));

            const prop_selectorContent =    data[ComponentFloatMenuConfigs.keys.prop_selectorContent.name];
            const prop_selectorClass  =     data[ComponentFloatMenuConfigs.keys.prop_selectorClass.name];
            const prop_selectorStyles =     data[ComponentFloatMenuConfigs.keys.prop_selectorStyles.name];
            const prop_selectorTypeShow=    data[ComponentFloatMenuConfigs.keys.prop_selectorShowType.name];

            return ReactiveElement.section({
                attrs: {
                    "data-part-name":     partName,
                    "id":                `component-float-menu-selector-${this._COMPONENT_RANDOM_ID}`,
                },
                styles: {
                    lineHeight: `${contentHeight}px` ,
                    fontSize:   `${contentFontSize}px` ,
                    cursor:     "pointer" ,
                    textAlign:  "center"
                },
                stylesBind: {
                    prop_selectorStyles
                },
                className: [

                ],
                classBind: [
                    prop_selectorClass
                ],
                on: {

                    click: (event: Event) => {
                        if (prop_selectorTypeShow.get() == ComponentFloatMenu_ShowTypes.CLICK && this._COMPONENT_BORDER){
                            const propShow = this._COMPONENT_BORDER.get(ComponentBorderProps.prop_show);
                            this._COMPONENT_BORDER.set("prop_show" , !propShow);
                        }
                    },

                    mouseenter: (event: Event) => {
                        if (prop_selectorTypeShow.get() == ComponentFloatMenu_ShowTypes.HOVER && this._COMPONENT_BORDER){
                            this._COMPONENT_BORDER.set(ComponentBorderProps.prop_show , true);
                        }
                    },

                    mouseleave: (event: Event) => {
                        if (prop_selectorTypeShow.get() == ComponentFloatMenu_ShowTypes.HOVER && this._COMPONENT_BORDER){
                            this._COMPONENT_BORDER.set(ComponentBorderProps.prop_show , false);
                        }
                    }
                },
                children: [
                    prop_selectorContent ,
                    this.#templateFn_render_border()
                ]
            });

        }

        return ReactiveElement.section({
            attrs: {
                "data-part-name": partName
            }
        });

    }

    #templateFn_render_border() {
        const partName = ComponentFloatMenuConfigs.schemas.BORDER.name;
        const data = this.getPartProps(partName);

        if (data != null) {
            const prop_floatContent =         data[ComponentFloatMenuConfigs.keys.prop_floatContent.name];
            const prop_floatDirection  =      data[ComponentFloatMenuConfigs.keys.prop_floatDirectionType.name];
            const prop_floatArrowWidth  =     data[ComponentFloatMenuConfigs.keys.prop_floatArrowWidth.name];
            const prop_floatBorderWidth  =    data[ComponentFloatMenuConfigs.keys.prop_floatBorderWidth.name];
            const prop_floatBorderRadius  =   data[ComponentFloatMenuConfigs.keys.prop_floatBorderRadius.name];
            const prop_floatMinWidth  =       data[ComponentFloatMenuConfigs.keys.prop_floatMinWidth.name];


            let borderDirection:typeof ComponentBorder_ArrowTypes[keyof typeof ComponentBorder_ArrowTypes];
            let borderArrowPosition;
            let borderArrowStyle = {};
            switch (prop_floatDirection.get()){
                case ComponentFloatMenu_DirectionTypes.TOP:
                    borderDirection = ComponentBorder_ArrowTypes.BOTTOM;
                    borderArrowPosition = 50;
                    borderArrowStyle["bottom"]= `calc(100% + ${prop_floatArrowWidth.get()}px - 10px)`;
                    borderArrowStyle["position"]= "absolute";
                    borderArrowStyle["left"]= "50%";
                    borderArrowStyle["transform"]= "translate(-50% , 0)";

                    break;
                case ComponentFloatMenu_DirectionTypes.BOTTOM:
                    borderDirection = ComponentBorder_ArrowTypes.TOP;
                    borderArrowPosition = 50;
                    borderArrowStyle["top"]= `calc( ${prop_floatArrowWidth.get()}px + 10px)`;
                    borderArrowStyle["position"]= "absolute";
                    borderArrowStyle["left"]= "50%";
                    borderArrowStyle["transform"]= "translate(-50% , 0)";

                    break;
                case ComponentFloatMenu_DirectionTypes.LEFT:
                    borderDirection = ComponentBorder_ArrowTypes.RIGHT;
                    borderArrowPosition = 50;
                    borderArrowStyle["right"]= `calc(100% + ${prop_floatArrowWidth.get()}px)` ;
                    borderArrowStyle["position"]= "absolute";
                    borderArrowStyle["top"]= "-50%";

                    break;
                case ComponentFloatMenu_DirectionTypes.RIGHT:
                    borderDirection = ComponentBorder_ArrowTypes.LEFT;
                    borderArrowPosition = 50;
                    borderArrowStyle["left"]= `calc(100% + ${prop_floatArrowWidth.get()}px)` ;
                    borderArrowStyle["position"]= "absolute";
                    borderArrowStyle["top"]= "-50%";

                    break;
            }

            this._COMPONENT_BORDER = new ToolsComponents.ComponentBorder(
                <ComponentBorderPropsType>{
                    classList:                [ "mt-2"]  ,
                    styles:                   borderArrowStyle  ,
                    prop_show :               false ,
                    prop_borderArrowType:     borderDirection ,
                    prop_borderArrowPosition: borderArrowPosition ,
                    prop_borderArrowWidth:    prop_floatArrowWidth.get() ,
                    prop_content:             prop_floatContent.get() ,
                    prop_borderRadius:        prop_floatBorderRadius.get() ,
                    prop_borderWidth:         prop_floatBorderWidth.get() ,
                    prop_minWidth:            prop_floatMinWidth.get()
                } ,
                <ComponentBorderMethodsType>{

                }
            );

            return this._COMPONENT_BORDER.getSchema();
        }

        return ReactiveElement.section({
            attrs: {
                "data-part-name": partName
            }
        });
    }

}
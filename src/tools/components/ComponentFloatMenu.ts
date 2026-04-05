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
    ComponentBorder_ArrowTypes,
    ComponentBorderMethodsType,
    ComponentBorderProps,
    ComponentBorderPropsType
} from "./ComponentBorder";






export const ComponentFloatMenuProps = {
    ... GOG_ComponentBasicProps_component,
    ... GOG_ComponentBasicProps_structure,
    prop_selectorContent :        "prop_selectorContent" ,
    prop_selectorClass :          "prop_selectorClass" ,
    prop_selectorStyles :         "prop_selectorStyles" ,
    prop_selectorShowType :       "prop_selectorShowType" ,

    prop_floatClass :             "prop_floatClass" ,
    prop_floatStyles :            "prop_floatStyles" ,
    prop_floatContent :           "prop_floatContent" ,
    prop_floatDirectionType :     "prop_floatDirectionType" ,
    prop_floatArrowWidth :        "prop_floatArrowWidth" ,
    prop_floatBorderWidth :       "prop_floatBorderWidth" ,
    prop_floatBorderRadius :      "prop_floatBorderRadius" ,
    prop_floatMinWidth :          "prop_floatMinWidth" ,
    prop_floatPosition :          "prop_floatPosition" ,
    prop_floatArrowPosition :     "prop_floatArrowPosition" ,

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
        ...GOG_ComponentBasicConfigs_component_keys ,
        ...GOG_ComponentBasicConfigs_structure_keys ,
        ///----------------------
        [ComponentFloatMenuProps.prop_selectorContent] : {
            name:                ComponentFloatMenuProps.prop_selectorContent ,
            value:               GOG_SetValue<string | ReactiveElement>( "") ,
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


        [ComponentFloatMenuProps.prop_floatClass] : {
            name:                ComponentFloatMenuProps.prop_floatClass,
            value:               GOG_SetValue<string[]>( ["mt-2"]) ,
        } ,
        [ComponentFloatMenuProps.prop_floatStyles] : {
            name:                ComponentFloatMenuProps.prop_floatStyles,
            value:               GOG_SetValue<Record<string, string>>({}) ,
        } ,
        [ComponentFloatMenuProps.prop_floatContent] : {
            name:                ComponentFloatMenuProps.prop_floatContent,
            value:               GOG_SetValue<string | ReactiveElement>( "") ,
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
            value:              GOG_SetValue<SizeUnit | SizeCalc | null>(null),
        } ,
        [ComponentFloatMenuProps.prop_floatPosition] : {
            name:               ComponentFloatMenuProps.prop_floatPosition,
            value:              GOG_SetValue<SizeUnit | SizeCalc | null>(null),
        } ,
        [ComponentFloatMenuProps.prop_floatArrowPosition] : {
            name:               ComponentFloatMenuProps.prop_floatArrowPosition,
            value:              GOG_SetValue<SizeUnit | SizeCalc | null >( SizeUnit(50 , UNITS.PERCENT)) ,
        } ,
    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_component_parts ,
        ...GOG_ComponentBasicConfigs_structure_parts ,
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




export type ComponentFloatMenuPropsType =                             GOG_ExtractNameValue<typeof ComponentFloatMenuConfigs.keys>
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
            ...GOG_ComponentBasicConfigs_component_Pattern(this) ,
            ...GOG_ComponentBasicConfigs_structure_Pattern(this) ,
            [ComponentFloatMenuConfigs.keys.prop_selectorContent.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_selectorContent.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_selectorContent.value,
                title:                                            Language.translate("components.float_menu.props.prop_selectorContent.title"),
                description:                                      Language.translate("components.float_menu.props.prop_selectorContent.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_selectorClass.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_selectorClass.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_selectorClass.value,
                title:                                            Language.translate("components.float_menu.props.prop_selectorClass.title"),
                description:                                      Language.translate("components.float_menu.props.prop_selectorClass.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_selectorStyles.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_selectorStyles.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_selectorStyles.value,
                title:                                            Language.translate("components.float_menu.props.prop_selectorStyles.title"),
                description:                                      Language.translate("components.float_menu.props.prop_selectorStyles.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_selectorShowType.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_selectorShowType.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_selectorShowType.value,
                title:                                            Language.translate("components.float_menu.props.prop_selectorShowType.title"),
                description:                                      Language.translate("components.float_menu.props.prop_selectorShowType.description"),
            } ,


            [ComponentFloatMenuConfigs.keys.prop_floatClass.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatClass.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatClass.value,
                title:                                            Language.translate("components.float_menu.props.prop_floatClass.title"),
                description:                                      Language.translate("components.float_menu.props.prop_floatClass.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatStyles.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatStyles.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatStyles.value,
                title:                                            Language.translate("components.float_menu.props.prop_floatStyles.title"),
                description:                                      Language.translate("components.float_menu.props.prop_floatStyles.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatContent.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatContent.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatContent.value,
                title:                                            Language.translate("components.float_menu.props.prop_floatContent.title"),
                description:                                      Language.translate("components.float_menu.props.prop_floatContent.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatDirectionType.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatDirectionType.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatDirectionType.value,
                title:                                            Language.translate("components.float_menu.props.prop_floatDirectionType.title"),
                description:                                      Language.translate("components.float_menu.props.prop_floatDirectionType.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatArrowWidth.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatArrowWidth.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatArrowWidth.value,
                title:                                            Language.translate("components.float_menu.props.prop_floatArrowWidth.title"),
                description:                                      Language.translate("components.float_menu.props.prop_floatArrowWidth.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatBorderWidth.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatBorderWidth.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatBorderWidth.value,
                title:                                            Language.translate("components.float_menu.props.prop_floatBorderWidth.title"),
                description:                                      Language.translate("components.float_menu.props.prop_floatBorderWidth.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatBorderRadius.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatBorderRadius.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatBorderRadius.value,
                title:                                            Language.translate("components.float_menu.props.prop_floatBorderRadius.title"),
                description:                                      Language.translate("components.float_menu.props.prop_floatBorderRadius.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatMinWidth.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatMinWidth.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatMinWidth.value,
                title:                                            Language.translate("components.float_menu.props.prop_floatMinWidth.title"),
                description:                                      Language.translate("components.float_menu.props.prop_floatMinWidth.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatPosition.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatPosition.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatPosition.value,
                title:                                            Language.translate("components.float_menu.props.prop_floatPosition.title"),
                description:                                      Language.translate("components.float_menu.props.prop_floatPosition.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatArrowPosition.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatArrowPosition.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatArrowPosition.value,
                title:                                            Language.translate("components.float_menu.props.prop_floatArrowPosition.title"),
                description:                                      Language.translate("components.float_menu.props.prop_floatArrowPosition.description"),
            } ,

        }
    );


    /* ---------------------------------------------
        PROPERTYs Props
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentFloatMenuSchemaType  , ComponentFloatMenuPropsType>( {
        ...GOG_ComponentBasicConfigs_component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_structure_Schema(this) ,
        [ComponentFloatMenuConfigs.schemas.SELECTOR.name]: {
            part:                                                 ComponentFloatMenuConfigs.schemas.SELECTOR.name ,
            title:                                                Language.translate("components.float_menu.schema.selector.title") ,
            description:                                          Language.translate("components.float_menu.schema.selector.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_selectorContent.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_selectorClass.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_selectorStyles.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_selectorShowType.name] ,
            ]
        } ,
        [ComponentFloatMenuConfigs.schemas.BORDER.name]: {
            part:                                                 ComponentFloatMenuConfigs.schemas.BORDER.name ,
            title:                                                Language.translate("components.float_menu.schema.border.title") ,
            description:                                          Language.translate("components.float_menu.schema.border.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatClass.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatStyles.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatContent.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatDirectionType.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatArrowWidth.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatBorderWidth.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatBorderRadius.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatMinWidth.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatPosition.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatArrowPosition.name] ,
            ]
        } ,
    });




    /* ---------------------------------------------
        PROPERTYs Pattern
     --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentFloatMenuTemplatesType , ComponentFloatMenuPropsType>({
        [ComponentFloatMenuConfigs.templates.SELECTOR.name]: {
            title:                                            Language.translate("components.float_menu.template.selector.title"),
            description:                                      Language.translate("components.float_menu.template.selector.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_selectorContent.name] ,
        } ,
        [ComponentFloatMenuConfigs.templates.BODY.name]: {
            title:                                            Language.translate("components.float_menu.template.border.title"),
            description:                                      Language.translate("components.float_menu.template.border.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatContent.name]
        } ,
    });



    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentFloatMenuMethodsType , ComponentFloatMenuPropsType>({

    });





    /* ---------------------------------------------
        Example
     --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        return new ComponentFloatMenu(
            <ComponentFloatMenuPropsType>{
                classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                prop_selectorContent: "selector" ,
                prop_selectorClass: ["text-center"] ,
                prop_floatContent: "content" ,
                prop_selectorShowType: "hover" ,
                prop_floatDirectionType: "bottom" ,
                prop_floatArrowWidth: 10 ,
                prop_floatMinWidth:   SizeUnit(230 , UNITS.PEXEL) ,
            } ,
            <ComponentFloatMenuMethodsType>{

            }
        ).getElement();
    }
}


export class ComponentFloatMenu extends ComponentFloatMenuBase {

    _COMPONENT_BORDER = null;

    /* ---------------------------------------------
       SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentFloatMenuPropsType ,
        methods: ComponentFloatMenuMethodsType
    ) {
        super(
            "float-menu" ,
            null
        );
        super.renderComponent(config , methods);
    }




    /* ---------------------------------------------
       TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentFloatMenuConfigs.schemas.SELECTOR.name)
    }

    override renderManagerComponent(partName, data , extra) :  ReactiveElement  {
        switch (partName){
            case ComponentFloatMenuConfigs.schemas.SELECTOR.name:
                return  this.templateFn_render_selector(partName , data , extra);
            case ComponentFloatMenuConfigs.schemas.BORDER.name:
                return  this.templateFn_render_border(partName , data , extra);
        }
    }


    private templateFn_render_selector(partName , data , extra) : ReactiveElement {

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
                    cursor:     "pointer"
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
                    this.executeSchemaPart(ComponentFloatMenuConfigs.schemas.BORDER.name)
                ]
            });

        }

        return ReactiveElement.section({
            attrs: {
                "data-part-name": partName
            }
        });

    }

    private templateFn_render_border(partName , data , extra) : ReactiveElement {

        if (data != null) {
            const prop_floatClass =           data[ComponentFloatMenuConfigs.keys.prop_floatClass.name];
            const prop_floatStyles =          data[ComponentFloatMenuConfigs.keys.prop_floatStyles.name];
            const prop_floatContent =         data[ComponentFloatMenuConfigs.keys.prop_floatContent.name];
            const prop_floatDirection  =      data[ComponentFloatMenuConfigs.keys.prop_floatDirectionType.name];
            const prop_floatArrowWidth  =     data[ComponentFloatMenuConfigs.keys.prop_floatArrowWidth.name];
            const prop_floatBorderWidth  =    data[ComponentFloatMenuConfigs.keys.prop_floatBorderWidth.name];
            const prop_floatBorderRadius  =   data[ComponentFloatMenuConfigs.keys.prop_floatBorderRadius.name];
            const prop_floatMinWidth  =       data[ComponentFloatMenuConfigs.keys.prop_floatMinWidth.name];
            const prop_floatPosition  =       data[ComponentFloatMenuConfigs.keys.prop_floatPosition.name];
            const prop_floatArrowPosition =   data[ComponentFloatMenuConfigs.keys.prop_floatArrowPosition.name];


            let borderDirection:typeof ComponentBorder_ArrowTypes[keyof typeof ComponentBorder_ArrowTypes];
            let borderArrowStyle = {};
            switch (prop_floatDirection.get()){
                case ComponentFloatMenu_DirectionTypes.TOP:
                    borderDirection = ComponentBorder_ArrowTypes.BOTTOM;
                    borderArrowStyle["bottom"]=        `calc(100% + ${prop_floatArrowWidth.get()}px - 10px)`;
                    borderArrowStyle["position"]=      "absolute";
                    borderArrowStyle["left"]=          prop_floatPosition.get() != null ? prop_floatPosition.get() : "50%";
                    borderArrowStyle["transform"]=    "translate(-50% , 0)";
                    break;
                case ComponentFloatMenu_DirectionTypes.BOTTOM:
                    borderDirection =                 ComponentBorder_ArrowTypes.TOP;
                    borderArrowStyle["top"]=          `calc( ${prop_floatArrowWidth.get()}px + 10px)`;
                    borderArrowStyle["position"]=     "absolute";
                    borderArrowStyle["left"]=         prop_floatPosition.get() != null ? prop_floatPosition.get() : "50%";
                    borderArrowStyle["transform"]=   "translate(-50% , 0)";
                    break;
                case ComponentFloatMenu_DirectionTypes.LEFT:
                    borderDirection = ComponentBorder_ArrowTypes.RIGHT;
                    borderArrowStyle["right"]= `calc(100% + ${prop_floatArrowWidth.get()}px)` ;
                    borderArrowStyle["position"]= "absolute";
                    borderArrowStyle["top"]= prop_floatPosition.get() != null ? prop_floatPosition.get() : "-50%";
                    break;
                case ComponentFloatMenu_DirectionTypes.RIGHT:
                    borderDirection = ComponentBorder_ArrowTypes.LEFT;
                    borderArrowStyle["left"]= `calc(100% + ${prop_floatArrowWidth.get()}px)` ;
                    borderArrowStyle["position"]= "absolute";
                    borderArrowStyle["top"]= prop_floatPosition.get() != null ? prop_floatPosition.get() : "-50%";
                    break;
            }

            prop_floatStyles.set(
                {
                    ...prop_floatStyles.get() ,
                    ...borderArrowStyle
                }
            )


            this._COMPONENT_BORDER = new ToolsComponents.ComponentBorder(
                <ComponentBorderPropsType>{
                    classList:                prop_floatClass  ,
                    styles:                   prop_floatStyles  ,
                    prop_show :               false ,
                    prop_borderArrowType:     borderDirection ,
                    prop_borderArrowPosition: prop_floatArrowPosition ,
                    prop_borderArrowWidth:    prop_floatArrowWidth ,
                    prop_content:             prop_floatContent ,
                    prop_borderRadius:        prop_floatBorderRadius ,
                    prop_borderWidth:         prop_floatBorderWidth ,
                    prop_minWidth:            prop_floatMinWidth
                } ,
                <ComponentBorderMethodsType>{

                }
            );

            return this._COMPONENT_BORDER.getElement();
        }

        return ReactiveElement.section({
            attrs: {
                "data-part-name": partName
            }
        });
    }

}
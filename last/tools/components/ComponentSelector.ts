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
    IconsType, OPERATION, SizeCalc,
    SIZES, SizesType, SizeUnit,
    ToolsComponents_BorderRadius,
    ToolsComponents_BorderWidth, UNITS, Z_INDEXES
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
import {ComponentBorderMethodsType, ComponentBorderProps, ComponentBorderPropsType} from "./ComponentBorder";





export const ComponentSelectorProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    prop_selectorColor :                 "prop_selectorColor" ,
    prop_selectorBorderColor :           "prop_selectorBorderColor" ,
    prop_selectorBorderWidth :           "prop_selectorBorderWidth" ,
    prop_selectorBorderRadius :          "prop_selectorBorderRadius" ,
    prop_selectorBorderOpacity :         "prop_selectorBorderOpacity" ,
} as const;

const ComponentSelectorConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys ,
        ///----------------------
        [ComponentSelectorProps.prop_selectorColor]: {
            name:               ComponentSelectorProps.prop_selectorColor ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_4)),
        } ,
        [ComponentSelectorProps.prop_selectorBorderColor]: {
            name:               ComponentSelectorProps.prop_selectorBorderColor ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_2)) ,
        } ,
        [ComponentSelectorProps.prop_selectorBorderWidth]: {
            name:               ComponentSelectorProps.prop_selectorBorderWidth ,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number | null>(SIZES.XS),
        } ,
        [ComponentSelectorProps.prop_selectorBorderRadius]: {
            name:               ComponentSelectorProps.prop_selectorBorderRadius ,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number | null>(null),
        } ,
        [ComponentSelectorProps.prop_selectorBorderOpacity]: {
            name:               ComponentSelectorProps.prop_selectorBorderOpacity ,
            value:              GOG_SetValue<number|null>(30),
        } ,
    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_Component_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts ,
        FIX: {
            name:                "part_fix" ,
        } ,
        SELECTOR: {
            name:                "part_selector" ,
        } ,
    } ,
    templates: {

    } ,
    methods: {

    }
} as const

export type ComponentSelectorPropsType =                      GOG_ExtractNameValue<typeof ComponentSelectorConfigs.keys>
export type ComponentSelectorSchemaType =                     GOG_ExtractName<typeof ComponentSelectorConfigs.schemas>
export type ComponentSelectorTemplatesType =                  GOG_ExtractName<typeof ComponentSelectorConfigs.templates>

export type ComponentSelectorMethodsType = {

}




export class ComponentSelectorBase extends ComponentBase<
    ComponentSelectorPropsType ,
    ComponentSelectorSchemaType ,
    ComponentSelectorTemplatesType ,
    ComponentSelectorMethodsType
    >{



    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN=  defineComponentPatterns<ComponentSelectorPropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this) ,
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this) ,
            [ComponentSelectorConfigs.keys.prop_selectorColor.name]: {
                prop:                                             ComponentSelectorConfigs.keys.prop_selectorColor.name,
                default:                                          ComponentSelectorConfigs.keys.prop_selectorColor.value,
                title:                                            Language.translate("components.selector.prop.prop_selectorColor.title"),
                description:                                      Language.translate("components.selector.prop.prop_selectorColor.description"),
            } ,
            [ComponentSelectorConfigs.keys.prop_selectorBorderColor.name]: {
                prop:                                             ComponentSelectorConfigs.keys.prop_selectorBorderColor.name,
                default:                                          ComponentSelectorConfigs.keys.prop_selectorBorderColor.value,
                title:                                            Language.translate("components.selector.prop.prop_selectorBorderColor.title"),
                description:                                      Language.translate("components.selector.prop.prop_selectorBorderColor.description"),
            } ,
            [ComponentSelectorConfigs.keys.prop_selectorBorderWidth.name]: {
                prop:                                             ComponentSelectorConfigs.keys.prop_selectorBorderWidth.name,
                default:                                          ComponentSelectorConfigs.keys.prop_selectorBorderWidth.value,
                title:                                            Language.translate("components.selector.prop.prop_selectorBorderWidth.title"),
                description:                                      Language.translate("components.selector.prop.prop_selectorBorderWidth.description"),
            } ,
            [ComponentSelectorConfigs.keys.prop_selectorBorderRadius.name]: {
                prop:                                             ComponentSelectorConfigs.keys.prop_selectorBorderRadius.name,
                default:                                          ComponentSelectorConfigs.keys.prop_selectorBorderRadius.value,
                title:                                            Language.translate("components.selector.prop.prop_selectorBorderRadius.title"),
                description:                                      Language.translate("components.selector.prop.prop_selectorBorderRadius.description"),
            } ,
            [ComponentSelectorConfigs.keys.prop_selectorBorderOpacity.name]: {
                prop:                                             ComponentSelectorConfigs.keys.prop_selectorBorderOpacity.name,
                default:                                          ComponentSelectorConfigs.keys.prop_selectorBorderOpacity.value,
                title:                                            Language.translate("components.selector.prop.prop_selectorBorderOpacity.title"),
                description:                                      Language.translate("components.selector.prop.prop_selectorBorderOpacity.description"),
            } ,
        }
    );


    /* ---------------------------------------------
     PROPERTYs Props
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentSelectorSchemaType  , ComponentSelectorPropsType>( {
        ...GOG_ComponentBasicConfigs_Component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this) ,
        [ComponentSelectorConfigs.schemas.FIX.name]: {
            part:                                                   ComponentSelectorConfigs.schemas.FIX.name ,
            title:                                                  Language.translate("components.selector.schema.fix.title") ,
            description:                                            Language.translate("components.selector.schema.fix.description") ,
            props: [
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_keys.selector.name] ,
            ]
        } ,
        [ComponentSelectorConfigs.schemas.SELECTOR.name]: {
            part:                                                   ComponentSelectorConfigs.schemas.SELECTOR.name ,
            title:                                                  Language.translate("components.selector.schema.selector.title") ,
            description:                                            Language.translate("components.selector.schema.selector.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentSelectorConfigs.keys.prop_selectorColor.name] ,
                this._COMPONENT_PATTERN[ComponentSelectorConfigs.keys.prop_selectorBorderColor.name] ,
                this._COMPONENT_PATTERN[ComponentSelectorConfigs.keys.prop_selectorBorderWidth.name] ,
                this._COMPONENT_PATTERN[ComponentSelectorConfigs.keys.prop_selectorBorderRadius.name] ,
                this._COMPONENT_PATTERN[ComponentSelectorConfigs.keys.prop_selectorBorderOpacity.name] ,
            ]
        } ,
    });



    /* ---------------------------------------------
        PROPERTYs Pattern
     --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentSelectorTemplatesType , ComponentSelectorPropsType>({

    });



    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentSelectorMethodsType , ComponentSelectorPropsType>({

    });




    /* ---------------------------------------------
        Example
     --------------------------------------------- */
    static override renderExampleComponent(extraData): HTMLElement {
        return new ComponentSelector(
            <ComponentSelectorPropsType>{
                selector:   extraData?.selector ,
                append:      true ,
                styles:     {}  ,

            },
            <ComponentSelectorMethodsType>{

            }
        ).getElement();
    }


}

export class ComponentSelector extends ComponentSelectorBase{

    /* ---------------------------------------------
     SETUP
  --------------------------------------------- */
    constructor(
        config: ComponentSelectorPropsType ,
        methods: ComponentSelectorMethodsType ,
        events = null
    ) {
        super("selector" , null);
        super.renderComponent(config , methods , events);
    }




    /* ---------------------------------------------
       TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentSelectorConfigs.schemas.FIX.name)
    }

    override renderManagerComponent(partName , attrsDefault , data , extra) :  ReactiveElement {
        switch (partName){
            case ComponentSelectorConfigs.schemas.FIX.name:
                return  this.template_render_fix(attrsDefault , data , extra);
            case ComponentSelectorConfigs.schemas.SELECTOR.name:
                return  this.template_render_selector(attrsDefault , data , extra);
        }
    }


    private template_render_fix(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {
            const selector              =   data[GOG_ComponentBasicConfigs_Component_keys.selector.name] ;
            const selectorValue = selector.get();

            if (selectorValue){
                const elSelector = document.querySelector(selectorValue);

                if (elSelector){
                    const elBounding = elSelector.getBoundingClientRect();

                    return  ReactiveElement.component( this._COMPONENT_NAME ,{
                        attrs: {
                            ...attrsDefault
                        },
                        className: [
                            "position-fixed" ,
                        ],
                        classBind: [

                        ] ,
                        styles: {
                            inset :        "0" ,
                            pointerEvent : "none" ,
                            zIndex :       `${ToolsCss.getZIndex(Z_INDEXES.SELECTOR)}` ,
                            left:          `${elBounding?.left}px`,
                            top:           `${elBounding?.top}px`,
                            width:         `${elBounding?.width}px`,
                            height:        `${elBounding?.height}px`,
                        },
                        stylesBind: {

                        },
                        children: [
                            this.executeSchemaPart(ComponentSelectorConfigs.schemas.SELECTOR.name)
                        ]
                    })
                }


            }

        }

        return  ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }

    private template_render_selector(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {
            const prop_selectorColor              =   data[ComponentSelectorConfigs.keys.prop_selectorColor.name] ;
            const prop_selectorBorderColor        =   data[ComponentSelectorConfigs.keys.prop_selectorBorderColor.name] ;
            const prop_selectorBorderWidth        =   data[ComponentSelectorConfigs.keys.prop_selectorBorderWidth.name] ;
            const prop_selectorBorderRadius       =   data[ComponentSelectorConfigs.keys.prop_selectorBorderRadius.name] ;
            const prop_selectorBorderOpacity      =   data[ComponentSelectorConfigs.keys.prop_selectorBorderOpacity.name] ;

            return new ToolsComponents.ComponentBorder(
                <ComponentBorderPropsType>{
                    classList:                    ["position-absolute"] ,
                    styles:                       {width: "100%" , height: "100%" , top: "0" , left: "0"  } ,
                    prop_structureStyles:         {width: "100%" , height: "100%"  } ,
                    prop_borderClass:             [] ,
                    prop_borderStyles:            {width: "100%" , height: "100%"  }  ,
                    prop_contentBackgroundColor:  prop_selectorColor ,
                    prop_borderColor:             prop_selectorBorderColor ,
                    prop_borderRadius:            prop_selectorBorderRadius ,
                    prop_borderWidth:             prop_selectorBorderWidth ,
                    prop_borderOpacity:           prop_selectorBorderOpacity
                } ,
                <ComponentBorderMethodsType>{

                }
            ).getReactiveElement()


        }

        return ReactiveElement.section({
            attrs: {
                ...attrsDefault
            }
        });
    }


}
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







export const ComponentRecyclerViewProps = {
    ... GOG_ComponentBasicProps_component,
    ... GOG_ComponentBasicProps_structure,
    prop_formClass :                        "prop_formClass" ,
    prop_formStyles :                       "prop_formStyles" ,
    prop_formDirection :                    "prop_formDirection" ,
    prop_formComponents :                   "prop_formComponents" ,
} as const;




enum ComponentRecyclerView_DirectionTypes{
    VERTICAL=            "vertical" ,
    VERTICAL_REVERSE =   "vertical_reverse",
    HORIZONTAL =         "horizontal",
    HORIZONTAL_REVERSE = "horizontal_reverse",
}




const ComponentRecyclerViewConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_component_keys ,
        ...GOG_ComponentBasicConfigs_structure_keys ,
        ///----------------------
        [ComponentRecyclerViewProps.prop_formClass]: {
            name:                     ComponentRecyclerViewProps.prop_formClass  ,
            value:                    GOG_SetValue<string[]>([]) ,
        } ,
        [ComponentRecyclerViewProps.prop_formStyles]:{
            name:                     ComponentRecyclerViewProps.prop_formStyles  ,
            value:                    GOG_SetValue<Record<string, string>>({}) ,
        } ,
        [ComponentRecyclerViewProps.prop_formDirection]:{
            name:                     ComponentRecyclerViewProps.prop_formDirection  ,
            value:                    GOG_SetValue<GOG_ValueOf<typeof ComponentRecyclerView_DirectionTypes>>(ComponentRecyclerView_DirectionTypes.VERTICAL),
        }  ,
        [ComponentRecyclerViewProps.prop_formComponents]:{
            name:                     ComponentRecyclerViewProps.prop_formComponents  ,
            value:                    GOG_SetValue<ReactiveElement[]>([]),
        } ,
    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_component_parts ,
        ...GOG_ComponentBasicConfigs_structure_parts ,
        COMPONENTS: {
            name:                     "part_components"
        } ,
    } ,
    templates: {

    } ,
    methods: {

    }
} as const


export type ComponentRecyclerViewPropsType =     GOG_ExtractNameValue<typeof ComponentRecyclerViewConfigs.keys>
export type ComponentRecyclerViewSchemaType =    GOG_ExtractName<typeof ComponentRecyclerViewConfigs.schemas>
export type ComponentRecyclerViewTemplatesType = GOG_ExtractName<typeof ComponentRecyclerViewConfigs.templates>

export type ComponentRecyclerViewMethodsType = {

}







export class ComponentRecyclerViewBase extends ComponentBase<
    ComponentRecyclerViewPropsType ,
    ComponentRecyclerViewSchemaType ,
    ComponentRecyclerViewTemplatesType ,
    ComponentRecyclerViewMethodsType
    >{


    /* ---------------------------------------------
        PROPERTYs Pattern
     --------------------------------------------- */
    _COMPONENT_PATTERN=  defineComponentPatterns<ComponentRecyclerViewPropsType>(
        {
            ...GOG_ComponentBasicConfigs_component_Pattern(this) ,
            ...GOG_ComponentBasicConfigs_structure_Pattern(this) ,
            [ComponentRecyclerViewConfigs.keys.prop_formClass.name]: {
                prop:                                             ComponentRecyclerViewConfigs.keys.prop_formClass.name,
                default:                                          ComponentRecyclerViewConfigs.keys.prop_formClass.value,
                title:                                            Language.translate("components.recycler_view.props.prop_formClass.title"),
                description:                                      Language.translate("components.recycler_view.props.prop_formClass.description"),
            } ,
            [ComponentRecyclerViewConfigs.keys.prop_formStyles.name] : {
                prop:                                             ComponentRecyclerViewConfigs.keys.prop_formStyles.name,
                default:                                          ComponentRecyclerViewConfigs.keys.prop_formStyles.value,
                title:                                            Language.translate("components.recycler_view.props.prop_formStyles.title"),
                description:                                      Language.translate("components.recycler_view.props.prop_formStyles.description"),
            } ,
            [ComponentRecyclerViewConfigs.keys.prop_formComponents.name]: {
                prop:                                             ComponentRecyclerViewConfigs.keys.prop_formComponents.name,
                default:                                          ComponentRecyclerViewConfigs.keys.prop_formComponents.value,
                title:                                            Language.translate("components.recycler_view.props.prop_formComponents.title"),
                description:                                      Language.translate("components.recycler_view.props.prop_formComponents.description"),
            },
            [ComponentRecyclerViewConfigs.keys.prop_formDirection.name]: {
                prop:                                             ComponentRecyclerViewConfigs.keys.prop_formDirection.name ,
                default:                                          ComponentRecyclerViewConfigs.keys.prop_formDirection.value,
                title:                                            Language.translate("components.recycler_view.props.prop_formDirection.title"),
                description:                                      Language.translate("components.recycler_view.props.prop_formDirection.description"),
            },
        }
    )


    /* ---------------------------------------------
           PROPERTYs Props
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentRecyclerViewSchemaType  , ComponentRecyclerViewPropsType>( {
        ...GOG_ComponentBasicConfigs_component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_structure_Schema(this) ,
        [ComponentRecyclerViewConfigs.schemas.COMPONENTS.name]: {
            part:                                                  ComponentRecyclerViewConfigs.schemas.COMPONENTS.name ,
            title:                                                 Language.translate("components.recycler_view.schema.components.title") ,
            description:                                           Language.translate("components.recycler_view.schema.components.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentRecyclerViewConfigs.keys.prop_formClass.name] ,
                this._COMPONENT_PATTERN[ComponentRecyclerViewConfigs.keys.prop_formStyles.name]  ,
                this._COMPONENT_PATTERN[ComponentRecyclerViewConfigs.keys.prop_formDirection.name] ,
                this._COMPONENT_PATTERN[ComponentRecyclerViewConfigs.keys.prop_formComponents.name] ,
            ]
        } ,
    });


    /* ---------------------------------------------
    PROPERTYs Methods
     --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentRecyclerViewMethodsType , ComponentRecyclerViewPropsType>({

    });


    /* ---------------------------------------------
        PROPERTYs Pattern
     --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentRecyclerViewTemplatesType , ComponentRecyclerViewPropsType>({

    });




    /* ---------------------------------------------
        Example
     --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        return new ComponentRecyclerView(
            <ComponentRecyclerViewPropsType>{

                classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                // styles: {} ,
                // prop_show: 0 ,

                prop_formClass: ["aaa"],
                prop_formStyles: {},
                prop_formDirection: "horizontal" ,
                prop_formComponents: [
                    ReactiveElement.section({
                        className:[
                            "border-end" , "border-dark" , "px-2"
                        ] ,
                        children: [
                            "item1"
                        ]
                    }) ,
                    ReactiveElement.section({
                        className:[
                            "border-end" , "border-dark" , "px-2"
                        ] ,
                        children: [
                            "item2"
                        ]
                    })
                ]
            } ,
            <ComponentRecyclerViewMethodsType>{

            }
        ).getElement();
    }


}
export class ComponentRecyclerView extends ComponentRecyclerViewBase{

    /* ---------------------------------------------
       SETUP
    --------------------------------------------- */
    constructor( 
        config: ComponentRecyclerViewPropsType ,
        methods: ComponentRecyclerViewMethodsType
    ) {

        super("recycler-view" , null);
        super.renderComponent(config , methods);
    }



    /* ---------------------------------------------
       TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentRecyclerViewConfigs.schemas.COMPONENTS.name)
    }

    override renderManagerComponent(partName , attrsDefault , data , extra) :  ReactiveElement {
        switch (partName){
            case ComponentRecyclerViewConfigs.schemas.COMPONENTS.name:
                return  this.template_render_components(attrsDefault , data , extra);
        }
    }


    private template_render_components(attrsDefault , data , extra) : ReactiveElement {

        if (data != null){
            const prop_formClass        =   data[ComponentRecyclerViewConfigs.keys.prop_formClass.name] ;
            const prop_formStyles       =   data[ComponentRecyclerViewConfigs.keys.prop_formStyles.name] ;
            const prop_formComponents   =   data[ComponentRecyclerViewConfigs.keys.prop_formComponents.name] ;
            const prop_formDirection    =   data[ComponentRecyclerViewConfigs.keys.prop_formDirection.name] ;

            let classDirection = {};
            classDirection[ComponentRecyclerView_DirectionTypes.HORIZONTAL] =           [ "flex-row"] ;
            classDirection[ComponentRecyclerView_DirectionTypes.HORIZONTAL_REVERSE] =   [ "flex-row-reverse"] ;
            classDirection[ComponentRecyclerView_DirectionTypes.VERTICAL] =             [ "flex-column" ];
            classDirection[ComponentRecyclerView_DirectionTypes.VERTICAL_REVERSE] =     [ "flex-column-reverse"];

           return  ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                stylesBind: {
                    prop_formStyles ,
                },
                className: [
                    "d-flex"
                ] ,
                classBind: [
                    prop_formDirection.mapList(classDirection) ,
                    prop_formClass
                ],
                children: [
                    prop_formComponents
                ] ,
                on:{

                }
            });

        }


        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }





    /* ---------------------------------------------
       FUNCTIONs
    --------------------------------------------- */

}

import {
    GOG_ComponentConfigBasicKey,
    GOG_ComponentConfigBasicType,
    ComponentBase,
    ComponentCallBackType,
    IComponentProp,
    defineComponentProps,
    defineComponentPatterns,
    defineComponentTemplate,
    GOG_ComponentConfigBasicPattern,
    defineComponentMethods,
    GOG_SetValue,
    GOG_ValueOf,
    GOG_ExtractNameValue, GOG_ExtractName, extractPropNames, GOG_ComponentConfigBasicProps,
} from "../../core/ComponentBase";
import {ReactiveElement} from "../../core/ReactiveElement";

import {ToolsCss} from "../../utils/ToolsCss";

import {ToolsComponents} from "./index";
import {ToolsIcons} from "../icons";

import {Language} from "../../core/Language";
import {AppConfig} from "../../core/AppConfig";
import {
    Color,
    COLORS_GRAD,
    COLORS_MAIN,
    IconsType,
    SIZES,
    ToolsComponents_BorderRadius,
    ToolsComponents_BorderWidth
} from "../../utils/ToolsConsts";
import {type} from "node:os";
import {en} from "../../langs/En";







export const ComponentRecyclerViewProps = {
    ...GOG_ComponentConfigBasicProps ,
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
        ...GOG_ComponentConfigBasicKey ,
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
        COMPONENT: {
            name:               "part_component"
        } ,
        STRUCTURE: {
            name:                     "part_structure"
        } ,
        COMPONENTS: {
            name:                     "part_components"
        } ,
    } ,
    templates: {

    } ,
    methods: {

    }
} as const


export type ComponentRecyclerViewPropsType =     GOG_ComponentConfigBasicType & GOG_ExtractNameValue<typeof ComponentRecyclerViewConfigs.keys>
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
            ...GOG_ComponentConfigBasicPattern ,
            [ComponentRecyclerViewConfigs.keys.prop_formClass.name]: {
                prop:                                             ComponentRecyclerViewConfigs.keys.prop_formClass.name,
                default:                                          ComponentRecyclerViewConfigs.keys.prop_formClass.value,
                title:                                            Language.translate("components.recyclerView.prop_formClass.title"),
                description:                                      Language.translate("components.recyclerView.prop_formClass.description"),
            } ,
            [ComponentRecyclerViewConfigs.keys.prop_formStyles.name] : {
                prop:                                             ComponentRecyclerViewConfigs.keys.prop_formStyles.name,
                default:                                          ComponentRecyclerViewConfigs.keys.prop_formStyles.value,
                title:                                            Language.translate("components.recyclerView.prop_formStyles.title"),
                description:                                      Language.translate("components.recyclerView.prop_formStyles.description"),
            } ,
            [ComponentRecyclerViewConfigs.keys.prop_formComponents.name]: {
                prop:                                             ComponentRecyclerViewConfigs.keys.prop_formComponents.name,
                default:                                          ComponentRecyclerViewConfigs.keys.prop_formComponents.value,
                title:                                            Language.translate("components.recyclerView.prop_formComponents.title"),
                description:                                      Language.translate("components.recyclerView.prop_formComponents.description"),
            },
            [ComponentRecyclerViewConfigs.keys.prop_formDirection.name]: {
                prop:                                             ComponentRecyclerViewConfigs.keys.prop_formDirection.name ,
                default:                                          ComponentRecyclerViewConfigs.keys.prop_formDirection.value,
                title:                                            Language.translate("components.recyclerView.prop_formDirection.title"),
                description:                                      Language.translate("components.recyclerView.prop_formDirection.description"),
            },
        }
    )


    /* ---------------------------------------------
           PROPERTYs Props
    --------------------------------------------- */
    _COMPONENT_PROPS = defineComponentProps<ComponentRecyclerViewSchemaType  , ComponentRecyclerViewPropsType>( {
        [ComponentRecyclerViewConfigs.schemas.COMPONENT.name]: [

        ],
        [ComponentRecyclerViewConfigs.schemas.STRUCTURE.name]: [

        ],
        [ComponentRecyclerViewConfigs.schemas.COMPONENTS.name]: [
            this._COMPONENT_PATTERN[ComponentRecyclerViewConfigs.keys.prop_formClass.name] ,
            this._COMPONENT_PATTERN[ComponentRecyclerViewConfigs.keys.prop_formStyles.name]  ,
            this._COMPONENT_PATTERN[ComponentRecyclerViewConfigs.keys.prop_formDirection.name] ,
            this._COMPONENT_PATTERN[ComponentRecyclerViewConfigs.keys.prop_formComponents.name] ,
        ],
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


}
export class ComponentRecyclerView extends ComponentRecyclerViewBase{

    /* ---------------------------------------------
       SETUP
    --------------------------------------------- */
    constructor( 
        config: ComponentRecyclerViewPropsType ,
        methods: ComponentRecyclerViewMethodsType
    ) {

        super("component-recycler-view" , null);
        super.renderComponent(config , methods);
    }



    /* ---------------------------------------------
       TEMPLATEs
    --------------------------------------------- */

    override template_render_structure() {
        const partName = ComponentRecyclerViewConfigs.schemas.STRUCTURE.name;
        const data = this.getPartProps(partName);

        return this.templateBasic_render_structure(
            ReactiveElement.section({
                children: [
                    this.#template_render_components() ,
                ]
            })
        );
    }

    #template_render_components() {
        const partName = ComponentRecyclerViewConfigs.schemas.COMPONENTS.name;
        const data = this.getPartProps(partName)

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

            return ReactiveElement.section({
                attrs: {
                    "data-part-name":     partName,
                    "id":                `component-recycler-view-components-${this._COMPONENT_RANDOM_ID}`,
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

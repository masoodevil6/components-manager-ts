import {
    ComponentBase,
    defineComponentMethods,
    defineComponentPatterns,
    defineComponentSchema,
    defineComponentTemplate,
    GOG_ExtractName,
    GOG_ExtractNameValue,
    GOG_SetValue,
    GOG_ValueOf, IComponentProp
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
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_keys,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_parts,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_parts,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_keys,
    GOG_ComponentBasicConfigs_Component_Structure_parts,
    GOG_ComponentBasicConfigs_Component_Structure_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_Schema, GOG_ComponentBasicConfigs_partDoseNotBody,
    GOG_ComponentBasicProps_Component,
    GOG_ComponentBasicProps_Component_Structure,
    GOG_ComponentBasicProps_Component_Structure_FormInput,
    GOG_ComponentBasicProps_Component_Structure_FormInput_Label,
} from "../../core/component/SetupComponent";
import {Observable} from "../../core/Observable";




export const ComponentInputListSelectorProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput,
    ...GOG_ComponentBasicProps_Component_Structure_FormInput_Label ,

    ///----------------------
} as const;



const ComponentInputListSelectorConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys ,

        ///----------------------
    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_Component_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_parts ,

        ///----------------------
        Main: {
            name:                      "part-main"
        } ,
        Main_FormIcon: {
            name:                      "part-main-formIcon"
        } ,
        Main_FormList: {
            name:                      "part-main-formList"
        } ,
    } ,
    templates: {

    } ,
    methods: {

    }
} as const


export type ComponentInputListSelectorPropsType =        GOG_ExtractNameValue<typeof ComponentInputListSelectorConfigs.keys>
export type ComponentInputListSelectorSchemaType =       GOG_ExtractName<typeof ComponentInputListSelectorConfigs.schemas>
export type ComponentInputListSelectorTemplatesType =    GOG_ExtractName<typeof ComponentInputListSelectorConfigs.templates>

export type ComponentInputListSelectorMethodsType = {

}


export abstract class ComponentInputListSelectorBase extends ComponentBase<
    ComponentInputListSelectorPropsType ,
    ComponentInputListSelectorSchemaType ,
    ComponentInputListSelectorTemplatesType ,
    ComponentInputListSelectorMethodsType
    >{


    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN=  defineComponentPatterns<ComponentInputListSelectorPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Pattern(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Pattern(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Pattern(this) ,

        ///----------------------
    });



    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentInputListSelectorSchemaType , ComponentInputListSelectorPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Schema(this) ,

        ///----------------------
        [ComponentInputListSelectorConfigs.schemas.Main.name]: {
            part:               ComponentInputListSelectorConfigs.schemas.Main.name ,
            title:              Language.translate("components.input_list_selector.schema.main.title") ,
            description:        Language.translate("components.input_list_selector.schema.main.description") ,
            props: [

            ]
        } ,
        [ComponentInputListSelectorConfigs.schemas.Main_FormIcon.name]: {
            part:               ComponentInputListSelectorConfigs.schemas.Main_FormIcon.name ,
            title:              Language.translate("components.input_list_selector.schema.main_formIcon.title") ,
            description:        Language.translate("components.input_list_selector.schema.main_formIcon.description") ,
            props: [

            ]
        } ,
        [ComponentInputListSelectorConfigs.schemas.Main_FormList.name]: {
            part:               ComponentInputListSelectorConfigs.schemas.Main_FormList.name ,
            title:              Language.translate("components.input_list_selector.schema.main_formList.title") ,
            description:        Language.translate("components.input_list_selector.schema.main_formList.description") ,
            props: [

            ]
        } ,
    })


    /* ---------------------------------------------
           PROPERTYs Pattern
        --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentInputListSelectorTemplatesType , ComponentInputListSelectorPropsType>({

    });


    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentInputListSelectorMethodsType , ComponentInputListSelectorPropsType>({

    });


    /* ---------------------------------------------
       Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        return new ComponentInputListSelector(
            <ComponentInputListSelectorPropsType>{
                classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                styles: {}  ,

                prop_labelTitle: "Input List Selector" ,
                prop_labelTooltipDescription: "this is input-list-selector"
            },
            <ComponentInputListSelectorMethodsType>{

            }
        ).getElement();
    }


}


export class ComponentInputListSelector extends ComponentInputListSelectorBase {

    /* ---------------------------------------------
       SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentInputListSelectorPropsType,
        methods: ComponentInputListSelectorMethodsType
    ) {
        super("input-list-selector", null);
        super.renderComponent(config, methods);
    }


    /* ---------------------------------------------
      TEMPLATEs
     --------------------------------------------- */

    override renderContentComponent() {
        return this.executeSchemaPart(ComponentInputListSelectorConfigs.schemas.Main.name)
    }

    override renderManagerComponent(partName , attrsDefault, data , extra) : ReactiveElement {
        switch (partName){
            case ComponentInputListSelectorConfigs.schemas.Main.name:
                return  this.template_render_main(attrsDefault , data , extra);
            case ComponentInputListSelectorConfigs.schemas.Main_FormList.name:
                return  this.template_render_main_formList(attrsDefault , data , extra);
            case ComponentInputListSelectorConfigs.schemas.Main_FormIcon.name:
                return  this.template_render_main_formIcon(attrsDefault , data , extra);
        }
    }

    private template_render_main(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                className: [
                    "row" , "p-0" , "m-0"
                ] ,
                children: [
                    this.executeSchemaPart(ComponentInputListSelectorConfigs.schemas.Main_FormList.name) ,
                    this.executeSchemaPart(ComponentInputListSelectorConfigs.schemas.Main_FormIcon.name)
                ]
            });

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    private template_render_main_formList(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                className: [
                    "col-12" , "col-md-10"
                ] ,
                children: [
                    "HI"
                ]
            });

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_main_formIcon(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                className: [
                    "col-12" , "col-md-2"
                ] ,
                children: [
                    "HI"
                ]
            });

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }



}

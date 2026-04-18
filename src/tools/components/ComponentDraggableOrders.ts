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
    IconsType, OPERATION, SizeCalc,
    SIZES, SizesType, SizeUnit,
    ToolsComponents_BorderRadius,
    ToolsComponents_BorderWidth, TranslateUnit, UNITS, Z_INDEXES
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
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_value_parts,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_keys,
    GOG_ComponentBasicConfigs_Component_Structure_parts,
    GOG_ComponentBasicConfigs_Component_Structure_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_Schema,
    GOG_ComponentBasicConfigs_partDoseNotBody,
    GOG_ComponentBasicProps_Component,
    GOG_ComponentBasicProps_Component_Structure,
    GOG_ComponentBasicProps_Component_Structure_FormInput,
    GOG_ComponentBasicProps_Component_Structure_FormInput_Label,
    GOG_ComponentBasicProps_Component_Structure_FormInput_Value,
} from "../../core/component/SetupComponent";
import {Observable} from "../../core/Observable";
import {
    ComponentInputAgreementCheckBox,
    ComponentInputAgreementCheckBox_Methods_CLICK_ALL_ComponentArgs,
    ComponentInputAgreementCheckBox_Methods_CLICK_ALL_DataArgs,
    ComponentInputAgreementCheckBox_Methods_CLICK_ITEM_ComponentArgs,
    ComponentInputAgreementCheckBox_Methods_CLICK_ITEM_DataArgs, ComponentInputAgreementCheckBoxBase,
    ComponentInputAgreementCheckBoxMethodsType,
    ComponentInputAgreementCheckBoxProps,
    ComponentInputAgreementCheckBoxPropsType,
    ComponentInputAgreementCheckBoxSchemaType,
    ComponentInputAgreementCheckBoxTemplatesType,
    propAgreementCheckBoxType
} from "./ComponentInputAgreementCheckBox";



export const ComponentDraggableOrdersProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    ///----------------------

} as const;


const ComponentDraggableOrdersConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys ,
        ///----------------------


    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_Component_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts ,
        ///----------------------
        Main: {
            name:                      "part-main"
        } ,


    } ,
    templates: {

    } ,
    methods: {

    }
} as const;



export type ComponentDraggableOrdersPropsType =        GOG_ExtractNameValue<typeof ComponentDraggableOrdersConfigs.keys>
export type ComponentDraggableOrdersSchemaType =       GOG_ExtractName<typeof ComponentDraggableOrdersConfigs.schemas>
export type ComponentDraggableOrdersTemplatesType =    GOG_ExtractName<typeof ComponentDraggableOrdersConfigs.templates>


export type ComponentDraggableOrdersMethodsType = {

}


export abstract class ComponentDraggableOrdersBase extends ComponentBase<
    ComponentDraggableOrdersPropsType ,
    ComponentDraggableOrdersSchemaType ,
    ComponentDraggableOrdersTemplatesType ,
    ComponentDraggableOrdersMethodsType
    > {

    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN = defineComponentPatterns<ComponentDraggableOrdersPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Pattern(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this) ,
        ///----------------------

    });



    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentDraggableOrdersSchemaType , ComponentDraggableOrdersPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this) ,
        ///----------------------
        [ComponentDraggableOrdersConfigs.schemas.Main.name]: {
            part:               ComponentDraggableOrdersConfigs.schemas.Main.name ,
            title:              Language.translate("components.draggable_orders.schema.main.title") ,
            description:        Language.translate("components.draggable_orders.schema.main.description") ,
            props: [

            ]
        } ,

    });



    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentDraggableOrdersTemplatesType , ComponentDraggableOrdersPropsType>({

    });




    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentDraggableOrdersMethodsType , ComponentDraggableOrdersPropsType>({

    });


    /* ---------------------------------------------
        Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        return new ComponentDraggableOrders(
            <ComponentDraggableOrdersPropsType>{
                classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                styles: {}  ,

            },
            <ComponentDraggableOrdersMethodsType>{

            }
        ).getElement();
    }


}


export class ComponentDraggableOrders extends ComponentDraggableOrdersBase {


    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentDraggableOrdersPropsType,
        methods: ComponentDraggableOrdersMethodsType
    ) {
        super("draggable-orders", null);
        super.renderComponent(config, methods);
    }


    /* ---------------------------------------------
    TEMPLATEs
  --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentDraggableOrdersConfigs.schemas.Main.name)
    }

    override renderManagerComponent(partName , attrsDefault, data , extra) : ReactiveElement {
        switch (partName){
            case ComponentDraggableOrdersConfigs.schemas.Main.name:
                return  this.template_render_main(attrsDefault , data , extra);
        }
    }


    private template_render_main(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                styles: {},
                className: [
                    "p-0" , "m-0" , "mt-1"
                ] ,
                children: [
                    "hello World"
                ]
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

}
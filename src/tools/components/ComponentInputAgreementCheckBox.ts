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
    ComponentInputCheckBox,
    ComponentInputCheckBox_Methods_CLICK_ComponentArgs,
    ComponentInputCheckBox_Methods_CLICK_DataArgs, ComponentInputCheckBoxBase, ComponentInputCheckBoxConfigs,
    ComponentInputCheckBoxMethodsType,
    ComponentInputCheckBoxProps,
    ComponentInputCheckBoxPropsType,
    ComponentInputCheckBoxSchemaType,
    ComponentInputCheckBoxTemplatesType
} from "./ComponentInputCheckBox";
import {ComponentLabel_Methods_CLICK_ComponentArgs, ComponentLabel_Methods_CLICK_DataArgs} from "./ComponentLabel";
import {
    ComponentDraggableOrdersY,
    ComponentDraggableOrdersY_Methods_UPDATE_ComponentArgs,
    ComponentDraggableOrdersY_Methods_UPDATE_DataArgs,
    ComponentDraggableOrdersYMethodsType,
    ComponentDraggableOrdersYPropsType
} from "./ComponentDraggableOrdersY";
import {fa} from "../../langs/Fa";



export const ComponentInputAgreementCheckBoxProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput,
    ...GOG_ComponentBasicProps_Component_Structure_FormInput_Value ,
    ...GOG_ComponentBasicProps_Component_Structure_FormInput_Label ,
    ///----------------------
    prop_checkBoxAllTitle :                  "prop_checkBoxAllTitle" ,
    prop_checkBoxList :                      "prop_checkBoxList" ,
    prop_checkBoxOrderStatus :               "prop_checkBoxOrderStatus" ,
    prop_checkBoxOrder :                     "prop_checkBoxOrder" ,
    prop_maxHeightItems :                    "prop_maxHeightItems" ,

} as const;


export type propAgreementCheckBoxType = {
    id:               string|number;
    title?:           Observable<string>| string| null;
    isPin?:           boolean;
};


const ComponentInputAgreementCheckBoxConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys ,
        ///----------------------
        [ComponentInputAgreementCheckBoxProps.prop_checkBoxAllTitle]: {
            name:               ComponentInputAgreementCheckBoxProps.prop_checkBoxAllTitle,
            value:              GOG_SetValue<Observable<string>>(  Language.translate("components.input_agreement_check_box.prop.prop_checkBoxAllTitle.value")) ,
        } ,
        [ComponentInputAgreementCheckBoxProps.prop_checkBoxList]: {
            name:                      ComponentInputAgreementCheckBoxProps.prop_checkBoxList ,
            value:                     GOG_SetValue<propAgreementCheckBoxType[]>([]),
        } ,
        [ComponentInputAgreementCheckBoxProps.prop_checkBoxOrderStatus]: {
            name:                      ComponentInputAgreementCheckBoxProps.prop_checkBoxOrderStatus ,
            value:                     GOG_SetValue<boolean>(true),
        } ,
        [ComponentInputAgreementCheckBoxProps.prop_checkBoxOrder]: {
            name:                      ComponentInputAgreementCheckBoxProps.prop_checkBoxOrder ,
            value:                     GOG_SetValue<(string|number)[]>([]),
        } ,
        [ComponentInputAgreementCheckBoxProps.prop_maxHeightItems]: {
            name:                      ComponentInputAgreementCheckBoxProps.prop_maxHeightItems ,
            value:                     GOG_SetValue<SizeUnit | SizeCalc | null>( SizeUnit(200 , UNITS.PEXEL)) ,
        } ,

    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_Component_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_value_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_parts ,
        ///----------------------
        Main: {
            name:                      "part-main"
        } ,
        Main_inputOrder: {
            name:                      "part-inputOrder"
        } ,
        Main_CheckBoxAll: {
            name:                      "part-main-checkBoxAll"
        } ,
        Main_CheckBoxList: {
            name:                      "part-main-checkBoxList"
        } ,
        Main_CheckBoxList_CheckBoxItem: {
            name:                      "part-main-checkBoxList-checkBoxItem"
        } ,

    } ,
    templates: {

    } ,
    methods: {
        CLICK_ALL: {
            name:                      "fn_onClickAll" ,
            dataArgs: {},
            componentArgs: {
                IS_DISABLE : {
                    name:                 "isDisable"
                } ,
                LIST : {
                    name:                 "list"
                } ,
                VALUE : {
                    name:                 "value"
                }
            }
        },
        CLICK_ITEM: {
            name:                      "fn_onClickItem" ,
            dataArgs: {},
            componentArgs: {
                IS_DISABLE : {
                    name:                 "IS_DISABLE"
                } ,
                LIST : {
                    name:                 "LIST"
                } ,
                VALUE : {
                    name:                 "VALUE"
                }
            }
        },
    }
} as const


export type ComponentInputAgreementCheckBoxPropsType =        GOG_ExtractNameValue<typeof ComponentInputAgreementCheckBoxConfigs.keys>
export type ComponentInputAgreementCheckBoxSchemaType =       GOG_ExtractName<typeof ComponentInputAgreementCheckBoxConfigs.schemas>
export type ComponentInputAgreementCheckBoxTemplatesType =    GOG_ExtractName<typeof ComponentInputAgreementCheckBoxConfigs.templates>

export type ComponentInputAgreementCheckBox_Methods_CLICK_ALL_ComponentArgs =   GOG_ExtractName<typeof ComponentInputAgreementCheckBoxConfigs.methods.CLICK_ALL.componentArgs>
export type ComponentInputAgreementCheckBox_Methods_CLICK_ALL_DataArgs =        GOG_ExtractNameValue<typeof ComponentInputAgreementCheckBoxConfigs.methods.CLICK_ALL.dataArgs>

export type ComponentInputAgreementCheckBox_Methods_CLICK_ITEM_ComponentArgs =   GOG_ExtractName<typeof ComponentInputAgreementCheckBoxConfigs.methods.CLICK_ITEM.componentArgs>
export type ComponentInputAgreementCheckBox_Methods_CLICK_ITEM_DataArgs =        GOG_ExtractNameValue<typeof ComponentInputAgreementCheckBoxConfigs.methods.CLICK_ITEM.dataArgs>

export type ComponentInputAgreementCheckBoxMethodsType = {
    [ComponentInputAgreementCheckBoxConfigs.methods.CLICK_ALL.name]:  ComponentCallBackType<ComponentInputAgreementCheckBox_Methods_CLICK_ALL_ComponentArgs , ComponentInputAgreementCheckBox_Methods_CLICK_ALL_DataArgs>
    [ComponentInputAgreementCheckBoxConfigs.methods.CLICK_ITEM.name]: ComponentCallBackType<ComponentInputAgreementCheckBox_Methods_CLICK_ITEM_ComponentArgs , ComponentInputAgreementCheckBox_Methods_CLICK_ITEM_DataArgs>
}





export abstract class ComponentInputAgreementCheckBoxBase extends ComponentBase<
    ComponentInputAgreementCheckBoxPropsType ,
    ComponentInputAgreementCheckBoxSchemaType ,
    ComponentInputAgreementCheckBoxTemplatesType ,
    ComponentInputAgreementCheckBoxMethodsType
    > {

    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN = defineComponentPatterns<ComponentInputAgreementCheckBoxPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Pattern(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Pattern(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Pattern(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Pattern(this) ,
        ///----------------------
        [ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxAllTitle.name]: {
            prop:                                             ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxAllTitle.name,
            default:                                          ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxAllTitle.value,
            title:                                            Language.translate("components.input_agreement_check_box.prop.prop_checkBoxAllTitle.title"),
            description:                                      Language.translate("components.input_agreement_check_box.prop.prop_checkBoxAllTitle.description"),
        } ,
        [ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxList.name]: {
            prop:                                             ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxList.name,
            default:                                          ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxList.value,
            title:                                            Language.translate("components.input_agreement_check_box.prop.prop_checkBoxList.title"),
            description:                                      Language.translate("components.input_agreement_check_box.prop.prop_checkBoxList.description"),
        } ,
        [ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxOrderStatus.name]: {
            prop:                                             ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxOrderStatus.name,
            default:                                          ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxOrderStatus.value,
            title:                                            Language.translate("components.input_agreement_check_box.prop.prop_checkBoxOrderStatus.title"),
            description:                                      Language.translate("components.input_agreement_check_box.prop.prop_checkBoxOrderStatus.description"),
        } ,
        [ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxOrder.name]: {
            prop:                                             ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxOrder.name,
            default:                                          ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxOrder.value,
            title:                                            Language.translate("components.input_agreement_check_box.prop.prop_checkBoxOrder.title"),
            description:                                      Language.translate("components.input_agreement_check_box.prop.prop_checkBoxOrder.description"),
        } ,
        [ComponentInputAgreementCheckBoxConfigs.keys.prop_maxHeightItems.name]: {
            prop:                                             ComponentInputAgreementCheckBoxConfigs.keys.prop_maxHeightItems.name,
            default:                                          ComponentInputAgreementCheckBoxConfigs.keys.prop_maxHeightItems.value,
            title:                                            Language.translate("components.input_agreement_check_box.prop.prop_maxHeightItems.title"),
            description:                                      Language.translate("components.input_agreement_check_box.prop.prop_maxHeightItems.description"),
        } ,
    });


    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentInputAgreementCheckBoxSchemaType , ComponentInputAgreementCheckBoxPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Schema(this) ,
        ///----------------------
        [ComponentInputAgreementCheckBoxConfigs.schemas.Main.name]: {
            part:               ComponentInputAgreementCheckBoxConfigs.schemas.Main.name ,
            title:              Language.translate("components.input_agreement_check_box.schema.main.title") ,
            description:        Language.translate("components.input_agreement_check_box.schema.main.description") ,
            props: [

            ]
        } ,
        [ComponentInputAgreementCheckBoxConfigs.schemas.Main_inputOrder.name]: {
            part:               ComponentInputAgreementCheckBoxConfigs.schemas.Main_inputOrder.name ,
            title:              Language.translate("components.input_agreement_check_box.schema.main_inputOrder.title") ,
            description:        Language.translate("components.input_agreement_check_box.schema.main_inputOrder.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxList.name] ,
                this._COMPONENT_PATTERN[ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxOrder.name] ,
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name] ,
            ]
        } ,
        [ComponentInputAgreementCheckBoxConfigs.schemas.Main_CheckBoxAll.name]: {
            part:               ComponentInputAgreementCheckBoxConfigs.schemas.Main_CheckBoxAll.name ,
            title:              Language.translate("components.input_agreement_check_box.schema.main_checkboxAll.title") ,
            description:        Language.translate("components.input_agreement_check_box.schema.main_checkboxAll.description") ,
            props: [
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name] ,
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name] ,
                this._COMPONENT_PATTERN[ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxAllTitle.name] ,
                this._COMPONENT_PATTERN[ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxList.name] ,
            ]
        } ,
        [ComponentInputAgreementCheckBoxConfigs.schemas.Main_CheckBoxList.name]: {
            part:               ComponentInputAgreementCheckBoxConfigs.schemas.Main_CheckBoxList.name ,
            title:              Language.translate("components.input_agreement_check_box.schema.main_checkboxList.title") ,
            description:        Language.translate("components.input_agreement_check_box.schema.main_checkboxList.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxList.name] ,
                this._COMPONENT_PATTERN[ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxOrderStatus.name] ,
                this._COMPONENT_PATTERN[ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxOrder.name] ,
                this._COMPONENT_PATTERN[ComponentInputAgreementCheckBoxConfigs.keys.prop_maxHeightItems.name] ,
            ]
        } ,
        [ComponentInputAgreementCheckBoxConfigs.schemas.Main_CheckBoxList_CheckBoxItem.name]: {
            part:               ComponentInputAgreementCheckBoxConfigs.schemas.Main_CheckBoxList_CheckBoxItem.name ,
            title:              Language.translate("components.input_agreement_check_box.schema.main_checkboxList_checkBoxItem.title") ,
            description:        Language.translate("components.input_agreement_check_box.schema.main_checkboxList_checkBoxItem.description") ,
            props: [
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name] ,
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name] ,
            ]
        } ,
    });




    /* ---------------------------------------------
           PROPERTYs Pattern
        --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentInputAgreementCheckBoxTemplatesType , ComponentInputAgreementCheckBoxPropsType>({

    });


    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentInputAgreementCheckBoxMethodsType , ComponentInputAgreementCheckBoxPropsType>({
        [ComponentInputAgreementCheckBoxConfigs.methods.CLICK_ALL.name]: {
            title:                                            Language.translate("components.input_agreement_check_box.methods.fn_onClickAll.title"),
            description:                                      Language.translate("components.input_agreement_check_box.methods.fn_onClickAll.description"),
            args: {
                [ComponentInputAgreementCheckBoxConfigs.methods.CLICK_ALL.componentArgs.IS_DISABLE.name] : this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name] ,
                [ComponentInputAgreementCheckBoxConfigs.methods.CLICK_ALL.componentArgs.VALUE.name] :      this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name] ,
                [ComponentInputAgreementCheckBoxConfigs.methods.CLICK_ALL.componentArgs.LIST.name] :       this._COMPONENT_PATTERN[ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxList.name] ,
            }
        } ,
        [ComponentInputAgreementCheckBoxConfigs.methods.CLICK_ITEM.name]: {
            title:                                            Language.translate("components.input_agreement_check_box.methods.fn_onClickItem.title"),
            description:                                      Language.translate("components.input_agreement_check_box.methods.fn_onClickItem.description"),
            args: {
                [ComponentInputAgreementCheckBoxConfigs.methods.CLICK_ALL.componentArgs.IS_DISABLE.name] : this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name] ,
                [ComponentInputAgreementCheckBoxConfigs.methods.CLICK_ALL.componentArgs.VALUE.name] :      this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name] ,
                [ComponentInputAgreementCheckBoxConfigs.methods.CLICK_ALL.componentArgs.LIST.name] :       this._COMPONENT_PATTERN[ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxList.name] ,
            }
        } ,
    });


    /* ---------------------------------------------
        Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        return new ComponentInputAgreementCheckBox(
            <ComponentInputAgreementCheckBoxPropsType>{
                classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                styles: {}  ,

                prop_labelTitle: "Input Agreement CheckBox" ,
                prop_labelTooltipDescription: "this is for [Input Agreement checkBox] " ,

                prop_name: "agreement-checkbox" ,
                prop_checkBoxOrderStatus: true ,
                prop_checkBoxList: [
                    {
                        id:          1 ,
                        title:      "item A" ,
                    } ,
                    {
                        id:          2 ,
                        title:      "item B" ,
                        isPin:      true
                    } ,
                    {
                        id:          3 ,
                        title:      "item C" ,
                    } ,
                    {
                        id:          4 ,
                        title:      "item D" ,
                    }
                ] ,
                prop_value: [1 , 2 , 3 , 4] ,
                prop_checkBoxOrder: [3]

               // prop_isDisable: true
            },
            <ComponentInputAgreementCheckBoxMethodsType>{
                fn_onClickAll: function (event, dataArgs : ComponentInputAgreementCheckBox_Methods_CLICK_ALL_DataArgs, componentArgs: ComponentInputAgreementCheckBox_Methods_CLICK_ALL_ComponentArgs) {
                    console.log("checkbox All" , dataArgs , componentArgs);
                } ,
                fn_onClickItem: function (event, dataArgs : ComponentInputAgreementCheckBox_Methods_CLICK_ITEM_DataArgs, componentArgs: ComponentInputAgreementCheckBox_Methods_CLICK_ITEM_ComponentArgs) {
                    console.log("checkbox All" , dataArgs , componentArgs);
                }
            }
        ).getElement();
    }

}



export class ComponentInputAgreementCheckBox extends ComponentInputAgreementCheckBoxBase {

    _CHECK_BOX_ALL : ComponentInputCheckBox;

    /* ---------------------------------------------
       SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentInputAgreementCheckBoxPropsType,
        methods: ComponentInputAgreementCheckBoxMethodsType ,
        events = null
    ) {
        super("input-agreement-checkbox", null);
        super.renderComponent(config, methods , events);
    }

    /* ---------------------------------------------
      TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentInputAgreementCheckBoxConfigs.schemas.Main.name)
    }

    override renderManagerComponent(partName , attrsDefault, data , extra) : ReactiveElement {
        switch (partName){
            case ComponentInputAgreementCheckBoxConfigs.schemas.Main.name:
                return  this.template_render_main(attrsDefault , data , extra);
            case ComponentInputAgreementCheckBoxConfigs.schemas.Main_inputOrder.name:
                return  this.template_render_main_inputOrder(attrsDefault , data , extra);
            case ComponentInputAgreementCheckBoxConfigs.schemas.Main_CheckBoxAll.name:
                return  this.template_render_main_checkBoxAll(attrsDefault , data , extra);
            case ComponentInputAgreementCheckBoxConfigs.schemas.Main_CheckBoxList.name:
                return  this.template_render_main_checkBoxList(attrsDefault , data , extra);
            case ComponentInputAgreementCheckBoxConfigs.schemas.Main_CheckBoxList_CheckBoxItem.name:
                return  this.template_render_main_checkBoxList_checkBoxItem(attrsDefault , data , extra);
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
                    this.executeSchemaPart(ComponentInputAgreementCheckBoxConfigs.schemas.Main_inputOrder.name) ,
                    this.executeSchemaPart(ComponentInputAgreementCheckBoxConfigs.schemas.Main_CheckBoxAll.name) ,
                    this.executeSchemaPart(ComponentInputAgreementCheckBoxConfigs.schemas.Main_CheckBoxList.name)
                ]
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    private template_render_main_inputOrder(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_checkBoxList=      data[ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxList.name];
            const prop_checkBoxOrder=     data[ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxOrder.name];

            return ReactiveElement.part(  "input" ,{
                attrs: {
                    ...attrsDefault ,
                    type: "hidden"
                },
                attrsBind:{
                    value:  Observable.computed(
                        (list , order) => {
                            const newList =  this.pr_getListOrdered(list , order);
                            return JSON.stringify(newList.map(item => item.id))
                        } , [prop_checkBoxList , prop_checkBoxOrder] , this.getScope()
                    )
                }
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    private template_render_main_checkBoxAll(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {
            const prop_isDisable=                  data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_checkBoxAllTitle=           data[ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxAllTitle.name];
            const prop_checkBoxList=               data[ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxList.name];
            const prop_value=                      data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name];

            this._CHECK_BOX_ALL = new ComponentInputCheckBox(
                <ComponentInputCheckBoxPropsType>{
                    classList: ["d-flow-root" , "mb-1"]  ,
                    styles: {}  ,

                    prop_isDisable:  prop_isDisable,
                    prop_title:      prop_checkBoxAllTitle,
                    prop_value:      Observable.computed(
                        (listValue , listCheckBox) => {
                            return listCheckBox.length > 0 && listCheckBox.every(item=> listValue.includes(item.id));
                    } , [prop_value , prop_checkBoxList] , this.getScope()) ,
                },
                <ComponentInputCheckBoxMethodsType>{
                    fn_onClickCheckbox: function (event, dataArgs : ComponentInputCheckBox_Methods_CLICK_DataArgs, componentArgs: ComponentInputCheckBox_Methods_CLICK_ComponentArgs) {
                        const value = componentArgs?.[ComponentInputCheckBoxConfigs.methods.CLICK.componentArgs.VALUE.name];
                        const isDisable = componentArgs?.[ComponentInputCheckBoxConfigs.methods.CLICK.componentArgs.IS_DISABLE.name];

                        if (!isDisable){
                            this.pr_onClickCheckBoxAll(event , value);
                        }
                    }.bind(this)
                }
            );

            return this._CHECK_BOX_ALL.getReactiveElement();
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    private template_render_main_checkBoxList(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_checkBoxList=           data[ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxList.name];
            const prop_checkBoxOrderStatus=    data[ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxOrderStatus.name];
            const prop_checkBoxOrder=          data[ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxOrder.name];
            const prop_maxHeightItems=         data[ComponentInputAgreementCheckBoxConfigs.keys.prop_maxHeightItems.name];

            return  ReactiveElement.part(  "section" ,
                {
                    attrs: {
                        ...attrsDefault
                    },
                    className: [
                        "col-12" , "border-top" , "pt-1"
                    ] ,
                    stylesBind: {
                        maxHeight:    prop_maxHeightItems
                    },
                    styles:{
                        overflowY:     "auto"
                    } ,
                    children:    Observable.computed(( orderStatus , listCheckBox , order) => {

                            const newList =  this.pr_getListOrdered(listCheckBox , order);
                            const newOrder = newList.map(item => item.id)

                            if (orderStatus){
                                let list = [];
                                if (newList && Array.isArray(newList)){
                                    for (let i = 0; i < newList.length; i++) {
                                        const itemCheckBox = newList[i];
                                        const isPin = itemCheckBox?.isPin ?? false
                                        if (itemCheckBox!= null && itemCheckBox.hasOwnProperty("id")){
                                            const item = {
                                                id:    itemCheckBox.id,
                                                body:  this.executeSchemaPart(ComponentInputAgreementCheckBoxConfigs.schemas.Main_CheckBoxList_CheckBoxItem.name , {itemCheckBox}) ,
                                                isPin: isPin
                                            }
                                            list.push(item)
                                        }
                                    }
                                }

                                return new ComponentDraggableOrdersY(
                                    <ComponentDraggableOrdersYPropsType>{
                                        classList: []  ,
                                        styles: {}  ,
                                        prop_draggableOrders:  newOrder ,
                                        prop_draggableItems:   list
                                    },
                                    <ComponentDraggableOrdersYMethodsType>{
                                        fn_onUpdateOrder: function (event, dataArgs:ComponentDraggableOrdersY_Methods_UPDATE_DataArgs, componentArgs : ComponentDraggableOrdersY_Methods_UPDATE_ComponentArgs){
                                            const newOrder = componentArgs?.ORDER ?? [];
                                            const list = componentArgs?.LIST ?? [];
                                            this.pr_updateValueAfterOrder(newOrder , list , event)
                                        }.bind(this)
                                    }
                                ).getReactiveElement()
                            }
                            else {
                                let list = [];
                                if (newList && Array.isArray(newList)){
                                    for (let i = 0; i < newList.length; i++) {
                                        const itemCheckBox = newList[i];
                                        if (itemCheckBox!= null){
                                            list.push(
                                                this.executeSchemaPart(ComponentInputAgreementCheckBoxConfigs.schemas.Main_CheckBoxList_CheckBoxItem.name , {itemCheckBox})
                                            )
                                        }
                                    }
                                }
                                return list;
                            }
                        },
                        [prop_checkBoxOrderStatus , prop_checkBoxList , prop_checkBoxOrder], this.getScope()
                    ) ,
                });

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    private template_render_main_checkBoxList_checkBoxItem(attrsDefault , data , extra) : ReactiveElement {

        if (data != null && extra?.itemCheckBox) {
            const itemCheckBox: propAgreementCheckBoxType = extra.itemCheckBox;
            const prop_isDisable=        data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];
            const prop_value=            data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name];

            if (itemCheckBox  && itemCheckBox?.id ){

                return  ReactiveElement.part(  "section" ,
                    {
                        attrs: {
                            ...attrsDefault
                        },
                        className: [],
                        children: [
                            new ComponentInputCheckBox(
                                <ComponentInputCheckBoxPropsType>{
                                    classList: ["d-flow-root" , "mb-1"]  ,
                                    styles: {}  ,

                                    prop_value:      Observable.computed(( listValue) => {
                                        return listValue.includes(itemCheckBox?.id)
                                    } , [prop_value] , this.getScope()) ,
                                    prop_isDisable:  prop_isDisable,
                                    prop_title:      itemCheckBox?.title ?? null,
                                },
                                <ComponentInputCheckBoxMethodsType>{
                                    fn_onClickCheckbox: function (event, dataArgs : ComponentInputCheckBox_Methods_CLICK_DataArgs, componentArgs: ComponentInputCheckBox_Methods_CLICK_ComponentArgs) {
                                        const value = componentArgs?.[ComponentInputCheckBoxConfigs.methods.CLICK.componentArgs.VALUE.name];
                                        const isDisable = componentArgs?.[ComponentInputCheckBoxConfigs.methods.CLICK.componentArgs.IS_DISABLE.name];
                                        if (!isDisable){
                                            this.pr_onClickCheckBoxItem(event , itemCheckBox.id , value);
                                        }
                                    }.bind(this)
                                }
                            ).getReactiveElement()
                        ]
                    });

            }

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                styles: {},
                className: [
                    "col-12"  , "border-top"
                ] ,
                children: [
                    "hi"
                ]
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }




    /* ---------------------------------------------
     FUNCTIONs
    --------------------------------------------- */

    private pr_onClickLabel(event, dataArgs:ComponentLabel_Methods_CLICK_DataArgs, componentArgs:ComponentLabel_Methods_CLICK_ComponentArgs): void{
        if (!dataArgs.IS_DISABLE){
            const checkBoxAll = this._CHECK_BOX_ALL.get(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name);
            this._CHECK_BOX_ALL.set(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name , !checkBoxAll)
            this.pr_onClickCheckBoxAll(event , !checkBoxAll)
        }
    }


    private pr_onClickCheckBoxAll(event , checkBoxValue): void{
        const prop_checkBoxList=   this.get(ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxList.name);
        const prop_checkBoxOrder=   this.get(ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxOrder.name);

        let newValue = [];
        if (checkBoxValue){
            const newList =  this.pr_getListOrdered(prop_checkBoxList , prop_checkBoxOrder);
            newValue = newList.map(item => item.id)
        }
        this.set(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name , newValue)

        const params : ComponentInputAgreementCheckBox_Methods_CLICK_ALL_DataArgs = {}
        this.executeMethod(ComponentInputAgreementCheckBoxConfigs.methods.CLICK_ALL.name  , event , params);
    }


    private pr_onClickCheckBoxItem(event , checkBoxId , checkBoxValue): void{
        const prop_checkBoxList=   this.get(ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxList.name);
        const prop_checkBoxOrder=   this.get(ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxOrder.name);
        const prop_value =         this.get(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name);

        if (checkBoxValue){
            const newValue = this.pr_insertByOrder(prop_checkBoxOrder , prop_value , checkBoxId)
            this.set(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name , newValue)
        }
        else{
            const newValue = prop_value.filter(id=> id !==checkBoxId)
            this.set(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name , newValue)
        }

        const params : ComponentInputAgreementCheckBox_Methods_CLICK_ITEM_DataArgs = {}
        this.executeMethod(ComponentInputAgreementCheckBoxConfigs.methods.CLICK_ITEM.name  , event , params);
    }


    private pr_getListOrdered(list , order , full=true){
        if (!Array.isArray(list)) return [];

        const map = new Map(list.map(item => [item.id , item]));

        const orderedItems = (order || [])
            .map(id=> map.get(id))
            .filter(Boolean);

        const orderedSet = new Set(order);

        const rest = list.filter(item => !orderedSet.has(item.id));

        return [...orderedItems , ...rest];
    }

    private pr_insertByOrder(order , value , newId){
        if (value.includes(newId)) return [...value];

        const orderIndex = order.indexOf(newId);

        const orderMap = new Map(order.map((id , index) => [id,index]))

        if (orderIndex === -1){
            return [...value , newId];
        }

        let insertIndex = value.length;
        for (let i = 0; i < value.length; i++) {
            const currentId = value[i];
            let currentOrderIndex = orderMap.get(currentId) ?? Infinity;

            if (currentOrderIndex > orderIndex){
                insertIndex = i;
                break;
            }
        }

        return [
            ...value.slice(0 , insertIndex),
            newId ,
            ...value.slice(insertIndex)
        ]
    }

    private pr_updateValueAfterOrder(newOrder , list , event){

        const prop_checkBoxList=   this.get(ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxList.name);
        const currentValue =      this.get(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name);

        const dragMap = new Map(
            list.map(item => [item.id , item.isPin])
        );

        const newList = prop_checkBoxList.map(item => ({
            ...item ,
            isPin: dragMap.get(item.id) ?? item.isPin
        }))

        const valueSet = new Set(currentValue);
        const newValue = newOrder.filter(id => valueSet.has(id));

        this.set(ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxOrder.name , newOrder);
        this.set(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name , newValue);
        this.set(ComponentInputAgreementCheckBoxConfigs.keys.prop_checkBoxList.name , newList);

        const params : ComponentInputAgreementCheckBox_Methods_CLICK_ITEM_DataArgs = {}
        this.executeMethod(ComponentInputAgreementCheckBoxConfigs.methods.CLICK_ITEM.name  , event , params);
    }


}
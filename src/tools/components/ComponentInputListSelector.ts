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
import {
    ComponentIcon_Methods_CLICK_ComponentArgs,
    ComponentIcon_Methods_CLICK_DataArgs,
    ComponentIconMethodsType,
    ComponentIconPropsType
} from "./ComponentIcon";
import {ComponentMessages_Methods_CLOSE_MESSAGE_DataArgs} from "./ComponentMessages";
import {ToolsIcons} from "../icons";
import {
    ComponentInputAgreementCheckBox,
    ComponentInputAgreementCheckBox_Methods_CLICK_ALL_ComponentArgs,
    ComponentInputAgreementCheckBox_Methods_CLICK_ALL_DataArgs,
    ComponentInputAgreementCheckBox_Methods_CLICK_ITEM_ComponentArgs,
    ComponentInputAgreementCheckBox_Methods_CLICK_ITEM_DataArgs,
    ComponentInputAgreementCheckBoxMethodsType,
    ComponentInputAgreementCheckBoxPropsType
} from "./ComponentInputAgreementCheckBox";
import {
    ComponentPositionMenu,
    ComponentPositionMenu_Methods_CLICK_ACCEPT_ComponentArgs,
    ComponentPositionMenu_Methods_CLICK_ACCEPT_DataArgs,
    ComponentPositionMenu_Methods_CLICK_OPEN_ComponentArgs,
    ComponentPositionMenu_Methods_CLICK_OPEN_DataArgs,
    ComponentPositionMenu_Methods_CLICK_REJECT_ComponentArgs,
    ComponentPositionMenu_Methods_CLICK_REJECT_DataArgs,
    ComponentPositionMenuMethodsType,
    ComponentPositionMenuPropsType
} from "./ComponentPositionMenu";




export const ComponentInputListSelectorProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput,
    ...GOG_ComponentBasicProps_Component_Structure_FormInput_Label ,

    ///----------------------
    prop_menuBackgroundColor :            "prop_menuBackgroundColor" ,
    prop_menuBorderColor :                "prop_menuBorderColor" ,
} as const;


const ComponentInputListSelectorConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys ,

        ///----------------------

        [ComponentInputListSelectorProps.prop_menuBackgroundColor]: {
            name:                ComponentInputListSelectorProps.prop_menuBackgroundColor,
            value:               GOG_SetValue<Color | null>( Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1 )),
        } ,
        [ComponentInputListSelectorProps.prop_menuBorderColor]: {
            name:                ComponentInputListSelectorProps.prop_menuBorderColor,
            value:               GOG_SetValue<Color | null>(   Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1 )),
        } ,
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
        Main_FormFloatMenu: {
            name:                      "part-main-formFloutMenu"
        } ,
        Main_FormFloatMenu_IconList: {
            name:                      "part-main-formFloutMenu-iconList"
        } ,
        Main_FormFloatMenu_CheckBoxes: {
            name:                      "part-main-formFloutMenu-checkBoxes"
        } ,
        Main_FormListSelected: {
            name:                      "part-main-formListSelected"
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
        [ComponentInputListSelectorConfigs.keys.prop_menuBackgroundColor.name]: {
            prop:                                             ComponentInputListSelectorConfigs.keys.prop_menuBackgroundColor.name,
            default:                                          ComponentInputListSelectorConfigs.keys.prop_menuBackgroundColor.value,
            title:                                            Language.translate("components.input_list_selector.props.prop_menuBackgroundColor.title"),
            description:                                      Language.translate("components.input_list_selector.props.prop_menuBackgroundColor.description"),
        } ,
        [ComponentInputListSelectorConfigs.keys.prop_menuBorderColor.name]: {
            prop:                                             ComponentInputListSelectorConfigs.keys.prop_menuBorderColor.name,
            default:                                          ComponentInputListSelectorConfigs.keys.prop_menuBorderColor.value,
            title:                                            Language.translate("components.input_list_selector.props.prop_menuBorderColor.title"),
            description:                                      Language.translate("components.input_list_selector.props.prop_menuBorderColor.description"),
        } ,
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
        [ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu.name]: {
            part:               ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu.name ,
            title:              Language.translate("components.input_list_selector.schema.main_formFloatMenu.title") ,
            description:        Language.translate("components.input_list_selector.schema.main_formFloatMenu.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_menuBackgroundColor.name] ,
                this._COMPONENT_PATTERN[ComponentInputListSelectorConfigs.keys.prop_menuBorderColor.name] ,
            ]
        } ,
        [ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu_IconList.name]: {
            part:               ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu_IconList.name ,
            title:              Language.translate("components.input_list_selector.schema.main_formFloatMenu_iconList.title") ,
            description:        Language.translate("components.input_list_selector.schema.main_formFloatMenu_iconList.description") ,
            props: [

            ]
        } ,
        [ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu_CheckBoxes.name]: {
            part:               ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu_CheckBoxes.name ,
            title:              Language.translate("components.input_list_selector.schema.main_formFloatMenu_body_checkBoxes.title") ,
            description:        Language.translate("components.input_list_selector.schema.main_formFloatMenu_body_checkBoxes.description") ,
            props: [

            ]
        } ,
        [ComponentInputListSelectorConfigs.schemas.Main_FormListSelected.name]: {
            part:               ComponentInputListSelectorConfigs.schemas.Main_FormListSelected.name ,
            title:              Language.translate("components.input_list_selector.schema.main_formListSelected.title") ,
            description:        Language.translate("components.input_list_selector.schema.main_formListSelected.description") ,
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
                prop_labelTooltipDescription: "this is for [input-list-selector]"
            },
            <ComponentInputListSelectorMethodsType>{

            }
        ).getElement();
    }


}


export class ComponentInputListSelector extends ComponentInputListSelectorBase {

    _FLOAT_MENU ;
    _STATUS_SHOW_FLOAT_MENU = new Observable(false);

    /* ---------------------------------------------
       SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentInputListSelectorPropsType,
        methods: ComponentInputListSelectorMethodsType ,
        events = null
    ) {
        super("input-list-selector", null);
        super.renderComponent(config, methods , events);
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
            case ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu.name:
                return  this.template_render_main_formFloatMenu(attrsDefault , data , extra);
            case ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu_IconList.name:
                return  this.template_render_main_formFloatMenu_iconList(attrsDefault , data , extra);
            case ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu_CheckBoxes.name:
                return  this.template_render_main_formFloatMenu_checkBoxes(attrsDefault , data , extra);
            case ComponentInputListSelectorConfigs.schemas.Main_FormListSelected.name:
                return  this.template_render_main_formListSelected(attrsDefault , data , extra);
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
                    this.executeSchemaPart(ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu.name) ,
                    this.executeSchemaPart(ComponentInputListSelectorConfigs.schemas.Main_FormListSelected.name) ,
                ]
            });

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }



    private template_render_main_formFloatMenu(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_menuBackgroundColor =       data[ComponentInputListSelectorConfigs.keys.prop_menuBackgroundColor.name];
            const prop_menuBorderColor =           data[ComponentInputListSelectorConfigs.keys.prop_menuBorderColor.name];

            return new ComponentPositionMenu(
                <ComponentPositionMenuPropsType>{
                    classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                    styles: {}  ,

                    prop_menuBackgroundColor:   prop_menuBackgroundColor ,
                    prop_menuBorderColor:       prop_menuBorderColor ,
                    prop_menuSelector:          this.executeSchemaPart(ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu_IconList.name)  ,
                    prop_menuBody:              this.executeSchemaPart(ComponentInputListSelectorConfigs.schemas.Main_FormFloatMenu_CheckBoxes.name) ,
                    prop_menuBodyWidth:         SizeUnit(350 , UNITS.PEXEL)
                },
                <ComponentPositionMenuMethodsType>{
                    fn_onClickOpen: function (event, dataArgs:ComponentPositionMenu_Methods_CLICK_OPEN_DataArgs, componentArgs:ComponentPositionMenu_Methods_CLICK_OPEN_ComponentArgs){
                        console.log("position open")
                    } ,
                    fn_onClickAccept: function (event, dataArgs:ComponentPositionMenu_Methods_CLICK_ACCEPT_DataArgs, componentArgs:ComponentPositionMenu_Methods_CLICK_ACCEPT_ComponentArgs){
                        console.log("position accept")
                        return true;
                    } ,
                    fn_onClickReject: function (event, dataArgs:ComponentPositionMenu_Methods_CLICK_REJECT_DataArgs, componentArgs:ComponentPositionMenu_Methods_CLICK_REJECT_ComponentArgs){
                        console.log("position reject")
                    }
                }
            ).getReactiveElement();

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_main_formFloatMenu_iconList(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            return new ToolsComponents.ComponentIcon(
                <ComponentIconPropsType>{
                    classList:  [

                    ]  ,
                    styles:     {

                    },
                    prop_iconClass : [

                    ] ,
                    prop_iconStyles : {
                        "cursor" : "pointer"
                    } ,
                    prop_icon: ToolsIcons.icon_select_columns({size: SIZES.L})
                },
                <ComponentIconMethodsType>{
                    fn_onClickIcon: function (event, dataArgs : ComponentIcon_Methods_CLICK_DataArgs, componentArgs: ComponentIcon_Methods_CLICK_ComponentArgs)  {

                    }.bind(this) ,
                }
            ).getReactiveElement();

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_main_formFloatMenu_checkBoxes(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            return new ComponentInputAgreementCheckBox(
                <ComponentInputAgreementCheckBoxPropsType>{
                    classList: []  ,
                    styles: {}  ,


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
                    prop_value: [1 , 2 , 3] ,
                    prop_checkBoxOrder: [3]

                },
                <ComponentInputAgreementCheckBoxMethodsType>{
                    fn_onClickAll: function (event, dataArgs : ComponentInputAgreementCheckBox_Methods_CLICK_ALL_DataArgs, componentArgs: ComponentInputAgreementCheckBox_Methods_CLICK_ALL_ComponentArgs) {
                        console.log("checkbox All" , dataArgs , componentArgs);
                    } ,
                    fn_onClickItem: function (event, dataArgs : ComponentInputAgreementCheckBox_Methods_CLICK_ITEM_DataArgs, componentArgs: ComponentInputAgreementCheckBox_Methods_CLICK_ITEM_ComponentArgs) {
                        console.log("checkbox All" , dataArgs , componentArgs);
                    }
                }
            ).getReactiveElement();

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_main_formListSelected(attrsDefault , data , extra) : ReactiveElement {

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

}

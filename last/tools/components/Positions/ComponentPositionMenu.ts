
import {TOOLS} from "../../tools";

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
} from "../../../core/ComponentBase";
import { ReactiveElement } from "../../../core/ReactiveElement";
import { ComponentCallBackType } from "../../../core/ComponentBase";
import { Language } from "../../../core/Language";
import { AppConfig } from "../../../core/AppConfig";
import {
    Color,
    COLORS_GRAD,
    COLORS_MAIN,
    IconsType, OPERATION, SizeCalc,
    SIZES, SizesType, SizeUnit,
    ToolsComponents_BorderRadius,
    ToolsComponents_BorderWidth, ToolsComponents_Height, ToolsComponents_Margin, ToolsComponents_Padding, UNITS
} from "../../../utils/ToolsConsts";
import {
    GOG_ComponentBasicConfigs_Component_keys,
    GOG_ComponentBasicConfigs_Component_parts,
    GOG_ComponentBasicConfigs_Component_Pattern,
    GOG_ComponentBasicConfigs_Component_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_keys,
    GOG_ComponentBasicConfigs_Component_Structure_parts,
    GOG_ComponentBasicConfigs_Component_Structure_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_Schema, GOG_ComponentBasicConfigs_partDoseNotBody,
    GOG_ComponentBasicProps_Component,
    GOG_ComponentBasicProps_Component_Structure,
} from "../../../core/component/SetupComponent";
import { Observable } from "../../../core/Observable";
import {
    ComponentFloatMenu,
    ComponentFloatMenuMethodsType,
    ComponentFloatMenuPropsType
} from "./../ComponentFloatMenu";
import {
    ComponentIcon_Methods_CLICK_ComponentArgs,
    ComponentIcon_Methods_CLICK_DataArgs,
    ComponentIconMethodsType,
    ComponentIconPropsType
} from "./../ComponentIcon";
import {
    ComponentButton, ComponentButton_Methods_CLICK_ComponentArgs,
    ComponentButton_Methods_CLICK_DataArgs,
    ComponentButtonMethodsType,
    ComponentButtonPropsType
} from "./../ComponentButton";




export const ComponentPositionMenuProps = {
    ...GOG_ComponentBasicProps_Component,
    ...GOG_ComponentBasicProps_Component_Structure,
    ///----------------------

    ///----------------------
    prop_menuBackgroundColor: "prop_menuBackgroundColor",
    prop_menuBorderColor: "prop_menuBorderColor",

    prop_menuSelector: "prop_menuSelector",
    prop_menuBody: "prop_menuBody",
    prop_menuBodyWidth: "prop_menuBodyWidth",
    prop_menuBodyHeight: "prop_menuBodyHeight",
    prop_menuBorderWidth: "prop_menuBorderWidth",

    prop_menuBtnRejectHas: "prop_menuBtnRejectHas",
    prop_menuBtnRejectIcon: "prop_menuBtnRejectIcon",
    prop_menuBtnRejectTitle: "prop_menuBtnRejectTitle",

    prop_menuBtnAcceptHas: "prop_menuBtnAcceptHas",
    prop_menuBtnAcceptIcon: "prop_menuBtnAcceptIcon",
    prop_menuBtnAcceptTitle: "prop_menuBtnAcceptTitle",

    prop_menuIsOpen: "prop_menuIsOpen",
} as const;



const ComponentPositionMenuConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        ///----------------------
        [ComponentPositionMenuProps.prop_menuBackgroundColor]: {
            name: ComponentPositionMenuProps.prop_menuBackgroundColor,
            value: GOG_SetValue<Color | null>(Color(COLORS_MAIN.SHAN, COLORS_GRAD.GRADE_1)),
        },
        [ComponentPositionMenuProps.prop_menuBorderColor]: {
            name: ComponentPositionMenuProps.prop_menuBorderColor,
            value: GOG_SetValue<Color | null>(Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1)),
        },

        [ComponentPositionMenuProps.prop_menuSelector]: {
            name: ComponentPositionMenuProps.prop_menuSelector,
            value: GOG_SetValue<string | ReactiveElement | null>(""),
        },
        [ComponentPositionMenuProps.prop_menuBody]: {
            name: ComponentPositionMenuProps.prop_menuBody,
            value: GOG_SetValue<string | ReactiveElement | null>(""),
        },
        [ComponentPositionMenuProps.prop_menuBodyWidth]: {
            name: ComponentPositionMenuProps.prop_menuBodyWidth,
            value: GOG_SetValue<SizeUnit | SizeCalc | null>(null),
        },
        [ComponentPositionMenuProps.prop_menuBodyHeight]: {
            name: ComponentPositionMenuProps.prop_menuBodyHeight,
            value: GOG_SetValue<SizeUnit | SizeCalc | null>(SizeUnit(200, UNITS.PEXEL)),
        },
        [ComponentPositionMenuProps.prop_menuBorderWidth]: {
            name: ComponentPositionMenuProps.prop_menuBorderWidth,
            value: GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.S),
        },

        [ComponentPositionMenuProps.prop_menuBtnRejectHas]: {
            name: ComponentPositionMenuProps.prop_menuBtnRejectHas,
            value: GOG_SetValue<boolean>(true),
        },
        [ComponentPositionMenuProps.prop_menuBtnRejectIcon]: {
            name: ComponentPositionMenuProps.prop_menuBtnRejectIcon,
            value: GOG_SetValue<IconsType | null>(TOOLS.ICON.icon_close({ size: SIZES.M, primaryColor: Color(COLORS_MAIN.SHAN, COLORS_GRAD.GRADE_1), secondaryColor: Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_4) })),
        },
        [ComponentPositionMenuProps.prop_menuBtnRejectTitle]: {
            name: ComponentPositionMenuProps.prop_menuBtnRejectTitle,
            value: GOG_SetValue<Observable<string> | string | null>(Language.translate("components.position_menu.props.prop_menuBtnRejectTitle.value")),
        },

        [ComponentPositionMenuProps.prop_menuBtnAcceptHas]: {
            name: ComponentPositionMenuProps.prop_menuBtnAcceptHas,
            value: GOG_SetValue<boolean>(true),
        },
        [ComponentPositionMenuProps.prop_menuBtnAcceptIcon]: {
            name: ComponentPositionMenuProps.prop_menuBtnAcceptIcon,
            value: GOG_SetValue<IconsType | null>(ToolsIcons.icon_status({ size: SIZES.M, primaryColor: Color(COLORS_MAIN.SHAN, COLORS_GRAD.GRADE_1), secondaryColor: Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_4) })),
        },
        [ComponentPositionMenuProps.prop_menuBtnAcceptTitle]: {
            name: ComponentPositionMenuProps.prop_menuBtnAcceptTitle,
            value: GOG_SetValue<Observable<string> | string | null>(Language.translate("components.position_menu.props.prop_menuBtnAcceptTitle.value")),
        },

        [ComponentPositionMenuProps.prop_menuIsOpen]: {
            name: ComponentPositionMenuProps.prop_menuIsOpen,
            value: GOG_SetValue<boolean>(false),
        },
    },
    schemas: {
        ...GOG_ComponentBasicConfigs_Component_parts,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts,

        ///----------------------
        FormFloatMenu: {
            name: "part-formFloutMenu"
        },
        FormFloatMenu_Selector: {
            name: "part-formFloutMenu-selector"
        },
        FormFloatMenu_Body: {
            name: "part-formFloutMenu-body"
        },
        FormFloatMenu_Body_content: {
            name: "part-formFloutMenu-body-content"
        },
        FormFloatMenu_Body_Buttons: {
            name: "part-formFloutMenu-body-buttons"
        },
        FormFloatMenu_Body_Buttons_Accept: {
            name: "part-formFloutMenu-body-buttons-accept"
        },
        FormFloatMenu_Body_Buttons_Reject: {
            name: "part-formFloutMenu-body-buttons-reject"
        },
    },
    templates: {
        SELECTOR: {
            name: "selector"
        },
        BODY: {
            name: "body"
        },
    },
    methods: {
        CLICK_OPEN: {
            name: "fn_onClickOpen",
            dataArgs: {},
            componentArgs: {}
        },
        CLICK_ACCEPT: {
            name: "fn_onClickAccept",
            dataArgs: {},
            componentArgs: {}
        },
        CLICK_REJECT: {
            name: "fn_onClickReject",
            dataArgs: {},
            componentArgs: {}
        },
    }
} as const;


export type ComponentPositionMenuPropsType = GOG_ExtractNameValue<typeof ComponentPositionMenuConfigs.keys>
export type ComponentPositionMenuSchemaType = GOG_ExtractName<typeof ComponentPositionMenuConfigs.schemas>
export type ComponentPositionMenuTemplatesType = GOG_ExtractName<typeof ComponentPositionMenuConfigs.templates>

export type ComponentPositionMenu_Methods_CLICK_OPEN_ComponentArgs = GOG_ExtractName<typeof ComponentPositionMenuConfigs.methods.CLICK_OPEN.componentArgs>
export type ComponentPositionMenu_Methods_CLICK_OPEN_DataArgs = GOG_ExtractNameValue<typeof ComponentPositionMenuConfigs.methods.CLICK_OPEN.dataArgs>

export type ComponentPositionMenu_Methods_CLICK_ACCEPT_ComponentArgs = GOG_ExtractName<typeof ComponentPositionMenuConfigs.methods.CLICK_ACCEPT.componentArgs>
export type ComponentPositionMenu_Methods_CLICK_ACCEPT_DataArgs = GOG_ExtractNameValue<typeof ComponentPositionMenuConfigs.methods.CLICK_ACCEPT.dataArgs>

export type ComponentPositionMenu_Methods_CLICK_REJECT_ComponentArgs = GOG_ExtractName<typeof ComponentPositionMenuConfigs.methods.CLICK_REJECT.componentArgs>
export type ComponentPositionMenu_Methods_CLICK_REJECT_DataArgs = GOG_ExtractNameValue<typeof ComponentPositionMenuConfigs.methods.CLICK_REJECT.dataArgs>


export type ComponentPositionMenuMethodsType = {
    [ComponentPositionMenuConfigs.methods.CLICK_OPEN.name]: ComponentCallBackType<ComponentPositionMenu_Methods_CLICK_OPEN_ComponentArgs, ComponentPositionMenu_Methods_CLICK_OPEN_DataArgs>
    [ComponentPositionMenuConfigs.methods.CLICK_ACCEPT.name]: ComponentCallBackType<ComponentPositionMenu_Methods_CLICK_ACCEPT_ComponentArgs, ComponentPositionMenu_Methods_CLICK_ACCEPT_DataArgs>
    [ComponentPositionMenuConfigs.methods.CLICK_REJECT.name]: ComponentCallBackType<ComponentPositionMenu_Methods_CLICK_REJECT_ComponentArgs, ComponentPositionMenu_Methods_CLICK_REJECT_DataArgs>
}




export abstract class ComponentPositionMenuBase extends ComponentBase<
    ComponentPositionMenuPropsType,
    ComponentPositionMenuSchemaType,
    ComponentPositionMenuTemplatesType,
    ComponentPositionMenuMethodsType
> {



    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN = defineComponentPatterns<ComponentPositionMenuPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Pattern(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this),
        ///----------------------
        [ComponentPositionMenuConfigs.keys.prop_menuBackgroundColor.name]: {
            prop: ComponentPositionMenuConfigs.keys.prop_menuBackgroundColor.name,
            default: ComponentPositionMenuConfigs.keys.prop_menuBackgroundColor.value,
            title: Language.translate("components.position_menu.props.prop_menuBackgroundColor.title"),
            description: Language.translate("components.position_menu.props.prop_menuBackgroundColor.description"),
        },
        [ComponentPositionMenuConfigs.keys.prop_menuBorderColor.name]: {
            prop: ComponentPositionMenuConfigs.keys.prop_menuBorderColor.name,
            default: ComponentPositionMenuConfigs.keys.prop_menuBorderColor.value,
            title: Language.translate("components.position_menu.props.prop_menuBorderColor.title"),
            description: Language.translate("components.position_menu.props.prop_menuBorderColor.description"),
        },

        [ComponentPositionMenuConfigs.keys.prop_menuSelector.name]: {
            prop: ComponentPositionMenuConfigs.keys.prop_menuSelector.name,
            default: ComponentPositionMenuConfigs.keys.prop_menuSelector.value,
            title: Language.translate("components.position_menu.props.prop_menuSelector.title"),
            description: Language.translate("components.position_menu.props.prop_menuSelector.description"),
        },
        [ComponentPositionMenuConfigs.keys.prop_menuBody.name]: {
            prop: ComponentPositionMenuConfigs.keys.prop_menuBody.name,
            default: ComponentPositionMenuConfigs.keys.prop_menuBody.value,
            title: Language.translate("components.position_menu.props.prop_menuBody.title"),
            description: Language.translate("components.position_menu.props.prop_menuBody.description"),
        },
        [ComponentPositionMenuConfigs.keys.prop_menuBodyWidth.name]: {
            prop: ComponentPositionMenuConfigs.keys.prop_menuBodyWidth.name,
            default: ComponentPositionMenuConfigs.keys.prop_menuBodyWidth.value,
            title: Language.translate("components.position_menu.props.prop_menuBodyWidth.title"),
            description: Language.translate("components.position_menu.props.prop_menuBodyWidth.description"),
        },
        [ComponentPositionMenuConfigs.keys.prop_menuBodyHeight.name]: {
            prop: ComponentPositionMenuConfigs.keys.prop_menuBodyHeight.name,
            default: ComponentPositionMenuConfigs.keys.prop_menuBodyHeight.value,
            title: Language.translate("components.position_menu.props.prop_menuBodyHeight.title"),
            description: Language.translate("components.position_menu.props.prop_menuBodyHeight.description"),
        },
        [ComponentPositionMenuConfigs.keys.prop_menuBorderWidth.name]: {
            prop: ComponentPositionMenuConfigs.keys.prop_menuBorderWidth.name,
            default: ComponentPositionMenuConfigs.keys.prop_menuBorderWidth.value,
            title: Language.translate("components.position_menu.props.prop_menuBorderWidth.title"),
            description: Language.translate("components.position_menu.props.prop_menuBorderWidth.description"),
        },


        [ComponentPositionMenuConfigs.keys.prop_menuBtnRejectHas.name]: {
            prop: ComponentPositionMenuConfigs.keys.prop_menuBtnRejectHas.name,
            default: ComponentPositionMenuConfigs.keys.prop_menuBtnRejectHas.value,
            title: Language.translate("components.position_menu.props.prop_menuBtnRejectHas.title"),
            description: Language.translate("components.position_menu.props.prop_menuBtnRejectHas.description"),
        },
        [ComponentPositionMenuConfigs.keys.prop_menuBtnRejectIcon.name]: {
            prop: ComponentPositionMenuConfigs.keys.prop_menuBtnRejectIcon.name,
            default: ComponentPositionMenuConfigs.keys.prop_menuBtnRejectIcon.value,
            title: Language.translate("components.position_menu.props.prop_menuBtnRejectIcon.title"),
            description: Language.translate("components.position_menu.props.prop_menuBtnRejectIcon.description"),
        },
        [ComponentPositionMenuConfigs.keys.prop_menuBtnRejectTitle.name]: {
            prop: ComponentPositionMenuConfigs.keys.prop_menuBtnRejectTitle.name,
            default: ComponentPositionMenuConfigs.keys.prop_menuBtnRejectTitle.value,
            title: Language.translate("components.position_menu.props.prop_menuBtnRejectTitle.title"),
            description: Language.translate("components.position_menu.props.prop_menuBtnRejectTitle.description"),
        },

        [ComponentPositionMenuConfigs.keys.prop_menuBtnAcceptHas.name]: {
            prop: ComponentPositionMenuConfigs.keys.prop_menuBtnAcceptHas.name,
            default: ComponentPositionMenuConfigs.keys.prop_menuBtnAcceptHas.value,
            title: Language.translate("components.position_menu.props.prop_menuBtnAcceptHas.title"),
            description: Language.translate("components.position_menu.props.prop_menuBtnAcceptHas.description"),
        },
        [ComponentPositionMenuConfigs.keys.prop_menuBtnAcceptIcon.name]: {
            prop: ComponentPositionMenuConfigs.keys.prop_menuBtnAcceptIcon.name,
            default: ComponentPositionMenuConfigs.keys.prop_menuBtnAcceptIcon.value,
            title: Language.translate("components.position_menu.props.prop_menuBtnRejectIcon.title"),
            description: Language.translate("components.position_menu.props.prop_menuBtnRejectIcon.description"),
        },
        [ComponentPositionMenuConfigs.keys.prop_menuBtnAcceptTitle.name]: {
            prop: ComponentPositionMenuConfigs.keys.prop_menuBtnAcceptTitle.name,
            default: ComponentPositionMenuConfigs.keys.prop_menuBtnAcceptTitle.value,
            title: Language.translate("components.position_menu.props.prop_menuBtnAcceptTitle.title"),
            description: Language.translate("components.position_menu.props.prop_menuBtnAcceptTitle.description"),
        },

        [ComponentPositionMenuConfigs.keys.prop_menuIsOpen.name]: {
            prop: ComponentPositionMenuConfigs.keys.prop_menuIsOpen.name,
            default: ComponentPositionMenuConfigs.keys.prop_menuIsOpen.value,
            title: Language.translate("components.position_menu.props.prop_menuIsOpen.title"),
            description: Language.translate("components.position_menu.props.prop_menuIsOpen.description"),
        },
    });


    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentPositionMenuSchemaType, ComponentPositionMenuPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this),
        ///----------------------
        [ComponentPositionMenuConfigs.schemas.FormFloatMenu.name]: {
            part: ComponentPositionMenuConfigs.schemas.FormFloatMenu.name,
            title: Language.translate("components.position_menu.schema.formFloatMenu.title"),
            description: Language.translate("components.position_menu.schema.formFloatMenu.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentPositionMenuConfigs.keys.prop_menuBackgroundColor.name],
                this._COMPONENT_PATTERN[ComponentPositionMenuConfigs.keys.prop_menuBorderColor.name],
                this._COMPONENT_PATTERN[ComponentPositionMenuConfigs.keys.prop_menuBorderWidth.name],
                this._COMPONENT_PATTERN[ComponentPositionMenuConfigs.keys.prop_menuIsOpen.name],
                this._COMPONENT_PATTERN[ComponentPositionMenuConfigs.keys.prop_menuBodyWidth.name],
            ]
        },
        [ComponentPositionMenuConfigs.schemas.FormFloatMenu_Selector.name]: {
            part: ComponentPositionMenuConfigs.schemas.FormFloatMenu_Selector.name,
            title: Language.translate("components.position_menu.schema.formFloatMenu_selector.title"),
            description: Language.translate("components.position_menu.schema.formFloatMenu_selector.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentPositionMenuConfigs.keys.prop_menuSelector.name],
            ]
        },
        [ComponentPositionMenuConfigs.schemas.FormFloatMenu_Body.name]: {
            part: ComponentPositionMenuConfigs.schemas.FormFloatMenu_Body.name,
            title: Language.translate("components.position_menu.schema.formFloatMenu_body.title"),
            description: Language.translate("components.position_menu.schema.formFloatMenu_body.description"),
            props: [

            ]
        },
        [ComponentPositionMenuConfigs.schemas.FormFloatMenu_Body_content.name]: {
            part: ComponentPositionMenuConfigs.schemas.FormFloatMenu_Body_content.name,
            title: Language.translate("components.position_menu.schema.formFloatMenu_body_content.title"),
            description: Language.translate("components.position_menu.schema.formFloatMenu_body_content.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentPositionMenuConfigs.keys.prop_menuBtnAcceptHas.name],
                this._COMPONENT_PATTERN[ComponentPositionMenuConfigs.keys.prop_menuBtnRejectHas.name],

                this._COMPONENT_PATTERN[ComponentPositionMenuConfigs.keys.prop_menuBody.name],
                this._COMPONENT_PATTERN[ComponentPositionMenuConfigs.keys.prop_menuBodyHeight.name],
            ]
        },
        [ComponentPositionMenuConfigs.schemas.FormFloatMenu_Body_Buttons.name]: {
            part: ComponentPositionMenuConfigs.schemas.FormFloatMenu_Body_Buttons.name,
            title: Language.translate("components.position_menu.schema.formFloatMenu_body_buttons.title"),
            description: Language.translate("components.position_menu.schema.formFloatMenu_body_buttons.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentPositionMenuConfigs.keys.prop_menuBtnAcceptHas.name],
                this._COMPONENT_PATTERN[ComponentPositionMenuConfigs.keys.prop_menuBtnRejectHas.name],

                this._COMPONENT_PATTERN[ComponentPositionMenuConfigs.keys.prop_menuBorderColor.name],
                this._COMPONENT_PATTERN[ComponentPositionMenuConfigs.keys.prop_menuBorderWidth.name],
            ]
        },
        [ComponentPositionMenuConfigs.schemas.FormFloatMenu_Body_Buttons_Accept.name]: {
            part: ComponentPositionMenuConfigs.schemas.FormFloatMenu_Body_Buttons_Accept.name,
            title: Language.translate("components.position_menu.schema.formFloatMenu_body_buttons_accept.title"),
            description: Language.translate("components.position_menu.schema.formFloatMenu_body_buttons_accept.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentPositionMenuConfigs.keys.prop_menuBtnAcceptHas.name],
                this._COMPONENT_PATTERN[ComponentPositionMenuConfigs.keys.prop_menuBtnAcceptIcon.name],
                this._COMPONENT_PATTERN[ComponentPositionMenuConfigs.keys.prop_menuBtnAcceptTitle.name],
            ]
        },
        [ComponentPositionMenuConfigs.schemas.FormFloatMenu_Body_Buttons_Reject.name]: {
            part: ComponentPositionMenuConfigs.schemas.FormFloatMenu_Body_Buttons_Reject.name,
            title: Language.translate("components.position_menu.schema.formFloatMenu_body_buttons_reject.title"),
            description: Language.translate("components.position_menu.schema.formFloatMenu_body_buttons_reject.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentPositionMenuConfigs.keys.prop_menuBtnRejectHas.name],
                this._COMPONENT_PATTERN[ComponentPositionMenuConfigs.keys.prop_menuBtnRejectIcon.name],
                this._COMPONENT_PATTERN[ComponentPositionMenuConfigs.keys.prop_menuBtnRejectTitle.name],
            ]
        },
    });



    /* ---------------------------------------------
           PROPERTYs Pattern
        --------------------------------------------- */
    _COMPONENT_TEMPLATES = defineComponentTemplate<ComponentPositionMenuTemplatesType, ComponentPositionMenuPropsType>({
        [ComponentPositionMenuConfigs.templates.SELECTOR.name]: {
            title: Language.translate("components.position_menu.template.SELECTOR.title"),
            description: Language.translate("components.position_menu.template.SELECTOR.description"),
            reference: this._COMPONENT_PATTERN[ComponentPositionMenuConfigs.keys.prop_menuSelector.name]
        },
        [ComponentPositionMenuConfigs.templates.BODY.name]: {
            title: Language.translate("components.position_menu.template.body.title"),
            description: Language.translate("components.position_menu.template.body.description"),
            reference: this._COMPONENT_PATTERN[ComponentPositionMenuConfigs.keys.prop_menuBody.name]
        },
    });


    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentPositionMenuMethodsType, ComponentPositionMenuPropsType>({
        [ComponentPositionMenuConfigs.methods.CLICK_OPEN.name]: {
            title: Language.translate("components.position_menu.methods.fn_onClickOpen.title"),
            description: Language.translate("components.position_menu.methods.fn_onClickOpen.description"),
            args: {}
        },
        [ComponentPositionMenuConfigs.methods.CLICK_ACCEPT.name]: {
            title: Language.translate("components.position_menu.methods.fn_onClickAccept.title"),
            description: Language.translate("components.position_menu.methods.fn_onClickAccept.description"),
            args: {}
        },
        [ComponentPositionMenuConfigs.methods.CLICK_REJECT.name]: {
            title: Language.translate("components.position_menu.methods.fn_onClickReject.title"),
            description: Language.translate("components.position_menu.methods.fn_onClickReject.description"),
            args: {}
        },
    });



    /* ---------------------------------------------
       Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        return new ComponentPositionMenu(
            <ComponentPositionMenuPropsType>{
                classList: ["col-md-3", "col-12", "border", "p-2", "position-relative"],
                styles: {},

                prop_menuBodyWidth: SizeUnit(350, UNITS.PEXEL),

                prop_menuSelector: new ToolsComponents.ComponentIcon(
                    <ComponentIconPropsType>{
                        classList: [

                        ],
                        styles: {

                        },
                        prop_iconClass: [

                        ],
                        prop_iconStyles: {
                            "cursor": "pointer"
                        },
                        prop_icon: ToolsIcons.icon_select_columns({ size: SIZES.L })
                    },
                    <ComponentIconMethodsType>{
                        fn_onClickIcon: function (event, dataArgs: ComponentIcon_Methods_CLICK_DataArgs, componentArgs: ComponentIcon_Methods_CLICK_ComponentArgs) {

                        }.bind(this),
                    }
                ).getReactiveElement(),

                prop_menuBody:
                    ReactiveElement.section({
                        children: [
                            ReactiveElement.section({
                                className: ["border-bottom"],
                                children: ["item"]
                            }),
                            ReactiveElement.section({
                                className: ["border-bottom"],
                                children: ["item"]
                            }),
                            ReactiveElement.section({
                                className: ["border-bottom"],
                                children: ["item"]
                            }),
                            ReactiveElement.section({
                                className: ["border-bottom"],
                                children: ["item"]
                            }),
                            ReactiveElement.section({
                                className: ["border-bottom"],
                                children: ["item"]
                            }),
                            ReactiveElement.section({
                                className: ["border-bottom"],
                                children: ["item"]
                            }),
                            ReactiveElement.section({
                                className: ["border-bottom"],
                                children: ["item"]
                            }),
                            ReactiveElement.section({
                                className: ["border-bottom"],
                                children: ["item"]
                            }),
                            ReactiveElement.section({
                                className: ["border-bottom"],
                                children: ["item"]
                            }),
                            ReactiveElement.section({
                                className: ["border-bottom"],
                                children: ["item"]
                            }),
                            ReactiveElement.section({
                                className: ["border-bottom"],
                                children: ["item"]
                            }),
                            ReactiveElement.section({
                                className: ["border-bottom"],
                                children: ["item"]
                            }),
                        ]
                    })

            },
            <ComponentPositionMenuMethodsType>{
                fn_onClickOpen: function (event, dataArgs: ComponentPositionMenu_Methods_CLICK_OPEN_DataArgs, componentArgs: ComponentPositionMenu_Methods_CLICK_OPEN_ComponentArgs) {
                    console.log("position open")
                },
                fn_onClickAccept: function (event, dataArgs: ComponentPositionMenu_Methods_CLICK_ACCEPT_DataArgs, componentArgs: ComponentPositionMenu_Methods_CLICK_ACCEPT_ComponentArgs) {
                    console.log("position accept")
                    return true;
                },
                fn_onClickReject: function (event, dataArgs: ComponentPositionMenu_Methods_CLICK_REJECT_DataArgs, componentArgs: ComponentPositionMenu_Methods_CLICK_REJECT_ComponentArgs) {
                    console.log("position reject")
                }
            }
        ).getElement();
    }


}

export class ComponentPositionMenu extends ComponentPositionMenuBase {

    private _FLOAT_MENU;
    private _HEIGHT_FORM_BUTTONS = 40;

    private _ON_MENU_OPEN;

    /* ---------------------------------------------
       SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentPositionMenuPropsType,
        methods: ComponentPositionMenuMethodsType,
        events = null
    ) {
        super("position-menu", null);
        super.renderComponent(config, methods, events);
    }


    /* ---------------------------------------------
     TEMPLATEs
    --------------------------------------------- */

    override renderContentComponent() {
        return this.executeSchemaPart(ComponentPositionMenuConfigs.schemas.FormFloatMenu.name)
    }

    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentPositionMenuConfigs.schemas.FormFloatMenu.name:
                return this.template_render_formFloatMenu(attrsDefault, data, extra);
            case ComponentPositionMenuConfigs.schemas.FormFloatMenu_Selector.name:
                return this.template_render_formFloatMenu_selector(attrsDefault, data, extra);
            case ComponentPositionMenuConfigs.schemas.FormFloatMenu_Body.name:
                return this.template_render_formFloatMenu_body(attrsDefault, data, extra);
            case ComponentPositionMenuConfigs.schemas.FormFloatMenu_Body_content.name:
                return this.template_render_formFloatMenu_body_content(attrsDefault, data, extra);
            case ComponentPositionMenuConfigs.schemas.FormFloatMenu_Body_Buttons.name:
                return this.template_render_formFloatMenu_body_buttons(attrsDefault, data, extra);
            case ComponentPositionMenuConfigs.schemas.FormFloatMenu_Body_Buttons_Accept.name:
                return this.template_render_formFloatMenu_body_buttons_accept(attrsDefault, data, extra);
            case ComponentPositionMenuConfigs.schemas.FormFloatMenu_Body_Buttons_Reject.name:
                return this.template_render_formFloatMenu_body_buttons_reject(attrsDefault, data, extra);
        }
    }


    private template_render_formFloatMenu(attrsDefault, data, extra): ReactiveElement {

        if (data != null) {

            const prop_menuIsOpen = data[ComponentPositionMenuConfigs.keys.prop_menuIsOpen.name];
            const prop_menuBackgroundColor = data[ComponentPositionMenuConfigs.keys.prop_menuBackgroundColor.name];
            const prop_menuBorderColor = data[ComponentPositionMenuConfigs.keys.prop_menuBorderColor.name];
            const prop_menuBorderWidth = data[ComponentPositionMenuConfigs.keys.prop_menuBorderWidth.name];
            const prop_menuBodyWidth = data[ComponentPositionMenuConfigs.keys.prop_menuBodyWidth.name];

            this._FLOAT_MENU = new ToolsComponents.ComponentFloatMenu(
                <ComponentFloatMenuPropsType>{
                    classList: ["position-relative", "d-block", "w-100", "h-100"],
                    // prop_floatClass: ["p-2"] ,
                    prop_selectorClass: [],
                    prop_selectorContent:          this.executeSchemaPart(ComponentPositionMenuConfigs.schemas.FormFloatMenu_Selector.name),
                    prop_floatContent:             this.executeSchemaPart(ComponentPositionMenuConfigs.schemas.FormFloatMenu_Body.name),
                    prop_selectorShowType:         "click",
                    prop_floatDirectionType:       "bottom",

                    prop_floatMinWidth:             SizeUnit(230, UNITS.PEXEL),
                    prop_floatArrowWidth:           0,

                    prop_floatShowControlWithSelf:  true,
                    prop_floatIsShow:               prop_menuIsOpen,

                    prop_floatStyles: {
                        display: "block"
                    },

                    prop_floatWidth:                 prop_menuBodyWidth,
                    prop_floatBackground:            prop_menuBackgroundColor,
                    prop_floatBorderColor:           prop_menuBorderColor,
                    prop_floatBorderWidth:           prop_menuBorderWidth
                },
                <ComponentFloatMenuMethodsType>{

                }
            )

            return this._FLOAT_MENU.getReactiveElement();

        }

    }


    private template_render_formFloatMenu_selector(attrsDefault, data, extra): ReactiveElement {

        if (data != null) {

            const prop_menuSelector = data[ComponentPositionMenuConfigs.keys.prop_menuSelector.name];

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault
                },
                className: [
                    // "bg-white" , "rounded" ,
                    "d-block", "w-100", "h-100"
                ],
                children: [
                    prop_menuSelector,
                ],
                on: {
                    click: (event) => {
                        const prop_menuIsOpen = this.get(ComponentPositionMenuConfigs.keys.prop_menuIsOpen.name);
                        if (prop_menuIsOpen) {
                            const params: ComponentPositionMenu_Methods_CLICK_OPEN_DataArgs = {}
                            this.executeMethod(ComponentPositionMenuConfigs.methods.CLICK_OPEN.name, event, params);
                        }
                        this.set(ComponentPositionMenuConfigs.keys.prop_menuIsOpen.name, !prop_menuIsOpen)

                        this._ON_MENU_OPEN = this.pr_handleMenuClose.bind(this, true)
                        document.addEventListener('click', this._ON_MENU_OPEN);
                    }
                }
            });

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    private template_render_formFloatMenu_body(attrsDefault, data, extra): ReactiveElement {

        if (data != null) {

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault
                },
                className: [
                    "bg-white", "rounded"
                ],
                stylesBind: {

                },
                children: [
                    this.executeSchemaPart(ComponentPositionMenuConfigs.schemas.FormFloatMenu_Body_content.name),
                    this.executeSchemaPart(ComponentPositionMenuConfigs.schemas.FormFloatMenu_Body_Buttons.name),
                ]
            });

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    private template_render_formFloatMenu_body_content(attrsDefault, data, extra): ReactiveElement {

        if (data != null) {

            const prop_menuBtnAcceptHas = data[ComponentPositionMenuConfigs.keys.prop_menuBtnAcceptHas.name];
            const prop_menuBtnRejectHas = data[ComponentPositionMenuConfigs.keys.prop_menuBtnRejectHas.name];

            const prop_menuBody = data[ComponentPositionMenuConfigs.keys.prop_menuBody.name];
            const prop_menuBodyHeight = data[ComponentPositionMenuConfigs.keys.prop_menuBodyHeight.name];

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault
                },
                className: [
                    "overflow-y-auto"
                ],
                stylesBind: {
                    height: Observable.computed(
                        (menuBodyHeight, sizeName) => {
                            return SizeCalc(
                                menuBodyHeight,
                                OPERATION.MINUS,
                                ToolsComponents_BorderWidth?.[sizeName],
                            )
                        },
                        [
                            prop_menuBodyHeight,
                            AppConfig.get_sizeName()
                        ],
                        this.getScope()
                    ),

                    borderBottomColor: Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1),
                    borderBottomStyle: Observable.computed(
                        (menuBtnAcceptHas , menuBtnRejectHas) => {
                            return (menuBtnAcceptHas && menuBtnRejectHas) ? "solid" : "none";
                        },
                        [
                            prop_menuBtnAcceptHas ,
                            prop_menuBtnRejectHas
                        ],
                        this.getScope()
                    ) ,
                    borderBottomWidth: Observable.computed(
                        (sizeName) => {
                            return ToolsComponents_BorderWidth?.[sizeName]
                        },
                        [
                            AppConfig.get_sizeName()
                        ],
                        this.getScope()
                    )
                },
                children: [
                    prop_menuBody,
                ]
            });

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    private template_render_formFloatMenu_body_buttons(attrsDefault, data, extra): ReactiveElement {

        if (data != null) {

            const prop_menuBtnAcceptHas = data[ComponentPositionMenuConfigs.keys.prop_menuBtnAcceptHas.name];
            const prop_menuBtnRejectHas = data[ComponentPositionMenuConfigs.keys.prop_menuBtnRejectHas.name];

            return Observable.conditionWhen(
                [
                    prop_menuBtnAcceptHas,
                    prop_menuBtnRejectHas
                ],
                (menuBtnAcceptHas, menuBtnRejectHas) => menuBtnAcceptHas && menuBtnRejectHas,
                () => {
                    return ReactiveElement.part("section", {
                        attrs: {
                            ...attrsDefault
                        },
                        className: [
                            "row", "p-0", "mx-1"
                        ],
                        styles: {

                        },
                        stylesBind: {
                            height: Observable.computed(
                                (sizeName) => {
                                    return SizeCalc(
                                        ToolsComponents_BorderRadius?.[sizeName],
                                        OPERATION.ADD,
                                        ToolsComponents_Height?.[sizeName],
                                        OPERATION.ADD,
                                        ToolsComponents_BorderRadius?.[sizeName],
                                    )
                                },
                                [
                                    AppConfig.get_sizeName()
                                ],
                                this.getScope()
                            ),
                            marginTop: Observable.computed(
                                (sizeName) => {
                                    return ToolsComponents_Margin?.[sizeName]
                                },
                                [
                                    AppConfig.get_sizeName()
                                ],
                                this.getScope()
                            ),
                            marginBottom: Observable.computed(
                                (sizeName) => {
                                    return ToolsComponents_Margin?.[sizeName]
                                },
                                [
                                    AppConfig.get_sizeName()
                                ],
                                this.getScope()
                            ),

                        },
                        children: [
                            this.executeSchemaPart(ComponentPositionMenuConfigs.schemas.FormFloatMenu_Body_Buttons_Accept.name),
                            this.executeSchemaPart(ComponentPositionMenuConfigs.schemas.FormFloatMenu_Body_Buttons_Reject.name),
                        ]
                    });
                } ,
                () => {
                  return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault)  
                } ,
                this.getScope()
            ).get()

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    private template_render_formFloatMenu_body_buttons_accept(attrsDefault, data, extra): ReactiveElement {

        if (data != null) {

            const prop_menuBtnAcceptHas = data[ComponentPositionMenuConfigs.keys.prop_menuBtnAcceptHas.name];
            const prop_menuBtnAcceptIcon = data[ComponentPositionMenuConfigs.keys.prop_menuBtnAcceptIcon.name];
            const prop_menuBtnAcceptTitle = data[ComponentPositionMenuConfigs.keys.prop_menuBtnAcceptTitle.name];

            return new ComponentButton(
                <ComponentButtonPropsType>{
                    classList: ["col-md-6"],
                    prop_btnTitle: prop_menuBtnAcceptTitle,
                    prop_type: "submit",
                    prop_btnIcon: prop_menuBtnAcceptIcon,
                    prop_show: prop_menuBtnAcceptHas
                },
                <ComponentButtonMethodsType>{
                    fn_onClickButton: function (event, dataArgs: ComponentButton_Methods_CLICK_DataArgs, componentArgs: ComponentButton_Methods_CLICK_ComponentArgs) {
                        const params: ComponentPositionMenu_Methods_CLICK_ACCEPT_DataArgs = {}
                        const close = this.executeMethod(ComponentPositionMenuConfigs.methods.CLICK_ACCEPT.name, event, params);
                        if (close) {
                            this.pr_handleMenuClose(false, event);
                        }
                    }.bind(this)
                }
            ).getReactiveElement()

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    private template_render_formFloatMenu_body_buttons_reject(attrsDefault, data, extra): ReactiveElement {

        if (data != null) {

            const prop_menuBtnRejectHas = data[ComponentPositionMenuConfigs.keys.prop_menuBtnRejectHas.name];
            const prop_menuBtnRejectIcon = data[ComponentPositionMenuConfigs.keys.prop_menuBtnRejectIcon.name];
            const prop_menuBtnRejectTitle = data[ComponentPositionMenuConfigs.keys.prop_menuBtnRejectTitle.name];

            return new ComponentButton(
                <ComponentButtonPropsType>{
                    classList: ["col-md-6"],
                    prop_btnTitle: prop_menuBtnRejectTitle,
                    prop_type: "cancel",
                    prop_btnIcon: prop_menuBtnRejectIcon,
                    prop_show: prop_menuBtnRejectHas
                },
                <ComponentButtonMethodsType>{
                    fn_onClickButton: function (event, dataArgs: ComponentButton_Methods_CLICK_DataArgs, componentArgs: ComponentButton_Methods_CLICK_ComponentArgs) {
                        this.pr_handleMenuClose(false, event);
                        this.pr_executeMethodReject(event);
                    }.bind(this)
                }
            ).getReactiveElement();

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }



    /// ---------------------------------------
    private pr_handleMenuClose(checkChild, event) {
        const target = event.target as HTMLElement;
        const menuId = this.getPartId(GOG_ComponentBasicConfigs_Component_parts.Component.name)
        if (checkChild && target.closest(`#${menuId}`)) {
            return;
        }

        this.set(ComponentPositionMenuConfigs.keys.prop_menuIsOpen.name, false);
        document.removeEventListener('click', this._ON_MENU_OPEN);

        if (checkChild) {
            this.pr_executeMethodReject(event);
        }
    }

    private pr_executeMethodReject(event) {
        const params: ComponentPositionMenu_Methods_CLICK_REJECT_DataArgs = {};
        this.executeMethod(ComponentPositionMenuConfigs.methods.CLICK_REJECT.name, event, params);
    }




}

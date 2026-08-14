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
    GOG_ValueOf
} from "../../../core/ComponentBase";
import { ReactiveElement } from "../../../core/ReactiveElement";
import { Observable } from "../../../core/Observable";
import { ComponentCallBackType } from "../../../core/ComponentBase";
import { Language } from "../../../core/Language";
import { AppConfig } from "../../../core/AppConfig";
import {
    Color,
    COLORS_GRAD,
    COLORS_MAIN,
    IconsType,
    SIZES, SizesType, SizeUnit, UNITS,
    ToolsComponents_BorderRadius,
    ToolsComponents_BorderWidth, ToolsComponents_Padding, SizeCalc, OPERATION, ToolsComponents_Height,
    ToolsComponents_IconSize, StyleValue, ToolsComponents_FontSize, TranslateUnit,
    ToolsComponents_Margin
} from "../../../utils/ToolsConsts";
import {
    GOG_ComponentBasicConfigs_Component_keys,
    GOG_ComponentBasicConfigs_Component_parts,
    GOG_ComponentBasicConfigs_Component_Pattern,
    GOG_ComponentBasicConfigs_Component_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_keys,
    GOG_ComponentBasicConfigs_Component_Structure_parts,
    GOG_ComponentBasicConfigs_Component_Structure_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_Schema,
    GOG_ComponentBasicConfigs_partDoseNotBody,
    GOG_ComponentBasicProps_Component,
    GOG_ComponentBasicProps_Component_Structure,
} from "../../../core/component/SetupComponent";
import {
    ComponentElementPosition,
    ComponentElementPosition_positionTypes, ComponentElementPositionMethodsType,
    ComponentElementPositionPropsType
} from "../ComponentElementPosition";
import { ComponentIconMethodsType, ComponentIconPropsType } from "../ComponentIcon";
import {
    ComponentBorder, ComponentBorder_Methods_CLICK_BORDER_ComponentArgs,
    ComponentBorder_Methods_CLICK_BORDER_DataArgs, ComponentBorderMethodsType, ComponentBorderPropsType
} from "../ComponentBorder";
import { ComponentInputSimple_Types, ComponentInputSimpleMethodsType, ComponentInputSimplePropsType } from "./ComponentInputSimple";

import {
    ComponentPositionMenu_Methods_CLICK_ACCEPT_ComponentArgs,
    ComponentPositionMenu_Methods_CLICK_ACCEPT_DataArgs, ComponentPositionMenu_Methods_CLICK_OPEN_ComponentArgs,
    ComponentPositionMenu_Methods_CLICK_OPEN_DataArgs,
    ComponentPositionMenu_Methods_CLICK_REJECT_ComponentArgs, ComponentPositionMenu_Methods_CLICK_REJECT_DataArgs,
    ComponentPositionMenuMethodsType, ComponentPositionMenuPropsType
} from "../ComponentPositionMenu";
import {
    ComponentRecyclerView_DirectionTypes,
    ComponentRecyclerViewMethodsType,
    ComponentRecyclerViewPropsType
} from "../Content/ComponentRecyclerView";



export const ComponentSelectCustomSimpleProps = {
    ...GOG_ComponentBasicProps_Component,
    ...GOG_ComponentBasicProps_Component_Structure,
    ///----------------------
    prop_selectName:                       "prop_selectName",
    prop_selectDisable:                    "prop_selectDisable",
    prop_selectValue:                      "prop_selectValue",
    prop_selectClass:                      "prop_selectClass",
    prop_selectStyles:                     "prop_selectStyles",
    prop_selectPlaceholder:                "prop_selectPlaceholder",
    prop_selectOptions:                    "prop_selectOptions",
    prop_selectTypeShow:                   "prop_selectTypeShow",

    prop_selectBorderTopLeftRadiusHas:     "prop_selectBorderTopLeftRadiusHas",
    prop_selectBorderTopRightRadiusHas:    "prop_selectBorderTopRightRadiusHas",
    prop_selectBorderBottomLeftRadiusHas:  "prop_selectBorderBottomLeftRadiusHas",
    prop_selectBorderBottomRightRadiusHas: "prop_selectBorderBottomRightRadiusHas",

    prop_selectBorderTopHas:               "prop_selectBorderTopHas",
    prop_selectBorderRightHas:             "prop_selectBorderRightHas",
    prop_selectBorderBottomHas:            "prop_selectBorderBottomHas",
    prop_selectBorderLeftHas:              "prop_selectBorderLeftHas",
} as const;


export interface ComponentSelectCustomSimple_selectOptions {
    id:            string | number;
    name:          string | number;
    prefix:        string | number;
    //options:       Record<string , any>;
}

export enum ComponentSelectCustomSimple_selectTypeShow{
    JUST_NAME=   "just_name",
    JUST_PREFIX= "just_prefix",
    BOTH=        "both",
}


const ComponentSelectCustomSimpleConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        ///----------------------
        [ComponentSelectCustomSimpleProps.prop_selectName]: {
            name: ComponentSelectCustomSimpleProps.prop_selectName,
            value: GOG_SetValue<string | null>(null),
        },
        [ComponentSelectCustomSimpleProps.prop_selectValue]: {
            name: ComponentSelectCustomSimpleProps.prop_selectValue,
            value: GOG_SetValue<string | null>(null),
        },
        [ComponentSelectCustomSimpleProps.prop_selectDisable]: {
            name: ComponentSelectCustomSimpleProps.prop_selectDisable,
            value: GOG_SetValue<boolean>(false),
        },
        [ComponentSelectCustomSimpleProps.prop_selectClass]: {
            name: ComponentSelectCustomSimpleProps.prop_selectClass,
            value: GOG_SetValue<string[]>(["form-control"]),
        },
        [ComponentSelectCustomSimpleProps.prop_selectStyles]: {
            name: ComponentSelectCustomSimpleProps.prop_selectStyles,
            value: GOG_SetValue<Record<string, string>>({}),
        },
        [ComponentSelectCustomSimpleProps.prop_selectPlaceholder]: {
            name: ComponentSelectCustomSimpleProps.prop_selectPlaceholder,
            value: GOG_SetValue<string | null>(null),
        },
        [ComponentSelectCustomSimpleProps.prop_selectOptions]: {
            name: ComponentSelectCustomSimpleProps.prop_selectOptions,
            value: GOG_SetValue<ComponentSelectCustomSimple_selectOptions | null>(null),
        },
        [ComponentSelectCustomSimpleProps.prop_selectTypeShow]: {
            name: ComponentSelectCustomSimpleProps.prop_selectTypeShow,
            value: GOG_SetValue<ComponentSelectCustomSimple_selectTypeShow>(ComponentSelectCustomSimple_selectTypeShow.BOTH),
        },


        [ComponentSelectCustomSimpleProps.prop_selectBorderTopLeftRadiusHas]: {
            name: ComponentSelectCustomSimpleProps.prop_selectBorderTopLeftRadiusHas,
            value: GOG_SetValue<boolean>(true),
        },
        [ComponentSelectCustomSimpleProps.prop_selectBorderTopRightRadiusHas]: {
            name: ComponentSelectCustomSimpleProps.prop_selectBorderTopRightRadiusHas,
            value: GOG_SetValue<boolean>(true),
        },
        [ComponentSelectCustomSimpleProps.prop_selectBorderBottomLeftRadiusHas]: {
            name: ComponentSelectCustomSimpleProps.prop_selectBorderBottomLeftRadiusHas,
            value: GOG_SetValue<boolean>(true),
        },
        [ComponentSelectCustomSimpleProps.prop_selectBorderBottomRightRadiusHas]: {
            name: ComponentSelectCustomSimpleProps.prop_selectBorderBottomRightRadiusHas,
            value: GOG_SetValue<boolean>(true),
        },


        [ComponentSelectCustomSimpleProps.prop_selectBorderTopHas]: {
            name: ComponentSelectCustomSimpleProps.prop_selectBorderTopHas,
            value: GOG_SetValue<boolean>(true),
        },
        [ComponentSelectCustomSimpleProps.prop_selectBorderRightHas]: {
            name: ComponentSelectCustomSimpleProps.prop_selectBorderRightHas,
            value: GOG_SetValue<boolean>(true),
        },
        [ComponentSelectCustomSimpleProps.prop_selectBorderBottomHas]: {
            name: ComponentSelectCustomSimpleProps.prop_selectBorderBottomHas,
            value: GOG_SetValue<boolean>(true),
        },
        [ComponentSelectCustomSimpleProps.prop_selectBorderLeftHas]: {
            name: ComponentSelectCustomSimpleProps.prop_selectBorderLeftHas,
            value: GOG_SetValue<boolean>(true),
        },

    },
    schemas: {
        ...GOG_ComponentBasicConfigs_Component_parts,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts,
        ///----------------------
        FORM: {
            name: "part_form"
        },
        FORM_VALUE: {
            name: "part_form_value"
        },
        FORM_SELECT: {
            name: "part_form_select"
        },
        FORM_SELECT_HEADER: {
            name: "part_form_select_header"
        },
        FORM_SELECT_HEADER_TEXT: {
            name: "part_form_select_header_text"
        },
        FORM_SELECT_HEADER_ICON_ARROW: {
            name: "part_form_select_header_iconArrow"
        },
        FORM_SELECT_BODY: {
            name: "part_form_select_body"
        },
        FORM_SELECT_BODY_SEARCH: {
            name: "part_form_select_body_search"
        },
        FORM_SELECT_BODY_OPTIONS: {
            name: "part_form_select_body_search_options"
        },
        FORM_SELECT_BODY_OPTIONS_ITEM: {
            name: "part_form_select_body_search_options_item"
        },
    },
    templates: {

    },
    methods: {
        SELECT_CHANGE: {
            name: "fn_onSelectChange",
            dataArgs: {
                VALUE: {
                    name: "value",
                },
            },
            componentArgs: {}
        },
        SELECT_SEARCH: {
            name: "fn_onSelectSearch",
            dataArgs: {
                VALUE: {
                    name: "value",
                },
            },
            componentArgs: {}
        },
        SELECT_OPEN: {
            name: "fn_onSelectOpen",
            dataArgs: {
                VALUE: {
                    name: "value",
                },
            },
            componentArgs: {}
        },
        SELECT_CLOSE: {
            name: "fn_onSelectClose",
            dataArgs: {
                VALUE: {
                    name: "value",
                },
            },
            componentArgs: {}
        },
    }
} as const;




export type ComponentSelectCustomSimplePropsType = GOG_ExtractNameValue<typeof ComponentSelectCustomSimpleConfigs.keys>
export type ComponentSelectCustomSimpleSchemaType = GOG_ExtractName<typeof ComponentSelectCustomSimpleConfigs.schemas>
export type ComponentSelectCustomSimpleTemplatesType = GOG_ExtractName<typeof ComponentSelectCustomSimpleConfigs.templates>

export type ComponentSelectCustomSimple_Methods_SELECT_CHANGE_ComponentArgs = GOG_ExtractName<typeof ComponentSelectCustomSimpleConfigs.methods.SELECT_CHANGE.componentArgs>
export type ComponentSelectCustomSimple_Methods_SELECT_CHANGE_DataArgs = GOG_ExtractNameValue<typeof ComponentSelectCustomSimpleConfigs.methods.SELECT_CHANGE.dataArgs>

export type ComponentSelectCustomSimple_Methods_SELECT_SEARCH_ComponentArgs = GOG_ExtractName<typeof ComponentSelectCustomSimpleConfigs.methods.SELECT_SEARCH.componentArgs>
export type ComponentSelectCustomSimple_Methods_SELECT_SEARCH_DataArgs = GOG_ExtractNameValue<typeof ComponentSelectCustomSimpleConfigs.methods.SELECT_SEARCH.dataArgs>

export type ComponentSelectCustomSimple_Methods_SELECT_OPEN_ComponentArgs = GOG_ExtractName<typeof ComponentSelectCustomSimpleConfigs.methods.SELECT_OPEN.componentArgs>
export type ComponentSelectCustomSimple_Methods_SELECT_OPEN_DataArgs = GOG_ExtractNameValue<typeof ComponentSelectCustomSimpleConfigs.methods.SELECT_OPEN.dataArgs>

export type ComponentSelectCustomSimple_Methods_SELECT_CLOSE_ComponentArgs = GOG_ExtractName<typeof ComponentSelectCustomSimpleConfigs.methods.SELECT_CLOSE.componentArgs>
export type ComponentSelectCustomSimple_Methods_SELECT_CLOSE_DataArgs = GOG_ExtractNameValue<typeof ComponentSelectCustomSimpleConfigs.methods.SELECT_CLOSE.dataArgs>

export type ComponentSelectCustomSimpleMethodsType = {
    [ComponentSelectCustomSimpleConfigs.methods.SELECT_CHANGE.name]: ComponentCallBackType<ComponentSelectCustomSimple_Methods_SELECT_CHANGE_ComponentArgs, ComponentSelectCustomSimple_Methods_SELECT_CHANGE_DataArgs>,
    [ComponentSelectCustomSimpleConfigs.methods.SELECT_SEARCH.name]: ComponentCallBackType<ComponentSelectCustomSimple_Methods_SELECT_SEARCH_ComponentArgs, ComponentSelectCustomSimple_Methods_SELECT_SEARCH_DataArgs>,
    [ComponentSelectCustomSimpleConfigs.methods.SELECT_OPEN.name]: ComponentCallBackType<ComponentSelectCustomSimple_Methods_SELECT_OPEN_ComponentArgs, ComponentSelectCustomSimple_Methods_SELECT_OPEN_DataArgs>,
    [ComponentSelectCustomSimpleConfigs.methods.SELECT_CLOSE.name]: ComponentCallBackType<ComponentSelectCustomSimple_Methods_SELECT_CLOSE_ComponentArgs, ComponentSelectCustomSimple_Methods_SELECT_CLOSE_DataArgs>,
}



export abstract class ComponentSelectCustomSimpleBase extends ComponentBase<
    ComponentSelectCustomSimplePropsType,
    ComponentSelectCustomSimpleSchemaType,
    ComponentSelectCustomSimpleTemplatesType,
    ComponentSelectCustomSimpleMethodsType
> {

    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN = defineComponentPatterns<ComponentSelectCustomSimplePropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this),
            ///----------------------
            [ComponentSelectCustomSimpleConfigs.keys.prop_selectName.name]: {
                prop: ComponentSelectCustomSimpleConfigs.keys.prop_selectName.name,
                default: ComponentSelectCustomSimpleConfigs.keys.prop_selectName.value,
                title: Language.translate("components.select_custom_simple.props.prop_selectName.title"),
                description: Language.translate("components.select_custom_simple.props.prop_selectName.description"),
            },
            [ComponentSelectCustomSimpleConfigs.keys.prop_selectDisable.name]: {
                prop: ComponentSelectCustomSimpleConfigs.keys.prop_selectDisable.name,
                default: ComponentSelectCustomSimpleConfigs.keys.prop_selectDisable.value,
                title: Language.translate("components.select_custom_simple.props.prop_selectDisable.title"),
                description: Language.translate("components.select_custom_simple.props.prop_selectDisable.description"),
            },
            [ComponentSelectCustomSimpleConfigs.keys.prop_selectValue.name]: {
                prop: ComponentSelectCustomSimpleConfigs.keys.prop_selectValue.name,
                default: ComponentSelectCustomSimpleConfigs.keys.prop_selectValue.value,
                title: Language.translate("components.select_custom_simple.props.prop_selectValue.title"),
                description: Language.translate("components.select_custom_simple.props.prop_selectValue.description"),
            },
            [ComponentSelectCustomSimpleConfigs.keys.prop_selectClass.name]: {
                prop: ComponentSelectCustomSimpleConfigs.keys.prop_selectClass.name,
                default: ComponentSelectCustomSimpleConfigs.keys.prop_selectClass.value,
                title: Language.translate("components.select_custom_simple.props.prop_selectClass.title"),
                description: Language.translate("components.select_custom_simple.props.prop_selectClass.description"),
            },
            [ComponentSelectCustomSimpleConfigs.keys.prop_selectStyles.name]: {
                prop: ComponentSelectCustomSimpleConfigs.keys.prop_selectStyles.name,
                default: ComponentSelectCustomSimpleConfigs.keys.prop_selectStyles.value,
                title: Language.translate("components.select_custom_simple.props.prop_selectStyles.title"),
                description: Language.translate("components.select_custom_simple.props.prop_selectStyles.description"),
            },
            [ComponentSelectCustomSimpleConfigs.keys.prop_selectPlaceholder.name]: {
                prop: ComponentSelectCustomSimpleConfigs.keys.prop_selectPlaceholder.name,
                default: ComponentSelectCustomSimpleConfigs.keys.prop_selectPlaceholder.value,
                title: Language.translate("components.select_custom_simple.props.prop_selectPlaceholder.title"),
                description: Language.translate("components.select_custom_simple.props.prop_selectPlaceholder.description"),
            },
            [ComponentSelectCustomSimpleConfigs.keys.prop_selectOptions.name]: {
                prop: ComponentSelectCustomSimpleConfigs.keys.prop_selectOptions.name,
                default: ComponentSelectCustomSimpleConfigs.keys.prop_selectOptions.value,
                title: Language.translate("components.select_custom_simple.props.prop_selectOptions.title"),
                description: Language.translate("components.select_custom_simple.props.prop_selectOptions.description"),
            },
            [ComponentSelectCustomSimpleConfigs.keys.prop_selectTypeShow.name]: {
                prop: ComponentSelectCustomSimpleConfigs.keys.prop_selectTypeShow.name,
                default: ComponentSelectCustomSimpleConfigs.keys.prop_selectTypeShow.value,
                title: Language.translate("components.select_custom_simple.props.prop_selectTypeShow.title"),
                description: Language.translate("components.select_custom_simple.props.prop_selectTypeShow.description"),
            },


            [ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderTopLeftRadiusHas.name]: {
                prop: ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderTopLeftRadiusHas.name,
                default: ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderTopLeftRadiusHas.value,
                title: Language.translate("components.select_custom_simple.props.prop_selectBorderTopLeftRadiusHas.title"),
                description: Language.translate("components.select_custom_simple.props.prop_selectBorderTopLeftRadiusHas.description"),
            },
            [ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderTopRightRadiusHas.name]: {
                prop: ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderTopRightRadiusHas.name,
                default: ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderTopRightRadiusHas.value,
                title: Language.translate("components.select_custom_simple.props.prop_selectBorderTopRightRadiusHas.title"),
                description: Language.translate("components.select_custom_simple.props.prop_selectBorderTopRightRadiusHas.description"),
            },
            [ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderBottomLeftRadiusHas.name]: {
                prop: ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderBottomLeftRadiusHas.name,
                default: ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderBottomLeftRadiusHas.value,
                title: Language.translate("components.select_custom_simple.props.prop_selectBorderBottomLeftRadiusHas.title"),
                description: Language.translate("components.select_custom_simple.props.prop_selectBorderBottomLeftRadiusHas.description"),
            },
            [ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderBottomRightRadiusHas.name]: {
                prop: ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderBottomRightRadiusHas.name,
                default: ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderBottomRightRadiusHas.value,
                title: Language.translate("components.select_custom_simple.props.prop_selectBorderBottomRightRadiusHas.title"),
                description: Language.translate("components.select_custom_simple.props.prop_selectBorderBottomRightRadiusHas.description"),
            },


            [ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderTopHas.name]: {
                prop: ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderTopHas.name,
                default: ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderTopHas.value,
                title: Language.translate("components.select_custom_simple.props.prop_selectBorderTopHas.title"),
                description: Language.translate("components.select_custom_simple.props.prop_selectBorderTopHas.description"),
            },
            [ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderRightHas.name]: {
                prop: ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderRightHas.name,
                default: ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderRightHas.value,
                title: Language.translate("components.select_custom_simple.props.prop_selectBorderRightHas.title"),
                description: Language.translate("components.select_custom_simple.props.prop_selectBorderRightHas.description"),
            },
            [ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderBottomHas.name]: {
                prop: ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderBottomHas.name,
                default: ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderBottomHas.value,
                title: Language.translate("components.select_custom_simple.props.prop_selectBorderBottomHas.title"),
                description: Language.translate("components.select_custom_simple.props.prop_selectBorderBottomHas.description"),
            },
            [ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderLeftHas.name]: {
                prop: ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderLeftHas.name,
                default: ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderLeftHas.value,
                title: Language.translate("components.select_custom_simple.props.prop_selectBorderLeftHas.title"),
                description: Language.translate("components.select_custom_simple.props.prop_selectBorderLeftHas.description"),
            },

        }
    );


    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentSelectCustomSimpleSchemaType, ComponentSelectCustomSimplePropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this),
        ///----------------------
        FORM: {
            part: ComponentSelectCustomSimpleConfigs.schemas.FORM.name,
            title: Language.translate("components.select_custom_simple.schema.form.title"),
            description: Language.translate("components.select_custom_simple.schema.form.description"),
            props: [

            ]
        },
        FORM_VALUE: {
            part: ComponentSelectCustomSimpleConfigs.schemas.FORM_VALUE.name,
            title: Language.translate("components.select_custom_simple.schema.form_select_value.title"),
            description: Language.translate("components.select_custom_simple.schema.form_select_value.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectDisable.name],
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectName.name],
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectValue.name],
            ]
        },
        FORM_SELECT: {
            part: ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT.name,
            title: Language.translate("components.select_custom_simple.schema.form_select.title"),
            description: Language.translate("components.select_custom_simple.schema.form_select.description"),
            props: [

            ]
        },
        FORM_SELECT_HEADER: {
            part: ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_HEADER.name,
            title: Language.translate("components.select_custom_simple.schema.form_select_header.title"),
            description: Language.translate("components.select_custom_simple.schema.form_select_header.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectDisable.name],
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectValue.name],
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectClass.name],
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectStyles.name],

                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderTopLeftRadiusHas.name],
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderTopRightRadiusHas.name],
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderBottomLeftRadiusHas.name],
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderBottomRightRadiusHas.name],

                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderTopHas.name],
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderRightHas.name],
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderBottomHas.name],
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderLeftHas.name],
            ]
        },
        FORM_SELECT_HEADER_TEXT: {
            part: ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_HEADER_TEXT.name,
            title: Language.translate("components.select_custom_simple.schema.form_select_header_text.title"),
            description: Language.translate("components.select_custom_simple.schema.form_select_header_text.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectDisable.name],
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectValue.name],
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectOptions.name],
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectPlaceholder.name],
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectTypeShow.name],
            ]
        },
        FORM_SELECT_HEADER_ICON_ARROW: {
            part: ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_HEADER_ICON_ARROW.name,
            title: Language.translate("components.select_custom_simple.schema.form_select_header_iconArrow.title"),
            description: Language.translate("components.select_custom_simple.schema.form_select_header_iconArrow.description"),
            props: [

            ]
        },
        FORM_SELECT_BODY: {
            part: ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_BODY.name,
            title: Language.translate("components.select_custom_simple.schema.form_select_body.title"),
            description: Language.translate("components.select_custom_simple.schema.form_select_body.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectDisable.name],
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectValue.name],
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectOptions.name],
            ]
        },
        FORM_SELECT_BODY_SEARCH: {
            part: ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_BODY_SEARCH.name,
            title: Language.translate("components.select_custom_simple.schema.form_select_body_search.title"),
            description: Language.translate("components.select_custom_simple.schema.form_select_body_search.description"),
            props: [
                
            ]
        },

        FORM_SELECT_BODY_OPTIONS: {
            part: ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_BODY_OPTIONS.name,
            title: Language.translate("components.select_custom_simple.schema.form_select_body_options.title"),
            description: Language.translate("components.select_custom_simple.schema.form_select_body_options.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectOptions.name],
            ]
        },
        FORM_SELECT_BODY_OPTIONS_ITEM: {
            part: ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_BODY_OPTIONS_ITEM.name,
            title: Language.translate("components.select_custom_simple.schema.form_select_body_options_item.title"),
            description: Language.translate("components.select_custom_simple.schema.form_select_body_options_item.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectValue.name],
            ]
        },

            

        
    });


    /* ---------------------------------------------
        PROPERTYs Templates
    --------------------------------------------- */
    _COMPONENT_TEMPLATES = defineComponentTemplate<ComponentSelectCustomSimpleTemplatesType, ComponentSelectCustomSimplePropsType>({

    });


    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentSelectCustomSimpleMethodsType, ComponentSelectCustomSimplePropsType>({
        [ComponentSelectCustomSimpleConfigs.methods.SELECT_CHANGE.name]: {
            title: Language.translate("components.select_custom_simple.methods.fn_onSelectChange.title"),
            description: Language.translate("components.select_custom_simple.methods.fn_onSelectChange.description"),
            args: {
                [ComponentSelectCustomSimpleConfigs.methods.SELECT_CHANGE.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectValue.name],
            }
        },
        [ComponentSelectCustomSimpleConfigs.methods.SELECT_SEARCH.name]: {
            title: Language.translate("components.select_custom_simple.methods.fn_onSelectSearch.title"),
            description: Language.translate("components.select_custom_simple.methods.fn_onSelectSearch.description"),
            args: {
                [ComponentSelectCustomSimpleConfigs.methods.SELECT_SEARCH.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectValue.name],
            }
        },
        [ComponentSelectCustomSimpleConfigs.methods.SELECT_OPEN.name]: {
            title: Language.translate("components.select_custom_simple.methods.fn_onSelectOpen.title"),
            description: Language.translate("components.select_custom_simple.methods.fn_onSelectOpen.description"),
            args: {
                [ComponentSelectCustomSimpleConfigs.methods.SELECT_OPEN.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectValue.name],
            }
        },
        [ComponentSelectCustomSimpleConfigs.methods.SELECT_CLOSE.name]: {
            title: Language.translate("components.select_custom_simple.methods.fn_onSelectClose.title"),
            description: Language.translate("components.select_custom_simple.methods.fn_onSelectClose.description"),
            args: {
                [ComponentSelectCustomSimpleConfigs.methods.SELECT_CLOSE.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[ComponentSelectCustomSimpleConfigs.keys.prop_selectValue.name],
            }
        },
    });



    /* ---------------------------------------------
        Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {

        return new ComponentSelectCustomSimple(
            <ComponentSelectCustomSimplePropsType>{
                classList: ["col-md-3", "col-12", "border", "p-2"],
                prop_selectPlaceholder: "Enter text...",
                prop_selectName: "select_example",
                prop_selectValue: 1,
                prop_selectOptions: [
                    {
                        id: 1,
                        prefix: "A" ,
                        name: "test a"
                    },
                    {
                        id: 2,
                        prefix: "B" ,
                        name: "test b"
                    },
                    {
                        id: 3,
                        prefix: "C" ,
                        name: "test c"
                    },
                    {
                        id: 4,
                        prefix: "D" ,
                        name: "test d"
                    },
                    {
                        id: 5,
                        prefix: "E" ,
                        name: "test e"
                    }
                ],
                prop_selectDisable: false,

            },
            <ComponentSelectCustomSimpleMethodsType>{
                fn_onSelectChange: (event, dataArgs, componentArgs) => {
                    console.log("ComponentSelectOptionSimple [fn_onSelectChange]", dataArgs, componentArgs);
                },
                fn_onSelectSearch: (event, dataArgs, componentArgs) => {
                    console.log("ComponentSelectOptionSimple [fn_onSelectSearch]", dataArgs, componentArgs);
                },
                fn_onSelectOpen: (event, dataArgs, componentArgs) => {
                    console.log("ComponentSelectOptionSimple [fn_onSelectOpen]", dataArgs, componentArgs);
                },
                fn_onSelectClose: (event, dataArgs, componentArgs) => {
                    console.log("ComponentSelectOptionSimple [fn_onSelectClose]", dataArgs, componentArgs);
                },
            }
        ).getElement();
    }
}


export class ComponentSelectCustomSimple extends ComponentSelectCustomSimpleBase {

    private _ELEMENT_IS_OPEN = new Observable(false);
    private _TEXT_SEARCHED = new Observable("");

    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentSelectCustomSimplePropsType,
        methods: ComponentSelectCustomSimpleMethodsType,
        events = null
    ) {
        super("select-custom-simple", null);
        super.renderComponent(config, methods, events);
    }


    /* ---------------------------------------------
        TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentSelectCustomSimpleConfigs.schemas.FORM.name)
    }


    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentSelectCustomSimpleConfigs.schemas.FORM.name:
                return this.template_render_form(attrsDefault, data, extra);
            case ComponentSelectCustomSimpleConfigs.schemas.FORM_VALUE.name:
                return this.template_render_form_value(attrsDefault, data, extra);
            case ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT.name:
                return this.template_render_form_select(attrsDefault, data, extra);
            case ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_HEADER.name:
                return this.template_render_form_select_header(attrsDefault, data, extra);
            case ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_HEADER_TEXT.name:
                return this.template_render_form_select_header_text(attrsDefault, data, extra);
            case ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_HEADER_ICON_ARROW.name:
                return this.template_render_form_select_header_iconArrow(attrsDefault, data, extra);
            case ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_BODY.name:
                return this.template_render_form_select_body(attrsDefault, data, extra);
            case ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_BODY_SEARCH.name: 
                return this.template_render_form_select_body_search(attrsDefault, data, extra);
            case ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_BODY_OPTIONS.name: 
                return this.template_render_form_select_body_options(attrsDefault, data, extra);
            case ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_BODY_OPTIONS_ITEM.name: 
                return this.template_render_form_select_body_options_item(attrsDefault, data, extra);
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }



    // ---------------------------------------------
    private template_render_form(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                className: [],
                children: [
                    this.executeSchemaPart(ComponentSelectCustomSimpleConfigs.schemas.FORM_VALUE.name),
                    this.executeSchemaPart(ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT.name),
                    //this.executeSchemaPart(ComponentInputSimpleConfigs.schemas.VALIDATE.name),
                ],
            });

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }



    // ---------------------------------------------
    private template_render_form_value(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {

            const prop_selectName = data[ComponentSelectCustomSimpleConfigs.keys.prop_selectName.name];
            const prop_selectDisable = data[ComponentSelectCustomSimpleConfigs.keys.prop_selectDisable.name];
            const prop_selectValue = data[ComponentSelectCustomSimpleConfigs.keys.prop_selectValue.name];

            return Observable.conditionWhen(
                prop_selectDisable,
                isDisable => !isDisable,
                () => {
                    return ReactiveElement.input(
                        {
                            attrs: {
                                ...attrsDefault,
                                type: "hidden",
                            },
                            attrsBind: {
                                name: prop_selectName,
                                value: prop_selectValue,
                            }
                        });
                },
                () => GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault),
                this.getScope()
            ).get()

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }



    // ---------------------------------------------
    private template_render_form_select(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {


            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                className: [
                    "d-block"
                ],
                stylesBind: {
                    height: Observable.computed(
                        (sizeName) => {
                            return SizeCalc(
                                ToolsComponents_BorderWidth?.[sizeName],
                                OPERATION.ADD,
                                ToolsComponents_Padding?.[sizeName],
                                OPERATION.ADD,
                                ToolsComponents_Height?.[sizeName],
                                OPERATION.ADD,
                                ToolsComponents_Padding?.[sizeName],
                                OPERATION.ADD,
                                ToolsComponents_BorderWidth?.[sizeName],
                            )
                        },
                        [
                            AppConfig.get_sizeName()
                        ],
                        this.getScope()
                    )
                },
                children: [

                    new TOOLS.COMPONENT.POSITION.component.ComponentPositionMenu(
                        <ComponentPositionMenuPropsType>{
                            classList: ["position-relative"],
                            prop_floatClass: ["p-0"] ,
                            styles: {},

                            prop_menuIsOpen:         this._ELEMENT_IS_OPEN ,
                            prop_menuBodyWidth:      SizeUnit(100, UNITS.PERCENT),

                            prop_menuBtnAcceptHas:   false ,
                            prop_menuBtnRejectHas:   false ,


                            prop_menuSelector: this.executeSchemaPart(ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_HEADER.name),
                            prop_menuBody:     this.executeSchemaPart(ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_BODY.name)

                        },
                        <ComponentPositionMenuMethodsType>{
                            fn_onClickOpen: function (event, dataArgs: ComponentPositionMenu_Methods_CLICK_OPEN_DataArgs, componentArgs: ComponentPositionMenu_Methods_CLICK_OPEN_ComponentArgs) {
                                //console.log("position open")
                            },
                            fn_onClickAccept: function (event, dataArgs: ComponentPositionMenu_Methods_CLICK_ACCEPT_DataArgs, componentArgs: ComponentPositionMenu_Methods_CLICK_ACCEPT_ComponentArgs) {
                                // console.log("position accept")
                                //return true;
                            },
                            fn_onClickReject: function (event, dataArgs: ComponentPositionMenu_Methods_CLICK_REJECT_DataArgs, componentArgs: ComponentPositionMenu_Methods_CLICK_REJECT_ComponentArgs) {
                                // console.log("position reject")
                            }
                        }
                    ).getElement() ,

                ],
            });

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }



    // ---------------------------------------------
    private template_render_form_select_header(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {

            const prop_selectDisable =                    data[ComponentSelectCustomSimpleConfigs.keys.prop_selectDisable.name];
            const prop_selectClass =                      data[ComponentSelectCustomSimpleConfigs.keys.prop_selectClass.name];
            const prop_selectStyles =                     data[ComponentSelectCustomSimpleConfigs.keys.prop_selectStyles.name];

            const prop_selectBorderTopLeftRadiusHas =     data[ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderTopLeftRadiusHas.name];
            const prop_selectBorderTopRightRadiusHas =    data[ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderTopRightRadiusHas.name];
            const prop_selectBorderBottomLeftRadiusHas =  data[ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderBottomLeftRadiusHas.name];
            const prop_selectBorderBottomRightRadiusHas = data[ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderBottomRightRadiusHas.name];

            const prop_selectBorderTopHas =               data[ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderTopHas.name];
            const prop_selectBorderRightHas =             data[ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderRightHas.name];
            const prop_selectBorderBottomHas =            data[ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderBottomHas.name];
            const prop_selectBorderLeftHas =              data[ComponentSelectCustomSimpleConfigs.keys.prop_selectBorderLeftHas.name];

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                className: [
                    "d-block"
                ],
                children: [

                    new ComponentBorder(
                        <ComponentBorderPropsType>{
                            classList: [ "d-block"]  ,
                            prop_borderClass: ["position-relative"  , "h-100"] ,

                            prop_borderTopLeftRadiusHas :            prop_selectBorderTopLeftRadiusHas ,
                            prop_borderTopRightRadiusHas :           prop_selectBorderTopRightRadiusHas ,
                            prop_borderBottomLeftRadiusHas :         prop_selectBorderBottomLeftRadiusHas ,
                            prop_borderBottomRightRadiusHas :        prop_selectBorderBottomRightRadiusHas ,

                            prop_borderTopHas :                      prop_selectBorderTopHas ,
                            prop_borderRightHas :                    prop_selectBorderRightHas ,
                            prop_borderBottomHas :                   prop_selectBorderBottomHas ,
                            prop_borderLeftHas :                     prop_selectBorderLeftHas ,

                            prop_borderColor_hover:                  Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1) ,
                            prop_contentBackgroundColor: Observable.computed(
                                (selectDisable) => {
                                    if (selectDisable) {
                                        return Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_5)
                                    }
                                    return Color(COLORS_MAIN.SHAN, COLORS_GRAD.GRADE_1)
                                },
                                [
                                    prop_selectDisable
                                ],
                                this.getScope()
                            ),

                            prop_content: [
                                this.executeSchemaPart(ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_HEADER_ICON_ARROW.name),
                                this.executeSchemaPart(ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_HEADER_TEXT.name),
                            ],

                            prop_borderColor: Observable.computed(
                                (isOpen) => {
                                    if (isOpen){
                                        return StyleValue.important( Color(COLORS_MAIN.SECONDARY, COLORS_GRAD.GRADE_1));
                                    }
                                    else {
                                        return StyleValue.important( Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1))
                                    }
                                } ,
                                [
                                    this._ELEMENT_IS_OPEN
                                ] ,
                                this.getScope()
                            ) ,

                        },
                        <ComponentBorderMethodsType>{
                            fn_onClickBorder: function (event: Event, dataArgs:ComponentBorder_Methods_CLICK_BORDER_DataArgs, componentArgs:ComponentBorder_Methods_CLICK_BORDER_ComponentArgs) {
                                event.preventDefault()
                                const isDisable = this.get(ComponentSelectCustomSimpleConfigs.keys.prop_selectDisable.name);
                                if (!isDisable) {
                                    const isOpen = this._ELEMENT_IS_OPEN.get();
                                    this._ELEMENT_IS_OPEN.set(!isOpen);
                                }
                            }.bind(this)
                        }
                    ).getReactiveElement() ,

                    //this.executeSchemaPart(ComponentInputSimpleConfigs.schemas.VALIDATE.name),
                ],
            });


            /*this._ELEMENT_SELECT = ReactiveElement.section({
                attrs: {
                    ...attrsDefault,
                },
                attrsBind: {
                    value: prop_selectValue,
                },
                className: [
                    "d-block",
                    "position-relative"
                ],
                classBind: [
                    prop_selectClass,
                ],
                styles: {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    outline: "none",
                    boxShadow: "none",
                    cursor: "pointer"
                },
                children: [
                    this.executeSchemaPart(ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_HEADER_ICON_ARROW.name),
                    this.executeSchemaPart(ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_HEADER_TEXT.name),
                ],
                stylesBind: (el) => ({
                    prop_selectStyles,

                    backgroundColor: Observable.computed(
                        (selectDisable) => {
                            if (selectDisable) {
                                return Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_5)
                            }
                            return Color(COLORS_MAIN.SHAN, COLORS_GRAD.GRADE_1)
                        },
                        [
                            prop_selectDisable
                        ],
                        this.getScope()
                    ),

                    borderTopWidth: Observable.computed(
                        (sizeName: string, selectBorderTopHas: boolean) => {
                            if (selectBorderTopHas) {
                                return StyleValue.important(ToolsComponents_BorderWidth?.[sizeName])
                            }
                            return StyleValue.important(SizeUnit(0, UNITS.PEXEL));
                        },
                        [
                            AppConfig.get_sizeName(),
                            prop_selectBorderTopHas
                        ],
                        this.getScope()
                    ),

                    borderRightWidth: Observable.computed(
                        (sizeName: string, selectBorderRightHas: boolean) => {
                            if (selectBorderRightHas) {
                                return StyleValue.important(ToolsComponents_BorderWidth?.[sizeName])
                            }
                            return StyleValue.important(SizeUnit(0, UNITS.PEXEL));
                        },
                        [
                            AppConfig.get_sizeName(),
                            prop_selectBorderRightHas
                        ],
                        this.getScope()
                    ),

                    borderBottomWidth: Observable.computed(
                        (sizeName: string, selectBorderBottomHas: boolean) => {
                            if (selectBorderBottomHas) {
                                return StyleValue.important(ToolsComponents_BorderWidth?.[sizeName])
                            }
                            return StyleValue.important(SizeUnit(0, UNITS.PEXEL));
                        },
                        [
                            AppConfig.get_sizeName(),
                            prop_selectBorderBottomHas
                        ],
                        this.getScope()
                    ),

                    borderLeftWidth: Observable.computed(
                        (sizeName: string, selectBorderLeftHas: boolean) => {
                            if (selectBorderLeftHas) {
                                return StyleValue.important(ToolsComponents_BorderWidth?.[sizeName])
                            }
                            return StyleValue.important(SizeUnit(0, UNITS.PEXEL));
                        },
                        [
                            AppConfig.get_sizeName(),
                            prop_selectBorderLeftHas
                        ],
                        this.getScope()
                    ),



                    borderTopRightRadius: Observable.computed(
                        (sizeName, selectBorderTopLeftRadiusHas) => {
                            if (selectBorderTopLeftRadiusHas) {
                                return ToolsComponents_BorderRadius?.[sizeName]
                            }
                            return SizeUnit(0, UNITS.PEXEL);
                        },
                        [
                            AppConfig.get_sizeName(),
                            prop_selectBorderTopLeftRadiusHas
                        ],
                        this.getScope()
                    ),

                    borderBottomRightRadius: Observable.computed(
                        (sizeName, selectBorderTopRightRadiusHas) => {
                            if (selectBorderTopRightRadiusHas) {
                                return ToolsComponents_BorderRadius?.[sizeName]
                            }
                            return SizeUnit(0, UNITS.PEXEL);
                        },
                        [
                            AppConfig.get_sizeName(),
                            prop_selectBorderTopRightRadiusHas
                        ],
                        this.getScope()
                    ),

                    borderTopLeftRadius: Observable.computed(
                        (sizeName, selectBorderBottomLeftRadiusHas) => {
                            if (selectBorderBottomLeftRadiusHas) {
                                return ToolsComponents_BorderRadius?.[sizeName]
                            }
                            return SizeUnit(0, UNITS.PEXEL);
                        },
                        [
                            AppConfig.get_sizeName(),
                            prop_selectBorderBottomLeftRadiusHas
                        ],
                        this.getScope()
                    ),

                    borderBottomLeftRadius: Observable.computed(
                        (sizeName, selectBorderBottomRightRadiusHas) => {
                            if (selectBorderBottomRightRadiusHas) {
                                return ToolsComponents_BorderRadius?.[sizeName]
                            }
                            return SizeUnit(0, UNITS.PEXEL);
                        },
                        [
                            AppConfig.get_sizeName(),
                            prop_selectBorderBottomRightRadiusHas
                        ],
                        this.getScope()
                    ),

                    borderColor: el.focus.mapList({
                        true: StyleValue.important(Color(COLORS_MAIN.SECONDARY, COLORS_GRAD.GRADE_1)),
                        false: StyleValue.important(Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1)),
                    }),

                    direction: Observable.computed(
                        (dir) => {
                            return dir ? "rtl" : "ltr";
                        },
                        [
                            AppConfig.get_directionRtl()
                        ],
                        this.getScope()
                    ),

                    float: Observable.computed(
                        (dir) => {
                            return dir ? "right" : "left";
                        },
                        [
                            AppConfig.get_directionRtl()
                        ],
                        this.getScope()
                    ),

                    lineHeight: Observable.computed(
                        (sizeName) => {
                            return ToolsComponents_Height?.[sizeName];
                        },
                        [
                            AppConfig.get_sizeName()
                        ],
                        this.getScope()
                    ),

                    fontSize: Observable.computed(
                        (sizeName) => {
                            return ToolsComponents_FontSize?.[sizeName];
                        },
                        [
                            AppConfig.get_sizeName()
                        ],
                        this.getScope()
                    ),

                    paddingTop: Observable.computed(
                        (sizeName) => {
                            return ToolsComponents_Padding?.[sizeName];
                        },
                        [
                            AppConfig.get_sizeName()
                        ],
                        this.getScope()
                    ),

                    paddingBottom: Observable.computed(
                        (sizeName) => {
                            return ToolsComponents_Padding?.[sizeName];
                        },
                        [
                            AppConfig.get_sizeName()
                        ],
                        this.getScope()
                    ),

                }),
                on: {
                    click: (event: Event) => {
                        const isDisable = this.get(ComponentSelectCustomSimpleConfigs.keys.prop_selectDisable.name);
                        if (isDisable) {
                            const isOpen = this._ELEMENT_IS_OPEN.get();
                            this._ELEMENT_IS_OPEN.set(!isOpen);
                        }
                    },
                }
            });

            return this._ELEMENT_SELECT;*/

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }



    // ---------------------------------------------
    private template_render_form_select_header_text(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {

            const prop_selectValue =        data[ComponentSelectCustomSimpleConfigs.keys.prop_selectValue.name];
            const prop_selectPlaceholder =  data[ComponentSelectCustomSimpleConfigs.keys.prop_selectPlaceholder.name];
            const prop_selectOptions =      data[ComponentSelectCustomSimpleConfigs.keys.prop_selectOptions.name];
            const prop_selectTypeShow =     data[ComponentSelectCustomSimpleConfigs.keys.prop_selectTypeShow.name];

            

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                className: [] ,
                stylesBind: {
                    height: Observable.computed(
                        (sizeName) => {
                            return SizeCalc(
                                ToolsComponents_Padding?.[sizeName] ,
                                OPERATION.ADD ,
                                ToolsComponents_Height?.[sizeName] ,
                                OPERATION.ADD ,
                                ToolsComponents_Padding?.[sizeName] ,
                            )
                        } ,
                        [
                            AppConfig.get_sizeName()
                        ] ,
                        this.getScope()
                    ) ,


                    direction: Observable.computed(
                        (dir)=> {
                            return dir ? "rtl" : "ltr";
                        },
                        [
                            AppConfig.get_directionRtl()
                        ] ,
                        this.getScope()
                    )  ,

                    lineHeight: Observable.computed(
                        (sizeName)=> {
                            return ToolsComponents_Height?.[sizeName];
                        },
                        [
                            AppConfig.get_sizeName()
                        ] ,
                        this.getScope()
                    )  ,

                    fontSize: Observable.computed(
                        (sizeName)=> {
                            return ToolsComponents_FontSize?.[sizeName];
                        },
                        [
                            AppConfig.get_sizeName()
                        ] ,
                        this.getScope()
                    )  ,

                    paddingTop: Observable.computed(
                        (sizeName)=> {
                            return ToolsComponents_Padding?.[sizeName];
                        },
                        [
                            AppConfig.get_sizeName()
                        ] ,
                        this.getScope()
                    )  ,

                    paddingBottom: Observable.computed(
                        (sizeName)=> {
                            return ToolsComponents_Padding?.[sizeName];
                        },
                        [
                            AppConfig.get_sizeName()
                        ] ,
                        this.getScope()
                    )  ,



                    paddingLeft: Observable.computed(
                        (sizeName)=> {
                            return ToolsComponents_Padding?.[sizeName];
                        },
                        [
                            AppConfig.get_sizeName()
                        ] ,
                        this.getScope()
                    )  ,
                    paddingRight: Observable.computed(
                        (sizeName)=> {
                            return ToolsComponents_Padding?.[sizeName];
                        },
                        [
                            AppConfig.get_sizeName()
                        ] ,
                        this.getScope()
                    )  ,
                } ,
                children: [
                    Observable.computed(
                        (selectValue, selectPlaceholder, selectOptions , selectTypeShow) => {
                            if (selectValue != null && selectOptions != null && Array.isArray(selectOptions)) {
                                for (let i = 0; i < selectOptions.length; i++) {
                                    const item: ComponentSelectCustomSimple_selectOptions = selectOptions[i];
                                    if (item != null && item.id == selectValue) {

                                        const elementPrefix = ReactiveElement.span({
                                                           styles: {
                                                               float: "left"
                                                           } ,
                                                           stylesBind: {
                                                              
                                                           } ,
                                                           children: [
                                                               item.prefix ?? ""
                                                           ],
                                                       });

                                        const elementBetween = ReactiveElement.span({
                                                           styles: {
                                                               float: "left"
                                                           } ,
                                                           stylesBind: {
                                                              marginLeft: Observable.computed(
                                                                (sizeName) => {
                                                                    return ToolsComponents_Margin?.[sizeName]
                                                                } ,
                                                                [
                                                                    AppConfig.get_sizeName()
                                                                ] ,
                                                                this.getScope()
                                                              ) ,
                                                              
                                                              marginRight: Observable.computed(
                                                                (sizeName) => {
                                                                    return ToolsComponents_Margin?.[sizeName]
                                                                } ,
                                                                [
                                                                    AppConfig.get_sizeName()
                                                                ] ,
                                                                this.getScope()
                                                              )
                                                           } ,
                                                           children: [
                                                               "|"
                                                           ],
                                                       });

                                        const elementName = ReactiveElement.b({
                                                           styles: {
                                                               float: "left"
                                                           } ,
                                                           stylesBind: {
                                                               
                                                           } ,
                                                           children: [
                                                               item.name ?? "---"
                                                           ],
                                                       });

                                        let content = [];
                                        switch(selectTypeShow) {
                                            case ComponentSelectCustomSimple_selectTypeShow.JUST_PREFIX :
                                                content = [elementPrefix]
                                                break;
                                            case ComponentSelectCustomSimple_selectTypeShow.JUST_NAME :
                                                content = [elementName]
                                                break;
                                            case ComponentSelectCustomSimple_selectTypeShow.BOTH :
                                                content = [elementPrefix , elementBetween , elementName]
                                                break;
                                        }

                                        return ReactiveElement.div({
                                                   children: content
                                                }) 
                                    }
                                }
                            }
                            return selectPlaceholder
                        },
                        [
                            prop_selectValue,
                            prop_selectPlaceholder,
                            prop_selectOptions ,
                            prop_selectTypeShow
                        ],
                        this.getScope()
                    )
                ]
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }



    // ---------------------------------------------
    private template_render_form_select_header_iconArrow(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: [
                    new ComponentElementPosition(
                        <ComponentElementPositionPropsType>{
                            classList: [],
                            prop_positionType: ComponentElementPosition_positionTypes.ABSOLUTE,
                            prop_positionTop: SizeUnit(50, UNITS.PERCENT),
                            prop_positionEnd: SizeUnit(0, UNITS.PERCENT),
                            prop_positionWidth: Observable.computed(
                                (sizeName) => {
                                    return SizeCalc(
                                        ToolsComponents_BorderWidth?.[sizeName],
                                        OPERATION.ADD,
                                        ToolsComponents_Padding?.[sizeName],
                                        OPERATION.ADD,
                                        ToolsComponents_Height?.[sizeName],
                                        OPERATION.ADD,
                                        ToolsComponents_Padding?.[sizeName],
                                        OPERATION.ADD,
                                        ToolsComponents_BorderWidth?.[sizeName],
                                    )
                                },
                                [
                                    AppConfig.get_sizeName()
                                ],
                                this.getScope()
                            ),
                            prop_positionHeight: Observable.computed(
                                (sizeName) => {
                                    return SizeCalc(
                                        ToolsComponents_BorderWidth?.[sizeName],
                                        OPERATION.ADD,
                                        ToolsComponents_Padding?.[sizeName],
                                        OPERATION.ADD,
                                        ToolsComponents_Height?.[sizeName],
                                        OPERATION.ADD,
                                        ToolsComponents_Padding?.[sizeName],
                                        OPERATION.ADD,
                                        ToolsComponents_BorderWidth?.[sizeName],
                                    )
                                },
                                [
                                    AppConfig.get_sizeName()
                                ],
                                this.getScope()
                            ),
                            prop_positionTranslate: TranslateUnit(SizeUnit(0, UNITS.PERCENT), SizeUnit(-50, UNITS.PERCENT)),
                            prop_positionZIndex: 10,
                            prop_content: new ToolsComponents.ComponentIcon(
                                <ComponentIconPropsType>{
                                    classList: [],
                                    prop_iconStyles: Observable.computed(
                                        (sizeName) => {
                                            return {
                                                cursor: "pointer",
                                                lineHeight: SizeCalc(
                                                    ToolsComponents_BorderWidth?.[sizeName],
                                                    OPERATION.ADD,
                                                    ToolsComponents_Padding?.[sizeName],
                                                    OPERATION.ADD,
                                                    ToolsComponents_Height?.[sizeName],
                                                    OPERATION.ADD,
                                                    ToolsComponents_Padding?.[sizeName],
                                                    OPERATION.ADD,
                                                    ToolsComponents_BorderWidth?.[sizeName],
                                                )
                                            }
                                        },
                                        [
                                            AppConfig.get_sizeName()
                                        ],
                                        this.getScope()
                                    ),
                                    prop_iconClass: ["d-block", "text-center"],
                                    prop_icon: Observable.computed(
                                        (selectIsOpen) => {
                                            if (selectIsOpen) {
                                                return ToolsIcons.icon_arrow_up();
                                            }
                                            else {
                                                return ToolsIcons.icon_arrow_down();
                                            }
                                        },
                                        [
                                            this._ELEMENT_IS_OPEN
                                        ],
                                        this.getScope()
                                    ),
                                },
                                <ComponentIconMethodsType>{
                                    fn_onClickIcon: (event, dataArgs, componentArgs) => {
                                        //this.fn_onChangeValue(event ,null , true);
                                    }
                                }
                            ).getReactiveElement(),
                        },
                        <ComponentElementPositionMethodsType>{}
                    ).getReactiveElement()
                ],
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }



    // ---------------------------------------------
    private template_render_form_select_body(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                className: [],
                stylesBind: {

                },
                children: [
                    this.executeSchemaPart(ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_BODY_SEARCH.name),
                    this.executeSchemaPart(ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_BODY_OPTIONS.name),
                ],
            });

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }



    
    // ---------------------------------------------
    private template_render_form_select_body_search(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {

            return new TOOLS.COMPONENT.SIMPLE.components.ComponentInputSimple(
                        <ComponentInputSimplePropsType>{
                            classList: ["d-block" ],
                            styles: Observable.computed(
                                (sizeName)=> {
                                    return {
                                        marginTop : ToolsComponents_Margin?.[sizeName]
                                    }
                                },
                                [
                                    AppConfig.get_sizeName() 
                                ] ,
                                this.getScope()
                            ),
                            prop_inputType:               ComponentInputSimple_Types.STRING,
                            //prop_inputPlaceholder:        "Enter text...",
                            prop_inputValue:              this._TEXT_SEARCHED,
                        },
                        <ComponentInputSimpleMethodsType>{
                            fn_onInputChange: (event, dataArgs, componentArgs) => {
                                console.log("ComponentInputSimple [fn_onInputChange]", dataArgs, componentArgs);
                            },
                            fn_onInputFocus: (event, dataArgs, componentArgs) => {
                                console.log("ComponentInputSimple [fn_onInputFocus]", dataArgs, componentArgs);
                            },
                            fn_onInputBlur: (event, dataArgs, componentArgs) => {
                                console.log("ComponentInputSimple [fn_onInputBlur]", dataArgs, componentArgs);
                            },
                        }
                    ).getReactiveElement();

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }



    // ---------------------------------------------
    private template_render_form_select_body_options(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {

            const prop_selectOptions = data[ComponentSelectCustomSimpleConfigs.keys.prop_selectOptions.name];

            return new TOOLS.COMPONENT.CONTENT.components.ComponentRecyclerView(
                        <ComponentRecyclerViewPropsType>{
            
                            classList: ["d-block"]  ,
                            styles: Observable.computed(
                                (sizeName) => {
                                    return {
                                        marginTop: ToolsComponents_Margin?.[sizeName]
                                    }
                                } ,
                                [
                                    AppConfig.get_sizeName()
                                ] ,
                                this.getScope()
                            ) ,
            
                            prop_formClass: [],
                            prop_formStyles: {},

                            prop_formDirection: ComponentRecyclerView_DirectionTypes.VERTICAL ,
                            
                            
                            prop_formComponents: Observable.for(
                                prop_selectOptions ,
                                (item , index , context) => {
                                    if (context != null && context.hasOwnProperty("search") && (context.search == null || item.name.includes(context.search) || item.prefix.includes(context.search))){
                                        return  this.executeSchemaPart(
                                            ComponentSelectCustomSimpleConfigs.schemas.FORM_SELECT_BODY_OPTIONS_ITEM.name ,
                                            {option : item}
                                        )
                                    } 
                                    return null;
                                } ,
                                {
                                    search: this._TEXT_SEARCHED
                                } ,
                                this.getScope()
                            )

                        } ,
                        <ComponentRecyclerViewMethodsType>{
            
                        }
                    ).getReactiveElement();

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }



    // ---------------------------------------------
    private template_render_form_select_body_options_item(attrsDefault, data, extra): ReactiveElement {

        if (data != null) {
            const prop_selectValue =   data[ComponentSelectCustomSimpleConfigs.keys.prop_selectValue.name];

            if(extra != null && extra.hasOwnProperty("option")){
                const option:ComponentSelectCustomSimple_selectOptions = extra.option;

                return new ComponentBorder(
                            <ComponentBorderPropsType>{
                                classList: []  ,
                                styles: Observable.computed(
                                    (sizeName) => {
                                        return {
                                            marginTop: ToolsComponents_Margin?.[sizeName] ,
                                            lineHeight: SizeCalc(
                                                ToolsComponents_BorderWidth?.[sizeName],
                                                OPERATION.ADD,
                                                ToolsComponents_Padding?.[sizeName],
                                                OPERATION.ADD,
                                                ToolsComponents_Height?.[sizeName],
                                                OPERATION.ADD,
                                                ToolsComponents_Padding?.[sizeName],
                                                OPERATION.ADD,
                                                ToolsComponents_BorderWidth?.[sizeName],
                                            )
                                        }
                                    } ,
                                    [
                                        AppConfig.get_sizeName()
                                    ] ,
                                    this.getScope()
                                )  ,

                                prop_content:                        ReactiveElement.div({
                                    children: [
                                        
                                        ReactiveElement.span({
                                            styles: {
                                                width: SizeUnit( 40 , UNITS.PEXEL) ,
                                                float: "left"
                                            } ,
                                            stylesBind: {
                                               
                                            } ,
                                            children: [
                                                option.prefix ?? ""
                                            ],
                                        }),

                                        ReactiveElement.b({
                                            styles: {
                                                width: SizeCalc(
                                                    SizeUnit( 100 , UNITS.PERCENT) ,
                                                    OPERATION.MINUS ,
                                                    SizeUnit( 40 , UNITS.PEXEL)
                                                ),
                                                float: "left"
                                            } ,
                                            stylesBind: {
                                                
                                            } ,
                                            children: [
                                                option.name ?? "---"
                                            ],
                                        })
                                    ],
                                }) ,

                                prop_borderTopHas:                  false,
                                prop_borderLeftHas:                 false ,
                                prop_borderRightHas:                false ,
                                prop_borderBottomHas:               false ,

                                prop_contentBackgroundColor:         Observable.computed(
                                   (selectValue) => {
                                        if(selectValue != null && option != null && option.id == selectValue){
                                            return Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1)
                                        }
                                        return Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1)
                                    } ,
                                    [
                                        prop_selectValue
                                    ] ,
                                    this.getScope()
                                )  ,
                                
                                prop_contentColor:         Observable.computed(
                                   (selectValue) => {
                                        if(selectValue != null && option != null && option.id == selectValue){
                                            return Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1)
                                        }
                                        return Color(COLORS_MAIN.DARK , COLORS_GRAD.GRADE_1)
                                    } ,
                                    [
                                        prop_selectValue
                                    ] ,
                                    this.getScope()
                                )  ,

                                prop_contentBackgroundColor_hover:   Color(COLORS_MAIN.WARNING , COLORS_GRAD.GRADE_4) ,
                                prop_contentColor_hover:             Color(COLORS_MAIN.WARNING , COLORS_GRAD.GRADE_1) ,
                            },
                            <ComponentBorderMethodsType>{
                                fn_onClickBorder: function (event, dataArgs:ComponentBorder_Methods_CLICK_BORDER_DataArgs, componentArgs:ComponentBorder_Methods_CLICK_BORDER_ComponentArgs) {
                                    this.set(ComponentSelectCustomSimpleConfigs.keys.prop_selectValue.name , option?.id ?? null);
                                    this._ELEMENT_IS_OPEN.set(false)
                                }.bind(this)
                            }
                        ).getReactiveElement();
                
            }

            

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }
    

    

    // ---------------------------------------------




}

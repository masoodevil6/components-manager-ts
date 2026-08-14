
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
import {ReactiveElement} from "../../../core/ReactiveElement";
import {Observable} from "../../../core/Observable";
import {ComponentCallBackType} from "../../../core/ComponentBase";
import {Language} from "../../../core/Language";
import {AppConfig} from "../../../core/AppConfig";
import {
    Color,
    COLORS_GRAD,
    COLORS_MAIN,
    IconsType,
    SIZES, SizesType, SizeUnit, UNITS,
    ToolsComponents_BorderRadius,
    ToolsComponents_BorderWidth, ToolsComponents_Padding, SizeCalc, OPERATION, ToolsComponents_Height,
    ToolsComponents_IconSize, StyleValue, ToolsComponents_FontSize
} from "../../../utils/ToolsConsts";
import {
    GOG_ComponentBasicConfigs_Component_keys,
    GOG_ComponentBasicConfigs_Component_parts,
    GOG_ComponentBasicConfigs_Component_Pattern,
    GOG_ComponentBasicConfigs_Component_Schema, GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys,
    GOG_ComponentBasicConfigs_Component_Structure_keys,
    GOG_ComponentBasicConfigs_Component_Structure_parts,
    GOG_ComponentBasicConfigs_Component_Structure_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_Schema,
    GOG_ComponentBasicConfigs_partDoseNotBody,
    GOG_ComponentBasicProps_Component,
    GOG_ComponentBasicProps_Component_Structure,
} from "../../../core/component/SetupComponent";
import {
    ComponentIconMethodsType,
    ComponentIconPropsType
} from "../ComponentIcon";
import {
    ComponentElementPosition,
    ComponentElementPositionMethodsType,
    ComponentElementPositionPropsType,
    ComponentElementPosition_positionTypes
} from "../ComponentElementPosition";
import {TranslateUnit} from "../../../utils/ToolsConsts";
import {
    ComponentBorder, ComponentBorder_Methods_CLICK_BORDER_ComponentArgs,
    ComponentBorder_Methods_CLICK_BORDER_DataArgs, ComponentBorderMethodsType, ComponentBorderPropsType
} from "../ComponentBorder";



export const ComponentInputSimpleProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    ///----------------------
    prop_inputName:                           "prop_inputName",
    prop_inputDisable:                        "prop_inputDisable",
    prop_inputValue:                          "prop_inputValue",
    prop_inputClass:                          "prop_inputClass",
    prop_inputStyles:                         "prop_inputStyles",
    prop_inputType:                           "prop_inputType",
    prop_inputPlaceholder:                    "prop_inputPlaceholder",
    prop_inputFor:                            "prop_inputFor",
    prop_inputBorderTopLeftRadiusHas:         "prop_inputBorderTopLeftRadiusHas" ,
    prop_inputBorderTopRightRadiusHas:        "prop_inputBorderTopRightRadiusHas" ,
    prop_inputBorderBottomLeftRadiusHas:      "prop_inputBorderBottomLeftRadiusHas" ,
    prop_inputBorderBottomRightRadiusHas:     "prop_inputBorderBottomRightRadiusHas" ,

    prop_inputBorderTopHas:                   "prop_inputBorderTopHas" ,
    prop_inputBorderRightHas:                 "prop_inputBorderRightHas" ,
    prop_inputBorderBottomHas:                "prop_inputBorderBottomHas" ,
    prop_inputBorderLeftHas:                  "prop_inputBorderLeftHas" ,
} as const;


//borderTopRightRadius
export enum ComponentInputSimple_Types {
    STRING         = "string",
    NUMBER         = "number",
    EMAIL          = "email",
    PASSWORD       = "password",
    TEL            = "tel",
    URL            = "url",
    SEARCH         = "search",
    DATE           = "date",
    TIME           = "time",
    DATETIME_LOCAL = "datetime-local",
}


const ComponentInputSimpleConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        ///----------------------
        [ComponentInputSimpleProps.prop_inputName]: {
            name:               ComponentInputSimpleProps.prop_inputName,
            value:              GOG_SetValue<string|null>(null),
        },
        [ComponentInputSimpleProps.prop_inputValue]: {
            name:               ComponentInputSimpleProps.prop_inputValue,
            value:              GOG_SetValue<string|null>(null),
        },
        [ComponentInputSimpleProps.prop_inputDisable]: {
            name:               ComponentInputSimpleProps.prop_inputDisable,
            value:              GOG_SetValue<boolean>(false),
        },
        [ComponentInputSimpleProps.prop_inputClass]: {
            name:               ComponentInputSimpleProps.prop_inputClass,
            value:              GOG_SetValue<string[]>(["form-control"]),
        },
        [ComponentInputSimpleProps.prop_inputStyles]: {
            name:               ComponentInputSimpleProps.prop_inputStyles,
            value:              GOG_SetValue<Record<string, string>>({}),
        },
        [ComponentInputSimpleProps.prop_inputType]: {
            name:               ComponentInputSimpleProps.prop_inputType,
            value:              GOG_SetValue<GOG_ValueOf<typeof ComponentInputSimple_Types>>(ComponentInputSimple_Types.STRING),
        },
        [ComponentInputSimpleProps.prop_inputPlaceholder]: {
            name:               ComponentInputSimpleProps.prop_inputPlaceholder,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentInputSimpleProps.prop_inputFor]: {
            name:               ComponentInputSimpleProps.prop_inputFor,
            value:              GOG_SetValue<string | null>(null),
        },

        [ComponentInputSimpleProps.prop_inputBorderTopLeftRadiusHas]: {
            name:               ComponentInputSimpleProps.prop_inputBorderTopLeftRadiusHas,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentInputSimpleProps.prop_inputBorderTopRightRadiusHas]: {
            name:               ComponentInputSimpleProps.prop_inputBorderTopRightRadiusHas,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentInputSimpleProps.prop_inputBorderBottomLeftRadiusHas]: {
            name:               ComponentInputSimpleProps.prop_inputBorderBottomLeftRadiusHas,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentInputSimpleProps.prop_inputBorderBottomRightRadiusHas]: {
            name:               ComponentInputSimpleProps.prop_inputBorderBottomRightRadiusHas,
            value:              GOG_SetValue<boolean>(true),
        },

        
        [ComponentInputSimpleProps.prop_inputBorderTopHas]: {
            name:               ComponentInputSimpleProps.prop_inputBorderTopHas,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentInputSimpleProps.prop_inputBorderRightHas]: {
            name:               ComponentInputSimpleProps.prop_inputBorderRightHas,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentInputSimpleProps.prop_inputBorderBottomHas]: {
            name:               ComponentInputSimpleProps.prop_inputBorderBottomHas,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentInputSimpleProps.prop_inputBorderLeftHas]: {
            name:               ComponentInputSimpleProps.prop_inputBorderLeftHas,
            value:              GOG_SetValue<boolean>(true),
        },

    },
    schemas: {
        ...GOG_ComponentBasicConfigs_Component_parts,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts,
        ///----------------------
        FORM: {
            name:               "part_form"
        },
        FORM_INPUT: {
            name:               "part_form_input"
        },
        FORM_ICON_CLEAR: {
            name:               "part_form_iconClear"
        },
    },
    templates: {

    },
    methods: {
        INPUT_CHANGE: {
            name:                      "fn_onInputChange",
            dataArgs: {
                VALUE: {
                    name:              "value",
                },
            },
            componentArgs: {}
        },
        INPUT_FOCUS: {
            name:                      "fn_onInputFocus",
            dataArgs: {
                VALUE: {
                    name:              "value",
                },
            },
            componentArgs: {}
        },
        INPUT_BLUR: {
            name:                      "fn_onInputBlur",
            dataArgs: {
                VALUE: {
                    name:              "value",
                },
            },
            componentArgs: {}
        },
    }
} as const;



export type ComponentInputSimplePropsType =                      GOG_ExtractNameValue<typeof ComponentInputSimpleConfigs.keys>
export type ComponentInputSimpleSchemaType =                     GOG_ExtractName<typeof ComponentInputSimpleConfigs.schemas>
export type ComponentInputSimpleTemplatesType =                  GOG_ExtractName<typeof ComponentInputSimpleConfigs.templates>

export type ComponentInputSimple_Methods_INPUT_CHANGE_ComponentArgs =  GOG_ExtractName<typeof ComponentInputSimpleConfigs.methods.INPUT_CHANGE.componentArgs>
export type ComponentInputSimple_Methods_INPUT_CHANGE_DataArgs =       GOG_ExtractNameValue<typeof ComponentInputSimpleConfigs.methods.INPUT_CHANGE.dataArgs>
export type ComponentInputSimple_Methods_INPUT_FOCUS_ComponentArgs =   GOG_ExtractName<typeof ComponentInputSimpleConfigs.methods.INPUT_FOCUS.componentArgs>
export type ComponentInputSimple_Methods_INPUT_FOCUS_DataArgs =        GOG_ExtractNameValue<typeof ComponentInputSimpleConfigs.methods.INPUT_FOCUS.dataArgs>
export type ComponentInputSimple_Methods_INPUT_BLUR_ComponentArgs =    GOG_ExtractName<typeof ComponentInputSimpleConfigs.methods.INPUT_BLUR.componentArgs>
export type ComponentInputSimple_Methods_INPUT_BLUR_DataArgs =         GOG_ExtractNameValue<typeof ComponentInputSimpleConfigs.methods.INPUT_BLUR.dataArgs>

export type ComponentInputSimpleMethodsType = {
    [ComponentInputSimpleConfigs.methods.INPUT_CHANGE.name]: ComponentCallBackType<ComponentInputSimple_Methods_INPUT_CHANGE_ComponentArgs, ComponentInputSimple_Methods_INPUT_CHANGE_DataArgs>,
    [ComponentInputSimpleConfigs.methods.INPUT_FOCUS.name]:  ComponentCallBackType<ComponentInputSimple_Methods_INPUT_FOCUS_ComponentArgs , ComponentInputSimple_Methods_INPUT_FOCUS_DataArgs>,
    [ComponentInputSimpleConfigs.methods.INPUT_BLUR.name]:   ComponentCallBackType<ComponentInputSimple_Methods_INPUT_BLUR_ComponentArgs  , ComponentInputSimple_Methods_INPUT_BLUR_DataArgs>,
}



export abstract class ComponentInputSimpleBase extends ComponentBase<
    ComponentInputSimplePropsType,
    ComponentInputSimpleSchemaType,
    ComponentInputSimpleTemplatesType,
    ComponentInputSimpleMethodsType
> {

    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN = defineComponentPatterns<ComponentInputSimplePropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this),
            ///----------------------
            [ComponentInputSimpleConfigs.keys.prop_inputName.name]: {
                prop:                                             ComponentInputSimpleConfigs.keys.prop_inputName.name,
                default:                                          ComponentInputSimpleConfigs.keys.prop_inputName.value,
                title:                                            Language.translate("components.input_simple.props.prop_inputName.title"),
                description:                                      Language.translate("components.input_simple.props.prop_inputName.description"),
            },
            [ComponentInputSimpleConfigs.keys.prop_inputDisable.name]: {
                prop:                                             ComponentInputSimpleConfigs.keys.prop_inputDisable.name,
                default:                                          ComponentInputSimpleConfigs.keys.prop_inputDisable.value,
                title:                                            Language.translate("components.input_simple.props.prop_inputDisable.title"),
                description:                                      Language.translate("components.input_simple.props.prop_inputDisable.description"),
            },
            [ComponentInputSimpleConfigs.keys.prop_inputValue.name]: {
                prop:                                             ComponentInputSimpleConfigs.keys.prop_inputValue.name,
                default:                                          ComponentInputSimpleConfigs.keys.prop_inputValue.value,
                title:                                            Language.translate("components.input_simple.props.prop_inputValue.title"),
                description:                                      Language.translate("components.input_simple.props.prop_inputValue.description"),
            },
            [ComponentInputSimpleConfigs.keys.prop_inputClass.name]: {
                prop:                                             ComponentInputSimpleConfigs.keys.prop_inputClass.name,
                default:                                          ComponentInputSimpleConfigs.keys.prop_inputClass.value,
                title:                                            Language.translate("components.input_simple.props.prop_inputClass.title"),
                description:                                      Language.translate("components.input_simple.props.prop_inputClass.description"),
            },
            [ComponentInputSimpleConfigs.keys.prop_inputStyles.name]: {
                prop:                                             ComponentInputSimpleConfigs.keys.prop_inputStyles.name,
                default:                                          ComponentInputSimpleConfigs.keys.prop_inputStyles.value,
                title:                                            Language.translate("components.input_simple.props.prop_inputStyles.title"),
                description:                                      Language.translate("components.input_simple.props.prop_inputStyles.description"),
            },
            [ComponentInputSimpleConfigs.keys.prop_inputType.name]: {
                prop:                                             ComponentInputSimpleConfigs.keys.prop_inputType.name,
                default:                                          ComponentInputSimpleConfigs.keys.prop_inputType.value,
                title:                                            Language.translate("components.input_simple.props.prop_inputType.title"),
                description:                                      Language.translate("components.input_simple.props.prop_inputType.description"),
            },
            [ComponentInputSimpleConfigs.keys.prop_inputPlaceholder.name]: {
                prop:                                             ComponentInputSimpleConfigs.keys.prop_inputPlaceholder.name,
                default:                                          ComponentInputSimpleConfigs.keys.prop_inputPlaceholder.value,
                title:                                            Language.translate("components.input_simple.props.prop_inputPlaceholder.title"),
                description:                                      Language.translate("components.input_simple.props.prop_inputPlaceholder.description"),
            },
            [ComponentInputSimpleConfigs.keys.prop_inputFor.name]: {
                prop:                                             ComponentInputSimpleConfigs.keys.prop_inputFor.name,
                default:                                          ComponentInputSimpleConfigs.keys.prop_inputFor.value,
                title:                                            Language.translate("components.input_simple.props.prop_inputFor.title"),
                description:                                      Language.translate("components.input_simple.props.prop_inputFor.description"),
            },


            [ComponentInputSimpleConfigs.keys.prop_inputBorderTopLeftRadiusHas.name]: {
                prop:                                             ComponentInputSimpleConfigs.keys.prop_inputBorderTopLeftRadiusHas.name,
                default:                                          ComponentInputSimpleConfigs.keys.prop_inputBorderTopLeftRadiusHas.value,
                title:                                            Language.translate("components.input_simple.props.prop_inputBorderTopLeftRadiusHas.title"),
                description:                                      Language.translate("components.input_simple.props.prop_inputBorderTopLeftRadiusHas.description"),
            },
            [ComponentInputSimpleConfigs.keys.prop_inputBorderTopRightRadiusHas.name]: {
                prop:                                             ComponentInputSimpleConfigs.keys.prop_inputBorderTopRightRadiusHas.name,
                default:                                          ComponentInputSimpleConfigs.keys.prop_inputBorderTopRightRadiusHas.value,
                title:                                            Language.translate("components.input_simple.props.prop_inputBorderTopRightRadiusHas.title"),
                description:                                      Language.translate("components.input_simple.props.prop_inputBorderTopRightRadiusHas.description"),
            },
            [ComponentInputSimpleConfigs.keys.prop_inputBorderBottomLeftRadiusHas.name]: {
                prop:                                             ComponentInputSimpleConfigs.keys.prop_inputBorderBottomLeftRadiusHas.name,
                default:                                          ComponentInputSimpleConfigs.keys.prop_inputBorderBottomLeftRadiusHas.value,
                title:                                            Language.translate("components.input_simple.props.prop_inputBorderBottomLeftRadiusHas.title"),
                description:                                      Language.translate("components.input_simple.props.prop_inputBorderBottomLeftRadiusHas.description"),
            }, 
            [ComponentInputSimpleConfigs.keys.prop_inputBorderBottomRightRadiusHas.name]: {
                prop:                                             ComponentInputSimpleConfigs.keys.prop_inputBorderBottomRightRadiusHas.name,
                default:                                          ComponentInputSimpleConfigs.keys.prop_inputBorderBottomRightRadiusHas.value,
                title:                                            Language.translate("components.input_simple.props.prop_inputBorderBottomRightRadiusHas.title"),
                description:                                      Language.translate("components.input_simple.props.prop_inputBorderBottomRightRadiusHas.description"),
            },


            [ComponentInputSimpleConfigs.keys.prop_inputBorderTopHas.name]: {
                prop:                                             ComponentInputSimpleConfigs.keys.prop_inputBorderTopHas.name,
                default:                                          ComponentInputSimpleConfigs.keys.prop_inputBorderTopHas.value,
                title:                                            Language.translate("components.input_simple.props.prop_inputBorderTopHas.title"),
                description:                                      Language.translate("components.input_simple.props.prop_inputBorderTopHas.description"),
            },
            [ComponentInputSimpleConfigs.keys.prop_inputBorderRightHas.name]: {
                prop:                                             ComponentInputSimpleConfigs.keys.prop_inputBorderRightHas.name,
                default:                                          ComponentInputSimpleConfigs.keys.prop_inputBorderRightHas.value,
                title:                                            Language.translate("components.input_simple.props.prop_inputBorderRightHas.title"),
                description:                                      Language.translate("components.input_simple.props.prop_inputBorderRightHas.description"),
            },
            [ComponentInputSimpleConfigs.keys.prop_inputBorderBottomHas.name]: {
                prop:                                             ComponentInputSimpleConfigs.keys.prop_inputBorderBottomHas.name,
                default:                                          ComponentInputSimpleConfigs.keys.prop_inputBorderBottomHas.value,
                title:                                            Language.translate("components.input_simple.props.prop_inputBorderBottomHas.title"),
                description:                                      Language.translate("components.input_simple.props.prop_inputBorderBottomHas.description"),
            },
            [ComponentInputSimpleConfigs.keys.prop_inputBorderLeftHas.name]: {
                prop:                                             ComponentInputSimpleConfigs.keys.prop_inputBorderLeftHas.name,
                default:                                          ComponentInputSimpleConfigs.keys.prop_inputBorderLeftHas.value,
                title:                                            Language.translate("components.input_simple.props.prop_inputBorderLeftHas.title"),
                description:                                      Language.translate("components.input_simple.props.prop_inputBorderLeftHas.description"),
            },


        }
    );


    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentInputSimpleSchemaType, ComponentInputSimplePropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this),
        ///----------------------
        FORM: {
            part:               ComponentInputSimpleConfigs.schemas.FORM.name,
            title:              Language.translate("components.input_simple.schema.form.title"),
            description:        Language.translate("components.input_simple.schema.form.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputSimpleConfigs.keys.prop_inputDisable.name],

                this._COMPONENT_PATTERN[ComponentInputSimpleConfigs.keys.prop_inputBorderTopLeftRadiusHas.name],
                this._COMPONENT_PATTERN[ComponentInputSimpleConfigs.keys.prop_inputBorderTopRightRadiusHas.name],
                this._COMPONENT_PATTERN[ComponentInputSimpleConfigs.keys.prop_inputBorderBottomLeftRadiusHas.name],
                this._COMPONENT_PATTERN[ComponentInputSimpleConfigs.keys.prop_inputBorderBottomRightRadiusHas.name],

                this._COMPONENT_PATTERN[ComponentInputSimpleConfigs.keys.prop_inputBorderTopHas.name],
                this._COMPONENT_PATTERN[ComponentInputSimpleConfigs.keys.prop_inputBorderRightHas.name],
                this._COMPONENT_PATTERN[ComponentInputSimpleConfigs.keys.prop_inputBorderBottomHas.name],
                this._COMPONENT_PATTERN[ComponentInputSimpleConfigs.keys.prop_inputBorderLeftHas.name],
            ]
        },
        FORM_INPUT: {
            part:               ComponentInputSimpleConfigs.schemas.FORM_INPUT.name,
            title:              Language.translate("components.input_simple.schema.form_input.title"),
            description:        Language.translate("components.input_simple.schema.form_input.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputSimpleConfigs.keys.prop_inputName.name],
                this._COMPONENT_PATTERN[ComponentInputSimpleConfigs.keys.prop_inputDisable.name],
                this._COMPONENT_PATTERN[ComponentInputSimpleConfigs.keys.prop_inputValue.name],
                this._COMPONENT_PATTERN[ComponentInputSimpleConfigs.keys.prop_inputClass.name],
                this._COMPONENT_PATTERN[ComponentInputSimpleConfigs.keys.prop_inputStyles.name],
                this._COMPONENT_PATTERN[ComponentInputSimpleConfigs.keys.prop_inputType.name],
                this._COMPONENT_PATTERN[ComponentInputSimpleConfigs.keys.prop_inputPlaceholder.name],
                this._COMPONENT_PATTERN[ComponentInputSimpleConfigs.keys.prop_inputFor.name],
            ]
        },
        FORM_ICON_CLEAR: {
            part:               ComponentInputSimpleConfigs.schemas.FORM_ICON_CLEAR.name,
            title:              Language.translate("components.input_simple.schema.form_iconClear.title"),
            description:        Language.translate("components.input_simple.schema.form_iconClear.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentInputSimpleConfigs.keys.prop_inputDisable.name],
            ]
        },
    });


    /* ---------------------------------------------
        PROPERTYs Templates
    --------------------------------------------- */
    _COMPONENT_TEMPLATES = defineComponentTemplate<ComponentInputSimpleTemplatesType, ComponentInputSimplePropsType>({

    });


    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentInputSimpleMethodsType, ComponentInputSimplePropsType>({
        [ComponentInputSimpleConfigs.methods.INPUT_CHANGE.name]: {
            title:                                            Language.translate("components.input_simple.methods.fn_onInputChange.title"),
            description:                                      Language.translate("components.input_simple.methods.fn_onInputChange.description"),
            args: {
                [ComponentInputSimpleConfigs.methods.INPUT_CHANGE.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[ComponentInputSimpleConfigs.keys.prop_inputValue.name],
            }
        },
        [ComponentInputSimpleConfigs.methods.INPUT_FOCUS.name]: {
            title:                                            Language.translate("components.input_simple.methods.fn_onInputFocus.title"),
            description:                                      Language.translate("components.input_simple.methods.fn_onInputFocus.description"),
            args: {
                [ComponentInputSimpleConfigs.methods.INPUT_CHANGE.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[ComponentInputSimpleConfigs.keys.prop_inputValue.name],
            }
        },
        [ComponentInputSimpleConfigs.methods.INPUT_BLUR.name]: {
            title:                                            Language.translate("components.input_simple.methods.fn_onInputBlur.title"),
            description:                                      Language.translate("components.input_simple.methods.fn_onInputBlur.description"),
            args: {
                [ComponentInputSimpleConfigs.methods.INPUT_CHANGE.dataArgs.VALUE.name]: this._COMPONENT_PATTERN[ComponentInputSimpleConfigs.keys.prop_inputValue.name],
            }
        },
    });


    /* ---------------------------------------------
        Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {

        return new ComponentInputSimple(
            <ComponentInputSimplePropsType>{
                classList: ["col-md-3", "col-12", "border", "p-2"],
                prop_inputType:               ComponentInputSimple_Types.STRING,
                prop_inputPlaceholder:        "Enter text...",
                prop_inputName:               "input_example" ,
                prop_inputValue:              "value test",

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
        ).getElement();
    }
}


export class ComponentInputSimple extends ComponentInputSimpleBase {

    private _ELEMENT_INPUT = null;

    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentInputSimplePropsType,
        methods: ComponentInputSimpleMethodsType,
        events = null
    ) {
        super("input-simple", null);
        super.renderComponent(config, methods, events);
    }


    /* ---------------------------------------------
        TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentInputSimpleConfigs.schemas.FORM.name)
    }

    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentInputSimpleConfigs.schemas.FORM.name:
                return this.template_render_form(attrsDefault, data, extra);
            case ComponentInputSimpleConfigs.schemas.FORM_INPUT.name:
                return this.template_render_form_input(attrsDefault, data, extra);
            case ComponentInputSimpleConfigs.schemas.FORM_ICON_CLEAR.name:
                return this.template_render_form_iconClear(attrsDefault, data, extra);
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    // ---------------------------------------------
    private template_render_form(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {

            const prop_inputDisable =                      data[ComponentInputSimpleConfigs.keys.prop_inputDisable.name];

            const prop_inputBorderTopLeftRadiusHas =       data[ComponentInputSimpleConfigs.keys.prop_inputBorderTopLeftRadiusHas.name];
            const prop_inputBorderTopRightRadiusHas =      data[ComponentInputSimpleConfigs.keys.prop_inputBorderTopRightRadiusHas.name];
            const prop_inputBorderBottomLeftRadiusHas =    data[ComponentInputSimpleConfigs.keys.prop_inputBorderBottomLeftRadiusHas.name];
            const prop_inputBorderBottomRightRadiusHas =   data[ComponentInputSimpleConfigs.keys.prop_inputBorderBottomRightRadiusHas.name];

            const prop_inputBorderTopHas =                 data[ComponentInputSimpleConfigs.keys.prop_inputBorderTopHas.name];
            const prop_inputBorderRightHas =               data[ComponentInputSimpleConfigs.keys.prop_inputBorderRightHas.name];
            const prop_inputBorderBottomHas =              data[ComponentInputSimpleConfigs.keys.prop_inputBorderBottomHas.name];
            const prop_inputBorderLeftHas =                data[ComponentInputSimpleConfigs.keys.prop_inputBorderLeftHas.name];

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

                            prop_borderTopLeftRadiusHas :            prop_inputBorderTopLeftRadiusHas ,
                            prop_borderTopRightRadiusHas :           prop_inputBorderTopRightRadiusHas ,
                            prop_borderBottomLeftRadiusHas :         prop_inputBorderBottomLeftRadiusHas ,
                            prop_borderBottomRightRadiusHas :        prop_inputBorderBottomRightRadiusHas ,

                            prop_borderTopHas :                      prop_inputBorderTopHas ,
                            prop_borderRightHas :                    prop_inputBorderRightHas ,
                            prop_borderBottomHas :                   prop_inputBorderBottomHas ,
                            prop_borderLeftHas :                     prop_inputBorderLeftHas ,

                            prop_borderColor_hover:                  Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1) ,
                            prop_contentBackgroundColor: Observable.computed(
                                (selectDisable) => {
                                    if (selectDisable) {
                                        return Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_5)
                                    }
                                    return Color(COLORS_MAIN.SHAN, COLORS_GRAD.GRADE_1)
                                },
                                [
                                    prop_inputDisable
                                ],
                                this.getScope()
                            ),

                            prop_content: [
                                this.executeSchemaPart(ComponentInputSimpleConfigs.schemas.FORM_INPUT.name) ,
                                this.executeSchemaPart(ComponentInputSimpleConfigs.schemas.FORM_ICON_CLEAR.name),
                            ],

                            prop_borderColor: Observable.computed(
                                (isFocus) => {
                                    if (isFocus){
                                        return StyleValue.important( Color(COLORS_MAIN.SECONDARY, COLORS_GRAD.GRADE_1));
                                    }
                                    else {
                                        return StyleValue.important( Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1))
                                    }
                                } ,
                                [
                                    this._ELEMENT_INPUT?.focus
                                ] ,
                                this.getScope()
                            ) ,

                        },
                        <ComponentBorderMethodsType>{
                            fn_onClickBorder: function (event, dataArgs:ComponentBorder_Methods_CLICK_BORDER_DataArgs, componentArgs:ComponentBorder_Methods_CLICK_BORDER_ComponentArgs) {
                                console.log(event)
                            }
                        }
                    ).getReactiveElement() ,

                    //this.executeSchemaPart(ComponentInputSimpleConfigs.schemas.VALIDATE.name),
                ],
            });

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    // ---------------------------------------------
    private template_render_form_input(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {

            const prop_inputName =                         data[ComponentInputSimpleConfigs.keys.prop_inputName.name];
            const prop_inputDisable =                      data[ComponentInputSimpleConfigs.keys.prop_inputDisable.name];
            const prop_inputValue =                        data[ComponentInputSimpleConfigs.keys.prop_inputValue.name];
            const prop_inputClass =                        data[ComponentInputSimpleConfigs.keys.prop_inputClass.name];
            const prop_inputStyles =                       data[ComponentInputSimpleConfigs.keys.prop_inputStyles.name];
            const prop_inputType =                         data[ComponentInputSimpleConfigs.keys.prop_inputType.name];
            const prop_inputPlaceholder =                  data[ComponentInputSimpleConfigs.keys.prop_inputPlaceholder.name];
            const prop_inputFor =                          data[ComponentInputSimpleConfigs.keys.prop_inputFor.name];


            this._ELEMENT_INPUT = ReactiveElement.input({
                attrs: {
                    ...attrsDefault,
                },
                attrsBind: {
                    name:        Observable.computed(
                        (name) => {
                            return `${name}[value]`
                        },
                        [
                            prop_inputName
                        ],
                        this.getScope()
                    ),
                    for:         prop_inputFor,
                    value:       prop_inputValue,
                    type:        prop_inputType,
                    placeholder: prop_inputPlaceholder,
                    disabled :   Observable.computed(
                        (status) => {
                            return status ? "disabled" : null
                        } ,
                        [
                            prop_inputDisable
                        ] ,
                        this.getScope()
                    )
                },
                className: [
                    "d-block",
                ],
                classBind: [
                    prop_inputClass,
                ],
                styles: {
                    border:       "none" ,
                    whiteSpace:   "nowrap",
                    overflow:     "hidden",
                    textOverflow: "ellipsis",
                    outline:      "none",
                    boxShadow:    "none",
                },
                stylesBind: (el) => ({
                    prop_inputStyles,

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

                }),
                on: {
                    input: (event: Event) => {
                        const value = event.target?.value ?? undefined;
                        this.fn_onChangeValue(event , value);
                    },
                    focus: (event: Event) => {
                         this.fn_onChangeFocus(event);
                    },
                    blur: (event: Event) => {
                         this.fn_onChangeBlur(event);
                    },
                }
            });

            return this._ELEMENT_INPUT;
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    // ---------------------------------------------
    private template_render_form_iconClear(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {

            const prop_inputDisable =       data[ComponentInputSimpleConfigs.keys.prop_inputDisable.name];

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (inputDisable: boolean) => {
                        if (inputDisable) return null;

                        return new ComponentElementPosition(
                            <ComponentElementPositionPropsType>{
                                classList: [],
                                prop_positionType:     ComponentElementPosition_positionTypes.ABSOLUTE,
                                prop_positionTop:      SizeUnit(50, UNITS.PERCENT),
                                prop_positionEnd:      SizeUnit(0 , UNITS.PERCENT),
                                prop_positionWidth:    Observable.computed(
                                    (sizeName) => {
                                        return SizeCalc(
                                            ToolsComponents_BorderWidth?.[sizeName] ,
                                            OPERATION.ADD ,
                                            ToolsComponents_Padding?.[sizeName] ,
                                            OPERATION.ADD ,
                                            ToolsComponents_Height?.[sizeName] ,
                                            OPERATION.ADD ,
                                            ToolsComponents_Padding?.[sizeName] ,
                                            OPERATION.ADD ,
                                            ToolsComponents_BorderWidth?.[sizeName] ,
                                        )
                                    } ,
                                    [
                                        AppConfig.get_sizeName()
                                    ] ,
                                    this.getScope()
                                ),
                                prop_positionHeight:    Observable.computed(
                                    (sizeName) => {
                                        return SizeCalc(
                                            ToolsComponents_BorderWidth?.[sizeName] ,
                                            OPERATION.ADD ,
                                            ToolsComponents_Padding?.[sizeName] ,
                                            OPERATION.ADD ,
                                            ToolsComponents_Height?.[sizeName] ,
                                            OPERATION.ADD ,
                                            ToolsComponents_Padding?.[sizeName] ,
                                            OPERATION.ADD ,
                                            ToolsComponents_BorderWidth?.[sizeName] ,
                                        )
                                    } ,
                                    [
                                        AppConfig.get_sizeName()
                                    ] ,
                                    this.getScope()
                                ),
                                prop_positionTranslate: TranslateUnit(SizeUnit(0, UNITS.PERCENT), SizeUnit(-50, UNITS.PERCENT)),
                                prop_positionZIndex: 10,
                                prop_content:  new ToolsComponents.ComponentIcon(
                                    <ComponentIconPropsType>{
                                        classList: [],
                                        prop_iconStyles:      Observable.computed(
                                            (sizeName) => {
                                                return {
                                                    cursor:     "pointer",
                                                    lineHeight:  SizeCalc(
                                                        ToolsComponents_BorderWidth?.[sizeName] ,
                                                        OPERATION.ADD ,
                                                        ToolsComponents_Padding?.[sizeName] ,
                                                        OPERATION.ADD ,
                                                        ToolsComponents_Height?.[sizeName] ,
                                                        OPERATION.ADD ,
                                                        ToolsComponents_Padding?.[sizeName] ,
                                                        OPERATION.ADD ,
                                                        ToolsComponents_BorderWidth?.[sizeName] ,
                                                    )
                                                }
                                            },
                                            [
                                                AppConfig.get_sizeName()
                                            ] ,
                                            this.getScope()
                                        ),
                                        prop_iconClass: ["d-block" , "text-center"],
                                        prop_icon: ToolsIcons.icon_clear(),
                                    },
                                    <ComponentIconMethodsType>{
                                        fn_onClickIcon: (event, dataArgs, componentArgs) => {
                                            this.fn_onChangeValue(event ,null , true);
                                        }
                                    }
                                ).getReactiveElement(),
                            },
                            <ComponentElementPositionMethodsType>{}
                        ).getReactiveElement();
                    },
                    [prop_inputDisable],
                    this.getScope()
                ),
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }





    // ---------------------------------------------
    private fn_getInputElement(){
        return this._ELEMENT_INPUT.getElement();
    }

    private fn_changeValue(value = null , changeValueElement = false){
        if (changeValueElement){
            this.fn_getInputElement().value = value;
        }
        this.set(ComponentInputSimpleProps.prop_inputValue , value)
    }

    private fn_onChangeValue(event: Event , value: String|null , changeValueElement = false){
        this.fn_changeValue(value , changeValueElement);
        const paramsFn : ComponentInputSimple_Methods_INPUT_CHANGE_ComponentArgs = {}
        this.executeMethod(ComponentInputSimpleConfigs.methods.INPUT_CHANGE.name  , event , paramsFn);
    }

    private fn_onChangeFocus(event: Event){
        const paramsFn : ComponentInputSimple_Methods_INPUT_FOCUS_ComponentArgs = {}
        this.executeMethod(ComponentInputSimpleConfigs.methods.INPUT_FOCUS.name  , event , paramsFn);
    }

    private fn_onChangeBlur(event: Event){
        const paramsFn : ComponentInputSimple_Methods_INPUT_BLUR_ComponentArgs = {}
        this.executeMethod(ComponentInputSimpleConfigs.methods.INPUT_BLUR.name  , event , paramsFn);
    }

}

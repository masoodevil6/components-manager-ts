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
    SIZES, SizesType, SizeUnit, StyleValue,
    ToolsComponents_BorderRadius,
    ToolsComponents_BorderWidth, ToolsComponents_FontSize, ToolsComponents_Height, UNITS
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
import {Observable} from "../../core/Observable";
import {ComponentInputSimpleProps} from "./simples/ComponentInputSimple";




export const ComponentBorderProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,

    prop_content :                        "prop_content" ,
    prop_contentSize :                    "prop_contentSize" ,

    prop_contentColor :                   "prop_contentColor" ,
    prop_contentColor_hover :             "prop_contentColor_hover" ,

    prop_contentBackgroundColor :         "prop_contentBackgroundColor" ,
    prop_contentBackgroundColor_hover :   "prop_contentBackgroundColor_hover" ,

    prop_borderColor :                    "prop_borderColor" ,
    prop_borderColor_hover :              "prop_borderColor_hover" ,

    prop_borderClass :                    "prop_borderClass" ,
    prop_borderStyles :                   "prop_borderStyles" ,

    prop_borderType :                     "prop_borderType" ,
    prop_borderOpacity :                  "prop_borderOpacity" ,

    prop_borderArrowType :                "prop_borderArrowType" ,
    prop_borderArrowWidth :               "prop_borderArrowWidth" ,
    prop_borderArrowPosition :            "prop_borderArrowPosition" ,

    prop_minWidth :                       "prop_minWidth" ,
    prop_width :                          "prop_width" ,

    prop_borderTopLeftRadiusHas:         "prop_borderTopLeftRadiusHas" ,
    prop_borderTopRightRadiusHas:        "prop_borderTopRightRadiusHas" ,
    prop_borderBottomLeftRadiusHas:      "prop_borderBottomLeftRadiusHas" ,
    prop_borderBottomRightRadiusHas:     "prop_borderBottomRightRadiusHas" ,

    prop_borderTopHas:                   "prop_borderTopHas" ,
    prop_borderRightHas:                 "prop_borderRightHas" ,
    prop_borderBottomHas:                "prop_borderBottomHas" ,
    prop_borderLeftHas:                  "prop_borderLeftHas" ,
} as const;



export enum ComponentBorder_ArrowTypes{
    TOP=     "top",
    RIGHT=   "right",
    BOTTOM=  "bottom",
    LEFT=    "left"
}

export enum ComponentBorder_BorderTypes{
    SOLID=      "solid",
    DASHED=     "dashed",
}



const ComponentBorderConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys ,
        ///----------------------
        [ComponentBorderProps.prop_content]: {
            name:               ComponentBorderProps.prop_content ,
            value:              GOG_SetValue<string | ReactiveElement[]>( "") ,
        } ,
        [ComponentBorderProps.prop_contentSize]: {
            name:               ComponentBorderProps.prop_contentSize ,
            value:              GOG_SetValue<typeof SIZES>( SIZES.M) ,
        } ,

        [ComponentBorderProps.prop_contentColor]: {
            name:               ComponentBorderProps.prop_contentColor ,
            value:              GOG_SetValue<Color | null>(null),
        } ,
        [ComponentBorderProps.prop_contentColor_hover]: {
            name:               ComponentBorderProps.prop_contentColor_hover ,
            value:              GOG_SetValue<Color | null>(null),
        } ,

        [ComponentBorderProps.prop_contentBackgroundColor]: {
            name:               ComponentBorderProps.prop_contentBackgroundColor ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1)),
        } ,
        [ComponentBorderProps.prop_contentBackgroundColor_hover]: {
            name:               ComponentBorderProps.prop_contentBackgroundColor_hover ,
            value:              GOG_SetValue<Color | null>(null),
        } ,

        [ComponentBorderProps.prop_borderColor]: {
            name:               ComponentBorderProps.prop_borderColor ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1)) ,
        } ,
        [ComponentBorderProps.prop_borderColor_hover]: {
            name:               ComponentBorderProps.prop_borderColor_hover ,
            value:              GOG_SetValue<Color | null>(null) ,
        } ,

        [ComponentBorderProps.prop_borderClass]: {
            name:               ComponentBorderProps.prop_borderClass ,
            value:              GOG_SetValue<string[]>( [ "shadow-sm" , "position-relative" , "px-2"] ) ,
        } ,
        [ComponentBorderProps.prop_borderStyles]: {
            name:               ComponentBorderProps.prop_borderStyles ,
            value:              GOG_SetValue<Record<string, string>>( {"display" : "flow-root"}) ,
        } ,
        [ComponentBorderProps.prop_borderType]: {
            name:               ComponentBorderProps.prop_borderType ,
            value:              GOG_SetValue<GOG_ValueOf<typeof ComponentBorder_BorderTypes>>(ComponentBorder_BorderTypes.SOLID),
        } ,

        [ComponentBorderProps.prop_borderOpacity]: {
            name:               ComponentBorderProps.prop_borderOpacity ,
            value:              GOG_SetValue<number|null>(100),
        } ,
        [ComponentBorderProps.prop_borderArrowType]: {
            name:               ComponentBorderProps.prop_borderArrowType ,
            value:              GOG_SetValue<GOG_ValueOf<typeof ComponentBorder_ArrowTypes> | null>(null),
        } ,
        [ComponentBorderProps.prop_borderArrowWidth]: {
            name:               ComponentBorderProps.prop_borderArrowWidth ,
            value:              GOG_SetValue<number>(10),
        } ,
        [ComponentBorderProps.prop_borderArrowPosition]: {
            name:               ComponentBorderProps.prop_borderArrowPosition ,
            value:              GOG_SetValue<SizeUnit | SizeCalc | null>( SizeUnit(50 , UNITS.PERCENT)) ,
        } ,
        [ComponentBorderProps.prop_minWidth]: {
            name:               ComponentBorderProps.prop_minWidth ,
            value:              GOG_SetValue<SizeUnit | SizeCalc |null>(null),
        } ,
        [ComponentBorderProps.prop_width]: {
            name:               ComponentBorderProps.prop_width ,
            value:              GOG_SetValue<SizeUnit | SizeCalc |null>(null),
        } ,



        [ComponentBorderProps.prop_borderTopLeftRadiusHas]: {
            name:               ComponentBorderProps.prop_borderTopLeftRadiusHas,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentBorderProps.prop_borderTopRightRadiusHas]: {
            name:               ComponentBorderProps.prop_borderTopRightRadiusHas,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentBorderProps.prop_borderBottomLeftRadiusHas]: {
            name:               ComponentBorderProps.prop_borderBottomLeftRadiusHas,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentBorderProps.prop_borderBottomRightRadiusHas]: {
            name:               ComponentBorderProps.prop_borderBottomRightRadiusHas,
            value:              GOG_SetValue<boolean>(true),
        },

        [ComponentBorderProps.prop_borderTopHas]: {
            name:               ComponentBorderProps.prop_borderTopHas,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentBorderProps.prop_borderRightHas]: {
            name:               ComponentBorderProps.prop_borderRightHas,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentBorderProps.prop_borderBottomHas]: {
            name:               ComponentBorderProps.prop_borderBottomHas,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentBorderProps.prop_borderLeftHas]: {
            name:               ComponentBorderProps.prop_borderLeftHas,
            value:              GOG_SetValue<boolean>(true),
        },
    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_Component_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts ,
        BORDER: {
            name:                      "part-border"
        } ,
    } ,
    templates: {
        BODY: {
            name:                      "body"
        } ,
    } ,
    methods: {
        CLICK_BORDER: {
            name:                      "fn_onClickBorder" ,
            dataArgs: {},
            componentArgs: {}
        },
        MOUSE_UP_BORDER: {
            name:                      "fn_onMouseUpBorder" ,
            dataArgs: {},
            componentArgs: {}
        },
        MOUSE_DOWN_BORDER: {
            name:                      "fn_onMouseDownBorder" ,
            dataArgs: {},
            componentArgs: {}
        },
        MOUSE_MOVE_BORDER: {
            name:                      "fn_onMouseMoveBorder" ,
            dataArgs: {},
            componentArgs: {}
        },
    }
} as const


export type ComponentBorderPropsType =                             GOG_ExtractNameValue<typeof ComponentBorderConfigs.keys>
export type ComponentBorderSchemaType =                            GOG_ExtractName<typeof ComponentBorderConfigs.schemas>
export type ComponentBorderTemplatesType =                         GOG_ExtractName<typeof ComponentBorderConfigs.templates>

export type ComponentBorder_Methods_CLICK_BORDER_ComponentArgs =   GOG_ExtractName<typeof ComponentBorderConfigs.methods.CLICK_BORDER.componentArgs>
export type ComponentBorder_Methods_CLICK_BORDER_DataArgs =        GOG_ExtractNameValue<typeof ComponentBorderConfigs.methods.CLICK_BORDER.dataArgs>

export type ComponentBorder_Methods_MOUSE_UP_BORDER_ComponentArgs =   GOG_ExtractName<typeof ComponentBorderConfigs.methods.MOUSE_UP_BORDER.componentArgs>
export type ComponentBorder_Methods_MOUSE_UP_BORDER_DataArgs =        GOG_ExtractNameValue<typeof ComponentBorderConfigs.methods.MOUSE_UP_BORDER.dataArgs>

export type ComponentBorder_Methods_MOUSE_DOWN_BORDER_ComponentArgs =   GOG_ExtractName<typeof ComponentBorderConfigs.methods.MOUSE_DOWN_BORDER.componentArgs>
export type ComponentBorder_Methods_MOUSE_DOWN_BORDER_DataArgs =        GOG_ExtractNameValue<typeof ComponentBorderConfigs.methods.MOUSE_DOWN_BORDER.dataArgs>

export type ComponentBorder_Methods_MOUSE_MOVE_BORDER_ComponentArgs =   GOG_ExtractName<typeof ComponentBorderConfigs.methods.MOUSE_UP_BORDER.componentArgs>
export type ComponentBorder_Methods_MOUSE_MOVE_BORDER_DataArgs =        GOG_ExtractNameValue<typeof ComponentBorderConfigs.methods.MOUSE_UP_BORDER.dataArgs>

export type ComponentBorderMethodsType = {
    [ComponentBorderConfigs.methods.CLICK_BORDER.name]:      ComponentCallBackType<ComponentBorder_Methods_CLICK_BORDER_ComponentArgs , ComponentBorder_Methods_CLICK_BORDER_DataArgs>
    [ComponentBorderConfigs.methods.MOUSE_UP_BORDER.name]:   ComponentCallBackType<ComponentBorder_Methods_MOUSE_UP_BORDER_ComponentArgs , ComponentBorder_Methods_MOUSE_UP_BORDER_DataArgs>
    [ComponentBorderConfigs.methods.MOUSE_DOWN_BORDER.name]:   ComponentCallBackType<ComponentBorder_Methods_MOUSE_DOWN_BORDER_ComponentArgs , ComponentBorder_Methods_MOUSE_DOWN_BORDER_DataArgs>
    [ComponentBorderConfigs.methods.MOUSE_MOVE_BORDER.name]: ComponentCallBackType<ComponentBorder_Methods_MOUSE_MOVE_BORDER_ComponentArgs , ComponentBorder_Methods_MOUSE_MOVE_BORDER_DataArgs>
}



export abstract class ComponentBorderBase extends ComponentBase<
    ComponentBorderPropsType ,
    ComponentBorderSchemaType ,
    ComponentBorderTemplatesType ,
    ComponentBorderMethodsType
    >{


    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN=  defineComponentPatterns<ComponentBorderPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Pattern(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this) ,
        [ComponentBorderConfigs.keys.prop_content.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_content.name,
            default:                                          ComponentBorderConfigs.keys.prop_content.value,
            title:                                            Language.translate("components.border.prop.prop_content.title"),
            description:                                      Language.translate("components.border.prop.prop_content.description"),
        } ,
        [ComponentBorderConfigs.keys.prop_contentSize.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_contentSize.name,
            default:                                          ComponentBorderConfigs.keys.prop_contentSize.value,
            title:                                            Language.translate("components.border.prop.prop_contentSize.title"),
            description:                                      Language.translate("components.border.prop.prop_contentSize.description"),
        } ,
        [ComponentBorderConfigs.keys.prop_contentColor.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_contentColor.name,
            default:                                          ComponentBorderConfigs.keys.prop_contentColor.value,
            title:                                            Language.translate("components.border.prop.prop_contentColor.title"),
            description:                                      Language.translate("components.border.prop.prop_contentColor.description"),
        } ,
        [ComponentBorderConfigs.keys.prop_contentColor_hover.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_contentColor_hover.name,
            default:                                          ComponentBorderConfigs.keys.prop_contentColor_hover.value,
            title:                                            Language.translate("components.border.prop.prop_contentColor_hover.title"),
            description:                                      Language.translate("components.border.prop.prop_contentColor_hover.description"),
        } ,
        [ComponentBorderConfigs.keys.prop_contentBackgroundColor.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_contentBackgroundColor.name,
            default:                                          ComponentBorderConfigs.keys.prop_contentBackgroundColor.value,
            title:                                            Language.translate("components.border.prop.prop_contentBackgroundColor.title"),
            description:                                      Language.translate("components.border.prop.prop_contentBackgroundColor.description"),
        } ,
        [ComponentBorderConfigs.keys.prop_contentBackgroundColor_hover.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_contentBackgroundColor_hover.name,
            default:                                          ComponentBorderConfigs.keys.prop_contentBackgroundColor_hover.value,
            title:                                            Language.translate("components.border.prop.prop_contentBackgroundColor.title"),
            description:                                      Language.translate("components.border.prop.prop_contentBackgroundColor.description"),
        } ,

        [ComponentBorderConfigs.keys.prop_borderColor.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_borderColor.name,
            default:                                          ComponentBorderConfigs.keys.prop_borderColor.value,
            title:                                            Language.translate("components.border.prop.prop_borderColor.title"),
            description:                                      Language.translate("components.border.prop.prop_borderColor.description"),
        } ,
        [ComponentBorderConfigs.keys.prop_borderColor_hover.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_borderColor_hover.name,
            default:                                          ComponentBorderConfigs.keys.prop_borderColor_hover.value,
            title:                                            Language.translate("components.border.prop.prop_borderColor_hover.title"),
            description:                                      Language.translate("components.border.prop.prop_borderColor_hover.description"),
        } ,

        [ComponentBorderConfigs.keys.prop_borderClass.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_borderClass.name,
            default:                                          ComponentBorderConfigs.keys.prop_borderClass.value,
            title:                                            Language.translate("components.border.prop.prop_borderClass.title"),
            description:                                      Language.translate("components.border.prop.prop_borderClass.description"),
        } ,
        [ComponentBorderConfigs.keys.prop_borderStyles.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_borderStyles.name,
            default:                                          ComponentBorderConfigs.keys.prop_borderStyles.value,
            title:                                            Language.translate("components.border.prop.prop_borderStyles.title"),
            description:                                      Language.translate("components.border.prop.prop_borderStyles.description"),
        } ,

        [ComponentBorderConfigs.keys.prop_borderType.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_borderType.name,
            default:                                          ComponentBorderConfigs.keys.prop_borderType.value,
            title:                                            Language.translate("components.border.prop.prop_borderType.title"),
            description:                                      Language.translate("components.border.prop.prop_borderType.description"),
        } ,
        [ComponentBorderConfigs.keys.prop_borderOpacity.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_borderOpacity.name,
            default:                                          ComponentBorderConfigs.keys.prop_borderOpacity.value,
            title:                                            Language.translate("components.border.prop.prop_borderOpacity.title"),
            description:                                      Language.translate("components.border.prop.prop_borderOpacity.description"),
        } ,
        [ComponentBorderConfigs.keys.prop_borderArrowType.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_borderArrowType.name,
            default:                                          ComponentBorderConfigs.keys.prop_borderArrowType.value,
            title:                                            Language.translate("components.border.prop.prop_borderArrowType.title"),
            description:                                      Language.translate("components.border.prop.prop_borderArrowType.description"),
        } ,
        [ComponentBorderConfigs.keys.prop_borderArrowWidth.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_borderArrowWidth.name,
            default:                                          ComponentBorderConfigs.keys.prop_borderArrowWidth.value,
            title:                                            Language.translate("components.border.prop.prop_borderArrowWidth.title"),
            description:                                      Language.translate("components.border.prop.prop_borderArrowWidth.description"),
        } ,
        [ComponentBorderConfigs.keys.prop_borderArrowPosition.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_borderArrowPosition.name,
            default:                                          ComponentBorderConfigs.keys.prop_borderArrowPosition.value,
            title:                                            Language.translate("components.border.prop.prop_borderArrowPosition.title"),
            description:                                      Language.translate("components.border.prop.prop_borderArrowPosition.description"),
        } ,
        [ComponentBorderConfigs.keys.prop_minWidth.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_minWidth.name,
            default:                                          ComponentBorderConfigs.keys.prop_minWidth.value,
            title:                                            Language.translate("components.border.prop.prop_minWidth.title"),
            description:                                      Language.translate("components.border.prop.prop_minWidth.description"),
        } ,
        [ComponentBorderConfigs.keys.prop_width.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_width.name,
            default:                                          ComponentBorderConfigs.keys.prop_width.value,
            title:                                            Language.translate("components.border.prop.prop_width.title"),
            description:                                      Language.translate("components.border.prop.prop_width.description"),
        } ,



        [ComponentBorderConfigs.keys.prop_borderTopLeftRadiusHas.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_borderTopLeftRadiusHas.name,
            default:                                          ComponentBorderConfigs.keys.prop_borderTopLeftRadiusHas.value,
            title:                                            Language.translate("components.border.prop.prop_borderTopLeftRadiusHas.title"),
            description:                                      Language.translate("components.border.prop.prop_borderTopLeftRadiusHas.description"),
        } ,
        [ComponentBorderConfigs.keys.prop_borderTopRightRadiusHas.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_borderTopRightRadiusHas.name,
            default:                                          ComponentBorderConfigs.keys.prop_borderTopRightRadiusHas.value,
            title:                                            Language.translate("components.border.prop.prop_borderTopRightRadiusHas.title"),
            description:                                      Language.translate("components.border.prop.prop_borderTopRightRadiusHas.description"),
        } ,
        [ComponentBorderConfigs.keys.prop_borderBottomLeftRadiusHas.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_borderBottomLeftRadiusHas.name,
            default:                                          ComponentBorderConfigs.keys.prop_borderBottomLeftRadiusHas.value,
            title:                                            Language.translate("components.border.prop.prop_borderBottomLeftRadiusHas.title"),
            description:                                      Language.translate("components.border.prop.prop_borderBottomLeftRadiusHas.description"),
        } ,
        [ComponentBorderConfigs.keys.prop_borderBottomRightRadiusHas.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_borderBottomRightRadiusHas.name,
            default:                                          ComponentBorderConfigs.keys.prop_borderBottomRightRadiusHas.value,
            title:                                            Language.translate("components.border.prop.prop_borderBottomRightRadiusHas.title"),
            description:                                      Language.translate("components.border.prop.prop_borderBottomRightRadiusHas.description"),
        } ,


        [ComponentBorderConfigs.keys.prop_borderTopHas.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_borderTopHas.name,
            default:                                          ComponentBorderConfigs.keys.prop_borderTopHas.value,
            title:                                            Language.translate("components.border.prop.prop_borderTopHas.title"),
            description:                                      Language.translate("components.border.prop.prop_borderTopHas.description"),
        } ,
        [ComponentBorderConfigs.keys.prop_borderRightHas.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_borderRightHas.name,
            default:                                          ComponentBorderConfigs.keys.prop_borderRightHas.value,
            title:                                            Language.translate("components.border.prop.prop_borderRightHas.title"),
            description:                                      Language.translate("components.border.prop.prop_borderRightHas.description"),
        } ,
        [ComponentBorderConfigs.keys.prop_borderBottomHas.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_borderBottomHas.name,
            default:                                          ComponentBorderConfigs.keys.prop_borderBottomHas.value,
            title:                                            Language.translate("components.border.prop.prop_borderBottomHas.title"),
            description:                                      Language.translate("components.border.prop.prop_borderBottomHas.description"),
        } ,
        [ComponentBorderConfigs.keys.prop_borderLeftHas.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_borderLeftHas.name,
            default:                                          ComponentBorderConfigs.keys.prop_borderLeftHas.value,
            title:                                            Language.translate("components.border.prop.prop_borderLeftHas.title"),
            description:                                      Language.translate("components.border.prop.prop_borderLeftHas.description"),
        } ,

    });


    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentBorderSchemaType , ComponentBorderPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this) ,
        [ComponentBorderConfigs.schemas.BORDER.name]: {
            part:               ComponentBorderConfigs.schemas.BORDER.name ,
            title:              Language.translate("components.border.schema.border.title") ,
            description:        Language.translate("components.border.schema.border.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderArrowType.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderArrowWidth.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderArrowPosition.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderOpacity.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderColor.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderColor_hover.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderClass.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderStyles.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderType.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_content.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_contentSize.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_contentColor.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_contentColor_hover.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_contentBackgroundColor.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_contentBackgroundColor_hover.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_width.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_minWidth.name] ,

                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderTopLeftRadiusHas.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderTopRightRadiusHas.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderBottomLeftRadiusHas.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderBottomRightRadiusHas.name] ,

                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderTopHas.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderRightHas.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderBottomHas.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderLeftHas.name] ,

            ]
        } ,
    })


    /* ---------------------------------------------
           PROPERTYs Pattern
        --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentBorderTemplatesType , ComponentBorderPropsType>({
        [ComponentBorderConfigs.templates.BODY.name]: {
            title:                                            Language.translate("components.border.template.body.title"),
            description:                                      Language.translate("components.border.template.body.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_content.name]
        } ,
    });


    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentBorderMethodsType , ComponentBorderPropsType>({
        [ComponentBorderConfigs.methods.CLICK_BORDER.name]: {
            title:                                            Language.translate("components.border.methods.fn_onClickBorder.title"),
            description:                                      Language.translate("components.border.methods.fn_onClickBorder.description"),
            args: {}
        } ,
        [ComponentBorderConfigs.methods.MOUSE_UP_BORDER.name]: {
            title:                                            Language.translate("components.border.methods.fn_onMouseUpBorder.title"),
            description:                                      Language.translate("components.border.methods.fn_onMouseUpBorder.description"),
            args: {}
        } ,
        [ComponentBorderConfigs.methods.MOUSE_DOWN_BORDER.name]: {
            title:                                            Language.translate("components.border.methods.fn_onMouseDownBorder.title"),
            description:                                      Language.translate("components.border.methods.fn_onMouseDownBorder.description"),
            args: {}
        } ,
        [ComponentBorderConfigs.methods.MOUSE_MOVE_BORDER.name]: {
            title:                                            Language.translate("components.border.methods.fn_onMouseMoveBorder.title"),
            description:                                      Language.translate("components.border.methods.fn_onMouseMoveBorder.description"),
            args: {}
        } ,
    });


    /* ---------------------------------------------
       Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        return new ComponentBorder(
            <ComponentBorderPropsType>{
                classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                styles: {}  ,

                prop_show :                          true ,
                prop_content:                        "content test  " ,
                prop_borderArrowType:                "top" ,
                //prop_borderArrowPosition:          50 ,
                prop_borderArrowWidth:               10 ,
                prop_borderColor:                    Color(COLORS_MAIN.WARNING , COLORS_GRAD.GRADE_1) ,
                prop_borderColor_hover:              Color(COLORS_MAIN.DARK    , COLORS_GRAD.GRADE_1) ,
                prop_contentBackgroundColor_hover:   Color(COLORS_MAIN.WARNING , COLORS_GRAD.GRADE_4) ,
                prop_contentColor_hover:             Color(COLORS_MAIN.WARNING , COLORS_GRAD.GRADE_1) ,
            },
            <ComponentBorderMethodsType>{
                fn_onClickBorder: function (event, dataArgs:ComponentBorder_Methods_CLICK_BORDER_DataArgs, componentArgs:ComponentBorder_Methods_CLICK_BORDER_ComponentArgs) {
                    console.log(event)
                }
            }
        ).getElement();
    }


}




export class ComponentBorder extends ComponentBorderBase{

    /* ---------------------------------------------
       SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentBorderPropsType ,
        methods: ComponentBorderMethodsType ,
        events = null
    ) {
        super("border" , null);
        super.renderComponent(config , methods , events);
    }



    /* ---------------------------------------------
      TEMPLATEs
     --------------------------------------------- */

    override renderContentComponent() {
        return this.executeSchemaPart(ComponentBorderConfigs.schemas.BORDER.name)
    }

    override renderManagerComponent(partName , attrsDefault, data , extra) : ReactiveElement {
        switch (partName){
            case ComponentBorderConfigs.schemas.BORDER.name:
               return  this.template_render_border(attrsDefault , data , extra);
        }
    }


    override template_render_border(attrsDefault , data , extra) : ReactiveElement {

        if (data != null){
            const prop_borderClass=                     data[ComponentBorderConfigs.keys.prop_borderClass.name];
            const prop_borderStyles=                    data[ComponentBorderConfigs.keys.prop_borderStyles.name];

            const prop_borderArrowPosition=             data[ComponentBorderConfigs.keys.prop_borderArrowPosition.name];
            const prop_borderOpacity =                  data[ComponentBorderConfigs.keys.prop_borderOpacity.name];
            const prop_borderType=                      data[ComponentBorderConfigs.keys.prop_borderType.name];
            const prop_content=                         data[ComponentBorderConfigs.keys.prop_content.name];

            const prop_borderArrowType=                 data[ComponentBorderConfigs.keys.prop_borderArrowType.name];
            const prop_borderArrowWidth=                data[ComponentBorderConfigs.keys.prop_borderArrowWidth.name];

            const prop_width =                          data[ComponentBorderConfigs.keys.prop_width.name];
            const prop_minWidth =                       data[ComponentBorderConfigs.keys.prop_minWidth.name];

            const prop_contentColor=                    data[ComponentBorderConfigs.keys.prop_contentColor.name];
            const prop_contentColor_hover=              data[ComponentBorderConfigs.keys.prop_contentColor_hover.name];

            const prop_contentBackgroundColor=          data[ComponentBorderConfigs.keys.prop_contentBackgroundColor.name];
            const prop_contentBackgroundColor_hover=    data[ComponentBorderConfigs.keys.prop_contentBackgroundColor_hover.name];

            const prop_borderColor =                    data[ComponentBorderConfigs.keys.prop_borderColor.name];
            const prop_borderColor_hover =              data[ComponentBorderConfigs.keys.prop_borderColor_hover.name];

            const prop_borderTopLeftRadiusHas =         data[ComponentBorderConfigs.keys.prop_borderTopLeftRadiusHas.name];
            const prop_borderTopRightRadiusHas =        data[ComponentBorderConfigs.keys.prop_borderTopRightRadiusHas.name];
            const prop_borderBottomLeftRadiusHas =      data[ComponentBorderConfigs.keys.prop_borderBottomLeftRadiusHas.name];
            const prop_borderBottomRightRadiusHas =     data[ComponentBorderConfigs.keys.prop_borderBottomRightRadiusHas.name];

            const prop_borderTopHas =                   data[ComponentBorderConfigs.keys.prop_borderTopHas.name];
            const prop_borderRightHas =                 data[ComponentBorderConfigs.keys.prop_borderRightHas.name];
            const prop_borderBottomHas =                data[ComponentBorderConfigs.keys.prop_borderBottomHas.name];
            const prop_borderLeftHas =                  data[ComponentBorderConfigs.keys.prop_borderLeftHas.name];


            return ReactiveElement.part(
                "section" ,
                {
                    attrs: {
                       ...attrsDefault
                    },
                    stylesCustom: `
#${attrsDefault?.id}:after{
   content:                                    var(--arrow-content);
   position:                                   absolute;
   width:                                      0px;
   height:                                     0px;
   border-style:                               solid;
   
   left:                                       var(--arrow-left);
   right:                                      var(--arrow-right);
   top:                                        var(--arrow-top);
   bottom:                                     var(--arrow-bottom);
   
   border-width:                               var(--arrow-border-width);
   border-color:                               var(--arrow-border-color);
   transform:                                  var(--arrow-transform);
}
            ` ,
                    styles: {
                        transition: "background-color 1000ms ease , color 1000ms ease , border-color 1000ms ease",
                    } ,
                    stylesBind: (el) => ({
                        prop_borderStyles ,


                        /// --------------------------------------
                        /// public
                        /// --------------------------------------
                        minWidth:         prop_minWidth ,

                        width:            prop_width ,

                        opacity:      Observable.computed(
                            (borderOpacity)=>{
                                return borderOpacity/100
                            } ,
                            [
                                prop_borderOpacity ,
                            ] ,
                            this.getScope()
                        ) ,





                        /// --------------------------------------
                        /// borderRadius
                        /// --------------------------------------

                        borderTopRightRadius: Observable.computed(
                            (sizeName ,inputBorderTopRightRadiusHas) => {
                                if(inputBorderTopRightRadiusHas){
                                    return ToolsComponents_BorderRadius?.[sizeName]
                                }
                                return SizeUnit(0, UNITS.PEXEL);
                            } ,
                            [
                                AppConfig.get_sizeName() ,
                                prop_borderTopRightRadiusHas
                            ] ,
                            this.getScope()
                        ) ,

                        borderBottomRightRadius: Observable.computed(
                            (sizeName , inputBorderBottomRightRadiusHas) => {
                                if(inputBorderBottomRightRadiusHas){
                                    return ToolsComponents_BorderRadius?.[sizeName]
                                }
                                return SizeUnit(0, UNITS.PEXEL);
                            } ,
                            [
                                AppConfig.get_sizeName() ,
                                prop_borderBottomRightRadiusHas
                            ] ,
                            this.getScope()
                        ) ,

                        borderTopLeftRadius: Observable.computed(
                            (sizeName  , inputBorderTopLeftRadiusHas) => {
                                if(inputBorderTopLeftRadiusHas){
                                    return ToolsComponents_BorderRadius?.[sizeName]
                                }
                                return SizeUnit(0, UNITS.PEXEL);
                            } ,
                            [
                                AppConfig.get_sizeName() ,
                                prop_borderTopLeftRadiusHas
                            ] ,
                            this.getScope()
                        ) ,

                        borderBottomLeftRadius: Observable.computed(
                            (sizeName , inputBorderBottomLeftRadiusHas) => {
                                if(inputBorderBottomLeftRadiusHas){
                                    return ToolsComponents_BorderRadius?.[sizeName]
                                }
                                return SizeUnit(0, UNITS.PEXEL);
                            } ,
                            [
                                AppConfig.get_sizeName() ,
                                prop_borderBottomLeftRadiusHas
                            ] ,
                            this.getScope()
                        ) ,




                        /// --------------------------------------
                        /// border
                        /// --------------------------------------

                        borderTopWidth: Observable.computed(
                            (sizeName: string, inputBorderTopHas: boolean ) => {
                                if(inputBorderTopHas){
                                    return StyleValue.important(ToolsComponents_BorderWidth?.[sizeName])
                                }
                                return StyleValue.important(SizeUnit(0, UNITS.PEXEL));
                            },
                            [
                                AppConfig.get_sizeName() ,
                                prop_borderTopHas
                            ],
                            this.getScope()
                        ),

                        borderRightWidth: Observable.computed(
                            (sizeName: string, inputBorderRightHas: boolean ) => {
                                if(inputBorderRightHas){
                                    return StyleValue.important(ToolsComponents_BorderWidth?.[sizeName])
                                }
                                return StyleValue.important(SizeUnit(0, UNITS.PEXEL));
                            },
                            [
                                AppConfig.get_sizeName() ,
                                prop_borderRightHas
                            ],
                            this.getScope()
                        ),

                        borderBottomWidth: Observable.computed(
                            (sizeName: string, inputBorderBottomHas: boolean ) => {
                                if(inputBorderBottomHas){
                                    return StyleValue.important(ToolsComponents_BorderWidth?.[sizeName])
                                }
                                return StyleValue.important(SizeUnit(0, UNITS.PEXEL));
                            },
                            [
                                AppConfig.get_sizeName() ,
                                prop_borderBottomHas
                            ],
                            this.getScope()
                        ),

                        borderLeftWidth: Observable.computed(
                            (sizeName: string, inputBorderLeftHas: boolean ) => {
                                if(inputBorderLeftHas){
                                    return StyleValue.important(ToolsComponents_BorderWidth?.[sizeName])
                                }
                                return StyleValue.important(SizeUnit(0, UNITS.PEXEL));
                            },
                            [
                                AppConfig.get_sizeName() ,
                                prop_borderLeftHas
                            ],
                            this.getScope()
                        ),



                        /// --------------------------------------
                        /// arrow styles
                        /// --------------------------------------

                        "--arrow-content" :
                            Observable.computed(( arrowType) => {
                                    if (arrowType != null){
                                        return "''"
                                    }
                                    return null;
                                },
                                [
                                    prop_borderArrowType
                                ],
                                this.getScope()
                            ),

                        "--arrow-left" :
                            Observable.computed(( type , arrowPosition , arrowWith, dir) => {
                                    if (!dir && (type == ComponentBorder_ArrowTypes.TOP || type == ComponentBorder_ArrowTypes.BOTTOM) ){
                                        return arrowPosition
                                    }
                                    else if (dir && type == ComponentBorder_ArrowTypes.LEFT){
                                        return SizeUnit(-arrowWith , UNITS.PEXEL)
                                    }
                                    else if (!dir && type == ComponentBorder_ArrowTypes.LEFT) {
                                        return SizeUnit(-arrowWith , UNITS.PEXEL)
                                    }

                                    return null;
                                },
                                [
                                    prop_borderArrowType ,
                                    prop_borderArrowPosition ,
                                    prop_borderArrowWidth ,
                                    AppConfig.get_directionRtl()
                                ],
                                this.getScope()
                            ),

                        "--arrow-right" :
                            Observable.computed(( type , arrowPosition , arrowWith, dir) => {
                                    if (dir && (type == ComponentBorder_ArrowTypes.TOP || type == ComponentBorder_ArrowTypes.BOTTOM) ){
                                        return arrowPosition
                                    }
                                    else if (!dir && type == ComponentBorder_ArrowTypes.RIGHT){
                                        return SizeUnit(-arrowWith , UNITS.PEXEL)
                                    }
                                    else if (dir && type == ComponentBorder_ArrowTypes.RIGHT){
                                        return SizeUnit(-arrowWith , UNITS.PEXEL)
                                    }
                                    return null;
                                },
                                [
                                    prop_borderArrowType ,
                                    prop_borderArrowPosition ,
                                    prop_borderArrowWidth ,
                                    AppConfig.get_directionRtl()
                                ],
                                this.getScope()
                            ),

                        "--arrow-top" :
                            Observable.computed(( type , arrowPosition , arrowWith) => {
                                    if ( type == ComponentBorder_ArrowTypes.TOP ){
                                        return SizeUnit(-arrowWith , UNITS.PEXEL)
                                    }
                                    else if (type == ComponentBorder_ArrowTypes.LEFT){
                                        return arrowPosition
                                    }
                                    else if (type == ComponentBorder_ArrowTypes.RIGHT){
                                        return arrowPosition
                                    }

                                    return null;
                                },
                                [
                                    prop_borderArrowType ,
                                    prop_borderArrowPosition ,
                                    prop_borderArrowWidth
                                ],
                                this.getScope()
                            ),

                        "--arrow-bottom" :
                            Observable.computed(( type  , arrowWith) => {
                                    if ( type == ComponentBorder_ArrowTypes.BOTTOM ){
                                        return SizeUnit(-arrowWith , UNITS.PEXEL)
                                    }
                                    return null;
                                },
                                [
                                    prop_borderArrowType  ,
                                    prop_borderArrowWidth
                                ]
                                , this.getScope()
                            ),

                        "--arrow-border-width" :
                            Observable.computed(( type  , arrowWith, dir) => {
                                    if ( type == ComponentBorder_ArrowTypes.TOP || type == ComponentBorder_ArrowTypes.BOTTOM){
                                        return `${SizeUnit(arrowWith , UNITS.PEXEL)}  ${SizeUnit(arrowWith*(2/3) , UNITS.PEXEL)}  0  ${SizeUnit(arrowWith*(2/3) , UNITS.PEXEL)}`;
                                    }
                                    else if ( (dir && type == ComponentBorder_ArrowTypes.LEFT) || (!dir && type == ComponentBorder_ArrowTypes.RIGHT) ){
                                        return `${SizeUnit(arrowWith*(2/3) , UNITS.PEXEL)}   0   ${SizeUnit(arrowWith*(2/3) , UNITS.PEXEL)}   ${SizeUnit(arrowWith , UNITS.PEXEL)}`;
                                    }
                                    else if ((dir && type == ComponentBorder_ArrowTypes.RIGHT) || (!dir && type == ComponentBorder_ArrowTypes.LEFT) ){
                                        return `${SizeUnit(arrowWith*(2/3) , UNITS.PEXEL)}  ${SizeUnit(arrowWith , UNITS.PEXEL)}  ${SizeUnit(arrowWith*(2/3) , UNITS.PEXEL)}  0`;
                                    }
                                    return null;
                                },
                                [
                                    prop_borderArrowType  ,
                                    prop_borderArrowWidth ,
                                    AppConfig.get_directionRtl()
                                ]
                                , this.getScope()
                            ),

                        "--arrow-transform" :
                            Observable.computed(( type , dir ) => {
                                    if ( type == ComponentBorder_ArrowTypes.TOP){
                                        return `translate(${dir ? "50%" : "-50%"} , 0) rotate(180deg)`;
                                    }
                                    if ( type == ComponentBorder_ArrowTypes.BOTTOM){
                                        return `translate(${dir ? "50%" : "-50%"} , 0) rotate(0deg)`;
                                    }
                                    else if ( (dir && type == ComponentBorder_ArrowTypes.LEFT) || (!dir && type == ComponentBorder_ArrowTypes.RIGHT) ){
                                        return `translate(0 , -50%)  ${dir ? "rotate(180deg)" : ""}`;
                                    }
                                    else if ((dir && type == ComponentBorder_ArrowTypes.RIGHT) || (!dir && type == ComponentBorder_ArrowTypes.LEFT) ){
                                        return `translate(0 , -50%) ${dir ? "rotate(180deg)" : ""}`;
                                    }
                                    return null;
                                },
                                [
                                    prop_borderArrowType ,
                                    AppConfig.get_directionRtl()
                                ], this.getScope()
                            ),


                        "--arrow-border-color" : el.hover.mapList({
                            true:
                                Observable.computed(( type  , borderColor , dir) => {
                                    if ( type == ComponentBorder_ArrowTypes.TOP || type == ComponentBorder_ArrowTypes.BOTTOM){
                                        return `${borderColor} transparent transparent transparent`;
                                    }
                                    else if ( (dir && type == ComponentBorder_ArrowTypes.LEFT) || (!dir && type == ComponentBorder_ArrowTypes.RIGHT) ){
                                        return `transparent transparent transparent ${borderColor}`;
                                    }
                                    else if ((dir && type == ComponentBorder_ArrowTypes.RIGHT) || (!dir && type == ComponentBorder_ArrowTypes.LEFT) ){
                                        return `transparent ${borderColor} transparent transparent`;
                                    }
                                    return null;
                                },
                                [
                                    prop_borderArrowType  ,
                                    prop_borderColor_hover  ,
                                    AppConfig.get_directionRtl()
                                ]
                            ),
                            false:
                                Observable.computed(( type  , borderColor, dir) => {
                                    if ( type == ComponentBorder_ArrowTypes.TOP || type == ComponentBorder_ArrowTypes.BOTTOM){
                                        return `${borderColor} transparent transparent transparent`;
                                    }
                                    else if ( (dir && type == ComponentBorder_ArrowTypes.LEFT) || (!dir && type == ComponentBorder_ArrowTypes.RIGHT) ){
                                        return `transparent transparent transparent ${borderColor}`;
                                    }
                                    else if ((dir && type == ComponentBorder_ArrowTypes.RIGHT) || (!dir && type == ComponentBorder_ArrowTypes.LEFT) ){
                                        return `transparent ${borderColor} transparent transparent`;
                                    }
                                    return null;
                                },
                                [
                                    prop_borderArrowType  ,
                                    prop_borderColor ,
                                    AppConfig.get_directionRtl()
                                ]
                            )
                        }, this.getScope()
                        ),










                        borderStyle:      Observable.computed(
                            (borderType , borderColor)=>{
                                if(borderColor != null){
                                    return borderType;
                                }
                                return null;
                            } ,
                            [
                                prop_borderType ,
                                prop_borderColor
                            ] ,
                            this.getScope()
                        ) ,

                        borderColor:
                            Observable.computed(
                                ( color , colorHover , hover) => {
                                    if (colorHover){
                                        return hover ? colorHover : color
                                    }
                                    return color;
                                    },
                                [
                                    prop_borderColor ,
                                    prop_borderColor_hover ,
                                    el.hover
                                ],
                                this.getScope()
                            ),

                        color:
                            Observable.computed(
                                ( color , colorHover , hover) => {
                                    if (colorHover){
                                        return hover ? colorHover : color
                                    }
                                    return color;
                                    },
                                [
                                    prop_contentColor ,
                                    prop_contentColor_hover ,
                                    el.hover
                                ],
                                this.getScope()
                            ),

                        backgroundColor:
                            Observable.computed(
                                ( color , colorHover , hover) => {
                                    if (colorHover){
                                        return hover ? colorHover : color
                                    }
                                    return color;
                                    },
                                [
                                    prop_contentBackgroundColor ,
                                    prop_contentBackgroundColor_hover ,
                                    el.hover
                                ],
                                this.getScope()
                            ),


                    }) ,
                    className: [
                       // "p-0"
                    ] ,
                    classBind: [
                        prop_borderClass
                    ] ,
                    on: {
                        click: (event: Event) => {
                            event.stopPropagation();
                            const params : ComponentBorder_Methods_CLICK_BORDER_DataArgs = {}
                            this.executeMethod(ComponentBorderConfigs.methods.CLICK_BORDER.name  , event , params);
                        },
                        mousemove: (event: Event) => {
                            event.stopPropagation();
                            const params : ComponentBorder_Methods_MOUSE_MOVE_BORDER_DataArgs = {}
                            this.executeMethod(ComponentBorderConfigs.methods.MOUSE_MOVE_BORDER.name  , event , params);
                        },
                        mousedown: (event: Event) => {
                            event.stopPropagation();
                            const params : ComponentBorder_Methods_MOUSE_DOWN_BORDER_DataArgs = {}
                            this.executeMethod(ComponentBorderConfigs.methods.MOUSE_DOWN_BORDER.name  , event , params);
                        },
                        mouseup: (event: Event) => {
                            event.stopPropagation();
                            const params : ComponentBorder_Methods_MOUSE_UP_BORDER_DataArgs = {}
                            this.executeMethod(ComponentBorderConfigs.methods.MOUSE_UP_BORDER.name  , event , params);
                        },
                    },
                    children: [
                        prop_content ,
                    ]
                })
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


import {TOOLS} from "../../tools";

import {
    ComponentBase,
    ComponentCallBackType,
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
import {ToolsCss} from "../../../utils/ToolsCss";
import {Language} from "../../../core/Language";
import {AppConfig} from "../../../core/AppConfig";
import {
    Color,
    COLORS_GRAD,
    COLORS_MAIN,
    IconsType, OPERATION,
    SizeCalc,
    SIZES,
    SizesType,
    SizeUnit,
    ToolsComponents_BorderRadius, ToolsComponents_BorderWidth, ToolsComponents_Height, ToolsComponents_Padding, UNITS
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
    GOG_ComponentBasicProps_Component,
    GOG_ComponentBasicProps_Component_Structure,
} from "../../../core/component/SetupComponent";
import {ComponentIconMethodsType, ComponentIconPropsType} from "./../ComponentIcon";
import {Observable} from "../../../core/Observable";


export const ComponentButtonSimpleProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,

    prop_type :                            "prop_type" ,

    prop_btnType :                         "prop_btnType" ,
    prop_btnClass :                        "prop_btnClass" ,
    prop_btnStyles :                       "prop_btnStyles" ,
    prop_btnWidth :                        "prop_btnWidth" ,
    prop_btnHeight :                       "prop_btnHeight" ,
    prop_btnBorderColor :                  "prop_btnBorderColor" ,
    prop_btnBorderWidth :                  "prop_btnBorderWidth" ,
    prop_btnBackgroundColor :              "prop_btnBackgroundColor" ,
    prop_btnBackgroundColor_hover :        "prop_btnBackgroundColor_hover" ,

    prop_btnTitle :                        "prop_btnTitle" ,
    prop_btnTitleStyles :                  "prop_btnTitleStyles" ,
    prop_btnTitleClass :                   "prop_btnTitleClass" ,
    prop_btnTitleColor :                   "prop_btnTitleColor" ,
    prop_btnTitleColor_hover :             "prop_btnTitleColor_hover" ,

    prop_btnIcon :                         "prop_btnIcon" ,
    prop_btnIconStyles :                   "prop_btnIconStyles" ,
    prop_btnIconClass :                    "prop_btnIconClass" ,
    prop_btnBorderRadius :                 "prop_btnBorderRadius" ,
    prop_btnBorderRadiusStartTop :         "prop_btnBorderRadiusStartTop" ,
    prop_btnBorderRadiusStartBottom :      "prop_btnBorderRadiusStartBottom" ,
    prop_btnBorderRadiusEndTop :           "prop_btnBorderRadiusEndTop" ,
    prop_btnBorderRadiusEndBottom :        "prop_btnBorderRadiusEndBottom" ,
    prop_variant :                         "prop_variant" ,
} as const;




export enum ComponentButtonSimple_Types{
    CUSTOM=    "custom",
    SUBMIT=    "submit",
    CANCEL=    "cancel",
    BACK=      "back"
}

export enum ComponentButtonSimple_Variants{
    PRIMARY=   "primary",
    SECONDARY= "secondary",
    GHOST=     "ghost",
    ICON=      "icon",
}

export enum ComponentButtonSimple_ButtonTypes{
    SUBMIT=    "submit",
    BUTTON=    "button",
}



const ComponentButtonSimpleConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys ,
        ///----------------------

        [ComponentButtonSimpleProps.prop_type]: {
            name:                      ComponentButtonSimpleProps.prop_type,
            value:                     GOG_SetValue<GOG_ValueOf<typeof ComponentButtonSimple_Types>>(ComponentButtonSimple_Types.SUBMIT),
        } ,

        [ComponentButtonSimpleProps.prop_btnType]: {
            name:                      ComponentButtonSimpleProps.prop_btnType,
            value:                     GOG_SetValue<GOG_ValueOf<typeof ComponentButtonSimple_ButtonTypes>>(ComponentButtonSimple_ButtonTypes.BUTTON),
        } ,
        [ComponentButtonSimpleProps.prop_btnClass]: {
            name:                      ComponentButtonSimpleProps.prop_btnClass,
            value:                     GOG_SetValue<string[]>( ["w-100"]) ,
        } ,
        [ComponentButtonSimpleProps.prop_btnStyles]: {
            name:                      ComponentButtonSimpleProps.prop_btnStyles,
            value:                     GOG_SetValue<Record<string, string>>( {}) ,
        } ,
        [ComponentButtonSimpleProps.prop_btnWidth]: {
            name:                      ComponentButtonSimpleProps.prop_btnWidth ,
            value:                     GOG_SetValue<SizeUnit | SizeCalc |null>(null),
        } ,
        [ComponentButtonSimpleProps.prop_btnHeight]: {
            name:                      ComponentButtonSimpleProps.prop_btnHeight ,
            value:                     GOG_SetValue<SizeUnit | SizeCalc |null>(null),
        } ,
        [ComponentButtonSimpleProps.prop_btnBorderColor]: {
            name:                      ComponentButtonSimpleProps.prop_btnBorderColor        ,
            value:                     GOG_SetValue<Color | null>(null),
        } ,
        [ComponentButtonSimpleProps.prop_btnBorderWidth]: {
            name:                      ComponentButtonSimpleProps.prop_btnBorderWidth        ,
            value:                     GOG_SetValue<typeof SIZES |  null>( null) ,
        } ,
        [ComponentButtonSimpleProps.prop_btnBackgroundColor]: {
            name:                      ComponentButtonSimpleProps.prop_btnBackgroundColor,
            value:                     GOG_SetValue<Color | null>(null),
        } ,
        [ComponentButtonSimpleProps.prop_btnBackgroundColor_hover]: {
            name:                      ComponentButtonSimpleProps.prop_btnBackgroundColor_hover,
            value:                     GOG_SetValue<Color | null>(null),
        } ,


        [ComponentButtonSimpleProps.prop_btnTitle]: {
            name:                      ComponentButtonSimpleProps.prop_btnTitle,
            value:                     GOG_SetValue<string>( "") ,
        } ,
        [ComponentButtonSimpleProps.prop_btnTitleStyles]: {
            name:                      ComponentButtonSimpleProps.prop_btnTitleStyles,
            value:                     GOG_SetValue<Record<string, string>>( {}) ,
        } ,
        [ComponentButtonSimpleProps.prop_btnTitleClass]: {
            name:                     ComponentButtonSimpleProps.prop_btnTitleClass,
            value:                    GOG_SetValue<string[]>( []) ,
        } ,
        [ComponentButtonSimpleProps.prop_btnTitleColor]: {
            name:                     ComponentButtonSimpleProps.prop_btnTitleColor,
            value:                    GOG_SetValue<Color | null>(null),
        } ,
        [ComponentButtonSimpleProps.prop_btnTitleColor_hover]: {
            name:                     ComponentButtonSimpleProps.prop_btnTitleColor_hover,
            value:                    GOG_SetValue<Color | null>(null),
        } ,


        [ComponentButtonSimpleProps.prop_btnIcon]: {
            name:                     ComponentButtonSimpleProps.prop_btnIcon,
            value:                    GOG_SetValue<IconsType|null>(null),
        } ,
        [ComponentButtonSimpleProps.prop_btnIconStyles]: {
            name:                     ComponentButtonSimpleProps.prop_btnIconStyles,
            value:                    GOG_SetValue<Record<string, string>>( {}) ,
        } ,
        [ComponentButtonSimpleProps.prop_btnIconClass]: {
            name:                     ComponentButtonSimpleProps.prop_btnIconClass,
            value:                    GOG_SetValue<string[]>( ["w-100"]) ,
        } ,

        [ComponentButtonSimpleProps.prop_btnBorderRadius]: {
            name:                     ComponentButtonSimpleProps.prop_btnBorderRadius,
            value:                    GOG_SetValue<SizesType | null>(SIZES.M),
        } ,
        [ComponentButtonSimpleProps.prop_btnBorderRadiusStartTop]: {
            name:                     ComponentButtonSimpleProps.prop_btnBorderRadiusStartTop,
            value:                    GOG_SetValue<SizesType | null>(null),
        } ,
        [ComponentButtonSimpleProps.prop_btnBorderRadiusStartBottom]: {
            name:                     ComponentButtonSimpleProps.prop_btnBorderRadiusStartBottom,
            value:                    GOG_SetValue<SizesType | null>(null),
        } ,
        [ComponentButtonSimpleProps.prop_btnBorderRadiusEndTop]: {
            name:                     ComponentButtonSimpleProps.prop_btnBorderRadiusEndTop,
            value:                    GOG_SetValue<SizesType | null>(null),
        } ,
        [ComponentButtonSimpleProps.prop_btnBorderRadiusEndBottom]: {
            name:                     ComponentButtonSimpleProps.prop_btnBorderRadiusEndBottom,
            value:                    GOG_SetValue<SizesType | null>(null),
        } ,

        [ComponentButtonSimpleProps.prop_variant]: {
            name:                     ComponentButtonSimpleProps.prop_variant,
            value:                    GOG_SetValue<GOG_ValueOf<typeof ComponentButtonSimple_Variants>>(ComponentButtonSimple_Variants.SECONDARY),
        } ,

    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_Component_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts ,
        FORM: {
            name:               "part-form"
        } ,
        FORM_BUTTON: {
            name:               "part-form-button"
        } ,
        FORM_BUTTON_TITLE: {
            name:               "part-form-button_title"
        } ,
        FORM_BUTTON_ICON: {
            name:               "part-form-button_icon"
        } ,
    } ,
    templates: {
        BODY: {
            name:                "body"
        } ,
    } ,
    methods: {
        CLICK: {
            name:                      "fn_onClickButton" ,
            dataArgs: {},
            componentArgs: {}
        },
    }
} as const



export type ComponentButtonSimplePropsType =                      GOG_ExtractNameValue<typeof ComponentButtonSimpleConfigs.keys>
export type ComponentButtonSimpleSchemaType =                     GOG_ExtractName<typeof ComponentButtonSimpleConfigs.schemas>
export type ComponentButtonSimpleTemplatesType =                  GOG_ExtractName<typeof ComponentButtonSimpleConfigs.templates>

export type ComponentButtonSimple_Methods_CLICK_ComponentArgs =   GOG_ExtractName<typeof ComponentButtonSimpleConfigs.methods.CLICK.componentArgs>
export type ComponentButtonSimple_Methods_CLICK_DataArgs =        GOG_ExtractNameValue<typeof ComponentButtonSimpleConfigs.methods.CLICK.dataArgs>

export type ComponentButtonSimpleMethodsType = {
    [ComponentButtonSimpleConfigs.methods.CLICK.name]: ComponentCallBackType<ComponentButtonSimple_Methods_CLICK_ComponentArgs , ComponentButtonSimple_Methods_CLICK_DataArgs>
}




export class ComponentButtonSimpleBase extends ComponentBase<
    ComponentButtonSimplePropsType ,
    ComponentButtonSimpleSchemaType ,
    ComponentButtonSimpleTemplatesType ,
    ComponentButtonSimpleMethodsType
    >{



    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN=  defineComponentPatterns<ComponentButtonSimplePropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this) ,
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this) ,

            [ComponentButtonSimpleConfigs.keys.prop_type.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_type.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_type.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_type.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_type.description"),
            } ,

            [ComponentButtonSimpleConfigs.keys.prop_btnType.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_btnType.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_btnType.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_btnType.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_btnType.description"),
            } ,
            [ComponentButtonSimpleConfigs.keys.prop_btnClass.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_btnClass.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_btnClass.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_btnClass.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_btnClass.description"),
            } ,
            [ComponentButtonSimpleConfigs.keys.prop_btnStyles.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_btnStyles.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_btnStyles.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_btnStyles.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_btnStyles.description"),
            } ,
            [ComponentButtonSimpleConfigs.keys.prop_btnWidth.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_btnWidth.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_btnWidth.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_btnWidth.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_btnWidth.description"),
            } ,
            [ComponentButtonSimpleConfigs.keys.prop_btnHeight.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_btnHeight.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_btnHeight.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_btnHeight.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_btnHeight.description"),
            } ,
            [ComponentButtonSimpleConfigs.keys.prop_btnBorderColor.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_btnBorderColor.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_btnBorderColor.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_btnBorderColor.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_btnBorderColor.description"),
            } ,
            [ComponentButtonSimpleConfigs.keys.prop_btnBorderWidth.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_btnBorderWidth.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_btnBorderWidth.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_btnBorderWidth.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_btnBorderWidth.description"),
            } ,
            [ComponentButtonSimpleConfigs.keys.prop_btnBackgroundColor.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_btnBackgroundColor.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_btnBackgroundColor.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_btnBackgroundColor.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_btnBackgroundColor.description"),
            } ,
            [ComponentButtonSimpleConfigs.keys.prop_btnBackgroundColor_hover.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_btnBackgroundColor_hover.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_btnBackgroundColor_hover.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_btnBackgroundColor_hover.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_btnBackgroundColor_hover.description"),
            } ,

            [ComponentButtonSimpleConfigs.keys.prop_btnTitle.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_btnTitle.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_btnTitle.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_btnTitle.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_btnTitle.description"),
            } ,
            [ComponentButtonSimpleConfigs.keys.prop_btnTitleStyles.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_btnTitleStyles.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_btnTitleStyles.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_btnTitleStyles.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_btnTitleStyles.description"),
            } ,
            [ComponentButtonSimpleConfigs.keys.prop_btnTitleClass.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_btnTitleClass.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_btnTitleClass.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_btnTitleClass.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_btnTitleClass.description"),
            } ,
            [ComponentButtonSimpleConfigs.keys.prop_btnTitleColor.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_btnTitleColor.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_btnTitleColor.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_btnTitleColor.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_btnTitleColor.description"),
            } ,
            [ComponentButtonSimpleConfigs.keys.prop_btnTitleColor_hover.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_btnTitleColor_hover.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_btnTitleColor_hover.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_btnTitleColor_hover.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_btnTitleColor_hover.description"),
            } ,


            [ComponentButtonSimpleConfigs.keys.prop_btnIcon.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_btnIcon.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_btnIcon.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_btnIcon.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_btnIcon.description"),
            } ,
            [ComponentButtonSimpleConfigs.keys.prop_btnIconStyles.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_btnIconStyles.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_btnIconStyles.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_btnIconStyles.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_btnIconStyles.description"),
            } ,
            [ComponentButtonSimpleConfigs.keys.prop_btnIconClass.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_btnIconClass.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_btnIconClass.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_btnIconClass.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_btnIconClass.description"),
            } ,

            [ComponentButtonSimpleConfigs.keys.prop_btnBorderRadius.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_btnBorderRadius.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_btnBorderRadius.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_btnBorderRadius.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_btnBorderRadius.description"),
            } ,
            [ComponentButtonSimpleConfigs.keys.prop_btnBorderRadiusStartTop.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_btnBorderRadiusStartTop.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_btnBorderRadiusStartTop.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_btnBorderRadiusStartTop.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_btnBorderRadiusStartTop.description"),
            } ,
            [ComponentButtonSimpleConfigs.keys.prop_btnBorderRadiusStartBottom.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_btnBorderRadiusStartBottom.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_btnBorderRadiusStartBottom.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_btnBorderRadiusStartBottom.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_btnBorderRadiusStartBottom.description"),
            } ,
            [ComponentButtonSimpleConfigs.keys.prop_btnBorderRadiusEndTop.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_btnBorderRadiusEndTop.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_btnBorderRadiusEndTop.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_btnBorderRadiusEndTop.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_btnBorderRadiusEndTop.description"),
            } ,
            [ComponentButtonSimpleConfigs.keys.prop_btnBorderRadiusEndBottom.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_btnBorderRadiusEndBottom.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_btnBorderRadiusEndBottom.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_btnBorderRadiusEndBottom.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_btnBorderRadiusEndBottom.description"),
            } ,

            [ComponentButtonSimpleConfigs.keys.prop_variant.name]: {
                prop:                                             ComponentButtonSimpleConfigs.keys.prop_variant.name,
                default:                                          ComponentButtonSimpleConfigs.keys.prop_variant.value,
                title:                                            Language.translate("components.ButtonSimple.props.prop_variant.title"),
                description:                                      Language.translate("components.ButtonSimple.props.prop_variant.description"),
            } ,
        }
    );

    /* ---------------------------------------------
        PROPERTYs Props
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentButtonSimpleSchemaType  , ComponentButtonSimplePropsType>( {
        ...GOG_ComponentBasicConfigs_Component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this) ,
        [ComponentButtonSimpleConfigs.schemas.FORM.name]: {
            part:               ComponentButtonSimpleConfigs.schemas.FORM.name ,
            title:              Language.translate("components.ButtonSimple.schema.form.title") ,
            description:        Language.translate("components.ButtonSimple.schema.form.description") ,
            props: [

            ]
        } ,
        [ComponentButtonSimpleConfigs.schemas.FORM_BUTTON.name]: {
            part:               ComponentButtonSimpleConfigs.schemas.FORM_BUTTON.name ,
            title:              Language.translate("components.ButtonSimple.schema.form_Button.title") ,
            description:        Language.translate("components.ButtonSimple.schema.form_Button.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_type.name] ,
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnType.name] ,
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnClass.name] ,
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnStyles.name] ,
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnWidth.name] ,
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnHeight.name] ,
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnBackgroundColor.name] ,
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnBackgroundColor_hover.name] ,
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnBorderRadius.name] ,
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnBorderRadiusStartTop.name] ,
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnBorderRadiusStartBottom.name] ,
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnBorderRadiusEndTop.name] ,
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnBorderRadiusEndBottom.name] ,
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnBorderColor.name] ,
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnBorderWidth.name] ,
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnIcon.name] ,
            ]
        } ,
        [ComponentButtonSimpleConfigs.schemas.FORM_BUTTON_TITLE.name]: {
            part:               ComponentButtonSimpleConfigs.schemas.FORM_BUTTON_TITLE.name ,
            title:              Language.translate("components.ButtonSimple.schema.form_button_title.title") ,
            description:        Language.translate("components.ButtonSimple.schema.form_button_title.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_type.name] ,
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnTitle.name] ,
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnTitleStyles.name] ,
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnTitleClass.name] ,
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnTitleColor.name] ,
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnTitleColor_hover.name] ,
            ]
        } ,
        [ComponentButtonSimpleConfigs.schemas.FORM_BUTTON_ICON.name]: {
            part:               ComponentButtonSimpleConfigs.schemas.FORM_BUTTON_ICON.name ,
            title:              Language.translate("components.ButtonSimple.schema.form_button_icon.title") ,
            description:        Language.translate("components.ButtonSimple.schema.form_button_icon.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnIcon.name] ,
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnIconStyles.name] ,
                this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnIconClass.name] ,
            ]
        } ,
    });

    /* ---------------------------------------------
            PROPERTYs Pattern
         --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentButtonSimpleTemplatesType , ComponentButtonSimplePropsType>({
        [ComponentButtonSimpleConfigs.templates.BODY.name]: {
            title:                                            Language.translate("components.ButtonSimple.template.body.title"),
            description:                                      Language.translate("components.ButtonSimple.template.body.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentButtonSimpleConfigs.keys.prop_btnTitle.name]
        } ,
    });



    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentButtonSimpleMethodsType , ComponentButtonSimplePropsType>({
        [ComponentButtonSimpleConfigs.methods.CLICK.name]: {
            title:                                            Language.translate("components.ButtonSimple.methods.fn_onClick.title"),
            description:                                      Language.translate("components.ButtonSimple.methods.fn_onClick.description"),
            args: {}
        } ,
    });


    /* ---------------------------------------------
        Example
     --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        return new ComponentButtonSimple(
            <ComponentButtonSimplePropsType>{
                classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                prop_btnTitle: "asd" ,
                prop_type: "submit" ,
                prop_btnBorderRadius: SIZES.DEFAULT ,  // null,
                prop_btnBorderRadiusStartTop: SIZES.M ,
                prop_btnBorderRadiusEndTop: SIZES.XXL ,
                prop_btnBorderRadiusStartBottom: SIZES.XXL ,
                prop_btnBorderRadiusEndBottom: SIZES.M ,
                prop_btnIcon: TOOLS.ICON.icon_reload({size: SIZES.M , primaryColor:Color(COLORS_MAIN.SHAN ,COLORS_GRAD.GRADE_1), secondaryColor:Color(COLORS_MAIN.INFO ,COLORS_GRAD.GRADE_4)})
            } ,
            <ComponentButtonSimpleMethodsType>{
                fn_onClickButton: function (event, dataArgs : ComponentButtonSimple_Methods_CLICK_DataArgs, componentArgs: ComponentButtonSimple_Methods_CLICK_ComponentArgs) {
                    alert("asd");
                }
            }
        ).getElement();
    }

}

export class ComponentButtonSimple extends ComponentButtonSimpleBase{

    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentButtonSimplePropsType ,
        methods : ComponentButtonSimpleMethodsType ,
        events = null
    ) {
        super("button" , null);
        super.renderComponent(config , methods , events);
    }


    /* ---------------------------------------------
       TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentButtonSimpleConfigs.schemas.FORM.name)
    }

    override renderManagerComponent(partName , attrsDefault , data , extra) :  ReactiveElement {
        switch (partName){
            case ComponentButtonSimpleConfigs.schemas.FORM.name:
                return  this.template_render_form(attrsDefault , data , extra);
            case ComponentButtonSimpleConfigs.schemas.FORM_BUTTON.name:
                return  this.template_render_formButton(attrsDefault , data , extra);
            case ComponentButtonSimpleConfigs.schemas.FORM_BUTTON_TITLE.name:
                return  this.template_render_formBtnTitle(attrsDefault , data , extra);
            case ComponentButtonSimpleConfigs.schemas.FORM_BUTTON_ICON.name:
                return  this.template_render_formBtnIcon(attrsDefault , data , extra);
        }
    }

    private template_render_form(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const btnHeight   =     ToolsCss.getHeightSize(AppConfig.get("sizeName"));
            const btnLineHeight =   ToolsCss.getLineHeightSize(AppConfig.get("sizeName"));
            const btnFontSize =     ToolsCss.getFontSize(AppConfig.get("sizeName"));

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                styles: {
                   // height :            `${btnHeight}px` ,
                    lineHeight :        `${btnLineHeight}px` ,
                    fontSize :          `${btnFontSize}pt` ,
                },
                children: [
                    this.executeSchemaPart(ComponentButtonSimpleConfigs.schemas.FORM_BUTTON.name) ,
                ]

            });
        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });

    }

    private template_render_formButton(attrsDefault , data , extra) : ReactiveElement{

        if (data != null){

            const prop_type        =                                   data[ComponentButtonSimpleConfigs.keys.prop_type.name];
            const prop_btnType     =                                   data[ComponentButtonSimpleConfigs.keys.prop_btnType.name];

            const prop_btnClass    =                                   data[ComponentButtonSimpleConfigs.keys.prop_btnClass.name];
            const prop_btnStyles   =                                   data[ComponentButtonSimpleConfigs.keys.prop_btnStyles.name];
            const prop_btnWidth   =                                    data[ComponentButtonSimpleConfigs.keys.prop_btnWidth.name];
            const prop_btnHeight   =                                   data[ComponentButtonSimpleConfigs.keys.prop_btnHeight.name];
            const prop_btnBorderWidth =                                data[ComponentButtonSimpleConfigs.keys.prop_btnBorderWidth.name];
            const prop_btnIcon       =                                 data[ComponentButtonSimpleConfigs.keys.prop_btnIcon.name];

            const prop_btnBorderRadius =                                data[ComponentButtonSimpleConfigs.keys.prop_btnBorderRadius.name];
            const prop_btnBorderRadiusStartTop =                        data[ComponentButtonSimpleConfigs.keys.prop_btnBorderRadiusStartTop.name];
            const prop_btnBorderRadiusStartBottom =                     data[ComponentButtonSimpleConfigs.keys.prop_btnBorderRadiusStartBottom.name];
            const prop_btnBorderRadiusEndTop =                          data[ComponentButtonSimpleConfigs.keys.prop_btnBorderRadiusEndTop.name];
            const prop_btnBorderRadiusEndBottom =                       data[ComponentButtonSimpleConfigs.keys.prop_btnBorderRadiusEndBottom.name];

            let btnBackgroundColor = {};
            btnBackgroundColor[ComponentButtonSimple_Types.SUBMIT] =          "var(--primaryColor1)";
            btnBackgroundColor[ComponentButtonSimple_Types.BACK] =            "var(--secondaryColor1)";
            btnBackgroundColor[ComponentButtonSimple_Types.CANCEL] =          "var(--errorColor1)";
            btnBackgroundColor[ComponentButtonSimple_Types.CUSTOM] =          data[ComponentButtonSimpleConfigs.keys.prop_btnBackgroundColor.name];

            let btnBackgroundColor_hover = {};
            btnBackgroundColor_hover[ComponentButtonSimple_Types.SUBMIT] =   "var(--primaryColor2)";
            btnBackgroundColor_hover[ComponentButtonSimple_Types.BACK] =     "var(--secondaryColor2)";
            btnBackgroundColor_hover[ComponentButtonSimple_Types.CANCEL] =   "var(--errorColor2)";
            btnBackgroundColor_hover[ComponentButtonSimple_Types.CUSTOM] =   data[ComponentButtonSimpleConfigs.keys.prop_btnBackgroundColor_hover.name];

            let btnBorderColor = {};
            btnBorderColor[ComponentButtonSimple_Types.SUBMIT] =             "var(--primaryColor2)";
            btnBorderColor[ComponentButtonSimple_Types.BACK] =               "var(--secondaryColor1)";
            btnBorderColor[ComponentButtonSimple_Types.CANCEL] =             "var(--errorColor1)";
            btnBorderColor[ComponentButtonSimple_Types.CUSTOM] =             data[ComponentButtonSimpleConfigs.keys.prop_btnBorderColor.name];

            return ReactiveElement.part(  "button" ,
                {
                    attrs: {
                        "id":     `component-button-${this._COMPONENT_RANDOM_ID}`,
                    },
                    className: [
                        "shadow-sm" , // "border-0" ,
                    ] ,
                    classBind: [
                        prop_btnClass
                    ] ,
                    styles:{
                        "border" : "0px"
                    },
                    stylesBind: (el) => ({
                        width:               prop_btnWidth ,


                        backgroundColor: el.hover.mapList({
                            true:           prop_type.mapList(btnBackgroundColor_hover),
                            false:          prop_type.mapList(btnBackgroundColor)
                        }) ,
                        transition: el.hover.mapList({
                            true:           "background-color 1000ms ease" ,
                            false:          "background-color 200ms ease"
                        }) ,


                        height: Observable.computed(
                            (sizeName) => {
                                return SizeCalc(
                                    ToolsComponents_BorderRadius?.[sizeName],
                                    OPERATION.ADD ,
                                    ToolsComponents_Height?.[sizeName],
                                    OPERATION.ADD,
                                    ToolsComponents_BorderRadius?.[sizeName],
                                )
                            } ,
                            [
                                AppConfig.get_sizeName()
                            ] ,
                            this.getScope()
                        ) ,


                        borderRadius: Observable.computed(
                            (sizeNameRadius, sizeNameDefault) => {
                                if (sizeNameRadius != null){
                                    if (sizeNameRadius != SIZES.DEFAULT){
                                        return ToolsComponents_BorderRadius?.[sizeNameRadius]
                                    }
                                    else {
                                        return ToolsComponents_BorderRadius?.[sizeNameDefault]
                                    }
                                }
                            } ,
                            [
                                prop_btnBorderRadius,
                                AppConfig.get_sizeName()
                            ] ,
                            this.getScope()
                        ),
                        borderTopLeftRadius: Observable.computed(
                            (sizeNameRadiusStartTop , sizeNameRadiusEndTop , dir, sizeNameDefault) => {
                                if (dir && sizeNameRadiusEndTop != null){
                                    if (sizeNameRadiusEndTop != SIZES.DEFAULT){
                                        return ToolsComponents_BorderRadius?.[sizeNameRadiusEndTop]
                                    }
                                    else {
                                        return ToolsComponents_BorderRadius?.[sizeNameDefault]
                                    }
                                }
                                else if (!dir && sizeNameRadiusStartTop != null){
                                    if (sizeNameRadiusStartTop != SIZES.DEFAULT){
                                        return ToolsComponents_BorderRadius?.[sizeNameRadiusStartTop]
                                    }
                                    else {
                                        return ToolsComponents_BorderRadius?.[sizeNameDefault]
                                    }
                                }
                            } ,
                            [
                                prop_btnBorderRadiusStartTop ,
                                prop_btnBorderRadiusEndTop ,
                                AppConfig.get_directionRtl(),
                                AppConfig.get_sizeName()
                            ] ,
                            this.getScope()
                        ),
                        borderTopRightRadius: Observable.computed(
                            (sizeNameRadiusStartTop , sizeNameRadiusEndTop , dir, sizeNameDefault) => {
                                if (dir && sizeNameRadiusStartTop != null){
                                    if (sizeNameRadiusStartTop != SIZES.DEFAULT){
                                        return ToolsComponents_BorderRadius?.[sizeNameRadiusStartTop]
                                    }
                                    else {
                                        return ToolsComponents_BorderRadius?.[sizeNameDefault]
                                    }
                                }
                                else if (!dir && sizeNameRadiusEndTop != null){
                                    if (sizeNameRadiusEndTop != SIZES.DEFAULT){
                                        return ToolsComponents_BorderRadius?.[sizeNameRadiusEndTop]
                                    }
                                    else {
                                        return ToolsComponents_BorderRadius?.[sizeNameDefault]
                                    }
                                }
                            } ,
                            [
                                prop_btnBorderRadiusStartTop ,
                                prop_btnBorderRadiusEndTop ,
                                AppConfig.get_directionRtl(),
                                AppConfig.get_sizeName()
                            ] ,
                            this.getScope()
                        ),
                        borderBottomLeftRadius: Observable.computed(
                            (sizeNameRadiusStartBottom , sizeNameRadiusEndBottom , dir , sizeNameDefault) => {
                                if (dir && sizeNameRadiusEndBottom != null){
                                    if (sizeNameRadiusEndBottom != SIZES.DEFAULT){
                                        return ToolsComponents_BorderRadius?.[sizeNameRadiusEndBottom]
                                    }
                                    else {
                                        return ToolsComponents_BorderRadius?.[sizeNameDefault]
                                    }
                                }
                                else if (!dir && sizeNameRadiusStartBottom != null){
                                    if (sizeNameRadiusStartBottom != SIZES.DEFAULT){
                                        return ToolsComponents_BorderRadius?.[sizeNameRadiusStartBottom]
                                    }
                                    else {
                                        return ToolsComponents_BorderRadius?.[sizeNameDefault]
                                    }
                                }
                            } ,
                            [
                                prop_btnBorderRadiusStartBottom ,
                                prop_btnBorderRadiusEndBottom ,
                                AppConfig.get_directionRtl(),
                                AppConfig.get_sizeName()
                            ] ,
                            this.getScope()
                        ),
                        borderBottomRightRadius: Observable.computed(
                            (sizeNameRadiusStartBottom , sizeNameRadiusEndBottom , dir) => {
                                if (dir){
                                    return ToolsComponents_BorderRadius?.[sizeNameRadiusStartBottom]
                                }
                                else {
                                    return ToolsComponents_BorderRadius?.[sizeNameRadiusEndBottom]
                                }
                            } ,
                            [
                                prop_btnBorderRadiusStartBottom ,
                                prop_btnBorderRadiusEndBottom ,
                                AppConfig.get_directionRtl()
                            ] ,
                            this.getScope()
                        ),


                        prop_btnStyles ,
                    }) ,
                    children: Observable.conditionWhen(
                        prop_btnIcon ,
                        icon => icon != null ,
                        () => ReactiveElement.div({
                            children: [
                                this.executeSchemaPart(ComponentButtonSimpleConfigs.schemas.FORM_BUTTON_TITLE.name) ,
                                this.executeSchemaPart(ComponentButtonSimpleConfigs.schemas.FORM_BUTTON_ICON.name)
                            ]
                        }) ,
                        () => ReactiveElement.div({
                            children: [
                                this.executeSchemaPart(ComponentButtonSimpleConfigs.schemas.FORM_BUTTON_TITLE.name)
                            ]
                        }) ,
                        this.getScope()
                    ),
                    on: {
                        click: (event) => {
                            const params: ComponentButtonSimple_Methods_CLICK_DataArgs = {}
                            this.executeMethod(ComponentButtonSimpleConfigs.methods.CLICK.name , event , params);
                        },
                    }
                });
        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }


    private template_render_formBtnTitle(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {
            const prop_type =               data[ComponentButtonSimpleConfigs.keys.prop_type.name];
            const prop_btnTitle =           data[ComponentButtonSimpleConfigs.keys.prop_btnTitle.name];
            const prop_btnTitleStyles =     data[ComponentButtonSimpleConfigs.keys.prop_btnTitleStyles.name];
            const prop_btnTitleClass =      data[ComponentButtonSimpleConfigs.keys.prop_btnTitleClass.name];

            let btnColor = {};
            btnColor[ComponentButtonSimple_Types.SUBMIT] =         "var(--shanColor1)";
            btnColor[ComponentButtonSimple_Types.BACK] =           "var(--darkColor1)";
            btnColor[ComponentButtonSimple_Types.CANCEL] =         "var(--shanColor1)";
            btnColor[ComponentButtonSimple_Types.CUSTOM] =         data[ComponentButtonSimpleConfigs.keys.prop_btnTitleColor.name];

            let btnColor_hover = {};
            btnColor_hover[ComponentButtonSimple_Types.SUBMIT] =   "var(--shanColor2)";
            btnColor_hover[ComponentButtonSimple_Types.BACK] =     "var(--darkColor2)";
            btnColor_hover[ComponentButtonSimple_Types.CANCEL] =   "var(--shanColor2)";
            btnColor_hover[ComponentButtonSimple_Types.CUSTOM] =   data[ComponentButtonSimpleConfigs.keys.prop_btnTitleColor_hover.name];

            const btnHeight   =     ToolsCss.getHeightSize(AppConfig.get("sizeName"));
            const btnLineHeight =   ToolsCss.getLineHeightSize(AppConfig.get("sizeName"));
            const btnFontSize =     ToolsCss.getFontSize(AppConfig.get("sizeName"));

            return ReactiveElement.part(  "b" ,{
                attrs: {
                    ...attrsDefault
                },
                styles: {
                    height:     `${btnHeight}px` ,
                    lineHeight: `${btnLineHeight}px` ,
                    fontSize:   `${btnFontSize}px`
                },
                stylesBind: (el) => ({
                    color: el.hover.mapList({
                        true:           prop_type.mapList(btnColor_hover),
                        false:          prop_type.mapList(btnColor)
                    }) ,
                    transition: el.hover.mapList({
                        true:           "background-color 1000ms ease" ,
                        false:          "background-color 200ms ease"
                    }) ,
                    prop_btnTitleStyles ,
                }) ,
                classBind: [
                    prop_btnTitleClass
                ],
                children: [
                    prop_btnTitle
                ]
            });


        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });

    }


    private template_render_formBtnIcon(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_btnIcon        =   data[ComponentButtonSimpleConfigs.keys.prop_btnIcon.name];
            const prop_btnIconStyles  =   data[ComponentButtonSimpleConfigs.keys.prop_btnIconStyles.name];
            const prop_btnIconClass   =   data[ComponentButtonSimpleConfigs.keys.prop_btnIconClass.name];

            return new ToolsComponents.ComponentIcon(
                <ComponentIconPropsType>{
                    classList: ["d-inline-block" , "mx-2"]  ,
                    styles: {}  ,

                    prop_iconClass :    prop_btnIconClass ,
                    prop_iconStyles :   prop_btnIconStyles ,
                    prop_icon:          prop_btnIcon ,
                } ,
                <ComponentIconMethodsType>{

                }
            ).getReactiveElement();
        }

        return ReactiveElement.section({
            attrs: {
                ...attrsDefault
            }
        });
    }



    /* ---------------------------------------------
       FUNCTIONs
    --------------------------------------------- */


}
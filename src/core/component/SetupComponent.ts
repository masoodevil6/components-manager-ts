import {GOG_SetValue, GOG_ValueOf, ComponentBase, IComponentProp} from "../ComponentBase";
import {Language} from "../Language";
import {fa} from "../../langs/Fa";
import {CalcSizeUnitVar, Color, COLORS_GRAD, COLORS_MAIN, CssColorVar, IconsType, SizeCalc, SIZES, SizeUnit, SizeUnitVar, UNITS} from "../../utils/ToolsConsts";
import {ToolsIcons} from "../../tools/icons";
import {ReactiveElement} from "../ReactiveElement";
import {ToolsComponents} from "../../tools/components";
import {AppConfig} from "../AppConfig";
import {ToolsCss} from "../../utils/ToolsCss";
import {ComponentAttrsDefault} from "./ConnectorComponent";
import {Observable} from "../Observable";



function GOG_ComponentBasicConfigs_checkExecutePart(context: any, partName: string | null, replace: boolean = true){
    let child = context.executeSchemaPart(partName);
    if(!child && replace){
        child = context.renderContentComponent()
    }
    return child
}

export function GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault: ComponentAttrsDefault) : ReactiveElement{
    return ReactiveElement.part(  "section" ,{
        attrs: {
            ...attrsDefault
        }
    });
}








/// ----------------------------------------------------
/// PART: Component
/// ----------------------------------------------------
export const GOG_ComponentBasicProps_Component = {
    selector:                                                 "selector" ,
    append:                                                   "append" ,
    classList:                                                "classList" ,
    styles:                                                   "styles"
} as const

export const GOG_ComponentBasicConfigs_Component_keys = {
    [GOG_ComponentBasicProps_Component.selector]:{
        name:                                                 GOG_ComponentBasicProps_Component.selector  ,
        value:                                                GOG_SetValue<string | null>(null),
    } ,
    [GOG_ComponentBasicProps_Component.append]:{
        name:                                                 GOG_ComponentBasicProps_Component.append  ,
        value:                                                GOG_SetValue<boolean>(false),
    } ,
    [GOG_ComponentBasicProps_Component.classList]:{
        name:                                                 GOG_ComponentBasicProps_Component.classList  ,
        value:                                                GOG_SetValue<string[]>([]),
    } ,
    [GOG_ComponentBasicProps_Component.styles]:{
        name:                                                 GOG_ComponentBasicProps_Component.styles  ,
        value:                                                GOG_SetValue<Record<string, any>>({}),
    } ,
} as const

export const GOG_ComponentBasicConfigs_Component_parts = {
    Component: {
        name:                                                 "part-component"
    } ,
} as const

export function GOG_ComponentBasicConfigs_Component_Pattern(ctx: ComponentBase<any, any, any, any>){
    return {
        [GOG_ComponentBasicConfigs_Component_keys.append.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_keys.append.name,
            default:                                          GOG_ComponentBasicConfigs_Component_keys.append.value,
            title:                                            Language.translate("components.public.props.append.title"),
            description:                                      Language.translate("components.public.props.append.description"),
        } ,
        [GOG_ComponentBasicConfigs_Component_keys.selector.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_keys.selector.name,
            default:                                          GOG_ComponentBasicConfigs_Component_keys.selector.value,
            title:                                            Language.translate("components.public.props.selector.title"),
            description:                                      Language.translate("components.public.props.selector.description"),
        } ,
        [GOG_ComponentBasicConfigs_Component_keys.classList.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_keys.classList.name,
            default:                                          GOG_ComponentBasicConfigs_Component_keys.classList.value,
            title:                                            Language.translate("components.public.props.classList.title"),
            description:                                      Language.translate("components.public.props.classList.description"),
        } ,
        [GOG_ComponentBasicConfigs_Component_keys.styles.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_keys.styles.name,
            default:                                          GOG_ComponentBasicConfigs_Component_keys.styles.value,
            title:                                            Language.translate("components.public.props.styles.title"),
            description:                                      Language.translate("components.public.props.styles.description"),
        } ,
    }
};

export function GOG_ComponentBasicConfigs_Component_Schema(ctx: ComponentBase<any, any, any, any>){
    const classListProp = ctx._COMPONENT_PATTERN?.[GOG_ComponentBasicConfigs_Component_keys.classList.name];
    const stylesProp = ctx._COMPONENT_PATTERN?.[GOG_ComponentBasicConfigs_Component_keys.styles.name];
    
    return {
        Component: {
            part:                                             GOG_ComponentBasicConfigs_Component_parts.Component.name ,
            method:                                           GOG_ComponentBasicConfigs_Component_render ,
            title:                                            Language.translate("components.public.schema.component.title"),
            description:                                      Language.translate("components.public.schema.component.description"),
            props:                                            [
                classListProp ,
                stylesProp ,
            ].filter((prop): prop is IComponentProp<any> => prop !== undefined) ,
        } ,
    }
}

export function GOG_ComponentBasicConfigs_Component_render(this: ComponentBase<any, any, any, any>, attrsDefault: ComponentAttrsDefault, data: any, extra: any) : ReactiveElement{
    if (data != null) {

        const rtl = AppConfig.observable("directionRtl")
        let classList =  data?.classList ?? [];
        let styles = data?.styles ?? {};


        return  ReactiveElement.component( this._COMPONENT_NAME ,{
            attrs: {
                ...attrsDefault
            },
            className: [

            ],
            classBind: [
                classList
            ] ,
            styles: {

            },
            stylesBind: {
                direction: rtl.mapBoolean("rtl" , "ltr") ,
                styles
            },
            children: [
                GOG_ComponentBasicConfigs_checkExecutePart(this, GOG_ComponentBasicConfigs_Component_Structure_parts.STRUCTURE.name)
            ]
        })
    }

    return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
}








/// ----------------------------------------------------
/// PART: component > Structure
/// ----------------------------------------------------
export const GOG_ComponentBasicProps_Component_Structure = {
    prop_show:             "prop_show" ,
    prop_structureClass:   "prop_structureClass" ,
    prop_structureStyles:  "prop_structureStyles"
} as const

export const GOG_ComponentBasicConfigs_Component_Structure_keys = {
    [GOG_ComponentBasicProps_Component_Structure.prop_show]:{
        name:                     GOG_ComponentBasicProps_Component_Structure.prop_show  ,
        value:                    GOG_SetValue<boolean>(true),
    },
    [GOG_ComponentBasicProps_Component_Structure.prop_structureClass]:{
        name:                     GOG_ComponentBasicProps_Component_Structure.prop_structureClass  ,
        value:                    GOG_SetValue<string[]>([]),
    } ,
    [GOG_ComponentBasicProps_Component_Structure.prop_structureStyles]:{
        name:                     GOG_ComponentBasicProps_Component_Structure.prop_structureStyles  ,
        value:                    GOG_SetValue<Record<string, any>>({}),
    }
} as const

export const GOG_ComponentBasicConfigs_Component_Structure_parts = {
    STRUCTURE: {
        name:               "part-component-structure"
    } ,
} as const

export function GOG_ComponentBasicConfigs_Component_Structure_Pattern(ctx: ComponentBase<any, any, any, any>){
    return {
        [GOG_ComponentBasicConfigs_Component_Structure_keys.prop_structureClass.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_Structure_keys.prop_structureClass.name,
            default:                                          GOG_ComponentBasicConfigs_Component_Structure_keys.prop_structureClass.value,
            title:                                            Language.translate("components.public.props.prop_structureClass.title"),
            description:                                      Language.translate("components.public.props.prop_structureClass.description"),
        } ,
        [GOG_ComponentBasicConfigs_Component_Structure_keys.prop_structureStyles.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_Structure_keys.prop_structureStyles.name,
            default:                                          GOG_ComponentBasicConfigs_Component_Structure_keys.prop_structureStyles.value,
            title:                                            Language.translate("components.public.props.prop_structureStyles.title"),
            description:                                      Language.translate("components.public.props.prop_structureStyles.description"),
        } ,
        [GOG_ComponentBasicConfigs_Component_Structure_keys.prop_show.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_Structure_keys.prop_show.name,
            default:                                          GOG_ComponentBasicConfigs_Component_Structure_keys.prop_show.value,
            title:                                            Language.translate("components.public.props.prop_show.title"),
            description:                                      Language.translate("components.public.props.prop_show.description"),
        }
    }
};

export function GOG_ComponentBasicConfigs_Component_Structure_Schema(ctx: ComponentBase<any, any, any, any>){
    const prop_structureClass = ctx._COMPONENT_PATTERN?.[GOG_ComponentBasicConfigs_Component_Structure_keys.prop_structureClass.name];
    const prop_structureStyles = ctx._COMPONENT_PATTERN?.[GOG_ComponentBasicConfigs_Component_Structure_keys.prop_structureStyles.name];
    const prop_show = ctx._COMPONENT_PATTERN?.[GOG_ComponentBasicConfigs_Component_Structure_keys.prop_show.name];
    
    return {
        STRUCTURE: {
            part:                                             GOG_ComponentBasicConfigs_Component_Structure_parts.STRUCTURE.name ,
            method:                                           GOG_ComponentBasicConfigs_Component_Structure_render,
            title:                                            Language.translate("components.public.schema.component_structure.title"),
            description:                                      Language.translate("components.public.schema.component_structure.description"),
            props:                                            [
                 prop_structureClass ,
                 prop_structureStyles ,
                 prop_show ,
            ].filter((prop): prop is IComponentProp<any> => prop !== undefined) ,
        }
    }
}

export function GOG_ComponentBasicConfigs_Component_Structure_render(this: ComponentBase<any, any, any, any>, attrsDefault: ComponentAttrsDefault, data: any, extra: any) : ReactiveElement{

    if (data != null) {
        const prop_show =            data.prop_show;
        const prop_structureClass =  data.prop_structureClass;
        const prop_structureStyles = data.prop_structureStyles;

        return  ReactiveElement.part(  "section" ,{
            className: [
                //...moreClass ,
                //"position-relative",
            ],
            classBind: [
                prop_structureClass ,
                prop_show.mapBoolean("show" , "d-none")
            ],
            attrs: {
                ...attrsDefault
            },
            styles: {},
            stylesBind: {
                prop_structureStyles
            },
            children: [
                GOG_ComponentBasicConfigs_checkExecutePart(this, GOG_ComponentBasicConfigs_Component_Structure_FormInput_parts.FormInput.name) ,
            ]
        });
    }

    return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
}











/// ----------------------------------------------------
/// PART: component > Structure > FromInput
/// ----------------------------------------------------
export const GOG_ComponentBasicProps_Component_Structure_FormInput = {

} as const

export const GOG_ComponentBasicConfigs_Component_Structure_FormInput_keys = {

} as const

export const GOG_ComponentBasicConfigs_Component_Structure_FormInput_parts = {
    FormInput: {
        name:               "part-component-structure-formInput"
    } ,
} as const

export function GOG_ComponentBasicConfigs_Component_Structure_FormInput_Pattern(ctx: ComponentBase<any, any, any, any>){
    return {

    }
};

export function GOG_ComponentBasicConfigs_Component_Structure_FormInput_Schema(ctx: ComponentBase<any, any, any, any>){
    return {
        FormInput: {
            part:                                             GOG_ComponentBasicConfigs_Component_Structure_FormInput_parts.FormInput.name ,
            method:                                           GOG_ComponentBasicConfigs_Component_Structure_FormInput_render,
            title:                                            Language.translate("components.public.schema.component_structure_formInput.title"),
            description:                                      Language.translate("components.public.schema.component_structure_formInput.description"),
            props:                                            [

            ] ,
        }
    }
}

export function GOG_ComponentBasicConfigs_Component_Structure_FormInput_render(this: ComponentBase<any, any, any, any>, attrsDefault: ComponentAttrsDefault, data: any, extra: any) : ReactiveElement{

    if (data != null) {

        return  ReactiveElement.part(  "section" ,{
            className: [

            ],
            classBind: [

            ],
            attrs: {
                ...attrsDefault
            },
            styles: {},
            stylesBind: {

            },
            children: [
                GOG_ComponentBasicConfigs_checkExecutePart(this, GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_parts.LABEL.name , false) ,
                GOG_ComponentBasicConfigs_checkExecutePart(this, GOG_ComponentBasicConfigs_Component_Structure_FormInput_value_parts.Value.name , false) ,
                GOG_ComponentBasicConfigs_checkExecutePart(this, null) ,
            ]
        });
    }

    return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
}





/// ----------------------------------------------------
/// PART: component > Structure > FromInput
/// ----------------------------------------------------
export const GOG_ComponentBasicProps_Component_Structure_FormInput_Value = {
    prop_name :               "prop_name" ,
    prop_value :              "prop_value" ,
    prop_isDisable :          "prop_isDisable" ,
} as const

export const GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys = {
    [GOG_ComponentBasicProps_Component_Structure_FormInput_Value.prop_name]: {
        name:               GOG_ComponentBasicProps_Component_Structure_FormInput_Value.prop_name ,
        value:              GOG_SetValue<string | null>(null),
    } ,
    [GOG_ComponentBasicProps_Component_Structure_FormInput_Value.prop_value]: {
        name:               GOG_ComponentBasicProps_Component_Structure_FormInput_Value.prop_value ,
        value:              GOG_SetValue<string |boolean | number | null | Object  >(false),
    } ,
    [GOG_ComponentBasicProps_Component_Structure_FormInput_Value.prop_isDisable]: {
        name:               GOG_ComponentBasicProps_Component_Structure_FormInput_Value.prop_isDisable ,
        value:              GOG_SetValue<boolean>(false),
    } ,
} as const

export const GOG_ComponentBasicConfigs_Component_Structure_FormInput_value_parts = {
    Value: {
        name:               "part-component-structure-formInput-value"
    } ,
} as const

export function GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Pattern(ctx: ComponentBase<any, any, any, any>){
    return {
        [GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_name.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_name.name,
            default:                                          GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_name.value,
            title:                                            Language.translate("components.public.props.prop_name.title"),
            description:                                      Language.translate("components.public.props.prop_name.description"),
        } ,
        [GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name,
            default:                                          GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.value,
            title:                                            Language.translate("components.public.props.prop_value.title"),
            description:                                      Language.translate("components.public.props.prop_value.description"),
        } ,
        [GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name,
            default:                                          GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.value,
            title:                                            Language.translate("components.public.props.prop_isDisable.title"),
            description:                                      Language.translate("components.public.props.prop_isDisable.description"),
        } ,
    }
};

export function GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Schema(ctx: ComponentBase<any, any, any, any>){
    return {
        Value: {
            part:                                             GOG_ComponentBasicConfigs_Component_Structure_FormInput_value_parts.Value.name ,
            method:                                           GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_render,
            title:                                            Language.translate("components.public.schema.component_structure_formInput_value.title"),
            description:                                      Language.translate("components.public.schema.component_structure_formInput_value.description"),
            props:                                            [
                ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_name.name] ,
                ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name] ,
                ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name] ,
            ].filter((prop): prop is IComponentProp<any> => prop !== undefined) ,
        }
    }
}

export function GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_render(attrsDefault: ComponentAttrsDefault, data: any, extra: any) : ReactiveElement{

    if (data != null) {

        const prop_name=       data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_name.name];
        const prop_value=      data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name];
        const prop_isDisable=  data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name];

        return Observable.conditionWhen(
            prop_isDisable ,
            (isDisabled) => isDisabled ,
            () =>  GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault),
            () => ReactiveElement.part(  "input" ,{
                attrs: {
                    ...attrsDefault ,
                    type: "hidden" ,
                },
                attrsBind: {
                    name:   prop_name ,
                    value:  prop_value.map(
                        (v: string | boolean | number | null | Object)=>{
                            if (typeof v == "string"){

                            }
                            else if (typeof v == "object"){
                                return JSON.stringify(v);
                            }
                            else if (typeof v == "number"){
                                return v;
                            }
                            else if (typeof v == "boolean"){
                                if (v){
                                    return 1;
                                }
                                else {
                                    return 0;
                                }
                            }
                            else {
                                return ""
                            }
                        }
                    ) ,
                }
            }),
            this.getScope()
        ).get()

    }

    return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
}








/// ----------------------------------------------------
/// PART: component > Structure > FromInput > Label
/// ----------------------------------------------------
export const GOG_ComponentBasicProps_Component_Structure_FormInput_Label = {
    prop_labelShow :                             "prop_labelShow" ,

    prop_labelBackground :                       "prop_labelBackground" ,
    prop_labelRadius :                           "prop_labelRadius" ,
    prop_labelMinWidth :                         "prop_labelMinWidth" ,

    prop_labelTitle :                            "prop_labelTitle" ,
    prop_labelFor :                              "prop_labelFor" ,
    prop_labelStyle :                            "prop_labelStyle" ,
    prop_labelClass :                            "prop_labelClass" ,
    prop_labelColor :                            "prop_labelColor" ,

    prop_labelTooltipIcon :                      "prop_labelTooltipIcon" ,
    prop_labelTooltipDescription :               "prop_labelTooltipDescription" ,
    prop_labelTooltipBackground :                "prop_labelTooltipBackground" ,
    prop_labelTooltipColor :                     "prop_labelTooltipColor" ,
    prop_labelTooltipPosition :                  "prop_labelTooltipPosition" ,
    prop_labelTooltipDirection :                 "prop_labelTooltipDirection" ,
} as const

export enum ComponentLabel_TooltipPositionTypes{
    TOP=       "top",
    BOTTOM=    "bottom",
}

export const GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys = {
    [GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelShow]: {
        name:               GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelShow,
        value:              GOG_SetValue<boolean>(true),
    } ,

    [GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelBackground]: {
        name:               GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelBackground,
        value:              GOG_SetValue<CssColorVar | null>( Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1)),
    } ,
    [GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelRadius]: {
        name:               GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelRadius,
        value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M),
    } ,
    [GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelMinWidth]: {
        name:               GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelMinWidth,
        value:              GOG_SetValue<SizeUnitVar | CalcSizeUnitVar |null>(null),
    } ,

    [GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelTitle]: {
        name:               GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelTitle,
        value:              GOG_SetValue<string |null>(null) ,
    } ,
    [GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelFor]: {
        name:               GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelFor,
        value:              GOG_SetValue<string |null>(null) ,
    } ,
    [GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelStyle]: {
        name:               GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelStyle,
        value:              GOG_SetValue<Record<string, string>>({}) ,
    } ,
    [GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelClass]: {
        name:               GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelClass,
        value:              GOG_SetValue<string[]>( []) ,
    } ,
    [GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelColor]: {
        name:               GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelColor,
        value:              GOG_SetValue<CssColorVar | null>( Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1 )),
    } ,


    [GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelTooltipIcon]: {
        name:               GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelTooltipIcon,
        value:               GOG_SetValue<IconsType |null>(ToolsIcons.icon_exclamation_square({size: SIZES.M})) ,
    } ,
    [GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelTooltipDescription]: {
        name:               GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelTooltipDescription,
        value:              GOG_SetValue<string |null>(null) ,
    } ,
    [GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelTooltipBackground]: {
        name:               GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelTooltipBackground,
        value:              GOG_SetValue<CssColorVar | null>( Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1 )),
    } ,
    [GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelTooltipColor]: {
        name:               GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelTooltipColor,
        value:              GOG_SetValue<CssColorVar | null>( Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1 )),
    } ,
    [GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelTooltipPosition]: {
        name:               GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelTooltipPosition,
        value:              GOG_SetValue<SizeUnitVar | CalcSizeUnitVar | null>( SizeUnit(2.5 , UNITS.PERCENT)) ,
    } ,
    [GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelTooltipDirection]: {
        name:                GOG_ComponentBasicProps_Component_Structure_FormInput_Label.prop_labelTooltipDirection,
        value:               GOG_SetValue<GOG_ValueOf<typeof ComponentLabel_TooltipPositionTypes>>(ComponentLabel_TooltipPositionTypes.BOTTOM),
    } ,
} as const

export const GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_parts = {
    LABEL: {
        name:               "part-label"
    } ,
} as const

export function GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Pattern(ctx: ComponentBase<any, any, any, any>){
    return {
        [GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelShow.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelShow.name,
            default:                                          GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelShow.value,
            title:                                            Language.translate("components.label.prop.prop_labelShow.title"),
            description:                                      Language.translate("components.label.prop.prop_labelShow.description"),
        } ,

        [GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelBackground.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelBackground.name,
            default:                                          GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelBackground.value,
            title:                                            Language.translate("components.label.prop.prop_labelBackground.title"),
            description:                                      Language.translate("components.label.prop.prop_labelBackground.description"),
        } ,
        [GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelRadius.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelRadius.name,
            default:                                          GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelRadius.value,
            title:                                            Language.translate("components.label.prop.prop_labelRadius.title"),
            description:                                      Language.translate("components.label.prop.prop_labelRadius.description"),
        } ,
        [GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelMinWidth.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelMinWidth.name,
            default:                                          GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelMinWidth.value,
            title:                                            Language.translate("components.label.prop.prop_labelMinWidth.title"),
            description:                                      Language.translate("components.label.prop.prop_labelMinWidth.description"),
        } ,

        [GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTitle.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTitle.name,
            default:                                          GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTitle.value,
            title:                                            Language.translate("components.label.prop.prop_labelTitle.title"),
            description:                                      Language.translate("components.label.prop.prop_labelTitle.description"),
        } ,
        [GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelFor.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelFor.name,
            default:                                          GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelFor.value,
            title:                                            Language.translate("components.label.prop.prop_labelFor.title"),
            description:                                      Language.translate("components.label.prop.prop_labelFor.description"),
        } ,
        [GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelStyle.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelStyle.name,
            default:                                          GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelStyle.value,
            title:                                            Language.translate("components.label.prop.prop_labelStyle.title"),
            description:                                      Language.translate("components.label.prop.prop_labelStyle.description"),
        } ,
        [GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelClass.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelClass.name,
            default:                                          GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelClass.value,
            title:                                            Language.translate("components.label.prop.prop_labelClass.title"),
            description:                                      Language.translate("components.label.prop.prop_labelClass.description"),
        } ,
        [GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelColor.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelColor.name,
            default:                                          GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelColor.value,
            title:                                            Language.translate("components.label.prop.prop_labelColor.title"),
            description:                                      Language.translate("components.label.prop.prop_labelColor.description"),
        } ,


        [GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipIcon.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipIcon.name,
            default:                                          GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipIcon.value,
            title:                                            Language.translate("components.label.prop.prop_labelTooltipIcon.title"),
            description:                                      Language.translate("components.label.prop.prop_labelTooltipIcon.description"),
        } ,
        [GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipDescription.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipDescription.name,
            default:                                          GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipDescription.value,
            title:                                            Language.translate("components.label.prop.prop_labelTooltipDescription.title"),
            description:                                      Language.translate("components.label.prop.prop_labelTooltipDescription.description"),
        } ,
        [GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipBackground.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipBackground.name,
            default:                                          GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipBackground.value,
            title:                                            Language.translate("components.label.prop.prop_labelTooltipBackground.title"),
            description:                                      Language.translate("components.label.prop.prop_labelTooltipBackground.description"),
        } ,
        [GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipColor.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipColor.name,
            default:                                          GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipColor.value,
            title:                                            Language.translate("components.label.prop.prop_labelTooltipColor.title"),
            description:                                      Language.translate("components.label.prop.prop_labelTooltipColor.description"),
        } ,
        [GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipPosition.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipPosition.name,
            default:                                          GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipPosition.value,
            title:                                            Language.translate("components.label.prop.prop_labelTooltipPosition.title"),
            description:                                      Language.translate("components.label.prop.prop_labelTooltipPosition.description"),
        } ,
        [GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipDirection.name]: {
            prop:                                             GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipDirection.name,
            default:                                          GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipDirection.value,
            title:                                            Language.translate("components.label.prop.prop_labelTooltipDirection.title"),
            description:                                      Language.translate("components.label.prop.prop_labelTooltipDirection.description"),
        } ,
    }
};

export function GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_Schema(ctx: ComponentBase<any, any, any, any>){
    return {
        LABEL: {
            part:                                             GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_parts.LABEL.name ,
            method:                                           GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_render,
            title:                                            Language.translate("components.public.schema.label.title"),
            description:                                      Language.translate("components.public.schema.label.description"),
            props:                                            [
                ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelShow.name] ,
                ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelBackground.name] ,
                ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelRadius.name] ,
                ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelMinWidth.name] ,
                ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTitle.name] ,
                ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelFor.name] ,
                ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelStyle.name] ,
                ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelClass.name] ,
                ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelColor.name] ,
                ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipIcon.name] ,
                ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipDescription.name] ,
                ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipBackground.name] ,
                ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipColor.name] ,
                ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipPosition.name] ,
                ctx._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTooltipDirection.name] ,
            ].filter((prop): prop is IComponentProp<any> => prop !== undefined) ,
        }
    }
}

export function GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_render(attrsDefault: ComponentAttrsDefault, data: any, extra: any) : ReactiveElement{
    if (data != null) {

        const prop_labelShow =           data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelShow.name];
        const prop_labelTitle =          data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_keys.prop_labelTitle.name];

        if (prop_labelShow && prop_labelTitle.get()){
            return  new ToolsComponents.ComponentLabel(
                <any>{
                    classList: []  ,
                    styles: {}  ,
                    ...data
                } ,
                <any>{
                    fn_onClickLabel: function(this: ComponentBase<any, any, any, any>, event: Event, dataArgs:any, componentArgs:any) {
                        (dataArgs as any).IS_DISABLE = this.get(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_isDisable.name);
                        if (typeof (this as any).pr_onClickLabel == "function") (this as any).pr_onClickLabel(event , dataArgs , componentArgs)
                    }
                }
            ).getReactiveElement();
        }

    }

    return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
}







/// ----------------------------------------------------
/// PART: component > Structure > FromInput > icon
/// ----------------------------------------------------
export const GOG_ComponentBasicProps_Component_Structure_FormInput_Icon = {

} as const

export const GOG_ComponentBasicConfigs_Component_Structure_FormInput_Icon_keys = {

} as const

export const GOG_ComponentBasicConfigs_Component_Structure_FormInput_Icon_parts = {

} as const

export function GOG_ComponentBasicConfigs_Component_Structure_FormInput_Icon_Pattern(ctx: ComponentBase<any, any, any, any>){
    return {

    }
};

export function GOG_ComponentBasicConfigs_Component_Structure_FormInput_Icon_Schema(ctx: ComponentBase<any, any, any, any>){
    return {

    }
}

export function GOG_ComponentBasicConfigs_Component_Structure_FormInput_Icon_render(attrsDefault: ComponentAttrsDefault, data: any, extra: any) : ReactiveElement{

    if (data != null) {

    }

    return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
}








/// ----------------------------------------------------
/// PART: component > Structure > FromInput > input
/// ----------------------------------------------------
export const GOG_ComponentBasicProps_Component_Structure_FormInput_Input = {

} as const

export const GOG_ComponentBasicConfigs_Component_Structure_FormInput_Input_keys = {

} as const

export const GOG_ComponentBasicConfigs_Component_Structure_FormInput_Input_parts = {

} as const

export function GOG_ComponentBasicConfigs_Component_Structure_FormInput_Input_Pattern(ctx: ComponentBase<any, any, any, any>){
    return {

    }
};

export function GOG_ComponentBasicConfigs_Component_Structure_FormInput_Input_Schema(ctx: ComponentBase<any, any, any, any>){
    return {

    }
}

export function GOG_ComponentBasicConfigs_Component_Structure_FormInput_Input_render(attrsDefault: ComponentAttrsDefault, data: any, extra: any) : ReactiveElement{

    if (data != null) {

    }

    return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
}

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
    GOG_ComponentBasicConfigs_Component_Structure_keys,
    GOG_ComponentBasicConfigs_Component_Structure_parts,
    GOG_ComponentBasicConfigs_Component_Structure_Pattern, GOG_ComponentBasicConfigs_Component_Structure_Schema,
    GOG_ComponentBasicProps_Component,
    GOG_ComponentBasicProps_Component_Structure,
} from "../../core/component/SetupComponent";
import {Observable} from "../../core/Observable";




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
    prop_borderWidth :                    "prop_borderWidth" ,
    prop_borderRadius :                   "prop_borderRadius" ,
    prop_borderOpacity :                  "prop_borderOpacity" ,
    prop_borderArrowType :                "prop_borderArrowType" ,
    prop_borderArrowWidth :               "prop_borderArrowWidth" ,
    prop_borderArrowPosition :            "prop_borderArrowPosition" ,
    prop_minWidth :                       "prop_minWidth" ,
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
        [ComponentBorderProps.prop_borderWidth]: {
            name:               ComponentBorderProps.prop_borderWidth ,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M),
        } ,
        [ComponentBorderProps.prop_borderRadius]: {
            name:               ComponentBorderProps.prop_borderRadius ,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M),
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
        CLICK_OPTION: {
            name:                      "fn_onClickOption" ,
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

export type ComponentBorder_Methods_Click_OPTION_ComponentArgs =   GOG_ExtractName<typeof ComponentBorderConfigs.methods.CLICK_OPTION.componentArgs>
export type ComponentBorder_Methods_Click_OPTION_DataArgs =        GOG_ExtractNameValue<typeof ComponentBorderConfigs.methods.CLICK_OPTION.dataArgs>

export type ComponentBorderMethodsType = {
    [ComponentBorderConfigs.methods.CLICK_BORDER.name]: ComponentCallBackType<ComponentBorder_Methods_CLICK_BORDER_ComponentArgs , ComponentBorder_Methods_CLICK_BORDER_DataArgs>
    [ComponentBorderConfigs.methods.CLICK_OPTION.name]: ComponentCallBackType<ComponentBorder_Methods_Click_OPTION_ComponentArgs , ComponentBorder_Methods_Click_OPTION_DataArgs>
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
        [ComponentBorderConfigs.keys.prop_borderWidth.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_borderWidth.name,
            default:                                          ComponentBorderConfigs.keys.prop_borderWidth.value,
            title:                                            Language.translate("components.border.prop.prop_borderWidth.title"),
            description:                                      Language.translate("components.border.prop.prop_borderWidth.description"),
        } ,
        [ComponentBorderConfigs.keys.prop_borderRadius.name]: {
            prop:                                             ComponentBorderConfigs.keys.prop_borderRadius.name,
            default:                                          ComponentBorderConfigs.keys.prop_borderRadius.value,
            title:                                            Language.translate("components.border.prop.prop_borderRadius.title"),
            description:                                      Language.translate("components.border.prop.prop_borderRadius.description"),
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
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderRadius.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderOpacity.name] ,
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_borderWidth.name] ,
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
                this._COMPONENT_PATTERN[ComponentBorderConfigs.keys.prop_minWidth.name] ,
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
        [ComponentBorderConfigs.methods.CLICK_OPTION.name]: {
            title:                                            Language.translate("components.border.methods.fn_onClickOption.title"),
            description:                                      Language.translate("components.border.methods.fn_onClickOption.description"),
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

                prop_show :               true ,
                prop_content:             "content test  " ,
                prop_borderArrowType:     "top" ,
                //prop_borderArrowPosition: 50 ,
                prop_borderArrowWidth:    10 ,
                //prop_borderWidth:        SIZES.XXL ,
                prop_borderColor:                    Color(COLORS_MAIN.WARNING , COLORS_GRAD.GRADE_1) ,
                prop_borderColor_hover:              Color(COLORS_MAIN.DARK , COLORS_GRAD.GRADE_1) ,
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
        methods: ComponentBorderMethodsType
    ) {
        super("border" , null);
        super.renderComponent(config , methods);
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
            const prop_borderArrowType=                 data[ComponentBorderConfigs.keys.prop_borderArrowType.name];
            const prop_borderArrowWidth=                data[ComponentBorderConfigs.keys.prop_borderArrowWidth.name];
            const prop_borderArrowPosition=             data[ComponentBorderConfigs.keys.prop_borderArrowPosition.name];
            const prop_borderRadius =                   data[ComponentBorderConfigs.keys.prop_borderRadius.name];
            const prop_borderOpacity =                  data[ComponentBorderConfigs.keys.prop_borderOpacity.name];
            const prop_borderColor =                    data[ComponentBorderConfigs.keys.prop_borderColor.name];
            const prop_borderColor_hover =              data[ComponentBorderConfigs.keys.prop_borderColor_hover.name];
            const prop_borderWidth =                    data[ComponentBorderConfigs.keys.prop_borderWidth.name];
            const prop_borderClass=                     data[ComponentBorderConfigs.keys.prop_borderClass.name];
            const prop_borderStyles=                    data[ComponentBorderConfigs.keys.prop_borderStyles.name];
            const prop_borderType=                      data[ComponentBorderConfigs.keys.prop_borderType.name];
            const prop_content=                         data[ComponentBorderConfigs.keys.prop_content.name];
            const prop_contentSize=                     data[ComponentBorderConfigs.keys.prop_contentSize.name];
            const prop_contentColor=                    data[ComponentBorderConfigs.keys.prop_contentColor.name];
            const prop_contentColor_hover=              data[ComponentBorderConfigs.keys.prop_contentColor_hover.name];
            const prop_contentBackgroundColor=          data[ComponentBorderConfigs.keys.prop_contentBackgroundColor.name];
            const prop_contentBackgroundColor_hover=    data[ComponentBorderConfigs.keys.prop_contentBackgroundColor_hover.name];
            const prop_minWidth =                       data[ComponentBorderConfigs.keys.prop_minWidth.name];

            const directionRtl =     AppConfig.get("directionRtl");
            const elFontSize =       ToolsCss.getFontSize(prop_contentSize.get());
            const elHeight =         ToolsCss.getHeightSize(prop_contentSize.get());
            const elLineHeight =     ToolsCss.getLineHeightSize(prop_contentSize.get());

            let borderArrow = `
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
            `;
           /* switch (prop_borderArrowType.get()){
                case ComponentBorder_ArrowTypes.TOP:
                    borderArrow = `
#${attrsDefault?.id}:after{
   content:                                    "";
   position:                                   absolute;
   ${directionRtl? "right" : "left"}:          ${prop_borderArrowPosition.get()};
   top:                                        -${prop_borderArrowWidth.get()}px;
   width:                                      0px;
   height:                                     0px;
   border-style:                               solid;
   border-width:                               ${prop_borderArrowWidth.get()}px ${(2/3)*prop_borderArrowWidth.get()}px 0 ${(2/3)*prop_borderArrowWidth.get()}px;
   border-color:                               ${prop_borderColor.get()} transparent transparent transparent;
   transform:                                  translate(${directionRtl ? "50%" : "-50%"} , 0) rotate(180deg);
}
                    `
                    break;
                case ComponentBorder_ArrowTypes.BOTTOM:
                    borderArrow = `
#${attrsDefault?.id}:after{
   content:                                    "";
   position:                                   absolute;
   ${directionRtl? "right" : "left"}:          ${prop_borderArrowPosition.get()};
   bottom:                                     -${prop_borderArrowWidth.get()}px;
   width:                                      0px;
   height:                                     0px;
   border-style:                               solid;
   border-width:                               ${prop_borderArrowWidth.get()}px ${(2/3)*prop_borderArrowWidth.get()}px 0 ${(2/3)*prop_borderArrowWidth.get()}px;
   border-color:                               ${prop_borderColor.get()} transparent transparent transparent;
   transform:                                  translate(${directionRtl ? "50%" : "-50%"} , 0) rotate(0deg);
}
                    `
                    break;
                case ((directionRtl && ComponentBorder_ArrowTypes.LEFT) || (!directionRtl && ComponentBorder_ArrowTypes.RIGHT)):
                    borderArrow = `
#${attrsDefault?.id}:after{
   content:                                   "";
   position:                                  absolute;
   top:                                       ${prop_borderArrowPosition.get()};
   ${directionRtl? "left" : "right"}:         -${prop_borderArrowWidth.get()}px;
   width:                                     0;
   height:                                    0;
   border-style:                              solid;
   border-width:                               ${(2/3)*prop_borderArrowWidth.get()}px 0 ${(2/3)*prop_borderArrowWidth.get()}px ${prop_borderArrowWidth.get()}px;
   border-color:                               transparent transparent transparent ${prop_borderColor.get()};
   transform:                                  translate(0 , -50%)  ${directionRtl ? "rotate(180deg)" : ""};
}
                    `
                    break;
                case ((directionRtl && ComponentBorder_ArrowTypes.RIGHT) || (!directionRtl && ComponentBorder_ArrowTypes.LEFT)):
                    borderArrow = `
#${attrsDefault?.id}:after{
   content:                                    "";
   position:                                   absolute;
   top:                                        ${prop_borderArrowPosition.get()};
   ${directionRtl? "right" : "left"}:          -${prop_borderArrowWidth.get()}px;
   width:                                      0;
   height:                                     0;
   border-style:                               solid;
   border-width:                              ${(2/3)*prop_borderArrowWidth.get()}px ${prop_borderArrowWidth.get()}px ${(2/3)*prop_borderArrowWidth.get()}px 0;
   border-color:                              transparent ${prop_borderColor.get()} transparent transparent;
   transform:                                 translate(0 , -50%) ${directionRtl ? "rotate(180deg)" : ""};
}
                    `
                    break;
            }*/

            return ReactiveElement.part(
                "section" ,
                {
                    attrs: {
                       ...attrsDefault
                    },
                    stylesCustom: borderArrow ,
                    styles: {

                        transition: "background-color 1000ms ease , color 1000ms ease , border-color 1000ms ease",

                    //    height:       `${elHeight}px` ,
                        lineHeight:   `${elLineHeight}px` ,
                        fontSize:     `${elFontSize}px`
                    } ,
                    stylesBind: (el) => ({
                        "--arrow-content" :
                            Observable.computed(( arrowType) => {
                                    if (arrowType != null){
                                        return "''"
                                    }
                                    return null;
                                },
                                [ prop_borderArrowType]
                            ) ,

                        "--arrow-left" :
                            Observable.computed(( type , arrowPosition , arrowWith) => {
                                    if (!directionRtl && (type == ComponentBorder_ArrowTypes.TOP || type == ComponentBorder_ArrowTypes.BOTTOM) ){
                                        return arrowPosition
                                    }
                                    else if (directionRtl && type == ComponentBorder_ArrowTypes.LEFT){
                                        return SizeUnit(-arrowWith , UNITS.PEXEL)
                                    }
                                    else if (!directionRtl && type == ComponentBorder_ArrowTypes.LEFT) {
                                        return SizeUnit(-arrowWith , UNITS.PEXEL)
                                    }

                                    return null;
                                },
                                [prop_borderArrowType , prop_borderArrowPosition ,  prop_borderArrowWidth]
                            ) ,

                        "--arrow-right" :
                            Observable.computed(( type , arrowPosition , arrowWith) => {
                                    if (directionRtl && (type == ComponentBorder_ArrowTypes.TOP || type == ComponentBorder_ArrowTypes.BOTTOM) ){
                                        return arrowPosition
                                    }
                                    else if (!directionRtl && type == ComponentBorder_ArrowTypes.RIGHT){
                                        return SizeUnit(-arrowWith , UNITS.PEXEL)
                                    }
                                    else if (directionRtl && type == ComponentBorder_ArrowTypes.RIGHT){
                                        return SizeUnit(-arrowWith , UNITS.PEXEL)
                                    }
                                    return null;
                                },
                                [prop_borderArrowType , prop_borderArrowPosition ,  prop_borderArrowWidth]
                            ) ,

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
                                [prop_borderArrowType , prop_borderArrowPosition ,  prop_borderArrowWidth]
                            ) ,

                        "--arrow-bottom" :
                            Observable.computed(( type  , arrowWith) => {
                                    if ( type == ComponentBorder_ArrowTypes.BOTTOM ){
                                        return SizeUnit(-arrowWith , UNITS.PEXEL)
                                    }
                                    return null;
                                },
                                [prop_borderArrowType  ,  prop_borderArrowWidth]
                            ) ,

                        "--arrow-border-width" :
                            Observable.computed(( type  , arrowWith) => {
                                    if ( type == ComponentBorder_ArrowTypes.TOP || type == ComponentBorder_ArrowTypes.BOTTOM){
                                        return `${SizeUnit(arrowWith , UNITS.PEXEL)}  ${SizeUnit(arrowWith*(2/3) , UNITS.PEXEL)}  0  ${SizeUnit(arrowWith*(2/3) , UNITS.PEXEL)}`;
                                    }
                                    else if ( (directionRtl && type == ComponentBorder_ArrowTypes.LEFT) || (!directionRtl && type == ComponentBorder_ArrowTypes.RIGHT) ){
                                        return `${SizeUnit(arrowWith*(2/3) , UNITS.PEXEL)}   0   ${SizeUnit(arrowWith*(2/3) , UNITS.PEXEL)}   ${SizeUnit(arrowWith , UNITS.PEXEL)}`;
                                    }
                                    else if ((directionRtl && type == ComponentBorder_ArrowTypes.RIGHT) || (!directionRtl && type == ComponentBorder_ArrowTypes.LEFT) ){
                                        return `${SizeUnit(arrowWith*(2/3) , UNITS.PEXEL)}  ${SizeUnit(arrowWith , UNITS.PEXEL)}  ${SizeUnit(arrowWith*(2/3) , UNITS.PEXEL)}  0`;
                                    }
                                    return null;
                                },
                                [prop_borderArrowType  ,  prop_borderArrowWidth]
                            ) ,

                        "--arrow-border-color" : el.hover.mapList({
                            true:           Observable.computed(( type  , borderColor) => {
                                    if ( type == ComponentBorder_ArrowTypes.TOP || type == ComponentBorder_ArrowTypes.BOTTOM){
                                        return `${borderColor} transparent transparent transparent`;
                                    }
                                    else if ( (directionRtl && type == ComponentBorder_ArrowTypes.LEFT) || (!directionRtl && type == ComponentBorder_ArrowTypes.RIGHT) ){
                                        return `transparent transparent transparent ${borderColor}`;
                                    }
                                    else if ((directionRtl && type == ComponentBorder_ArrowTypes.RIGHT) || (!directionRtl && type == ComponentBorder_ArrowTypes.LEFT) ){
                                        return `transparent ${borderColor} transparent transparent`;
                                    }
                                    return null;
                                },
                                [prop_borderArrowType  ,  prop_borderColor_hover]
                            ),
                            false:          Observable.computed(( type  , borderColor) => {
                                    if ( type == ComponentBorder_ArrowTypes.TOP || type == ComponentBorder_ArrowTypes.BOTTOM){
                                        return `${borderColor} transparent transparent transparent`;
                                    }
                                    else if ( (directionRtl && type == ComponentBorder_ArrowTypes.LEFT) || (!directionRtl && type == ComponentBorder_ArrowTypes.RIGHT) ){
                                        return `transparent transparent transparent ${borderColor}`;
                                    }
                                    else if ((directionRtl && type == ComponentBorder_ArrowTypes.RIGHT) || (!directionRtl && type == ComponentBorder_ArrowTypes.LEFT) ){
                                        return `transparent ${borderColor} transparent transparent`;
                                    }
                                    return null;
                                },
                                [prop_borderArrowType  ,  prop_borderColor]
                            )
                        }) ,




                        "--arrow-transform" :
                            Observable.computed(( type  ) => {
                                    if ( type == ComponentBorder_ArrowTypes.TOP){
                                        return `translate(${directionRtl ? "50%" : "-50%"} , 0) rotate(180deg)`;
                                    }
                                    if ( type == ComponentBorder_ArrowTypes.BOTTOM){
                                        return `translate(${directionRtl ? "50%" : "-50%"} , 0) rotate(0deg)`;
                                    }
                                    else if ( (directionRtl && type == ComponentBorder_ArrowTypes.LEFT) || (!directionRtl && type == ComponentBorder_ArrowTypes.RIGHT) ){
                                        return `translate(0 , -50%)  ${directionRtl ? "rotate(180deg)" : ""}`;
                                    }
                                    else if ((directionRtl && type == ComponentBorder_ArrowTypes.RIGHT) || (!directionRtl && type == ComponentBorder_ArrowTypes.LEFT) ){
                                        return `translate(0 , -50%) ${directionRtl ? "rotate(180deg)" : ""}`;
                                    }
                                    return null;
                                },
                                [prop_borderArrowType  ]
                            ) ,





                        prop_borderStyles ,
                        minWidth:         prop_minWidth ,
                        borderStyle:      prop_borderType ,
                        borderWidth:      prop_borderWidth.map(
                            v=>{
                                if (typeof v == "string" && ToolsCss.checkExistSizeSelected(v)){
                                    return ToolsComponents_BorderWidth[v];
                                }
                                else if (typeof v == "number"){
                                    return v + "px";
                                }
                                return null;
                            }
                        ) ,


                        borderRadius: prop_borderRadius.map(
                            v=>{
                                if (typeof v == "string" && ToolsCss.checkExistSizeSelected(v)){
                                    return ToolsComponents_BorderRadius[v];
                                }
                                else if (typeof v == "number"){
                                    return v + "px";
                                }
                                return null;
                            }
                        ) ,


                        opacity:         prop_borderOpacity.map(
                            v=>{
                                return v/100
                            }
                        ) ,


                        borderColor:
                            Observable.computed(( color , colorHover) => {

                                const hoverValue = el.hover.get();
                                if (colorHover){
                                    return hoverValue ? colorHover : color
                                }

                                return color;
                            }, [ prop_borderColor , prop_borderColor_hover , el.hover]),

                        color:
                            Observable.computed(( color , colorHover) => {

                                const hoverValue = el.hover.get();
                                if (colorHover){
                                    return hoverValue ? colorHover : color
                                }

                                return color;
                            }, [ prop_contentColor , prop_contentColor_hover , el.hover]),

                        backgroundColor:
                            Observable.computed(( color , colorHover) => {

                                const hoverValue = el.hover.get();
                                if (colorHover){
                                    return hoverValue ? colorHover : color
                                }

                                return color;
                            }, [ prop_contentBackgroundColor , prop_contentBackgroundColor_hover , el.hover]),


                    }) ,
                    className: ["p-0"] ,
                    classBind: [
                        prop_borderClass
                    ] ,
                    on: {
                        click: (event: Event) => {
                            const params : ComponentBorder_Methods_CLICK_BORDER_DataArgs = {}
                            this.executeMethod(ComponentBorderConfigs.methods.CLICK_BORDER.name  , event , params);
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

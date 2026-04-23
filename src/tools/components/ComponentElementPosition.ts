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
    ToolsComponents_BorderWidth, TranslateUnit, UNITS
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
import {ComponentBorder_ArrowTypes} from "./ComponentBorder";




export const ComponentElementPositionProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    prop_content :                        "prop_content" ,

    prop_positionClass :                  "prop_positionClass" ,
    prop_positionStyles :                 "prop_positionStyles" ,
    prop_positionWidth :                  "prop_positionWidth" ,
    prop_positionHeight :                 "prop_positionHeight" ,

    prop_positionType :                   "prop_positionType" ,
    prop_positionTop :                    "prop_positionTop" ,
    prop_positionBottom :                 "prop_positionBottom" ,
    prop_positionRight :                  "prop_positionRight" ,
    prop_positionLeft :                   "prop_positionLeft" ,
    prop_positionStart :                  "prop_positionStart" ,
    prop_positionEnd :                    "prop_positionEnd" ,

    prop_positionTranslate :              "prop_positionTranslate" ,
    prop_positionZIndex :                 "prop_positionZIndex" ,
} as const;

export enum ComponentElementPosition_positionTypes{
    STATIC=      "static",
    FIX=         "fix",
    RELATIVE=    "relative",
    ABSOLUTE=    "absolute",
}

const ComponentElementPositionConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys ,
        ///----------------------
        [ComponentElementPositionProps.prop_content]:{
            name:                       ComponentElementPositionProps.prop_content  ,
            value:                      GOG_SetValue<string[]>([]) ,
        } ,
        [ComponentElementPositionProps.prop_positionStyles]:{
            name:                        ComponentElementPositionProps.prop_positionStyles  ,
            value:                       GOG_SetValue<Record<string, string>>({}) ,
        } ,
        [ComponentElementPositionProps.prop_positionClass]:{
            name:                        ComponentElementPositionProps.prop_positionClass  ,
            value:                       GOG_SetValue<string | null |ReactiveElement[]>(null),
        } ,
        [ComponentElementPositionProps.prop_positionWidth] : {
            name:                        ComponentElementPositionProps.prop_positionWidth,
            value:                       GOG_SetValue<SizeUnit | SizeCalc | null>(SizeUnit(100 , UNITS.PERCENT)),
        } ,
        [ComponentElementPositionProps.prop_positionHeight] : {
            name:                        ComponentElementPositionProps.prop_positionHeight,
            value:                       GOG_SetValue<SizeUnit | SizeCalc | null>(SizeUnit(200 , UNITS.PEXEL)),
        } ,

        [ComponentElementPositionProps.prop_positionType]:{
            name:                        ComponentElementPositionProps.prop_positionType  ,
            value:                       GOG_SetValue<GOG_ValueOf<typeof ComponentElementPosition_positionTypes>>(ComponentElementPosition_positionTypes.ABSOLUTE),
        }  ,
        [ComponentElementPositionProps.prop_positionTop] : {
            name:                        ComponentElementPositionProps.prop_positionTop,
            value:                       GOG_SetValue<SizeUnit | SizeCalc | null>(null),
        } ,
        [ComponentElementPositionProps.prop_positionBottom] : {
            name:                        ComponentElementPositionProps.prop_positionBottom,
            value:                       GOG_SetValue<SizeUnit | SizeCalc | null>(null),
        } ,
        [ComponentElementPositionProps.prop_positionRight] : {
            name:                        ComponentElementPositionProps.prop_positionRight,
            value:                       GOG_SetValue<SizeUnit | SizeCalc | null>(null),
        } ,
        [ComponentElementPositionProps.prop_positionLeft] : {
            name:                        ComponentElementPositionProps.prop_positionLeft,
            value:                       GOG_SetValue<SizeUnit | SizeCalc | null>(null),
        } ,
        [ComponentElementPositionProps.prop_positionStart] : {
            name:                        ComponentElementPositionProps.prop_positionStart,
            value:                       GOG_SetValue<SizeUnit | SizeCalc | null>(null),
        } ,
        [ComponentElementPositionProps.prop_positionEnd] : {
            name:                        ComponentElementPositionProps.prop_positionEnd,
            value:                       GOG_SetValue<SizeUnit | SizeCalc | null>(null),
        } ,

        [ComponentElementPositionProps.prop_positionTranslate] : {
            name:                        ComponentElementPositionProps.prop_positionTranslate,
            value:                       GOG_SetValue<TranslateUnit | null>(null),
        } ,
        [ComponentElementPositionProps.prop_positionZIndex] : {
            name:                        ComponentElementPositionProps.prop_positionZIndex,
            value:                       GOG_SetValue<number | null>(null),
        } ,
    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_Component_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts ,
        POSITION: {
            name:                       "part-position"
        } ,
    } ,
    templates: {
        BODY: {
            name:                       "body"
        } ,
    } ,
    methods: {
        CLICK: {
            name:                       "fn_onClick" ,
            dataArgs: {},
            componentArgs: {}
        },
    }
} as const



export type ComponentElementPositionPropsType =        GOG_ExtractNameValue<typeof ComponentElementPositionConfigs.keys>
export type ComponentElementPositionSchemaType =       GOG_ExtractName<typeof ComponentElementPositionConfigs.schemas>
export type ComponentElementPositionTemplatesType =    GOG_ExtractName<typeof ComponentElementPositionConfigs.templates>


export type ComponentElementPosition_Methods_CLICK_ComponentArgs =   GOG_ExtractName<typeof ComponentElementPositionConfigs.methods.CLICK.componentArgs>
export type ComponentElementPosition_Methods_CLICK_DataArgs =        GOG_ExtractNameValue<typeof ComponentElementPositionConfigs.methods.CLICK.dataArgs>

export type ComponentElementPositionMethodsType = {
    [ComponentElementPositionConfigs.methods.CLICK.name]: ComponentCallBackType<ComponentElementPosition_Methods_CLICK_ComponentArgs , ComponentElementPosition_Methods_CLICK_DataArgs>
}


export abstract class ComponentElementPositionBase extends ComponentBase<
    ComponentElementPositionPropsType ,
    ComponentElementPositionSchemaType ,
    ComponentElementPositionTemplatesType ,
    ComponentElementPositionMethodsType
    > {


    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN=  defineComponentPatterns<ComponentElementPositionPropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this) ,
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this) ,
            [ComponentElementPositionConfigs.keys.prop_content.name]: {
                prop:                                             ComponentElementPositionConfigs.keys.prop_content.name,
                default:                                          ComponentElementPositionConfigs.keys.prop_content.value,
                title:                                            Language.translate("components.element_position.props.prop_content.title"),
                description:                                      Language.translate("components.element_position.props.prop_content.description"),
            } ,

            [ComponentElementPositionConfigs.keys.prop_positionClass.name]: {
                prop:                                             ComponentElementPositionConfigs.keys.prop_positionClass.name,
                default:                                          ComponentElementPositionConfigs.keys.prop_positionClass.value,
                title:                                            Language.translate("components.element_position.props.prop_positionClass.title"),
                description:                                      Language.translate("components.element_position.props.prop_positionClass.description"),
            } ,
            [ComponentElementPositionConfigs.keys.prop_positionStyles.name]: {
                prop:                                             ComponentElementPositionConfigs.keys.prop_positionStyles.name,
                default:                                          ComponentElementPositionConfigs.keys.prop_positionStyles.value,
                title:                                            Language.translate("components.element_position.props.prop_positionStyles.title"),
                description:                                      Language.translate("components.element_position.props.prop_positionStyles.description"),
            } ,
            [ComponentElementPositionConfigs.keys.prop_positionWidth.name]: {
                prop:                                             ComponentElementPositionConfigs.keys.prop_positionWidth.name,
                default:                                          ComponentElementPositionConfigs.keys.prop_positionWidth.value,
                title:                                            Language.translate("components.element_position.props.prop_positionWidth.title"),
                description:                                      Language.translate("components.element_position.props.prop_positionWidth.description"),
            } ,
            [ComponentElementPositionConfigs.keys.prop_positionHeight.name]: {
                prop:                                             ComponentElementPositionConfigs.keys.prop_positionHeight.name,
                default:                                          ComponentElementPositionConfigs.keys.prop_positionHeight.value,
                title:                                            Language.translate("components.element_position.props.prop_positionHeight.title"),
                description:                                      Language.translate("components.element_position.props.prop_positionHeight.description"),
            } ,

            [ComponentElementPositionConfigs.keys.prop_positionType.name]: {
                prop:                                             ComponentElementPositionConfigs.keys.prop_positionType.name,
                default:                                          ComponentElementPositionConfigs.keys.prop_positionType.value,
                title:                                            Language.translate("components.element_position.props.prop_positionType.title"),
                description:                                      Language.translate("components.element_position.props.prop_positionType.description"),
            } ,
            [ComponentElementPositionConfigs.keys.prop_positionTop.name]: {
                prop:                                             ComponentElementPositionConfigs.keys.prop_positionTop.name,
                default:                                          ComponentElementPositionConfigs.keys.prop_positionTop.value,
                title:                                            Language.translate("components.element_position.props.prop_positionTop.title"),
                description:                                      Language.translate("components.element_position.props.prop_positionTop.description"),
            } ,
            [ComponentElementPositionConfigs.keys.prop_positionBottom.name]: {
                prop:                                             ComponentElementPositionConfigs.keys.prop_positionBottom.name,
                default:                                          ComponentElementPositionConfigs.keys.prop_positionBottom.value,
                title:                                            Language.translate("components.element_position.props.prop_positionBottom.title"),
                description:                                      Language.translate("components.element_position.props.prop_positionBottom.description"),
            } ,
            [ComponentElementPositionConfigs.keys.prop_positionRight.name]: {
                prop:                                             ComponentElementPositionConfigs.keys.prop_positionRight.name,
                default:                                          ComponentElementPositionConfigs.keys.prop_positionRight.value,
                title:                                            Language.translate("components.element_position.props.prop_positionRight.title"),
                description:                                      Language.translate("components.element_position.props.prop_positionRight.description"),
            } ,
            [ComponentElementPositionConfigs.keys.prop_positionLeft.name]: {
                prop:                                             ComponentElementPositionConfigs.keys.prop_positionLeft.name,
                default:                                          ComponentElementPositionConfigs.keys.prop_positionLeft.value,
                title:                                            Language.translate("components.element_position.props.prop_positionLeft.title"),
                description:                                      Language.translate("components.element_position.props.prop_positionLeft.description"),
            } ,
            [ComponentElementPositionConfigs.keys.prop_positionStart.name]: {
                prop:                                             ComponentElementPositionConfigs.keys.prop_positionStart.name,
                default:                                          ComponentElementPositionConfigs.keys.prop_positionStart.value,
                title:                                            Language.translate("components.element_position.props.prop_positionStart.title"),
                description:                                      Language.translate("components.element_position.props.prop_positionStart.description"),
            } ,
            [ComponentElementPositionConfigs.keys.prop_positionEnd.name]: {
                prop:                                             ComponentElementPositionConfigs.keys.prop_positionEnd.name,
                default:                                          ComponentElementPositionConfigs.keys.prop_positionEnd.value,
                title:                                            Language.translate("components.element_position.props.prop_positionEnd.title"),
                description:                                      Language.translate("components.element_position.props.prop_positionEnd.description"),
            } ,


            [ComponentElementPositionConfigs.keys.prop_positionTranslate.name]: {
                prop:                                             ComponentElementPositionConfigs.keys.prop_positionTranslate.name,
                default:                                          ComponentElementPositionConfigs.keys.prop_positionTranslate.value,
                title:                                            Language.translate("components.element_position.props.prop_positionTranslate.title"),
                description:                                      Language.translate("components.element_position.props.prop_positionTranslate.description"),
            } ,
            [ComponentElementPositionConfigs.keys.prop_positionZIndex.name]: {
                prop:                                             ComponentElementPositionConfigs.keys.prop_positionZIndex.name,
                default:                                          ComponentElementPositionConfigs.keys.prop_positionZIndex.value,
                title:                                            Language.translate("components.element_position.props.prop_positionZIndex.title"),
                description:                                      Language.translate("components.element_position.props.prop_positionZIndex.description"),
            } ,
        }
    );


    /* ---------------------------------------------
        PROPERTYs Props
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentElementPositionSchemaType  , ComponentElementPositionPropsType>( {
        ...GOG_ComponentBasicConfigs_Component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this) ,
        [ComponentElementPositionConfigs.schemas.POSITION.name]: {
            part:                                              ComponentElementPositionConfigs.schemas.POSITION.name ,
            title:                                             Language.translate("components.element_position.schema.position.title") ,
            description:                                       Language.translate("components.button.element_position.position.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentElementPositionConfigs.keys.prop_content.name] ,

                this._COMPONENT_PATTERN[ComponentElementPositionConfigs.keys.prop_positionClass.name] ,
                this._COMPONENT_PATTERN[ComponentElementPositionConfigs.keys.prop_positionStyles.name] ,
                this._COMPONENT_PATTERN[ComponentElementPositionConfigs.keys.prop_positionWidth.name] ,
                this._COMPONENT_PATTERN[ComponentElementPositionConfigs.keys.prop_positionHeight.name] ,

                this._COMPONENT_PATTERN[ComponentElementPositionConfigs.keys.prop_positionType.name] ,
                this._COMPONENT_PATTERN[ComponentElementPositionConfigs.keys.prop_positionTop.name] ,
                this._COMPONENT_PATTERN[ComponentElementPositionConfigs.keys.prop_positionBottom.name] ,
                this._COMPONENT_PATTERN[ComponentElementPositionConfigs.keys.prop_positionRight.name] ,
                this._COMPONENT_PATTERN[ComponentElementPositionConfigs.keys.prop_positionLeft.name] ,
                this._COMPONENT_PATTERN[ComponentElementPositionConfigs.keys.prop_positionStart.name] ,
                this._COMPONENT_PATTERN[ComponentElementPositionConfigs.keys.prop_positionEnd.name] ,

                this._COMPONENT_PATTERN[ComponentElementPositionConfigs.keys.prop_positionTranslate.name] ,
                this._COMPONENT_PATTERN[ComponentElementPositionConfigs.keys.prop_positionZIndex.name] ,
            ]
        } ,
    });



    /* ---------------------------------------------
            PROPERTYs Pattern
         --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentElementPositionTemplatesType , ComponentElementPositionPropsType>({
        [ComponentElementPositionConfigs.templates.BODY.name]: {
            title:                                            Language.translate("components.element_position.template.body.title"),
            description:                                      Language.translate("components.element_position.template.body.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentElementPositionConfigs.keys.prop_content.name]
        } ,
    });



    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentElementPositionMethodsType , ComponentElementPositionPropsType>({
        [ComponentElementPositionConfigs.methods.CLICK.name]: {
            title:                                            Language.translate("components.element_position.methods.fn_onClick.title"),
            description:                                      Language.translate("components.element_position.methods.fn_onClick.description"),
            args: {}
        } ,
    });




    /* ---------------------------------------------
        Example
     --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {

        return  ReactiveElement.part(  "section" ,{
            className: [
                "col-md-3" , "col-12" , "border" , "p-2" , "position-relative"
            ],
            children: [
                new ComponentElementPosition(
                    <ComponentElementPositionPropsType>{
                        classList: []  ,

                        prop_positionTop:   SizeUnit(100 , UNITS.PEXEL) ,
                        prop_positionLeft:  SizeUnit(50 , UNITS.PEXEL) ,
                        prop_content: "Element Position"
                    } ,
                    <ComponentElementPositionMethodsType>{
                        fn_onClick: function (event, dataArgs : ComponentElementPosition_Methods_CLICK_DataArgs, componentArgs: ComponentElementPosition_Methods_CLICK_ComponentArgs) {
                            alert("asd");
                        }
                    }
                ).getReactiveElement()
            ]

        }).getElement();

    }

}


export class ComponentElementPosition extends ComponentElementPositionBase {

    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentElementPositionPropsType,
        methods: ComponentElementPositionMethodsType ,
        events = null
    ) {
        super("element-position", null);
        super.renderComponent(config, methods , events);
    }


    /* ---------------------------------------------
       TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentElementPositionConfigs.schemas.POSITION.name)
    }

    override renderManagerComponent(partName , attrsDefault , data , extra) :  ReactiveElement {
        switch (partName){
            case ComponentElementPositionConfigs.schemas.POSITION.name:
                return  this.template_render_position(attrsDefault , data , extra);
        }
    }



    private template_render_position(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_selectorContent =         data[ComponentElementPositionConfigs.keys.prop_content.name];

            const prop_positionClass =           data[ComponentElementPositionConfigs.keys.prop_positionClass.name];
            const prop_positionStyles =          data[ComponentElementPositionConfigs.keys.prop_positionStyles.name];
            const prop_positionWidth =           data[ComponentElementPositionConfigs.keys.prop_positionWidth.name];
            const prop_positionHeight =          data[ComponentElementPositionConfigs.keys.prop_positionHeight.name];

            const prop_positionType =            data[ComponentElementPositionConfigs.keys.prop_positionType.name];
            const prop_positionTop =             data[ComponentElementPositionConfigs.keys.prop_positionTop.name];
            const prop_positionBottom =          data[ComponentElementPositionConfigs.keys.prop_positionBottom.name];
            const prop_positionRight =           data[ComponentElementPositionConfigs.keys.prop_positionRight.name];
            const prop_positionLeft =            data[ComponentElementPositionConfigs.keys.prop_positionLeft.name];
            const prop_positionStart =           data[ComponentElementPositionConfigs.keys.prop_positionStart.name];
            const prop_positionEnd =             data[ComponentElementPositionConfigs.keys.prop_positionEnd.name];

            const prop_positionTranslate =       data[ComponentElementPositionConfigs.keys.prop_positionTranslate.name];
            const prop_positionZIndex =          data[ComponentElementPositionConfigs.keys.prop_positionZIndex.name];

            const directionRtl =     AppConfig.get("directionRtl");

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                styles: {

                },
                stylesBind: {
                    width:            prop_positionWidth ,
                    height:           prop_positionHeight ,

                    position:         prop_positionType ,

                    transform:        prop_positionTranslate ,
                    "z-index":        prop_positionZIndex ,

                    top:              prop_positionTop ,
                    bottom:           prop_positionBottom ,
                    left:         Observable.computed(( positionLeft , positionStart , positionEnd) => {
                            if (positionLeft != null){
                                return positionLeft;
                            }
                            else if (directionRtl && positionEnd != null){
                                return positionEnd;
                            }
                            else if (!directionRtl && positionStart != null){
                                return positionStart;
                            }
                            return null;
                        },
                        [prop_positionLeft , prop_positionStart ,  prop_positionEnd]
                    ) ,
                    right:         Observable.computed(( positionRight , positionStart , positionEnd) => {
                            if (positionRight != null){
                                return positionRight;
                            }
                            else if (directionRtl && positionStart != null){
                                return positionStart;
                            }
                            else if (!directionRtl && positionEnd != null){
                                return positionEnd;
                            }
                            return null;
                        },
                        [prop_positionRight , prop_positionStart ,  prop_positionEnd]
                    ) ,

                    prop_positionStyles
                } ,
                classBind: [
                    prop_positionClass
                ],
                children: [
                    prop_selectorContent
                ],
                on: {
                    click: (event) => {
                        const params: ComponentElementPosition_Methods_CLICK_DataArgs = {}
                        this.executeMethod(ComponentElementPositionConfigs.methods.CLICK.name , event , params);
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
}
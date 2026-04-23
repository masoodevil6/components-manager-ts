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
import {Language} from "../../core/Language";
import {AppConfig} from "../../core/AppConfig";
import {
    Color,
    COLORS_GRAD,
    COLORS_MAIN,
    OPERATION,
    SizeCalc,
    SIZES,
    SizeUnit, ToolsComponents_BorderWidth,
    TranslateUnit,
    UNITS, Z_INDEXES
} from "../../utils/ToolsConsts";
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
import {
    ComponentBorder_ArrowTypes,
    ComponentBorderMethodsType,
    ComponentBorderProps,
    ComponentBorderPropsType
} from "./ComponentBorder";
import {
    ComponentElementPosition, ComponentElementPosition_Methods_CLICK_ComponentArgs,
    ComponentElementPosition_Methods_CLICK_DataArgs, ComponentElementPositionMethodsType,
    ComponentElementPositionPropsType
} from "./ComponentElementPosition";




export const ComponentFloatMenuProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    prop_selectorContent :        "prop_selectorContent" ,
    prop_selectorClass :          "prop_selectorClass" ,
    prop_selectorStyles :         "prop_selectorStyles" ,
    prop_selectorShowType :       "prop_selectorShowType" ,

    prop_floatClass :             "prop_floatClass" ,
    prop_floatStyles :            "prop_floatStyles" ,
    prop_floatContent :           "prop_floatContent" ,
    prop_floatDirectionType :     "prop_floatDirectionType" ,
    prop_floatArrowWidth :        "prop_floatArrowWidth" ,
    prop_floatBorderWidth :       "prop_floatBorderWidth" ,
    prop_floatBorderRadius :      "prop_floatBorderRadius" ,
    prop_floatMinWidth :          "prop_floatMinWidth" ,
    prop_floatPosition :          "prop_floatPosition" ,
    prop_floatArrowPosition :     "prop_floatArrowPosition" ,
    prop_floatBackground :        "prop_floatBackground" ,
    prop_floatColor :             "prop_floatColor" ,

} as const;




export enum ComponentFloatMenu_DirectionTypes{
    TOP=       "top",
    RIGHT=     "right",
    BOTTOM=    "bottom",
    LEFT=      "left"
}


export enum ComponentFloatMenu_ShowTypes{
    HOVER=     "hover",
    CLICK=     "click",
}


const ComponentFloatMenuConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys ,
        ///----------------------
        [ComponentFloatMenuProps.prop_selectorContent] : {
            name:                ComponentFloatMenuProps.prop_selectorContent ,
            value:               GOG_SetValue<string | ReactiveElement | null>( "") ,
        } ,
        [ComponentFloatMenuProps.prop_selectorClass] : {
            name:                ComponentFloatMenuProps.prop_selectorClass,
            value:               GOG_SetValue<string[]>( []) ,
        } ,
        [ComponentFloatMenuProps.prop_selectorStyles] : {
            name:                ComponentFloatMenuProps.prop_selectorStyles,
            value:               GOG_SetValue<Record<string, string>>({}) ,
        } ,
        [ComponentFloatMenuProps.prop_selectorShowType] : {
            name:                ComponentFloatMenuProps.prop_selectorShowType,
            value:               GOG_SetValue<GOG_ValueOf<typeof ComponentFloatMenu_ShowTypes>>(ComponentFloatMenu_ShowTypes.CLICK),
        } ,


        [ComponentFloatMenuProps.prop_floatClass] : {
            name:                ComponentFloatMenuProps.prop_floatClass,
            value:               GOG_SetValue<string[]>( ["mt-2"]) ,
        } ,
        [ComponentFloatMenuProps.prop_floatStyles] : {
            name:                ComponentFloatMenuProps.prop_floatStyles,
            value:               GOG_SetValue<Record<string, string>>({}) ,
        } ,
        [ComponentFloatMenuProps.prop_floatContent] : {
            name:                ComponentFloatMenuProps.prop_floatContent,
            value:               GOG_SetValue<string | ReactiveElement>( "") ,
        } ,
        [ComponentFloatMenuProps.prop_floatDirectionType] : {
            name:                ComponentFloatMenuProps.prop_floatDirectionType,
            value:               GOG_SetValue<GOG_ValueOf<typeof ComponentFloatMenu_DirectionTypes>>(ComponentFloatMenu_DirectionTypes.TOP),
        } ,
        [ComponentFloatMenuProps.prop_floatArrowWidth] : {
            name:                ComponentFloatMenuProps.prop_floatArrowWidth,
            value:               GOG_SetValue<number>(10),
        } ,
        [ComponentFloatMenuProps.prop_floatBorderWidth] : {
            name:               ComponentFloatMenuProps.prop_floatBorderWidth,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M),
        } ,
        [ComponentFloatMenuProps.prop_floatBorderRadius] : {
            name:               ComponentFloatMenuProps.prop_floatBorderRadius,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M),
        } ,
        [ComponentFloatMenuProps.prop_floatMinWidth] : {
            name:               ComponentFloatMenuProps.prop_floatMinWidth,
            value:              GOG_SetValue<SizeUnit | SizeCalc | null>(null),
        } ,
        [ComponentFloatMenuProps.prop_floatPosition] : {
            name:               ComponentFloatMenuProps.prop_floatPosition,
            value:              GOG_SetValue<SizeUnit | SizeCalc | null>(null),
        } ,
        [ComponentFloatMenuProps.prop_floatArrowPosition] : {
            name:               ComponentFloatMenuProps.prop_floatArrowPosition,
            value:              GOG_SetValue<SizeUnit | SizeCalc | null >( SizeUnit(50 , UNITS.PERCENT)) ,
        } ,
        [ComponentFloatMenuProps.prop_floatBackground]: {
            name:               ComponentFloatMenuProps.prop_floatBackground,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1 )),
        } ,
        [ComponentFloatMenuProps.prop_floatColor]: {
            name:                ComponentFloatMenuProps.prop_floatColor,
            value:               GOG_SetValue<Color | null>( Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1 )),
        } ,
    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_Component_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts ,
        SELECTOR: {
            name:               "part-selector"
        } ,
        SELECTOR_POSITION: {
            name:               "part-selector-position"
        } ,
        SELECTOR_POSITION_BORDER: {
            name:               "part-selector-position-border"
        } ,
    } ,
    templates: {
        SELECTOR: {
            name:                "selector"
        } ,
        BODY: {
            name:                "body"
        } ,
    } ,
    methods: {

    }
} as const




export type ComponentFloatMenuPropsType =                             GOG_ExtractNameValue<typeof ComponentFloatMenuConfigs.keys>
export type ComponentFloatMenuSchemaType =                            GOG_ExtractName<typeof ComponentFloatMenuConfigs.schemas>
export type ComponentFloatMenuTemplatesType =                         GOG_ExtractName<typeof ComponentFloatMenuConfigs.templates>

export type ComponentFloatMenuMethodsType = {

}





export class ComponentFloatMenuBase extends ComponentBase<
    ComponentFloatMenuPropsType ,
    ComponentFloatMenuSchemaType ,
    ComponentFloatMenuTemplatesType ,
    ComponentFloatMenuMethodsType
    > {



    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN=  defineComponentPatterns<ComponentFloatMenuPropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this) ,
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this) ,
            [ComponentFloatMenuConfigs.keys.prop_selectorContent.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_selectorContent.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_selectorContent.value,
                title:                                            Language.translate("components.float_menu.props.prop_selectorContent.title"),
                description:                                      Language.translate("components.float_menu.props.prop_selectorContent.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_selectorClass.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_selectorClass.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_selectorClass.value,
                title:                                            Language.translate("components.float_menu.props.prop_selectorClass.title"),
                description:                                      Language.translate("components.float_menu.props.prop_selectorClass.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_selectorStyles.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_selectorStyles.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_selectorStyles.value,
                title:                                            Language.translate("components.float_menu.props.prop_selectorStyles.title"),
                description:                                      Language.translate("components.float_menu.props.prop_selectorStyles.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_selectorShowType.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_selectorShowType.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_selectorShowType.value,
                title:                                            Language.translate("components.float_menu.props.prop_selectorShowType.title"),
                description:                                      Language.translate("components.float_menu.props.prop_selectorShowType.description"),
            } ,


            [ComponentFloatMenuConfigs.keys.prop_floatClass.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatClass.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatClass.value,
                title:                                            Language.translate("components.float_menu.props.prop_floatClass.title"),
                description:                                      Language.translate("components.float_menu.props.prop_floatClass.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatStyles.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatStyles.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatStyles.value,
                title:                                            Language.translate("components.float_menu.props.prop_floatStyles.title"),
                description:                                      Language.translate("components.float_menu.props.prop_floatStyles.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatContent.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatContent.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatContent.value,
                title:                                            Language.translate("components.float_menu.props.prop_floatContent.title"),
                description:                                      Language.translate("components.float_menu.props.prop_floatContent.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatDirectionType.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatDirectionType.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatDirectionType.value,
                title:                                            Language.translate("components.float_menu.props.prop_floatDirectionType.title"),
                description:                                      Language.translate("components.float_menu.props.prop_floatDirectionType.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatArrowWidth.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatArrowWidth.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatArrowWidth.value,
                title:                                            Language.translate("components.float_menu.props.prop_floatArrowWidth.title"),
                description:                                      Language.translate("components.float_menu.props.prop_floatArrowWidth.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatBorderWidth.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatBorderWidth.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatBorderWidth.value,
                title:                                            Language.translate("components.float_menu.props.prop_floatBorderWidth.title"),
                description:                                      Language.translate("components.float_menu.props.prop_floatBorderWidth.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatBorderRadius.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatBorderRadius.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatBorderRadius.value,
                title:                                            Language.translate("components.float_menu.props.prop_floatBorderRadius.title"),
                description:                                      Language.translate("components.float_menu.props.prop_floatBorderRadius.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatMinWidth.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatMinWidth.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatMinWidth.value,
                title:                                            Language.translate("components.float_menu.props.prop_floatMinWidth.title"),
                description:                                      Language.translate("components.float_menu.props.prop_floatMinWidth.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatPosition.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatPosition.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatPosition.value,
                title:                                            Language.translate("components.float_menu.props.prop_floatPosition.title"),
                description:                                      Language.translate("components.float_menu.props.prop_floatPosition.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatArrowPosition.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatArrowPosition.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatArrowPosition.value,
                title:                                            Language.translate("components.float_menu.props.prop_floatArrowPosition.title"),
                description:                                      Language.translate("components.float_menu.props.prop_floatArrowPosition.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatBackground.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatBackground.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatBackground.value,
                title:                                            Language.translate("components.float_menu.props.prop_floatBackground.title"),
                description:                                      Language.translate("components.float_menu.props.prop_floatBackground.description"),
            } ,
            [ComponentFloatMenuConfigs.keys.prop_floatColor.name]: {
                prop:                                             ComponentFloatMenuConfigs.keys.prop_floatColor.name,
                default:                                          ComponentFloatMenuConfigs.keys.prop_floatColor.value,
                title:                                            Language.translate("components.float_menu.props.prop_floatColor.title"),
                description:                                      Language.translate("components.float_menu.props.prop_floatColor.description"),
            } ,

        }
    );


    /* ---------------------------------------------
        PROPERTYs Props
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentFloatMenuSchemaType  , ComponentFloatMenuPropsType>( {
        ...GOG_ComponentBasicConfigs_Component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this) ,
        [ComponentFloatMenuConfigs.schemas.SELECTOR.name]: {
            part:                                                 ComponentFloatMenuConfigs.schemas.SELECTOR.name ,
            title:                                                Language.translate("components.float_menu.schema.selector.title") ,
            description:                                          Language.translate("components.float_menu.schema.selector.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_selectorContent.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_selectorClass.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_selectorStyles.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_selectorShowType.name] ,
            ]
        } ,
        [ComponentFloatMenuConfigs.schemas.SELECTOR_POSITION.name]: {
            part:                                                 ComponentFloatMenuConfigs.schemas.SELECTOR_POSITION.name ,
            title:                                                Language.translate("components.float_menu.schema.selector_position.title") ,
            description:                                          Language.translate("components.float_menu.schema.selector_position.description") ,
            props: [

                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatDirectionType.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatArrowWidth.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatPosition.name] ,
            ]
        } ,
        [ComponentFloatMenuConfigs.schemas.SELECTOR_POSITION_BORDER.name]: {
            part:                                                 ComponentFloatMenuConfigs.schemas.SELECTOR_POSITION_BORDER.name ,
            title:                                                Language.translate("components.float_menu.schema.selector_position_border.title") ,
            description:                                          Language.translate("components.float_menu.schema.selector_position_border.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatClass.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatStyles.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatContent.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatDirectionType.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatArrowWidth.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatBorderWidth.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatBorderRadius.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatMinWidth.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatArrowPosition.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatBackground.name] ,
                this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatColor.name] ,
            ]
        } ,
    });


    /* ---------------------------------------------
        PROPERTYs Pattern
     --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentFloatMenuTemplatesType , ComponentFloatMenuPropsType>({
        [ComponentFloatMenuConfigs.templates.SELECTOR.name]: {
            title:                                            Language.translate("components.float_menu.template.selector.title"),
            description:                                      Language.translate("components.float_menu.template.selector.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_selectorContent.name] ,
        } ,
        [ComponentFloatMenuConfigs.templates.BODY.name]: {
            title:                                            Language.translate("components.float_menu.template.border.title"),
            description:                                      Language.translate("components.float_menu.template.border.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentFloatMenuConfigs.keys.prop_floatContent.name]
        } ,
    });



    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentFloatMenuMethodsType , ComponentFloatMenuPropsType>({

    });





    /* ---------------------------------------------
        Example
     --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        return new ComponentFloatMenu(
            <ComponentFloatMenuPropsType>{
                classList: ["col-md-3" , "col-12" , "border" , "p-2" , "position-relative"]  ,
                prop_selectorContent: "selector" ,
                prop_selectorClass: ["text-center"] ,
                prop_floatContent: "content" ,
                prop_selectorShowType: "hover" ,
                prop_floatDirectionType: "top" ,
                prop_floatArrowWidth: 10 ,
                prop_floatMinWidth:   SizeUnit(230 , UNITS.PEXEL) ,
            } ,
            <ComponentFloatMenuMethodsType>{

            }
        ).getElement();
    }
}


export class ComponentFloatMenu extends ComponentFloatMenuBase {

    _COMPONENT_POSITION = null;

    /* ---------------------------------------------
       SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentFloatMenuPropsType ,
        methods: ComponentFloatMenuMethodsType ,
        events = null
    ) {
        super(
            "float-menu" ,
            null
        );
        super.renderComponent(config , methods , events);
    }




    /* ---------------------------------------------
       TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentFloatMenuConfigs.schemas.SELECTOR.name)
    }

    override renderManagerComponent(partName , attrsDefault , data , extra) :  ReactiveElement {
        switch (partName){
            case ComponentFloatMenuConfigs.schemas.SELECTOR.name:
                return  this.templateFn_render_selector(attrsDefault , data , extra);
            case ComponentFloatMenuConfigs.schemas.SELECTOR_POSITION.name:
                return  this.templateFn_render_selectorPosition(attrsDefault , data , extra);
            case ComponentFloatMenuConfigs.schemas.SELECTOR_POSITION_BORDER.name:
                return  this.templateFn_render_selectorPositionBorder(attrsDefault , data , extra);
        }
    }


    private templateFn_render_selector(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const contentHeight   = ToolsCss.getHeightSize(AppConfig.get("sizeName"));
            const contentFontSize = ToolsCss.getFontSize(AppConfig.get("sizeName"));

            const prop_selectorContent =    data[ComponentFloatMenuConfigs.keys.prop_selectorContent.name];
            const prop_selectorClass  =     data[ComponentFloatMenuConfigs.keys.prop_selectorClass.name];
            const prop_selectorStyles =     data[ComponentFloatMenuConfigs.keys.prop_selectorStyles.name];
            const prop_selectorTypeShow=    data[ComponentFloatMenuConfigs.keys.prop_selectorShowType.name];

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                styles: {
                    lineHeight: `${contentHeight}px` ,
                    fontSize:   `${contentFontSize}px` ,
                    cursor:     "pointer"
                },
                stylesBind: {
                    prop_selectorStyles
                },
                classBind: [
                    prop_selectorClass
                ],
                className: [
                 //   "position-relative"
                ] ,
                on: {

                    click: (event: Event) => {
                        if (prop_selectorTypeShow.get() == ComponentFloatMenu_ShowTypes.CLICK && this._COMPONENT_POSITION){
                            const propShow = this._COMPONENT_POSITION.get(ComponentBorderProps.prop_show);
                            this._COMPONENT_POSITION.set("prop_show" , !propShow);
                        }
                    },

                    mouseenter: (event: Event) => {
                        if (prop_selectorTypeShow.get() == ComponentFloatMenu_ShowTypes.HOVER && this._COMPONENT_POSITION){
                            this._COMPONENT_POSITION.set(ComponentBorderProps.prop_show , true);
                        }
                    },

                    mouseleave: (event: Event) => {
                        if (prop_selectorTypeShow.get() == ComponentFloatMenu_ShowTypes.HOVER && this._COMPONENT_POSITION){
                            this._COMPONENT_POSITION.set(ComponentBorderProps.prop_show , false);
                        }
                    }
                },
                children: [
                    prop_selectorContent ,
                    this.executeSchemaPart(ComponentFloatMenuConfigs.schemas.SELECTOR_POSITION.name)
                ]
            });

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });

    }



    private templateFn_render_selectorPosition(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {

            const prop_floatDirection  =      data[ComponentFloatMenuConfigs.keys.prop_floatDirectionType.name];
            const prop_floatArrowWidth  =     data[ComponentFloatMenuConfigs.keys.prop_floatArrowWidth.name];
            const prop_floatPosition  =       data[ComponentFloatMenuConfigs.keys.prop_floatPosition.name];

            const directionRtl = AppConfig.get("directionRtl");

            let prop_positionTop =       null;
            let prop_positionRight =     null;
            let prop_positionBottom =    null;
            let prop_positionLeft =      null;
            let prop_positionTranslate = null;

            switch (prop_floatDirection.get()){
                case ComponentFloatMenu_DirectionTypes.TOP:
                    prop_positionBottom =
                        SizeCalc(
                            SizeUnit(100 , UNITS.PERCENT ) ,
                            OPERATION.ADD ,
                            SizeUnit(prop_floatArrowWidth.get() , UNITS.PEXEL) ,
                            OPERATION.MINUS  ,
                            SizeUnit(10 , UNITS.PEXEL )
                        )

                    if (directionRtl){
                        prop_positionRight =    prop_floatPosition.map( v=>{ return v ? SizeUnit(v , UNITS.PERCENT) : 0; } )
                    }
                    else {
                        prop_positionLeft =    prop_floatPosition.map( v=>{ return v ? SizeUnit(v , UNITS.PERCENT) : 0; } )
                    }

                    break;
                case ComponentFloatMenu_DirectionTypes.BOTTOM:
                    prop_positionTop =
                        SizeCalc(
                            SizeUnit(prop_floatArrowWidth.get() , UNITS.PEXEL) ,
                            OPERATION.ADD  ,
                            SizeUnit(20 , UNITS.PEXEL )
                        )

                    if (directionRtl){
                        prop_positionRight =    prop_floatPosition.map( v=>{ return v ? SizeUnit(v , UNITS.PERCENT) : 0; } )
                    }
                    else {
                        prop_positionLeft =    prop_floatPosition.map( v=>{ return v ? SizeUnit(v , UNITS.PERCENT) : 0; } )
                    }

                    break;
                case ComponentFloatMenu_DirectionTypes.LEFT:
                    prop_positionRight =
                        SizeCalc(
                            SizeUnit(100 , UNITS.PERCENT ) , OPERATION.ADD  ,
                            SizeUnit(prop_floatArrowWidth.get() , UNITS.PEXEL)
                        )

                    prop_positionTop =    prop_floatPosition.map( v=>{ return v ? SizeUnit(v , UNITS.PERCENT) : SizeUnit(50 , UNITS.PERCENT); } )

                    prop_positionTranslate=     TranslateUnit(
                        SizeUnit(0 , UNITS.PERCENT ) ,
                        SizeUnit(-50 , UNITS.PERCENT )
                    );


                    break;
                case ComponentFloatMenu_DirectionTypes.RIGHT:
                    prop_positionLeft =
                        SizeCalc(
                            SizeUnit(100 , UNITS.PERCENT ) , OPERATION.ADD  ,
                            SizeUnit(prop_floatArrowWidth.get() , UNITS.PEXEL)
                        )

                    prop_positionTop =    prop_floatPosition.map( v=>{ return v ? SizeUnit(v , UNITS.PERCENT) : SizeUnit(50 , UNITS.PERCENT); } )

                    prop_positionTranslate=     TranslateUnit(
                        SizeUnit(0 , UNITS.PERCENT ) ,
                        SizeUnit(-50 , UNITS.PERCENT )
                    );

                    break;
            }

            this._COMPONENT_POSITION = new ComponentElementPosition(
                <ComponentElementPositionPropsType>{
                    classList:               []  ,

                    prop_positionTop:        prop_positionTop ,
                    prop_positionRight:      prop_positionRight ,
                    prop_positionBottom:     prop_positionBottom ,
                    prop_positionLeft:       prop_positionLeft ,
                    prop_positionTranslate:  prop_positionTranslate ,
                    prop_positionZIndex:     ToolsCss.getZIndex(Z_INDEXES.notify) ,
                    prop_show :              false ,
                    prop_positionHeight:     null ,
                    prop_content:            this.executeSchemaPart(ComponentFloatMenuConfigs.schemas.SELECTOR_POSITION_BORDER.name)
                } ,
                <ComponentElementPositionMethodsType>{
                    fn_onClick: function (event, dataArgs : ComponentElementPosition_Methods_CLICK_DataArgs, componentArgs: ComponentElementPosition_Methods_CLICK_ComponentArgs) {
                        alert("asd");
                    }
                }
            );

            return this._COMPONENT_POSITION.getReactiveElement();
        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });

    }




    private templateFn_render_selectorPositionBorder(attrsDefault , data , extra) : ReactiveElement {

        if (data != null) {
            const prop_floatClass =           data[ComponentFloatMenuConfigs.keys.prop_floatClass.name];
            const prop_floatStyles =          data[ComponentFloatMenuConfigs.keys.prop_floatStyles.name];
            const prop_floatContent =         data[ComponentFloatMenuConfigs.keys.prop_floatContent.name];
            const prop_floatDirection  =      data[ComponentFloatMenuConfigs.keys.prop_floatDirectionType.name];
            const prop_floatArrowWidth  =     data[ComponentFloatMenuConfigs.keys.prop_floatArrowWidth.name];
            const prop_floatBorderWidth  =    data[ComponentFloatMenuConfigs.keys.prop_floatBorderWidth.name];
            const prop_floatBorderRadius  =   data[ComponentFloatMenuConfigs.keys.prop_floatBorderRadius.name];
            const prop_floatMinWidth  =       data[ComponentFloatMenuConfigs.keys.prop_floatMinWidth.name];
            const prop_floatArrowPosition =   data[ComponentFloatMenuConfigs.keys.prop_floatArrowPosition.name];
            const prop_floatBackground =      data[ComponentFloatMenuConfigs.keys.prop_floatBackground.name];
            const prop_floatColor =           data[ComponentFloatMenuConfigs.keys.prop_floatColor.name];

            let borderDirection:typeof ComponentBorder_ArrowTypes[keyof typeof ComponentBorder_ArrowTypes];
            switch (prop_floatDirection.get()){
                case ComponentFloatMenu_DirectionTypes.TOP:
                    borderDirection = ComponentBorder_ArrowTypes.BOTTOM;
                    break;
                case ComponentFloatMenu_DirectionTypes.BOTTOM:
                    borderDirection =                  ComponentBorder_ArrowTypes.TOP;
                    break;
                case ComponentFloatMenu_DirectionTypes.LEFT:
                    borderDirection = ComponentBorder_ArrowTypes.RIGHT;
                    break;
                case ComponentFloatMenu_DirectionTypes.RIGHT:
                    borderDirection = ComponentBorder_ArrowTypes.LEFT;
                    break;
            }

            return new ToolsComponents.ComponentBorder(
                <ComponentBorderPropsType>{
                    prop_contentSize:             SIZES.S ,
                    classList:                    prop_floatClass  ,
                    styles:                       prop_floatStyles  ,

                    prop_borderArrowType:         borderDirection ,
                    prop_borderArrowPosition:     prop_floatArrowPosition ,
                    prop_borderArrowWidth:        prop_floatArrowWidth ,
                    prop_content:                 prop_floatContent ,
                    prop_borderRadius:            prop_floatBorderRadius ,
                    prop_borderWidth:             prop_floatBorderWidth ,
                    prop_minWidth:                prop_floatMinWidth ,
                    prop_contentBackgroundColor:  prop_floatBackground ,
                    prop_borderColor:             prop_floatColor
                } ,
                <ComponentBorderMethodsType>{

                }
            ).getReactiveElement();

        }

        return ReactiveElement.part(  "section" ,{
            attrs: {
                ...attrsDefault
            }
        });
    }

}
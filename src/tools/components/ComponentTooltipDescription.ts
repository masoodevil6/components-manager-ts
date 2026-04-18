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
    IconsType, OPERATION, SizeCalc,
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
import {ToolsIcons} from "../icons";
import {
    ComponentRecyclerView,
    ComponentRecyclerViewMethodsType,
    ComponentRecyclerViewPropsType
} from "./ComponentRecyclerView";
import {ComponentIconMethodsType, ComponentIconPropsType} from "./ComponentIcon";
import {
    ComponentFloatMenu_ShowTypes,
    ComponentFloatMenuMethodsType,
    ComponentFloatMenuPropsType
} from "./ComponentFloatMenu";






export const ComponentTooltipDescriptionProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,

    prop_icon :             "prop_icon" ,
    prop_iconClass :        "prop_iconClass" ,
    prop_iconStyles :       "prop_iconStyles" ,
    prop_iconTitle :        "prop_iconTitle" ,
    prop_iconPosition :     "prop_iconPosition" ,

    prop_description :      "prop_description" ,
    prop_direction :        "prop_direction" ,

    prop_borderBackground : "prop_borderBackground" ,
    prop_borderColor :      "prop_borderColor" ,

} as const;


export enum ComponentTooltipDescription_PositionTypes{
    TOP=       "top",
    BOTTOM=    "bottom",
}


const ComponentTooltipDescriptionConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys ,
        ///----------------------
        [ComponentTooltipDescriptionProps.prop_iconClass] : {
            name:                ComponentTooltipDescriptionProps.prop_iconClass ,
            value:              GOG_SetValue<string[]>( ["position-relative"]) ,
        } ,
        [ComponentTooltipDescriptionProps.prop_iconStyles] : {
            name:                ComponentTooltipDescriptionProps.prop_iconStyles ,
            value:              GOG_SetValue<Record<string, string>>({}) ,
        } ,
        [ComponentTooltipDescriptionProps.prop_icon] : {
            name:                ComponentTooltipDescriptionProps.prop_icon ,
            value:               GOG_SetValue<IconsType |null>(ToolsIcons.icon_exclamation_square({size: SIZES.M})) ,
        } ,
        [ComponentTooltipDescriptionProps.prop_iconTitle]: {
            name:                ComponentTooltipDescriptionProps.prop_iconTitle,
            value:               GOG_SetValue<string>( "") ,
        } ,
        [ComponentTooltipDescriptionProps.prop_iconPosition]: {
            name:                ComponentTooltipDescriptionProps.prop_iconPosition,
            value:               GOG_SetValue<SizeUnit | SizeCalc | null>( SizeUnit(2.5 , UNITS.PERCENT)) ,
        } ,
        [ComponentTooltipDescriptionProps.prop_description]: {
            name:                ComponentTooltipDescriptionProps.prop_description,
            value:               GOG_SetValue<string>( "") ,
        } ,
        [ComponentTooltipDescriptionProps.prop_direction]: {
            name:                ComponentTooltipDescriptionProps.prop_direction,
            value:               GOG_SetValue<GOG_ValueOf<typeof ComponentTooltipDescription_PositionTypes>>(ComponentTooltipDescription_PositionTypes.TOP),
        } ,
        [ComponentTooltipDescriptionProps.prop_borderBackground]: {
            name:                ComponentTooltipDescriptionProps.prop_borderBackground,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1 )),
        } ,
        [ComponentTooltipDescriptionProps.prop_borderColor]: {
            name:                ComponentTooltipDescriptionProps.prop_borderColor,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1 )),
        } ,
    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_Component_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts ,
        FLOAT_MENU: {
            name:               "part_float_menu"
        } ,
        ICON: {
            name:               "part_float_menu_icon"
        } ,
    } ,
    templates: {
        BODY: {
            name:                "body" ,
        } ,
    } ,
    methods: {

    }
} as const

export type ComponentTooltipDescriptionPropsType =                      GOG_ExtractNameValue<typeof ComponentTooltipDescriptionConfigs.keys>
export type ComponentTooltipDescriptionSchemaType =                     GOG_ExtractName<typeof ComponentTooltipDescriptionConfigs.schemas>
export type ComponentTooltipDescriptionTemplatesType =                  GOG_ExtractName<typeof ComponentTooltipDescriptionConfigs.templates>

export type ComponentTooltipDescriptionMethodsType = {

}


export class ComponentTooltipDescriptionBase extends ComponentBase<
    ComponentTooltipDescriptionPropsType ,
    ComponentTooltipDescriptionSchemaType ,
    ComponentTooltipDescriptionTemplatesType ,
    ComponentTooltipDescriptionMethodsType
>{


    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN=  defineComponentPatterns<ComponentTooltipDescriptionPropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this) ,
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this) ,
            [ComponentTooltipDescriptionConfigs.keys.prop_icon.name]: {
                prop:                                             ComponentTooltipDescriptionConfigs.keys.prop_icon.name,
                default:                                          ComponentTooltipDescriptionConfigs.keys.prop_icon.value,
                title:                                            Language.translate("components.tooltip_description.props.prop_icon.title"),
                description:                                      Language.translate("components.tooltip_description.props.prop_icon.description"),
            } ,
            [ComponentTooltipDescriptionConfigs.keys.prop_iconClass.name]: {
                prop:                                             ComponentTooltipDescriptionConfigs.keys.prop_iconClass.name,
                default:                                          ComponentTooltipDescriptionConfigs.keys.prop_iconClass.value,
                title:                                            Language.translate("components.tooltip_description.props.prop_iconClass.title"),
                description:                                      Language.translate("components.tooltip_description.props.prop_iconClass.description"),
            } ,
            [ComponentTooltipDescriptionConfigs.keys.prop_iconStyles.name]: {
                prop:                                             ComponentTooltipDescriptionConfigs.keys.prop_iconStyles.name,
                default:                                          ComponentTooltipDescriptionConfigs.keys.prop_iconStyles.value,
                title:                                            Language.translate("components.tooltip_description.props.prop_iconStyles.title"),
                description:                                      Language.translate("components.tooltip_description.props.prop_iconStyles.description"),
            } ,
            [ComponentTooltipDescriptionConfigs.keys.prop_iconTitle.name]: {
                prop:                                             ComponentTooltipDescriptionConfigs.keys.prop_iconTitle.name,
                default:                                          ComponentTooltipDescriptionConfigs.keys.prop_iconTitle.value,
                title:                                            Language.translate("components.tooltip_description.props.prop_iconTitle.title"),
                description:                                      Language.translate("components.tooltip_description.props.prop_iconTitle.description"),
            } ,
            [ComponentTooltipDescriptionConfigs.keys.prop_iconPosition.name]: {
                prop:                                             ComponentTooltipDescriptionConfigs.keys.prop_iconPosition.name,
                default:                                          ComponentTooltipDescriptionConfigs.keys.prop_iconPosition.value,
                title:                                            Language.translate("components.tooltip_description.props.prop_iconPosition.title"),
                description:                                      Language.translate("components.tooltip_description.props.prop_iconPosition.description"),
            } ,
            [ComponentTooltipDescriptionConfigs.keys.prop_description.name]: {
                prop:                                             ComponentTooltipDescriptionConfigs.keys.prop_description.name,
                default:                                          ComponentTooltipDescriptionConfigs.keys.prop_description.value,
                title:                                            Language.translate("components.tooltip_description.props.prop_description.title"),
                description:                                      Language.translate("components.tooltip_description.props.prop_description.description"),
            } ,
            [ComponentTooltipDescriptionConfigs.keys.prop_direction.name]: {
                prop:                                             ComponentTooltipDescriptionConfigs.keys.prop_direction.name,
                default:                                          ComponentTooltipDescriptionConfigs.keys.prop_direction.value,
                title:                                            Language.translate("components.tooltip_description.props.prop_direction.title"),
                description:                                      Language.translate("components.tooltip_description.props.prop_direction.description"),
            } ,
            [ComponentTooltipDescriptionConfigs.keys.prop_borderBackground.name]: {
                prop:                                             ComponentTooltipDescriptionConfigs.keys.prop_borderBackground.name,
                default:                                          ComponentTooltipDescriptionConfigs.keys.prop_borderBackground.value,
                title:                                            Language.translate("components.tooltip_description.props.prop_borderBackground.title"),
                description:                                      Language.translate("components.tooltip_description.props.prop_borderBackground.description"),
            } ,
            [ComponentTooltipDescriptionConfigs.keys.prop_borderColor.name]: {
                prop:                                             ComponentTooltipDescriptionConfigs.keys.prop_borderColor.name,
                default:                                          ComponentTooltipDescriptionConfigs.keys.prop_borderColor.value,
                title:                                            Language.translate("components.tooltip_description.props.prop_borderColor.title"),
                description:                                      Language.translate("components.tooltip_description.props.prop_borderColor.description"),
            } ,
        }
    );


    /* ---------------------------------------------
       PROPERTYs Props
   --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentTooltipDescriptionSchemaType  , ComponentTooltipDescriptionPropsType>( {
        ...GOG_ComponentBasicConfigs_Component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this) ,
        [ComponentTooltipDescriptionConfigs.schemas.FLOAT_MENU.name]: {
            part:                                                   ComponentTooltipDescriptionConfigs.schemas.FLOAT_MENU.name ,
            title:                                                  Language.translate("components.tooltip_description.schema.float_menu.title") ,
            description:                                            Language.translate("components.tooltip_description.schema.float_menu.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentTooltipDescriptionConfigs.keys.prop_iconPosition.name] ,
                this._COMPONENT_PATTERN[ComponentTooltipDescriptionConfigs.keys.prop_iconClass.name] ,
                this._COMPONENT_PATTERN[ComponentTooltipDescriptionConfigs.keys.prop_iconStyles.name] ,
                this._COMPONENT_PATTERN[ComponentTooltipDescriptionConfigs.keys.prop_direction.name] ,
                this._COMPONENT_PATTERN[ComponentTooltipDescriptionConfigs.keys.prop_description.name] ,
                this._COMPONENT_PATTERN[ComponentTooltipDescriptionConfigs.keys.prop_borderBackground.name] ,
                this._COMPONENT_PATTERN[ComponentTooltipDescriptionConfigs.keys.prop_borderColor.name] ,
            ]
        } ,
        [ComponentTooltipDescriptionConfigs.schemas.ICON.name]: {
            part:                                                   ComponentTooltipDescriptionConfigs.schemas.ICON.name ,
            title:                                                  Language.translate("components.tooltip_description.schema.icon.title") ,
            description:                                            Language.translate("components.tooltip_description.schema.icon.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentTooltipDescriptionConfigs.keys.prop_icon.name] ,
                this._COMPONENT_PATTERN[ComponentTooltipDescriptionConfigs.keys.prop_iconTitle.name] ,
                this._COMPONENT_PATTERN[ComponentTooltipDescriptionConfigs.keys.prop_iconPosition.name] ,
            ]
        } ,

    });




    /* ---------------------------------------------
        PROPERTYs Pattern
     --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentTooltipDescriptionTemplatesType , ComponentTooltipDescriptionPropsType>({
        [ComponentTooltipDescriptionConfigs.templates.BODY.name]: {
            title:                                                   Language.translate("components.tooltip_description.template.body.title"),
            description:                                             Language.translate("components.tooltip_description.template.body.description"),
            reference:                                               this._COMPONENT_PATTERN[ComponentTooltipDescriptionConfigs.keys.prop_icon.name]
        } ,
    });




    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentTooltipDescriptionMethodsType , ComponentTooltipDescriptionPropsType>({

    });




    /* ---------------------------------------------
        Example
     --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        return new ComponentTooltipDescription(
            <ComponentTooltipDescriptionPropsType>{
                classList:                ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                styles:                   {}  ,

                prop_show :               true ,
                prop_description:         "this is a description tooltip" ,
                prop_direction:           "bottom"

            },
            <ComponentTooltipDescriptionMethodsType>{

            }
        ).getElement();
    }

}

export class ComponentTooltipDescription extends ComponentTooltipDescriptionBase {

    /* ---------------------------------------------
       SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentTooltipDescriptionPropsType ,
        methods: ComponentTooltipDescriptionMethodsType
    ) {
        super("tooltip-description" , null);
        super.renderComponent(config , methods);
    }



    /* ---------------------------------------------
       TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentTooltipDescriptionConfigs.schemas.FLOAT_MENU.name)
    }

    override renderManagerComponent(partName , attrsDefault , data , extra) :  ReactiveElement {
        switch (partName){
            case ComponentTooltipDescriptionConfigs.schemas.FLOAT_MENU.name:
                return  this.templateFn_render_floatMenu(attrsDefault , data , extra);
            case ComponentTooltipDescriptionConfigs.schemas.ICON.name:
                return  this.templateFn_render_floatMenu_icon(attrsDefault , data , extra);
        }
    }


    private templateFn_render_floatMenu(attrsDefault , data , extra) : ReactiveElement{

        if (data != null) {
            const prop_iconPosition        = data[ComponentTooltipDescriptionConfigs.keys.prop_iconPosition.name];
            const prop_iconClass           = data[ComponentTooltipDescriptionConfigs.keys.prop_iconClass.name];
            const prop_iconStyles          = data[ComponentTooltipDescriptionConfigs.keys.prop_iconStyles.name];
            const prop_direction           = data[ComponentTooltipDescriptionConfigs.keys.prop_direction.name];
            const prop_description         = data[ComponentTooltipDescriptionConfigs.keys.prop_description.name];
            const prop_borderBackground    = data[ComponentTooltipDescriptionConfigs.keys.prop_borderBackground.name];
            const prop_borderColor         = data[ComponentTooltipDescriptionConfigs.keys.prop_borderColor.name];


            const iconSize = ToolsCss.getIconSize(AppConfig.observable("sizeName"))

            return new ToolsComponents.ComponentFloatMenu(
                <ComponentFloatMenuPropsType>{
                    classList:                  []  ,
                    styles:                     {}  ,
                    prop_selectorClass:         prop_iconClass ,
                    prop_selectorStyles:        prop_iconStyles ,
                    prop_floatClass:            ["mt-2" , "w-100" , "position-relative"] ,
                    prop_floatMinWidth:         SizeUnit(100 , UNITS.PERCENT) ,
                    prop_floatArrowPosition:    SizeCalc(SizeUnit(100 , UNITS.PERCENT) , OPERATION.MINUS, prop_iconPosition.get() , OPERATION.MINUS, SizeUnit(iconSize/2 , UNITS.PEXEL) ) ,
                    prop_selectorContent :      this.executeSchemaPart(ComponentTooltipDescriptionConfigs.schemas.ICON.name),
                    prop_selectorShowType:      ComponentFloatMenu_ShowTypes.HOVER ,
                    prop_floatDirectionType:    prop_direction ,
                    prop_floatContent:          prop_description ,
                    prop_floatBackground:       prop_borderBackground,
                    prop_floatColor:            prop_borderColor

                } ,
                <ComponentFloatMenuMethodsType>{

                }
            ).getReactiveElement();
        }

        return ReactiveElement.section({
            attrs: {
                ...attrsDefault
            }
        });

    }

    private templateFn_render_floatMenu_icon(attrsDefault , data , extra) : ReactiveElement{
        if (data != null) {
            const prop_icon                = data[ComponentTooltipDescriptionConfigs.keys.prop_icon.name];
            const prop_iconTitle           = data[ComponentTooltipDescriptionConfigs.keys.prop_iconTitle.name];
            const prop_iconPosition        = data[ComponentTooltipDescriptionConfigs.keys.prop_iconPosition.name];

            const directionRtl = AppConfig.get("directionRtl");
            let styles = {top: "0"};
            if (directionRtl){
                styles["left"] = prop_iconPosition.get()
            }
            else{
                styles["right"] = prop_iconPosition.get()
            }

            return new ToolsComponents.ComponentIcon(
                <ComponentIconPropsType>{
                    classList:          []  ,
                    styles:             {}  ,

                    prop_iconClass :    ["position-absolute"] ,
                    prop_iconStyles :   styles ,
                    prop_icon:          prop_icon ,
                    prop_iconTitle:     prop_iconTitle ,
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

}

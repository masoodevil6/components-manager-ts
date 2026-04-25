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
    IconsType, OPERATION, SizeCalc,
    SIZES, SizesType, SizeUnit,
    ToolsComponents_BorderRadius,
    ToolsComponents_BorderWidth, TranslateUnit, UNITS, Z_INDEXES
} from "../../utils/ToolsConsts";
import {TOOLS} from "../tools";
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
} from "../../core/component/SetupComponent";
import {Observable} from "../../core/Observable";
import {
    ComponentBorder_ArrowTypes,
    ComponentBorder_BorderTypes,
    ComponentBorder_Methods_CLICK_BORDER_ComponentArgs,
    ComponentBorder_Methods_CLICK_BORDER_DataArgs,
    ComponentBorder_Methods_MOUSE_DOWN_BORDER_ComponentArgs,
    ComponentBorder_Methods_MOUSE_DOWN_BORDER_DataArgs,
    ComponentBorder_Methods_MOUSE_MOVE_BORDER_ComponentArgs,
    ComponentBorder_Methods_MOUSE_MOVE_BORDER_DataArgs,
    ComponentBorder_Methods_MOUSE_UP_BORDER_ComponentArgs,
    ComponentBorder_Methods_MOUSE_UP_BORDER_DataArgs,
    ComponentBorderMethodsType,
    ComponentBorderProps,
    ComponentBorderPropsType
} from "./ComponentBorder";
import {
    ComponentIcon_Methods_BLUR_DataArgs,
    ComponentIcon_Methods_CLICK_ComponentArgs,
    ComponentIcon_Methods_CLICK_DataArgs, ComponentIcon_Methods_HOVER_DataArgs,
    ComponentIconMethodsType,
    ComponentIconProps,
    ComponentIconPropsType
} from "./ComponentIcon";
import {ToolsIcons} from "../icons";
import {ComponentRecyclerViewProps} from "./ComponentRecyclerView";
import {ComponentTabs_Methods_CLICK_TAB_DataArgs} from "./ComponentTabs";
import {
    ComponentElementPosition,
    ComponentElementPosition_Methods_CLICK_ComponentArgs,
    ComponentElementPosition_Methods_CLICK_DataArgs,
    ComponentElementPositionMethodsType,
    ComponentElementPositionPropsType
} from "./ComponentElementPosition";
import {fa} from "../../langs/Fa";




export const ComponentDraggableOrdersYProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    ///----------------------
    prop_DraggableOrdersStatus :                       "prop_DraggableOrdersStatus" ,
    prop_draggablePinStatus :                          "prop_draggablePinStatus" ,

    prop_draggableItems :                              "prop_draggableItems" ,
    prop_DraggableOrders :                             "prop_DraggableOrders" ,
    prop_draggableClass :                              "prop_draggableClass" ,
    prop_draggableStyles :                             "prop_draggableStyles" ,

    prop_draggableBackgroundColor :                    "prop_draggableBackgroundColor" ,
    prop_draggableBackgroundColor_hover :              "prop_draggableBackgroundColor_hover" ,
    prop_draggableBackgroundColor_hoverForDrag :       "prop_draggableBackgroundColor_hoverForDrag" ,

    prop_draggableBorderColor :                        "prop_draggableBorderColor" ,
    prop_draggableBorderColor_hover :                  "prop_draggableBorderColor_hover" ,
    prop_draggableBorderColor_hoverForDrag :           "prop_draggableBorderColor_hoverForDrag" ,

    prop_draggableBorderWidth :                        "prop_draggableBorderWidth" ,
    prop_draggableBorderRadius :                       "prop_draggableBorderRadius" ,


    prop_draggablePinedBackgroundColor :               "prop_draggablePinedBackgroundColor" ,
    prop_draggablePinedBackgroundColor_hover :         "prop_draggablePinedBackgroundColor_hover" ,

    prop_draggablePinedBorderColor :                   "prop_draggablePinedBorderColor" ,
    prop_draggablePinedBorderColor_hover :             "prop_draggablePinedBorderColor_hover" ,


    prop_draggablePlaceholderBackgroundColor :         "prop_draggablePlaceholderBackgroundColor" ,
    prop_draggablePlaceholderContentColor :            "prop_draggablePlaceholderContentColor" ,
    prop_draggablePlaceholderContent :                 "prop_draggablePlaceholderContent" ,
    prop_draggablePlaceholderBorderColor :             "prop_draggablePlaceholderBorderColor" ,
    prop_draggablePlaceholderBorderWidth :             "prop_draggablePlaceholderBorderWidth" ,
    prop_draggablePlaceholderBorderRadius :            "prop_draggablePlaceholderBorderRadius" ,
    prop_draggablePlaceholderClass :                   "prop_draggablePlaceholderClass" ,
    prop_draggablePlaceholderStyles :                  "prop_draggablePlaceholderStyles" ,

    prop_draggableIconPinOpen :                        "prop_draggableIconPinOpen" ,
    prop_draggableIconPinClose :                       "prop_draggableIconPinClose" ,

} as const;

export type propDraggableOrder_ItemTypes = {
    id:               string|number;
    body:             ReactiveElement;
    isPin?:           boolean;
};


const ComponentDraggableOrdersYConfigs  =  {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys ,
        ///----------------------
        [ComponentDraggableOrdersYProps.prop_DraggableOrdersStatus]: {
            name:               ComponentDraggableOrdersYProps.prop_DraggableOrdersStatus ,
            value:              GOG_SetValue<boolean>( true) ,
        } ,
        [ComponentDraggableOrdersYProps.prop_draggablePinStatus]: {
            name:               ComponentDraggableOrdersYProps.prop_draggablePinStatus ,
            value:              GOG_SetValue<boolean>( true) ,
        } ,

        [ComponentDraggableOrdersYProps.prop_DraggableOrders]:{
            name:               ComponentDraggableOrdersYProps.prop_DraggableOrders  ,
            value:              GOG_SetValue<(string|number)[]>([]),
        } ,
        [ComponentDraggableOrdersYProps.prop_draggableItems]:{
            name:               ComponentDraggableOrdersYProps.prop_draggableItems  ,
            value:              GOG_SetValue<propDraggableOrder_ItemTypes[]>([]),
        } ,
        [ComponentDraggableOrdersYProps.prop_draggableClass]: {
            name:               ComponentDraggableOrdersYProps.prop_draggableClass,
            value:              GOG_SetValue<string[]>( []) ,
        } ,
        [ComponentDraggableOrdersYProps.prop_draggableStyles]: {
            name:               ComponentDraggableOrdersYProps.prop_draggableStyles,
            value:              GOG_SetValue<Record<string, string>>({}) ,
        } ,

        [ComponentDraggableOrdersYProps.prop_draggableBackgroundColor]: {
            name:               ComponentDraggableOrdersYProps.prop_draggableBackgroundColor ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1)),
        } ,
        [ComponentDraggableOrdersYProps.prop_draggableBackgroundColor_hover]: {
            name:               ComponentDraggableOrdersYProps.prop_draggableBackgroundColor_hover ,
            value:              GOG_SetValue<Color | null>(Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_2)),
        } ,
        [ComponentDraggableOrdersYProps.prop_draggableBackgroundColor_hoverForDrag]: {
            name:               ComponentDraggableOrdersYProps.prop_draggableBackgroundColor_hoverForDrag ,
            value:              GOG_SetValue<Color | null>(Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_5)),
        } ,

        [ComponentDraggableOrdersYProps.prop_draggableBorderColor]: {
            name:               ComponentDraggableOrdersYProps.prop_draggableBorderColor ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_4)) ,
        } ,
        [ComponentDraggableOrdersYProps.prop_draggableBorderColor_hover]: {
            name:               ComponentDraggableOrdersYProps.prop_draggableBorderColor_hover ,
            value:              GOG_SetValue<Color | null>(Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_3)) ,
        } ,
        [ComponentDraggableOrdersYProps.prop_draggableBorderColor_hoverForDrag]: {
            name:               ComponentDraggableOrdersYProps.prop_draggableBorderColor_hoverForDrag ,
            value:              GOG_SetValue<Color | null>(Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1)) ,
        } ,

        [ComponentDraggableOrdersYProps.prop_draggableBorderWidth]: {
            name:               ComponentDraggableOrdersYProps.prop_draggableBorderWidth ,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.XS),
        } ,
        [ComponentDraggableOrdersYProps.prop_draggableBorderRadius]: {
            name:               ComponentDraggableOrdersYProps.prop_draggableBorderRadius ,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M),
        } ,



        [ComponentDraggableOrdersYProps.prop_draggablePinedBackgroundColor]: {
            name:               ComponentDraggableOrdersYProps.prop_draggablePinedBackgroundColor ,
            value:              GOG_SetValue<Color | null>(Color(COLORS_MAIN.SUCCESS , COLORS_GRAD.GRADE_5)),
        } ,
        [ComponentDraggableOrdersYProps.prop_draggablePinedBackgroundColor_hover]: {
            name:               ComponentDraggableOrdersYProps.prop_draggablePinedBackgroundColor_hover ,
            value:              GOG_SetValue<Color | null>(Color(COLORS_MAIN.SUCCESS , COLORS_GRAD.GRADE_4)),
        } ,

        [ComponentDraggableOrdersYProps.prop_draggablePinedBorderColor]: {
            name:               ComponentDraggableOrdersYProps.prop_draggablePinedBorderColor ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.SUCCESS , COLORS_GRAD.GRADE_3)) ,
        } ,
        [ComponentDraggableOrdersYProps.prop_draggablePinedBorderColor_hover]: {
            name:               ComponentDraggableOrdersYProps.prop_draggablePinedBorderColor_hover ,
            value:              GOG_SetValue<Color | null>(Color(COLORS_MAIN.SUCCESS , COLORS_GRAD.GRADE_2)) ,
        } ,



        [ComponentDraggableOrdersYProps.prop_draggablePlaceholderBackgroundColor]: {
            name:               ComponentDraggableOrdersYProps.prop_draggablePlaceholderBackgroundColor ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1)) ,
        } ,
        [ComponentDraggableOrdersYProps.prop_draggablePlaceholderContentColor]: {
            name:               ComponentDraggableOrdersYProps.prop_draggablePlaceholderContentColor ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_1)) ,
        } ,
        [ComponentDraggableOrdersYProps.prop_draggablePlaceholderContent]: {
            name:               ComponentDraggableOrdersYProps.prop_draggablePlaceholderContent ,
            value:              GOG_SetValue<Observable<string>| null>( Language.translate("components.draggable_order_y.prop.prop_draggablePlaceholderContent.value") ) ,
        } ,
        [ComponentDraggableOrdersYProps.prop_draggablePlaceholderBorderColor]: {
            name:               ComponentDraggableOrdersYProps.prop_draggablePlaceholderBorderColor ,
            value:              GOG_SetValue<Color | null>( Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1)) ,
        } ,
        [ComponentDraggableOrdersYProps.prop_draggablePlaceholderBorderWidth]: {
            name:               ComponentDraggableOrdersYProps.prop_draggablePlaceholderBorderWidth ,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M),
        } ,
        [ComponentDraggableOrdersYProps.prop_draggablePlaceholderBorderRadius]: {
            name:               ComponentDraggableOrdersYProps.prop_draggablePlaceholderBorderRadius ,
            value:              GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M),
        } ,
        [ComponentDraggableOrdersYProps.prop_draggablePlaceholderClass]: {
            name:               ComponentDraggableOrdersYProps.prop_draggablePlaceholderClass ,
            value:              GOG_SetValue<string[]>( []) ,
        } ,
        [ComponentDraggableOrdersYProps.prop_draggablePlaceholderStyles]: {
            name:               ComponentDraggableOrdersYProps.prop_draggablePlaceholderStyles ,
            value:              GOG_SetValue<Record<string, string>>({}) ,
        } ,



        [ComponentDraggableOrdersYProps.prop_draggableIconPinOpen]: {
            name:               ComponentDraggableOrdersYProps.prop_draggableIconPinOpen,
            value:              GOG_SetValue<IconsType |null>(ToolsIcons.icon_pin_open({size: SIZES.M , primaryColor: Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1)})) ,
        } ,
        [ComponentDraggableOrdersYProps.prop_draggableIconPinClose]: {
            name:               ComponentDraggableOrdersYProps.prop_draggableIconPinClose,
            value:              GOG_SetValue<IconsType |null>(ToolsIcons.icon_pin_close({size: SIZES.M  , primaryColor: Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1)})) ,
        } ,

    } ,
    schemas:   {
        ...GOG_ComponentBasicConfigs_Component_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts ,
        ///----------------------
        Main: {
            name:                      "part-main"
        } ,
        Main_ListOfItems: {
            name:                      "part-main-listOfItems"
        } ,
        Main_ListOfItems_Placeholder: {
            name:                      "part-main-listOfItems-placeholder"
        } ,
        Main_ListOfItems_Border: {
            name:                      "part-main-listOfItems-border"
        } ,
        Main_ListOfItems_Border_Content: {
            name:                      "part-main-listOfItems-border-content"
        } ,
        Main_ListOfItems_Border_Content_Position: {
            name:                      "part-main-listOfItems-border-content-position"
        } ,
        Main_ListOfItems_Border_Content_Position_IconPin: {
            name:                      "part-main-listOfItems-border-content-position-iconPin"
        } ,
    } ,
    templates: {
        ITEM: {
            name:                      "item"
        } ,
    } ,
    methods: {
        UPDATE: {
            name:                      "fn_onUpdateOrder" ,
            dataArgs: {},
            componentArgs: {
                ORDER : {
                    name:              "ORDER"
                } ,
                LIST : {
                    name:              "LIST"
                }
            }
        },
    }
} as const;



export type ComponentDraggableOrdersYPropsType =        GOG_ExtractNameValue<typeof ComponentDraggableOrdersYConfigs.keys>
export type ComponentDraggableOrdersYSchemaType =       GOG_ExtractName<typeof ComponentDraggableOrdersYConfigs.schemas>
export type ComponentDraggableOrdersYTemplatesType =    GOG_ExtractName<typeof ComponentDraggableOrdersYConfigs.templates>

export type ComponentDraggableOrdersY_Methods_UPDATE_ComponentArgs =   GOG_ExtractName<typeof ComponentDraggableOrdersYConfigs.methods.UPDATE.componentArgs>
export type ComponentDraggableOrdersY_Methods_UPDATE_DataArgs =        GOG_ExtractNameValue<typeof ComponentDraggableOrdersYConfigs.methods.UPDATE.dataArgs>

export type ComponentDraggableOrdersYMethodsType = {
    [ComponentDraggableOrdersYConfigs.methods.UPDATE.name]: ComponentCallBackType<ComponentDraggableOrdersY_Methods_UPDATE_ComponentArgs , ComponentDraggableOrdersY_Methods_UPDATE_DataArgs>
}


export abstract class ComponentDraggableOrdersYBase extends ComponentBase<
    ComponentDraggableOrdersYPropsType ,
    ComponentDraggableOrdersYSchemaType ,
    ComponentDraggableOrdersYTemplatesType ,
    ComponentDraggableOrdersYMethodsType
    > {

    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN = defineComponentPatterns<ComponentDraggableOrdersYPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Pattern(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this) ,
        ///----------------------
        [ComponentDraggableOrdersYConfigs.keys.prop_DraggableOrdersStatus.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_DraggableOrdersStatus.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_DraggableOrdersStatus.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggableOrder.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggableOrder.description"),
        } ,
        [ComponentDraggableOrdersYConfigs.keys.prop_draggablePinStatus.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggablePinStatus.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggablePinStatus.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggablePinStatus.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggablePinStatus.description"),
        } ,

        [ComponentDraggableOrdersYConfigs.keys.prop_draggableItems.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggableItems.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggableItems.value,
            hasMultiTemplate:                                 true ,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggableItems.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggableItems.description"),
        } ,
        [ComponentDraggableOrdersYConfigs.keys.prop_DraggableOrders.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_DraggableOrders.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_DraggableOrders.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_DraggableOrders.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_DraggableOrders.description"),
        } ,
        [ComponentDraggableOrdersYConfigs.keys.prop_draggableClass.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggableClass.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggableClass.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggableClass.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggableClass.description"),
        } ,
        [ComponentDraggableOrdersYConfigs.keys.prop_draggableStyles.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggableStyles.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggableStyles.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggableStyles.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggableStyles.description"),
        } ,


        [ComponentDraggableOrdersYConfigs.keys.prop_draggableBackgroundColor.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggableBackgroundColor.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggableBackgroundColor.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggableBackgroundColor.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggableBackgroundColor.description"),
        } ,
        [ComponentDraggableOrdersYConfigs.keys.prop_draggableBackgroundColor_hover.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggableBackgroundColor_hover.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggableBackgroundColor_hover.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggableBackgroundColor_hover.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggableBackgroundColor_hover.description"),
        } ,
        [ComponentDraggableOrdersYConfigs.keys.prop_draggableBackgroundColor_hoverForDrag.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggableBackgroundColor_hoverForDrag.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggableBackgroundColor_hoverForDrag.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggableBackgroundColor_hoverForDrag.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggableBackgroundColor_hoverForDrag.description"),
        } ,

        [ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderColor.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderColor.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderColor.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggableBorderColor.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggableBorderColor.description"),
        } ,
        [ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderColor_hover.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderColor_hover.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderColor_hover.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggableBorderColor_hover.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggableBorderColor_hover.description"),
        } ,
        [ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderColor_hoverForDrag.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderColor_hoverForDrag.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderColor_hoverForDrag.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggableBorderColor_hoverForDrag.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggableBorderColor_hoverForDrag.description"),
        } ,

        [ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderWidth.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderWidth.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderWidth.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggableBorderWidth.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggableBorderWidth.description"),
        } ,
        [ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderRadius.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderRadius.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderRadius.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggableBorderRadius.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggableBorderRadius.description"),
        } ,




        [ComponentDraggableOrdersYConfigs.keys.prop_draggablePinedBackgroundColor.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggablePinedBackgroundColor.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggablePinedBackgroundColor.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggableBackgroundColorPined.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggableBackgroundColorPined.description"),
        } ,
        [ComponentDraggableOrdersYConfigs.keys.prop_draggablePinedBackgroundColor_hover.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggablePinedBackgroundColor_hover.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggablePinedBackgroundColor_hover.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggablePinedBackgroundColor_hover.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggablePinedBackgroundColor_hover.description"),
        } ,

        [ComponentDraggableOrdersYConfigs.keys.prop_draggablePinedBorderColor.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggablePinedBorderColor.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggablePinedBorderColor.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggablePinedBackgroundColor_hover.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggablePinedBackgroundColor_hover.description"),
        } ,
        [ComponentDraggableOrdersYConfigs.keys.prop_draggablePinedBorderColor_hover.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggablePinedBorderColor_hover.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggablePinedBorderColor_hover.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggablePinedBorderColor_hover.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggablePinedBorderColor_hover.description"),
        } ,


        [ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderBackgroundColor.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderBackgroundColor.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderBackgroundColor.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggablePlaceholderBackgroundColor.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggablePlaceholderBackgroundColor.description"),
        } ,
        [ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderContentColor.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderContentColor.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderContentColor.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggablePlaceholderContentColor.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggablePlaceholderContentColor.description"),
        } ,
        [ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderContent.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderContent.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderContent.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggablePlaceholderContent.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggablePlaceholderContent.description"),
        } ,
        [ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderBorderColor.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderBorderColor.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderBorderColor.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggablePlaceholderBorderColor.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggablePlaceholderBorderColor.description"),
        } ,
        [ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderBorderWidth.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderBorderWidth.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderBorderWidth.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggablePlaceholderBorderWidth.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggablePlaceholderBorderWidth.description"),
        } ,
        [ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderBorderRadius.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderBorderRadius.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderBorderRadius.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggablePlaceholderBorderRadius.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggablePlaceholderBorderRadius.description"),
        } ,
        [ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderClass.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderClass.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderClass.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggablePlaceholderClass.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggablePlaceholderClass.description"),
        } ,
        [ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderStyles.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderStyles.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderStyles.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggablePlaceholderStyles.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggablePlaceholderStyles.description"),
        } ,

        [ComponentDraggableOrdersYConfigs.keys.prop_draggableIconPinOpen.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggableIconPinOpen.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggableIconPinOpen.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggableIconPinOpen.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggableIconPinOpen.description"),
        } ,
        [ComponentDraggableOrdersYConfigs.keys.prop_draggableIconPinClose.name]: {
            prop:                                             ComponentDraggableOrdersYConfigs.keys.prop_draggableIconPinClose.name,
            default:                                          ComponentDraggableOrdersYConfigs.keys.prop_draggableIconPinClose.value,
            title:                                            Language.translate("components.draggable_order_y.prop.prop_draggableIconPinClose.title"),
            description:                                      Language.translate("components.draggable_order_y.prop.prop_draggableIconPinClose.description"),
        } ,

    });



    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentDraggableOrdersYSchemaType , ComponentDraggableOrdersYPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this) ,
        ///----------------------
        [ComponentDraggableOrdersYConfigs.schemas.Main.name]: {
            part:               ComponentDraggableOrdersYConfigs.schemas.Main.name ,
            title:              Language.translate("components.draggable_order_ys.schema.main.title") ,
            description:        Language.translate("components.draggable_order_ys.schema.main.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggableItems.name] ,
                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_DraggableOrders.name] ,
            ]
        } ,
        [ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems.name]: {
            part:               ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems.name ,
            title:              Language.translate("components.draggable_order_ys.schema.main_listOfItems.title") ,
            description:        Language.translate("components.draggable_order_ys.schema.main_listOfItems.description") ,
            props: [

            ]
        } ,
        [ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems_Placeholder.name]: {
            part: ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems_Placeholder.name,
            title: Language.translate("components.draggable_order_ys.schema.main_listOfItems_placeholder.title"),
            description: Language.translate("components.draggable_order_ys.schema.main_listOfItems_placeholder.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderBackgroundColor.name],
                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderContentColor.name],
                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderContent.name],
                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderBorderColor.name],
                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderBorderWidth.name],
                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderBorderRadius.name],
                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderClass.name],
                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderStyles.name],
            ]
        } ,
        [ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems_Border.name]: {
            part:               ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems_Border.name ,
            title:              Language.translate("components.draggable_order_ys.schema.main_listOfItems_border.title") ,
            description:        Language.translate("components.draggable_order_ys.schema.main_listOfItems_border.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_DraggableOrdersStatus.name] ,

                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggableClass.name] ,
                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggableStyles.name] ,

                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderWidth.name] ,
                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderRadius.name] ,

                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggableBackgroundColor.name] ,
                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggableBackgroundColor_hover.name] ,
                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggableBackgroundColor_hoverForDrag.name] ,

                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderColor.name] ,
                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderColor_hover.name] ,
                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderColor_hoverForDrag.name] ,


                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggablePinedBackgroundColor.name] ,
                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggablePinedBackgroundColor_hover.name] ,

                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggablePinedBorderColor.name] ,
                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggablePinedBorderColor_hover.name] ,
            ]
        } ,
        [ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems_Border_Content.name]: {
            part:               ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems_Border_Content.name ,
            title:              Language.translate("components.draggable_order_ys.schema.main_listOfItems_border_content.title") ,
            description:        Language.translate("components.draggable_order_ys.schema.main_listOfItems_border_content.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggablePinStatus.name] ,
            ]
        } ,
        [ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems_Border_Content_Position.name]: {
            part:               ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems_Border_Content_Position.name ,
            title:              Language.translate("components.draggable_order_ys.schema.main_listOfItems_border_content_position.title") ,
            description:        Language.translate("components.draggable_order_ys.schema.main_listOfItems_border_content_position.description") ,
            props: [

            ]
        } ,
        [ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems_Border_Content_Position_IconPin.name]: {
            part:               ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems_Border_Content_Position_IconPin.name ,
            title:              Language.translate("components.draggable_order_ys.schema.main_listOfItems_border_content_position_iconPin.title") ,
            description:        Language.translate("components.draggable_order_ys.schema.main_listOfItems_border_content_position_iconPin.description") ,
            props: [
                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggableIconPinOpen.name] ,
                this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggableIconPinClose.name] ,
            ]
        } ,

    });


    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_TEMPLATES= defineComponentTemplate<ComponentDraggableOrdersYTemplatesType , ComponentDraggableOrdersYPropsType>({
        [ComponentDraggableOrdersYConfigs.templates.ITEM.name]: {
            title:                                            Language.translate("components.draggable_order_ys.template.item.title"),
            description:                                      Language.translate("components.draggable_order_ys.template.item.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggableItems.name]
        } ,
    });



    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentDraggableOrdersYMethodsType , ComponentDraggableOrdersYPropsType>({
        [ComponentDraggableOrdersYConfigs.methods.UPDATE.name]: {
            title:                                            Language.translate("components.icon.methods.fn_onUpdateOrder.title"),
            description:                                      Language.translate("components.icon.methods.fn_onUpdateOrder.description"),
            args: {
                [ComponentDraggableOrdersYConfigs.methods.UPDATE.componentArgs.ORDER.name]:      this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_DraggableOrders.name] ,
                [ComponentDraggableOrdersYConfigs.methods.UPDATE.componentArgs.LIST.name]:       this._COMPONENT_PATTERN[ComponentDraggableOrdersYConfigs.keys.prop_draggableItems.name]
            }
        } ,
    });


    /* ---------------------------------------------
        Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        return new ComponentDraggableOrdersY(
            <ComponentDraggableOrdersYPropsType>{
                classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                styles: {}  ,

                prop_draggableOrder: true ,
                prop_draggablePin: true ,
                prop_draggableOrders: [1  , 3] ,
                prop_draggableItems: [
                    {
                        id: 1 ,
                        body:  ReactiveElement.section({
                            children: [
                                "item1" ,
                                "<br/>" ,
                                "attach"
                            ]
                        }) ,
                        isPin: false
                    } ,
                    {
                        id: 2 ,
                        body:  ReactiveElement.section({
                            children: [
                                "item2"
                            ]
                        }) ,
                        isPin: true
                    },
                    {
                        id: 3 ,
                        body:  ReactiveElement.section({
                            children: [
                                "item3"
                            ]
                        }) ,
                        isPin: false
                    }
                ]
            },
            <ComponentDraggableOrdersYMethodsType>{
                fn_onUpdateOrder: function (event, dataArgs:ComponentDraggableOrdersY_Methods_UPDATE_DataArgs, componentArgs : ComponentDraggableOrdersY_Methods_UPDATE_ComponentArgs){
                    console.log("draggable order: " , componentArgs , dataArgs)
                }
            }
        ).getElement();
    }


}


export class ComponentDraggableOrdersY extends ComponentDraggableOrdersYBase {


    _MAIN_ELEMENT;
    _LIST_ELEMENTS =            [];
    _KEY_ID =                   "id";
    _KEY_ELEMENT_BORDER =       "el_border";
    _KEY_ELEMENT_PLACE_HOLDER = "el_place_holder";
    _KEY_ELEMENT_PIN =          "el_pin";

    _DRAG_ELEMENT_ID_ACTIVE =    null;
    _dragHoveredId =             new Observable<number | null>(null)

    _dragStartTimer=             null;
    _dragStartY=                 null;
    _dragStarted=                null;

    _onMouseMove;
    _onMouseUp;


    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentDraggableOrdersYPropsType,
        methods: ComponentDraggableOrdersYMethodsType ,
        events = null
    ) {
        super("draggable-orders-y", null);
        super.renderComponent(config, methods , events);
    }


    /* ---------------------------------------------
    TEMPLATEs
  --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentDraggableOrdersYConfigs.schemas.Main.name)
    }

    override renderManagerComponent(partName , attrsDefault, data , extra) : ReactiveElement {
        switch (partName){
            case ComponentDraggableOrdersYConfigs.schemas.Main.name:
                return  this.template_render_main(attrsDefault , data , extra);
            case ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems.name:
                return  this.template_render_main_listOfItems(attrsDefault , data , extra);
            case ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems_Placeholder.name:
                return  this.template_render_main_listOfItems_placeholder(attrsDefault , data , extra);
            case ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems_Border.name:
                return  this.template_render_main_listOfItems_border(attrsDefault , data , extra);
            case ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems_Border_Content.name:
                return  this.template_render_main_listOfItems_border_content(attrsDefault , data , extra);
            case ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems_Border_Content_Position.name:
                return  this.template_render_main_listOfItems_border_content_position(attrsDefault , data , extra)
            case ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems_Border_Content_Position_IconPin.name:
                return  this.template_render_main_listOfItems_border_content_position_iconPin(attrsDefault , data , extra);
        }
    }

    private template_render_main(attrsDefault , data , extra) : ReactiveElement {
        if (data != null) {

            const prop_draggableItems=                  data[ComponentDraggableOrdersYConfigs.keys.prop_draggableItems.name];
            const prop_draggableOrders=                 data[ComponentDraggableOrdersYConfigs.keys.prop_DraggableOrders.name];


            this._MAIN_ELEMENT =  ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                styles: {
                    "display" : "flex" ,
                    "flex-direction" : "column"
                },
                className: [
                    "position-relative"
                ] ,
                children:   Observable.computed(( items , orders) => {

                    const sorted = this.pr_getElementOrders(items , orders)

                    let children = [];
                    this._LIST_ELEMENTS = [];
                    for (let i = 0; i < sorted.length; i++) {
                        const itemSelected = sorted[i];
                        this.pr_addIdToListElements(itemSelected?.id)
                        children.push(
                            this.executeSchemaPart(ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems.name , {draggableItem: itemSelected, index: i})
                        )
                    }

                    return children
                }, [ prop_draggableItems , prop_draggableOrders ], this.getScope()),
            });

            return this._MAIN_ELEMENT;
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    private template_render_main_listOfItems(attrsDefault , data , extra) : ReactiveElement {

        if (data != null && extra?.draggableItem) {

            const directionRtl =     AppConfig.get("directionRtl");

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault ,
                    "data-order":  extra?.draggableItem?.id
                },
                attrsBind: {

                } ,
                stylesBind: {

                },
                classBind: [

                ] ,
                children: [
                    this.executeSchemaPart(ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems_Placeholder.name , extra) ,
                    this.executeSchemaPart(ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems_Border.name , extra)
                ]
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    private template_render_main_listOfItems_placeholder(attrsDefault , data , extra) : ReactiveElement {

        if (data != null && extra?.draggableItem) {

            const prop_draggablePlaceholderBackgroundColor=             data[ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderBackgroundColor.name];
            const prop_draggablePlaceholderContentColor=                data[ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderContentColor.name];
            const prop_draggablePlaceholderContent=                     data[ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderContent.name];
            const prop_draggablePlaceholderBorderColor=                 data[ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderBorderColor.name];
            const prop_draggablePlaceholderBorderWidth=                 data[ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderBorderWidth.name];
            const prop_draggablePlaceholderBorderRadius=                data[ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderBorderRadius.name];
            const prop_draggablePlaceholderClass=                       data[ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderClass.name];
            const prop_draggablePlaceholderStyles=                      data[ComponentDraggableOrdersYConfigs.keys.prop_draggablePlaceholderStyles.name];

            const elPlaceholder = new ToolsComponents.ComponentBorder(
                <ComponentBorderPropsType>{
                    prop_borderClass:             [
                        "mb-2" , "p-1" , "text-center", "w-100" , "h-100"
                    ] ,
                    prop_borderStyles: {
                        "user-select":   "none"
                    } ,

                    prop_show:                                 false ,
                    classList:                                 prop_draggablePlaceholderClass  ,
                    styles:                                    prop_draggablePlaceholderStyles  ,
                    prop_borderRadius:                         prop_draggablePlaceholderBorderRadius ,
                    prop_borderWidth:                          prop_draggablePlaceholderBorderWidth ,
                    prop_borderColor:                          prop_draggablePlaceholderBorderColor ,
                    prop_contentBackgroundColor:               prop_draggablePlaceholderBackgroundColor ,
                    prop_contentColor:                         prop_draggablePlaceholderContentColor ,
                    prop_borderType:                           ComponentBorder_BorderTypes.SOLID ,
                    prop_content:                              ReactiveElement.b(  {
                        children: [
                            prop_draggablePlaceholderContent
                        ]
                    })

                } ,
                <ComponentBorderMethodsType>{

                }
            );

            this.pr_addItemElementToListElements(extra?.draggableItem?.id , this._KEY_ELEMENT_PLACE_HOLDER , elPlaceholder);

            return elPlaceholder.getReactiveElement();

        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    private template_render_main_listOfItems_border(attrsDefault , data , extra) : ReactiveElement {

        if (data != null && extra?.draggableItem) {

            const prop_DraggableOrdersStatus=                     data[ComponentDraggableOrdersYConfigs.keys.prop_DraggableOrdersStatus.name];
            const prop_draggableClass=                            data[ComponentDraggableOrdersYConfigs.keys.prop_draggableClass.name];
            const prop_draggableStyles=                           data[ComponentDraggableOrdersYConfigs.keys.prop_draggableStyles.name];
            const prop_draggableBorderWidth=                      data[ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderWidth.name];
            const prop_draggableBorderRadius=                     data[ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderRadius.name];
            const prop_draggableBackgroundColor=                  data[ComponentDraggableOrdersYConfigs.keys.prop_draggableBackgroundColor.name];
            const prop_draggableBackgroundColor_hover=            data[ComponentDraggableOrdersYConfigs.keys.prop_draggableBackgroundColor_hover.name];
            const prop_draggableBackgroundColor_hoverForDrag=     data[ComponentDraggableOrdersYConfigs.keys.prop_draggableBackgroundColor_hoverForDrag.name];
            const prop_draggableBorderColor=                      data[ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderColor.name];
            const prop_draggableBorderColor_hover=                data[ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderColor_hover.name];
            const prop_draggableBorderColor_hoverForDrag=         data[ComponentDraggableOrdersYConfigs.keys.prop_draggableBorderColor_hoverForDrag.name];

            const prop_draggablePinedBackgroundColor=             data[ComponentDraggableOrdersYConfigs.keys.prop_draggablePinedBackgroundColor.name];
            const prop_draggablePinedBackgroundColor_hover=       data[ComponentDraggableOrdersYConfigs.keys.prop_draggablePinedBackgroundColor_hover.name];
            const prop_draggablePinedBorderColor=                 data[ComponentDraggableOrdersYConfigs.keys.prop_draggablePinedBorderColor.name];
            const prop_draggablePinedBorderColor_hover=           data[ComponentDraggableOrdersYConfigs.keys.prop_draggablePinedBorderColor_hover.name];


            const elBorder = new ToolsComponents.ComponentBorder(
                <ComponentBorderPropsType>{
                    prop_borderClass:             [
                        "mb-2"
                    ] ,
                    prop_borderStyles: {
                        cursor:          "pointer" ,
                        "user-select":   "none"
                    } ,

                    classList:                                 prop_draggableClass  ,
                    styles:                                    prop_draggableStyles  ,
                    prop_content:                              this.executeSchemaPart(ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems_Border_Content.name , extra) ,
                    prop_borderRadius:                         prop_draggableBorderRadius ,
                    prop_borderWidth:                          prop_draggableBorderWidth ,
                    prop_borderType:                           ComponentBorder_BorderTypes.DASHED ,

                    prop_borderColor:                          Observable.computed((colorDefault , colorPined , colorHovered, idHovered) => {
                        if (extra?.draggableItem?.isPin){
                            return colorPined;
                        }
                        else {
                            if (idHovered == extra?.draggableItem?.id){
                                return colorHovered;
                            }
                            return colorDefault
                        }
                    }, [ prop_draggableBorderColor , prop_draggablePinedBorderColor_hover , prop_draggableBorderColor_hoverForDrag  , this._dragHoveredId ], this.getScope()),

                    prop_borderColor_hover:                          Observable.computed((colorDefault  , colorPined , idHovered) => {
                        if (extra?.draggableItem?.isPin){
                            return colorPined;
                        }
                        else {
                            return colorDefault
                        }
                    }, [ prop_draggableBorderColor_hover , prop_draggablePinedBorderColor_hover  , this._dragHoveredId ], this.getScope()),



                    prop_contentBackgroundColor:               Observable.computed((bgDefault , bgPined , bgHovered , idHovered) => {
                        if (extra?.draggableItem?.isPin){
                            return bgPined;
                        }
                        else {
                            if (idHovered == extra?.draggableItem?.id){
                                return bgHovered;
                            }
                            return bgDefault
                        }
                    }, [ prop_draggableBackgroundColor , prop_draggablePinedBackgroundColor , prop_draggableBackgroundColor_hoverForDrag , this._dragHoveredId ], this.getScope()),

                    prop_contentBackgroundColor_hover:          Observable.computed((bgDefault , bgPined  , idHovered) => {
                        if (extra?.draggableItem?.isPin){
                            return bgPined;
                        }
                        else {
                            return bgDefault
                        }
                    }, [ prop_draggableBackgroundColor_hover , prop_draggablePinedBackgroundColor_hover  , this._dragHoveredId ], this.getScope()),

                } ,
                <ComponentBorderMethodsType>{
                    fn_onMouseDownBorder: (event, dataArgs:ComponentBorder_Methods_MOUSE_DOWN_BORDER_DataArgs, componentArgs:ComponentBorder_Methods_MOUSE_DOWN_BORDER_ComponentArgs) => {
                        const target = event.target as HTMLElement;
                        if (target.closest(`svg`)){
                            return;
                        }

                        prop_DraggableOrdersStatus.map(isActive => {
                            const isPin = this.pr_getStatusItemIsPin(extra?.draggableItem?.id ?? null);
                            if (isActive && !isPin){
                                this.pr_setBorderStarted(extra?.draggableItem?.id , event)
                            }
                        })
                    } ,
                } ,
                {
                    mouseenter: (event)=>{
                        this.pr_setStatusShowIconPin(extra?.draggableItem?.id , true)
                    } ,
                    mouseleave: (event)=>{
                        this.pr_setStatusShowIconPin(extra?.draggableItem?.id , false)
                    }
                }
            );

            this.pr_addItemElementToListElements(extra?.draggableItem?.id , this._KEY_ELEMENT_BORDER , elBorder);

            return elBorder.getReactiveElement();
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    private template_render_main_listOfItems_border_content(attrsDefault , data , extra) : ReactiveElement {

        if (data != null && extra?.draggableItem) {

            const prop_draggablePinStatus=                         data[ComponentDraggableOrdersYConfigs.keys.prop_draggablePinStatus.name];

            return ReactiveElement.part(  "section" ,{
                attrs: {
                    ...attrsDefault
                },
                styles: {},
                className: [
                    "position-relative" , "p-1"
                ] ,
                children: [
                    extra.draggableItem?.body ,
                    prop_draggablePinStatus.map( isActive => {
                            if (isActive){
                                return this.executeSchemaPart(ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems_Border_Content_Position.name , extra)
                            }
                            return null;
                        }, this.getScope()
                    ),
                ]
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    private template_render_main_listOfItems_border_content_position(attrsDefault , data , extra) : ReactiveElement {

        if (data != null && extra?.draggableItem) {

            return new ComponentElementPosition(
                <ComponentElementPositionPropsType>{
                    prop_positionTop:        SizeUnit(10 , UNITS.PEXEL) ,
                    prop_positionStart:      SizeCalc(SizeUnit(100 , UNITS.PERCENT) , OPERATION.MINUS , SizeUnit(25 , UNITS.PEXEL) ) ,
                    prop_positionTranslate:  TranslateUnit(SizeUnit(0 , UNITS.PERCENT) , SizeUnit(-50 , UNITS.PERCENT)) ,
                    prop_positionZIndex:     ToolsCss.getZIndex(Z_INDEXES.icon_attach) ,
                    prop_positionWidth:      null ,
                    prop_positionHeight:     null ,
                    prop_content:            this.executeSchemaPart(ComponentDraggableOrdersYConfigs.schemas.Main_ListOfItems_Border_Content_Position_IconPin.name , extra)
                } ,
                <ComponentElementPositionMethodsType>{

                }
            ).getReactiveElement()
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    private template_render_main_listOfItems_border_content_position_iconPin(attrsDefault , data , extra) : ReactiveElement {

        if (data != null && extra?.draggableItem) {

            const prop_draggableIconPinOpen=                         data[ComponentDraggableOrdersYConfigs.keys.prop_draggableIconPinOpen.name];
            const prop_draggableIconPinClose=                         data[ComponentDraggableOrdersYConfigs.keys.prop_draggableIconPinClose.name];

            const itemPin = new ToolsComponents.ComponentIcon(
                <ComponentIconPropsType>{
                    prop_structureStyles: {
                        width: "20px" ,
                        height: "20px"
                    },
                    prop_icon:          Observable.computed(( iconPinOpen , iconPinClose  ) => {
                            if (extra.draggableItem.hasOwnProperty("isPin")){
                                if (extra.draggableItem.isPin){
                                    return iconPinOpen
                                }
                                else {
                                    return iconPinClose
                                }
                            }
                            return iconPinClose
                        },
                        [prop_draggableIconPinOpen , prop_draggableIconPinClose ], this.getScope()
                    ) ,
                    prop_show: false
                } ,
                <ComponentIconMethodsType>{
                    fn_onClickIcon: function (event, dataArgs : ComponentIcon_Methods_CLICK_DataArgs, componentArgs: ComponentIcon_Methods_CLICK_ComponentArgs) {
                        event.preventDefault();
                        event.stopPropagation();
                        this.pr_setStatusSourceIconPin(extra?.draggableItem?.id ?? null);
                    }.bind(this)
                }
            )

            this.pr_addItemElementToListElements(extra?.draggableItem?.id , this._KEY_ELEMENT_PIN , itemPin);

            return itemPin.getReactiveElement();
        }


        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }




    /* ---------------------------------------------
       Functions
    --------------------------------------------- */
    //// for control elements
    private pr_addIdToListElements(itemId){
        this._LIST_ELEMENTS.push({
            [this._KEY_ID]: itemId
        })
    }

    private pr_addItemElementToListElements(itemId , elementKey , elementValue){
        for (let i = 0; i <this._LIST_ELEMENTS.length; i++) {
            const item = this._LIST_ELEMENTS[i];
            if (item && item[this._KEY_ID] && item && item[this._KEY_ID] == itemId){
                this._LIST_ELEMENTS[i][elementKey] = elementValue;
                break;
            }
        }
        return null;
    }

    private pr_getElementFromListElements(itemId , elementKey){
        for (let i = 0; i <this._LIST_ELEMENTS.length; i++) {
            const item = this._LIST_ELEMENTS[i];
            if (item && item[this._KEY_ID] && item && item[this._KEY_ID] == itemId){
                return this._LIST_ELEMENTS[i][elementKey];
            }
        }
        return null;
    }




    //// for element pins
    private pr_getStatusItemIsPin(itemPinId){
        const prop_draggableItems =  this.get(ComponentDraggableOrdersYConfigs.keys.prop_draggableItems.name);
        if (prop_draggableItems){
            for (let i = 0; i < prop_draggableItems.length; i++) {
                const item = prop_draggableItems[i];
                if (item && item?.id && item.id == itemPinId){
                    return prop_draggableItems[i]?.isPin ?? false
                }
            }
        }
        return null;
    }

    private pr_setStatusShowIconPin(itemPinId , status){
        const itemPin = this.pr_getElementFromListElements(itemPinId , this._KEY_ELEMENT_PIN)
        if (itemPin &&  itemPin instanceof ToolsComponents.ComponentIcon){
            itemPin.set(GOG_ComponentBasicConfigs_Component_Structure_keys.prop_show.name , status);
        }
    }

    private pr_setStatusSourceIconPin(itemPinId){
        const prop_draggableItems =        this.get(ComponentDraggableOrdersYConfigs.keys.prop_draggableItems.name);
        const prop_draggableIconPinOpen =  this.get(ComponentDraggableOrdersYConfigs.keys.prop_draggableIconPinOpen.name);
        const prop_draggableIconPinClose = this.get(ComponentDraggableOrdersYConfigs.keys.prop_draggableIconPinClose.name);

        if (prop_draggableItems){
            for (let i = 0; i < prop_draggableItems.length; i++) {
                const item = prop_draggableItems[i];
                if (item && item?.id && item.id == itemPinId){
                    const status = !prop_draggableItems[i]["isPin"]
                    prop_draggableItems[i]["isPin"] = status;

                    const itemPin = this.pr_getElementFromListElements(itemPinId , this._KEY_ELEMENT_PIN)
                    if (itemPin  && itemPin instanceof ToolsComponents.ComponentIcon){
                        itemPin.set(ComponentIconProps.prop_icon , status ? prop_draggableIconPinOpen : prop_draggableIconPinClose);
                    }

                }
            }
        }
        this.set(ComponentDraggableOrdersYConfigs.keys.prop_draggableItems.name , prop_draggableItems);

        const prop_DraggableOrders = this.get(ComponentDraggableOrdersYProps.prop_DraggableOrders);
        this.pr_updateOrders(prop_DraggableOrders);
    }




    //// for element border
    private pr_setBorderStarted(itemBorderId , event){

        this._dragStartY=    event.clientY;
        this._dragStarted=   false;
        this._dragStartTimer = setTimeout(()=> {
            if (!this._dragStarted){
                this._dragStarted = true;
                this.pr_startDrag(itemBorderId , event)
            }
        } , 200)


        this._onMouseMove = this.pr_handleMouseMove.bind(this , itemBorderId)
        document.addEventListener('mousemove', this._onMouseMove)

        this._onMouseUp = this.pr_handleMouseUp.bind(this , itemBorderId)
        document.addEventListener('mouseup', this._onMouseUp)
    }

    private pr_startDrag(itemBorderId , event){
        this._DRAG_ELEMENT_ID_ACTIVE = itemBorderId;

        const elPlaceHolder = this.pr_getElementFromListElements(itemBorderId, this._KEY_ELEMENT_PLACE_HOLDER);
        elPlaceHolder.set(GOG_ComponentBasicConfigs_Component_Structure_keys.prop_show.name , true);

        const mouseY = event?.clientY ?? null;
        this.pr_setPositionBorder(mouseY, itemBorderId)

    }


    private pr_handleMouseMove(itemBorderId , event){
        if (this._dragStartY == null) return;

        const delta = Math.abs(event.clientY - this._dragStartY)

        if (delta>5 && !this._dragStarted){
            clearTimeout(this._dragStartTimer);
            this._dragStarted = true;
            this.pr_startDrag(itemBorderId , event);
        }

        if (this._dragStarted){
            this.pr_setBorderContinue(itemBorderId , event)
        }
    }

    private pr_setBorderContinue( itemBorderId , event){

        if (this._DRAG_ELEMENT_ID_ACTIVE  == null) return;

        if ( this._DRAG_ELEMENT_ID_ACTIVE == itemBorderId){
            const mouseY = event?.clientY ?? null;

            const itemHovered = this.pr_getPositionHover(mouseY);
            if (itemHovered != null && itemBorderId != itemHovered){
                this._dragHoveredId.set(itemHovered)
            }

            this.pr_setPositionBorder(mouseY , itemBorderId)
        }
    }

    private pr_handleMouseUp(itemBorderId , event){
        clearTimeout(this._dragStartTimer);

        if (this._dragStarted) {
            this.pr_setBorderEnd(itemBorderId, event)
        };

        this._dragStartY=    null;
        this._dragStarted=   false;

        document.removeEventListener('mousemove', this._onMouseMove);
        document.removeEventListener('mouseup', this._onMouseUp);
    }

    private pr_setBorderEnd(itemBorderId , event){

        if (this._dragStartTimer){
            clearTimeout(this._dragStartTimer);
            this._dragStartTimer = null;
        }

        if (this._DRAG_ELEMENT_ID_ACTIVE  == null) return;

        this._DRAG_ELEMENT_ID_ACTIVE = null;
        document.removeEventListener('mousemove', this._onMouseMove);
        document.removeEventListener('mouseup', this._onMouseUp);
        this._dragHoveredId.set(null)

        const mouseY = event?.clientY ?? null;
        this.pr_setPositionBorder(mouseY, itemBorderId)

        let newIndex = this.pr_getPositionHover(mouseY);
        for (let i = 0; i <this._LIST_ELEMENTS.length; i++) {
            const item = this._LIST_ELEMENTS[i];
            if (item && item[this._KEY_ID] &&
                item[this._KEY_ELEMENT_BORDER]  &&
                item[this._KEY_ELEMENT_PLACE_HOLDER] ){

                item[this._KEY_ELEMENT_BORDER].set(GOG_ComponentBasicConfigs_Component_Structure_keys.prop_structureClass.name , []);
                item[this._KEY_ELEMENT_PLACE_HOLDER].set(GOG_ComponentBasicConfigs_Component_Structure_keys.prop_show.name , false);
            }
        }

        if (newIndex != null){
            const items = this.get(ComponentDraggableOrdersYProps.prop_draggableItems);
            const orders = [...this.get(ComponentDraggableOrdersYProps.prop_DraggableOrders)];

            const allIds = items.map(item => item.id);

            const fullOrder = [
                ... orders ,
                ...allIds.filter(id => !orders.includes(id))
            ];

            const from = fullOrder.indexOf(itemBorderId);
            const to = fullOrder.indexOf(newIndex);

            const removed = fullOrder.splice(from , 1);
            const item = removed[0]

            if (!item) return;

            fullOrder.splice(to , 0 , item);

            this.pr_updateOrders(fullOrder);
        }
    }


    private pr_setPositionBorder(mouseY , itemId){

        const elBorder = this.pr_getElementFromListElements(itemId, this._KEY_ELEMENT_BORDER);
        const elBorderRect = elBorder?.getElement()?.getBoundingClientRect();

        const mainRect = this._MAIN_ELEMENT?.getElement()?.getBoundingClientRect();

        if (mouseY != null && elBorderRect && mainRect){
            elBorder.set(GOG_ComponentBasicConfigs_Component_Structure_keys.prop_structureClass.name , ["position-absolute" , "w-100"]);

            const position = mouseY - mainRect?.top - elBorderRect.height/2;

            elBorder.set(GOG_ComponentBasicConfigs_Component_Structure_keys.prop_structureStyles.name , {
                "top" :       SizeUnit(position , UNITS.PEXEL) ,
                "z-index" :   ToolsCss.getZIndex(Z_INDEXES.menu_main)
            });
        }
    }


    private pr_getPositionHover(mouseY){
        let newIndex = null;
        for (let i = 0; i <this._LIST_ELEMENTS.length; i++) {
            const item = this._LIST_ELEMENTS[i];
            if (item && item[this._KEY_ID] &&
                item[this._KEY_ELEMENT_BORDER]  &&
                item[this._KEY_ELEMENT_PLACE_HOLDER] ){

                const border = item[this._KEY_ELEMENT_BORDER];
                if (newIndex == null){
                    const elBorderRect = border?.getElement()?.getBoundingClientRect();
                    const midle = elBorderRect.top + elBorderRect.height/2;
                    if (mouseY < midle){
                        newIndex = item[this._KEY_ID];
                    }
                }

            }
        }

        return newIndex;
    }


    private pr_getElementOrders(items , orders){

        const pinned = items.filter(el => el.isPin);
        const unpinned = items.filter(el => !el.isPin);

        const map = Object.fromEntries(
            unpinned.map(el => [el.id , el])
        )

        const orderedSet = new Set(orders)
        return [
            ...pinned ,
            ...orders.map(id => map[id]).filter(Boolean) ,
            ...unpinned.filter(el => !orderedSet.has(el.id))
        ]
    }


    private pr_updateOrders(orders){
        const prop_draggableItems = this.get(ComponentDraggableOrdersYProps.prop_draggableItems);
        const dataOrdered = this.pr_getElementOrders(prop_draggableItems , orders)
        this.set(ComponentDraggableOrdersYProps.prop_DraggableOrders , dataOrdered.filter(Boolean).map(item=> item.id));

        const params : ComponentDraggableOrdersY_Methods_UPDATE_DataArgs = {};
        this.executeMethod(ComponentDraggableOrdersYConfigs.methods.UPDATE.name , event , params);
    }


}
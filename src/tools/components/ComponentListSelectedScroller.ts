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
import {ComponentCallBackType} from "../../core/ComponentBase";
import {Language} from "../../core/Language";
import {AppConfig} from "../../core/AppConfig";
import {
    Color,
    COLORS_GRAD,
    COLORS_MAIN,
    SIZES,
    UNITS
} from "../../utils/ToolsConsts";
import {
    GOG_ComponentBasicConfigs_Component_keys,
    GOG_ComponentBasicConfigs_Component_parts,
    GOG_ComponentBasicConfigs_Component_Pattern,
    GOG_ComponentBasicConfigs_Component_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_keys,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_parts,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_value_parts,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_keys,
    GOG_ComponentBasicConfigs_Component_Structure_parts,
    GOG_ComponentBasicConfigs_Component_Structure_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_Schema,
    GOG_ComponentBasicConfigs_partDoseNotBody,
    GOG_ComponentBasicProps_Component,
    GOG_ComponentBasicProps_Component_Structure,
    GOG_ComponentBasicProps_Component_Structure_FormInput,
    GOG_ComponentBasicProps_Component_Structure_FormInput_Value,
} from "../../core/component/SetupComponent";
import {Observable} from "../../core/Observable";
import {
    ComponentBorder,
    ComponentBorder_BorderTypes,
    ComponentBorder_Methods_CLICK_BORDER_ComponentArgs,
    ComponentBorder_Methods_CLICK_BORDER_DataArgs,
    ComponentBorderMethodsType,
    ComponentBorderPropsType
} from "./ComponentBorder";
import {
    ComponentIcon,
    ComponentIcon_Methods_CLICK_ComponentArgs,
    ComponentIcon_Methods_CLICK_DataArgs,
    ComponentIconMethodsType,
    ComponentIconPropsType
} from "./ComponentIcon";
import {ToolsIcons} from "../icons";

export const ComponentListSelectedScrollerProps = {
    ...GOG_ComponentBasicProps_Component,
    ...GOG_ComponentBasicProps_Component_Structure,
    ...GOG_ComponentBasicProps_Component_Structure_FormInput,
    ...GOG_ComponentBasicProps_Component_Structure_FormInput_Value ,

    prop_borderBackgroundColor:     "prop_borderBackgroundColor",
    prop_borderColor:               "prop_borderColor",
    prop_borderClass:               "prop_borderClass",
    prop_borderStyles:              "prop_borderStyles",
    prop_borderWidth:               "prop_borderWidth",
    prop_borderRadius:              "prop_borderRadius",

    prop_list:                      "prop_list",
    prop_listMaxShow:               "prop_listMaxShow",
    prop_listType:                  "prop_listType",
    prop_listFreezeSeparator:       "prop_listFreezeSeparator",

    prop_listBorderBackgroundColor: "prop_listBorderBackgroundColor",
    prop_listBorderColor:           "prop_listBorderColor",
    prop_listBorderClass:           "prop_listBorderClass",
    prop_listBorderStyles:          "prop_listBorderStyles",
    prop_listBorderWidth:           "prop_listBorderWidth",
    prop_listBorderRadius:          "prop_listBorderRadius",

    prop_listTitleColor:            "prop_listTitleColor",
    prop_listTitleClass:            "prop_listTitleClass",
    prop_listTitleStyles:           "prop_listTitleStyles",

    prop_listIconCloseClass:        "prop_listIconCloseClass",
    prop_listIconCloseStyles:       "prop_listIconCloseStyles"
} as const;

export enum ComponentListSelectedScroller_ListTypes {
    ACTIVE = "active",
    FREEZE = "freeze"
}

export type propListSelectedScroller_List = {
    id: string | number;
    title?: Observable<string> | string | null;
    canDelete?: boolean;
};

const ComponentListSelectedScrollerConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_keys ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys ,

        [ComponentListSelectedScrollerProps.prop_borderBackgroundColor]: {
            name: ComponentListSelectedScrollerProps.prop_borderBackgroundColor,
            value: GOG_SetValue<any>(Color(COLORS_MAIN.SHAN, COLORS_GRAD.GRADE_1))
        },
        [ComponentListSelectedScrollerProps.prop_borderColor]: {
            name: ComponentListSelectedScrollerProps.prop_borderColor,
            value: GOG_SetValue<any>(Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1))
        },
        [ComponentListSelectedScrollerProps.prop_borderClass]: {
            name: ComponentListSelectedScrollerProps.prop_borderClass,
            value: GOG_SetValue<string[]>([])
        },
        [ComponentListSelectedScrollerProps.prop_borderStyles]: {
            name: ComponentListSelectedScrollerProps.prop_borderStyles,
            value: GOG_SetValue<Record<string, string>>({ display: "flow-root" })
        },
        [ComponentListSelectedScrollerProps.prop_borderWidth]: {
            name: ComponentListSelectedScrollerProps.prop_borderWidth,
            value: GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M)
        },
        [ComponentListSelectedScrollerProps.prop_borderRadius]: {
            name: ComponentListSelectedScrollerProps.prop_borderRadius,
            value: GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.M)
        },

        [ComponentListSelectedScrollerProps.prop_listType]: {
            name: ComponentListSelectedScrollerProps.prop_listType,
            value: GOG_SetValue<GOG_ValueOf<typeof ComponentListSelectedScroller_ListTypes>>(ComponentListSelectedScroller_ListTypes.ACTIVE)
        },
        [ComponentListSelectedScrollerProps.prop_list]: {
            name: ComponentListSelectedScrollerProps.prop_list,
            value: GOG_SetValue<propListSelectedScroller_List[]>([])
        },
        [ComponentListSelectedScrollerProps.prop_listMaxShow]: {
            name: ComponentListSelectedScrollerProps.prop_listMaxShow,
            value: GOG_SetValue<number | null>(null)
        },
        [ComponentListSelectedScrollerProps.prop_listFreezeSeparator]: {
            name: ComponentListSelectedScrollerProps.prop_listFreezeSeparator,
            value: GOG_SetValue<string>("/")
        },

        [ComponentListSelectedScrollerProps.prop_listBorderBackgroundColor]: {
            name: ComponentListSelectedScrollerProps.prop_listBorderBackgroundColor,
            value: GOG_SetValue<any>(Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_5))
        },
        [ComponentListSelectedScrollerProps.prop_listBorderColor]: {
            name: ComponentListSelectedScrollerProps.prop_listBorderColor,
            value: GOG_SetValue<any>(Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1))
        },
        [ComponentListSelectedScrollerProps.prop_listBorderClass]: {
            name: ComponentListSelectedScrollerProps.prop_listBorderClass,
            value: GOG_SetValue<string[]>([])
        },
        [ComponentListSelectedScrollerProps.prop_listBorderStyles]: {
            name: ComponentListSelectedScrollerProps.prop_listBorderStyles,
            value: GOG_SetValue<Record<string, string>>({})
        },
        [ComponentListSelectedScrollerProps.prop_listBorderWidth]: {
            name: ComponentListSelectedScrollerProps.prop_listBorderWidth,
            value: GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.XS)
        },
        [ComponentListSelectedScrollerProps.prop_listBorderRadius]: {
            name: ComponentListSelectedScrollerProps.prop_listBorderRadius,
            value: GOG_SetValue<GOG_ValueOf<typeof SIZES> | number>(SIZES.S)
        },

        [ComponentListSelectedScrollerProps.prop_listTitleColor]: {
            name: ComponentListSelectedScrollerProps.prop_listTitleColor,
            value: GOG_SetValue<any>(Color(COLORS_MAIN.SHAN , COLORS_GRAD.GRADE_5))
        },
        [ComponentListSelectedScrollerProps.prop_listTitleClass]: {
            name: ComponentListSelectedScrollerProps.prop_listTitleClass,
            value: GOG_SetValue<string[]>([])
        },
        [ComponentListSelectedScrollerProps.prop_listTitleStyles]: {
            name: ComponentListSelectedScrollerProps.prop_listTitleStyles,
            value: GOG_SetValue<Record<string, string>>({})
        },

        [ComponentListSelectedScrollerProps.prop_listIconCloseClass]: {
            name: ComponentListSelectedScrollerProps.prop_listIconCloseClass,
            value: GOG_SetValue<string[]>([])
        },
        [ComponentListSelectedScrollerProps.prop_listIconCloseStyles]: {
            name: ComponentListSelectedScrollerProps.prop_listIconCloseStyles,
            value: GOG_SetValue<Record<string, string>>({})
        }
    },
    schemas: {
        ...GOG_ComponentBasicConfigs_Component_parts,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_parts ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_value_parts ,
        Border:                            { name: "part-border" },
        Border_List:                       { name: "part-border-list" },
        Border_List_ItemBorder:            { name: "part-border-list-itemBorder" },
        Border_List_ItemBorder_Title:      { name: "part-border-list-itemBorder-title" },
        Border_List_ItemBorder_IconClose:  { name: "part-border-list-itemBorder-iconClose" }
    },
    templates: {},
    methods: {
        DELETE_ITEM: {
            name: "fn_onDeleteItem",
            dataArgs: {
                ID: { name: "ID" }
            },
            componentArgs: {
                LIST: {
                    name: ComponentListSelectedScrollerProps.prop_list
                },
                VALUE: {
                    name: GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name
                }
            }
        }
    }
} as const;

export type ComponentListSelectedScrollerPropsType = GOG_ExtractNameValue<typeof ComponentListSelectedScrollerConfigs.keys>;
export type ComponentListSelectedScrollerSchemaType = GOG_ExtractName<typeof ComponentListSelectedScrollerConfigs.schemas>;
export type ComponentListSelectedScrollerTemplatesType = GOG_ExtractName<typeof ComponentListSelectedScrollerConfigs.templates>;

export type ComponentListSelectedScroller_Methods_DELETE_ITEM_ComponentArgs = GOG_ExtractName<typeof ComponentListSelectedScrollerConfigs.methods.DELETE_ITEM.componentArgs>;
export type ComponentListSelectedScroller_Methods_DELETE_ITEM_DataArgs = GOG_ExtractNameValue<typeof ComponentListSelectedScrollerConfigs.methods.DELETE_ITEM.dataArgs>;

export type ComponentListSelectedScrollerMethodsType = {
    [ComponentListSelectedScrollerConfigs.methods.DELETE_ITEM.name]: ComponentCallBackType<
        ComponentListSelectedScroller_Methods_DELETE_ITEM_ComponentArgs,
        ComponentListSelectedScroller_Methods_DELETE_ITEM_DataArgs
    >;
};

export abstract class ComponentListSelectedScrollerBase extends ComponentBase<
    ComponentListSelectedScrollerPropsType,
    ComponentListSelectedScrollerSchemaType,
    ComponentListSelectedScrollerTemplatesType,
    ComponentListSelectedScrollerMethodsType
> {

    _COMPONENT_PATTERN = defineComponentPatterns<ComponentListSelectedScrollerPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Pattern(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Pattern(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Pattern(this) ,

        [ComponentListSelectedScrollerConfigs.keys.prop_borderBackgroundColor.name]: {
            prop: ComponentListSelectedScrollerConfigs.keys.prop_borderBackgroundColor.name,
            default: ComponentListSelectedScrollerConfigs.keys.prop_borderBackgroundColor.value,
            title: Language.translate("components.list_selected_scroller.prop.prop_borderBackgroundColor.title"),
            description: Language.translate("components.list_selected_scroller.prop.prop_borderBackgroundColor.description")
        },
        [ComponentListSelectedScrollerConfigs.keys.prop_borderColor.name]: {
            prop: ComponentListSelectedScrollerConfigs.keys.prop_borderColor.name,
            default: ComponentListSelectedScrollerConfigs.keys.prop_borderColor.value,
            title: Language.translate("components.list_selected_scroller.prop.prop_borderColor.title"),
            description: Language.translate("components.list_selected_scroller.prop.prop_borderColor.description")
        },
        [ComponentListSelectedScrollerConfigs.keys.prop_borderClass.name]: {
            prop: ComponentListSelectedScrollerConfigs.keys.prop_borderClass.name,
            default: ComponentListSelectedScrollerConfigs.keys.prop_borderClass.value,
            title: Language.translate("components.list_selected_scroller.prop.prop_borderClass.title"),
            description: Language.translate("components.list_selected_scroller.prop.prop_borderClass.description")
        },
        [ComponentListSelectedScrollerConfigs.keys.prop_borderStyles.name]: {
            prop: ComponentListSelectedScrollerConfigs.keys.prop_borderStyles.name,
            default: ComponentListSelectedScrollerConfigs.keys.prop_borderStyles.value,
            title: Language.translate("components.list_selected_scroller.prop.prop_borderStyles.title"),
            description: Language.translate("components.list_selected_scroller.prop.prop_borderStyles.description")
        },
        [ComponentListSelectedScrollerConfigs.keys.prop_borderWidth.name]: {
            prop: ComponentListSelectedScrollerConfigs.keys.prop_borderWidth.name,
            default: ComponentListSelectedScrollerConfigs.keys.prop_borderWidth.value,
            title: Language.translate("components.list_selected_scroller.prop.prop_borderWidth.title"),
            description: Language.translate("components.list_selected_scroller.prop.prop_borderWidth.description")
        },
        [ComponentListSelectedScrollerConfigs.keys.prop_borderRadius.name]: {
            prop: ComponentListSelectedScrollerConfigs.keys.prop_borderRadius.name,
            default: ComponentListSelectedScrollerConfigs.keys.prop_borderRadius.value,
            title: Language.translate("components.list_selected_scroller.prop.prop_borderRadius.title"),
            description: Language.translate("components.list_selected_scroller.prop.prop_borderRadius.description")
        },

        [ComponentListSelectedScrollerConfigs.keys.prop_list.name]: {
            prop: ComponentListSelectedScrollerConfigs.keys.prop_list.name,
            default: ComponentListSelectedScrollerConfigs.keys.prop_list.value,
            title: Language.translate("components.list_selected_scroller.prop.prop_list.title"),
            description: Language.translate("components.list_selected_scroller.prop.prop_list.description")
        },
        [ComponentListSelectedScrollerConfigs.keys.prop_listMaxShow.name]: {
            prop: ComponentListSelectedScrollerConfigs.keys.prop_listMaxShow.name,
            default: ComponentListSelectedScrollerConfigs.keys.prop_listMaxShow.value,
            title: Language.translate("components.list_selected_scroller.prop.prop_listMaxShow.title"),
            description: Language.translate("components.list_selected_scroller.prop.prop_listMaxShow.description")
        },
        [ComponentListSelectedScrollerConfigs.keys.prop_listType.name]: {
            prop: ComponentListSelectedScrollerConfigs.keys.prop_listType.name,
            default: ComponentListSelectedScrollerConfigs.keys.prop_listType.value,
            title: Language.translate("components.list_selected_scroller.prop.prop_listType.title"),
            description: Language.translate("components.list_selected_scroller.prop.prop_listType.description")
        },
        [ComponentListSelectedScrollerConfigs.keys.prop_listFreezeSeparator.name]: {
            prop: ComponentListSelectedScrollerConfigs.keys.prop_listFreezeSeparator.name,
            default: ComponentListSelectedScrollerConfigs.keys.prop_listFreezeSeparator.value,
            title: Language.translate("components.list_selected_scroller.prop.prop_listFreezeSeparator.title"),
            description: Language.translate("components.list_selected_scroller.prop.prop_listFreezeSeparator.description")
        },

        [ComponentListSelectedScrollerConfigs.keys.prop_listBorderBackgroundColor.name]: {
            prop: ComponentListSelectedScrollerConfigs.keys.prop_listBorderBackgroundColor.name,
            default: ComponentListSelectedScrollerConfigs.keys.prop_listBorderBackgroundColor.value,
            title: Language.translate("components.list_selected_scroller.prop.prop_listBorderBackgroundColor.title"),
            description: Language.translate("components.list_selected_scroller.prop.prop_listBorderBackgroundColor.description")
        },
        [ComponentListSelectedScrollerConfigs.keys.prop_listBorderColor.name]: {
            prop: ComponentListSelectedScrollerConfigs.keys.prop_listBorderColor.name,
            default: ComponentListSelectedScrollerConfigs.keys.prop_listBorderColor.value,
            title: Language.translate("components.list_selected_scroller.prop.prop_listBorderColor.title"),
            description: Language.translate("components.list_selected_scroller.prop.prop_listBorderColor.description")
        },
        [ComponentListSelectedScrollerConfigs.keys.prop_listBorderClass.name]: {
            prop: ComponentListSelectedScrollerConfigs.keys.prop_listBorderClass.name,
            default: ComponentListSelectedScrollerConfigs.keys.prop_listBorderClass.value,
            title: Language.translate("components.list_selected_scroller.prop.prop_listBorderClass.title"),
            description: Language.translate("components.list_selected_scroller.prop.prop_listBorderClass.description")
        },
        [ComponentListSelectedScrollerConfigs.keys.prop_listBorderStyles.name]: {
            prop: ComponentListSelectedScrollerConfigs.keys.prop_listBorderStyles.name,
            default: ComponentListSelectedScrollerConfigs.keys.prop_listBorderStyles.value,
            title: Language.translate("components.list_selected_scroller.prop.prop_listBorderStyles.title"),
            description: Language.translate("components.list_selected_scroller.prop.prop_listBorderStyles.description")
        },
        [ComponentListSelectedScrollerConfigs.keys.prop_listBorderWidth.name]: {
            prop: ComponentListSelectedScrollerConfigs.keys.prop_listBorderWidth.name,
            default: ComponentListSelectedScrollerConfigs.keys.prop_listBorderWidth.value,
            title: Language.translate("components.list_selected_scroller.prop.prop_listBorderWidth.title"),
            description: Language.translate("components.list_selected_scroller.prop.prop_listBorderWidth.description")
        },
        [ComponentListSelectedScrollerConfigs.keys.prop_listBorderRadius.name]: {
            prop: ComponentListSelectedScrollerConfigs.keys.prop_listBorderRadius.name,
            default: ComponentListSelectedScrollerConfigs.keys.prop_listBorderRadius.value,
            title: Language.translate("components.list_selected_scroller.prop.prop_listBorderRadius.title"),
            description: Language.translate("components.list_selected_scroller.prop.prop_listBorderRadius.description")
        },

        [ComponentListSelectedScrollerConfigs.keys.prop_listTitleColor.name]: {
            prop: ComponentListSelectedScrollerConfigs.keys.prop_listTitleColor.name,
            default: ComponentListSelectedScrollerConfigs.keys.prop_listTitleColor.value,
            title: Language.translate("components.list_selected_scroller.prop.prop_listTitleColor.title"),
            description: Language.translate("components.list_selected_scroller.prop.prop_listTitleColor.description")
        },
        [ComponentListSelectedScrollerConfigs.keys.prop_listTitleClass.name]: {
            prop: ComponentListSelectedScrollerConfigs.keys.prop_listTitleClass.name,
            default: ComponentListSelectedScrollerConfigs.keys.prop_listTitleClass.value,
            title: Language.translate("components.list_selected_scroller.prop.prop_listTitleClass.title"),
            description: Language.translate("components.list_selected_scroller.prop.prop_listTitleClass.description")
        },
        [ComponentListSelectedScrollerConfigs.keys.prop_listTitleStyles.name]: {
            prop: ComponentListSelectedScrollerConfigs.keys.prop_listTitleStyles.name,
            default: ComponentListSelectedScrollerConfigs.keys.prop_listTitleStyles.value,
            title: Language.translate("components.list_selected_scroller.prop.prop_listTitleStyles.title"),
            description: Language.translate("components.list_selected_scroller.prop.prop_listTitleStyles.description")
        },

        [ComponentListSelectedScrollerConfigs.keys.prop_listIconCloseClass.name]: {
            prop: ComponentListSelectedScrollerConfigs.keys.prop_listIconCloseClass.name,
            default: ComponentListSelectedScrollerConfigs.keys.prop_listIconCloseClass.value,
            title: Language.translate("components.list_selected_scroller.prop.prop_listIconCloseClass.title"),
            description: Language.translate("components.list_selected_scroller.prop.prop_listIconCloseClass.description")
        },
        [ComponentListSelectedScrollerConfigs.keys.prop_listIconCloseStyles.name]: {
            prop: ComponentListSelectedScrollerConfigs.keys.prop_listIconCloseStyles.name,
            default: ComponentListSelectedScrollerConfigs.keys.prop_listIconCloseStyles.value,
            title: Language.translate("components.list_selected_scroller.prop.prop_listIconCloseStyles.title"),
            description: Language.translate("components.list_selected_scroller.prop.prop_listIconCloseStyles.description")
        }
    });

    _COMPONENT_SCHEMA = defineComponentSchema<ComponentListSelectedScrollerSchemaType, ComponentListSelectedScrollerPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Schema(this) ,
        ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_Schema(this) ,

        [ComponentListSelectedScrollerConfigs.schemas.Border.name]: {
            part: ComponentListSelectedScrollerConfigs.schemas.Border.name,
            title: Language.translate("components.list_selected_scroller.schema.border.title"),
            description: Language.translate("components.list_selected_scroller.schema.border.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_borderBackgroundColor.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_borderColor.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_borderClass.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_borderStyles.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_borderWidth.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_borderRadius.name]
            ]
        },
        [ComponentListSelectedScrollerConfigs.schemas.Border_List.name]: {
            part: ComponentListSelectedScrollerConfigs.schemas.Border_List.name,
            title: Language.translate("components.list_selected_scroller.schema.border_list.title"),
            description: Language.translate("components.list_selected_scroller.schema.border_list.description"),
            props: [          
                this._COMPONENT_PATTERN[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name],

                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_list.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listMaxShow.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listType.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listFreezeSeparator.name],

                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listBorderBackgroundColor.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listBorderColor.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listBorderClass.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listBorderStyles.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listBorderWidth.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listBorderRadius.name],

                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listTitleColor.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listTitleClass.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listTitleStyles.name],

                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listIconCloseClass.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listIconCloseStyles.name]
            ]
        },
        [ComponentListSelectedScrollerConfigs.schemas.Border_List_ItemBorder.name]: {
            part: ComponentListSelectedScrollerConfigs.schemas.Border_List_ItemBorder.name,
            title: Language.translate("components.list_selected_scroller.schema.list_item.title"),
            description: Language.translate("components.list_selected_scroller.schema.list_item.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listBorderBackgroundColor.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listBorderColor.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listBorderClass.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listBorderStyles.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listBorderWidth.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listBorderRadius.name]
            ]
        },
        [ComponentListSelectedScrollerConfigs.schemas.Border_List_ItemBorder_Title.name]: {
            part: ComponentListSelectedScrollerConfigs.schemas.Border_List_ItemBorder_Title.name,
            title: Language.translate("components.list_selected_scroller.schema.item_title.title"),
            description: Language.translate("components.list_selected_scroller.schema.item_title.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listTitleColor.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listTitleClass.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listTitleStyles.name]
            ]
        },
        [ComponentListSelectedScrollerConfigs.schemas.Border_List_ItemBorder_IconClose.name]: {
            part: ComponentListSelectedScrollerConfigs.schemas.Border_List_ItemBorder_IconClose.name,
            title: Language.translate("components.list_selected_scroller.schema.item_icon_close.title"),
            description: Language.translate("components.list_selected_scroller.schema.item_icon_close.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listIconCloseClass.name],
                this._COMPONENT_PATTERN[ComponentListSelectedScrollerConfigs.keys.prop_listIconCloseStyles.name]
            ]
        }
    });

    _COMPONENT_TEMPLATES = defineComponentTemplate<ComponentListSelectedScrollerTemplatesType, ComponentListSelectedScrollerPropsType>({});

    _COMPONENT_METHODS = defineComponentMethods<ComponentListSelectedScrollerMethodsType, ComponentListSelectedScrollerPropsType>({
        [ComponentListSelectedScrollerConfigs.methods.DELETE_ITEM.name]: {
            title: Language.translate("components.list_selected_scroller.methods.fn_onDeleteItem.title"),
            description: Language.translate("components.list_selected_scroller.methods.fn_onDeleteItem.description"),
            args: {
                
            }
        }
    });

    static override renderExampleComponent(): HTMLElement {
        return new ComponentListSelectedScroller(
            <ComponentListSelectedScrollerPropsType>{
                classList: ["col-md-3", "col-12", "border", "p-2"],
                styles: {},
                
                prop_name:        "checkbox_name",
                prop_value:       [1,2,3,4] ,
                prop_listType :   "active" ,
                prop_list: [
                    { id: 1, title: "itemA" },
                    { id: 2, title: "itemB" },
                    { id: 3, title: "itemC" },
                    { id: 4, title: "itemD" },
                    { id: 5, title: "itemE" },
                    { id: 6, title: "itemF" },
                    { id: 7, title: "itemG" }
                ]
            },
            <ComponentListSelectedScrollerMethodsType>{
                fn_onDeleteItem: (event, dataArgs, componentArgs) => {
                    console.log("delete", dataArgs , componentArgs);
                }
            }
        ).getElement();
    }
}

export class ComponentListSelectedScroller extends ComponentListSelectedScrollerBase {

    constructor(
        config: ComponentListSelectedScrollerPropsType,
        methods: ComponentListSelectedScrollerMethodsType,
        events = null
    ) {
        super("list-selected-scroller", null);
        super.renderComponent(config, methods, events);
    }

    override renderContentComponent() : ReactiveElement {
        return this.executeSchemaPart(ComponentListSelectedScrollerConfigs.schemas.Border.name) as any;
    }

    override renderManagerComponent(partName: any , attrsDefault: any, data: any , extra: any) : ReactiveElement {
        switch (partName) {
            case ComponentListSelectedScrollerConfigs.schemas.Border.name:
                return this.template_render_border(attrsDefault , data , extra);
            case ComponentListSelectedScrollerConfigs.schemas.Border_List.name:
                return this.template_render_border_list(attrsDefault , data , extra);
            case ComponentListSelectedScrollerConfigs.schemas.Border_List_ItemBorder.name:
                return this.template_render_list_itemBorder(attrsDefault , data , extra);
            case ComponentListSelectedScrollerConfigs.schemas.Border_List_ItemBorder_Title.name:
                return this.template_render_itemBorder_title(attrsDefault , data , extra);
            case ComponentListSelectedScrollerConfigs.schemas.Border_List_ItemBorder_IconClose.name:
                return this.template_render_itemBorder_iconClose(attrsDefault , data , extra);
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    private template_render_border(attrsDefault: any , data: any , extra: any) : ReactiveElement {

        if (data != null) {

            const prop_borderBackgroundColor=        data[ComponentListSelectedScrollerConfigs.keys.prop_borderBackgroundColor.name];
            const prop_borderColor=                  data[ComponentListSelectedScrollerConfigs.keys.prop_borderColor.name];
            const prop_borderClass=                  data[ComponentListSelectedScrollerConfigs.keys.prop_borderClass.name];
            const prop_borderStyles=                 data[ComponentListSelectedScrollerConfigs.keys.prop_borderStyles.name];
            const prop_borderWidth=                  data[ComponentListSelectedScrollerConfigs.keys.prop_borderWidth.name];
            const prop_borderRadius=                 data[ComponentListSelectedScrollerConfigs.keys.prop_borderRadius.name];

            return new ComponentBorder(
                <any>{
                    classList: [],
                    styles: {},
                    prop_contentBackgroundColor: prop_borderBackgroundColor,
                    prop_borderClass: prop_borderClass,
                    prop_borderColor: prop_borderColor,
                    prop_borderStyles: prop_borderStyles,
                    prop_borderWidth: prop_borderWidth,
                    prop_borderRadius: prop_borderRadius,
                    prop_borderType: ComponentBorder_BorderTypes.SOLID,
                    prop_content: [this.executeSchemaPart(ComponentListSelectedScrollerConfigs.schemas.Border_List.name)]
                },
                <ComponentBorderMethodsType>{
                    fn_onClickBorder: function (event, dataArgs: ComponentBorder_Methods_CLICK_BORDER_DataArgs, componentArgs: ComponentBorder_Methods_CLICK_BORDER_ComponentArgs) {

                    }
                }
            ).getReactiveElement();
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    private template_render_border_list(attrsDefault: any , data: any , extra: any) : ReactiveElement {

        if (data != null) {
            const prop_list=                          data[ComponentListSelectedScrollerConfigs.keys.prop_list.name];
            const prop_value=                         data[GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name];
            const prop_listMaxShow=                   data[ComponentListSelectedScrollerConfigs.keys.prop_listMaxShow.name];
            const prop_listType=                      data[ComponentListSelectedScrollerConfigs.keys.prop_listType.name];
            const prop_listFreezeSeparator=           data[ComponentListSelectedScrollerConfigs.keys.prop_listFreezeSeparator.name];

            const prop_listBorderBackgroundColor=     data[ComponentListSelectedScrollerConfigs.keys.prop_listBorderBackgroundColor.name];
            const prop_listBorderColor=               data[ComponentListSelectedScrollerConfigs.keys.prop_listBorderColor.name];
            const prop_listBorderClass=               data[ComponentListSelectedScrollerConfigs.keys.prop_listBorderClass.name];
            const prop_listBorderStyles=              data[ComponentListSelectedScrollerConfigs.keys.prop_listBorderStyles.name];
            const prop_listBorderWidth=               data[ComponentListSelectedScrollerConfigs.keys.prop_listBorderWidth.name];
            const prop_listBorderRadius=              data[ComponentListSelectedScrollerConfigs.keys.prop_listBorderRadius.name];

            const prop_listTitleColor=                data[ComponentListSelectedScrollerConfigs.keys.prop_listTitleColor.name];
            const prop_listTitleClass=                data[ComponentListSelectedScrollerConfigs.keys.prop_listTitleClass.name];
            const prop_listTitleStyles=               data[ComponentListSelectedScrollerConfigs.keys.prop_listTitleStyles.name];

            const prop_listIconCloseClass=            data[ComponentListSelectedScrollerConfigs.keys.prop_listIconCloseClass.name];
            const prop_listIconCloseStyles=           data[ComponentListSelectedScrollerConfigs.keys.prop_listIconCloseStyles.name];

            const getTitleText = (title: any) => {
                if (title == null) return "";
                if (title instanceof Observable) return title.get();
                return String(title);
            };

            const buildFreezeText = (list: any[], maxItems: any, separator: any) => {
                const max = (maxItems == null || maxItems === 0) ? null : maxItems;
                const visible = max ? list.slice(0, max) : list;
                const sep = separator ?? "/";
                const text = visible.map(it => getTitleText(it?.title)).filter(Boolean).join(sep);
                if (max && list.length > max) {
                    return text.length ? `${text}${sep}...` : "...";
                }
                return text;
            };

            const fireDelete = (id: string | number) => {
                const params: any = { ID: id };
                const ev = new Event("delete");
                this.executeMethod(ComponentListSelectedScrollerConfigs.methods.DELETE_ITEM.name, ev, params);

                const currentValue = this.get(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name) || [];
                const newValue = currentValue.filter((val: any) => val !== id);
                this.set(GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys.prop_value.name, newValue);
            };

            const getDisplayList = (fullList: any[], selectedIds: any[]) => {
                if (!Array.isArray(fullList) || !Array.isArray(selectedIds)) return fullList || [];
                return fullList.filter((item: any) => selectedIds.includes(item?.id));
            };

            const sectionStyles = Observable.computed(
                (borderStyles: any) => ({
                    ...(borderStyles ?? {})
                }),
                [prop_listBorderStyles],
                this.getScope()
            );

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                styles: sectionStyles,
                className: prop_listBorderClass,
                children: Observable.computed(
                    (
                        list: any,
                        selectedIds: any,
                        maxItems: any,
                        type: any,
                        separator: any,
                        bgColor: any,
                        borderColor: any,
                        borderWidth: any,
                        borderRadius: any,
                        titleColor: any,
                        titleClass: any,
                        titleStyles: any,
                        iconCloseClass: any,
                        iconCloseStyles: any
                    ) => {

                        const safeList = Array.isArray(list) ? list : [];
                        const safeSelectedIds = Array.isArray(selectedIds) ? selectedIds : [];
                        const displayList = getDisplayList(safeList, safeSelectedIds);
                        const max = (maxItems == null || maxItems === 0) ? null : maxItems;

                        if (type === ComponentListSelectedScroller_ListTypes.FREEZE) {
                            const freezeText = buildFreezeText(displayList, maxItems, separator);
                            const virtualItem = { id: "freeze", title: freezeText };
                            const titleEl = this.executeSchemaPart(
                                ComponentListSelectedScrollerConfigs.schemas.Border_List_ItemBorder_Title.name,
                                { item: virtualItem, data: {
                                    [ComponentListSelectedScrollerConfigs.keys.prop_listTitleColor.name]: titleColor,
                                    [ComponentListSelectedScrollerConfigs.keys.prop_listTitleClass.name]: titleClass,
                                    [ComponentListSelectedScrollerConfigs.keys.prop_listTitleStyles.name]: titleStyles
                                }}
                            );
                            return [ReactiveElement.part("span", {
                                attrs: {
                                    dir: AppConfig.get("directionRtl") ? "rtl" : "ltr"
                                },
                                styles: { display: "inline-flex" },
                                children: [titleEl]
                            })];
                        }

                        const visible = max ? displayList.slice(0, max) : displayList;
                        const showDots = !!(max && displayList.length > max);

                        const rows: any[] = [];
                        for (let i = 0; i < visible.length; i++) {
                            const item = visible[i];
                            const itemId = item?.id;

                            const row = this.executeSchemaPart(
                                ComponentListSelectedScrollerConfigs.schemas.Border_List_ItemBorder.name,
                                { item, itemId, fireDelete }
                            );
                            rows.push(row);
                        }

                        if (showDots) {
                            rows.push(ReactiveElement.part("div", {
                                styles: {
                                    whiteSpace: "nowrap",
                                    userSelect: "none"
                                },
                                children: ["..."]
                            }));
                        }

                        let isDragging = false;
                        let startX: number | null = null;
                        let startLeft: number | null = null;
                        let scrollEl: HTMLElement | null = null;

                        const onMouseDown = (e: Event) => {
                            const me = e as MouseEvent;
                            const el = (me.currentTarget as HTMLElement) ?? null;
                            if (!el) return;
                            isDragging = true;
                            el.style.cursor = "grabbing";
                            startX = me.clientX;
                            startLeft = el.scrollLeft;
                            scrollEl = el;

                            const onMove = (ev: MouseEvent) => {
                                if (!isDragging || !scrollEl || startX == null || startLeft == null) return;
                                const dx = ev.clientX - startX;
                                scrollEl.scrollLeft = startLeft - dx;
                            };
                            const onUp = (ev: MouseEvent) => {
                                isDragging = false;
                                if (scrollEl) scrollEl.style.cursor = "grab";
                                startX = null;
                                startLeft = null;
                                scrollEl = null;
                                document.removeEventListener("mousemove", onMove);
                                document.removeEventListener("mouseup", onUp);
                            };
                            document.addEventListener("mousemove", onMove);
                            document.addEventListener("mouseup", onUp);
                        };

                        const scrollContainer = ReactiveElement.part("div", {
                            styles: {
                                display:          "flex",
                                flexDirection:    "row",
                                gap:              "8px",
                                overflowX:        "auto",
                                overflowY:        "hidden",
                                cursor:           "grab",
                                scrollBehavior:   "smooth",
                                scrollbarWidth:   "none",
                                msOverflowStyle:  "none"
                            },
                            className: [
                                "list-scroller-container" , "px-1" , "py-1"
                            ],
                            on: { mousedown: onMouseDown },
                            children: rows
                        });

                        return [scrollContainer];

                    },
                    [
                        prop_list,
                        prop_value,
                        prop_listMaxShow,
                        prop_listType,
                        prop_listFreezeSeparator,
                        prop_listBorderBackgroundColor,
                        prop_listBorderColor,
                        prop_listBorderWidth,
                        prop_listBorderRadius,
                        prop_listTitleColor,
                        prop_listTitleClass,
                        prop_listTitleStyles,
                        prop_listIconCloseClass,
                        prop_listIconCloseStyles
                    ],
                    this.getScope()
                )
            });
        }

        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    private template_render_list_itemBorder(attrsDefault: any, data: any, extra: any): ReactiveElement {
        if (data == null || extra?.item == null) {
            return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
        }

        const item = extra.item;
        const itemId = item?.id;
        const fireDelete = extra.fireDelete;

        const prop_listBorderBackgroundColor = data[ComponentListSelectedScrollerConfigs.keys.prop_listBorderBackgroundColor.name];
        const prop_listBorderColor = data[ComponentListSelectedScrollerConfigs.keys.prop_listBorderColor.name];
        const prop_listBorderClass = data[ComponentListSelectedScrollerConfigs.keys.prop_listBorderClass.name];
        const prop_listBorderStyles = data[ComponentListSelectedScrollerConfigs.keys.prop_listBorderStyles.name];
        const prop_listBorderWidth = data[ComponentListSelectedScrollerConfigs.keys.prop_listBorderWidth.name];
        const prop_listBorderRadius = data[ComponentListSelectedScrollerConfigs.keys.prop_listBorderRadius.name];

        const titleEl = this.executeSchemaPart(ComponentListSelectedScrollerConfigs.schemas.Border_List_ItemBorder_Title.name, { item, data });
        const iconCloseEl = (item?.canDelete === false)
            ? null
            : this.executeSchemaPart(ComponentListSelectedScrollerConfigs.schemas.Border_List_ItemBorder_IconClose.name, { item, itemId, fireDelete, data });

        return new ComponentBorder(
            <any>{
                prop_borderType: ComponentBorder_BorderTypes.SOLID,
                prop_borderWidth: prop_listBorderWidth,
                prop_borderRadius: prop_listBorderRadius,
                prop_borderColor: prop_listBorderColor,
                prop_contentBackgroundColor: prop_listBorderBackgroundColor,
                prop_borderClass:      Observable.computed(
                    (classNames) => {
                        return [...classNames , "w-100"]
                    } , [prop_listBorderClass] , this.getScope()
                ) , 
                prop_borderStyles: Observable.computed(
                    (borderStyles: any) => ({
                        userSelect:   "none",
                        flexShrink:   0,
                        minWidth:     "80px",
                        maxWidth:     "200px",
                        transition:   "transform 0.15s ease, box-shadow 0.15s ease",
                        ...(borderStyles ?? {})
                    }),
                    [prop_listBorderStyles],
                    this.getScope()
                ),
                prop_content: ReactiveElement.part("div", {
                    styles: {
                        display:          "flex",
                        alignItems:       "center",
                        justifyContent:   "space-between",
                        gap:              "8px",
                        whiteSpace:       "nowrap",
                        padding:          "0px 4px"
                    },
                    children: [titleEl, iconCloseEl].filter(Boolean)
                })
            },
            <ComponentBorderMethodsType>{}
        ).getReactiveElement();
    }

    private template_render_itemBorder_title(attrsDefault: any, data: any, extra: any): ReactiveElement {
        const item = extra?.item;
        const title = item?.title;

        const dataSource = data ?? extra?.data;
        const prop_listTitleColor = dataSource?.[ComponentListSelectedScrollerConfigs.keys.prop_listTitleColor.name];
        const prop_listTitleClass = dataSource?.[ComponentListSelectedScrollerConfigs.keys.prop_listTitleClass.name];
        const prop_listTitleStyles = dataSource?.[ComponentListSelectedScrollerConfigs.keys.prop_listTitleStyles.name];

        const getTitleText = (t: any) => {
            if (t == null) return "";
            if (t instanceof Observable) return t.get();
            return String(t);
        };

        const titleText = getTitleText(title);

        return ReactiveElement.part("b", {
            attrs: { ...attrsDefault },
            className: [
                prop_listTitleClass , "px-1" , "py-1"
            ],
            children: Observable.computed(
                (styles: any, color: any) => {
                    const computedStyles: Record<string, string> = {
                        whiteSpace:   "nowrap",
                        overflow:     "hidden",
                        textOverflow: "ellipsis",
                        ...(styles ?? {})
                    };
                    if (color != null) {
                        computedStyles.color = color.toString();
                    }
                    return [ReactiveElement.part("span", {
                        styles: computedStyles,
                        children: [titleText]
                    })];
                },
                [prop_listTitleStyles, prop_listTitleColor],
                this.getScope()
            )
        });
    }

    private template_render_itemBorder_iconClose(attrsDefault: any, data: any, extra: any): ReactiveElement {
        const itemId = extra?.itemId;
        const fireDelete = extra?.fireDelete;

        const dataSource = data ?? extra?.data;
        const prop_listIconCloseClass = dataSource?.[ComponentListSelectedScrollerConfigs.keys.prop_listIconCloseClass.name];
        const prop_listIconCloseStyles = dataSource?.[ComponentListSelectedScrollerConfigs.keys.prop_listIconCloseStyles.name];

        return ReactiveElement.part("span", {
            attrs: { ...attrsDefault },
            children: Observable.computed(
                (iconStyles: any) => {
                    const computedIconStyles: Record<string, string> = {
                        cursor: "pointer",
                        ...(iconStyles ?? {})
                    };
                    return [new ComponentIcon(
                        <ComponentIconPropsType>{
                            prop_icon:       ToolsIcons.icon_close({ size: SIZES.S }),
                            prop_iconClass:  prop_listIconCloseClass,
                            prop_iconStyles: computedIconStyles
                        },
                        <ComponentIconMethodsType>{
                            fn_onClickIcon: (e: any, dataArgs: ComponentIcon_Methods_CLICK_DataArgs, componentArgs: ComponentIcon_Methods_CLICK_ComponentArgs) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (itemId != null && fireDelete) fireDelete(itemId);
                            }
                        }
                    ).getReactiveElement()];
                },
                [prop_listIconCloseStyles],
                this.getScope()
            )
        });
    }
}
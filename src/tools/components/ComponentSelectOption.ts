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
} from "../../core/ComponentBase";
import {ReactiveElement} from "../../core/ReactiveElement";
import {Observable} from "../../core/Observable";
import {ToolsComponents} from "./index";
import {Language} from "../../core/Language";
import {AppConfig} from "../../core/AppConfig";
import {
    Color,
    COLORS_GRAD,
    COLORS_MAIN,
    IconsType,
    SIZES,
    ToolsComponents_BorderWidth,
    ToolsComponents_FontSize,
    ToolsComponents_Height,
    StyleValue,
} from "../../utils/ToolsConsts";
import {
    GOG_ComponentBasicConfigs_Component_keys,
    GOG_ComponentBasicConfigs_Component_parts,
    GOG_ComponentBasicConfigs_Component_Pattern,
    GOG_ComponentBasicConfigs_Component_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_keys,
    GOG_ComponentBasicConfigs_Component_Structure_parts,
    GOG_ComponentBasicConfigs_Component_Structure_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_Schema,
    GOG_ComponentBasicConfigs_partDoseNotBody,
    GOG_ComponentBasicProps_Component,
    GOG_ComponentBasicProps_Component_Structure,
} from "../../core/component/SetupComponent";
import {
    ComponentIconMethodsType,
    ComponentIconPropsType
} from "./ComponentIcon";
import {
    ComponentButtonMethodsType,
    ComponentButtonPropsType,
    ComponentButton_Types,
    ComponentButton_ButtonTypes
} from "./ComponentButton";


export const ComponentSelectOptionProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    ///----------------------
    prop_name:                             "prop_name",
    prop_itemSelected:                     "prop_itemSelected",
    prop_title:                            "prop_title",
    prop_options:                          "prop_options",
    prop_placeholder:                      "prop_placeholder",

    prop_icon:                             "prop_icon",
    prop_colorIcon:                        "prop_colorIcon",
    prop_size:                             "prop_size",

    prop_listIcons:                        "prop_listIcons",

    prop_btnAddStatus:                     "prop_btnAddStatus",
    prop_btnAddIcon:                       "prop_btnAddIcon",
    prop_btnAddTitle:                      "prop_btnAddTitle",
    prop_btnAddClass:                      "prop_btnAddClass",

    prop_backgroundColorForm:              "prop_backgroundColorForm",
    prop_titleClass:                       "prop_titleClass",
    prop_titleStyles:                      "prop_titleStyles",

    prop_optionHeight:                     "prop_optionHeight",
    prop_optionWidth:                      "prop_optionWidth",
    prop_optionStyles:                     "prop_optionStyles",

    prop_positionTop:                      "prop_positionTop",
    prop_positionLeft:                     "prop_positionLeft",
    prop_positionBottom:                   "prop_positionBottom",
    prop_positionRight:                    "prop_positionRight",

    prop_optionItemNotSelectedBackground:  "prop_optionItemNotSelectedBackground",
    prop_optionItemHoverBackground:        "prop_optionItemHoverBackground",
    prop_optionItemSelectedBackground:     "prop_optionItemSelectedBackground",
    prop_optionItemSelectedColor:          "prop_optionItemSelectedColor",

    prop_firstCallback:                    "prop_firstCallback",
} as const;


const ComponentSelectOptionConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        ///----------------------
        [ComponentSelectOptionProps.prop_name]: {
            name:               ComponentSelectOptionProps.prop_name,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentSelectOptionProps.prop_itemSelected]: {
            name:               ComponentSelectOptionProps.prop_itemSelected,
            value:              GOG_SetValue<Observable<string | null> | string | null>(null),
        },
        [ComponentSelectOptionProps.prop_title]: {
            name:               ComponentSelectOptionProps.prop_title,
            value:              GOG_SetValue<string | null>(null),
        },
        [ComponentSelectOptionProps.prop_options]: {
            name:               ComponentSelectOptionProps.prop_options,
            value:              GOG_SetValue<any[]>([]),
        },
        [ComponentSelectOptionProps.prop_placeholder]: {
            name:               ComponentSelectOptionProps.prop_placeholder,
            value:              GOG_SetValue<string | null>(null),
        },

        [ComponentSelectOptionProps.prop_icon]: {
            name:               ComponentSelectOptionProps.prop_icon,
            value:              GOG_SetValue<IconsType | null>(null),
        },
        [ComponentSelectOptionProps.prop_colorIcon]: {
            name:               ComponentSelectOptionProps.prop_colorIcon,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentSelectOptionProps.prop_size]: {
            name:               ComponentSelectOptionProps.prop_size,
            value:              GOG_SetValue<string>(SIZES.M),
        },

        [ComponentSelectOptionProps.prop_listIcons]: {
            name:               ComponentSelectOptionProps.prop_listIcons,
            value:              GOG_SetValue<{icon: string, name: string, method: (event: Event, id: string) => void}[] | null>(null),
        },

        [ComponentSelectOptionProps.prop_btnAddStatus]: {
            name:               ComponentSelectOptionProps.prop_btnAddStatus,
            value:              GOG_SetValue<boolean>(false),
        },
        [ComponentSelectOptionProps.prop_btnAddIcon]: {
            name:               ComponentSelectOptionProps.prop_btnAddIcon,
            value:              GOG_SetValue<string>("+"),
        },
        [ComponentSelectOptionProps.prop_btnAddTitle]: {
            name:               ComponentSelectOptionProps.prop_btnAddTitle,
            value:              GOG_SetValue<string>("add item"),
        },
        [ComponentSelectOptionProps.prop_btnAddClass]: {
            name:               ComponentSelectOptionProps.prop_btnAddClass,
            value:              GOG_SetValue<string[]>([]),
        },

        [ComponentSelectOptionProps.prop_backgroundColorForm]: {
            name:               ComponentSelectOptionProps.prop_backgroundColorForm,
            value:              GOG_SetValue<string>("var(--secondaryColor1)"),
        },
        [ComponentSelectOptionProps.prop_titleClass]: {
            name:               ComponentSelectOptionProps.prop_titleClass,
            value:              GOG_SetValue<string[]>(["px-2"]),
        },
        [ComponentSelectOptionProps.prop_titleStyles]: {
            name:               ComponentSelectOptionProps.prop_titleStyles,
            value:              GOG_SetValue<Record<string, string>>({}),
        },

        [ComponentSelectOptionProps.prop_optionHeight]: {
            name:               ComponentSelectOptionProps.prop_optionHeight,
            value:              GOG_SetValue<number>(200),
        },
        [ComponentSelectOptionProps.prop_optionWidth]: {
            name:               ComponentSelectOptionProps.prop_optionWidth,
            value:              GOG_SetValue<string | number>("100%"),
        },
        [ComponentSelectOptionProps.prop_optionStyles]: {
            name:               ComponentSelectOptionProps.prop_optionStyles,
            value:              GOG_SetValue<Record<string, string>>({}),
        },

        [ComponentSelectOptionProps.prop_positionTop]: {
            name:               ComponentSelectOptionProps.prop_positionTop,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentSelectOptionProps.prop_positionLeft]: {
            name:               ComponentSelectOptionProps.prop_positionLeft,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentSelectOptionProps.prop_positionBottom]: {
            name:               ComponentSelectOptionProps.prop_positionBottom,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentSelectOptionProps.prop_positionRight]: {
            name:               ComponentSelectOptionProps.prop_positionRight,
            value:              GOG_SetValue<string>(""),
        },

        [ComponentSelectOptionProps.prop_optionItemNotSelectedBackground]: {
            name:               ComponentSelectOptionProps.prop_optionItemNotSelectedBackground,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentSelectOptionProps.prop_optionItemHoverBackground]: {
            name:               ComponentSelectOptionProps.prop_optionItemHoverBackground,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentSelectOptionProps.prop_optionItemSelectedBackground]: {
            name:               ComponentSelectOptionProps.prop_optionItemSelectedBackground,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentSelectOptionProps.prop_optionItemSelectedColor]: {
            name:               ComponentSelectOptionProps.prop_optionItemSelectedColor,
            value:              GOG_SetValue<string>(""),
        },

        [ComponentSelectOptionProps.prop_firstCallback]: {
            name:               ComponentSelectOptionProps.prop_firstCallback,
            value:              GOG_SetValue<boolean>(false),
        },
    },
    schemas: {
        ...GOG_ComponentBasicConfigs_Component_parts,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts,
        FORM: {
            name:                "part_form",
        },
        VALUE: {
            name:                "part_value",
        },
        HEADER: {
            name:                "part_header",
        },
        HEADER_TITLE: {
            name:                "part_header_title",
        },
        HEADER_ICON: {
            name:                "part_header_icon",
        },
        HEADER_ARROW_ICON: {
            name:                "part_header_arrow_icon",
        },
        HEADER_BUTTON: {
            name:                "part_header_button",
        },
        BODY: {
            name:                "part_body",
        },
        BODY_SEARCHER: {
            name:                "part_body_searcher",
        },
        BODY_OPTIONS: {
            name:                "part_body_options",
        },
    },
    templates: {

    },
    methods: {
        SELECT_CHANGE: {
            name:                      "fn_onSelectChange",
            dataArgs: {
                SELECTED_ID: {
                    name:              "SELECTED_ID",
                },
                SELECTED_DATA: {
                    name:              "SELECTED_DATA",
                },
            },
            componentArgs: {

            }
        },
        BTN_ADD_CLICK: {
            name:                      "fn_onBtnAddClick",
            dataArgs: {
                ITEM_SELECTED: {
                    name:              "ITEM_SELECTED",
                },
            },
            componentArgs: {

            }
        },
        ICON_CLICK: {
            name:                      "fn_onIconClick",
            dataArgs: {
                ICON_NAME: {
                    name:              "ICON_NAME",
                },
                ITEM_ID: {
                    name:              "ITEM_ID",
                },
            },
            componentArgs: {

            }
        },
    }
} as const;


export type ComponentSelectOptionPropsType =                     GOG_ExtractNameValue<typeof ComponentSelectOptionConfigs.keys>
export type ComponentSelectOptionSchemaType =                    GOG_ExtractName<typeof ComponentSelectOptionConfigs.schemas>
export type ComponentSelectOptionTemplatesType =                 GOG_ExtractName<typeof ComponentSelectOptionConfigs.templates>

export type ComponentSelectOption_Methods_SELECT_CHANGE_ComponentArgs =   GOG_ExtractName<typeof ComponentSelectOptionConfigs.methods.SELECT_CHANGE.componentArgs>
export type ComponentSelectOption_Methods_SELECT_CHANGE_DataArgs =        GOG_ExtractNameValue<typeof ComponentSelectOptionConfigs.methods.SELECT_CHANGE.dataArgs>
export type ComponentSelectOption_Methods_BTN_ADD_CLICK_ComponentArgs =   GOG_ExtractName<typeof ComponentSelectOptionConfigs.methods.BTN_ADD_CLICK.componentArgs>
export type ComponentSelectOption_Methods_BTN_ADD_CLICK_DataArgs =        GOG_ExtractNameValue<typeof ComponentSelectOptionConfigs.methods.BTN_ADD_CLICK.dataArgs>
export type ComponentSelectOption_Methods_ICON_CLICK_ComponentArgs =      GOG_ExtractName<typeof ComponentSelectOptionConfigs.methods.ICON_CLICK.componentArgs>
export type ComponentSelectOption_Methods_ICON_CLICK_DataArgs =           GOG_ExtractNameValue<typeof ComponentSelectOptionConfigs.methods.ICON_CLICK.dataArgs>

export type ComponentSelectOptionMethodsType = {
    [ComponentSelectOptionConfigs.methods.SELECT_CHANGE.name]: ComponentCallBackType<ComponentSelectOption_Methods_SELECT_CHANGE_ComponentArgs, ComponentSelectOption_Methods_SELECT_CHANGE_DataArgs>,
    [ComponentSelectOptionConfigs.methods.BTN_ADD_CLICK.name]: ComponentCallBackType<ComponentSelectOption_Methods_BTN_ADD_CLICK_ComponentArgs, ComponentSelectOption_Methods_BTN_ADD_CLICK_DataArgs>,
    [ComponentSelectOptionConfigs.methods.ICON_CLICK.name]:   ComponentCallBackType<ComponentSelectOption_Methods_ICON_CLICK_ComponentArgs, ComponentSelectOption_Methods_ICON_CLICK_DataArgs>,
}


export abstract class ComponentSelectOptionBase extends ComponentBase<
    ComponentSelectOptionPropsType,
    ComponentSelectOptionSchemaType,
    ComponentSelectOptionTemplatesType,
    ComponentSelectOptionMethodsType
> {

    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN = defineComponentPatterns<ComponentSelectOptionPropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this),
            ///----------------------
            [ComponentSelectOptionConfigs.keys.prop_name.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_name.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_name.value,
                title:                                            Language.translate("components.selectOption.prop.prop_name.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_name.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_itemSelected.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_itemSelected.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_itemSelected.value,
                title:                                            Language.translate("components.selectOption.prop.prop_itemSelected.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_itemSelected.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_title.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_title.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_title.value,
                title:                                            Language.translate("components.selectOption.prop.prop_title.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_title.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_options.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_options.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_options.value,
                title:                                            Language.translate("components.selectOption.prop.prop_options.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_options.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_placeholder.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_placeholder.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_placeholder.value,
                title:                                            Language.translate("components.selectOption.prop.prop_placeholder.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_placeholder.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_icon.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_icon.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_icon.value,
                title:                                            Language.translate("components.selectOption.prop.prop_icon.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_icon.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_colorIcon.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_colorIcon.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_colorIcon.value,
                title:                                            Language.translate("components.selectOption.prop.prop_colorIcon.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_colorIcon.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_size.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_size.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_size.value,
                title:                                            Language.translate("components.selectOption.prop.prop_size.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_size.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_listIcons.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_listIcons.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_listIcons.value,
                title:                                            Language.translate("components.selectOption.prop.prop_listIcons.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_listIcons.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_btnAddStatus.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_btnAddStatus.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_btnAddStatus.value,
                title:                                            Language.translate("components.selectOption.prop.prop_btnAddStatus.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_btnAddStatus.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_btnAddIcon.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_btnAddIcon.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_btnAddIcon.value,
                title:                                            Language.translate("components.selectOption.prop.prop_btnAddIcon.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_btnAddIcon.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_btnAddTitle.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_btnAddTitle.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_btnAddTitle.value,
                title:                                            Language.translate("components.selectOption.prop.prop_btnAddTitle.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_btnAddTitle.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_btnAddClass.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_btnAddClass.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_btnAddClass.value,
                title:                                            Language.translate("components.selectOption.prop.prop_btnAddClass.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_btnAddClass.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_backgroundColorForm.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_backgroundColorForm.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_backgroundColorForm.value,
                title:                                            Language.translate("components.selectOption.prop.prop_backgroundColorForm.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_backgroundColorForm.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_titleClass.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_titleClass.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_titleClass.value,
                title:                                            Language.translate("components.selectOption.prop.prop_titleClass.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_titleClass.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_titleStyles.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_titleStyles.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_titleStyles.value,
                title:                                            Language.translate("components.selectOption.prop.prop_titleStyles.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_titleStyles.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_optionHeight.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_optionHeight.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_optionHeight.value,
                title:                                            Language.translate("components.selectOption.prop.prop_optionHeight.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_optionHeight.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_optionWidth.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_optionWidth.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_optionWidth.value,
                title:                                            Language.translate("components.selectOption.prop.prop_optionWidth.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_optionWidth.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_optionStyles.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_optionStyles.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_optionStyles.value,
                title:                                            Language.translate("components.selectOption.prop.prop_optionStyles.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_optionStyles.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_positionTop.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_positionTop.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_positionTop.value,
                title:                                            Language.translate("components.selectOption.prop.prop_positionTop.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_positionTop.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_positionLeft.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_positionLeft.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_positionLeft.value,
                title:                                            Language.translate("components.selectOption.prop.prop_positionLeft.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_positionLeft.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_positionBottom.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_positionBottom.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_positionBottom.value,
                title:                                            Language.translate("components.selectOption.prop.prop_positionBottom.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_positionBottom.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_positionRight.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_positionRight.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_positionRight.value,
                title:                                            Language.translate("components.selectOption.prop.prop_positionRight.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_positionRight.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_optionItemNotSelectedBackground.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_optionItemNotSelectedBackground.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_optionItemNotSelectedBackground.value,
                title:                                            Language.translate("components.selectOption.prop.prop_optionItemNotSelectedBackground.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_optionItemNotSelectedBackground.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_optionItemHoverBackground.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_optionItemHoverBackground.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_optionItemHoverBackground.value,
                title:                                            Language.translate("components.selectOption.prop.prop_optionItemHoverBackground.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_optionItemHoverBackground.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_optionItemSelectedBackground.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_optionItemSelectedBackground.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_optionItemSelectedBackground.value,
                title:                                            Language.translate("components.selectOption.prop.prop_optionItemSelectedBackground.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_optionItemSelectedBackground.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_optionItemSelectedColor.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_optionItemSelectedColor.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_optionItemSelectedColor.value,
                title:                                            Language.translate("components.selectOption.prop.prop_optionItemSelectedColor.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_optionItemSelectedColor.description"),
            },
            [ComponentSelectOptionConfigs.keys.prop_firstCallback.name]: {
                prop:                                             ComponentSelectOptionConfigs.keys.prop_firstCallback.name,
                default:                                          ComponentSelectOptionConfigs.keys.prop_firstCallback.value,
                title:                                            Language.translate("components.selectOption.prop.prop_firstCallback.title"),
                description:                                      Language.translate("components.selectOption.prop.prop_firstCallback.description"),
            },
        }
    );


    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentSelectOptionSchemaType, ComponentSelectOptionPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this),
        FORM: {
            part:               ComponentSelectOptionConfigs.schemas.FORM.name,
            title:              Language.translate("components.selectOption.schema.form.title"),
            description:        Language.translate("components.selectOption.schema.form.description"),
            props: []
        },
        VALUE: {
            part:               ComponentSelectOptionConfigs.schemas.VALUE.name,
            title:              Language.translate("components.selectOption.schema.value.title"),
            description:        Language.translate("components.selectOption.schema.value.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_name.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_itemSelected.name],
            ]
        },
        HEADER: {
            part:               ComponentSelectOptionConfigs.schemas.HEADER.name,
            title:              Language.translate("components.selectOption.schema.header.title"),
            description:        Language.translate("components.selectOption.schema.header.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_titleClass.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_titleStyles.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_backgroundColorForm.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_size.name],
            ]
        },
        HEADER_TITLE: {
            part:               ComponentSelectOptionConfigs.schemas.HEADER_TITLE.name,
            title:              Language.translate("components.selectOption.schema.header_title.title"),
            description:        Language.translate("components.selectOption.schema.header_title.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_icon.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_options.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_itemSelected.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_btnAddStatus.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_placeholder.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_size.name],
            ]
        },
        HEADER_ICON: {
            part:               ComponentSelectOptionConfigs.schemas.HEADER_ICON.name,
            title:              Language.translate("components.selectOption.schema.header_icon.title"),
            description:        Language.translate("components.selectOption.schema.header_icon.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_icon.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_size.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_colorIcon.name],
            ]
        },
        HEADER_ARROW_ICON: {
            part:               ComponentSelectOptionConfigs.schemas.HEADER_ARROW_ICON.name,
            title:              Language.translate("components.selectOption.schema.header_arrow_icon.title"),
            description:        Language.translate("components.selectOption.schema.header_arrow_icon.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_btnAddStatus.name],
            ]
        },
        HEADER_BUTTON: {
            part:               ComponentSelectOptionConfigs.schemas.HEADER_BUTTON.name,
            title:              Language.translate("components.selectOption.schema.header_button.title"),
            description:        Language.translate("components.selectOption.schema.header_button.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_btnAddStatus.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_btnAddIcon.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_btnAddTitle.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_btnAddClass.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_size.name],
            ]
        },
        BODY: {
            part:               ComponentSelectOptionConfigs.schemas.BODY.name,
            title:              Language.translate("components.selectOption.schema.body.title"),
            description:        Language.translate("components.selectOption.schema.body.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_optionHeight.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_optionWidth.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_optionStyles.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_positionTop.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_positionLeft.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_positionBottom.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_positionRight.name],
            ]
        },
        BODY_SEARCHER: {
            part:               ComponentSelectOptionConfigs.schemas.BODY_SEARCHER.name,
            title:              Language.translate("components.selectOption.schema.body_searcher.title"),
            description:        Language.translate("components.selectOption.schema.body_searcher.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_colorIcon.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_size.name],
            ]
        },
        BODY_OPTIONS: {
            part:               ComponentSelectOptionConfigs.schemas.BODY_OPTIONS.name,
            title:              Language.translate("components.selectOption.schema.body_options.title"),
            description:        Language.translate("components.selectOption.schema.body_options.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_listIcons.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_firstCallback.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_itemSelected.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_options.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_optionItemNotSelectedBackground.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_optionItemHoverBackground.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_optionItemSelectedBackground.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_optionItemSelectedColor.name],
                this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_size.name],
            ]
        },
    });


    /* ---------------------------------------------
        PROPERTYs Templates
    --------------------------------------------- */
    _COMPONENT_TEMPLATES = defineComponentTemplate<ComponentSelectOptionTemplatesType, ComponentSelectOptionPropsType>({

    });


    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentSelectOptionMethodsType, ComponentSelectOptionPropsType>({
        [ComponentSelectOptionConfigs.methods.SELECT_CHANGE.name]: {
            title:                                            Language.translate("components.selectOption.methods.fn_onSelectChange.title"),
            description:                                      Language.translate("components.selectOption.methods.fn_onSelectChange.description"),
            args: {
                [ComponentSelectOptionConfigs.methods.SELECT_CHANGE.dataArgs.SELECTED_ID.name]:   this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_itemSelected.name],
                [ComponentSelectOptionConfigs.methods.SELECT_CHANGE.dataArgs.SELECTED_DATA.name]: this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_options.name],
            }
        },
        [ComponentSelectOptionConfigs.methods.BTN_ADD_CLICK.name]: {
            title:                                            Language.translate("components.selectOption.methods.fn_onBtnAddClick.title"),
            description:                                      Language.translate("components.selectOption.methods.fn_onBtnAddClick.description"),
            args: {
                [ComponentSelectOptionConfigs.methods.BTN_ADD_CLICK.dataArgs.ITEM_SELECTED.name]: this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_itemSelected.name],
            }
        },
        [ComponentSelectOptionConfigs.methods.ICON_CLICK.name]: {
            title:                                            Language.translate("components.selectOption.methods.fn_onIconClick.title"),
            description:                                      Language.translate("components.selectOption.methods.fn_onIconClick.description"),
            args: {
                [ComponentSelectOptionConfigs.methods.ICON_CLICK.dataArgs.ICON_NAME.name]: this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_listIcons.name],
                [ComponentSelectOptionConfigs.methods.ICON_CLICK.dataArgs.ITEM_ID.name]:   this._COMPONENT_PATTERN[ComponentSelectOptionConfigs.keys.prop_itemSelected.name],
            }
        },
    });


    /* ---------------------------------------------
        Example
    --------------------------------------------- */
    static override renderExampleComponent(extraData): HTMLElement {
        return new ComponentSelectOption(
            <ComponentSelectOptionPropsType><unknown>{
                classList:               ["col-md-6", "col-12", "border", "p-2"],
                prop_title:              "Select Option Example",
                prop_name:               "select_option_example",
                prop_placeholder:        "Select an item...",
                prop_size:               SIZES.M,
                prop_itemSelected:       "2",
                prop_options: [
                    {id: "1", name: "Option One"},
                    {id: "2", name: "Option Two"},
                    {id: "3", name: "Option Three"},
                    {id: "4", name: "Option Four"},
                    {id: "5", name: "Option Five"},
                ],
                prop_btnAddStatus:       true,
                prop_btnAddTitle:        "Add",
                prop_btnAddIcon:         "+",
                prop_firstCallback:      false,
            },
            <ComponentSelectOptionMethodsType>{
                fn_onSelectChange: (event, dataArgs, componentArgs) => {
                    console.log("selected", dataArgs.SELECTED_ID, dataArgs.SELECTED_DATA);
                },
                fn_onBtnAddClick: (event, dataArgs, componentArgs) => {
                    console.log("btn add click", dataArgs.ITEM_SELECTED);
                },
                fn_onIconClick: (event, dataArgs, componentArgs) => {
                    console.log("icon click", dataArgs.ICON_NAME, dataArgs.ITEM_ID);
                },
            }
        ).getElement() as HTMLElement;
    }

}


export class ComponentSelectOption extends ComponentSelectOptionBase {

    private _DROPDOWN_OPEN =   new Observable<boolean>(false);
    private _SEARCH_TEXT =     new Observable<string>("");


    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentSelectOptionPropsType,
        methods: ComponentSelectOptionMethodsType,
        events = null
    ) {
        super("select-option", null);
        super.renderComponent(config, methods, events);
        this.fn_firstCallback();
    }


    /* ---------------------------------------------
        TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentSelectOptionConfigs.schemas.FORM.name)
    }

    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentSelectOptionConfigs.schemas.FORM.name:
                return this.template_render_form(attrsDefault, data, extra);
            case ComponentSelectOptionConfigs.schemas.VALUE.name:
                return this.template_render_value(attrsDefault, data, extra);
            case ComponentSelectOptionConfigs.schemas.HEADER.name:
                return this.template_render_header(attrsDefault, data, extra);
            case ComponentSelectOptionConfigs.schemas.HEADER_TITLE.name:
                return this.template_render_header_title(attrsDefault, data, extra);
            case ComponentSelectOptionConfigs.schemas.HEADER_ICON.name:
                return this.template_render_header_icon(attrsDefault, data, extra);
            case ComponentSelectOptionConfigs.schemas.HEADER_ARROW_ICON.name:
                return this.template_render_header_arrow_icon(attrsDefault, data, extra);
            case ComponentSelectOptionConfigs.schemas.HEADER_BUTTON.name:
                return this.template_render_header_button(attrsDefault, data, extra);
            case ComponentSelectOptionConfigs.schemas.BODY.name:
                return this.template_render_body(attrsDefault, data, extra);
            case ComponentSelectOptionConfigs.schemas.BODY_SEARCHER.name:
                return this.template_render_body_searcher(attrsDefault, data, extra);
            case ComponentSelectOptionConfigs.schemas.BODY_OPTIONS.name:
                return this.template_render_body_options(attrsDefault, data, extra);
        }
        return ReactiveElement.part("section", {attrs: {...attrsDefault}});
    }


    // ---------------------------------------------
    private template_render_form(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                stylesCustom: `
#${attrsDefault.id} .custom-select-option:hover {
    background-color: var(--primaryColor2, rgba(0,0,0,0.08));
}
#${attrsDefault.id} .custom-select-search:focus {
    border-color: ${Color(COLORS_MAIN.SECONDARY, COLORS_GRAD.GRADE_1)} !important;
}
#${attrsDefault.id} .custom-select-options::-webkit-scrollbar {
    width: 6px;
}
#${attrsDefault.id} .custom-select-options::-webkit-scrollbar-thumb {
    background: ${Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1)};
    border-radius: 3px;
}
#${attrsDefault.id} .custom-select-options::-webkit-scrollbar-track {
    background: transparent;
}
                `,
                children: [
                    this.executeSchemaPart(ComponentSelectOptionConfigs.schemas.VALUE.name),
                    this.executeSchemaPart(ComponentSelectOptionConfigs.schemas.HEADER.name),
                    this.executeSchemaPart(ComponentSelectOptionConfigs.schemas.BODY.name),
                ],
            });
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    // ---------------------------------------------
    private template_render_value(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_name =         data[ComponentSelectOptionConfigs.keys.prop_name.name]?.get?.() ?? null;
            const prop_itemSelected = data[ComponentSelectOptionConfigs.keys.prop_itemSelected.name];

            return ReactiveElement.input({
                attrs: {
                    ...attrsDefault,
                    type: "hidden",
                },
                attrsBind: {
                    name:  prop_name,
                    value: Observable.computed(
                        (value: any) => value != null ? String(value) : "",
                        [prop_itemSelected],
                        this.getScope()
                    ),
                },
            });
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    // ---------------------------------------------
    private template_render_header(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_titleClass =          data[ComponentSelectOptionConfigs.keys.prop_titleClass.name]?.get?.() ?? [];
            const prop_titleStyles =         data[ComponentSelectOptionConfigs.keys.prop_titleStyles.name]?.get?.() ?? {};
            const prop_size =                data[ComponentSelectOptionConfigs.keys.prop_size.name];
            const prop_backgroundColorForm = data[ComponentSelectOptionConfigs.keys.prop_backgroundColorForm.name]?.get?.() ?? "";

            return ReactiveElement.div({
                attrs: { ...attrsDefault },
                className: ["form-control", "position-relative", "p-0", "rounded-0", "d-flex", "align-items-center", ...prop_titleClass],
                styles: {
                    cursor: "pointer",
                    outline: "none",
                    boxShadow: "none",
                    borderStyle: "solid",
                    borderColor: Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1),
                    backgroundColor: prop_backgroundColorForm,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    userSelect: "none",
                    ...prop_titleStyles,
                },
                stylesBind: (el) => ({
                    height: Observable.computed(
                        (sizeName: string) => StyleValue.important(ToolsComponents_Height?.[sizeName]),
                        [AppConfig.get_sizeName()],
                        this.getScope()
                    ),
                    fontSize: Observable.computed(
                        (sizeName: string) => ToolsComponents_FontSize?.[sizeName],
                        [AppConfig.get_sizeName()],
                        this.getScope()
                    ),
                    borderWidth: Observable.computed(
                        (sizeName: string) => StyleValue.important(ToolsComponents_BorderWidth?.[sizeName]),
                        [AppConfig.get_sizeName()],
                        this.getScope()
                    ),
                    borderColor: Observable.computed(
                        (isOpen: boolean) => isOpen
                            ? StyleValue.important(Color(COLORS_MAIN.SECONDARY, COLORS_GRAD.GRADE_1))
                            : StyleValue.important(Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1)),
                        [this._DROPDOWN_OPEN],
                        this.getScope()
                    ),
                }),
                on: {
                    click: (event: Event) => {
                        event.stopPropagation();
                        const newOpen = !this._DROPDOWN_OPEN.get();
                        this._DROPDOWN_OPEN.set(newOpen);
                        if (newOpen) {
                            this._SEARCH_TEXT.set("");
                            const wrapperId = attrsDefault.id;
                            setTimeout(() => {
                                const docHandler = (e: MouseEvent) => {
                                    const target = e.target as HTMLElement;
                                    if (!target.closest(`#${wrapperId}`)) {
                                        this._DROPDOWN_OPEN.set(false);
                                        document.removeEventListener('click', docHandler);
                                    }
                                };
                                document.addEventListener('click', docHandler);
                            }, 0);
                        }
                    },
                },
                children: [
                    this.executeSchemaPart(ComponentSelectOptionConfigs.schemas.HEADER_ICON.name),
                    this.executeSchemaPart(ComponentSelectOptionConfigs.schemas.HEADER_TITLE.name),
                    this.executeSchemaPart(ComponentSelectOptionConfigs.schemas.HEADER_ARROW_ICON.name),
                    this.executeSchemaPart(ComponentSelectOptionConfigs.schemas.HEADER_BUTTON.name),
                ],
            });
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    // ---------------------------------------------
    private template_render_header_title(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_options =      data[ComponentSelectOptionConfigs.keys.prop_options.name];
            const prop_itemSelected = data[ComponentSelectOptionConfigs.keys.prop_itemSelected.name];
            const prop_placeholder =  data[ComponentSelectOptionConfigs.keys.prop_placeholder.name];

            return ReactiveElement.span({
                attrs: { ...attrsDefault },
                styles: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    flex: "1",
                    padding: "0 8px",
                },
                children: [
                    Observable.computed(
                        (value: any, options: any[], placeholder: string | null) => {
                            if (value != null && options != null && Array.isArray(options)) {
                                const found = options.find((item: any) => String(item.id) === String(value));
                                if (found) return found.name;
                            }
                            return placeholder != null ? placeholder : "---";
                        },
                        [prop_itemSelected, prop_options, prop_placeholder],
                        this.getScope()
                    )
                ],
            });
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    // ---------------------------------------------
    private template_render_header_icon(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_icon =      data[ComponentSelectOptionConfigs.keys.prop_icon.name];
            const prop_size =      data[ComponentSelectOptionConfigs.keys.prop_size.name]?.get?.() ?? SIZES.M;
            const prop_colorIcon = data[ComponentSelectOptionConfigs.keys.prop_colorIcon.name]?.get?.() ?? "";

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (icon: any) => {
                        if (icon == null) return null;

                        return new ToolsComponents.ComponentIcon(
                            <ComponentIconPropsType><unknown>{
                                prop_icon:      typeof icon === "function" ? icon(prop_size, prop_colorIcon) : icon,
                                prop_iconClass: ["position-absolute"],
                                prop_iconStyles: {
                                    cursor: "pointer",
                                    top: "50%",
                                    color: prop_colorIcon,
                                    transform: "translateY(-50%)",
                                    insetInlineStart: "8px",
                                },
                            },
                            <ComponentIconMethodsType>{}
                        ).getReactiveElement();
                    },
                    [prop_icon],
                    this.getScope()
                ),
            });
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    // ---------------------------------------------
    private template_render_header_arrow_icon(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            return ReactiveElement.span({
                attrs: { ...attrsDefault },
                styles: {
                    flexShrink: "0",
                    fontSize: "10px",
                    marginInlineStart: "4px",
                    marginInlineEnd: "8px",
                },
                children: Observable.computed(
                    (isOpen: boolean) => [isOpen ? "▲" : "▼"],
                    [this._DROPDOWN_OPEN],
                    this.getScope()
                ),
            });
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    // ---------------------------------------------
    private template_render_header_button(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_btnAddStatus = data[ComponentSelectOptionConfigs.keys.prop_btnAddStatus.name];
            const prop_btnAddIcon =   data[ComponentSelectOptionConfigs.keys.prop_btnAddIcon.name]?.get?.() ?? "";
            const prop_btnAddTitle =  data[ComponentSelectOptionConfigs.keys.prop_btnAddTitle.name]?.get?.() ?? "";
            const prop_btnAddClass =  data[ComponentSelectOptionConfigs.keys.prop_btnAddClass.name]?.get?.() ?? [];
            const prop_size =         data[ComponentSelectOptionConfigs.keys.prop_size.name];
            const prop_itemSelected = data[ComponentSelectOptionConfigs.keys.prop_itemSelected.name];

            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                children: Observable.computed(
                    (btnAddStatus: boolean) => {
                        if (!btnAddStatus) return null;

                        return new ToolsComponents.ComponentButton(
                            <ComponentButtonPropsType><unknown>{
                                classList:       ["border", "shadow-sm", "position-absolute", "p-0", "m-0", ...(prop_btnAddClass || [])],
                                prop_btnClass:   ["border", "shadow-sm", "position-absolute", "p-0", "m-0"],
                                prop_btnStyles:  {
                                    top: "0",
                                    cursor: "pointer",
                                    insetInlineEnd: "0",
                                    height: "100%",
                                },
                                prop_size:       prop_size,
                                prop_btnTitle:   `${prop_btnAddIcon} ${prop_btnAddTitle}`,
                                prop_type:       ComponentButton_Types.CUSTOM,
                                prop_btnType:    ComponentButton_ButtonTypes.BUTTON,
                            },
                            <ComponentButtonMethodsType>{
                                fn_onClickButton: (event, dataArgs, componentArgs) => {
                                    event.stopPropagation();
                                    this._DROPDOWN_OPEN.set(false);
                                    const params: ComponentSelectOption_Methods_BTN_ADD_CLICK_DataArgs = {
                                        ITEM_SELECTED: prop_itemSelected.get(),
                                    };
                                    this.executeMethod(ComponentSelectOptionConfigs.methods.BTN_ADD_CLICK.name, event, params);
                                },
                            }
                        ).getReactiveElement();
                    },
                    [prop_btnAddStatus],
                    this.getScope()
                ),
            });
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    // ---------------------------------------------
    private template_render_body(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_optionHeight =    data[ComponentSelectOptionConfigs.keys.prop_optionHeight.name];
            const prop_optionWidth =     data[ComponentSelectOptionConfigs.keys.prop_optionWidth.name];
            const prop_optionStyles =    data[ComponentSelectOptionConfigs.keys.prop_optionStyles.name]?.get?.() ?? {};
            const prop_positionTop =     data[ComponentSelectOptionConfigs.keys.prop_positionTop.name];
            const prop_positionLeft =    data[ComponentSelectOptionConfigs.keys.prop_positionLeft.name];
            const prop_positionBottom =  data[ComponentSelectOptionConfigs.keys.prop_positionBottom.name];
            const prop_positionRight =   data[ComponentSelectOptionConfigs.keys.prop_positionRight.name];

            return ReactiveElement.div({
                attrs: { ...attrsDefault },
                styles: {
                    position: "absolute",
                    top: "100%",
                    insetInlineStart: "0",
                    zIndex: "9999",
                    backgroundColor: Color(COLORS_MAIN.SHAN, COLORS_GRAD.GRADE_1),
                    border: `1px solid ${Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1)}`,
                    borderTop: "none",
                    maxHeight: "220px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    minWidth: "200px",
                    ...prop_optionStyles,
                },
                stylesBind: {
                    display: Observable.computed(
                        (isOpen: boolean) => isOpen ? "flex" : "none",
                        [this._DROPDOWN_OPEN],
                        this.getScope()
                    ),
                },
                children: [
                    this.executeSchemaPart(ComponentSelectOptionConfigs.schemas.BODY_SEARCHER.name),
                    this.executeSchemaPart(ComponentSelectOptionConfigs.schemas.BODY_OPTIONS.name),
                ],
            });
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    // ---------------------------------------------
    private template_render_body_searcher(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_size =      data[ComponentSelectOptionConfigs.keys.prop_size.name];
            const prop_colorIcon = data[ComponentSelectOptionConfigs.keys.prop_colorIcon.name];

            return ReactiveElement.input({
                attrs: {
                    ...attrsDefault,
                    type: "text",
                    placeholder: "Search...",
                },
                className: ["form-control", "custom-select-search"],
                styles: {
                    border: "none",
                    borderBottom: `1px solid ${Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1)}`,
                    borderRadius: "0",
                    outline: "none",
                    boxShadow: "none",
                    fontSize: "12px",
                    padding: "6px 8px",
                    boxSizing: "border-box",
                    width: "100%",
                },
                attrsBind: {
                    value: this._SEARCH_TEXT,
                },
                on: {
                    input: (event: Event) => {
                        this._SEARCH_TEXT.set((event.target as HTMLInputElement).value);
                    },
                    click: (event: Event) => {
                        event.stopPropagation();
                    },
                    mousedown: (event: Event) => {
                        event.stopPropagation();
                    },
                },
            });
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    // ---------------------------------------------
    private template_render_body_options(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_options =                          data[ComponentSelectOptionConfigs.keys.prop_options.name];
            const prop_itemSelected =                     data[ComponentSelectOptionConfigs.keys.prop_itemSelected.name];
            const prop_listIcons =                        data[ComponentSelectOptionConfigs.keys.prop_listIcons.name]?.get?.() ?? null;
            const prop_optionItemNotSelectedBackground =  data[ComponentSelectOptionConfigs.keys.prop_optionItemNotSelectedBackground.name]?.get?.() ?? "";
            const prop_optionItemSelectedBackground =     data[ComponentSelectOptionConfigs.keys.prop_optionItemSelectedBackground.name]?.get?.() ?? "";
            const prop_optionItemSelectedColor =          data[ComponentSelectOptionConfigs.keys.prop_optionItemSelectedColor.name]?.get?.() ?? "";

            return ReactiveElement.div({
                attrs: { ...attrsDefault },
                className: ["custom-select-options"],
                styles: {
                    overflowY: "auto",
                    flex: "1",
                    maxHeight: "190px",
                },
                children: Observable.for(
                    Observable.computed(
                        (options: any[], search: string) => {
                            if (!search) return options;
                            const lowerSearch = search.toLowerCase();
                            return options.filter((item: any) =>
                                (item.name || "").toLowerCase().includes(lowerSearch)
                            );
                        },
                        [prop_options, this._SEARCH_TEXT],
                        this.getScope()
                    ),
                    (item: any, index: number) => {
                        return ReactiveElement.div({
                            className: ["custom-select-option"],
                            styles: {
                                padding: "6px 8px",
                                cursor: "pointer",
                                fontSize: "12px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            },
                            stylesBind: {
                                backgroundColor: Observable.computed(
                                    (value: any) => {
                                        return String(item.id) === String(value)
                                            ? (prop_optionItemSelectedBackground || Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_2))
                                            : (prop_optionItemNotSelectedBackground || "transparent");
                                    },
                                    [prop_itemSelected],
                                    this.getScope()
                                ),
                                color: Observable.computed(
                                    (value: any) => {
                                        return String(item.id) === String(value)
                                            ? (prop_optionItemSelectedColor || Color(COLORS_MAIN.SHAN, COLORS_GRAD.GRADE_2))
                                            : Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_2);
                                    },
                                    [prop_itemSelected],
                                    this.getScope()
                                ),
                            },
                            on: {
                                click: (event: Event) => {
                                    event.stopPropagation();
                                    this.set(ComponentSelectOptionConfigs.keys.prop_itemSelected.name, String(item.id));
                                    this._DROPDOWN_OPEN.set(false);

                                    const params: ComponentSelectOption_Methods_SELECT_CHANGE_DataArgs = {
                                        SELECTED_ID:   item.id,
                                        SELECTED_DATA: item,
                                    };
                                    this.executeMethod(ComponentSelectOptionConfigs.methods.SELECT_CHANGE.name, event, params);
                                },
                            },
                            children: [
                                ReactiveElement.span({
                                    children: [item.name],
                                }),
                                ...(prop_listIcons && Array.isArray(prop_listIcons)
                                    ? prop_listIcons.map((iconDef: any, j: number) =>
                                        ReactiveElement.span({
                                            styles: {
                                                cursor: "pointer",
                                                margin: "0 2.5px",
                                                fontSize: "14px",
                                                flexShrink: "0",
                                            },
                                            on: {
                                                click: (event: Event) => {
                                                    event.stopPropagation();
                                                    const iconParams: ComponentSelectOption_Methods_ICON_CLICK_DataArgs = {
                                                        ICON_NAME: iconDef.name,
                                                        ITEM_ID:   String(item.id),
                                                    };
                                                    this.executeMethod(ComponentSelectOptionConfigs.methods.ICON_CLICK.name, event, iconParams);
                                                },
                                            },
                                            children: [iconDef.icon],
                                        })
                                    )
                                    : []
                                ),
                            ],
                        });
                    },
                    {},
                    this.getScope()
                ),
            });
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }


    /* ---------------------------------------------
        FUNCTIONs
    --------------------------------------------- */
    private fn_firstCallback() {
        const data = this._COMPONENT_CONFIG;
        const firstCallback = data?.prop_firstCallback?.get?.() ?? data?.prop_firstCallback ?? false;
        if (firstCallback) {
            const itemSelected = data?.prop_itemSelected?.get?.() ?? data?.prop_itemSelected ?? null;
            if (itemSelected != null) {
                const params: ComponentSelectOption_Methods_SELECT_CHANGE_DataArgs = {
                    SELECTED_ID:   itemSelected,
                    SELECTED_DATA: null,
                };
                this.executeMethod(ComponentSelectOptionConfigs.methods.SELECT_CHANGE.name, null as any, params);
            }
        }
    }

    call_setValue(value: string) {
        this.set(ComponentSelectOptionConfigs.keys.prop_itemSelected.name, value);
    }
}

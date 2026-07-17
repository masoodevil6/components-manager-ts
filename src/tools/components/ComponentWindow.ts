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
import {Observable} from "../../core/Observable";
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
    ToolsComponents_BorderWidth, UNITS,
    Z_INDEXES
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
    ComponentButtonMethodsType,
    ComponentButtonPropsType,
    ComponentButton_Types,
    ComponentButton_ButtonTypes,
    ComponentButton_Variants,
} from "./ComponentButton";
import {
    ComponentIconMethodsType,
    ComponentIconPropsType,
} from "./ComponentIcon";
import {
    ComponentElementPositionMethodsType,
    ComponentElementPositionPropsType,
    ComponentElementPosition_positionTypes,
} from "./ComponentElementPosition";




export const ComponentWindowProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,

    prop_blurBackgroundColor:               "prop_blurBackgroundColor",
    prop_windowBackgroundColor:             "prop_windowBackgroundColor",
    prop_windowWidth:                       "prop_windowWidth",
    prop_windowHeight:                      "prop_windowHeight",
    prop_windowRound:                       "prop_windowRound",

    prop_headerBackgroundColor:             "prop_headerBackgroundColor",
    prop_headerTitleColor:                  "prop_headerTitleColor",

    prop_header:                            "prop_header",
    prop_body:                              "prop_body",
    prop_footer:                            "prop_footer",

    prop_showBtnResize:                     "prop_showBtnResize",
    prop_showBtnClose:                      "prop_showBtnClose",

    prop_isVisible:                         "prop_isVisible",
    prop_isFullSize:                        "prop_isFullSize",

    prop_title:                             "prop_title",
    prop_content:                           "prop_content",
    prop_acceptText:                        "prop_acceptText",
    prop_cancelText:                        "prop_cancelText",
    prop_showCancel:                        "prop_showCancel",
    prop_showAccept:                        "prop_showAccept",
    prop_closeOnOverlay:                    "prop_closeOnOverlay",
} as const;


export enum ComponentWindow_Types {
    WINDOW =   "window",
    DIALOG =   "dialog",
}


const ComponentWindowConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        ///----------------------
        [ComponentWindowProps.prop_blurBackgroundColor]: {
            name:               ComponentWindowProps.prop_blurBackgroundColor,
            value:              GOG_SetValue<string>(Color(COLORS_MAIN.SHADOW, COLORS_GRAD.GRADE_1)),
        },
        [ComponentWindowProps.prop_windowBackgroundColor]: {
            name:               ComponentWindowProps.prop_windowBackgroundColor,
            value:              GOG_SetValue<string>(Color(COLORS_MAIN.SHAN, COLORS_GRAD.GRADE_2)),
        },
        [ComponentWindowProps.prop_windowWidth]: {
            name:               ComponentWindowProps.prop_windowWidth,
            value:              GOG_SetValue<number>(700),
        },
        [ComponentWindowProps.prop_windowHeight]: {
            name:               ComponentWindowProps.prop_windowHeight,
            value:              GOG_SetValue<number>(400),
        },
        [ComponentWindowProps.prop_windowRound]: {
            name:               ComponentWindowProps.prop_windowRound,
            value:              GOG_SetValue<string>(ToolsComponents_BorderRadius[SIZES.M]),
        },
        [ComponentWindowProps.prop_headerBackgroundColor]: {
            name:               ComponentWindowProps.prop_headerBackgroundColor,
            value:              GOG_SetValue<string>(Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1)),
        },
        [ComponentWindowProps.prop_headerTitleColor]: {
            name:               ComponentWindowProps.prop_headerTitleColor,
            value:              GOG_SetValue<string>(Color(COLORS_MAIN.SHAN, COLORS_GRAD.GRADE_1)),
        },
        [ComponentWindowProps.prop_header]: {
            name:               ComponentWindowProps.prop_header,
            value:              GOG_SetValue<ReactiveElement | string | null>(null),
        },
        [ComponentWindowProps.prop_body]: {
            name:               ComponentWindowProps.prop_body,
            value:              GOG_SetValue<ReactiveElement | string | null>(null),
        },
        [ComponentWindowProps.prop_footer]: {
            name:               ComponentWindowProps.prop_footer,
            value:              GOG_SetValue<ReactiveElement | string | null>(null),
        },
        [ComponentWindowProps.prop_showBtnResize]: {
            name:               ComponentWindowProps.prop_showBtnResize,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentWindowProps.prop_showBtnClose]: {
            name:               ComponentWindowProps.prop_showBtnClose,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentWindowProps.prop_isVisible]: {
            name:               ComponentWindowProps.prop_isVisible,
            value:              GOG_SetValue<boolean>(false),
        },
        [ComponentWindowProps.prop_isFullSize]: {
            name:               ComponentWindowProps.prop_isFullSize,
            value:              GOG_SetValue<boolean>(false),
        },
        [ComponentWindowProps.prop_title]: {
            name:               ComponentWindowProps.prop_title,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentWindowProps.prop_content]: {
            name:               ComponentWindowProps.prop_content,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentWindowProps.prop_acceptText]: {
            name:               ComponentWindowProps.prop_acceptText,
            value:              GOG_SetValue<string>("Confirm"),
        },
        [ComponentWindowProps.prop_cancelText]: {
            name:               ComponentWindowProps.prop_cancelText,
            value:              GOG_SetValue<string>("Cancel"),
        },
        [ComponentWindowProps.prop_showCancel]: {
            name:               ComponentWindowProps.prop_showCancel,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentWindowProps.prop_showAccept]: {
            name:               ComponentWindowProps.prop_showAccept,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentWindowProps.prop_closeOnOverlay]: {
            name:               ComponentWindowProps.prop_closeOnOverlay,
            value:              GOG_SetValue<boolean>(true),
        },
    },
    schemas: {
        ...GOG_ComponentBasicConfigs_Component_parts,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts,
        STRUCTURE: {
            name:               "part_structure",
        },
        BLUR: {
            name:               "part_blur",
        },
        WINDOW: {
            name:               "part_window",
        },
        WINDOW_HEADER: {
            name:               "part_window_header",
        },
        WINDOW_HEADER_TITLE: {
            name:               "part_window_header_title",
        },
        WINDOW_HEADER_ICONS: {
            name:               "part_window_header_icons",
        },
        WINDOW_HEADER_ICONS_CLOSE: {
            name:               "part_window_header_icons_close",
        },
        WINDOW_HEADER_ICONS_RESIZE: {
            name:               "part_window_header_icons_resize",
        },
        WINDOW_BODY: {
            name:               "part_window_body",
        },
        WINDOW_FOOTER: {
            name:               "part_window_footer",
        },
    },
    templates: {
        BODY: {
            name:               "body",
        },
    },
    methods: {
        CLOSE: {
            name:               "fn_onClickClose",
            dataArgs: {},
            componentArgs: {},
        },
        OPEN: {
            name:               "fn_onClickOpen",
            dataArgs: {},
            componentArgs: {},
        },
        RESIZE: {
            name:               "fn_onClickResize",
            dataArgs: {},
            componentArgs: {},
        },
        MINIMIZE: {
            name:               "fn_onClickMinimize",
            dataArgs: {},
            componentArgs: {},
        },
        CLICK_WINDOW: {
            name:               "fn_onClickWindow",
            dataArgs: {},
            componentArgs: {},
        },
        CLICK_OVERLAY: {
            name:               "fn_onClickOverlay",
            dataArgs: {},
            componentArgs: {},
        },
        ACCEPT: {
            name:               "fn_onAccept",
            dataArgs: {},
            componentArgs: {},
        },
        CANCEL: {
            name:               "fn_onCancel",
            dataArgs: {},
            componentArgs: {},
        },
    }
} as const;


export type ComponentWindowPropsType =                      GOG_ExtractNameValue<typeof ComponentWindowConfigs.keys>
export type ComponentWindowSchemaType =                     GOG_ExtractName<typeof ComponentWindowConfigs.schemas>
export type ComponentWindowTemplatesType =                  GOG_ExtractName<typeof ComponentWindowConfigs.templates>

export type ComponentWindow_Methods_CLOSE_ComponentArgs =   GOG_ExtractName<typeof ComponentWindowConfigs.methods.CLOSE.componentArgs>
export type ComponentWindow_Methods_CLOSE_DataArgs =        GOG_ExtractNameValue<typeof ComponentWindowConfigs.methods.CLOSE.dataArgs>
export type ComponentWindow_Methods_OPEN_ComponentArgs =    GOG_ExtractName<typeof ComponentWindowConfigs.methods.OPEN.componentArgs>
export type ComponentWindow_Methods_OPEN_DataArgs =         GOG_ExtractNameValue<typeof ComponentWindowConfigs.methods.OPEN.dataArgs>
export type ComponentWindow_Methods_RESIZE_ComponentArgs =  GOG_ExtractName<typeof ComponentWindowConfigs.methods.RESIZE.componentArgs>
export type ComponentWindow_Methods_RESIZE_DataArgs =       GOG_ExtractNameValue<typeof ComponentWindowConfigs.methods.RESIZE.dataArgs>
export type ComponentWindow_Methods_MINIMIZE_ComponentArgs = GOG_ExtractName<typeof ComponentWindowConfigs.methods.MINIMIZE.componentArgs>
export type ComponentWindow_Methods_MINIMIZE_DataArgs =     GOG_ExtractNameValue<typeof ComponentWindowConfigs.methods.MINIMIZE.dataArgs>
export type ComponentWindow_Methods_CLICK_WINDOW_ComponentArgs = GOG_ExtractName<typeof ComponentWindowConfigs.methods.CLICK_WINDOW.componentArgs>
export type ComponentWindow_Methods_CLICK_WINDOW_DataArgs = GOG_ExtractNameValue<typeof ComponentWindowConfigs.methods.CLICK_WINDOW.dataArgs>
export type ComponentWindow_Methods_CLICK_OVERLAY_ComponentArgs = GOG_ExtractName<typeof ComponentWindowConfigs.methods.CLICK_OVERLAY.componentArgs>
export type ComponentWindow_Methods_CLICK_OVERLAY_DataArgs = GOG_ExtractNameValue<typeof ComponentWindowConfigs.methods.CLICK_OVERLAY.dataArgs>
export type ComponentWindow_Methods_ACCEPT_ComponentArgs =  GOG_ExtractName<typeof ComponentWindowConfigs.methods.ACCEPT.componentArgs>
export type ComponentWindow_Methods_ACCEPT_DataArgs =       GOG_ExtractNameValue<typeof ComponentWindowConfigs.methods.ACCEPT.dataArgs>
export type ComponentWindow_Methods_CANCEL_ComponentArgs =  GOG_ExtractName<typeof ComponentWindowConfigs.methods.CANCEL.componentArgs>
export type ComponentWindow_Methods_CANCEL_DataArgs =       GOG_ExtractNameValue<typeof ComponentWindowConfigs.methods.CANCEL.dataArgs>

export type ComponentWindowMethodsType = {
    [ComponentWindowConfigs.methods.CLOSE.name]?:               ComponentCallBackType<ComponentWindow_Methods_CLOSE_ComponentArgs, ComponentWindow_Methods_CLOSE_DataArgs>,
    [ComponentWindowConfigs.methods.OPEN.name]?:                ComponentCallBackType<ComponentWindow_Methods_OPEN_ComponentArgs, ComponentWindow_Methods_OPEN_DataArgs>,
    [ComponentWindowConfigs.methods.RESIZE.name]?:              ComponentCallBackType<ComponentWindow_Methods_RESIZE_ComponentArgs, ComponentWindow_Methods_RESIZE_DataArgs>,
    [ComponentWindowConfigs.methods.MINIMIZE.name]?:            ComponentCallBackType<ComponentWindow_Methods_MINIMIZE_ComponentArgs, ComponentWindow_Methods_MINIMIZE_DataArgs>,
    [ComponentWindowConfigs.methods.CLICK_WINDOW.name]?:        ComponentCallBackType<ComponentWindow_Methods_CLICK_WINDOW_ComponentArgs, ComponentWindow_Methods_CLICK_WINDOW_DataArgs>,
    [ComponentWindowConfigs.methods.CLICK_OVERLAY.name]?:       ComponentCallBackType<ComponentWindow_Methods_CLICK_OVERLAY_ComponentArgs, ComponentWindow_Methods_CLICK_OVERLAY_DataArgs>,
    [ComponentWindowConfigs.methods.ACCEPT.name]?:              ComponentCallBackType<ComponentWindow_Methods_ACCEPT_ComponentArgs, ComponentWindow_Methods_ACCEPT_DataArgs>,
    [ComponentWindowConfigs.methods.CANCEL.name]?:              ComponentCallBackType<ComponentWindow_Methods_CANCEL_ComponentArgs, ComponentWindow_Methods_CANCEL_DataArgs>,
}




export abstract class ComponentWindowBase extends ComponentBase<
    ComponentWindowPropsType,
    ComponentWindowSchemaType,
    ComponentWindowTemplatesType,
    ComponentWindowMethodsType
    > {


    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN = defineComponentPatterns<ComponentWindowPropsType>(
        {
            ...GOG_ComponentBasicConfigs_Component_Pattern(this),
            ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this),

            [ComponentWindowConfigs.keys.prop_blurBackgroundColor.name]: {
                prop:                                             ComponentWindowConfigs.keys.prop_blurBackgroundColor.name,
                default:                                          ComponentWindowConfigs.keys.prop_blurBackgroundColor.value,
                title:                                            Language.translate("components.window.props.prop_blurBackgroundColor.title"),
                description:                                      Language.translate("components.window.props.prop_blurBackgroundColor.description"),
            },
            [ComponentWindowConfigs.keys.prop_windowBackgroundColor.name]: {
                prop:                                             ComponentWindowConfigs.keys.prop_windowBackgroundColor.name,
                default:                                          ComponentWindowConfigs.keys.prop_windowBackgroundColor.value,
                title:                                            Language.translate("components.window.props.prop_windowBackgroundColor.title"),
                description:                                      Language.translate("components.window.props.prop_windowBackgroundColor.description"),
            },
            [ComponentWindowConfigs.keys.prop_windowWidth.name]: {
                prop:                                             ComponentWindowConfigs.keys.prop_windowWidth.name,
                default:                                          ComponentWindowConfigs.keys.prop_windowWidth.value,
                title:                                            Language.translate("components.window.props.prop_windowWidth.title"),
                description:                                      Language.translate("components.window.props.prop_windowWidth.description"),
            },
            [ComponentWindowConfigs.keys.prop_windowHeight.name]: {
                prop:                                             ComponentWindowConfigs.keys.prop_windowHeight.name,
                default:                                          ComponentWindowConfigs.keys.prop_windowHeight.value,
                title:                                            Language.translate("components.window.props.prop_windowHeight.title"),
                description:                                      Language.translate("components.window.props.prop_windowHeight.description"),
            },
            [ComponentWindowConfigs.keys.prop_windowRound.name]: {
                prop:                                             ComponentWindowConfigs.keys.prop_windowRound.name,
                default:                                          ComponentWindowConfigs.keys.prop_windowRound.value,
                title:                                            Language.translate("components.window.props.prop_windowRound.title"),
                description:                                      Language.translate("components.window.props.prop_windowRound.description"),
            },
            [ComponentWindowConfigs.keys.prop_headerBackgroundColor.name]: {
                prop:                                             ComponentWindowConfigs.keys.prop_headerBackgroundColor.name,
                default:                                          ComponentWindowConfigs.keys.prop_headerBackgroundColor.value,
                title:                                            Language.translate("components.window.props.prop_headerBackgroundColor.title"),
                description:                                      Language.translate("components.window.props.prop_headerBackgroundColor.description"),
            },
            [ComponentWindowConfigs.keys.prop_headerTitleColor.name]: {
                prop:                                             ComponentWindowConfigs.keys.prop_headerTitleColor.name,
                default:                                          ComponentWindowConfigs.keys.prop_headerTitleColor.value,
                title:                                            Language.translate("components.window.props.prop_headerTitleColor.title"),
                description:                                      Language.translate("components.window.props.prop_headerTitleColor.description"),
            },
            [ComponentWindowConfigs.keys.prop_header.name]: {
                prop:                                             ComponentWindowConfigs.keys.prop_header.name,
                default:                                          ComponentWindowConfigs.keys.prop_header.value,
                title:                                            Language.translate("components.window.props.prop_header.title"),
                description:                                      Language.translate("components.window.props.prop_header.description"),
            },
            [ComponentWindowConfigs.keys.prop_body.name]: {
                prop:                                             ComponentWindowConfigs.keys.prop_body.name,
                default:                                          ComponentWindowConfigs.keys.prop_body.value,
                title:                                            Language.translate("components.window.props.prop_body.title"),
                description:                                      Language.translate("components.window.props.prop_body.description"),
            },
            [ComponentWindowConfigs.keys.prop_footer.name]: {
                prop:                                             ComponentWindowConfigs.keys.prop_footer.name,
                default:                                          ComponentWindowConfigs.keys.prop_footer.value,
                title:                                            Language.translate("components.window.props.prop_footer.title"),
                description:                                      Language.translate("components.window.props.prop_footer.description"),
            },
            [ComponentWindowConfigs.keys.prop_showBtnResize.name]: {
                prop:                                             ComponentWindowConfigs.keys.prop_showBtnResize.name,
                default:                                          ComponentWindowConfigs.keys.prop_showBtnResize.value,
                title:                                            Language.translate("components.window.props.prop_showBtnResize.title"),
                description:                                      Language.translate("components.window.props.prop_showBtnResize.description"),
            },
            [ComponentWindowConfigs.keys.prop_showBtnClose.name]: {
                prop:                                             ComponentWindowConfigs.keys.prop_showBtnClose.name,
                default:                                          ComponentWindowConfigs.keys.prop_showBtnClose.value,
                title:                                            Language.translate("components.window.props.prop_showBtnClose.title"),
                description:                                      Language.translate("components.window.props.prop_showBtnClose.description"),
            },
            [ComponentWindowConfigs.keys.prop_isVisible.name]: {
                prop:                                             ComponentWindowConfigs.keys.prop_isVisible.name,
                default:                                          ComponentWindowConfigs.keys.prop_isVisible.value,
                title:                                            Language.translate("components.window.props.prop_isVisible.title"),
                description:                                      Language.translate("components.window.props.prop_isVisible.description"),
            },
            [ComponentWindowConfigs.keys.prop_isFullSize.name]: {
                prop:                                             ComponentWindowConfigs.keys.prop_isFullSize.name,
                default:                                          ComponentWindowConfigs.keys.prop_isFullSize.value,
                title:                                            Language.translate("components.window.props.prop_isFullSize.title"),
                description:                                      Language.translate("components.window.props.prop_isFullSize.description"),
            },
            [ComponentWindowConfigs.keys.prop_title.name]: {
                prop:                                             ComponentWindowConfigs.keys.prop_title.name,
                default:                                          ComponentWindowConfigs.keys.prop_title.value,
                title:                                            Language.translate("components.window.props.prop_title.title"),
                description:                                      Language.translate("components.window.props.prop_title.description"),
            },
            [ComponentWindowConfigs.keys.prop_content.name]: {
                prop:                                             ComponentWindowConfigs.keys.prop_content.name,
                default:                                          ComponentWindowConfigs.keys.prop_content.value,
                title:                                            Language.translate("components.window.props.prop_content.title"),
                description:                                      Language.translate("components.window.props.prop_content.description"),
            },
            [ComponentWindowConfigs.keys.prop_acceptText.name]: {
                prop:                                             ComponentWindowConfigs.keys.prop_acceptText.name,
                default:                                          ComponentWindowConfigs.keys.prop_acceptText.value,
                title:                                            Language.translate("components.window.props.prop_acceptText.title"),
                description:                                      Language.translate("components.window.props.prop_acceptText.description"),
            },
            [ComponentWindowConfigs.keys.prop_cancelText.name]: {
                prop:                                             ComponentWindowConfigs.keys.prop_cancelText.name,
                default:                                          ComponentWindowConfigs.keys.prop_cancelText.value,
                title:                                            Language.translate("components.window.props.prop_cancelText.title"),
                description:                                      Language.translate("components.window.props.prop_cancelText.description"),
            },
            [ComponentWindowConfigs.keys.prop_showCancel.name]: {
                prop:                                             ComponentWindowConfigs.keys.prop_showCancel.name,
                default:                                          ComponentWindowConfigs.keys.prop_showCancel.value,
                title:                                            Language.translate("components.window.props.prop_showCancel.title"),
                description:                                      Language.translate("components.window.props.prop_showCancel.description"),
            },
            [ComponentWindowConfigs.keys.prop_showAccept.name]: {
                prop:                                             ComponentWindowConfigs.keys.prop_showAccept.name,
                default:                                          ComponentWindowConfigs.keys.prop_showAccept.value,
                title:                                            Language.translate("components.window.props.prop_showAccept.title"),
                description:                                      Language.translate("components.window.props.prop_showAccept.description"),
            },
            [ComponentWindowConfigs.keys.prop_closeOnOverlay.name]: {
                prop:                                             ComponentWindowConfigs.keys.prop_closeOnOverlay.name,
                default:                                          ComponentWindowConfigs.keys.prop_closeOnOverlay.value,
                title:                                            Language.translate("components.window.props.prop_closeOnOverlay.title"),
                description:                                      Language.translate("components.window.props.prop_closeOnOverlay.description"),
            },
        }
    );


    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentWindowSchemaType, ComponentWindowPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this),
        STRUCTURE: {
            part:               ComponentWindowConfigs.schemas.STRUCTURE.name,
            title:              Language.translate("components.window.schema.structure.title"),
            description:        Language.translate("components.window.schema.structure.description"),
            props: []
        },
        BLUR: {
            part:               ComponentWindowConfigs.schemas.BLUR.name,
            title:              Language.translate("components.window.schema.blur.title"),
            description:        Language.translate("components.window.schema.blur.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentWindowConfigs.keys.prop_blurBackgroundColor.name],
                this._COMPONENT_PATTERN[ComponentWindowConfigs.keys.prop_closeOnOverlay.name],
            ]
        },
        WINDOW: {
            part:               ComponentWindowConfigs.schemas.WINDOW.name,
            title:              Language.translate("components.window.schema.window.title"),
            description:        Language.translate("components.window.schema.window.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentWindowConfigs.keys.prop_windowBackgroundColor.name],
                this._COMPONENT_PATTERN[ComponentWindowConfigs.keys.prop_windowWidth.name],
                this._COMPONENT_PATTERN[ComponentWindowConfigs.keys.prop_windowHeight.name],
                this._COMPONENT_PATTERN[ComponentWindowConfigs.keys.prop_windowRound.name],
            ]
        },
        WINDOW_HEADER: {
            part:               ComponentWindowConfigs.schemas.WINDOW_HEADER.name,
            title:              Language.translate("components.window.schema.window_header.title"),
            description:        Language.translate("components.window.schema.window_header.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentWindowConfigs.keys.prop_headerBackgroundColor.name],
            ]
        },
        WINDOW_HEADER_TITLE: {
            part:               ComponentWindowConfigs.schemas.WINDOW_HEADER_TITLE.name,
            title:              Language.translate("components.window.schema.window_header_title.title"),
            description:        Language.translate("components.window.schema.window_header_title.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentWindowConfigs.keys.prop_header.name],
                this._COMPONENT_PATTERN[ComponentWindowConfigs.keys.prop_title.name],
                this._COMPONENT_PATTERN[ComponentWindowConfigs.keys.prop_headerTitleColor.name],
            ]
        },
        WINDOW_HEADER_ICONS: {
            part:               ComponentWindowConfigs.schemas.WINDOW_HEADER_ICONS.name,
            title:              Language.translate("components.window.schema.window_header_icons.title"),
            description:        Language.translate("components.window.schema.window_header_icons.description"),
            props: []
        },
        WINDOW_HEADER_ICONS_CLOSE: {
            part:               ComponentWindowConfigs.schemas.WINDOW_HEADER_ICONS_CLOSE.name,
            title:              Language.translate("components.window.schema.window_header_icons_close.title"),
            description:        Language.translate("components.window.schema.window_header_icons_close.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentWindowConfigs.keys.prop_showBtnClose.name],
            ]
        },
        WINDOW_HEADER_ICONS_RESIZE: {
            part:               ComponentWindowConfigs.schemas.WINDOW_HEADER_ICONS_RESIZE.name,
            title:              Language.translate("components.window.schema.window_header_icons_resize.title"),
            description:        Language.translate("components.window.schema.window_header_icons_resize.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentWindowConfigs.keys.prop_showBtnResize.name],
            ]
        },
        WINDOW_BODY: {
            part:               ComponentWindowConfigs.schemas.WINDOW_BODY.name,
            title:              Language.translate("components.window.schema.window_body.title"),
            description:        Language.translate("components.window.schema.window_body.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentWindowConfigs.keys.prop_body.name],
                this._COMPONENT_PATTERN[ComponentWindowConfigs.keys.prop_content.name],
            ]
        },
        WINDOW_FOOTER: {
            part:               ComponentWindowConfigs.schemas.WINDOW_FOOTER.name,
            title:              Language.translate("components.window.schema.window_footer.title"),
            description:        Language.translate("components.window.schema.window_footer.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentWindowConfigs.keys.prop_footer.name],
                this._COMPONENT_PATTERN[ComponentWindowConfigs.keys.prop_acceptText.name],
                this._COMPONENT_PATTERN[ComponentWindowConfigs.keys.prop_cancelText.name],
                this._COMPONENT_PATTERN[ComponentWindowConfigs.keys.prop_showCancel.name],
                this._COMPONENT_PATTERN[ComponentWindowConfigs.keys.prop_showAccept.name],
            ]
        },
    });


    /* ---------------------------------------------
        PROPERTYs Template
    --------------------------------------------- */
    _COMPONENT_TEMPLATES = defineComponentTemplate<ComponentWindowTemplatesType, ComponentWindowPropsType>({
        BODY: {
            title:                                            Language.translate("components.window.template.body.title"),
            description:                                      Language.translate("components.window.template.body.description"),
            reference:                                        this._COMPONENT_PATTERN[ComponentWindowConfigs.keys.prop_body.name]
        },
    });


    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentWindowMethodsType, ComponentWindowPropsType>({
        [ComponentWindowConfigs.methods.CLOSE.name]: {
            title:                                            Language.translate("components.window.methods.fn_onClickClose.title"),
            description:                                      Language.translate("components.window.methods.fn_onClickClose.description"),
            args: {}
        },
        [ComponentWindowConfigs.methods.OPEN.name]: {
            title:                                            Language.translate("components.window.methods.fn_onClickOpen.title"),
            description:                                      Language.translate("components.window.methods.fn_onClickOpen.description"),
            args: {}
        },
        [ComponentWindowConfigs.methods.RESIZE.name]: {
            title:                                            Language.translate("components.window.methods.fn_onClickResize.title"),
            description:                                      Language.translate("components.window.methods.fn_onClickResize.description"),
            args: {}
        },
        [ComponentWindowConfigs.methods.MINIMIZE.name]: {
            title:                                            Language.translate("components.window.methods.fn_onClickMinimize.title"),
            description:                                      Language.translate("components.window.methods.fn_onClickMinimize.description"),
            args: {}
        },
        [ComponentWindowConfigs.methods.CLICK_WINDOW.name]: {
            title:                                            Language.translate("components.window.methods.fn_onClickWindow.title"),
            description:                                      Language.translate("components.window.methods.fn_onClickWindow.description"),
            args: {}
        },
        [ComponentWindowConfigs.methods.CLICK_OVERLAY.name]: {
            title:                                            Language.translate("components.window.methods.fn_onClickOverlay.title"),
            description:                                      Language.translate("components.window.methods.fn_onClickOverlay.description"),
            args: {}
        },
        [ComponentWindowConfigs.methods.ACCEPT.name]: {
            title:                                            Language.translate("components.window.methods.fn_onAccept.title"),
            description:                                      Language.translate("components.window.methods.fn_onAccept.description"),
            args: {}
        },
        [ComponentWindowConfigs.methods.CANCEL.name]: {
            title:                                            Language.translate("components.window.methods.fn_onCancel.title"),
            description:                                      Language.translate("components.window.methods.fn_onCancel.description"),
            args: {}
        },
    });


    /* ---------------------------------------------
        Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        const windowComp = new ComponentWindow(
            <ComponentWindowPropsType>{
                classList: [],
                styles: {},
                prop_title: "Window Example",
                prop_windowWidth: 500,
                prop_windowHeight: 300,
                prop_body: "This is window body content",
                prop_showBtnResize: true,
            },
            <ComponentWindowMethodsType>{}
        );

        const btnComp = new ToolsComponents.ComponentButton(
            <ComponentButtonPropsType>{
                classList: ["col-md-3", "col-12", "border", "p-2"],
                prop_btnTitle: "Open Window",
                prop_type: ComponentButton_Types.SUBMIT,
            },
            <ComponentButtonMethodsType>{
                fn_onClickButton: (event, dataArgs, componentArgs) => {
                    windowComp.call_open(event);
                }
            }
        );

        document.body.appendChild(windowComp.getElement() as HTMLElement);
        return btnComp.getElement() as HTMLElement;
    }

}


export class ComponentWindow extends ComponentWindowBase {

    private _IS_FULL_SIZE = false;

    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentWindowPropsType,
        methods?: ComponentWindowMethodsType,
        events = null
    ) {
        super("window", null);
        super.renderComponent(config, methods, events);
        this.fn_injectStyles();
    }

    private fn_injectStyles(): void {
        const styleId = `component-window-styles-${this._COMPONENT_RANDOM_ID}`;
        if (document.getElementById(styleId)) return;

        const prop_width = this.get(ComponentWindowConfigs.keys.prop_windowWidth.name);
        const prop_height = this.get(ComponentWindowConfigs.keys.prop_windowHeight.name);
        const w = (prop_width instanceof Observable ? prop_width.get() : prop_width) || 700;
        const h = (prop_height instanceof Observable ? prop_height.get() : prop_height) || 400;

        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
            .window-full-size-${this._COMPONENT_RANDOM_ID} {
                width: 95% !important;
                height: 95% !important;
                top: 2.5% !important;
                left: 2.5% !important;
                transform: none !important;
                maxHeight: 95vh !important;
            }
            .window-real-size-${this._COMPONENT_RANDOM_ID} {
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
            }
            .window-visable-animation-${this._COMPONENT_RANDOM_ID} {
                animation: window-visable-anim-${this._COMPONENT_RANDOM_ID} 0.15s forwards ease-in-out;
            }
            .window-unvisable-animation-${this._COMPONENT_RANDOM_ID} {
                animation: window-unvisable-anim-${this._COMPONENT_RANDOM_ID} 0.15s forwards ease-in-out;
            }
            @keyframes window-visable-anim-${this._COMPONENT_RANDOM_ID} {
                0% {
                    width: ${w * 2 / 3}px;
                    height: ${h * 2 / 3}px;
                    opacity: 0;
                }
                50% {
                    width: ${w * 4 / 3}px;
                    height: ${h * 4 / 3}px;
                    opacity: 1;
                }
                100% {
                    width: ${w}px;
                    height: ${h}px;
                    opacity: 1;
                }
            }
            @keyframes window-unvisable-anim-${this._COMPONENT_RANDOM_ID} {
                0% {
                    width: ${w}px;
                    height: ${h}px;
                    opacity: 1;
                }
                50% {
                    width: ${w * 4 / 3}px;
                    height: ${h * 4 / 3}px;
                    opacity: 1;
                }
                100% {
                    width: ${w * 2 / 3}px;
                    height: ${h * 2 / 3}px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }


    /* ---------------------------------------------
        TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentWindowConfigs.schemas.STRUCTURE.name)
    }

    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentWindowConfigs.schemas.STRUCTURE.name:
                return this.template_render_structure(attrsDefault, data, extra);
            case ComponentWindowConfigs.schemas.BLUR.name:
                return this.template_render_blur(attrsDefault, data, extra);
            case ComponentWindowConfigs.schemas.WINDOW.name:
                return this.template_render_window(attrsDefault, data, extra);
            case ComponentWindowConfigs.schemas.WINDOW_HEADER.name:
                return this.template_render_windowHeader(attrsDefault, data, extra);
            case ComponentWindowConfigs.schemas.WINDOW_HEADER_TITLE.name:
                return this.template_render_windowHeaderTitle(attrsDefault, data, extra);
            case ComponentWindowConfigs.schemas.WINDOW_HEADER_ICONS.name:
                return this.template_render_windowHeaderIcons(attrsDefault, data, extra);
            case ComponentWindowConfigs.schemas.WINDOW_HEADER_ICONS_CLOSE.name:
                return this.template_render_windowHeaderIconClose(attrsDefault, data, extra);
            case ComponentWindowConfigs.schemas.WINDOW_HEADER_ICONS_RESIZE.name:
                return this.template_render_windowHeaderIconResize(attrsDefault, data, extra);
            case ComponentWindowConfigs.schemas.WINDOW_BODY.name:
                return this.template_render_windowBody(attrsDefault, data, extra);
            case ComponentWindowConfigs.schemas.WINDOW_FOOTER.name:
                return this.template_render_windowFooter(attrsDefault, data, extra);
        }
    }


    private template_render_structure(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-window-structure-${this._COMPONENT_RANDOM_ID}`,
                },
                className: ["d-none"],
                children: [
                    this.executeSchemaPart(ComponentWindowConfigs.schemas.BLUR.name),
                ]
            });
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    private template_render_blur(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_blurBackgroundColor = data[ComponentWindowConfigs.keys.prop_blurBackgroundColor.name];
            const prop_closeOnOverlay = data[ComponentWindowConfigs.keys.prop_closeOnOverlay.name];

            const closeOnOverlay = prop_closeOnOverlay instanceof Observable ? prop_closeOnOverlay.get() : prop_closeOnOverlay;

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-window-blur-${this._COMPONENT_RANDOM_ID}`,
                },
                className: ["position-fixed", "w-100", "h-100"],
                styles: {
                    top: "0",
                    left: "0",
                    zIndex: `${ToolsCss.getZIndex(Z_INDEXES.blur_popup)}`,
                },
                stylesBind: {
                    backgroundColor: prop_blurBackgroundColor,
                },
                on: {
                    click: (event: Event) => {
                        if (closeOnOverlay) {
                            this.fn_onClickCloseWindow(event);
                        }
                    },
                },
                children: [
                    this.executeSchemaPart(ComponentWindowConfigs.schemas.WINDOW.name),
                ]
            });
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    private template_render_window(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_windowBackgroundColor = data[ComponentWindowConfigs.keys.prop_windowBackgroundColor.name];
            const prop_windowWidth = data[ComponentWindowConfigs.keys.prop_windowWidth.name];
            const prop_windowHeight = data[ComponentWindowConfigs.keys.prop_windowHeight.name];
            const prop_windowRound = data[ComponentWindowConfigs.keys.prop_windowRound.name];

            const width = prop_windowWidth instanceof Observable ? prop_windowWidth.get() : prop_windowWidth;
            const height = prop_windowHeight instanceof Observable ? prop_windowHeight.get() : prop_windowHeight;

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-window-window-${this._COMPONENT_RANDOM_ID}`,
                },
                className: ["position-absolute", "shadow"],
                styles: {
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: `${width}px`,
                    height: `${height}px`,
                    maxHeight: "calc(100vh - 30%) !important",
                    zIndex: `${ToolsCss.getZIndex(Z_INDEXES.popup)}`,
                },
                stylesBind: {
                    backgroundColor: prop_windowBackgroundColor,
                    borderRadius: prop_windowRound,
                },
                on: {
                    click: (event: Event) => {
                        event.stopImmediatePropagation();
                        this.executeMethod(ComponentWindowConfigs.methods.CLICK_WINDOW.name, event, {});
                    },
                },
                children: [
                    this.executeSchemaPart(ComponentWindowConfigs.schemas.WINDOW_HEADER.name),
                    this.executeSchemaPart(ComponentWindowConfigs.schemas.WINDOW_BODY.name),
                    this.executeSchemaPart(ComponentWindowConfigs.schemas.WINDOW_FOOTER.name),
                ]
            });
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    private template_render_windowHeader(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_headerBackgroundColor = data[ComponentWindowConfigs.keys.prop_headerBackgroundColor.name];

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-window-window-header-${this._COMPONENT_RANDOM_ID}`,
                },
                className: ["border-bottom", "row", "p-0", "m-0"],
                styles: {
                    height: "35px",
                    overflow: "hidden",
                    borderTopLeftRadius: "inherit",
                    borderTopRightRadius: "inherit",
                },
                stylesBind: {
                    backgroundColor: prop_headerBackgroundColor,
                },
                children: [
                    this.executeSchemaPart(ComponentWindowConfigs.schemas.WINDOW_HEADER_TITLE.name),
                    this.executeSchemaPart(ComponentWindowConfigs.schemas.WINDOW_HEADER_ICONS.name),
                ]
            });
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    private template_render_windowHeaderTitle(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_header = data[ComponentWindowConfigs.keys.prop_header.name];
            const prop_title = data[ComponentWindowConfigs.keys.prop_title.name];
            const prop_headerTitleColor = data[ComponentWindowConfigs.keys.prop_headerTitleColor.name];

            const headerValue = prop_header instanceof Observable ? prop_header.get() : prop_header;
            const titleValue = prop_title instanceof Observable ? prop_title.get() : prop_title;

            const displayTitle = headerValue ?? titleValue ?? "";

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-window-window-header-title-${this._COMPONENT_RANDOM_ID}`,
                },
                className: ["col-8"],
                styles: {
                    lineHeight: "35px",
                },
                stylesBind: {
                    color: prop_headerTitleColor,
                },
                children: [
                    ReactiveElement.b({ children: [displayTitle] }),
                ]
            });
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    private template_render_windowHeaderIcons(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-window-window-header-icons-${this._COMPONENT_RANDOM_ID}`,
                },
                className: ["col-4", "position-relative"],
                styles: {
                    height: "35px",
                },
                children: [
                    this.executeSchemaPart(ComponentWindowConfigs.schemas.WINDOW_HEADER_ICONS_CLOSE.name),
                    this.executeSchemaPart(ComponentWindowConfigs.schemas.WINDOW_HEADER_ICONS_RESIZE.name),
                ]
            });
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    private template_render_windowHeaderIconClose(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_showBtnClose = data[ComponentWindowConfigs.keys.prop_showBtnClose.name];
            const showBtnClose = prop_showBtnClose instanceof Observable ? prop_showBtnClose.get() : prop_showBtnClose;

            if (!showBtnClose) {
                return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
            }

            const directionRtl = AppConfig.get("directionRtl");

            const styles: Record<string, string> = {
                top: "50%",
                transform: "translate(0, -50%)",
            };
            styles[directionRtl ? "left" : "right"] = "10px";

            const posProps: any = {
                classList: [],
                styles: {},
                prop_positionType: ComponentElementPosition_positionTypes.ABSOLUTE,
                prop_positionTop: SizeUnit(50, UNITS.PERCENT),
                prop_positionWidth: SizeUnit(30, UNITS.PEXEL),
                prop_positionHeight: SizeUnit(30, UNITS.PEXEL),
                prop_positionStyles: styles,
                prop_content: new ToolsComponents.ComponentButton(
                    <ComponentButtonPropsType><unknown>{
                        classList: [],
                        styles: {},
                        prop_btnClass: ["d-flex", "align-items-center", "justify-content-center"],
                        prop_btnStyles: { width: "30px", height: "30px", padding: "0" },
                        prop_btnIcon: ToolsIcons.icon_close({size: SIZES.S}),
                        prop_variant: ComponentButton_Variants.SECONDARY,
                        prop_type: ComponentButton_Types.CUSTOM,
                        prop_btnType: ComponentButton_ButtonTypes.BUTTON,
                        prop_btnBorderRadius: SIZES.M,
                        prop_btnBackgroundColor: Color(COLORS_MAIN.SECONDARY, COLORS_GRAD.GRADE_1),
                        prop_btnTitleColor: Color(COLORS_MAIN.SHAN, COLORS_GRAD.GRADE_1),
                    },
                    <ComponentButtonMethodsType>{
                        fn_onClickButton: (event, dataArgs, componentArgs) => {
                            this.fn_onClickCloseWindow(event);
                        }
                    }
                ).getReactiveElement(),
            };

            if (directionRtl) {
                posProps.prop_positionLeft = SizeUnit(10, UNITS.PEXEL);
            } else {
                posProps.prop_positionRight = SizeUnit(10, UNITS.PEXEL);
            }

            return new ToolsComponents.ComponentElementPosition(
                posProps as ComponentElementPositionPropsType,
                <ComponentElementPositionMethodsType>{}
            ).getReactiveElement();
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    private template_render_windowHeaderIconResize(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_showBtnResize = data[ComponentWindowConfigs.keys.prop_showBtnResize.name];
            const showBtnResize = prop_showBtnResize instanceof Observable ? prop_showBtnResize.get() : prop_showBtnResize;

            if (!showBtnResize) {
                return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
            }

            const directionRtl = AppConfig.get("directionRtl");

            const styles: Record<string, string> = {
                top: "50%",
                transform: "translate(0, -50%)",
            };
            styles[directionRtl ? "left" : "right"] = "52px";

            const posProps: any = {
                classList: [],
                styles: {},
                prop_positionType: ComponentElementPosition_positionTypes.ABSOLUTE,
                prop_positionTop: SizeUnit(50, UNITS.PERCENT),
                prop_positionWidth: SizeUnit(30, UNITS.PEXEL),
                prop_positionHeight: SizeUnit(30, UNITS.PEXEL),
                prop_positionStyles: styles,
                prop_content: new ToolsComponents.ComponentButton(
                    <ComponentButtonPropsType><unknown>{
                        classList: [],
                        styles: {},
                        prop_btnClass: ["d-flex", "align-items-center", "justify-content-center"],
                        prop_btnStyles: { width: "30px", height: "30px", padding: "0" },
                        prop_btnIcon: ToolsIcons.icon_resize({size: SIZES.S}),
                        prop_variant: ComponentButton_Variants.SECONDARY,
                        prop_type: ComponentButton_Types.CUSTOM,
                        prop_btnType: ComponentButton_ButtonTypes.BUTTON,
                        prop_btnBorderRadius: SIZES.M,
                        prop_btnBackgroundColor: Color(COLORS_MAIN.SECONDARY, COLORS_GRAD.GRADE_1),
                        prop_btnTitleColor: Color(COLORS_MAIN.SHAN, COLORS_GRAD.GRADE_1),
                    },
                    <ComponentButtonMethodsType>{
                        fn_onClickButton: (event, dataArgs, componentArgs) => {
                            this.fn_onClickResizeWindow(event);
                        }
                    }
                ).getReactiveElement(),
            };

            if (directionRtl) {
                posProps.prop_positionLeft = SizeUnit(52, UNITS.PEXEL);
            } else {
                posProps.prop_positionRight = SizeUnit(52, UNITS.PEXEL);
            }

            return new ToolsComponents.ComponentElementPosition(
                posProps as ComponentElementPositionPropsType,
                <ComponentElementPositionMethodsType>{}
            ).getReactiveElement();
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    private template_render_windowBody(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_body = data[ComponentWindowConfigs.keys.prop_body.name];
            const prop_content = data[ComponentWindowConfigs.keys.prop_content.name];

            const bodyValue = prop_body instanceof Observable ? prop_body.get() : prop_body;
            const contentValue = prop_content instanceof Observable ? prop_content.get() : prop_content;

            const displayContent = bodyValue ?? contentValue ?? "";

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-window-window-body-${this._COMPONENT_RANDOM_ID}`,
                },
                className: ["overflow-auto", "px-2"],
                styles: {
                    height: "calc(100% - 90px)",
                },
                children: [
                    displayContent,
                ]
            });
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    private template_render_windowFooter(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_footer = data[ComponentWindowConfigs.keys.prop_footer.name];
            const prop_acceptText = data[ComponentWindowConfigs.keys.prop_acceptText.name];
            const prop_cancelText = data[ComponentWindowConfigs.keys.prop_cancelText.name];
            const prop_showCancel = data[ComponentWindowConfigs.keys.prop_showCancel.name];
            const prop_showAccept = data[ComponentWindowConfigs.keys.prop_showAccept.name];

            const footerValue = prop_footer instanceof Observable ? prop_footer.get() : prop_footer;
            const acceptTextValue = prop_acceptText instanceof Observable ? prop_acceptText.get() : prop_acceptText;
            const cancelTextValue = prop_cancelText instanceof Observable ? prop_cancelText.get() : prop_cancelText;
            const showCancelValue = prop_showCancel instanceof Observable ? prop_showCancel.get() : prop_showCancel;
            const showAcceptValue = prop_showAccept instanceof Observable ? prop_showAccept.get() : prop_showAccept;

            if (footerValue != null) {
                return ReactiveElement.part("section", {
                    attrs: {
                        ...attrsDefault,
                        "id": `component-window-window-footer-${this._COMPONENT_RANDOM_ID}`,
                    },
                    className: ["border-top"],
                    styles: {
                        height: "55px",
                    },
                    children: [
                        footerValue,
                    ]
                });
            }

            const footerChildren: (ReactiveElement | string)[] = [];

            if (showCancelValue) {
                footerChildren.push(
                    new ToolsComponents.ComponentButton(
                        <ComponentButtonPropsType><unknown>{
                            classList: [],
                            styles: {},
                            prop_btnClass: [],
                            prop_btnStyles: {
                                padding: "6px 14px",
                                fontSize: "12px",
                            },
                            prop_btnTitle: cancelTextValue ?? "Cancel",
                            prop_btnIcon: ToolsIcons.icon_close({size: SIZES.S, primaryColor: Color(COLORS_MAIN.SHAN, COLORS_GRAD.GRADE_1)}),
                            prop_type: ComponentButton_Types.CANCEL,
                            prop_btnType: ComponentButton_ButtonTypes.BUTTON,
                        },
                        <ComponentButtonMethodsType>{
                            fn_onClickButton: (event, dataArgs, componentArgs) => {
                                this.executeMethod(ComponentWindowConfigs.methods.CANCEL.name, event, {});
                                this.fn_onClickCloseWindow(event);
                            }
                        }
                    ).getReactiveElement()
                );
            }

            if (showAcceptValue) {
                footerChildren.push(
                    new ToolsComponents.ComponentButton(
                        <ComponentButtonPropsType><unknown>{
                            classList: [],
                            styles: {},
                            prop_btnClass: [],
                            prop_btnStyles: {
                                padding: "6px 14px",
                                fontSize: "12px",
                            },
                            prop_btnTitle: acceptTextValue ?? "Confirm",
                            prop_btnIcon: ToolsIcons.icon_tik({size: SIZES.S, primaryColor: Color(COLORS_MAIN.SHAN, COLORS_GRAD.GRADE_1)}),
                            prop_type: ComponentButton_Types.SUBMIT,
                            prop_btnType: ComponentButton_ButtonTypes.BUTTON,
                        },
                        <ComponentButtonMethodsType>{
                            fn_onClickButton: (event, dataArgs, componentArgs) => {
                                this.executeMethod(ComponentWindowConfigs.methods.ACCEPT.name, event, {});
                                this.fn_onClickCloseWindow(event);
                            }
                        }
                    ).getReactiveElement()
                );
            }

            if (footerChildren.length === 0) {
                return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
            }

            return ReactiveElement.part("section", {
                attrs: {
                    ...attrsDefault,
                    "id": `component-window-window-footer-${this._COMPONENT_RANDOM_ID}`,
                },
                className: ["border-top", "d-flex", "align-items-center", "justify-content-end", "gap-2", "px-3"],
                styles: {
                    height: "55px",
                },
                children: footerChildren,
            });
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    /* ---------------------------------------------
        FUNCTIONs
    --------------------------------------------- */
    private fn_onGetStructureElement(): HTMLElement | null {
        return document.querySelector(`#component-window-structure-${this._COMPONENT_RANDOM_ID}`);
    }

    private fn_onGetWindowElement(): HTMLElement | null {
        return document.querySelector(`#component-window-window-${this._COMPONENT_RANDOM_ID}`);
    }

    private fn_setUnvisableWindow(): void {
        const el = this.fn_onGetStructureElement();
        if (el) el.classList.add("d-none");
    }

    private fn_onRemoveClass(): void {
        const elWindow = this.fn_onGetWindowElement();
        if (!elWindow) return;

        elWindow.classList.remove(`window-full-size-${this._COMPONENT_RANDOM_ID}`);
        elWindow.classList.remove(`window-real-size-${this._COMPONENT_RANDOM_ID}`);
        elWindow.classList.remove(`window-visable-animation-${this._COMPONENT_RANDOM_ID}`);
        elWindow.classList.remove(`window-unvisable-animation-${this._COMPONENT_RANDOM_ID}`);
    }


    private fn_resetWindowStyles(): void {
        const elWindow = this.fn_onGetWindowElement();
        if (!elWindow) return;

        const prop_width = this.get(ComponentWindowConfigs.keys.prop_windowWidth.name);
        const prop_height = this.get(ComponentWindowConfigs.keys.prop_windowHeight.name);
        const width = (prop_width instanceof Observable ? prop_width.get() : prop_width) || 700;
        const height = (prop_height instanceof Observable ? prop_height.get() : prop_height) || 400;

        elWindow.style.width = `${width}px`;
        elWindow.style.height = `${height}px`;
        elWindow.style.top = "50%";
        elWindow.style.left = "50%";
        elWindow.style.transform = "translate(-50%, -50%)";
    }

    private fn_onClickOpenWindow = (event?: Event): void => {
        this.fn_onRemoveClass();

        const el = this.fn_onGetStructureElement();
        if (el) el.classList.remove("d-none");

        const elWindow = this.fn_onGetWindowElement();
        if (elWindow) elWindow.classList.add(`window-visable-animation-${this._COMPONENT_RANDOM_ID}`);

        const prop_isFullSize = this.get(ComponentWindowConfigs.keys.prop_isFullSize.name);
        const isFullSize = prop_isFullSize instanceof Observable ? prop_isFullSize.get() : prop_isFullSize;

        if (isFullSize) {
            this._IS_FULL_SIZE = false;
            this.fn_onClickResizeWindow(null);
        } else {
            this.fn_resetWindowStyles();
            this._IS_FULL_SIZE = false;
        }

        if (event) {
            this.executeMethod(ComponentWindowConfigs.methods.OPEN.name, event, {});
        }
    };

    private fn_onClickCloseWindow = (event?: Event): void => {
        this.fn_onRemoveClass();

        const elWindow = this.fn_onGetWindowElement();
        if (elWindow) elWindow.classList.add(`window-unvisable-animation-${this._COMPONENT_RANDOM_ID}`);

        const el = this.fn_onGetStructureElement();
        if (el) {
            setTimeout(() => {
                el.classList.add("d-none");
                this.fn_resetWindowStyles();
            }, 150);
        }

        this._IS_FULL_SIZE = false;

        if (event) {
            this.executeMethod(ComponentWindowConfigs.methods.CLOSE.name, event, {});
        }
    };

    private _RESIZE_ANIM_ID: number | null = null;

    private fn_onClickResizeWindow = (event?: Event): void => {
        const elWindow = this.fn_onGetWindowElement();
        if (!elWindow) return;

        if (this._RESIZE_ANIM_ID !== null) {
            cancelAnimationFrame(this._RESIZE_ANIM_ID);
            this._RESIZE_ANIM_ID = null;
        }

        const duration = 300;
        const startTime = performance.now();

        const rect = elWindow.getBoundingClientRect();
        const blurEl = document.querySelector(`#component-window-blur-${this._COMPONENT_RANDOM_ID}`) as HTMLElement | null;
        const blurRect = blurEl ? blurEl.getBoundingClientRect() : { left: 0, top: 0 };

        const startWidth = rect.width;
        const startHeight = rect.height;
        const startTop = rect.top - blurRect.top;
        const startLeft = rect.left - blurRect.left;

        const vw = blurEl ? blurEl.offsetWidth : window.innerWidth;
        const vh = blurEl ? blurEl.offsetHeight : window.innerHeight;

        let targetWidth: number, targetHeight: number, targetTop: number, targetLeft: number;

        if (this._IS_FULL_SIZE) {
            const prop_width = this.get(ComponentWindowConfigs.keys.prop_windowWidth.name);
            const prop_height = this.get(ComponentWindowConfigs.keys.prop_windowHeight.name);
            targetWidth = (prop_width instanceof Observable ? prop_width.get() : prop_width) || 700;
            targetHeight = (prop_height instanceof Observable ? prop_height.get() : prop_height) || 400;
            targetTop = (vh - targetHeight) / 2;
            targetLeft = (vw - targetWidth) / 2;
            this._IS_FULL_SIZE = false;
        } else {
            targetWidth = vw * 0.95;
            targetHeight = vh * 0.95;
            targetTop = vh * 0.025;
            targetLeft = vw * 0.025;
            this._IS_FULL_SIZE = true;
        }

        elWindow.style.transform = "none";

        const easeInOut = (t: number): number => {
            return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        };

        const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOut(progress);

            const currentWidth = startWidth + (targetWidth - startWidth) * eased;
            const currentHeight = startHeight + (targetHeight - startHeight) * eased;
            const currentTop = startTop + (targetTop - startTop) * eased;
            const currentLeft = startLeft + (targetLeft - startLeft) * eased;

            elWindow.style.width = `${currentWidth}px`;
            elWindow.style.height = `${currentHeight}px`;
            elWindow.style.top = `${currentTop}px`;
            elWindow.style.left = `${currentLeft}px`;

            if (progress < 1) {
                this._RESIZE_ANIM_ID = requestAnimationFrame(animate);
            } else {
                this._RESIZE_ANIM_ID = null;
                if (!this._IS_FULL_SIZE) {
                    elWindow.style.transform = "translate(-50%, -50%)";
                    elWindow.style.top = "50%";
                    elWindow.style.left = "50%";
                }
            }
        };

        this._RESIZE_ANIM_ID = requestAnimationFrame(animate);

        if (event) {
            this.executeMethod(ComponentWindowConfigs.methods.RESIZE.name, event, {});
        }
    };

    private fn_onClickMinimizeWindow = (event?: Event): void => {
        if (event) {
            this.executeMethod(ComponentWindowConfigs.methods.MINIMIZE.name, event, {});
        }
    };


    /* ---------------------------------------------
        PUBLIC API
    --------------------------------------------- */
    call_close(event?: Event): void {
        this.fn_onClickCloseWindow(event);
    }

    call_open(event?: Event): void {
        this.fn_onClickOpenWindow(event);
    }

    call_resize(event?: Event): void {
        this.fn_onClickResizeWindow(event);
    }

    call_minimize(event?: Event): void {
        this.fn_onClickMinimizeWindow(event);
    }


    /* ---------------------------------------------
        STATIC METHODS (Dialog)
    --------------------------------------------- */
    static confirm(message: string, onAccept?: (event?: Event) => void, onCancel?: (event?: Event) => void, options?: Partial<ComponentWindowPropsType>): ComponentWindow {
        const opts = {
            title: "Confirm",
            content: message,
            acceptText: "Confirm",
            cancelText: "Cancel",
            showCancel: true,
            showAccept: true,
            closeOnOverlay: true,
            ...options,
        };

        const popup = new ComponentWindow(
            <ComponentWindowPropsType>opts,
            <ComponentWindowMethodsType>{
                fn_onAccept: (event, dataArgs, componentArgs) => {
                    if (typeof onAccept === "function") onAccept(event);
                },
                fn_onCancel: (event, dataArgs, componentArgs) => {
                    if (typeof onCancel === "function") onCancel(event);
                },
            }
        );

        document.body.appendChild(popup.getElement() as HTMLElement);
        popup.call_open();
        return popup;
    }

    static alert(message: string, onClose?: (event?: Event) => void, options?: Partial<ComponentWindowPropsType>): ComponentWindow {
        const opts = {
            title: "Alert",
            content: message,
            showCancel: false,
            acceptText: "OK",
            showAccept: true,
            closeOnOverlay: true,
            ...options,
        };

        const popup = new ComponentWindow(
            <ComponentWindowPropsType>opts,
            <ComponentWindowMethodsType>{
                fn_onAccept: (event, dataArgs, componentArgs) => {
                    if (typeof onClose === "function") onClose(event);
                },
            }
        );

        document.body.appendChild(popup.getElement() as HTMLElement);
        popup.call_open();
        return popup;
    }

}

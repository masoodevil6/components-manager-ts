import {
    ComponentBase,
    defineComponentMethods,
    defineComponentPatterns,
    defineComponentSchema,
    defineComponentTemplate,
    GOG_ExtractName,
    GOG_ExtractNameValue,
    GOG_SetValue,
    GOG_ValueOf,
    ComponentCallBackType,
} from "../../core/ComponentBase";
import {ReactiveElement} from "../../core/ReactiveElement";
import {Observable} from "../../core/Observable";
import {Language} from "../../core/Language";
import {AppConfig} from "../../core/AppConfig";
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
} from "../../core/component/SetupComponent";
import {ToolsComponents} from "./index";
import {
    ComponentWindow,
    ComponentWindowPropsType,
    ComponentWindowMethodsType,
} from "./ComponentWindow";
import {
    ComponentButtonMethodsType,
    ComponentButtonPropsType,
    ComponentButton_Types,
    ComponentButton_ButtonTypes,
} from "./ComponentButton";
import {ToolsIcons} from "../icons";
import {
    Color,
    COLORS_GRAD,
    COLORS_MAIN,
    SIZES,
} from "../../utils/ToolsConsts";


export const ComponentWindowConfirmProps = {
    ...GOG_ComponentBasicProps_Component,
    ...GOG_ComponentBasicProps_Component_Structure,

    prop_icon:                              "prop_icon",
    prop_message:                           "prop_message",
    prop_title:                             "prop_title",
    prop_acceptText:                        "prop_acceptText",
    prop_cancelText:                        "prop_cancelText",
    prop_showCancel:                        "prop_showCancel",
    prop_showAccept:                        "prop_showAccept",
    prop_closeOnOverlay:                    "prop_closeOnOverlay",
    prop_windowWidth:                       "prop_windowWidth",
    prop_windowHeight:                      "prop_windowHeight",
} as const;


const ComponentWindowConfirmConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        ///----------------------
        [ComponentWindowConfirmProps.prop_icon]: {
            name:               ComponentWindowConfirmProps.prop_icon,
            value:              GOG_SetValue<ReactiveElement | string | null>(
                ToolsIcons.icon_warning({size: SIZES.L, primaryColor: Color(COLORS_MAIN.WARNING, COLORS_GRAD.GRADE_1)})
            ),
        },
        [ComponentWindowConfirmProps.prop_message]: {
            name:               ComponentWindowConfirmProps.prop_message,
            value:              GOG_SetValue<string>(""),
        },
        [ComponentWindowConfirmProps.prop_title]: {
            name:               ComponentWindowConfirmProps.prop_title,
            value:              GOG_SetValue<string>("Confirm"),
        },
        [ComponentWindowConfirmProps.prop_acceptText]: {
            name:               ComponentWindowConfirmProps.prop_acceptText,
            value:              GOG_SetValue<string>("Confirm"),
        },
        [ComponentWindowConfirmProps.prop_cancelText]: {
            name:               ComponentWindowConfirmProps.prop_cancelText,
            value:              GOG_SetValue<string>("Cancel"),
        },
        [ComponentWindowConfirmProps.prop_showCancel]: {
            name:               ComponentWindowConfirmProps.prop_showCancel,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentWindowConfirmProps.prop_showAccept]: {
            name:               ComponentWindowConfirmProps.prop_showAccept,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentWindowConfirmProps.prop_closeOnOverlay]: {
            name:               ComponentWindowConfirmProps.prop_closeOnOverlay,
            value:              GOG_SetValue<boolean>(true),
        },
        [ComponentWindowConfirmProps.prop_windowWidth]: {
            name:               ComponentWindowConfirmProps.prop_windowWidth,
            value:              GOG_SetValue<number>(400),
        },
        [ComponentWindowConfirmProps.prop_windowHeight]: {
            name:               ComponentWindowConfirmProps.prop_windowHeight,
            value:              GOG_SetValue<number>(200),
        },
    },
    schemas: {
        ...GOG_ComponentBasicConfigs_Component_parts,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts,
        STRUCTURE: {
            name:               "part_confirm_structure",
        },
    },
    templates: {
        BODY: {
            name:               "body",
        },
    },
    methods: {
        CONFIRM: {
            name:               "fn_onConfirm",
            dataArgs: {},
            componentArgs: {},
        },
        CANCEL: {
            name:               "fn_onCancel",
            dataArgs: {},
            componentArgs: {},
        },
    },
};


export type ComponentWindowConfirmPropsType = {
    classList?: string[];
    styles?: Record<string, string>;
    [ComponentWindowConfirmConfigs.keys.prop_icon.name]?: ReactiveElement | string | null;
    [ComponentWindowConfirmConfigs.keys.prop_message.name]?: string;
    [ComponentWindowConfirmConfigs.keys.prop_title.name]?: string;
    [ComponentWindowConfirmConfigs.keys.prop_acceptText.name]?: string;
    [ComponentWindowConfirmConfigs.keys.prop_cancelText.name]?: string;
    [ComponentWindowConfirmConfigs.keys.prop_showCancel.name]?: boolean;
    [ComponentWindowConfirmConfigs.keys.prop_showAccept.name]?: boolean;
    [ComponentWindowConfirmConfigs.keys.prop_closeOnOverlay.name]?: boolean;
    [ComponentWindowConfirmConfigs.keys.prop_windowWidth.name]?: number;
    [ComponentWindowConfirmConfigs.keys.prop_windowHeight.name]?: number;
};

export type ComponentWindowConfirm_Methods_CONFIRM_ComponentArgs = GOG_ExtractName<typeof ComponentWindowConfirmConfigs.methods.CONFIRM.componentArgs>;
export type ComponentWindowConfirm_Methods_CONFIRM_DataArgs = GOG_ExtractNameValue<typeof ComponentWindowConfirmConfigs.methods.CONFIRM.dataArgs>;
export type ComponentWindowConfirm_Methods_CANCEL_ComponentArgs = GOG_ExtractName<typeof ComponentWindowConfirmConfigs.methods.CANCEL.componentArgs>;
export type ComponentWindowConfirm_Methods_CANCEL_DataArgs = GOG_ExtractNameValue<typeof ComponentWindowConfirmConfigs.methods.CANCEL.dataArgs>;

export type ComponentWindowConfirmMethodsType = {
    [ComponentWindowConfirmConfigs.methods.CONFIRM.name]?: ComponentCallBackType<ComponentWindowConfirm_Methods_CONFIRM_ComponentArgs, ComponentWindowConfirm_Methods_CONFIRM_DataArgs>;
    [ComponentWindowConfirmConfigs.methods.CANCEL.name]?: ComponentCallBackType<ComponentWindowConfirm_Methods_CANCEL_ComponentArgs, ComponentWindowConfirm_Methods_CANCEL_DataArgs>;
};


class ComponentWindowConfirmBase extends ComponentBase {

    /* ---------------------------------------------
        PROPERTIES
    --------------------------------------------- */
    _COMPONENT_PROPS = Object.values(ComponentWindowConfirmProps);

    _COMPONENT_PATTERN = defineComponentPatterns({
        ...GOG_ComponentBasicConfigs_Component_Pattern(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this),
        [ComponentWindowConfirmConfigs.keys.prop_icon.name]: {
            prop:               ComponentWindowConfirmConfigs.keys.prop_icon.name,
            default:            ComponentWindowConfirmConfigs.keys.prop_icon.value,
            title:              Language.translate("components.windowConfirm.props.prop_icon.title"),
            description:        Language.translate("components.windowConfirm.props.prop_icon.description"),
        },
        [ComponentWindowConfirmConfigs.keys.prop_message.name]: {
            prop:               ComponentWindowConfirmConfigs.keys.prop_message.name,
            default:            ComponentWindowConfirmConfigs.keys.prop_message.value,
            title:              Language.translate("components.windowConfirm.props.prop_message.title"),
            description:        Language.translate("components.windowConfirm.props.prop_message.description"),
        },
        [ComponentWindowConfirmConfigs.keys.prop_title.name]: {
            prop:               ComponentWindowConfirmConfigs.keys.prop_title.name,
            default:            ComponentWindowConfirmConfigs.keys.prop_title.value,
            title:              Language.translate("components.windowConfirm.props.prop_title.title"),
            description:        Language.translate("components.windowConfirm.props.prop_title.description"),
        },
        [ComponentWindowConfirmConfigs.keys.prop_acceptText.name]: {
            prop:               ComponentWindowConfirmConfigs.keys.prop_acceptText.name,
            default:            ComponentWindowConfirmConfigs.keys.prop_acceptText.value,
            title:              Language.translate("components.windowConfirm.props.prop_acceptText.title"),
            description:        Language.translate("components.windowConfirm.props.prop_acceptText.description"),
        },
        [ComponentWindowConfirmConfigs.keys.prop_cancelText.name]: {
            prop:               ComponentWindowConfirmConfigs.keys.prop_cancelText.name,
            default:            ComponentWindowConfirmConfigs.keys.prop_cancelText.value,
            title:              Language.translate("components.windowConfirm.props.prop_cancelText.title"),
            description:        Language.translate("components.windowConfirm.props.prop_cancelText.description"),
        },
        [ComponentWindowConfirmConfigs.keys.prop_showCancel.name]: {
            prop:               ComponentWindowConfirmConfigs.keys.prop_showCancel.name,
            default:            ComponentWindowConfirmConfigs.keys.prop_showCancel.value,
            title:              Language.translate("components.windowConfirm.props.prop_showCancel.title"),
            description:        Language.translate("components.windowConfirm.props.prop_showCancel.description"),
        },
        [ComponentWindowConfirmConfigs.keys.prop_showAccept.name]: {
            prop:               ComponentWindowConfirmConfigs.keys.prop_showAccept.name,
            default:            ComponentWindowConfirmConfigs.keys.prop_showAccept.value,
            title:              Language.translate("components.windowConfirm.props.prop_showAccept.title"),
            description:        Language.translate("components.windowConfirm.props.prop_showAccept.description"),
        },
        [ComponentWindowConfirmConfigs.keys.prop_closeOnOverlay.name]: {
            prop:               ComponentWindowConfirmConfigs.keys.prop_closeOnOverlay.name,
            default:            ComponentWindowConfirmConfigs.keys.prop_closeOnOverlay.value,
            title:              Language.translate("components.windowConfirm.props.prop_closeOnOverlay.title"),
            description:        Language.translate("components.windowConfirm.props.prop_closeOnOverlay.description"),
        },
        [ComponentWindowConfirmConfigs.keys.prop_windowWidth.name]: {
            prop:               ComponentWindowConfirmConfigs.keys.prop_windowWidth.name,
            default:            ComponentWindowConfirmConfigs.keys.prop_windowWidth.value,
            title:              Language.translate("components.windowConfirm.props.prop_windowWidth.title"),
            description:        Language.translate("components.windowConfirm.props.prop_windowWidth.description"),
        },
        [ComponentWindowConfirmConfigs.keys.prop_windowHeight.name]: {
            prop:               ComponentWindowConfirmConfigs.keys.prop_windowHeight.name,
            default:            ComponentWindowConfirmConfigs.keys.prop_windowHeight.value,
            title:              Language.translate("components.windowConfirm.props.prop_windowHeight.title"),
            description:        Language.translate("components.windowConfirm.props.prop_windowHeight.description"),
        },
    });

    _COMPONENT_SCHEMA = defineComponentSchema({
        ...GOG_ComponentBasicConfigs_Component_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this),
        STRUCTURE: {
            part:               ComponentWindowConfirmConfigs.schemas.STRUCTURE.name,
            title:              Language.translate("components.windowConfirm.schema.structure.title"),
            description:        Language.translate("components.windowConfirm.schema.structure.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentWindowConfirmConfigs.keys.prop_icon.name],
                this._COMPONENT_PATTERN[ComponentWindowConfirmConfigs.keys.prop_message.name],
                this._COMPONENT_PATTERN[ComponentWindowConfirmConfigs.keys.prop_title.name],
                this._COMPONENT_PATTERN[ComponentWindowConfirmConfigs.keys.prop_acceptText.name],
                this._COMPONENT_PATTERN[ComponentWindowConfirmConfigs.keys.prop_cancelText.name],
                this._COMPONENT_PATTERN[ComponentWindowConfirmConfigs.keys.prop_showCancel.name],
                this._COMPONENT_PATTERN[ComponentWindowConfirmConfigs.keys.prop_showAccept.name],
                this._COMPONENT_PATTERN[ComponentWindowConfirmConfigs.keys.prop_closeOnOverlay.name],
                this._COMPONENT_PATTERN[ComponentWindowConfirmConfigs.keys.prop_windowWidth.name],
                this._COMPONENT_PATTERN[ComponentWindowConfirmConfigs.keys.prop_windowHeight.name],
            ]
        },
    });

    _COMPONENT_TEMPLATE = defineComponentTemplate({
        BODY: {
            name:               ComponentWindowConfirmConfigs.templates.BODY.name,
        },
    });

    _COMPONENT_METHODS = defineComponentMethods<ComponentWindowConfirmMethodsType, ComponentWindowConfirmPropsType>({
        [ComponentWindowConfirmConfigs.methods.CONFIRM.name]: {
            title:              Language.translate("components.windowConfirm.methods.fn_onConfirm.title"),
            description:        Language.translate("components.windowConfirm.methods.fn_onConfirm.description"),
            args: {}
        },
        [ComponentWindowConfirmConfigs.methods.CANCEL.name]: {
            title:              Language.translate("components.windowConfirm.methods.fn_onCancel.title"),
            description:        Language.translate("components.windowConfirm.methods.fn_onCancel.description"),
            args: {}
        },
    });
}


export class ComponentWindowConfirm extends ComponentWindowConfirmBase {

    private _WINDOW: ComponentWindow | null = null;

    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentWindowConfirmPropsType,
        methods?: ComponentWindowConfirmMethodsType,
        events = null
    ) {
        super("window-confirm", null);
        super.renderComponent(config, methods, events);
    }


    /* ---------------------------------------------
        TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentWindowConfirmConfigs.schemas.STRUCTURE.name);
    }

    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentWindowConfirmConfigs.schemas.STRUCTURE.name:
                return this.template_render_structure(attrsDefault, data, extra);
        }
    }


    private template_render_structure(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_icon = data[ComponentWindowConfirmConfigs.keys.prop_icon.name];
            const prop_message = data[ComponentWindowConfirmConfigs.keys.prop_message.name];
            const prop_title = data[ComponentWindowConfirmConfigs.keys.prop_title.name];
            const prop_acceptText = data[ComponentWindowConfirmConfigs.keys.prop_acceptText.name];
            const prop_cancelText = data[ComponentWindowConfirmConfigs.keys.prop_cancelText.name];
            const prop_showCancel = data[ComponentWindowConfirmConfigs.keys.prop_showCancel.name];
            const prop_showAccept = data[ComponentWindowConfirmConfigs.keys.prop_showAccept.name];
            const prop_closeOnOverlay = data[ComponentWindowConfirmConfigs.keys.prop_closeOnOverlay.name];
            const prop_windowWidth = data[ComponentWindowConfirmConfigs.keys.prop_windowWidth.name];
            const prop_windowHeight = data[ComponentWindowConfirmConfigs.keys.prop_windowHeight.name];

            const iconValue = prop_icon instanceof Observable ? prop_icon.get() : prop_icon;
            const messageValue = prop_message instanceof Observable ? prop_message.get() : prop_message;
            const titleValue = prop_title instanceof Observable ? prop_title.get() : prop_title;
            const acceptTextValue = prop_acceptText instanceof Observable ? prop_acceptText.get() : prop_acceptText;
            const cancelTextValue = prop_cancelText instanceof Observable ? prop_cancelText.get() : prop_cancelText;
            const showCancelValue = prop_showCancel instanceof Observable ? prop_showCancel.get() : prop_showCancel;
            const showAcceptValue = prop_showAccept instanceof Observable ? prop_showAccept.get() : prop_showAccept;
            const closeOnOverlayValue = prop_closeOnOverlay instanceof Observable ? prop_closeOnOverlay.get() : prop_closeOnOverlay;
            const widthValue = prop_windowWidth instanceof Observable ? prop_windowWidth.get() : prop_windowWidth;
            const heightValue = prop_windowHeight instanceof Observable ? prop_windowHeight.get() : prop_windowHeight;

            const directionRtl = AppConfig.get("directionRtl");

            const defaultTitle = titleValue || Language.translate("components.windowConfirm.default.title");
            const defaultAcceptText = acceptTextValue || Language.translate("components.windowConfirm.default.accept");
            const defaultCancelText = cancelTextValue || Language.translate("components.windowConfirm.default.cancel");

            const bodyChildren: (ReactiveElement | string)[] = [];

            if (iconValue != null) {
                bodyChildren.push(
                    ReactiveElement.part("section", {
                        attrs: {},
                        className: ["d-flex", "align-items-center", "justify-content-center", "flex-shrink-0"],
                        styles: {
                            width: "64px",
                            height: "64px",
                        },
                        children: [
                            ReactiveElement.part("section", {
                                attrs: {},
                                className: ["d-flex", "align-items-center", "justify-content-center"],
                                styles: {
                                    transform: "scale(2.5)",
                                    transformOrigin: "center",
                                },
                                children: [iconValue],
                            })
                        ],
                    })
                );
            }

            bodyChildren.push(
                ReactiveElement.part("section", {
                    attrs: {},
                    className: ["d-flex", "align-items-center", "flex-grow-1"],
                    styles: {
                        fontSize: "14px",
                    },
                    children: [messageValue ?? ""],
                })
            );

            const bodyElement = ReactiveElement.part("section", {
                attrs: {},
                className: ["d-flex", "align-items-center", "gap-3", "p-3"],
                styles: {},
                children: bodyChildren,
            });

            this._WINDOW = new ToolsComponents.ComponentWindow(
                <ComponentWindowPropsType>{
                    classList: [],
                    styles: {},
                    prop_title: defaultTitle,
                    prop_body: bodyElement,
                    prop_acceptText: defaultAcceptText,
                    prop_cancelText: defaultCancelText,
                    prop_showCancel: showCancelValue,
                    prop_showAccept: showAcceptValue,
                    prop_closeOnOverlay: closeOnOverlayValue,
                    prop_showBtnResize: false,
                    prop_windowWidth: widthValue ?? 400,
                    prop_windowHeight: heightValue ?? 200,
                },
                <ComponentWindowMethodsType>{
                    fn_onAccept: (event, dataArgs, componentArgs) => {
                        this.executeMethod(ComponentWindowConfirmConfigs.methods.CONFIRM.name, event, {});
                    },
                    fn_onCancel: (event, dataArgs, componentArgs) => {
                        this.executeMethod(ComponentWindowConfirmConfigs.methods.CANCEL.name, event, {});
                    },
                }
            );

            return this._WINDOW.getReactiveElement();
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    /* ---------------------------------------------
        PUBLIC API
    --------------------------------------------- */
    call_open(event?: Event): void {
        if (this._WINDOW) this._WINDOW.call_open(event);
    }

    call_close(event?: Event): void {
        if (this._WINDOW) this._WINDOW.call_close(event);
    }


    /* ---------------------------------------------
        STATIC METHODS
    --------------------------------------------- */
    static confirm(
        message: string,
        onConfirm?: (event?: Event) => void,
        onCancel?: (event?: Event) => void,
        options?: Partial<ComponentWindowConfirmPropsType>
    ): ComponentWindowConfirm {
        const popup = new ComponentWindowConfirm(
            <ComponentWindowConfirmPropsType>{
                classList: [],
                styles: {},
                prop_message: message,
                prop_icon: ToolsIcons.icon_warning({size: SIZES.L, primaryColor: Color(COLORS_MAIN.WARNING, COLORS_GRAD.GRADE_1)}),
                ...options,
            },
            <ComponentWindowConfirmMethodsType>{
                fn_onConfirm: (event, dataArgs, componentArgs) => {
                    if (typeof onConfirm === "function") onConfirm(event);
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


    static renderExampleComponent(): HTMLElement {
        const confirmComp = new ComponentWindowConfirm(
            <ComponentWindowConfirmPropsType>{
                classList: [],
                styles: {},
                prop_title: "Delete Item",
                prop_message: "Are you sure you want to delete this item?",
                prop_acceptText: "Delete",
                prop_cancelText: "Cancel",
                prop_windowWidth: 400,
                prop_windowHeight: 200,
            },
            <ComponentWindowConfirmMethodsType>{
                fn_onConfirm: (event, dataArgs, componentArgs) => {
                    console.log("Confirmed!");
                },
                fn_onCancel: (event, dataArgs, componentArgs) => {
                    console.log("Cancelled!");
                },
            }
        );

        const btnComp = new ToolsComponents.ComponentButton(
            <ComponentButtonPropsType>{
                classList: ["col-md-3", "col-12", "border", "p-2"],
                prop_btnTitle: "Open Confirm",
                prop_type: ComponentButton_Types.SUBMIT,
            },
            <ComponentButtonMethodsType>{
                fn_onClickButton: (event, dataArgs, componentArgs) => {
                    confirmComp.call_open(event);
                }
            }
        );

        document.body.appendChild(confirmComp.getElement() as HTMLElement);
        return btnComp.getElement() as HTMLElement;
    }
}

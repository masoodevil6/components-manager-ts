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
import {
    Color,
    COLORS_GRAD,
    COLORS_MAIN,
    IconsType,
    SIZES,
    Z_INDEXES,
} from "../../utils/ToolsConsts";
import {ToolsCss} from "../../utils/ToolsCss";
import {ToolsIcons} from "../icons";


export const ComponentLoadingProps = {
    ...GOG_ComponentBasicProps_Component,
    ...GOG_ComponentBasicProps_Component_Structure,

    prop_type:                  "prop_type",
    prop_icon:                  "prop_icon",
    prop_backgroundLoading:     "prop_backgroundLoading",
    prop_backgroundShadow:      "prop_backgroundShadow",
    prop_loadingWidth:          "prop_loadingWidth",
    prop_loadingHeight:         "prop_loadingHeight",
    prop_showCancel:            "prop_showCancel",
    prop_cancelDelay:           "prop_cancelDelay",
} as const;


export enum ComponentLoading_Types {
    CIRCLE =    "circle",
}


const ComponentLoadingConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        ///----------------------
        [ComponentLoadingProps.prop_type]: {
            name:               ComponentLoadingProps.prop_type,
            value:              GOG_SetValue<GOG_ValueOf<typeof ComponentLoading_Types>>(ComponentLoading_Types.CIRCLE),
        },
        [ComponentLoadingProps.prop_icon]: {
            name:               ComponentLoadingProps.prop_icon,
            value:              GOG_SetValue<IconsType | null>(ToolsIcons.icon_loading({ size: 80, primaryColor: Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1), secondaryColor: Color(COLORS_MAIN.SECONDARY, COLORS_GRAD.GRADE_1) })),
        },
        [ComponentLoadingProps.prop_backgroundLoading]: {
            name:               ComponentLoadingProps.prop_backgroundLoading,
            value:              GOG_SetValue<string>(Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1)),
        },
        [ComponentLoadingProps.prop_backgroundShadow]: {
            name:               ComponentLoadingProps.prop_backgroundShadow,
            value:              GOG_SetValue<string>(Color(COLORS_MAIN.SHADOW, COLORS_GRAD.GRADE_4)),
        },
        [ComponentLoadingProps.prop_loadingWidth]: {
            name:               ComponentLoadingProps.prop_loadingWidth,
            value:              GOG_SetValue<number>(80),
        },
        [ComponentLoadingProps.prop_loadingHeight]: {
            name:               ComponentLoadingProps.prop_loadingHeight,
            value:              GOG_SetValue<number>(80),
        },
        [ComponentLoadingProps.prop_showCancel]: {
            name:               ComponentLoadingProps.prop_showCancel,
            value:              GOG_SetValue<boolean>(false),
        },
        [ComponentLoadingProps.prop_cancelDelay]: {
            name:               ComponentLoadingProps.prop_cancelDelay,
            value:              GOG_SetValue<number>(2000),
        },
    },
    schemas: {
        ...GOG_ComponentBasicConfigs_Component_parts,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts,
        STRUCTURE: {
            name:               "part_structure",
        },
        LOADING: {
            name:               "part_loading",
        },
        CANCEL_BTN: {
            name:               "part_cancel_btn",
        },
    },
    templates: {},
    methods: {
        CANCEL: {
            name:               "fn_onCancel",
            dataArgs: {},
            componentArgs: {},
        },
    },
} as const;


export type ComponentLoadingPropsType =                     GOG_ExtractNameValue<typeof ComponentLoadingConfigs.keys>
export type ComponentLoadingSchemaType =                    GOG_ExtractName<typeof ComponentLoadingConfigs.schemas>
export type ComponentLoadingTemplatesType =                 GOG_ExtractName<typeof ComponentLoadingConfigs.templates>

export type ComponentLoading_Methods_CANCEL_ComponentArgs =  GOG_ExtractName<typeof ComponentLoadingConfigs.methods.CANCEL.componentArgs>
export type ComponentLoading_Methods_CANCEL_DataArgs =     GOG_ExtractNameValue<typeof ComponentLoadingConfigs.methods.CANCEL.dataArgs>

export type ComponentLoadingMethodsType = {
    [ComponentLoadingConfigs.methods.CANCEL.name]?: ComponentCallBackType<ComponentLoading_Methods_CANCEL_ComponentArgs, ComponentLoading_Methods_CANCEL_DataArgs>,
}


export abstract class ComponentLoadingBase extends ComponentBase<
    ComponentLoadingPropsType,
    ComponentLoadingSchemaType,
    ComponentLoadingTemplatesType,
    ComponentLoadingMethodsType
> {


    /* ---------------------------------------------
        PROPERTYs Pattern
    --------------------------------------------- */
    _COMPONENT_PATTERN = defineComponentPatterns<ComponentLoadingPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Pattern(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this),

        [ComponentLoadingConfigs.keys.prop_type.name]: {
            prop:                                               ComponentLoadingConfigs.keys.prop_type.name,
            default:                                            ComponentLoadingConfigs.keys.prop_type.value,
            title:                                              Language.translate("components.loading.props.prop_type.title"),
            description:                                        Language.translate("components.loading.props.prop_type.description"),
        },
        [ComponentLoadingConfigs.keys.prop_icon.name]: {
            prop:                                               ComponentLoadingConfigs.keys.prop_icon.name,
            default:                                            ComponentLoadingConfigs.keys.prop_icon.value,
            title:                                              Language.translate("components.loading.props.prop_icon.title"),
            description:                                        Language.translate("components.loading.props.prop_icon.description"),
        },
        [ComponentLoadingConfigs.keys.prop_backgroundLoading.name]: {
            prop:                                               ComponentLoadingConfigs.keys.prop_backgroundLoading.name,
            default:                                            ComponentLoadingConfigs.keys.prop_backgroundLoading.value,
            title:                                              Language.translate("components.loading.props.prop_backgroundLoading.title"),
            description:                                        Language.translate("components.loading.props.prop_backgroundLoading.description"),
        },
        [ComponentLoadingConfigs.keys.prop_backgroundShadow.name]: {
            prop:                                               ComponentLoadingConfigs.keys.prop_backgroundShadow.name,
            default:                                            ComponentLoadingConfigs.keys.prop_backgroundShadow.value,
            title:                                              Language.translate("components.loading.props.prop_backgroundShadow.title"),
            description:                                        Language.translate("components.loading.props.prop_backgroundShadow.description"),
        },
        [ComponentLoadingConfigs.keys.prop_loadingWidth.name]: {
            prop:                                               ComponentLoadingConfigs.keys.prop_loadingWidth.name,
            default:                                            ComponentLoadingConfigs.keys.prop_loadingWidth.value,
            title:                                              Language.translate("components.loading.props.prop_loadingWidth.title"),
            description:                                        Language.translate("components.loading.props.prop_loadingWidth.description"),
        },
        [ComponentLoadingConfigs.keys.prop_loadingHeight.name]: {
            prop:                                               ComponentLoadingConfigs.keys.prop_loadingHeight.name,
            default:                                            ComponentLoadingConfigs.keys.prop_loadingHeight.value,
            title:                                              Language.translate("components.loading.props.prop_loadingHeight.title"),
            description:                                        Language.translate("components.loading.props.prop_loadingHeight.description"),
        },
        [ComponentLoadingConfigs.keys.prop_showCancel.name]: {
            prop:                                               ComponentLoadingConfigs.keys.prop_showCancel.name,
            default:                                            ComponentLoadingConfigs.keys.prop_showCancel.value,
            title:                                              Language.translate("components.loading.props.prop_showCancel.title"),
            description:                                        Language.translate("components.loading.props.prop_showCancel.description"),
        },
        [ComponentLoadingConfigs.keys.prop_cancelDelay.name]: {
            prop:                                               ComponentLoadingConfigs.keys.prop_cancelDelay.name,
            default:                                            ComponentLoadingConfigs.keys.prop_cancelDelay.value,
            title:                                              Language.translate("components.loading.props.prop_cancelDelay.title"),
            description:                                        Language.translate("components.loading.props.prop_cancelDelay.description"),
        },
    });


    /* ---------------------------------------------
        PROPERTYs Schema
    --------------------------------------------- */
    _COMPONENT_SCHEMA = defineComponentSchema<ComponentLoadingSchemaType, ComponentLoadingPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this),
        STRUCTURE: {
            part:               ComponentLoadingConfigs.schemas.STRUCTURE.name,
            title:              Language.translate("components.loading.schema.structure.title"),
            description:        Language.translate("components.loading.schema.structure.description"),
            props: []
        },
        LOADING: {
            part:               ComponentLoadingConfigs.schemas.LOADING.name,
            title:              Language.translate("components.loading.schema.loading.title"),
            description:        Language.translate("components.loading.schema.loading.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentLoadingConfigs.keys.prop_type.name],
                this._COMPONENT_PATTERN[ComponentLoadingConfigs.keys.prop_icon.name],
                this._COMPONENT_PATTERN[ComponentLoadingConfigs.keys.prop_backgroundLoading.name],
                this._COMPONENT_PATTERN[ComponentLoadingConfigs.keys.prop_backgroundShadow.name],
                this._COMPONENT_PATTERN[ComponentLoadingConfigs.keys.prop_loadingWidth.name],
                this._COMPONENT_PATTERN[ComponentLoadingConfigs.keys.prop_loadingHeight.name],
                this._COMPONENT_PATTERN[ComponentLoadingConfigs.keys.prop_showCancel.name],
                this._COMPONENT_PATTERN[ComponentLoadingConfigs.keys.prop_cancelDelay.name],
            ]
        },
        CANCEL_BTN: {
            part:               ComponentLoadingConfigs.schemas.CANCEL_BTN.name,
            title:              Language.translate("components.loading.schema.cancelBtn.title"),
            description:        Language.translate("components.loading.schema.cancelBtn.description"),
            props: [
                this._COMPONENT_PATTERN[ComponentLoadingConfigs.keys.prop_showCancel.name],
                this._COMPONENT_PATTERN[ComponentLoadingConfigs.keys.prop_cancelDelay.name],
            ]
        },
    });


    /* ---------------------------------------------
        PROPERTYs Template
    --------------------------------------------- */
    _COMPONENT_TEMPLATES = defineComponentTemplate<ComponentLoadingTemplatesType, ComponentLoadingPropsType>({});


    /* ---------------------------------------------
        PROPERTYs Methods
    --------------------------------------------- */
    _COMPONENT_METHODS = defineComponentMethods<ComponentLoadingMethodsType, ComponentLoadingPropsType>({
        [ComponentLoadingConfigs.methods.CANCEL.name]: {
            title:                                              Language.translate("components.loading.methods.fn_onCancel.title"),
            description:                                        Language.translate("components.loading.methods.fn_onCancel.description"),
            args: {}
        },
    });


    /* ---------------------------------------------
       Example
    --------------------------------------------- */
    static override renderExampleComponent(): HTMLElement {
        const loadingComp = new ComponentLoading(
            <ComponentLoadingPropsType>{
                classList: ["col-md-3", "col-12", "border", "p-2"],
                styles: {
                    "height" : "150px"
                },
                prop_loadingWidth: 60,
                prop_loadingHeight: 60,
                prop_showCancel: true,
                prop_cancelDelay: 2000,
            },
            <ComponentLoadingMethodsType>{
                fn_onCancel: (event) => {
                    console.log("Loading cancelled!");
                },
            }
        );

        return loadingComp.getElement() as HTMLElement;
    }


}


export class ComponentLoading extends ComponentLoadingBase {


    /* ---------------------------------------------
        SETUP
    --------------------------------------------- */
    constructor(
        config: ComponentLoadingPropsType,
        methods?: ComponentLoadingMethodsType,
        events = null
    ) {
        super("loading", null);
        super.renderComponent(config, methods, events);
        this.fn_injectStyles();
    }


    private fn_injectStyles(): void {
        const styleId = `component-loading-styles-${this._COMPONENT_RANDOM_ID}`;
        if (document.getElementById(styleId)) return;

        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
            @keyframes lds-ring-${this._COMPONENT_RANDOM_ID} {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }


    /* ---------------------------------------------
        TEMPLATEs
    --------------------------------------------- */
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentLoadingConfigs.schemas.STRUCTURE.name);
    }

    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentLoadingConfigs.schemas.STRUCTURE.name:
                return this.template_render_structure(attrsDefault, data, extra);
            case ComponentLoadingConfigs.schemas.LOADING.name:
                return this.template_render_loading(attrsDefault, data, extra);
            case ComponentLoadingConfigs.schemas.CANCEL_BTN.name:
                return this.template_render_cancelBtn(attrsDefault, data, extra);
        }
    }


    private template_render_structure(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            return ReactiveElement.part("section", {
                attrs: { ...attrsDefault },
                className: ["position-relative", "w-100", "h-100"],
                children: [
                    this.executeSchemaPart(ComponentLoadingConfigs.schemas.LOADING.name)
                ]
            });
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    private template_render_loading(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_type = data[ComponentLoadingConfigs.keys.prop_type.name];
            const prop_icon = data[ComponentLoadingConfigs.keys.prop_icon.name];
            const prop_loadingWidth = data[ComponentLoadingConfigs.keys.prop_loadingWidth.name];
            const prop_loadingHeight = data[ComponentLoadingConfigs.keys.prop_loadingHeight.name];
            const prop_backgroundLoading = data[ComponentLoadingConfigs.keys.prop_backgroundLoading.name];
            const prop_backgroundShadow = data[ComponentLoadingConfigs.keys.prop_backgroundShadow.name];

            const typeValue = prop_type instanceof Observable ? prop_type.get() : prop_type;
            const iconValue = prop_icon instanceof Observable ? prop_icon.get() : prop_icon;
            const widthValue = (prop_loadingWidth instanceof Observable ? prop_loadingWidth.get() : prop_loadingWidth) ?? 80;
            const heightValue = (prop_loadingHeight instanceof Observable ? prop_loadingHeight.get() : prop_loadingHeight) ?? 80;
            const bgLoadingValue = (prop_backgroundLoading instanceof Observable ? prop_backgroundLoading.get() : prop_backgroundLoading) ?? "";
            const bgShadowValue = (prop_backgroundShadow instanceof Observable ? prop_backgroundShadow.get() : prop_backgroundShadow) ?? "";

            if (typeValue === ComponentLoading_Types.CIRCLE) {
                const ringSize = widthValue;
                const ringHeight = heightValue;
                const animName = `lds-ring-${this._COMPONENT_RANDOM_ID}`;

                const loadingChildren: (ReactiveElement | string)[] = [];

                if (iconValue != null) {
                    loadingChildren.push(
                        ReactiveElement.part("div", {
                            attrs: {},
                            styles: {
                                display: "inline-block",
                                width: `${ringSize}px`,
                                height: `${ringHeight}px`,
                                zIndex: `${ToolsCss.getZIndex(Z_INDEXES.tools_blur)}`,
                            },
                            children: [iconValue as string],
                        })
                    );
                } else {
                    const divSize = widthValue - 16;
                    const divHeight = heightValue - 16;

                    loadingChildren.push(
                        ReactiveElement.part("div", {
                            attrs: {},
                            className: ["position-relative"],
                            styles: {
                                display: "inline-block",
                                width: `${ringSize}px`,
                                height: `${ringHeight}px`,
                                color: bgLoadingValue,
                                zIndex: `${ToolsCss.getZIndex(Z_INDEXES.tools_blur)}`,
                            },
                            children: [
                                ReactiveElement.part("div", {
                                    attrs: {},
                                    styles: {
                                        boxSizing: "border-box",
                                        display: "block",
                                        position: "absolute",
                                        width: `${divSize}px`,
                                        height: `${divHeight}px`,
                                        margin: "8px",
                                        border: "8px solid currentColor",
                                        borderRadius: "50%",
                                        animation: `${animName} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
                                        borderColor: "currentColor transparent transparent transparent",
                                        animationDelay: "-0.45s",
                                    },
                                    children: []
                                }),
                                ReactiveElement.part("div", {
                                    attrs: {},
                                    styles: {
                                        boxSizing: "border-box",
                                        display: "block",
                                        position: "absolute",
                                        width: `${divSize}px`,
                                        height: `${divHeight}px`,
                                        margin: "8px",
                                        border: "8px solid currentColor",
                                        borderRadius: "50%",
                                        animation: `${animName} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
                                        borderColor: "currentColor transparent transparent transparent",
                                        animationDelay: "-0.3s",
                                    },
                                    children: []
                                }),
                                ReactiveElement.part("div", {
                                    attrs: {},
                                    styles: {
                                        boxSizing: "border-box",
                                        display: "block",
                                        position: "absolute",
                                        width: `${divSize}px`,
                                        height: `${divHeight}px`,
                                        margin: "8px",
                                        border: "8px solid currentColor",
                                        borderRadius: "50%",
                                        animation: `${animName} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
                                        borderColor: "currentColor transparent transparent transparent",
                                        animationDelay: "-0.15s",
                                    },
                                    children: []
                                }),
                                ReactiveElement.part("div", {
                                    attrs: {},
                                    styles: {
                                        boxSizing: "border-box",
                                        display: "block",
                                        position: "absolute",
                                        width: `${divSize}px`,
                                        height: `${divHeight}px`,
                                        margin: "8px",
                                        border: "8px solid currentColor",
                                        borderRadius: "50%",
                                        animation: `${animName} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
                                        borderColor: "currentColor transparent transparent transparent",
                                    },
                                    children: []
                                }),
                            ]
                        })
                    );
                }

                return ReactiveElement.part("section", {
                    attrs: { ...attrsDefault },
                    className: ["position-absolute", "w-100", "h-100", "d-flex", "flex-column", "align-items-center", "justify-content-center", "gap-2"],
                    styles: {
                        left: "0",
                        top: "0",
                        zIndex: `${ToolsCss.getZIndex(Z_INDEXES.tools)}`,
                        backgroundColor: bgShadowValue,
                    },
                    children: [
                        ReactiveElement.part("div", {
                            attrs: {},
                            className: ["d-flex", "align-items-center", "justify-content-center"],
                            children: loadingChildren,
                        }),
                        this.executeSchemaPart(ComponentLoadingConfigs.schemas.CANCEL_BTN.name),
                    ]
                });
            }
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    private _cancelTimerId: ReturnType<typeof setTimeout> | null = null;

    private template_render_cancelBtn(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_showCancel = data[ComponentLoadingConfigs.keys.prop_showCancel.name];
            const prop_cancelDelay = data[ComponentLoadingConfigs.keys.prop_cancelDelay.name];

            const showCancelValue = prop_showCancel instanceof Observable ? prop_showCancel.get() : prop_showCancel;
            const cancelDelayValue = prop_cancelDelay instanceof Observable ? prop_cancelDelay.get() : prop_cancelDelay;

            if (!showCancelValue) {
                return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
            }

            const delay = cancelDelayValue ?? 2000;

            const cancelBtnId = `component-loading-cancel-${this._COMPONENT_RANDOM_ID}`;

            if (this._cancelTimerId !== null) {
                clearTimeout(this._cancelTimerId);
            }

            this._cancelTimerId = setTimeout(() => {
                const el = document.getElementById(cancelBtnId);
                if (el) {
                    el.classList.remove("d-none");
                    el.style.opacity = "1";
                }
            }, delay);

            const closeIcon = ToolsIcons.icon_close({ size: SIZES.S, primaryColor: Color(COLORS_MAIN.SHAN, COLORS_GRAD.GRADE_1) });

            return ReactiveElement.part("div", {
                attrs: {
                    ...attrsDefault,
                    "id": cancelBtnId,
                },
                className: ["d-none", "cursor-pointer"],
                styles: {
                    opacity: "0",
                    transition: "opacity 0.3s ease",
                    zIndex: `${ToolsCss.getZIndex(Z_INDEXES.tools_blur)}`,
                    width: "28px",
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    backgroundColor: Color(COLORS_MAIN.SECONDARY, COLORS_GRAD.GRADE_1),
                },
                children: [closeIcon],
                on: {
                    click: (event: Event) => {
                        this.fn_onCancelLoading(event);
                    },
                },
            });
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }


    private fn_onCancelLoading = (event?: Event): void => {
        this.set("prop_show", false);
        if (event) {
            this.executeMethod(ComponentLoadingConfigs.methods.CANCEL.name, event, {});
        }
    };


}

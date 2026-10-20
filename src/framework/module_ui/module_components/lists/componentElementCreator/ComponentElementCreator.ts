import * as CoreComponents from "@/core_components";
import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreEvent from "@/core_event";
import {PartAttrDefault} from "@/core_components";
import * as UiIcons from "@/ui_icons";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import * as ComponentStructure from "../componentStructure";
import * as ComponentBorder from "../componentBorder";
import * as ComponentEffectChange from "../componentEffectChange";
import * as ComponentWindow from "../componentWindow";
import * as ComponentWindowConfirm from "../componentWindowConfirm";
import * as ComponentMenuMore from "../componentMenuMore";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import {ElementCreatorMode, Props} from "./Props";
import type {PropsConfigType as ElementCreatorPropsConfigType, PropsType as ElementCreatorPropsType} from "./Props";
import {Schemas} from "./Schemas";
import type {SchemasType as ElementCreatorSchemasType} from "./Schemas";
import {Definition} from "./Definition";
import {createElementCreatorStep} from "./Step";
import type {MethodsConfigType} from "./Methods";

export class ComponentElementCreator extends ComponentStructure.Component {
    protected override _COMPONENT_DEFINITION = Definition;
    protected override _COMPONENT_PATTERN: any = CoreComponents.DefineProp<StructurePropsType & ElementCreatorPropsType & Record<string, any>>({
        ...ComponentStructureTrait.props,
        ...Props,
    } as any);
    protected override _COMPONENT_SCHEMA: any = CoreComponents.DefineSchema<ElementCreatorSchemasType, StructurePropsType & ElementCreatorPropsType & Record<string, any>>({
        ...ComponentStructureTrait.schemas,
        ...Schemas,
    } as any);
    private readonly _STEP: CoreEvent.TStepInstance<any>;
    private _RENDERED_COMPONENT: {getElement: () => HTMLElement; getReactiveElement?: () => any; dispose?: () => void; getScope?: () => {dispose?: () => void}} | null = null;
    private _ROOT_BORDER: ComponentBorder.Component | null = null;
    private _OPTIONS_BORDER: ComponentBorder.Component | null = null;
    private _OPTIONS_MENU: ComponentMenuMore.Component | null = null;
    private _OPTIONS_EFFECT: ComponentEffectChange.Component | null = null;
    private _SETTINGS_WINDOW: ComponentWindow.Component | null = null;
    private _SETTINGS_WINDOW_ELEMENT: HTMLElement | null = null;
    private _DELETE_CONFIRM: ComponentWindowConfirm.Component | null = null;
    private _DELETE_CONFIRM_ELEMENT: HTMLElement | null = null;
    private _OPTIONS_BORDER_CONTENT: {getElement: () => HTMLElement; dispose: () => void} | null = null;
    private readonly _OPTIONS_CONTENT = new CoreObservable.App<any>(null);
    private readonly _ROOT_HOVER = new CoreObservable.App(false);
    private readonly _ROOT_FOCUS = new CoreObservable.App(false);
    private _DISPOSED = false;

    constructor(
        config?: Partial<StructurePropsType & ElementCreatorPropsConfigType>,
        methods?: MethodsConfigType<ComponentElementCreator>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        const step = createElementCreatorStep();
        super("elementCreator", null, identity as any, step as any);
        this._STEP = step as any;
        this.renderComponent(config as any, methods as any, identity?.events ?? null);
    }

    override getElement(): HTMLElement {
        return super.getElement() as HTMLElement;
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this.disposeRenderedComponent();
        const optionsEffect = this._OPTIONS_EFFECT as any;
        optionsEffect?.dispose?.();
        optionsEffect?.getScope?.().dispose();
        this._OPTIONS_EFFECT = null;
        this._OPTIONS_CONTENT.set(null);
        this._OPTIONS_MENU?.dispose();
        this._OPTIONS_MENU = null;
        this._SETTINGS_WINDOW_ELEMENT?.remove();
        this._SETTINGS_WINDOW_ELEMENT = null;
        this._SETTINGS_WINDOW?.getScope().dispose();
        this._SETTINGS_WINDOW?.dispose();
        this._SETTINGS_WINDOW = null;
        this._DELETE_CONFIRM_ELEMENT?.remove();
        this._DELETE_CONFIRM_ELEMENT = null;
        this._DELETE_CONFIRM?.getScope().dispose();
        this._DELETE_CONFIRM?.dispose();
        this._DELETE_CONFIRM = null;
        const optionsBorder = this._OPTIONS_BORDER as any;
        optionsBorder?.dispose?.();
        optionsBorder?.getScope?.().dispose();
        this._OPTIONS_BORDER = null;
        this._OPTIONS_BORDER_CONTENT = null;
        this.disposeRootBorder();
        this.getScope().dispose();
        CoreEvent.dispose(this._STEP as any);
    }

    override renderContentComponent(
        _attrsDefault: PartAttrDefault,
        _data: Record<string, CoreObservable.App<any>>,
        _extra: any,
    ): CoreReactive.App {
        return this.executeSchemaPart(Schemas.RENDER.part, {});
    }

    override renderManagerComponent(
        partName: string,
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
        extra?: any,
    ): CoreReactive.App {
        if (partName === Schemas.RENDER.part) {
            return this.renderElementCreator(attrsDefault, data);
        }
        return super.renderManagerComponent(partName, attrsDefault, data, extra);
    }

    private renderElementCreator(
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
    ): CoreReactive.App {
        const prop_mode = data?.["prop_mode"] ?? this._COMPONENT_PROPS_BIND.prop_mode;
        const prop_component = data?.["prop_component"] ?? this._COMPONENT_PROPS_BIND.prop_component;
        const prop_componentProperties = data?.["prop_componentProperties"] ?? this._COMPONENT_PROPS_BIND.prop_componentProperties;
        const renderedMode = CoreObservable.App.computed(
            (mode: ElementCreatorMode, componentReference: Function, properties: Record<string, any>) => {
                if (mode === ElementCreatorMode.SETTING) {
                    this.disposeRenderedComponent();
                    this.disposeRootBorder();
                    return this.renderSettingMode();
                }
                const renderedComponent = this.createRenderedComponent(componentReference, properties);
                if (mode === ElementCreatorMode.EDIT) return this.renderEditMode(renderedComponent);
                this.disposeRootBorder();
                return renderedComponent;
            },
            [prop_mode, prop_component, prop_componentProperties],
            this.getScope(),
        );

        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            styles: {width: "100%"},
            children: [renderedMode as any],
        });
    }

    private renderEditMode(renderedComponent: CoreReactive.App | HTMLElement | null): CoreReactive.App {
        this.disposeRootBorder();
        this._OPTIONS_MENU ??= new ComponentMenuMore.Component({
            prop_items: [
                {id: "settings", icon: UiIcons.Src.FileSetting.Definition, action: "CLICK_SETTINGS"},
                {id: "delete", icon: UiIcons.Src.FilesDelete.Definition, action: "CLICK_DELETE"},
            ],
            prop_isFullWidth: false,
            prop_menuBackgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
            prop_menuIconColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        } as any, {
            SELECT_ITEM: (event, dataArgs) => this.handleOptionSelection(event, dataArgs?.ITEM?.action),
        } as any);
        this._OPTIONS_BORDER ??= new ComponentBorder.Component({
            prop_borderType: ComponentBorder.BorderTypes.SOLID,
            prop_borderClass: ["w-100"],
            prop_borderColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_2),
            prop_contentBackgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
            prop_borderStyles: {
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                minHeight: "calc(var(--heightMedium) + var(--paddingMedium) * 2)",
                padding: "var(--paddingSmall) var(--paddingMedium)",
                boxSizing: "border-box",
            },
            prop_content: this._OPTIONS_MENU.getReactiveElement(),
        } as any);
        this._OPTIONS_BORDER_CONTENT ??= {
            getElement: () => this._OPTIONS_BORDER?.getElement() as HTMLElement,
            // EffectChange disposes outgoing content after each transition. Keep this
            // border alive so a later hover can reveal the same reactive controls.
            dispose: () => {},
        };
        this._OPTIONS_EFFECT ??= new ComponentEffectChange.Component({
            prop_content: this._OPTIONS_CONTENT,
            prop_mode: ComponentEffectChange.EffectChangeMode.FADE,
            prop_duration: 180,
        } as any);

        const content = CoreReactive.App.section({
            attrs: {"data-part-name": "part-element-creator"},
            styles: {
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "var(--marginSmall)",
            },
            children: [
                CoreReactive.App.section({
                    attrs: {"data-part-name": "part-element-creator-options"},
                    children: [this._OPTIONS_EFFECT.getReactiveElement() as CoreReactive.App],
                }),
                CoreReactive.App.section({
                    attrs: {"data-part-name": "part-element-creator-render"},
                    styles: {
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--marginSmall)",
                        padding: "var(--paddingMedium)",
                        boxSizing: "border-box",
                    },
                    children: [
                        renderedComponent as any,
                    ],
                }),
            ],
        });

        this._ROOT_BORDER = new ComponentBorder.Component({
            prop_borderType: ComponentBorder.BorderTypes.DASHED,
            prop_borderClass: ["w-100"],
            prop_borderStyles: {display: "block", width: "100%", boxSizing: "border-box"},
            prop_content: content,
        } as any);

        return CoreReactive.App.section({
            attrs: {"data-part-name": "part-element-creator-host"},
            styles: {width: "100%"},
            on: {
                mouseenter: () => {
                    this._ROOT_HOVER.set(true);
                    this.updateOptionsVisibility();
                },
                mouseleave: () => {
                    this._ROOT_HOVER.set(false);
                    this.updateOptionsVisibility();
                },
                focusin: () => {
                    this._ROOT_FOCUS.set(true);
                    this.updateOptionsVisibility();
                },
                focusout: (event: FocusEvent) => {
                    const host = event.currentTarget as HTMLElement;
                    if (event.relatedTarget instanceof Node && host.contains(event.relatedTarget)) return;
                    this._ROOT_FOCUS.set(false);
                    this.updateOptionsVisibility();
                },
            },
            children: [this._ROOT_BORDER.getReactiveElement() as CoreReactive.App],
        });
    }

    private disposeRootBorder(): void {
        const rootBorder = this._ROOT_BORDER as any;
        rootBorder?.dispose?.();
        rootBorder?.getScope?.().dispose();
        this._ROOT_BORDER = null;
    }

    private renderSettingMode(): CoreReactive.App {
        return CoreReactive.App.section({
            attrs: {"data-part-name": "part-element-creator-setting"},
            styles: {display: "contents"},
        });
    }

    private ensureSettingsWindow(): ComponentWindow.Component {
        if (this._SETTINGS_WINDOW) return this._SETTINGS_WINDOW;

        const body = CoreReactive.App.section({
            className: ["p-3"],
            children: ["Settings for the rendered component."],
        });
        this._SETTINGS_WINDOW = new ComponentWindow.Component({
            prop_title: "Component settings",
            prop_body: body,
            prop_windowWidth: 480,
            prop_windowHeight: 240,
            prop_showBtnResize: false,
            prop_showAccept: true,
            prop_showCancel: true,
            prop_isVisible: true,
        } as any);
        this._SETTINGS_WINDOW_ELEMENT = this._SETTINGS_WINDOW.getElement() as HTMLElement;
        return this._SETTINGS_WINDOW;
    }

    private createRenderedComponent(componentReference: Function, properties: Record<string, any>): CoreReactive.App | HTMLElement | null {
        this.disposeRenderedComponent();
        if (typeof componentReference !== "function") return null;

        const reference = componentReference as any;
        const isClass = typeof reference.prototype?.getElement === "function";
        const instance = (isClass
            ? new reference(properties ?? {}, {} as any)
            : reference(properties ?? {}, {} as any)) as NonNullable<typeof this._RENDERED_COMPONENT>;
        this._RENDERED_COMPONENT = instance;
        return (instance?.getReactiveElement?.() ?? instance?.getElement?.() ?? null) as CoreReactive.App | HTMLElement | null;
    }

    private disposeRenderedComponent(): void {
        const component = this._RENDERED_COMPONENT;
        this._RENDERED_COMPONENT = null;
        if (!component) return;
        if (component.dispose) component.dispose();
        else component.getScope?.()?.dispose?.();
    }

    private updateOptionsVisibility(): void {
        const isVisible = this._ROOT_HOVER.get() || this._ROOT_FOCUS.get();
        const content = isVisible ? this._OPTIONS_BORDER_CONTENT : null;
        if (this._OPTIONS_CONTENT.get() !== content) this._OPTIONS_CONTENT.set(content);
    }

    private handleOptionSelection(event: Event, action?: string): void {
        if (action === "CLICK_SETTINGS") {
            this.call_openSettings(event);
        } else if (action === "CLICK_DELETE") {
            this.openDeleteConfirm();
        }
    }

    private openSettingsWindow(): void {
        const settingsWindow = this.ensureSettingsWindow();
        const settingsElement = settingsWindow.getElement() as HTMLElement;
        if (!settingsElement.isConnected) document.body.appendChild(settingsElement);
        settingsWindow.call_open();
    }

    call_openSettings(event?: Event): void {
        this.openSettingsWindow();
        this.executeMethod("CLICK_SETTINGS", event);
    }

    private openDeleteConfirm(): void {
        if (!this._DELETE_CONFIRM) {
            this._DELETE_CONFIRM = new ComponentWindowConfirm.Component({
                prop_title: "Confirm deletion",
                prop_message: "Are you sure you want to delete this component?",
                prop_acceptText: "Delete",
                prop_cancelText: "Cancel",
            } as any, {
                CONFIRM: (confirmEvent) => this.executeMethod("CLICK_DELETE", confirmEvent),
            } as any);
            this._DELETE_CONFIRM_ELEMENT = this._DELETE_CONFIRM.getElement() as HTMLElement;
            document.body.appendChild(this._DELETE_CONFIRM_ELEMENT);
        }

        this._DELETE_CONFIRM.call_open();
    }
}

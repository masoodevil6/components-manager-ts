import * as CoreComponents from "@/core_components";
import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreEvent from "@/core_event";
import * as Core from "@/core";
import * as CoreConfig from "@/core_configs";
import * as CoreLanguage from "@/core_languages";
import {PartAttrDefault} from "@/core_components";
import * as UiIcons from "@/ui_icons";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import * as ComponentStructure from "../componentStructure/runtime";
import * as ComponentBorder from "../componentBorder/runtime";
import * as ComponentEffectChange from "../componentEffectChange/runtime";
import * as ComponentWindow from "../componentWindow/runtime";
import * as ComponentWindowConfirm from "../componentWindowConfirm/runtime";
import * as ComponentMenuMore from "../componentMenuMore/runtime";
import * as ComponentCollapse from "../componentCollapse/runtime";
import * as ComponentButton from "../componentButton/runtime";
import * as ComponentInput from "../componentInput/runtime";
import * as ComponentInputCheckBox from "../componentInputCheckBox/runtime";
import * as ComponentInputColor from "../componentInputColor/runtime";
import * as ComponentInputSelectOption from "../componentInputSelectOption/runtime";
import * as ComponentCodeMirror from "../componentCodeMirror/runtime";
import * as ComponentTabs from "../componentTabs/runtime";
import * as ComponentStyles from "../componentStyles/runtime";
import * as ComponentPageSetting from "../componentPageSetting/runtime";
import * as UtilOptionsStd from "@/util_options_std";
import {LayoutColumn} from "../componentLayout/Props";
import {ButtonSemantic, ButtonVariants} from "../componentButton/Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Keys} from "../../../module_categories/languages";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import {ElementCreatorMode, Props} from "./Props";
import type {PropsConfigType as ElementCreatorPropsConfigType, PropsType as ElementCreatorPropsType} from "./Props";
import {Schemas} from "./Schemas";
import type {SchemasType as ElementCreatorSchemasType} from "./Schemas";
import {Definition} from "./Definition";
import {createElementCreatorStep} from "./Step";
import {Methods, type MethodsConfigType, type MethodsType} from "./Methods";

const CSS_STYLE_PROPERTIES = [
    UtilOptionsStd.Group.Margin.Direction.TOP,
    UtilOptionsStd.Group.Margin.Direction.RIGHT,
    UtilOptionsStd.Group.Margin.Direction.BOTTOM,
    UtilOptionsStd.Group.Margin.Direction.LEFT,
    UtilOptionsStd.Group.Padding.Direction.TOP,
    UtilOptionsStd.Group.Padding.Direction.RIGHT,
    UtilOptionsStd.Group.Padding.Direction.BOTTOM,
    UtilOptionsStd.Group.Padding.Direction.LEFT,
    UtilOptionsStd.Group.BorderRadius.Corner.TOP_LEFT,
    UtilOptionsStd.Group.BorderRadius.Corner.TOP_RIGHT,
    UtilOptionsStd.Group.BorderRadius.Corner.BOTTOM_RIGHT,
    UtilOptionsStd.Group.BorderRadius.Corner.BOTTOM_LEFT,
    UtilOptionsStd.Group.ElementSize.Height.Key,
    UtilOptionsStd.Group.ElementSize.Width.Key,
    ...UtilOptionsStd.Group.Text.Properties,
    UtilOptionsStd.Group.Colors.BackgroundColor.Key,
    UtilOptionsStd.Group.Colors.TextColor.Key,
    ...Object.values(UtilOptionsStd.Group.Border.Direction),
    ...Object.values(UtilOptionsStd.Group.Border.Color),
    ...Object.values(UtilOptionsStd.Group.Border.Style.Direction),
];
const MARGIN_STYLE_PROPERTIES = new Set<string>(UtilOptionsStd.Group.Margin.Properties);

export class ComponentElementCreator extends ComponentStructure.Component<
    StructurePropsType & ElementCreatorPropsType & Record<string, any>,
    ElementCreatorSchemasType,
    MethodsType,
    CoreComponents.ComponentIdentity,
    ReturnType<typeof createElementCreatorStep>
> {
    protected override _COMPONENT_DEFINITION = Definition;
    protected override _COMPONENT_PATTERN: any = CoreComponents.DefineProp<StructurePropsType & ElementCreatorPropsType & Record<string, any>>({
        ...ComponentStructureTrait.props,
        ...Props,
    } as any);
    protected override _COMPONENT_SCHEMA: any = CoreComponents.DefineSchema<ElementCreatorSchemasType, StructurePropsType & ElementCreatorPropsType & Record<string, any>>({
        ...ComponentStructureTrait.schemas,
        ...Schemas,
    } as any);
    protected override _COMPONENT_METHODS = CoreComponents.DefineMethod<MethodsType, StructurePropsType & ElementCreatorPropsType & Record<string, any>>({
        ...Methods,
    } as any);
    private readonly _STEP: ReturnType<typeof createElementCreatorStep>;
    private _RENDERED_COMPONENT: {getElement: () => HTMLElement; getReactiveElement?: () => any; dispose?: () => void; getScope?: () => {dispose?: () => void}} | null = null;
    private _ROOT_BORDER: ComponentBorder.Component | null = null;
    private _OPTIONS_BORDER: ComponentBorder.Component | null = null;
    private _OPTIONS_MENU: ComponentMenuMore.Component | null = null;
    private _OPTIONS_EFFECT: ComponentEffectChange.Component | null = null;
    private _SETTINGS_WINDOW: ComponentWindow.Component | null = null;
    private _SETTINGS_WINDOW_ELEMENT: HTMLElement | null = null;
    private _SETTINGS_PAGE_SETTING: ComponentPageSetting.Component | null = null;
    private _SETTINGS_PAGE_SETTING_ELEMENT: HTMLElement | null = null;
    private _SETTINGS_WORKFLOW_SOURCE: CoreEvent.TStepRef | null = null;
    private _SETTINGS_PAGE_SETTING_ENDPOINT: CoreEvent.TStepRef | null = null;
    private _CSS_WORKFLOW_SOURCE: CoreEvent.TStepRef | null = null;
    private _CSS_PAGE_SETTING_ENDPOINT: CoreEvent.TStepRef | null = null;
    private readonly _SETTINGS_ACCEPT_DISABLED = new CoreObservable.App(true);
    private _SETTINGS_WINDOW_OPEN = false;
    private _SETTINGS_CLOSE_TIMER: number | null = null;
    private _SETTINGS_MODE: ElementCreatorMode.SETTING_CREATE | ElementCreatorMode.SETTING_EDIT | null = null;
    private _SETTINGS_COMPONENT_REFERENCE: Function | null = null;
    private _SETTINGS_SELECTED_COMPONENT: Function | null = null;
    private _SETTINGS_SELECTED_CATEGORY = "__all__";
    private _SETTINGS_SELECTED_COMPONENT_KEY: string | null = null;
    private _SETTINGS_PROPERTIES_SOURCE: Record<string, any> | null = null;
    private _SETTINGS_CHILDREN: Array<{dispose?: () => void; getScope?: () => {dispose?: () => void}}> = [];
    private _SETTINGS_COMPONENT_CHILDREN: Array<{dispose?: () => void; getScope?: () => {dispose?: () => void}}> = [];
    private _SETTINGS_PROP_CHILDREN: Array<{dispose?: () => void; getScope?: () => {dispose?: () => void}}> = [];
    private _SETTINGS_CATEGORIES: Array<{key: string; name: string}> = [];
    private _SETTINGS_REGISTERED_COMPONENTS: Array<{key: string; categoryKey: string; name: string; component: Function; componentId: string}> = [];
    private _SETTINGS_REGISTRY_GENERATION = 0;
    private _SETTINGS_COMPONENT_TAB_BODY: CoreReactive.App | null = null;
    private _SETTINGS_TABS: ComponentTabs.Component | null = null;
    private _SETTINGS_CATEGORY_SELECT: ComponentInputSelectOption.Component | null = null;
    private _SETTINGS_COMPONENT_SELECT: ComponentInputSelectOption.Component | null = null;
    private _SETTINGS_DRAFT: Record<string, any> = {};
    private _DELETE_CONFIRM: ComponentWindowConfirm.Component | null = null;
    private _DELETE_CONFIRM_ELEMENT: HTMLElement | null = null;
    private _CSS_PAGE_SETTING: ComponentPageSetting.Component | null = null;
    private _CSS_PAGE_SETTING_ELEMENT: HTMLElement | null = null;
    private _CSS_STYLES_COMPONENT: ComponentStyles.Component | null = null;
    private _CSS_STYLE_SOURCE: Record<string, any> | null = null;
    private _CSS_STYLE_COMPONENT_REFERENCE: Function | null = null;
    private _CSS_STYLE_VALUES_UNSUBSCRIBE: (() => void) | null = null;
    private readonly _CSS_STYLE_VALUES = new CoreObservable.App<Record<string, any>>({});
    private _OPTIONS_BORDER_CONTENT: {getElement: () => HTMLElement; dispose: () => void} | null = null;
    private _OPTIONS_MENU_ITEMS: CoreObservable.App<ComponentMenuMore.MenuMoreEntry[]> | null = null;
    private readonly _OPTIONS_CONTENT = new CoreObservable.App<any>(null);
    private readonly _ROOT_HOVER = new CoreObservable.App(false);
    private readonly _ROOT_FOCUS = new CoreObservable.App(false);
    private _DOCUMENT_POINTER_MOVE_HANDLER: ((event: PointerEvent | MouseEvent) => void) | null = null;
    private _DOCUMENT_FOCUS_IN_HANDLER: ((event: FocusEvent) => void) | null = null;
    private _DOCUMENT_FOCUS_OUT_HANDLER: ((event: FocusEvent) => void) | null = null;
    private _OPTIONS_HIDE_TIMEOUT: number | null = null;
    private _EDIT_MODE_ACTIVE = false;
    private _DISPOSED = false;

    constructor(
        config?: Partial<StructurePropsType & ElementCreatorPropsConfigType>,
        methods?: MethodsConfigType<ComponentElementCreator>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        const step = createElementCreatorStep();
        super("elementCreator", null, identity as any, step);
        this._STEP = step;
        this.renderComponent(config as any, methods as any, identity?.events ?? null);
        CoreEvent.App.registerEmit(this._STEP.styleChanged, (request: CoreEvent.ClRequest) => {
            const values = request.payload?.values;
            if (!values || typeof values !== "object" || Array.isArray(values)) {
                return {applied: false, values: null};
            }
            if (this.applyCssStylesToComponentProperties(values)) {
                this.executeMethod("STYLE_CHANGE", undefined, {
                    COMPONENT: this._COMPONENT_PROPS_BIND.prop_component.get(),
                    PROPERTIES: this._COMPONENT_PROPS_BIND.prop_componentProperties.get(),
                });
            }
            return {applied: true, values};
        });
    }

    override getElement(): HTMLElement {
        return super.getElement() as HTMLElement;
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this.closeSettingsPageSetting();
        this.closeCssPageSetting();
        this.stopDocumentPointerTracking();
        this.clearOptionsHideTimeout();
        this.disposeRenderedComponent();
        const optionsEffect = this._OPTIONS_EFFECT as any;
        optionsEffect?.dispose?.();
        optionsEffect?.getScope?.().dispose();
        this._OPTIONS_EFFECT = null;
        this._OPTIONS_CONTENT.set(null);
        this._OPTIONS_MENU?.dispose();
        this._OPTIONS_MENU = null;
        this.disposeSettingsWindow();
        this.disposeSettingsPageSetting();
        this._DELETE_CONFIRM_ELEMENT?.remove();
        this._DELETE_CONFIRM_ELEMENT = null;
        this._DELETE_CONFIRM?.getScope().dispose();
        this._DELETE_CONFIRM?.dispose();
        this._DELETE_CONFIRM = null;
        this.disposeCssPageSetting();
        const optionsBorder = this._OPTIONS_BORDER as any;
        optionsBorder?.dispose?.();
        optionsBorder?.getScope?.().dispose();
        this._OPTIONS_BORDER = null;
        this._OPTIONS_BORDER_CONTENT = null;
        this.disposeRootBorder();
        this.getScope().dispose();
        if (CoreEvent.App.getRegistry().some((step) => step.identity === this._STEP.identity)) {
            CoreEvent.dispose(this._STEP);
        }
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
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case Schemas.RENDER.part:
                return this.renderElementCreator(attrsDefault, data);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderElementCreator(
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
    ): CoreReactive.App {
        const prop_mode = data?.["prop_mode"] ?? this._COMPONENT_PROPS_BIND.prop_mode;
        const prop_component = data?.["prop_component"] ?? this._COMPONENT_PROPS_BIND.prop_component;
        const prop_componentProperties = data?.["prop_componentProperties"] ?? this._COMPONENT_PROPS_BIND.prop_componentProperties;
        const renderedMode = CoreObservable.App.computed(
            (mode: ElementCreatorMode, componentReference: Function | null, properties: Record<string, any>) => {
                if (mode === ElementCreatorMode.SETTING_CREATE || mode === ElementCreatorMode.SETTING_EDIT) {
                    this.setEditModeActive(false);
                    this.disposeRenderedComponent();
                    this.disposeRootBorder();
                    return this.renderSettingMode();
                }
                const renderedComponent = this.createRenderedComponent(componentReference, properties);
                if (mode === ElementCreatorMode.EDIT) return this.renderEditMode(renderedComponent);
                this.setEditModeActive(false);
                this.disposeRootBorder();
                return this.renderWithMargin(renderedComponent, "part-element-creator-render-content");
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
        this.setEditModeActive(true);
        this.disposeRootBorder();
        this._OPTIONS_MENU_ITEMS ??= CoreObservable.App.computed(
            (hasSetting: boolean, hasDelete: boolean, hasColumn: boolean, hasChildrenDisplayMode: boolean) => {
                const items: ComponentMenuMore.MenuMoreEntry[] = [];
                if (hasSetting) items.push({id: "settings", icon: UiIcons.Src.FileSetting.Definition, action: "CLICK_SETTINGS"});
                if (hasDelete) items.push({id: "delete", icon: UiIcons.Src.FilesDelete.Definition, action: "CLICK_DELETE"});
                items.push({id: "css", icon: UiIcons.Src.ProgrammingCss, action: "CLICK_CSS"});
                if (hasColumn) items.push({
                    id: "column-options",
                    icon: UiIcons.Src.InputSelectColumn.Definition,
                    children: [
                        {id: "column-null", title: "null", action: "SET_COLUMN_NULL"},
                        ...Object.values(LayoutColumn).map((column) => ({
                            id: `column-${column.toLowerCase()}`,
                            title: column === LayoutColumn.CUSTOM ? "Custom" : column.toLowerCase(),
                            action: column,
                        })),
                    ],
                });
                if (hasChildrenDisplayMode) items.push({
                    id: "children-display-mode",
                    icon: UiIcons.Src.InputSelectOption.Definition,
                    children: [
                        {
                            id: "children-display-editor",
                            title: CoreLanguage.App.translate(Keys.category.components.basic.elementCreator.editor.childrenEditorMode).get(),
                            icon: UiIcons.Src.FilesEdit.Definition,
                            action: "SET_CHILDREN_DISPLAY_EDITOR",
                        },
                        {
                            id: "children-display-rendered",
                            title: CoreLanguage.App.translate(Keys.category.components.basic.elementCreator.editor.childrenRenderedMode).get(),
                            icon: UiIcons.Src.FilesZoom.Definition,
                            action: "SET_CHILDREN_DISPLAY_RENDERED",
                        },
                    ],
                });
                return items;
            },
            [
                this._COMPONENT_PROPS_BIND.prop_hasHeaderSetting,
                this._COMPONENT_PROPS_BIND.prop_hasHeaderDelete,
                this._COMPONENT_PROPS_BIND.prop_hasHeaderColumn,
                this._COMPONENT_PROPS_BIND.prop_hasHeaderChildrenMode,
            ],
            this.getScope(),
        );
        this._OPTIONS_MENU ??= new ComponentMenuMore.Component({
            prop_items: this._OPTIONS_MENU_ITEMS,
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
            },
            children: [
                CoreReactive.App.section({
                    attrs: {"data-part-name": "part-element-creator-options"},
                    styles: {
                        position: "relative",
                        zIndex: String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.SELECTOR_POPUP) + 1),
                    },
                    children: [this._OPTIONS_EFFECT.getReactiveElement() as CoreReactive.App],
                }),
                CoreReactive.App.section({
                    attrs: {"data-part-name": "part-element-creator-render"},
                    styles: {
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        zIndex: String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.basic)),
                        boxSizing: "border-box",
                    },
                    children: [
                        this.renderWithMargin(renderedComponent, "part-element-creator-render-content") as any,
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
                    this.clearOptionsHideTimeout();
                    this._ROOT_HOVER.set(true);
                    this.updateOptionsVisibility();
                },
                mouseleave: (event: MouseEvent) => {
                    if (this._OPTIONS_MENU?.containsTarget(event.relatedTarget)) {
                        this.clearOptionsHideTimeout();
                        return;
                    }
                    this.scheduleOptionsHide();
                },
                focusin: () => {
                    this._ROOT_FOCUS.set(true);
                    this.updateOptionsVisibility();
                },
                focusout: (event: FocusEvent) => {
                    const host = event.currentTarget as HTMLElement;
                    if (event.relatedTarget instanceof Node && (
                        host.contains(event.relatedTarget) || this._OPTIONS_MENU?.containsTarget(event.relatedTarget)
                    )) return;
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

        const optionsEffect = this._OPTIONS_EFFECT as any;
        optionsEffect?.dispose?.();
        optionsEffect?.getScope?.().dispose?.();
        this._OPTIONS_EFFECT = null;

        const optionsBorder = this._OPTIONS_BORDER as any;
        optionsBorder?.dispose?.();
        optionsBorder?.getScope?.().dispose?.();
        this._OPTIONS_BORDER = null;

        this._OPTIONS_MENU?.dispose();
        this._OPTIONS_MENU = null;
        this._OPTIONS_BORDER_CONTENT = null;
    }

    private renderSettingMode(): CoreReactive.App {
        return CoreReactive.App.section({
            attrs: {"data-part-name": "part-element-creator-setting"},
            styles: {display: "contents"},
        });
    }

    private ensureSettingsWindow(
        mode: ElementCreatorMode.SETTING_CREATE | ElementCreatorMode.SETTING_EDIT,
        componentReference: Function | null,
        properties: Record<string, any>,
    ): ComponentWindow.Component {
        if (this._SETTINGS_WINDOW) return this._SETTINGS_WINDOW;

        this._SETTINGS_MODE = mode;
        this._SETTINGS_COMPONENT_REFERENCE = componentReference;
        this._SETTINGS_PROPERTIES_SOURCE = properties;
        const body = this.createSettingsBody(mode, componentReference, properties);
        this._SETTINGS_WINDOW = new ComponentWindow.Component({
            prop_title: "Component settings",
            prop_body: body,
            prop_windowWidth: 560,
            prop_windowHeight: 420,
            prop_showBtnResize: false,
            prop_showAccept: this._SETTINGS_SELECTED_COMPONENT != null,
            prop_showCancel: true,
            prop_isVisible: true,
        } as any, {
            ACCEPT: (event) => this.applySettingsDraft(event),
            CLOSE: () => {
                this._SETTINGS_WINDOW_OPEN = false;
                this._SETTINGS_CLOSE_TIMER = window.setTimeout(() => this.disposeSettingsWindow(), 240);
            },
        } as any);
        this._SETTINGS_WINDOW_ELEMENT = this._SETTINGS_WINDOW.getElement() as HTMLElement;
        return this._SETTINGS_WINDOW;
    }

    private createSettingsBody(
        mode: ElementCreatorMode.SETTING_CREATE | ElementCreatorMode.SETTING_EDIT,
        componentReference: Function | null,
        properties: Record<string, any>,
        pageSetting = false,
    ): CoreReactive.App {
        this.disposeSettingsChildren();
        this._SETTINGS_DRAFT = {...(properties ?? {})};
        this._SETTINGS_SELECTED_COMPONENT = mode === ElementCreatorMode.SETTING_CREATE ? null : componentReference;
        this._SETTINGS_ACCEPT_DISABLED.set(this._SETTINGS_SELECTED_COMPONENT == null);
        this._SETTINGS_CATEGORIES = [];
        this._SETTINGS_REGISTERED_COMPONENTS = [];
        this._SETTINGS_SELECTED_COMPONENT_KEY = this._SETTINGS_SELECTED_COMPONENT ? "__current__" : null;
        this._SETTINGS_SELECTED_CATEGORY = "__all__";
        this._SETTINGS_COMPONENT_TAB_BODY = this.createSettingsComponentTab();

        const propertyBody = this._SETTINGS_SELECTED_COMPONENT
            ? this.createSettingsPropsBody(this._SETTINGS_SELECTED_COMPONENT, this._SETTINGS_DRAFT)
            : null;
        const tabs = this.createSettingsTabs(propertyBody);
        this._SETTINGS_TABS = new ComponentTabs.Component({
            prop_tabSelected: tabs[0]?.id ?? null,
            prop_tabs: tabs,
            prop_bodyStyles: pageSetting
                ? {padding: 0, maxHeight: "none", overflow: "visible"}
                : {padding: 0, maxHeight: "65vh", overflow: "auto"},
            prop_bodyClass: ["w-100"],
            prop_structureStyles: {width: "100%"},
        } as any);
        this._SETTINGS_CHILDREN.push(this._SETTINGS_TABS as any);
        this.loadRegisteredComponents();
        return this._SETTINGS_TABS.getReactiveElement() as CoreReactive.App;
    }

    private createSettingsPageContent(tabs: CoreReactive.App): CoreReactive.App {
        const acceptTitle = CoreLanguage.App.translate(Keys.category.components.basic.elementCreator.editor.addComponent).get();
        const cancelTitle = CoreLanguage.App.translate(Keys.category.components.basic.elementCreator.editor.cancel).get();
        const cancelButton = new ComponentButton.Component({
            prop_btnTitle: cancelTitle,
            prop_btnVariant: ButtonVariants.SECONDARY,
            prop_btnSemantic: ButtonSemantic.CANCEL,
            prop_btnWidth: "100%",
        } as any, {
            CLICK: (event: Event) => {
                this.closeSettingsPageSetting();
                this.executeMethod("SETTINGS_CLOSE", event, {});
            },
        } as any);
        const acceptButton = new ComponentButton.Component({
            prop_btnTitle: acceptTitle,
            prop_btnVariant: ButtonVariants.PRIMARY,
            prop_btnSemantic: ButtonSemantic.SUBMIT,
            prop_btnWidth: "100%",
            prop_btnDisabled: this._SETTINGS_ACCEPT_DISABLED,
        } as any, {
            CLICK: (event: Event) => this.applySettingsDraft(event),
        } as any);
        this._SETTINGS_CHILDREN.push(cancelButton as any, acceptButton as any);

        return CoreReactive.App.section({
            styles: {
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                minHeight: "0",
                boxSizing: "border-box",
            },
            children: [
                CoreReactive.App.div({
                    styles: {flex: "1 1 auto", minHeight: "0", overflowY: "auto"},
                    children: [tabs],
                }),
                CoreReactive.App.div({
                    className: ["border-top", "p-3"],
                    styles: {
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        gap: "var(--marginMedium)",
                        flex: "0 0 auto",
                    },
                    children: [cancelButton.getReactiveElement(), acceptButton.getReactiveElement()],
                }),
            ],
        });
    }

    private createSettingsTabs(propertyBody: CoreReactive.App | null): Array<{id: string; title: string; body: CoreReactive.App}> {
        const isSettingEdit = this._SETTINGS_MODE === ElementCreatorMode.SETTING_EDIT;
        const hasComponentTab = !isSettingEdit || this._COMPONENT_PROPS_BIND.prop_hasTabComponent.get();
        const hasPropsTab = !!propertyBody && (!isSettingEdit || this._COMPONENT_PROPS_BIND.prop_hasTabProps.get());
        const tabs: Array<{id: string; title: string; body: CoreReactive.App}> = [];
        if (hasComponentTab && this._SETTINGS_COMPONENT_TAB_BODY) {
            tabs.push({id: "component", title: "Component", body: this._SETTINGS_COMPONENT_TAB_BODY});
        }
        if (hasPropsTab) tabs.push({id: "props", title: "Props", body: propertyBody!});
        return tabs;
    }

    private createSettingsComponentTab(): CoreReactive.App {
        const allEntries = this.getFilteredComponentEntries("__all__");
        const categoryOptions = [
            {id: "__all__", name: "All"},
            ...this._SETTINGS_CATEGORIES
                .filter((category) => allEntries.some((entry) =>
                    entry.categoryKey === category.key || entry.categoryKey.startsWith(`${category.key}/`),
                ))
                .map((category) => ({id: category.key, name: category.name})),
        ];
        const selectedCategory = this._SETTINGS_SELECTED_CATEGORY;
        const filteredEntries = this.getFilteredComponentEntries(selectedCategory);

        this._SETTINGS_CATEGORY_SELECT = new ComponentInputSelectOption.Component({
            prop_name: "element-creator-component-category",
            prop_labelShow: true,
            prop_labelTitle: "Component category",
            prop_itemSelected: selectedCategory,
            prop_options: categoryOptions,
            prop_structureStyles: {width: "100%"},
        } as any, {
            SELECT_CHANGE: (_event, _dataArgs, componentArgs) => this.handleSettingsCategoryChange(componentArgs?.VALUE),
        } as any);
        this._SETTINGS_COMPONENT_CHILDREN.push(this._SETTINGS_CATEGORY_SELECT as any);

        this._SETTINGS_COMPONENT_SELECT = new ComponentInputSelectOption.Component({
            prop_name: "element-creator-component",
            prop_labelShow: true,
            prop_labelTitle: "Component",
            prop_itemSelected: this._SETTINGS_SELECTED_COMPONENT_KEY,
            prop_options: filteredEntries.map((entry) => ({id: entry.key, name: entry.name})),
            prop_placeholder: "Choose a component",
            prop_structureStyles: {width: "100%"},
        } as any, {
            SELECT_CHANGE: (_event, _dataArgs, componentArgs) => this.handleSettingsComponentChange(componentArgs?.VALUE),
        } as any);
        this._SETTINGS_COMPONENT_CHILDREN.push(this._SETTINGS_COMPONENT_SELECT as any);

        return CoreReactive.App.section({
            className: ["d-flex", "flex-column", "gap-3", "p-3"],
            styles: {width: "100%", boxSizing: "border-box"},
            children: [
                this._SETTINGS_CATEGORY_SELECT.getReactiveElement() as CoreReactive.App,
                this._SETTINGS_COMPONENT_SELECT.getReactiveElement() as CoreReactive.App,
            ],
        });
    }

    private createSettingsPropsBody(componentReference: Function, properties: Record<string, any>): CoreReactive.App {
        this.disposeSettingsPropChildren();

        let componentInstance: any = null;
        let propDefinitions: any[] = [];
        try {
            const reference = componentReference as any;
            const isClass = typeof reference?.prototype?.getElement === "function";
            componentInstance = isClass
                ? new reference(properties ?? {}, {} as any)
                : reference(properties ?? {}, {} as any);
            propDefinitions = Object.values(componentInstance?._COMPONENT_PATTERN ?? {});
        } catch (error) {
            console.error("ComponentElementCreator could not read component properties", error);
        } finally {
            if (componentInstance?.dispose) componentInstance.dispose();
            else componentInstance?.getScope?.()?.dispose?.();
        }

        const groups: Array<{descriptor: any; props: any[]}> = [];
        const groupMap = new Map<any, {descriptor: any; props: any[]}>();
        for (const propDefinition of propDefinitions) {
            const groupDescriptor = propDefinition?.OptionGroup;
            if (!propDefinition?.prop || !groupDescriptor) continue;
            let group = groupMap.get(groupDescriptor);
            if (!group) {
                group = {descriptor: groupDescriptor, props: []};
                groupMap.set(groupDescriptor, group);
                groups.push(group);
            }
            group.props.push(propDefinition);
        }

        const groupElements: any[] = [];
        for (const group of groups) {
            const visibleProps = group.props.filter((prop) => prop.OptionShow === true);
            const editors = visibleProps.map((prop) => this.createSettingsEditor(prop, properties));
            if (editors.length === 0) continue;

            const collapseBody = CoreReactive.App.section({
                styles: {
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1fr)",
                    gap: "var(--marginMedium)",
                    width: "100%",
                },
                children: editors,
            });
            const collapse = new ComponentCollapse.Component({
                prop_collapseTitle: this.resolveSettingsText(group.descriptor?.name, "Properties"),
                prop_collapseBody: collapseBody,
                prop_collapseBodyIsOpen: true,
                prop_collapseBorderClass: ["w-100"],
            } as any);
            this._SETTINGS_PROP_CHILDREN.push(collapse as any);
            groupElements.push(collapse.getReactiveElement());
        }

        return CoreReactive.App.section({
            className: ["d-flex", "flex-column", "gap-3", "p-3"],
            styles: {width: "100%", boxSizing: "border-box"},
            children: groupElements.length > 0 ? groupElements : ["No configurable component properties."],
        });
    }

    private loadRegisteredComponents(): void {
        const generation = ++this._SETTINGS_REGISTRY_GENERATION;
        void import("@/ui_categories").then(({UI}) => {
            if (this._DISPOSED || generation !== this._SETTINGS_REGISTRY_GENERATION || !this._SETTINGS_MODE) return;

            this.readRegisteredComponents(UI as any);
            const matchingEntry = this._SETTINGS_SELECTED_COMPONENT
                ? this.findRegisteredComponent(this._SETTINGS_SELECTED_COMPONENT)
                : null;
            this._SETTINGS_SELECTED_CATEGORY = matchingEntry?.categoryKey ?? "__all__";
            this._SETTINGS_SELECTED_COMPONENT_KEY = this._SETTINGS_SELECTED_COMPONENT
                ? matchingEntry?.key ?? "__current__"
                : null;
            this.refreshSettingsComponentOptions();
            this.refreshSettingsTabs();
        }).catch((error) => {
            if (generation === this._SETTINGS_REGISTRY_GENERATION) {
                console.error("ComponentElementCreator could not load the component registry", error);
            }
        });
    }

    private readRegisteredComponents(uiCategories: Record<string, any>): void {
        this._SETTINGS_CATEGORIES = [];
        this._SETTINGS_REGISTERED_COMPONENTS = [];
        const seenComponentKeys = new Set<string>();
        const visit = (definition: any, parentPath: string[] = []): void => {
            if (!definition || typeof definition !== "object" || !definition.id) return;
            const categoryKey = [...parentPath, String(definition.id)].join("/");
            const categoryName = this.resolveSettingsLabel(definition.name, String(definition.id));
            this._SETTINGS_CATEGORIES.push({key: categoryKey, name: categoryName});

            for (const component of definition.components ?? []) {
                const info = (component as any)?.info;
                if (typeof component !== "function" || !info?.id) continue;
                const key = `${categoryKey}::${String(info.id)}`;
                if (seenComponentKeys.has(key)) continue;
                seenComponentKeys.add(key);
                this._SETTINGS_REGISTERED_COMPONENTS.push({
                    key,
                    categoryKey,
                    name: this.resolveSettingsLabel(info.name, String(info.id)),
                    component,
                    componentId: String(info.id),
                });
            }
            for (const child of definition.children ?? []) visit(child, [...parentPath, String(definition.id)]);
        };

        for (const categoryModule of Object.values(uiCategories)) {
            visit((categoryModule as any)?.Definition);
        }
    }

    private refreshSettingsComponentOptions(): void {
        const allEntries = this.getFilteredComponentEntries("__all__");
        const categoryOptions = [
            {id: "__all__", name: "All"},
            ...this._SETTINGS_CATEGORIES
                .filter((category) => allEntries.some((entry) =>
                    entry.categoryKey === category.key || entry.categoryKey.startsWith(`${category.key}/`),
                ))
                .map((category) => ({id: category.key, name: category.name})),
        ];
        const filteredEntries = this.getFilteredComponentEntries(this._SETTINGS_SELECTED_CATEGORY);
        this._SETTINGS_CATEGORY_SELECT?.set("prop_options", categoryOptions);
        this._SETTINGS_CATEGORY_SELECT?.set("prop_itemSelected", this._SETTINGS_SELECTED_CATEGORY);
        this._SETTINGS_COMPONENT_SELECT?.set("prop_options", filteredEntries.map((entry) => ({id: entry.key, name: entry.name})));
        this._SETTINGS_COMPONENT_SELECT?.set("prop_itemSelected", this._SETTINGS_SELECTED_COMPONENT_KEY);
    }

    private findRegisteredComponent(componentReference: Function | null): any | null {
        if (!componentReference) return null;
        const direct = this._SETTINGS_REGISTERED_COMPONENTS.find((entry) => entry.component === componentReference);
        if (direct) return direct;
        const componentId = this.readComponentId(componentReference);
        return componentId
            ? this._SETTINGS_REGISTERED_COMPONENTS.find((entry) => entry.componentId === componentId) ?? null
            : null;
    }

    private readComponentId(componentReference: Function): string | null {
        const directId = (componentReference as any)?.info?.id;
        if (directId) return String(directId);
        let instance: any = null;
        try {
            const reference = componentReference as any;
            instance = typeof reference?.prototype?.getElement === "function"
                ? new reference({}, {} as any)
                : reference({}, {} as any);
            return instance?._COMPONENT_DEFINITION?.id ?? null;
        } catch {
            return null;
        } finally {
            if (instance?.dispose) instance.dispose();
            else instance?.getScope?.()?.dispose?.();
        }
    }

    private getFilteredComponentEntries(categoryKey: string): any[] {
        const allowedComponents = this.getConfiguredComponentAllowList();
        const allowedReferences = allowedComponents === null ? null : new Set(allowedComponents);
        const allowedIds = allowedComponents === null
            ? null
            : new Set(allowedComponents
                .map((component) => this.getComponentReferenceId(component))
                .filter((id): id is string => id !== null));
        const entries = allowedReferences === null
            ? [...this._SETTINGS_REGISTERED_COMPONENTS]
            : this._SETTINGS_REGISTERED_COMPONENTS.filter((entry) =>
                allowedReferences.has(entry.component) || allowedIds!.has(entry.componentId),
            );

        // Keep the currently rendered component available while editing even if
        // it is no longer in the allow-list. It remains editable, while changing
        // to another component is still checked against the allow-list.
        const selectedComponent = this._SETTINGS_SELECTED_COMPONENT;
        if (this._SETTINGS_MODE === ElementCreatorMode.SETTING_EDIT && selectedComponent &&
            !entries.some((entry) => this.isEntryForComponent(entry, selectedComponent))) {
            const currentEntry = this.findRegisteredComponent(selectedComponent) ?? this.getCurrentUnlistedEntry();
            if (currentEntry) entries.push(currentEntry);
        }

        return categoryKey === "__all__"
            ? entries
            : entries.filter((entry) => entry.categoryKey === categoryKey);
    }

    private getConfiguredComponentAllowList(): Function[] | null {
        let configuredComponents: any = this._COMPONENT_PROPS_BIND.prop_components?.get?.();
        const seenObservables = new Set<any>();
        while (CoreObservable.App.isObservable(configuredComponents) && !seenObservables.has(configuredComponents)) {
            seenObservables.add(configuredComponents);
            configuredComponents = configuredComponents.get();
        }
        if (configuredComponents == null) return null;
        if (!Array.isArray(configuredComponents)) return [];
        return configuredComponents.filter((component): component is Function => typeof component === "function");
    }

    private isEntryForComponent(entry: any, componentReference: Function): boolean {
        if (entry?.component === componentReference) return true;
        const componentId = this.getComponentReferenceId(componentReference);
        return componentId !== null && entry?.componentId === componentId;
    }

    private isComponentAllowedForSettings(componentReference: Function | null): boolean {
        if (!componentReference) return false;
        const allowedComponents = this.getConfiguredComponentAllowList();
        if (allowedComponents === null) return true;
        const componentId = this.getComponentReferenceId(componentReference);
        const isListed = allowedComponents.some((component) =>
            component === componentReference ||
            (componentId !== null && this.getComponentReferenceId(component) === componentId),
        );
        if (isListed) return true;
        return this._SETTINGS_MODE === ElementCreatorMode.SETTING_EDIT &&
            componentReference === this._SETTINGS_COMPONENT_REFERENCE;
    }

    private getComponentReferenceId(componentReference: Function): string | null {
        const directId = (componentReference as any)?.info?.id ?? (componentReference as any)?._COMPONENT_DEFINITION?.id;
        if (directId) return String(directId);
        return this.readComponentId(componentReference);
    }

    private getCurrentUnlistedEntry(): any | null {
        if (!this._SETTINGS_SELECTED_COMPONENT || this.findRegisteredComponent(this._SETTINGS_SELECTED_COMPONENT)) return null;
        return {
            key: "__current__",
            categoryKey: "__all__",
            name: this.resolveSettingsLabel(
                (this._SETTINGS_SELECTED_COMPONENT as any)?.info?.name ?? this.readComponentId(this._SETTINGS_SELECTED_COMPONENT),
                "Current component",
            ),
            component: this._SETTINGS_SELECTED_COMPONENT,
            componentId: this.readComponentId(this._SETTINGS_SELECTED_COMPONENT) ?? "__current__",
        };
    }

    private handleSettingsCategoryChange(value: any): void {
        const categoryKey = value == null ? "__all__" : String(value);
        this._SETTINGS_SELECTED_CATEGORY = categoryKey;
        const options = this.getFilteredComponentEntries(categoryKey);
        const selectedStillAvailable = options.some((entry) => entry.component === this._SETTINGS_SELECTED_COMPONENT);
        if (!selectedStillAvailable) {
            this._SETTINGS_SELECTED_COMPONENT = null;
            this._SETTINGS_SELECTED_COMPONENT_KEY = null;
            this._SETTINGS_DRAFT = {};
        }
        this._SETTINGS_CATEGORY_SELECT?.set("prop_itemSelected", categoryKey);
        this._SETTINGS_COMPONENT_SELECT?.set("prop_options", options.map((entry) => ({id: entry.key, name: entry.name})));
        this._SETTINGS_COMPONENT_SELECT?.set("prop_itemSelected", this._SETTINGS_SELECTED_COMPONENT_KEY);
        this.refreshSettingsTabs();
    }

    private handleSettingsComponentChange(value: any): void {
        const key = value == null ? null : String(value);
        const entry = key == null
            ? null
            : this.getFilteredComponentEntries(this._SETTINGS_SELECTED_CATEGORY)
                .find((candidate) => candidate?.key === key) ?? null;
        const nextComponent = entry?.component ?? null;
        if (nextComponent !== this._SETTINGS_SELECTED_COMPONENT) {
            this._SETTINGS_SELECTED_COMPONENT = nextComponent;
            if (nextComponent && nextComponent === this._SETTINGS_COMPONENT_REFERENCE && this._SETTINGS_MODE === ElementCreatorMode.SETTING_EDIT) {
                this._SETTINGS_DRAFT = {...(this._COMPONENT_PROPS_BIND.prop_componentProperties.get() ?? {})};
            } else {
                this._SETTINGS_DRAFT = nextComponent ? this.getComponentDefaultProperties(nextComponent) : {};
            }
        }
        this._SETTINGS_SELECTED_COMPONENT_KEY = entry?.key ?? null;
        this._SETTINGS_COMPONENT_SELECT?.set("prop_itemSelected", this._SETTINGS_SELECTED_COMPONENT_KEY);
        this.refreshSettingsTabs();
    }

    private refreshSettingsTabs(): void {
        // Enable the page action before updating the tabs. Rendering the new
        // props tab can synchronously rebuild a workflow subtree and throw,
        // which must not leave the Add component button disabled.
        this._SETTINGS_ACCEPT_DISABLED.set(!this.isComponentAllowedForSettings(this._SETTINGS_SELECTED_COMPONENT));
        if (!this._SETTINGS_TABS) return;
        this.disposeSettingsPropChildren();
        const propertiesBody = this._SETTINGS_SELECTED_COMPONENT
            ? this.createSettingsPropsBody(this._SETTINGS_SELECTED_COMPONENT, this._SETTINGS_DRAFT)
            : null;
        const tabs = this.createSettingsTabs(propertiesBody);
        const selectedTab = this._SETTINGS_TABS.get("prop_tabSelected");
        this._SETTINGS_TABS.set("prop_tabs", tabs);
        if (!tabs.some((tab) => tab.id === selectedTab)) {
            this._SETTINGS_TABS.set("prop_tabSelected", tabs[0]?.id ?? null);
        }
        this._SETTINGS_WINDOW?.set("prop_showAccept", this.isComponentAllowedForSettings(this._SETTINGS_SELECTED_COMPONENT));
    }

    private getComponentDefaultProperties(componentReference: Function): Record<string, any> {
        let instance: any = null;
        try {
            const reference = componentReference as any;
            instance = typeof reference?.prototype?.getElement === "function"
                ? new reference({}, {} as any)
                : reference({}, {} as any);
            const definitions = Object.values(instance?._COMPONENT_PATTERN ?? {}) as any[];
            return Object.fromEntries(definitions
                .filter((definition) => typeof definition?.prop === "string")
                .map((definition) => [definition.prop, definition.default]));
        } catch {
            return {};
        } finally {
            if (instance?.dispose) instance.dispose();
            else instance?.getScope?.()?.dispose?.();
        }
    }

    private createSettingsEditor(propDefinition: any, properties: Record<string, any>): CoreReactive.App {
        const propName = propDefinition.prop as string;
        const hasValue = Object.prototype.hasOwnProperty.call(properties ?? {}, propName);
        const initialValue = hasValue ? properties[propName] : propDefinition.default;
        const configuredEditor = propDefinition.OptionComponentSelector;
        const EditorComponent = configuredEditor ?? (typeof initialValue === "boolean"
            ? ComponentInputCheckBox.Component
            : ComponentInput.Component);
        const isJsonEditor = EditorComponent === ComponentCodeMirror.Component &&
            propDefinition.OptionComponentOption?.prop_language === ComponentCodeMirror.CodeMirrorLanguage.JSON;
        const label = this.resolveSettingsText(propDefinition.name, propName);
        const description = this.resolveSettingsText(propDefinition.description, "");
        const editorValue = isJsonEditor
            ? JSON.stringify(initialValue ?? null, null, 2) ?? "null"
            : EditorComponent === ComponentInputColor.Component
                ? this.resolveColorEditorValue(initialValue)
                : initialValue;
        const editorOptions: Record<string, any> = {
            ...(propDefinition.OptionComponentOption ?? {}),
            prop_name: propName,
            prop_value: editorValue,
            prop_labelTitle: label,
            prop_labelTooltipDescription: description,
            prop_structureStyles: {width: "100%", ...(propDefinition.OptionComponentOption?.prop_structureStyles ?? {})},
        };

        if (EditorComponent === ComponentInputCheckBox.Component) editorOptions.prop_title = label;
        if (EditorComponent === ComponentCodeMirror.Component) editorOptions.prop_title ??= label;
        if (EditorComponent === ComponentInputSelectOption.Component) editorOptions.prop_itemSelected = initialValue;

        let editorInstance: any = null;
        const onChange = (_event: Event, dataArgs: any, componentArgs: any) => {
            const saveValue = (value: any) => {
                if (isJsonEditor && typeof value === "string") {
                    try {
                        this._SETTINGS_DRAFT[propName] = JSON.parse(value);
                    } catch {
                        // Keep the last valid draft while the JSON editor has incomplete text.
                    }
                    return;
                }
                this._SETTINGS_DRAFT[propName] = this.coerceSettingsValue(value, initialValue);
            };

            const values = [componentArgs, dataArgs];
            for (const args of values) {
                if (!args || typeof args !== "object") continue;
                for (const key of ["VALUE", "value", "CHECKED", "checked", "COLOR", "color"]) {
                    if (Object.prototype.hasOwnProperty.call(args, key)) {
                        saveValue(args[key]);
                        return;
                    }
                }
            }
            if (editorInstance?.get) {
                saveValue(editorInstance.get("prop_value"));
            }
        };
        const editorMethods: Record<string, any> = {
            INPUT_CHANGE: onChange,
            INPUT_BLUR: onChange,
            CHANGE: onChange,
            SELECT_CHANGE: onChange,
            CLICK: onChange,
            VALUE_CHANGE: onChange,
        };

        const isClass = typeof (EditorComponent as any)?.prototype?.getElement === "function";
        editorInstance = isClass
            ? new (EditorComponent as any)(editorOptions, editorMethods)
            : (EditorComponent as any)(editorOptions, editorMethods);
        this._SETTINGS_PROP_CHILDREN.push(editorInstance);
        return (editorInstance?.getReactiveElement?.() ?? editorInstance?.getElement?.()) as CoreReactive.App;
    }

    private resolveSettingsText(value: any, fallback: string): any {
        if (typeof value === "symbol") return CoreLanguage.App.translate(value as any) as any;
        if (value == null || value === "") return fallback;
        return value;
    }

    private resolveSettingsLabel(value: any, fallback: string): string {
        if (typeof value === "symbol") {
            const translated = CoreLanguage.App.translate(value as any) as any;
            return String(translated?.get?.() ?? fallback);
        }
        return value == null || value === "" ? fallback : String(value);
    }

    private coerceSettingsValue(value: any, templateValue: any): any {
        if (typeof templateValue === "boolean") {
            if (typeof value === "string") return value === "true" || value === "1";
            return !!value;
        }
        if (typeof templateValue === "number" && value !== "" && value != null) {
            const numericValue = Number(value);
            return Number.isFinite(numericValue) ? numericValue : value;
        }
        if (templateValue != null && typeof templateValue === "object" && typeof value === "string") {
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        }
        return value;
    }

    private resolveColorEditorValue(value: any): any {
        if (typeof value !== "string" || typeof document === "undefined" || !document.body) return value;
        const probe = document.createElement("span");
        probe.style.color = value;
        if (!probe.style.color) return value;
        document.body.appendChild(probe);
        const resolved = window.getComputedStyle(probe).color;
        probe.remove();
        const channels = resolved.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
        if (!channels) return value;
        return `#${channels.slice(1, 4).map((channel) => Number(channel).toString(16).padStart(2, "0")).join("")}`;
    }

    private applySettingsDraft(event: Event): void {
        const componentReference = this._SETTINGS_SELECTED_COMPONENT;
        if (!this.isComponentAllowedForSettings(componentReference)) return;
        const componentBinding = this._COMPONENT_PROPS_BIND.prop_component;
        const propertiesBinding = this._COMPONENT_PROPS_BIND.prop_componentProperties;
        const currentProperties = propertiesBinding?.get?.() ?? {};
        const baseProperties = this._SETTINGS_MODE === ElementCreatorMode.SETTING_EDIT &&
            componentReference === this._SETTINGS_COMPONENT_REFERENCE
                ? currentProperties
                : {};
        const properties = {...baseProperties, ...this._SETTINGS_DRAFT};
        componentBinding?.set?.(componentReference);
        propertiesBinding?.set?.(properties);
        this.executeMethod("SETTINGS_APPLY", event, {COMPONENT: componentReference, PROPERTIES: properties});
        this.closeSettingsPageSetting();
        this.executeMethod("SETTINGS_CLOSE", event, {});
    }

    private disposeSettingsPropChildren(): void {
        const children = this._SETTINGS_PROP_CHILDREN.splice(0).reverse();
        for (const child of children) {
            child.getScope?.()?.dispose?.();
            child.dispose?.();
        }
    }

    private disposeSettingsChildren(): void {
        this.disposeSettingsPropChildren();
        const children = this._SETTINGS_CHILDREN.splice(0).reverse();
        for (const child of children) {
            child.getScope?.()?.dispose?.();
            child.dispose?.();
        }
        const componentChildren = this._SETTINGS_COMPONENT_CHILDREN.splice(0).reverse();
        for (const child of componentChildren) {
            child.getScope?.()?.dispose?.();
            child.dispose?.();
        }
        this._SETTINGS_TABS = null;
        this._SETTINGS_CATEGORY_SELECT = null;
        this._SETTINGS_COMPONENT_SELECT = null;
        this._SETTINGS_COMPONENT_TAB_BODY = null;
    }

    private disposeSettingsWindow(): void {
        if (this._SETTINGS_CLOSE_TIMER !== null) {
            window.clearTimeout(this._SETTINGS_CLOSE_TIMER);
            this._SETTINGS_CLOSE_TIMER = null;
        }
        this._SETTINGS_WINDOW_OPEN = false;
        this._SETTINGS_WINDOW_ELEMENT?.remove();
        this._SETTINGS_WINDOW_ELEMENT = null;
        const settingsWindow = this._SETTINGS_WINDOW as any;
        this._SETTINGS_WINDOW = null;
        settingsWindow?.getScope?.()?.dispose?.();
        settingsWindow?.dispose?.();
        this._SETTINGS_MODE = null;
        this._SETTINGS_COMPONENT_REFERENCE = null;
        this._SETTINGS_SELECTED_COMPONENT = null;
        this._SETTINGS_SELECTED_COMPONENT_KEY = null;
        this._SETTINGS_SELECTED_CATEGORY = "__all__";
        this._SETTINGS_PROPERTIES_SOURCE = null;
        this.disposeSettingsChildren();
    }

    private disposeSettingsPageSetting(): void {
        const pageSetting = this._SETTINGS_PAGE_SETTING;
        this._SETTINGS_PAGE_SETTING = null;
        this._SETTINGS_PAGE_SETTING_ELEMENT?.remove();
        this._SETTINGS_PAGE_SETTING_ELEMENT = null;
        pageSetting?.dispose();
    }

    private closeSettingsPageSetting(): void {
        this._SETTINGS_REGISTRY_GENERATION++;
        const source = this._SETTINGS_WORKFLOW_SOURCE;
        const endpoint = this._SETTINGS_PAGE_SETTING_ENDPOINT;
        this._SETTINGS_WORKFLOW_SOURCE = null;
        this._SETTINGS_PAGE_SETTING_ENDPOINT = null;
        if (source && endpoint && CoreEvent.App.hasEmit(endpoint)) {
            CoreEvent.App.request(CoreEvent.requestMap([[endpoint, {close: true}]]), source);
        }
        this._SETTINGS_WINDOW_OPEN = false;
        this._SETTINGS_PAGE_SETTING?.set("prop_sidebarIsOpen", false);
    }

    private findPageSettingEndpoint(source: CoreEvent.TStepRef): CoreEvent.TStepRef | null {
        const candidates = CoreEvent.findWorkflowNodes(source, Core.Dictionary.WorkflowNodeNames.setting);
        const match = candidates
            .find(({node}) =>
                CoreComponents.Tools.Workflow.Get_ComponentWorkflowMetadata(node)?.kind !== "component"
                && CoreEvent.App.hasEmit(node),
            );
        return match?.node ?? null;
    }

    private closeCssPageSetting(): void {
        const source = this._CSS_WORKFLOW_SOURCE;
        const endpoint = this._CSS_PAGE_SETTING_ENDPOINT;
        this._CSS_WORKFLOW_SOURCE = null;
        this._CSS_PAGE_SETTING_ENDPOINT = null;
        if (source && endpoint && CoreEvent.App.hasEmit(endpoint)) {
            CoreEvent.App.request(CoreEvent.requestMap([[endpoint, {close: true}]]), source);
            this._CSS_STYLE_VALUES_UNSUBSCRIBE?.();
            this._CSS_STYLE_VALUES_UNSUBSCRIBE = null;
            // The page setting slot owns and disposes the rendered styles component
            // when it clears its content. Create a fresh editor the next time it opens.
            this._CSS_STYLES_COMPONENT = null;
        }
        this._CSS_PAGE_SETTING?.set("prop_sidebarIsOpen", false);
    }

    private prepareSettingsPageSetting(): {content: CoreReactive.App; mode: ElementCreatorMode.SETTING_CREATE | ElementCreatorMode.SETTING_EDIT} {
        this.closeCssPageSetting();
        const configuredMode = this._COMPONENT_PROPS_BIND.prop_mode.get() as ElementCreatorMode;
        const mode = configuredMode === ElementCreatorMode.SETTING_CREATE
            ? ElementCreatorMode.SETTING_CREATE
            : ElementCreatorMode.SETTING_EDIT;
        const configuredComponent = this._COMPONENT_PROPS_BIND.prop_component.get() as Function | null;
        const componentReference = mode === ElementCreatorMode.SETTING_CREATE ? null : configuredComponent;
        const properties = (this._COMPONENT_PROPS_BIND.prop_componentProperties.get() ?? {}) as Record<string, any>;

        if (this._SETTINGS_CLOSE_TIMER !== null) {
            window.clearTimeout(this._SETTINGS_CLOSE_TIMER);
            this._SETTINGS_CLOSE_TIMER = null;
        }
        if (this._SETTINGS_WINDOW) this.disposeSettingsWindow();

        this._SETTINGS_MODE = mode;
        this._SETTINGS_COMPONENT_REFERENCE = componentReference;
        this._SETTINGS_PROPERTIES_SOURCE = properties;
        const tabs = this.createSettingsBody(mode, componentReference, properties, true);
        const content = this.createSettingsPageContent(tabs);

        return {content, mode};
    }

    private showSettingsPageSetting(content: CoreReactive.App, mountHost?: HTMLElement): void {

        if (!this._SETTINGS_PAGE_SETTING) {
            this._SETTINGS_PAGE_SETTING = new ComponentPageSetting.Component({
                prop_content: content,
                prop_contentScrollY: true,
                prop_sidebarWidth: 480,
                prop_sidebarIsOpen: true,
                prop_sidebarHasOpenIcon: false,
            } as any);
            this._SETTINGS_PAGE_SETTING_ELEMENT = this._SETTINGS_PAGE_SETTING.getElement() as HTMLElement;
        } else {
            this._SETTINGS_PAGE_SETTING.set("prop_content", content);
            this._SETTINGS_PAGE_SETTING.set("prop_sidebarIsOpen", true);
        }

        const pageSettingElement = this._SETTINGS_PAGE_SETTING_ELEMENT;
        const settingsHost = mountHost ?? this.getElement();
        if (pageSettingElement && settingsHost && pageSettingElement.parentElement !== settingsHost) {
            settingsHost.appendChild(pageSettingElement);
        }
        this._SETTINGS_WINDOW_OPEN = true;
    }

    private openSettingsPageSetting(mountHost?: HTMLElement, workflowSource?: CoreEvent.TStepRef): void {
        this.closeSettingsPageSetting();
        const {content, mode} = this.prepareSettingsPageSetting();
        const source = workflowSource ?? this.getComponentWorkflow() as CoreEvent.TStepRef;
        const endpoint = source ? this.findPageSettingEndpoint(source) : null;
        if (endpoint && source) {
            const response = CoreEvent.App.request(
                CoreEvent.requestMap([[endpoint, {content}]]),
                source,
            ).get(endpoint);
            if (response?.status === "success" && response.value?.opened === true) {
                this._SETTINGS_WORKFLOW_SOURCE = source;
                this._SETTINGS_PAGE_SETTING_ENDPOINT = endpoint;
                this._SETTINGS_WINDOW_OPEN = true;
                this.executeMethod("SETTINGS_OPEN", undefined, {CONTENT: content, MODE: mode});
                return;
            }
        }
        this.showSettingsPageSetting(content, mountHost);
        this.executeMethod("SETTINGS_OPEN", undefined, {CONTENT: content, MODE: mode});
    }

    call_showSettingsPageSetting(content: CoreReactive.App, mountHost?: HTMLElement): void {
        this.showSettingsPageSetting(content, mountHost);
    }

    private openCssPageSetting(workflowSource?: CoreEvent.TStepRef): void {
        this.closeSettingsPageSetting();
        if (this._SETTINGS_WINDOW) this.disposeSettingsWindow();
        this.closeCssPageSetting();

        const properties = (this._COMPONENT_PROPS_BIND.prop_componentProperties.get() ?? {}) as Record<string, any>;
        this.syncCssStyleValues(
            properties,
            this._COMPONENT_PROPS_BIND.prop_component.get() as Function | null,
        );
        if (!this._CSS_STYLE_VALUES_UNSUBSCRIBE) {
            this._CSS_STYLE_VALUES_UNSUBSCRIBE = this._CSS_STYLE_VALUES.subscribe((values) => {
                this.dispatchCssStyleChange(values ?? {});
            }, this.getScope());
        }
        const source = workflowSource ?? this.getComponentWorkflow() as CoreEvent.TStepRef;
        const endpoint = source ? this.findPageSettingEndpoint(source) : null;
        const content = this.createCssStylesContent();
        if (source && endpoint) {
            const response = CoreEvent.App.request(
                CoreEvent.requestMap([[endpoint, {content, view: "styles"}]]),
                source,
            ).get(endpoint);
            if (response?.status === "success" && response.value?.opened === true) {
                this._CSS_WORKFLOW_SOURCE = source;
                this._CSS_PAGE_SETTING_ENDPOINT = endpoint;
                return;
            }
        }
        if (!this._CSS_PAGE_SETTING) {
            this._CSS_PAGE_SETTING = new ComponentPageSetting.Component({
                prop_content: content,
                prop_contentScrollY: false,
                prop_sidebarWidth: 480,
                prop_sidebarIsOpen: true,
                prop_sidebarHasOpenIcon: false,
            } as any);
            this._CSS_PAGE_SETTING_ELEMENT = this._CSS_PAGE_SETTING.getElement();
            this._CSS_PAGE_SETTING_ELEMENT.style.display = "none";
            this.getElement().appendChild(this._CSS_PAGE_SETTING_ELEMENT);
        } else {
            this._CSS_PAGE_SETTING.set("prop_content", content);
            this._CSS_PAGE_SETTING.set("prop_sidebarIsOpen", true);
        }
    }

    private createCssStylesContent(): CoreReactive.App {
        if (!this._CSS_STYLES_COMPONENT) {
            this._CSS_STYLES_COMPONENT = new ComponentStyles.Component({
                prop_workflowChildName: Core.Dictionary.WorkflowNodeNames.elementCreatorStyles,
                prop_styleGroups: CSS_STYLE_PROPERTIES,
                prop_value: this._CSS_STYLE_VALUES,
                prop_structureStyles: {width: "100%", height: "100%", minHeight: "0"},
                styles: {width: "100%", height: "100%", minHeight: "0"},
            } as any);
        }
        return CoreComponents.Tools.Workflow.With_ComponentWorkflowComposition(
            () => {},
            () => this._CSS_STYLES_COMPONENT!.getReactiveElement(),
        );
    }

    private disposeCssPageSetting(): void {
        const pageSetting = this._CSS_PAGE_SETTING;
        const stylesComponent = this._CSS_STYLES_COMPONENT;
        this._CSS_STYLE_VALUES_UNSUBSCRIBE?.();
        this._CSS_STYLE_VALUES_UNSUBSCRIBE = null;
        this._CSS_PAGE_SETTING_ELEMENT?.remove();
        this._CSS_PAGE_SETTING_ELEMENT = null;
        pageSetting?.dispose();
        this._CSS_PAGE_SETTING = null;
        if (!pageSetting) stylesComponent?.dispose();
        this._CSS_STYLES_COMPONENT = null;
        this._CSS_STYLE_SOURCE = null;
        this._CSS_STYLE_COMPONENT_REFERENCE = null;
        this._CSS_STYLE_VALUES.set({});
    }

    private applyCssStylesToComponentProperties(values: Record<string, any>): boolean {
        const currentProperties = this._COMPONENT_PROPS_BIND.prop_componentProperties.get();
        if (!currentProperties || typeof currentProperties !== "object") return false;

        const configuredStyles = currentProperties.prop_structureStyles;
        const resolvedStyles = CoreObservable.App.isObservable(configuredStyles)
            ? configuredStyles.get()
            : configuredStyles;
        const currentStyles = resolvedStyles && typeof resolvedStyles === "object" && !Array.isArray(resolvedStyles)
            ? resolvedStyles as Record<string, any>
            : {};
        const managedProperties = new Set<string>(CSS_STYLE_PROPERTIES);
        const preservedStyles = Object.fromEntries(
            Object.entries(currentStyles).filter(([styleName]) => {
                const property = styleName.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
                return !managedProperties.has(property);
            }),
        );
        const nextStyles = {
            ...preservedStyles,
            ...UtilOptionsStd.Group.CreateCssStyles(values),
        };
        const styleNames = new Set([...Object.keys(currentStyles), ...Object.keys(nextStyles)]);
        const hasChanged = [...styleNames].some((styleName) => !Object.is(currentStyles[styleName], nextStyles[styleName]));
        if (!hasChanged) return false;

        this._COMPONENT_PROPS_BIND.prop_componentProperties.set({
            ...currentProperties,
            prop_structureStyles: nextStyles,
        });
        return true;
    }

    private createRenderedComponent(componentReference: Function | null, properties: Record<string, any>): CoreReactive.App | HTMLElement | null {
        this.disposeRenderedComponent();
        if (typeof componentReference !== "function") return null;

        const componentProperties = {...(properties ?? {})};
        this.syncCssStyleValues(properties ?? {}, componentReference);
        const configuredStyles = componentProperties.prop_structureStyles;
        const structureStyles = CoreObservable.App.isObservable(configuredStyles)
            ? configuredStyles
            : new CoreObservable.App(configuredStyles ?? {});
        componentProperties.prop_structureStyles = CoreObservable.App.computed(
            (baseStyles: Record<string, any>, values: Record<string, any>) => {
                const componentStyles = this.withoutMarginStyles(baseStyles);
                return {
                    ...componentStyles,
                    ...UtilOptionsStd.Group.CreateCssStyles(this.withoutMarginStyles(values)),
                    boxSizing: componentStyles.boxSizing ?? "border-box",
                };
            },
            [structureStyles, this._CSS_STYLE_VALUES],
            this.getScope(),
        );

        const reference = componentReference as any;
        const isClass = typeof reference.prototype?.getElement === "function";
        const instance = (isClass
            ? new reference(componentProperties, {} as any)
            : reference(componentProperties, {} as any)) as NonNullable<typeof this._RENDERED_COMPONENT>;
        this._RENDERED_COMPONENT = instance;
        return (instance?.getReactiveElement?.() ?? instance?.getElement?.() ?? null) as CoreReactive.App | HTMLElement | null;
    }

    private syncCssStyleValues(properties: Record<string, any>, componentReference: Function | null): void {
        if (this._CSS_STYLE_SOURCE === properties) return;
        const keepCurrentValues = this._CSS_STYLE_COMPONENT_REFERENCE === componentReference;
        this._CSS_STYLE_SOURCE = properties;
        this._CSS_STYLE_COMPONENT_REFERENCE = componentReference;
        const configuredStyles = properties?.prop_structureStyles;
        const styles = CoreObservable.App.isObservable(configuredStyles)
            ? configuredStyles.get()
            : configuredStyles;
        const values: Record<string, any> = {};
        const defaultSpacingValue = CoreConfig.Settings.SizeName.get();
        for (const direction of UtilOptionsStd.Group.Margin.DirectionSets.ALL) {
            values[direction] = defaultSpacingValue;
        }
        for (const direction of UtilOptionsStd.Group.Padding.DirectionSets.ALL) {
            values[direction] = defaultSpacingValue;
        }
        if (styles && typeof styles === "object" && !Array.isArray(styles)) {
            for (const [styleName, value] of Object.entries(styles)) {
                const property = styleName.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
                if (UtilOptionsStd.Group.ResolveProperty(property)) values[property] = value;
            }
        }
        this._CSS_STYLE_VALUES.set(keepCurrentValues
            ? {...values, ...this._CSS_STYLE_VALUES.get()}
            : values);
    }

    private dispatchCssStyleChange(values: Record<string, any>): void {
        const componentWorkflow = this._CSS_STYLES_COMPONENT?.getComponentWorkflow?.() as CoreEvent.TStepRef | undefined;
        const source = componentWorkflow ?? this.getComponentWorkflow() as CoreEvent.TStepRef;
        const endpointName = Core.Dictionary.WorkflowNodeNames.elementCreatorStyleChanged;
        const endpoint = source
            ? CoreEvent.findWorkflowNodes(source, endpointName).find(({node}) => CoreEvent.App.hasEmit(node))?.node
            : null;
        const target = endpoint ?? this._STEP.styleChanged as CoreEvent.TStepRef;
        CoreEvent.App.request(
            CoreEvent.requestMap([[target, {values: {...values}}]]),
            source ?? this._STEP as CoreEvent.TStepRef,
        );
    }

    private withoutMarginStyles(styles: Record<string, any> | null | undefined): Record<string, any> {
        return Object.fromEntries(
            Object.entries(styles ?? {}).filter(([styleName]) => {
                const property = styleName.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
                return !MARGIN_STYLE_PROPERTIES.has(property);
            }),
        );
    }

    private createMarginCssStyles(values: Record<string, any> | null | undefined): Record<string, string> {
        const marginValues = Object.fromEntries(
            Object.entries(values ?? {}).filter(([property]) => MARGIN_STYLE_PROPERTIES.has(property)),
        );
        const styles = UtilOptionsStd.Group.CreateCssStyles(marginValues);
        for (const property of UtilOptionsStd.Group.Margin.Properties) {
            const styleName = property.replace(/-([a-z])/g, (_match, letter: string) => letter.toUpperCase());
            if (!Object.prototype.hasOwnProperty.call(styles, styleName)) styles[styleName] = "";
        }
        return styles;
    }

    private renderWithMargin(
        content: CoreReactive.App | HTMLElement | null,
        partName: string,
    ): CoreReactive.App {
        return CoreReactive.App.section({
            attrs: {"data-part-name": partName},
            stylesBind: CoreObservable.App.computed(
                (values: Record<string, any>) => ({
                    width: "auto",
                    ...this.createMarginCssStyles(values),
                }),
                [this._CSS_STYLE_VALUES],
                this.getScope(),
            ),
            children: [content as any],
        });
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
        if (this._EDIT_MODE_ACTIVE) this.startDocumentPointerTracking();
        else this.stopDocumentPointerTracking();
    }

    private setEditModeActive(isActive: boolean): void {
        this._EDIT_MODE_ACTIVE = isActive;
        if (isActive) {
            this.startDocumentPointerTracking();
            return;
        }

        this.clearOptionsHideTimeout();
        this._ROOT_HOVER.set(false);
        this._ROOT_FOCUS.set(false);
        if (this._OPTIONS_CONTENT.get() !== null) this._OPTIONS_CONTENT.set(null);
        this.stopDocumentPointerTracking();
    }

    private startDocumentPointerTracking(): void {
        if (this._DOCUMENT_POINTER_MOVE_HANDLER) return;
        this._DOCUMENT_POINTER_MOVE_HANDLER = (event: PointerEvent | MouseEvent) => {
            const target = event.target;
            const isInsideCreator = target instanceof Node && this.getElement().contains(target);
            const isInsideMenu = this._OPTIONS_MENU?.containsTarget(target) ?? false;
            if (isInsideCreator) {
                this.clearOptionsHideTimeout();
                if (!this._ROOT_HOVER.get()) {
                    this._ROOT_HOVER.set(true);
                    this.updateOptionsVisibility();
                }
                return;
            }
            if (isInsideMenu) {
                this.clearOptionsHideTimeout();
                return;
            }
            if (this._ROOT_FOCUS.get()) return;
            this.scheduleOptionsHide();
        };
        document.addEventListener("pointermove", this._DOCUMENT_POINTER_MOVE_HANDLER, true);
        document.addEventListener("mousemove", this._DOCUMENT_POINTER_MOVE_HANDLER as (event: MouseEvent) => void, true);
        document.addEventListener("mouseover", this._DOCUMENT_POINTER_MOVE_HANDLER as (event: MouseEvent) => void, true);
        this._DOCUMENT_FOCUS_IN_HANDLER = (event: FocusEvent) => {
            const target = event.target;
            const isInsideCreator = target instanceof Node && this.getElement().contains(target);
            const isInsideMenu = this._OPTIONS_MENU?.containsTarget(target) ?? false;
            const isFocusedInside = isInsideCreator || isInsideMenu;
            this._ROOT_FOCUS.set(isFocusedInside);
            if (isFocusedInside) this.clearOptionsHideTimeout();
            this.updateOptionsVisibility();
        };
        document.addEventListener("focusin", this._DOCUMENT_FOCUS_IN_HANDLER, true);
        this._DOCUMENT_FOCUS_OUT_HANDLER = (event: FocusEvent) => {
            const relatedTarget = event.relatedTarget;
            const focusRemainsInside = relatedTarget instanceof Node && (
                this.getElement().contains(relatedTarget) || this._OPTIONS_MENU?.containsTarget(relatedTarget)
            );
            if (focusRemainsInside) return;
            this._ROOT_FOCUS.set(false);
            this.updateOptionsVisibility();
        };
        document.addEventListener("focusout", this._DOCUMENT_FOCUS_OUT_HANDLER, true);
    }

    private scheduleOptionsHide(): void {
        if (!this._ROOT_HOVER.get() || this._ROOT_FOCUS.get() || this._OPTIONS_HIDE_TIMEOUT !== null) return;
        this._OPTIONS_HIDE_TIMEOUT = window.setTimeout(() => {
            this._OPTIONS_HIDE_TIMEOUT = null;
            if (this._ROOT_FOCUS.get()) return;
            this._ROOT_HOVER.set(false);
            this.updateOptionsVisibility();
        }, 250);
    }

    private clearOptionsHideTimeout(): void {
        if (this._OPTIONS_HIDE_TIMEOUT === null) return;
        window.clearTimeout(this._OPTIONS_HIDE_TIMEOUT);
        this._OPTIONS_HIDE_TIMEOUT = null;
    }

    private stopDocumentPointerTracking(): void {
        if (this._DOCUMENT_POINTER_MOVE_HANDLER) {
            document.removeEventListener("pointermove", this._DOCUMENT_POINTER_MOVE_HANDLER, true);
            document.removeEventListener("mousemove", this._DOCUMENT_POINTER_MOVE_HANDLER as (event: MouseEvent) => void, true);
            document.removeEventListener("mouseover", this._DOCUMENT_POINTER_MOVE_HANDLER as (event: MouseEvent) => void, true);
            this._DOCUMENT_POINTER_MOVE_HANDLER = null;
        }
        if (this._DOCUMENT_FOCUS_IN_HANDLER) {
            document.removeEventListener("focusin", this._DOCUMENT_FOCUS_IN_HANDLER, true);
            this._DOCUMENT_FOCUS_IN_HANDLER = null;
        }
        if (this._DOCUMENT_FOCUS_OUT_HANDLER) {
            document.removeEventListener("focusout", this._DOCUMENT_FOCUS_OUT_HANDLER, true);
            this._DOCUMENT_FOCUS_OUT_HANDLER = null;
        }
    }

    private handleOptionSelection(event: Event, action?: string): void {
        if (action === "CLICK_SETTINGS") {
            const workflowSource = this.getComponentWorkflow() as CoreEvent.TStepRef;
            const pageSettingExists = !!this.findPageSettingEndpoint(workflowSource);
            if (this._COMPONENT_PROPS_BIND.prop_settingsUsePageSetting.get() || pageSettingExists) {
                this.call_openSettingsPage(event, undefined, workflowSource);
            } else {
                this.call_openSettings(event);
            }
        } else if (action === "CLICK_DELETE") {
            this.openDeleteConfirm();
        } else if (action === "CLICK_CSS") {
            this.openCssPageSetting(this.getComponentWorkflow() as CoreEvent.TStepRef);
        } else if (action === "SET_COLUMN_NULL") {
            this.executeMethod("COLUMN_CHANGE", event, {COLUMN: null});
        } else if (action === "SET_CHILDREN_DISPLAY_EDITOR") {
            this.executeMethod("CHILDREN_DISPLAY_CHANGE", event, {MODE: ElementCreatorMode.EDIT});
        } else if (action === "SET_CHILDREN_DISPLAY_RENDERED") {
            this.executeMethod("CHILDREN_DISPLAY_CHANGE", event, {MODE: ElementCreatorMode.RENDER});
        } else if (Object.values(LayoutColumn).includes(action as LayoutColumn)) {
            this.executeMethod("COLUMN_CHANGE", event, {COLUMN: action as LayoutColumn});
        }
    }

    private openSettingsWindow(): void {
        this.closeSettingsPageSetting();
        this.closeCssPageSetting();
        if (this._SETTINGS_PAGE_SETTING) this.disposeSettingsPageSetting();
        const configuredMode = this._COMPONENT_PROPS_BIND.prop_mode.get() as ElementCreatorMode;
        const mode = configuredMode === ElementCreatorMode.SETTING_CREATE
            ? ElementCreatorMode.SETTING_CREATE
            : ElementCreatorMode.SETTING_EDIT;
        const configuredComponent = this._COMPONENT_PROPS_BIND.prop_component.get() as Function | null;
        const componentReference = mode === ElementCreatorMode.SETTING_CREATE ? null : configuredComponent;
        const properties = (this._COMPONENT_PROPS_BIND.prop_componentProperties.get() ?? {}) as Record<string, any>;

        if (this._SETTINGS_CLOSE_TIMER !== null) {
            window.clearTimeout(this._SETTINGS_CLOSE_TIMER);
            this._SETTINGS_CLOSE_TIMER = null;
        }
        if (this._SETTINGS_WINDOW && (
            !this._SETTINGS_WINDOW_OPEN ||
            this._SETTINGS_MODE !== mode ||
            this._SETTINGS_COMPONENT_REFERENCE !== componentReference ||
            this._SETTINGS_PROPERTIES_SOURCE !== properties
        )) {
            this.disposeSettingsWindow();
        }

        const settingsWindow = this.ensureSettingsWindow(mode, componentReference, properties);
        const settingsElement = settingsWindow.getElement() as HTMLElement;
        if (!settingsElement.isConnected) document.body.appendChild(settingsElement);
        this._SETTINGS_WINDOW_OPEN = true;
        settingsWindow.call_open();
    }

    call_openSettings(event?: Event): void {
        this.openSettingsWindow();
        this.executeMethod("CLICK_SETTINGS", event);
    }

    call_openSettingsPage(event?: Event, mountHost?: HTMLElement, workflowSource?: CoreEvent.TStepRef): void {
        this.openSettingsPageSetting(mountHost, workflowSource);
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

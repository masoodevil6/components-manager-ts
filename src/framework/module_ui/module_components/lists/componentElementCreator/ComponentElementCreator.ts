import * as CoreComponents from "@/core_components";
import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreEvent from "@/core_event";
import * as CoreLanguage from "@/core_languages";
import * as UiCategory from "@/ui_categories";
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
import * as ComponentCollapse from "../componentCollapse";
import * as ComponentInput from "../componentInput";
import * as ComponentInputCheckBox from "../componentInputCheckBox";
import * as ComponentInputColor from "../componentInputColor";
import * as ComponentInputSelectOption from "../componentInputSelectOption";
import * as ComponentCodeMirror from "../componentCodeMirror";
import * as ComponentTabs from "../componentTabs";
import {LayoutColumn} from "../componentLayout/Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import {ElementCreatorMode, Props} from "./Props";
import type {PropsConfigType as ElementCreatorPropsConfigType, PropsType as ElementCreatorPropsType} from "./Props";
import {Schemas} from "./Schemas";
import type {SchemasType as ElementCreatorSchemasType} from "./Schemas";
import {Definition} from "./Definition";
import {createElementCreatorStep} from "./Step";
import {Methods, type MethodsConfigType, type MethodsType} from "./Methods";

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
    protected override _COMPONENT_METHODS = CoreComponents.DefineMethod<MethodsType, StructurePropsType & ElementCreatorPropsType & Record<string, any>>({
        ...Methods,
    } as any);
    private readonly _STEP: CoreEvent.TStepInstance<any>;
    private _RENDERED_COMPONENT: {getElement: () => HTMLElement; getReactiveElement?: () => any; dispose?: () => void; getScope?: () => {dispose?: () => void}} | null = null;
    private _ROOT_BORDER: ComponentBorder.Component | null = null;
    private _OPTIONS_BORDER: ComponentBorder.Component | null = null;
    private _OPTIONS_MENU: ComponentMenuMore.Component | null = null;
    private _OPTIONS_EFFECT: ComponentEffectChange.Component | null = null;
    private _SETTINGS_WINDOW: ComponentWindow.Component | null = null;
    private _SETTINGS_WINDOW_ELEMENT: HTMLElement | null = null;
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
    private _SETTINGS_COMPONENT_TAB_BODY: CoreReactive.App | null = null;
    private _SETTINGS_TABS: ComponentTabs.Component | null = null;
    private _SETTINGS_CATEGORY_SELECT: ComponentInputSelectOption.Component | null = null;
    private _SETTINGS_COMPONENT_SELECT: ComponentInputSelectOption.Component | null = null;
    private _SETTINGS_DRAFT: Record<string, any> = {};
    private _DELETE_CONFIRM: ComponentWindowConfirm.Component | null = null;
    private _DELETE_CONFIRM_ELEMENT: HTMLElement | null = null;
    private _CSS_WINDOW: ComponentWindow.Component | null = null;
    private _CSS_WINDOW_ELEMENT: HTMLElement | null = null;
    private _OPTIONS_BORDER_CONTENT: {getElement: () => HTMLElement; dispose: () => void} | null = null;
    private _OPTIONS_MENU_ITEMS: CoreObservable.App<ComponentMenuMore.MenuMoreEntry[]> | null = null;
    private readonly _OPTIONS_CONTENT = new CoreObservable.App<any>(null);
    private readonly _ROOT_HOVER = new CoreObservable.App(false);
    private readonly _ROOT_FOCUS = new CoreObservable.App(false);
    private _DOCUMENT_POINTER_MOVE_HANDLER: ((event: PointerEvent) => void) | null = null;
    private _DOCUMENT_FOCUS_IN_HANDLER: ((event: FocusEvent) => void) | null = null;
    private _DOCUMENT_FOCUS_OUT_HANDLER: ((event: FocusEvent) => void) | null = null;
    private _OPTIONS_HIDE_TIMEOUT: number | null = null;
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
        this._DELETE_CONFIRM_ELEMENT?.remove();
        this._DELETE_CONFIRM_ELEMENT = null;
        this._DELETE_CONFIRM?.getScope().dispose();
        this._DELETE_CONFIRM?.dispose();
        this._DELETE_CONFIRM = null;
        this.disposeCssWindow();
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
            (mode: ElementCreatorMode, componentReference: Function | null, properties: Record<string, any>) => {
                if (mode === ElementCreatorMode.SETTING_CREATE || mode === ElementCreatorMode.SETTING_EDIT) {
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
        this._OPTIONS_MENU_ITEMS ??= CoreObservable.App.computed(
            (hasSetting: boolean, hasDelete: boolean, hasColumn: boolean) => {
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
                return items;
            },
            [
                this._COMPONENT_PROPS_BIND.prop_hasHeaderSetting,
                this._COMPONENT_PROPS_BIND.prop_hasHeaderDelete,
                this._COMPONENT_PROPS_BIND.prop_hasHeaderColumn,
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
                gap: "var(--marginSmall)",
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
                        gap: "var(--marginSmall)",
                        padding: "var(--paddingMedium)",
                        position: "relative",
                        zIndex: String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.basic)),
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
    ): CoreReactive.App {
        this.disposeSettingsChildren();
        this._SETTINGS_DRAFT = {...(properties ?? {})};
        this._SETTINGS_SELECTED_COMPONENT = mode === ElementCreatorMode.SETTING_CREATE ? null : componentReference;
        this.readRegisteredComponents();
        const matchingEntry = this._SETTINGS_SELECTED_COMPONENT
            ? this.findRegisteredComponent(componentReference)
            : null;
        this._SETTINGS_SELECTED_COMPONENT_KEY = this._SETTINGS_SELECTED_COMPONENT
            ? matchingEntry?.key ?? "__current__"
            : null;
        this._SETTINGS_SELECTED_CATEGORY = matchingEntry?.categoryKey ?? "__all__";
        this._SETTINGS_COMPONENT_TAB_BODY = this.createSettingsComponentTab();

        const propertyBody = this._SETTINGS_SELECTED_COMPONENT
            ? this.createSettingsPropsBody(this._SETTINGS_SELECTED_COMPONENT, this._SETTINGS_DRAFT)
            : null;
        const tabs = this.createSettingsTabs(propertyBody);
        this._SETTINGS_TABS = new ComponentTabs.Component({
            prop_tabSelected: tabs[0]?.id ?? null,
            prop_tabs: tabs,
            prop_bodyStyles: {padding: 0, maxHeight: "65vh", overflow: "auto"},
            prop_bodyClass: ["w-100"],
            prop_structureStyles: {width: "100%"},
        } as any);
        this._SETTINGS_CHILDREN.push(this._SETTINGS_TABS as any);
        return this._SETTINGS_TABS.getReactiveElement() as CoreReactive.App;
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
        const categoryOptions = [
            {id: "__all__", name: "All"},
            ...this._SETTINGS_CATEGORIES.map((category) => ({id: category.key, name: category.name})),
        ];
        const selectedCategory = this._SETTINGS_SELECTED_CATEGORY;
        const filteredEntries = this.getFilteredComponentEntries(selectedCategory);
        const currentEntry = this.getCurrentUnlistedEntry();
        if (currentEntry && selectedCategory === "__all__") filteredEntries.unshift(currentEntry);

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

            const columnCount = Math.min(12, Math.max(1, Math.floor(Number(group.descriptor?.col) || 2)));
            const collapseBody = CoreReactive.App.section({
                styles: {
                    display: "grid",
                    gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
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

    private readRegisteredComponents(): void {
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

        for (const categoryModule of Object.values(UiCategory.UI as any)) {
            visit((categoryModule as any)?.Definition);
        }
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
        return categoryKey === "__all__"
            ? [...this._SETTINGS_REGISTERED_COMPONENTS]
            : this._SETTINGS_REGISTERED_COMPONENTS.filter((entry) => entry.categoryKey === categoryKey);
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
        const currentEntry = this.getCurrentUnlistedEntry();
        if (currentEntry && categoryKey === "__all__") options.unshift(currentEntry);
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
                .concat(this.getCurrentUnlistedEntry() ? [this.getCurrentUnlistedEntry()] : [])
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
        this._SETTINGS_WINDOW?.set("prop_showAccept", this._SETTINGS_SELECTED_COMPONENT != null);
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
        if (!componentReference) return;
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

    private openCssWindow(): void {
        if (!this._CSS_WINDOW) {
            this._CSS_WINDOW = new ComponentWindow.Component({
                prop_title: "CSS",
                prop_body: CoreReactive.App.section({
                    attrs: {"data-part-name": "part-element-creator-css-window-body"},
                    styles: {width: "100%", minHeight: "240px"},
                }),
                prop_windowWidth: 560,
                prop_windowHeight: 420,
                prop_showBtnResize: false,
                prop_showAccept: false,
                prop_showCancel: false,
                // ComponentWindow.call_open() needs its structure to exist with the
                // expected id; an initially hidden structure omits that id.
                prop_isVisible: true,
            } as any);
            this._CSS_WINDOW_ELEMENT = this._CSS_WINDOW.getElement() as HTMLElement;
        }
        if (!this._CSS_WINDOW_ELEMENT?.isConnected) document.body.appendChild(this._CSS_WINDOW_ELEMENT!);
        this._CSS_WINDOW.call_open();
    }

    private disposeCssWindow(): void {
        const cssWindow = this._CSS_WINDOW as any;
        this._CSS_WINDOW = null;
        this._CSS_WINDOW_ELEMENT?.remove();
        this._CSS_WINDOW_ELEMENT = null;
        cssWindow?.getScope?.()?.dispose?.();
        cssWindow?.dispose?.();
    }

    private createRenderedComponent(componentReference: Function | null, properties: Record<string, any>): CoreReactive.App | HTMLElement | null {
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
        if (isVisible) this.startDocumentPointerTracking();
        else this.stopDocumentPointerTracking();
    }

    private startDocumentPointerTracking(): void {
        if (this._DOCUMENT_POINTER_MOVE_HANDLER) return;
        this._DOCUMENT_POINTER_MOVE_HANDLER = (event: PointerEvent) => {
            if (this._ROOT_FOCUS.get()) return;
            const target = event.target;
            const isInsideCreator = target instanceof Node && this.getElement().contains(target);
            const isInsideMenu = this._OPTIONS_MENU?.containsTarget(target) ?? false;
            if (isInsideCreator || isInsideMenu) {
                this.clearOptionsHideTimeout();
                return;
            }
            this.scheduleOptionsHide();
        };
        document.addEventListener("pointermove", this._DOCUMENT_POINTER_MOVE_HANDLER, true);
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
        if (this._ROOT_FOCUS.get() || this._OPTIONS_HIDE_TIMEOUT !== null) return;
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
            this.call_openSettings(event);
        } else if (action === "CLICK_DELETE") {
            this.openDeleteConfirm();
        } else if (action === "CLICK_CSS") {
            this.openCssWindow();
        } else if (action === "SET_COLUMN_NULL") {
            this.executeMethod("COLUMN_CHANGE", event, {COLUMN: null});
        } else if (Object.values(LayoutColumn).includes(action as LayoutColumn)) {
            this.executeMethod("COLUMN_CHANGE", event, {COLUMN: action as LayoutColumn});
        }
    }

    private openSettingsWindow(): void {
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

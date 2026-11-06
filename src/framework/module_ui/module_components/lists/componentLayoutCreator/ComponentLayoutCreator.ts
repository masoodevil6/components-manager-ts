import * as CoreComponents from "@/core_components";
import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as CoreEvent from "@/core_event";
import * as Core from "@/core";
import * as CoreLanguage from "@/core_languages";
import * as UtilOptionsStd from "@/util_options_std";
import {PartAttrDefault} from "@/core_components";
import * as UiIcons from "@/ui_icons";
import * as ComponentStructure from "../componentStructure/runtime";
import * as ComponentElementCreator from "../componentElementCreator/runtime";
import * as ComponentLayout from "../componentLayout/runtime";
import * as ComponentBorder from "../componentBorder/runtime";
import * as ComponentIcon from "../componentIcon/runtime";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import {Keys} from "../../../module_categories/languages";
import {Props, LayoutCreatorMode} from "./Props";
import type {LayoutCreatorContentItem, LayoutCreatorItemState} from "./Props";
import type {PropsConfigType as LayoutCreatorPropsConfigType, PropsType as LayoutCreatorPropsType} from "./Props";
import {Schemas} from "./Schemas";
import {Definition} from "./Definition";
import {Methods, type MethodsConfigType, type MethodsType} from "./Methods";

type LayoutCreatorConfigType = StructurePropsType & LayoutCreatorPropsType;

export class ComponentLayoutCreator extends ComponentStructure.Component {
    protected override _COMPONENT_DEFINITION = Definition;
    protected override _COMPONENT_PATTERN: any = CoreComponents.DefineProp<LayoutCreatorConfigType & Record<string, any>>({
        ...ComponentStructureTrait.props,
        ...Props,
    } as any);
    protected override _COMPONENT_SCHEMA: any = CoreComponents.DefineSchema<any, LayoutCreatorConfigType & Record<string, any>>({
        ...ComponentStructureTrait.schemas,
        ...Schemas,
    } as any);
    protected override _COMPONENT_METHODS = CoreComponents.DefineMethod<MethodsType, LayoutCreatorConfigType & Record<string, any>>({
        ...Methods,
    } as any);

    private readonly _COLUMN_CREATORS: ComponentElementCreator.Component[] = [];
    private readonly _COLUMN_ITEM_BASE_COLS = new Map<ComponentElementCreator.Component, ComponentLayout.LayoutColumn | null>();
    private readonly _COLUMN_ITEM_COL_OVERRIDES = new Map<ComponentElementCreator.Component, ComponentLayout.LayoutColumn>();
    private readonly _COLUMN_ITEM_OPTIONS = new Map<ComponentElementCreator.Component, Pick<ComponentLayout.LayoutContentItem, "class" | "styles">>();
    private readonly _COLUMN_ITEM_WORKFLOW_NAMES = new Map<ComponentElementCreator.Component, string>();
    private readonly _COLUMN_VERSION = new CoreObservable.App(0);
    private readonly _MAIN_LAYOUT_COLUMN = new CoreObservable.App(ComponentLayout.LayoutColumn.CUSTOM);
    private readonly _CHILDREN_DISPLAY_MODE = new CoreObservable.App<ComponentElementCreator.ElementCreatorMode.EDIT | ComponentElementCreator.ElementCreatorMode.RENDER>(
        ComponentElementCreator.ElementCreatorMode.EDIT,
    );
    private _MAIN_CREATOR_MODE: CoreObservable.App<ComponentElementCreator.ElementCreatorMode> | null = null;
    private _COLUMN_CREATOR_MODE: CoreObservable.App<ComponentElementCreator.ElementCreatorMode> | null = null;
    private _LAYOUT_CONTENT: CoreObservable.App<ComponentLayout.LayoutContentItem[]> | null = null;
    private _MAIN_ELEMENT_CREATOR: ComponentElementCreator.Component | null = null;
    private _ADD_COLUMN_SETTINGS_CREATOR: ComponentElementCreator.Component | null = null;
    private _ADD_COLUMN_BORDER: ComponentBorder.Component | null = null;
    private _ADD_COLUMN_ICON: ComponentIcon.Component | null = null;
    private _INITIAL_LAYOUT_CONTENT_SEEDED = false;
    private _COLUMN_ID_SEQUENCE = 0;
    private _DISPOSED = false;

    constructor(
        config?: Partial<StructurePropsType & LayoutCreatorPropsConfigType>,
        methods?: MethodsConfigType<ComponentLayoutCreator>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        super("layoutCreator", null, identity as any);
        this.renderComponent((config ?? {}) as any, (methods ?? {}) as any, identity?.events ?? null);
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        for (const creator of this._COLUMN_CREATORS.splice(0).reverse()) creator.dispose();
        this._COLUMN_ITEM_BASE_COLS.clear();
        this._COLUMN_ITEM_COL_OVERRIDES.clear();
        this._COLUMN_ITEM_OPTIONS.clear();
        this._COLUMN_ITEM_WORKFLOW_NAMES.clear();
        this._ADD_COLUMN_SETTINGS_CREATOR?.dispose();
        this._ADD_COLUMN_BORDER?.dispose();
        (this._ADD_COLUMN_ICON as any)?.getScope?.().dispose?.();
        this._MAIN_ELEMENT_CREATOR?.dispose();
        this._ADD_COLUMN_BORDER = null;
        this._ADD_COLUMN_ICON = null;
        this._MAIN_ELEMENT_CREATOR = null;
        this._ADD_COLUMN_SETTINGS_CREATOR = null;
        this._LAYOUT_CONTENT = null;
        this._MAIN_CREATOR_MODE = null;
        this._COLUMN_CREATOR_MODE = null;
        this.getScope().dispose();
    }

    override getElement(): HTMLElement {
        return super.getElement() as HTMLElement;
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
                return this.renderLayoutCreator(attrsDefault, data);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderLayoutCreator(
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
    ): CoreReactive.App {
        const mode = data?.["prop_mode"] ?? this._COMPONENT_PROPS_BIND.prop_mode;
        const components = data?.["prop_components"] ?? this._COMPONENT_PROPS_BIND.prop_components;
        const initialLayoutContent = data?.["prop_initialLayoutContent"] ?? this._COMPONENT_PROPS_BIND.prop_initialLayoutContent;
        const currentMode = CoreObservable.App.isObservable(mode) ? mode.get() : mode;
        const configuredContent = CoreObservable.App.isObservable(initialLayoutContent)
            ? initialLayoutContent.get()
            : initialLayoutContent;
        this._MAIN_CREATOR_MODE ??= CoreObservable.App.computed(
            (layoutMode: LayoutCreatorMode) => layoutMode === LayoutCreatorMode.EDIT
                ? ComponentElementCreator.ElementCreatorMode.EDIT
                : ComponentElementCreator.ElementCreatorMode.RENDER,
            [mode],
            this.getScope(),
        );
        this._COLUMN_CREATOR_MODE ??= CoreObservable.App.computed(
            (layoutMode: LayoutCreatorMode, childrenDisplayMode: ComponentElementCreator.ElementCreatorMode.EDIT | ComponentElementCreator.ElementCreatorMode.RENDER) =>
                layoutMode === LayoutCreatorMode.EDIT
                    ? childrenDisplayMode
                    : ComponentElementCreator.ElementCreatorMode.RENDER,
            [mode, this._CHILDREN_DISPLAY_MODE],
            this.getScope(),
        );

        if (currentMode === LayoutCreatorMode.EDIT && !this._INITIAL_LAYOUT_CONTENT_SEEDED && configuredContent != null) {
            this.seedInitialLayoutContent(
                this.validateInitialLayoutContent(configuredContent),
                components as CoreObservable.App<any>,
            );
            this._INITIAL_LAYOUT_CONTENT_SEEDED = true;
        }

        this._ADD_COLUMN_BORDER ??= this.createAddColumnBorder();
        this._LAYOUT_CONTENT ??= CoreObservable.App.computed(
            (
                layoutMode: LayoutCreatorMode,
                _version: number,
                configuredContent: LayoutCreatorContentItem[] | null,
                sharedColumn: ComponentLayout.LayoutColumn,
            ) => {
                if (layoutMode === LayoutCreatorMode.RENDER && configuredContent != null) {
                    return this.validateInitialLayoutContent(configuredContent);
                }
                const content: ComponentLayout.LayoutContentItem[] = this._COLUMN_CREATORS.map((creator) => ({
                    content: creator,
                    col: this.getEffectiveColumn(creator, sharedColumn),
                    ...this._COLUMN_ITEM_OPTIONS.get(creator),
                }));
                if (layoutMode === LayoutCreatorMode.EDIT && this._ADD_COLUMN_BORDER) {
                    content.push({
                        content: this._ADD_COLUMN_BORDER,
                        col: sharedColumn !== ComponentLayout.LayoutColumn.CUSTOM ? sharedColumn : this.getSuggestedColumn(),
                    });
                }
                return content;
            },
            [mode, this._COLUMN_VERSION, initialLayoutContent, this._MAIN_LAYOUT_COLUMN],
            this.getScope(),
        );

        this._MAIN_ELEMENT_CREATOR ??= new ComponentElementCreator.Component({
            prop_mode: this._MAIN_CREATOR_MODE as any,
            prop_components: components as any,
            prop_settingsUsePageSetting: true,
            prop_hasHeaderSetting: false,
            prop_hasHeaderDelete: false,
            prop_hasHeaderChildrenMode: true,
            prop_hasTabComponent: false,
            prop_component: ComponentLayout.Component,
            prop_componentProperties: {
                prop_col: ComponentLayout.LayoutColumn.CUSTOM,
                prop_layoutContent: this._LAYOUT_CONTENT as any,
            },
        } as any, {
            CLICK_DELETE: (event) => this.executeMethod("DELETE_LAYOUT", event, {}),
            COLUMN_CHANGE: (event, dataArgs) => this.updateMainLayoutColumn(dataArgs?.COLUMN, event),
            CHILDREN_DISPLAY_CHANGE: (_event, dataArgs) => this.updateChildrenDisplayMode(dataArgs?.MODE),
        } as any);

        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            styles: {width: "100%"},
            children: [this._MAIN_ELEMENT_CREATOR.getReactiveElement() as any],
        });
    }

    private validateInitialLayoutContent(content: unknown): LayoutCreatorContentItem[] {
        if (!Array.isArray(content)) {
            throw new TypeError("[ComponentLayoutCreator] prop_initialLayoutContent must be an array of component items.");
        }

        return content.map((item: any, index: number) => {
            const component = item?.content;
            if (
                !item ||
                typeof item !== "object" ||
                typeof component?.getElement !== "function" ||
                typeof component?.getComponentWorkflow !== "function"
            ) {
                throw new TypeError(
                    `[ComponentLayoutCreator] prop_initialLayoutContent[${index}].content must be a component instance.`,
                );
            }
            if (item.styles === undefined) return item as LayoutCreatorContentItem;
            return {
                ...item,
                styles: UtilOptionsStd.ValidateStandardStyles(
                    item.styles,
                    `prop_initialLayoutContent[${index}].styles`,
                ),
            } as LayoutCreatorContentItem;
        });
    }

    private seedInitialLayoutContent(
        items: LayoutCreatorContentItem[],
        components: CoreObservable.App<any>,
    ): void {
        for (const item of items) {
            const componentInstance = item.content as any;
            const componentClass = componentInstance.constructor as Function;
            const componentProperties = Object.fromEntries(
                Object.entries(componentInstance._COMPONENT_PROPS_BIND ?? {})
                    .map(([name, value]: [string, any]) => [name, typeof value?.get === "function" ? value.get() : value]),
            );
            const creator = this.createColumnCreator(
                componentClass,
                componentProperties,
                components,
                item.workflowChildName,
            );
            const defaultColumn = this.get("prop_defaultColumn") as ComponentLayout.LayoutColumn | null;
            this._COLUMN_ITEM_BASE_COLS.set(creator, item.col ?? defaultColumn);
            if (item.col != null) this._COLUMN_ITEM_COL_OVERRIDES.set(creator, item.col);
            this._COLUMN_ITEM_OPTIONS.set(creator, {
                ...(item.class !== undefined ? {class: item.class} : {}),
                ...(item.styles !== undefined ? {styles: item.styles} : {}),
            });
        }
    }

    private createColumnCreator(
        selectedComponent?: Function,
        propertiesOverride?: Record<string, any>,
        components: CoreObservable.App<any> = this._COMPONENT_PROPS_BIND.prop_components,
        workflowChildName?: string,
    ): ComponentElementCreator.Component {
        const mainComponent = this._MAIN_ELEMENT_CREATOR?.get("prop_component") as Function | null;
        const mainProperties = this._MAIN_ELEMENT_CREATOR?.get("prop_componentProperties") as Record<string, any> | null;
        const componentReference = selectedComponent ?? mainComponent ?? ComponentLayout.Component;
        const columnProperties = selectedComponent
            ? {...(propertiesOverride ?? {})}
            : mainProperties
                ? {...mainProperties, prop_layoutContent: []}
                : {
                    prop_col: ComponentLayout.LayoutColumn.CUSTOM,
                    prop_layoutContent: [],
                };
        const stableWorkflowChildName = workflowChildName ?? this.createColumnWorkflowChildName();
        let creator!: ComponentElementCreator.Component;
        creator = new ComponentElementCreator.Component({
            prop_workflowChildName: stableWorkflowChildName,
            prop_mode: this._COLUMN_CREATOR_MODE as any,
            prop_components: components as any,
            prop_settingsUsePageSetting: true,
            prop_settingsUseExternalPageSetting: true,
            prop_component: componentReference,
            // Each column starts from the main creator's current settings, with
            // its own column content and independently editable properties.
            prop_componentProperties: this.withDefaultColumnMargin(columnProperties),
        } as any, {
            CLICK_DELETE: (event) => this.removeColumnCreator(creator, event),
            COLUMN_CHANGE: (event, dataArgs) => this.updateColumnItemCol(creator, dataArgs?.COLUMN, event),
            SETTINGS_APPLY: (event) => this.notifyLayoutContentChange(event),
            STYLE_CHANGE: () => this.notifyLayoutContentChange(new Event("layout-style-change")),
        } as any);
        this._COLUMN_ITEM_BASE_COLS.set(creator, this.getSuggestedColumn());
        this._COLUMN_ITEM_WORKFLOW_NAMES.set(creator, stableWorkflowChildName);
        this._COLUMN_CREATORS.push(creator);
        return creator;
    }

    private getEffectiveColumn(
        creator: ComponentElementCreator.Component,
        sharedColumn = this._MAIN_LAYOUT_COLUMN.get(),
    ): ComponentLayout.LayoutColumn | null {
        if (this._COLUMN_ITEM_COL_OVERRIDES.has(creator)) {
            return this._COLUMN_ITEM_COL_OVERRIDES.get(creator) ?? null;
        }
        if (sharedColumn !== ComponentLayout.LayoutColumn.CUSTOM) return sharedColumn;
        return this._COLUMN_ITEM_BASE_COLS.has(creator)
            ? this._COLUMN_ITEM_BASE_COLS.get(creator) ?? null
            : this.getSuggestedColumn();
    }

    private getSuggestedColumn(): ComponentLayout.LayoutColumn {
        const sharedColumn = this._MAIN_LAYOUT_COLUMN.get();
        if (sharedColumn && sharedColumn !== ComponentLayout.LayoutColumn.CUSTOM) return sharedColumn;

        for (let index = this._COLUMN_CREATORS.length - 1; index >= 0; index--) {
            const creator = this._COLUMN_CREATORS[index];
            const column = this._COLUMN_ITEM_COL_OVERRIDES.has(creator)
                ? this._COLUMN_ITEM_COL_OVERRIDES.get(creator)
                : this._COLUMN_ITEM_BASE_COLS.get(creator);
            if (column && column !== ComponentLayout.LayoutColumn.CUSTOM) return column;
        }

        const configuredDefault = this.get("prop_defaultColumn") as ComponentLayout.LayoutColumn | null;
        return configuredDefault && configuredDefault !== ComponentLayout.LayoutColumn.CUSTOM
            ? configuredDefault
            : ComponentLayout.LayoutColumn.COL_12;
    }

    private withDefaultColumnMargin(properties: Record<string, any>): Record<string, any> {
        const result = {...(properties ?? {})};
        const configuredStyles = result.prop_structureStyles;
        const sizeName = CoreConfig.Settings.SizeName.get();
        const defaultMargin = UtilOptionsStd.Group.Margin.createPropertyCssStyles(
            UtilOptionsStd.Group.Margin.Direction.BOTTOM,
            sizeName,
        );
        const applyDefault = (value: any): Record<string, any> => {
            const styles = value && typeof value === "object" && !Array.isArray(value) ? value : {};
            const hasMarginBottom = Object.keys(styles).some((key) =>
                key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`) === UtilOptionsStd.Group.Margin.Direction.BOTTOM,
            );
            return hasMarginBottom ? {...styles} : {...styles, ...defaultMargin};
        };

        if (CoreObservable.App.isObservable(configuredStyles)) {
            result.prop_structureStyles = CoreObservable.App.computed(
                (styles: any) => applyDefault(styles),
                [configuredStyles],
                this.getScope(),
            );
        } else {
            result.prop_structureStyles = applyDefault(configuredStyles);
        }

        return result;
    }

    private createAddColumnBorder(): ComponentBorder.Component {
        const addColumnLabel = CoreLanguage.App.translate(Keys.category.components.basic.layoutCreator.editor.addColumn).get();
        this._ADD_COLUMN_ICON = new ComponentIcon.Component({
            styles: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "20px",
                height: "20px",
                flex: "0 0 20px",
            } as any,
            prop_structureStyles: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
            },
            prop_icon: UiIcons.CreateIcon(UiIcons.Src.CalcPlus.Definition, {size: 20}),
            prop_iconTitle: addColumnLabel,
            prop_iconStyles: {display: "flex", width: "100%", height: "100%", pointerEvents: "none"},
        } as any);

        const border = new ComponentBorder.Component({
            prop_borderType: ComponentBorder.BorderTypes.DASHED,
            prop_borderClass: ["w-100"],
            prop_borderStyles: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "8rem",
                padding: "0.75rem",
                cursor: "pointer",
                boxSizing: "border-box",
            },
            prop_content: this._ADD_COLUMN_ICON.getReactiveElement(),
        } as any, {
            CLICK_BORDER: (event) => this.addColumnCreator(event),
        } as any);

        const element = border.getElement() as HTMLElement;
        element.setAttribute("role", "button");
        element.setAttribute("tabindex", "0");
        element.setAttribute("aria-label", addColumnLabel);
        element.title = addColumnLabel;
        element.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            element.click();
        });

        return border;
    }

    private addColumnCreator(event: Event): void {
        if (this._DISPOSED) return;
        if (!this._ADD_COLUMN_SETTINGS_CREATOR) {
            this._ADD_COLUMN_SETTINGS_CREATOR = new ComponentElementCreator.Component({
                prop_mode: ComponentElementCreator.ElementCreatorMode.SETTING_CREATE,
                prop_components: this._COMPONENT_PROPS_BIND.prop_components as any,
                prop_settingsUsePageSetting: true,
                prop_settingsUseExternalPageSetting: true,
                prop_component: null,
                prop_componentProperties: {},
            } as any, {
                SETTINGS_APPLY: (_applyEvent, dataArgs) => {
                    if (this._DISPOSED) return;
                    const selectedComponent = dataArgs?.COMPONENT as Function | null;
                    if (!selectedComponent) return;
                    this.createColumnCreator(selectedComponent, dataArgs?.PROPERTIES as Record<string, any>);
                    this._COLUMN_VERSION.set(this._COLUMN_VERSION.get() + 1);
                    this.notifyLayoutContentChange(_applyEvent);
                },
            } as any);
        }

        this._ADD_COLUMN_SETTINGS_CREATOR.set("prop_mode", ComponentElementCreator.ElementCreatorMode.SETTING_CREATE);
        this._ADD_COLUMN_SETTINGS_CREATOR.set("prop_component", null);
        this._ADD_COLUMN_SETTINGS_CREATOR.set("prop_componentProperties", {});
        this._ADD_COLUMN_SETTINGS_CREATOR.call_openSettingsPage(
            event,
            this.getElement(),
            this.getComponentWorkflow() as CoreEvent.TStepRef,
        );
    }

    private removeColumnCreator(creator: ComponentElementCreator.Component, event: Event): void {
        const index = this._COLUMN_CREATORS.indexOf(creator);
        if (index < 0) return;
        this._COLUMN_CREATORS.splice(index, 1);
        this._COLUMN_ITEM_BASE_COLS.delete(creator);
        this._COLUMN_ITEM_COL_OVERRIDES.delete(creator);
        this._COLUMN_ITEM_OPTIONS.delete(creator);
        this._COLUMN_ITEM_WORKFLOW_NAMES.delete(creator);
        this._COLUMN_VERSION.set(this._COLUMN_VERSION.get() + 1);
        this.executeMethod("DELETE_COLUMN", event, {COLUMN_INDEX: index});
        creator.dispose();
        this.notifyLayoutContentChange(event);
    }

    private updateColumnItemCol(
        creator: ComponentElementCreator.Component,
        column: ComponentLayout.LayoutColumn | null | undefined,
        event: Event,
    ): void {
        if (!this._COLUMN_CREATORS.includes(creator)) return;
        if (column !== null && !Object.values(ComponentLayout.LayoutColumn).includes(column as ComponentLayout.LayoutColumn)) return;
        if (column == null) {
            this._COLUMN_ITEM_COL_OVERRIDES.delete(creator);
        } else {
            this._COLUMN_ITEM_COL_OVERRIDES.set(creator, column);
        }
        this._COLUMN_VERSION.set(this._COLUMN_VERSION.get() + 1);
        this.notifyLayoutContentChange(event);
    }

    private createColumnWorkflowChildName(): string {
        let name = "";
        do {
            name = `${Core.Dictionary.WorkflowNodeNames.layout}_${++this._COLUMN_ID_SEQUENCE}`;
        } while ([...this._COLUMN_ITEM_WORKFLOW_NAMES.values()].includes(name));
        return name;
    }

    private notifyLayoutContentChange(event: Event): void {
        const items: LayoutCreatorItemState[] = this._COLUMN_CREATORS.flatMap((creator) => {
            const component = creator.get("prop_component") as Function | null;
            if (!component) return [];
            const sourceProperties = creator.get("prop_componentProperties") as Record<string, any> | null;
            const properties = Object.fromEntries(
                Object.entries(sourceProperties ?? {}).map(([name, value]) => [
                    name,
                    CoreObservable.App.isObservable(value) ? value.get() : value,
                ]),
            );
            const workflowChildName = this._COLUMN_ITEM_WORKFLOW_NAMES.get(creator);
            if (!workflowChildName) return [];
            return [{
                component,
                properties,
                workflowChildName,
                col: this._COLUMN_ITEM_COL_OVERRIDES.get(creator) ?? null,
                ...this._COLUMN_ITEM_OPTIONS.get(creator),
            }];
        });
        this.executeMethod("CONTENT_CHANGE", event, {ITEMS: items});
    }

    private updateMainLayoutColumn(column: ComponentLayout.LayoutColumn | null | undefined, event: Event): void {
        if (!this._MAIN_ELEMENT_CREATOR) return;
        if (column !== null && !Object.values(ComponentLayout.LayoutColumn).includes(column as ComponentLayout.LayoutColumn)) return;
        this._MAIN_LAYOUT_COLUMN.set(column ?? ComponentLayout.LayoutColumn.CUSTOM);
        this._COLUMN_VERSION.set(this._COLUMN_VERSION.get() + 1);
        this.notifyLayoutContentChange(event);
    }

    private updateChildrenDisplayMode(mode: ComponentElementCreator.ElementCreatorMode.EDIT | ComponentElementCreator.ElementCreatorMode.RENDER | undefined): void {
        if (mode !== ComponentElementCreator.ElementCreatorMode.EDIT && mode !== ComponentElementCreator.ElementCreatorMode.RENDER) return;
        this._CHILDREN_DISPLAY_MODE.set(mode);
    }
}

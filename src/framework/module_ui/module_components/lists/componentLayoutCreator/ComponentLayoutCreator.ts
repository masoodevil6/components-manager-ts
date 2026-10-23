import * as CoreComponents from "@/core_components";
import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreLanguage from "@/core_languages";
import {PartAttrDefault} from "@/core_components";
import * as UiIcons from "@/ui_icons";
import * as ComponentStructure from "../componentStructure";
import * as ComponentElementCreator from "../componentElementCreator";
import * as ComponentLayout from "../componentLayout";
import * as ComponentBorder from "../componentBorder";
import * as ComponentIcon from "../componentIcon";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import {Keys} from "../../../module_categories/languages";
import {Props, LayoutCreatorMode} from "./Props";
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
    private readonly _COLUMN_ITEM_COLS = new Map<ComponentElementCreator.Component, ComponentLayout.LayoutColumn | null>();
    private readonly _COLUMN_VERSION = new CoreObservable.App(0);
    private _COLUMN_CREATOR_MODE: CoreObservable.App<ComponentElementCreator.ElementCreatorMode> | null = null;
    private _LAYOUT_CONTENT: CoreObservable.App<ComponentLayout.LayoutContentItem[]> | null = null;
    private _MAIN_ELEMENT_CREATOR: ComponentElementCreator.Component | null = null;
    private _ADD_COLUMN_SETTINGS_CREATOR: ComponentElementCreator.Component | null = null;
    private _ADD_COLUMN_BORDER: ComponentBorder.Component | null = null;
    private _ADD_COLUMN_ICON: ComponentIcon.Component | null = null;
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
        this._COLUMN_ITEM_COLS.clear();
        this._ADD_COLUMN_SETTINGS_CREATOR?.dispose();
        this._ADD_COLUMN_BORDER?.dispose();
        (this._ADD_COLUMN_ICON as any)?.getScope?.().dispose?.();
        this._MAIN_ELEMENT_CREATOR?.dispose();
        this._ADD_COLUMN_BORDER = null;
        this._ADD_COLUMN_ICON = null;
        this._MAIN_ELEMENT_CREATOR = null;
        this._ADD_COLUMN_SETTINGS_CREATOR = null;
        this._LAYOUT_CONTENT = null;
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
        this._COLUMN_CREATOR_MODE ??= CoreObservable.App.computed(
            (layoutMode: LayoutCreatorMode) => layoutMode === LayoutCreatorMode.EDIT
                ? ComponentElementCreator.ElementCreatorMode.EDIT
                : ComponentElementCreator.ElementCreatorMode.RENDER,
            [mode],
            this.getScope(),
        );

        if (this._COLUMN_CREATORS.length === 0) this.createColumnCreator();
        this._ADD_COLUMN_BORDER ??= this.createAddColumnBorder();
        this._LAYOUT_CONTENT ??= CoreObservable.App.computed(
            (layoutMode: LayoutCreatorMode, _version: number) => {
                const content: ComponentLayout.LayoutContentItem[] = this._COLUMN_CREATORS.map((creator) => ({
                    content: creator,
                    col: this._COLUMN_ITEM_COLS.has(creator)
                        ? this._COLUMN_ITEM_COLS.get(creator) ?? null
                        : ComponentLayout.LayoutColumn.COL_4,
                }));
                if (layoutMode === LayoutCreatorMode.EDIT && this._ADD_COLUMN_BORDER) {
                    content.push({content: this._ADD_COLUMN_BORDER, col: ComponentLayout.LayoutColumn.COL_4});
                }
                return content;
            },
            [mode, this._COLUMN_VERSION],
            this.getScope(),
        );

        this._MAIN_ELEMENT_CREATOR ??= new ComponentElementCreator.Component({
            prop_mode: this._COLUMN_CREATOR_MODE as any,
            prop_hasHeaderDelete: false,
            prop_hasTabComponent: false,
            prop_component: ComponentLayout.Component,
            prop_componentProperties: {
                prop_col: ComponentLayout.LayoutColumn.CUSTOM,
                prop_layoutContent: this._LAYOUT_CONTENT as any,
            },
        } as any, {
            CLICK_DELETE: (event) => this.executeMethod("DELETE_LAYOUT", event, {}),
            COLUMN_CHANGE: (_event, dataArgs) => this.updateMainLayoutColumn(dataArgs?.COLUMN),
        } as any);

        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            styles: {width: "100%"},
            children: [this._MAIN_ELEMENT_CREATOR.getReactiveElement() as any],
        });
    }

    private createColumnCreator(
        selectedComponent?: Function,
        propertiesOverride?: Record<string, any>,
    ): ComponentElementCreator.Component {
        const mainComponent = this._MAIN_ELEMENT_CREATOR?.get("prop_component") as Function | null;
        const mainProperties = this._MAIN_ELEMENT_CREATOR?.get("prop_componentProperties") as Record<string, any> | null;
        const componentReference = selectedComponent ?? mainComponent ?? ComponentLayout.Component;
        const columnProperties = selectedComponent
            ? {...(propertiesOverride ?? {})}
            : mainProperties
                ? {...mainProperties, prop_layoutContent: this.createColumnPreviewContent()}
                : {
                    prop_col: ComponentLayout.LayoutColumn.CUSTOM,
                    prop_layoutContent: this.createColumnPreviewContent(),
                };
        let creator!: ComponentElementCreator.Component;
        creator = new ComponentElementCreator.Component({
            prop_mode: this._COLUMN_CREATOR_MODE as any,
            prop_component: componentReference,
            // Each column starts from the main creator's current settings, with
            // its own column content and independently editable properties.
            prop_componentProperties: columnProperties,
        } as any, {
            CLICK_DELETE: (event) => this.removeColumnCreator(creator, event),
            COLUMN_CHANGE: (_event, dataArgs) => this.updateColumnItemCol(creator, dataArgs?.COLUMN),
        } as any);
        this._COLUMN_ITEM_COLS.set(creator, ComponentLayout.LayoutColumn.COL_4);
        this._COLUMN_CREATORS.push(creator);
        return creator;
    }

    private createColumnPreviewContent(): ComponentLayout.LayoutContentItem[] {
        const items: Array<{content: string; col: ComponentLayout.LayoutColumn | null}> = [
            {content: "Shared width: prop_col is applied to every item", col: null},
            {content: "CUSTOM · COL_6 · item 1", col: ComponentLayout.LayoutColumn.COL_6},
            {content: "CUSTOM · COL_6 · item 2", col: ComponentLayout.LayoutColumn.COL_6},
            {content: "CUSTOM · COL_4 · item 1", col: ComponentLayout.LayoutColumn.COL_4},
            {content: "CUSTOM · COL_4 · item 2", col: ComponentLayout.LayoutColumn.COL_4},
            {content: "CUSTOM · COL_4 · item 3", col: ComponentLayout.LayoutColumn.COL_4},
            {content: "Per-item classes and styles are supported", col: null},
            {content: "Add a column to compare its layout", col: null},
        ];

        return items.map((item) => ({
            ...item,
            class: ["border", "rounded", "p-2", "h-100"],
            styles: {
                minHeight: "3rem",
                display: "flex",
                alignItems: "center",
                boxSizing: "border-box",
            },
        }));
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
        this._ADD_COLUMN_SETTINGS_CREATOR ??= new ComponentElementCreator.Component({
            prop_mode: ComponentElementCreator.ElementCreatorMode.SETTING_CREATE,
            prop_component: null,
            prop_componentProperties: {},
        } as any, {
            SETTINGS_APPLY: (_applyEvent, dataArgs) => {
                if (this._DISPOSED) return;
                const selectedComponent = dataArgs?.COMPONENT as Function | null;
                if (!selectedComponent) return;
                this.createColumnCreator(selectedComponent, dataArgs?.PROPERTIES as Record<string, any>);
                this._COLUMN_VERSION.set(this._COLUMN_VERSION.get() + 1);
            },
        } as any);

        this._ADD_COLUMN_SETTINGS_CREATOR.set("prop_mode", ComponentElementCreator.ElementCreatorMode.SETTING_CREATE);
        this._ADD_COLUMN_SETTINGS_CREATOR.set("prop_component", null);
        this._ADD_COLUMN_SETTINGS_CREATOR.set("prop_componentProperties", {});
        this._ADD_COLUMN_SETTINGS_CREATOR.call_openSettings(event);
    }

    private removeColumnCreator(creator: ComponentElementCreator.Component, event: Event): void {
        const index = this._COLUMN_CREATORS.indexOf(creator);
        if (index < 0) return;
        this._COLUMN_CREATORS.splice(index, 1);
        this._COLUMN_ITEM_COLS.delete(creator);
        this._COLUMN_VERSION.set(this._COLUMN_VERSION.get() + 1);
        this.executeMethod("DELETE_COLUMN", event, {COLUMN_INDEX: index});
        creator.dispose();
    }

    private updateColumnItemCol(
        creator: ComponentElementCreator.Component,
        column: ComponentLayout.LayoutColumn | null | undefined,
    ): void {
        if (!this._COLUMN_CREATORS.includes(creator)) return;
        if (column !== null && !Object.values(ComponentLayout.LayoutColumn).includes(column as ComponentLayout.LayoutColumn)) return;
        this._COLUMN_ITEM_COLS.set(creator, column ?? null);
        this._COLUMN_VERSION.set(this._COLUMN_VERSION.get() + 1);
    }

    private updateMainLayoutColumn(column: ComponentLayout.LayoutColumn | null | undefined): void {
        if (!this._MAIN_ELEMENT_CREATOR) return;
        if (column !== null && !Object.values(ComponentLayout.LayoutColumn).includes(column as ComponentLayout.LayoutColumn)) return;
        const currentProperties = this._MAIN_ELEMENT_CREATOR.get("prop_componentProperties") as Record<string, any> ?? {};
        this._MAIN_ELEMENT_CREATOR.set("prop_componentProperties", {
            ...currentProperties,
            prop_col: column ?? ComponentLayout.LayoutColumn.CUSTOM,
        });
    }
}

import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as CoreConfig from "@/core_configs";
import * as CoreLanguage from "@/core_languages";
import * as UtilStyle from "@/util_styles";
import * as UiIcons from "@/ui_icons";
import {PartAttrDefault} from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import * as ComponentBorder from "../componentBorder";
import * as ComponentInputSimple from "../componentInputSimple";
import * as ComponentIcon from "../componentIcon";
import * as ComponentMenuMore from "../componentMenuMore";
import {ComponentJsonTreeBase} from "./ComponentJsonTreeBase";
import type {PropsConfigType} from "./Props";
import {Schemas} from "./Schemas";
import type {MethodsConfigType} from "./Methods";
import {createJsonTreeStep} from "./Step";
import {getJsonChildren, isIsoDateTimeString, isJsonBranch, stringifyJson, type JsonValue} from "./Types";
import {Keys} from "../../../module_categories/languages";

type NodeMatch = {visible: Set<string>; forcedExpanded: Set<string>; direct: Set<string>};

export class ComponentJsonTree extends ComponentJsonTreeBase {
    private _BORDER: InstanceType<typeof ComponentBorder.Component> | null = null;
    private _TOOLBAR_BORDER: InstanceType<typeof ComponentBorder.Component> | null = null;
    private _SEARCH: InstanceType<typeof ComponentInputSimple.Component> | null = null;
    private _TOGGLE_ICON_COLLAPSE: InstanceType<typeof ComponentIcon.Component> | null = null;
    private _TOGGLE_ICON_EXPAND: InstanceType<typeof ComponentIcon.Component> | null = null;
    private _COPY_ICON: InstanceType<typeof ComponentIcon.Component> | null = null;
    private _COPY_SUCCESS_ICON: InstanceType<typeof ComponentIcon.Component> | null = null;
    private _TOOLBAR_MENU: InstanceType<typeof ComponentMenuMore.Component> | null = null;
    private _TOOLBAR_ELEMENT: HTMLElement | null = null;
    private _TREE_ELEMENT: HTMLElement | null = null;
    private readonly _EXPANDED = new Set<string>();
    private _QUERY = "";
    private _DISPOSED = false;

    constructor(config?: Partial<StructurePropsType & PropsConfigType>, methods?: MethodsConfigType<ComponentJsonTree>, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}) {
        super(identity, createJsonTreeStep());
        this.renderComponent(config as any, methods as any, identity?.events ?? null);
        this.initializeExpandedPaths();
        this.renderTree();
        this._COMPONENT_PROPS_BIND.prop_data.subscribe(() => {
            this.initializeExpandedPaths();
            this.renderTree();
        }, this.getScope());
        for (const key of ["prop_initialExpandDepth", "prop_maxDepth", "prop_maxNodes", "prop_emptyText"] as const) {
            this._COMPONENT_PROPS_BIND[key].subscribe(() => {
                this.initializeExpandedPaths();
                this.renderTree();
            }, this.getScope());
        }
        for (const key of ["prop_showSearch", "prop_showExpandControls", "prop_showCopyButton", "prop_searchPlaceholder"] as const) {
            this._COMPONENT_PROPS_BIND[key].subscribe(() => this.renderToolbar(), this.getScope());
        }
        CoreConfig.Settings.SizeName.observable().subscribe(() => this.renderTree(), this.getScope());
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this.getScope().dispose();
        this._SEARCH?.dispose();
        this._SEARCH = null;
        this.disposeIconComponent(this._TOGGLE_ICON_COLLAPSE);
        this._TOGGLE_ICON_COLLAPSE = null;
        this.disposeIconComponent(this._TOGGLE_ICON_EXPAND);
        this._TOGGLE_ICON_EXPAND = null;
        this.disposeIconComponent(this._COPY_ICON);
        this._COPY_ICON = null;
        this.disposeIconComponent(this._COPY_SUCCESS_ICON);
        this._COPY_SUCCESS_ICON = null;
        this._TOOLBAR_MENU?.dispose();
        this._TOOLBAR_MENU = null;
        this._BORDER?.dispose();
        this._BORDER = null;
        this._TOOLBAR_BORDER?.dispose();
        this._TOOLBAR_BORDER = null;
        this._TOOLBAR_ELEMENT = null;
        this._TREE_ELEMENT = null;
        this.disposeStep();
    }

    override renderContentComponent(_attrs: PartAttrDefault, _data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        return this.executeSchemaPart(Schemas.ROOT.part, {});
    }

    override renderManagerComponent(partName: string, attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: any): CoreReactive.App {
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrs, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrs, data);
            case Schemas.ROOT.part:
                return this.renderRoot();
            case Schemas.TOOLBAR.part:
                return this.renderToolbarPart();
            case Schemas.TREE.part:
                return this.renderTreePart();
            default:
                return super.renderManagerComponent(partName, attrs, data, extra);
        }
    }

    getToolbarElement(): HTMLElement | null {
        return this._TOOLBAR_BORDER ? this._TOOLBAR_BORDER.getElement() as HTMLElement : null;
    }

    private renderRoot(): CoreReactive.App {
        const content = CoreReactive.App.section({
            attrs: {"data-part-name": "part-json-tree-content"},
            styles: {display: "flex", flexDirection: "column", flex: "1 1 auto", width: "100%", height: "100%", minWidth: "0", minHeight: "0", overflow: "hidden", boxSizing: "border-box"},
            children: [this.executeSchemaPart(Schemas.TOOLBAR.part, {}) as any, this.executeSchemaPart(Schemas.TREE.part, {}) as any],
        });
        const bind = this._COMPONENT_PROPS_BIND;
        const config: Record<string, any> = {
            selector: bind.prop_componentBorderSelector,
            append: bind.prop_componentBorderAppend,
            classList: bind.prop_componentBorderClassList,
            styles: CoreObservable.App.computed((provided: Record<string, any> | null) => ({display: "block", width: "100%", minWidth: "0", ...(provided ?? {})}), [bind.prop_componentBorderElementStyles], this.getScope()),
            prop_show: bind.prop_componentBorderShow,
            prop_structureClass: bind.prop_componentBorderStructureClass,
            prop_structureStyles: bind.prop_componentBorderStructureStyles,
            prop_content: content,
        };
        const aliases: Array<[string, string]> = [
            ["prop_componentBorderContentSize", "prop_contentSize"], ["prop_componentBorderContentColor", "prop_contentColor"],
            ["prop_componentBorderContentColorHover", "prop_contentColor_hover"], ["prop_componentBorderContentBackgroundColor", "prop_contentBackgroundColor"],
            ["prop_componentBorderContentBackgroundColorHover", "prop_contentBackgroundColor_hover"], ["prop_componentBorderColor", "prop_borderColor"],
            ["prop_componentBorderColorHover", "prop_borderColor_hover"], ["prop_componentBorderClass", "prop_borderClass"],
            ["prop_componentBorderStyles", "prop_borderStyles"], ["prop_componentBorderType", "prop_borderType"],
            ["prop_componentBorderOpacity", "prop_borderOpacity"], ["prop_componentBorderArrowType", "prop_borderArrowType"],
            ["prop_componentBorderArrowWidth", "prop_borderArrowWidth"], ["prop_componentBorderArrowPosition", "prop_borderArrowPosition"],
            ["prop_componentBorderMinWidth", "prop_minWidth"], ["prop_componentBorderWidth", "prop_width"],
            ["prop_componentBorderTopLeftRadiusHas", "prop_borderTopLeftRadiusHas"], ["prop_componentBorderTopRightRadiusHas", "prop_borderTopRightRadiusHas"],
            ["prop_componentBorderBottomLeftRadiusHas", "prop_borderBottomLeftRadiusHas"], ["prop_componentBorderBottomRightRadiusHas", "prop_borderBottomRightRadiusHas"],
            ["prop_componentBorderTopHas", "prop_borderTopHas"], ["prop_componentBorderRightHas", "prop_borderRightHas"],
            ["prop_componentBorderBottomHas", "prop_borderBottomHas"], ["prop_componentBorderLeftHas", "prop_borderLeftHas"],
        ];
        for (const [alias, target] of aliases) config[target] = bind[alias];
        config.prop_borderTopLeftRadiusHas = false;
        config.prop_borderTopRightRadiusHas = false;
        config.prop_borderBottomLeftRadiusHas = false;
        config.prop_borderBottomRightRadiusHas = false;
        this._BORDER = new ComponentBorder.Component(config as any);
        return this._BORDER.getReactiveElement() as CoreReactive.App;
    }

    private renderToolbarPart(): CoreReactive.App {
        const toolbar = CoreReactive.App.section({
            attrs: {"data-part-name": "part-json-tree-toolbar"},
            styles: {display: "flex", alignItems: "center", flexWrap: "wrap", gap: "var(--marginMedium)", width: "100%", minWidth: "0", padding: "var(--paddingMedium)", boxSizing: "border-box"},
        });
        this._TOOLBAR_ELEMENT = toolbar.getElement() as HTMLElement;
        this.renderToolbar();

        const bind = this._COMPONENT_PROPS_BIND;
        this._TOOLBAR_BORDER = new ComponentBorder.Component({
            styles: {display: "block", width: "100%", minWidth: "0"},
            prop_content: toolbar,
            prop_borderClass: [],
            prop_contentBackgroundColor: bind.prop_headerBackgroundColor as any,
            prop_borderTopHas: false,
            prop_borderRightHas: false,
            prop_borderBottomHas: false,
            prop_borderLeftHas: false,
            prop_borderTopLeftRadiusHas: false,
            prop_borderTopRightRadiusHas: false,
            prop_borderBottomLeftRadiusHas: false,
            prop_borderBottomRightRadiusHas: false,
        } as any);
        return this._TOOLBAR_BORDER.getReactiveElement() as CoreReactive.App;
    }

    private renderToolbar(): void {
        const toolbar = this._TOOLBAR_ELEMENT;
        if (!toolbar || this._DISPOSED) return;
        this._SEARCH?.dispose();
        this._SEARCH = null;
        this._TOOLBAR_MENU?.dispose();
        this._TOOLBAR_MENU = null;
        toolbar.replaceChildren();
        const bind = this._COMPONENT_PROPS_BIND;

        if (bind.prop_showSearch.get()) {
            this._SEARCH = new ComponentInputSimple.Component({
                styles: {display: "block", flex: "1 1 220px", minWidth: "160px", maxWidth: "420px", alignSelf: "center"},
                prop_inputType: ComponentInputSimple.InputSimpleTypes.SEARCH,
                prop_inputValue: this._QUERY,
                prop_inputPlaceholder: bind.prop_searchPlaceholder as any,
            } as any, {
                INPUT_CHANGE: (_event, _dataArgs, componentArgs) => {
                    this._QUERY = String(componentArgs?.VALUE ?? "");
                    this.executeMethod("SEARCH_CHANGE", new Event("json-tree-search"), {QUERY: this._QUERY});
                    this.renderTree();
                },
            } as any);
            toolbar.append(this._SEARCH.getElement() as HTMLElement);
        }
        const menuItems: ComponentMenuMore.MenuMoreEntry[] = [];
        if (bind.prop_showExpandControls.get()) {
            menuItems.push(
                {id: "json-tree-expand-all", icon: UiIcons.Src.TreeNodeExpand.Definition, action: "expand-all"},
                {id: "json-tree-collapse-all", icon: UiIcons.Src.TreeNodeCollapse.Definition, action: "collapse-all"},
            );
        }
        if (bind.prop_showCopyButton.get()) {
            menuItems.push({id: "json-tree-copy", icon: UiIcons.Src.FileCopy.Definition, action: "copy-json"});
        }
        if (menuItems.length > 0) {
            this._TOOLBAR_MENU = new ComponentMenuMore.Component({
                styles: {
                    display: "block",
                    width: "fit-content",
                    maxWidth: "100%",
                    minWidth: "0",
                    flex: "0 0 auto",
                    marginInlineStart: "auto",
                },
                prop_orientation: ComponentMenuMore.MenuMoreOrientation.HORIZONTAL,
                prop_direction: ComponentMenuMore.MenuMoreDirection.AUTO,
                prop_isFullWidth: false,
                prop_items: menuItems,
                prop_menuBackgroundColor: bind.prop_headerBackgroundColor as any,
            } as any, {
                SELECT_ITEM: (event, dataArgs) => {
                    switch (dataArgs?.ITEM?.action) {
                        case "expand-all":
                            this.expandAll();
                            break;
                        case "collapse-all":
                            this.collapseAll();
                            break;
                        case "copy-json":
                            void this.copyData();
                            break;
                    }
                },
            } as any);
            toolbar.append(this._TOOLBAR_MENU.getElement());
            const accessibleLabels = menuItems.map((item) => {
                if (item.id === "json-tree-expand-all") return this.text("expandAll");
                if (item.id === "json-tree-collapse-all") return this.text("collapseAll");
                return this.text("copy");
            });
            this._TOOLBAR_MENU.getElement().querySelectorAll<HTMLButtonElement>("button[role='menuitem']")
                .forEach((button, index) => {
                    const label = accessibleLabels[index];
                    if (!label) return;
                    button.title = label;
                    button.setAttribute("aria-label", label);
                });
        }
    }

    private createNodeCopyButton(path: string, label: string, row: HTMLElement): HTMLButtonElement {
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.partName = "part-json-tree-copy-node";
        button.dataset.path = path;
        button.dataset.pathLabel = label;
        button.title = `${this.text("copy")}: ${label}`;
        button.setAttribute("aria-label", button.title);
        button.style.display = "inline-flex";
        button.style.alignItems = "center";
        button.style.justifyContent = "center";
        button.style.flex = "0 0 24px";
        button.style.width = "24px";
        button.style.height = "24px";
        button.style.marginInlineStart = "auto";
        button.style.padding = "0";
        button.style.border = "1px solid transparent";
        button.style.borderRadius = "var(--borderRadiusSmall)";
        button.style.backgroundColor = "transparent";
        button.style.color = "var(--primaryColor1)";
        button.style.opacity = "0";
        button.style.pointerEvents = "none";
        button.style.cursor = "pointer";
        button.style.transition = "opacity 120ms ease, background-color 120ms ease, color 120ms ease";
        this.setCopyButtonIcon(button, false);
        button.title = `${this.text("copy")}: ${label}`;
        button.addEventListener("focus", () => {
            button.style.opacity = "1";
            button.style.pointerEvents = "auto";
            button.style.backgroundColor = "var(--shanColor3)";
        });
        button.addEventListener("blur", () => {
            button.style.backgroundColor = "transparent";
            if (!row.matches(":hover")) {
                button.style.opacity = "0";
                button.style.pointerEvents = "none";
            }
        });
        button.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            void this.copyNodeData(path, button);
        });
        return button;
    }

    private setCopyButtonIcon(button: HTMLButtonElement, success: boolean): void {
        const iconComponent = this.getCopyIcon(success);
        const sourceSvg = (iconComponent.getElement() as HTMLElement).querySelector("svg");
        if (!sourceSvg) return;
        const svg = sourceSvg.cloneNode(true) as SVGSVGElement;
        svg.removeAttribute("role");
        svg.removeAttribute("aria-label");
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("focusable", "false");
        svg.style.display = "block";
        svg.style.width = "15px";
        svg.style.height = "15px";
        svg.style.pointerEvents = "none";
        if (success) {
            button.style.color = "var(--successColor1)";
            button.style.backgroundColor = "var(--successColor5)";
            button.title = this.text("copySuccess");
        } else {
            button.style.color = "var(--primaryColor1)";
            button.style.backgroundColor = button.matches(":focus") ? "var(--shanColor3)" : "transparent";
            button.title = this.text("copy");
        }
        button.replaceChildren(svg);
    }

    private renderTreePart(): CoreReactive.App {
        const tree = CoreReactive.App.section({
            attrs: {"data-part-name": "part-json-tree-tree", role: "tree", "aria-label": "JSON tree"},
            styles: {display: "block", flex: "1 1 auto", width: "100%", minWidth: "0", minHeight: "220px", maxHeight: "min(65vh, 720px)", overflow: "auto", padding: "var(--paddingMedium)", boxSizing: "border-box", backgroundColor: "var(--shanColor1)", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", fontSize: "0.88rem", lineHeight: "1.65", color: "var(--darkColor1)"},
        });
        this._TREE_ELEMENT = tree.getElement() as HTMLElement;
        this._TREE_ELEMENT.addEventListener("click", (event) => this.onTreeClick(event));
        this.renderTree();
        return tree;
    }

    private renderTree(): void {
        const host = this._TREE_ELEMENT;
        if (!host || this._DISPOSED) return;
        host.replaceChildren();
        const data = this._COMPONENT_PROPS_BIND.prop_data.get() as JsonValue | undefined;
        if (data === undefined) {
            this.appendMessage(host, this.readText(this._COMPONENT_PROPS_BIND.prop_emptyText.get()));
            return;
        }

        const query = this._QUERY.trim().toLocaleLowerCase();
        const match = this.findMatches(data, query);
        const maxNodes = this.limit(this._COMPONENT_PROPS_BIND.prop_maxNodes.get(), 2000, 1, 50000);
        const maxDepth = this.limit(this._COMPONENT_PROPS_BIND.prop_maxDepth.get(), 32, 0, 256);
        let rendered = 0;
        let truncated = false;
        const renderNode = (key: string, value: JsonValue, path: string, depth: number, isRoot = false): void => {
            if (rendered >= maxNodes) { truncated = true; return; }
            if (query && !match.visible.has(path)) return;
            rendered += 1;
            const children = getJsonChildren(value);
            const branch = isJsonBranch(value) && children.length > 0;
            const row = document.createElement("div");
            row.dataset.partName = "part-json-tree-node";
            row.dataset.path = path;
            row.setAttribute("role", "treeitem");
            row.setAttribute("aria-level", String(depth + 1));
            row.style.display = "flex";
            row.style.alignItems = "center";
            row.style.minWidth = "0";
            row.style.minHeight = "30px";
            row.style.paddingInlineStart = `${8 + depth * 20}px`;
            row.style.paddingInlineEnd = "8px";
            row.style.borderRadius = "var(--borderRadiusMedium)";
            row.style.boxSizing = "border-box";
            row.style.gap = "7px";
            row.style.transition = "background-color 120ms ease";
            if (depth > 0) row.style.borderInlineStart = "1px solid var(--secondaryColor3)";
            if (branch) this.appendToggle(row, path, key, this.isExpanded(path, match));
            else {
                const spacer = document.createElement("span");
                spacer.setAttribute("aria-hidden", "true");
                spacer.style.display = "inline-block";
                spacer.style.width = "18px";
                spacer.style.flex = "0 0 18px";
                row.append(spacer);
            }

            row.append(this.dataTypeBadge(value));
            const keyElement = this.token("part-json-tree-key", isRoot ? "JSON" : key, "var(--primaryColor1)", true, query);
            keyElement.style.flex = "0 1 auto";
            keyElement.style.maxWidth = "40%";
            keyElement.style.minWidth = "0";
            keyElement.style.overflow = "hidden";
            keyElement.style.textOverflow = "ellipsis";
            keyElement.style.whiteSpace = "nowrap";
            row.append(keyElement);
            if (!isRoot) {
                const separator = document.createElement("span");
                separator.textContent = ":";
                separator.style.color = "var(--darkColor2)";
                separator.style.marginInlineEnd = "2px";
                row.append(separator);
            }

            if (branch) {
                const expanded = this.isExpanded(path, match);
                const summary = document.createElement("span");
                summary.dataset.partName = "part-json-tree-preview";
                summary.style.color = "var(--darkColor2)";
                summary.style.padding = "1px 7px";
                summary.style.borderRadius = "999px";
                summary.style.backgroundColor = "var(--shanColor3)";
                summary.style.whiteSpace = "nowrap";
                summary.style.fontSize = "0.82em";
                summary.textContent = Array.isArray(value) ? (expanded ? "[" : "[...] " + children.length) : (expanded ? "{" : "{...} " + children.length);
                row.append(summary);
                if (!expanded && children.length === 0) summary.textContent = Array.isArray(value) ? (expanded ? "[" : "[...] " + children.length) : (expanded ? "{" : "{...} " + children.length);
            } else {
                const valueElement = this.valueToken(value, query);
                valueElement.style.minWidth = "0";
                valueElement.style.flex = "1 1 auto";
                valueElement.style.overflowWrap = "anywhere";
                row.append(valueElement);
            }
            const copyButton = this.createNodeCopyButton(path, isRoot ? "JSON" : key, row);
            row.append(copyButton);
            row.addEventListener("mouseenter", () => {
                row.style.backgroundColor = "var(--secondaryColor5)";
                copyButton.style.opacity = "1";
                copyButton.style.pointerEvents = "auto";
            });
            row.addEventListener("mouseleave", () => {
                row.style.backgroundColor = "transparent";
                if (document.activeElement !== copyButton) {
                    copyButton.style.opacity = "0";
                    copyButton.style.pointerEvents = "none";
                }
            });
            host.append(row);

            if (!branch || !this.isExpanded(path, match)) return;
            if (depth >= maxDepth) {
                truncated = true;
                this.appendInlineNotice(host, depth + 1, "...");
                return;
            }
            for (const [childKey, childValue] of children) {
                if (rendered >= maxNodes) { truncated = true; break; }
                const childPath = `${path}/${encodeURIComponent(childKey)}`;
                if (query && !match.visible.has(childPath)) continue;
                renderNode(childKey, childValue, childPath, depth + 1);
            }
            const closing = document.createElement("div");
            closing.dataset.partName = "part-json-tree-close";
            closing.style.paddingInlineStart = `${depth * 20 + 31}px`;
            closing.style.height = "12px";
            closing.style.color = "var(--darkColor2)";
            closing.style.fontSize = "0.78em";
            closing.textContent = Array.isArray(value) ? "]" : "}";
            host.append(closing);
        };

        if (query && match.visible.size === 0) {
            this.appendMessage(host, this.text("noResults"));
            return;
        }
        renderNode("root", data, "$", 0, true);
        if (truncated) this.appendMessage(host, this.text("truncated"), true);
    }

    private appendToggle(row: HTMLElement, path: string, label: string, expanded: boolean): void {
        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.dataset.nodeToggle = "true";
        toggle.dataset.path = path;
        toggle.setAttribute("aria-expanded", String(expanded));
        toggle.setAttribute("aria-label", `${expanded ? this.text("collapse") : this.text("expand")} ${label}`);
        toggle.style.display = "inline-flex";
        toggle.style.alignItems = "center";
        toggle.style.justifyContent = "center";
        toggle.style.width = "18px";
        toggle.style.height = "18px";
        toggle.style.flex = "0 0 18px";
        toggle.style.padding = "0";
        toggle.style.border = "0";
        toggle.style.borderRadius = "4px";
        toggle.style.background = "transparent";
        toggle.style.color = "var(--primaryColor1)";
        toggle.style.cursor = "pointer";
        const iconComponent = this.getToggleIcon(expanded);
        const sourceSvg = (iconComponent.getElement() as HTMLElement).querySelector("svg");
        if (sourceSvg) {
            const icon = sourceSvg.cloneNode(true) as SVGSVGElement;
            icon.removeAttribute("role");
            icon.removeAttribute("aria-label");
            icon.setAttribute("aria-hidden", "true");
            icon.setAttribute("focusable", "false");
            icon.style.display = "block";
            icon.style.width = "14px";
            icon.style.height = "14px";
            icon.style.pointerEvents = "none";
            toggle.append(icon);
        }
        toggle.style.transition = "background-color 120ms ease";
        toggle.addEventListener("mouseenter", () => { toggle.style.backgroundColor = "var(--shanColor3)"; });
        toggle.addEventListener("mouseleave", () => { toggle.style.backgroundColor = "transparent"; });
        row.append(toggle);
    }

    private getToggleIcon(expanded: boolean): InstanceType<typeof ComponentIcon.Component> {
        if (expanded) {
            this._TOGGLE_ICON_COLLAPSE ??= this.createIconComponent(UiIcons.Src.TreeNodeCollapse.Definition);
            return this._TOGGLE_ICON_COLLAPSE;
        }
        this._TOGGLE_ICON_EXPAND ??= this.createIconComponent(UiIcons.Src.TreeNodeExpand.Definition);
        return this._TOGGLE_ICON_EXPAND;
    }

    private getCopyIcon(success: boolean): InstanceType<typeof ComponentIcon.Component> {
        if (success) {
            this._COPY_SUCCESS_ICON ??= this.createIconComponent(UiIcons.Src.StatusIsTrue.Definition, "var(--successColor1)");
            return this._COPY_SUCCESS_ICON;
        }
        this._COPY_ICON ??= this.createIconComponent(UiIcons.Src.FileCopy.Definition);
        return this._COPY_ICON;
    }

    private createIconComponent(definition: UiIcons.IIconDefinition, color = "var(--primaryColor1)"): InstanceType<typeof ComponentIcon.Component> {
        return new ComponentIcon.Component({
            prop_icon: UiIcons.CreateIcon(definition, {size: 14, primaryColor: color}),
            prop_iconStyles: {display: "flex", width: "14px", height: "14px", pointerEvents: "none"},
            prop_structureStyles: {display: "flex", width: "14px", height: "14px", alignItems: "center", justifyContent: "center"},
            styles: {display: "inline-flex", width: "14px", height: "14px", alignItems: "center", justifyContent: "center"},
        } as any);
    }

    private disposeIconComponent(icon: InstanceType<typeof ComponentIcon.Component> | null): void {
        if (!icon) return;
        icon.disposeStep();
        icon.getScope().dispose();
    }

    private valueToken(value: JsonValue, query: string): HTMLElement {
        if (value instanceof Date) {
            return this.token("part-json-tree-date", JSON.stringify(value.toISOString()), "var(--secondaryColor1)", false, query);
        }
        if (typeof value === "string" && isIsoDateTimeString(value)) {
            return this.token("part-json-tree-date", JSON.stringify(value), "var(--secondaryColor1)", false, query);
        }
        if (typeof value === "string") return this.token("part-json-tree-string", JSON.stringify(value), "var(--successColor1)", false, query);
        if (typeof value === "number") return this.token("part-json-tree-number", String(value), "var(--infoColor1)", false, query);
        if (typeof value === "boolean") return this.token("part-json-tree-boolean", String(value), "var(--errorColor1)", false, query);
        if (value === null) return this.token("part-json-tree-null", "null", "var(--darkColor2)", false, query);
        if (Array.isArray(value)) return this.token("part-json-tree-value", value.length ? "[...]" : "[]", "var(--darkColor2)", false, query);
        const object = value as Record<string, JsonValue>;
        return this.token("part-json-tree-value", Object.keys(object).length ? "{...}" : "{}", "var(--darkColor2)", false, query);
    }

    private dataTypeBadge(value: JsonValue): HTMLElement {
        let type: string;
        let color = "var(--primaryColor2)";
        if (value === null) {
            type = "null";
            color = "var(--darkColor2)";
        } else if (value instanceof Date || (typeof value === "string" && isIsoDateTimeString(value))) {
            type = "date";
            color = "var(--secondaryColor1)";
        } else if (Array.isArray(value)) {
            type = "array";
        } else if (typeof value === "object") {
            type = "object";
        } else {
            type = typeof value;
            if (type === "string") color = "var(--successColor1)";
            else if (type === "number") color = "var(--infoColor1)";
            else if (type === "boolean") color = "var(--errorColor1)";
        }

        const badge = document.createElement("span");
        badge.dataset.partName = "part-json-tree-data-type";
        badge.textContent = type;
        badge.setAttribute("aria-label", `Data type: ${type}`);
        badge.style.display = "inline-flex";
        badge.style.alignItems = "center";
        badge.style.flex = "0 0 auto";
        badge.style.padding = "1px 5px";
        badge.style.border = "1px solid var(--darkColor4)";
        badge.style.borderRadius = "var(--borderRadiusSmall)";
        badge.style.backgroundColor = "var(--shanColor2)";
        badge.style.color = color;
        badge.style.fontFamily = "ui-sans-serif, system-ui, sans-serif";
        badge.style.fontSize = "0.68rem";
        badge.style.lineHeight = "1.25";
        return badge;
    }

    private token(part: string, value: string, color: string, bold: boolean, query: string): HTMLElement {
        const element = document.createElement("span");
        element.dataset.partName = part;
        element.style.color = color;
        if (bold) element.style.fontWeight = "600";
        this.appendHighlightedText(element, value, query);
        return element;
    }

    private appendHighlightedText(parent: HTMLElement, text: string, query: string): void {
        if (!query) { parent.textContent = text; return; }
        const lower = text.toLocaleLowerCase();
        let start = 0;
        let found = lower.indexOf(query, start);
        if (found < 0) { parent.textContent = text; return; }
        while (found >= 0) {
            if (found > start) parent.append(document.createTextNode(text.slice(start, found)));
            const mark = document.createElement("mark");
            mark.textContent = text.slice(found, found + query.length);
            mark.style.backgroundColor = "var(--secondaryColor3)";
            mark.style.color = "var(--darkColor1)";
            mark.style.borderRadius = "2px";
            parent.append(mark);
            start = found + query.length;
            found = lower.indexOf(query, start);
        }
        if (start < text.length) parent.append(document.createTextNode(text.slice(start)));
    }

    private findMatches(data: JsonValue, query: string): NodeMatch {
        const result: NodeMatch = {visible: new Set(), forcedExpanded: new Set(), direct: new Set()};
        if (!query) return result;
        const visit = (value: JsonValue, path: string, key: string, ancestors: string[]): boolean => {
            const searchableValue = value instanceof Date
                ? value.toISOString()
                : value === null || typeof value !== "object" ? String(value) : "";
            const selfText = `${key} ${searchableValue}`.toLocaleLowerCase();
            const ownMatch = selfText.includes(query);
            let descendantMatch = false;
            if (isJsonBranch(value)) {
                for (const [childKey, childValue] of getJsonChildren(value)) {
                    const childPath = `${path}/${encodeURIComponent(childKey)}`;
                    if (visit(childValue, childPath, childKey, [...ancestors, path])) descendantMatch = true;
                }
            }
            if (ownMatch) result.direct.add(path);
            if (ownMatch || descendantMatch) {
                result.visible.add(path);
                for (const ancestor of ancestors) {
                    result.visible.add(ancestor);
                    result.forcedExpanded.add(ancestor);
                }
                return true;
            }
            return false;
        };
        visit(data, "$", "root", []);
        return result;
    }

    private isExpanded(path: string, matches: NodeMatch): boolean {
        return matches.forcedExpanded.has(path) || this._EXPANDED.has(path);
    }

    private initializeExpandedPaths(): void {
        this._EXPANDED.clear();
        const initialDepth = this.limit(this._COMPONENT_PROPS_BIND.prop_initialExpandDepth.get(), 1, 0, 256);
        const maxDepth = this.limit(this._COMPONENT_PROPS_BIND.prop_maxDepth.get(), 32, 0, 256);
        const maxNodes = this.limit(this._COMPONENT_PROPS_BIND.prop_maxNodes.get(), 2000, 1, 50000);
        const data = this._COMPONENT_PROPS_BIND.prop_data.get() as JsonValue | undefined;
        if (data === undefined) return;
        let visited = 0;
        const visit = (value: JsonValue, path: string, depth: number) => {
            if (visited++ >= maxNodes || depth >= initialDepth || depth >= maxDepth || !isJsonBranch(value)) return;
            const children = getJsonChildren(value);
            if (!children.length) return;
            this._EXPANDED.add(path);
            for (const [key, child] of children) visit(child, `${path}/${encodeURIComponent(key)}`, depth + 1);
        };
        visit(data, "$", 0);
    }

    private expandAll(): void {
        const count = this.setAllExpanded(true);
        this.executeMethod("EXPAND_ALL", new Event("json-tree-expand-all"), {COUNT: count});
        this.renderTree();
    }

    private collapseAll(): void {
        const count = this._EXPANDED.size;
        this._EXPANDED.clear();
        this.executeMethod("COLLAPSE_ALL", new Event("json-tree-collapse-all"), {COUNT: count});
        this.renderTree();
    }

    private setAllExpanded(expanded: boolean): number {
        this._EXPANDED.clear();
        if (!expanded) return 0;
        const data = this._COMPONENT_PROPS_BIND.prop_data.get() as JsonValue | undefined;
        if (data === undefined) return 0;
        const maxDepth = this.limit(this._COMPONENT_PROPS_BIND.prop_maxDepth.get(), 32, 0, 256);
        const maxNodes = this.limit(this._COMPONENT_PROPS_BIND.prop_maxNodes.get(), 2000, 1, 50000);
        let visited = 0;
        const visit = (value: JsonValue, path: string, depth: number) => {
            if (visited++ >= maxNodes || depth >= maxDepth || !isJsonBranch(value)) return;
            const children = getJsonChildren(value);
            if (!children.length) return;
            this._EXPANDED.add(path);
            for (const [key, child] of children) visit(child, `${path}/${encodeURIComponent(key)}`, depth + 1);
        };
        visit(data, "$", 0);
        return this._EXPANDED.size;
    }

    private onTreeClick(event: Event): void {
        const target = event.target instanceof Element ? event.target.closest<HTMLButtonElement>("button[data-node-toggle]") : null;
        if (!target || !this._TREE_ELEMENT?.contains(target)) return;
        event.preventDefault();
        const path = target.dataset.path ?? "$";
        const expanded = !this._EXPANDED.has(path);
        if (expanded) this._EXPANDED.add(path);
        else this._EXPANDED.delete(path);
        const value = this.valueAtPath(path);
        this.executeMethod("NODE_TOGGLE", event, {PATH: path, EXPANDED: expanded, VALUE: value ?? null});
        this.renderTree();
    }

    private valueAtPath(path: string): JsonValue | undefined {
        let value = this._COMPONENT_PROPS_BIND.prop_data.get() as JsonValue | undefined;
        if (value === undefined || path === "$") return value;
        const parts = path.slice(2).split("/").map((part) => decodeURIComponent(part));
        for (const part of parts) {
            if (Array.isArray(value)) value = value[Number(part)];
            else if (value !== null && typeof value === "object") value = value[part];
            else return undefined;
            if (value === undefined) return undefined;
        }
        return value;
    }

    private async copyData(): Promise<void> {
        const value = this._COMPONENT_PROPS_BIND.prop_data.get() as JsonValue | undefined;
        if (value === undefined) {
            this.executeMethod("COPY", new Event("json-tree-copy"), {SUCCESS: false, PATH: "$", VALUE: null});
            return;
        }
        const success = await this.writeJsonToClipboard(value);
        this.executeMethod("COPY", new Event("json-tree-copy"), {SUCCESS: success, PATH: "$", VALUE: value});
    }

    private async copyNodeData(path: string, button: HTMLButtonElement): Promise<void> {
        const value = this.valueAtPath(path);
        const success = value !== undefined && await this.writeJsonToClipboard(value);
        if (success) {
            this.setCopyButtonIcon(button, true);
        } else {
            button.title = this.text("copyFailure");
            button.style.color = "var(--errorColor1)";
        }
        button.setAttribute("aria-label", button.title);
        window.setTimeout(() => {
            if (!button.isConnected) return;
            this.setCopyButtonIcon(button, false);
            button.title = `${this.text("copy")}: ${button.dataset.pathLabel ?? ""}`.trim();
            button.setAttribute("aria-label", button.title);
        }, 1000);
        this.executeMethod("COPY", new Event("json-tree-copy-node"), {SUCCESS: success, PATH: path, VALUE: value ?? null});
    }

    private async writeJsonToClipboard(value: JsonValue): Promise<boolean> {
        try {
            const text = stringifyJson(value);
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(text);
                return true;
            }
            return this.copyFallback(text);
        } catch {
            return false;
        }
    }

    private copyFallback(text: string): boolean {
        const area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.append(area);
        area.select();
        let copied = false;
        try { copied = document.execCommand("copy"); } catch { copied = false; }
        area.remove();
        return copied;
    }

    private appendMessage(host: HTMLElement, text: string, notice = false): void {
        const message = document.createElement("div");
        message.dataset.partName = notice ? "part-json-tree-truncated" : "part-json-tree-empty";
        message.textContent = text;
        message.style.padding = UtilStyle.Css_Padding(CoreConfig.Settings.SizeName.get());
        message.style.color = notice ? "var(--secondaryColor3)" : "var(--darkColor2)";
        host.append(message);
    }

    private appendInlineNotice(host: HTMLElement, depth: number, text: string): void {
        const notice = document.createElement("div");
        notice.dataset.partName = "part-json-tree-depth-limit";
        notice.textContent = text;
        notice.style.paddingInlineStart = `${depth * 18 + 21}px`;
        notice.style.color = "var(--darkColor2)";
        host.append(notice);
    }

    private text(key: "expand" | "collapse" | "expandAll" | "collapseAll" | "copy" | "copySuccess" | "copyFailure" | "noResults" | "truncated"): string {
        return this.readText(CoreLanguage.App.translate((Keys.category.components.jsonTree.texts as any)[key]) as any) || key;
    }

    private readText(value: string | CoreObservable.App<string> | null | undefined): string {
        return CoreObservable.App.isObservable(value) ? String(value.get() ?? "") : String(value ?? "");
    }

    private limit(value: unknown, fallback: number, min: number, max: number): number {
        const number = Number(value);
        return Number.isFinite(number) ? Math.min(max, Math.max(min, Math.floor(number))) : fallback;
    }
}

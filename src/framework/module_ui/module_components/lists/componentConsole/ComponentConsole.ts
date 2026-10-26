import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as CoreLanguage from "@/core_languages";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import * as UiIcons from "@/ui_icons";
import {PartAttrDefault} from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import * as ComponentBorder from "../componentBorder";
import * as ComponentButton from "../componentButton";
import {ButtonAction, ButtonSemantic, ButtonVariants} from "../componentButton/Props";
import * as ComponentInputSimple from "../componentInputSimple";
import * as ComponentTabs from "../componentTabs";
import {ComponentConsoleBase} from "./ComponentConsoleBase";
import {PropsConfigType} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {createConsoleStep} from "./Step";
import {ConsoleEntry, ConsoleLevel, ConsoleValue, normalizeConsoleEntry} from "./Types";
import {Keys} from "../../../module_categories/languages";

const LEVELS: Array<ConsoleLevel | "all"> = ["all", "log", "info", "warn", "error", "debug"];

const COPY_ICON: UiIcons.IIconDefinition = {
    title: UiIcons.Src.FileApplication.Definition.title,
    description: UiIcons.Src.FileApplication.Definition.description,
    viewBoxX: 24,
    viewBoxY: 24,
    render(context) {
        return [
            CoreReactive.App.svgPath({
                attrs: {d: "M8 8h11v11H8z", fill: "none", "stroke-linejoin": "round"},
                attrsBind: {stroke: context.primaryColor, "stroke-width": context.strokeWidth},
            }),
            CoreReactive.App.svgPath({
                attrs: {d: "M5 5h11v11H5z", "stroke-linejoin": "round"},
                attrsBind: {fill: context.secondaryColor, stroke: context.primaryColor, "stroke-width": context.strokeWidth},
            }),
        ];
    },
};

export class ComponentConsole extends ComponentConsoleBase<ReturnType<typeof createConsoleStep>>{
    private _BORDER: InstanceType<typeof ComponentBorder.Component> | null = null;
    private _HEADER_BORDER: InstanceType<typeof ComponentBorder.Component> | null = null;
    private _TABS: InstanceType<typeof ComponentTabs.Component> | null = null;
    private _CLEAR_BUTTON: InstanceType<typeof ComponentButton.Component> | null = null;
    private _SEARCH_INPUT: InstanceType<typeof ComponentInputSimple.Component> | null = null;
    private _OUTPUT_ELEMENT: HTMLElement | null = null;
    private _OUTPUT_ENTRIES_ELEMENT: HTMLElement | null = null;
    private _COPY_BUTTON: InstanceType<typeof ComponentButton.Component> | null = null;
    private readonly _LEVEL_FILTER = new CoreObservable.App<ConsoleLevel | "all">("all");
    private readonly _SEARCH_QUERY = new CoreObservable.App<string>("");
    private _DISPOSED = false;
    private _INITIAL_ENTRIES = true;
    private _LAST_ENTRY_ID: string | null = null;

    constructor(config?: Partial<PropsConfigType>, methods?: MethodsConfigType<ComponentConsole>, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}) {
        super(identity, createConsoleStep());
        this.renderComponent(config as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this.getScope().dispose();
        this._BORDER?.dispose();
        this._BORDER = null;
        this._HEADER_BORDER?.dispose();
        this._HEADER_BORDER = null;
        this._TABS?.dispose();
        this._TABS = null;
        this._CLEAR_BUTTON?.dispose();
        this._CLEAR_BUTTON = null;
        this._SEARCH_INPUT?.dispose();
        this._SEARCH_INPUT = null;
        this._OUTPUT_ELEMENT = null;
        this._OUTPUT_ENTRIES_ELEMENT = null;
        this._COPY_BUTTON?.dispose();
        this._COPY_BUTTON = null;
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
                return this.renderToolbar();
            case Schemas.OUTPUT.part:
                return this.renderOutput();
            default:
                return super.renderManagerComponent(partName, attrs, data, extra);
        }
    }

    private renderRoot(): CoreReactive.App {
        const content = CoreReactive.App.section({
            attrs: {"data-part-name": "part-console-content"},
            styles: {display: "flex", flexDirection: "column", width: "100%", height: "100%", minWidth: "0", minHeight: "0", overflow: "hidden", boxSizing: "border-box"},
            children: [this.executeSchemaPart(Schemas.TOOLBAR.part, {}), this.executeSchemaPart(Schemas.OUTPUT.part, {})],
        });
        const bind = this._COMPONENT_PROPS_BIND;
        const borderConfig: Record<string, any> = {
            selector: bind.prop_componentBorderSelector,
            append: bind.prop_componentBorderAppend,
            classList: bind.prop_componentBorderClassList,
            styles: CoreObservable.App.computed((provided: Record<string, any> | null) => ({
                display: "block", width: "100%", height: "100%", minWidth: "0", minHeight: "0", ...(provided ?? {}),
            }), [bind.prop_componentBorderElementStyles], this.getScope()),
            prop_show: bind.prop_componentBorderShow,
            prop_structureClass: bind.prop_componentBorderStructureClass,
            prop_structureStyles: bind.prop_componentBorderStructureStyles,
            prop_content: content,
        };
        const borderAliases: Array<[string, string]> = [
            ["prop_componentBorderContentSize", "prop_contentSize"],
            ["prop_componentBorderContentColor", "prop_contentColor"],
            ["prop_componentBorderContentColorHover", "prop_contentColor_hover"],
            ["prop_componentBorderContentBackgroundColor", "prop_contentBackgroundColor"],
            ["prop_componentBorderContentBackgroundColorHover", "prop_contentBackgroundColor_hover"],
            ["prop_componentBorderColor", "prop_borderColor"],
            ["prop_componentBorderColorHover", "prop_borderColor_hover"],
            ["prop_componentBorderClass", "prop_borderClass"],
            ["prop_componentBorderStyles", "prop_borderStyles"],
            ["prop_componentBorderType", "prop_borderType"],
            ["prop_componentBorderOpacity", "prop_borderOpacity"],
            ["prop_componentBorderArrowType", "prop_borderArrowType"],
            ["prop_componentBorderArrowWidth", "prop_borderArrowWidth"],
            ["prop_componentBorderArrowPosition", "prop_borderArrowPosition"],
            ["prop_componentBorderMinWidth", "prop_minWidth"],
            ["prop_componentBorderWidth", "prop_width"],
            ["prop_componentBorderTopLeftRadiusHas", "prop_borderTopLeftRadiusHas"],
            ["prop_componentBorderTopRightRadiusHas", "prop_borderTopRightRadiusHas"],
            ["prop_componentBorderBottomLeftRadiusHas", "prop_borderBottomLeftRadiusHas"],
            ["prop_componentBorderBottomRightRadiusHas", "prop_borderBottomRightRadiusHas"],
            ["prop_componentBorderTopHas", "prop_borderTopHas"],
            ["prop_componentBorderRightHas", "prop_borderRightHas"],
            ["prop_componentBorderBottomHas", "prop_borderBottomHas"],
            ["prop_componentBorderLeftHas", "prop_borderLeftHas"],
        ];
        for (const [alias, borderProp] of borderAliases) borderConfig[borderProp] = bind[alias];
        borderConfig.prop_borderTopLeftRadiusHas = false;
        borderConfig.prop_borderTopRightRadiusHas = false;
        borderConfig.prop_borderBottomLeftRadiusHas = false;
        borderConfig.prop_borderBottomRightRadiusHas = false;
        this._BORDER = new ComponentBorder.Component(borderConfig as any);
        return this._BORDER.getReactiveElement() as CoreReactive.App;
    }

    private renderToolbar(): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        this._SEARCH_INPUT ??= new ComponentInputSimple.Component({
            styles: {display: "block", width: "220px", flex: "0 1 220px", minWidth: "0"},
            prop_inputType: ComponentInputSimple.InputSimpleTypes.SEARCH,
            prop_inputPlaceholder: CoreLanguage.App.translate(Keys.category.components.console.texts.search) as any,
            prop_inputValue: "",
        } as any, {
            INPUT_CHANGE: (_event, _dataArgs, componentArgs) => {
                this._SEARCH_QUERY.set(String(componentArgs?.VALUE ?? ""));
                this.renderEntries();
            },
        } as any);
        const clearButton = CoreObservable.App.conditionWhen(
            [bind.prop_showClearButton],
            (show: boolean) => !!show,
            () => {
                this._CLEAR_BUTTON ??= new ComponentButton.Component({
                    styles: {display: "block", width: "auto", flex: "0 0 auto"},
                    prop_btnType: ButtonAction.BUTTON,
                    prop_btnSemantic: ButtonSemantic.CANCEL,
                    prop_btnTitle: CoreLanguage.App.translate(Keys.category.components.console.texts.clear) as any,
                    prop_btnIcon: UiIcons.Src.FileClearBroom.Definition,
                } as any, {
                    CLICK: (event) => {
                        const count = this.readEntries().length;
                        this.set("prop_entries", []);
                        this._LAST_ENTRY_ID = null;
                        this.renderEntries();
                        this.executeMethod("CLEAR", event, {COUNT: count});
                    },
                } as any);
                return this._CLEAR_BUTTON.getReactiveElement();
            },
            () => null,
            this.getScope(),
        );
        this._TABS = new ComponentTabs.Component({
            styles: {display: "block", width: "auto", minWidth: "0", flex: "0 1 auto"},
            prop_tabsView: "float",
            prop_tabSelected: this._LEVEL_FILTER as any,
            prop_tabs: LEVELS.map((level) => ({
                id: level,
                title: level === "all" ? CoreLanguage.App.translate(Keys.category.components.console.texts.all) as any : level,
                icon: ({
                    all: UiIcons.Src.FileApplication.Definition,
                    log: UiIcons.Src.FileTypeNote.Definition,
                    info: UiIcons.Src.InputTitle.Definition,
                    warn: UiIcons.Src.SymbolExclumationWarning.Definition,
                    error: UiIcons.Src.StatusError.Definition,
                    debug: UiIcons.Src.FileSearch.Definition,
                } as const)[level],
            })),
            prop_borderMinWidth: "88px",
            prop_borderRadius: UtilConst.Sizes.S,
            prop_borderStyles: {padding: "0.25rem 0.4rem", minWidth: "0", boxSizing: "border-box"},
            prop_titleStyles: {whiteSpace: "nowrap"},
            prop_bodyStyles: {display: "none"},
        } as any, {
            CLICK_TAB: (event, _dataArgs, componentArgs) => {
                const level = componentArgs?.TAB_SELECTED ?? this._LEVEL_FILTER.get();
                if (!LEVELS.includes(level)) return;
                this._LEVEL_FILTER.set(level);
                this.executeMethod("FILTER_CHANGE", event, {LEVEL: level});
                this.renderEntries();
            },
        } as any);
        const headerRow = CoreReactive.App.section({
            attrs: {"data-part-name": "part-console-header"},
            styles: {display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", minWidth: "0"},
            stylesBind: CoreObservable.App.computed((isRtl: boolean, size: UtilConst.Sizes) => ({direction: isRtl ? "rtl" : "ltr", gap: UtilStyle.Css_Margin(size)}), [CoreConfig.Settings.DirectionRtl.observable(), sizeName], this.getScope()),
            children: [
                CoreReactive.App.section({
                    attrs: {"data-part-name": "part-console-header-actions"},
                    styles: {display: "flex", alignItems: "center", minWidth: "0", flex: "0 1 auto"},
                    stylesBind: CoreObservable.App.computed((size: UtilConst.Sizes) => ({gap: UtilStyle.Css_Margin(size)}), [sizeName], this.getScope()),
                    children: [clearButton as any, this._SEARCH_INPUT.getReactiveElement() as any],
                }) as any,
                CoreObservable.App.conditionWhen([bind.prop_showLevelFilter], (show: boolean) => !!show, () => this._TABS!.getReactiveElement(), () => null, this.getScope()) as any,
            ],
        });
        this._HEADER_BORDER = new ComponentBorder.Component({
            styles: {display: "block", width: "100%", flex: "0 0 auto", minWidth: "0"},
            prop_content: headerRow,
            prop_contentBackgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
            prop_borderClass: ["position-relative", "d-block"],
            prop_borderStyles: CoreObservable.App.computed((size: UtilConst.Sizes) => ({display: "block", width: "100%", minWidth: "0", paddingInline: UtilStyle.Css_Padding(size), boxSizing: "border-box"}), [sizeName], this.getScope()) as any,
            prop_borderTopHas: false, prop_borderRightHas: false, prop_borderBottomHas: true, prop_borderLeftHas: false,
            prop_borderTopLeftRadiusHas: false, prop_borderTopRightRadiusHas: false, prop_borderBottomLeftRadiusHas: false, prop_borderBottomRightRadiusHas: false,
        } as any);
        return this._HEADER_BORDER.getReactiveElement() as CoreReactive.App;
    }

    private renderOutput(): CoreReactive.App {
        const output = CoreReactive.App.section({
            attrs: {"data-part-name": "part-console-output", role: "log", "aria-live": "polite"},
            styles: {display: "block", position: "relative", width: "100%", flex: "1 1 0", minWidth: "0", minHeight: "0", maxHeight: "100%", overflowY: "auto", overflowX: "hidden", boxSizing: "border-box", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", backgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_4)},
            stylesBind: CoreObservable.App.computed((size: UtilConst.Sizes) => ({padding: UtilStyle.Css_Padding(size)}), [CoreConfig.Settings.SizeName.observable()], this.getScope()),
        });
        this._OUTPUT_ELEMENT = output.getElement() as HTMLElement;
        const entriesElement = document.createElement("section");
        entriesElement.dataset.partName = "part-console-output-entries";
        entriesElement.style.display = "block";
        entriesElement.style.width = "100%";
        entriesElement.style.minWidth = "0";
        this._OUTPUT_ENTRIES_ELEMENT = entriesElement;
        this._OUTPUT_ELEMENT.append(entriesElement);
        this._COPY_BUTTON = new ComponentButton.Component({
            styles: CoreObservable.App.computed((isRtl: boolean, size: UtilConst.Sizes) => {
                const padding = UtilStyle.Css_Padding(size);
                const controlSize = UtilStyle.Css_SizeCalc(
                    padding as any,
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Height(size) as any,
                    UtilConst.Operation.ADD,
                    padding as any,
                );
                return {
                    display: "block",
                    position: "absolute",
                    top: padding,
                    ...(isRtl ? {left: padding} : {right: padding}),
                    zIndex: "2",
                    width: controlSize,
                    height: controlSize,
                    minWidth: controlSize,
                    minHeight: controlSize,
                };
            }, [CoreConfig.Settings.DirectionRtl.observable(), CoreConfig.Settings.SizeName.observable()], this.getScope()) as any,
            prop_btnTitle: "Copy console",
            prop_btnType: ButtonAction.BUTTON,
            prop_btnVariant: ButtonVariants.ICON,
            prop_btnSemantic: ButtonSemantic.PRIMARY,
            prop_btnIcon: COPY_ICON,
            prop_btnIconStyles: {width: "18px", height: "18px"},
            prop_btnTitleStyles: {display: "none"},
            prop_btnStyles: {width: "100%", height: "100%", minWidth: "100%", minHeight: "100%", padding: "0"},
        } as any, {
            CLICK: () => this.copyOutput(),
        } as any);
        this._OUTPUT_ELEMENT.append(this._COPY_BUTTON.getElement() as HTMLElement);
        const bind = this._COMPONENT_PROPS_BIND;
        bind.prop_entries.subscribe((entries) => {
            const normalized = Array.isArray(entries) ? entries.map((entry, index) => normalizeConsoleEntry(entry, index)).filter(Boolean) as ConsoleEntry[] : [];
            const last = normalized[normalized.length - 1];
            if (!this._INITIAL_ENTRIES && last && last.id !== this._LAST_ENTRY_ID) {
                this.executeMethod("ENTRY", new Event("console-entry"), {ENTRY: last, LEVEL: last.level});
            }
            this._LAST_ENTRY_ID = last?.id ?? null;
            this._INITIAL_ENTRIES = false;
            this.renderEntries();
        }, this.getScope());
        bind.prop_maxEntries.subscribe(() => this.renderEntries(), this.getScope());
        bind.prop_autoScroll.subscribe(() => this.renderEntries(), this.getScope());
        bind.prop_placeholder.subscribe(() => this.renderEntries(), this.getScope());
        this._LEVEL_FILTER.subscribe(() => this.renderEntries(), this.getScope());
        CoreConfig.Settings.SizeName.observable().subscribe(() => this.renderEntries(), this.getScope());
        this.renderEntries();
        this._INITIAL_ENTRIES = false;
        return output;
    }

    private readEntries(): ConsoleEntry[] {
        const entries = this._COMPONENT_PROPS_BIND.prop_entries.get();
        return Array.isArray(entries) ? entries.map((entry, index) => normalizeConsoleEntry(entry, index)).filter(Boolean) as ConsoleEntry[] : [];
    }

    private renderEntries(): void {
        const output = this._OUTPUT_ELEMENT;
        const entriesOutput = this._OUTPUT_ENTRIES_ELEMENT;
        if (!output || !entriesOutput || this._DISPOSED) return;
        const maxEntries = Math.max(1, Math.floor(Number(this._COMPONENT_PROPS_BIND.prop_maxEntries.get()) || 500));
        const allEntries = this.readEntries().slice(-maxEntries);
        const activeLevel = this._LEVEL_FILTER.get();
        const search = this._SEARCH_QUERY.get().trim().toLocaleLowerCase();
        const levelEntries = activeLevel === "all" ? allEntries : allEntries.filter((entry) => entry.level === activeLevel);
        const entries = search ? levelEntries.filter((entry) => {
            const haystack = [entry.level, new Date(entry.timestamp).toLocaleTimeString(), ...entry.values.map((value) => value.preview)].join(" ").toLocaleLowerCase();
            return haystack.includes(search);
        }) : levelEntries;
        const wasAtBottom = output.scrollHeight - output.scrollTop - output.clientHeight < 32;
        entriesOutput.replaceChildren();
        if (!entries.length) {
            const empty = document.createElement("div");
            empty.dataset.partName = "part-console-empty";
            const emptyMessage = this._COMPONENT_PROPS_BIND.prop_placeholder.get();
            empty.textContent = CoreObservable.App.isObservable(emptyMessage) ? emptyMessage.get() : String(emptyMessage ?? "");
            empty.style.opacity = "0.7";
            empty.style.padding = UtilStyle.Css_Padding(CoreConfig.Settings.SizeName.get());
            entriesOutput.append(empty);
            return;
        }
        for (const entry of entries) entriesOutput.append(this.createEntryElement(entry));
        if (this._COMPONENT_PROPS_BIND.prop_autoScroll.get() && wasAtBottom) output.scrollTop = output.scrollHeight;
    }

    private copyOutput(): void {
        const text = this._OUTPUT_ENTRIES_ELEMENT?.innerText?.trim() ?? "";
        if (!text) return;
        if (navigator.clipboard?.writeText) {
            void navigator.clipboard.writeText(text).catch(() => this.copyOutputFallback(text));
            return;
        }
        this.copyOutputFallback(text);
    }

    private copyOutputFallback(text: string): void {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.append(textarea);
        textarea.select();
        try { document.execCommand("copy"); } finally { textarea.remove(); }
    }

    private createEntryElement(entry: ConsoleEntry): HTMLElement {
        const row = document.createElement("div");
        row.dataset.partName = "part-console-entry";
        row.dataset.level = entry.level;
        row.style.display = "grid";
        row.style.gridTemplateColumns = "auto minmax(0, 1fr)";
        row.style.alignItems = "start";
        row.style.columnGap = UtilStyle.Css_Margin(CoreConfig.Settings.SizeName.get());
        row.style.padding = `${UtilStyle.Css_Padding(CoreConfig.Settings.SizeName.get())} 0`;
        row.style.borderBottom = `1px solid ${UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1)}`;
        row.style.color = entry.level === "error"
            ? UtilStyle.Css_Color(UtilConst.ColorMain.ERROR, UtilConst.ColorGrad.GRADE_1)
            : entry.level === "warn"
                ? UtilStyle.Css_Color(UtilConst.ColorMain.WARNING, UtilConst.ColorGrad.GRADE_1)
                : UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1);

        const meta = document.createElement("span");
        meta.dataset.partName = "part-console-entry-meta";
        meta.style.display = "inline-flex";
        meta.style.alignItems = "center";
        meta.style.whiteSpace = "nowrap";
        meta.style.opacity = "0.75";
        const size = CoreConfig.Settings.SizeName.get();
        const badgeMargin = UtilStyle.Css_Margin(size);
        const badgePadding = UtilStyle.Css_Padding(size);
        const badgeRadius = UtilStyle.Css_BorderRadius(size);
        const levelColor = ({
            log: UtilConst.ColorMain.PRIMARY,
            info: UtilConst.ColorMain.INFO,
            warn: UtilConst.ColorMain.WARNING,
            error: UtilConst.ColorMain.ERROR,
            debug: UtilConst.ColorMain.DARK,
        } as const)[entry.level];
        const date = new Date(entry.timestamp);
        const line = document.createElement("span");
        line.dataset.partName = "part-console-entry-line";
        line.style.display = "inline-flex";
        line.style.alignItems = "center";
        line.style.justifyContent = "center";
        line.style.textAlign = "center";
        line.style.width = "50px";
        line.style.flex = "0 0 50px";
        line.style.boxSizing = "border-box";
        line.style.paddingLeft = badgePadding;
        line.style.paddingRight = badgePadding;
        line.style.backgroundColor = UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1);
        line.style.color = UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1);
        line.style.borderRadius = badgeRadius;
        line.style.marginLeft = badgeMargin;
        line.style.marginRight = badgeMargin;
        const lineText = document.createElement("b");
        lineText.textContent = String(entry.line ?? "");
        line.append(lineText);
        const type = document.createElement("span");
        type.dataset.partName = "part-console-entry-type";
        type.style.display = "inline-flex";
        type.style.alignItems = "center";
        type.style.justifyContent = "center";
        type.style.textAlign = "center";
        type.style.width = "60px";
        type.style.flex = "0 0 60px";
        type.style.boxSizing = "border-box";
        type.style.paddingLeft = badgePadding;
        type.style.paddingRight = badgePadding;
        type.style.backgroundColor = UtilStyle.Css_Color(levelColor, UtilConst.ColorGrad.GRADE_1);
        type.style.color = UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1);
        type.style.borderRadius = badgeRadius;
        type.style.marginLeft = badgeMargin;
        type.style.marginRight = badgeMargin;
        const typeText = document.createElement("b");
        typeText.textContent = entry.level;
        type.append(typeText);
        const timestamp = document.createElement("span");
        timestamp.dataset.partName = "part-console-entry-date";
        timestamp.style.display = "inline-flex";
        timestamp.style.alignItems = "center";
        timestamp.style.justifyContent = "center";
        timestamp.style.textAlign = "center";
        timestamp.style.width = "100px";
        timestamp.style.flex = "0 0 100px";
        timestamp.style.boxSizing = "border-box";
        timestamp.style.paddingLeft = badgePadding;
        timestamp.style.paddingRight = badgePadding;
        timestamp.style.backgroundColor = UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1);
        timestamp.style.color = UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1);
        timestamp.style.borderRadius = badgeRadius;
        timestamp.style.marginLeft = badgeMargin;
        timestamp.style.marginRight = badgeMargin;
        const dateText = document.createElement("b");
        dateText.textContent = Number.isNaN(date.getTime()) ? "" : date.toLocaleTimeString();
        timestamp.append(dateText);
        meta.append(line, type, timestamp);
        row.append(meta);

        const values = document.createElement("span");
        values.dataset.partName = "part-console-entry-values";
        values.style.minWidth = "0";
        values.style.overflowWrap = "anywhere";
        entry.values.forEach((value, index) => {
            if (index) values.append(document.createTextNode(" "));
            values.append(this.createValueElement(value));
        });
        row.append(values);
        return row;
    }

    private createValueElement(value: ConsoleValue): HTMLElement {
        if (value.entries?.length || value.stack) {
            const details = document.createElement("details");
            details.dataset.partName = "part-console-value-details";
            details.style.display = "inline-block";
            details.style.maxWidth = "100%";
            const summary = document.createElement("summary");
            summary.textContent = value.preview;
            summary.style.cursor = "pointer";
            details.append(summary);
            if (value.stack) {
                const stack = document.createElement("pre");
                stack.textContent = value.stack;
                stack.style.whiteSpace = "pre-wrap";
                stack.style.margin = "0.25rem 0";
                details.append(stack);
            }
            if (value.entries?.length) {
                const list = document.createElement("div");
                list.style.paddingInlineStart = "1rem";
                for (const item of value.entries) {
                    const line = document.createElement("div");
                    const key = document.createElement("b");
                    key.textContent = `${item.key}: `;
                    line.append(key, this.createValueElement(item.value));
                    list.append(line);
                }
                details.append(list);
            }
            return details;
        }
        const span = document.createElement("span");
        span.dataset.valueType = value.type;
        span.textContent = value.preview;
        return span;
    }
}

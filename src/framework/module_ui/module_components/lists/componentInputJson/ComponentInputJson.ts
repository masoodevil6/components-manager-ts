import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as CoreLanguage from "@/core_languages";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import * as UiIcons from "@/ui_icons";
import {EditorState, Compartment, StateEffect} from "@codemirror/state";
import {defaultKeymap, history, historyKeymap} from "@codemirror/commands";
import {bracketMatching, defaultHighlightStyle, foldAll, foldGutter, foldKeymap, indentOnInput, syntaxHighlighting, unfoldAll} from "@codemirror/language";
import {json} from "@codemirror/lang-json";
import {closeBrackets, closeBracketsKeymap} from "@codemirror/autocomplete";
import {Decoration, EditorView, ViewPlugin, drawSelection, highlightActiveLine, highlightActiveLineGutter, highlightSpecialChars, keymap, lineNumbers, placeholder as codeMirrorPlaceholder} from "@codemirror/view";
import {SearchQuery} from "@codemirror/search";
import {PartAttrDefault} from "@/core_components";
import {ComponentInputJsonBase} from "./ComponentInputJsonBase";
import type {PropsConfigType} from "./Props";
import {Schemas} from "./Schemas";
import type {MethodsConfigType} from "./Methods";
import {createInputJsonStep} from "./Step";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import * as ComponentIcon from "../componentIcon";
import * as ComponentJsonTree from "../componentJsonTree";
import type {JsonValue} from "../componentJsonTree/Types";
import * as ComponentErrorIsEmpty from "../componentErrorIsEmpty";
import * as ComponentValidate from "../componentValidate";
import {Keys} from "../../../module_categories/languages";

type ParseResult = {valid: true; value: JsonValue; error: null} | {valid: false; value: undefined; error: string};
type DisposableChild = {dispose?: () => void; disposeStep?: () => void};

const EDITOR_SEARCH_QUERY_EFFECT = StateEffect.define<string>();

function createEditorSearchHighlighter(): any {
    return ViewPlugin.fromClass(class {
        private _QUERY = "";
        decorations = Decoration.none;

        constructor(view: EditorView) {
            this.decorations = this.createDecorations(view);
        }

        update(update: any): void {
            let queryChanged = false;
            for (const transaction of update.transactions) {
                for (const effect of transaction.effects) {
                    if (!effect.is(EDITOR_SEARCH_QUERY_EFFECT)) continue;
                    this._QUERY = effect.value;
                    queryChanged = true;
                }
            }
            if (queryChanged || update.docChanged || update.viewportChanged) {
                this.decorations = this.createDecorations(update.view);
            }
        }

        private createDecorations(view: EditorView): any {
            if (!this._QUERY) return Decoration.none;
            const query = new SearchQuery({search: this._QUERY, caseSensitive: false, literal: true});
            const matches: any[] = [];
            for (const range of view.visibleRanges) {
                const cursor = query.getCursor(view.state, range.from, range.to);
                let match = cursor.next();
                while (!match.done) {
                    matches.push(Decoration.mark({class: "cm-input-json-search-match"}).range(match.value.from, match.value.to));
                    match = cursor.next();
                }
            }
            return matches.length ? Decoration.set(matches, true) : Decoration.none;
        }
    }, {decorations: (plugin) => plugin.decorations});
}

export class ComponentInputJson extends ComponentInputJsonBase<ReturnType<typeof createInputJsonStep>>{
    private _EDITOR: EditorView | null = null;
    private _EDITOR_ALL_FOLDED = false;
    private readonly _READ_ONLY_COMPARTMENT = new Compartment();
    private readonly _PLACEHOLDER_COMPARTMENT = new Compartment();
    private readonly _THEME_COMPARTMENT = new Compartment();
    private _APPLYING_EXTERNAL_VALUE = false;
    private _JSON_TREE: InstanceType<typeof ComponentJsonTree.Component> | null = null;
    private _JSON_ERROR: InstanceType<typeof ComponentErrorIsEmpty.Component> | null = null;
    private _HEADER_CONTAINER: CoreReactive.App | null = null;
    private _PARSE_RESULT: CoreObservable.App<ParseResult> | null = null;
    private _FOLD_ICON_OPEN: InstanceType<typeof ComponentIcon.Component> | null = null;
    private _FOLD_ICON_CLOSED: InstanceType<typeof ComponentIcon.Component> | null = null;
    private _CHILDREN: DisposableChild[] = [];
    private _DISPOSED = false;

    constructor(config?: Partial<StructurePropsType & PropsConfigType>, methods?: MethodsConfigType<ComponentInputJson>, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}) {
        super(identity, createInputJsonStep());
        this.renderComponent({...config} as any, methods as any, identity?.events ?? null);
    }

    override getElement(): HTMLElement {
        return super.getElement() as HTMLElement;
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this._CHILDREN.forEach((child) => child.dispose ? child.dispose() : child.disposeStep?.());
        this._CHILDREN = [];
        this._EDITOR?.destroy();
        this._EDITOR = null;
        this._JSON_TREE = null;
        this._JSON_ERROR = null;
        this._HEADER_CONTAINER = null;
        this.disposeFoldIcon(this._FOLD_ICON_OPEN);
        this._FOLD_ICON_OPEN = null;
        this.disposeFoldIcon(this._FOLD_ICON_CLOSED);
        this._FOLD_ICON_CLOSED = null;
        this.getScope().dispose();
        this.disposeStep();
    }

    override renderContentComponent(attrsDefault: PartAttrDefault): CoreReactive.App {
        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            children: [
                this.executeSchemaPart(ComponentLabelTrait.schemas.LABEL.part, {}),
                this.executeSchemaPart(Schemas.FORM.part, {}),
                this.executeSchemaPart(Schemas.VALIDATE.part, {}),
            ],
        });
    }

    override renderManagerComponent(partName: string, attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: any): CoreReactive.App {
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part: return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part: return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case ComponentLabelTrait.schemas.LABEL.part: return this.renderLabel(data);
            case Schemas.FORM.part: return this.renderForm(attrsDefault, data);
            case Schemas.HEADER.part: return this.renderHeader(attrsDefault, data);
            case Schemas.EDITOR.part: return this.renderEditor(attrsDefault, data);
            case Schemas.CODE.part: return this.renderCodeEditor(attrsDefault, data);
            case Schemas.ERROR.part: return this.renderParseError(attrsDefault);
            case Schemas.PREVIEW.part: return this.renderJsonPreview(attrsDefault, data);
            case Schemas.VALIDATE.part: return this.renderValidate(data);
            default: return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderForm(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const background = data?.prop_backgroundColorForm ?? bind.prop_backgroundColorForm;
        const radius = data?.prop_formBorderRadius ?? bind.prop_formBorderRadius;
        const hasHeader = data?.prop_hasHeader ?? bind.prop_hasHeader;
        const styles = CoreObservable.App.computed((backgroundColor: string, radiusSize: any) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            width: "100%",
            minWidth: "0",
            backgroundColor,
            borderRadius: UtilStyle.Css_BorderRadius(radiusSize),
        }), [background, radius], this.getScope());
        const headerContent = this.executeSchemaPart(Schemas.HEADER.part, {});
        const header = CoreObservable.App.conditionWhen(
            [hasHeader],
            (show: boolean) => show,
            () => headerContent,
            () => null,
            this.getScope(),
        );
        return CoreReactive.App.section({
            attrs: {...attrs},
            stylesBind: styles,
            children: [
                header as any,
                this.executeSchemaPart(Schemas.EDITOR.part, {}),
            ],
        });
    }

    private renderHeader(_attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        if (this._HEADER_CONTAINER) return this._HEADER_CONTAINER;
        const bind = this._COMPONENT_PROPS_BIND;
        const headerTitle = data?.prop_headerTitle ?? bind.prop_headerTitle;
        const validationTitle = data?.prop_title ?? bind.prop_title;
        const defaultTitle = CoreLanguage.App.translate(Keys.category.components.inputJson.texts.editorTitle);
        const accessibleTitle = CoreObservable.App.computed((header: string | null, fallback: string | null, defaultValue: string) => ({
            "aria-label": header?.trim() || fallback?.trim() || defaultValue,
        }), [headerTitle, validationTitle, defaultTitle], this.getScope());
        this._HEADER_CONTAINER = CoreReactive.App.section({
            attrs: {"data-part-name": "part-input-json-header"},
            attrsBind: accessibleTitle as any,
            styles: {display: "block", width: "100%", minWidth: "0"},
        });
        return this._HEADER_CONTAINER;
    }

    private renderEditor(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const height = data?.prop_editorHeight ?? this._COMPONENT_PROPS_BIND.prop_editorHeight;
        const childStyles = CoreObservable.App.computed((editorHeight: string) => ({
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            width: "100%",
            height: editorHeight,
            minWidth: "0",
            minHeight: "0",
            overflow: "hidden",
            boxSizing: "border-box",
        }), [height], this.getScope());
        return CoreReactive.App.section({
            attrs: {...attrs},
            stylesBind: childStyles,
            children: [
                this.executeSchemaPart(Schemas.CODE.part, {}),
                CoreReactive.App.section({
                    attrs: {"data-part-name": "part-input-json-preview-panel"},
                    styles: {display: "flex", flexDirection: "column", flex: "0 0 50%", width: "50%", minWidth: "0", minHeight: "0", overflow: "hidden"},
                    children: [this.executeSchemaPart(Schemas.ERROR.part, {}), this.executeSchemaPart(Schemas.PREVIEW.part, {})],
                }),
            ],
        });
    }

    private renderCodeEditor(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const value = data?.prop_value ?? bind.prop_value;
        const disabled = data?.prop_isDisable ?? bind.prop_isDisable;
        const name = data?.prop_name ?? bind.prop_name;
        const placeholder = data?.prop_placeholder ?? bind.prop_placeholder;
        const numbersBackgroundColor = data?.prop_numbersBackgroundColor ?? bind.prop_numbersBackgroundColor;
        const numbersColor = data?.prop_numbersColor ?? bind.prop_numbersColor;
        const numberActiveBackgroundColor = data?.prop_numberActiveBackgroundColor ?? bind.prop_numberActiveBackgroundColor;
        const lineActiveBackgroundColor = data?.prop_lineActiveBackgroundColor ?? bind.prop_lineActiveBackgroundColor;
        const themeLightBackgroundColor = data?.prop_themeLightBackgroundColor ?? bind.prop_themeLightBackgroundColor;
        const themeDarkBackgroundColor = data?.prop_themeDarkBackgroundColor ?? bind.prop_themeDarkBackgroundColor;
        const isDarkTheme = data?.prop_isDarkTheme ?? bind.prop_isDarkTheme;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const host = CoreReactive.App.section({
            attrs: {
                ...attrs,
                "data-name": String((name as any)?.get?.() ?? name ?? ""),
                "aria-label": CoreLanguage.App.translate(Keys.category.components.inputJson.texts.editorTitle).get(),
            },
            styles: {display: "block", flex: "0 0 50%", width: "50%", height: "100%", minWidth: "0", minHeight: "0", overflow: "hidden"},
        });
        const readOnlyValue = Boolean(disabled.get());
        const placeholderValue = placeholder.get() || "";
        this._FOLD_ICON_OPEN ??= this.createFoldIcon(UiIcons.Src.ArrowChevronDown.Definition);
        this._FOLD_ICON_CLOSED ??= this.createFoldIcon(UiIcons.Src.ArrowChevronRight.Definition);
        const createTheme = (): any => {
            const isDark = Boolean(isDarkTheme.get());
            const foregroundColor = UtilStyle.Css_Color(
                isDark ? UtilConst.ColorMain.SHAN : UtilConst.ColorMain.PRIMARY,
                UtilConst.ColorGrad.GRADE_1,
            );
            return EditorView.theme({
                "&": {
                    height: "100%",
                    color: foregroundColor,
                    backgroundColor: isDark ? themeDarkBackgroundColor.get() : themeLightBackgroundColor.get(),
                    fontSize: UtilStyle.Css_FontSize(sizeName.get()),
                },
                ".cm-scroller": {overflow: "auto", lineHeight: "1.5", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"},
                ".cm-content": {padding: UtilStyle.Css_Padding(sizeName.get()), caretColor: foregroundColor},
                ".cm-gutters": {backgroundColor: numbersBackgroundColor.get(), color: numbersColor.get(), border: "0"},
                ".cm-activeLineGutter": {backgroundColor: numberActiveBackgroundColor.get()},
                ".cm-activeLine": {backgroundColor: lineActiveBackgroundColor.get()},
                ".cm-foldGutter .cm-gutterElement": {cursor: "pointer"},
                ".cm-input-json-search-match": {
                    backgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_4),
                    borderRadius: "2px",
                },
            }, {dark: isDark});
        };
        const updateTheme = () => this.reconfigure(this._THEME_COMPARTMENT, createTheme());
        this._EDITOR = new EditorView({
            state: EditorState.create({
                doc: value.get() ?? "",
                extensions: [
                    lineNumbers(),
                    highlightActiveLineGutter(),
                    highlightSpecialChars(),
                    history(),
                    drawSelection(),
                    indentOnInput(),
                    syntaxHighlighting(defaultHighlightStyle, {fallback: true}),
                    bracketMatching(),
                    closeBrackets(),
                    foldGutter({markerDOM: (open) => this.createFoldMarkerDOM(open)}),
                    highlightActiveLine(),
                    keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...historyKeymap, ...foldKeymap]),
                    json(),
                    createEditorSearchHighlighter(),
                    this._READ_ONLY_COMPARTMENT.of([EditorState.readOnly.of(readOnlyValue), EditorView.editable.of(!readOnlyValue)]),
                    this._PLACEHOLDER_COMPARTMENT.of(placeholderValue ? codeMirrorPlaceholder(placeholderValue) : []),
                    this._THEME_COMPARTMENT.of(createTheme()),
                    EditorView.updateListener.of((update) => {
                        if (!update.docChanged || this._APPLYING_EXTERNAL_VALUE || this._DISPOSED) return;
                        this.handleInputChange(new Event("change"), update.state.doc.toString());
                    }),
                ],
            }),
            parent: host.getElement() as HTMLElement,
        });

        value.subscribe((nextValue) => this.applyExternalValue(nextValue), this.getScope());
        disabled.subscribe((nextDisabled) => this.reconfigure(
            this._READ_ONLY_COMPARTMENT,
            [EditorState.readOnly.of(Boolean(nextDisabled)), EditorView.editable.of(!nextDisabled)],
        ), this.getScope());
        placeholder.subscribe((nextPlaceholder) => this.reconfigure(
            this._PLACEHOLDER_COMPARTMENT,
            nextPlaceholder ? codeMirrorPlaceholder(String(nextPlaceholder)) : [],
        ), this.getScope());
        sizeName.subscribe(updateTheme, this.getScope());
        numbersBackgroundColor.subscribe(updateTheme, this.getScope());
        numbersColor.subscribe(updateTheme, this.getScope());
        numberActiveBackgroundColor.subscribe(updateTheme, this.getScope());
        lineActiveBackgroundColor.subscribe(updateTheme, this.getScope());
        themeLightBackgroundColor.subscribe(updateTheme, this.getScope());
        themeDarkBackgroundColor.subscribe(updateTheme, this.getScope());
        isDarkTheme.subscribe(updateTheme, this.getScope());

        const resolvedName = (name as any)?.get?.() ?? name ?? "";
        host.getElement().setAttribute("data-name", String(resolvedName));
        return host;
    }

    private createFoldIcon(definition: UiIcons.IIconDefinition): InstanceType<typeof ComponentIcon.Component> {
        const color = UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1);
        return new ComponentIcon.Component({
            prop_icon: UiIcons.CreateIcon(definition, {size: 14, primaryColor: color}),
            prop_iconClass: ["d-flex", "align-items-center", "justify-content-center"],
            prop_iconStyles: {display: "flex", width: "100%", height: "100%", pointerEvents: "none"},
            prop_structureStyles: {display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center"},
            styles: {display: "inline-flex", width: "14px", height: "14px", flex: "0 0 14px", alignItems: "center", justifyContent: "center"},
        } as any);
    }

    private createFoldMarkerDOM(open: boolean): HTMLElement {
        const component = open ? this._FOLD_ICON_OPEN : this._FOLD_ICON_CLOSED;
        const sourceSvg = (component?.getElement() as HTMLElement | undefined)?.querySelector("svg");
        const marker = document.createElement("span");
        const title = open ? "Fold line" : "Unfold line";

        marker.className = "component-code-mirror-fold-marker";
        marker.title = title;
        marker.setAttribute("aria-label", title);
        marker.style.display = "inline-flex";
        marker.style.width = "16px";
        marker.style.height = "100%";
        marker.style.alignItems = "center";
        marker.style.justifyContent = "center";

        if (sourceSvg) {
            const svg = sourceSvg.cloneNode(true) as SVGSVGElement;
            svg.removeAttribute("role");
            svg.removeAttribute("aria-label");
            svg.setAttribute("aria-hidden", "true");
            svg.setAttribute("focusable", "false");
            svg.style.display = "block";
            svg.style.width = "14px";
            svg.style.height = "14px";
            svg.style.pointerEvents = "none";
            marker.append(svg);
        }

        return marker;
    }

    private disposeFoldIcon(icon: InstanceType<typeof ComponentIcon.Component> | null): void {
        if (!icon) return;
        icon.disposeStep();
        icon.getScope().dispose();
    }

    private renderParseError(attrs: PartAttrDefault): CoreReactive.App {
        const result = this.getParseResult();
        const title = CoreObservable.App.computed((parsed: ParseResult) => {
            if (parsed.valid) return "";
            const heading = CoreLanguage.App.translate(Keys.category.components.inputJson.texts.invalidJson).get();
            return `${heading}: ${parsed.error}`;
        }, [result], this.getScope());
        this._JSON_ERROR = new ComponentErrorIsEmpty.Component({
            prop_title: title as any,
            prop_titleColor: "var(--errorColor1)",
            prop_titleStyles: {whiteSpace: "normal", overflowWrap: "anywhere"},
            prop_btnHas: false,
            prop_borderClass: [],
            prop_borderColor: null,
            prop_borderStyles: {
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
                border: "0",
                backgroundColor: "transparent",
                padding: "0",
            },
            styles: {display: "block", width: "100%", height: "100%", minWidth: "0", minHeight: "0"},
            prop_structureStyles: {display: "block", width: "100%", height: "100%", minWidth: "0", minHeight: "0"},
        } as any);
        this._CHILDREN.push(this._JSON_ERROR as any);
        const errorStyles = CoreObservable.App.computed((parsed: ParseResult) => parsed.valid
            ? {display: "none"}
            : {display: "flex", width: "100%", height: "100%", minWidth: "0", minHeight: "0", alignItems: "center", justifyContent: "center", boxSizing: "border-box"},
        [result], this.getScope());
        return CoreReactive.App.section({
            attrs: {...attrs, role: "alert", "aria-live": "polite"},
            stylesBind: errorStyles,
            children: [this._JSON_ERROR.getReactiveElement() as CoreReactive.App],
        });
    }

    private renderJsonPreview(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const parsedValue = CoreObservable.App.computed((parsed: ParseResult) => parsed.valid ? parsed.value : undefined, [this.getParseResult()], this.getScope());
        this._JSON_TREE = new ComponentJsonTree.Component({
            prop_data: parsedValue as any,
            prop_initialExpandDepth: 2,
            prop_showSearch: true,
            prop_showExpandControls: true,
            prop_showCopyButton: true,
            styles: {display: "block", width: "100%", height: "100%", minWidth: "0", minHeight: "0", overflow: "hidden"},
            prop_structureStyles: {width: "100%", height: "100%", minWidth: "0", minHeight: "0"},
        } as any, {
            SEARCH_CHANGE: (_event, args) => this.applyEditorSearch(String(args?.QUERY ?? "")),
            EXPAND_ALL: () => this.expandCodeEditor(),
            COLLAPSE_ALL: () => this.collapseCodeEditor(),
        } as ComponentJsonTree.MethodsConfigType);
        this._CHILDREN.push(this._JSON_TREE as any);
        const treeToolbar = this._JSON_TREE.getToolbarElement();
        if (treeToolbar && this._HEADER_CONTAINER) {
            this._HEADER_CONTAINER.getElement().append(treeToolbar);
        }
        const treeStyles = CoreObservable.App.computed((parsed: ParseResult) => ({
            display: parsed.valid ? "block" : "none",
            flex: "1 1 auto",
            width: "100%",
            height: "100%",
            minWidth: "0",
            minHeight: "0",
            overflow: "hidden",
        }), [this.getParseResult()], this.getScope());
        return CoreReactive.App.section({
            attrs: {...attrs},
            stylesBind: treeStyles,
            children: [this._JSON_TREE.getReactiveElement() as CoreReactive.App],
        });
    }

    private renderLabel(data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const labelTitle = data?.prop_labelTitle ?? bind.prop_labelTitle;
        const tooltipDescription = data?.prop_labelTooltipDescription ?? bind.prop_labelTooltipDescription;
        const show = data?.prop_labelShow ?? bind.prop_labelShow;
        return CoreObservable.App.conditionWhen([show, labelTitle, tooltipDescription], (isShown, title, description) =>
            !!isShown && ((title != null && title !== "") || (description != null && description !== "")), () => {
            const labelProps: Record<string, any> = {};
            for (const propName of Object.keys(ComponentLabelTrait.props)) labelProps[propName] = data?.[propName] ?? bind[propName];
            labelProps.classList = ["d-block"];
            labelProps.styles = {marginBlockEnd: UtilStyle.Css_Margin(CoreConfig.Settings.SizeName.get())};
            const label = ComponentLabelTrait.createLabel(labelProps, {CLICK: () => this.focusEditor()});
            this._CHILDREN.push(label as any);
            return label.getReactiveElement() as CoreReactive.App;
        }, () => null, this.getScope()) as any;
    }

    private renderValidate(data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const enabled = data?.prop_hasRules ?? bind.prop_hasRules;
        const rules = data?.prop_listRules ?? bind.prop_listRules;
        const title = data?.prop_title ?? bind.prop_title;
        const absolute = data?.prop_isAbsoluteRule ?? bind.prop_isAbsoluteRule;
        const messages = data?.prop_msgRules ?? bind.prop_msgRules;
        const value = data?.prop_value ?? bind.prop_value;
        return CoreObservable.App.conditionWhen([enabled, rules], (isEnabled, list) => !!isEnabled && Array.isArray(list) && list.length > 0, () => {
            const validator = new ComponentValidate.Component({
                prop_listRules: rules as any,
                prop_msgRules: messages as any,
                prop_isAbsolute: absolute as any,
                prop_title: CoreObservable.App.computed((customTitle: string | null, label: string | null) => customTitle || label || "", [title, data?.prop_labelTitle ?? bind.prop_labelTitle], this.getScope()) as any,
                prop_value: value as any,
                prop_referenceComponent: this,
            } as any);
            this._CHILDREN.push(validator as any);
            return validator.getReactiveElement() as CoreReactive.App;
        }, () => null, this.getScope()) as any;
    }

    private handleInputChange(event: Event, value: string): void {
        this.set("prop_value", value);
        const parsed = this.parseJson(value);
        this.executeMethod("INPUT_CHANGE", event, {
            VALUE: value,
            JSON: parsed.valid ? parsed.value : null,
            IS_VALID: parsed.valid,
        });
    }

    private parseJson(value: string): ParseResult {
        try {
            return {valid: true, value: JSON.parse(value) as JsonValue, error: null};
        } catch (error) {
            return {valid: false, value: undefined, error: error instanceof Error ? error.message : String(error)};
        }
    }

    private getParseResult(): CoreObservable.App<ParseResult> {
        if (!this._PARSE_RESULT) {
            this._PARSE_RESULT = CoreObservable.App.computed(
                (value: string) => this.parseJson(value ?? ""),
                [this._COMPONENT_PROPS_BIND.prop_value],
                this.getScope(),
            );
        }
        return this._PARSE_RESULT;
    }

    private focusEditor(): void {
        this._EDITOR?.focus();
    }

    private applyEditorSearch(value: string): void {
        const editor = this._EDITOR;
        if (!editor || this._DISPOSED) return;
        const searchText = value.trim();

        if (searchText) unfoldAll(editor);
        else if (this._EDITOR_ALL_FOLDED) foldAll(editor);

        const effects: any[] = [EDITOR_SEARCH_QUERY_EFFECT.of(searchText)];
        if (searchText) {
            const cursor = new SearchQuery({search: searchText, caseSensitive: false, literal: true}).getCursor(editor.state);
            const firstMatch = cursor.next();
            if (!firstMatch.done) effects.push(EditorView.scrollIntoView(firstMatch.value.from, {y: "center"}));
        }
        editor.dispatch({effects});
    }

    private expandCodeEditor(): void {
        if (!this._EDITOR || this._DISPOSED) return;
        this._EDITOR_ALL_FOLDED = false;
        unfoldAll(this._EDITOR);
    }

    private collapseCodeEditor(): void {
        if (!this._EDITOR || this._DISPOSED) return;
        this._EDITOR_ALL_FOLDED = true;
        foldAll(this._EDITOR);
    }

    private reconfigure(compartment: Compartment, extension: any): void {
        if (!this._EDITOR || this._DISPOSED) return;
        this._EDITOR.dispatch({effects: compartment.reconfigure(extension)});
    }

    private applyExternalValue(rawValue: string | null | undefined): void {
        const view = this._EDITOR;
        const nextValue = rawValue ?? "";
        if (!view || view.state.doc.toString() === nextValue) return;

        const previous = view.state.doc.toString();
        let prefix = 0;
        const sharedLimit = Math.min(previous.length, nextValue.length);
        while (prefix < sharedLimit && previous[prefix] === nextValue[prefix]) prefix++;

        let suffix = 0;
        while (
            suffix < previous.length - prefix &&
            suffix < nextValue.length - prefix &&
            previous[previous.length - suffix - 1] === nextValue[nextValue.length - suffix - 1]
        ) suffix++;

        this._APPLYING_EXTERNAL_VALUE = true;
        try {
            view.dispatch({changes: {
                from: prefix,
                to: previous.length - suffix,
                insert: nextValue.slice(prefix, nextValue.length - suffix),
            }});
        } finally {
            this._APPLYING_EXTERNAL_VALUE = false;
        }
    }
}

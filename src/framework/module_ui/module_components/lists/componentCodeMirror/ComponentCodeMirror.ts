import {autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap} from "@codemirror/autocomplete";
import {defaultKeymap, history, historyKeymap} from "@codemirror/commands";
import {bracketMatching, defaultHighlightStyle, foldGutter, foldKeymap, indentOnInput, syntaxHighlighting} from "@codemirror/language";
import {lintKeymap} from "@codemirror/lint";
import {highlightSelectionMatches, searchKeymap} from "@codemirror/search";
import {
    crosshairCursor,
    drawSelection,
    dropCursor,
    EditorView,
    highlightActiveLine,
    highlightActiveLineGutter,
    highlightSpecialChars,
    keymap,
    lineNumbers,
    placeholder,
    rectangularSelection,
} from "@codemirror/view";
import {Compartment, EditorState} from "@codemirror/state";
import {html} from "@codemirror/lang-html";
import {javascript} from "@codemirror/lang-javascript";
import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import * as UiIcons from "@/ui_icons";
import {PartAttrDefault} from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import * as ComponentBorder from "../componentBorder";
import * as ComponentIcon from "../componentIcon";
import * as ComponentMenuMore from "../componentMenuMore";
import {ComponentCodeMirrorBase} from "./ComponentCodeMirrorBase";
import {CodeMirrorLanguage, PropsConfigType} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {createCodeMirrorStep} from "./Step";

function createCodeMirrorSetup(markerDOM: (open: boolean) => HTMLElement): any[] {
    return [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        foldGutter({markerDOM}),
        drawSelection(),
        dropCursor(),
        EditorState.allowMultipleSelections.of(true),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle, {fallback: true}),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        keymap.of([
            ...closeBracketsKeymap,
            ...defaultKeymap,
            ...searchKeymap,
            ...historyKeymap,
            ...foldKeymap,
            ...completionKeymap,
            ...lintKeymap,
        ]),
    ];
}

export class ComponentCodeMirror extends ComponentCodeMirrorBase {
    private _EDITOR: EditorView | null = null;
    private _HEADER_BORDER: InstanceType<typeof ComponentBorder.Component> | null = null;
    private _HEADER_MENU: InstanceType<typeof ComponentMenuMore.Component> | null = null;
    private _HEADER_LANGUAGE_ICON: InstanceType<typeof ComponentIcon.Component> | null = null;
    private _BORDER: InstanceType<typeof ComponentBorder.Component> | null = null;
    private _FOLD_ICON_OPEN: InstanceType<typeof ComponentIcon.Component> | null = null;
    private _FOLD_ICON_CLOSED: InstanceType<typeof ComponentIcon.Component> | null = null;
    private _LANGUAGE_COMPARTMENT = new Compartment();
    private _READ_ONLY_COMPARTMENT = new Compartment();
    private _PLACEHOLDER_COMPARTMENT = new Compartment();
    private _WRAPPING_COMPARTMENT = new Compartment();
    private _THEME_COMPARTMENT = new Compartment();
    private _IS_DARK_THEME = new CoreObservable.App(false);
    private _APPLYING_EXTERNAL_VALUE = false;
    private _DISPOSED = false;

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType>,
        methods?: MethodsConfigType<ComponentCodeMirror>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        super("code-mirror", null, identity, createCodeMirrorStep());
        this.renderComponent(config as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this._EDITOR?.destroy();
        this._EDITOR = null;
        this._HEADER_MENU?.dispose();
        this._HEADER_MENU = null;
        this.disposeFoldIcon(this._HEADER_LANGUAGE_ICON);
        this._HEADER_LANGUAGE_ICON = null;
        this._HEADER_BORDER?.dispose();
        this._HEADER_BORDER = null;
        this._BORDER?.dispose();
        this._BORDER = null;
        this.disposeFoldIcon(this._FOLD_ICON_OPEN);
        this.disposeFoldIcon(this._FOLD_ICON_CLOSED);
        this._FOLD_ICON_OPEN = null;
        this._FOLD_ICON_CLOSED = null;
        this.getScope().dispose();
        this.disposeStep();
    }

    override renderContentComponent(
        _attrsDefault: PartAttrDefault,
        _data: Record<string, CoreObservable.App<any>>,
        _extra?: any,
    ): CoreReactive.App {
        return this.executeSchemaPart(Schemas.ROOT.part, {});
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
            case Schemas.ROOT.part:
                return this.renderRoot(attrsDefault);
            case Schemas.EDITOR.part:
                return this.renderEditor(attrsDefault, data);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderRoot(attrsDefault: PartAttrDefault): CoreReactive.App {
        const editor = this.executeSchemaPart(Schemas.EDITOR.part, {});
        const sizeName = CoreConfig.Settings.SizeName.observable();
        this._HEADER_MENU = new ComponentMenuMore.Component({
            styles: {
                display: "block",
                width: "fit-content",
                maxWidth: "100%",
                minWidth: "0",
                flex: "0 0 auto",
                marginInlineStart: "auto",
            },
            prop_orientation: ComponentMenuMore.MenuMoreOrientation.HORIZONTAL,
            prop_direction: CoreObservable.App.computed(
                (isRtl: boolean) => isRtl
                    ? ComponentMenuMore.MenuMoreDirection.LTR
                    : ComponentMenuMore.MenuMoreDirection.RTL,
                [CoreConfig.Settings.DirectionRtl.observable()],
                this.getScope(),
            ),
            prop_items: [{
                id: "code-mirror-language",
                title: "Language",
                openOn: "click",
                children: [
                    {id: "code-mirror-language-html", title: "HTML", action: "language-html"},
                    {id: "code-mirror-language-javascript", title: "JavaScript", action: "language-javascript"},
                ],
            }, {
                id: "code-mirror-theme",
                title: "Theme",
                icon: UiIcons.Src.StatusTheme.Definition,
                openOn: "click",
                children: [
                    {id: "code-mirror-theme-light", title: "Light", icon: UiIcons.Src.StatusSun.Definition, action: "theme-light"},
                    {id: "code-mirror-theme-dark", title: "Dark", icon: UiIcons.Src.StatusMoon.Definition, action: "theme-dark"},
                ],
            }],
        } as any, {
            SELECT_ITEM: (_event, dataArgs) => {
                if (dataArgs?.ITEM?.action === "language-html") this.set("prop_language", CodeMirrorLanguage.HTML);
                if (dataArgs?.ITEM?.action === "language-javascript") this.set("prop_language", CodeMirrorLanguage.JAVASCRIPT);
                if (dataArgs?.ITEM?.action === "theme-light") this._IS_DARK_THEME.set(false);
                if (dataArgs?.ITEM?.action === "theme-dark") this._IS_DARK_THEME.set(true);
            },
        } as any);
        const headerIconColor = UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1);
        const headerIconSize = CoreObservable.App.computed(
            (sizeName: UtilConst.Sizes) => UtilStyle.Css_IconSize(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
        const languageIconDefinition = CoreObservable.App.computed(
            (language: CodeMirrorLanguage) => this.normalizeLanguage(language) === CodeMirrorLanguage.JAVASCRIPT
                ? UiIcons.Src.ProgrammingJavaScript
                : UiIcons.Src.MarkupHtml,
            [this._COMPONENT_PROPS_BIND.prop_language],
            this.getScope(),
        );
        this._HEADER_LANGUAGE_ICON = new ComponentIcon.Component({
            prop_icon: UiIcons.CreateIcon(languageIconDefinition as any, {
                size: CoreConfig.Settings.SizeName.observable(),
                primaryColor: headerIconColor,
                secondaryColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
            }) as any,
            styles: CoreObservable.App.computed((size: string) => ({
                display: "inline-flex",
                width: size,
                height: size,
                flex: `0 0 ${size}`,
                alignItems: "center",
                justifyContent: "center",
            }), [headerIconSize], this.getScope()) as any,
            prop_iconStyles: CoreObservable.App.computed((size: string) => ({display: "block", width: size, height: size}), [headerIconSize], this.getScope()) as any,
        } as any);
        const headerTitleText = CoreObservable.App.computed(
            (title: string | null, language: CodeMirrorLanguage) => {
                const customTitle = title?.trim();
                if (customTitle) return customTitle;
                return this.normalizeLanguage(language) === CodeMirrorLanguage.JAVASCRIPT ? "JavaScript" : "HTML";
            },
            [this._COMPONENT_PROPS_BIND.prop_title, this._COMPONENT_PROPS_BIND.prop_language],
            this.getScope(),
        );
        const headerTitle = CoreReactive.App.part("b", {
            attrs: {"data-part-name": "part-code-mirror-header-title"},
            styles: {
                display: "block",
                minWidth: "0",
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                whiteSpace: "nowrap",
            },
            stylesBind: CoreObservable.App.computed((size: any) => ({
                height: UtilStyle.Css_Height(size),
                lineHeight: UtilStyle.Css_Height(size),
                paddingTop: UtilStyle.Css_Padding(size),
                paddingBottom: UtilStyle.Css_Padding(size),
            }), [sizeName], this.getScope()),
            children: [headerTitleText as any],
        });
        const headerTitleSection = CoreReactive.App.section({
            attrs: {"data-part-name": "part-code-mirror-header-title-section"},
            styles: {
                display: "flex",
                alignItems: "center",
                flex: "0 0 40%",
                width: "40%",
                minWidth: "0",
            },
            stylesBind: CoreObservable.App.computed(
                (size: any) => ({gap: UtilStyle.Css_Margin(size)}),
                [sizeName],
                this.getScope(),
            ),
            children: [this._HEADER_LANGUAGE_ICON.getReactiveElement(), headerTitle],
        });
        const headerMenuSection = CoreReactive.App.section({
            attrs: {"data-part-name": "part-code-mirror-header-menu-section"},
            styles: {
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                flex: "0 0 60%",
                width: "60%",
                minWidth: "0",
            },
            children: [this._HEADER_MENU.getReactiveElement()],
        });
        const headerContent = CoreReactive.App.section({
            attrs: {"data-part-name": "part-code-mirror-header-content"},
            styles: {
                display: "flex",
                alignItems: "center",
                width: "100%",
                minWidth: "0",
                height: "100%",
            },
            children: [headerTitleSection, headerMenuSection],
        });
        this._HEADER_BORDER = new ComponentBorder.Component({
            prop_content: headerContent,
            prop_contentBackgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
            prop_borderClass: ["position-relative", "d-block", "component-code-mirror-header"],
            prop_borderStyles: CoreObservable.App.computed((size) => ({
                width: "100%",
                minWidth: "0",
                position: "relative",
                zIndex: UtilStyle.Css_ZIndex(UtilConst.ZIndex.SELECTOR),
                height: UtilStyle.Css_SizeCalc(
                    UtilStyle.Css_Padding(size) as any,
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Height(size) as any,
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Padding(size) as any,
                ),
                padding: UtilStyle.Css_Padding(size),
                boxSizing: "border-box",
            }), [sizeName], this.getScope()) as any,
            prop_borderTopLeftRadiusHas: false,
            prop_borderTopRightRadiusHas: false,
            prop_borderBottomLeftRadiusHas: false,
            prop_borderBottomRightRadiusHas: false,
            prop_borderTopHas: false,
            prop_borderRightHas: false,
            prop_borderBottomHas: false,
            prop_borderLeftHas: false,
        });
        this._BORDER = new ComponentBorder.Component({
            prop_content: editor,
            prop_contentSize: UtilConst.Sizes.M,
            prop_contentBackgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
            prop_borderClass: ["position-relative", "d-block"],
            prop_borderStyles: {
                width: "100%",
                minWidth: "0",
                padding: "0",
                position: "relative",
                zIndex: UtilStyle.Css_ZIndex(UtilConst.ZIndex.basic),
                overflow: "hidden",
            },
            // ComponentBorder represents a null border radius by disabling each corner.
            prop_borderTopLeftRadiusHas: false,
            prop_borderTopRightRadiusHas: false,
            prop_borderBottomLeftRadiusHas: false,
            prop_borderBottomRightRadiusHas: false,
        });

        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            styles: {width: "100%", minWidth: "0"},
            children: [this._HEADER_BORDER.getReactiveElement(), this._BORDER.getReactiveElement()],
        });
    }

    private renderEditor(
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
    ): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const value = data?.["prop_value"] ?? bind.prop_value;
        const language = data?.["prop_language"] ?? bind.prop_language;
        const readOnly = data?.["prop_isReadOnly"] ?? bind.prop_isReadOnly;
        const editorPlaceholder = data?.["prop_placeholder"] ?? bind.prop_placeholder;
        const lineWrapping = data?.["prop_lineWrapping"] ?? bind.prop_lineWrapping;
        const requestedHeight = data?.["prop_editorHeight"] ?? bind.prop_editorHeight;
        const numbersBackgroundColor = data?.["prop_numbersBackgroundColor"] ?? bind.prop_numbersBackgroundColor;
        const numbersColor = data?.["prop_numbersColor"] ?? bind.prop_numbersColor;
        const numberActiveBackgroundColor = data?.["prop_numberActiveBackgroundColor"] ?? bind.prop_numberActiveBackgroundColor;
        const lineActiveBackgroundColor = data?.["prop_lineActiveBackgroundColor"] ?? bind.prop_lineActiveBackgroundColor;
        const sizeName = CoreConfig.Settings.SizeName.observable();

        const height = CoreObservable.App.computed(
            (customHeight: string | null, size: any) => customHeight || `calc(${Array(10).fill(UtilStyle.Css_Height(size)).join(" + ")})`,
            [requestedHeight, sizeName],
            this.getScope(),
        );

        const host = CoreReactive.App.section({
            attrs: {...attrsDefault},
            className: ["component-code-mirror-editor"],
            styles: {
                width: "100%",
                minWidth: "0",
                boxSizing: "border-box",
                overflow: "hidden",
            },
            stylesBind: CoreObservable.App.computed(
                (editorHeight: string) => ({height: editorHeight, minHeight: "0"}),
                [height],
                this.getScope(),
            ),
        });

        const initialLanguage = this.normalizeLanguage(language.get());
        const initialPlaceholder = editorPlaceholder.get();
        const initialSize = sizeName.get();
        this._FOLD_ICON_OPEN ??= this.createFoldIcon(UiIcons.Src.ArrowChevronDown.Definition);
        this._FOLD_ICON_CLOSED ??= this.createFoldIcon(UiIcons.Src.ArrowChevronRight.Definition);
        const initialTheme = this.themeExtension(
            initialSize,
            numbersBackgroundColor.get(),
            numbersColor.get(),
            numberActiveBackgroundColor.get(),
            lineActiveBackgroundColor.get(),
            this._IS_DARK_THEME.get(),
        );
        const updateTheme = () => this.reconfigure(
            this._THEME_COMPARTMENT,
            this.themeExtension(
                sizeName.get(),
                numbersBackgroundColor.get(),
                numbersColor.get(),
                numberActiveBackgroundColor.get(),
                lineActiveBackgroundColor.get(),
                this._IS_DARK_THEME.get(),
            ),
        );
        const extensions = [
            createCodeMirrorSetup((open) => this.createFoldMarkerDOM(open)),
            this._LANGUAGE_COMPARTMENT.of(this.languageExtension(initialLanguage)),
            this._READ_ONLY_COMPARTMENT.of(this.readOnlyExtension(Boolean(readOnly.get()))),
            this._PLACEHOLDER_COMPARTMENT.of(this.placeholderExtension(initialPlaceholder)),
            this._WRAPPING_COMPARTMENT.of(Boolean(lineWrapping.get()) ? EditorView.lineWrapping : []),
            this._THEME_COMPARTMENT.of(initialTheme),
            EditorView.updateListener.of((update) => {
                if (!update.docChanged || this._APPLYING_EXTERNAL_VALUE || this._DISPOSED) return;
                const nextValue = update.state.doc.toString();
                const currentLanguage = this.normalizeLanguage(bind.prop_language.get());
                this.set("prop_value", nextValue);
                this.executeMethod("CHANGE", new Event("change"), {
                    VALUE: nextValue,
                    LANGUAGE: currentLanguage,
                });
            }),
        ];

        this._EDITOR = new EditorView({
            state: EditorState.create({doc: value.get() ?? "", extensions}),
            parent: host.getElement() as HTMLElement,
        });

        value.subscribe((nextValue) => this.applyExternalValue(nextValue), this.getScope());
        language.subscribe((nextLanguage) => this.reconfigure(this._LANGUAGE_COMPARTMENT, this.languageExtension(this.normalizeLanguage(nextLanguage))), this.getScope());
        readOnly.subscribe((nextReadOnly) => this.reconfigure(this._READ_ONLY_COMPARTMENT, this.readOnlyExtension(Boolean(nextReadOnly))), this.getScope());
        editorPlaceholder.subscribe((nextPlaceholder) => this.reconfigure(this._PLACEHOLDER_COMPARTMENT, this.placeholderExtension(nextPlaceholder)), this.getScope());
        lineWrapping.subscribe((wrap) => this.reconfigure(this._WRAPPING_COMPARTMENT, Boolean(wrap) ? EditorView.lineWrapping : []), this.getScope());
        sizeName.subscribe(updateTheme, this.getScope());
        numbersBackgroundColor.subscribe(updateTheme, this.getScope());
        numbersColor.subscribe(updateTheme, this.getScope());
        numberActiveBackgroundColor.subscribe(updateTheme, this.getScope());
        lineActiveBackgroundColor.subscribe(updateTheme, this.getScope());
        this._IS_DARK_THEME.subscribe(updateTheme, this.getScope());

        return host;
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
            view.dispatch({
                changes: {
                    from: prefix,
                    to: previous.length - suffix,
                    insert: nextValue.slice(prefix, nextValue.length - suffix),
                },
            });
        } finally {
            this._APPLYING_EXTERNAL_VALUE = false;
        }
    }

    private reconfigure(compartment: Compartment, extension: any): void {
        if (!this._EDITOR || this._DISPOSED) return;
        this._EDITOR.dispatch({effects: compartment.reconfigure(extension)});
    }

    private normalizeLanguage(language: unknown): CodeMirrorLanguage {
        return language === CodeMirrorLanguage.JAVASCRIPT
            ? CodeMirrorLanguage.JAVASCRIPT
            : CodeMirrorLanguage.HTML;
    }

    private languageExtension(language: CodeMirrorLanguage): any {
        return language === CodeMirrorLanguage.JAVASCRIPT ? javascript() : html();
    }

    private readOnlyExtension(readOnly: boolean): any[] {
        return [EditorState.readOnly.of(readOnly), EditorView.editable.of(!readOnly)];
    }

    private placeholderExtension(value: string | null | undefined): any {
        return value ? placeholder(value) : [];
    }

    private createFoldIcon(definition: UiIcons.IIconDefinition): InstanceType<typeof ComponentIcon.Component> {
        const color = UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1);
        const icon = new ComponentIcon.Component({
            prop_icon: UiIcons.CreateIcon(definition, {size: 14, primaryColor: color}),
            prop_iconClass: ["d-flex", "align-items-center", "justify-content-center"],
            prop_iconStyles: {display: "flex", width: "100%", height: "100%", pointerEvents: "none"},
            prop_structureStyles: {display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center"},
            styles: {display: "inline-flex", width: "14px", height: "14px", flex: "0 0 14px", alignItems: "center", justifyContent: "center"},
        } as any);
        return icon;
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

    private themeExtension(
        size: any,
        numbersBackgroundColor: string,
        numbersColor: string,
        numberActiveBackgroundColor: string,
        lineActiveBackgroundColor: string,
        isDark: boolean,
    ): any {
        const foregroundColor = UtilStyle.Css_Color(
            isDark ? UtilConst.ColorMain.SHAN : UtilConst.ColorMain.PRIMARY,
            UtilConst.ColorGrad.GRADE_1,
        );
        const backgroundColor = UtilStyle.Css_Color(
            isDark ? UtilConst.ColorMain.PRIMARY : UtilConst.ColorMain.SHAN,
            UtilConst.ColorGrad.GRADE_1,
        );
        return EditorView.theme({
            "&": {
                height: "100%",
                zIndex: "0",
                color: foregroundColor,
                backgroundColor,
                fontSize: UtilStyle.Css_FontSize(size),
            },
            ".cm-scroller": {
                overflow: "auto",
                lineHeight: "1.5",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
            },
            ".cm-content": {
                padding: UtilStyle.Css_Padding(size),
                caretColor: foregroundColor,
            },
            ".cm-gutters": {
                backgroundColor: numbersBackgroundColor,
                color: numbersColor,
                border: "0",
            },
            ".cm-activeLineGutter": {
                backgroundColor: numberActiveBackgroundColor,
            },
            ".cm-activeLine": {
                backgroundColor: lineActiveBackgroundColor,
            },
            ".cm-foldGutter .cm-gutterElement": {
                cursor: "pointer",
            },
        }, {dark: isDark});
    }
}

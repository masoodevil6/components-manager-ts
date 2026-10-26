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
import {json} from "@codemirror/lang-json";
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
import * as ComponentButton from "../componentButton";
import * as ComponentIcon from "../componentIcon";
import * as ComponentMenuMore from "../componentMenuMore";
import * as ComponentConsole from "../componentConsole";
import {ButtonAction, ButtonSemantic, ButtonVariants} from "../componentButton/Props";
import {ComponentCodeMirrorBase} from "./ComponentCodeMirrorBase";
import {CodeMirrorLanguage, PropsConfigType} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {createCodeMirrorStep} from "./Step";
import {serializeConsoleValue} from "../componentConsole/Types";
import type {ConsoleEntry, ConsoleLevel} from "../componentConsole/Types";

const CODE_MIRROR_CONSOLE_HEIGHT = "220px";

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

export class ComponentCodeMirror extends ComponentCodeMirrorBase<ReturnType<typeof createCodeMirrorStep>>{
    private _EDITOR: EditorView | null = null;
    private _HEADER_BORDER: InstanceType<typeof ComponentBorder.Component> | null = null;
    private _HEADER_MENU: InstanceType<typeof ComponentMenuMore.Component> | null = null;
    private _HEADER_LANGUAGE_ICON: InstanceType<typeof ComponentIcon.Component> | null = null;
    private _EDITOR_COPY_BUTTON: InstanceType<typeof ComponentButton.Component> | null = null;
    private _BORDER: InstanceType<typeof ComponentBorder.Component> | null = null;
    private _EDITOR_BORDER: InstanceType<typeof ComponentBorder.Component> | null = null;
    private _RUN_BORDER: InstanceType<typeof ComponentBorder.Component> | null = null;
    private _RUN_PANE: CoreReactive.App | null = null;
    private _RUN_PANEL: HTMLElement | null = null;
    private _RUN_FRAME: HTMLIFrameElement | null = null;
    private _CONSOLE_COMPONENT: InstanceType<typeof ComponentConsole.Component> | null = null;
    private _CONSOLE_PANE: CoreReactive.App | null = null;
    private readonly _CONSOLE_ENTRIES = new CoreObservable.App<ConsoleEntry[]>([]);
    private readonly _SHOW_CONSOLE = new CoreObservable.App(false);
    private readonly _RUN_MESSAGE_LISTENER = (event: MessageEvent) => this.handleRunMessage(event);
    private _FOLD_ICON_OPEN: InstanceType<typeof ComponentIcon.Component> | null = null;
    private _FOLD_ICON_CLOSED: InstanceType<typeof ComponentIcon.Component> | null = null;
    private _LANGUAGE_COMPARTMENT = new Compartment();
    private _READ_ONLY_COMPARTMENT = new Compartment();
    private _PLACEHOLDER_COMPARTMENT = new Compartment();
    private _WRAPPING_COMPARTMENT = new Compartment();
    private _THEME_COMPARTMENT = new Compartment();
    private _IS_DARK_THEME = new CoreObservable.App(false);
    private _IS_VERTICAL_LAYOUT = new CoreObservable.App(false);
    private _APPLYING_EXTERNAL_VALUE = false;
    private _DISPOSED = false;

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType>,
        methods?: MethodsConfigType<ComponentCodeMirror>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        super("code-mirror", null, identity, createCodeMirrorStep());
        this.renderComponent(config as any, methods as any, identity?.events ?? null);
        window.addEventListener("message", this._RUN_MESSAGE_LISTENER);
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this._EDITOR?.destroy();
        this._EDITOR = null;
        this._HEADER_MENU?.dispose();
        this._HEADER_MENU = null;
        this._EDITOR_COPY_BUTTON?.dispose();
        this._EDITOR_COPY_BUTTON = null;
        this.disposeFoldIcon(this._HEADER_LANGUAGE_ICON);
        this._HEADER_LANGUAGE_ICON = null;
        this._HEADER_BORDER?.dispose();
        this._HEADER_BORDER = null;
        this._EDITOR_BORDER?.dispose();
        this._EDITOR_BORDER = null;
        this._RUN_BORDER?.dispose();
        this._RUN_BORDER = null;
        this._RUN_PANE = null;
        this._BORDER?.dispose();
        this._BORDER = null;
        this._RUN_FRAME?.remove();
        this._RUN_FRAME = null;
        this._RUN_PANEL = null;
        window.removeEventListener("message", this._RUN_MESSAGE_LISTENER);
        this._CONSOLE_COMPONENT?.dispose();
        this._CONSOLE_COMPONENT = null;
        this._CONSOLE_PANE = null;
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
                return this.renderRoot(attrsDefault, data);
            case Schemas.EDITOR.part:
                return this.renderEditor(attrsDefault, data);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderRoot(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const editor = this.executeSchemaPart(Schemas.EDITOR.part, {});
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const directionRtl = CoreConfig.Settings.DirectionRtl.observable();
        const requestedCanRun = data?.["prop_canRun"] ?? this._COMPONENT_PROPS_BIND.prop_canRun;
        const canRun = CoreObservable.App.computed(
            (allowRun: boolean, language: CodeMirrorLanguage) => !!allowRun && this.normalizeLanguage(language) !== CodeMirrorLanguage.JSON,
            [requestedCanRun, this._COMPONENT_PROPS_BIND.prop_language],
            this.getScope(),
        );
        const menuItems = CoreObservable.App.computed((allowRun: boolean, language: CodeMirrorLanguage) => {
            const groups: any[] = [{
                type: "group",
                id: "code-mirror-language-group",
                items: [{
                    id: "code-mirror-language",
                    title: "Language",
                    openOn: "hover",
                    children: [
                        {id: "code-mirror-language-html", title: "HTML", action: "language-html"},
                        {id: "code-mirror-language-javascript", title: "JavaScript", action: "language-javascript"},
                        {id: "code-mirror-language-json", title: "JSON", action: "language-json"},
                    ],
                }],
            }, {
                type: "group",
                id: "code-mirror-theme-group",
                items: [{
                    id: "code-mirror-theme",
                    icon: UiIcons.Src.StatusTheme.Definition,
                    openOn: "hover",
                    children: [
                        {id: "code-mirror-theme-light", title: "Light", icon: UiIcons.Src.StatusSun.Definition, action: "theme-light"},
                        {id: "code-mirror-theme-dark", title: "Dark", icon: UiIcons.Src.StatusMoon.Definition, action: "theme-dark"},
                    ],
                }],
            }];
            if (allowRun && this.normalizeLanguage(language) !== CodeMirrorLanguage.JSON) {
                groups.push({
                    type: "group",
                    id: "code-mirror-separators-group",
                    items: [
                        {id: "code-mirror-separator-horizontal", icon: UiIcons.Src.SeparatorHorizontal.Definition, action: "layout-vertical"},
                        {id: "code-mirror-separator-vertical", icon: UiIcons.Src.SeparatorVertical.Definition, action: "layout-horizontal"},
                    ],
                }, {
                    type: "group",
                    id: "code-mirror-run-group",
                    items: [
                        {id: "code-mirror-console", title: "Console", icon: UiIcons.Src.StatusDebug.Definition, action: "console"},
                        {id: "code-mirror-run", title: "Run", icon: UiIcons.Src.ShapePlay.Definition, action: "run"},
                    ],
                });
            }
            return groups;
        }, [requestedCanRun, this._COMPONENT_PROPS_BIND.prop_language], this.getScope());
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
            prop_items: menuItems,
        } as any, {
            SELECT_ITEM: (_event, dataArgs) => {
                if (dataArgs?.ITEM?.action === "language-html") this.set("prop_language", CodeMirrorLanguage.HTML);
                if (dataArgs?.ITEM?.action === "language-javascript") this.set("prop_language", CodeMirrorLanguage.JAVASCRIPT);
                if (dataArgs?.ITEM?.action === "language-json") this.set("prop_language", CodeMirrorLanguage.JSON);
                if (dataArgs?.ITEM?.action === "theme-light") this._IS_DARK_THEME.set(false);
                if (dataArgs?.ITEM?.action === "theme-dark") this._IS_DARK_THEME.set(true);
                if (dataArgs?.ITEM?.action === "layout-horizontal") this._IS_VERTICAL_LAYOUT.set(false);
                if (dataArgs?.ITEM?.action === "layout-vertical") this._IS_VERTICAL_LAYOUT.set(true);
                if (dataArgs?.ITEM?.action === "run") this.runCurrentCode();
                if (dataArgs?.ITEM?.action === "console") this._SHOW_CONSOLE.set(!this._SHOW_CONSOLE.get());
            },
        } as any);
        const headerIconColor = UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1);
        const headerIconSize = CoreObservable.App.computed(
            (sizeName: UtilConst.Sizes) => UtilStyle.Css_IconSize(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
        const languageIconDefinition = CoreObservable.App.computed(
            (language: CodeMirrorLanguage) => {
                const normalized = this.normalizeLanguage(language);
                if (normalized === CodeMirrorLanguage.JAVASCRIPT) return UiIcons.Src.ProgrammingJavaScript;
                if (normalized === CodeMirrorLanguage.JSON) return UiIcons.Src.FileApplication.Definition;
                return UiIcons.Src.MarkupHtml;
            },
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
                const normalized = this.normalizeLanguage(language);
                if (normalized === CodeMirrorLanguage.JAVASCRIPT) return "JavaScript";
                if (normalized === CodeMirrorLanguage.JSON) return "JSON";
                return "HTML";
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
            styles: {
                position: "relative",
                zIndex: String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.SELECTOR)),
            },
            prop_content: headerContent,
            prop_contentBackgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
            prop_borderClass: ["position-relative", "d-block", "component-code-mirror-header"],
            prop_borderStyles: CoreObservable.App.computed((size) => ({
                width: "100%",
                minWidth: "0",
                position: "relative",
                zIndex: String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.SELECTOR)),
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
        const requestedEditorHeight = this._COMPONENT_PROPS_BIND.prop_editorHeight;
        const bodyHeight = CoreObservable.App.computed(
            (customHeight: string | null, size: UtilConst.Sizes) => customHeight || `calc(${Array(10).fill(UtilStyle.Css_Height(size)).join(" + ")})`,
            [requestedEditorHeight, sizeName],
            this.getScope(),
        );
        const editorBorderRightHas = CoreObservable.App.computed(
            (allowRun: boolean, isRtl: boolean, isVertical: boolean) => !!allowRun && !isVertical && !isRtl,
            [canRun, directionRtl, this._IS_VERTICAL_LAYOUT],
            this.getScope(),
        );
        const editorBorderLeftHas = CoreObservable.App.computed(
            (allowRun: boolean, isRtl: boolean, isVertical: boolean) => !!allowRun && !isVertical && !!isRtl,
            [canRun, directionRtl, this._IS_VERTICAL_LAYOUT],
            this.getScope(),
        );
        const editorBorderBottomHas = CoreObservable.App.computed(
            (allowRun: boolean, isVertical: boolean) => !!allowRun && isVertical,
            [canRun, this._IS_VERTICAL_LAYOUT],
            this.getScope(),
        );
        const runBorderTopHas = CoreObservable.App.computed(
            (allowRun: boolean, isVertical: boolean) => !!allowRun && isVertical,
            [canRun, this._IS_VERTICAL_LAYOUT],
            this.getScope(),
        );
        const editorBorderStyles = CoreObservable.App.computed(
            (allowRun: boolean, isRtl: boolean, isVertical: boolean, size: UtilConst.Sizes) => ({
                width: "100%",
                height: "100%",
                minWidth: "0",
                padding: "0",
                position: "relative",
                zIndex: allowRun && isVertical
                    ? String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.basic))
                    : "auto",
                overflow: "hidden",
                boxSizing: "border-box",
                "border-right-width": UtilStyle.Style_Important(
                    allowRun && !isVertical && !isRtl ? UtilStyle.Css_BorderWidth(size) : UtilStyle.Css_SizeUnit(0, UtilConst.Units.PEXEL),
                ),
                "border-left-width": UtilStyle.Style_Important(
                    allowRun && !isVertical && isRtl ? UtilStyle.Css_BorderWidth(size) : UtilStyle.Css_SizeUnit(0, UtilConst.Units.PEXEL),
                ),
                "border-bottom-width": UtilStyle.Style_Important(
                    allowRun && isVertical ? UtilStyle.Css_BorderWidth(size) : UtilStyle.Css_SizeUnit(0, UtilConst.Units.PEXEL),
                ),
                "border-bottom-style": allowRun && isVertical ? "solid" : "none",
                "border-bottom-color": allowRun && isVertical
                    ? UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1)
                    : "transparent",
                // This is applied to the inner `part-border` of the editor
                // ComponentBorder. The shorthand keeps the separator visible
                // when the layout is switched to the vertical code/run mode.
                borderBottom: allowRun && isVertical
                    ? `${UtilStyle.Css_BorderWidth(size)} solid ${UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1)} !important`
                    : "none",
            }),
            [canRun, directionRtl, this._IS_VERTICAL_LAYOUT, sizeName],
            this.getScope(),
        );
        this._EDITOR_BORDER = new ComponentBorder.Component({
            styles: {
                display: "block",
                width: "100%",
                height: "100%",
                minWidth: "0",
            },
            prop_content: editor,
            prop_contentSize: UtilConst.Sizes.M,
            prop_contentBackgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
            prop_borderClass: ["position-relative", "d-block"],
            prop_borderStyles: editorBorderStyles as any,
            prop_borderTopLeftRadiusHas: false,
            prop_borderTopRightRadiusHas: false,
            prop_borderBottomLeftRadiusHas: false,
            prop_borderBottomRightRadiusHas: false,
            prop_borderTopHas: false,
            prop_borderRightHas: editorBorderRightHas as any,
            prop_borderBottomHas: editorBorderBottomHas as any,
            prop_borderLeftHas: editorBorderLeftHas as any,
        });
        const editorPane = CoreReactive.App.section({
            attrs: {"data-part-name": "part-code-mirror-body-editor"},
            styles: {
                display: "block",
                width: "100%",
                height: "100%",
                minWidth: "0",
                position: "relative",
                overflow: "hidden",
                boxSizing: "border-box",
            },
            children: [this._EDITOR_BORDER.getReactiveElement()],
        });
        this._EDITOR_COPY_BUTTON = new ComponentButton.Component({
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
                    zIndex: "3",
                    width: controlSize,
                    height: controlSize,
                    minWidth: controlSize,
                    minHeight: controlSize,
                };
            }, [directionRtl, sizeName], this.getScope()) as any,
            prop_btnTitle: "Copy code",
            prop_btnType: ButtonAction.BUTTON,
            prop_btnVariant: ButtonVariants.ICON,
            prop_btnSemantic: ButtonSemantic.PRIMARY,
            prop_btnIcon: COPY_ICON,
            prop_btnIconStyles: {width: "18px", height: "18px"},
            prop_btnTitleStyles: {display: "none"},
            prop_btnStyles: {width: "100%", height: "100%", minWidth: "100%", minHeight: "100%", padding: "0"},
        } as any, {
            CLICK: () => this.copyEditorContent(),
        } as any);
        (editorPane.getElement() as HTMLElement).append(this._EDITOR_COPY_BUTTON.getElement() as HTMLElement);

        const runPane = CoreObservable.App.conditionWhen(
            [canRun],
            (allowRun: boolean) => !!allowRun,
            () => {
                if (this._RUN_PANE) return this._RUN_PANE;

                const runPanel = CoreReactive.App.section({
                    attrs: {
                        "data-part-name": "part-code-mirror-run-panel",
                        "aria-label": "Run output",
                    },
                    styles: {
                        display: "block",
                        width: "100%",
                        flex: "1 1 auto",
                        height: "100%",
                        minHeight: "0",
                        maxHeight: "100%",
                        minWidth: "0",
                        overflow: "auto",
                        boxSizing: "border-box",
                    },
                    stylesBind: CoreObservable.App.computed(
                        (size: UtilConst.Sizes) => ({padding: UtilStyle.Css_Padding(size)}),
                        [sizeName],
                        this.getScope(),
                    ),
                });
                this._RUN_PANEL = runPanel.getElement() as HTMLElement;
                const runContent = CoreReactive.App.section({
                    attrs: {"data-part-name": "part-code-mirror-run-content"},
                    styles: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                        width: "100%",
                        height: "100%",
                        minWidth: "0",
                        minHeight: "0",
                        boxSizing: "border-box",
                    },
                    children: [runPanel],
                });
                this._RUN_BORDER = new ComponentBorder.Component({
                    styles: {
                        display: "block",
                        width: "100%",
                        height: "100%",
                        minWidth: "0",
                    },
                    prop_content: runContent,
                    prop_contentSize: UtilConst.Sizes.M,
                    prop_contentBackgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                    prop_borderClass: ["position-relative", "d-block"],
                    prop_borderStyles: {
                        display: "block",
                        width: "100%",
                        height: "100%",
                        minWidth: "0",
                        padding: "0",
                        position: "relative",
                        overflow: "hidden",
                        boxSizing: "border-box",
                    },
                    prop_borderTopLeftRadiusHas: false,
                    prop_borderTopRightRadiusHas: false,
                    prop_borderBottomLeftRadiusHas: false,
                    prop_borderBottomRightRadiusHas: false,
                    prop_borderTopHas: runBorderTopHas as any,
                    prop_borderRightHas: false,
                    prop_borderBottomHas: false,
                    prop_borderLeftHas: false,
                } as any);
                this._RUN_PANE = CoreReactive.App.section({
                    attrs: {"data-part-name": "part-code-mirror-body-run"},
                    styles: {
                        display: "block",
                        width: "100%",
                        height: "100%",
                        minWidth: "0",
                        minHeight: "0",
                        maxHeight: "100%",
                        overflow: "auto",
                        boxSizing: "border-box",
                    },
                    children: [this._RUN_BORDER.getReactiveElement()],
                });
                return this._RUN_PANE;
            },
            () => null,
            this.getScope(),
        );
        canRun.subscribe((enabled) => {
            if (enabled) return;
            this._SHOW_CONSOLE.set(false);
            this._CONSOLE_ENTRIES.set([]);
            this.clearRunOutput();
            this._RUN_BORDER?.dispose();
            this._RUN_BORDER = null;
            this._RUN_PANE = null;
            this._RUN_PANEL = null;
        }, this.getScope());

        const bodyContent = CoreReactive.App.section({
            attrs: {"data-part-name": "part-code-mirror-body-content"},
            styles: {
                display: "grid",
                alignItems: "stretch",
                width: "100%",
                maxWidth: "100%",
                minWidth: "0",
                overflow: "hidden",
                boxSizing: "border-box",
            },
            stylesBind: CoreObservable.App.computed((height: string, allowRun: boolean, isVertical: boolean) => ({
                height,
                gridTemplateColumns: allowRun && !isVertical ? "minmax(0, 1fr) minmax(0, 1fr)" : "minmax(0, 1fr)",
                gridTemplateRows: allowRun && isVertical ? "minmax(0, 1fr) minmax(0, 1fr)" : "minmax(0, 1fr)",
            }), [bodyHeight, canRun, this._IS_VERTICAL_LAYOUT], this.getScope()),
            children: [editorPane, runPane as any],
        });
        this._BORDER = new ComponentBorder.Component({
            styles: {
                display: "block",
                width: "100%",
                minWidth: "0",
                position: "relative",
                zIndex: String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.basic)),
            },
            prop_content: bodyContent,
            prop_contentSize: UtilConst.Sizes.M,
            prop_contentBackgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
            prop_borderClass: ["position-relative", "d-block"],
            prop_borderStyles: {
                width: "100%",
                minWidth: "0",
                padding: "0",
                position: "relative",
                zIndex: String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.basic)),
                overflow: "hidden",
                boxSizing: "border-box",
            },
            // ComponentBorder represents a null border radius by disabling each corner.
            prop_borderTopLeftRadiusHas: false,
            prop_borderTopRightRadiusHas: false,
            prop_borderBottomLeftRadiusHas: false,
            prop_borderBottomRightRadiusHas: false,
        });

        const consolePane = CoreObservable.App.conditionWhen(
            [canRun, this._SHOW_CONSOLE],
            (allowRun: boolean, showConsole: boolean) => !!allowRun && !!showConsole,
            () => this.renderConsolePane(),
            () => null,
            this.getScope(),
        );

        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            styles: {width: "100%", minWidth: "0"},
            children: [this._HEADER_BORDER.getReactiveElement(), this._BORDER.getReactiveElement(), consolePane as any],
        });
    }

    private renderConsolePane(): CoreReactive.App {
        if (this._CONSOLE_PANE) return this._CONSOLE_PANE;
        this._CONSOLE_COMPONENT = new ComponentConsole.Component({
            styles: {
                display: "block",
                width: "100%",
                height: CODE_MIRROR_CONSOLE_HEIGHT,
                maxHeight: CODE_MIRROR_CONSOLE_HEIGHT,
                minHeight: CODE_MIRROR_CONSOLE_HEIGHT,
                minWidth: "0",
                flex: `0 0 ${CODE_MIRROR_CONSOLE_HEIGHT}`,
                overflow: "hidden",
                boxSizing: "border-box",
            },
            prop_structureStyles: {
                display: "block",
                width: "100%",
                height: "100%",
                minHeight: "0",
                overflow: "hidden",
                boxSizing: "border-box",
            },
            prop_componentBorderStyles: {
                display: "block",
                width: "100%",
                height: "100%",
                minHeight: "0",
                overflow: "hidden",
                boxSizing: "border-box",
            },
            prop_componentBorderStructureStyles: {
                display: "block",
                width: "100%",
                height: "100%",
                minHeight: "0",
                overflow: "hidden",
                boxSizing: "border-box",
            },
            prop_entries: this._CONSOLE_ENTRIES,
            prop_showClearButton: true,
            prop_showLevelFilter: true,
        } as any);
        this._CONSOLE_PANE = CoreReactive.App.section({
            attrs: {"data-part-name": "part-code-mirror-console"},
            styles: {
                display: "block",
                width: "100%",
                height: CODE_MIRROR_CONSOLE_HEIGHT,
                maxHeight: CODE_MIRROR_CONSOLE_HEIGHT,
                minWidth: "0",
                minHeight: CODE_MIRROR_CONSOLE_HEIGHT,
                flex: `0 0 ${CODE_MIRROR_CONSOLE_HEIGHT}`,
                overflow: "hidden",
                boxSizing: "border-box",
            },
            children: [this._CONSOLE_COMPONENT.getReactiveElement() as any],
        });
        return this._CONSOLE_PANE;
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
        const themeLightBackgroundColor = data?.["prop_themeLightBackgroundColor"] ?? bind.prop_themeLightBackgroundColor;
        const themeDarkBackgroundColor = data?.["prop_themeDarkBackgroundColor"] ?? bind.prop_themeDarkBackgroundColor;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const requestedCanRun = data?.["prop_canRun"] ?? bind.prop_canRun;
        const canRun = CoreObservable.App.computed(
            (allowRun: boolean, editorLanguage: CodeMirrorLanguage) => !!allowRun && this.normalizeLanguage(editorLanguage) !== CodeMirrorLanguage.JSON,
            [requestedCanRun, language],
            this.getScope(),
        );

        const height = CoreObservable.App.computed(
            (customHeight: string | null, size: any, allowRun: boolean, isVertical: boolean) => {
                const fullHeight = customHeight || `calc(${Array(10).fill(UtilStyle.Css_Height(size)).join(" + ")})`;
                return allowRun && isVertical ? `calc((${fullHeight}) / 2)` : fullHeight;
            },
            [requestedHeight, sizeName, canRun, this._IS_VERTICAL_LAYOUT],
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
            themeLightBackgroundColor.get(),
            themeDarkBackgroundColor.get(),
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
                themeLightBackgroundColor.get(),
                themeDarkBackgroundColor.get(),
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
        themeLightBackgroundColor.subscribe(updateTheme, this.getScope());
        themeDarkBackgroundColor.subscribe(updateTheme, this.getScope());
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

    public run(): void {
        this.runCurrentCode();
    }

    private copyEditorContent(): void {
        const text = this._EDITOR?.state.doc.toString() ?? "";
        if (!text) return;
        if (navigator.clipboard?.writeText) {
            void navigator.clipboard.writeText(text).catch(() => this.copyEditorContentFallback(text));
            return;
        }
        this.copyEditorContentFallback(text);
    }

    private copyEditorContentFallback(text: string): void {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.append(textarea);
        textarea.select();
        try { document.execCommand("copy"); } finally { textarea.remove(); }
    }

    private runCurrentCode(): void {
        if (this._DISPOSED || !this._RUN_PANEL) return;

        const source = this._EDITOR?.state.doc.toString() ?? this._COMPONENT_PROPS_BIND.prop_value.get() ?? "";
        const language = this.normalizeLanguage(this._COMPONENT_PROPS_BIND.prop_language.get());

        const runHandler = this._COMPONENT_PROPS_BIND.prop_run?.get();
        if (typeof runHandler === "function") {
            this.clearRunOutput();
            this._CONSOLE_ENTRIES.set([]);
            try {
                const output = runHandler(source, language, {
                    console: {
                        log: (...values) => this.appendRunConsole("log", values),
                        info: (...values) => this.appendRunConsole("info", values),
                        warn: (...values) => this.appendRunConsole("warn", values),
                        error: (...values) => this.appendRunConsole("error", values),
                        debug: (...values) => this.appendRunConsole("debug", values),
                    },
                });
                if (output instanceof Node) {
                    this._RUN_PANEL.replaceChildren(output);
                } else if (typeof output === "string") {
                    const outputElement = document.createElement("pre");
                    outputElement.style.margin = "0";
                    outputElement.style.padding = UtilStyle.Css_Padding(CoreConfig.Settings.SizeName.get());
                    outputElement.style.whiteSpace = "pre-wrap";
                    outputElement.textContent = output;
                    this._RUN_PANEL.replaceChildren(outputElement);
                }
            } catch (error) {
                const outputElement = document.createElement("pre");
                outputElement.style.margin = "0";
                outputElement.style.padding = UtilStyle.Css_Padding(CoreConfig.Settings.SizeName.get());
                outputElement.style.whiteSpace = "pre-wrap";
                outputElement.style.color = UtilStyle.Css_Color(UtilConst.ColorMain.ERROR, UtilConst.ColorGrad.GRADE_1);
                outputElement.textContent = error instanceof Error ? error.stack ?? error.message : String(error);
                this._RUN_PANEL.replaceChildren(outputElement);
                this._CONSOLE_ENTRIES.set([{
                    id: `run-error-${Date.now()}`,
                    level: "error",
                    timestamp: Date.now(),
                    values: [{type: "string", preview: outputElement.textContent}],
                }]);
            }
            return;
        }

        const frame = document.createElement("iframe");
        frame.title = "Code output";
        frame.setAttribute("sandbox", "allow-scripts");
        frame.setAttribute("loading", "lazy");
        frame.style.display = "block";
        frame.style.width = "100%";
        frame.style.height = "100%";
        frame.style.border = "0";
        frame.style.backgroundColor = UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1);

        this.clearRunOutput();
        this._CONSOLE_ENTRIES.set([]);
        this._RUN_PANEL.replaceChildren(frame);
        this._RUN_FRAME = frame;
        frame.srcdoc = this.createRunDocument(source, language);
    }

    private handleRunMessage(event: MessageEvent): void {
        if (this._DISPOSED || !this._RUN_FRAME || event.source !== this._RUN_FRAME.contentWindow) return;
        const data = event.data as any;
        if (!data || data.__componentCodeMirrorConsole !== true) return;
        const levels: ConsoleLevel[] = ["log", "info", "warn", "error", "debug"];
        const level: ConsoleLevel = levels.includes(data.level) ? data.level : "log";
        const values = Array.isArray(data.values) ? data.values.map((value: unknown) => ({type: "string", preview: String(value)})) : [];
        const timestamp = Date.now();
        this._CONSOLE_ENTRIES.set([
            ...this._CONSOLE_ENTRIES.get(),
            {id: `run-${timestamp}-${Math.random().toString(36).slice(2)}`, level, timestamp, values},
        ]);
    }

    private appendRunConsole(level: ConsoleLevel, values: unknown[]): void {
        const timestamp = Date.now();
        this._CONSOLE_ENTRIES.set([
            ...this._CONSOLE_ENTRIES.get(),
            {
                id: `run-${timestamp}-${Math.random().toString(36).slice(2)}`,
                level,
                timestamp,
                values: values.map((value) => serializeConsoleValue(value)),
            },
        ]);
    }

    private clearRunOutput(): void {
        this._RUN_FRAME?.remove();
        this._RUN_FRAME = null;
        this._RUN_PANEL?.replaceChildren();
    }

    private createRunDocument(source: string, language: CodeMirrorLanguage): string {
        const contentSecurityPolicy = "default-src 'none'; img-src data: blob:; style-src 'unsafe-inline'; script-src 'unsafe-inline' 'unsafe-eval'; font-src data:; media-src data: blob:; connect-src 'none'; object-src 'none'; frame-src 'none'; form-action 'none'";
        const policy = `<meta http-equiv="Content-Security-Policy" content="${contentSecurityPolicy}">`;
        if (language === CodeMirrorLanguage.HTML) {
            return `<!doctype html><html><head><meta charset="utf-8">${policy}</head><body>${source}</body></html>`;
        }

        const serializedSource = JSON.stringify(source).replace(/[<\u2028\u2029]/g, (character) =>
            `\\u${character.charCodeAt(0).toString(16).padStart(4, "0")}`,
        );
        return `<!doctype html><html><head><meta charset="utf-8">${policy}<style>body{font:14px ui-monospace,monospace;margin:0;padding:12px}#code-mirror-console{white-space:pre-wrap;overflow-wrap:anywhere;color:#b42318}</style></head><body><pre id="code-mirror-console" aria-live="polite"></pre><script>
const source = ${serializedSource};
const output = document.getElementById("code-mirror-console");
const format = value => typeof value === "string" ? value : (() => { try { return JSON.stringify(value); } catch { return String(value); } })();
const write = (level, ...values) => {
    output.textContent += values.map(format).join(" ") + "\\n";
    try { window.parent.postMessage({__componentCodeMirrorConsole: true, level, values: values.map(format)}, "*"); } catch {}
};
for (const method of ["log", "info", "warn", "error", "debug"]) console[method] = (...values) => write(method, ...values);
window.onerror = message => { write("error", message); };
try { (0, eval)(source); } catch (error) { write(error && error.stack ? error.stack : error); }
</script></body></html>`;
    }

    private reconfigure(compartment: Compartment, extension: any): void {
        if (!this._EDITOR || this._DISPOSED) return;
        this._EDITOR.dispatch({effects: compartment.reconfigure(extension)});
    }

    private normalizeLanguage(language: unknown): CodeMirrorLanguage {
        if (language === CodeMirrorLanguage.JAVASCRIPT) return CodeMirrorLanguage.JAVASCRIPT;
        if (language === CodeMirrorLanguage.JSON) return CodeMirrorLanguage.JSON;
        return CodeMirrorLanguage.HTML;
    }

    private languageExtension(language: CodeMirrorLanguage): any {
        if (language === CodeMirrorLanguage.JAVASCRIPT) return javascript();
        if (language === CodeMirrorLanguage.JSON) return json();
        return html();
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
        themeLightBackgroundColor: string,
        themeDarkBackgroundColor: string,
        isDark: boolean,
    ): any {
        const foregroundColor = UtilStyle.Css_Color(
            isDark ? UtilConst.ColorMain.SHAN : UtilConst.ColorMain.PRIMARY,
            UtilConst.ColorGrad.GRADE_1,
        );
        const backgroundColor = isDark ? themeDarkBackgroundColor : themeLightBackgroundColor;
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

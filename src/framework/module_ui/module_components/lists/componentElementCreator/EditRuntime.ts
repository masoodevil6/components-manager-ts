import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreLanguage from "@/core_languages";
import * as UiIcons from "@/ui_icons";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import * as ComponentBorder from "../componentBorder/runtime";
import * as ComponentEffectChange from "../componentEffectChange/runtime";
import * as ComponentMenuMore from "../componentMenuMore/runtime";
import {LayoutColumn} from "../componentLayout/Props";
import {Keys} from "../../../module_categories/languages/keys/components/basic";

export function renderEditMode(host: any, renderedComponent: CoreReactive.App | HTMLElement | null): CoreReactive.App {
    setEditModeActive(host, true);
    disposeRootBorder(host);
    host._OPTIONS_EFFECT ??= new ComponentEffectChange.Component({
        prop_content: host._OPTIONS_CONTENT,
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
                children: [host._OPTIONS_EFFECT.getReactiveElement() as CoreReactive.App],
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
                children: [host.renderWithMargin(renderedComponent, "part-element-creator-render-content") as any],
            }),
        ],
    });

    host._ROOT_BORDER = new ComponentBorder.Component({
        prop_borderType: ComponentBorder.BorderTypes.DASHED,
        prop_borderClass: ["w-100"],
        prop_borderStyles: {display: "block", width: "100%", boxSizing: "border-box"},
        prop_content: content,
    } as any);

    return host._ROOT_BORDER.getReactiveElement() as CoreReactive.App;
}

export function updateOptionsVisibility(host: any): void {
    const isVisible = host._ROOT_HOVER.get() || host._ROOT_FOCUS.get();
    if (isVisible) ensureOptionsBorder(host);
    const content = isVisible ? host._OPTIONS_BORDER_CONTENT : null;
    if (host._OPTIONS_CONTENT.get() !== content) host._OPTIONS_CONTENT.set(content);
    if (host._EDIT_MODE_ACTIVE) startDocumentPointerTracking(host);
    else stopDocumentPointerTracking(host);
}

export function containsMenuTarget(host: any, target: EventTarget | null): boolean {
    return host._OPTIONS_MENU?.containsTarget(target) ?? false;
}

export function setEditModeActive(host: any, isActive: boolean): void {
    host._EDIT_MODE_ACTIVE = isActive;
    if (isActive) {
        startDocumentPointerTracking(host);
        return;
    }

    clearOptionsHideTimeout(host);
    host._ROOT_HOVER.set(false);
    host._ROOT_FOCUS.set(false);
    if (host._OPTIONS_CONTENT.get() !== null) host._OPTIONS_CONTENT.set(null);
    stopDocumentPointerTracking(host);
}

export function scheduleOptionsHide(host: any): void {
    if (!host._ROOT_HOVER.get() || host._ROOT_FOCUS.get() || host._OPTIONS_HIDE_TIMEOUT !== null) return;
    host._OPTIONS_HIDE_TIMEOUT = window.setTimeout(() => {
        host._OPTIONS_HIDE_TIMEOUT = null;
        if (host._ROOT_FOCUS.get()) return;
        host._ROOT_HOVER.set(false);
        updateOptionsVisibility(host);
    }, 250);
}

export function clearOptionsHideTimeout(host: any): void {
    if (host._OPTIONS_HIDE_TIMEOUT === null) return;
    window.clearTimeout(host._OPTIONS_HIDE_TIMEOUT);
    host._OPTIONS_HIDE_TIMEOUT = null;
}

export function disposeRootBorder(host: any): void {
    const rootBorder = host._ROOT_BORDER as any;
    rootBorder?.dispose?.();
    rootBorder?.getScope?.().dispose?.();
    host._ROOT_BORDER = null;

    const optionsEffect = host._OPTIONS_EFFECT as any;
    optionsEffect?.dispose?.();
    optionsEffect?.getScope?.().dispose?.();
    host._OPTIONS_EFFECT = null;

    const optionsBorder = host._OPTIONS_BORDER as any;
    optionsBorder?.dispose?.();
    optionsBorder?.getScope?.().dispose?.();
    host._OPTIONS_BORDER = null;

    host._OPTIONS_MENU?.dispose?.();
    host._OPTIONS_MENU = null;
    host._OPTIONS_BORDER_CONTENT = null;
}

function ensureOptionsBorder(host: any): void {
    if (host._OPTIONS_BORDER_CONTENT) return;

    host._OPTIONS_MENU_ITEMS ??= CoreObservable.App.computed(
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
            host._COMPONENT_PROPS_BIND.prop_hasHeaderSetting,
            host._COMPONENT_PROPS_BIND.prop_hasHeaderDelete,
            host._COMPONENT_PROPS_BIND.prop_hasHeaderColumn,
            host._COMPONENT_PROPS_BIND.prop_hasHeaderChildrenMode,
        ],
        host.getScope(),
    );

    host._OPTIONS_MENU ??= new ComponentMenuMore.Component({
        prop_items: host._OPTIONS_MENU_ITEMS,
        prop_isFullWidth: false,
        prop_menuBackgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        prop_menuIconColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
    } as any, {
        SELECT_ITEM: (event, dataArgs) => host.handleOptionSelection(event, dataArgs?.ITEM?.action),
    } as any);

    host._OPTIONS_BORDER ??= new ComponentBorder.Component({
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
        prop_content: host._OPTIONS_MENU.getReactiveElement(),
    } as any);
    host._OPTIONS_BORDER_CONTENT = {
        getElement: () => host._OPTIONS_BORDER?.getElement() as HTMLElement,
        dispose: () => {},
    };
}

function startDocumentPointerTracking(host: any): void {
    if (host._DOCUMENT_POINTER_MOVE_HANDLER) return;
    host._DOCUMENT_POINTER_MOVE_HANDLER = (event: PointerEvent | MouseEvent) => {
        const target = event.target;
        const isInsideCreator = target instanceof Node && host.getElement().contains(target);
        const isInsideMenu = containsMenuTarget(host, target);
        if (isInsideCreator) {
            clearOptionsHideTimeout(host);
            if (!host._ROOT_HOVER.get()) {
                host._ROOT_HOVER.set(true);
                updateOptionsVisibility(host);
            }
            return;
        }
        if (isInsideMenu) {
            clearOptionsHideTimeout(host);
            return;
        }
        if (host._ROOT_FOCUS.get()) return;
        scheduleOptionsHide(host);
    };
    document.addEventListener("pointermove", host._DOCUMENT_POINTER_MOVE_HANDLER, true);
    document.addEventListener("mousemove", host._DOCUMENT_POINTER_MOVE_HANDLER as (event: MouseEvent) => void, true);
    document.addEventListener("mouseover", host._DOCUMENT_POINTER_MOVE_HANDLER as (event: MouseEvent) => void, true);
    host._DOCUMENT_FOCUS_IN_HANDLER = (event: FocusEvent) => {
        const target = event.target;
        const isInsideCreator = target instanceof Node && host.getElement().contains(target);
        const isInsideMenu = containsMenuTarget(host, target);
        const isFocusedInside = isInsideCreator || isInsideMenu;
        host._ROOT_FOCUS.set(isFocusedInside);
        if (isFocusedInside) clearOptionsHideTimeout(host);
        updateOptionsVisibility(host);
    };
    document.addEventListener("focusin", host._DOCUMENT_FOCUS_IN_HANDLER, true);
    host._DOCUMENT_FOCUS_OUT_HANDLER = (event: FocusEvent) => {
        const relatedTarget = event.relatedTarget;
        const focusRemainsInside = relatedTarget instanceof Node && (
            host.getElement().contains(relatedTarget) || containsMenuTarget(host, relatedTarget)
        );
        if (focusRemainsInside) return;
        host._ROOT_FOCUS.set(false);
        updateOptionsVisibility(host);
    };
    document.addEventListener("focusout", host._DOCUMENT_FOCUS_OUT_HANDLER, true);
}

function stopDocumentPointerTracking(host: any): void {
    if (host._DOCUMENT_POINTER_MOVE_HANDLER) {
        document.removeEventListener("pointermove", host._DOCUMENT_POINTER_MOVE_HANDLER, true);
        document.removeEventListener("mousemove", host._DOCUMENT_POINTER_MOVE_HANDLER as (event: MouseEvent) => void, true);
        document.removeEventListener("mouseover", host._DOCUMENT_POINTER_MOVE_HANDLER as (event: MouseEvent) => void, true);
        host._DOCUMENT_POINTER_MOVE_HANDLER = null;
    }
    if (host._DOCUMENT_FOCUS_IN_HANDLER) {
        document.removeEventListener("focusin", host._DOCUMENT_FOCUS_IN_HANDLER, true);
        host._DOCUMENT_FOCUS_IN_HANDLER = null;
    }
    if (host._DOCUMENT_FOCUS_OUT_HANDLER) {
        document.removeEventListener("focusout", host._DOCUMENT_FOCUS_OUT_HANDLER, true);
        host._DOCUMENT_FOCUS_OUT_HANDLER = null;
    }
}

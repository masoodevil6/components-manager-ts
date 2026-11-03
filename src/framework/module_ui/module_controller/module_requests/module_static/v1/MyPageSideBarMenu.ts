import * as Core from "@/core";
import * as CoreConfig from "@/core_configs";
import * as CoreEvent from "@/core_event";
import * as CoreLanguage from "@/core_languages";
import * as CoreObservable from "@/core_observable";
import * as UiCategory from "@/ui_categories";
import * as UiIcons from "@/ui_icons";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {RequestManager} from "../../class/RequestManager";
import {HttpStatusCode} from "@/util_consts";
import {RequestMethod} from "../../types/RequestMethod";
import type {MenuMoreItem} from "../../../../module_components/lists/componentMenuMore/Props";

export const MY_PAGE_SIDE_BAR_MENU_SOURCE = "framework.ui.controller.requests.static.v1.myPage.tools.sideBarMenu";

const SIDE_BAR_MENU_WIDGET_SOURCE = [
    "const names = response?.workflowNodeNames ?? {};",
    "const categoryTitle = document.createElement('h3');",
    "categoryTitle.textContent = response?.title ?? 'Categories';",
    "categoryTitle.style.margin = '0';",
    "categoryTitle.style.color = 'var(--shanColor1)';",
    "const sourceItems = Array.isArray(response?.items) ? response.items : [];",
    "const filterMenuItems = (entries, query) => {",
    "    const normalizedQuery = String(query ?? '').trim().toLocaleLowerCase();",
    "    if (!normalizedQuery) return entries;",
    "    const filtered = [];",
    "    for (const entry of entries ?? []) {",
    "        if (!entry || typeof entry !== 'object') continue;",
    "        if (entry.type === 'group') {",
    "            const items = filterMenuItems(entry.items, normalizedQuery);",
    "            if (items.length) filtered.push({...entry, items});",
    "            continue;",
    "        }",
    "        if (entry.separator) continue;",
    "        const titleMatches = String(entry.title ?? '').toLocaleLowerCase().includes(normalizedQuery);",
    "        const children = filterMenuItems(entry.children, normalizedQuery);",
    "        if (titleMatches) filtered.push(entry);",
    "        else if (children.length) filtered.push({...entry, children});",
    "    }",
    "    return filtered;",
    "};",
    "const categoryMenu = UiCategory.UI.Menus.MenuMore({",
    '    prop_workflowChildName: String(names.categoryMenu ?? "categoryMenu"),',
    '    prop_orientation: "vertical",',
    "    prop_directionRtl: response?.directionRtl ?? null,",
    "    prop_isFullWidth: true,",
    '    prop_menuBackgroundColor: response?.menuBackgroundColor ?? "var(--primaryColor3)",',
    "    prop_items: sourceItems,",
    "}, response?.methods ?? {});",
    "const searchInput = UiCategory.UI.Inputs.Input({",
    '    prop_workflowChildName: String(names.searchInput ?? "searchInput"),',
    '    prop_name: "sideBarMenuSearch",',
    '    prop_value: "",',
    '    prop_labelTitle: response?.searchTitle ?? "Search menu",',
    '    prop_placeholder: response?.searchPlaceholder ?? "Search menu...",',
    "    prop_icon: response?.searchIcon ?? null,",
    "}, {",
    "    INPUT_CHANGE: (_event, _dataArgs, componentArgs) => {",
    "        categoryMenu.set('prop_items', filterMenuItems(sourceItems, componentArgs?.VALUE));",
    "    },",
    "});",
    "const contentSearchInput = typeof response?.onSearch === 'function' ? UiCategory.UI.Inputs.Input({",
    '    prop_workflowChildName: String(names.contentSearchInput ?? "contentSearchInput"),',
    '    prop_name: "sideBarContentSearch",',
    '    prop_value: "",',
    '    prop_labelTitle: response?.contentSearchTitle ?? "Search content",',
    '    prop_placeholder: response?.contentSearchPlaceholder ?? "Search...",',
    "    prop_icon: response?.searchIcon ?? null,",
    "}, {",
    "    INPUT_CHANGE: function(_event, _dataArgs, componentArgs) {",
    "        const source = this?.getComponentWorkflow?.();",
    "        if (source) response.onSearch(source, componentArgs?.VALUE ?? '');",
    "    },",
    "}) : null;",
    "return UiCategory.UI.Basic.Layout({",
    '    classList: ["d-flex", "flex-column", "gap-3", "p-3"],',
    '    styles: {color: "var(--shanColor1)"},',
    '    prop_col: "COL_12",',
    "    prop_layoutContent: [",
    '        {content: categoryTitle, col: "COL_12"},',
    '        ...(contentSearchInput ? [{content: contentSearchInput, col: "COL_12", workflowChildName: String(names.contentSearchInput ?? "contentSearchInput")}] : []),',
    '        {content: searchInput, col: "COL_12", workflowChildName: String(names.searchInput ?? "searchInput")},',
    '        {content: categoryMenu, col: "COL_12", workflowChildName: String(names.categoryMenu ?? "categoryMenu")},',
    "    ],",
    "});",
].join("\n");

type SideBarMenuWorkflowNames = Partial<Record<"categoryMenu" | "searchInput" | "contentSearchInput", string>>;

export type SideBarMenuControllerParams = Record<string, unknown> & {
    title?: string | null;
    items?: MenuMoreItem[] | string | null;
    workflowNodeNames?: SideBarMenuWorkflowNames;
    searchTitle?: string | null;
    searchPlaceholder?: string | null;
    contentSearchTitle?: string | null;
    contentSearchPlaceholder?: string | null;
    menuBackgroundColor?: string | null;
    methods?: Record<string, (...args: any[]) => any> | null;
    onSearch?: (source: CoreEvent.TStepRef, query: string) => void;
    widget?: Record<string, unknown> | null;
};

export const sideBarMenu = (params: SideBarMenuControllerParams = {}) => {
    const title = params.title?.trim() || "Categories";
    const workflowChildNames = {
        categoryMenu: params.workflowNodeNames?.categoryMenu ?? Core.Dictionary.WorkflowNodeNames.categoryMenu,
        searchInput: params.workflowNodeNames?.searchInput ?? Core.Dictionary.WorkflowNodeNames.sideBarSearchInput,
        contentSearchInput: params.workflowNodeNames?.contentSearchInput ?? Core.Dictionary.WorkflowNodeNames.sideBarContentSearchInput,
    };
    const directionRtl = CoreObservable.App.computed(
        (isRtl: boolean) => !isRtl,
        [CoreConfig.Settings.DirectionRtl.observable()],
    );

    return new RequestManager({
        state: HttpStatusCode.OK,
        status: true,
        messages: ["Sidebar menu is ready."],
        widget: params.widget ?? null,
        data: {
            title,
            items: parseItems(params.items),
            workflowNodeNames: workflowChildNames,
            searchTitle: params.searchTitle?.trim() || "Search menu",
            searchPlaceholder: params.searchPlaceholder?.trim() || "Search menu...",
            contentSearchTitle: params.contentSearchTitle?.trim() || "Search content",
            contentSearchPlaceholder: params.contentSearchPlaceholder?.trim() || "Search...",
            searchIcon: UiIcons.Src.FileSearch.Definition,
            directionRtl,
            onSearch: params.onSearch ?? null,
            menuBackgroundColor: params.menuBackgroundColor ??
                UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_3),
            methods: params.methods ?? {},
        },
        source: SIDE_BAR_MENU_WIDGET_SOURCE,
        reference: {
            source: MY_PAGE_SIDE_BAR_MENU_SOURCE,
            method: RequestMethod.INTERNAL,
            respondedAt: new Date(),
        },
    }).get();
};

function parseItems(value: MenuMoreItem[] | string | null | undefined): MenuMoreItem[] {
    if (Array.isArray(value)) return value;
    if (typeof value === "string" && value.trim()) {
        try {
            const parsed: unknown = JSON.parse(value);
            if (Array.isArray(parsed)) return parsed as MenuMoreItem[];
        } catch {
            // Invalid JSON falls back to the registered UI category tree.
        }
    }
    return createComponentCategoryMenuItems();
}

function createComponentCategoryMenuItems(): MenuMoreItem[] {
    type CategoryDefinition = {
        id?: string;
        name?: any;
        children?: CategoryDefinition[];
    };

    const rootsById = new Map<string, CategoryDefinition>();
    for (const group of Object.values(UiCategory.UI) as any[]) {
        const definition = group?.Definition as CategoryDefinition | undefined;
        if (definition?.id) rootsById.set(String(definition.id), definition);
    }

    const getTitle = (category: CategoryDefinition): string => {
        const id = String(category.id ?? "category");
        return category.name != null
            ? CoreLanguage.App.translate(category.name).get() || id
            : id;
    };

    const toMenuItem = (category: CategoryDefinition, parentPath: string[] = []): MenuMoreItem => {
        const categoryId = String(category.id ?? getTitle(category));
        const path = [...parentPath, categoryId];
        const children = (category.children ?? [])
            .filter((child) => !!child?.id)
            .slice()
            .sort((left, right) => getTitle(left).localeCompare(getTitle(right)))
            .map((child) => toMenuItem(child, path));

        return {
            id: `category:${path.join("/")}`,
            title: getTitle(category),
            ...(children.length ? {openOn: "click" as const, children} : {}),
        };
    };

    return Array.from(rootsById.values())
        .sort((left, right) => getTitle(left).localeCompare(getTitle(right)))
        .map((category) => toMenuItem(category));
}

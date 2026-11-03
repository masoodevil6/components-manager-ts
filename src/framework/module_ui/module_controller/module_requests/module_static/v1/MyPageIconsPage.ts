import * as Core from "@/core";
import * as CoreLanguage from "@/core_languages";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as UiCategory from "@/ui_categories";
import * as UiCategories from "@/ui_categories";
import * as UiIcons from "@/ui_icons";
import type {MenuMoreItem} from "../../../../module_components/lists/componentMenuMore/Props";
import {createPageSearchWorkflow} from "./PageSearchWorkflow";
import {RequestManager} from "../../class/RequestManager";
import {HttpStatusCode} from "@/util_consts";
import {RequestMethod} from "../../types/RequestMethod";

export const MY_PAGE_ICONS_PAGE_SOURCE = "framework.ui.controller.requests.static.v1.myPage.icons.iconsPage";

type IconsPageWorkflowNames = Partial<Record<
    "iconsPage" | "iconsCategoryMenu",
    string
>>;

export type IconsPageControllerParams = Record<string, unknown> & {
    workflowNodeNames?: IconsPageWorkflowNames;
    widget?: Record<string, unknown> | null;
};

export const iconsPage = (params: IconsPageControllerParams = {}) => {
    const workflowNodeNames = {...Core.Dictionary.WorkflowNodeNames, ...(params.workflowNodeNames ?? {})};
    const catalog = createIconsCatalog();
    const selectedCategory = new CoreObservable.App("");
    const searchText = new CoreObservable.App("");
    const searchWorkflow = createPageSearchWorkflow((query) => searchText.set(query));
    const sideBarMenuController = UiCategory.UI.Controllers.MyPage.Tools.sideBarMenu({
        title: "Categories",
        workflowNodeNames: {categoryMenu: workflowNodeNames.iconsCategoryMenu},
        items: catalog.menuItems,
        contentSearchTitle: "Search icons",
        contentSearchPlaceholder: "Search icons...",
        onSearch: searchWorkflow.notify,
        methods: {
            SELECT_ITEM: (_event: Event, dataArgs: {ITEM?: MenuMoreItem}) => {
                const selected = dataArgs?.ITEM?.action;
                selectedCategory.set(!selected || selected === "all" ? "" : selected);
            },
        },
    });
    const content = createIconsCatalogContent(catalog, selectedCategory, searchText);
    return new RequestManager({
        state: HttpStatusCode.OK,
        status: true,
        messages: ["Icons page content and sidebar are ready."],
        widget: params.widget ?? null,
        data: {
            content,
            sidebar: sideBarMenuController,
            onPageCreated: searchWorkflow.attach,
        },
        reference: {
            source: MY_PAGE_ICONS_PAGE_SOURCE,
            method: RequestMethod.INTERNAL,
            respondedAt: new Date(),
        },
    }).get();
};

type IconEntry = {
    categoryPath: string;
    title: string;
    titleKey: string;
    description: string;
    workflowChildName: string;
    render: () => any;
};
type IconCategoryDefinition = {
    id?: string;
    name?: any;
    icons?: any[];
    children?: IconCategoryDefinition[];
};
type IconsCatalog = {
    entries: IconEntry[];
    categoryLabels: Map<string, string>;
    menuItems: MenuMoreItem[];
};

function createIconsCatalog(): IconsCatalog {
    const entries: IconEntry[] = [];
    const categoryLabels = new Map<string, string>();
    const rootsById = new Map<string, IconCategoryDefinition>();

    const getCategoryTitle = (category: IconCategoryDefinition): string => {
        const id = String(category.id ?? "category");
        return category.name != null ? CoreLanguage.App.translate(category.name).get() || id : id;
    };
    const toMenuItem = (category: IconCategoryDefinition, parentIds: string[] = []): MenuMoreItem => {
        const id = String(category.id ?? getCategoryTitle(category));
        const pathParts = [...parentIds, id];
        const path = pathParts.join("/");
        const children = (category.children ?? [])
            .filter((child) => !!child?.id)
            .slice()
            .sort((left, right) => getCategoryTitle(left).localeCompare(getCategoryTitle(right)))
            .map((child) => toMenuItem(child, pathParts));
        if (children.length) children.unshift({id: `icons-all:${path}`, title: `All ${getCategoryTitle(category)}`, action: path});
        return {
            id: `icons-category:${path}`,
            title: getCategoryTitle(category),
            action: path,
            ...(children.length ? {openOn: "click" as const, children} : {}),
        };
    };

    const visitCategory = (category: IconCategoryDefinition, parentIds: string[] = [], parentLabels: string[] = []) => {
        if (!category?.id) return;
        const id = String(category.id);
        const label = getCategoryTitle(category);
        const pathParts = [...parentIds, id];
        const labels = [...parentLabels, label];
        const categoryPath = pathParts.join("/");
        categoryLabels.set(categoryPath, labels.join(" / "));

        for (const icon of category.icons ?? []) {
            const definition = typeof icon === "function" ? icon.info : icon;
            if (!definition?.title) continue;
            const titleKey = String(definition.title);
            const title = CoreLanguage.App.translate(definition.title).get() || titleKey;
            const description = definition.description
                ? CoreLanguage.App.translate(definition.description).get()
                : "";
            entries.push({
                categoryPath,
                title,
                titleKey,
                description,
                workflowChildName: `icon-${toWorkflowName(`${categoryPath}-${titleKey}-${entries.length}`)}`,
                render: () => typeof icon === "function"
                    ? icon({size: 48})
                    : UiIcons.CreateIcon(icon, {size: 48}),
            });
        }
        for (const child of category.children ?? []) visitCategory(child, pathParts, labels);
    };

    for (const category of Object.values(UiCategories.Icons) as any[]) {
        const definition = category?.Definition as IconCategoryDefinition | undefined;
        if (!definition?.id) continue;
        rootsById.set(String(definition.id), definition);
        visitCategory(definition);
    }
    entries.sort((left, right) => left.title.localeCompare(right.title));
    const menuItems: MenuMoreItem[] = [
        {id: "all-icons", title: "All", action: "all"},
        ...Array.from(rootsById.values())
            .sort((left, right) => getCategoryTitle(left).localeCompare(getCategoryTitle(right)))
            .map((category) => toMenuItem(category)),
    ];
    return {entries, categoryLabels, menuItems};
}

function createIconsCatalogContent(
    catalog: IconsCatalog,
    selectedCategory: CoreObservable.App<string>,
    searchText: CoreObservable.App<string>,
): CoreReactive.App {
    let renderedComponents: Array<{dispose?: () => void}> = [];

    const renderCards = (selectedPath: string, currentSearch: string): CoreReactive.App => {
        renderedComponents.forEach((component) => component.dispose?.());
        renderedComponents = [];
        const query = currentSearch.trim().toLocaleLowerCase();
        const filtered = catalog.entries.filter((icon) => {
            const matchesCategory = !selectedPath
                || icon.categoryPath === selectedPath
                || icon.categoryPath.startsWith(`${selectedPath}/`);
            const matchesSearch = !query
                || `${icon.title} ${icon.titleKey} ${icon.description}`.toLocaleLowerCase().includes(query);
            return matchesCategory && matchesSearch;
        });
        const grouped = new Map<string, IconEntry[]>();
        for (const icon of filtered) {
            const group = grouped.get(icon.categoryPath) ?? [];
            group.push(icon);
            grouped.set(icon.categoryPath, group);
        }

        const groups = Array.from(grouped.entries())
            .sort(([left], [right]) => (catalog.categoryLabels.get(left) ?? left).localeCompare(catalog.categoryLabels.get(right) ?? right))
            .map(([categoryPath, icons]) => {
                const cards = icons.map((icon) => {
                    const preview = CoreReactive.App.section({
                        className: ["d-flex", "flex-column", "align-items-center", "justify-content-center", "text-center", "w-100", "py-3"],
                        children: [
                            CoreReactive.App.section({
                                className: ["d-flex", "align-items-center", "justify-content-center"],
                                styles: {minHeight: "4rem"},
                                children: [icon.render()],
                            }),
                            ...(icon.description
                                ? [CoreReactive.App.section({className: ["small", "text-muted", "mt-2"], children: [icon.description]})]
                                : []),
                        ],
                    });
                    const card = UiCategory.UI.Contents.CardViewInfo({
                        prop_workflowChildName: icon.workflowChildName,
                        classList: ["w-100", "h-100"],
                        prop_title: icon.title,
                        prop_content: preview.getElement(),
                    });
                    renderedComponents.push(card);
                    return CoreReactive.App.section({
                        className: ["col-6", "col-md-4", "col-xl-3", "p-2"],
                        children: [card.getElement()],
                    });
                });
                const categoryName = toWorkflowName(categoryPath);
                const collapse = UiCategory.UI.Contents.Collapse({
                    prop_workflowChildName: `category-${categoryName}`,
                    prop_collapseTitle: catalog.categoryLabels.get(categoryPath) ?? categoryPath,
                    prop_collapseBodyIsOpen: true,
                    prop_collapseBody: CoreReactive.App.section({
                        className: ["row", "w-100", "m-0"],
                        children: cards,
                    }),
                } as any);
                renderedComponents.push(collapse);
                return CoreReactive.App.section({className: ["col-12", "p-2"], children: [collapse.getElement()]});
            });
        if (groups.length === 0) {
            groups.push(CoreReactive.App.section({
                className: ["col-12", "p-3", "text-muted"],
                children: ["No icons match these filters."],
            }));
        }
        return CoreReactive.App.section({className: ["row", "w-100", "m-0"], children: groups});
    };

    const results = CoreObservable.App.computed(
        (category: string, query: string) => renderCards(category, query),
        [selectedCategory, searchText],
    );
    return CoreReactive.App.section({
        className: ["d-flex", "flex-column", "w-100"],
        children: [results],
    });
}

function toWorkflowName(value: string): string {
    const slug = value.replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "") || "item";
    let hash = 2166136261;
    for (let index = 0; index < value.length; index++) {
        hash ^= value.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
    }
    return `${slug}-${(hash >>> 0).toString(36)}`;
}


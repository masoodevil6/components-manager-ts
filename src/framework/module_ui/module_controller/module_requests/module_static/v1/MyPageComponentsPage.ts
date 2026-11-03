import * as Core from "@/core";
import * as CoreComponents from "@/core_components";
import * as CoreLanguage from "@/core_languages";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as UiCategory from "@/ui_categories";
import type {MenuMoreItem} from "../../../../module_components/lists/componentMenuMore/Props";
import {createPageSearchWorkflow} from "./PageSearchWorkflow";
import {RequestManager} from "../../class/RequestManager";
import {HttpStatusCode} from "@/util_consts";
import {RequestMethod} from "../../types/RequestMethod";

export const MY_PAGE_COMPONENTS_PAGE_SOURCE = "framework.ui.controller.requests.static.v1.myPage.components.componentsPage";

type ComponentsPageWorkflowNames = Partial<Record<
    "componentsPage" | "categoryMenu",
    string
>>;

export type ComponentsPageControllerParams = Record<string, unknown> & {
    workflowNodeNames?: ComponentsPageWorkflowNames;
    widget?: Record<string, unknown> | null;
};

const navigateToRoute = (path: string): void => {
    window.dispatchEvent(new CustomEvent("framework:route:navigate", {detail: {path}}));
};

export const componentsPage = (params: ComponentsPageControllerParams = {}) => {
    const workflowNodeNames = {...Core.Dictionary.WorkflowNodeNames, ...(params.workflowNodeNames ?? {})};
    const catalog = createComponentsCatalog();
    const selectedCategory = new CoreObservable.App("");
    const searchText = new CoreObservable.App("");
    const searchWorkflow = createPageSearchWorkflow((query) => searchText.set(query));
    const sideBarMenuController = UiCategory.UI.Controllers.MyPage.Tools.sideBarMenu({
        title: "Categories",
        workflowNodeNames: {categoryMenu: workflowNodeNames.categoryMenu},
        items: catalog.menuItems,
        contentSearchTitle: "Search components",
        contentSearchPlaceholder: "Search components...",
        onSearch: searchWorkflow.notify,
        methods: {
            SELECT_ITEM: (_event: Event, dataArgs: {ITEM?: MenuMoreItem}) => {
                const selected = dataArgs?.ITEM?.action;
                selectedCategory.set(!selected || selected === "all" ? "" : selected);
            },
        },
    });
    const content = createComponentsCatalogContent(catalog, selectedCategory, searchText);
    return new RequestManager({
        state: HttpStatusCode.OK,
        status: true,
        messages: ["Components page content and sidebar are ready."],
        widget: params.widget ?? null,
        data: {
            content,
            sidebar: sideBarMenuController,
            onPageCreated: searchWorkflow.attach,
        },
        reference: {
            source: MY_PAGE_COMPONENTS_PAGE_SOURCE,
            method: RequestMethod.INTERNAL,
            respondedAt: new Date(),
        },
    }).get();
};

type ComponentsCatalogEntry = ReturnType<typeof CoreComponents.ComponentManager.list>[number];
type CatalogCategoryDefinition = {
    id?: string;
    name?: any;
    components?: Array<{info?: {id?: string}}>;
    children?: CatalogCategoryDefinition[];
};
type ComponentsCatalog = {
    entries: ComponentsCatalogEntry[];
    categoryLabels: Map<string, string>;
    categoryOf: (entry: ComponentsCatalogEntry) => string;
    menuItems: MenuMoreItem[];
};

function createComponentsCatalog(): ComponentsCatalog {
    const entries = CoreComponents.ComponentManager.list().slice().sort((left, right) =>
        left.definition.name.localeCompare(right.definition.name),
    );
    const categoryByComponent = new Map<string, string>();
    const categoryLabels = new Map<string, string>();
    const categoryPathById = new Map<string, string | null>();
    const rootsById = new Map<string, CatalogCategoryDefinition>();

    const visitCategory = (category: CatalogCategoryDefinition, parentIds: string[] = [], parentLabels: string[] = []) => {
        if (!category?.id) return;

        const id = String(category.id);
        const name = category.name != null ? CoreLanguage.App.translate(category.name).get() || id : id;
        const ids = [...parentIds, id];
        const labels = [...parentLabels, name];
        const path = ids.join("/");
        categoryLabels.set(path, labels.join(" / "));

        const existingPath = categoryPathById.get(id);
        categoryPathById.set(id, existingPath === undefined || existingPath === path ? path : null);

        for (const item of category.components ?? []) {
            const componentId = item?.info?.id;
            if (componentId) categoryByComponent.set(componentId, path);
        }
        for (const child of category.children ?? []) visitCategory(child, ids, labels);
    };

    for (const group of Object.values(UiCategory.UI) as any[]) {
        const definition = group?.Definition as CatalogCategoryDefinition | undefined;
        if (!definition?.id) continue;
        rootsById.set(String(definition.id), definition);
        visitCategory(definition);
    }

    const categoryOf = (entry: ComponentsCatalogEntry): string => {
        const declaredCategoryId = entry.definition.category?.id;
        const declaredPath = declaredCategoryId ? categoryPathById.get(declaredCategoryId) : undefined;
        return (typeof declaredPath === "string" ? declaredPath : undefined)
            ?? categoryByComponent.get(entry.definition.id)
            ?? declaredCategoryId
            ?? "other";
    };
    const usedCategoryIds = new Set([...entries.map(categoryOf), ...categoryLabels.keys()]);
    if (usedCategoryIds.has("other")) categoryLabels.set("other", "Other");

    const getCategoryTitle = (category: CatalogCategoryDefinition): string => {
        const id = String(category.id ?? "category");
        return category.name != null ? CoreLanguage.App.translate(category.name).get() || id : id;
    };
    const toMenuItem = (category: CatalogCategoryDefinition, parentIds: string[] = []): MenuMoreItem => {
        const id = String(category.id ?? getCategoryTitle(category));
        const path = [...parentIds, id];
        const pathValue = path.join("/");
        const children = (category.children ?? [])
            .filter((child) => !!child?.id)
            .slice()
            .sort((left, right) => getCategoryTitle(left).localeCompare(getCategoryTitle(right)))
            .map((child) => toMenuItem(child, path));

        if (children.length) {
            children.unshift({
                id: `category-all:${pathValue}`,
                title: `All ${getCategoryTitle(category)}`,
                action: pathValue,
            });
        }

        return {
            id: `category:${pathValue}`,
            title: getCategoryTitle(category),
            action: pathValue,
            ...(children.length ? {openOn: "click" as const, children} : {}),
        };
    };

    const menuItems: MenuMoreItem[] = [
        {id: "all", title: "All", action: "all"},
        ...Array.from(rootsById.values())
            .sort((left, right) => getCategoryTitle(left).localeCompare(getCategoryTitle(right)))
            .map((category) => toMenuItem(category)),
    ];
    if (usedCategoryIds.has("other")) menuItems.push({id: "category:other", title: "Other", action: "other"});

    return {entries, categoryLabels, categoryOf, menuItems};
}

function createComponentsCatalogContent(
    catalog: ComponentsCatalog,
    selectedCategory: CoreObservable.App<string>,
    searchText: CoreObservable.App<string>,
): CoreReactive.App {
    let renderedComponents: Array<{dispose?: () => void}> = [];

    const renderCards = (selectedPath: string, currentSearch: string): CoreReactive.App => {
        renderedComponents.forEach((component) => component.dispose?.());
        renderedComponents = [];

        const query = currentSearch.trim().toLocaleLowerCase();
        const filtered = catalog.entries.filter((entry) => {
            const categoryPath = catalog.categoryOf(entry);
            const matchesCategory = !selectedPath || categoryPath === selectedPath || categoryPath.startsWith(`${selectedPath}/`);
            const description = getComponentEntryDescription(entry);
            const searchable = `${entry.definition.name} ${entry.definition.id} ${description} ${catalog.categoryLabels.get(categoryPath) ?? categoryPath}`.toLocaleLowerCase();
            return matchesCategory && (!query || searchable.includes(query));
        });
        const entriesByCategory = new Map<string, ComponentsCatalogEntry[]>();
        for (const entry of filtered) {
            const categoryPath = catalog.categoryOf(entry);
            const group = entriesByCategory.get(categoryPath) ?? [];
            group.push(entry);
            entriesByCategory.set(categoryPath, group);
        }

        const categoryGroups = Array.from(entriesByCategory.entries())
            .sort(([left], [right]) => (catalog.categoryLabels.get(left) ?? left).localeCompare(catalog.categoryLabels.get(right) ?? right))
            .map(([categoryPath, categoryEntries]) => {
                const componentCards = categoryEntries.map((entry) => {
                    const examples = CoreComponents.ComponentManager.getExamples(entry.definition.id);
                    const description = getComponentEntryDescription(entry);
                    const details = [
                        description,
                        entry.definition.id,
                        entry.definition.version,
                        `${examples.length} example${examples.length === 1 ? "" : "s"}`,
                    ].filter(Boolean).join(" · ");
                    const card = UiCategory.UI.Contents.CardViewClicable({
                        prop_workflowChildName: `component-${entry.definition.id}`,
                        classList: ["w-100", "h-100"],
                        prop_title: entry.definition.name,
                        prop_content: details,
                    }, {
                        CLICK: () => navigateToRoute(`/v2/components/${encodeURIComponent(entry.definition.name)}`),
                    } as any);
                    renderedComponents.push(card);
                    return CoreReactive.App.section({
                        className: ["col-12", "col-md-6", "col-xl-4", "p-2"],
                        children: [card.getElement()],
                    });
                });

                const groupCollapse = UiCategory.UI.Contents.Collapse({
                    prop_workflowChildName: `category-${categoryPath.replace(/[^a-zA-Z0-9_-]+/g, "-")}`,
                    prop_collapseTitle: catalog.categoryLabels.get(categoryPath) ?? categoryPath,
                    prop_collapseBodyIsOpen: true,
                    prop_collapseBody: CoreReactive.App.section({
                        className: ["row", "w-100", "m-0"],
                        children: componentCards,
                    }),
                } as any);
                renderedComponents.push(groupCollapse);
                return CoreReactive.App.section({
                    className: ["col-12", "p-2"],
                    children: [groupCollapse.getElement()],
                });
            });

        if (categoryGroups.length === 0) {
            categoryGroups.push(CoreReactive.App.div({
                className: ["col-12", "p-3", "text-muted"],
                children: ["No components match these filters."],
            }));
        }
        return CoreReactive.App.section({className: ["row", "w-100", "m-0"], children: categoryGroups});
    };

    const content = CoreObservable.App.computed(
        (category: string, query: string) => renderCards(category, query),
        [selectedCategory, searchText],
    );
    return CoreReactive.App.section({className: ["w-100"], children: [content]});
}

function getComponentEntryDescription(entry: ComponentsCatalogEntry): string {
    const descriptionSchema = Object.entries(entry.schemas ?? {}).find(([name, schema]: [string, any]) =>
        name !== "COMPONENT" && name !== "STRUCTURE" && (schema.description || schema.descriptionKey),
    )?.[1] as any;
    const descriptionKey = descriptionSchema?.description ?? descriptionSchema?.descriptionKey;
    return descriptionKey ? CoreLanguage.App.translate(descriptionKey).get() : "";
}


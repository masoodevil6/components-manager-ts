import {ITemplate} from "@/core_route";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as CoreComponents from "@/core_components";
import * as CoreLanguage from "@/core_languages";
import * as CoreConfig from "@/core_configs";
import * as UtilStyle from "@/util_styles";
import * as UiCategory from "@/ui_categories";
import * as UiIcons from "@/ui_icons";

export class ClComponentsPage implements ITemplate {
    render(): HTMLElement {
        const entries = CoreComponents.ComponentManager.list().slice().sort((left, right) =>
            left.definition.name.localeCompare(right.definition.name),
        );

        // Component definitions do not currently carry category metadata, so build
        // category paths from the nested UI category definitions.
        const categoryByComponent = new Map<string, string>();
        const categoryLabels = new Map<string, string>();
        const categoryPathById = new Map<string, string | null>();
        const visitCategory = (category: any, parentIds: string[] = [], parentLabels: string[] = []) => {
            if (!category?.id) return;

            const id = String(category.id);
            const name = CoreLanguage.App.translate(category.name).get() || id;
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
            if (group?.Definition) visitCategory(group.Definition);
        }

        const categoryOf = (entry: typeof entries[number]) => {
            const declaredCategoryId = entry.definition.category?.id;
            const declaredPath = declaredCategoryId ? categoryPathById.get(declaredCategoryId) : undefined;
            return (typeof declaredPath === "string" ? declaredPath : undefined)
                ?? categoryByComponent.get(entry.definition.id)
                ?? declaredCategoryId
                ?? "other";
        };
        const usedCategoryIds = new Set([...entries.map(categoryOf), ...categoryLabels.keys()]);
        if (usedCategoryIds.has("other")) categoryLabels.set("other", "Other");

        let selectedCategory = "";
        let searchText = "";
        let renderedCards: any[] = [];
        const cardsContainer = CoreReactive.App.section({className: ["row", "w-100", "m-0"]});
        const cardsElement = cardsContainer.getElement();

        const renderCards = () => {
            renderedCards.forEach((card) => card.dispose?.());
            renderedCards = [];
            const query = searchText.trim().toLocaleLowerCase();
            const filtered = entries.filter((entry) => {
                const entryCategory = categoryOf(entry);
                const matchesCategory = !selectedCategory
                    || entryCategory === selectedCategory
                    || entryCategory.startsWith(`${selectedCategory}/`);
                const matchesName = !query || `${entry.definition.name} ${entry.definition.id}`.toLocaleLowerCase().includes(query);
                return matchesCategory && matchesName;
            });

            const entriesByCategory = new Map<string, typeof filtered>();
            for (const entry of filtered) {
                const categoryPath = categoryOf(entry);
                const group = entriesByCategory.get(categoryPath) ?? [];
                group.push(entry);
                entriesByCategory.set(categoryPath, group);
            }

            const categoryGroups = Array.from(entriesByCategory.entries())
                .sort(([left], [right]) => (categoryLabels.get(left) ?? left).localeCompare(categoryLabels.get(right) ?? right))
                .map(([categoryPath, categoryEntries]) => {
                    const componentCards = categoryEntries.map((entry) => {
                        const examples = CoreComponents.ComponentManager.getExamples(entry.definition.id);
                        const descriptionSchema = Object.entries(entry.schemas ?? {}).find(([name, schema]: [string, any]) =>
                            name !== "COMPONENT" && name !== "STRUCTURE" && (schema.description || schema.descriptionKey),
                        )?.[1] as any;
                        const descriptionKey = descriptionSchema?.description ?? descriptionSchema?.descriptionKey;
                        const description = descriptionKey ? CoreLanguage.App.translate(descriptionKey).get() : "";
                        const details = [
                            description,
                            entry.definition.id,
                            entry.definition.version,
                            `${examples.length} example${examples.length === 1 ? "" : "s"}`,
                        ].filter(Boolean).join(" · ");
                        const card = UiCategory.UI.Contents.CardViewClicable({
                            classList: ["w-100", "h-100"],
                            prop_title: entry.definition.name,
                            prop_content: details,
                        }, {
                            CLICK: () => { window.location.href = `/components/${encodeURIComponent(entry.definition.name)}`; },
                        });
                        renderedCards.push(card);
                        return CoreReactive.App.section({
                            className: ["col-12", "col-md-6", "col-xl-4", "p-2"],
                            children: [card.getElement()],
                        }).getElement();
                    });

                    const groupCollapse = UiCategory.UI.Contents.Collapse({
                        prop_collapseTitle: categoryLabels.get(categoryPath) ?? categoryPath,
                        prop_collapseBodyIsOpen: true,
                        prop_collapseBody: CoreReactive.App.section({
                            className: ["row", "w-100", "m-0"],
                            children: componentCards,
                        }),
                    });
                    renderedCards.push(groupCollapse);
                    return CoreReactive.App.section({
                        className: ["col-12", "p-2"],
                        children: [groupCollapse.getElement()],
                    }).getElement();
                });

            if (categoryGroups.length === 0) {
                categoryGroups.push(CoreReactive.App.div({
                    className: ["col-12", "p-3", "text-muted"],
                    children: ["No components match these filters."],
                }).getElement());
            }
            cardsElement.replaceChildren(...categoryGroups);
        };

        const categoryOptions = [
            {id: "", name: "All categories", prefix: ""},
            ...Array.from(usedCategoryIds)
                .sort((left, right) => (categoryLabels.get(left) ?? left).localeCompare(categoryLabels.get(right) ?? right))
                .map((id) => ({id, name: categoryLabels.get(id) ?? id, prefix: ""})),
        ];
        const categoryFilter = UiCategory.UI.Simples.SelectCustomSimple({
            prop_selectName: "components_category",
            prop_selectValue: "",
            prop_selectPlaceholder: "All categories",
            prop_selectOptions: categoryOptions,
            prop_selectHeaderStylesEnabled: false,
            prop_selectStyles: {padding: "0"},
        } as any, {
            SELECT_CHANGE: (_event: Event, _dataArgs: any, componentArgs: any) => {
                selectedCategory = String(componentArgs?.VALUE ?? "");
                renderCards();
            },
        } as any);
        const categoryLabel = UiCategory.UI.Simples.Label({
            prop_labelTitle: "Category",
            styles: {marginBlockEnd: UtilStyle.Css_Margin(CoreConfig.Settings.SizeName.get())},
        }).getElement();
        const nameFilter = UiCategory.UI.Inputs.Input({
            prop_name: "components_name",
            prop_value: "",
            prop_labelTitle: "Component name",
            prop_placeholder: "Search component name",
        } as any, {
            INPUT_CHANGE: (_event: Event, _dataArgs: any, componentArgs: any) => {
                searchText = String(componentArgs?.VALUE ?? "");
                renderCards();
            },
        } as any);
        const filtersPanel = CoreReactive.App.section({
            className: ["row", "g-2", "w-100", "m-0"],
            children: [
                CoreReactive.App.section({className: ["col-12", "col-md-5"], children: [categoryLabel, categoryFilter.getElement()]}),
                CoreReactive.App.section({className: ["col-12", "col-md-7"], children: [nameFilter.getElement()]}),
            ],
        });
        const filtersContentPadding = CoreObservable.App.computed(
            (sizeName: any) => UtilStyle.Css_Padding(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
        );
        const filtersContent = CoreReactive.App.section({
            stylesBind: {padding: filtersContentPadding},
            children: [filtersPanel],
        });
        const filters = UiCategory.UI.Effects.Effective({
            prop_content: filtersContent,
            prop_isVisible: true,
            prop_collapseSpaceWhenHidden: true,
            prop_width: "100%",
            prop_borderClass: ["shadow-sm", "position-relative"],
            prop_borderTopLeftRadiusHas: false,
            prop_borderTopRightRadiusHas: false,
            prop_borderBottomLeftRadiusHas: false,
            prop_borderBottomRightRadiusHas: false,
        });

        const header = UiCategory.UI.Pages.Header.PageHeader({
            prop_pageTitle: "Components",
            prop_hasIconBack: true,
            prop_pageNav: [
                {name: "home", title: "Home"},
            ],
            prop_optionsList: [{
                id: "filters",
                title: "Filter",
                icon: UiIcons.Src.FileFilter.Definition,
                action: "toggleFilters",
            }],
        }, {
            BACK: () => { window.location.href = "/"; },
            SELECT_NAV_ITEM: (_event: Event, args: any) => {
                if (args?.NAME === "home") window.location.href = "/";
            },
            SELECT_OPTION: (_event: Event, args: any) => {
                if (args?.NAME !== "toggleFilters") return;
                filters.set("prop_isVisible", !filters.get("prop_isVisible"));
            },
        } as any).getElement();
        const navigation = CoreReactive.App.section({
            className: ["d-flex", "flex-column", "w-100"],
            children: [
                filters.getReactiveElement() as CoreReactive.App,
            ],
        });
        const page = UiCategory.UI.Pages.Page({
            prop_header: header,
            prop_navigation: navigation,
            prop_content: cardsContainer,
        } as any);
        renderCards();
        return page.getElement() as HTMLElement;
    }

    onLoad(_pageElement: HTMLElement): void {}
}

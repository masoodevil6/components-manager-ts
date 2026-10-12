import {ITemplate} from "@/core_route";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as CoreLanguage from "@/core_languages";
import * as CoreConfig from "@/core_configs";
import * as UtilStyle from "@/util_styles";
import * as UiCategory from "@/ui_categories";
import * as UiCategories from "@/ui_categories";
import * as UiIcons from "@/ui_icons";

type IconEntry = {
    categoryPath: string;
    title: string;
    titleKey: string;
    description: string;
    render: () => any;
};

export class ClIconPage implements ITemplate {
    render(): HTMLElement {
        const iconEntries: IconEntry[] = [];
        const categoryLabels = new Map<string, string>();

        const visitCategory = (category: any, parentIds: string[] = [], parentLabels: string[] = []) => {
            if (!category?.id) return;

            const id = String(category.id);
            const label = CoreLanguage.App.translate(category.name).get() || id;
            const ids = [...parentIds, id];
            const labels = [...parentLabels, label];
            const path = ids.join("/");
            categoryLabels.set(path, labels.join(" / "));

            for (const icon of category.icons ?? []) {
                const definition = typeof icon === "function" ? icon.info : icon;
                if (!definition?.title) continue;

                const title = CoreLanguage.App.translate(definition.title).get() || String(definition.title);
                const description = definition.description
                    ? CoreLanguage.App.translate(definition.description).get()
                    : "";
                iconEntries.push({
                    categoryPath: path,
                    title,
                    titleKey: String(definition.title),
                    description,
                    render: () => typeof icon === "function"
                        ? icon({size: 56})
                        : UiIcons.CreateIcon(icon, {size: 56}),
                });
            }

            for (const child of category.children ?? []) visitCategory(child, ids, labels);
        };

        for (const iconCategory of Object.values(UiCategories.Icons) as any[]) {
            if (iconCategory?.Definition) visitCategory(iconCategory.Definition);
        }

        iconEntries.sort((left, right) => left.title.localeCompare(right.title));

        let selectedCategory = "";
        let searchText = "";
        let renderedComponents: any[] = [];
        const iconsContainer = CoreReactive.App.section({className: ["row", "w-100", "m-0"]});
        const iconsElement = iconsContainer.getElement();

        const renderIcons = () => {
            renderedComponents.forEach((component) => component.dispose?.());
            renderedComponents = [];

            const query = searchText.trim().toLocaleLowerCase();
            const filtered = iconEntries.filter((icon) => {
                const matchesCategory = !selectedCategory
                    || icon.categoryPath === selectedCategory
                    || icon.categoryPath.startsWith(`${selectedCategory}/`);
                const matchesName = !query
                    || `${icon.title} ${icon.titleKey} ${icon.description}`.toLocaleLowerCase().includes(query);
                return matchesCategory && matchesName;
            });

            const iconsByCategory = new Map<string, IconEntry[]>();
            for (const icon of filtered) {
                const group = iconsByCategory.get(icon.categoryPath) ?? [];
                group.push(icon);
                iconsByCategory.set(icon.categoryPath, group);
            }

            const groups = Array.from(iconsByCategory.entries())
                .sort(([left], [right]) => (categoryLabels.get(left) ?? left).localeCompare(categoryLabels.get(right) ?? right))
                .map(([categoryPath, icons]) => {
                    const cards = icons.map((icon) => {
                        const preview = CoreReactive.App.section({
                            className: ["d-flex", "flex-column", "align-items-center", "justify-content-center", "text-center", "w-100", "py-3"],
                            children: [
                                CoreReactive.App.section({
                                    className: ["d-flex", "align-items-center", "justify-content-center"],
                                    styles: {minHeight: "4.5rem"},
                                    children: [icon.render()],
                                }),
                                ...(icon.description
                                    ? [CoreReactive.App.section({className: ["small", "text-muted", "mt-2"], children: [icon.description]})]
                                    : []),
                            ],
                        });
                        const card = UiCategory.UI.Contents.CardViewInfo({
                            classList: ["w-100", "h-100"],
                            prop_title: icon.title,
                            prop_content: preview.getElement(),
                        });
                        renderedComponents.push(card);
                        return CoreReactive.App.section({
                            className: ["col-6", "col-md-4", "col-xl-3", "p-2"],
                            children: [card.getElement()],
                        }).getElement();
                    });

                    const collapse = UiCategory.UI.Contents.Collapse({
                        prop_collapseTitle: categoryLabels.get(categoryPath) ?? categoryPath,
                        prop_collapseBodyIsOpen: true,
                        prop_collapseBody: CoreReactive.App.section({
                            className: ["row", "w-100", "m-0"],
                            children: cards,
                        }),
                    });
                    renderedComponents.push(collapse);
                    return CoreReactive.App.section({
                        className: ["col-12", "p-2"],
                        children: [collapse.getElement()],
                    }).getElement();
                });

            if (groups.length === 0) {
                groups.push(CoreReactive.App.section({
                    className: ["col-12", "p-3", "text-muted"],
                    children: ["No icons match these filters."],
                }).getElement());
            }
            iconsElement.replaceChildren(...groups);
        };

        const usedCategoryIds = new Set([...iconEntries.map((icon) => icon.categoryPath), ...categoryLabels.keys()]);
        const categoryOptions = [
            {id: "", name: "All categories", prefix: ""},
            ...Array.from(usedCategoryIds)
                .sort((left, right) => (categoryLabels.get(left) ?? left).localeCompare(categoryLabels.get(right) ?? right))
                .map((id) => ({id, name: categoryLabels.get(id) ?? id, prefix: ""})),
        ];
        const categoryFilter = UiCategory.UI.Simples.SelectCustomSimple({
            prop_selectName: "icons_category",
            prop_selectValue: "",
            prop_selectPlaceholder: "All categories",
            prop_selectOptions: categoryOptions,
            prop_selectHeaderStylesEnabled: false,
            prop_selectStyles: {padding: "0"},
        } as any, {
            SELECT_CHANGE: (_event: Event, _dataArgs: any, componentArgs: any) => {
                selectedCategory = String(componentArgs?.VALUE ?? "");
                renderIcons();
            },
        } as any);
        const categoryLabel = UiCategory.UI.Simples.Label({
            prop_labelTitle: "Category",
            styles: {marginBlockEnd: UtilStyle.Css_Margin(CoreConfig.Settings.SizeName.get())},
        }).getElement();
        const nameFilter = UiCategory.UI.Inputs.Input({
            prop_name: "icons_name",
            prop_value: "",
            prop_labelTitle: "Icon name",
            prop_placeholder: "Search icon name",
        } as any, {
            INPUT_CHANGE: (_event: Event, _dataArgs: any, componentArgs: any) => {
                searchText = String(componentArgs?.VALUE ?? "");
                renderIcons();
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
            prop_pageTitle: "Icons",
            prop_hasIconBack: false,
            prop_optionsList: [{
                id: "filters",
                title: "Filter",
                icon: UiIcons.Src.FileFilter.Definition,
                action: "toggleFilters",
            }],
        }, {
            SELECT_OPTION: (_event: Event, args: any) => {
                if (args?.NAME !== "toggleFilters") return;
                filters.set("prop_isVisible", !filters.get("prop_isVisible"));
            },
        } as any).getElement();
        const navigation = CoreReactive.App.section({
            className: ["d-flex", "flex-column", "w-100"],
            children: [filters.getReactiveElement() as CoreReactive.App],
        });
        const page = UiCategory.UI.Pages.Page({
            prop_header: header,
            prop_navigation: navigation,
            prop_content: iconsContainer,
        } as any);

        renderIcons();
        return page.getElement() as HTMLElement;
    }

    onLoad(_pageElement: HTMLElement): void {}
}

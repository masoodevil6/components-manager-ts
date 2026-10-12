import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const NavigationExample: ComponentExample = {
    id: "breadcrumb_shadow_navigation",
    name: Keys.category.components.breadcrumbShadow.examples.navigation.name,
    description: Keys.category.components.breadcrumbShadow.examples.navigation.description,
    render: (): HTMLElement => UiCategory.UI.Breadcrumb.BreadcrumbShadow({
        prop_pageTitle: "Page Title Sample",
        prop_pageNav: [{name: "b", title: "b1"}, {name: "a", title: "a1"}],
        prop_hasDivider: true,
    }, {
        SELECT_ITEM: (_event, dataArgs) => console.log("navigation selected", dataArgs?.NAME, dataArgs?.ITEM),
    }).getElement() as HTMLElement,
};

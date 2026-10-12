import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const WithoutBackButtonExample: ComponentExample = {
    id: "breadcrumb_shadow_without_back_button",
    name: Keys.category.components.breadcrumbShadow.examples.withoutBackButton.name,
    description: Keys.category.components.breadcrumbShadow.examples.withoutBackButton.description,
    render: (): HTMLElement => UiCategory.UI.Breadcrumb.BreadcrumbShadow({
        prop_pageTitle: "Page Title Sample",
        prop_pageNav: [{name: "b", title: "b1"}, {name: "a", title: "a1"}],
        prop_hasBtnBack: false,
    }).getElement() as HTMLElement,
};

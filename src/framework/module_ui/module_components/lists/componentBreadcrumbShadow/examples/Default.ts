import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id: "breadcrumb_shadow_default",
    name: Keys.category.components.breadcrumbShadow.examples.default.name,
    description: Keys.category.components.breadcrumbShadow.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Breadcrumb.BreadcrumbShadow({
        prop_pageTitle: "Page Title Sample",
    }).getElement() as HTMLElement,
};

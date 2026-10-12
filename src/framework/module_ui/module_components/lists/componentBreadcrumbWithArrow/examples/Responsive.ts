import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const ResponsiveExample: ComponentExample = {
    id: "breadcrumb_with_arrow_responsive",
    name: Keys.category.components.breadcrumbWithArrow.examples.responsive.name,
    description: Keys.category.components.breadcrumbWithArrow.examples.responsive.description,
    render: (): HTMLElement => UiCategory.UI.Breadcrumb.BreadcrumbWithArrow({
        prop_stepSelected: 2,
        prop_breadcrumbs: [{title: "Home"}, {title: "Products"}, {title: "Details"}, {title: "Payment"}],
    }).getElement() as HTMLElement,
};

import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id: "breadcrumb_with_arrow_default",
    name: Keys.category.components.breadcrumbWithArrow.examples.default.name,
    description: Keys.category.components.breadcrumbWithArrow.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Breadcrumb.BreadcrumbWithArrow({
        prop_stepSelected: 1,
        prop_breadcrumbs: [{title: "Account"}, {title: "Profile"}, {title: "Review"}, {title: "Complete"}],
    }, {
        SELECT_BREADCRUMB: (_event, dataArgs) => console.log("step selected", dataArgs?.ITEM),
    }).getElement() as HTMLElement,
};

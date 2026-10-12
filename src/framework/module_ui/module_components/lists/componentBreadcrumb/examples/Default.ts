import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id: "breadcrumb_default",
    name: Keys.category.components.breadcrumb.examples.default.name,
    description: Keys.category.components.breadcrumb.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Breadcrumb.Breadcrumb({
        prop_showBtn: false,
        prop_stepSelected: 2,
        prop_breadcrumbs: [
            {id: 1, title: "Home"},
            {id: 2, title: "Products"},
            {id: 3, title: "Details"},
        ],
    }, {
        SELECT_BREADCRUMB: (_event, dataArgs) => console.log("breadcrumb selected", dataArgs?.ITEM),
    }).getElement() as HTMLElement,
};

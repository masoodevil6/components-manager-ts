import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const WithBackButtonExample: ComponentExample = {
    id: "breadcrumb_with_back_button",
    name: Keys.category.components.breadcrumb.examples.withBackButton.name,
    description: Keys.category.components.breadcrumb.examples.withBackButton.description,
    render: (): HTMLElement => UiCategory.UI.Breadcrumb.Breadcrumb({
        prop_showBtn: true,
        prop_stepSelected: "settings",
        prop_breadcrumbs: [
            {id: "home", title: "Home"},
            {id: "account", title: "Account"},
            {id: "settings", title: "Settings"},
        ],
    }, {
        SELECT_BREADCRUMB: (_event, dataArgs) => console.log("breadcrumb selected", dataArgs?.ITEM),
        BACK: (_event, dataArgs) => console.log("back from step", dataArgs?.STEP_SELECTED),
    }).getElement() as HTMLElement,
};

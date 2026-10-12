import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const WithoutBackExample: ComponentExample = {
    id: "page_header_without_back",
    name: Keys.category.components.pageHeader.examples.withoutBack.name,
    description: Keys.category.components.pageHeader.examples.withoutBack.description,
    render: (): HTMLElement => UiCategory.UI.Pages.Header.PageHeader({
        prop_pageTitle: "Reports",
        prop_pageNav: [{name: "daily", title: "Daily"}, {name: "monthly", title: "Monthly"}],
        prop_hasIconBack: false,
        prop_optionsList: [],
    }).getElement() as HTMLElement,
};

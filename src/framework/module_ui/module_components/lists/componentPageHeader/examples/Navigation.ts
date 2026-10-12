import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const NavigationExample: ComponentExample = {
    id: "page_header_navigation",
    name: Keys.category.components.pageHeader.examples.navigation.name,
    description: Keys.category.components.pageHeader.examples.navigation.description,
    render: (): HTMLElement => UiCategory.UI.Pages.Header.PageHeader({
        prop_pageTitle: "Project settings",
        prop_pageNav: [
            {name: "overview", title: "Overview"},
            {name: "members", title: "Members"},
            {name: "activity", title: "Activity"},
        ],
        prop_optionsList: [{id: "help", title: "Help", action: "help"}],
    }, {
        SELECT_NAV_ITEM: (_event, args) => console.log("navigation selected", args.NAME),
    }).getElement() as HTMLElement,
};

import type {ComponentExample} from "@/core_components";
import * as CoreReactive from "@/core_reactive";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const WithNavigationAndAsideExample: ComponentExample = {
    id: "page_navigation_aside",
    name: Keys.category.components.page.examples.withNavigationAndAside.name,
    description: Keys.category.components.page.examples.withNavigationAndAside.description,
    render: (): HTMLElement => {
        const header = UiCategory.UI.Pages.Header.PageHeader({
            prop_pageTitle: "Workspace",
            prop_hasIconBack: false,
        }).getReactiveElement() as CoreReactive.App;
        const navigation = CoreReactive.App.section({
            className: ["d-flex", "gap-3"],
            children: [
                CoreReactive.App.b({children: ["Overview"]}),
                CoreReactive.App.span({children: ["Activity"]}),
                CoreReactive.App.span({children: ["Members"]}),
            ],
        });

        return UiCategory.UI.Pages.Page({
            prop_isFullHeight: false,
            prop_header: header,
            prop_navigation: navigation,
            prop_content: "The content column expands to fill the available space.",
            prop_aside: "Aside information appears beside the content on wide screens.",
            prop_asideWidth: "280px",
            prop_footer: "Workspace footer",
        }).getElement() as HTMLElement;
    },
};

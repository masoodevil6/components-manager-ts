import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id: "page_default",
    name: Keys.category.components.page.examples.default.name,
    description: Keys.category.components.page.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Pages.Page({
        prop_isFullHeight: false,
        prop_header: "Page header",
        prop_navigation: "Dashboard / Overview",
        prop_content: "Main page content goes here.",
        prop_aside: "Related information",
        prop_footer: "Page footer",
    }).getElement() as HTMLElement,
};

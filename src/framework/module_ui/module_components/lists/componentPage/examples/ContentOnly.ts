import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const ContentOnlyExample: ComponentExample = {
    id: "page_content_only",
    name: Keys.category.components.page.examples.contentOnly.name,
    description: Keys.category.components.page.examples.contentOnly.description,
    render: (): HTMLElement => UiCategory.UI.Pages.Page({
        prop_isFullHeight: false,
        prop_content: "A page can render only its main content; the optional regions are omitted.",
    }).getElement() as HTMLElement,
};

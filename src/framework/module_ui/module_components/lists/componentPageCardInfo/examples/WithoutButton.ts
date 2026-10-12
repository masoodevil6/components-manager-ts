import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import * as UiIcons from "@/ui_icons";
import {Keys} from "../../../../module_categories/languages";

export const WithoutButtonExample: ComponentExample = {
    id: "page_card_info_without_button",
    name: Keys.category.components.pageCardInfo.examples.withoutButton.name,
    description: Keys.category.components.pageCardInfo.examples.withoutButton.description,
    render(): HTMLElement {
        return UiCategory.UI.Pages.Sections.PageCardInfo({
            prop_description: "This page provides an overview of available services.",
            prop_icon: UiIcons.Src.FileApplication.Definition,
            prop_iconSize: 96,
            prop_hasBtn: false,
        }).getElement() as HTMLElement;
    },
};

import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import * as UiIcons from "@/ui_icons";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id: "page_card_info_default",
    name: Keys.category.components.pageCardInfo.examples.default.name,
    description: Keys.category.components.pageCardInfo.examples.default.description,
    render(): HTMLElement {
        return UiCategory.UI.Pages.Sections.PageCardInfo({
            prop_description: "Create and manage new orders from this page.",
            prop_icon: UiIcons.Src.FileApplication.Definition,
            prop_iconSize: 96,
            prop_titleBtn: "New Order",
            prop_iconBtn: UiIcons.Src.CalcPlus.Definition,
        }, {
            CLICK: () => console.log("New order clicked"),
        }).getElement() as HTMLElement;
    },
};

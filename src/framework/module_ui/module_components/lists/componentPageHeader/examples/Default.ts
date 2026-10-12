import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import * as UiIcons from "@/ui_icons";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id: "page_header_default",
    name: Keys.category.components.pageHeader.examples.default.name,
    description: Keys.category.components.pageHeader.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Pages.Header.PageHeader({
        prop_pageTitle: "Dashboard",
        prop_optionsList: [
            {id: "refresh", title: "Refresh", icon: UiIcons.Src.FileReload.Definition, action: "refresh"},
            {id: "settings", title: "Settings", icon: UiIcons.Src.FileSetting.Definition, action: "settings"},
        ],
    }, {
        BACK: () => console.log("page header back"),
        SELECT_OPTION: (_event, args) => console.log("page header option", args.NAME),
    }).getElement() as HTMLElement,
};

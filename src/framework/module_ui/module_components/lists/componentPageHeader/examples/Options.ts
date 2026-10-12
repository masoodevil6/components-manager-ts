import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import * as UiIcons from "@/ui_icons";
import {Keys} from "../../../../module_categories/languages";

export const OptionsExample: ComponentExample = {
    id: "page_header_options",
    name: Keys.category.components.pageHeader.examples.options.name,
    description: Keys.category.components.pageHeader.examples.options.description,
    render: (): HTMLElement => UiCategory.UI.Pages.Header.PageHeader({
        prop_pageTitle: "Documents",
        prop_optionsList: [
            {
                type: "group",
                id: "file-actions",
                items: [
                    {id: "copy", title: "Copy", icon: UiIcons.Src.FileApplication.Definition, children: [
                        {id: "copy-name", title: "Copy name", action: "copyName"},
                        {id: "copy-link", title: "Copy link", action: "copyLink"},
                    ]},
                    {id: "download", title: "Download", icon: UiIcons.Src.FileApplication.Definition, action: "download"},
                ],
            },
            {id: "delete", title: "Delete", icon: UiIcons.Src.FilesDelete.Definition, action: "delete", disabled: true},
        ],
    }, {
        SELECT_OPTION: (_event, args) => console.log("selected action", args.NAME, args.ITEM),
    }).getElement() as HTMLElement,
};

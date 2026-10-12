import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import * as UiIcons from "@/ui_icons";
import {Keys} from "../../../../module_categories/languages";
import {MenuMoreOrientation} from "../Props";

export const VerticalExample: ComponentExample = {
    id: "menu_more_vertical",
    name: Keys.category.components.menuMore.examples.vertical.name,
    description: Keys.category.components.menuMore.examples.vertical.description,
    render: (): HTMLElement => UiCategory.UI.Menus.MenuMore({
        prop_orientation: MenuMoreOrientation.VERTICAL,
        prop_items: [
            {
                type: "group",
                id: "sharing",
                items: [
                    {
                        id: "share",
                        title: "Share",
                        icon: UiIcons.Src.FileAttachment.Definition,
                        children: [
                            {
                                id: "share-link",
                                title: "Copy link",
                                icon: UiIcons.Src.FileApplication.Definition,
                                children: [
                                    {id: "share-short-link", title: "Short link", action: "copyShortLink"},
                                    {
                                        id: "share-link-format",
                                        title: "Link format",
                                        children: [
                                            {id: "share-link-markdown", title: "Markdown", action: "copyMarkdownLink"},
                                            {id: "share-link-html", title: "HTML", action: "copyHtmlLink"},
                                        ],
                                    },
                                ],
                            },
                            {id: "share-email", title: "Email", icon: UiIcons.Src.UserEmail1.Definition, action: "email"},
                        ],
                    },
                ],
            },
            {
                type: "group",
                id: "file-actions",
                items: [
                    {id: "rename", title: "Rename", icon: UiIcons.Src.FilesEdit.Definition, action: "rename"},
                    {id: "archive", title: "Archive", action: "archive"},
                ],
            },
        ],
    }, {
        SELECT_ITEM: (_event, dataArgs) => console.log("menu item selected", dataArgs?.ITEM),
    }).getElement() as HTMLElement,
};

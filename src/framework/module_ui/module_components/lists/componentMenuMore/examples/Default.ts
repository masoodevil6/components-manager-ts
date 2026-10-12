import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import * as UiIcons from "@/ui_icons";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id: "menu_more_default",
    name: Keys.category.components.menuMore.examples.default.name,
    description: Keys.category.components.menuMore.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Menus.MenuMore({
        prop_items: [
            {
                type: "group",
                id: "file-actions",
                items: [
                    {
                        id: "copy",
                        title: "Copy",
                        icon: UiIcons.Src.FileApplication.Definition,
                        openOn: "hover",
                        children: [
                            {id: "copy-name", title: "Copy name", icon: UiIcons.Src.FileTage.Definition, action: "copyName"},
                            {id: "copy-path", title: "Copy path", action: "copyPath"},
                            {
                                id: "copy-format",
                                title: "Copy with format",
                                icon: UiIcons.Src.FileApplication.Definition,
                                children: [
                                    {id: "copy-plain", title: "Plain text", action: "copyPlain"},
                                    {
                                        id: "copy-rich",
                                        title: "Rich text",
                                        children: [
                                            {id: "copy-rich-html", title: "HTML", action: "copyRichHtml"},
                                            {id: "copy-rich-markdown", title: "Markdown", action: "copyRichMarkdown"},
                                        ],
                                    },
                                ],
                            },
                            {id: "copy-link", title: "Copy link", action: "copyLink", disabled: true},
                        ],
                    },
                    {id: "edit", title: "Edit", icon: UiIcons.Src.FilesEdit.Definition, action: "edit"},
                    {id: "print", icon: UiIcons.Src.FilesPrint.Definition, action: "print"},
                ],
            },
            {
                type: "group",
                id: "export-actions",
                items: [
                    {
                        id: "export",
                        title: "Export",
                        icon: UiIcons.Src.FilesExcel.Definition,
                        children: [
                            {
                                id: "export-json",
                                title: "Export as JSON",
                                children: [
                                    {id: "export-json-compact", title: "Compact JSON", action: "exportJsonCompact"},
                                    {id: "export-json-pretty", title: "Pretty JSON", action: "exportJsonPretty"},
                                ],
                            },
                            {id: "export-csv", title: "Export as CSV", action: "exportCsv"},
                        ],
                    },
                    {id: "delete", title: "Delete", action: "delete"},
                ],
            },
        ],
    }, {
        SELECT_ITEM: (_event, dataArgs) => console.log("menu item selected", dataArgs?.ITEM),
    }).getElement() as HTMLElement,
};

import type {ComponentExample} from "@/core_components";
import * as UiIcons from "@/ui_icons";
import * as UiCategory from "@/ui_categories";
import {TableResponsibleViewMode} from "../Props";
import {Keys} from "../../../../module_categories/languages";

export const RowOptions: ComponentExample = {
    id: "table_responsible_row_options",
    name: Keys.category.components.tableResponsible.examples.rowOptions.name,
    description: Keys.category.components.tableResponsible.examples.rowOptions.description,
    render(): HTMLElement {
        return UiCategory.UI.Contents.TableResponsible({
            prop_viewMode: TableResponsibleViewMode.AUTO,
            prop_header: [
                {id: "name", content: "Customer", inCards: true},
                {id: "email", content: "Email", icon: UiIcons.Src.UserEmail1.Definition, inCards: true},
                {id: "accountId", content: "Account ID", inCards: true},
            ],
            prop_order: ["name", "email", "accountId"],
            prop_data: [
                {id: "c-18", name: "Alex Morgan", email: "alex@example.com", accountId: "AC-018"},
                {id: "c-24", name: "Riley Brooks", email: "riley@example.com", accountId: "AC-024"},
            ],
            prop_rowKey: "id",
            prop_rowOptions: [
                {id: "open", title: "Open account", action: "open-account", valueKey: "accountId", icon: UiIcons.Src.FilesEdit.Definition},
                {id: "email", title: "Send email", action: "send-email", valueKey: "email", icon: UiIcons.Src.UserEmail1.Definition},
            ],
        } as any, {
            CLICK_ROW_OPTION: (_event, args) => console.log("[TableResponsible] action/value", args.option.action, args.value, args.row),
        }).getElement() as HTMLElement;
    },
};

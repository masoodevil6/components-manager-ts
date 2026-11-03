import type {ComponentExample} from "@/core_components";
import * as UiIcons from "@/ui_icons";
import * as UiCategory from "@/ui_categories";
import {TableResponsibleViewMode} from "../Props";
import {Keys} from "../../../../module_categories/languages";

export const CardsOnly: ComponentExample = {
    id: "table_responsible_cards_only",
    name: Keys.category.components.tableResponsible.examples.cardsOnly.name,
    description: Keys.category.components.tableResponsible.examples.cardsOnly.description,
    render(): HTMLElement {
        return UiCategory.UI.Contents.TableResponsible({
            prop_viewMode: TableResponsibleViewMode.CARDS,
            prop_header: [
                {id: "name", content: "Contact", inCards: true},
                {id: "email", content: "Email", icon: UiIcons.Src.UserEmail1.Definition, inCards: true},
                {id: "visits", content: "Visits", inCards: true},
            ],
            prop_order: ["name", "email", "visits"],
            prop_data: [
                {id: 51, name: "Taylor Reed", email: "taylor@example.com", visits: 8},
                {id: 52, name: "Jordan Kim", email: "jordan@example.com", visits: 3},
            ],
            prop_rowKey: "id",
            prop_rowOptions: [
                {id: "open", title: "Open contact", action: "open-contact", valueKey: "id", icon: UiIcons.Src.FilesEdit.Definition},
                {id: "email", title: "Send email", action: "send-email", valueKey: "email", icon: UiIcons.Src.UserEmail1.Definition},
            ],
        } as any, {
            CLICK_ROW_OPTION: (_event, args) => console.log("[TableResponsible] action/value", args.option.action, args.value, args.row),
        }).getElement() as HTMLElement;
    },
};

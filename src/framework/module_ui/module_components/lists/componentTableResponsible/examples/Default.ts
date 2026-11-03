import type {ComponentExample} from "@/core_components";
import * as UiIcons from "@/ui_icons";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

const header = [
    {id: "name", content: "Name", inCards: true},
    {id: "email", content: "Email", icon: UiIcons.Src.UserEmail1.Definition, inCards: true},
    {id: "role", content: "Role", inCards: true},
    {id: "status", content: "Status", inCards: false},
];
const data = [
    {id: "u-101", name: "Ava Johnson", email: "ava@example.com", role: "Administrator", status: "Active"},
    {id: "u-102", name: "Noah Williams", email: "noah@example.com", role: "Editor", status: "Invited"},
    {id: "u-103", name: "Mia Chen", email: "mia@example.com", role: "Viewer", status: "Active"},
];

export const Default: ComponentExample = {
    id: "table_responsible_default",
    name: Keys.category.components.tableResponsible.examples.default.name,
    description: Keys.category.components.tableResponsible.examples.default.description,
    render(): HTMLElement {
        return UiCategory.UI.Contents.TableResponsible({
            prop_header: header,
            prop_order: ["name", "email", "role", "status"],
            prop_data: data,
            prop_rowKey: "id",
            prop_doColSelector: true,
        } as any, {
            CLICK_ROW_OPTION: (_event, args) => console.log("[TableResponsible] row action", args),
        }).getElement() as HTMLElement;
    },
};

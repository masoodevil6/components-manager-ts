import type {ComponentExample} from "@/core_components";
import * as UiIcons from "@/ui_icons";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const Responsive: ComponentExample = {
    id: "table_responsible_responsive",
    name: Keys.category.components.tableResponsible.examples.responsive.name,
    description: Keys.category.components.tableResponsible.examples.responsive.description,
    render(): HTMLElement {
        return UiCategory.UI.Contents.TableResponsible({
            prop_header: [
                {id: "name", content: "Name", inCards: true},
                {id: "email", content: "Email", icon: UiIcons.Src.UserEmail1.Definition, inCards: true},
                {id: "department", content: "Department", inCards: true},
                {id: "lastSeen", content: "Last seen", inCards: false},
            ],
            prop_order: ["name", "email", "department", "lastSeen"],
            prop_data: [
                {id: "emp-01", name: "Sam Rivera", email: "sam@example.com", department: "Design", lastSeen: "Today"},
                {id: "emp-02", name: "Ivy Patel", email: "ivy@example.com", department: "Engineering", lastSeen: "Yesterday"},
            ],
            prop_rowKey: "id",
        } as any).getElement() as HTMLElement;
    },
};

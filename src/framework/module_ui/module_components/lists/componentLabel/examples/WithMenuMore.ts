import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const WithMenuMoreExample: ComponentExample = {
    id: "label_with_menu_more",
    name: Keys.category.components.label.examples.withMenuMore.name,
    description: Keys.category.components.label.examples.withMenuMore.description,
    render: (): HTMLElement => {
        const root = document.createElement("div");
        root.className = "form-group";

        const input = document.createElement("input");
        input.id = "label-menu-more-example-input";
        input.className = "form-control";

        const label = UiCategory.UI.Simples.Label(
            {
                prop_labelTitle: "Profile",
                prop_labelFor: input.id,
                prop_labelTooltipDescription: "Additional information about this field",
                prop_labelGroups: [
                    {
                        id: "EDIT_PROFILE",
                        title: "Edit profile",
                        action: "edit-profile",
                    },
                    {
                        id: "VIEW_DETAILS",
                        title: "View details",
                        action: "view-details",
                    },
                ],
                prop_labelGroupSelected: "EDIT_PROFILE",
            },
            {
                SELECT_MENU_ITEM: (_event, dataArgs, componentArgs) => {
                    console.log("Label group selection:", {
                        value: componentArgs?.VALUE,
                        group: dataArgs?.ITEM,
                        parent: dataArgs?.PARENT,
                    });
                },
            },
        ).getElement() as HTMLElement;

        root.append(label, input);
        return root;
    },
};

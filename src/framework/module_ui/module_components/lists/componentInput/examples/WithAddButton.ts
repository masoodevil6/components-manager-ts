import {ComponentExample} from "@/core_components";
import {Keys} from "../../../../module_categories/languages";
import * as UiCategory from "@/ui_categories";

export const WithAddButtonExample: ComponentExample = {
    id: "input_with_add_button",
    name: Keys.category.components.input.examples.withAddButton.name,
    description: Keys.category.components.input.examples.withAddButton.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.Input({
        prop_name: "item",
        prop_labelTitle: "New item",
        prop_placeholder: "Item name",
        prop_btnAddStatus: true,
        prop_btnAddTitle: "Add",
    }, {CLICK_BUTTON: () => undefined}).getElement() as HTMLElement,
};

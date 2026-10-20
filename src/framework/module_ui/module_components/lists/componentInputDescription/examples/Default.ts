import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id: "input_description_default",
    name: Keys.category.components.inputDescription.examples.default.name,
    description: Keys.category.components.inputDescription.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputDescription({
        prop_name: "description",
        prop_labelTitle: "Description",
        prop_placeholder: "Write a few lines...",
        prop_value: "A multiline description field.",
        prop_rows: 4,
    }).getElement() as HTMLElement,
};

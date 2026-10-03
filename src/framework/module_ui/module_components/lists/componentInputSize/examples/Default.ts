import {ComponentExample} from "@/core_components";
import {Keys} from "../../../../module_categories/languages";
import * as UiCategory from "@/ui_categories";

export const DefaultExample: ComponentExample = {
    id: "input_size_default",
    name: Keys.category.components.inputSize.examples.default.name,
    description: Keys.category.components.inputSize.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputSize({prop_labelTitle: "Quantity", prop_value: 3}, {}).getElement() as HTMLElement,
};

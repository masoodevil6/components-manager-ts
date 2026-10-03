import {ComponentExample} from "@/core_components";
import {Keys} from "../../../../module_categories/languages";
import * as UiCategory from "@/ui_categories";

export const WithBoundsExample: ComponentExample = {
    id: "input_size_with_bounds",
    name: Keys.category.components.inputSize.examples.withBounds.name,
    description: Keys.category.components.inputSize.examples.withBounds.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputSize({prop_labelTitle: "Quantity", prop_value: 2, prop_min: 0, prop_max: 10}, {}).getElement() as HTMLElement,
};

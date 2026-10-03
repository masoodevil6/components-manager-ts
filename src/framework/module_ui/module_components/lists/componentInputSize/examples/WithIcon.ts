import {ComponentExample} from "@/core_components";
import * as UiIcons from "@/ui_icons";
import {Keys} from "../../../../module_categories/languages";
import * as UiCategory from "@/ui_categories";

export const WithIconExample: ComponentExample = {
    id: "input_size_with_icon",
    name: Keys.category.components.inputSize.examples.withIcon.name,
    description: Keys.category.components.inputSize.examples.withIcon.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputSize({prop_labelTitle: "Quantity", prop_value: 3, prop_icon: UiIcons.Src.CalcPlus.Definition}, {}).getElement() as HTMLElement,
};

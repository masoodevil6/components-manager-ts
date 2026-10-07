import {ComponentExample} from "@/core_components";
import {Keys} from "../../../../module_categories/languages";
import * as UiCategory from "@/ui_categories";
import {colorSelector} from "../Props";

export const ColorExample: ComponentExample = {
    id: "input_color_selector_color",
    name: Keys.category.components.inputColor.examples.color.name,
    description: Keys.category.components.inputColor.examples.color.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputColor({
        prop_labelTitle: "Color",
        prop_value: "#4f46e5",
        prop_colorSelector: colorSelector.COLOR,
    }).getElement() as HTMLElement,
};

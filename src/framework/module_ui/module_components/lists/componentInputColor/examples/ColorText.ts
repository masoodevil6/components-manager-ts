import {ComponentExample} from "@/core_components";
import {Keys} from "../../../../module_categories/languages";
import * as UiCategory from "@/ui_categories";
import {colorSelector} from "../Props";

export const ColorTextExample: ComponentExample = {
    id: "input_color_selector_color_text",
    name: Keys.category.components.inputColor.examples.colorText.name,
    description: Keys.category.components.inputColor.examples.colorText.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputColor({
        prop_labelTitle: "Color",
        prop_value: "#16a34a",
        prop_colorSelector: colorSelector.COLOR_TEXT,
    }).getElement() as HTMLElement,
};

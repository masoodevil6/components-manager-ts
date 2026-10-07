import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import {RadioBoxDirection} from "../Props";

export const HorizontalExample: ComponentExample = {
    id: "input_radio_box_horizontal",
    name: Keys.category.components.inputRadioBox.examples.horizontal.name,
    description: Keys.category.components.inputRadioBox.examples.horizontal.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputRadioBox({
        classList: ["col-12", "p-2"],
        styles: {},
        prop_options: [
            {id: "compact", name: "Compact", body: "Compact layout selected."},
            {id: "spacious", name: "Spacious", body: "Spacious layout selected."},
        ],
        prop_itemSelected: "compact",
        prop_direction: RadioBoxDirection.HORIZONTAL,
    }, {}).getElement() as HTMLElement,
};

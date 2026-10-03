import {ComponentExample} from "@/core_components";
import {Keys} from "../../../../module_categories/languages";
import * as UiCategory from "@/ui_categories";

export const DefaultExample: ComponentExample = {
    id: "input_color_default",
    name: Keys.category.components.inputColor.examples.default.name,
    description: Keys.category.components.inputColor.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputColor({
        prop_labelTitle: "Color",
        prop_value: "#ff0000",
        prop_title: "Color",
        prop_showTitleFront: true,
    }, {
        CHANGE: (_event, _dataArgs, args) => {
            // Example callback: observe the canonical hex value.
            void args.COLOR;
        },
    }).getElement() as HTMLElement,
};

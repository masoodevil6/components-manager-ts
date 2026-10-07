import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const CalculatorExample: ComponentExample = {
    id: "input_price_calculator",
    name: Keys.category.components.inputPrice.examples.calculator.name,
    description: Keys.category.components.inputPrice.examples.calculator.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputPrice({
        prop_labelTitle: "Price",
        prop_value: "1250",
        prop_calculator: [
            {name: "tax", title: "Tax (9%)", coefficient: 0.09, extension: "$"},
            {name: "total", title: "Total", coefficient: 1.09, extension: "$"},
        ],
    }, {}).getElement() as HTMLElement,
};

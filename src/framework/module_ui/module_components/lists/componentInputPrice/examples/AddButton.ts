import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const AddButtonExample: ComponentExample = {
    id: "input_price_add_button",
    name: Keys.category.components.inputPrice.examples.addButton.name,
    description: Keys.category.components.inputPrice.examples.addButton.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputPrice({
        prop_labelTitle: "Price",
        prop_value: "1250",
        prop_btnAddStatus: true,
        prop_btnAddTitle: "Add price",
    }, {
        fn_onClickButton: (_event, {VALUE}) => window.dispatchEvent(new CustomEvent("price-add", {detail: VALUE})),
    }).getElement() as HTMLElement,
};

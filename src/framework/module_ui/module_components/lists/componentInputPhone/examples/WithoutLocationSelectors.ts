import {ComponentExample} from "@/core_components";
import {Keys} from "../../../../module_categories/languages";
import * as UiCategory from "@/ui_categories";

export const WithoutLocationSelectorsExample: ComponentExample = {
    id: "input_phone_without_location_selectors",
    name: Keys.category.components.inputPhone.examples.withoutLocationSelectors.name,
    description: Keys.category.components.inputPhone.examples.withoutLocationSelectors.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputPhone({
        prop_labelTitle: "Phone number",
        prop_countryHas: false,
        prop_cityHas: false,
        prop_placeholder: "Enter phone number...",
    }, {}).getElement() as HTMLElement,
};

import {ComponentExample} from "@/core_components";
import {Keys} from "../../../../module_categories/languages";
import * as UiCategory from "@/ui_categories";

export const DefaultExample: ComponentExample = {
    id: "input_phone_default",
    name: Keys.category.components.input.examples.default.name,
    description: Keys.category.components.input.schemas.input.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputPhone({
        prop_labelTitle: "Phone number",
        prop_title: "Phone number",
        prop_placeholder: "Enter phone number...",
        prop_name: "input_example_phone",
        prop_value: "2636617530",
        prop_countryValue: 1,
        prop_countryOptions: [
            {id: 1, name: "Iran", code: "+98"},
            {id: 2, name: "USA", code: "+1"},
            {id: 3, name: "UK", code: "+44"},
            {id: 4, name: "Germany", code: "+49"},
        ],
        prop_cityValue: 101,
        prop_cityOptions: [
            {id: 101, name: "Tehran", code: "021", countryId: 1},
            {id: 102, name: "Shiraz", code: "071", countryId: 1},
            {id: 201, name: "New York", code: "212", countryId: 2},
            {id: 301, name: "London", code: "020", countryId: 3},
        ],
    }, {}).getElement() as HTMLElement,
};

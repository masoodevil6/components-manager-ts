import {ComponentExample} from "@/core_components";
import {Keys} from "../../../../module_categories/languages";
import * as UiCategory from "@/ui_categories";
import * as Validator from "@/util_validators";

export const WithValidationExample: ComponentExample = {
    id: "input_size_with_validation",
    name: Keys.category.components.inputSize.examples.withValidation.name,
    description: Keys.category.components.inputSize.examples.withValidation.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputSize({prop_labelTitle: "Quantity", prop_value: 2, prop_hasRules: true, prop_listRules: [new Validator.validates.NumLength()]}, {}).getElement() as HTMLElement,
};

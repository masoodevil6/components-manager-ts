import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import * as UtilValidators from "@/util_validators";
import {Keys} from "../../../../module_categories/languages";

export const WithValidationExample: ComponentExample = {
    id: "input_description_with_validation",
    name: Keys.category.components.inputDescription.examples.withValidation.name,
    description: Keys.category.components.inputDescription.examples.withValidation.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputDescription({
        prop_name: "description",
        prop_labelTitle: "Description",
        prop_title: "Description",
        prop_placeholder: "Enter a description...",
        prop_hasRules: true,
        prop_listRules: [new UtilValidators.validates.NotEmpty(
            {En: "Required", Fa: "الزامی"},
            {En: "Description is required", Fa: "توضیحات الزامی است"},
        )],
    }).getElement() as HTMLElement,
};

import {ComponentExample} from "@/core_components";
import {Keys} from "../../../../module_categories/languages";
import * as UtilValidators from "@/util_validators";
import * as UiCategory from "@/ui_categories";

export const WithValidationExample: ComponentExample = {
    id: "input_with_validation",
    name: Keys.category.components.input.examples.withValidation.name,
    description: Keys.category.components.input.examples.withValidation.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.Input({
        prop_name: "email",
        prop_labelTitle: "Email",
        prop_title: "Email",
        prop_type: "email" as any,
        prop_placeholder: "name@example.com",
        prop_hasRules: true,
        prop_listRules: [new UtilValidators.validates.NotEmpty(
            {En: "Required", Fa: "الزامی"},
            {En: "Email is required", Fa: "ایمیل الزامی است"},
        )],
    }, {}).getElement() as HTMLElement,
};

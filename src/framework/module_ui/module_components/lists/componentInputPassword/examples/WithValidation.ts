import {ComponentExample} from "@/core_components";
import * as UtilValidators from "@/util_validators";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const WithValidationExample: ComponentExample = {
    id: "input_password_with_validation",
    name: Keys.category.components.input.examples.withValidation.name,
    description: Keys.category.components.input.examples.withValidation.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputPassword({prop_name: "password", prop_labelTitle: "Password", prop_title: "Password", prop_hasRules: true, prop_listRules: [new UtilValidators.validates.NotEmpty({En: "Required", Fa: "الزامی"}, {En: "Password is required", Fa: "واردکردن رمز الزامی است"})]}, {}).getElement() as HTMLElement,
};

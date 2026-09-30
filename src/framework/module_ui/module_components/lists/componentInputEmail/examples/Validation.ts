import {ComponentExample} from "@/core_components";
import * as UtilValidators from "@/util_validators";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const ValidationExample: ComponentExample = {
    id: "input_email_validation",
    name: Keys.category.components.input.examples.withValidation.name,
    description: Keys.category.components.input.examples.withValidation.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputEmail({
        prop_name: "email",
        prop_labelTitle: "Email",
        prop_title: "Email address",
        prop_placeholder: "name@example.com",
        prop_hasRules: true,
        prop_listRules: [new UtilValidators.validates.NotEmpty({En: "Required", Fa: "الزامی"}, {En: "Email is required", Fa: "وارد کردن ایمیل الزامی است"})],
        prop_msgRules: {"Please enter a valid email address": "Please enter a valid email address"},
    }, {}).getElement() as HTMLElement,
};

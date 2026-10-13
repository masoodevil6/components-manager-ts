import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import * as UtilValidators from "@/util_validators";
import {Keys} from "../../../../module_categories/languages";

export const Validation: ComponentExample = {
    id: "component_form_validation",
    name: Keys.category.components.fetch.form.examples.validation.name,
    description: Keys.category.components.fetch.form.examples.validation.description,
    render: (): HTMLElement => {
        const email = UiCategory.UI.Inputs.Input({
            prop_name: "email",
            prop_labelTitle: "Email",
            prop_value: "",
            prop_hasRules: true,
            prop_listRules: [new UtilValidators.validates.NotEmpty("Email is required")],
        }).getReactiveElement();
        return UiCategory.UI.Fetch.Form({
            prop_forms: [email],
            prop_url: "/example/validation",
            prop_runFetch: true,
        }, {
            RESPONSE: (_event, payload) => console.info("Validated form response", payload.RESPONSE),
        }).getElement() as HTMLElement;
    },
};

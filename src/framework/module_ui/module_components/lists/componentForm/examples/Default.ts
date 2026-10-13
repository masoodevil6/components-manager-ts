import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {InputTypes} from "../../componentInput/Props";
import {Keys} from "../../../../module_categories/languages";

export const Default: ComponentExample = {
    id: "component_form_default",
    name: Keys.category.components.fetch.form.examples.default.name,
    description: Keys.category.components.fetch.form.examples.default.description,
    render: (): HTMLElement => {
        const name = UiCategory.UI.Inputs.Input({prop_name: "name", prop_labelTitle: "Name", prop_placeholder: "Your name"}).getReactiveElement();
        const email = UiCategory.UI.Inputs.Input({prop_name: "email", prop_labelTitle: "Email", prop_type: InputTypes.EMAIL, prop_placeholder: "name@example.com"}).getReactiveElement();
        return UiCategory.UI.Fetch.Form({
            prop_forms: [name, email],
            prop_url: "/example/contact",
            prop_runFetch: true,
            prop_componentBorderClass: ["shadow-sm", "position-relative", "p-3"],
        }, {
            RESPONSE: (_event, payload) => console.info("Form response", payload.RESPONSE),
        }).getElement() as HTMLElement;
    },
};

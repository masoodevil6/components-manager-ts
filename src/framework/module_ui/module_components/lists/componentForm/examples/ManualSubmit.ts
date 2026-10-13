import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const ManualSubmit: ComponentExample = {
    id: "component_form_manual_submit",
    name: Keys.category.components.fetch.form.examples.manualSubmit.name,
    description: Keys.category.components.fetch.form.examples.manualSubmit.description,
    render: (): HTMLElement => {
        const field = UiCategory.UI.Inputs.Input({
            prop_name: "query",
            prop_labelTitle: "Search query",
            prop_placeholder: "Enter a value",
        }).getReactiveElement();
        return UiCategory.UI.Fetch.Form({
            prop_forms: [field],
            prop_url: "/search",
            prop_data: [{name: "source", value: "component-form-example"}],
            prop_runFetch: false,
        }, {
            SUBMIT: (_event, dataArgs, componentArgs) => console.info("Manual submit", {
                url: componentArgs.URL,
                fields: dataArgs.FORM ? new FormData(dataArgs.FORM) : null,
                extraData: dataArgs.EXTRA_DATA,
            }),
        }).getElement() as HTMLElement;
    },
};

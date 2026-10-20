import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import type {JsonValue} from "../../componentJsonTree/Types";
import {CustomFormFieldType, CustomFormMode} from "../Props";

export const RunMode: ComponentExample = {
    id: "custom_form_run_mode",
    name: Keys.category.components.fetch.form.customForm.examples.runMode.name,
    description: Keys.category.components.fetch.form.customForm.examples.runMode.description,
    render(): HTMLElement {
        const submittedData = new CoreObservable.App<JsonValue | undefined>(undefined);
        const result = UiCategory.UI.Tools.DataType.JsonTree({
            classList: ["col-12", "mt-2"],
            prop_data: submittedData,
            prop_initialExpandDepth: 2,
            prop_emptyText: "Submit the form to inspect its values.",
        });
        const component = UiCategory.UI.Fetch.CustomForm({
            prop_customFormMode: CustomFormMode.RUN,
            prop_customFormGroups: [
                {
                    id: "account",
                    title: "Account details",
                    columns: 2,
                    fields: [
                        {id: "email", name: "email", label: "Email", type: CustomFormFieldType.INPUT, placeholder: "name@example.com", required: true, props: {prop_type: "email"}},
                        {id: "about", name: "about", label: "About", type: CustomFormFieldType.TEXTAREA, placeholder: "A short introduction"},
                    ],
                },
                {
                    id: "preferences",
                    title: "Preferences",
                    fields: [
                        {id: "contact", name: "contact", label: "Contact method", type: CustomFormFieldType.RADIO, options: [{label: "Email", value: "email"}, {label: "Phone", value: "phone"}]},
                        {id: "topics", name: "topics", label: "Topics", type: CustomFormFieldType.SELECT, options: [{label: "Design", value: "design"}, {label: "Engineering", value: "engineering"}]},
                    ],
                },
            ],
            prop_customFormFormOptions: {prop_runFetch: false, prop_btnSubmit: {prop_title: "Preview submit"}},
        }, {
            SUBMIT: (_event, dataArgs) => {
                const entries = dataArgs?.FORM ? Object.fromEntries(new FormData(dataArgs.FORM).entries()) : {};
                submittedData.set(entries as JsonValue);
            },
        } as any);

        return CoreReactive.App.div({
            className: ["d-flex", "flex-column", "gap-2"],
            children: [component.getReactiveElement(), result.getReactiveElement()],
        }).getElement() as HTMLElement;
    },
};

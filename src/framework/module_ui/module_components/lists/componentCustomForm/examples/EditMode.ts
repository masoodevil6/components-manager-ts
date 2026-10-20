import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import type {JsonValue} from "../../componentJsonTree/Types";
import {CustomFormFieldType} from "../Props";

export const EditMode: ComponentExample = {
    id: "custom_form_edit_mode",
    name: Keys.category.components.fetch.form.customForm.examples.editMode.name,
    description: Keys.category.components.fetch.form.customForm.examples.editMode.description,
    render(): HTMLElement {
        const submittedData = new CoreObservable.App<JsonValue | undefined>(undefined);
        const result = UiCategory.UI.Tools.DataType.JsonTree({
            classList: ["col-12", "mt-2"],
            prop_data: submittedData,
            prop_initialExpandDepth: 2,
            prop_emptyText: "Submit the form to inspect its values.",
        });
        const component = UiCategory.UI.Fetch.CustomForm({
            prop_customFormGroups: [
                {
                    id: "identity",
                    title: "Identity",
                    fields: [
                        {id: "full-name", name: "fullName", label: "Full name", type: CustomFormFieldType.INPUT, required: true},
                        {id: "bio", name: "bio", label: "About", type: CustomFormFieldType.TEXTAREA},
                    ],
                },
                {
                    id: "preferences",
                    title: "Preferences",
                    fields: [
                        {id: "contact", name: "contact", label: "Contact method", type: CustomFormFieldType.RADIO, options: [{label: "Email", value: "email"}, {label: "Phone", value: "phone"}]},
                    ],
                },
            ],
        }, {
            SUBMIT: (_event, dataArgs) => {
                const values = dataArgs?.FORM ? Object.fromEntries(new FormData(dataArgs.FORM).entries()) : {};
                submittedData.set({
                    values: values as any,
                    template: dataArgs?.EXTRA_DATA as any,
                } as JsonValue);
            },
        } as any);

        return CoreReactive.App.div({
            className: ["d-flex", "flex-column", "gap-2"],
            children: [component.getReactiveElement(), result.getReactiveElement()],
        }).getElement() as HTMLElement;
    },
};

import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const DisabledExample: ComponentExample = {
    id: "input_description_disabled",
    name: Keys.category.components.inputDescription.examples.disabled.name,
    description: Keys.category.components.inputDescription.examples.disabled.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputDescription({
        prop_name: "readonlyDescription",
        prop_labelTitle: "Description",
        prop_value: "This description is disabled.",
        prop_isDisable: true,
    }).getElement() as HTMLElement,
};

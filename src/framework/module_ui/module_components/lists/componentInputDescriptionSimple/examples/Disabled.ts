import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const DisabledExample: ComponentExample = {
    id: "input_description_simple_disabled",
    name: Keys.category.components.simpleComponent.inputDescriptionSimple.examples.disabled.name,
    description: Keys.category.components.simpleComponent.inputDescriptionSimple.examples.disabled.description,
    render: (): HTMLElement => UiCategory.UI.Simples.InputDescriptionSimple({
        classList: ["col-md-6", "col-12"],
        prop_inputName: "readonlyDescription",
        prop_inputValue: "This description is disabled.",
        prop_inputDisable: true,
    }).getElement() as HTMLElement,
};

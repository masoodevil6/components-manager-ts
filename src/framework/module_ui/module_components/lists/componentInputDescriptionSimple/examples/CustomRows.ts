import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import {InputDescriptionResize} from "../Props";

export const CustomRowsExample: ComponentExample = {
    id: "input_description_simple_custom_rows",
    name: Keys.category.components.simpleComponent.inputDescriptionSimple.examples.customRows.name,
    description: Keys.category.components.simpleComponent.inputDescriptionSimple.examples.customRows.description,
    render: (): HTMLElement => UiCategory.UI.Simples.InputDescriptionSimple({
        classList: ["col-md-6", "col-12"],
        prop_inputPlaceholder: "Six rows, vertical resize",
        prop_inputRows: 6,
        prop_inputResize: InputDescriptionResize.VERTICAL,
    }).getElement() as HTMLElement,
};

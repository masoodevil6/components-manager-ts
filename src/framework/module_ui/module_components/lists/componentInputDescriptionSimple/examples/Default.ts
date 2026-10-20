import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id: "input_description_simple_default",
    name: Keys.category.components.simpleComponent.inputDescriptionSimple.examples.default.name,
    description: Keys.category.components.simpleComponent.inputDescriptionSimple.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Simples.InputDescriptionSimple({
        classList: ["col-md-6", "col-12"],
        prop_inputName: "description",
        prop_inputPlaceholder: "Write a few lines...",
        prop_inputValue: "A multiline description.\nIt uses a native textarea.",
    }, {
        INPUT_CHANGE: (_event, _dataArgs, componentArgs) => console.log("Description changed", componentArgs.VALUE),
    }).getElement() as HTMLElement,
};

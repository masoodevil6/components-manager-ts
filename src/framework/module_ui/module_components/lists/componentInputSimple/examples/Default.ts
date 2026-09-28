import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id: "input_simple_default",
    name: Keys.category.components.inputSimple.examples.default.name,
    description: Keys.category.components.inputSimple.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Simples.InputSimple({
        classList: ["col-md-6", "col-12"], prop_inputName: "email", prop_inputType: "email" as any,
        prop_inputPlaceholder: "name@example.com", prop_inputValue: "",
    }, {
        INPUT_CHANGE: (_event, _dataArgs, componentArgs) => console.log("Input changed", componentArgs.VALUE),
        INPUT_FOCUS: () => console.log("Input focused"), INPUT_BLUR: () => console.log("Input blurred"),
    }).getElement() as HTMLElement,
};

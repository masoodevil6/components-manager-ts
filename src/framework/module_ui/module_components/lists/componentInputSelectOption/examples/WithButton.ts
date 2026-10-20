import {ComponentExample} from "@/core_components";
import * as CoreObservable from "@/core_observable";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const WithButtonExample: ComponentExample = {
    id: "input_select_option_with_button",
    name: Keys.category.components.inputSelectOption.examples.withButton.name,
    description: Keys.category.components.inputSelectOption.examples.withButton.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputSelectOption({
        classList: ["col-md-6", "col-12"],
        prop_name: "input_select_option_with_button",
        prop_itemSelected: new CoreObservable.App<string | number | null>(2),
        prop_options: [
            {id: 1, name: "Option 1"},
            {id: 2, name: "Option 2"},
            {id: 3, name: "Option 3"},
        ],
        prop_placeholder: "Choose an option",
        prop_labelShow: true,
        prop_labelTitle: "Button only",
        prop_btnAddStatus: true,
        prop_btnAddTitle: "Add",
    }, {
        SELECT_CHANGE: (_event, _dataArgs, componentArgs) => console.log("Selected option", componentArgs.VALUE),
        CLICK_BUTTON: () => console.log("Add option clicked"),
    } as any).getElement() as HTMLElement,
};

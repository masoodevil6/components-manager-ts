import {ComponentExample} from "@/core_components";
import * as CoreObservable from "@/core_observable";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id: "input_select_option_default",
    name: Keys.category.components.inputSelectOption.examples.default.name,
    description: Keys.category.components.inputSelectOption.examples.default.description,
    render: (): HTMLElement => {
        const selected = new CoreObservable.App<string | number | null>(2);
        return UiCategory.UI.Inputs.InputSelectOption({
            classList: ["col-md-6", "col-12"],
            prop_name: "input_select_option_example",
            prop_itemSelected: selected,
            prop_options: [
                {id: 1, name: "Option 1"},
                {id: 2, name: "Option 2"},
                {id: 3, name: "Option 3"},
            ],
            prop_placeholder: "Choose an option",
            prop_labelShow: true,
            prop_labelTitle: "Choose an option",
        }, {
            SELECT_CHANGE: (_event, _dataArgs, componentArgs) => console.log("Selected option", componentArgs.VALUE),
        } as any).getElement() as HTMLElement;
    },
};

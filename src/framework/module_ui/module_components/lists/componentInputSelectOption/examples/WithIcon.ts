import {ComponentExample} from "@/core_components";
import * as CoreObservable from "@/core_observable";
import * as UiCategory from "@/ui_categories";
import * as UiIcons from "@/ui_icons";
import {Keys} from "../../../../module_categories/languages";

export const WithIconExample: ComponentExample = {
    id: "input_select_option_with_icon",
    name: Keys.category.components.inputSelectOption.examples.withIcon.name,
    description: Keys.category.components.inputSelectOption.examples.withIcon.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputSelectOption({
        classList: ["col-md-6", "col-12"],
        prop_name: "input_select_option_with_icon",
        prop_itemSelected: new CoreObservable.App<string | number | null>(2),
        prop_options: [
            {id: 1, name: "Option 1"},
            {id: 2, name: "Option 2"},
            {id: 3, name: "Option 3"},
        ],
        prop_placeholder: "Choose an option",
        prop_labelShow: true,
        prop_labelTitle: "Icon only",
        prop_icon: UiIcons.Src.FileSearch.Definition,
    }, {
        SELECT_CHANGE: (_event, _dataArgs, componentArgs) => console.log("Selected option", componentArgs.VALUE),
    } as any).getElement() as HTMLElement,
};

import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import {SelectTypeShow} from "../Props";

export const DefaultExample: ComponentExample = {
    id: "select_custom_simple_default",
    name: Keys.category.components.selectCustomSimple.examples.default.name,
    description: Keys.category.components.selectCustomSimple.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Simples.SelectCustomSimple({
        classList: ["col-md-6", "col-12"],
        prop_selectName: "select_example",
        prop_selectValue: 1,
        prop_selectPlaceholder: "Choose an option",
        prop_selectTypeShow: SelectTypeShow.BOTH,
        prop_selectOptions: [
            {id: 1, prefix: "A", name: "Option A"},
            {id: 2, prefix: "B", name: "Option B"},
            {id: 3, prefix: "C", name: "Option C"},
        ],
    }, {
        SELECT_CHANGE: (_event, _dataArgs, componentArgs) => console.log("Selected", componentArgs.VALUE),
        SELECT_SEARCH: (_event, _dataArgs, componentArgs) => console.log("Search", componentArgs.VALUE),
        SELECT_OPEN: () => console.log("Select opened"),
        SELECT_CLOSE: () => console.log("Select closed"),
    }).getElement() as HTMLElement,
};

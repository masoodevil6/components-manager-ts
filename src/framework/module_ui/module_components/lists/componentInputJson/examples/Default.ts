import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id: "input_json_default",
    name: Keys.category.components.inputJson.examples.default.name,
    description: Keys.category.components.inputJson.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputJson({
        prop_name: "settings",
        prop_labelTitle: "Settings",
        prop_value: JSON.stringify({theme: "dark", notifications: true}, null, 2),
    }).getElement() as HTMLElement,
};

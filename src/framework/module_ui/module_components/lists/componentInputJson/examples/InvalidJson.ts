import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const InvalidJsonExample: ComponentExample = {
    id: "input_json_invalid_json",
    name: Keys.category.components.inputJson.examples.invalidJson.name,
    description: Keys.category.components.inputJson.examples.invalidJson.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputJson({
        prop_name: "payload",
        prop_labelTitle: "Payload",
        prop_headerTitle: "Correct the JSON source",
        prop_value: '{\n  "status": "ready",\n  "count": }',
    }).getElement() as HTMLElement,
};

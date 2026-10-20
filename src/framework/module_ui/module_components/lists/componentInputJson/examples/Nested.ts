import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const NestedExample: ComponentExample = {
    id: "input_json_nested",
    name: Keys.category.components.inputJson.examples.nested.name,
    description: Keys.category.components.inputJson.examples.nested.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputJson({
        prop_name: "profile",
        prop_labelTitle: "Profile",
        prop_headerTitle: "Nested JSON",
        prop_editorHeight: "380px",
        prop_value: JSON.stringify({
            user: {name: "Ada Lovelace", active: true},
            roles: ["admin", "editor"],
            preferences: {language: "en", shortcuts: null},
        }, null, 2),
    }).getElement() as HTMLElement,
};

import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

const data = {
    application: {name: "ComponentManager", version: "43.1.0", environment: "development"},
    user: {id: 72, name: "Grace Hopper", roles: ["admin", "reviewer"], preferences: {theme: "dark", notifications: true}},
    metrics: {requests: 1240, errors: 3, availability: 0.998},
    flags: {preview: false, beta: true},
};

export const SearchAndControlsExample: ComponentExample = {
    id: "json_tree_search_controls",
    name: Keys.category.components.jsonTree.examples.searchAndControls.name,
    description: Keys.category.components.jsonTree.examples.searchAndControls.description,
    render: (): HTMLElement => UiCategory.UI.Tools.DataType.JsonTree({
        classList: ["col-12", "mb-3"],
        prop_data: data,
        prop_initialExpandDepth: 1,
        prop_maxDepth: 12,
        prop_showSearch: true,
        prop_showExpandControls: true,
        prop_showCopyButton: true,
    }).getElement() as HTMLElement,
};

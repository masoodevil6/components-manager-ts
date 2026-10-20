import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

const data = {
    request: {
        id: "req_1042",
        method: "GET",
        headers: {accept: "application/json", authorization: {scheme: "Bearer", present: true}},
        query: {page: 2, filters: ["active", "verified"]},
    },
    response: {status: 200, ok: true, elapsedMs: 84, body: {items: [{id: 1, label: "First"}, {id: 2, label: "Second"}], total: 2}},
};

export const NestedExample: ComponentExample = {
    id: "json_tree_nested",
    name: Keys.category.components.jsonTree.examples.nested.name,
    description: Keys.category.components.jsonTree.examples.nested.description,
    render: (): HTMLElement => UiCategory.UI.Tools.DataType.JsonTree({
        classList: ["col-12", "mb-3"],
        prop_data: data,
        prop_initialExpandDepth: 2,
    }).getElement() as HTMLElement,
};

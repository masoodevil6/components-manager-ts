import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

const data = {
    name: "Ada Lovelace",
    active: true,
    score: 0,
    nickname: "",
    address: {city: "London", postalCode: "N1 7GU"},
    tags: ["mathematics", "computing"],
    metadata: null,
};

export const DefaultExample: ComponentExample = {
    id: "json_tree_default",
    name: Keys.category.components.jsonTree.examples.default.name,
    description: Keys.category.components.jsonTree.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Tools.DataType.JsonTree({
        classList: ["col-12", "mb-3"],
        prop_data: data,
    }).getElement() as HTMLElement,
};

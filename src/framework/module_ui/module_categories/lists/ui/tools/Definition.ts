import * as UICategories from "@/ui_categories";
import {Keys} from "../../../languages";
import * as Code from "./code";
import * as DataType from "./dataType";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "tools",
    name: Keys.category.components.tools.name,
    description: Keys.category.components.tools.description,
    components: [],
    children: [Code.Definition, DataType.Definition],
};

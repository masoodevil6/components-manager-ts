import * as UICategories from "@/ui_categories";
import {Keys} from "../../../languages";
import * as Code from "./code";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "tools",
    name: Keys.category.components.tools.name,
    description: Keys.category.components.tools.description,
    components: [],
    children: [Code.Definition],
};

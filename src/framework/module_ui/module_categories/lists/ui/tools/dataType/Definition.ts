import * as UICategories from "@/ui_categories";
import {Keys} from "../../../../languages";
import {JsonTree} from "./jsonTree";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "dataType",
    name: Keys.category.components.tools.dataType.name,
    description: Keys.category.components.tools.dataType.description,
    components: [JsonTree as any],
};

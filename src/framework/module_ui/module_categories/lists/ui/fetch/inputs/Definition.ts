import * as UICategories from "@/ui_categories";
import {Keys} from "../../../../languages";
import {Definition as V1Definition} from "./v1";
import {Definition as SimpleDefinition} from "./simple";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "inputs",
    name: Keys.category.components.fetch.inputs.name,
    description: Keys.category.components.fetch.inputs.description,
    components: [],
    children: [V1Definition, SimpleDefinition],
};

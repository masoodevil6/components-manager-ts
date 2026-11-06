import * as UICategories from "@/ui_categories";
import {Keys} from "../../../../../languages";
import {Definition as InputComponentsDefinition} from "../../../inputs/Definition";

export const Definition: UICategories.TCategoryComponentDefinition = {
    ...InputComponentsDefinition,
    id: "v1",
    name: Keys.category.components.fetch.inputs.v1.name,
    description: Keys.category.components.fetch.inputs.v1.description,
};

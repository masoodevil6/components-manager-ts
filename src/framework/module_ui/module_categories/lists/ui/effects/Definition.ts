import * as UICategories from "@/ui_categories";
import {Keys} from "../../../languages";
import {Effective} from "./effective";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "effects",
    name: Keys.category.components.effects.name,
    description: Keys.category.components.effects.description,
    components: [Effective],
};

import * as UICategories from "@/ui_categories";
import {Keys} from "../../../languages";
import {MenuMore} from "./menuMore/Definition";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "menus",
    name: Keys.category.components.menus.name,
    description: Keys.category.components.menus.description,
    components: [MenuMore],
};

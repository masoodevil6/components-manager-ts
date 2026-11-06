import * as UICategories from "@/ui_categories";
import {Keys} from "../../../../languages";
import {FloatMenu, PositionMenu, Tooltip, ElementPosition} from "../../positions";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "position",
    name: Keys.category.components.basic.position.name,
    description: Keys.category.components.basic.position.description,
    components: [FloatMenu, PositionMenu, Tooltip, ElementPosition] as NonNullable<UICategories.TCategoryComponentDefinition["components"]>,
};

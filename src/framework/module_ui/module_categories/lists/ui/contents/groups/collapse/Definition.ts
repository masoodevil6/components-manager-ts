import * as UICategories from "@/ui_categories";
import {Keys} from "../../../../../languages";
import {Collapse} from "../../collapse";
import {CollapseLine} from "../../collapseLine";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "collapse",
    name: Keys.category.components.contents.collapse.name,
    description: Keys.category.components.contents.collapse.description,
    components: [Collapse, CollapseLine] as NonNullable<UICategories.TCategoryComponentDefinition["components"]>,
};

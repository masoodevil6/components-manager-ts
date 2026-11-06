import * as UICategories from "@/ui_categories";
import {Keys} from "../../../../languages";
import {ElementCreator} from "../elementCreator";
import {LayoutCreator} from "../layoutCreator";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "builder",
    name: Keys.category.components.basic.builder.name,
    description: Keys.category.components.basic.builder.description,
    components: [ElementCreator, LayoutCreator] as NonNullable<UICategories.TCategoryComponentDefinition["components"]>,
};

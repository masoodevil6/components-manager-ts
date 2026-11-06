import * as UICategories from "@/ui_categories";
import {Keys} from "../../../../../languages";
import {CardRowInfo} from "../../cardRowInfo";
import {CardViewClicable} from "../../cardViewClicable";
import {CardViewInfo} from "../../cardViewInfo";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "cards",
    name: Keys.category.components.contents.cards.name,
    description: Keys.category.components.contents.cards.description,
    components: [CardRowInfo, CardViewClicable, CardViewInfo],
};

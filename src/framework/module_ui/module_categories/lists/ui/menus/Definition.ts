import * as UICategories from "@/ui_categories";
import {Keys} from "../../../languages";
import {MenuMore} from "./menuMore/Definition";
import {PageSetting} from "../basic/pageSetting";
import {Styles} from "../basic/styles";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "menus",
    name: Keys.category.components.menus.name,
    description: Keys.category.components.menus.description,
    components: [MenuMore, PageSetting, Styles],
};

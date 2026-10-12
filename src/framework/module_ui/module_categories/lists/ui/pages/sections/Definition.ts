import * as UICategories from "@/ui_categories";
import {Keys} from "../../../../languages";
import {PageCardInfo} from "./pageCardInfo/Definition";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "sections",
    name: Keys.category.components.pages.sections.name,
    description: Keys.category.components.pages.sections.description,
    components: [PageCardInfo],
};

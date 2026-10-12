import * as UICategories from "@/ui_categories";
import {Keys} from "../../../../languages";
import {PageHeader} from "./pageHeader/Definition";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "header",
    name: Keys.category.components.pages.header.name,
    description: Keys.category.components.pages.header.description,
    components: [PageHeader],
};

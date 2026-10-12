import * as UICategories from "@/ui_categories";
import {Keys} from "../../../languages";
import * as Header from "./header";
import * as Sections from "./sections";
import {Page} from "./page/Definition";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "pages",
    name: Keys.category.components.pages.name,
    description: Keys.category.components.pages.description,
    components: [Page],
    children: [Header.Definition, Sections.Definition],
};

import * as UICategories from "@/ui_categories";
import {Keys} from "../../../../../languages";
import {Table} from "../../table";
import {TableResponsible} from "../../tableResponsible";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "table",
    name: Keys.category.components.contents.table.name,
    description: Keys.category.components.contents.table.description,
    components: [Table, TableResponsible] as NonNullable<UICategories.TCategoryComponentDefinition["components"]>,
};

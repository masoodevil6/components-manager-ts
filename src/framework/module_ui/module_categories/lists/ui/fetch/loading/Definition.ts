import * as UICategories from "@/ui_categories";
import {Keys} from "../../../../languages";
import {Loading} from "../../contents/loading";
import {WebCode} from "../../contents/webCode";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "loading",
    name: Keys.category.components.fetch.loading.name,
    description: Keys.category.components.fetch.loading.description,
    components: [Loading, WebCode] as NonNullable<UICategories.TCategoryComponentDefinition["components"]>,
};

export {Loading, WebCode};

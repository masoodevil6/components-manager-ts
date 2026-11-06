import * as UICategories from "@/ui_categories";
import {Keys} from "../../../../../languages";
import {Messages} from "../../../simples/messages";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "messages",
    name: Keys.category.components.contents.messages.name,
    description: Keys.category.components.contents.messages.description,
    components: [Messages] as NonNullable<UICategories.TCategoryComponentDefinition["components"]>,
};

import * as UICategories from "@/ui_categories";
import {Keys} from "../../../languages";
import {Definition as FormDefinition} from "./form";
import {Definition as WidgetDefinition} from "./widget";
import {Definition as IframeDefinition} from "./iframe";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "fetch",
    name: Keys.category.components.fetch.name,
    description: Keys.category.components.fetch.description,
    components: [],
    children: [FormDefinition, WidgetDefinition, IframeDefinition],
};

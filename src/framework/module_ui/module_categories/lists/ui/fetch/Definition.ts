import * as UICategories from "@/ui_categories";
import {Keys} from "../../../languages";
import {Definition as FormDefinition} from "./form";
import {Definition as LoadingDefinition} from "./loading";
import {Definition as InputsDefinition} from "./inputs";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "fetch",
    name: Keys.category.components.fetch.name,
    description: Keys.category.components.fetch.description,
    components: [],
    children: [FormDefinition, LoadingDefinition, InputsDefinition],
};

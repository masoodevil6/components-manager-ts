import * as UICategories from "@/ui_categories";
import {Keys} from "../../../../languages";
import {Effective} from "../../effects/effective";
import {EffectChange} from "../../effects/effectChange";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "effects",
    name: Keys.category.components.tools.effects.name,
    description: Keys.category.components.tools.effects.description,
    components: [Effective, EffectChange] as NonNullable<UICategories.TCategoryComponentDefinition["components"]>,
};

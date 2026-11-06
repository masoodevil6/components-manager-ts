import * as UICategories from "@/ui_categories";
import {Keys} from "../../../../../languages";
import {InputSimple} from "../../../simples/inputSimple";
import {InputDescriptionSimple} from "../../../simples/inputDescriptionSimple";
import {SelectCustomSimple} from "../../../simples/selectCustomSimple";
import {Button} from "../../../simples/button";
import {Label} from "../../../simples/label";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "simple",
    name: Keys.category.components.fetch.inputs.simple.name,
    description: Keys.category.components.fetch.inputs.simple.description,
    components: [InputSimple, InputDescriptionSimple, SelectCustomSimple, Button, Label] as NonNullable<UICategories.TCategoryComponentDefinition["components"]>,
};

export {InputSimple, InputDescriptionSimple, SelectCustomSimple, Button, Label};

import * as UICategories from "@/ui_categories"
import {Keys}            from "../../../languages"
// --------------------------------
import {Icon}             from "./icon";
import {Button}           from "./button";
import {Messages}         from "./messages";
import {Label}            from "./label";
import {InputSimple}      from "./inputSimple";
import {SelectCustomSimple} from "./selectCustomSimple";

export const Definition : UICategories.TCategoryComponentDefinition = {
    id:          "simples",
    name:        Keys.category.components.simples.name,
    description: Keys.category.components.simples.description,

    components:  [
        Icon,
        Button,
        Messages,
        Label,
        InputSimple,
        SelectCustomSimple,
    ],
}

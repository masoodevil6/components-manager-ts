import * as UICategories from "@/ui_categories"
import {Keys}            from "../../../languages"
import {FloatMenu}       from "./floatMenu"
import {PositionMenu}    from "./positionMenu"

export const Definition : UICategories.TCategoryComponentDefinition = {
    id:          "positions",
    name:        Keys.category.components.positions.name,
    description: Keys.category.components.positions.description,

    components:  [
        FloatMenu,
        PositionMenu,
    ],
}

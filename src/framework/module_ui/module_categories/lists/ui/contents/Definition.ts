import * as UICategories from "@/ui_categories"
import {Keys}            from "../../../languages"
import {Border}          from "./border"

export const Definition : UICategories.TCategoryComponentDefinition = {
    id:          "contents",
    name:        Keys.category.components.contents.name,
    description: Keys.category.components.contents.description,

    components:  [
        Border,
    ],
}

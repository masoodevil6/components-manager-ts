import * as CoreLanguage           from "@/core_languages"
import * as UiIcons           from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../basic/types/TCategoryIconDefinition";
import {Keys} from "../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "status" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.status.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.status.name ) ,
    icons:        [
        UiIcons.Src.StatusIsTrue.Definition,
        UiIcons.Src.StatusIsFalse.Definition
    ]
}
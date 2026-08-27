import * as CoreLanguage           from "@/core_languages"
import * as UiIcons           from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../basic/types/TCategoryIconDefinition";
import {Keys} from "../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "light" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.light.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.light.name ) ,
    icons:        [
        UiIcons.Src.LightMoon.Definition,
        UiIcons.Src.LightSun.Definition
    ]
}
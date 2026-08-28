import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {Keys}                              from "../../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Series400" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.webCodes400.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.webCodes400.name ) ,
    icons:        [
        UiIcons.Src.WebCode401.Definition,
        UiIcons.Src.WebCode403.Definition,
        UiIcons.Src.WebCode404.Definition,
        UiIcons.Src.WebCode405.Definition,
        UiIcons.Src.WebCode408.Definition,
        UiIcons.Src.WebCode410.Definition,
        UiIcons.Src.WebCode429.Definition,
    ]
}
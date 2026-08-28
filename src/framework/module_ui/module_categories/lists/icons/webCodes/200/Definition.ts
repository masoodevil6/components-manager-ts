import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {Keys}                              from "../../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Series200" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.webCodes200.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.webCodes200.name ) ,
    icons:        [
        UiIcons.Src.WebCode200.Definition,
        UiIcons.Src.WebCode201.Definition,
        UiIcons.Src.WebCode204.Definition,
    ]
}
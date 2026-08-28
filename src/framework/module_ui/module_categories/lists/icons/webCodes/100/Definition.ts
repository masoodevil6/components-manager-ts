import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {Keys}                              from "../../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Series100" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.webCodes100.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.webCodes100.name ) ,
    icons:        [
        UiIcons.Src.WebCode100.Definition,
        UiIcons.Src.WebCode101.Definition,
    ]
}
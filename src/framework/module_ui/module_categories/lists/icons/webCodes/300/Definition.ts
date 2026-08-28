import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {Keys}                              from "../../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Series300" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.webCodes300.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.webCodes300.name ) ,
    icons:        [

        UiIcons.Src.WebCode301.Definition,
        UiIcons.Src.WebCode304.Definition,
    ]
}
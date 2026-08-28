import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {Keys}                              from "../../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Series500" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.webCodes500.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.webCodes500.name ) ,
    icons:        [
        UiIcons.Src.WebCode500.Definition,
        UiIcons.Src.WebCode502.Definition,
        UiIcons.Src.WebCode504.Definition,
    ]
}
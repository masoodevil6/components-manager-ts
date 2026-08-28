import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {Keys}                              from "../../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Basic" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.arrowsBasic.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.arrowsBasic.name ) ,
    icons:        [
        UiIcons.Src.ArrowUp.Definition,
        UiIcons.Src.ArrowDown.Definition ,
        UiIcons.Src.ArrowRight.Definition,
        UiIcons.Src.ArrowLeft.Definition,
    ]
}
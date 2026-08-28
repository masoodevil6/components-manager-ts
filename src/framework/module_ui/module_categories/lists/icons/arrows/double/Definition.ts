import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {Keys}                              from "../../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Double" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.arrowsDouble.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.arrowsDouble.name ) ,
    icons:        [
        UiIcons.Src.ArrowDoubleRight.Definition,
        UiIcons.Src.ArrowDoubleLeft.Definition,
        UiIcons.Src.ArrowDoubleUp.Definition,
        UiIcons.Src.ArrowDoubleDown.Definition,
    ]
}
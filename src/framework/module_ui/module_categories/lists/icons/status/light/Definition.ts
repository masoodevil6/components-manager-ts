import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {Keys}                              from "../../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Visit" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.statusLight.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.statusLight.name ) ,
    icons:        [
        UiIcons.Src.StatusVisit.Definition,
        UiIcons.Src.StatusUnVisit.Definition
    ]
}
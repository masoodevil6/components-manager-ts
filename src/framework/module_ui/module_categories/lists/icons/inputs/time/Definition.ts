import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../../basic/types/TCategoryIconDefinition";
import {Keys}                      from "../../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Time" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.inputsTime.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.inputsTime.name ) ,
    icons:        [
        UiIcons.Src.InputClock.Definition,
        UiIcons.Src.InputCalender.Definition
    ]
}
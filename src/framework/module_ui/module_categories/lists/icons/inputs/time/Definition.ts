import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}     from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}        from "../../../../basic/methods";
import {Keys}                      from "../../../../languages";


export const InputClock     : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.InputClock.Definition);
export const InputCalender  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.InputCalender.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Time" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.inputsTime.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.inputsTime.name ) ,
    icons:          [
        InputClock, InputCalender
    ]
}
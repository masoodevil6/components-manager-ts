import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}     from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}        from "../../../../basic/methods";
import {Keys}                      from "../../../../languages";


export const Clock     : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.InputClock.Definition);
export const Calender  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.InputCalender.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Time" ,
    name:            Keys.category.icons.inputsTime.name ,
    description:     Keys.category.icons.inputsTime.description  ,
    icons:          [
        Clock, Calender
    ]
}
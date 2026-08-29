import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const StatusLightOn    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.StatusSun.Definition);
export const StatusLightOff   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.StatusMoon.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Visit" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.statusLight.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.statusLight.name ) ,
    icons:          [
        StatusLightOn, StatusLightOff
    ]
}
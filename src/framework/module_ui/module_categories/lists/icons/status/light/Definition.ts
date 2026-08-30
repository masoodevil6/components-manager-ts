import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const On    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.StatusSun.Definition);
export const Off   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.StatusMoon.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Visit" ,
    name:            Keys.category.icons.statusLight.name ,
    description:     Keys.category.icons.statusLight.description  ,
    icons:          [
        On, Off
    ]
}
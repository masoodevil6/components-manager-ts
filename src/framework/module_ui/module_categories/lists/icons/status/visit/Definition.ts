import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const StatusVisit    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.StatusVisit.Definition);
export const StatusUnVisit  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.StatusUnVisit.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Visit" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.statusVisit.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.statusVisit.name ) ,
    icons:          [
        StatusVisit, StatusUnVisit
    ]
}
import * as CoreLanguage                        from "@/core_languages"
import * as UiIcons                             from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}                from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}                  from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                     from "../../../../basic/methods";
import {Keys}                                   from "../../../../languages";


export const Application    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileApplication.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Logo" ,
    name:            Keys.category.icons.filesLogo.name ,
    description:     Keys.category.icons.filesLogo.description  ,
    icons:          [
        Application
    ]
}
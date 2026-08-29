import * as CoreLanguage                        from "@/core_languages"
import * as UiIcons                             from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}                from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}                  from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                     from "../../../../basic/methods";
import {Keys}                                   from "../../../../languages";


export const FileApplication    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileApplication.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Logo" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.filesLogo.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.filesLogo.name ) ,
    icons:          [
        FileApplication
    ]
}
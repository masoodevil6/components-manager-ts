import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}     from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}        from "../../../../basic/methods";
import {Keys}                      from "../../../../languages";


export const FileClearBroom     : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileClearBroom.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Tools" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.inputsTools.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.inputsTools.name ) ,
    icons:          [
        FileClearBroom
    ]
}
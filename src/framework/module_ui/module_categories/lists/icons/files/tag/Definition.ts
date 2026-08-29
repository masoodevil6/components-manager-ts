import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}     from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}        from "../../../../basic/methods";
import {Keys}                      from "../../../../languages";


export const FileTage             : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileTage.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Tag" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.filesTag.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.filesTag.name ) ,
    icons:          [
        FileTage
    ]
}
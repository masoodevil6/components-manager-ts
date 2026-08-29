import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}     from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}        from "../../../../basic/methods";
import {Keys}                      from "../../../../languages";


export const FileStatusComplete    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileStatusComplete.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Status" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.filesStatus.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.filesStatus.name ) ,
    icons:          [
        FileStatusComplete
    ]
}
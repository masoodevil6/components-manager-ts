import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}     from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}        from "../../../../basic/methods";
import {Keys}                      from "../../../../languages";


export const FileType             : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileType.Definition);
export const FileTypeNote         : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileTypeNote.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Type" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.filesType.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.filesType.name ) ,
    icons:          [
        FileType,
        FileTypeNote
    ]
}
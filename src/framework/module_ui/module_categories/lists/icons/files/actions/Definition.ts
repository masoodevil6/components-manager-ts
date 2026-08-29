import * as CoreLanguage                        from "@/core_languages"
import * as UiIcons                             from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}                from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}                  from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                     from "../../../../basic/methods";
import {Keys}                                   from "../../../../languages";


export const FilesEdit    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FilesEdit.Definition);
export const FilesDelete  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FilesDelete.Definition);
export const FileAttachment : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileAttachment.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Actions" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.filesActions.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.filesActions.name ) ,
    icons:          [
        FilesEdit, FilesDelete, FileAttachment
    ]
}
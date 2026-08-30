import * as CoreLanguage                        from "@/core_languages"
import * as UiIcons                             from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}                from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}                  from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                     from "../../../../basic/methods";
import {Keys}                                   from "../../../../languages";


export const Edit    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FilesEdit.Definition);
export const Delete  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FilesDelete.Definition);
export const Attachment : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileAttachment.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Actions" ,
    name:            Keys.category.icons.filesActions.name ,
    description:     Keys.category.icons.filesActions.description ,
    icons:          [
        Edit, Delete, Attachment
    ]
}
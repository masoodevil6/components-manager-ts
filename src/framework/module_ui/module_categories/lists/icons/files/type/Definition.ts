import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}     from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}        from "../../../../basic/methods";
import {Keys}                      from "../../../../languages";


export const Type             : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileType.Definition);
export const TypeNote         : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileTypeNote.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Type" ,
    name:            Keys.category.icons.filesType.name ,
    description:     Keys.category.icons.filesType.description  ,
    icons:          [
        Type,
        TypeNote
    ]
}
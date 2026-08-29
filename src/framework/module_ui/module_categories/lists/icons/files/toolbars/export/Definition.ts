import * as CoreLanguage                        from "@/core_languages"
import * as UiIcons                             from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}                from "../../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}                  from "../../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                     from "../../../../../basic/methods";
import {Keys}                                   from "../../../../../languages";


export const FilesPrint  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FilesPrint.Definition);
export const FilesExcel  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FilesExcel.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Zoom" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.filesToolbarsExport.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.filesToolbarsExport.name ) ,
    icons:          [
        FilesPrint, FilesExcel
    ]
}
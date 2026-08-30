import * as CoreLanguage                        from "@/core_languages"
import * as UiIcons                             from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}                from "../../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}                  from "../../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                     from "../../../../../basic/methods";
import {Keys}                                   from "../../../../../languages";


export const Print  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FilesPrint.Definition);
export const Excel  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FilesExcel.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Zoom" ,
    name:            Keys.category.icons.filesToolbarsExport.name ,
    description:     Keys.category.icons.filesToolbarsExport.description ,
    icons:          [
        Print, Excel
    ]
}
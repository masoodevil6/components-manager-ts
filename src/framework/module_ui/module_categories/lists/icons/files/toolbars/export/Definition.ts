import * as CoreLanguage                        from "@/core_languages"
import * as UiIcons                             from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}                from "../../../../../basic/types/TCategoryIconDefinition";
import {Keys}                                   from "../../../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Zoom" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.filesToolbarsExport.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.filesToolbarsExport.name ) ,
    icons:        [
        UiIcons.Src.FilesPrint.Definition,
        UiIcons.Src.FilesExcel.Definition
    ]
}
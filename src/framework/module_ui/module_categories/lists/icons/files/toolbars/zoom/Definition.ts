import * as CoreLanguage                        from "@/core_languages"
import * as UiIcons                             from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}                from "../../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}                  from "../../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                     from "../../../../../basic/methods";
import {Keys}                                   from "../../../../../languages";


export const FilesZoom         : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FilesZoom.Definition);
export const FilesZoomIn       : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FilesZoomIn.Definition);
export const FilesZoomOut      : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FilesZoomOut.Definition);
export const FilesZoomRefresh  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FilesZoomRefresh.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Zoom" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.filesToolbarsZoom.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.filesToolbarsZoom.name ) ,
    icons:          [
        FilesZoom, FilesZoomIn, FilesZoomOut, FilesZoomRefresh
    ]
}
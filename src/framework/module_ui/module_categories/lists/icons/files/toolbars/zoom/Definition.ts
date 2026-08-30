import * as CoreLanguage                        from "@/core_languages"
import * as UiIcons                             from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}                from "../../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}                  from "../../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                     from "../../../../../basic/methods";
import {Keys}                                   from "../../../../../languages";


export const Zoom         : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FilesZoom.Definition);
export const ZoomIn       : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FilesZoomIn.Definition);
export const ZoomOut      : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FilesZoomOut.Definition);
export const ZoomRefresh  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FilesZoomRefresh.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Zoom" ,
    name:            Keys.category.icons.filesToolbarsZoom.name ,
    description:     Keys.category.icons.filesToolbarsZoom.description  ,
    icons:          [
        Zoom, ZoomIn, ZoomOut, ZoomRefresh
    ]
}
import * as CoreLanguage                        from "@/core_languages"
import * as UiIcons                             from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}                from "../../../../../basic/types/TCategoryIconDefinition";
import {Keys}                                   from "../../../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Zoom" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.filesToolbarsZoom.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.filesToolbarsZoom.name ) ,
    icons:        [
        UiIcons.Src.FilesZoom.Definition,
        UiIcons.Src.FilesZoomIn.Definition,
        UiIcons.Src.FilesZoomOut.Definition,
        UiIcons.Src.FilesZoomRefresh.Definition
    ]
}
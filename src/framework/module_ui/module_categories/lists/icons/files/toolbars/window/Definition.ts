import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../../basic/methods";
import {Keys}                              from "../../../../../languages";


export const FileWindowClose       : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileWindowClose.Definition);
export const FileWindowResizeMax   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileWindowResizeMax.Definition);
export const FileWindowResizeMin   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileWindowResizeMin.Definition);
export const FileWindowMinimize    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileWindowMinimize.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Window" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.filesToolbarsWindow.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.filesToolbarsWindow.name ) ,
    icons:          [
        FileWindowClose, FileWindowResizeMax, FileWindowResizeMin, FileWindowMinimize
    ]
}

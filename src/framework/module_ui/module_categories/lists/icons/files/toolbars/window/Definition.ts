import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../../basic/methods";
import {Keys}                              from "../../../../../languages";


export const Close       : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileWindowClose.Definition);
export const ResizeMax   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileWindowResizeMax.Definition);
export const ResizeMin   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileWindowResizeMin.Definition);
export const Minimize    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileWindowMinimize.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Window" ,
    name:            Keys.category.icons.filesToolbarsWindow.name ,
    description:     Keys.category.icons.filesToolbarsWindow.description  ,
    icons:          [
        Close,
        ResizeMax, ResizeMin,
        Minimize
    ]
}

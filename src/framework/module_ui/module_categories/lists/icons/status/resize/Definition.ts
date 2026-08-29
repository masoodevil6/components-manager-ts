import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const FileWindowResizeMax : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileWindowResizeMax.Definition);
export const FileWindowResizeMin : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileWindowResizeMin.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Resize" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.statusResize.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.statusResize.name ) ,
    icons:          [
        FileWindowResizeMax, FileWindowResizeMin
    ]
}

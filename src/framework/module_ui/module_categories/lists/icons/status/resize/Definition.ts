import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const WindowResizeMax : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileWindowResizeMax.Definition);
export const WindowResizeMin : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileWindowResizeMin.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Resize" ,
    name:            Keys.category.icons.statusResize.name ,
    description:     Keys.category.icons.statusResize.description ,
    icons:          [
        WindowResizeMax, WindowResizeMin
    ]
}

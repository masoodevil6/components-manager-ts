import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const Dots : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.LoadingDotsVertical.Definition);
export const Bars : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.LoadingBarsVertical.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Vertical" ,
    name:            Keys.category.icons.loadingsVertical.name ,
    description:     Keys.category.icons.loadingsVertical.description  ,
    icons:          [
        Dots, Bars
    ]
}

import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const Dots : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.LoadingDotsHorizontal.Definition);
export const Bars : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.LoadingBarsHorizontal.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Horizontal" ,
    name:            Keys.category.icons.loadingsHorizontal.name ,
    description:     Keys.category.icons.loadingsHorizontal.description  ,
    icons:          [
        Dots, Bars
    ]
}

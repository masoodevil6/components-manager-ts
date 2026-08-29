import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const LoadingDotsHorizontal : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.LoadingDotsHorizontal.Definition);
export const LoadingBarsHorizontal : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.LoadingBarsHorizontal.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Horizontal" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.loadingsHorizontal.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.loadingsHorizontal.name ) ,
    icons:          [
        LoadingDotsHorizontal, LoadingBarsHorizontal
    ]
}

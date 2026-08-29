import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const LoadingOrbit  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.LoadingOrbit.Definition);
export const LoadingPulse  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.LoadingPulse.Definition);
export const Loading       : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.Loading.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Circle" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.loadingsCircle.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.loadingsCircle.name ) ,
    icons:          [
        LoadingOrbit, LoadingPulse, Loading
    ]
}

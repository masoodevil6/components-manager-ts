import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../../basic/methods";
import {Keys}                              from "../../../../../languages";


export const ArrowDoubleRight  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowDoubleRight.Definition);
export const ArrowDoubleLeft   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowDoubleLeft.Definition);
export const ArrowDoubleUp     : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowDoubleUp.Definition);
export const ArrowDoubleDown   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowDoubleDown.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Double" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.arrowsDouble.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.arrowsDouble.name ) ,
    icons:          [
        ArrowDoubleRight, ArrowDoubleLeft, ArrowDoubleUp, ArrowDoubleDown,
    ]
}
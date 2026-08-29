import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const ArrowUp     : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowUp.Definition);
export const ArrowDown   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowDown.Definition);
export const ArrowRight  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowRight.Definition);
export const ArrowLeft   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowLeft.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Basic" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.arrowsBasic.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.arrowsBasic.name ) ,
    icons:          [
        ArrowUp, ArrowDown , ArrowRight , ArrowLeft
    ]
}
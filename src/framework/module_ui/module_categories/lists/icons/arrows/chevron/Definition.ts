import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const ArrowChevronUp     : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowChevronUp.Definition);
export const ArrowChevronRight  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowChevronRight.Definition);
export const ArrowChevronDown   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowChevronDown.Definition);
export const ArrowChevronLeft   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowChevronLeft.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Chevron" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.arrowsChevron.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.arrowsChevron.name ) ,
    icons:          [
        ArrowChevronUp, ArrowChevronRight, ArrowChevronDown, ArrowChevronLeft,
    ]
}
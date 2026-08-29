import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}     from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}        from "../../../../basic/methods";
import {Keys}                      from "../../../../languages";


export const CalcPlus     : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.CalcPlus.Definition);
export const CalcMinus    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.CalcMinus.Definition);
export const CalcCross    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.CalcCross.Definition);
export const CalcDivide   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.CalcDivide.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Symbol" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.calcSymbol.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.calcSymbol.name ) ,
    icons:          [
        CalcPlus, CalcMinus, CalcCross, CalcDivide,
    ]
}
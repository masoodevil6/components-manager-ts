import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}     from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}        from "../../../../basic/methods";
import {Keys}                      from "../../../../languages";


export const Plus     : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.CalcPlus.Definition);
export const Minus    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.CalcMinus.Definition);
export const Cross    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.CalcCross.Definition);
export const Divide   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.CalcDivide.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Symbol" ,
    name:            Keys.category.icons.calcSymbol.name ,
    description:     Keys.category.icons.calcSymbol.description ,
    icons:          [
        Plus, Minus, Cross, Divide,
    ]
}
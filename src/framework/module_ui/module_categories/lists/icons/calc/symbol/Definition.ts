import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../../basic/types/TCategoryIconDefinition";
import {Keys}                      from "../../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Symbol" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.calcSymbol.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.calcSymbol.name ) ,
    icons:        [
        UiIcons.Src.CalcPlus.Definition,
        UiIcons.Src.CalcMinus.Definition,
        UiIcons.Src.CalcCross.Definition,
        UiIcons.Src.CalcDivide.Definition,
    ]
}
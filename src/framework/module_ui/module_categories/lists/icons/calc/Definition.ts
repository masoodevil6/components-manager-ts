import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../basic/types/TCategoryIconDefinition";
import {Keys}                      from "../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "calc" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.calc.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.calc.name ) ,
    icons:        [
        UiIcons.Src.CalcPlus.Definition,
        UiIcons.Src.CalcMinus.Definition,
        UiIcons.Src.CalcCross.Definition,
        UiIcons.Src.CalcDivide.Definition,
    ]
}
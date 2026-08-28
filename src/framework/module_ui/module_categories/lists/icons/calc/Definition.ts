import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {Definition as SymbolDefinition}      from "./symbol";
// ------------------------------
import {TCategoryIconDefinition}   from "../../../basic/types/TCategoryIconDefinition";
import {Keys}                      from "../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Calc" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.calc.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.calc.name ) ,
    children:        [
        SymbolDefinition
    ]
}
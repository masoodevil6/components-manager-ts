import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {Definition as SymbolDefinition}      from "./symbol";
// ------------------------------
import {TCategoryIconDefinition}   from "../../../basic/types/TCategoryIconDefinition";
import {Keys}                      from "../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Calc" ,
    name:            Keys.category.icons.calc.name ,
    description:     Keys.category.icons.calc.description  ,
    children:        [
        SymbolDefinition
    ]
}
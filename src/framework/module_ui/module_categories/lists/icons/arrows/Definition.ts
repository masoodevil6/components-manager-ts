import * as CoreLanguage                    from "@/core_languages"
import * as UiIcons                         from "@/ui_icons"
// ------------------------------
import {Definition as BasicDefinition}      from "./basic";
import {Definition as ChevronDefinition}    from "./chevron";
import {Definition as DoubleDefinition}     from "./double";
// ------------------------------
import {TCategoryIconDefinition}            from "../../../basic/types/TCategoryIconDefinition";
import {Keys}                               from "../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Arrows" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.symbolsArrows.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.symbolsArrows.name ) ,
    children:        [
        BasicDefinition ,
        ChevronDefinition ,
        DoubleDefinition
    ]
}
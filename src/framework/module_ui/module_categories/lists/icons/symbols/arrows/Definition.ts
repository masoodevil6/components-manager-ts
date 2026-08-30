import * as CoreLanguage                    from "@/core_languages"
import * as UiIcons                         from "@/ui_icons"
// ------------------------------
import {Definition as BasicDefinition}      from "./basic";
import {Definition as ChevronDefinition}    from "./chevron";
import {Definition as DoubleDefinition}     from "./double";
// ------------------------------
import {TCategoryIconDefinition}            from "../../../../basic/types/TCategoryIconDefinition";
import {Keys}                               from "../../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Arrows" ,
    name:            Keys.category.icons.symbolsArrows.name ,
    description:     Keys.category.icons.symbolsArrows.description  ,
    children:        [
        BasicDefinition ,
        ChevronDefinition ,
        DoubleDefinition
    ]
}
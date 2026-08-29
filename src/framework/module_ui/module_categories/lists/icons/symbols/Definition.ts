import * as CoreLanguage                    from "@/core_languages"
// ------------------------------
import {Definition as ArrowsDefinition}     from "./arrows";
import {Definition as ExclumationDefinition} from "./exclumation";
import {TCategoryIconDefinition}            from "../../../basic/types/TCategoryIconDefinition";
import {Keys}                               from "../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Symbols" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.symbols.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.symbols.name ) ,
    children:        [
        ArrowsDefinition ,
        ExclumationDefinition ,
    ]
}

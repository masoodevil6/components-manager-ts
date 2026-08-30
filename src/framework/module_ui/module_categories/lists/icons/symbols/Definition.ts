import * as CoreLanguage                    from "@/core_languages"
// ------------------------------
import {Definition as ArrowsDefinition}     from "./arrows";
import {Definition as ExclumationDefinition} from "./exclumation";
import {TCategoryIconDefinition}            from "../../../basic/types/TCategoryIconDefinition";
import {Keys}                               from "../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Symbols" ,
    name:            Keys.category.icons.symbols.name ,
    description:     Keys.category.icons.symbols.description  ,
    children:        [
        ArrowsDefinition ,
        ExclumationDefinition ,
    ]
}

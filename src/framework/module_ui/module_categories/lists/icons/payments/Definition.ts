import * as CoreLanguage                   from "@/core_languages"
// ------------------------------
import {Definition as TypeDefinition}      from "./type";
import {TCategoryIconDefinition}           from "../../../basic/types/TCategoryIconDefinition";
import {Keys}                              from "../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Payment" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.payments.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.payments.name ) ,
    children:        [
        TypeDefinition ,
    ]
}
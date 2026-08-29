import * as CoreLanguage                   from "@/core_languages"
// ------------------------------
import {Definition as TypeDefinition}      from "./types";
import {Definition as ActionsDefinition}   from "./actions";
import {Definition as CashDefinition}      from "./cash";
import {Definition as LeverageDefinition}  from "./leverage";
import {Definition as InputDefinition}    from "./input";
import {Definition as RateDefinition}     from "./rate";
import {TCategoryIconDefinition}           from "../../../basic/types/TCategoryIconDefinition";
import {Keys}                              from "../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Payment" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.payments.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.payments.name ) ,
    children:        [
        TypeDefinition ,
        ActionsDefinition ,
        CashDefinition ,
        LeverageDefinition ,
        InputDefinition ,
        RateDefinition ,
    ]
}
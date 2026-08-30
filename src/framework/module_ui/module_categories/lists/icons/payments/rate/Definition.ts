import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const Simple : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentRate.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Rate" ,
    name:            Keys.category.icons.paymentsRate.name ,
    description:     Keys.category.icons.paymentsRate.description  ,
    icons:          [
        Simple
    ]
}
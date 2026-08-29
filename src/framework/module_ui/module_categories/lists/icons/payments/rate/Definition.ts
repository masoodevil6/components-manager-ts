import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const PaymentRate : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentRate.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Rate" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.paymentsRate.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.paymentsRate.name ) ,
    icons:          [
        PaymentRate
    ]
}
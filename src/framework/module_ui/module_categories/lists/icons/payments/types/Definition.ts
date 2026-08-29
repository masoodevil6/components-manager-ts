import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const PaymentCash     : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentCash.Definition);
export const PaymentRial     : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentRial.Definition);
export const PaymentTether   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentTether.Definition);
export const PaymentDerham   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentDerham.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Types" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.paymentsType.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.paymentsType.name ) ,
    icons:          [
        PaymentCash, PaymentRial, PaymentTether, PaymentDerham
    ]
}
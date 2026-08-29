import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const PaymentAmount        : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentAmount.Definition);
export const PaymentCashCurrency  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentCashCurrency.Definition);
export const PaymentCoinCurrency  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentCoinCurrency.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Cash" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.paymentsCash.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.paymentsCash.name ) ,
    icons:          [
        PaymentAmount, PaymentCashCurrency, PaymentCoinCurrency
    ]
}

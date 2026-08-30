import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const Amount        : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentAmount.Definition);
export const CashCurrency  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentCashCurrency.Definition);
export const CoinCurrency  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentCoinCurrency.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Cash" ,
    name:            Keys.category.icons.paymentsCash.name ,
    description:     Keys.category.icons.paymentsCash.description  ,
    icons:          [
        Amount, CashCurrency, CoinCurrency
    ]
}

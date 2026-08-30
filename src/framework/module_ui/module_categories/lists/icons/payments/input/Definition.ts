import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const Wallet1    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentWallet1.Definition);
export const Wallet2    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentWallet2.Definition);
export const CardNumber : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentCardNumber.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Input" ,
    name:            Keys.category.icons.paymentsInput.name ,
    description:     Keys.category.icons.paymentsInput.description  ,
    icons:          [
        Wallet1, Wallet2, CardNumber
    ]
}

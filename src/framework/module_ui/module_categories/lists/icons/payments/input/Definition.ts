import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const PaymentWallet1    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentWallet1.Definition);
export const PaymentWallet2    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentWallet2.Definition);
export const PaymentCardNumber : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentCardNumber.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Input" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.paymentsInput.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.paymentsInput.name ) ,
    icons:          [
        PaymentWallet1, PaymentWallet2, PaymentCardNumber
    ]
}

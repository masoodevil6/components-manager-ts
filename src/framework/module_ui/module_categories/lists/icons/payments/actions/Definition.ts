import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const PaymentWalletAdd    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentWalletAdd.Definition);
export const PaymentWithDrawal   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentWithDrawal.Definition);
export const PaymentDeposit      : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentDeposit.Definition);
export const PaymentTransaction  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentTransaction.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Actions" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.paymentsActions.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.paymentsActions.name ) ,
    icons:          [
        PaymentWalletAdd, PaymentWithDrawal, PaymentDeposit, PaymentTransaction
    ]
}

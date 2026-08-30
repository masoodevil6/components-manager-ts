import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const  WalletAdd    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentWalletAdd.Definition);
export const  Withdrawal   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentWithDrawal.Definition);
export const  Deposit      : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentDeposit.Definition);
export const  Transaction  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentTransaction.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Actions" ,
    name:            Keys.category.icons.paymentsActions.name ,
    description:     Keys.category.icons.paymentsActions.description  ,
    icons:          [
        WalletAdd, Withdrawal, Deposit, Transaction
    ]
}

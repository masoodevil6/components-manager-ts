import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const Leverage   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentLeverage.Definition);
export const Leverage2  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentLeverage2.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Leverage" ,
    name:            Keys.category.icons.paymentsLeverage.name ,
    description:     Keys.category.icons.paymentsLeverage.description  ,
    icons:          [
        Leverage, Leverage2
    ]
}

import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const Cash     : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentCash.Definition);
export const Rial     : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentRial.Definition);
export const Tether   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentTether.Definition);
export const Derham   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentDerham.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Types" ,
    name:            Keys.category.icons.paymentsType.name ,
    description:     Keys.category.icons.paymentsType.description  ,
    icons:          [
        Cash, Rial, Tether, Derham
    ]
}
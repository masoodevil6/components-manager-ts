import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {Keys}                              from "../../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Types" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.paymentsType.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.paymentsType.name ) ,
    icons:        [
        UiIcons.Src.PaymentCash.Definition,
        UiIcons.Src.PaymentRial.Definition,
        UiIcons.Src.PaymentTether.Definition,
        UiIcons.Src.PaymentDerham.Definition
    ]
}
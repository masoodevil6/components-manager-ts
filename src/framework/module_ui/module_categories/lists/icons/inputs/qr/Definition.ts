import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}     from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}        from "../../../../basic/methods";
import {Keys}                      from "../../../../languages";


export const InputQrCode         : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.InputQrCode.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Qr" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.inputsQr.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.inputsQr.name ) ,
    icons:          [
        InputQrCode
    ]
}
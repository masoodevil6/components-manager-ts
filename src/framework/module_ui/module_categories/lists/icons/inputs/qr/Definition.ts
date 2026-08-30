import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}     from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}        from "../../../../basic/methods";
import {Keys}                      from "../../../../languages";


export const QrCode         : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.InputQrCode.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Qr" ,
    name:            Keys.category.icons.inputsQr.name ,
    description:     Keys.category.icons.inputsQr.description  ,
    icons:          [
        QrCode
    ]
}
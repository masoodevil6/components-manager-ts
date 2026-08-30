import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const WebCode200  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.WebCode200.Definition);
export const WebCode201  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.WebCode201.Definition);
export const WebCode204  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.WebCode204.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Series200" ,
    name:            Keys.category.icons.webCodes200.name ,
    description:     Keys.category.icons.webCodes200.description  ,
    icons:          [
        WebCode200, WebCode201, WebCode204,
    ]
}
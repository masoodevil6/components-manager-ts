import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const WebCode100  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.WebCode100.Definition);
export const WebCode101  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.WebCode101.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Series100" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.webCodes100.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.webCodes100.name ) ,
    icons:          [
        WebCode100, WebCode101,
    ]
}
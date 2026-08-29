import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const WebCode500  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.WebCode500.Definition);
export const WebCode502  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.WebCode502.Definition);
export const WebCode504  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.WebCode504.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Series500" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.webCodes500.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.webCodes500.name ) ,
    icons:          [
        WebCode500, WebCode502, WebCode504,
    ]
}
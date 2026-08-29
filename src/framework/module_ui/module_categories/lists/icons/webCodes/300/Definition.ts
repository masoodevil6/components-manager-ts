import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const WebCode301  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.WebCode301.Definition);
export const WebCode304  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.WebCode304.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Series300" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.webCodes300.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.webCodes300.name ) ,
    icons:          [
        WebCode301, WebCode304,
    ]
}
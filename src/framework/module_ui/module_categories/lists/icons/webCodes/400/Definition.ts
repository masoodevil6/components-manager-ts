import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const WebCode401  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.WebCode401.Definition);
export const WebCode403  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.WebCode403.Definition);
export const WebCode404  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.WebCode404.Definition);
export const WebCode405  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.WebCode405.Definition);
export const WebCode408  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.WebCode408.Definition);
export const WebCode410  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.WebCode410.Definition);
export const WebCode429  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.WebCode429.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Series400" ,
    name:            Keys.category.icons.webCodes400.name ,
    description:     Keys.category.icons.webCodes400.description  ,
    icons:          [
        WebCode401, WebCode403, WebCode404, WebCode405, WebCode408, WebCode410, WebCode429,
    ]
}
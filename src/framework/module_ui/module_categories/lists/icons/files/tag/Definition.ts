import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}     from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}        from "../../../../basic/methods";
import {Keys}                      from "../../../../languages";


export const Tage             : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileTage.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Tag" ,
    name:            Keys.category.icons.filesTag.name ,
    description:     Keys.category.icons.filesTag.description ,
    icons:          [
        Tage
    ]
}
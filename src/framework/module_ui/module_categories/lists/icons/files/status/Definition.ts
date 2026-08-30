import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}     from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}        from "../../../../basic/methods";
import {Keys}                      from "../../../../languages";


export const Complete    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileStatusComplete.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Status" ,
    name:            Keys.category.icons.filesStatus.name ,
    description:     Keys.category.icons.filesStatus.description  ,
    icons:          [
        Complete
    ]
}
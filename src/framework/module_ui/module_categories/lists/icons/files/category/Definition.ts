import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}     from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}        from "../../../../basic/methods";
import {Keys}                      from "../../../../languages";


export const FileCategory         : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileCategory.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Category" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.filesCategory.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.filesCategory.name ) ,
    icons:          [
        FileCategory
    ]
}
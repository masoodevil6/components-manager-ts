import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}     from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}        from "../../../../basic/methods";
import {Keys}                      from "../../../../languages";


export const Category         : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileCategory.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Category" ,
    name:            Keys.category.icons.filesCategory.name ,
    description:     Keys.category.icons.filesCategory.description ,
    icons:          [
        Category
    ]
}
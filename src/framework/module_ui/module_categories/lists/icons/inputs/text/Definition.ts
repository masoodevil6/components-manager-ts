import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}     from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}        from "../../../../basic/methods";
import {Keys}                      from "../../../../languages";


export const InputTitle           : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.InputTitle.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Text" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.inputsText.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.inputsText.name ) ,
    icons:          [
        InputTitle
    ]
}
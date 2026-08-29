import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}     from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}        from "../../../../basic/methods";
import {Keys}                      from "../../../../languages";


export const InputNumber          : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.InputNumber.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Number" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.inputsNumber.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.inputsNumber.name ) ,
    icons:          [
        InputNumber
    ]
}
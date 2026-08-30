import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}     from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}        from "../../../../basic/methods";
import {Keys}                      from "../../../../languages";


export const Number          : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.InputNumber.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Number" ,
    name:            Keys.category.icons.inputsNumber.name ,
    description:     Keys.category.icons.inputsNumber.description  ,
    icons:          [
        Number
    ]
}
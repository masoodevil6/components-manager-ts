import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}     from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}        from "../../../../basic/methods";
import {Keys}                      from "../../../../languages";


export const Column    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.InputSelectColumn.Definition);
export const Option    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.InputSelectOption.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Select" ,
    name:            Keys.category.icons.inputsSelect.name ,
    description:     Keys.category.icons.inputsSelect.description  ,
    icons:          [
        Column,
        Option
    ]
}
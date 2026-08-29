import * as CoreLanguage           from "@/core_languages"
import * as UiIcons                from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}     from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}        from "../../../../basic/methods";
import {Keys}                      from "../../../../languages";


export const InputSelectColumn    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.InputSelectColumn.Definition);
export const InputSelectOption    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.InputSelectOption.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Select" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.inputsSelect.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.inputsSelect.name ) ,
    icons:          [
        InputSelectColumn,
        InputSelectOption
    ]
}
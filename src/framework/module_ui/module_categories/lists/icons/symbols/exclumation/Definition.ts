import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const Square   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.SymbolExclumationSquare.Definition);
export const Warning  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.SymbolExclumationWarning.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Exclamation" ,
    name:            Keys.category.icons.symbolsExclumation.name ,
    description:     Keys.category.icons.symbolsExclumation.description ,
    icons:          [
        Square, Warning
    ]
}

import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const SymbolExclumationSquare   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.SymbolExclumationSquare.Definition);
export const SymbolExclumationWarning  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.SymbolExclumationWarning.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Exclumation" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.symbolsExclumation.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.symbolsExclumation.name ) ,
    icons:          [
        SymbolExclumationSquare, SymbolExclumationWarning
    ]
}

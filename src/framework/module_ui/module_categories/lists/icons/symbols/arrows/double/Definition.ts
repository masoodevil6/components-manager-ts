import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../../basic/methods";
import {Keys}                              from "../../../../../languages";


export const Right  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowDoubleRight.Definition);
export const Left   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowDoubleLeft.Definition);
export const Up     : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowDoubleUp.Definition);
export const Down   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowDoubleDown.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Double" ,
    name:            Keys.category.icons.arrowsDouble.name ,
    description:     Keys.category.icons.arrowsDouble.description  ,
    icons:          [
        Right, Left, Up, Down,
    ]
}
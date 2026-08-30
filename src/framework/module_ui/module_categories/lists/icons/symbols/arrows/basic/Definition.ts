import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../../basic/methods";
import {Keys}                              from "../../../../../languages";


export const Up     : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowUp.Definition);
export const Down   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowDown.Definition);
export const Right  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowRight.Definition);
export const Left   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowLeft.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Basic" ,
    name:            Keys.category.icons.arrowsBasic.name ,
    description:     Keys.category.icons.arrowsBasic.description  ,
    icons:          [
        Up, Down , Right , Left
    ]
}
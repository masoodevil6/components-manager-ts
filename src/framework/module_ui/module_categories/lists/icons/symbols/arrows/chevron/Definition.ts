import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../../basic/methods";
import {Keys}                              from "../../../../../languages";


export const Up     : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowChevronUp.Definition);
export const Right  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowChevronRight.Definition);
export const Down   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowChevronDown.Definition);
export const Left   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ArrowChevronLeft.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Chevron" ,
    name:            Keys.category.icons.arrowsChevron.name ,
    description:     Keys.category.icons.arrowsChevron.description  ,
    icons:          [
        Up, Right, Down, Left,
    ]
}
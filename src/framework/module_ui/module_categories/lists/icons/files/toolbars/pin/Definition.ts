import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../../basic/methods";
import {Keys}                              from "../../../../../languages";


export const Open    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.StatusPinOpen.Definition);
export const Close   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.StatusPinClose.Definition);
export const Open2   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.StatusPin2Open.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Pin" ,
    name:            Keys.category.icons.filesToolbarsPin.name ,
    description:     Keys.category.icons.filesToolbarsPin.description ,
    icons:          [
        Open, Close,
        Open2
    ]
}

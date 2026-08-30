import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const Close : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.StatusLockedClose.Definition);
export const Open  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.StatusLockedOpen.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Locked" ,
    name:            Keys.category.icons.statusLocked.name ,
    description:     Keys.category.icons.statusLocked.description  ,
    icons:          [
        Close, Open
    ]
}

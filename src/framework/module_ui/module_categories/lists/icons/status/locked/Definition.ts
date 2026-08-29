import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const StatusLockedClose : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.StatusLockedClose.Definition);
export const StatusLockedOpen  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.StatusLockedOpen.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Locked" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.statusLocked.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.statusLocked.name ) ,
    icons:          [
        StatusLockedClose, StatusLockedOpen
    ]
}

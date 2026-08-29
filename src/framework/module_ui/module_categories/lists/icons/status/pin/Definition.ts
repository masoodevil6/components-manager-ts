import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const StatusPinOpen    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.StatusPinOpen.Definition);
export const StatusPinClose   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.StatusPinClose.Definition);
export const StatusPin2Open   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.StatusPin2Open.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Pin" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.statusPin.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.statusPin.name ) ,
    icons:          [
        StatusPinOpen, StatusPinClose, StatusPin2Open
    ]
}

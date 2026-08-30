import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const Simple           : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.UserAccount.Definition);
export const Add        : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.UserAccountAdd.Definition);
export const GroupAdd   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.UserAccountGroupAdd.Definition);
export const Reference  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.UserAccountReference.Definition);
export const Destination  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.UserAccountReffrence.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Account" ,
    name:            Keys.category.icons.usersAccount.name ,
    description:     Keys.category.icons.usersAccount.description  ,
    icons:          [
        Simple, Add, GroupAdd, Reference, Destination
    ]
}

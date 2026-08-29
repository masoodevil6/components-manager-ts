import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const UserAccount           : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.UserAccount.Definition);
export const UserAccountAdd        : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.UserAccountAdd.Definition);
export const UserAccountGroupAdd   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.UserAccountGroupAdd.Definition);
export const UserAccountReference  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.UserAccountReference.Definition);
export const UserAccountReffrence  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.UserAccountReffrence.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Account" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.usersAccount.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.usersAccount.name ) ,
    icons:          [
        UserAccount, UserAccountAdd, UserAccountGroupAdd, UserAccountReference, UserAccountReffrence
    ]
}

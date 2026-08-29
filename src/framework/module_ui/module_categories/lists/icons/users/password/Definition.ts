import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const UserPassword       : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.UserPassword.Definition);
export const UserChangePassword : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.UserChangePassword.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Password" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.usersPassword.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.usersPassword.name ) ,
    icons:          [
        UserPassword, UserChangePassword
    ]
}

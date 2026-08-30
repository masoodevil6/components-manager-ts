import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const Password       : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.UserPassword.Definition);
export const ChangePassword : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.UserChangePassword.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Password" ,
    name:            Keys.category.icons.usersPassword.name ,
    description:     Keys.category.icons.usersPassword.description  ,
    icons:          [
        Password, ChangePassword
    ]
}

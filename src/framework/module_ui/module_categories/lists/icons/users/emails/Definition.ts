import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const UserEmail1   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.UserEmail1.Definition);
export const UserEmail2   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.UserEmail2.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Emails" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.usersEmails.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.usersEmails.name ) ,
    icons:          [
        UserEmail1, UserEmail2
    ]
}

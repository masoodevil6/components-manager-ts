import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const UserPhone   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.UserPhone.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Phone" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.usersPhone.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.usersPhone.name ) ,
    icons:          [
        UserPhone
    ]
}

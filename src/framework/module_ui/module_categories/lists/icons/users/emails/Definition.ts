import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const Email1   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.UserEmail1.Definition);
export const Email2   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.UserEmail2.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Emails" ,
    name:            Keys.category.icons.usersEmails.name ,
    description:     Keys.category.icons.usersEmails.description  ,
    icons:          [
        Email1, Email2
    ]
}

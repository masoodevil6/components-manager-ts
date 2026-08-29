import * as CoreLanguage                   from "@/core_languages"
// ------------------------------
import {Definition as AccountDefinition}   from "./account";
import {Definition as EmailsDefinition}    from "./emails";
import {Definition as PhoneDefinition}     from "./phone";
import {Definition as PasswordDefinition}  from "./password";
import {TCategoryIconDefinition}           from "../../../basic/types/TCategoryIconDefinition";
import {Keys}                              from "../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Users" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.users.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.users.name ) ,
    children:        [
        AccountDefinition ,
        EmailsDefinition ,
        PhoneDefinition ,
        PasswordDefinition ,
    ]
}

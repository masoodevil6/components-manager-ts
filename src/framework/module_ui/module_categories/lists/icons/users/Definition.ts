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
    name:            Keys.category.icons.users.name ,
    description:     Keys.category.icons.users.description  ,
    children:        [
        AccountDefinition ,
        EmailsDefinition ,
        PhoneDefinition ,
        PasswordDefinition ,
    ]
}

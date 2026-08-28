import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {Definition as BooleanDefinition}   from "./boolean";
import {Definition as VisitDefinition}     from "./visit";
import {Definition as LightDefinition}     from "./light";
import {TCategoryIconDefinition}           from "../../../basic/types/TCategoryIconDefinition";
import {Keys}                              from "../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Status" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.status.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.status.name ) ,
    children:        [
        BooleanDefinition ,
        VisitDefinition ,
        LightDefinition,
    ]
}
import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {Definition as TimeDefinition}      from "./time";
// ------------------------------
import {TCategoryIconDefinition}           from "../../../basic/types/TCategoryIconDefinition";
import {Keys}                              from "../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Inputs" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.inputs.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.inputs.name ) ,
    children:        [
        TimeDefinition
    ]
}
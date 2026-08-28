import * as CoreLanguage                       from "@/core_languages"
import * as UiIcons                            from "@/ui_icons"
// ------------------------------
import {Definition as Series100Definition}     from "./100";
import {Definition as Series200Definition}     from "./200";
import {Definition as Series300Definition}     from "./300";
import {Definition as Series400Definition}     from "./400";
import {Definition as Series500Definition}     from "./500";
// ------------------------------
import {TCategoryIconDefinition}               from "../../../basic/types/TCategoryIconDefinition";
import {Keys}                                  from "../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "WebCodes" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.webCodes.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.webCodes.name ) ,
    children:           [
        Series100Definition ,
        Series200Definition ,
        Series300Definition,
        Series400Definition,
        Series500Definition,
    ]
}
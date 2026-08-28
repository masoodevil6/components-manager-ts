import * as CoreLanguage                        from "@/core_languages"
import * as UiIcons                             from "@/ui_icons"
// ------------------------------
import {Definition as ToolbarsDefinition}       from "./toolbars";
import {Definition as ActionsDefinition}        from "./actions";
// ------------------------------
import {TCategoryIconDefinition}   from "../../../basic/types/TCategoryIconDefinition";
import {Keys}                      from "../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Files" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.files.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.files.name ) ,
    children:        [
        ToolbarsDefinition ,
        ActionsDefinition
    ]
}
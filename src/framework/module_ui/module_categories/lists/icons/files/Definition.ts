import * as CoreLanguage                        from "@/core_languages"
import * as UiIcons                             from "@/ui_icons"
// ------------------------------
import {Definition as ToolbarsDefinition}       from "./toolbars";
import {Definition as ActionsDefinition}        from "./actions";
import {Definition as LogoDefinition}           from "./logo";
import {Definition as CategoryDefinition}       from "./category";
import {Definition as TypeDefinition}           from "./type";
import {Definition as TagDefinition}            from "./tag";
import {Definition as StatusDefinition}         from "./status";
// ------------------------------
import {TCategoryIconDefinition}   from "../../../basic/types/TCategoryIconDefinition";
import {Keys}                      from "../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Files" ,
    name:            Keys.category.icons.files.name ,
    description:     Keys.category.icons.files.description  ,
    children:        [
        ToolbarsDefinition ,
        ActionsDefinition ,
        LogoDefinition ,
       CategoryDefinition ,
       TypeDefinition ,
       TagDefinition ,
       StatusDefinition
   ]
}
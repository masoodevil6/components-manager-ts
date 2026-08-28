import * as CoreLanguage                        from "@/core_languages"
import * as UiIcons                             from "@/ui_icons"
// ------------------------------
import {Definition as ZoomDefinition}           from "./zoom";
import {Definition as ExportDefinition}         from "./export";
// ------------------------------
import {TCategoryIconDefinition}                from "../../../../basic/types/TCategoryIconDefinition";
import {Keys}                                   from "../../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Toolbars" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.filesToolbars.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.filesToolbars.name ) ,
    children:        [
        ZoomDefinition ,
        ExportDefinition
    ]
}
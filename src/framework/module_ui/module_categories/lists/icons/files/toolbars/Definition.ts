import * as CoreLanguage                        from "@/core_languages"
import * as UiIcons                             from "@/ui_icons"
// ------------------------------
import {Definition as ZoomDefinition}           from "./zoom";
import {Definition as ExportDefinition}         from "./export";
import {Definition as PinDefinition}            from "./pin";
import {Definition as WindowDefinition}         from "./window";
import {Definition as HeaderDefinition}         from "./header";
// ------------------------------
import {TCategoryIconDefinition}                from "../../../../basic/types/TCategoryIconDefinition";
import {Keys}                                   from "../../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Toolbars" ,
    name:            Keys.category.icons.filesToolbars.name ,
    description:     Keys.category.icons.filesToolbars.description  ,
    children:        [
        ZoomDefinition ,
        ExportDefinition ,
        PinDefinition ,
        WindowDefinition ,
        HeaderDefinition ,
    ]
}
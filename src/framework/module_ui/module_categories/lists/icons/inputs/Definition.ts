import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {Definition as TimeDefinition}      from "./time";
import {Definition as ToolsDefinition}     from "./tools";
import {Definition as QrDefinition}        from "./qr";
import {Definition as SelectDefinition}    from "./select";
import {Definition as TextDefinition}      from "./text";
import {Definition as NumberDefinition}    from "./number";
// ------------------------------
import {TCategoryIconDefinition}           from "../../../basic/types/TCategoryIconDefinition";
import {Keys}                              from "../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Inputs" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.inputs.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.inputs.name ) ,
    children:        [
        TimeDefinition,
        ToolsDefinition,
        QrDefinition,
        SelectDefinition,
        TextDefinition,
        NumberDefinition
    ]
}
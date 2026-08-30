import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {Definition as BooleanDefinition}   from "./boolean";
import {Definition as VisitDefinition}     from "./visit";
import {Definition as LightDefinition}     from "./light";
import {Definition as PinDefinition}       from "./pin";
import {Definition as ResizeDefinition}    from "./resize";
import {Definition as LockedDefinition}    from "./locked";
import {TCategoryIconDefinition}           from "../../../basic/types/TCategoryIconDefinition";
import {Keys}                              from "../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Status" ,
    name:            Keys.category.icons.status.name ,
    description:     Keys.category.icons.status.description  ,
    children:        [
        BooleanDefinition ,
        VisitDefinition ,
        LightDefinition,
        PinDefinition ,
        ResizeDefinition ,
        LockedDefinition ,
    ]
}
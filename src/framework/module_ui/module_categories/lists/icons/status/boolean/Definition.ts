import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {Keys}                              from "../../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Boolean" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.statusBoolean.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.statusBoolean.name ) ,
    icons:        [
        UiIcons.Src.StatusIsTrue.Definition,
        UiIcons.Src.StatusIsFalse.Definition
    ]
}
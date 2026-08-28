import * as CoreLanguage                        from "@/core_languages"
import * as UiIcons                             from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}                from "../../../../basic/types/TCategoryIconDefinition";
import {Keys}                                   from "../../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Actions" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.filesActions.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.filesActions.name ) ,
    icons:        [
        UiIcons.Src.FilesEdit.Definition,
        UiIcons.Src.FilesDelete.Definition
    ]
}
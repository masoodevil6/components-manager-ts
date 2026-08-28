import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {Keys}                              from "../../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Chevron" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.arrowsChevron.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.arrowsChevron.name ) ,
    icons:        [
        UiIcons.Src.ArrowChevronUp.Definition,
        UiIcons.Src.ArrowChevronRight.Definition,
        UiIcons.Src.ArrowChevronDown.Definition,
        UiIcons.Src.ArrowChevronLeft.Definition,
    ]
}
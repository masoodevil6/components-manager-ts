import * as CoreLanguage           from "@/core_languages"
import * as UiIcons           from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../basic/types/TCategoryIconDefinition";
import {Keys} from "../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "arrows" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.arrows.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.arrows.name ) ,
    icons:        [
        UiIcons.Src.ArrowChevronUp.Definition,
        UiIcons.Src.ArrowChevronRight.Definition,
        UiIcons.Src.ArrowChevronDown.Definition,
        UiIcons.Src.ArrowChevronLeft.Definition,

        UiIcons.Src.ArrowDoubleRight.Definition,
        UiIcons.Src.ArrowDoubleLeft.Definition,
        UiIcons.Src.ArrowDoubleUp.Definition,
        UiIcons.Src.ArrowDoubleDown.Definition,

        UiIcons.Src.ArrowUp.Definition,
        UiIcons.Src.ArrowDown.Definition ,
        UiIcons.Src.ArrowRight.Definition,
        UiIcons.Src.ArrowLeft.Definition,

    ]
}
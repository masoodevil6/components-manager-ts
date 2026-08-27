import * as CoreLanguage           from "@/core_languages"
import * as UiIcons           from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}   from "../../../basic/types/TCategoryIconDefinition";
import {Keys} from "../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "zoom" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.zoom.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.zoom.name ) ,
    icons:        [
        UiIcons.Src.Zoom.Definition,
        UiIcons.Src.ZoomIn.Definition,
        UiIcons.Src.ZoomOut.Definition,
        UiIcons.Src.ZoomRefresh.Definition
    ]
}
import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const Orbit  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.LoadingOrbit.Definition);
export const Pulse  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.LoadingPulse.Definition);
export const Simple       : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.Loading.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Circle" ,
    name:            Keys.category.icons.loadingsCircle.name ,
    description:     Keys.category.icons.loadingsCircle.description  ,
    icons:          [
        Orbit, Pulse, Simple
    ]
}

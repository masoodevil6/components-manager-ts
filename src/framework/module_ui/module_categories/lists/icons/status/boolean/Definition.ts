import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const IsTrue   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.StatusIsTrue.Definition);
export const IsFalse  : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.StatusIsFalse.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Boolean" ,
    name:            Keys.category.icons.statusBoolean.name ,
    description:     Keys.category.icons.statusBoolean.description  ,
    icons:          [
        IsTrue, IsFalse
    ]
}
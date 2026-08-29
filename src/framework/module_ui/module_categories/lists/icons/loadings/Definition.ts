import * as CoreLanguage                   from "@/core_languages"
// ------------------------------
import {Definition as CircleDefinition}    from "./circle";
import {Definition as HorizontalDefinition} from "./horizontal";
import {Definition as VerticalDefinition}   from "./vertical";
import {TCategoryIconDefinition}           from "../../../basic/types/TCategoryIconDefinition";
import {Keys}                              from "../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Loadings" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.loadings.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.loadings.name ) ,
    children:        [
        CircleDefinition ,
        HorizontalDefinition ,
        VerticalDefinition ,
    ]
}

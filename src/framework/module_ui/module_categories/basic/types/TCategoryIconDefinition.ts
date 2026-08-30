import * as CoreObservable     from "@/core_observable"
import * as UtilBrands         from "@/util_brands";
import * as UiIcons            from "@/ui_icons";
/// -------------------------
import {TCategoryIconTotality} from "./TCategoryIconTotality";


export type TCategoryIconDefinition = {
    id:                string;
    name:              UtilBrands.TranslationKey;
    description?:      UtilBrands.TranslationKey;
    source?:           () => UtilBrands.Icons ,
    children?:         TCategoryIconDefinition[];
    icons?:            TCategoryIconTotality[] | UiIcons.IIconDefinition[]
}
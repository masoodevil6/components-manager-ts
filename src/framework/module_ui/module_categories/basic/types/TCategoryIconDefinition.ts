import * as CoreObservable from "@/core_observable"
import * as UtilBrands from "@/util_brands"
import * as UiIcons from "@/ui_icons"


export type TCategoryIconDefinition = {
    id:                string;
    name:              CoreObservable.App<string>;
    description?:      CoreObservable.App<string>;
    source?:           () => UtilBrands.Icons ,
    children?:         TCategoryIconDefinition[];
    icons?:            UiIcons.IIconDefinition[]
}
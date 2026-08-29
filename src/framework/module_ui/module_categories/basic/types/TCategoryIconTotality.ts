import * as UtilBrands               from "@/util_brands"
import * as UiIcons                  from "@/ui_icons";
// ------------------
import {IIconOptions}              from "@/ui_icons";


export type TCategoryIconTotality =
    & ((options?: IIconOptions) => UtilBrands.Icons)
    & {
        info: UiIcons.IIconDefinition
    }



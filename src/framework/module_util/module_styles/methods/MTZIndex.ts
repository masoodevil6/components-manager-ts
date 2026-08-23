import * as UtilConsts                  from "@/util_consts";
///------------------------------
import {TCZIndex as ZIndex }            from "../types/const/TCZIndex";

export const MTZIndex = (zIndex: ZIndex = UtilConsts.ZIndex.basic) : number  => {
    return zIndex as number
}
import * as UtilConsts                   from "@/util_consts";
///------------------------------
import {TCSizes  as Sizes }              from "../types/const/TCSizes";
import {TVHeight as Height}              from "../types/var/TVHeight";

export const MTHeight = (size: Sizes = UtilConsts.Sizes.M) : Height  => {
    return `var(--height${size})` as Height
}
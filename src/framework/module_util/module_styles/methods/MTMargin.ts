import * as UtilConsts                 from "@/util_consts";
///------------------------------
import {TCSizes  as Sizes }            from "../types/const/TCSizes";
import {TVMargin as Margin}            from "../types/var/TVMargin";

export const MTMargin = (size: Sizes = UtilConsts.Sizes.M) : Margin  => {
    return `var(--margin${size})` as Margin
}
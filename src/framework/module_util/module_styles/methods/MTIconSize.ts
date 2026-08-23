import * as UtilConsts                     from "@/util_consts";
///------------------------------
import {TCSizes    as Sizes }              from "../types/const/TCSizes";
import {TVIconSize as IconSize}            from "../types/var/TVIconSize";

export const MTIconSize = (size: Sizes = UtilConsts.Sizes.M) : IconSize  => {
    return `var(--iconSize${size})` as IconSize
}
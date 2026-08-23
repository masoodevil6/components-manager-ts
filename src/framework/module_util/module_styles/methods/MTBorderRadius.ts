import * as UtilConsts                       from "@/util_consts";
///------------------------------
import {TCSizes        as Sizes}             from "../types/const/TCSizes";
import {TVBorderRadius as BorderRadius}      from "../types/var/TVBorderRadius";

export const MTBorderRadius = (size: Sizes = UtilConsts.Sizes.M) : BorderRadius  => {
    return `var(--borderRadius${size})` as BorderRadius
}
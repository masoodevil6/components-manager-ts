import * as UtilConsts                      from "@/util_consts";
///------------------------------
import {TCSizes       as Sizes}             from "../types/const/TCSizes";
import {TVBorderWidth as BorderWidth}       from "../types/var/TVBorderWidth";

export const MTBorderWidth = (size: Sizes = UtilConsts.Sizes.M) : BorderWidth  => {
    return `var(--borderWidth${size})` as BorderWidth;
}
import * as UtilConsts                  from "@/util_consts";
///------------------------------
import {TCSizes    as Sizes }           from "../types/const/TCSizes";
import {TVFontSize as FontSize}         from "../types/var/TVFontSize";

export const MTFontSize = (size: Sizes = UtilConsts.Sizes.M) : FontSize  => {
    return `var(--fontSize${size})` as  FontSize
}
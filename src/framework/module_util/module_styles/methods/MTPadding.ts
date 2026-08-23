import * as UtilConsts                  from "@/util_consts";
///------------------------------
import {TCSizes   as Sizes }            from "../types/const/TCSizes";
import {TVPadding as Padding}           from "../types/var/TVPadding";

export const MTPadding = (size: Sizes = UtilConsts.Sizes.M) : Padding  => {
    return `var(--padding${size})` as Padding
}
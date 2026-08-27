import * as UtilConsts        from "@/util_consts";
///------------------------------
import {TCSizes}              from "../types/const/TCSizes";
import {TVBorderWidth }       from "../types/var/TVBorderWidth";
import {MTSizeUnit}           from "./MTSizeUnit";
import {TVSizeUnit}           from "../types/var/TVSizeUnit";

export const MTBorderWidth = (size: TCSizes | TVSizeUnit   = UtilConsts.Sizes.M) : TVBorderWidth | TVSizeUnit   => {
    if (Object.values(UtilConsts.Sizes).includes(size as TCSizes)) {
        return `var(--borderWidth${size})` as TVBorderWidth;
    }
    if (typeof size === "number") {
        return MTSizeUnit(size , UtilConsts.Units.PEXEL) as TVSizeUnit
    }

}
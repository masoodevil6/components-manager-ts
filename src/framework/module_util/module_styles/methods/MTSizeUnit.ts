import * as UtilConsts                   from "@/util_consts";
///------------------------------
import {TCUnits    as Units }            from "../types/const/TCUnits";
import {TVSizeUnit as SizeUnit }         from "../types/var/TVSizeUnit";

export const MTSizeUnit = (number: number  , unit:  Units = UtilConsts.Units.PEXEL) : SizeUnit=> {
    return `${number}${unit}` as SizeUnit
}
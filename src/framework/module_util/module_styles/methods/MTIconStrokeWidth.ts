import * as UtilConsts        from "@/util_consts";
///------------------------------
import {TCSizes}              from "../types/const/TCSizes";
import {MTBorderWidth}        from "./MTBorderWidth";

export const MTIconStrokeWidth = (
    size: TCSizes | number   = UtilConsts.Sizes.M ,
    viewBoxX: number = 24,
    viewBoxY: number = 24,
    viewBoxXStandard: number = 24,
    viewBoxYStandard: number = 24
): number => {

    const scale = Math.min(
        viewBoxX / viewBoxXStandard,
        viewBoxY / viewBoxYStandard
    );

    let designStrokeWidth = 2;
    if (typeof size === "number") {
        designStrokeWidth = size;
    }
    else {
        const borderWidth = MTBorderWidth(size);
        if (typeof borderWidth === "string") {
            const cssValue =
                getComputedStyle(document.documentElement)
                    .getPropertyValue(borderWidth)
                    .trim();
            const value = parseFloat(cssValue);
            if (!Number.isNaN(value)) {
                designStrokeWidth = value;
            }
        }

    }

    return designStrokeWidth * scale;
};
import * as UtilConsts        from "@/util_consts";
///------------------------------
import {TCSizes}              from "../types/const/TCSizes";
import {MTBorderWidth}        from "./MTBorderWidth";

const ICON_STROKE_RATIO = 0.2;

export const MTIconStrokeWidth = (
    size: TCSizes | number = UtilConsts.Sizes.M,
    viewBoxX = 24,
    viewBoxY = 24,
    viewBoxXStandard = 24,
    viewBoxYStandard = 24
): number => {

    const viewBoxScale = Math.min(
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
            const cssValue = getComputedStyle(document.documentElement)
                .getPropertyValue(borderWidth)
                .trim();

            const value = parseFloat(cssValue);

            if (Number.isFinite(value)) {
                designStrokeWidth = value;
            }
        }
    }

    return designStrokeWidth * viewBoxScale * ICON_STROKE_RATIO;
};
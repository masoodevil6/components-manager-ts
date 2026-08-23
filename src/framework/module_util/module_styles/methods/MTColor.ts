import * as UtilConsts               from "@/util_consts";
///------------------------------
import {TCColorMain as ColorMain}    from "../types/const/TCColorMain";
import {TCColorGrad as ColorGrad}    from "../types/const/TCColorGrad";
import {TVColor     as Color}        from "../types/var/TVColor";

export const MTColor = (color: ColorMain = UtilConsts.ColorMain.PRIMARY , grade: ColorGrad = UtilConsts.ColorGrad.GRADE_1) : Color  => {
    return `var(--${color}Color${grade})` as Color
}
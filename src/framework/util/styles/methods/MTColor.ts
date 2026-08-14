import * as UtilConsts from "@/util_consts";
import * as UtilStyle from "@/util_styles";

export const MTColor = (color: UtilStyle.Types.Const.TCColorMain = UtilConsts.ColorMain.PRIMARY , grade: UtilStyle.Types.Const.TCColorGrad = UtilConsts.ColorGrad.GRADE_1) : UtilStyle.Types.Var.TVColor  => {
    return `var(--${color}Color${grade})` as UtilStyle.Types.Var.TVColor
}
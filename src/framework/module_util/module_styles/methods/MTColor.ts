import * as UtilConsts from "@/util_consts";
import * as UtilStyle from "@/util_styles";

export const MTColor = (color: UtilStyle.Types.Const.ColorMain = UtilConsts.Colors.ColorMain.PRIMARY , grade: UtilStyle.Types.Const.ColorGrad = UtilConsts.Colors.ColorGrad.GRADE_1) : UtilStyle.Types.Var.Color  => {
    return `var(--${color}Color${grade})` as UtilStyle.Types.Var.Color
}
import * as UtilConsts from "@/util_consts";
import * as UtilStyle from "@/util_styles";

export const MTFontSize = (size: UtilStyle.Types.Const.TCSizes = UtilConsts.Sizes.M) : UtilStyle.Types.Var.TVFontSize  => {
    return `var(--fontSize${size})` as UtilStyle.Types.Var.TVFontSize
}
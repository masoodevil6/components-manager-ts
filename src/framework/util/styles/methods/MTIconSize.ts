import * as UtilConsts from "@/util_consts";
import * as UtilStyle from "@/util_styles";

export const MTIconSize = (size: UtilStyle.Types.Const.TCSizes = UtilConsts.Sizes.M) : UtilStyle.Types.Var.TVIconSize  => {
    return `var(--iconSize${size})` as UtilStyle.Types.Var.TVIconSize
}
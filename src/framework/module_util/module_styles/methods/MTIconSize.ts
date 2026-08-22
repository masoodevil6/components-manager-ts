import * as UtilConsts from "@/util_consts";
import * as UtilStyle from "@/util_styles";

export const MTIconSize = (size: UtilStyle.Types.Const.Sizes = UtilConsts.Sizes.Sizes.M) : UtilStyle.Types.Var.IconSize  => {
    return `var(--iconSize${size})` as UtilStyle.Types.Var.IconSize
}
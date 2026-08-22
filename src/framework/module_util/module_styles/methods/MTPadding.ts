import * as UtilConsts from "@/util_consts";
import * as UtilStyle from "@/util_styles";

export const MTPadding = (size: UtilStyle.Types.Const.Sizes = UtilConsts.Sizes.Sizes.M) : UtilStyle.Types.Var.Padding  => {
    return `var(--padding${size})` as UtilStyle.Types.Var.Padding
}
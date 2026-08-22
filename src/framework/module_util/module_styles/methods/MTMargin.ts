import * as UtilConsts from "@/util_consts";
import * as UtilStyle from "@/util_styles";

export const MTMargin = (size: UtilStyle.Types.Const.Sizes = UtilConsts.Sizes.Sizes.M) : UtilStyle.Types.Var.Margin  => {
    return `var(--margin${size})` as UtilStyle.Types.Var.Margin
}
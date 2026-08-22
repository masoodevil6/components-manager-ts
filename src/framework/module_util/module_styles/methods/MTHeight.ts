import * as UtilConsts from "@/util_consts";
import * as UtilStyle from "@/util_styles";

export const MTHeight = (size: UtilStyle.Types.Const.Sizes = UtilConsts.Sizes.Sizes.M) : UtilStyle.Types.Var.Height  => {
    return `var(--height${size})` as UtilStyle.Types.Var.Height
}
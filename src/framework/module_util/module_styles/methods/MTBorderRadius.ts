import * as UtilConsts from "@/util_consts";
import * as UtilStyle from "@/util_styles"

export const MTBorderRadius = (size: UtilStyle.Types.Const.Sizes = UtilConsts.Sizes.Sizes.M) : UtilStyle.Types.Var.BorderRadius  => {
    return `var(--borderRadius${size})` as UtilStyle.Types.Var.BorderRadius
}
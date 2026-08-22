import * as UtilConsts from "@/util_consts";
import * as UtilStyle from "@/util_styles"

export const MTBorderWidth = (size: UtilStyle.Types.Const.Sizes = UtilConsts.Sizes.Sizes.M) : UtilStyle.Types.Var.BorderWidth  => {
    return `var(--borderWidth${size})` as UtilStyle.Types.Var.BorderWidth;
}
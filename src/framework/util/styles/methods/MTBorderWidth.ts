import * as UtilConsts from "@/util_consts";
import * as UtilStyle from "@/util_styles"

export const MTBorderWidth = (size: UtilStyle.Types.Const.TCSizes = UtilConsts.Sizes.M) : UtilStyle.Types.Var.TVBorderWidth  => {
    return `var(--borderWidth${size})` as UtilStyle.Types.Var.TVBorderWidth;
}
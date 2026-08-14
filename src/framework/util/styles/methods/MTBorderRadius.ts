import * as UtilConsts from "@/util_consts";
import * as UtilStyle from "@/util_styles"

export const MTBorderRadius = (size: UtilStyle.Types.Const.TCSizes = UtilConsts.Sizes.M) : UtilStyle.Types.Var.TVBorderRadius  => {
    return `var(--borderRadius${size})` as UtilStyle.Types.Var.TVBorderRadius
}
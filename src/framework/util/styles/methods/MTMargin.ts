import * as UtilConsts from "@/util_consts";
import * as UtilStyle from "@/util_styles";

export const MTMargin = (size: UtilStyle.Types.Const.TCSizes = UtilConsts.Sizes.M) : UtilStyle.Types.Var.TVMargin  => {
    return `var(--margin${size})` as UtilStyle.Types.Var.TVMargin
}
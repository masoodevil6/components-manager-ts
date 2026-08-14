import * as UtilConsts from "@/util_consts";
import * as UtilStyle from "@/util_styles";

export const MTPadding = (size: UtilStyle.Types.Const.TCSizes = UtilConsts.Sizes.M) : UtilStyle.Types.Var.TVPadding  => {
    return `var(--padding${size})` as UtilStyle.Types.Var.TVPadding
}
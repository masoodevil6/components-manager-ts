import * as UtilConsts from "@/util_consts";
import * as UtilStyle from "@/util_styles";

export const MTHeight = (size: UtilStyle.Types.Const.TCSizes = UtilConsts.Sizes.M) : UtilStyle.Types.Var.TVHeight  => {
    return `var(--height${size})` as UtilStyle.Types.Var.TVHeight
}
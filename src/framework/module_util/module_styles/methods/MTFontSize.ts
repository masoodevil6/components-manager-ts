import * as UtilConsts from "@/util_consts";
import * as UtilStyle from "@/util_styles";

export const MTFontSize = (size: UtilStyle.Types.Const.Sizes = UtilConsts.Sizes.Sizes.M) : UtilStyle.Types.Var.FontSize  => {
    return `var(--fontSize${size})` as UtilStyle.Types.Var.FontSize
}
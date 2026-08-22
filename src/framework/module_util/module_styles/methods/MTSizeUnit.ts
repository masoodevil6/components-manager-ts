import * as UtilConsts from "@/util_consts";
import * as UtilStyle from "@/util_styles";

export const MTSizeUnit = (number: number  , unit:  UtilStyle.Types.Const.Units = UtilConsts.Sizes.Units.PEXEL) : UtilStyle.Types.Var.SizeUnit=> {
    return `${number}${unit}` as UtilStyle.Types.Var.SizeUnit
}
import * as UtilConsts from "@/util_consts";
import * as UtilStyle from "@/util_styles";

export const MTSizeUnit = (number: number  , unit:  UtilStyle.Types.Const.TCUnits = UtilConsts.Units.PEXEL) : UtilStyle.Types.Var.TVSizeUnit=> {
    return `${number}${unit}` as UtilStyle.Types.Var.TVSizeUnit
}
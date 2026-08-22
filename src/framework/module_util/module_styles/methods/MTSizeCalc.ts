import * as UtilStyle from "@/util_styles";


type CalcSizeParts = UtilStyle.Types.Const.Operation | UtilStyle.Types.Var.SizeUnit
export const MTSizeCalc = (...parts : CalcSizeParts[]) : UtilStyle.Types.Var.SizeCalc => {
    let partStr = ""
    if (parts){
        for (let i = 0; i < parts.length; i++) {
            const itemPart = parts[i];
            if (itemPart){
                partStr += ` ${itemPart} `
            }
        }
    }
    return `calc(${partStr})` as  UtilStyle.Types.Var.SizeCalc
}
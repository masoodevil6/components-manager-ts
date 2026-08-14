import * as UtilStyle from "@/util_styles";


type CalcSizeParts = UtilStyle.Types.Const.TCOperation | UtilStyle.Types.Var.TVSizeUnit
export const MTSizeCalc = (...parts : CalcSizeParts[]) : UtilStyle.Types.Var.TVSizeCalc => {
    let partStr = ""
    if (parts){
        for (let i = 0; i < parts.length; i++) {
            const itemPart = parts[i];
            if (itemPart){
                partStr += ` ${itemPart} `
            }
        }
    }
    return `calc(${partStr})` as  UtilStyle.Types.Var.TVSizeCalc
}
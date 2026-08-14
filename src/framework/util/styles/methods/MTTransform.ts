import * as UtilStyle from "@/util_styles";

export const MTTransform = (transitionX: UtilStyle.Types.Var.TVSizeUnit, transitionY: UtilStyle.Types.Var.TVSizeUnit) : UtilStyle.Types.Var.TVTransform=> {
    return `translate(${transitionX} , ${transitionY})` as  UtilStyle.Types.Var.TVTransform
}
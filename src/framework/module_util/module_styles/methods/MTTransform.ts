import * as UtilStyle from "@/util_styles";

export const MTTransform = (transitionX: UtilStyle.Types.Var.SizeUnit, transitionY: UtilStyle.Types.Var.SizeUnit) : UtilStyle.Types.Var.Transform=> {
    return `translate(${transitionX} , ${transitionY})` as  UtilStyle.Types.Var.Transform
}
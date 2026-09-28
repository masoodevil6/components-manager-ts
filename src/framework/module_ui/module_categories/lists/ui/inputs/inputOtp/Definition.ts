import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const InputOtp = CreateCategoryComponent<
    UIComponents.Lists.ComponentInputOtp.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentInputOtp.PropsType,
    UIComponents.Lists.ComponentInputOtp.MethodsConfigType<any>
>(UIComponents.Lists.ComponentInputOtp.Definition, UIComponents.Lists.ComponentInputOtp.Component);

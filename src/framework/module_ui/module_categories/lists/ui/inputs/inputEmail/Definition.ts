import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const InputEmail = CreateCategoryComponent<
    UIComponents.Lists.ComponentInputEmail.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentInputEmail.PropsType,
    UIComponents.Lists.ComponentInputEmail.MethodsConfigType<any>
>(UIComponents.Lists.ComponentInputEmail.Definition, UIComponents.Lists.ComponentInputEmail.Component);

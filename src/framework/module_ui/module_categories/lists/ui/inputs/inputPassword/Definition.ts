import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const InputPassword = CreateCategoryComponent<UIComponents.Lists.ComponentInputPassword.Component, UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentInputPassword.PropsType, UIComponents.Lists.ComponentInputPassword.MethodsConfigType<any>>(UIComponents.Lists.ComponentInputPassword.Definition, UIComponents.Lists.ComponentInputPassword.Component);

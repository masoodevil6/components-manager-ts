import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const InputSimple = CreateCategoryComponent<
    UIComponents.Lists.ComponentInputSimple.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentInputSimple.PropsType,
    UIComponents.Lists.ComponentInputSimple.MethodsConfigType<any>
>(UIComponents.Lists.ComponentInputSimple.Definition, UIComponents.Lists.ComponentInputSimple.Component);

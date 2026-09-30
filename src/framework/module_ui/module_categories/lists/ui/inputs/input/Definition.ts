import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const Input = CreateCategoryComponent<
    UIComponents.Lists.ComponentInput.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentInput.PropsType,
    UIComponents.Lists.ComponentInput.MethodsConfigType<any>
>(UIComponents.Lists.ComponentInput.Definition, UIComponents.Lists.ComponentInput.Component);

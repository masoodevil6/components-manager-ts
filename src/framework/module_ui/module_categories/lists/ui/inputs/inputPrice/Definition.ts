import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const InputPrice = CreateCategoryComponent<
    UIComponents.Lists.ComponentInputPrice.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentInputPrice.PropsType,
    UIComponents.Lists.ComponentInputPrice.MethodsConfigType<any>
>(UIComponents.Lists.ComponentInputPrice.Definition, UIComponents.Lists.ComponentInputPrice.Component);

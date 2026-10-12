import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const MenuMore = CreateCategoryComponent<
    UIComponents.Lists.ComponentMenuMore.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentMenuMore.PropsType,
    UIComponents.Lists.ComponentMenuMore.MethodsConfigType<UIComponents.Lists.ComponentMenuMore.Component>
>(UIComponents.Lists.ComponentMenuMore.Definition, UIComponents.Lists.ComponentMenuMore.Component);

import {CreateCategoryComponent} from "../../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const PageCardInfo = CreateCategoryComponent<
    UIComponents.Lists.ComponentPageCardInfo.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentPageCardInfo.PropsType,
    UIComponents.Lists.ComponentPageCardInfo.MethodsConfigType<UIComponents.Lists.ComponentPageCardInfo.Component>
>(UIComponents.Lists.ComponentPageCardInfo.Definition, UIComponents.Lists.ComponentPageCardInfo.Component);

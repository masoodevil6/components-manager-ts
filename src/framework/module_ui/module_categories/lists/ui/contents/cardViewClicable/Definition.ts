import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const CardViewClicable = CreateCategoryComponent<
    UIComponents.Lists.ComponentCardViewClicable.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentCardViewClicable.PropsType,
    UIComponents.Lists.ComponentCardViewClicable.MethodsConfigType<UIComponents.Lists.ComponentCardViewClicable.Component>
>(UIComponents.Lists.ComponentCardViewClicable.Definition, UIComponents.Lists.ComponentCardViewClicable.Component);

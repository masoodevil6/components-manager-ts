import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const CardViewInfo = CreateCategoryComponent<
    UIComponents.Lists.ComponentCardViewInfo.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentCardViewInfo.PropsType,
    UIComponents.Lists.ComponentCardViewInfo.MethodsConfigType<UIComponents.Lists.ComponentCardViewInfo.Component>
>(UIComponents.Lists.ComponentCardViewInfo.Definition, UIComponents.Lists.ComponentCardViewInfo.Component);

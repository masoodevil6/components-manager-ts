import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const CardRowInfo = CreateCategoryComponent<
    UIComponents.Lists.ComponentCardRowInfo.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentCardRowInfo.PropsType,
    UIComponents.Lists.ComponentCardRowInfo.MethodsConfigType<UIComponents.Lists.ComponentCardRowInfo.Component>
>(UIComponents.Lists.ComponentCardRowInfo.Definition, UIComponents.Lists.ComponentCardRowInfo.Component);

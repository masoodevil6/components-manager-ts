import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const Page = CreateCategoryComponent<
    UIComponents.Lists.ComponentPage.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentPage.PropsType,
    UIComponents.Lists.ComponentPage.MethodsConfigType<UIComponents.Lists.ComponentPage.Component>
>(UIComponents.Lists.ComponentPage.Definition, UIComponents.Lists.ComponentPage.Component);

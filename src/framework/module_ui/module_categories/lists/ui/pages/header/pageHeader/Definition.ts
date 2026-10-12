import {CreateCategoryComponent} from "../../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const PageHeader = CreateCategoryComponent<
    UIComponents.Lists.ComponentPageHeader.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentPageHeader.PropsType,
    UIComponents.Lists.ComponentPageHeader.MethodsConfigType<UIComponents.Lists.ComponentPageHeader.Component>
>(UIComponents.Lists.ComponentPageHeader.Definition, UIComponents.Lists.ComponentPageHeader.Component);
